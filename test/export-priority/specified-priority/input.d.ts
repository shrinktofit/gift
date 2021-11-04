

declare module "aa" {
    export { C } from 'cc';
}

declare module "bb" { export { C } from 'cc'; }

declare module "cc" { export class C { } }