import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
import "@typespec/spector";

using Http;
using Rest;
using Versioning;
using Azure.Core;
using Azure.ResourceManager;
using Spector;

@armProviderNamespace
@service
@versioned(Versions)
@doc("Arm Resource Provider management API.")
namespace Azure.ResourceManager.ProviderAction;

@doc("Azure API versions.")
enum Versions {
  @armCommonTypesVersion(CommonTypes.Versions.v5)
  @doc("Preview API version 2023-12-01-preview.")
  v2023_12_01_preview: "2023-12-01-preview",
}

// Models for sync action
model ValidateRequest {
  @doc("The resource type to validate.")
  resourceType: string;

  @doc("The resource name to validate.")
  resourceName: string;
}

model ValidateResult {
  @doc("Whether the resource is valid.")
  isValid: boolean;

  @doc("Reason for invalid resource, if applicable.")
  reason?: string;
}

// Models for async action
model ExportRequest {
  @doc("Format of the export.")
  format: string;
}

model ExportResult {
  @doc("Content of the export.")
  content: string;
}

@armResourceOperations
interface SyncAction {
  @scenario
  @scenarioDoc("""
    Provider action using ArmProviderActionSync at subscription scope.
    Synchronous POST action that validates a resource.
    
    Expected verb: POST
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.ProviderAction/validateResource
    Expected query parameter: api-version=2023-12-01-preview
    Expected request body:
    ```json
    {
      "resourceType": "Microsoft.Compute/virtualMachines",
      "resourceName": "myVM"
    }
    ```
    Expected status code: 200
    Expected response body:
    ```json
    {
      "isValid": true
    }
    ```
    """)
  validateResource is ArmProviderActionSync<
    ValidateRequest,
    ValidateResult,
    SubscriptionActionScope
  >;
}

@armResourceOperations
interface AsyncAction {
  @scenario
  @scenarioDoc("""
    Provider action using ArmProviderActionAsync at subscription scope.
    Long-running POST action that exports data.
    Service returns Location header on initial request.
    
    Expected verb: POST
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.ProviderAction/exportData
    Expected query parameter: api-version=2023-12-01-preview
    Expected request body:
    ```json
    {
      "format": "json"
    }
    ```
    Expected response status code: 202
    Expected response header: Location={endpoint}/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.ProviderAction/locations/eastus/operationResults/export_op
    Expected no response body
    
    Location first poll.
    Expected verb: GET
    Expected URL: {endpoint}/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.ProviderAction/locations/eastus/operationResults/export_op
    Expected status code: 202
    Expected no response body
    
    Location second poll.
    Expected verb: GET
    Expected URL: {endpoint}/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.ProviderAction/locations/eastus/operationResults/export_op
    Expected status code: 200
    Expected response body:
    ```json
    {
      "content": "exported data in json format"
    }
    ```
    """)
  exportData is ArmProviderActionAsync<ExportRequest, ExportResult, SubscriptionActionScope>;
}
