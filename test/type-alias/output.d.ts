declare module "out/index" {
    export class C {
        get handle(): Handle;
    }
    export enum PoolType {
        PASS = 0
    }
    export interface Handle<T extends PoolType> {
        _: T;
    }
    export type PassHandle = Handle<PoolType.PASS>;
    export {};
}
