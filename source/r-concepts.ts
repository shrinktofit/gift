import ts from 'typescript';

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
            if (parent.entity.isModule) {
                this._ownerModule = parent.entity.namespaceTraits!;
            } else {
                this._ownerModule = parent.entity.ownerModule;
            }
            this._fullPath = parent.entity.fullPath.slice();
            if (symbol) {
                parent.children.push(this);
            }
        }
        this._fullPath.push(this);
    }

    get isModule() {
        return !!this.moduleTraits;
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

    get ownerModule(): NamespaceTraits {
        return this._ownerModule;
    }

    get namespaceTraits() {
        return this._namespaceTraits;
    }

    public addNamespaceTraits() {
        this._namespaceTraits = {
            entity: this,
            children: [],
            aliasExports: [],
        };
        return this._namespaceTraits;
    }

    private _name: string;
    private declare _ownerModule: NamespaceTraits;
    private _namespaceTraits?: NamespaceTraits;
    private _fullPath: Entity[] = [];
}

export interface BaseTraits {
    entity: Entity;
}

export interface ModuleTraits extends BaseTraits {
    imports: Record<string, ImportDetail>;
}

export interface ImportDetail {
    namedImports: Record<string, string>;
}

export interface NamespaceTraits extends BaseTraits {
    children: Entity[];
    aliasExports: Array<{
        module: NamespaceTraits;
        importName: string;
        exportName: string;
    }>;
    neNamespace?: {
        name: string;
        statements: ts.Statement[];
    };
}

export function createModule(name: string, symbol: ts.Symbol) {
    const entity = new Entity(noParent, name, symbol);
    entity.addNamespaceTraits();
    entity.moduleTraits = {
        entity,
        imports: {},
    };
    return entity;
}
