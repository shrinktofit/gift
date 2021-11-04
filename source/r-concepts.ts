import ts from 'typescript';
import { resolveRelativePath } from './name-resolver';

const noParent: NamespaceTraits = null as unknown as NamespaceTraits;

export class Entity {
    /**
     * `null` indicates this entity is created by us.
     */
    public symbol: ts.Symbol | null;

    public moduleTraits?: ModuleTraits;

    constructor(parent: NamespaceTraits, name: string, symbol: ts.Symbol | null) {
        this.symbol = symbol;
        this._name = name;
        if (parent === noParent) {
            this._fullPath = [ ];
        } else {
            if (parent.entity.isModule()) {
                this._ownerModule = parent.entity;
            } else {
                this._ownerModule = parent.entity.ownerModule;
            }
            this._fullPath = parent.entity.fullPath.slice();
            parent.children.push(this);
        }
        this._fullPath.push(this);
    }

    get name() {
        return this._name;
    }

    get parent() {
        return this._fullPath[this._fullPath.length - 2].namespaceTraits!;
    }

    get fullPath() {
        return this._fullPath;
    }

    get ownerModule(): ModuleEntity | undefined {
        return this._ownerModule;
    }

    get ownerModuleOrThis(): ModuleEntity {
        return this._ownerModule ?? (this as ModuleEntity);
    }

    get namespaceTraits() {
        return this._namespaceTraits;
    }

    public isModule (): this is ModuleEntity {
        return !!this.moduleTraits && !!this.namespaceTraits;
    }

    public addNamespaceTraits() {
        this._namespaceTraits = new NamespaceTraits(this);
        return this._namespaceTraits;
    }

    private _name: string;
    private _ownerModule: ModuleEntity | undefined = undefined;
    private _namespaceTraits?: NamespaceTraits;
    private _fullPath: Entity[] = [];
}

type ModuleEntity = Entity & {
    readonly namespaceTraits: NamespaceTraits;
    readonly moduleTraits: ModuleTraits;
    readonly ownerModule: undefined;
};

export class BaseTraits {
    readonly entity: Entity;

    constructor(entity: Entity) {
        this.entity = entity;
    }
}

export class ModuleTraits extends BaseTraits {
    private _imports: Record<string, ImportDetail> = {};
    /**
     * 
     */
    private _interopRecord: Map<string, {
        specifier: string;
        /**
         * import { xx, yy as zz } from 'ww';
         */
        imports: { asName: string, importName: string }[];

        /**
         * export { xx, yy as zz } from 'ww';
         */
        exports: { asName: string, importName: string }[];
    }> = new Map();

    get imports() {
        return this._imports;
    }

    get interopRecord() {
        return this._interopRecord;
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

    private _generateUniqueImportName(preferredName: string) {
        let tryingName = preferredName;
        while (tryingName === '__private' || this._hasName(tryingName)) {
            tryingName = `_${tryingName}`;
        }
        return tryingName;
    }

    private _hasName(name: string) {
        return this.entity.namespaceTraits!.children.some((childEntity) => childEntity.name === name) ||
            this._hasNameInInterop(name);
    }

    private _hasNameInInterop(name: string) {
        for (const [, {imports, exports}] of this._interopRecord) {
            if (imports.some(({asName}) => asName === name)) {
                return true;
            }
            if (exports.some(({asName}) => asName === name)) {
                return true;
            }
        }
        return false;
    }

    private _getInterop(from: string) {
        let interop = this._interopRecord.get(from);
        if (!interop) {
            const specifier = this._optimizeModuleSpecifierTo(from);
            interop = {
                specifier,
                imports: [],
                exports: [],
            };
            this._interopRecord.set(from, interop);
        }
        return interop;
    }

    private _optimizeModuleSpecifierTo(to: string): string {
        return to;
    }
}

export interface ImportDetail {
    namedImports: Record<string, string>;
}

export class NamespaceTraits extends BaseTraits {
    private _children: Entity[] = [];

