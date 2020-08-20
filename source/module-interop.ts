
import ts from 'typescript';

export class ModuleInteropRecord {
    constructor(name: string) {
        this._myName = name;
    }

    get record(): Readonly<ModuleInteropRecord['_record']> {
        return this._record;
    }

    get selfExports() {
        return this._selfExports;
    }

    public addNamedImport(from: string, importName: string, exportName: string) {
        const interop = this._getInterop(from);
        const isImportExportNameSame = importName === exportName;
        for (const { propertyName, name } of interop.imports) {
            if (isImportExportNameSame) {
                if (name.text === importName) {
                    return;
                }
            } else {
                if (propertyName && propertyName.text === importName &&
                    name.text === exportName) {
                    return;
                }
            }
        }
        interop.imports.push(isImportExportNameSame ?
            ts.createImportSpecifier(undefined, ts.createIdentifier(importName)):
            ts.createImportSpecifier(ts.createIdentifier(exportName), ts.createIdentifier(importName)),
        );
    }

    public addNamedExportFrom(from: string, importName: string, exportName: string) {
        const interop = this._getInterop(from);
        const isImportExportNameSame = importName === exportName;
        if (!interop.exports.some((specifier) => this._isEqualExportSpecifier(specifier, importName, exportName))) {
            interop.exports.push(isImportExportNameSame ?
                ts.createExportSpecifier(undefined, ts.createIdentifier(importName)):
                ts.createExportSpecifier(ts.createIdentifier(exportName), ts.createIdentifier(importName)),
            );
        }
    }
    
    public addNamedExport(localName: string, exportName: string) {
        if (!this._selfExports.some((specifier) => this._isEqualExportSpecifier(specifier, localName, exportName))) {
            this._selfExports.push((localName === exportName) ?
                ts.createExportSpecifier(undefined, ts.createIdentifier(localName)):
                ts.createExportSpecifier(ts.createIdentifier(exportName), ts.createIdentifier(localName)),
            );
        }
    }

    private _myName: string;
    private _selfExports: ts.ExportSpecifier[] = [];
    private _record: Map<string, {
        specifier: string;
        imports: ts.ImportSpecifier[];
        exports: ts.ExportSpecifier[];
    }> = new Map();

    private _getInterop(from: string) {
        let interop = this._record.get(from);
        if (!interop) {
            const specifier = this._optimizeModuleSpecifierTo(from);
            interop = {
                specifier,
                imports: [],
                exports: [],
            };
            this._record.set(from, interop);
        }
        return interop;
    }

    private _optimizeModuleSpecifierTo(to: string): string {
        return to;
    }

    private _isEqualExportSpecifier(
        specifier: ts.ExportSpecifier, localOrImportName: string, exportName: string) {
        if (specifier.name.text !== localOrImportName) {
            return false;
        }
        if (localOrImportName === exportName) {
            return !specifier.propertyName || specifier.propertyName.text === exportName;
        } else {
            return specifier.propertyName && specifier.propertyName.text === exportName;
        }
    }
}
