import * as publicNS from './public-namespace';
import * as internalNS from './internal-namespace';

export { publicNS };
/**
 * @internal
 */
export { internalNS };

export * from './all';
export { internalNamedExport, publicNamedExport } from './named-export';

/**
 * @internal
 */
export class InternalA {}

export class A {
    /**
     * @internal
     */
    internalMethod (): InternalA;

    publicMethod (): InternalA;

    /**
     * @internal
     */
    get internalAccessor ();
    set internalAccessor (v: InternalA);

    get publicAccessor ();
    set publicAccessor (v: InternalA);

    /**
     * @internal
     */
    inaternalField: number;

    publicField: number;
}

export declare const typeLiternal: {
    /**
     * @internal
     */
    internalMethod (): InternalA;
    publicMethod (): InternalA;

    /**
     * @internal
     */
    inaternalProp: number;
    publicProp: number;
}

/**
 * @internal
 */
export interface internalInterface {
    /**
     * @internal
     */
    internalMethod (): InternalA;
    publicMethod (): InternalA;

    /**
     * @internal
     */
    inaternalProp: number;
    publicProp: number;
}

export interface publicInterface {
    /**
     * @internal
     */
    internalMethod (): internalInterface;
    publicMethod (): internalInterface;

    /**
     * @internal
     */
    inaternalProp: number;
    publicProp: number;
}