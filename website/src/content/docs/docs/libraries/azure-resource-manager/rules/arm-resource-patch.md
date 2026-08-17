---
title: "arm-resource-patch"
---

```text title="Full name"
@azure-tools/typespec-azure-resource-manager/arm-resource-patch
```

Validate ARM PATCH operations. The request body of a PATCH must be a model with a subset of the resource properties. The PATCH body must not contain properties that do not exist on the resource.

#### ❌ Incorrect

```tsp
model Foo is TrackedResource<FooProperties> {
  ...ResourceNameParameter<Foo>;
}

model MyBadPatch {
  name?: string;
  ...Foundations.ArmTagsProperty;
  blah?: string; // does not exist on Foo
}
```

#### ✅ Correct

```tsp
model Foo is TrackedResource<FooProperties> {
  ...ResourceNameParameter<Foo>;
}

model FooPatch {
  name?: string;
  ...Foundations.ArmTagsProperty;
  properties?: FooProperties;
}
```
