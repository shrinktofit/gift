import * as rConcepts from './r-concepts';

export class NameResolver {
    public resolve(entity: rConcepts.Entity) {
        return resolveRelativePath(this.current(), entity);
    }

    public enter(ns: rConcepts.NamespaceTraits) {
        console.log(`++ ${printNamespace(ns)}`);
        this._contextStack.push(ns);
    }

    public leave() {
        if (this._contextStack.length === 0) {
            throw new Error(`Bad NameResolver.leave() call`);
        } else {
            console.log(`-- ${printNamespace(this.current())}`);
            this._contextStack.pop();
        }
    }

    public current() {
        if (this._contextStack.length === 0) {
            // Shall not happen
            debugger;
        }
        const context = this._contextStack[this._contextStack.length - 1];
        return context;
    }
    
    private _contextStack: rConcepts.NamespaceTraits[] = [];
}

export namespace NameResolver {
    export interface ResolveResult {
        module?: string;
        namespaces?: string[];
        name: string;
    }
}

function printNamespace(trait: rConcepts.NamespaceTraits) {
    const fullPath = trait.entity.fullPath;
    return `"${fullPath[0].name}"${fullPath.length === 0 ? '' : `.${fullPath.slice(1).map(e => e.name).join('.')}`}`;
}

export function resolveRelativePath(from: rConcepts.NamespaceTraits, to: rConcepts.Entity) {
    const fromFullPath = from.entity.fullPath;
    const toFullPath = to.fullPath;

    let iUnmatchedNamespace = 0;
    for (; iUnmatchedNamespace < fromFullPath.length &&
        iUnmatchedNamespace < toFullPath.length;
        ++iUnmatchedNamespace) {
        if (fromFullPath[iUnmatchedNamespace] !== toFullPath[iUnmatchedNamespace]) {
            break;
        }
    }

    // assert(toFullPath.length >= 2);
    const result: NameResolver.ResolveResult = {
        name: toFullPath[toFullPath.length - 1].name,
    };

    // We should consider an edge case:
    // an inner namespace 'A' reference outer namespace 'B', for example,
    // the shortest path is "a.b....".
    // However the 'A' may also has a (nested) namespace named "a.b....".
    // So the conflict occurs.
    // In such case, we have to prefer the longest path to avoid conflict.
    let iNoConflict = iUnmatchedNamespace;
    if (iNoConflict < toFullPath.length) {
        while (iNoConflict > 0) {
            const entity = toFullPath[iNoConflict];
            if (!mayUnambiguousReferenceTo(entity, from, entity.name)) {
                --iNoConflict;
            } else {
                break;
            }
        }
    }

    if (iNoConflict === 0) {
        // Module mismatch
        result.module = toFullPath[0].name;
        ++iNoConflict;
    }

    const sliceSize = toFullPath.length - iNoConflict - 1;
    if (sliceSize > 0) {
        result.namespaces = toFullPath.slice(iNoConflict, iNoConflict + sliceSize).map(n => n.name);
    }

    return result;
}

function mayUnambiguousReferenceTo(ref: rConcepts.Entity, from: rConcepts.NamespaceTraits, name: string): boolean {
    let ns: rConcepts.NamespaceTraits = from;
    while (true) {
        for (const bro of ns.children) {
            if (bro === ref) {
                return true;
            } else if (bro.name === name) {
                return false;
            }
        }
        if (ns.entity.isModule) {
            break;
        } else {
            ns = ns.entity.parent;
        }
    }
    return true;
}