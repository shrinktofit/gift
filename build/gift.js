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
exports.bundle = bundle;
class BundleGenerator {
    constructor(options) {
        this._exportedSymbols = {
            map: new Map(),
        };
        this._unexportedSymbolsDetail = {
            map: new Map(),
            pending: new Array(),
        };
        this._scopeStack = [];
        this._referencedSourceFiles = new Set();
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
        const rootModuleSymbolInf = this._collectExportedSymbols(rootModule, '');
        this._completePath(rootModuleSymbolInf);
        const bundledRootModule = this._emitExportedSymbol(rootModuleSymbolInf, true);
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
        if (this._options.verbose) {
            console.log(`Referenced source files:[`);
            for (const referencedSourceFile of this._referencedSourceFiles) {
                console.log(`  ${referencedSourceFile.fileName},`);
            }
            console.log(`]`);
        }
        const lines = [];
        const typeReferencePaths = [];
        if (rootModule.declarations && rootModule.declarations.length !== 0) {
            const declaration0 = rootModule.declarations[0];
            const rootSourceFile = declaration0.getSourceFile();
            const resolvedTypeReferenceDirectives = this._program.getResolvedTypeReferenceDirectives();
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
        const statementsArray = typescript_1.default.createNodeArray(statements);
        const result = printer.printList(typescript_1.default.ListFormat.None, statementsArray, sourceFile);
        lines.push(result);
        const code = lines.join('\n');
        return { error: GiftErrors.Ok, code, typeReferencePaths };
    }
    _collectExportedSymbols(symbol, name) {
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
            if (originalSymbol === symbol) {
                console.error(`Symbol [[${symbol.name}]] has no declaration.`);
            }
            else {
                console.error(`Aliasing symbol of ${symbol.name}, ` +
                    `which is ${originalSymbol.name}, ` +
                    `has no declaration.`);
            }
            return result;
        }
        for (const declaration of originalSymbol.declarations) {
            if (declaration.kind === typescript_1.default.SyntaxKind.ModuleDeclaration) {
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
    _emitExportedSymbol(symbolInf, topLevel) {
        const symbol = symbolInf.symbol;
        if (!symbol.declarations || symbol.declarations.length === 0) {
            return null;
        }
        const result = [];
        for (const declaration of symbol.declarations) {
            if (declaration.kind === typescript_1.default.SyntaxKind.ModuleDeclaration) {
                const dumpedModuleDeclaration = this._remakeModuleDeclaration(symbolInf, topLevel);
                if (dumpedModuleDeclaration) {
                    result.push(...dumpedModuleDeclaration);
                }
            }
            else {
                const dumpedDeclaration = this._remakeDeclaration(declaration, symbol, symbolInf.name);
                if (dumpedDeclaration) {
                    result.push(dumpedDeclaration);
                }
            }
        }
        return result;
    }
    _remakeModuleDeclaration(symbolInf, topLevel) {
        if (!symbolInf.children) {
            return null;
        }
        const statements = [];
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
    _remakeDeclaration(declaration, symbol, newName) {
        const result = this._remakeDeclarationNoComment(declaration, symbol, newName);
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
    _remakeDeclarationNoComment(declaration, symbol, newName) {
        if (typescript_1.default.isClassDeclaration(declaration)) {
            return this._remakeClassDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isFunctionDeclaration(declaration)) {
            return this._remakeFunctionDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isInterfaceDeclaration(declaration)) {
            return this._remakeInterfaceDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isEnumDeclaration(declaration)) {
            return this._remakeEnumDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isTypeAliasDeclaration(declaration)) {
            return this._remakeTypeAliasDeclaration(declaration, symbol, newName);
        }
        else if (typescript_1.default.isVariableDeclaration(declaration)) {
            return this._remakeVariableDeclaration(declaration, symbol, newName);
        }
        return null;
    }
    _remakeFunctionDeclaration(functionDeclaration, symbol, newName) {
        return typescript_1.default.createFunctionDeclaration(undefined, this._remakeModifiers(functionDeclaration), functionDeclaration.asteriskToken, newName, this._remakeTypeParameterArray(functionDeclaration.typeParameters), functionDeclaration.parameters.map((p) => this._remakeParameter(p)), this._remakeType(functionDeclaration.type), undefined);
    }
    _remakeVariableDeclaration(variableDeclaration, symbol, newName) {
        return typescript_1.default.createVariableStatement(this._remakeModifiers(variableDeclaration.parent), [typescript_1.default.createVariableDeclaration(newName, this._remakeType(variableDeclaration.type))]);
    }
    _remakePropertySignature(propertySignature) {
        return this._copyComments(propertySignature, typescript_1.default.createPropertySignature(undefined, this._remakePropertyName(propertySignature.name), this._remakeToken(propertySignature.questionToken), this._remakeType(propertySignature.type), undefined));
    }
    _remakeMethodSignature(methodSignature) {
        return this._copyComments(methodSignature, typescript_1.default.createMethodSignature(this._remakeTypeParameterArray(methodSignature.typeParameters), methodSignature.parameters.map((p) => this._remakeParameter(p)), this._remakeType(methodSignature.type), this._remakePropertyName(methodSignature.name), this._remakeToken(methodSignature.questionToken)));
    }
    _remakePropertyDeclaration(propertyDeclaration) {
        return this._copyComments(propertyDeclaration, typescript_1.default.createProperty(undefined, this._remakeModifiers(propertyDeclaration), this._remakePropertyName(propertyDeclaration.name), this._remakeToken(propertyDeclaration.questionToken), this._remakeType(propertyDeclaration.type), undefined));
    }
    _remakeMethodDeclaration(methodDeclaration) {
        return this._copyComments(methodDeclaration, (typescript_1.default.createMethod(undefined, this._remakeModifiers(methodDeclaration), this._remakeToken(methodDeclaration.asteriskToken), this._remakePropertyName(methodDeclaration.name), this._remakeToken(methodDeclaration.questionToken), this._remakeTypeParameterArray(methodDeclaration.typeParameters), methodDeclaration.parameters.map((p) => this._remakeParameter(p)), this._remakeType(methodDeclaration.type), undefined)));
    }
    _remakeConstructorDeclaration(constructorDeclaration) {
        return this._copyComments(constructorDeclaration, (typescript_1.default.createConstructor(undefined, this._remakeModifiers(constructorDeclaration), constructorDeclaration.parameters.map((p) => this._remakeParameter(p)), undefined)));
    }
    _remakeParameter(parameter) {
        return typescript_1.default.createParameter(undefined, this._remakeModifiers(parameter), this._remakeToken(parameter.dotDotDotToken), parameter.name.getText(), this._remakeToken(parameter.questionToken), this._remakeType(parameter.type));
    }
    _remakeTypeParameter(typeParameter) {
        return typescript_1.default.createTypeParameterDeclaration(typeParameter.name.getText(), this._remakeType(typeParameter.constraint), this._remakeType(typeParameter.default));
    }
    _remakeTypeParameterArray(typeParameters) {
        const lambda = (tp) => this._copyComments(tp, (this._remakeTypeParameter(tp)));
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
    _remakeClassDeclaration(classDeclaration, symbol, newName) {
        const classElements = [];
        // console.log(`Dump class ${newName}`);
        for (const element of classDeclaration.members) {
            if (!this._options.exportPrivates && this._isPrivateMember(element)) {
                continue;
            }
            // const name = typeof element.name === 'string' ? typeof element.name :
            //     (element.name ? element.name.getText() : '');
            // console.log(`  Dump member ${name}`);
            if (typescript_1.default.isMethodDeclaration(element)) {
                classElements.push(this._remakeMethodDeclaration(element));
            }
            else if (typescript_1.default.isConstructorDeclaration(element)) {
                classElements.push(this._remakeConstructorDeclaration(element));
            }
            else if (typescript_1.default.isPropertyDeclaration(element)) {
                classElements.push(this._remakePropertyDeclaration(element));
            }
        }
        return typescript_1.default.createClassDeclaration(undefined, this._remakeModifiers(classDeclaration), newName, this._remakeTypeParameterArray(classDeclaration.typeParameters), this._remakeHeritageClauses(classDeclaration.heritageClauses), classElements);
    }
    _isPrivateMember(classElement) {
        if (!classElement.modifiers) {
            return false;
        }
        return classElement.modifiers.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.PrivateKeyword);
    }
    _remakeInterfaceDeclaration(interfaceDeclaration, symbol, newName) {
        return typescript_1.default.createInterfaceDeclaration(undefined, this._remakeModifiers(interfaceDeclaration), newName, this._remakeTypeParameterArray(interfaceDeclaration.typeParameters), this._remakeHeritageClauses(interfaceDeclaration.heritageClauses), this._remakeTypeElements(interfaceDeclaration.members));
    }
    _remakeTypeElement(typeElement) {
        if (typescript_1.default.isMethodSignature(typeElement)) {
            return this._remakeMethodSignature(typeElement);
        }
        else if (typescript_1.default.isPropertySignature(typeElement)) {
            return this._remakePropertySignature(typeElement);
        }
    }
    _remakeTypeElements(typeElements) {
        const result = [];
        for (const typeElement of typeElements) {
            const d = this._remakeTypeElement(typeElement);
            if (d) {
                result.push(d);
            }
        }
        return result;
    }
    _remakeHeritageClause(heritageClause) {
        const validClauses = [];
        for (const type of heritageClause.types) {
            validClauses.push(typescript_1.default.createExpressionWithTypeArguments(type.typeArguments ? type.typeArguments.map((ta) => this._remakeType(ta)) : undefined, this._remakeExpression(type.expression)));
        }
        return typescript_1.default.createHeritageClause(heritageClause.token, validClauses);
    }
    _remakeHeritageClauses(heritageClauses) {
        if (!heritageClauses) {
            return undefined;
        }
        const lambda = (heritageClause) => this._remakeHeritageClause(heritageClause);
        if (Array.isArray(heritageClauses)) {
            return heritageClauses.map(lambda);
        }
        else {
            return heritageClauses.map(lambda);
        }
    }
    _remakeEnumDeclaration(enumDeclaration, symbol, newName) {
        return typescript_1.default.createEnumDeclaration(undefined, this._remakeModifiers(enumDeclaration), newName, enumDeclaration.members.map((enumerator) => {
            return typescript_1.default.createEnumMember(enumerator.name.getText(), this._remakeExpression(enumerator.initializer));
        }));
    }
    _remakeTypeAliasDeclaration(typeAliasDeclaration, symbol, newName) {
        return typescript_1.default.createTypeAliasDeclaration(undefined, this._remakeModifiers(typeAliasDeclaration), newName, this._remakeTypeParameterArray(typeAliasDeclaration.typeParameters), this._remakeType(typeAliasDeclaration.type));
    }
    _remakeModifiers(declaration) {
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
    _remakeType(type) {
        if (!type) {
            return undefined;
        }
        const fallthrough = () => {
            return typescript_1.default.createTypeReferenceNode(type.getText(), undefined);
        };
        switch (type.kind) {
            case typescript_1.default.SyntaxKind.NumberKeyword:
            case typescript_1.default.SyntaxKind.BooleanKeyword:
            case typescript_1.default.SyntaxKind.StringKeyword:
            case typescript_1.default.SyntaxKind.VoidKeyword:
            case typescript_1.default.SyntaxKind.AnyKeyword:
            case typescript_1.default.SyntaxKind.NullKeyword:
            case typescript_1.default.SyntaxKind.NeverKeyword:
            case typescript_1.default.SyntaxKind.ObjectKeyword:
            case typescript_1.default.SyntaxKind.SymbolKeyword:
            case typescript_1.default.SyntaxKind.UndefinedKeyword:
            case typescript_1.default.SyntaxKind.UnknownKeyword:
            case typescript_1.default.SyntaxKind.BigIntKeyword:
                // case ts.SyntaxKind.ThisKeyword:
                return typescript_1.default.createKeywordTypeNode(type.kind);
        }
        if (typescript_1.default.isTypeReferenceNode(type)) {
            return typescript_1.default.createTypeReferenceNode(this._remakeEntityName(type.typeName), type.typeArguments ?
                type.typeArguments.map((ta) => this._remakeType(ta)) : undefined);
        }
        else if (typescript_1.isUnionTypeNode(type)) {
            return typescript_1.default.createUnionTypeNode(type.types.map((t) => this._remakeType(t)));
        }
        else if (typescript_1.default.isTypeLiteralNode(type)) {
            return typescript_1.default.createTypeLiteralNode(this._remakeTypeElements(type.members));
        }
        else if (typescript_1.default.isArrayTypeNode(type)) {
            return typescript_1.default.createArrayTypeNode(this._remakeType(type.elementType));
        }
        else if (typescript_1.default.isParenthesizedTypeNode(type)) {
            return typescript_1.default.createParenthesizedType(this._remakeType(type.type));
        }
        else if (typescript_1.default.isTypeQueryNode(type)) {
            return typescript_1.default.createTypeQueryNode(this._remakeEntityName(type.exprName));
        }
        else if (typescript_1.default.isTypeOperatorNode(type)) {
            return typescript_1.default.createTypeOperatorNode(this._remakeType(type.type));
        }
        else if (typescript_1.default.isFunctionTypeNode(type)) {
            return typescript_1.default.createFunctionTypeNode(this._remakeTypeParameterArray(type.typeParameters), type.parameters.map((p) => this._remakeParameter(p)), this._remakeType(type.type));
        }
        else if (typescript_1.default.isConstructorTypeNode(type)) {
            return typescript_1.default.createConstructorTypeNode(this._remakeTypeParameterArray(type.typeParameters), type.parameters.map((p) => this._remakeParameter(p)), this._remakeType(type.type));
        }
        else if (typescript_1.default.isImportTypeNode(type)) {
            let symbol;
            const typetype = this._typeChecker.getTypeAtLocation(type);
            if (typetype) {
                symbol = typetype.symbol;
            }
            if (!symbol) {
                console.warn(`Failed to resolve type ${type.getText()}, There is no symbol info.`);
                if (this._typeChecker.getSymbolAtLocation(type.argument)) {
                    console.warn(`BTW`);
                }
            }
            else {
                const inf = this._getInf(symbol);
                if (inf) {
                    const mainTypeName = this._resolveSymbolPath(inf);
                    return typescript_1.default.createTypeReferenceNode(mainTypeName, type.typeArguments ? type.typeArguments.map((ta) => this._remakeType(ta)) : undefined);
                }
            }
        }
        else if (typescript_1.default.isIntersectionTypeNode(type)) {
            return typescript_1.default.createIntersectionTypeNode(type.types.map((t) => this._remakeType(t)));
        }
        else if (typescript_1.default.isIndexedAccessTypeNode(type)) {
            return typescript_1.default.createIndexedAccessTypeNode(this._remakeType(type.objectType), this._remakeType(type.indexType));
        }
        else if (typescript_1.default.isThisTypeNode(type)) {
            return typescript_1.default.createThisTypeNode();
        }
        else if (typescript_1.default.isTypePredicateNode(type)) {
            const dumpedParameterName = typescript_1.default.isIdentifier(type.parameterName) ?
                this._remakeIdentifier(type.parameterName) : typescript_1.default.createThisTypeNode();
            return typescript_1.default.createTypePredicateNode(dumpedParameterName, this._remakeType(type.type));
        }
        else if (typescript_1.default.isConditionalTypeNode(type)) {
            return typescript_1.default.createConditionalTypeNode(this._remakeType(type.checkType), this._remakeType(type.extendsType), this._remakeType(type.trueType), this._remakeType(type.falseType));
        }
        else if (typescript_1.default.isTupleTypeNode(type)) {
            return typescript_1.default.createTupleTypeNode(type.elementTypes.map((elementType) => this._remakeType(elementType)));
        }
        else if (typescript_1.default.isLiteralTypeNode(type)) {
            const literal = type.literal;
            let dumpedLiteral;
            if (typescript_1.default.isStringLiteral(literal)) {
                dumpedLiteral = typescript_1.default.createStringLiteral(literal.text);
            }
            else if (literal.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
                dumpedLiteral = typescript_1.default.createTrue();
            }
            else if (literal.kind === typescript_1.default.SyntaxKind.FalseKeyword) {
                dumpedLiteral = typescript_1.default.createFalse();
            }
            else if (typescript_1.default.isNumericLiteral(literal)) {
                dumpedLiteral = typescript_1.default.createNumericLiteral(literal.text);
            }
            else if (typescript_1.default.isBigIntLiteral(literal)) {
                dumpedLiteral = typescript_1.default.createBigIntLiteral(literal.text);
            }
            else if (typescript_1.default.isRegularExpressionLiteral(literal)) {
                dumpedLiteral = typescript_1.default.createRegularExpressionLiteral(literal.text);
            }
            else if (typescript_1.default.isNoSubstitutionTemplateLiteral(literal)) {
                dumpedLiteral = typescript_1.default.createNoSubstitutionTemplateLiteral(literal.text);
            }
            else if (typescript_1.default.isPrefixUnaryExpression(literal)) {
                dumpedLiteral = typescript_1.default.createPrefix(literal.operator, this._remakeExpression(literal.operand));
            }
            else {
                console.warn(`Don't know how to handle literal type ${type.getText()}(${printNode(type)})`);
            }
            if (dumpedLiteral) {
                return typescript_1.default.createLiteralTypeNode(dumpedLiteral);
            }
        }
        else {
            console.warn(`Don't know how to handle type ${type.getText()}(${printNode(type)})`);
        }
        return type ? typescript_1.default.createTypeReferenceNode(type.getText(), undefined) : undefined;
    }
    _remakeToken(token) {
        return token ? typescript_1.default.createToken(token.kind) : undefined;
    }
    _remakeEntityName(name) {
        const identifiers = [];
        while (typescript_1.default.isQualifiedName(name)) {
            identifiers.unshift(name.right);
            name = name.left;
        }
        identifiers.unshift(name);
        let result = null;
        for (const id of identifiers) {
            const newID = typescript_1.default.createIdentifier(this._getDumpedNameOfSymbolAt(id));
            if (!result) {
                result = newID;
            }
            else {
                result = typescript_1.default.createQualifiedName(result, newID);
            }
        }
        return result;
    }
    _remakePropertyName(propertyName) {
        if (typescript_1.default.isIdentifier(propertyName)) {
            return typescript_1.default.createIdentifier(propertyName.text);
        }
        else if (typescript_1.default.isStringLiteral(propertyName)) {
            return typescript_1.default.createStringLiteral(propertyName.text);
        }
        else if (typescript_1.default.isNumericLiteral(propertyName)) {
            return typescript_1.default.createNumericLiteral(propertyName.text);
        }
        else {
            return typescript_1.default.createComputedPropertyName(this._remakeExpression(propertyName.expression));
        }
    }
    _remakeBooleanLiteral(node) {
        return typescript_1.default.createToken(node.kind);
    }
    _remakeStringLiteral(node) {
        return typescript_1.default.createStringLiteral(node.text);
    }
    // Only literals are supported
    _remakeExpression(expression) {
        if (!expression) {
            return undefined;
        }
        if (typescript_1.default.isStringLiteral(expression)) {
            return typescript_1.default.createStringLiteral(expression.text);
        }
        else if (typescript_1.default.isNumericLiteral(expression)) {
            return typescript_1.default.createNumericLiteral(expression.text);
        }
        else if (expression.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
            return typescript_1.default.createTrue();
        }
        else if (expression.kind === typescript_1.default.SyntaxKind.FalseKeyword) {
            return typescript_1.default.createFalse();
        }
        else if (expression.kind === typescript_1.default.SyntaxKind.NullKeyword) {
            return typescript_1.default.createNull();
        }
        else if (typescript_1.default.isIdentifier(expression)) {
            return this._remakeIdentifier(expression);
        }
        else if (typescript_1.default.isPropertyAccessExpression(expression)) {
            return typescript_1.default.createPropertyAccess(this._remakeExpression(expression.expression), this._remakeIdentifier(expression.name));
        }
        else {
            return typescript_1.default.createStringLiteral(`Bad expression <${expression.getText()}>`);
        }
    }
    _remakeIdentifier(id) {
        return typescript_1.default.createIdentifier(this._getDumpedNameOfSymbolAt(id));
    }
    _getDumpedNameOfSymbolAt(node) {
        const symbolInf = this._getSymbolInfAt(node);
        if (symbolInf) {
            return this._resolveSymbolPath(symbolInf);
        }
        else {
            return node.getText();
        }
    }
    _getSymbolInfAt(node) {
        const symbol = this._typeChecker.getSymbolAtLocation(node);
        if (!symbol) {
            return null;
        }
        return this._getInf(symbol);
    }
    _getInf(symbol) {
        // TODO: import * as xx from 'xx';
        // xx's Inf
        let originalSymbol = symbol;
        if (originalSymbol.flags & typescript_1.default.SymbolFlags.Alias) {
            originalSymbol = this._typeChecker.getAliasedSymbol(originalSymbol);
        }
        if (originalSymbol.flags & typescript_1.default.SymbolFlags.TypeParameter ||
            originalSymbol.flags & typescript_1.default.SymbolFlags.EnumMember) {
            return null;
        }
        if (originalSymbol.flags & typescript_1.default.SymbolFlags.ModuleMember) {
            const declaration = originalSymbol.valueDeclaration ||
                (originalSymbol.declarations && originalSymbol.declarations.length > 0 ?
                    originalSymbol.declarations[0] : null);
            if (declaration) {
                this._referencedSourceFiles.add(declaration.getSourceFile());
                let isTopLevelModuleMember = false;
                if (typescript_1.default.isModuleDeclaration(declaration.parent) &&
                    typescript_1.default.isSourceFile(declaration.parent.parent)) {
                    isTopLevelModuleMember = true;
                }
                else if (typescript_1.default.isModuleBlock(declaration.parent) &&
                    typescript_1.default.isSourceFile(declaration.parent.parent.parent)) {
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
    _getUnexported(symbol) {
        let inf = this._unexportedSymbolsDetail.map.get(symbol);
        if (inf === undefined) {
            inf = this._remakeUnexported(symbol);
        }
        return inf;
    }
    _remakeUnexported(symbol) {
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
        const decls = this._emitExportedSymbol(result);
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