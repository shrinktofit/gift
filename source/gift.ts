
import * as fs from 'fs-extra';
import * as path from 'path';
import ts, { EntityName, isUnionTypeNode, Token } from 'typescript';

export interface IOptions {
    input: string;
    output: string;
    name: string;
    rootModule: string;
    exportPrivates?: string;
    shelterName?: string;
    verbose?: boolean;
}

export interface IBundleResult {
    error: GiftErrors;
    typeReferencePaths?: string[];
    code?: string;
}

export enum GiftErrors {
    Ok,
    InputFileNotFound,
    RootModuleAbsent,
    Fatal,
}

export function bundle(options: IOptions): IBundleResult {
    if (options.verbose) {
        console.log(`Cwd: ${process.cwd()}`);
        console.log(`Options: ${JSON.stringify(options)}`);
    }

    // Check the input.
    if (!fs.existsSync(options.input)) {
        return { error: GiftErrors.InputFileNotFound };
    }

    const bundleGenerator = new BundleGenerator(options);
    return bundleGenerator.generate(options.output);
}

interface IExportedSymbolInfo {
    name: string;
    symbol: ts.Symbol;
    parent?: IExportedSymbolInfo;
    children?: IExportedSymbolInfo[];
    fullPrefix: string[];

    // unexported symbols only
    dumpedDeclarations?: ts.Statement[];
}

class BundleGenerator {
    private _options: IOptions;
    private _shelterName: string;
    private _program: ts.Program;
    private _typeChecker: ts.TypeChecker;
    private _exportedSymbols = {
        map: new Map<ts.Symbol, IExportedSymbolInfo>(),
    };
    private _unexportedSymbolsDetail = {
        map: new Map<ts.Symbol, IExportedSymbolInfo | null>(),
        pending: new Array<IExportedSymbolInfo>(),
    };
    private _scopeStack: string[] = [];
    private _referencedSourceFiles = new Set<ts.SourceFile>();

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

        const rootModuleSymbolInf = this._collectExportedSymbols(rootModule, '');
        this._completePath(rootModuleSymbolInf);

        const bundledRootModule = this._emitExportedSymbol(rootModuleSymbolInf, true);
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

        if (this._options.verbose) {
            console.log(`Referenced source files:[`);
            for (const referencedSourceFile of this._referencedSourceFiles) {
                console.log(`  ${referencedSourceFile.fileName},`);
            }
            console.log(`]`);
        }

