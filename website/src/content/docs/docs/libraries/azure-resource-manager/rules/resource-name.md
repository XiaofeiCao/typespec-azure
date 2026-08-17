---
title: "resource-name"
---

```text title="Full name"
@azure-tools/typespec-azure-resource-manager/resource-name
```

Check the resource name. ARM resource model names must contain only alphanumeric characters and start with an uppercase letter, and the `name` property must be a read-only `@path` parameter. For new ARM specs, prefer names like `Widget` and `WidgetProperties` instead of redundant `WidgetResource` and `WidgetResourceProperties`.

#### ❌ Incorrect

Missing `@path` decorator on `name`:

```tsp
model Foo is TrackedResource<{}> {
  @key("foo")
  @segment("foo")
  name: string;
}
```

#### ❌ Incorrect

Underscore in model name:

```tsp
model Foo_Resource is TrackedResource<{}> {
  ...ResourceNameParameter<Foo_Resource>;
}
```

#### ✅ Correct

```tsp
model Foo is TrackedResource<{}> {
  ...ResourceNameParameter<Foo>;
}
```
