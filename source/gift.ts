
import * as fs from 'fs-extra';
import * as path from 'path';
import ts, { isUnionTypeNode, Token } from 'typescript';

export interface IOptions {
    input: string;
    output: string;
    name: string;
    rootModule: string;
    exportPrivates?: string;
    shelterName?: string;
}

export interface IBundleResult {
    error: GiftErrors;
    code?: string;
}

export enum GiftErrors {
    Ok,
    InputFileNotFound,
    RootModuleAbsent,
    Fatal,
}

export function bundle(options: IOptions): IBundleResult {
    console.log(`Cwd: ${process.cwd()}`);
    console.log(`Options: ${JSON.stringify(options)}`);

    // Check the input.
    if (!fs.existsSync(options.input)) {
        return { error: GiftErrors.InputFileNotFound };
    }

    const bundleGenerator = new BundleGenerator(options);
    return bundleGenerator.generate(options.output);
}

interface ISymbolInf {
    name: string;
    symbol: ts.Symbol;
    parent?: ISymbolInf;
    children?: ISymbolInf[];
    fullPrefix: string[];

    // unexported symbols only
    dumpedDeclarations?: ts.Statement[];
}

class BundleGenerator {
    private _options: IOptions;
    private _shelterName: string;
    private _program: ts.Program;
    private _typeChecker: ts.TypeChecker;
    private _pass1Result = {
        map: new Map<ts.Symbol, ISymbolInf>(),
    };
    private _unexportedSymbolsDetail = {
        map: new Map<ts.Symbol, ISymbolInf | null>(),
        pending: new Array<ISymbolInf>(),
    };
    private _scopeStack: string[] = [];

    constructor(options: IOptions) {
        this._options = options;
        this._shelterName = options.shelterName || '__internal';
        this._program = ts.createProgram({
            rootNames: [ options.input ],
            options: {
                rootDir: path.dirname(options.input),
            },
        });
        this._typeChecker = this._program.getTypeChecker();
    }

