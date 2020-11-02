declare module "index" {
    import * as ns1 from "ns1";
    import * as ns2 from "ns2";
    export { ns1, ns2 };
}

declare module "ns1" {
    export const v: number;
}

declare module "ns2" {
    export { v } from 'ns1';
}