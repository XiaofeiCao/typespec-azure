---
title: csharp-use-standard-acronyms
---

```text title="Full name"
@azure-tools/typespec-client-generator-core/csharp-use-standard-acronyms
```

C# SDK names should use standard acronym casing. Common acronyms must be
spelled in all-caps: `IP` (not `Ip`), `DB` (not `Db`), `OS` (not `Os`).

The rule checks the C#-resolved name and respects `@clientName` overrides.
It is enabled through the
`@azure-tools/typespec-azure-rulesets/client-sdk` ruleset.

#### ❌ Incorrect

```tsp
model IpAddress {
  value: string;
}

model CosmosDb {
  id: string;
}

model OsVersion {
  version: string;
}
```

#### ✅ Correct (rename the models)

```tsp
model IPAddress {
  value: string;
}

model CosmosDB {
  id: string;
}

model OSVersion {
  version: string;
}
```

#### ✅ Correct (rename only for C# via `@@clientName`)

```tsp
// client.tsp
@@clientName(IpAddress, "IPAddress", "csharp");
@@clientName(CosmosDb, "CosmosDB", "csharp");
@@clientName(OsVersion, "OSVersion", "csharp");
```
