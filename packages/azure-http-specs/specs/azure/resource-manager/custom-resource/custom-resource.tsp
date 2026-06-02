import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
import "@typespec/spector";

using Http;
using Rest;
using Spector;

namespace Azure.ResourceManager.CustomResource;

/**
 * A custom Azure resource model using the @customAzureResource decorator.
 * This resource does not extend the standard ARM Resource base types but is
 * identified as an Azure resource via the decorator.
 */
#suppress "@azure-tools/typespec-azure-core/no-legacy-usage" "testing legacy customAzureResource"
@doc("Custom Azure resource.")
@Azure.ResourceManager.Legacy.customAzureResource(#{ isAzureResource: true })
model CustomResource {
  /**
   * The resource name.
   */
  @doc("The name of the resource.")
  name?: string;

  /**
   * The resource description.
   */
  @doc("The description of the resource.")
  description?: string;

  /**
   * The provisioning state.
   */
  @doc("The provisioning state of the resource.")
  provisioningState?: string;
}

/**
 * Operations for custom Azure resources.
 */
interface CustomResourceOperations {
  @scenario
  @scenarioDoc("""
    GET operation for a custom Azure resource marked with @customAzureResource.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.CustomResource/customResources/test
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "name": "test",
      "description": "valid",
      "provisioningState": "Succeeded"
    }
    ```
    """)
  @route("/subscriptions/{subscriptionId}/providers/Microsoft.CustomResource/customResources/{resourceName}")
  @get
  get(
    ...ApiVersionParameter,
    ...SubscriptionIdParameter,

    /**
     * The resource name.
     */
    @path
    resourceName: string,
  ): ArmResponse<CustomResource> | ErrorResponse;

  @scenario
  @scenarioDoc("""
    PUT operation for a custom Azure resource marked with @customAzureResource.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.CustomResource/customResources/test
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected request body:
    ```json
    {
      "name": "test",
      "description": "valid"
    }
    ```
    
    Expected response body:
    ```json
    {
      "name": "test",
      "description": "valid",
      "provisioningState": "Succeeded"
    }
    ```
    """)
  @route("/subscriptions/{subscriptionId}/providers/Microsoft.CustomResource/customResources/{resourceName}")
  @put
  create(
    ...ApiVersionParameter,
    ...SubscriptionIdParameter,

    /**
     * The resource name.
     */
    @path
    resourceName: string,

    /**
     * The request body.
     */
    @body
    body: CustomResource,
  ): ArmResponse<CustomResource> | ErrorResponse;

  @scenario
  @scenarioDoc("""
    DELETE operation for a custom Azure resource marked with @customAzureResource.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.CustomResource/customResources/test
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response status code: 204
    """)
  @route("/subscriptions/{subscriptionId}/providers/Microsoft.CustomResource/customResources/{resourceName}")
  @delete
  delete(
    ...ApiVersionParameter,
    ...SubscriptionIdParameter,

    /**
     * The resource name.
     */
    @path
    resourceName: string,
  ):
    | {
        @statusCode _: 204;
      }
    | ErrorResponse;

  @scenario
  @scenarioDoc("""
    LIST operation for custom Azure resources marked with @customAzureResource.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.CustomResource/customResources
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "value": [
        {
          "name": "test",
          "description": "valid",
          "provisioningState": "Succeeded"
        }
      ]
    }
    ```
    """)
  @route("/subscriptions/{subscriptionId}/providers/Microsoft.CustomResource/customResources")
  @get
  list(...ApiVersionParameter, ...SubscriptionIdParameter):
    | ArmResponse<CustomResourceListResult>
    | ErrorResponse;
}

/**
 * List result for custom resources.
 */
model CustomResourceListResult {
  /**
   * The list of custom resources.
   */
  value: CustomResource[];
}
