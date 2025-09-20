```yaml
---
plugin-prettier: true
---
```

- [Folder structure in repo](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Folder-structure-in-repo)
- [Example 1 - StoreMetrics](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Example-1---StoreMetrics)
    - [Steps to create a basic pipeline. Can run the test only in one environment](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Steps-to-create-a-basic-pipeline.-Can-run-the-test-only-in-one-environment)
    - [Steps to create an enhanced pipeline to run tests in the environment user choose](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Steps-to-create-an-enhanced-pipeline-to-run-tests-in-the-environment-user-choose)
    - [Example test to demonstrate feeding data](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Example-test-to-demonstrate-feeding-data)
    - [Frequently used Xunit attributes for testing](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Frequently-used-Xunit-attributes-for-testing)
- [Example 2 - Vouchers](https://dominos.atlassian.net/wiki/spaces/SE/pages/4984375965/Pipeline+for+API+test+automation#Example-2---Vouchers)

RestSharp is one of the most widely used library to test API’s in .NET world. It has almost all the features required to perform simple to complex API testing. The api tests we develop using restsharp are triggered thru pipeline. The objective of this page is to set a standard for the pipeline we create for executing the api tests, to maintain consistency.

The agreed approach for API tests is to have the tests in the same repo as the development code but run the tests in a separate build pipeline.

# Folder structure in repo

If not existing already, create a new folder named external. Follow the naming convention used for the internal tests folder.

![[Pasted image 20250827094806.png]]

**Dependencies**

This can vary based on you project. Use this as a reference. Add RestSharp dependency. Shoudly is for assertions and Xunit is the testing tool

![[Pasted image 20250827095145.png]]

# Example 1 - StoreMetrics

1. Recommendation of the naming convention to be followed - `<ServiceName-ApiTests>`
2. Depending on the service, each to decide if all the api tests can be run against Prod or a subset of tests to run against Prod. Eg, for Store metrics service, all api tests can be run as we are only asserting the response. But for Order service, we may need to limit the test cases that we run in Prod as it may be placing real orders.
3. Have an env variable in the pipeline, so one pipeline to do it all. Xunit “Trait” tag can be used to execute selective test based on env or equivalent in Nunit is “TestCategory” tag. Examples in below section.
4. Depending on the service, all the tests shall be designed to run in all regions, so that covers fail over testing as well. ie. AU tests shall run in AU, WEU and JP regions.
5. Mock the response and verify if the response remains to validate the service. QE’s may need to get assistance from their devs on this
6. Generate reports
7. Schedule pipeline to execute on a regular basis

### **Steps to create a basic pipeline. Can run the test only in one environment**

Store Metrics build pipeline for reference - [https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1548](https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1548 "https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1548")

1. Clone the build pipeline used for deploying the service and name it accordingly. It is easy to clone and then edit it to suit our needs rather than creating from scratch.

![[Pasted image 20250827095606.png]]

2.In the test pipeline, click edit.

_Note - Tasks and variables can vary based on what you are working, so please refer this just to get an understanding on how it works._

Pipeline variables as below - We are passing url’s for each region and the api key.

ApiKey name to be mentioned to reflect exactly as in appsettings.

![[Pasted image 20250827100219.png]]

I have the below tasks in my build pipeline

![[Pasted image 20250827100237.png]]

**Step 1 - Set AU URL** → Using power shell script to get the AU stage URL from the pipeline variable and assign it to the the variable “`StoreMetricsTests.CredentialSettings.BaseUrl`” . Value in this will be used to the replace the url parameter in app settings.

``` `$baseUrl = "$(BaseUrlAU)" // Set the temporary variable "baseUrl" with the value from pipeline variable "BaseUrlAU" Write-Host "##vso[task.setvariable variable=StoreMetricsTests.CredentialSettings.BaseUrl;]$baseUrl" //Set the variable "StoreMetricsTests.CredentialSettings.BaseUrl" with value in baseUrl. This will pass the value to the variable in app settings Write-Host "AU URL from Pipeline variable is $(BaseUrlAU)" // write the pipeline variable to logs```

App settings as below:

![[Pasted image 20250827100259.png]]

**Step 2 - Read AU URL →** Optional step. Writing to logs the value that will be passed on to app settings

**Step 3 - Use .NET Core sdk 3.1x →**If the agents are hosted in cloud, it may not be able to access stage env and hence tests would fail. To troubleshoot this, we need to run the test from a locally hosted agent

**Step 4 - Restore dotnet**

**Step 5 - Set assembly manifest data -** Step that populates assembly information metadata from a build pipeline.

**Step 6 - Substitute variables -** Mention the folder in which you have the app settings so the values we have from Step 1 will be used to substitute the parameters in app settings. Also any pipeline variable (in our case “StoreMetricsTests.CredentialSettings.ApiKey“) will pass the value to the app settings in the folder mentioned here

**Step 7-Build**

**Step 8-Execute the tests -** Mention the path to the project in this step

Clone all the above tasks for EU and JP. Replace the pipeline variable in Step 1 accordingly.

**Step 9 - Schedule to run on a regular basis**

Click Edit on pipeline and navigate to “Triggers” tab

![[Pasted image 20250827100336.png]]

### **Steps to create an enhanced pipeline to run tests in the environment user choose**

Store Metrics build pipeline for reference - [https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1599](https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1599 "https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1599")

_Brief of changes from basic pipeline - Xunit tags for tests, additional variables in pipeline and modified task in pipeline. Rest all sections can remain the same._

**Step 1 -** Add Xunit tags in the tests

[Trait("Category", "Prod")]

[Trait("Category", "Stage")]

Above Xunit tags can be used to filter the tests based on the env user choose. A test can have multiple tags as shown below. No code change needed to accomodate filters.

To execute in local, use the command _“dotnet test --filter Category=Prod”_ to execute all the tests with category as Prod.

To execute in local, use the command _“dotnet test --filter Category=Stage”_ to execute all the tests with category as Stage.

`[Fact] [Trait("Category", "Stage")] [Trait("Category", "Prod")] public void GetStoreMetrics() { //No code change needed to accomodate filters }`

**Step 2 - Create pipeline using the steps mentioned in the basic pipeline section.**

**Step 3 - Create new variables. We need more variables for this to work in different environments.**

Create variables to pass url’s of each environment and apikey values in each environment as below. Also I have created a new variable as “TestEnv”. It's marked as “Settable at queue time”, so user can set the value as stage or prod when triggering the pipeline. I have left “Stage” as the default value.

![[Pasted image 20250827103546.png]]

**Step 4 - Modify the task - Set AU URL and Apikey**

![[Pasted image 20250827103605.png]]

Below is the powershell script I used to set the URL and API key based on the environment user choose.
```yaml
---
plugin-prettier: true
---
```


```powershell 
`$testEnv="$(TestEnv)" //Getting the env value user chose 
if($testEnv -eq "Stage"){ //Checking if user chose Stage $apiKey="$(ApiKeyStage)" //Set the value in apiKey variable as the value from pipeline variable ApiKeyStage $baseUrl = "$(BaseUrlAUStage)" //Set the value in baseUrl variable as the value from pipeline variable BaseUrlAUStage Write-Host "##vso[task.setvariable variable=StoreMetricsTests.CredentialSettings.BaseUrl;]$baseUrl" //Set the variable "StoreMetricsTests.CredentialSettings.BaseUrl" with value in baseUrl. This will pass the value to the variable in app settings Write-Host "##vso[task.setvariable variable=StoreMetricsTests.CredentialSettings.ApiKey;]$apiKey" //Set the variable "StoreMetricsTests.CredentialSettings.ApiKey" with value in apiKey. This will pass the value to the variable in app settings Write-Host "AU URL from Pipeline variable is $(BaseUrlAUStage)" //Writing value in URL to logs Write-Host "Environment from Pipeline variable is $(TestEnv)" //Writing Env to logs } elseif($testEnv -eq "Prod"){ //Checking if user chose Prod $apiKey="$(ApiKeyProd)" $baseUrl = "$(BaseUrlAUProd)" $testEnv="$(TestEnv)" Write-Host "##vso[task.setvariable variable=StoreMetricsTests.CredentialSettings.BaseUrl;]$baseUrl" Write-Host "##vso[task.setvariable variable=StoreMetricsTests.CredentialSettings.Environment;]$testEnv" Write-Host "AU URL from Pipeline variable is $(BaseUrlAUProd)" Write-Host "Environment from Pipeline variable is $(TestEnv)" }` 
```

**Step 5 - Modify the task - Execute external dotnet test**

Pass the command “--filter Category=$(TestEnv)” in the argument section. This command will execute the tests based on the env user choose.

![[Pasted image 20250827105614.png]]

**Step 6 - To execute the pipeline**

Click “Run pipeline”

Click “Variables”

In “TestEnv”, default value will be “Stage”. Click back arrow and hit Run to execute the test in stage or change the “TestEnv” value to “Prod” and and hit Run to execute the test in Prod.

**Step 7 - Schedule to run on a regular basis**

Its pretty straightforward. Click Edit on pipeline and navigate to “Triggers” tab

![[Pasted image 20250827105631.png]]


### Example test to demonstrate feeding data

Usually these tests are placed under “Dominos.Services.ServiceName.Tests.External” folder

More examples with different ways to feeding data will be published soon.

```csharp
[Theory] [InlineData("AU", 98415)] 
[InlineData("BE", 31190)] 
public async Task GetMetricsAU(string countryCode, int storeNumber) { 
var client = new RestClient(credentialSettings.BaseUrl); 
var request = new RestRequest($"api/v1/StoreMetrics/{countryCode}/getmetrics", Method.Post); 
request.AddHeader("accept", "application/json"); 
request.AddHeader("X-API-KEY", credentialSettings.ApiKey); request.AddHeader("Content-Type", "application/json"); 
request.AddJsonBody(new GetStoreMetricsRequest { StoreNo = storeNumber }); 
var response = await client.PostAsync<GetStoreMetricsResponse>(request); 
try { response.StoreMetrics.StaffMetrics.TotalCountDriversOutOnDeliveries.ShouldBeGreaterThanOrEqualTo(0); 
Console.WriteLine($"StaffMetrics test for ${countryCode} store number ${storeNumber} passed."); // To write to logs 
} catch (Exception e) 
{ Console.WriteLine($"StaffMetrics test for ${countryCode} store number ${storeNumber} failed with error: ${e.Message}"); 
throw; } }`
```

To execute the tests locally, build the project and in “View” tab, click “Tests”. This will open the tests window. Right click and hit “Run test” or “Debug test” accordingly.

### Frequently used Xunit attributes for testing

`[Theory]` - This attribute will expect data. So use this if your test is parameterised. Theories are tests which are only true for a particular set of data.

`[InlineData(0, 0, 0)]`- Use this along with `[Theory]`to pass data. Multiple set of data’s can be passed.

`[Theory(Skip = "specific reason")]` - Use this to skip a parameterised test

`[Fact]` - Use this for a test’s that takes no arguments. Usually used for unit tests. Facts are tests which are always true

`[Fact (Skip = "specific reason")]` - Use this to skip a test that has no arguments.

`[Traits("Category", "IntegrationTest")]` - Use this to organise test if needed

**********************************************************************************************************

# Example 2 - Vouchers

[API TEST NVAT - Service.Admin.Vouchers](https://dominos-au.visualstudio.com/OneDigital/_release?definitionId=56&view=mine&_a=releases "https://dominos-au.visualstudio.com/OneDigital/_release?definitionId=56&view=mine&_a=releases")

[API TEST NVAT - Service.Admin.Discounts](https://dominos-au.visualstudio.com/OneDigital/_release?definitionId=136&view=mine&_a=releases "https://dominos-au.visualstudio.com/OneDigital/_release?definitionId=136&view=mine&_a=releases")

![[Pasted image 20250827122519.png]]

```csharp
`namespace Dominos.Services.Admin.Vouchers.Tests.External.E2E { public class AddVoucher { private readonly CredentialSettings _credentialSettings; private const string _NZDiscountId = "ff4d1771-1b0d-42c9-96fe-0001e4354297"; private const string _JPDiscountId = "0a82d154-2291-473d-b4c1-e8617c8f73e1"; private const string _SGDiscountId = "3ce87e16-0027-4425-9fc2-117ec306de59"; private readonly static string _user = "chandu.rupasinghe@dominos.com.au"; public AddVoucher() { _credentialSettings = ConfigurationHelper.GetApplicationConfiguration().CredentialSettings; } [Theory] [InlineData(_NZDiscountId, "NZ")] [InlineData(_JPDiscountId, "JP")] [InlineData(_SGDiscountId, "SG")] public void AddRestrictedStoreVoucher_ShouldReturnVoucherCorrectly(string discountId, string countryCode) { // Arrange var channelRestrictions = new List<VoucherChannelRestriction> { new VoucherChannelRestriction { Channel = "Store" } }; var storeAvailiability = new List<VoucherStoreAvailability> { new VoucherStoreAvailability { IsAvailable = true, StoreGroupCode = $"Country.${countryCode}", ModifiedBy = _user } }; var addVoucherRequest = new AddVoucherRequest { Voucher = new VoucherBuilder() .WithCountry(countryCode) .WithDiscount(Guid.Parse(discountId)) .WithUser(_user) .WithChannelRestrictions(channelRestrictions) .WithStoreAvailabilities(storeAvailiability) .AsRestricted(VoucherUseFrequency.Weekly, 10, 10) .Build() }; var client = new RestClient(_credentialSettings.BaseUrl); RestRequest request = new RestRequest($"/api/Voucher/AddVoucher", Method.Post); request.AddHeader("X-API-KEY", _credentialSettings.ApiKey); request.AddHeader("Content-Type", "application/json-patch+json"); request.AddBody(addVoucherRequest); // Act var response = client.Execute(request); var retrievedVoucher = JsonConvert.DeserializeObject<Voucher>(response.Content); //Assert retrievedVoucher.CountryCode.ShouldBe(countryCode); response.StatusCode.ShouldBe(HttpStatusCode.OK); } [Theory] [InlineData(_NZDiscountId, "NZ")] [InlineData(_JPDiscountId, "JP")] [InlineData(_SGDiscountId, "SG")] public void AddRestrictedOnlineVoucher_ShouldReturnVoucherCorrectly(string discountId, string countryCode) { // Arrange var channelRestrictions = new List<VoucherChannelRestriction> { new VoucherChannelRestriction { Channel = "Online" } }; var storeAvailiability = new List<VoucherStoreAvailability> { new VoucherStoreAvailability { IsAvailable = true, StoreGroupCode = $"Country.${countryCode}", ModifiedBy = _user } }; var addVoucherRequest = new AddVoucherRequest { Voucher = new VoucherBuilder() .WithCountry(countryCode) .WithDiscount(Guid.Parse(discountId)) .WithUser(_user) .WithChannelRestrictions(channelRestrictions) .WithStoreAvailabilities(storeAvailiability) .AsRestricted(VoucherUseFrequency.Weekly, 10, 10) .Build() }; var client = new RestClient(_credentialSettings.BaseUrl); RestRequest request = new RestRequest($"/api/Voucher/AddVoucher", Method.Post); request.AddHeader("X-API-KEY", _credentialSettings.ApiKey); request.AddHeader("Content-Type", "application/json-patch+json"); request.AddBody(addVoucherRequest); // Act var response = client.Execute(request); var retrievedVoucher = JsonConvert.DeserializeObject<Voucher>(response.Content); //Assert retrievedVoucher.CountryCode.ShouldBe(countryCode); response.StatusCode.ShouldBe(HttpStatusCode.OK); } [Theory] [InlineData(_NZDiscountId, "NZ")] [InlineData(_JPDiscountId, "JP")] [InlineData(_SGDiscountId, "SG")] public void AddStandardStoreVoucher_ShouldReturnVoucherCorrectly(string discountId, string countryCode) { // Arrange var channelRestrictions = new List<VoucherChannelRestriction> { new VoucherChannelRestriction { Channel = "Store" } }; var storeAvailiability = new List<VoucherStoreAvailability> { new VoucherStoreAvailability { IsAvailable = true, StoreGroupCode = $"Country.${countryCode}", ModifiedBy = _user } }; var addVoucherRequest = new AddVoucherRequest { Voucher = new VoucherBuilder() .WithCountry(countryCode) .WithDiscount(Guid.Parse(discountId)) .WithUser(_user) .WithChannelRestrictions(channelRestrictions) .WithStoreAvailabilities(storeAvailiability) .Build() }; var client = new RestClient(_credentialSettings.BaseUrl); RestRequest request = new RestRequest($"/api/Voucher/AddVoucher", Method.Post); request.AddHeader("X-API-KEY", _credentialSettings.ApiKey); request.AddHeader("Content-Type", "application/json-patch+json"); request.AddBody(addVoucherRequest); // Act var response = client.Execute(request); var retrievedVoucher = JsonConvert.DeserializeObject<Voucher>(response.Content); //Assert retrievedVoucher.CountryCode.ShouldBe(countryCode); response.StatusCode.ShouldBe(HttpStatusCode.OK); } [Theory] [InlineData(_NZDiscountId, "NZ")] [InlineData(_JPDiscountId, "JP")] [InlineData(_SGDiscountId, "SG")] public void AddStandardOnlineVoucher_ShouldReturnVoucherCorrectly(string discountId, string countryCode) { // Arrange var channelRestrictions = new List<VoucherChannelRestriction> { new VoucherChannelRestriction { Channel = "Online" } }; var storeAvailiability = new List<VoucherStoreAvailability> { new VoucherStoreAvailability { IsAvailable = true, StoreGroupCode = $"Country.${countryCode}", ModifiedBy = _user } }; var addVoucherRequest = new AddVoucherRequest { Voucher = new VoucherBuilder() .WithCountry(countryCode) .WithDiscount(Guid.Parse(discountId)) .WithUser(_user) .WithChannelRestrictions(channelRestrictions) .WithStoreAvailabilities(storeAvailiability) .Build() }; var client = new RestClient(_credentialSettings.BaseUrl); RestRequest request = new RestRequest($"/api/Voucher/AddVoucher", Method.Post); request.AddHeader("X-API-KEY", _credentialSettings.ApiKey); request.AddHeader("Content-Type", "application/json-patch+json"); request.AddBody(addVoucherRequest); // Act var response = client.Execute(request); var retrievedVoucher = JsonConvert.DeserializeObject<Voucher>(response.Content); //Assert retrievedVoucher.CountryCode.ShouldBe(countryCode); response.StatusCode.ShouldBe(HttpStatusCode.OK); } } }`

`using RestSharp; using Newtonsoft.Json; using Shouldly; using Dominos.Services.Admin.Discounts.Api.v1.Discounts; using NUnit.Framework; using System; namespace Dominos.Services.Admin.Discounts.Tests.External.E2E.Discounts { public class SearchDiscountCode { private readonly CredentialSettings _credentialSettings; private const string _NZDiscountId = "a191bd87-d556-4d36-aa75-0ccb52fb22a0"; private const string _SGDiscountID = "d03d9080-be0a-4494-90d3-4af126178e1d"; private const string _JPDiscountID = "bd9aa5a9-63c6-4704-9bb0-31ac6d273210"; public SearchDiscountCode() { _credentialSettings = ConfigurationsHelper.GetApplicationConfiguration().CredentialSettings; } [Test] [TestCase(_NZDiscountId)] [TestCase(_SGDiscountID)] [TestCase(_JPDiscountID)] public void GetDiscountByDiscountId_ShouldReturnOK(string discountId) { //Arrange var client = new RestClient(_credentialSettings.BaseUrl); RestRequest request = new RestRequest($"/api/Discount/Discount?discountId={discountId}",Method.Get); request.AddHeader("X-API-KEY", _credentialSettings.ApiKey); request.AddHeader("Content-Type", "application/json"); //Act var response = client.Execute(request); var retriveResponce = JsonConvert.DeserializeObject<Discount>(response.Content); //Assert retriveResponce.DiscountId.ToString().ShouldBe(discountId); } } }`
```