        const lines: string[] = [];
        const typeReferencePaths: string[] = [];
        if (rootModule.declarations && rootModule.declarations.length !== 0) {
            const declaration0 = rootModule.declarations[0];
            const rootSourceFile = declaration0.getSourceFile();
            const resolvedTypeReferenceDirectives: ts.Map<ts.ResolvedTypeReferenceDirective> =
                this._program.getResolvedTypeReferenceDirectives();
            resolvedTypeReferenceDirectives.forEach((trd, key) => {
                if (!trd.resolvedFileName) {
                    return;
                }
                const trdSourceFile = this._program.getSourceFile(trd.resolvedFileName);
                if (!trdSourceFile || !this._referencedSourceFiles.has(trdSourceFile)) {
                    return;
                }
                lines.push(`/// <reference types="${key}"/>`);
                typeReferencePaths.push(trd.resolvedFileName);
            });
        }
        const statementsArray = ts.createNodeArray(statements);
        const result = printer.printList(ts.ListFormat.None, statementsArray, sourceFile);
        lines.push(result);
        const code = lines.join('\n');
        return { error: GiftErrors.Ok, code, typeReferencePaths };
    }

    private _collectExportedSymbols(symbol: ts.Symbol, name: string): IExportedSymbolInfo {
        let originalSymbol = symbol;
        if (symbol.flags & ts.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(symbol);
        }

        const result: IExportedSymbolInfo = {
            name,
            symbol: originalSymbol,
            fullPrefix: [],
        };

        if (!originalSymbol.declarations || originalSymbol.declarations.length === 0) {
            if (originalSymbol === symbol) {
                console.error(`Symbol [[${symbol.name}]] has no declaration.`);
            } else {
                console.error(
                    `Aliasing symbol of ${symbol.name}, ` +
                    `which is ${originalSymbol.name}, ` +
                    `has no declaration.`);
            }
            return result;
        }

        for (const declaration of originalSymbol.declarations) {
            if (declaration.kind === ts.SyntaxKind.ModuleDeclaration) {
                const exportedSymbols = this._typeChecker.getExportsOfModule(originalSymbol);
                result.children = result.children || [];
                for (const exportedSymbol of exportedSymbols) {
                    const child = this._collectExportedSymbols(exportedSymbol, exportedSymbol.name);
                    child.parent = result;
                    result.children.push(child);
                }
            }
        }

        let aliasSymbol = symbol;
        while (true) {
            this._exportedSymbols.map.set(aliasSymbol, result);
            if (aliasSymbol.flags & ts.SymbolFlags.Alias) {
                aliasSymbol = this._typeChecker.getAliasedSymbol(aliasSymbol);
            } else {
                break;
            }
        }
        return result;
    }

    private _completePath(symbolInf: IExportedSymbolInfo) {
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

    private _emitExportedSymbol(symbolInf: IExportedSymbolInfo, topLevel?: boolean): ts.Statement[] | null {
        const symbol = symbolInf.symbol;
        if (!symbol.declarations || symbol.declarations.length === 0) {
            return null;
        }

        const result: ts.Statement[] = [];
        for (const declaration of symbol.declarations) {
            if (declaration.kind === ts.SyntaxKind.ModuleDeclaration) {
                const dumpedModuleDeclaration = this._remakeModuleDeclaration(symbolInf, topLevel);
                if (dumpedModuleDeclaration) {
                    result.push(...dumpedModuleDeclaration);
                }
            } else {
                const dumpedDeclaration = this._remakeDeclaration(declaration, symbol, symbolInf.name);
                if (dumpedDeclaration) {
                    result.push(dumpedDeclaration);
                }
            }
        }

        return result;
    }

    private _remakeModuleDeclaration(symbolInf: IExportedSymbolInfo, topLevel?: boolean) {
        if (!symbolInf.children) {
            return null;
        }
        const statements: ts.Statement[] = [];
        if (!topLevel) {
            this._scopeStack.push(symbolInf.name);
        }
        for (const child of symbolInf.children) {
            const statement = this._emitExportedSymbol(child);
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

    private _remakeDeclaration(declaration: ts.Declaration, symbol: ts.Symbol, newName: string) {
        const result = this._remakeDeclarationNoComment(declaration, symbol, newName);
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

    private _remakeDeclarationNoComment(declaration: ts.Declaration, symbol: ts.Symbol, newName: string) {
        if (ts.isClassDeclaration(declaration)) {
            return this._remakeClassDeclaration(declaration, symbol, newName);
        } else if (ts.isFunctionDeclaration(declaration)) {
            return this._remakeFunctionDeclaration(declaration, symbol, newName);
        } else if (ts.isInterfaceDeclaration(declaration)) {
            return this._remakeInterfaceDeclaration(declaration, symbol, newName);
        } else if (ts.isEnumDeclaration(declaration)) {
            return this._remakeEnumDeclaration(declaration, symbol, newName);
        } else if (ts.isTypeAliasDeclaration(declaration)) {
            return this._remakeTypeAliasDeclaration(declaration, symbol, newName);
        } else if (ts.isVariableDeclaration(declaration)) {
            return this._remakeVariableDeclaration(declaration, symbol, newName);
        }
        return null;
    }

    private _remakeFunctionDeclaration(functionDeclaration: ts.FunctionDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createFunctionDeclaration(
            undefined,
            this._remakeModifiers(functionDeclaration),
            functionDeclaration.asteriskToken,
            newName,
            this._remakeTypeParameterArray(functionDeclaration.typeParameters),
            functionDeclaration.parameters.map((p) => this._remakeParameter(p)),
            this._remakeType(functionDeclaration.type),
            undefined,
        );
    }

    private _remakeVariableDeclaration(variableDeclaration: ts.VariableDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createVariableStatement(
            this._remakeModifiers(variableDeclaration.parent),
            [ts.createVariableDeclaration(
                newName,
                this._remakeType(variableDeclaration.type),
            )],
        );
    }

    private _remakePropertySignature(propertySignature: ts.PropertySignature) {
        return this._copyComments(propertySignature, ts.createPropertySignature(
            undefined,
            this._remakePropertyName(propertySignature.name),
            this._remakeToken(propertySignature.questionToken),
            this._remakeType(propertySignature.type),
            undefined,
        ));
    }

    private _remakeMethodSignature(methodSignature: ts.MethodSignature) {
        return this._copyComments(methodSignature, ts.createMethodSignature(
            this._remakeTypeParameterArray(methodSignature.typeParameters),
            methodSignature.parameters.map((p) => this._remakeParameter(p)),
            this._remakeType(methodSignature.type),
            this._remakePropertyName(methodSignature.name),
            this._remakeToken(methodSignature.questionToken),
        ));
    }

    private _remakePropertyDeclaration(propertyDeclaration: ts.PropertyDeclaration) {
        return this._copyComments(propertyDeclaration, ts.createProperty(
            undefined,
            this._remakeModifiers(propertyDeclaration),
            this._remakePropertyName(propertyDeclaration.name),
            this._remakeToken(propertyDeclaration.questionToken),
            this._remakeType(propertyDeclaration.type),
            undefined,
        ));
    }

    private _remakeMethodDeclaration(methodDeclaration: ts.MethodDeclaration) {
        return this._copyComments(methodDeclaration, (ts.createMethod(
            undefined,
            this._remakeModifiers(methodDeclaration),
            this._remakeToken(methodDeclaration.asteriskToken),
            this._remakePropertyName(methodDeclaration.name),
            this._remakeToken(methodDeclaration.questionToken),
            this._remakeTypeParameterArray(methodDeclaration.typeParameters),
            methodDeclaration.parameters.map((p) => this._remakeParameter(p)),
            this._remakeType(methodDeclaration.type),
            undefined,
        )));
    }

    private _remakeConstructorDeclaration(constructorDeclaration: ts.ConstructorDeclaration) {
        return this._copyComments(constructorDeclaration, (ts.createConstructor(
            undefined,
            this._remakeModifiers(constructorDeclaration),
            constructorDeclaration.parameters.map((p) => this._remakeParameter(p)),
            undefined,
        )));
    }

    private _remakeParameter(parameter: ts.ParameterDeclaration) {
        return ts.createParameter(
            undefined,
            this._remakeModifiers(parameter),
            this._remakeToken(parameter.dotDotDotToken),
            parameter.name.getText(),
            this._remakeToken(parameter.questionToken),
            this._remakeType(parameter.type),
        );
    }

    private _remakeTypeParameter(typeParameter: ts.TypeParameterDeclaration) {
        return ts.createTypeParameterDeclaration(
            typeParameter.name.getText(),
            this._remakeType(typeParameter.constraint),
            this._remakeType(typeParameter.default),
        );
    }

    private _remakeTypeParameterArray(
        typeParameters?: ts.TypeParameterDeclaration[] | ts.NodeArray<ts.TypeParameterDeclaration>) {
        const lambda = (tp: ts.TypeParameterDeclaration) => this._copyComments(tp, (this._remakeTypeParameter(tp)));
        if (Array.isArray(typeParameters)) {
            return typeParameters.map(lambda);
        } else if (typeParameters) {
            return typeParameters.map(lambda);
        } else {
            return undefined;
        }
    }

    private _remakeClassDeclaration(
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
                classElements.push(this._remakeMethodDeclaration(element));
            } else if (ts.isConstructorDeclaration(element)) {
                classElements.push(this._remakeConstructorDeclaration(element));
            } else if (ts.isPropertyDeclaration(element)) {
                classElements.push(this._remakePropertyDeclaration(element));
            }
        }
        return ts.createClassDeclaration(
            undefined,
            this._remakeModifiers(classDeclaration),
            newName,
            this._remakeTypeParameterArray(classDeclaration.typeParameters),
            this._remakeHeritageClauses(classDeclaration.heritageClauses),
            classElements,
        );
    }

    private _isPrivateMember(classElement: ts.ClassElement) {
        if (!classElement.modifiers) {
            return false;
        }
        return classElement.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword);
    }

    private _remakeInterfaceDeclaration(
        interfaceDeclaration: ts.InterfaceDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createInterfaceDeclaration(
            undefined,
            this._remakeModifiers(interfaceDeclaration),
            newName,
            this._remakeTypeParameterArray(interfaceDeclaration.typeParameters),
            this._remakeHeritageClauses(interfaceDeclaration.heritageClauses),
            this._remakeTypeElements(interfaceDeclaration.members),
        );
    }

    private _remakeTypeElement(typeElement: ts.TypeElement) {
        if (ts.isMethodSignature(typeElement)) {
            return this._remakeMethodSignature(typeElement);
        } else if (ts.isPropertySignature(typeElement)) {
            return this._remakePropertySignature(typeElement);
        }
    }

    private _remakeTypeElements(typeElements: ts.NodeArray<ts.TypeElement>) {
        const result: ts.TypeElement[] = [];
        for (const typeElement of typeElements) {
            const d = this._remakeTypeElement(typeElement);
            if (d) {
                result.push(d);
            }
        }
        return result;
    }

    private _remakeHeritageClause(heritageClause: ts.HeritageClause) {
        const validClauses: ts.ExpressionWithTypeArguments[] = [];
        for (const type of heritageClause.types) {
            validClauses.push(ts.createExpressionWithTypeArguments(
                type.typeArguments ? type.typeArguments.map((ta) => this._remakeType(ta)!) : undefined,
                this._remakeExpression(type.expression)));
        }
        return ts.createHeritageClause(
            heritageClause.token,
            validClauses,
        );
    }

    private _remakeHeritageClauses(heritageClauses?: ts.HeritageClause[] | ts.NodeArray<ts.HeritageClause>) {
        if (!heritageClauses) {
            return undefined;
        }
        const lambda = (heritageClause: ts.HeritageClause) => this._remakeHeritageClause(heritageClause);
        if (Array.isArray(heritageClauses)) {
            return heritageClauses.map(lambda);
        } else {
            return heritageClauses.map(lambda);
        }
    }

    private _remakeEnumDeclaration(enumDeclaration: ts.EnumDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createEnumDeclaration(
            undefined,
            this._remakeModifiers(enumDeclaration),
            newName,
            enumDeclaration.members.map((enumerator) => {
                return ts.createEnumMember(
                    enumerator.name.getText(),
                    this._remakeExpression(enumerator.initializer),
                );
            }),
        );
    }

    private _remakeTypeAliasDeclaration(
        typeAliasDeclaration: ts.TypeAliasDeclaration, symbol: ts.Symbol, newName: string) {
        return ts.createTypeAliasDeclaration(
            undefined,
            this._remakeModifiers(typeAliasDeclaration),
            newName,
            this._remakeTypeParameterArray(typeAliasDeclaration.typeParameters),
            this._remakeType(typeAliasDeclaration.type)!,
        );
    }

    private _remakeModifiers(declaration: ts.Declaration | ts.VariableDeclarationList | ts.CatchClause) {
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

    private _remakeType(type: ts.TypeNode): ts.TypeNode;

    private _remakeType(type?: ts.TypeNode): ts.TypeNode | undefined;

    private _remakeType(type?: ts.TypeNode): ts.TypeNode | undefined {
        if (!type) {
            return undefined;
        }

        const fallthrough = () => {
            return ts.createTypeReferenceNode(type.getText(), undefined);
        };

        switch (type.kind) {
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        // case ts.SyntaxKind.ThisKeyword:
            return ts.createKeywordTypeNode(type.kind);
        }
        if (ts.isTypeReferenceNode(type)) {
            return ts.createTypeReferenceNode(
                this._remakeEntityName(type.typeName),
                type.typeArguments ?
                type.typeArguments.map((ta) => this._remakeType(ta)!) : undefined,
            );
        } else if (isUnionTypeNode(type)) {
            return ts.createUnionTypeNode(
                type.types.map((t) => this._remakeType(t)!));
        } else if (ts.isTypeLiteralNode(type)) {
            return ts.createTypeLiteralNode(this._remakeTypeElements(type.members));
        } else if (ts.isArrayTypeNode(type)) {
            return ts.createArrayTypeNode(this._remakeType(type.elementType)!);
        } else if (ts.isParenthesizedTypeNode(type)) {
            return ts.createParenthesizedType(this._remakeType(type.type)!);
        } else if (ts.isTypeQueryNode(type)) {
            return ts.createTypeQueryNode(this._remakeEntityName(type.exprName));
        } else if (ts.isTypeOperatorNode(type)) {
            return ts.createTypeOperatorNode(this._remakeType(type.type)!);
        } else if (ts.isFunctionTypeNode(type)) {
            return ts.createFunctionTypeNode(
                this._remakeTypeParameterArray(type.typeParameters),
                type.parameters.map((p) => this._remakeParameter(p)),
                this._remakeType(type.type),
            );
        } else if (ts.isConstructorTypeNode(type)) {
            return ts.createConstructorTypeNode(
                this._remakeTypeParameterArray(type.typeParameters),
                type.parameters.map((p) => this._remakeParameter(p)),
                this._remakeType(type.type),
            );
        } else if (ts.isImportTypeNode(type)) {
            let symbol: ts.Symbol | undefined;
            const typetype = this._typeChecker.getTypeAtLocation(type);
            if (typetype) {
                symbol = typetype.symbol;
            }
            if (!symbol) {
                console.warn(`Failed to resolve type ${type.getText()}, There is no symbol info.`);
                if (this._typeChecker.getSymbolAtLocation(type.argument)) {
                    console.warn(`BTW`);
                }
            } else {
                const inf = this._getInf(symbol);
                if (inf) {
                    const mainTypeName = this._resolveSymbolPath(inf);
                    return ts.createTypeReferenceNode(
                        mainTypeName,
                        type.typeArguments ? type.typeArguments.map((ta) => this._remakeType(ta)!) : undefined,
                    );
                }
            }
        } else if (ts.isIntersectionTypeNode(type)) {
            return ts.createIntersectionTypeNode(type.types.map((t) => this._remakeType(t)));
        } else if (ts.isIndexedAccessTypeNode(type)) {
            return ts.createIndexedAccessTypeNode(
                this._remakeType(type.objectType), this._remakeType(type.indexType));
        } else if (ts.isThisTypeNode(type)) {
            return ts.createThisTypeNode();
        } else if (ts.isTypePredicateNode(type)) {
            const dumpedParameterName = ts.isIdentifier(type.parameterName) ?
                this._remakeIdentifier(type.parameterName) : ts.createThisTypeNode();
            return ts.createTypePredicateNode(dumpedParameterName, this._remakeType(type.type));
        } else if (ts.isConditionalTypeNode(type)) {
            return ts.createConditionalTypeNode(
                this._remakeType(type.checkType),
                this._remakeType(type.extendsType),
                this._remakeType(type.trueType),
                this._remakeType(type.falseType),
            );
        } else if (ts.isTupleTypeNode(type)) {
            return ts.createTupleTypeNode(type.elementTypes.map((elementType) => this._remakeType(elementType)));
        } else if (ts.isLiteralTypeNode(type)) {
            const literal = type.literal;
            let dumpedLiteral: typeof literal | undefined;
            if (ts.isStringLiteral(literal)) {
                dumpedLiteral = ts.createStringLiteral(literal.text);
            } else if (literal.kind === ts.SyntaxKind.TrueKeyword) {
                dumpedLiteral = ts.createTrue();
            } else if (literal.kind === ts.SyntaxKind.FalseKeyword) {
                dumpedLiteral = ts.createFalse();
            } else if (ts.isNumericLiteral(literal)) {
                dumpedLiteral = ts.createNumericLiteral(literal.text);
            } else if (ts.isBigIntLiteral(literal)) {
                dumpedLiteral = ts.createBigIntLiteral(literal.text);
            } else if (ts.isRegularExpressionLiteral(literal)) {
                dumpedLiteral = ts.createRegularExpressionLiteral(literal.text);
            } else if (ts.isNoSubstitutionTemplateLiteral(literal)) {
                dumpedLiteral = ts.createNoSubstitutionTemplateLiteral(literal.text);
            } else if (ts.isPrefixUnaryExpression(literal)) {
                dumpedLiteral = ts.createPrefix(literal.operator, this._remakeExpression(literal.operand));
            } else {
                console.warn(`Don't know how to handle literal type ${type.getText()}(${printNode(type)})`);
            }
            if (dumpedLiteral) {
                return ts.createLiteralTypeNode(dumpedLiteral);
            }
        }
        else {
            console.warn(`Don't know how to handle type ${type.getText()}(${printNode(type)})`);
        }
        return type ? ts.createTypeReferenceNode(type.getText(), undefined) : undefined;
    }

    private _remakeToken<TKind extends ts.SyntaxKind>(token?: Token<TKind>) {
        return token ? ts.createToken(token.kind) : undefined;
    }

    private _remakeEntityName(name: ts.EntityName) {
        const identifiers: ts.Identifier[] = [];
        while (ts.isQualifiedName(name)) {
            identifiers.unshift(name.right);
            name = name.left;
        }
        identifiers.unshift(name);

        let result: ts.EntityName | null = null;
        for (const id of identifiers) {
            const newID = ts.createIdentifier(this._getDumpedNameOfSymbolAt(id));
            if (!result) {
                result = newID;
            } else {
                result = ts.createQualifiedName(result, newID);
            }
        }

        return result!;
    }

    private _remakePropertyName(propertyName: ts.PropertyName) {
        if (ts.isIdentifier(propertyName)) {
            return ts.createIdentifier(propertyName.text);
        } else if (ts.isStringLiteral(propertyName)) {
            return ts.createStringLiteral(propertyName.text);
        } else if (ts.isNumericLiteral(propertyName)) {
            return ts.createNumericLiteral(propertyName.text);
        } else {
            return ts.createComputedPropertyName(this._remakeExpression(propertyName.expression));
        }
    }

    private _remakeBooleanLiteral(node: ts.BooleanLiteral) {
        return ts.createToken(node.kind);
    }

    private _remakeStringLiteral(node: ts.StringLiteral) {
        return ts.createStringLiteral(node.text);
    }

    private _remakeExpression(expression: ts.Expression): ts.Expression;

    private _remakeExpression(expression?: ts.Expression): ts.Expression | undefined;

    // Only literals are supported
    private _remakeExpression(expression?: ts.Expression): ts.Expression | undefined {
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
        } else if (ts.isIdentifier(expression)) {
            return this._remakeIdentifier(expression);
        } else if (ts.isPropertyAccessExpression(expression)) {
            return ts.createPropertyAccess(
                this._remakeExpression(expression.expression),
                this._remakeIdentifier(expression.name));
        } else {
            return ts.createStringLiteral(`Bad expression <${expression.getText()}>`);
        }
    }

    private _remakeIdentifier(id: ts.Identifier) {
        return ts.createIdentifier(
            this._getDumpedNameOfSymbolAt(id));
    }

    private _getDumpedNameOfSymbolAt(node: ts.Node) {
        const symbolInf = this._getSymbolInfAt(node);
        if (symbolInf) {
            return this._resolveSymbolPath(symbolInf);
        } else {
            return node.getText();
        }
    }

    private _getSymbolInfAt(node: ts.Node) {
        const symbol = this._typeChecker.getSymbolAtLocation(node);
        if (!symbol) {
            return null;
        }
        return this._getInf(symbol);
    }

    private _getInf(symbol: ts.Symbol): IExportedSymbolInfo | null {
        // TODO: import * as xx from 'xx';
        // xx's Inf
        let originalSymbol = symbol;
        if (originalSymbol.flags & ts.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(originalSymbol);
        }

        if (originalSymbol.flags & ts.SymbolFlags.TypeParameter ||
            originalSymbol.flags & ts.SymbolFlags.EnumMember) {
            return null;
        }

        if (originalSymbol.flags & ts.SymbolFlags.ModuleMember) {
            const declaration = originalSymbol.valueDeclaration ||
                (originalSymbol.declarations && originalSymbol.declarations.length > 0 ?
                    originalSymbol.declarations[0] : null);
            if (declaration) {
                this._referencedSourceFiles.add(declaration.getSourceFile());
                let isTopLevelModuleMember = false;
                if (ts.isModuleDeclaration(declaration.parent) &&
                    ts.isSourceFile(declaration.parent.parent)) {
                    isTopLevelModuleMember = true;
                } else if (
                    ts.isModuleBlock(declaration.parent) &&
                    ts.isSourceFile(declaration.parent.parent.parent)) {
                    isTopLevelModuleMember = true;
                }
                if (!isTopLevelModuleMember) {
                    return null;
                }
            }
        }

        let inf = this._exportedSymbols.map.get(originalSymbol) || null;
        if (!inf) {
            if (this._options.verbose) {
                console.debug(`Found symbol ${originalSymbol.name} not exported.`);
            }
            inf = this._getUnexported(originalSymbol);
        }
        return inf;
    }

    private _getUnexported(symbol: ts.Symbol): IExportedSymbolInfo | null {
        let inf = this._unexportedSymbolsDetail.map.get(symbol);
        if (inf === undefined) {
            inf = this._remakeUnexported(symbol);
        }
        return inf;
    }

    private _remakeUnexported(symbol: ts.Symbol): IExportedSymbolInfo | null {
        if (!symbol.declarations || symbol.declarations.length === 0) {
            return null;
        }
        const declaration0 = symbol.declarations[0];
        const sourceFile = declaration0.getSourceFile();
        if (this._program.isSourceFileFromExternalLibrary(sourceFile) ||
            this._program.isSourceFileDefaultLibrary(sourceFile)) {
            return null;
        }
        const moduleSymbol = this._getModuleSymbol(declaration0);
        if (!moduleSymbol) {
            return null;
        }
        const name = `${moduleSymbol.name}_${symbol.name}`.split('"').join('').replace(/[\/-]/g, '_');
        const backupStack = this._scopeStack;
        this._scopeStack = [ this._shelterName ];
        const result: IExportedSymbolInfo = {
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

        const decls = this._emitExportedSymbol(result);
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

    private _resolveSymbolPath(to: IExportedSymbolInfo): string {
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
