import ts from 'typescript';

export function distributeExports(
    moduleSymbols: ts.Symbol[],
    typeChecker: ts.TypeChecker,
    manualMainExports: Array<distributeExports.ManualMainExport>,
) {
    const exportMap: Map<ts.Symbol, SymbolInfo> = new Map();

    const moduleMetaList = moduleSymbols.map((moduleSymbol) => {
        const moduleMeta: distributeExports.ModuleMeta = {
            symbol: moduleSymbol,
            mainExports: [],
            aliasExports: [],
        };
        iterateModuleExports(moduleSymbol, moduleMeta);
        return moduleMeta;
    });

    exportMap.forEach((symbolInfo, originalSymbol) => {
        const { exportPorts } = symbolInfo;
        const iMainExportPort = findBestExportMeta(originalSymbol, exportPorts);
        const mainExportPort = exportPorts[iMainExportPort];
        const mainExportModule = mainExportPort.module;
        const mainExportIndex = mainExportModule.mainExports.length;
        mainExportModule.mainExports.push({
            originalSymbol,
            exportSymbol: mainExportPort.through,
            children: symbolInfo.children,
        });
        exportPorts.forEach((aliasingExportPort, iAliasingExportPort) => {
            if (iAliasingExportPort === iMainExportPort) {
                return;
            }
            aliasingExportPort.module.aliasExports.push({
                module: mainExportModule,
                mainExportIndex: mainExportIndex,
                exportSymbol: aliasingExportPort.through,
            });
        });
    });

    return moduleMetaList;

    interface ExportPort {
        through: ts.Symbol;
        module: distributeExports.InternalModuleMeta;
    }

    interface SymbolInfo {
        exportPorts: ExportPort[];

        /**
         * Exists if this is a module symbol.
         */
        children?: distributeExports.InternalModuleMeta[];
    }

    function iterateModuleExports(moduleSymbol: ts.Symbol, moduleMeta: distributeExports.InternalModuleMeta) {
        const exportSymbols = typeChecker.getExportsOfModule(moduleSymbol);
        for (const exportedSymbol of exportSymbols) {
            let originalSymbol = exportedSymbol;
            if (exportedSymbol.flags & ts.SymbolFlags.Alias) {
                originalSymbol = typeChecker.getAliasedSymbol(exportedSymbol);
            }

            if ((exportedSymbol.getFlags() & ts.SymbolFlags.Prototype) &&
                (exportedSymbol.getFlags() & ts.SymbolFlags.Property)) {
                // A symbol with both class and namespace declaration
                // might have a prototype exported symbol, which associates no declarations.
                continue;
            }

            let symbolInfo = exportMap.get(originalSymbol);
            if (symbolInfo === undefined) {
                symbolInfo = {
                    exportPorts: [],
                };
                if (originalSymbol.getFlags() & ts.SymbolFlags.Module) {
                    symbolInfo.children = [];
                    const nestedModule: distributeExports.InternalModuleMeta = {
                        symbol: moduleSymbol,
                        mainExports: [],
                        aliasExports: [],
                    };
                    symbolInfo.children.push(nestedModule);
                    iterateModuleExports(originalSymbol, nestedModule);
                }

                exportMap.set(originalSymbol, symbolInfo);
            }

            symbolInfo.exportPorts.push({
                through: exportedSymbol,
                module: moduleMeta,
            });
        }
    }

    function findBestExportMeta(originalSymbol: ts.Symbol, exportPorts: ExportPort[]): number {
        // We first search if there is an export is specified as 'main' by user.
        const iMatched = exportPorts.findIndex((exportPort) => matchExportPort(exportPort));
        if (iMatched >= 0) {
            return iMatched;
        }
        
        // If not, we prefer the module which exports the original.
        const iOriginal = exportPorts.findIndex((exportPort) => exportPort.through === originalSymbol);
        if (iOriginal >= 0) {
            return iOriginal;
        }

        // If no module exports original, we use the first we met.
        return 0;
    }

    function matchExportPort(exportPort: ExportPort): boolean {
        return false; // TODO
    }
}

export namespace distributeExports {
    export interface ModuleMeta extends InternalModuleMeta {
    }
    
    export interface InternalModuleMeta {
        symbol: ts.Symbol;
        mainExports: Array<{
            originalSymbol: ts.Symbol;
            exportSymbol: ts.Symbol;
            children?: InternalModuleMeta[];
        }>;
        aliasExports: Array<{
            module: InternalModuleMeta;

            /**
             * Index to the `mainExports` of `module`.
             */
            mainExportIndex: number;
            exportSymbol: ts.Symbol;
        }>;
    }

    export type ManualMainExport = string | RegExp;
}
