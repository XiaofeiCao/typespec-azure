---
title: arm-legacy-operations-discourage
---

```text title="Full name"
@azure-tools/typespec-azure-resource-manager/arm-legacy-operations-discourage
```

Avoid using the `LegacyOperations` interface (`Azure.ResourceManager.Legacy.LegacyOperations`) unless migrating a brownfield service. New services should use standard ARM resource interfaces instead.

#### ❌ Incorrect

```tsp
@armResourceOperations
interface Employees
  extends Azure.ResourceManager.Legacy.LegacyOperations<
      ParentParameters = ParentScope,
      ResourceTypeParameter = InstanceScope
    > {}
```

#### ✅ Correct

Use standard ARM resource interfaces:

```tsp
@armResourceOperations
interface Employees extends TrackedResourceOperations<Employee, EmployeeProperties> {}
```
