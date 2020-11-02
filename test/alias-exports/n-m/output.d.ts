declare module "out/index" {
    export namespace ns {
        export const v: number;
        export class c {
        }
    }
    export import v_ = ns.v;
    export import c_ = ns.c;
    export {};
}
