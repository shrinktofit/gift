
**Module -> Module**
```ts
module "a" { export class A {} }
// reimport
module "b" { export { A } from "a"; }
```

**Namespace -> Module**
```ts
namespace a { export class A {} }
// reference
module "c" { import A = a.A; }
// reimport
module "b" { export import A = a.A; }

// reimport
module "d" {
    export namespace e {
        export class B {}
    }
}
module "e" {
    import { e } from "d";
    import B = e.B;
    export { B };
}
```

""