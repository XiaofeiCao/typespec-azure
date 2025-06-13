import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";

import "./optional-body.tsp";

using Http;
using Rest;
using Versioning;
using Azure.Core;
using Azure.ResourceManager;
using Azure.ResourceManager.Foundations;
using OpenAPI;
using Spector;

@armProviderNamespace
@service
@versioned(Versions)
@doc("Test optional body with legacy CustomPatchAsync operation for optional body management.")
namespace Azure.ResourceManager.Legacy;

@doc("Azure API versions.")
enum Versions {
  @armCommonTypesVersion(CommonTypes.Versions.v5)
  @useDependency(Azure.Core.Versions.v1_0_Preview_2)
  @useDependency(Azure.ResourceManager.Versions.v1_0_Preview_1)
  @doc("Preview API version 2025-01-01-preview.")
  v2025_01_01_preview: "2025-01-01-preview",
}
