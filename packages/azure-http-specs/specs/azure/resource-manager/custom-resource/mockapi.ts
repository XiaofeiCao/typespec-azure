import { json, passOnSuccess, ScenarioMockApi } from "@typespec/spec-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";

const validCustomResource = {
  name: "test",
  description: "valid",
  provisioningState: "Succeeded",
};

Scenarios.Azure_ResourceManager_CustomResource_CustomResourceOperations_get = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/providers/Microsoft.CustomResource/customResources/:resourceName",
  method: "get",
  request: {
    pathParams: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceName: "test",
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json(validCustomResource),
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_CustomResource_CustomResourceOperations_create = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/providers/Microsoft.CustomResource/customResources/:resourceName",
  method: "put",
  request: {
    pathParams: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceName: "test",
      "api-version": "2023-12-01-preview",
    },
    body: json({
      name: "test",
      description: "valid",
    }),
  },
  response: {
    status: 200,
    body: json(validCustomResource),
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_CustomResource_CustomResourceOperations_delete = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/providers/Microsoft.CustomResource/customResources/:resourceName",
  method: "delete",
  request: {
    pathParams: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceName: "test",
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 204,
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_CustomResource_CustomResourceOperations_list = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/providers/Microsoft.CustomResource/customResources",
  method: "get",
  request: {
    pathParams: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json({
      value: [validCustomResource],
    }),
  },
  kind: "MockApiDefinition",
});
