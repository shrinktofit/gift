declare module "out/index" {
    export const v: number;
    export namespace ns {
        export { v };
    }
    export {};
}
