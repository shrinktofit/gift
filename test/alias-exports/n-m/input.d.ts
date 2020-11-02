declare module "ns" {
    export const v: number;
    export class c {}
}

declare module "index" {
    import * as ns from "ns";
    export { ns };

    export {
        v as v_,
        c as c_,
    } from 'ns';
}
