Pipeline-as-a-Service is a CI/CD product designed to reduce the effort required for container-based services and single page apps to be built, tested, and deployed to multiple environments.

- [Prerequisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Prerequisites)
    - [Supported Build Platforms](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Supported-Build-Platforms)
    - [Supported Deployment Targets](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Supported-Deployment-Targets)
- [Getting Started](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Getting-Started)
- [Build](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Build)
    - [Setting the Build Platform](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Setting-the-Build-Platform)
    - [Packing NuGet packages](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Packing-NuGet-packages)
- [Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Deployment)
    - [Common Configuration](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Common-Configuration)
        - [Pipeline Variable Files](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Pipeline-Variable-Files)
        - [Compass Integration](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Compass-Integration)
            - [Parameters](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Parameters)
            - [compassEnabled (boolean, optional)](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#compassEnabled-\(boolean%2C-optional\))
            - [compassComponentId (string, optional)](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#compassComponentId-\(string%2C-optional\))
            - [Configuration Example](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Configuration-Example)
            - [Finding Your Compass Component ARI](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Finding-Your-Compass-Component-ARI)
        - [Deployment Regions](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Deployment-Regions)
    - [AKS Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#AKS-Deployment)
        - [Prerequisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Prerequisites.1)
        - [Configuration](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Configuration)
        - [Differences between CMRC and CORP](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Differences-between-CMRC-and-CORP)
    - [ACA Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#ACA-Deployment)
        - [Prerequisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Prerequisites.2)
        - [Configuration](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Configuration.1)
    - [STA Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#STA-Deployment)
        - [Requisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Requisites)
        - [Configuration](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Configuration.2)
        - [Examples](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Examples)
- [Running the Pipeline](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Running-the-Pipeline)

# Prerequisites

## Supported Build Platforms

The pipeline supports the following build platforms:

- .NET Core WebApi - [.NET WebApi Project Requirements](https://dominos.atlassian.net/wiki/spaces/PF/pages/5158143767)
    
    - `dotnet6`
        
    - `dotnet8`
        
- .Net Core Function Apps - Runtime v4 - [.NET Azure Function App Project Requirements](https://dominos.atlassian.net/wiki/spaces/PF/pages/5158176216)
    
    - `dotnet6-function4`
        
    - `dotnet8-function4`
        
- Node.js - [Node.js Backend Project Requirements](https://dominos.atlassian.net/wiki/spaces/PF/pages/5158176202)
    
    - `node16`
        
    - `node18`
        
    - `node20`
        
    - `node22`
        

## Supported Deployment Targets

Pipeline-as-a-service can run deployments for the following deployment targets:

- Azure Kubernetes Service (AKS)
    
    - `aks`
        
- Azure Container Apps (ACA)
    
    - `aks`
        
- Static Web applications using Storage Accounts
    
    - `sta`
        

# ==Getting Started==

To begin using pipeline-as-a-service, follow these steps:

1. Create an Azure Pipelines YAML file called `azure-pipelines.yml` in the root of your repository. At a minimum, it must contain the following:
    
    `variables: - name: App.Group value: 'olo' - name: App.Name value: '$(App.Type)s-<service name>' - name: App.Name2 value: '$(App.Type)-<service name>' - name: App.Type value: 'service' resources: repositories: - repository: templates type: GitHub endpoint: dominos-dpe name: dominos-dpe/Platform.Pipeline ref: refs/tags/v0.0.0 # get latest here: https://github.com/dominos-dpe/Platform.Pipeline/releases/ extends: template: base-platform-pipeline.yml@templates`
    
2. (Node.js only) Ensure that you have a `.nvmrc` file in the root of your repository with the version of node to use when building. This feature is decommissioned in version **v21.1.1 and later** and it is only needed for version v21.1.0 and earlier
    
    `v18.16.1`
    
3. (.NET only) To allow the pipeline to capture code coverage data, you must add a reference to `coverlet.collector` version 3.1.2 or above to unit test `.csproj` files:
    
    `<PackageReference Include="coverlet.collector" Version="3.1.2"/>`
    
    Please note that `coverlet.collector` does not output coverage summary to the command line. If you want to view coverage results locally, there are different options for your IDE depending on whether you use a Mac or Windows. More information [here](https://dominos.atlassian.net/wiki/spaces/PF/pages/4738289500 "https://dominos.atlassian.net/wiki/spaces/PF/pages/4738289500").
    

Congratulations! At this point, you have a build-only pipeline configured. You next need to configure your deployment. This differs depending on your choice of platform.

# Build

### Setting the Build Platform

To specify the build platform, set the `buildPlatform` parameter in your pipeline configuration:

`extends: template: base-platform-pipeline.yml@templates parameters: buildPlatform: dotnet8 # valid values dotnet6, dotnet8, dotnet6-function4, dontnet8-function4, node16, node18, node20, node22`

### Packing NuGet packages

The `packagesToPublish` option in the `buildOptions` section is used to specify which projects should be packed as NuGet packages and published during the build process. Without this option, the default behavior is to include all projects that match the `*.Api` naming pattern, which simplifies the configuration and ensures that all relevant API projects are included in the packaging process.

This automatic inclusion of `.Api` projects can indeed streamline the build and deployment process by reducing the need to manually specify each API project in the pipeline configuration.

- Default behaviour to pack project `*.Api`
    

`parameters: buildPlatform: dotnet8 buildOptions: continueOnLintError: true`

- Create NuGet packages from the list of project names set on `packagesToPublish`.
    

`parameters: buildPlatform: dotnet8 buildOptions: continueOnLintError: true packagesToPublish: - Platform.DemoProject.DotNet.Api - Platform.DemoProject.DotNet.NewNuget.Api`

# Deployment

## Common Configuration

### Pipeline Variable Files

Create pipeline variable files for each deployment environment. The required files are:

`pipeline └── variables ├── ci.yml ├── prod-aue.yml ├── prod-global.yml ├── prod-jpe.yml ├── prod-weu.yml ├── sbx.yml ├── stage-aue.yml ├── stage-global.yml ├── stage-jpe.yml └── stage-weu.yml`

At a minimum, these files must contain:

`variables: []`

These variable files are specific to each stage of the pipeline. They can be used to populate things like .NET app settings from Azure KeyVault:

`... - name: ClientSettings.ApiKey # Maps directly to an appsetting ClientSettings > ApiKey # The value here is being pulled from a secret in KeyVault value: $(Azure2--AKS--CallerId--SecurityConfig--ApiKey)`

Any variables present in your current release pipeline that aren’t captured by the above groups/inline variables will need to be defined. Global release variables can be defined in `azure-pipelines.yml`, environment-specific variables can be defined in their respective `pipeline/variables/{env}.yml` file.

All available variable groups can be found [here](https://dominos-au.visualstudio.com/OneDigital/_library "https://dominos-au.visualstudio.com/OneDigital/_library").  
**Note:** To deploy in any regions in stage or prod, the branch must be `main`, `master` or `hotfix/branch-name`. Refer to this ADR for more details: [2022-11: The branches that can be deployed to Stage](https://dominos.atlassian.net/wiki/spaces/PF/pages/4861003649)  
See also: [configuring regions for deployment to stage.](https://dominos.atlassian.net/wiki/spaces/PF/pages/4903043509 "https://dominos.atlassian.net/wiki/spaces/PF/pages/4903043509")

### Compass Integration

The pipeline supports integration with Atlassian Compass for component tracking and observability. This integration is optional and can be enabled per pipeline configuration.

#### Parameters

#### `compassEnabled` (boolean, optional)

Enables or disables Compass integration for the pipeline. When set to `true`, the pipeline will register deployment events and metrics with the specified Compass component.

- **Default**: `false` (not set)
    
- **Valid values**: `true`, `false`
    

#### `compassComponentId` (string, optional)

The Atlassian Resource Identifier (ARI) of the Compass component to associate with this pipeline. This parameter is required when `compassEnabled` is set to `true`.

- **Format**: Must be a valid Compass component ARI
    
- **Pattern**: `ari:cloud:compass:<tenant-id>:component/<component-path>`
    
- **Example**: `ari:cloud:compass:273bda99-cfc1-43d5-9430-de70dc624ad3:component/0bdeebdc-5477-4b86-babd-2be89d4dbd8a/ab1a03ea-9f13-46db-a495-514e07455c78`
    

#### Configuration Example

`# Basic configuration with Compass integration buildPlatform: dotnet8 compassEnabled: true compassComponentId: "ari:cloud:compass:273bda99-cfc1-43d5-9430-de70dc624ad3:component/platform-service/v1.2.3" deploymentPlatforms: - platform: aks subscription: cmrc helmChartVersion: "1.2.14"`

#### Finding Your Compass Component ARI

To find the ARI for your Compass component:

1. Navigate to your component in Atlassian Compass
    
2. Go to the component's settings or details page
    
3. The ARI can be found in the URL or component properties
    
4. Ensure the ARI follows the format: `ari:cloud:compass:<tenant-id>:component/<component-path>`
    

### Deployment Regions

Pipeline-as-a-service is set by default to deploy to AUE, WEU and JPE regions in Stage and Prod environments. If this is not correct for your service, you can set the `deployment_regions` parameter with the list of regions to deploy to. For example, to deploy to AUE only:

`... extends: parameters: - deployment_regions: - aue`

## **AKS Deployment**

AKS is available in the CMRC and CORP subscriptions

It is currently not possible to deploy to both AKS CMRC and AKS CORP at this time

### Prerequisites

- A helm chart values file must be included in the repository root as `/deployment/app/helm/values.yaml`
    

### Configuration

1. Add the following configuration to the `azure-pipelines.yml` file:
    
    `variables: - name: aks-service-helmchart-version value: 1.2.17 - name: App.Group value: 'olo' - name: App.Name value: '$(App.Type)s-<service name>' - name: App.Name2 value: '$(App.Type)-<service name>' - name: App.Type value: 'service' + - group: 'CMRC - Platform.Pipeline' + - name: AKS.Cluster.Namespace.SBX + # replace this value with your team's namespace + value: pf + - name: AKS.Cluster.Namespace.CI + # replace this value with your team's namespace + value: pf resources: repositories: - repository: templates type: GitHub endpoint: dominos-dpe-platform name: dominos-dpe/Platform.Pipeline ref: refs/tags/v0.0.0 # get latest here: https://dominos.atlassian.net/wiki/spaces/PF/pages/4728095340/Releases extends: template: base-platform-pipeline.yml@templates + parameters: + deploymentPlatforms: + - platform: aks + subscription: cmrc + helmChartVersion: x.x.x # get latest here: https://dominos-au.visualstudio.com/OneDigital/_git/Infra.HelmCharts?path=/charts/dominos-service/Chart.yaml`
    
    Any variables added to this file are available throughout all stages of the pipeline.
    
2. Set the `InfrastructureSettings.BasePath` pipeline variable in the `sbx.yaml` and `ci.yaml` variable files. This ensures that the base path of your service is correct in SBX and CI:
    
    `... # The path of the service in AKS (NOTE: in SBX and CI we will prefix it with "ns-{TeamNameSpace}/") - name: InfrastructureSettings.BasePath value: ns-$(AKS.Cluster.Namespace.SBX)/$(Azure.AKS.AppName)`
    

### Differences between CMRC and CORP

The following variables have different naming when deploying to CMRC and CORP. You will need to update your configuration to suit your deployment target.

|   |   |
|---|---|
|**CMRC**|**CORP**|
|`group: 'CMRC - Platform.Pipeline'`|`group: 'CORP - Platform.Pipeline'`|
|`AKS.Cluster.Namespace.SBX`|`AKS.Cluster.Namespace.CORP.SBX`|
|`AKS.Cluster.Namespace.CI`|`AKS.Cluster.Namespace.CORP.CI`|
|`AKS.Cluster.Namespace.Stage`|`AKS.Cluster.Namespace.CORP.Stage`|
|`AKS.Cluster.Namespace.Prod`|`AKS.Cluster.Namespace.CORP.Prod`|
|`Cmrc.EnvironmentCode`|`Corp.EnvironmentCode`|
|`Cmrc.RegionCode`|`Corp.RegionCode`|

## **ACA Deployment**

ACA is available in the CMRC and CORP subscriptions

ACA is a deprecated deployment environment. Please do not deploy new services to ACA

[How Azure Container Apps works?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5078319446)

### Prerequisites

- A bicep parameters file must be included in the team repository root as `/deployment/app/bicep/params.json` . Follow the instructions on how to configure a Bicep parameter file: [Configure ACA via parameter file](https://dominos.atlassian.net/wiki/spaces/PF/pages/5065376629)
    

### Configuration

1. Add the following configuration to the `azure-pipelines.yml` file:
    
    `variables: - name: aks-service-helmchart-version value: 1.2.17 - name: App.Group value: 'olo' - name: App.Name value: '$(App.Type)s-<service name>' - name: App.Name2 value: '$(App.Type)-<service name>' - name: App.Type value: 'service' + - group: 'CMRC - Platform.Pipeline' # Only if the application is deployed in CMRC subscription + - group: 'CORP - Platform.Pipeline' # Only if the application is deployed in CORP subscription + - name: App.ShortName # Name of the Container App + value: demoproject resources: repositories: - repository: templates type: GitHub endpoint: dominos-dpe name: dominos-dpe/Platform.Pipeline ref: refs/tags/v0.0.0 # get latest here: https://dominos.atlassian.net/wiki/spaces/PF/pages/4728095340/Releases extends: template: base-platform-pipeline.yml@templates + parameters: + deploymentPlatforms: + - platform: aca + subscription: (corp or cmrc) + bicepConfigVersion: x.x.x # get latest here: https://dominos.atlassian.net/wiki/spaces/PF/pages/5065736714/Bicep+default+configurations`
    
    Any variables added to this file are available throughout all stages of the pipeline.
    
2. **Ensure that** `App.Name`**,** `App.ShortName` **variables are configured in** `azure-pipelines.yml`**:**  
      
    
    `variables: - name: App.Name # Must match the name of the app container image value: platform-demoproject - name: App.ShortName # Name of the Container App value: demoproject`
    
3. **Ensure that** `params.json` **is set.** The params.json is based on the `deploymentParameters` schema but it has only 4 section that can be customized:
    
    1. **resources** is for setting the server specification for the service; default is {cpu: '0.25', memory: '0.5Gi'} for [more detail](https://learn.microsoft.com/en-us/azure/container-apps/containers "https://learn.microsoft.com/en-us/azure/container-apps/containers").
        
    2. **env** is array of environment variables to the service store as name/value
        
    3. **secrets** is array of environment variables to the service store as name/value
        
    4. **numReplicas** uses for service scaling; default {min: 1, max: 3}
        
    5. **daprScheduler** is array of cron job configurations. See [Configure Cron Jobs in ACA](https://dominos.atlassian.net/wiki/spaces/PF/pages/5039817728) documentation for more details.  
        example:
        
        `{ "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#", "contentVersion": "1.0.0.0", "parameters": { "env": { "value": [ { "name": "NEW_RELIC_ENABLED", "value": "true" }, { "name": "NEW_RELIC_LOG_LEVEL", "value": "trace" }, ] }, "secrets": { "value": [ { "name": "new--relic--license--key", "value": "#{NewRelic--APM--Client--LicenceKey}#" }, { "name": "applicationinsights--instrumentationkey", "value": "#{Azure2--AppInsights--001--InstrumentionKey}#" } ] } "daprScheduler": { "value": [ { "taskName": "scheduler-1", "cron": "* * * * *" } ] } } }`
        
4. (Optional for existing ACA adopters) After PROD deployment is successful, any files except for `params.json` under `deployment/app/bicep` directory are not required anymore. Feel free to either remove them or keep them if needed.
    

## **STA Deployment**

The `azure-pipeline.yml` configuration deals with the deployment and also the creation of storage accounts in SBX environment used in PRs.

### Requisites

Specify the repositories that will be used as resources in the pipeline. These are 3 important repositories.

- `templates` GitHub repository named 'dominos-dpe/Platform.Pipeline'
    
- `platformInfra` GitHub repository named 'dominos-dpe/Platform.Infra'
    
- `pipelineTemplates` git repository named 'OneDigital/AzureDevOps.PipelineTemplates'
    

### Configuration

- `setFileContentTypes` - Stores a dictionary used to set specific content-types in files after files is copied to STA (_**e.g**_: `test-file-json` _file will have its content-type updated to_ `application/json`)
    

`setFileContentTypes: # Set content types for some files (optional) - file: support/test-file-json contentType: application/json`

- `replaceTokenSources`- Maintains a list of files containing tokens that will be replaced with specific values for each environment. **For example**, files such as `"**/bundle*.js"` and `"**/index.html"` will have their content updated by replacing tokens.
    

`replaceTokenSources: - "**/bundle*.js" - "**/index.html"`

- `storageAccounts`- This is the main key that holds the storage account configurations for different environments.
    

`# Set storage accounts for each environment (required) storageAccounts: sbx: aue: dpesbxstapfspaaue82e6 ci: aue: dpecistapfspaaue82e6 stage: aue: dpestagestapfspaaue82e6 weu: dpestagestapfspaweu82e6 jpe: dpestagestapfspajpe82e6 prod: aue: dpeprodstapfspaaue82e6 weu: dpeprodstapfspaweu82e6 jpe: dpeprodstapfspajpe82e6`

- `createStorageAccounts`: This flag indicates whether to create storage accounts for the **sandbox** environment (SBX only). When set to `true`, it ensures that whenever a pull request is created, the respective storage account is created based on the project name, PR number, and markets. This is done for each provided market and deploys the SPA (Single Page Application) to each market listed. ==More info:== [==README.MD==](https://github.com/dominos-dpe/Platform.DemoProject.SPA/blob/main/README.md#basic-configuration-required-to-deploy-spa-to-storage-accounts "https://github.com/dominos-dpe/Platform.DemoProject.SPA/blob/main/README.md#basic-configuration-required-to-deploy-spa-to-storage-accounts")
    

`# Set storage accounts for each environment (required) storageAccounts: sbx: createStorageAccounts: true projectName: spademo markets: # List of the markets you want to deploy SPA - au - nz`

- `projectName`: The name of the project associated with this storage account. _(Used when_ `createStorageAccounts` _is true)_
    
- `markets`: A list of markets where the SPA (Single Page Application) should be deployed. In this example, the markets are Australia (`au`) and New Zealand (`nz`). _(Used when_ `createStorageAccounts` _is true)_
    

Add the following configuration to the `azure-pipelines.yml` file:

`variables: - group: "CMRC - Platform.Pipeline" - name: App.Name value: platform-demoproject-spa resources: repositories: - repository: templates type: GitHub endpoint: dominos-dpe name: dominos-dpe/Platform.Pipeline # The 'platformInfra' repository is a GitHub repository which is used to create the infrastructure using terraform. - repository: platformInfra type: GitHub endpoint: dominos-dpe name: dominos-dpe/Platform.Infra # The 'pipelineTemplates' repository is a git repository in Azure which is used to download CIDR ip ranges. - repository: pipelineTemplates type: git name: OneDigital/AzureDevOps.PipelineTemplates extends: template: base-platform-pipeline.yml@templates parameters: # https://dominos.atlassian.net/wiki/spaces/PF/pages/5032378854/Picking+Deployment+target deploymentPlatforms: - platform: sta subscription: cmrc setFileContentTypes: # Set content types for some files (optional) - file: support/test-file-json contentType: application/json projectName: spademo # Name of your project replaceTokenSources: - "**/bundle*.js" - "**/index.html" storageAccounts: # Set storage accounts for each environment (required) sbx: # This account exists and it works to deploy to it - but we still want to create accounts for PRs, to # exercise and test our PR-infra creation process. # aue: dpesbxstapfspaaue82e6 projectName: spademo createStorageAccounts: true # Create storage accounts for sandbox environment (optional - default is false) markets: # List of the markets you want to deploy SPA - au - nz ci: aue: dpecistapfspaaue82e6`

### **Examples**

- SBX - STAs are created automatically during PR
    

`deploymentPlatforms: - platform: sta subscription: cmrc storageAccounts: # Set storage accounts for each environment (required) sbx: createStorageAccounts: true # Create storage accounts for sandbox environment (optional - default is false) projectName: spademo markets: # List of the markets you want to deploy SPA - au - nz`

- SBX - STA has been created previously
    

`deploymentPlatforms: - platform: sta subscription: cmrc storageAccounts: # Set storage accounts for each environment (required) sbx: # This account exists and it works to deploy to it aue: dpesbxstapfspaaue82e6 createStorageAccounts: false`

- Other environments
    

`deploymentPlatforms: - platform: sta subscription: cmrc storageAccounts: # Set storage accounts for each environment (required) ci: aue: dpesbxstapfspaaue82e6 stage: aue: dpestagestapfspaaue82e6 weu: dpestagestapfspaweu82e6 jpe: dpestagestapfspajpe82e6 prod: aue: dpeprodstapfspaaue82e6 weu: dpeprodstapfspaweu82e6 jpe: dpeprodstapfspajpe82e6`

# Running the Pipeline

See [[Legacy] How to create your pipeline in Azure DevOps: DevOps hosted repository](https://dominos.atlassian.net/wiki/spaces/PF/pages/5031757031)