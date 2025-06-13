import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
import "@typespec/spector";

using Http;
using Rest;
using Azure.Core;
using Azure.ResourceManager;
using Azure.ResourceManager.Foundations;
using OpenAPI;
using Spector;

namespace Azure.ResourceManager.Legacy.OptionalBody;

@doc("The resource-specific properties of an OptionalBody")
model OptionalBodyProperties {
  @doc("Total number of items")
  totalItems?: int32;

  @doc("Resource description")
  description?: string;

  ...DefaultProvisioningStateProperty;
}

@resource("optionalBodies")
model OptionalBody is TrackedResource<OptionalBodyProperties> {
  @key("name")
  @path
  @segment("optionalBodies")
  @doc("The name of the OptionalBody resource")
  @pattern("^[a-zA-Z0-9]([a-zA-Z0-9-_.]{0,62}[a-zA-Z0-9])?$")
  name: string;
}

@armResourceOperations
interface OptionalBodies {
  @scenario
  @scenarioDoc("""
    OptionalBody GET operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/sample-resource
    Expected query parameter: api-version=2025-01-01-preview
    
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/sample-resource",
      "name": "sample-resource",
      "type": "Azure.ResourceManager.Legacy.OptionalBody/optionalBodies",
      "location": "eastus",
      "properties": {
        "totalItems": 100,
        "description": "A sample resource for testing optional body operations",
        "provisioningState": "Succeeded"
      },
      "systemData": {
        "createdBy": "AzureSDK",
        "createdByType": "User",
        "createdAt": <any date>,
        "lastModifiedBy": "AzureSDK",
        "lastModifiedAt": <any date>,
        "lastModifiedByType": "User"
      }
    }
    ```
    """)
  get is ArmResourceRead<OptionalBody>;

  @scenario
  @scenarioDoc("""
    OptionalBody PATCH operation with optional body. This operation accepts an empty request body.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/sample-resource
    Expected query parameter: api-version=2025-01-01-preview
    Expected request body.
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/sample-resource",
      "name": "sample-resource",
      "type": "Azure.ResourceManager.Legacy.OptionalBody/optionalBodies",
      "location": "eastus",
      "properties": {
        "totalItems": 100,
        "description": "Updated description for the sample resource",
        "provisioningState": "Succeeded"
      },
      "systemData": {
        "createdBy": "AzureSDK",
        "createdByType": "User",
        "createdAt": <any date>,
        "lastModifiedBy": "AzureSDK",
        "lastModifiedAt": <any date>,
        "lastModifiedByType": "User"
      }
    }
    ```
    """)
  update is Azure.ResourceManager.Legacy.CustomPatchAsync<
    OptionalBody,
    Azure.ResourceManager.Foundations.ResourceUpdateModel<OptionalBody, OptionalBodyProperties>,
    OptionalRequestBody = true
  >;
}
