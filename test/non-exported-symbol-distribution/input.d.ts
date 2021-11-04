declare module "foo" {
    import { NonExported } from "internal";

    export function foo(): NonExported;
}

declare module "bar" {
    import { NonExported } from "internal";
    
    export function bar(): NonExported;
}

declare module "baz" {
    import { NonExported } from "internal";

    export function foo(): NonExported;
}

declare module "internal" {
    export class NonExported { }
}
