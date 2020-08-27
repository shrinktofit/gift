
import ts from 'typescript';
import { Entity } from './r-concepts';

export class ModuleInteropRecord {
    constructor(entity: Entity) {
        this._entity = entity;
    }

    get record() {
        return this._record;
    }

    get selfExports() {
        return this._selfExports;
    }

    /**
     * @param from 
     * @param importName 
     * @param asName 
     */
    public addNamedImport(from: string, importName: string, asName?: string): string {
        const interop = this._getInterop(from);
        if (!asName) {
            const sameImport = interop.imports.find(
                (namedImportRecord) => namedImportRecord.importName === importName);
            if (sameImport) {
                return sameImport.asName;
            } else {
                asName = this._generateUniqueImportName(importName);
            }
        }
        if (!interop.imports.some(
            (namedImportRecord) => namedImportRecord.asName === asName && namedImportRecord.importName === importName)) {
            interop.imports.push({ importName, asName });
        }
        return asName;
    }

    public addNamedExportFrom(from: string, importName: string, asName: string) {
        const interop = this._getInterop(from);
        if (!interop.exports.some(
            (namedExportRecord) => namedExportRecord.asName === asName && namedExportRecord.importName === importName)) {
            interop.exports.push({ importName, asName });
        }
    }
    
    public addNamedExport(importName: string, asName: string) {
        if (!this._selfExports.some(
            (namedExportRecord) => namedExportRecord.asName === asName && namedExportRecord.importName === importName)) {
            this._selfExports.push({ importName, asName });
        }
    }

    private _entity: Entity;
    private _selfExports: { asName: string, importName: string }[] = [];
    private _record: Map<string, {
        specifier: string;
        imports: { asName: string, importName: string }[];
        exports: { asName: string, importName: string }[];
    }> = new Map();
    private _interopNames = new Set<string>();

    private _generateUniqueImportName(preferredName: string) {
        let tryingName = preferredName;
        while (tryingName === '__private' || this._hasName(tryingName)) {
            tryingName = `_${tryingName}`;
        }
        return tryingName;
    }

    private _hasName(name: string) {
        return this._entity.namespaceTraits!.children.some((childEntity) => childEntity.name === name) ||
            this._hasNameInInterop(name);
    }

    private _hasNameInInterop(name: string) {
        for (const [, {imports, exports}] of this._record) {
            if (imports.some(({asName}) => asName === name)) {
                return true;
            }
            if (exports.some(({asName}) => asName === name)) {
                return true;
            }
        }
        if (this._selfExports.some(({asName}) => asName === name)) {
            return true;
        }
        return false;
    }

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
}
