
declare module "foo" {
    export class C {
        get handle(): import('bar').PassHandle;
    }

    export * from 'bar';
}

declare module "bar" {
    export enum PoolType {
        PASS = 0,
    }

    export interface Handle<T extends PoolType> {
        _: T;
    }

    export type PassHandle = Handle<PoolType.PASS>;
}