    public generate(outputPath: string): IBundleResult {
        const ambientModules = this._typeChecker.getAmbientModules();
        const rootModuleName = `"${this._options.rootModule}"`;
        const rootModule = ambientModules.find(
            (ambientModule) => ambientModule.name === rootModuleName);
        if (!rootModule) {
            return { error: GiftErrors.RootModuleAbsent };
        }

        const rootModuleSymbolInf = this._bundleSymbolPass1(rootModule, '');
        this._completePath(rootModuleSymbolInf);

        const bundledRootModule = this._bundleSymbolPass2(rootModuleSymbolInf, true);
        if (!bundledRootModule) {
            return { error: GiftErrors.Fatal };
        }

        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });
        const sourceFile = ts.createSourceFile(
            path.basename(outputPath),
            '',
            ts.ScriptTarget.Latest,
            false,
            ts.ScriptKind.TS,
        );

        const statements = [
            ...bundledRootModule,
        ];
        let lines: string[] = [];
        if (rootModule.declarations && rootModule.declarations.length !== 0) {
            const declaration0 = rootModule.declarations[0];
            const rootSourceFile = declaration0.getSourceFile();
            lines = rootSourceFile.typeReferenceDirectives.map(
                (lrd) => `/// <reference types="${lrd.fileName}"/>`);
        }
        const statementsArray = ts.createNodeArray(statements);
        const result = printer.printList(ts.ListFormat.None, statementsArray, sourceFile);
        lines.push(result);
        const code = lines.join('\n');
        return { error: GiftErrors.Ok, code };
    }

    private _bundleSymbolPass1(symbol: ts.Symbol, name: string): ISymbolInf {
        let originalSymbol = symbol;
        if (symbol.flags & ts.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(symbol);
        }

        const result: ISymbolInf = {
            name,
            symbol: originalSymbol,
            fullPrefix: [],
        };

        if (!originalSymbol.declarations || originalSymbol.declarations.length === 0) {
            console.error(`Found symbol with no declarations: ${originalSymbol.name}.`);
            return result;
        }

        for (const declaration of originalSymbol.declarations) {
            if (declaration.kind === ts.SyntaxKind.ModuleDeclaration) {
                const exportedSymbols = this._typeChecker.getExportsOfModule(originalSymbol);
                result.children = result.children || [];
                for (const exportedSymbol of exportedSymbols) {
                    const child = this._bundleSymbolPass1(exportedSymbol, exportedSymbol.name);
                    child.parent = result;
                    result.children.push(child);
                }
            }
        }

        let aliasSymbol = symbol;
        while (true) {
            this._pass1Result.map.set(aliasSymbol, result);
            if (aliasSymbol.flags & ts.SymbolFlags.Alias) {
                aliasSymbol = this._typeChecker.getAliasedSymbol(aliasSymbol);
            } else {
                break;
            }
        }
        return result;
    }

    private _completePath(symbolInf: ISymbolInf) {
        let cur = symbolInf;
        while (cur.parent && cur.parent.name.length !== 0) {
            symbolInf.fullPrefix.unshift(cur.parent.name);
            cur = cur.parent;
        }
        if (symbolInf.children) {
            for (const child of symbolInf.children) {
                this._completePath(child);
            }
        }
    }

    private _bundleSymbolPass2(symbolInf: ISymbolInf, topLevel?: boolean): ts.Statement[] | null {
        const symbol = symbolInf.symbol;
        if (!symbol.declarations || symbol.declarations.length === 0) {
            return null;
        }

        const result: ts.Statement[] = [];
        for (const declaration of symbol.declarations) {
            if (declaration.kind === ts.SyntaxKind.ModuleDeclaration) {
                const dumpedModuleDeclaration = this._dumpModuleDeclaration(symbolInf, topLevel);
                if (dumpedModuleDeclaration) {
                    result.push(...dumpedModuleDeclaration);
                }
            } else {
                const dumpedDeclaration = this._dumpDeclaration(declaration, symbol, symbolInf.name);
                if (dumpedDeclaration) {
                    result.push(dumpedDeclaration);
                }
            }
        }

        return result;
    }

    private _dumpModuleDeclaration(symbolInf: ISymbolInf, topLevel?: boolean) {
        if (!symbolInf.children) {
            return null;
        }
        const statements: ts.Statement[] = [];
        if (!topLevel) {
            this._scopeStack.push(symbolInf.name);
        }
        for (const child of symbolInf.children) {
            const statement = this._bundleSymbolPass2(child);
            if (statement) {
                statements.push(...statement);
            }
        }
        if (!topLevel) {
            this._scopeStack.pop();
        }
        if (topLevel) {
            const unexportedDecls: ts.Statement[] = [];
            this._scopeStack.push(this._shelterName);
            for (const unexportedSymbolInf of this._unexportedSymbolsDetail.pending) {
                const decl = unexportedSymbolInf.dumpedDeclarations;
                if (decl) {
                    unexportedDecls.push(...decl);
                }
            }
            this._scopeStack.pop();
            const unexportedNs = ts.createModuleDeclaration(
                undefined,
                undefined,
                ts.createIdentifier(this._shelterName),
                ts.createModuleBlock(unexportedDecls),
                ts.NodeFlags.Namespace,
            );
            const moduleDeclaration = ts.createModuleDeclaration(
                undefined,
                [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
                ts.createStringLiteral(this._options.name),
                ts.createModuleBlock(statements.concat([unexportedNs])),
            );
            return [moduleDeclaration];
        } else {
            const namespaceDeclaration = ts.createModuleDeclaration(
                undefined,
                undefined,
                ts.createIdentifier(symbolInf.name),
                ts.createModuleBlock(statements),
                ts.NodeFlags.Namespace,
            );
            return [namespaceDeclaration];
        }
    }

    private _dumpDeclaration(declaration: ts.Declaration, symbol: ts.Symbol, newName: string) {
        const result = this._dumpDeclarationNoComment(declaration, symbol, newName);
        if (result) {
            this._copyComments(declaration, result);
        }
        return result;
    }

    private _copyComments<T extends ts.Node>(src: ts.Node, dst: T) {
        const sourceFileText = src.getSourceFile().text;
        const commentRanges = ts.getLeadingCommentRanges(sourceFileText, src.getFullStart());
        if (commentRanges) {
            for (const commentRange of commentRanges) {
                let tex = sourceFileText.substring(commentRange.pos, commentRange.end);
                if (tex.startsWith('/*')) {
                    tex = tex.substr(2, tex.length - 4);
                } else if (tex.startsWith('//')) {
                    tex = tex.substr(2);
                }
                ts.addSyntheticLeadingComment(dst, commentRange.kind, tex);
            }
        }
        // ts.setSyntheticLeadingComments(result, ts.getSyntheticLeadingComments(declaration));
        // ts.setSyntheticTrailingComments(result, ts.getSyntheticTrailingComments(declaration));
        return dst;
    }

    private _dumpDeclarationNoComment(declaration: ts.Declaration, symbol: ts.Symbol, newName: string) {
        if (ts.isClassDeclaration(declaration)) {
            return this._dumpClassDeclaration(declaration, symbol, newName);
        } else if (ts.isFunctionDeclaration(declaration)) {
            return this._dumpFunctionDeclaration(declaration, symbol, newName);
        } else if (ts.isInterfaceDeclaration(declaration)) {
            return this._dumpInterfaceDeclaration(declaration, symbol, newName);
        } else if (ts.isEnumDeclaration(declaration)) {
            return this._dumpEnumDeclaration(declaration, symbol, newName);
        } else if (ts.isTypeAliasDeclaration(declaration)) {
            return this._dumpTypeAliasDeclaration(declaration, symbol, newName);
        } else if (ts.isVariableDeclaration(declaration)) {
            return this._dumpVariableDeclaration(declaration, symbol, newName);
        }
        return null;
    }

    private _dumpFunctionDeclaration(functionDeclaration: ts.FunctionDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createFunctionDeclaration(
            undefined,
            this._dumpModifiers(functionDeclaration),
            functionDeclaration.asteriskToken,
            newName,
            this._dumpTypeParameterArray(functionDeclaration.typeParameters),
            functionDeclaration.parameters.map((p) => this._dumpParameter(p)),
            this._dumpType(functionDeclaration.type),
            undefined,
        );
    }

    private _dumpVariableDeclaration(variableDeclaration: ts.VariableDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createVariableStatement(
            this._dumpModifiers(variableDeclaration.parent),
            [ts.createVariableDeclaration(
                newName,
                this._dumpType(variableDeclaration.type),
            )],
        );
    }

    private _dumpPropertySignature(propertySignature: ts.PropertySignature) {
        return this._copyComments(propertySignature, ts.createPropertySignature(
            undefined,
            propertySignature.name.getText(),
            this._dumpToken(propertySignature.questionToken),
            this._dumpType(propertySignature.type),
            undefined,
        ));
    }

    private _dumpMethodSignature(methodSignature: ts.MethodSignature) {
        return this._copyComments(methodSignature, ts.createMethodSignature(
            undefined,
            methodSignature.parameters.map((p) => this._dumpParameter(p)),
            this._dumpType(methodSignature.type),
            methodSignature.name.getText(),
            this._dumpToken(methodSignature.questionToken),
        ));
    }

    private _dumpPropertyDeclaration(propertyDeclaration: ts.PropertyDeclaration) {
        return this._copyComments(propertyDeclaration, ts.createProperty(
            undefined,
            this._dumpModifiers(propertyDeclaration),
            propertyDeclaration.name.getText(),
            this._dumpToken(propertyDeclaration.questionToken),
            this._dumpType(propertyDeclaration.type),
            undefined,
        ));
    }

    private _dumpMethodDeclaration(methodDeclaration: ts.MethodDeclaration) {
        return this._copyComments(methodDeclaration, (ts.createMethod(
            undefined,
            this._dumpModifiers(methodDeclaration),
            this._dumpToken(methodDeclaration.asteriskToken),
            methodDeclaration.name.getText(),
            this._dumpToken(methodDeclaration.questionToken),
            this._dumpTypeParameterArray(methodDeclaration.typeParameters),
            methodDeclaration.parameters.map((p) => this._dumpParameter(p)),
            this._dumpType(methodDeclaration.type),
            undefined,
        )));
    }

    private _dumpConstructorDeclaration(constructorDeclaration: ts.ConstructorDeclaration) {
        return this._copyComments(constructorDeclaration, (ts.createConstructor(
            undefined,
            this._dumpModifiers(constructorDeclaration),
            constructorDeclaration.parameters.map((p) => this._dumpParameter(p)),
            undefined,
        )));
    }

    private _dumpParameter(parameter: ts.ParameterDeclaration) {
        return ts.createParameter(
            undefined,
            this._dumpModifiers(parameter),
            this._dumpToken(parameter.dotDotDotToken),
            parameter.name.getText(),
            this._dumpToken(parameter.questionToken),
            this._dumpType(parameter.type),
        );
    }

    private _dumpTypeParameter(typeParameter: ts.TypeParameterDeclaration) {
        return ts.createTypeParameterDeclaration(
            typeParameter.name.getText(),
            this._dumpType(typeParameter.constraint),
            this._dumpType(typeParameter.default),
        );
    }

    private _dumpTypeParameterArray(
        typeParameters?: ts.TypeParameterDeclaration[] | ts.NodeArray<ts.TypeParameterDeclaration>) {
        const lambda = (tp: ts.TypeParameterDeclaration) => this._copyComments(tp, (this._dumpTypeParameter(tp)));
        if (Array.isArray(typeParameters)) {
            return typeParameters.map(lambda);
        } else if (typeParameters) {
            return typeParameters.map(lambda);
        } else {
            return undefined;
        }
    }

    private _dumpClassDeclaration(
        classDeclaration: ts.ClassDeclaration, symbol: ts.Symbol, newName: string) {
        const classElements: ts.ClassElement[] = [];
        // console.log(`Dump class ${newName}`);
        for (const element of classDeclaration.members) {
            if (!this._options.exportPrivates && this._isPrivateMember(element)) {
                continue;
            }
            // const name = typeof element.name === 'string' ? typeof element.name :
            //     (element.name ? element.name.getText() : '');
            // console.log(`  Dump member ${name}`);
            if (ts.isMethodDeclaration(element)) {
                classElements.push(this._dumpMethodDeclaration(element));
            } else if (ts.isConstructorDeclaration(element)) {
                classElements.push(this._dumpConstructorDeclaration(element));
            } else if (ts.isPropertyDeclaration(element)) {
                classElements.push(this._dumpPropertyDeclaration(element));
            }
        }
        return ts.createClassDeclaration(
            undefined,
            this._dumpModifiers(classDeclaration),
            newName,
            this._dumpTypeParameterArray(classDeclaration.typeParameters),
            this._dumpHeritageClauses(classDeclaration.heritageClauses),
            classElements,
        );
    }

    private _isPrivateMember(classElement: ts.ClassElement) {
        if (!classElement.modifiers) {
            return false;
        }
        return classElement.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword);
    }

    private _dumpInterfaceDeclaration(
        interfaceDeclaration: ts.InterfaceDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createInterfaceDeclaration(
            undefined,
            this._dumpModifiers(interfaceDeclaration),
            newName,
            this._dumpTypeParameterArray(interfaceDeclaration.typeParameters),
            this._dumpHeritageClauses(interfaceDeclaration.heritageClauses),
            this._dumpTypeElements(interfaceDeclaration.members),
        );
    }

    private _dumpTypeElement(typeElement: ts.TypeElement) {
        if (ts.isMethodSignature(typeElement)) {
            return this._dumpMethodSignature(typeElement);
        } else if (ts.isPropertySignature(typeElement)) {
            return this._dumpPropertySignature(typeElement);
        }
    }

    private _dumpTypeElements(typeElements: ts.NodeArray<ts.TypeElement>) {
        const result: ts.TypeElement[] = [];
        for (const typeElement of typeElements) {
            const d = this._dumpTypeElement(typeElement);
            if (d) {
                result.push(d);
            }
        }
        return result;
    }

    private _dumpHeritageClause(heritageClause: ts.HeritageClause) {
        const validClauses: ts.ExpressionWithTypeArguments[] = [];
        for (const type of heritageClause.types) {
            const exprSymbol = this._typeChecker.getSymbolAtLocation(type.expression);
            let exprType: undefined | ts.Expression;
            if (exprSymbol) {
                const exprSymbolInf = this._getInf(exprSymbol);
                if (exprSymbolInf) {
                    exprType = ts.createIdentifier(this._resolveSymbolPath(exprSymbolInf));
                }
            }
            if (!exprType) {
                exprType = ts.createIdentifier(type.expression.getText());
            }
            validClauses.push(ts.createExpressionWithTypeArguments(
                type.typeArguments ? type.typeArguments.map((ta) => this._dumpType(ta)!) : undefined,
                exprType));
        }
        return ts.createHeritageClause(
            heritageClause.token,
            validClauses,
        );
    }

    private _dumpHeritageClauses(heritageClauses?: ts.HeritageClause[] | ts.NodeArray<ts.HeritageClause>) {
        if (!heritageClauses) {
            return undefined;
        }
        const lambda = (heritageClause: ts.HeritageClause) => this._dumpHeritageClause(heritageClause);
        if (Array.isArray(heritageClauses)) {
            return heritageClauses.map(lambda);
        } else {
            return heritageClauses.map(lambda);
        }
    }

    private _dumpEnumDeclaration(enumDeclaration: ts.EnumDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createEnumDeclaration(
            undefined,
            this._dumpModifiers(enumDeclaration),
            newName,
            enumDeclaration.members.map((enumerator) => {
                return ts.createEnumMember(
                    enumerator.name.getText(),
                    this._dumpExpression(enumerator.initializer),
                );
            }),
        );
    }

    private _dumpTypeAliasDeclaration(
        typeAliasDeclaration: ts.TypeAliasDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createTypeAliasDeclaration(
            undefined,
            this._dumpModifiers(typeAliasDeclaration),
            newName,
            this._dumpTypeParameterArray(typeAliasDeclaration.typeParameters),
            this._dumpType(typeAliasDeclaration.type)!,
        );
    }

    private _dumpModifiers(declaration: ts.Declaration | ts.VariableDeclarationList | ts.CatchClause) {
            if (!declaration.modifiers) {
                return undefined;
            }
            const result: ts.Modifier[] = [];
            for (const modifier of declaration.modifiers) {
                if (modifier.kind !== ts.SyntaxKind.DefaultKeyword) {
                    result.push(modifier);
                }
            }
            return result;
    }

    private _dumpType(type?: ts.TypeNode): ts.TypeNode | undefined {
        if (!type) {
            return undefined;
        }
        const fallthrough = () => {
            return ts.createTypeReferenceNode(type.getText(), undefined);
        };
        if (ts.isTypeReferenceNode(type)) {
            const symbol = this._typeChecker.getSymbolAtLocation(type.typeName);
            if (!symbol) {
                return fallthrough();
            }
            const inf = this._getInf(symbol);
            const mainTypeName = inf ? this._resolveSymbolPath(inf) : type.typeName.getText();
            return ts.createTypeReferenceNode(
                mainTypeName,
                type.typeArguments ?
                type.typeArguments.map((ta) => this._dumpType(ta)!) : undefined,
            );
        } else if (isUnionTypeNode(type)) {
            return ts.createUnionTypeNode(
                type.types.map((t) => this._dumpType(t)!));
        } else if (ts.isTypeLiteralNode(type)) {
            return ts.createTypeLiteralNode(this._dumpTypeElements(type.members));
        } else if (ts.isArrayTypeNode(type)) {
            return ts.createArrayTypeNode(this._dumpType(type.elementType)!);
        } else if (ts.isParenthesizedTypeNode(type)) {
            return ts.createParenthesizedType(this._dumpType(type.type)!);
        } else if (ts.isTypeQueryNode(type)) {
            // Note: Only support typeof identifer.
            if (ts.isIdentifier(type.exprName)) {
                const symbol = this._typeChecker.getSymbolAtLocation(type.exprName);
                if (symbol) {
                    const inf = this._getInf(symbol);
                    if (inf) {
                        const name = this._resolveSymbolPath(inf);
                        return ts.createTypeQueryNode(ts.createIdentifier(name));
                    }
                }
            }
        } else if (ts.isTypeOperatorNode(type)) {
            return ts.createTypeOperatorNode(this._dumpType(type.type)!);
        } else if (ts.isFunctionTypeNode(type)) {
            return ts.createFunctionTypeNode(
                this._dumpTypeParameterArray(type.typeParameters),
                type.parameters.map((p) => this._dumpParameter(p)),
                this._dumpType(type.type),
            );
        } else if (ts.isConstructorTypeNode(type)) {
            return ts.createConstructorTypeNode(
                this._dumpTypeParameterArray(type.typeParameters),
                type.parameters.map((p) => this._dumpParameter(p)),
                this._dumpType(type.type),
            );
        } else if (ts.isImportTypeNode(type)) {
            const typetype = this._typeChecker.getTypeAtLocation(type);
            if (typetype) {
                const symbol = typetype.symbol;
                if (symbol) {
                    const inf = this._getInf(symbol);
                    if (inf) {
                        const mainTypeName = this._resolveSymbolPath(inf);
                        return ts.createTypeReferenceNode(
                            mainTypeName,
                            type.typeArguments ? type.typeArguments.map((ta) => this._dumpType(ta)!) : undefined,
                        );
                    }
                }
            }
        } else if (ts.isIntersectionTypeNode(type)) {
            return ts.createIntersectionTypeNode(type.types.map((t) => this._dumpType(t)!));
        }
        return type ? ts.createTypeReferenceNode(type.getText(), undefined) : undefined;
    }

    private _dumpToken<TKind extends ts.SyntaxKind>(token?: Token<TKind>) {
        return token ? ts.createToken(token.kind) : undefined;
    }

    // Only literals are supported
    private _dumpExpression(expression?: ts.Expression) {
        if (!expression) {
            return undefined;
        }
        if (ts.isStringLiteral(expression)) {
            return ts.createStringLiteral(expression.text);
        } else if (ts.isNumericLiteral(expression)) {
            return ts.createNumericLiteral(expression.text);
        } else if (expression.kind === ts.SyntaxKind.TrueKeyword) {
            return ts.createTrue();
        } else if (expression.kind === ts.SyntaxKind.FalseKeyword) {
            return ts.createFalse();
        } else if (expression.kind === ts.SyntaxKind.NullKeyword) {
            return ts.createNull();
        }
        return undefined;
    }

    private _getInf(symbol: ts.Symbol): ISymbolInf | null {
        if (symbol.flags & ts.SymbolFlags.TypeParameter) {
            return null;
        }
        let originalSymbol = symbol;
        if (originalSymbol.flags & ts.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(originalSymbol);
        }
        let inf = this._pass1Result.map.get(originalSymbol) || null;
        if (!inf) {
            console.warn(`Found symbol ${originalSymbol.name} not exported.`);
            inf = this._getUnexported(originalSymbol);
        }
        return inf;
    }

    private _getUnexported(symbol: ts.Symbol): ISymbolInf | null {
        let inf = this._unexportedSymbolsDetail.map.get(symbol);
        if (inf === undefined) {
            inf = this._dumpUnexported(symbol);
        }
        return inf;
    }

    private _dumpUnexported(symbol: ts.Symbol): ISymbolInf | null {
        if (!symbol.declarations || symbol.declarations.length === 0) {
            return null;
        }
        const declaration0 = symbol.declarations[0];
        const sourceFile = declaration0.getSourceFile();
        if (this._program.isSourceFileFromExternalLibrary(sourceFile) ||
            this._program.isSourceFileFromExternalLibrary(sourceFile)) {
            return null;
        }
        const moduleSymbol = this._getModuleSymbol(declaration0);
        if (!moduleSymbol) {
            return null;
        }
        const name = `${moduleSymbol.name}_${symbol.name}`.split('"').join('').replace(/[\/-]/g, '_');
        const backupStack = this._scopeStack;
        this._scopeStack = [ this._shelterName ];
        const result: ISymbolInf = {
            name,
            symbol,
            fullPrefix: [this._shelterName],
        };
        this._unexportedSymbolsDetail.map.set(symbol, result);

        if (declaration0.kind === ts.SyntaxKind.ModuleDeclaration) {
            const exportedSymbols = this._typeChecker.getExportsOfModule(symbol);
            result.children = [];
            for (const exportedSymbol of exportedSymbols) {
                const child = this._getInf(exportedSymbol);
                if (child) {
                    child.parent = result;
                    result.children.push(child);
                }
            }
        }

        const decls = this._bundleSymbolPass2(result);
        this._scopeStack = backupStack;
        if (decls) {
            result.dumpedDeclarations = decls;
        }
        this._unexportedSymbolsDetail.pending.push(result);
        return result;
    }

    private _getModuleSymbol(declaration: ts.Node) {
        let cur = declaration;
        while (!ts.isSourceFile(cur)) {
            if (ts.isModuleDeclaration(cur)) {
                return this._typeChecker.getSymbolAtLocation(cur.name) || null;
            }
            cur = cur.parent;
        }
        return null;
    }

    private _resolveSymbolPath(to: ISymbolInf): string {
        const max = Math.min(this._scopeStack.length, to.fullPrefix.length);
        let i = 0;
        for (; i < max; ++i) {
            if (to.fullPrefix[i] !== this._scopeStack[i]) {
                break;
            }
        }
        if (i >= to.fullPrefix.length) {
            return to.name;
        }
        return to.fullPrefix.slice(i).join('.') + '.' + to.name;
    }
}

function printSymbol(symbol: ts.Symbol) {
    const declaration = symbol.valueDeclaration || (
        (symbol.declarations !== undefined && symbol.declarations.length !== 0) ? symbol.declarations[0] : null);
    console.log(
        `[[${symbol.name}]], \n` +
        `  ${declaration ? printNode(declaration) : '!!NO-DECLARATION!!'}, \n` +
        `  ${printSymbolFlags(symbol.flags)}`);
}

function printSymbolFlags(flags: ts.SymbolFlags) {
    const satisfies: string[] = [];
    for (const key of Object.keys(ts.SymbolFlags)) {
        if (typeof key === 'string') {
            const value = (ts.SymbolFlags as any)[key];
            if (flags & value) {
                satisfies.push(key);
            }
        }
    }
    return satisfies.join(',');
}

function printNode(node: ts.Node) {
    return `Syntax Kind: ${ts.SyntaxKind[node.kind]}`;
}
