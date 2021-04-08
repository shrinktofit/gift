import ts, { factory } from 'typescript';
import * as rConcepts from './r-concepts';
import { NameResolver } from './name-resolver';
import * as tsUtils from './ts-utils';

export function recastTopLevelModule({
    program,
    typeChecker,
    rModule,
    nameResolver,
    exportPrivates,
    resolveEntity,
    registerNonExportedSymbol,
}: {
    program: ts.Program,
    typeChecker: ts.TypeChecker,
    rModule: rConcepts.ModuleTraits,
    nameResolver: NameResolver,
    exportPrivates?: boolean,
    resolveEntity: (symbol: ts.Symbol) => rConcepts.Entity | undefined,
    registerNonExportedSymbol: (symbol: ts.Symbol, currentModule: rConcepts.NamespaceTraits) => {
        entity: rConcepts.Entity;
        addStatements: (statements: ts.Statement[]) => void;
    },
}) {
    const nodeFactor = ts.factory;

    const moduleDeclaration = recastRModule(rModule);
    return [moduleDeclaration];

    function pushIfNonNull<T>(target: T[], source: T | null) {
        if (source) {
            target.push(source);
        }
    }

    function pushMultiIfNonNull<T>(target: T[], source: T[] | null) {
        if (source) {
            target.push(...source);
        }
    }

    function tryEmplaceModifier(modifiers: ts.Modifier[], kind: ts.Modifier['kind']) {
        if (modifiers.every((m) => m.kind !== kind)) {
            modifiers.unshift(nodeFactor.createModifier(kind));
        }
    }

    function recastRModule(rModule: rConcepts.ModuleTraits) {
        const statements = recastNamespaceTraits(rModule.entity.namespaceTraits!);

        Object.entries(rModule.imports).map(([specifier, detail]) => {
            const importSymbols = Object.entries(detail.namedImports);
            if (importSymbols.length === 0) {
                return;
            }
            const importSpecifiers = importSymbols.map(([importId, localId]): ts.ImportSpecifier => {
                const lId = nodeFactor.createIdentifier(localId);
                if (importId === localId) {
                    return nodeFactor.createImportSpecifier(undefined, lId);
                } else {
                    return nodeFactor.createImportSpecifier(nodeFactor.createIdentifier(importId), lId);
                }
            });
            statements.push(nodeFactor.createImportDeclaration(
                undefined, // decorators
                undefined, // modifiers
                nodeFactor.createImportClause(
                    false,
                    undefined,
                    nodeFactor.createNamedImports(importSpecifiers),
                ),
                nodeFactor.createStringLiteral(specifier),
            ));
        });
        
        rModule.interopRecord.forEach((interop) => {
            if (interop.exports.length !== 0) {
                statements.push(nodeFactor.createExportDeclaration(
                    undefined, // decorators
                    undefined, // modifiers
                    false, // isTypeOnly
                    nodeFactor.createNamedExports(interop.exports.map(({ importName, asName }) => asName === importName ?
                        nodeFactor.createExportSpecifier(undefined, nodeFactor.createIdentifier(importName)):
                        nodeFactor.createExportSpecifier(nodeFactor.createIdentifier(importName), nodeFactor.createIdentifier(asName)))),
                    nodeFactor.createStringLiteral(interop.specifier),
                ));
            }
            if (interop.imports.length !== 0) {
                statements.push(nodeFactor.createImportDeclaration(
                    undefined, // decorators
                    undefined, // modifiers
                    nodeFactor.createImportClause(
                        false,
                        undefined, // default import name
                        nodeFactor.createNamedImports(interop.imports.map(({ importName, asName }) => asName === importName ?
                        nodeFactor.createImportSpecifier(undefined, nodeFactor.createIdentifier(importName)):
                            nodeFactor.createImportSpecifier(nodeFactor.createIdentifier(importName), nodeFactor.createIdentifier(asName)))), // namespace import or named imports, or no
                    ),
                    nodeFactor.createStringLiteral(interop.specifier),
                ));
            }
        });

        // ts treat all things in .d.ts as public exports
        // except it contains at least one `export {}` or `export default`.
        // See:
        // https://github.com/microsoft/TypeScript/issues/19545
        statements.push(nodeFactor.createExportDeclaration(
            undefined, // decorators
            undefined, // modifiers
            false, // isTypeOnly,
            nodeFactor.createNamedExports([]),
        ));

        const moduleDeclaration = nodeFactor.createModuleDeclaration(
            undefined, // decorators
            [nodeFactor.createModifier(ts.SyntaxKind.DeclareKeyword)],
            nodeFactor.createStringLiteral(rModule.entity.name),
            nodeFactor.createModuleBlock(statements),
        );
        return moduleDeclaration;
    }

    function recastREntity(rEntity: rConcepts.Entity) {
        if (!rEntity.symbol) {
            // For example: the `__private` namespace
            return null;
        }

        const namespaceTraits = rEntity.namespaceTraits;

        const declarations = rEntity.symbol.getDeclarations();
        if (!declarations || declarations.length === 0) {
            return null;
        }

        const statements: ts.Statement[] = [];
        for (const declaration of declarations) {
            pushIfNonNull(
                statements,
                recastDeclaration(declaration, rEntity.name, true),
            );
        }

        if (namespaceTraits) {
            const childrenEntityStatements = recastNamespaceTraits(namespaceTraits);
            const namespaceDeclaration = nodeFactor.createModuleDeclaration(
                undefined, // decorators
                [nodeFactor.createModifier(ts.SyntaxKind.ExportKeyword)], // TODO: recastModifiers(moduleDeclaration.modifiers),
                nodeFactor.createIdentifier(rEntity.name),
                nodeFactor.createModuleBlock(childrenEntityStatements),
                ts.NodeFlags.Namespace,
            );
            statements.push(namespaceDeclaration);
        }
        return statements;
    }

    function recastNamespaceTraits(namespaceTraits: rConcepts.NamespaceTraits) {
        const statements: ts.Statement[] = [];
        nameResolver.enter(namespaceTraits);
        for (const childEntity of namespaceTraits.children) {
            pushMultiIfNonNull(
                statements,
                recastREntity(childEntity),
            );
        }
        namespaceTraits.transformAliasExports();
        if (namespaceTraits.selfExports.length !== 0) {
            statements.push(nodeFactor.createExportDeclaration(
                undefined, // decorators
                undefined, // modifiers
                false, // isTypeOnly
                nodeFactor.createNamedExports(namespaceTraits.selfExports.map(({ importName, asName }) => asName === importName ?
                    nodeFactor.createExportSpecifier(undefined, nodeFactor.createIdentifier(importName)):
                    nodeFactor.createExportSpecifier(nodeFactor.createIdentifier(importName), nodeFactor.createIdentifier(asName)))),
                undefined,
            ));
        }
        for (const { where, importName, asName } of namespaceTraits.selfExportsFromNamespaces) {
            statements.push(nodeFactor.createImportEqualsDeclaration(
                undefined, // decorators
                [nodeFactor.createModifier(ts.SyntaxKind.ExportKeyword)], // modifiers
                false,
                nodeFactor.createIdentifier(asName),
                nodeFactor.createQualifiedName(tsUtils.createEntityName(where), importName),
            ));
        }
        
        nameResolver.leave();
        if (namespaceTraits.neNamespace) {
            const neNsDeclaration = nodeFactor.createModuleDeclaration(
                undefined, // decorators,
                [nodeFactor.createModifier(ts.SyntaxKind.ExportKeyword)],
                nodeFactor.createIdentifier(namespaceTraits.neNamespace.trait.entity.name),
                nodeFactor.createModuleBlock(namespaceTraits.neNamespace.statements),
                ts.NodeFlags.Namespace
            );
            statements.push(neNsDeclaration);
        }
        return statements;
    }

    function optimizeModuleSpecifierTo(from: rConcepts.ModuleTraits, to: string): string {
        return to;
    }

    function recastStatement(statement: ts.Statement) {
        if (ts.isClassDeclaration(statement)) {
            return !statement.name ? null : recastClassDeclaration(statement, statement.name.text, false);
        } else if (ts.isFunctionDeclaration(statement)) {
            return !statement.name ? null : recastFunctionDeclaration(statement, statement.name.text, false);
        } else if (ts.isInterfaceDeclaration(statement)) {
            return !statement.name ? null : recastInterfaceDeclaration(statement, statement.name.text, false);
        } else if (ts.isEnumDeclaration(statement)) {
            return !statement.name ? null : recastEnumDeclaration(statement, statement.name.text, false);
        } else if (ts.isTypeAliasDeclaration(statement)) {
            return !statement.name ? null : recastTypeAliasDeclaration(statement, statement.name.text, false);
        } else if (ts.isVariableStatement(statement)) {
            return nodeFactor.createVariableStatement(
                recastDeclarationModifiers(statement, false),
                nodeFactor.createVariableDeclarationList(
                    statement.declarationList.declarations.map((declaration) =>
                        recastVariableDeclaration(declaration, declaration.name.getText(), false)),
                    statement.declarationList.flags,
                ),
            );
        } else if (ts.isImportDeclaration(statement)) {
            return recastImportDeclaration(statement);
        } else {
            return null;
        }
    }

    function recastStatements(statements: ts.Statement[] | ts.NodeArray<ts.Statement>): ts.Statement[] {
        const result: ts.Statement[] = [];
        for (const statement of statements) {
            const newStatement = recastStatement(statement);
            if (Array.isArray(newStatement)) {
                result.push(...newStatement);
            } else if (newStatement) {
                result.push(newStatement);
            }
        }
        return result;
    }

    function recastDeclaration(declaration: ts.Declaration, newName: string, forceExport: boolean): ts.Statement | null {
        const result = recastDeclarationNoComment(declaration, newName, forceExport);
        if (result) {
            copyComments(declaration, result);
        }
        return result;
    }

    function copyComments<T extends ts.Node>(src: ts.Node, dst: T): T {
        if (ts.isVariableDeclaration(src) &&
            ts.isVariableDeclarationList(src.parent) &&
            ts.isVariableStatement(src.parent.parent)) {
            // https://github.com/microsoft/TypeScript/issues/35620
            return copyComments(src.parent.parent, dst);
        }
        const sourceFileText = src.getSourceFile().text;
        ts.forEachLeadingCommentRange(sourceFileText, src.pos, (pos, end, kind) => {
            let tex = sourceFileText.substring(pos, end);
            if (tex.startsWith('/*')) {
                tex = tex.substr(2, tex.length - 4);
                tex = tex.split('\n').map((line, lineIndex, lines) => {
                    const noHeadSpace = line.trimLeft();
                    if (lineIndex === lines.length - 1 && noHeadSpace.length === 0) {
                        return ' ';
                    } else if (!noHeadSpace.startsWith('*')) {
                        return line;
                    } else if (lineIndex === 0) {
                        return noHeadSpace;
                    } else {
                        return ` ${noHeadSpace}`
                    }
                }).join('\n');
            } else if (tex.startsWith('//')) {
                tex = tex.substr(2);
            }
            ts.addSyntheticLeadingComment(dst, kind, tex, true);
        });
        return dst;
    }

    function recastDeclarationNoComment(declaration: ts.Declaration, newName: string, forceExport: boolean): ts.Statement | null {
        if (ts.isClassDeclaration(declaration)) {
            return recastClassDeclaration(declaration, newName, forceExport);
        } else if (ts.isFunctionDeclaration(declaration)) {
            return recastFunctionDeclaration(declaration, newName, forceExport);
        } else if (ts.isInterfaceDeclaration(declaration)) {
            return recastInterfaceDeclaration(declaration, newName, forceExport);
        } else if (ts.isEnumDeclaration(declaration)) {
            return recastEnumDeclaration(declaration, newName, forceExport);
        } else if (ts.isTypeAliasDeclaration(declaration)) {
            return recastTypeAliasDeclaration(declaration, newName, forceExport);
        } else if (ts.isVariableDeclaration(declaration)) {
            return nodeFactor.createVariableStatement(
                recastDeclarationModifiers(declaration, forceExport),
                nodeFactor.createVariableDeclarationList(
                    [recastVariableDeclaration(declaration, newName, forceExport)],
                    declaration.parent.flags,
                ),
            );
        } else if (ts.isModuleDeclaration(declaration)) {
            // return recastModuleDeclaration(declaration, newName);
        }
        return null;
    }

    function recastModuleDeclarationAsNamespaceDeclaration(moduleDeclaration: ts.ModuleDeclaration, newName: string) {
        const body = moduleDeclaration.body;
        let newBody: ts.ModuleDeclaration['body'];
        if (!body) {
            // Fall through
        } else if (ts.isIdentifier(body)) {
            newBody = nodeFactor.createIdentifier(body.text);
        } else if (ts.isModuleBlock(body)) {
            newBody = nodeFactor.createModuleBlock(recastStatements(body.statements));
        } else {
            console.warn(`Unknown module declaration type ${tsUtils.stringifyNode(body)}`);
        }

        return nodeFactor.createModuleDeclaration(
            undefined, // decorators
            recastDeclarationModifiers(moduleDeclaration, true),
            nodeFactor.createIdentifier(newName),
            newBody,
            ts.NodeFlags.Namespace, // TODO: flags. Maybe `ts.NodeFlags.Namespace`?
        );
    }

    function recastFunctionDeclaration(functionDeclaration: ts.FunctionDeclaration, newName: string, forceExport: boolean) {
        return nodeFactor.createFunctionDeclaration(
            undefined,
            recastModifiers(functionDeclaration.modifiers),
            functionDeclaration.asteriskToken,
            newName,
            recastTypeParameterArray(functionDeclaration.typeParameters),
            recastParameterArray(functionDeclaration.parameters), // parameters
            recastTypeNode(functionDeclaration.type),
            undefined,
        );
    }

    function recastVariableDeclaration(variableDeclaration: ts.VariableDeclaration, newName: string, forceExport: boolean) {
        return nodeFactor.createVariableDeclaration(
            newName,
            recastToken(variableDeclaration.exclamationToken),
            recastTypeNode(variableDeclaration.type),
            recastExpression(variableDeclaration.initializer),
        );
    }

    function recastPropertySignature(propertySignature: ts.PropertySignature) {
        return copyComments(propertySignature, nodeFactor.createPropertySignature(
            recastModifiers(propertySignature.modifiers), // modifiers
            recastPropertyName(propertySignature.name), // name
            recastToken(propertySignature.questionToken), // questionToken
            recastTypeNode(propertySignature.type), // type
        ));
    }

    function recastMethodSignature(methodSignature: ts.MethodSignature) {
        return copyComments(methodSignature, nodeFactor.createMethodSignature(
            recastModifiers(methodSignature.modifiers), // modifiers
            recastPropertyName(methodSignature.name), // name
            recastToken(methodSignature.questionToken), // questionToken
            recastTypeParameterArray(methodSignature.typeParameters), // typeParameters
            recastParameterArray(methodSignature.parameters), // parameters
            recastTypeNode(methodSignature.type), // type
        ));
    }

    function recastIndexSignatureDeclaration(indexSignature: ts.IndexSignatureDeclaration) {
        return copyComments(indexSignature, nodeFactor.createIndexSignature(
            undefined, // decorators
            recastModifiers(indexSignature.modifiers), // modifiers
            recastParameterArray(indexSignature.parameters), // parameters
            recastTypeNode(indexSignature.type) || nodeFactor.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword), // type
        ));
    }

    function recastCallSignatureDeclaration(callSignature: ts.CallSignatureDeclaration) {
        return copyComments(callSignature, nodeFactor.createCallSignature(
            recastTypeParameterArray(callSignature.typeParameters), // typeParameters
            recastParameterArray(callSignature.parameters), // parameters
            recastTypeNode(callSignature.type), // type
        ));
    }

    function recastConstructorSignatureDeclaration(constructSignature: ts.ConstructSignatureDeclaration) {
        return copyComments(constructSignature, nodeFactor.createConstructSignature(
            recastTypeParameterArray(constructSignature.typeParameters),
            recastParameterArray(constructSignature.parameters), // parameters
            recastTypeNode(constructSignature.type),
        ));
    }

    function recastPropertyDeclaration(propertyDeclaration: ts.PropertyDeclaration) {
        return copyComments(propertyDeclaration, nodeFactor.createPropertyDeclaration(
            undefined,
            recastModifiers(propertyDeclaration.modifiers),
            recastPropertyName(propertyDeclaration.name),
            recastToken(propertyDeclaration.questionToken),
            recastTypeNode(propertyDeclaration.type),
            recastExpression(propertyDeclaration.initializer),
        ));
    }

    function recastMethodDeclaration(methodDeclaration: ts.MethodDeclaration) {
        return copyComments(methodDeclaration, (nodeFactor.createMethodDeclaration(
            undefined,
            recastModifiers(methodDeclaration.modifiers),
            recastToken(methodDeclaration.asteriskToken),
            recastPropertyName(methodDeclaration.name),
            recastToken(methodDeclaration.questionToken),
            recastTypeParameterArray(methodDeclaration.typeParameters),
            recastParameterArray(methodDeclaration.parameters), // parameters
            recastTypeNode(methodDeclaration.type),
            undefined,
        )));
    }

    function recastConstructorDeclaration(constructorDeclaration: ts.ConstructorDeclaration) {
        return copyComments(constructorDeclaration, (nodeFactor.createConstructorDeclaration(
            undefined,
            recastModifiers(constructorDeclaration.modifiers),
            recastParameterArray(constructorDeclaration.parameters), // parameters
            undefined,
        )));
    }

    function recastParameter(parameter: ts.ParameterDeclaration) {
        return nodeFactor.createParameterDeclaration(
            undefined,
            recastModifiers(parameter.modifiers),
            recastToken(parameter.dotDotDotToken),
            parameter.name.getText(),
            recastToken(parameter.questionToken),
            recastTypeNode(parameter.type),
        );
    }

    function recastParameterArray(parameters: ts.NodeArray<ts.ParameterDeclaration>): ts.ParameterDeclaration[];

    function recastParameterArray(parameters?: ts.NodeArray<ts.ParameterDeclaration>): ts.ParameterDeclaration[] | undefined;

    function recastParameterArray(parameters?: ts.NodeArray<ts.ParameterDeclaration>) {
        const lambda = (p: ts.ParameterDeclaration) => copyComments(p, (recastParameter(p)));
        if (parameters) {
            return parameters.map(lambda);
        } else {
            return undefined;
        }
    }

    function recastTypeParameter(typeParameter: ts.TypeParameterDeclaration) {
        return nodeFactor.createTypeParameterDeclaration(
            typeParameter.name.getText(),
            recastTypeNode(typeParameter.constraint),
            recastTypeNode(typeParameter.default),
        );
    }

    function recastTypeParameterArray(
        typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration>) {
        const lambda = (tp: ts.TypeParameterDeclaration) => copyComments(tp, (recastTypeParameter(tp)));
        if (typeParameters) {
            return typeParameters.map(lambda);
        } else {
            return undefined;
        }
    }

    function recastImportDeclaration(importDeclaration: ts.ImportDeclaration): ts.Statement[] | null {
        // if (!ts.isStringLiteral(importDeclaration.moduleSpecifier) ||
        //     !importDeclaration.importClause) {
        //     return null;
        // }
        // const moduleRegistry = this._getOrCreateModuleRegistry(importDeclaration.moduleSpecifier.text);
        // const moduleFullName = getModuleRegistryFullNameArray(moduleRegistry);
        // const moduleEntity = createEntityName(moduleFullName);
        // const { namedBindings } = importDeclaration.importClause;
        // if (namedBindings) {
        //     if (ts.isNamespaceImport(namedBindings)) {
        //         return [ts.createVariableStatement(
        //             undefined,
        //             [ts.createVariableDeclaration(
        //                 ts.createIdentifier(
        //                     namedBindings.name.text,
        //                 ),
        //                 ts.createTypeQueryNode(
        //                     moduleEntity,
        //                 ))])];
        //     } else {
        //         for (const element of namedBindings.elements) {
                    
        //         }
        //     }
        // }
        return [];
    }

    function recastExportDeclaration(exportDeclaration: ts.ExportDeclaration): ts.Statement[] | null {
        // if (exportDeclaration.moduleSpecifier) {
        //     if (!ts.isStringLiteral(exportDeclaration.moduleSpecifier)) {
        //         return null;
        //     }
        //     const moduleRegistry = this._getOrCreateModuleRegistry(exportDeclaration.moduleSpecifier.text);
        //     const moduleFullName = getModuleRegistryFullNameArray(moduleRegistry);
        //     const moduleEntity = createEntityName(moduleFullName);

        //     if (!exportDeclaration.exportClause) {
                
        //     }
        // }
        return null;
    }

    function recastClassDeclaration(
        classDeclaration: ts.ClassDeclaration, newName: string, forceExport: boolean) {
        const classElements: ts.ClassElement[] = [];
        // console.log(`Dump class ${newName}`);
        for (const element of classDeclaration.members) {
            if (!exportPrivates && isPrivateMember(element)) {
                continue;
            }
            // const name = typeof element.name === 'string' ? typeof element.name :
            //     (element.name ? element.name.getText() : '');
            // console.log(`  Dump member ${name}`);
            if (ts.isMethodDeclaration(element)) {
                classElements.push(recastMethodDeclaration(element));
            } else if (ts.isConstructorDeclaration(element)) {
                classElements.push(recastConstructorDeclaration(element));
            } else if (ts.isPropertyDeclaration(element)) {
                classElements.push(recastPropertyDeclaration(element));
            } else if (ts.isIndexSignatureDeclaration(element)) {
                classElements.push(recastIndexSignatureDeclaration(element));
            } else if (ts.isSemicolonClassElement(element)) {
                classElements.push(nodeFactor.createSemicolonClassElement());
            } else if (ts.isGetAccessor(element)) {
                // Since TS 3.7
                classElements.push(nodeFactor.createGetAccessorDeclaration(
                    undefined, // decorators
                    recastModifiers(element.modifiers), // modifiers
                    recastPropertyName(element.name), // name
                    recastParameterArray(element.parameters), // parameters
                    recastTypeNode(element.type), // type
                    undefined, // body
                ));
            } else if (ts.isSetAccessor(element)) {
                // Since TS 3.7
                classElements.push(nodeFactor.createSetAccessorDeclaration(
                    undefined, // decorators
                    recastModifiers(element.modifiers), // modifiers
                    recastPropertyName(element.name), // name
                    recastParameterArray(element.parameters), // parameters
                    undefined, // body
                ));
            } else {
                console.warn(`Don't know how to handle element ${element.name?.getText()} of class ${newName}`);
            }
        }
        return nodeFactor.createClassDeclaration(
            undefined,
            recastDeclarationModifiers(classDeclaration, forceExport),
            newName,
            recastTypeParameterArray(classDeclaration.typeParameters),
            recastHeritageClauses(classDeclaration.heritageClauses),
            classElements,
        );
    }

    function isPrivateMember(classElement: ts.ClassElement) {
        if (!classElement.modifiers) {
            return false;
        }
        return classElement.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword);
    }

    function recastInterfaceDeclaration(
        interfaceDeclaration: ts.InterfaceDeclaration, newName: string, forceExport: boolean) {
        return nodeFactor.createInterfaceDeclaration(
            undefined,
            recastDeclarationModifiers(interfaceDeclaration, forceExport),
            newName,
            recastTypeParameterArray(interfaceDeclaration.typeParameters),
            recastHeritageClauses(interfaceDeclaration.heritageClauses),
            recastTypeElements(interfaceDeclaration.members),
        );
    }

    function recastTypeElement(typeElement: ts.TypeElement) {
        if (ts.isMethodSignature(typeElement)) {
            return recastMethodSignature(typeElement);
        } else if (ts.isPropertySignature(typeElement)) {
            return recastPropertySignature(typeElement);
        } else if (ts.isIndexSignatureDeclaration(typeElement)) {
            return recastIndexSignatureDeclaration(typeElement);
        } else if (ts.isCallSignatureDeclaration(typeElement)) {
            return recastCallSignatureDeclaration(typeElement);
        } else if (ts.isConstructSignatureDeclaration(typeElement)) {
            return recastConstructorSignatureDeclaration(typeElement);
        }
    }

    function recastTypeElements(typeElements: ts.NodeArray<ts.TypeElement>) {
        const result: ts.TypeElement[] = [];
        for (const typeElement of typeElements) {
            const d = recastTypeElement(typeElement);
            if (d) {
                result.push(d);
            } else {
                console.warn(`Don't know how to handle element ${typeElement.name?.getText()} of interface`);
            }
        }
        return result;
    }

    function recastHeritageClause(heritageClause: ts.HeritageClause) {
        const validClauses: ts.ExpressionWithTypeArguments[] = [];
        for (const type of heritageClause.types) {
            validClauses.push(nodeFactor.createExpressionWithTypeArguments(
                recastExpression(type.expression),
                type.typeArguments ? type.typeArguments.map((ta) => recastTypeNode(ta)!) : undefined,
                ));
        }
        return nodeFactor.createHeritageClause(
            heritageClause.token,
            validClauses,
        );
    }

    function recastHeritageClauses(heritageClauses?: ts.NodeArray<ts.HeritageClause>) {
        if (!heritageClauses) {
            return undefined;
        }
        const lambda = (heritageClause: ts.HeritageClause) => recastHeritageClause(heritageClause);
        if (heritageClauses) {
            return heritageClauses.map(lambda);
        } else {
            return undefined;
        }
    }

    function recastEnumDeclaration(enumDeclaration: ts.EnumDeclaration, newName: string, forceExport: boolean) {
        return nodeFactor.createEnumDeclaration(
            undefined,
            recastDeclarationModifiers(enumDeclaration, forceExport),
            newName,
            enumDeclaration.members.map((enumerator) => {
                return copyComments(enumerator, nodeFactor.createEnumMember(
                    enumerator.name.getText(),
                    recastExpression(enumerator.initializer),
                ));
            }),
        );
    }

    function recastTypeAliasDeclaration(
        typeAliasDeclaration: ts.TypeAliasDeclaration, newName: string, forceExport: boolean) {
        return nodeFactor.createTypeAliasDeclaration(
            undefined,
            recastDeclarationModifiers(typeAliasDeclaration, forceExport),
            newName,
            recastTypeParameterArray(typeAliasDeclaration.typeParameters),
            recastTypeNode(typeAliasDeclaration.type)!,
        );
    }

    function recastModifiers(modifiers: ts.NodeArray<ts.Modifier>): ts.Modifier[];

    function recastModifiers(modifiers?: ts.NodeArray<ts.Modifier>): ts.Modifier[] | undefined

    function recastModifiers(modifiers?: ts.NodeArray<ts.Modifier>) {
        if (!modifiers) {
            return;
        }
        const result: ts.Modifier[] = [];
        for (const modifier of modifiers) {
            if (modifier.kind !== ts.SyntaxKind.DefaultKeyword) {
                result.push(modifier);
            }
        }
        return result;
    }

    function recastDeclarationModifiers(declaration: ts.Declaration | ts.VariableStatement, forceExport: boolean): ts.Modifier[] | undefined {
        let modifiers = recastModifiers(declaration.modifiers)?.filter((m) => m.kind !== ts.SyntaxKind.DeclareKeyword);
        
        if (forceExport) {
            if (!modifiers) {
                modifiers = [];
            }
            tryEmplaceModifier(modifiers, ts.SyntaxKind.ExportKeyword);
        }
        return modifiers;
    }

    function recastTypeNode(type: ts.TypeNode): ts.TypeNode;

    function recastTypeNode(type?: ts.TypeNode): ts.TypeNode | undefined;

    function recastTypeNode(type?: ts.TypeNode): ts.TypeNode | undefined {
        if (!type) {
            return undefined;
        }

        const fallthrough = () => {
            return nodeFactor.createTypeReferenceNode(type.getText(), undefined);
        };

        switch (type.kind) {
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.VoidKeyword:
            return nodeFactor.createKeywordTypeNode(type.kind);
        }
        if (ts.isTypeReferenceNode(type)) {
            return recastEntityNameAsTypeNode(
                type.typeName,
                type.typeArguments ? type.typeArguments.map((ta) => recastTypeNode(ta)) : undefined,
            );
        } else if (ts.isUnionTypeNode(type)) {
            return nodeFactor.createUnionTypeNode(
                type.types.map((t) => recastTypeNode(t)!));
        } else if (ts.isTypeLiteralNode(type)) {
            return nodeFactor.createTypeLiteralNode(recastTypeElements(type.members));
        } else if (ts.isArrayTypeNode(type)) {
            return nodeFactor.createArrayTypeNode(recastTypeNode(type.elementType));
        } else if (ts.isParenthesizedTypeNode(type)) {
            return nodeFactor.createParenthesizedType(recastTypeNode(type.type)!);
        } else if (ts.isTypeQueryNode(type)) {
            // typeof Entity
            return nodeFactor.createTypeQueryNode(recastEntityName(type.exprName));
        } else if (ts.isTypeOperatorNode(type)) {
            return nodeFactor.createTypeOperatorNode(type.operator, recastTypeNode(type.type));
        } else if (ts.isFunctionTypeNode(type)) {
            return nodeFactor.createFunctionTypeNode(
                recastTypeParameterArray(type.typeParameters),
                recastParameterArray(type.parameters), // parameters
                recastTypeNode(type.type),
            );
        } else if (ts.isConstructorTypeNode(type)) {
            return nodeFactor.createConstructorTypeNode(
                recastTypeParameterArray(type.typeParameters),
                recastParameterArray(type.parameters), // parameters
                recastTypeNode(type.type),
            );
        } else if (ts.isImportTypeNode(type)) {
            // import(ImportSpecifier)
            const resolvedTypeName = resolveImportTypeOrTypeQueryNode(type);
            if (resolvedTypeName) {
                if (type.isTypeOf) {
                    // Note: `typeof import("")` is treated as a single importType with `isTypeOf` set to true
                    if (type.typeArguments) {
                        console.error(`Unexpected: typeof import("...") should not have arguments.`);
                    }
                    return nodeFactor.createTypeQueryNode(resolvedTypeName);
                } else {
                    return nodeFactor.createTypeReferenceNode(
                        resolvedTypeName,
                        type.typeArguments ? type.typeArguments.map((ta) => recastTypeNode(ta)!) : undefined,
                    );
                }
            }
        } else if (ts.isIntersectionTypeNode(type)) {
            return nodeFactor.createIntersectionTypeNode(type.types.map((t) => recastTypeNode(t)));
        } else if (ts.isIndexedAccessTypeNode(type)) {
            return nodeFactor.createIndexedAccessTypeNode(
                recastTypeNode(type.objectType), recastTypeNode(type.indexType));
        } else if (ts.isThisTypeNode(type)) {
            return nodeFactor.createThisTypeNode();
        } else if (ts.isTypePredicateNode(type)) {
            return nodeFactor.createTypePredicateNode(
                type.assertsModifier ? nodeFactor.createToken(ts.SyntaxKind.AssertsKeyword) : undefined,
                ts.isIdentifier(type.parameterName) ?
                    nodeFactor.createIdentifier(type.parameterName.text) :
                    nodeFactor.createThisTypeNode(),
                    recastTypeNode(type.type),
            );
        } else if (ts.isConditionalTypeNode(type)) {
            return nodeFactor.createConditionalTypeNode(
                recastTypeNode(type.checkType),
                recastTypeNode(type.extendsType),
                recastTypeNode(type.trueType),
                recastTypeNode(type.falseType),
            );
        } else if (ts.isTupleTypeNode(type)) {
            return nodeFactor.createTupleTypeNode(type.elements.map((elementType) => recastTypeNode(elementType)));
        } else if (ts.isLiteralTypeNode(type)) {
            const literal = type.literal;
            let dumpedLiteral: typeof literal | undefined;
            if (ts.isStringLiteral(literal)) {
                dumpedLiteral = nodeFactor.createStringLiteral(literal.text);
            } else if (literal.kind === ts.SyntaxKind.TrueKeyword) {
                dumpedLiteral = nodeFactor.createTrue();
            } else if (literal.kind === ts.SyntaxKind.FalseKeyword) {
                dumpedLiteral = nodeFactor.createFalse();
            } else if (literal.kind === ts.SyntaxKind.NullKeyword) {
                dumpedLiteral = nodeFactor.createNull();
            } else if (ts.isNumericLiteral(literal)) {
                dumpedLiteral = nodeFactor.createNumericLiteral(literal.text);
            } else if (ts.isBigIntLiteral(literal)) {
                dumpedLiteral = nodeFactor.createBigIntLiteral(literal.text);
            } else if (ts.isRegularExpressionLiteral(literal)) {
                dumpedLiteral = nodeFactor.createRegularExpressionLiteral(literal.text);
            } else if (ts.isNoSubstitutionTemplateLiteral(literal)) {
                dumpedLiteral = nodeFactor.createNoSubstitutionTemplateLiteral(literal.text);
            } else if (ts.isPrefixUnaryExpression(literal)) {
                dumpedLiteral = nodeFactor.createPrefixUnaryExpression(literal.operator, recastExpression(literal.operand));
            } else {
                console.warn(`Don't know how to handle literal type ${type.getText()}(${tsUtils.stringifyNode(literal)})`);
            }
            if (dumpedLiteral) {
                return nodeFactor.createLiteralTypeNode(dumpedLiteral);
            }
        } else if (ts.isMappedTypeNode(type)) {
            return nodeFactor.createMappedTypeNode(
                type.readonlyToken && type.readonlyToken.kind === ts.SyntaxKind.ReadonlyKeyword ?
                    factory.createModifier(type.readonlyToken.kind):
                    recastToken(type.readonlyToken),
                recastTypeParameter(type.typeParameter),
                recastTypeNode(type.nameType),
                recastToken(type.questionToken),
                recastTypeNode(type.type),
            );
        } else if (ts.isInferTypeNode(type)) {
            return nodeFactor.createInferTypeNode(
                recastTypeParameter(type.typeParameter),
            );
        } else if (type.kind === ts.SyntaxKind.RestType) {
            return nodeFactor.createRestTypeNode(recastTypeNode((type as ts.RestTypeNode).type));
        } else if (ts.isOptionalTypeNode(type)) {
            return nodeFactor.createOptionalTypeNode(type.type);
        } else if (ts.isNamedTupleMember(type)) {
            return nodeFactor.createNamedTupleMember(
                recastToken(type.dotDotDotToken),
                recastIdentifier(type.name),
                recastToken(type.questionToken),
                recastTypeNode(type.type),
            );
        } else {
            console.warn(`Don't know how to handle type ${type.getText()}(${tsUtils.stringifyNode(type)})`);
        }
        return type ? nodeFactor.createTypeReferenceNode(type.getText(), undefined) : undefined;
    }

    function recastToken(token: undefined): undefined;
    function recastToken(token: ts.Token<ts.SyntaxKind.SuperKeyword> | undefined): ts.SuperExpression | undefined;
    function recastToken(token: ts.Token<ts.SyntaxKind.ThisKeyword> | undefined): ts.ThisExpression | undefined;
    function recastToken(token: ts.Token<ts.SyntaxKind.NullKeyword> | undefined): ts.NullLiteral | undefined;
    function recastToken(token: ts.Token<ts.SyntaxKind.TrueKeyword> | undefined): ts.TrueLiteral | undefined;
    function recastToken(token: ts.Token<ts.SyntaxKind.FalseKeyword> | undefined): ts.FalseLiteral | undefined;
    function recastToken<TKind extends ts.PunctuationSyntaxKind>(token: ts.PunctuationToken<TKind> | undefined): ts.PunctuationToken<TKind> | undefined;
    function recastToken<TKind extends ts.KeywordTypeSyntaxKind>(token: ts.KeywordTypeNode<TKind> | undefined): ts.KeywordTypeNode<TKind> | undefined;
    function recastToken<TKind extends ts.ModifierSyntaxKind>(token: ts.ModifierToken<TKind> | undefined): ts.ModifierToken<TKind> | undefined;
    function recastToken<TKind extends ts.KeywordSyntaxKind>(token: ts.KeywordToken<TKind> | undefined): ts.KeywordToken<TKind> | undefined;
    function recastToken<TKind extends ts.SyntaxKind.Unknown | ts.SyntaxKind.EndOfFileToken>(token: ts.Token<TKind> | undefined): ts.Token<TKind> | undefined;

    function recastToken<TKind extends ts.SyntaxKind>(token?: ts.Token<TKind>): any {
        if (!token) {
            return undefined;
        }
        const kind = token.kind as any;
        return nodeFactor.createToken(kind);
    }

    function recastEntityName(name: ts.EntityName) {
        const identifiers: ts.Identifier[] = [];
        let n = name;
        while (ts.isQualifiedName(n)) {
            identifiers.unshift(n.right);
            n = n.left;
        }
        identifiers.unshift(n);

        let result: ts.EntityName | null = null;
        for (let i = identifiers.length - 1; i >= 0; --i) {
            const id = identifiers[i];
            const resolveResult = resolveIdentifier(id);
            if (resolveResult) {
                const following = identifiers.slice(i + 1).map((id) => id.text);
                // TODO
                result = tsUtils.createEntityName(
                    following,
                    createEntityNameFromNameResolveResult(resolveResult));
            }
        }
        return result || tsUtils.createEntityName(identifiers.map((id) => id.text));
    }

    function recastEntityNameAsTypeNode(name: ts.EntityName, typeArguments?: ts.TypeNode[]) {
        const { leftmost, rights } = tsUtils.splitLeftmost(name);
        const resolved = resolveIdentifier(leftmost);
        if (resolved) {
            return createTypeNodeFromNameResolveResult(
                resolved,
                rights.map((right) => right.text),
                typeArguments
            );
        } else {
            return nodeFactor.createTypeReferenceNode(
                recastEntityNameTrivially(name),
                typeArguments,
            );
        }
    }

    function recastEntityNameTrivially(name: ts.EntityName): ts.EntityName {
        if (ts.isIdentifier(name)) {
            return recastIdentifier(name);
        } else {
            return nodeFactor.createQualifiedName(
                recastEntityNameTrivially(name.left),
                recastIdentifier(name.right),
            );
        }
    }

    function recastIdentifier(id: ts.Identifier) {
        return nodeFactor.createIdentifier(id.text);
    }

    function recastPropertyName(propertyName: ts.PropertyName) {
        if (ts.isIdentifier(propertyName)) {
            return nodeFactor.createIdentifier(propertyName.text);
        } else if (ts.isStringLiteral(propertyName)) {
            return nodeFactor.createStringLiteral(propertyName.text);
        } else if (ts.isNumericLiteral(propertyName)) {
            return nodeFactor.createNumericLiteral(propertyName.text);
        } else if (ts.isPrivateIdentifier(propertyName)) {
            return nodeFactor.createPrivateIdentifier(propertyName.text);
        } else {
            return nodeFactor.createComputedPropertyName(recastExpression(propertyName.expression));
        }
    }

    function recastBooleanLiteral(node: ts.BooleanLiteral) {
        return nodeFactor.createToken(node.kind);
    }

    function recastStringLiteral(node: ts.StringLiteral) {
        return nodeFactor.createStringLiteral(node.text);
    }

    function recastExpression(expression: ts.Expression): ts.Expression;

    function recastExpression(expression?: ts.Expression): ts.Expression | undefined;

    // Only literals are supported
    function recastExpression(expression?: ts.Expression): ts.Expression | undefined {
        if (!expression) {
            return undefined;
        }
        if (ts.isStringLiteral(expression)) {
            return nodeFactor.createStringLiteral(expression.text);
        } else if (ts.isNumericLiteral(expression)) {
            return nodeFactor.createNumericLiteral(expression.text);
        } else if (expression.kind === ts.SyntaxKind.TrueKeyword) {
            return nodeFactor.createTrue();
        } else if (expression.kind === ts.SyntaxKind.FalseKeyword) {
            return nodeFactor.createFalse();
        } else if (expression.kind === ts.SyntaxKind.NullKeyword) {
            return nodeFactor.createNull();
        } else if (ts.isIdentifier(expression)) {
            return recastIdExpression(expression);
        } else if (ts.isPropertyAccessExpression(expression)) {
            return nodeFactor.createPropertyAccessExpression(
                recastExpression(expression.expression),
                expression.name.text);
        } else {
            return nodeFactor.createStringLiteral(`Bad expression <${expression.getText()}>`);
        }
    }

    function recastIdExpression(id: ts.Identifier) {
        const resolveResult = resolveIdentifier(id);
        if (resolveResult) {
            return createAccessLinkFromNameResolveResult(resolveResult);
        } else {
            return nodeFactor.createIdentifier(id.text);
        }
    }

    function resolveIdentifier(id: ts.Identifier) {
        const rEntity = tryGetEntityAtLocation(id);
        if (rEntity) {
            return nameResolver.resolve(rEntity);
        }
    }

    function resolveImportTypeOrTypeQueryNode(type: ts.ImportTypeNode | ts.TypeQueryNode): ts.EntityName | undefined {
        let symbol: ts.Symbol | undefined;
        const typeType = typeChecker.getTypeAtLocation(type);
        if (typeType) {
            symbol = typeType.symbol;
        }
        if (!symbol) {
            console.warn(`Failed to resolve type ${type.getText()}, There is no symbol info.`);
            return;
        }
        const rEntity = getEntityOfSymbol(symbol);
        if (rEntity) {
            const resolved = nameResolver.resolve(rEntity);
            if (resolved) {
                // TODO: consider 'module' ins resolve result.
                return createEntityNameFromNameResolveResult(resolved);
            }
        }
    }

    function createTypeNodeFromNameResolveResult(
        resolveResult: NameResolver.ResolveResult,
        rightmost: string[] | undefined,
        typeArguments: ts.TypeNode[] | undefined,
        isTypeOf?: boolean | undefined,
    ) {
        if (isTypeOf) {
            const typeName = resolveResult.namespaces ?
            tsUtils.createEntityName(resolveResult.namespaces.concat([resolveResult.name]).concat(rightmost ?? []), undefined):
            tsUtils.createEntityName(rightmost || [], nodeFactor.createIdentifier(resolveResult.name));
            if (resolveResult.module) {
                return nodeFactor.createImportTypeNode(
                    nodeFactor.createLiteralTypeNode(nodeFactor.createStringLiteral(resolveResult.module.name)), // arguments(module specifier)
                    typeName,
                    typeArguments,
                    isTypeOf,
                );
            } else {
                return nodeFactor.createTypeReferenceNode(
                    typeName,
                    typeArguments,
                );
            }
        } else {
            const ids = prepareAndResolveIdsFromResolveResult(resolveResult);
            return nodeFactor.createTypeReferenceNode(
                tsUtils.createEntityName(ids.concat(rightmost ?? [])),
                typeArguments,
            );
        }
    }

    function createEntityNameFromNameResolveResult(resolveResult: NameResolver.ResolveResult) {
        const ids = prepareAndResolveIdsFromResolveResult(resolveResult);
        return tsUtils.createEntityName(ids);
    }

    function createAccessLinkFromNameResolveResult(resolveResult: NameResolver.ResolveResult): ts.Expression {
        const ids = prepareAndResolveIdsFromResolveResult(resolveResult);
        return tsUtils.createAccessLink(ids);
    }

    function prepareAndResolveIdsFromResolveResult(resolveResult: NameResolver.ResolveResult) {
        const ids: string[] = [];
        if (resolveResult.namespaces) {
            ids.push(...resolveResult.namespaces);
        }
        ids.push(resolveResult.name);
        if (!resolveResult.module) {
            return ids;
        } else {
            const importName = rModule.addNamedImport(
                resolveResult.module.name, ids[0]);
            return [
                importName,
                ...ids.slice(1),
            ];
        }
    }

    function tryGetEntityAtLocation(node: ts.Node) {
        let symbol = typeChecker.getSymbolAtLocation(node);
        if (!symbol) {
            console.warn(`Failed to resolve symbol ${node.getText()}, There is no symbol info.`);
            return;
        }
        if (symbol.getFlags() & ts.SymbolFlags.Alias) {
            symbol = typeChecker.getAliasedSymbol(symbol);
        }

        if (symbol.getFlags() & ts.SymbolFlags.TypeParameter ||
            symbol.getFlags() & ts.SymbolFlags.EnumMember ||
            symbol.getFlags() & ts.SymbolFlags.FunctionScopedVariable) {
            return;
        }

        return getEntityOfSymbol(symbol);
    }

    function getEntityOfSymbol(symbol: ts.Symbol) {
        const resolved = resolveEntity(symbol);
        if (resolved) {
            return resolved;
        } else {
            return referenceNonExportedSymbol(symbol);
        }
    }

    function referenceNonExportedSymbol(symbol: ts.Symbol): rConcepts.Entity | undefined {
        const declarations = symbol.getDeclarations();
        if (!declarations || declarations.length === 0) {
            return;
        }

        if (declarations.some((declaration) => {
            const sourceFile = declaration.getSourceFile();
            return program.isSourceFileDefaultLibrary(sourceFile) ||
                program.isSourceFileFromExternalLibrary(sourceFile);
        })) {
            return;
        }

        const { addStatements, entity } = registerNonExportedSymbol(symbol, nameResolver.current());

        // TODO: ensure that event `rEntity` is not a sub-namespace of current,
        // this also works well
        nameResolver.enter(entity.parent);

        const statements: ts.Statement[] = [];
        for (const declaration of declarations) {
            if (ts.isModuleDeclaration(declaration)) {
                const namespaceTraits = entity.addNamespaceTraits();
                nameResolver.enter(namespaceTraits);
                statements.push(
                    recastModuleDeclarationAsNamespaceDeclaration(declaration, entity.name));
                nameResolver.leave();
            } else {
                pushIfNonNull(
                    statements,
                    recastDeclaration(declaration, entity.name, true),
                );
            }
        }

        nameResolver.leave();

        addStatements(statements);

        return entity;
    }

    function addImport(module: string, symbolName?: string): string[] {
        const current = nameResolver.current();
        let currentExportingModule = current;
        while (!currentExportingModule.entity.symbol || !currentExportingModule.entity.isModule()) {
            currentExportingModule = currentExportingModule.entity.parent.entity.namespaceTraits!;
        }

        const currentTLM = currentExportingModule.entity.moduleTraits!;
        if (!(module in currentTLM.imports)) {
            currentTLM.imports[module] = {
                namedImports: {},
            };
        }

        const symbolNameX = symbolName || 'default';

        const importDetail = currentTLM.imports[module];
        const importSymbols = importDetail.namedImports;
        if (!(symbolNameX in importSymbols)) {
            const importName = generateUniqueNameInModule(currentTLM, symbolNameX, importDetail);
            importSymbols[symbolNameX] = importName;
        }

        return [
            importSymbols[symbolNameX],
        ];
    }

    function generateUniqueNameInModule(moduleTraits: rConcepts.ModuleTraits, preferredName: string, importDetail: rConcepts.ImportDetail): string {
        const nsTraits = moduleTraits.entity.namespaceTraits!;
        let tryingName = preferredName;
        while (tryingName === '__private' ||
            nsTraits.children.some((child) => child.name === tryingName) ||
            (tryingName in importDetail.namedImports)) {
            tryingName = `_${tryingName}`;
        }
        return tryingName;
    }
}