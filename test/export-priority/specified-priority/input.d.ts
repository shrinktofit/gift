

declare module "a" {
    export { C } from 'c';
}

declare module "b" { export { C } from 'c'; }

declare module "c" { export class C { } }