import ts from 'typescript';
import { hasJsDocTag } from './ts-utils';

export function distributeExports(
    moduleSymbols: ts.Symbol[],
    typeChecker: ts.TypeChecker,
    priorityList: string[] = [],
    privateJsDocTag?: string,
) {
    const parsedPriorityList = priorityList.map((id) => `"${id.replace(/\\/g, '/').replace(/\.(js|ts|d\.ts)$/, '')}"`);

    const exportMap: Map<ts.Symbol, SymbolInfo> = new Map();

    const moduleMetaList = moduleSymbols.map((moduleSymbol) => {
        const moduleMeta: distributeExports.ModuleMeta = {
            symbol: moduleSymbol,
            mainExports: [],
            aliasExports: [],
            [prioritySymbol]: getExportPriority(moduleSymbol, parsedPriorityList),
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
            if (privateJsDocTag) {
                // TODO: to add a Set to keep the internal originalSymbol, if it's referenced, we put it into the NE namespace. 
                if ((exportedSymbol.flags & ts.SymbolFlags.Alias) && (originalSymbol.flags & ts.SymbolFlags.Module)) {
                    // We need to detect tag on exported symbol with alias flag.
                    const parentNode = exportedSymbol.declarations?.[0]?.parent?.parent;
                    if (parentNode) {
                        const tags = ts.getJSDocTags(parentNode).map(tag => {return { name: tag.tagName.escapedText } as ts.JSDocTagInfo});
                        if (hasJsDocTag(tags, privateJsDocTag)) {
                            continue;
                        }
                    }
                } else {
                    if (hasJsDocTag(originalSymbol.getJsDocTags(), privateJsDocTag)) {
                        continue;
                    }
                }
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
                        [prioritySymbol]: moduleMeta[prioritySymbol],
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
        // If there is only one export port, that's it.
        if (exportPorts.length === 1) {
            return 0;
        }

        // If any of the ports is specified with priority, we take the hightest specified one.
        const iHighestPriorityPort = exportPorts
            .map((_, index) => index)
            .sort((a, b) => exportPorts[a].module[prioritySymbol] - exportPorts[b].module[prioritySymbol])[0];
        if (!isNonSpecifiedPriority(exportPorts[iHighestPriorityPort].module[prioritySymbol], parsedPriorityList)) {
            return iHighestPriorityPort;
        }

        // Otherwise, We first search if there is an export is specified as 'main' by user.
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

const prioritySymbol = Symbol('Priority');

function getExportPriority(moduleSymbol: ts.Symbol, parsedPriorityList: string[]): number {
    const index = parsedPriorityList.indexOf(moduleSymbol.getName());
    return index >= 0 ? index : parsedPriorityList.length;
}

function isNonSpecifiedPriority(priority: number, parsedPriorityList: string[]) {
    return priority === parsedPriorityList.length;
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

        /**
         * Index into the priority list indicates what priority this module has, to export a symbol.
         * If this module is not in priority list, it's set to length of the priority list.
         */
        [prioritySymbol]: number;
    }

    export type ManualMainExport = string | RegExp;
}
