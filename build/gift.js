"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const typescript_1 = __importStar(require("typescript"));
var GiftErrors;
(function (GiftErrors) {
    GiftErrors[GiftErrors["Ok"] = 0] = "Ok";
    GiftErrors[GiftErrors["InputFileNotFound"] = 1] = "InputFileNotFound";
    GiftErrors[GiftErrors["RootModuleAbsent"] = 2] = "RootModuleAbsent";
    GiftErrors[GiftErrors["Fatal"] = 3] = "Fatal";
})(GiftErrors = exports.GiftErrors || (exports.GiftErrors = {}));
function bundle(options) {
    console.log(`Cwd: ${process.cwd()}`);
    console.log(`Options: ${JSON.stringify(options)}`);
    // Check the input.
    if (!fs.existsSync(options.input)) {
        return { error: GiftErrors.InputFileNotFound };
    }
    const bundleGenerator = new BundleGenerator(options);
    return bundleGenerator.generate(options.output);
}
exports.bundle = bundle;
class BundleGenerator {
    constructor(options) {
        this._pass1Result = {
            map: new Map(),
        };
        this._unexportedSymbolsDetail = {
            map: new Map(),
            pending: new Array(),
        };
        this._scopeStack = [];
        this._options = options;
        this._shelterName = options.shelterName || '__internal';
        this._program = typescript_1.default.createProgram({
            rootNames: [options.input],
            options: {
                rootDir: path.dirname(options.input),
            },
        });
        this._typeChecker = this._program.getTypeChecker();
    }
    generate(outputPath) {
        const ambientModules = this._typeChecker.getAmbientModules();
        const rootModuleName = `"${this._options.rootModule}"`;
        const rootModule = ambientModules.find((ambientModule) => ambientModule.name === rootModuleName);
        if (!rootModule) {
            return { error: GiftErrors.RootModuleAbsent };
        }
        const rootModuleSymbolInf = this._bundleSymbolPass1(rootModule, '');
        this._completePath(rootModuleSymbolInf);
        const bundledRootModule = this._bundleSymbolPass2(rootModuleSymbolInf, true);
        if (!bundledRootModule) {
            return { error: GiftErrors.Fatal };
        }
        const printer = typescript_1.default.createPrinter({
            newLine: typescript_1.default.NewLineKind.LineFeed,
        });
        const sourceFile = typescript_1.default.createSourceFile(path.basename(outputPath), '', typescript_1.default.ScriptTarget.Latest, false, typescript_1.default.ScriptKind.TS);
        const statements = [
            ...bundledRootModule,
        ];
        let lines = [];
        if (rootModule.declarations && rootModule.declarations.length !== 0) {
            const declaration0 = rootModule.declarations[0];
            const rootSourceFile = declaration0.getSourceFile();
            lines = rootSourceFile.typeReferenceDirectives.map((lrd) => `/// <reference types="${lrd.fileName}"/>`);
        }
        const statementsArray = typescript_1.default.createNodeArray(statements);
        const result = printer.printList(typescript_1.default.ListFormat.None, statementsArray, sourceFile);
        lines.push(result);
        const code = lines.join('\n');
        return { error: GiftErrors.Ok, code };
    }
    _bundleSymbolPass1(symbol, name) {
        let originalSymbol = symbol;
        if (symbol.flags & typescript_1.default.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(symbol);
        }
        const result = {
            name,
            symbol: originalSymbol,
            fullPrefix: [],
        };
        if (!originalSymbol.declarations || originalSymbol.declarations.length === 0) {
            console.error(`Found symbol with no declarations: ${originalSymbol.name}.`);
            return result;
        }
        const declaration0 = originalSymbol.declarations[0];
        if (declaration0.kind === typescript_1.default.SyntaxKind.ModuleDeclaration) {
            const exportedSymbols = this._typeChecker.getExportsOfModule(originalSymbol);
            result.children = [];
            for (const exportedSymbol of exportedSymbols) {
                const child = this._bundleSymbolPass1(exportedSymbol, exportedSymbol.name);
                child.parent = result;
                result.children.push(child);
            }
        }
        let aliasSymbol = symbol;
        while (true) {
            this._pass1Result.map.set(aliasSymbol, result);
            if (aliasSymbol.flags & typescript_1.default.SymbolFlags.Alias) {
                aliasSymbol = this._typeChecker.getAliasedSymbol(aliasSymbol);
            }
            else {
                break;
            }
        }
        return result;
    }
    _completePath(symbolInf) {
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
    _bundleSymbolPass2(symbolInf, topLevel) {
        const symbol = symbolInf.symbol;
        if (!symbol.declarations || symbol.declarations.length === 0) {
            return null;
        }
        const declaration0 = symbol.declarations[0];
        if (declaration0.kind === typescript_1.default.SyntaxKind.ModuleDeclaration) {
            if (symbolInf.children) {
                const statements = [];
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
                    const unexportedDecls = [];
                    this._scopeStack.push(this._shelterName);
                    for (const unexportedSymbolInf of this._unexportedSymbolsDetail.pending) {
                        const decl = unexportedSymbolInf.dumpedDeclarations;
                        if (decl) {
                            unexportedDecls.push(...decl);
                        }
                    }
                    this._scopeStack.pop();
                    const unexportedNs = typescript_1.default.createModuleDeclaration(undefined, undefined, typescript_1.default.createIdentifier(this._shelterName), typescript_1.default.createModuleBlock(unexportedDecls), typescript_1.default.NodeFlags.Namespace);
                    const moduleDeclaration = typescript_1.default.createModuleDeclaration(undefined, [typescript_1.default.createModifier(typescript_1.default.SyntaxKind.DeclareKeyword)], typescript_1.default.createStringLiteral(this._options.name), typescript_1.default.createModuleBlock(statements.concat([unexportedNs])));
                    return [moduleDeclaration];
                }
                else {
                    const namespaceDeclaration = typescript_1.default.createModuleDeclaration(undefined, undefined, typescript_1.default.createIdentifier(symbolInf.name), typescript_1.default.createModuleBlock(statements), typescript_1.default.NodeFlags.Namespace);
                    return [namespaceDeclaration];
                }
            }
            return null;
        }
        return this._dumpSymbol(symbol, symbolInf.name);
    }
    _dumpSymbol(symbol, newName) {
        const result = [];
        for (const declaration of symbol.declarations) {
            const dumpedDeclaration = this._dumpDeclaration(declaration, symbol, newName);
            if (dumpedDeclaration) {
                result.push(dumpedDeclaration);
            }
        }
        return result;
    }
    _dumpDeclaration(declaration, symbol, newName) {
        const result = this._dumpDeclarationNoComment(declaration, symbol, newName);
        if (result) {
            this._copyComments(declaration, result);
        }
        return result;
    }
    _copyComments(src, dst) {
        const sourceFileText = src.getSourceFile().text;
        const commentRanges = typescript_1.default.getLeadingCommentRanges(sourceFileText, src.getFullStart());
        if (commentRanges) {
            for (const commentRange of commentRanges) {
                let tex = sourceFileText.substring(commentRange.pos, commentRange.end);
                if (tex.startsWith('/*')) {
                    tex = tex.substr(2, tex.length - 4);
                }
                else if (tex.startsWith('//')) {
                    tex = tex.substr(2);
                }
                typescript_1.default.addSyntheticLeadingComment(dst, commentRange.kind, tex);
            }
        }
        // ts.setSyntheticLeadingComments(result, ts.getSyntheticLeadingComments(declaration));
        // ts.setSyntheticTrailingComments(result, ts.getSyntheticTrailingComments(declaration));
        return dst;
    }
    _dumpDeclarationNoComment(declaration, symbol, newName) {
        if (typescript_1.default.isClassDeclaration(declaration)) {
            return this._dumpClassDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isFunctionDeclaration(declaration)) {
            return this._dumpFunctionDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isInterfaceDeclaration(declaration)) {
            return this._dumpInterfaceDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isEnumDeclaration(declaration)) {
            return this._dumpEnumDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isTypeAliasDeclaration(declaration)) {
            return this._dumpTypeAliasDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isVariableDeclaration(declaration)) {
            return this._dumpVariableDeclaration(declaration, symbol, newName);
        }
        return null;
    }
    _dumpFunctionDeclaration(functionDeclaration, symbol, newName) {
        return typescript_1.default.createFunctionDeclaration(undefined, this._dumpModifiers(functionDeclaration), functionDeclaration.asteriskToken, newName, this._dumpTypeParameterArray(functionDeclaration.typeParameters), functionDeclaration.parameters.map((p) => this._dumpParameter(p)), this._dumpType(functionDeclaration.type), undefined);
    }
    _dumpVariableDeclaration(variableDeclaration, symbol, newName) {
        return typescript_1.default.createVariableStatement(this._dumpModifiers(variableDeclaration.parent), [typescript_1.default.createVariableDeclaration(newName, this._dumpType(variableDeclaration.type))]);
    }
    _dumpPropertySignature(propertySignature) {
        return this._copyComments(propertySignature, typescript_1.default.createPropertySignature(undefined, propertySignature.name.getText(), this._dumpToken(propertySignature.questionToken), this._dumpType(propertySignature.type), undefined));
    }
    _dumpMethodSignature(methodSignature) {
        return this._copyComments(methodSignature, typescript_1.default.createMethodSignature(undefined, methodSignature.parameters.map((p) => this._dumpParameter(p)), this._dumpType(methodSignature.type), methodSignature.name.getText(), this._dumpToken(methodSignature.questionToken)));
    }
    _dumpPropertyDeclaration(propertyDeclaration) {
        return this._copyComments(propertyDeclaration, typescript_1.default.createProperty(undefined, this._dumpModifiers(propertyDeclaration), propertyDeclaration.name.getText(), this._dumpToken(propertyDeclaration.questionToken), this._dumpType(propertyDeclaration.type), undefined));
    }
    _dumpMethodDeclaration(methodDeclaration) {
        return this._copyComments(methodDeclaration, (typescript_1.default.createMethod(undefined, this._dumpModifiers(methodDeclaration), this._dumpToken(methodDeclaration.asteriskToken), methodDeclaration.name.getText(), this._dumpToken(methodDeclaration.questionToken), this._dumpTypeParameterArray(methodDeclaration.typeParameters), methodDeclaration.parameters.map((p) => this._dumpParameter(p)), this._dumpType(methodDeclaration.type), undefined)));
    }
    _dumpParameter(parameter) {
        return typescript_1.default.createParameter(undefined, this._dumpModifiers(parameter), this._dumpToken(parameter.dotDotDotToken), parameter.name.getText(), this._dumpToken(parameter.questionToken), this._dumpType(parameter.type));
    }
    _dumpTypeParameter(typeParameter) {
        return typescript_1.default.createTypeParameterDeclaration(typeParameter.name.getText(), this._dumpType(typeParameter.constraint), this._dumpType(typeParameter.default));
    }
    _dumpTypeParameterArray(typeParameters) {
        const lambda = (tp) => this._copyComments(tp, (this._dumpTypeParameter(tp)));
        if (Array.isArray(typeParameters)) {
            return typeParameters.map(lambda);
        }
        else if (typeParameters) {
            return typeParameters.map(lambda);
        }
        else {
            return undefined;
        }
    }
    _dumpClassDeclaration(classDeclaration, symbol, newName) {
        const classElements = [];
        // console.log(`Dump class ${newName}`);
        for (const element of classDeclaration.members) {
            // const name = typeof element.name === 'string' ? typeof element.name :
            //     (element.name ? element.name.getText() : '');
            // console.log(`  Dump member ${name}`);
            if (typescript_1.default.isMethodDeclaration(element)) {
                classElements.push(this._dumpMethodDeclaration(element));
            }
            else if (typescript_1.default.isPropertyDeclaration(element)) {
                classElements.push(this._dumpPropertyDeclaration(element));
            }
        }
        return typescript_1.default.createClassDeclaration(undefined, this._dumpModifiers(classDeclaration), newName, this._dumpTypeParameterArray(classDeclaration.typeParameters), this._dumpHeritageClauses(classDeclaration.heritageClauses), classElements);
    }
    _dumpInterfaceDeclaration(interfaceDeclaration, symbol, newName) {
        return typescript_1.default.createInterfaceDeclaration(undefined, this._dumpModifiers(interfaceDeclaration), newName, this._dumpTypeParameterArray(interfaceDeclaration.typeParameters), this._dumpHeritageClauses(interfaceDeclaration.heritageClauses), this._dumpTypeElements(interfaceDeclaration.members));
    }
    _dumpTypeElement(typeElement) {
        if (typescript_1.default.isMethodSignature(typeElement)) {
            return this._dumpMethodSignature(typeElement);
        }
        else if (typescript_1.default.isPropertySignature(typeElement)) {
            return this._dumpPropertySignature(typeElement);
        }
    }
    _dumpTypeElements(typeElements) {
        const result = [];
        for (const typeElement of typeElements) {
            const d = this._dumpTypeElement(typeElement);
            if (d) {
                result.push(d);
            }
        }
        return result;
    }
    _dumpHeritageClause(heritageClause) {
        const validClauses = [];
        for (const type of heritageClause.types) {
            const exprSymbol = this._typeChecker.getSymbolAtLocation(type.expression);
            let exprType;
            if (exprSymbol) {
                const exprSymbolInf = this._getInf(exprSymbol);
                if (exprSymbolInf) {
                    exprType = typescript_1.default.createIdentifier(this._resolveSymbolPath(exprSymbolInf));
                }
            }
            if (!exprType) {
                exprType = typescript_1.default.createIdentifier(type.expression.getText());
            }
            validClauses.push(typescript_1.default.createExpressionWithTypeArguments(type.typeArguments ? type.typeArguments.map((ta) => this._dumpType(ta)) : undefined, exprType));
        }
        return typescript_1.default.createHeritageClause(heritageClause.token, validClauses);
    }
    _dumpHeritageClauses(heritageClauses) {
        if (!heritageClauses) {
            return undefined;
        }
        const lambda = (heritageClause) => this._dumpHeritageClause(heritageClause);
        if (Array.isArray(heritageClauses)) {
            return heritageClauses.map(lambda);
        }
        else {
            return heritageClauses.map(lambda);
        }
    }
    _dumpEnumDeclaration(enumDeclaration, symbol, newName) {
        return typescript_1.default.createEnumDeclaration(undefined, this._dumpModifiers(enumDeclaration), newName, enumDeclaration.members.map((enumerator) => {
            return typescript_1.default.createEnumMember(enumerator.name.getText(), undefined);
        }));
    }
    _dumpTypeAliasDeclaration(typeAliasDeclaration, symbol, newName) {
        return typescript_1.default.createTypeAliasDeclaration(undefined, this._dumpModifiers(typeAliasDeclaration), newName, this._dumpTypeParameterArray(typeAliasDeclaration.typeParameters), this._dumpType(typeAliasDeclaration.type));
    }
    _dumpModifiers(declaration) {
        if (!declaration.modifiers) {
            return undefined;
        }
        const result = [];
        for (const modifier of declaration.modifiers) {
            if (modifier.kind !== typescript_1.default.SyntaxKind.DefaultKeyword) {
                result.push(modifier);
            }
        }
        return result;
    }
    _dumpType(type) {
        if (!type) {
            return undefined;
        }
        const fallthrough = () => {
            return typescript_1.default.createTypeReferenceNode(type.getText(), undefined);
        };
        if (typescript_1.default.isTypeReferenceNode(type)) {
            const symbol = this._typeChecker.getSymbolAtLocation(type.typeName);
            if (!symbol) {
                return fallthrough();
            }
            const inf = this._getInf(symbol);
            const mainTypeName = inf ? this._resolveSymbolPath(inf) : type.typeName.getText();
            return typescript_1.default.createTypeReferenceNode(mainTypeName, type.typeArguments ?
                type.typeArguments.map((ta) => this._dumpType(ta)) : undefined);
        }
        else if (typescript_1.isUnionTypeNode(type)) {
            return typescript_1.default.createUnionTypeNode(type.types.map((t) => this._dumpType(t)));
        }
        else if (typescript_1.default.isTypeLiteralNode(type)) {
            return typescript_1.default.createTypeLiteralNode(this._dumpTypeElements(type.members));
        }
        else if (typescript_1.default.isArrayTypeNode(type)) {
            return typescript_1.default.createArrayTypeNode(this._dumpType(type.elementType));
        }
        else if (typescript_1.default.isParenthesizedTypeNode(type)) {
            return typescript_1.default.createParenthesizedType(this._dumpType(type.type));
        }
        else if (typescript_1.default.isTypeQueryNode(type)) {
            // Note: Only support typeof identifer.
            if (typescript_1.default.isIdentifier(type.exprName)) {
                const symbol = this._typeChecker.getSymbolAtLocation(type.exprName);
                if (symbol) {
                    const inf = this._getInf(symbol);
                    if (inf) {
                        const name = this._resolveSymbolPath(inf);
                        return typescript_1.default.createTypeQueryNode(typescript_1.default.createIdentifier(name));
                    }
                }
            }
        }
        else if (typescript_1.default.isTypeOperatorNode(type)) {
            return typescript_1.default.createTypeOperatorNode(this._dumpType(type.type));
        }
        else if (typescript_1.default.isFunctionTypeNode(type)) {
            return typescript_1.default.createFunctionTypeNode(this._dumpTypeParameterArray(type.typeParameters), type.parameters.map((p) => this._dumpParameter(p)), this._dumpType(type.type));
        }
        else if (typescript_1.default.isConstructorTypeNode(type)) {
            return typescript_1.default.createConstructorTypeNode(this._dumpTypeParameterArray(type.typeParameters), type.parameters.map((p) => this._dumpParameter(p)), this._dumpType(type.type));
        }
        else if (typescript_1.default.isImportTypeNode(type)) {
            const typetype = this._typeChecker.getTypeAtLocation(type);
            if (typetype) {
                const symbol = typetype.symbol;
                if (symbol) {
                    const inf = this._getInf(symbol);
                    if (inf) {
                        const mainTypeName = this._resolveSymbolPath(inf);
                        return typescript_1.default.createTypeReferenceNode(mainTypeName, type.typeArguments ? type.typeArguments.map((ta) => this._dumpType(ta)) : undefined);
                    }
                }
            }
        }
        else if (typescript_1.default.isIntersectionTypeNode(type)) {
            return typescript_1.default.createIntersectionTypeNode(type.types.map((t) => this._dumpType(t)));
        }
        return type ? typescript_1.default.createTypeReferenceNode(type.getText(), undefined) : undefined;
    }
    _dumpToken(token) {
        return token ? typescript_1.default.createToken(token.kind) : undefined;
    }
    _getInf(symbol) {
        if (symbol.flags & typescript_1.default.SymbolFlags.TypeParameter) {
            return null;
        }
        let originalSymbol = symbol;
        if (originalSymbol.flags & typescript_1.default.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(originalSymbol);
        }
        let inf = this._pass1Result.map.get(originalSymbol) || null;
        if (!inf) {
            console.warn(`Found symbol ${originalSymbol.name} not exported.`);
            inf = this._getUnexported(originalSymbol);
        }
        return inf;
    }
    _getUnexported(symbol) {
        let inf = this._unexportedSymbolsDetail.map.get(symbol);
        if (inf === undefined) {
            inf = this._dumpUnexported(symbol);
        }
        return inf;
    }
    _dumpUnexported(symbol) {
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
        this._scopeStack = [this._shelterName];
        const result = {
            name,
            symbol,
            fullPrefix: [this._shelterName],
        };
        this._unexportedSymbolsDetail.map.set(symbol, result);
        if (declaration0.kind === typescript_1.default.SyntaxKind.ModuleDeclaration) {
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
    _getModuleSymbol(declaration) {
        let cur = declaration;
        while (!typescript_1.default.isSourceFile(cur)) {
            if (typescript_1.default.isModuleDeclaration(cur)) {
                return this._typeChecker.getSymbolAtLocation(cur.name) || null;
            }
            cur = cur.parent;
        }
        return null;
    }
    _resolveSymbolPath(to) {
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
function printSymbol(symbol) {
    const declaration = symbol.valueDeclaration || ((symbol.declarations !== undefined && symbol.declarations.length !== 0) ? symbol.declarations[0] : null);
    console.log(`[[${symbol.name}]], \n` +
        `  ${declaration ? printNode(declaration) : '!!NO-DECLARATION!!'}, \n` +
        `  ${printSymbolFlags(symbol.flags)}`);
}
function printSymbolFlags(flags) {
    const satisfies = [];
    for (const key of Object.keys(typescript_1.default.SymbolFlags)) {
        if (typeof key === 'string') {
            const value = typescript_1.default.SymbolFlags[key];
            if (flags & value) {
                satisfies.push(key);
            }
        }
    }
    return satisfies.join(',');
}
function printNode(node) {
    return `Syntax Kind: ${typescript_1.default.SyntaxKind[node.kind]}`;
}
//# sourceMappingURL=gift.js.map