    private _aliasExports: Array<{
        module: NamespaceTraits;
        importName: string;
        exportName: string;
    }> = [];

    /**
     * namespace N { export { xx, yy as zz }; }
     */
    private _selfExports: Array<{
        asName: string;
        importName: string;
    }> = [];

    /**
     * namespace N { export import x = X.Y.Z.y; }
     */
    private _selfExportsFromNamespaces: Array<{
        asName: string;
        importName: string;
        where: string[];
    }> = [];

    /**
     * ne Means "non-exporting"
     */
    private _neNamespace?: {
        trait: NamespaceTraits;
        statements: ts.Statement[];
    }

    get children() {
        return this._children;
    }

    get selfExports() {
        return this._selfExports;
    }

    get selfExportsFromNamespaces() {
        return this._selfExportsFromNamespaces;
    }

    get neNamespace() {
        return this._neNamespace;
    }
    
    public addChild(entity: Entity) {
        this._children.push(entity);
    }

    public addAliasExport(aliasExport: NamespaceTraits['_aliasExports'][0]) {
        this._aliasExports.push(aliasExport);
    }

    public getOrCreateNENamespace() {
        if (this._neNamespace) {
            return this._neNamespace;
        }

        const neNs = new Entity(this, `__private`, null);
        const trait = neNs.addNamespaceTraits();
        const neNamespace = {
            trait,
            statements: [],
        };
        return this._neNamespace = neNamespace;
    }

    public transformAliasExports() {
        const targetEntity = this.entity;
        const targetModule = targetEntity.ownerModuleOrThis;
        const targetModuleTraits = targetModule.moduleTraits;
        const isTargetInternal = !targetEntity.isModule();

        const addNamespaceReference = (to: NamespaceTraits) => {
            const resolved = resolveRelativePath(this, to.entity);
            const ids: string[] = [];
            if (!resolved.module) {
                ids.push(...(resolved.namespaces?.slice() ?? []), resolved.name);
            } else {
                const namespaces = resolved.namespaces;
                const leftmost = namespaces ? namespaces[0] : resolved.name;
                const leftMostImportName = targetModuleTraits.addNamedImport(resolved.module.name, leftmost);
                ids.push(leftMostImportName);
                if (namespaces) {
                    ids.push(...namespaces.slice(1), resolved.name);
                }
            }
            return ids;
        };

        for (const aliasExport of this._aliasExports) {
            const {
                importName,
                exportName,
                module: sourcePlace,
            } = aliasExport;
            const isSourceInternal = !sourcePlace.entity.isModule();

            switch (true) {
                case !isTargetInternal && !isSourceInternal:
                    targetModuleTraits.addNamedExportFrom(
                        sourcePlace.entity.moduleTraits!.entity.name, importName, exportName);
                    break;
                case isSourceInternal:
                    // import from namespace, export into either module or namespace
                    {
                        const namespaceReference = addNamespaceReference(sourcePlace);
                        this._addSelfExportFromNamespace(namespaceReference, importName, exportName);
                    }
                    break;
                case isTargetInternal && !isSourceInternal:
                    // import from module, export into namespace
                    {
                        let asName = exportName;
                        if (sourcePlace.entity !== targetModule) {
                            asName = targetModuleTraits.addNamedImport(sourcePlace.entity.moduleTraits!.entity.name, exportName);
                        }
                        this._addSelfExport(exportName, asName);
                    }
                    break;
            }
        }
    }

    private _addSelfExport(importName: string, asName: string) {
        this._selfExports.push({ importName, asName });
    }

    private _addSelfExportFromNamespace(where: string[], importName: string, asName: string) {
        this._selfExportsFromNamespaces.push({ where, importName, asName });
    }
}

export function createModule(name: string, symbol: ts.Symbol) {
    const entity = new Entity(noParent, name, symbol);
    entity.addNamespaceTraits();
    entity.moduleTraits = new ModuleTraits(entity);
    return entity as ModuleEntity;
}
