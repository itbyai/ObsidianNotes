
Pipeline-as-a-service is a CI/CD product designed to reduce the effort required for container-based services to be built, tested and deployed to multiple environments.

- [Prerequisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Prerequisites)
    - [Supported Build Environments](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Supported-Build-Environments)
    - [Supported Deployment Targets](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Supported-Deployment-Targets)
- [Getting Started](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Getting-Started)
- [Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Deployment)
    - [Common Configuration](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Common-Configuration)
    - [AKS Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#AKS-Deployment)
    - [ACA Deployment](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#ACA-Deployment)
- [Running the Pipeline](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222/How+to+setup+and+configure+Pipeline-as-a-Service#Running-the-Pipeline)

# Prerequisites

## Supported Build Environments

The pipeline supports the following build environments:

### Containerised Applications

Pipeline-as-a-service can build containerised applications in the following languages:

- .NET Core
    
    - Supported versions: v6.0, v8.0
        
    - [.NET WebApi Project Requirements](https://dominos.atlassian.net/wiki/spaces/PF/pages/5158143767)
        - Containerised Application must be in a project named `*.WebApi`
		- If required, nuget package must be in a project named `*.Api`
		- Expects to find unit tests in a project named `*.Tests.Internal`. See [Run unit tests in the pipeline](https://dominos.atlassian.net/wiki/spaces/PF/pages/4733993599) for configuration options.
		- Expects to find post deployment tests in a project named `*.Tests.External`. See [Include External or Integration tests](https://dominos.atlassian.net/wiki/spaces/PF/pages/4770235239) for configuration options
- 
- Node.js
    
    - Supported versions: v16.8.0, v18.16.1
        
    - [Node.js Backend Project Requirements](https://dominos.atlassian.net/wiki/spaces/PF/pages/5158176202)
    - ## Building

		Build order is as follows: `yarn install`, `yarn lint`, `yarn build`
		
		Build should not include install and clean. These processes will slow the deployment of your application down for no reason because the agent already installs and cleans the build context. Build should only include the typescript compiler and any other template/data movement into the bin directory.
		
		`"scripts": { "lint": "eslint .", "build": "tsc --project ./tsconfig.json" }`
		
		==The pipeline uses a== `==.dockerignore==` ==file to specify which files are included as part of the docker context.==  
		  
		==The== `==.dockerignore==` ==file used by the pipeline is:==
		
		`# Ignore everything * # Make exceptions for these paths !/bin/* !/node_modules/* !.env !pm2.config.js !package.json # If the exceptions above added subfolders matching these paths, don't include them **/__tests__ **/__mockData__ **/*.js.map`
		
		## Unit Testing
		
		Before the container is finally packaged the `yarn test` entrypoint is ran. We recommend using jest to run all javascript based tests as it produces a coverage report compatible with Azure Devops.
		
		`"scripts": { "test": "jest --testPathPattern=src/core/* --coverage" }`
		
		## Application Start
		
		When running the container it needs a start entrypoint. Node has multiple ways of running applications so here’s some suggested layouts. Keep in mind the only entrypoint the pipeline runs is `yarn start`. Note in the below example the specific way the application is started is moved to a different script while the primary entrypoint can optionally point to each.
		
		`"scripts": { "start": "yarn start:node", "start:ts": "ts-node src/app.ts", "start:node": "node bin/app.js", "start:pm2": "pm2-runtime pm2.config.js" }`
		
		## Post Deployment Testing
		
		Post deployment tests are much the same as the unit tests. They’re simply run in a different context. They have different variables loaded and are usuallly in different Kube Clusters. The flag `--pass-with-no-tests` can be added so that jest doesn't throw an error if no tests are found in the target directories.
		
		`"scripts": { "test:sbx": "jest --testPathPattern=src/integration-test/sbx/* --coverage", "test:ci": "jest --testPathPattern=src/integration-test/ci/* --coverage", "test:stage": "jest --testPathPattern=src/integration-test/stage/* --pass-with-no-tests --coverage", "test:prod": "jest --testPathPattern=src/integration-test/prod/* --pass-with-no-tests --coverage" }`
		
		## External packages
		
		Requires the `package.json` project to be configured as following
		
		`"private": true, "workspaces": [ "packages/dominos_test_publish" ]`
        

### Azure Function Apps

This feature is currently in alpha.

Pipeline-as-a-service can build containerised Azure Function Apps in the following runtime/language combinations:

#### Runtime v4

- NET Core
    
    - ==Supported versions: v6.0==
        
    - [.NET Azure Function App Project Requirements](https://dominos.atlassian.net/wiki/spaces/PF/pages/5158176216)
        

## Supported Deployment Targets

Pipeline-as-a-service can run deployments for the following deployment targets:

- Azure Kubernetes Service (AKS)
    
- Azure Container Apps (ACA)
    

# ==Getting Started==

To begin using pipeline-as-a-service, follow these steps:

1. Create an Azure Pipelines YAML file called `azure-pipelines.yml` in the root of your repository. At a minimum, it must contain the following:
    
    `variables: - name: aks-service-helmchart-version value: 1.2.17 - name: App.Group value: 'olo' - name: App.Name value: '$(App.Type)s-<service name>' - name: App.Name2 value: '$(App.Type)-<service name>' - name: App.Type value: 'service' resources: repositories: - repository: templates type: GitHub endpoint: dominos-dpe-platform name: dominos-dpe/Platform.Pipeline ref: refs/tags/v0.0.0 # get latest here: https://github.com/dominos-dpe/Platform.Pipeline/releases/ extends: template: base-platform-pipeline.yml@templates`
    
2. (Node.js only) Ensure that you have a `.nvmrc` file in the root of your repository with the version of node to use when building:
    
    `v18.16.1`
    
3. (.NET only) To allow the pipeline to capture code coverage data, you must add a reference to `coverlet.collector` vesion 3.1.2 or above to unit test `.csproj` files:
    
    `<PackageReference Include="coverlet.collector" Version="3.1.2"/>`
    
    Please note that `coverlet.collector` does not output coverage summary to the command line. If you want to view coverage results locally, there are different options for your IDE depending on whether you use a Mac or Windows. More information [here](https://dominos.atlassian.net/wiki/spaces/PF/pages/4738289500/PF-106+How+do+we+get+code+coverage+locally "https://dominos.atlassian.net/wiki/spaces/PF/pages/4738289500/PF-106+How+do+we+get+code+coverage+locally").
    

Congratulations! At this point, you have a build-only pipeline configured. You next need to configure your deployment. This differs depending on your choice of platform.

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
See also: [configuring regions for deployment to stage.](https://dominos.atlassian.net/wiki/spaces/PF/pages/4903043509 "/wiki/spaces/PF/pages/4903043509")

### Deployment Regions

Pipeline-as-a-service is set by default to deploy to AUE, WEU and JPE regions in Stage and Prod environments. If this is not correct for your service, you can set the `deployment_regions` parameter with the list of regions to deploy to. For example, to deploy to AUE only:

`... extends: parameters: - deployment_regions: - aue`

## AKS Deployment

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

## ACA Deployment

ACA is available in the CMRC and CORP subscriptions

[How Azure Container Apps works?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5078319446)

### Prerequisites

- A bicep parameters file must be included in the team repository root as `/deployment/app/bicep/params.json` . Follow the instructions on how to configure a Bicep parameter file: [Configure ACA via parameter file](https://dominos.atlassian.net/wiki/spaces/PF/pages/5065376629)
    

### Configuration

1. Add the following configuration to the `azure-pipelines.yml` file:
    
    `variables: - name: aks-service-helmchart-version value: 1.2.17 - name: App.Group value: 'olo' - name: App.Name value: '$(App.Type)s-<service name>' - name: App.Name2 value: '$(App.Type)-<service name>' - name: App.Type value: 'service' + - group: 'CMRC - Platform.Pipeline' # Only if the application is deployed in CMRC subscription + - group: 'CORP - Platform.Pipeline' # Only if the application is deployed in CORP subscription + - name: App.ShortName # Name of the Container App + value: demoproject resources: repositories: - repository: templates type: GitHub endpoint: dominos-dpe-platform name: dominos-dpe/Platform.Pipeline ref: refs/tags/v0.0.0 # get latest here: https://dominos.atlassian.net/wiki/spaces/PF/pages/4728095340/Releases extends: template: base-platform-pipeline.yml@templates + parameters: + deploymentPlatforms: + - platform: aca + subscription: (corp or cmrc) + bicepConfigVersion: x.x.x # get latest here: https://dominos.atlassian.net/wiki/spaces/PF/pages/5065736714/Bicep+default+configurations`
    
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
    

# Running the Pipeline