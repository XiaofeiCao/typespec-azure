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
namespace Azure.ResourceManager.LegacyOperations;

@doc("Azure API versions.")
enum Versions {
  @armCommonTypesVersion(CommonTypes.Versions.v5)
  @doc("Preview API version 2023-12-01-preview.")
  v2023_12_01_preview: "2023-12-01-preview",
}

interface Operations extends Azure.ResourceManager.Operations {}

@doc("A configuration store resource.")
model ConfigurationStore is TrackedResource<ConfigurationStoreProperties> {
  ...ResourceNameParameter<
    Resource = ConfigurationStore,
    KeyName = "configurationStoreName",
    SegmentName = "configurationStores",
    NamePattern = ""
  >;
}

@doc("Configuration store properties.")
model ConfigurationStoreProperties {
  @doc("The description of the configuration store.")
  description?: string;

  @visibility(Lifecycle.Read)
  @doc("The provisioning state of the resource.")
  provisioningState?: ProvisioningState;
}

@doc("The provisioning state.")
union ProvisioningState {
  ResourceProvisioningState,
  Provisioning: "Provisioning",
  Updating: "Updating",
  Deleting: "Deleting",
  Accepted: "Accepted",
}

// Define Legacy operations at subscription level
alias SubscriptionOps = Azure.ResourceManager.Legacy.LegacyOperations<
  {
    ...ApiVersionParameter;
    ...SubscriptionIdParameter;
    ...Azure.ResourceManager.Legacy.Provider;
  },
  {
    @doc("The name of the configuration store.")
    @segment("configurationStores")
    @key
    @path
    configurationStoreName: string;
  }
>;

// Define Legacy operations at resource group level
alias ResourceGroupOps = Azure.ResourceManager.Legacy.LegacyOperations<
  {
    ...ApiVersionParameter;
    ...SubscriptionIdParameter;
    ...ResourceGroupParameter;
    ...Azure.ResourceManager.Legacy.Provider;
  },
  {
    @doc("The name of the configuration store.")
    @segment("configurationStores")
    @key
    @path
    configurationStoreName: string;
  }
>;

@armResourceOperations
interface SubscriptionOperations {
  @scenario
  @scenarioDoc("""
    Resource GET operation at subscription level using Legacy operations with multiple routes.
    
    Expected verb: GET
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1
    Expected query parameter: api-version=2023-12-01-preview
    Expected status code: 200
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1",
      "name": "store1",
      "type": "Azure.ResourceManager.LegacyOperations/configurationStores",
      "location": "eastus",
      "properties": {
        "description": "A valid configuration store",
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
  get is SubscriptionOps.Read<ConfigurationStore>;

  @scenario
  @scenarioDoc("""
    Resource PUT operation at subscription level using Legacy operations with multiple routes.
    
    Expected verb: PUT
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1
    Expected query parameter: api-version=2023-12-01-preview
    Expected request body:
    ```json
    {
      "location": "eastus",
      "properties": {
        "description": "A valid configuration store"
      }
    }
    ```
    Expected status code: 200
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1",
      "name": "store1",
      "type": "Azure.ResourceManager.LegacyOperations/configurationStores",
      "location": "eastus",
      "properties": {
        "description": "A valid configuration store",
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
  createOrUpdate is SubscriptionOps.CreateOrUpdateSync<ConfigurationStore>;

  @scenario
  @scenarioDoc("""
    Resource DELETE operation at subscription level using Legacy operations with multiple routes.
    
    Expected verb: DELETE
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1
    Expected query parameter: api-version=2023-12-01-preview
    Expected status code: 200
    """)
  delete is SubscriptionOps.DeleteSync<ConfigurationStore>;

  @scenario
  @scenarioDoc("""
    Resource LIST operation at subscription level using Legacy operations with multiple routes.
    
    Expected verb: GET
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores
    Expected query parameter: api-version=2023-12-01-preview
    Expected status code: 200
    Expected response body:
    ```json
    {
      "value": [
        {
          "id": "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1",
          "name": "store1",
          "type": "Azure.ResourceManager.LegacyOperations/configurationStores",
          "location": "eastus",
          "properties": {
            "description": "A valid configuration store",
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
      ]
    }
    ```
    """)
  listBySubscription is SubscriptionOps.List<ConfigurationStore>;
}

@armResourceOperations
interface ResourceGroupOperations {
  @scenario
  @scenarioDoc("""
    Resource GET operation at resource group level using Legacy operations with multiple routes.
    
    Expected verb: GET
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1
    Expected query parameter: api-version=2023-12-01-preview
    Expected status code: 200
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1",
      "name": "store1",
      "type": "Azure.ResourceManager.LegacyOperations/configurationStores",
      "location": "eastus",
      "properties": {
        "description": "A valid configuration store",
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
  get is ResourceGroupOps.Read<ConfigurationStore>;

  @scenario
  @scenarioDoc("""
    Resource PUT operation at resource group level using Legacy operations with multiple routes.
    
    Expected verb: PUT
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1
    Expected query parameter: api-version=2023-12-01-preview
    Expected request body:
    ```json
    {
      "location": "eastus",
      "properties": {
        "description": "A valid configuration store"
      }
    }
    ```
    Expected status code: 200
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1",
      "name": "store1",
      "type": "Azure.ResourceManager.LegacyOperations/configurationStores",
      "location": "eastus",
      "properties": {
        "description": "A valid configuration store",
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
  createOrUpdate is ResourceGroupOps.CreateOrUpdateSync<ConfigurationStore>;

  @scenario
  @scenarioDoc("""
    Resource DELETE operation at resource group level using Legacy operations with multiple routes.
    
    Expected verb: DELETE
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1
    Expected query parameter: api-version=2023-12-01-preview
    Expected status code: 200
    """)
  delete is ResourceGroupOps.DeleteSync<ConfigurationStore>;

  @scenario
  @scenarioDoc("""
    Resource LIST operation at resource group level using Legacy operations with multiple routes.
    
    Expected verb: GET
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores
    Expected query parameter: api-version=2023-12-01-preview
    Expected status code: 200
    Expected response body:
    ```json
    {
      "value": [
        {
          "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.LegacyOperations/configurationStores/store1",
          "name": "store1",
          "type": "Azure.ResourceManager.LegacyOperations/configurationStores",
          "location": "eastus",
          "properties": {
            "description": "A valid configuration store",
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
      ]
    }
    ```
    """)
  listByResourceGroup is ResourceGroupOps.List<ConfigurationStore>;
}
