declare module "cc" {
    const enum Refs {
        a = '1',
    }

    export namespace internal {
        export import Refs_ = Refs;
    }

    export {};
}

