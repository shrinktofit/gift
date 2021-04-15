declare module "out/index" {
    /**
     * Function.
     */
    export function f(p1: number, p2: string): void;
    /**
     * Variable.
     */
    export const v: number;
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
    export namespace bar {
        export class Bar {
        }
    }
    export {};
}
