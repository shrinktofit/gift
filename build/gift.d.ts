export interface IOptions {
    input: string;
    output: string;
    name: string;
    rootModule: string;
    exportPrivates?: string;
    shelterName?: string;
}
export interface IBundleResult {
    error: GiftErrors;
    code?: string;
}
export declare enum GiftErrors {
    Ok = 0,
    InputFileNotFound = 1,
    RootModuleAbsent = 2,
    Fatal = 3
}
export declare function bundle(options: IOptions): IBundleResult;
