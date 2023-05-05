

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

    /**
     * Var referencing unexported namespace.
     */
    export const varReferencingUnexportedNamespace: Function & typeof UnexportedNamespace;

    /**
     * Unexported namespace.
     */
    namespace UnexportedNamespace {
        /**
         * Unexported namespace member function.
         */
        export const memberVar: number;

        /**
         * Unexported namespace member function.
         */
        export function memberFunction(): void;

        /**
         * Unexported namespace member class.
         */
        export class MemberClass { }

        /**
         * Unexported namespace member interface.
         */
        export interface MemberInterface { }
    }
}

declare module "bar" {
    export class Bar {}
}
