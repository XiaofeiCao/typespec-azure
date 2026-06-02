import {
  dyn,
  dynItem,
  json,
  MockRequest,
  passOnSuccess,
  ScenarioMockApi,
} from "@typespec/spec-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";

// Sync action - validate resource
Scenarios.Azure_ResourceManager_ProviderAction_SyncAction_validateResource = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/providers/Azure.ResourceManager.ProviderAction/validateResource",
  method: "post",
  request: {
    pathParams: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
    },
    query: {
      "api-version": "2023-12-01-preview",
    },
    body: json({
      resourceType: "Microsoft.Compute/virtualMachines",
      resourceName: "myVM",
    }),
  },
  response: {
    status: 200,
    body: json({
      isValid: true,
    }),
  },
  kind: "MockApiDefinition",
});

// Async action - export data with LRO (Location header polling)
let exportDataPollCount = 0;

Scenarios.Azure_ResourceManager_ProviderAction_AsyncAction_exportData = passOnSuccess([
  {
    // LRO POST initial request
    uri: "/subscriptions/:subscriptionId/providers/Azure.ResourceManager.ProviderAction/exportData",
    method: "post",
    request: {
      pathParams: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      },
      query: {
        "api-version": "2023-12-01-preview",
      },
      body: json({
        format: "json",
      }),
    },
    response: {
      status: 202,
      headers: {
        location: dyn`${dynItem("baseUrl")}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.ProviderAction/locations/eastus/operationResults/export_op`,
      },
    },
    handler: (req: MockRequest) => {
      exportDataPollCount = 0;
      return {
        status: 202,
        headers: {
          location: `${req.baseUrl}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/providers/Azure.ResourceManager.ProviderAction/locations/eastus/operationResults/export_op`,
        },
      };
    },
    kind: "MockApiDefinition",
  },
  {
    // LRO POST poll intermediate/get final result
    uri: "/subscriptions/:subscriptionId/providers/Azure.ResourceManager.ProviderAction/locations/eastus/operationResults/export_op",
    method: "get",
    request: {
      pathParams: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      },
      query: {
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 202,
    },
    handler: (req: MockRequest) => {
      const response =
        exportDataPollCount > 0
          ? {
              status: 200,
              body: json({
                content: "exported data in json format",
              }),
            }
          : { status: 202 };

      exportDataPollCount += 1;
      return response;
    },
    kind: "MockApiDefinition",
  },
]);
