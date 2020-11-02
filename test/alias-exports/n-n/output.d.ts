declare module "out/index" {
    export namespace ns1 {
        export const v: number;
    }
    export namespace ns2 {
        export import v = ns1.v;
    }
    export {};
}
