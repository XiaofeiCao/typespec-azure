import { json, passOnSuccess, ScenarioMockApi } from "@typespec/spec-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";

const validOptionalBodyResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/sample-resource`,
  name: "sample-resource",
  type: "Azure.ResourceManager.Legacy.OptionalBody/optionalBodies",
  location: "eastus",
  properties: {
    totalItems: 100,
    description: "A sample resource for testing optional body operations",
    provisioningState: "Succeeded",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: "2024-10-04T00:56:07.442Z",
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: "2024-10-04T00:56:07.442Z",
    lastModifiedByType: "User",
  },
};

// OptionalBody GET operation
Scenarios.Azure_ResourceManager_Legacy_OptionalBody_OptionalBodies_get = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/:name",
  method: "get",
  request: {
    pathParams: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      name: "sample-resource",
    },
    query: {
      "api-version": "2025-01-01-preview",
    },
  },
  response: {
    status: 200,
    body: json(validOptionalBodyResource),
  },
  kind: "MockApiDefinition",
});

// OptionalBody PATCH operation with optional body
Scenarios.Azure_ResourceManager_Legacy_OptionalBody_OptionalBodies_update = passOnSuccess([
  {
    // Test with empty body
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Legacy.OptionalBody/optionalBodies/:name",
    method: "patch",
    request: {
      pathParams: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        name: "sample-resource",
      },
      query: {
        "api-version": "2025-01-01-preview",
      },
      // No body in this scenario to test optional body
    },
    response: {
      status: 200,
      body: json(validOptionalBodyResource),
    },
    kind: "MockApiDefinition",
  },
]);
