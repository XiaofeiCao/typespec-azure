---
title: "no-openapi-client-extensions"
---

```text title="Full name"
@azure-tools/typespec-azure-core/no-openapi-client-extensions
```

Azure specs should not use the `@typespec/openapi` `@extension` decorator to emit client-altering `x-ms-*` extensions or `x-nullable`.

These extensions change how clients, SDKs, and the ARM platform interpret an API. When they are hand-written with the raw `@extension` decorator they only appear in the OpenAPI output. Other emitters work from the semantic TypeSpec model, so they never see the extension and can generate an incorrect representation of the API.

Each of these extensions has a first-class TypeSpec construct that carries the same intent through the semantic model. Use that construct instead of the raw extension.

## Impact

- **Area:** API, SDK, Emitters

Hand-written client-altering extensions change the OpenAPI output without informing the semantic model, so client SDKs, service code, and ARM tooling can misrepresent the API.

## Extensions and alternatives

| Extension                             | Use instead                                                                                                                                                                                                                                   |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-ms-skip-url-encoding`              | `@path(#{ allowReserved: true })` from `@typespec/http`                                                                                                                                                                                       |
| `x-ms-enum`                           | An extensible `union` (a `union` with a `string` variant)                                                                                                                                                                                     |
| `x-ms-parameter-grouping`             | Group the parameters into a model and spread it into the operation                                                                                                                                                                            |
| `x-ms-parameter-location`             | Determined automatically by the emitter; use `@clientLocation` from `@azure-tools/typespec-client-generator-core` when overriding client placement                                                                                            |
| `x-ms-client-name`                    | [`@clientName`](../../typespec-client-generator-core/reference/decorators.md#@Azure.ClientGenerator.Core.clientName) from `@azure-tools/typespec-client-generator-core`                                                                       |
| `x-ms-discriminator-value`            | [`@discriminator`](https://typespec.io/docs/standard-library/built-in-decorators/#@discriminator) with a named model hierarchy                                                                                                                |
| `x-ms-client-flatten`                 | [`@flattenProperty`](../../typespec-client-generator-core/reference/decorators.md#@Azure.ClientGenerator.Core.Legacy.flattenProperty) from `@azure-tools/typespec-client-generator-core`                                                      |
| `x-ms-parameterized-host`             | [`@server`](https://typespec.io/docs/libraries/http/reference/decorators/#@TypeSpec.Http.server) from `@typespec/http`                                                                                                                       |
| `x-ms-pageable`                       | [`@list`](../../azure-core/reference/decorators.md#@Azure.Core.list) or the `Azure.Core` paging operation templates                                                                                                                          |
| `x-ms-long-running-operation`         | The `Azure.Core` or `Azure.ResourceManager` long-running operation templates                                                                                                                                                                  |
| `x-ms-long-running-operation-options` | The long-running operation templates together with `@pollingOperation` and `@finalOperation`                                                                                                                                                  |
| `x-nullable`                          | Make the property optional (`?`), or model the value explicitly                                                                                                                                                                               |
| `x-ms-internal`                       | [`@access(Access.internal)`](../../typespec-client-generator-core/reference/decorators.md#@Azure.ClientGenerator.Core.access) from `@azure-tools/typespec-client-generator-core`                                                             |
| `x-ms-azure-resource`                 | The `Azure.ResourceManager` resource templates such as `TrackedResource`, `ProxyResource`, and `ExtensionResource`                                                                                                                            |
| `x-ms-arm-id-details`                 | [`armResourceIdentifier`](../../azure-resource-manager/reference/data-types.md#Azure.ResourceManager.CommonTypes.ResourceIdentifier) from `@azure-tools/typespec-azure-resource-manager`                                                       |
| `x-ms-secret`                         | [`@secret`](https://typespec.io/docs/standard-library/built-in-decorators/#@secret) from the TypeSpec standard library                                                                                                                       |

## Examples

### `x-ms-long-running-operation`

#### ❌ Incorrect

```tsp
@OpenAPI.extension("x-ms-long-running-operation", true)
op createWidget(...Widget): Widget;
```

#### ✅ Correct

```tsp
op createWidget is Azure.Core.ResourceOperations.LongRunningResourceCreateOrReplace<Widget>;
```

### `x-ms-enum`

#### ❌ Incorrect

```tsp
@OpenAPI.extension("x-ms-enum", #{ name: "PetKind", modelAsString: true })
enum PetKind {
  Cat,
  Dog,
}
```

#### ✅ Correct

```tsp
union PetKind {
  Cat: "Cat",
  Dog: "Dog",
  string,
}
```

### `x-ms-client-name`

#### ❌ Incorrect

```tsp
model Widget {
  @OpenAPI.extension("x-ms-client-name", "widgetName")
  name: string;
}
```

#### ✅ Correct

```tsp
model Widget {
  @clientName("widgetName")
  name: string;
}
```

### `x-ms-secret`

#### ❌ Incorrect

```tsp
model Credentials {
  @OpenAPI.extension("x-ms-secret", true)
  key: string;
}
```

#### ✅ Correct

```tsp
model Credentials {
  @secret
  key: string;
}
```

## Suppression

Do not suppress this rule. Replace the raw extension with the equivalent TypeSpec construct so every emitter, not just the OpenAPI emitter, reflects the intended behavior.
