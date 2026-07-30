---
title: csharp-no-url-suffix
---

```text title="Full name"
@azure-tools/typespec-client-generator-core/csharp-no-url-suffix
```

Properties whose C# name ends with `Url` should use the `Uri` suffix instead,
following .NET naming conventions. The rule checks the C#-resolved name and
respects `@clientName` overrides.

This rule does **not** affect other language SDKs, the service definition, or
the wire protocol — only the C# client-surface name is changed.

#### ❌ Incorrect

```tsp
model Foo {
  imageUrl: string;
  callbackUrl: string;
}
```

#### ✅ Correct (rename the property)

```tsp
model Foo {
  imageUri: string;
  callbackUri: string;
}
```

#### ✅ Correct (rename only for C# via `@@clientName`)

```tsp
// client.tsp
@@clientName(Foo.imageUrl, "imageUri", "csharp");
@@clientName(Foo.callbackUrl, "callbackUri", "csharp");
```

#### Suppression

This rule is a `warning` and can be suppressed when the `Url` spelling is
intentional for the C# SDK:

```tsp
#suppress "@azure-tools/typespec-client-generator-core/csharp-no-url-suffix" "intentional Url naming"
model Foo {
  imageUrl: string;
}
```
