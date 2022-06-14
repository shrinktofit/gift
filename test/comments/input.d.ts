

declare module "foo" {
    /**
     * Variable.
     */
    export const v: number;

    /**
     * Function.
     */
    export function f(p1: number, p2: string): void;

    /**
     * Class.
     */
    export class C {
        /**
         * Constructor.
         */
        constructor();

        /**
         * Property
         */
        p: number;

        /**
         * Get accessor.
         */
        get a(): number;

        /**
         * Set accessor.
         */
        set a(value: number);

        /**
         * Method.
         */
        m(p1: number, p2: number): void;
    }

    /**
     * Namespace.
     */
    export * as bar from 'bar';

    /**
     * Namespace2.
     */
    export namespace Ns {
    }
}

declare module "bar" {
    export class Bar {}
}
