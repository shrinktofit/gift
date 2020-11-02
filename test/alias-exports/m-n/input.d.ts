declare module "index" {
    export const v: number;

    import * as ns from "ns";
    export { ns };
}

declare module "ns" {
    export { v } from 'index';
}
