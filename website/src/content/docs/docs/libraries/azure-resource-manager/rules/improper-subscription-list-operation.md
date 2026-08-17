---
title: "improper-subscription-list-operation"
---

```text title="Full name"
@azure-tools/typespec-azure-resource-manager/improper-subscription-list-operation
```

Tenant and Extension resources should not define a list by subscription operation. These resource types are not scoped to a subscription, so listing them by subscription is not appropriate.

#### ❌ Incorrect

```tsp
@tenantResource
model Foo is ProxyResource<FooProperties> {
  ...ResourceNameParameter<Foo>;
}

@armResourceOperations(Foo)
interface FooResources {
  listBySubscription is ArmListBySubscription<Foo>;
}
```

#### ✅ Correct

```tsp
@tenantResource
model Foo is ProxyResource<FooProperties> {
  ...ResourceNameParameter<Foo>;
}

@armResourceOperations(Foo)
interface FooResources {
  get is ArmResourceRead<Foo>;
}
```
