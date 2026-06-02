import { json, passOnSuccess, ScenarioMockApi } from "@typespec/spec-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";

const validSubscriptionResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
  name: "store1",
  type: "Azure.ResourceManager.LegacyOperations/configurationStores",
  location: "eastus",
  properties: {
    description: "A valid configuration store",
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

const validResourceGroupResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
  name: "store1",
  type: "Azure.ResourceManager.LegacyOperations/configurationStores",
  location: "eastus",
  properties: {
    description: "A valid configuration store",
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

// Subscription-level operations
Scenarios.Azure_ResourceManager_LegacyOperations_SubscriptionOperations_get = passOnSuccess({
  uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
  method: "get",
  request: {
    query: {
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json(validSubscriptionResource),
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_LegacyOperations_SubscriptionOperations_createOrUpdate =
  passOnSuccess({
    uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
    method: "put",
    request: {
      query: {
        "api-version": "2023-12-01-preview",
      },
      body: json({
        location: "eastus",
        properties: {
          description: "A valid configuration store",
        },
      }),
    },
    response: {
      status: 200,
      body: json(validSubscriptionResource),
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_LegacyOperations_SubscriptionOperations_delete = passOnSuccess({
  uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
  method: "delete",
  request: {
    query: {
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_LegacyOperations_SubscriptionOperations_listBySubscription =
  passOnSuccess({
    uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores`,
    method: "get",
    request: {
      query: {
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [validSubscriptionResource],
      }),
    },
    kind: "MockApiDefinition",
  });

// Resource group-level operations
Scenarios.Azure_ResourceManager_LegacyOperations_ResourceGroupOperations_get = passOnSuccess({
  uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
  method: "get",
  request: {
    query: {
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json(validResourceGroupResource),
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_LegacyOperations_ResourceGroupOperations_createOrUpdate =
  passOnSuccess({
    uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
    method: "put",
    request: {
      query: {
        "api-version": "2023-12-01-preview",
      },
      body: json({
        location: "eastus",
        properties: {
          description: "A valid configuration store",
        },
      }),
    },
    response: {
      status: 200,
      body: json(validResourceGroupResource),
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_LegacyOperations_ResourceGroupOperations_delete = passOnSuccess({
  uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1`,
  method: "delete",
  request: {
    query: {
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_LegacyOperations_ResourceGroupOperations_listByResourceGroup =
  passOnSuccess({
    uri: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.LegacyOperations/configurationStores`,
    method: "get",
    request: {
      query: {
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [validResourceGroupResource],
      }),
    },
    kind: "MockApiDefinition",
  });
