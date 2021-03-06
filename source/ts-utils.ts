
import ts from 'typescript';

export function splitLeftmost(entityName: ts.EntityName) {
    let rights: ts.Identifier[] = [];
    let leftmost: ts.EntityName = entityName;
    while (true) {
        if (ts.isIdentifier(leftmost)) {
            break;
        }
        rights.push(leftmost.right);
        leftmost = leftmost.left;
    }
    return {
        leftmost,
        rights,
    };
}

export function createEntityName(identifiers: string[], leftmost: ts.EntityName | null = null): ts.EntityName {
    let result = leftmost;
    for (const id of identifiers) {
        const newID = ts.createIdentifier(id);
        if (!result) {
            result = newID;
        } else {
            result = ts.createQualifiedName(result, newID);
        }
    }
    return result!;
}

export function createAccessLink(identifiers: string[], leftmost: ts.Expression | null = null): ts.Expression {
    let result = leftmost;
    for (const id of identifiers) {
        const newID = ts.createIdentifier(id);
        if (!result) {
            result = newID;
        } else {
            result = ts.createPropertyAccess(result, newID);
        }
    }
    return result!;
}

export function printSymbol(symbol: ts.Symbol) {
    const declaration = symbol.valueDeclaration || (
        (symbol.declarations !== undefined && symbol.declarations.length !== 0) ? symbol.declarations[0] : null);
    console.log(
        `[[${symbol.name}]], \n` +
        `  ${declaration ? stringifyNode(declaration) : '!!NO-DECLARATION!!'}, \n` +
        `  ${stringifySymbolFlags(symbol.flags)}`);
}

export function stringifySymbolFlags(flags: ts.SymbolFlags) {
    const satisfies: string[] = [];
    for (const key of Object.keys(ts.SymbolFlags)) {
        if (typeof key === 'string') {
            const value = (ts.SymbolFlags as any)[key];
            if (flags & value) {
                satisfies.push(key);
            }
        }
    }
    return satisfies.join(',');
}

export function stringifyNode(node: ts.Node) {
    return `Syntax Kind: ${ts.SyntaxKind[node.kind]}`;
}