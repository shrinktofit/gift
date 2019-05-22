
Yet another tool to generate bundled `.d.ts`.

The tool is essentially used in https://github.com/cocos-creator/engine .

For instance, this tool bundles
```
declare module "index" {
    export * from "math";
}
declare module "math" {
    export { Vec2 } from "math/vec2";
    export { Vec3 } from "math/vec3";
    import * as utils from "math/utils";
    export { utils };
}
declare module "math/vec2" {
    export class Vec2 {}
}
declare module "math/vec3" {
    export class Vec3 {}
}
declare module "math/utils" {
    export function sin();
    export function cos();
}
```
into
```
declare module "my-module" {
    export class Vec2 {}
    export class Vec3 {}
    namespace utils {
        export function sin(n: number);
        export function cos(n: number);
    }
}
```

## Getting started

### How-to

Install this package, such as, from npm:
```bash
npm install -g tfig
```

Compile your TypeScript project, make sure to let tsc generate a single declaration file. eg. Have the option `outFile` in `tsconfig.json`:
```json
{
    outFile: "out.js",
}
```

Bundle:
```bash
gift-cli --input "out.d.ts" --root "name-of-the-root-module-in-your-project" --output "path-to-your-output-dir" --name "your-bundle-name"
```

### Comman line arguments

*input*

Path to the unbundled `*.d.ts` file. In general, this file this produced by tsc.

*root*

Name of the root module to bundle.

*output*

Output path. Can be directory or file.

*name*

The generated module name.