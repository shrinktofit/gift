
import * as fs from 'fs-extra';
import * as path from 'path';
import ts from 'typescript';
import ps from 'path';
import * as rConcepts from './r-concepts';
import { NameResolver } from './name-resolver';
import { distributeExports } from './distribute-exports';
import { recastTopLevelModule } from './recast';

export interface IOptions {
    input: string | string[];
    rootDir?: string;
    output: string;

    name?: string;
    rootModule?: string;
    entries?: Record<string, string>;

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
    const inputs = Array.isArray(options.input) ? options.input : [options.input];
    if (!inputs.every(input => fs.existsSync(input))) {
        return { error: GiftErrors.InputFileNotFound };
    }

    return rollupTypes(options);
}

class SymbolEntityMap {
    public set(symbol: ts.Symbol, entity: rConcepts.Entity) {
        // return this._map.set(symbol, entity);
        (symbol as any)[this._entitySymbol] = entity;
    }

    public get(symbol: ts.Symbol): rConcepts.Entity | undefined {
        // return this._map.get(symbol);
        return (symbol as any)[this._entitySymbol];
    }

    // private _map: Map<ts.Symbol, rConcepts.Entity> = new Map();

    private _entitySymbol = Symbol('[[Entity]]');
}

export function rollupTypes(options: IOptions) {
    const inputs = Array.isArray(options.input) ? options.input : [options.input];
    const entries = getEntries();
    const program = createProgram();
    const typeChecker = program.getTypeChecker();
    const statements = bundle();
    return emit(statements);

    function getEntries() {
        if (options.entries) {
            return options.entries;
        } else if (options.rootModule && options.name) {
            return {
                [options.name]: options.rootModule,
            };
        }
        throw new Error(`'entries' is not specified.`);
    }

    function createTscOptions(): ts.CompilerOptions {
        return {
            rootDir: options.rootDir ?? ps.dirname(inputs[0]),
        };
    }

    function createProgram(): ts.Program {
        const tscOptions = createTscOptions();
        return ts.createProgram({
            rootNames: inputs,
            options: tscOptions,
        });
    }

    function bundle() {
        const ambientModules = typeChecker.getAmbientModules();

        const entryModules = Object.entries(entries).map(([entryModuleName, entryModuleId]) => {
            const name = `"${entryModuleId}"`;
            const moduleSymbol = ambientModules.find(m => m.getName() === name);
            if (!moduleSymbol) {
                throw new Error(`Entry ${entryModuleName}: ${entryModuleId} is not found.`);
            }
            return {
                name: entryModuleName,
                symbol: moduleSymbol,
            };
        });

        const rEntityMap = new SymbolEntityMap();

        const exportDistribution = distributeExports(entryModules.map((eM) => eM.symbol), typeChecker, []);

        const distributionMap = new Map<distributeExports.InternalModuleMeta, rConcepts.NamespaceTraits>();

        const neNamespaceMap = new Map<rConcepts.NamespaceTraits, {
            ns: rConcepts.NamespaceTraits;
            statements: ts.Statement[];
        }>();

        const rExternalModules = entryModules.map((entryModule, iEntryModule) => {
            const rModule = rConcepts.createModule(entryModule.name, entryModule.symbol);
            createREntities(exportDistribution[iEntryModule], rModule.namespaceTraits!);
            return rModule;
        });

        const visitModules = (
            moduleMeta: distributeExports.ModuleMeta,
            fx: (moduleMeta: distributeExports.ModuleMeta) => void,
        ) => {
            fx(moduleMeta);
            for (const mainExport of moduleMeta.mainExports) {
                if (mainExport.children) {
                    for (const child of mainExport.children) {
                        visitModules(child, fx);
                    }
                }
            }
        };

        for (const distribution of exportDistribution) {
            visitModules(distribution, addAliasExports);
        }

        const nameResolver = new NameResolver();
        const myRecast = (rModule: rConcepts.ModuleTraits) => recastTopLevelModule({
            program,
            typeChecker,
            rModule,
            nameResolver,
            resolveEntity: (symbol) => rEntityMap.get(symbol),
            registerNonExportedSymbol,
        });

        const statements: ts.Statement[] = [];
        for (const rModule of rExternalModules) {
            statements.push(...myRecast(rModule.moduleTraits!));
        }
        return statements;

        function createREntities(
            moduleExportDistribution: distributeExports.InternalModuleMeta,
            parent: rConcepts.NamespaceTraits,
        ) {
            distributionMap.set(moduleExportDistribution, parent);
            return moduleExportDistribution.mainExports.forEach((mainExport) => {
                const rEntity = new rConcepts.Entity(parent, mainExport.exportSymbol.name, mainExport.originalSymbol);
                if (mainExport.children) {
                    const namespaceTraits = rEntity.addNamespaceTraits();
                    for (const nestedModule of mainExport.children) {
                        createREntities(nestedModule, namespaceTraits);
                    }
                }
                rEntityMap.set(mainExport.originalSymbol, rEntity);
                return rEntity;
            });
        }

        function addAliasExports(moduleDistribution: distributeExports.InternalModuleMeta) {
            const rModule = distributionMap.get(moduleDistribution)!;
            for (const aeDistribution of moduleDistribution.aliasExports) {
                rModule.addAliasExport({
                    module: distributionMap.get(aeDistribution.module)!,
                    importName: aeDistribution.module.mainExports[aeDistribution.mainExportIndex].exportSymbol.name,
                    exportName: aeDistribution.exportSymbol.name,
                });
            }
        }

        function registerNonExportedSymbol(symbol: ts.Symbol, currentNamespace: rConcepts.NamespaceTraits) {
            let currentNamespaceInSource = currentNamespace;
            while (!currentNamespaceInSource.entity.symbol) {
                currentNamespaceInSource = currentNamespaceInSource.entity.parent.entity.namespaceTraits!;
            }

            // const neNamespaceParent = currentExportingModule;
            const neNamespaceParent = currentNamespaceInSource.entity.ownerModuleOrThis;
            let neNamespace = neNamespaceParent.namespaceTraits.neNamespace;
            if (!neNamespace) {
                neNamespace = neNamespaceParent.namespaceTraits.createNENamespace();
            }
            const name = generateUniqueName(symbol, neNamespace.trait, currentNamespaceInSource);
            const entity = new rConcepts.Entity(neNamespace.trait, name, symbol);
            rEntityMap.set(symbol, entity);
            return {
                entity,
                addStatements: (statements: ts.Statement[]) => {
                    neNamespace!.statements.push(...statements);
                },
            };
        }

        function generateUniqueName(symbol: ts.Symbol, parentModule: rConcepts.NamespaceTraits, referenceNamespaceTraits: rConcepts.NamespaceTraits): string {
            const declaration0 = symbol.getDeclarations()?.[0];
            if (!declaration0) {
                return symbol.getName();
            }

            const namespaces: string[] = [];
            let current: ts.Node = declaration0;
            while (true) {
                if (ts.isSourceFile(current)) {
                    break;
                } else if (ts.isModuleDeclaration(current) && ts.isSourceFile(current.parent)) {
                    namespaces.push(createIdFromModuleName(current.name));
                }
                current = current.parent;
            }
            
            if (!(ts.isModuleDeclaration(declaration0) && ts.isSourceFile(declaration0.parent))) {
                namespaces.push(symbol.getName());
            }
            return namespaces.join('_');
        }

        function createIdFromModuleName(name: ts.ModuleName) {
            if (ts.isIdentifier(name)) {
                return name.text;
            } else {
                return name.text.replace(/[\/\\-]/g, '_');
            }
        }
    }

    function emit(statements: ts.Statement[]) {
        const outputPath = options.output;

        // if (options.verbose) {
        //     console.log(`Referenced source files:[`);
        //     for (const referencedSourceFile of this._referencedSourceFiles) {
        //         console.log(`  ${referencedSourceFile.fileName},`);
        //     }
        //     console.log(`]`);
        // }

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

        const lines: string[] = [];
        // const typeReferencePaths: string[] = [];
        // if (rootModule.declarations && rootModule.declarations.length !== 0) {
        //     const declaration0 = rootModule.declarations[0];
        //     const rootSourceFile = declaration0.getSourceFile();
        //     const resolvedTypeReferenceDirectives: ts.Map<ts.ResolvedTypeReferenceDirective> =
        //         this._program.getResolvedTypeReferenceDirectives();
        //     resolvedTypeReferenceDirectives.forEach((trd, key) => {
        //         if (!trd.resolvedFileName) {
        //             return;
        //         }
        //         const trdSourceFile = this._program.getSourceFile(trd.resolvedFileName);
        //         if (!trdSourceFile || !this._referencedSourceFiles.has(trdSourceFile)) {
        //             return;
        //         }
        //         lines.push(`/// <reference types="${key}"/>`);
        //         typeReferencePaths.push(trd.resolvedFileName);
        //     });
        // }
        const statementsArray = ts.createNodeArray(statements);
        const result = printer.printList(
            ts.ListFormat.MultiLine, statementsArray, sourceFile);
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
        return { error: GiftErrors.Ok, code };
    }
}
