import { AzureCoreTestLibrary } from "@azure-tools/typespec-azure-core/testing";
import { AzureResourceManagerTestLibrary } from "@azure-tools/typespec-azure-resource-manager/testing";
import {
  BasicTestRunner,
  createLinterRuleTester,
  LinterRuleTester,
} from "@typespec/compiler/testing";
import { OpenAPITestLibrary } from "@typespec/openapi/testing";
import { beforeEach, describe, it } from "vitest";
import { noUnnamedTypesRule } from "../../src/rules/no-unnamed-types.rule.js";
import { createSdkTestRunner } from "../test-host.js";

let runner: BasicTestRunner;
let tester: LinterRuleTester;

beforeEach(async () => {
  runner = await createSdkTestRunner();
  tester = createLinterRuleTester(
    runner,
    noUnnamedTypesRule,
    "@azure-tools/typespec-client-generator-core",
  );
});

describe("models", () => {
  it("anonymous model in property of another model", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          @usage(Usage.input)
          model NamedModel {
            anonymousModelProp: {
              foo: string;
            };
          }
        }
        
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "NamedModelAnonymousModelProp" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });

  it("nested anonymous model", async () => {
    // should emit twice: once for each anonymous model
    await tester
      .expect(
        `
        @service
        namespace TestService {
          @usage(Usage.input)
          model NamedModel {
            nestedAnonymousModelProp: {
              firstLevelProp: {
                secondLevelProp: string;
              }
            };
          }
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "NamedModelNestedAnonymousModelProp" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "NamedModelNestedAnonymousModelPropFirstLevelProp" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });

  it("anonymous model inline in operation request", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          op foo(body: {prop: string}): void;
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "FooRequestBody" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });

  it("anonymous model inline in operation response", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          op foo(): {prop: string};
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "FooResponse" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });

  it("anonymous model caused by templates", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          model Widget {
            prop: string;
          }
          model OperationStatus<StatusResult> {
            result?: StatusResult;
          }
          op foo(): AcceptedResponse & OperationStatus<Widget>;
        }
        `,
      )
      .toBeValid();
  });

  it("unused anonymous model", async () => {
    await tester
      .expect(
        `
          @service
          namespace TestService;
          model A {
            prop: {prop: string};
          };
          `,
      )
      .toBeValid();
  });

  it("anonymous lro final response", async () => {
    const runnerWithArm = await createSdkTestRunner({
      librariesToAdd: [AzureResourceManagerTestLibrary, AzureCoreTestLibrary, OpenAPITestLibrary],
      autoUsings: ["Azure.ResourceManager", "Azure.Core", "Azure.Core.Traits"],
      emitterName: "@azure-tools/typespec-java",
    });

    const testerWithArm = createLinterRuleTester(
      runnerWithArm,
      noUnnamedTypesRule,
      "@azure-tools/typespec-java",
    );
    await testerWithArm
      .expect(
        `
        @armProviderNamespace("My.Service")
        @server("http://localhost:3000", "endpoint")
        @service(#{title: "My.Service"})
        @versioned(Versions)
        @armCommonTypesVersion(CommonTypes.Versions.v5)
        namespace My.Service;

        /** Api versions */
        enum Versions {
          /** 2024-04-01-preview api version */
          @useDependency(Azure.ResourceManager.Versions.v1_0_Preview_1)
          V2024_04_01_PREVIEW: "2024-04-01-preview",
        }
        model MyProperties {
          @visibility(Lifecycle.Read)
          @doc("Display name of the Azure Extended Zone.")
          displayName: string;
        }

        @subscriptionResource
        model MyModel is ProxyResource<MyProperties> {
          @key("extendedZoneName")
          @segment("extendedZones")
          @path
          name: string;
        }

        @error
        model MyError {
          code: string;
          message: string;
        }

        namespace MyClient {
          @armResourceOperations
          interface MyInterface {
            get is ArmResourceRead<MyModel, Error=MyError>;
            create is ArmResourceCreateOrReplaceAsync<MyModel, Response = ArmResourceUpdatedResponse<MyModel> | ArmResourceCreatedResponse<
              MyModel,
              ArmLroLocationHeader & Azure.Core.Foundations.RetryAfterHeader
            > | ArmAcceptedLroResponse,
            Error=MyError>;
          }
        }
        `,
      )
      .toBeValid();

    await testerWithArm
      .expect(
        `
        @armProviderNamespace("My.Service")
        @server("http://localhost:3000", "endpoint")
        @service(#{title: "My.Service"})
        @versioned(Versions)
        @armCommonTypesVersion(CommonTypes.Versions.v5)
        namespace My.Service;

        /** Api versions */
        enum Versions {
          /** 2024-04-01-preview api version */
          @useDependency(Azure.ResourceManager.Versions.v1_0_Preview_1)
          V2024_04_01_PREVIEW: "2024-04-01-preview",
        }
        model MyProperties {
          @visibility(Lifecycle.Read)
          @doc("Display name of the Azure Extended Zone.")
          displayName: string;
        }

        @subscriptionResource
        model MyModel is ProxyResource<MyProperties> {
          @key("extendedZoneName")
          @segment("extendedZones")
          @path
          name: string;
        }

        @error
        model MyError {
          code: string;
          message: string;
        }

        namespace MyClient {
          @armResourceOperations
          interface MyInterface {
            get is ArmResourceRead<MyModel, Error=MyError>;
            create is ArmResourceCreateOrReplaceAsync<MyModel, Response = ArmResourceUpdatedResponse<MyModel> | ArmResourceCreatedResponse<
              MyModel,
              ArmLroLocationHeader & Azure.Core.Foundations.RetryAfterHeader
            > | ArmAcceptedLroResponse,
            Error=MyError>;
          }
        }
        `,
      )
      .toBeValid();
  });
  it("discriminated model with nested anonymous model with readonly property", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          @usage(Usage.output)
          model JobModelProperties {
            customProperties: JobModelCustomProperties;
          }
          @discriminator("instanceType")
          model JobModelCustomProperties {
            @visibility(Lifecycle.Read)
            affectedObjectDetails?: {
              description?: string;
              type?: "object";
            };
          }
        }
          `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "JobModelCustomPropertiesAffectedObjectDetails" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });
  it("anonymous model in versioned service", async () => {
    await tester
      .expect(
        `
        @versioned(Versions)
        @service
        namespace Test;

        /** Contoso API versions */
        enum Versions {
          "2021-10-01-preview",
        }

        @usage(Usage.input)
        model Temp {
          foo: {
            bar: string;
          }
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous model with generated name "TempFoo" detected. Define this model separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });
});

describe("unions", () => {
  it("anonymous union of strings", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          op foo(@body body: "one" | "two"): void;
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous union with generated name "FooRequest" detected. Define this union separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });
  it("anonymous union of models", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          model One {
            prop: string;
          }

          model Two {
            prop: string;
          }
          op foo(param: One | Two): void;
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous union with generated name "FooRequestParam" detected. Define this union separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });
  it("anonymous union of enums", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          enum One { one }

          enum Two { two }
          op foo(param: One | Two): void;
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous union with generated name "FooRequestParam" detected. Define this union separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });
  it("anonymous extensible enum", async () => {
    await tester
      .expect(
        `
        @service
        namespace TestService {
          op foo(param: "dog" | "cat" | "bird" | string): void;
        }
        `,
      )
      .toEmitDiagnostics([
        {
          code: "@azure-tools/typespec-client-generator-core/no-unnamed-types",
          severity: "warning",
          message: `Anonymous union with generated name "FooRequestParam" detected. Define this union separately with a proper name to improve code readability and reusability.`,
        },
      ]);
  });
});
