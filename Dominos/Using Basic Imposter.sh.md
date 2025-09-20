Imposter.sh is the platforms chosen way for creating easy to use endpoint stubs for testing your services against. The system works by grabbing swagger definitions from stage endpoints and then deploying a service that will respond according to those definitions.

## Basic Imposter Config

To get started all you need to do is add the services that you want to your `azure-pipelines.yml` definition like so:

`extends: template: base-platform-pipeline.yml@templates parameters: deploymentPlatforms: #https://dominos.atlassian.net/wiki/spaces/PF/pages/5032378854/Picking+Deployment+target - platform: aks subscription: cmrc helmChartVersion: $(aks-service-helmchart-version) imposterServices: - service-callerid - service-customer`

## Process Explanation

When you add the above config the following process will occur during the pipeline. It will fetch from the stage endpoints the swagger definitions. Temporarily store the imposter config as an artifact (that you could use locally with imposter.sh). Then when deploying it will upload the artifact to a blob storage that’s available to the cluster services. Once deployed the service will download from the blob storage and start up. If the service for some reason dies or restarts it will have the same configuration available as before thanks to the blob storage.
![[Pasted image 20250827234422.png]]
## Getting the endpoint for imposter.sh service into your app

The following code is also demonstrated under the [Platform.DemoProject.DotNet](https://github.com/dominos-dpe/Platform.DemoProject.DotNet "https://github.com/dominos-dpe/Platform.DemoProject.DotNet") under the Imposter project. If you already have your app setup to pass pipeline variables to your app some of this can be skipped.

## Passing the endpoint to your app

### Variable chart requirements

To the `pipeline/variables/sbx.yml` and `ci.yml` files we suggest adding the following that can be used by your application when targeting the imposter service

`# Take note for the namespace that the variable needs to be updated for SBX/CI - name: ClientSettings.ImposterUrl value: http://$(Azure.AKS.AppName)-imposter`

## For an application that already has dependencies  
The following is probably already setup

To override the connection that already exists. Simply override it in the sbx.yml and it should pass through helm and appsettings.json into your deployed app.

### Helm chart requirements

To pass your variable to the deployed app you need to use the helm chart `deployment/app/helm/values.yaml`. Environment variables are loaded into the `appsettings.json` when deployed.

`extraEnvs: ClientSettings__ImposterUrl: #{ClientSettings.ImposterUrl}#`

### Dotnet appsettings.json requirements

This variable will resolve to the endpoint you would use to access imposter.sh. The recommended way to pass this variable to your application is to use `appsettings.json`.

`{ "ClientSettings": { "ImposterUrl": "" } }`

**P.S.** Integration tests run on the pipeline side not the deployed side.  
We also populate the `appsettings.json` file during integration testing.

### Building with appsettings.json

In your project file you’ll want the following xml to copy the `appsettings.json` file into the resulting build directory of your application.

`<ItemGroup> <None Remove="appsettings.json" /> </ItemGroup> <ItemGroup> <Content Include="appsettings.json"> <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory> </Content> </ItemGroup>`

### Loading appsettings.json into your Dotnet app

And finally in your C# application itself you can use the following code to load the data from the `appsettings.json` file.

`using Microsoft.Extensions.Configuration; namespace Platform.DemoProject.DotNet.Tests { public class TestImposter { private static string ImposterUrl = ""; public TestImposter(){ var config = new ConfigurationBuilder() .SetBasePath(AppDomain.CurrentDomain.BaseDirectory) .AddJsonFile($"appsettings.json", false, true) .Build(); TestImposter.ImposterUrl = config.GetValue<string>("ClientSettings:ImposterUrl"); if(TestImposter.ImposterUrl == null || TestImposter.ImposterUrl == ""){ throw new Exception("Failed to find: ClientSettings.ImposterUrl"); } } } }`