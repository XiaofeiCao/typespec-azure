---
title: resource-name-pattern
---

```text title="Full name"
@azure-tools/typespec-azure-resource-manager/arm-resource-name-pattern
```

Resource names must include a regex restriction. You can do that either by applying `@pattern` directly to the `name` property, or by using `ResourceNameParameter` and overriding `NamePattern` when you need a custom regex. If you omit `NamePattern`, `ResourceNameParameter` applies the library's default ARM resource-name pattern.

#### ❌ Incorrect

```tsp
model Employee is ProxyResource<{}> {
  @key("employeeName")
  @path
  @segment("employees")
  @pattern("^[a-zA-Z0-9-]{3,24}$")
  name: string;
}
```

#### ✅ Correct

```tsp
model Employee is ProxyResource<{}> {
  ...ResourceNameParameter<Employee, NamePattern = "^[a-zA-Z0-9-]{3,24}$">;
}
```
