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
        this._rootUnexportedDirectory = {
            name: this._shelterName,
            parent: null,
            statements: [],
        };
        this._tsCompilerOptions = {
            rootDir: path.dirname(options.input),
        };
        this._program = typescript_1.default.createProgram({
            rootNames: [options.input],
            options: this._tsCompilerOptions,
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
            return {
                error: GiftErrors.Fatal
            };
        }
        const statements = [
            ...bundledRootModule,
        ];
        // const rootModuleStatements = this._remakeExportsOfModule(rootModule.declarations[0] as ts.ModuleDeclaration, true);
        // const unexportedNs = this._createDeclarationForUnexportedModuleRegistry(this._rootUnexportedDirectory, this._shelterName);
        // const newRootModule = ts.createModuleDeclaration(
        //     undefined,
        //     [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
        //     ts.createStringLiteral(this._options.name),
        //     ts.createModuleBlock(rootModuleStatements.concat([unexportedNs])),
        // );
        // const statements: ts.Statement[] = [ newRootModule ];
        return this._emit(outputPath, statements, rootModule);
    }
    _emit(outputPath, statements, rootModule) {
        if (this._options.verbose) {
            console.log(`Referenced source files:[`);
            for (const referencedSourceFile of this._referencedSourceFiles) {
                console.log(`  ${referencedSourceFile.fileName},`);
            }
            console.log(`]`);
        }
        const printer = typescript_1.default.createPrinter({
            newLine: typescript_1.default.NewLineKind.LineFeed,
        });
        const sourceFile = typescript_1.default.createSourceFile(path.basename(outputPath), '', typescript_1.default.ScriptTarget.Latest, false, typescript_1.default.ScriptKind.TS);
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
        //         const expandTypeReferenceDirectives: Record<string, string> = {};
        //         const copyTypeReferenceDirectives: string[] = [];
        //         const typeReferencePaths: string[] = [];
        //         if (rootModule.declarations && rootModule.declarations.length !== 0) {
        //             const declaration0 = rootModule.declarations[0];
        //             const indexSourceFile = declaration0.getSourceFile();
        //             const indexSourceFileName = indexSourceFile.fileName;
        //             for (const typeReferenceDirective of indexSourceFile.typeReferenceDirectives) {
        //                 const resolveResult = ts.resolveTypeReferenceDirective(
        //                     typeReferenceDirective.fileName,
        //                     indexSourceFileName,
        //                     this._tsCompilerOptions, {
        //                         fileExists: ts.sys.fileExists,
        //                         readFile: ts.sys.readFile,
        //                     });
        //                 if (!resolveResult.resolvedTypeReferenceDirective ||
        //                     resolveResult.resolvedTypeReferenceDirective.packageId ||
        //                     resolveResult.resolvedTypeReferenceDirective.primary ||
        //                     resolveResult.resolvedTypeReferenceDirective.isExternalLibraryImport ||
        //                     !resolveResult.resolvedTypeReferenceDirective.resolvedFileName) {
        //                     copyTypeReferenceDirectives.push(typeReferenceDirective.fileName);
        //                 } else {
        //                     expandTypeReferenceDirectives[typeReferenceDirective.fileName] = resolveResult.resolvedTypeReferenceDirective.resolvedFileName;
        //                 }
        //             }
        //         }
        //         const lines: string[] = [];
        //         for (const trd of copyTypeReferenceDirectives) {
        //             lines.push(`/// <reference types="${trd}"/>`);
        //         }
        //         const statementsArray = ts.createNodeArray(statements);
        //         const result = printer.printList(ts.ListFormat.None, statementsArray, sourceFile);
        //         lines.push(result);
        //         for (const trd of Object.keys(expandTypeReferenceDirectives)) {
        // //             const referencedSource = fs.readFileSync(expandTypeReferenceDirectives[trd]).toString();
        // //             lines.push(`
        // // /// Included from type reference directive ${trd}.
        // // ${referencedSource}
        // // `);
        //             typeReferencePaths.push(trd);
        //         }
        const code = lines.join('\n');
        return { error: GiftErrors.Ok, code, typeReferencePaths };
    }
    _remakeExportsOfModule(moduleDeclaration, noDefault) {
        let result = [];
        if (moduleDeclaration.body && typescript_1.default.isModuleBlock(moduleDeclaration.body)) {
            for (const statement of moduleDeclaration.body.statements) {
                const stmt = this._remakeStatement(statement);
                if (Array.isArray(stmt)) {
                    result.push(...stmt);
                }
                else if (stmt) {
                    result.push(stmt);
                }
            }
        }
        return result;
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
                console.error(`Symbol [[${symbol.name}]] has no declaration, flags: ${symbol.getFlags()}.`);
            }
            else {
                console.error(`Aliasing symbol of ${symbol.name}(flags: ${symbol.getFlags()}), ` +
                    `which is ${originalSymbol.name}(flags: ${originalSymbol.getFlags()}), ` +
                    `has no declaration.`);
            }
            return result;
        }
        if (originalSymbol.declarations.some((declaration) => declaration.kind === typescript_1.default.SyntaxKind.ModuleDeclaration)) {
            const exportedSymbols = this._typeChecker.getExportsOfModule(originalSymbol);
            result.children = result.children || [];
            for (const exportedSymbol of exportedSymbols) {
                if ((exportedSymbol.getFlags() & typescript_1.default.SymbolFlags.Prototype) &&
                    (exportedSymbol.getFlags() & typescript_1.default.SymbolFlags.Property)) {
                    // A symbol with both class and namespace declaration
                    // might have a prototype exported symbol, which associates no declarations.
                    continue;
                }
                const child = this._collectExportedSymbols(exportedSymbol, exportedSymbol.name);
                child.parent = result;
                result.children.push(child);
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
            // const unexportedDecls: ts.Statement[] = [];
            // this._scopeStack.push(this._shelterName);
            // for (const unexportedSymbolInf of this._unexportedSymbolsDetail.pending) {
            //     const decl = unexportedSymbolInf.dumpedDeclarations;
            //     if (decl) {
            //         unexportedDecls.push(...decl);
            //     }
            // }
            // this._scopeStack.pop();
            // const unexportedNs = ts.createModuleDeclaration(
            //     undefined,
            //     undefined,
            //     ts.createIdentifier(this._shelterName),
            //     ts.createModuleBlock(unexportedDecls),
            //     ts.NodeFlags.Namespace,
            // );
            const unexportedNs = this._createDeclarationForUnexportedModuleRegistry(this._rootUnexportedDirectory, this._shelterName);
            const moduleDeclaration = typescript_1.default.createModuleDeclaration(undefined, [typescript_1.default.createModifier(typescript_1.default.SyntaxKind.DeclareKeyword)], typescript_1.default.createStringLiteral(this._options.name), typescript_1.default.createModuleBlock(statements.concat([unexportedNs])));
            return [moduleDeclaration];
        }
        else {
            if (symbolInf.name === '"cocos/core/utils/array"') {
                debugger;
            }
            const namespaceDeclaration = typescript_1.default.createModuleDeclaration(undefined, undefined, typescript_1.default.createIdentifier(symbolInf.name), typescript_1.default.createModuleBlock(statements), typescript_1.default.NodeFlags.Namespace);
            return [namespaceDeclaration];
        }
    }
    _remakeStatement(statement) {
        if (typescript_1.default.isClassDeclaration(statement)) {
            return !statement.name ? null : this._remakeClassDeclaration(statement, statement.name.text);
        }
        else if (typescript_1.default.isFunctionDeclaration(statement)) {
            return !statement.name ? null : this._remakeFunctionDeclaration(statement, statement.name.text);
        }
        else if (typescript_1.default.isInterfaceDeclaration(statement)) {
            return !statement.name ? null : this._remakeInterfaceDeclaration(statement, statement.name.text);
        }
        else if (typescript_1.default.isEnumDeclaration(statement)) {
            return !statement.name ? null : this._remakeEnumDeclaration(statement, statement.name.text);
        }
        else if (typescript_1.default.isTypeAliasDeclaration(statement)) {
            return !statement.name ? null : this._remakeTypeAliasDeclaration(statement, statement.name.text);
        }
        else if (typescript_1.default.isVariableDeclaration(statement)) {
            return !(statement.name && typescript_1.default.isIdentifier(statement.name)) ? null :
                this._remakeVariableDeclaration(statement, statement.name.text);
        }
        else if (typescript_1.default.isImportDeclaration(statement)) {
            return this._remakeImportDeclaration(statement);
        }
        else {
            return null;
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
        if (typescript_1.default.isVariableDeclaration(src) &&
            typescript_1.default.isVariableDeclarationList(src.parent) &&
            typescript_1.default.isVariableStatement(src.parent.parent)) {
            // https://github.com/microsoft/TypeScript/issues/35620
            return this._copyComments(src.parent.parent, dst);
        }
        const sourceFileText = src.getSourceFile().text;
        typescript_1.default.forEachLeadingCommentRange(sourceFileText, src.pos, (pos, end, kind) => {
            let tex = sourceFileText.substring(pos, end);
            if (tex.startsWith('/*')) {
                tex = tex.substr(2, tex.length - 4);
                tex = tex.split('\n').map((line, lineIndex, lines) => {
                    const noHeadSpace = trimStart(line);
                    if (lineIndex === lines.length - 1 && noHeadSpace.length === 0) {
                        return ' ';
                    }
                    else if (!noHeadSpace.startsWith('*')) {
                        return line;
                    }
                    else if (lineIndex === 0) {
                        return noHeadSpace;
                    }
                    else {
                        return ` ${noHeadSpace}`;
                    }
                }).join('\n');
            }
            else if (tex.startsWith('//')) {
                tex = tex.substr(2);
            }
            typescript_1.default.addSyntheticLeadingComment(dst, kind, tex, true);
        });
        return dst;
    }
    _remakeDeclarationNoComment(declaration, symbol, newName) {
        if (typescript_1.default.isClassDeclaration(declaration)) {
            return this._remakeClassDeclaration(declaration, newName);
        }
        else if (typescript_1.default.isFunctionDeclaration(declaration)) {
            return this._remakeFunctionDeclaration(declaration, newName);
        }
        else if (typescript_1.default.isInterfaceDeclaration(declaration)) {
            return this._remakeInterfaceDeclaration(declaration, newName);
        }
        else if (typescript_1.default.isEnumDeclaration(declaration)) {
            return this._remakeEnumDeclaration(declaration, newName);
        }
        else if (typescript_1.default.isTypeAliasDeclaration(declaration)) {
            return this._remakeTypeAliasDeclaration(declaration, newName);
        }
        else if (typescript_1.default.isVariableDeclaration(declaration)) {
            return this._remakeVariableDeclaration(declaration, newName);
        }
        return null;
    }
    _remakeFunctionDeclaration(functionDeclaration, newName) {
        return typescript_1.default.createFunctionDeclaration(undefined, this._remakeModifiers(functionDeclaration.modifiers), functionDeclaration.asteriskToken, newName, this._remakeTypeParameterArray(functionDeclaration.typeParameters), this._remakeParameterArray(functionDeclaration.parameters), // parameters
        this._remakeTypeNode(functionDeclaration.type), undefined);
    }
    _remakeVariableDeclaration(variableDeclaration, newName) {
        return typescript_1.default.createVariableStatement(this._remakeModifiers(variableDeclaration.modifiers), [typescript_1.default.createVariableDeclaration(newName, this._remakeTypeNode(variableDeclaration.type))]);
    }
    _remakePropertySignature(propertySignature) {
        return this._copyComments(propertySignature, typescript_1.default.createPropertySignature(undefined, this._remakePropertyName(propertySignature.name), this._remakeToken(propertySignature.questionToken), this._remakeTypeNode(propertySignature.type), undefined));
    }
    _remakeMethodSignature(methodSignature) {
        return this._copyComments(methodSignature, typescript_1.default.createMethodSignature(this._remakeTypeParameterArray(methodSignature.typeParameters), this._remakeParameterArray(methodSignature.parameters), // parameters
        this._remakeTypeNode(methodSignature.type), this._remakePropertyName(methodSignature.name), this._remakeToken(methodSignature.questionToken)));
    }
    _remakeIndexSignatureDeclaration(indexSignature) {
        return this._copyComments(indexSignature, typescript_1.default.createIndexSignature(undefined, // decorators
        this._remakeModifiers(indexSignature.modifiers), // modifiers
        this._remakeParameterArray(indexSignature.parameters), // parameters
        this._remakeTypeNode(indexSignature.type) || typescript_1.default.createKeywordTypeNode(typescript_1.default.SyntaxKind.UndefinedKeyword)));
    }
    _remakeCallSignatureDeclaration(callSignature) {
        return this._copyComments(callSignature, typescript_1.default.createCallSignature(this._remakeTypeParameterArray(callSignature.typeParameters), // typeParameters
        this._remakeParameterArray(callSignature.parameters), // parameters
        this._remakeTypeNode(callSignature.type)));
    }
    _remakeConstructorSignatureDeclaration(constructSignature) {
        return this._copyComments(constructSignature, typescript_1.default.createConstructSignature(this._remakeTypeParameterArray(constructSignature.typeParameters), this._remakeParameterArray(constructSignature.parameters), // parameters
        this._remakeTypeNode(constructSignature.type)));
    }
    _remakePropertyDeclaration(propertyDeclaration) {
        return this._copyComments(propertyDeclaration, typescript_1.default.createProperty(undefined, this._remakeModifiers(propertyDeclaration.modifiers), this._remakePropertyName(propertyDeclaration.name), this._remakeToken(propertyDeclaration.questionToken), this._remakeTypeNode(propertyDeclaration.type), undefined));
    }
    _remakeMethodDeclaration(methodDeclaration) {
        return this._copyComments(methodDeclaration, (typescript_1.default.createMethod(undefined, this._remakeModifiers(methodDeclaration.modifiers), this._remakeToken(methodDeclaration.asteriskToken), this._remakePropertyName(methodDeclaration.name), this._remakeToken(methodDeclaration.questionToken), this._remakeTypeParameterArray(methodDeclaration.typeParameters), this._remakeParameterArray(methodDeclaration.parameters), // parameters
        this._remakeTypeNode(methodDeclaration.type), undefined)));
    }
    _remakeConstructorDeclaration(constructorDeclaration) {
        return this._copyComments(constructorDeclaration, (typescript_1.default.createConstructor(undefined, this._remakeModifiers(constructorDeclaration.modifiers), this._remakeParameterArray(constructorDeclaration.parameters), // parameters
        undefined)));
    }
    _remakeParameter(parameter) {
        return typescript_1.default.createParameter(undefined, this._remakeModifiers(parameter.modifiers), this._remakeToken(parameter.dotDotDotToken), parameter.name.getText(), this._remakeToken(parameter.questionToken), this._remakeTypeNode(parameter.type));
    }
    _remakeParameterArray(parameters) {
        const lambda = (p) => this._copyComments(p, (this._remakeParameter(p)));
        if (Array.isArray(parameters)) {
            return parameters.map(lambda);
        }
        else if (parameters) {
            return parameters.map(lambda);
        }
        else {
            return undefined;
        }
    }
    _remakeTypeParameter(typeParameter) {
        return typescript_1.default.createTypeParameterDeclaration(typeParameter.name.getText(), this._remakeTypeNode(typeParameter.constraint), this._remakeTypeNode(typeParameter.default));
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
    _remakeImportDeclaration(importDeclaration) {
        if (!typescript_1.default.isStringLiteral(importDeclaration.moduleSpecifier) ||
            !importDeclaration.importClause) {
            return null;
        }
        const moduleRegistry = this._getOrCreateModuleRegistry(importDeclaration.moduleSpecifier.text);
        const moduleFullName = getModuleRegistryFullNameArray(moduleRegistry);
        const moduleEntity = createEntityName(moduleFullName);
        const { namedBindings } = importDeclaration.importClause;
        if (namedBindings) {
            if (typescript_1.default.isNamespaceImport(namedBindings)) {
                return [typescript_1.default.createVariableStatement(undefined, [typescript_1.default.createVariableDeclaration(typescript_1.default.createIdentifier(namedBindings.name.text), typescript_1.default.createTypeQueryNode(moduleEntity))])];
            }
            else {
                for (const element of namedBindings.elements) {
                }
            }
        }
        return [];
    }
    _remakeExportDeclaration(exportDeclaration) {
        if (exportDeclaration.moduleSpecifier) {
            if (!typescript_1.default.isStringLiteral(exportDeclaration.moduleSpecifier)) {
                return null;
            }
            const moduleRegistry = this._getOrCreateModuleRegistry(exportDeclaration.moduleSpecifier.text);
            const moduleFullName = getModuleRegistryFullNameArray(moduleRegistry);
            const moduleEntity = createEntityName(moduleFullName);
            if (!exportDeclaration.exportClause) {
            }
        }
        return null;
    }
    _remakeClassDeclaration(classDeclaration, newName) {
        var _a;
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
            else if (typescript_1.default.isIndexSignatureDeclaration(element)) {
                classElements.push(this._remakeIndexSignatureDeclaration(element));
            }
            else if (typescript_1.default.isSemicolonClassElement(element)) {
                classElements.push(typescript_1.default.createSemicolonClassElement());
            }
            else if (typescript_1.default.isGetAccessor(element)) {
                // Since TS 3.7
                classElements.push(typescript_1.default.createGetAccessor(undefined, // decorators
                this._remakeModifiers(element.modifiers), // modifiers
                this._remakePropertyName(element.name), // name
                this._remakeParameterArray(element.parameters), // parameters
                this._remakeTypeNode(element.type), // type
                undefined));
            }
            else if (typescript_1.default.isSetAccessor(element)) {
                // Since TS 3.7
                classElements.push(typescript_1.default.createSetAccessor(undefined, // decorators
                this._remakeModifiers(element.modifiers), // modifiers
                this._remakePropertyName(element.name), // name
                this._remakeParameterArray(element.parameters), // parameters
                undefined));
            }
            else {
                console.warn(`Don't know how to handle element ${(_a = element.name) === null || _a === void 0 ? void 0 : _a.getText()} of class ${newName}`);
            }
        }
        return typescript_1.default.createClassDeclaration(undefined, this._remakeModifiers(classDeclaration.modifiers), newName, this._remakeTypeParameterArray(classDeclaration.typeParameters), this._remakeHeritageClauses(classDeclaration.heritageClauses), classElements);
    }
    _isPrivateMember(classElement) {
        if (!classElement.modifiers) {
            return false;
        }
        return classElement.modifiers.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.PrivateKeyword);
    }
    _remakeInterfaceDeclaration(interfaceDeclaration, newName) {
        return typescript_1.default.createInterfaceDeclaration(undefined, this._remakeModifiers(interfaceDeclaration.modifiers), newName, this._remakeTypeParameterArray(interfaceDeclaration.typeParameters), this._remakeHeritageClauses(interfaceDeclaration.heritageClauses), this._remakeTypeElements(interfaceDeclaration.members));
    }
    _remakeTypeElement(typeElement) {
        if (typescript_1.default.isMethodSignature(typeElement)) {
            return this._remakeMethodSignature(typeElement);
        }
        else if (typescript_1.default.isPropertySignature(typeElement)) {
            return this._remakePropertySignature(typeElement);
        }
        else if (typescript_1.default.isIndexSignatureDeclaration(typeElement)) {
            return this._remakeIndexSignatureDeclaration(typeElement);
        }
        else if (typescript_1.default.isCallSignatureDeclaration(typeElement)) {
            return this._remakeCallSignatureDeclaration(typeElement);
        }
        else if (typescript_1.default.isConstructSignatureDeclaration(typeElement)) {
            return this._remakeConstructorSignatureDeclaration(typeElement);
        }
    }
    _remakeTypeElements(typeElements) {
        var _a;
        const result = [];
        for (const typeElement of typeElements) {
            const d = this._remakeTypeElement(typeElement);
            if (d) {
                result.push(d);
            }
            else {
                console.warn(`Don't know how to handle element ${(_a = typeElement.name) === null || _a === void 0 ? void 0 : _a.getText()} of interface`);
            }
        }
        return result;
    }
    _remakeHeritageClause(heritageClause) {
        const validClauses = [];
        for (const type of heritageClause.types) {
            validClauses.push(typescript_1.default.createExpressionWithTypeArguments(type.typeArguments ? type.typeArguments.map((ta) => this._remakeTypeNode(ta)) : undefined, this._remakeExpression(type.expression)));
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
    _remakeEnumDeclaration(enumDeclaration, newName) {
        return typescript_1.default.createEnumDeclaration(undefined, this._remakeModifiers(enumDeclaration.modifiers), newName, enumDeclaration.members.map((enumerator) => {
            return typescript_1.default.createEnumMember(enumerator.name.getText(), this._remakeExpression(enumerator.initializer));
        }));
    }
    _remakeTypeAliasDeclaration(typeAliasDeclaration, newName) {
        return typescript_1.default.createTypeAliasDeclaration(undefined, this._remakeModifiers(typeAliasDeclaration.modifiers), newName, this._remakeTypeParameterArray(typeAliasDeclaration.typeParameters), this._remakeTypeNode(typeAliasDeclaration.type));
    }
    _remakeModifiers(modifiers) {
        if (!modifiers) {
            return undefined;
        }
        const result = [];
        for (const modifier of modifiers) {
            if (modifier.kind !== typescript_1.default.SyntaxKind.DefaultKeyword) {
                result.push(modifier);
            }
        }
        return result;
    }
    _remakeTypeNode(type) {
        if (!type) {
            return undefined;
        }
        // if (type.getText() === 'Pass[]') {
        //     debugger;
        // }
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
                type.typeArguments.map((ta) => this._remakeTypeNode(ta)) : undefined);
        }
        else if (typescript_1.isUnionTypeNode(type)) {
            return typescript_1.default.createUnionTypeNode(type.types.map((t) => this._remakeTypeNode(t)));
        }
        else if (typescript_1.default.isTypeLiteralNode(type)) {
            return typescript_1.default.createTypeLiteralNode(this._remakeTypeElements(type.members));
        }
        else if (typescript_1.default.isArrayTypeNode(type)) {
            return typescript_1.default.createArrayTypeNode(this._remakeTypeNode(type.elementType));
        }
        else if (typescript_1.default.isParenthesizedTypeNode(type)) {
            return typescript_1.default.createParenthesizedType(this._remakeTypeNode(type.type));
        }
        else if (typescript_1.default.isTypeQueryNode(type)) {
            // typeof Entity
            return typescript_1.default.createTypeQueryNode(this._remakeEntityName(type.exprName));
        }
        else if (typescript_1.default.isTypeOperatorNode(type)) {
            return typescript_1.default.createTypeOperatorNode(this._remakeTypeNode(type.type));
        }
        else if (typescript_1.default.isFunctionTypeNode(type)) {
            return typescript_1.default.createFunctionTypeNode(this._remakeTypeParameterArray(type.typeParameters), this._remakeParameterArray(type.parameters), // parameters
            this._remakeTypeNode(type.type));
        }
        else if (typescript_1.default.isConstructorTypeNode(type)) {
            return typescript_1.default.createConstructorTypeNode(this._remakeTypeParameterArray(type.typeParameters), this._remakeParameterArray(type.parameters), // parameters
            this._remakeTypeNode(type.type));
        }
        else if (typescript_1.default.isImportTypeNode(type)) {
            // import(ImportSpecifier)
            const resolvedTypeName = this._resolveImportTypeOrTypeQueryNode(type);
            if (resolvedTypeName) {
                if (type.isTypeOf) {
                    // Note: `typeof import("")` is treated as a single importType with `isTypeOf` set to true
                    if (type.typeArguments) {
                        console.error(`Unexpected: typeof import("...") should not have arguments.`);
                    }
                    return typescript_1.default.createTypeQueryNode(typescript_1.default.createIdentifier(resolvedTypeName));
                }
                else {
                    return typescript_1.default.createTypeReferenceNode(resolvedTypeName, type.typeArguments ? type.typeArguments.map((ta) => this._remakeTypeNode(ta)) : undefined);
                }
            }
        }
        else if (typescript_1.default.isIntersectionTypeNode(type)) {
            return typescript_1.default.createIntersectionTypeNode(type.types.map((t) => this._remakeTypeNode(t)));
        }
        else if (typescript_1.default.isIndexedAccessTypeNode(type)) {
            return typescript_1.default.createIndexedAccessTypeNode(this._remakeTypeNode(type.objectType), this._remakeTypeNode(type.indexType));
        }
        else if (typescript_1.default.isThisTypeNode(type)) {
            return typescript_1.default.createThisTypeNode();
        }
        else if (typescript_1.default.isTypePredicateNode(type)) {
            const dumpedParameterName = typescript_1.default.isIdentifier(type.parameterName) ?
                this._remakeIdentifier(type.parameterName) : typescript_1.default.createThisTypeNode();
            return typescript_1.default.createTypePredicateNode(dumpedParameterName, this._remakeTypeNode(type.type));
        }
        else if (typescript_1.default.isConditionalTypeNode(type)) {
            return typescript_1.default.createConditionalTypeNode(this._remakeTypeNode(type.checkType), this._remakeTypeNode(type.extendsType), this._remakeTypeNode(type.trueType), this._remakeTypeNode(type.falseType));
        }
        else if (typescript_1.default.isTupleTypeNode(type)) {
            return typescript_1.default.createTupleTypeNode(type.elementTypes.map((elementType) => this._remakeTypeNode(elementType)));
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
    _resolveImportTypeOrTypeQueryNode(type) {
        let symbol;
        const typetype = this._typeChecker.getTypeAtLocation(type);
        if (typetype) {
            symbol = typetype.symbol;
        }
        if (!symbol) {
            console.warn(`Failed to resolve type ${type.getText()}, There is no symbol info.`);
        }
        else {
            // if (type.getText() === 'typeof CCString') {
            //     debugger;
            // }
            // if (type.getText() === 'typeof attributeUtils') {
            //     // if (symbol.getFlags() & ts.SymbolFlags.Module) {
            //     //     const exportSymbols = this._typeChecker.getExportsOfModule(symbol);
            //     //     const typeElements: ts.TypeElement[] = [];
            //     //     for (const exportSymbol of exportSymbols) {
            //     //     }
            //     //     return ts.createTypeLiteralNode(typeElements);
            //     // }
            //     debugger;
            // }
            const inf = this._getInf(symbol);
            if (inf) {
                const mainTypeName = this._resolveSymbolPath(inf);
                const result = {
                    typeName: mainTypeName,
                };
                if (typetype.aliasTypeArguments) {
                    const typeArguments = [];
                }
                return mainTypeName;
            }
        }
    }
    _remakeToken(token) {
        return token ? typescript_1.default.createToken(token.kind) : undefined;
    }
    _remakeEntityName(name) {
        const identifiers = [];
        let n = name;
        while (typescript_1.default.isQualifiedName(n)) {
            identifiers.unshift(n.right);
            n = n.left;
        }
        identifiers.unshift(n);
        let result = null;
        for (let i = identifiers.length - 1; i >= 0; --i) {
            const id = identifiers[i];
            const symbolInf = this._getSymbolInfAt(id);
            if (symbolInf) {
                const newName = this._resolveSymbolPath(symbolInf);
                const following = identifiers.slice(i + 1).map((id) => id.text);
                result = createEntityName(newName.split('.').concat(following));
                break;
            }
        }
        return result || createEntityName(identifiers.map((id) => id.text));
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
        if (originalSymbol.flags & typescript_1.default.SymbolFlags.PropertyOrAccessor) {
            return null;
        }
        if (originalSymbol.flags & typescript_1.default.SymbolFlags.ModuleMember) {
            const declaration = originalSymbol.valueDeclaration ||
                (originalSymbol.declarations && originalSymbol.declarations.length > 0 ?
                    originalSymbol.declarations[0] : null);
            if (declaration) {
                this._referencedSourceFiles.add(declaration.getSourceFile());
                let isTopLevelModuleMember = false;
                // if (ts.isModuleDeclaration(declaration.parent)) {
                //     isTopLevelModuleMember = true;
                // }
                if (typescript_1.default.isModuleDeclaration(declaration.parent) &&
                    typescript_1.default.isSourceFile(declaration.parent.parent)) {
                    isTopLevelModuleMember = true;
                }
                else if (typescript_1.default.isModuleBlock(declaration.parent) &&
                    typescript_1.default.isSourceFile(declaration.parent.parent.parent)) {
                    isTopLevelModuleMember = true;
                }
                else if (typescript_1.default.isModuleDeclaration(declaration) &&
                    typescript_1.default.isSourceFile(declaration.parent)) {
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
        const unexportedModuleCollector = this._getOrCreateModuleRegistry(moduleSymbol.name);
        let newName = symbol.name;
        if (newName === 'default') {
            newName = '$default';
        }
        const backupStack = this._scopeStack;
        this._scopeStack = [this._shelterName];
        const result = {
            name: newName,
            symbol,
            fullPrefix: getModuleRegistryFullNameArray(unexportedModuleCollector),
        };
        if (symbol === moduleSymbol) {
            result.isModuleSelf = true;
        }
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
        for (const declaration of symbol.declarations) {
            const decl = this._remakeDeclaration(declaration, symbol, newName);
            if (decl) {
                unexportedModuleCollector.statements.push(decl);
            }
        }
        this._scopeStack = backupStack;
        return result;
    }
    _getOrCreateModuleRegistry(name) {
        const path = name.replace(/["']/g, '');
        const segments = path.split(/[\\\/]/g);
        let currentCollector = this._rootUnexportedDirectory;
        for (const segment of segments) {
            const directoryTraits = currentCollector.directoryTraits || (currentCollector.directoryTraits = {
                nameMap: {},
                files: {},
            });
            if (!(segment in directoryTraits.nameMap)) {
                directoryTraits.nameMap[segment] = mapFileNameToNamespaceName(segment);
            }
            const moduleName = directoryTraits.nameMap[segment];
            const files = directoryTraits.files || (directoryTraits.files = {});
            currentCollector = files[moduleName] || (files[moduleName] = {
                name: moduleName,
                parent: currentCollector,
                statements: [],
            });
        }
        return currentCollector;
        function mapFileNameToNamespaceName(fileName) {
            let result = fileName.replace(/[\/-]/g, '_');
            // if (!result.match(/\b[$a-zA-Z_].*\b/g)) {
            //     result = `\$${result}`;
            // }
            return `\$${result}`;
        }
    }
    _createDeclarationForUnexportedModuleRegistry(registry, name) {
        let children;
        if (registry.directoryTraits) {
            children = Object.keys(registry.directoryTraits.files).map((fileName) => {
                return this._createDeclarationForUnexportedModuleRegistry(registry.directoryTraits.files[fileName], fileName);
            });
        }
        const moduleDeclaration = typescript_1.default.createModuleDeclaration(undefined, undefined, // [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
        typescript_1.default.createIdentifier(name), typescript_1.default.createModuleBlock(children ? registry.statements.concat(children) : registry.statements), typescript_1.default.NodeFlags.Namespace);
        return moduleDeclaration;
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
        return to.fullPrefix.slice(i).join('.') + (to.isModuleSelf ? '' : ('.' + to.name));
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
function getModuleRegistryFullNameArray(registry) {
    const result = [];
    let current = registry;
    while (current) {
        result.unshift(current.name);
        current = current.parent;
    }
    return result;
}
function createEntityName(identifiers) {
    let result = null;
    for (const id of identifiers) {
        const newID = typescript_1.default.createIdentifier(id);
        if (!result) {
            result = newID;
        }
        else {
            result = typescript_1.default.createQualifiedName(result, newID);
        }
    }
    return result;
}
function trimStart(s) {
    return s.replace(/^\s+/, '');
}
//# sourceMappingURL=gift.js.map