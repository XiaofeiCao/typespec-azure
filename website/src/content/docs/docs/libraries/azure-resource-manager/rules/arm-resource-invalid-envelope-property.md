---
title: arm-resource-invalid-envelope-property
---

```text title="Full name"
@azure-tools/typespec-azure-resource-manager/arm-resource-invalid-envelope-property
```

Resource envelope properties must originate from the `Azure.ResourceManager` namespace. Custom properties that are not part of the standard ARM resource envelope should be placed in the resource-specific property bag instead.

#### ❌ Incorrect

```tsp
@armProviderNamespace
namespace MyService;

model Foo is TrackedResource<{}> {
  ...ResourceNameParameter<Foo>;
  disallowed?: string; // not valid in the resource envelope
}
```

#### ✅ Correct

```tsp
@armProviderNamespace
namespace MyService;

model Foo is TrackedResource<{}> {
  ...ResourceNameParameter<Foo>;
  ...ManagedServiceIdentityProperty;
}
```
