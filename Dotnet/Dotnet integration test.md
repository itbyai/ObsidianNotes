## Table of Contents  
  

- [Table of Contents](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Table-of-Contents%5BhardBreak%5D)
- [Overview](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Overview)
- [Folder Structure](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Folder-Structure)
- [Tools](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Tools)
- [Coding Standards](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Coding-Standards)
- [Writing New Tests](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Writing-New-Tests)
    - [GET Example](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#GET-Example)
    - [POST Example](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#POST-Example)
    - [Further Reading](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Further-Reading%5BhardBreak%5D)
- [Running Tests from Visual Studio](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Running-Tests-from-Visual-Studio)
    - [Example Project - Demaecan Aggregator Service](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Example-Project---Demaecan-Aggregator-Service)
        - [Steps](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Steps)
        - [Updating appSetting Configuration Files to target the Staging Environment](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Updating-appSetting-Configuration-Files-to-target-the-Staging-Environment%5BhardBreak%5D)
        - [Running the Test via Resharper Unit Testing](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Running-the-Test-via-Resharper-Unit-Testing)
    - [Example Project - Uber Eats Aggregator Service](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Example-Project---Uber-Eats-Aggregator-Service)
        - [Steps](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Steps.1)
        - [Updating appSetting Configuration Files to target the Staging Environment](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Updating-appSetting-Configuration-Files-to-target-the-Staging-Environment)
        - [Updating Tests with correct values to target the Staging Environment](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Updating-Tests-with-correct-values-to-target-the-Staging-Environment)
        - [Running the Test via Resharper Unit Testing](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Running-the-Test-via-Resharper-Unit-Testing.1)
- [Example Use Cases](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Example-Use-Cases)
    - [Example Project - Modern API (Basic Implementation)](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Example-Project---Modern-API--\(Basic-Implementation\))
    - [Rakuten Aggregator - Old API using XML Payloads (Intermediate Implementation)](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Rakuten-Aggregator---Old-API-using-XML-Payloads-\(Intermediate-Implementation\))
    - [Checkout Service - Modern API with JSON Payloads (Advanced Implementation)](https://dominos.atlassian.net/wiki/spaces/SE/pages/1038255645/AUTO+API+Test+Framework+NextGen#Checkout-Service---Modern-API-with-JSON-Payloads-\(Advanced-Implementation\))

## Overview

The AUTO API Framework is a API framework written in C# and makes use of .NET Client library, [RestSharp](http://restsharp.org/getting-started/#basic-usage "http://restsharp.org/getting-started/#basic-usage").  
  
Originally designed to enhance the coverage of the new [Checkout Service](https://dev.azure.com/dominos-au/OneDigital/_git/Services.Checkout?version=GBmaster&path=%2FDominos.Services.Checkout.Tests.External%2FIntegration "https://dev.azure.com/dominos-au/OneDigital/_git/Services.Checkout?version=GBmaster&path=%2FDominos.Services.Checkout.Tests.External%2FIntegration"), the AUTO API Framework has since become the defacto API testing framework available for Developers and QEs.  
  
The framework is a pattern, rather than a repo which can be adopted as part of new services or retrofitted into existing services.  
  
**What does this framework give you?**

- Provides a common pattern for customer-focused API Testing
    
- Removes the complexities of having to understand a client by using RestSharp, allowing for focus on end-to-end testing instead
    
- Allows for API Tests to be Data-driven through Test Fixtures
    

## Folder Structure

    ├───Dominos.Services.x.x.Tests.External
    │   │   appsettings.Development.json
    │   │   appsettings.json
    │   │   ConfigurationHelper.cs
    │   │
    │   ├───E2E
    │   │   │   PlaceOrderTests.cs
    │   │   │   UpdateStatusTest.cs
    │   │   │
    │   │   ├───Fixtures
    │   │   ├───Payloads
    │   │   │   testdata.json
    │   │   │   testmoredata.json

## Tools

|   |   |   |
|---|---|---|
|**Tool**|**What**|**Website**|
|xUnit|.NET Unit Testing Framework|[https://xunit.net/](https://xunit.net/ "https://xunit.net/")|
|RestSharp|.NET API Client Library|[http://restsharp.org/](http://restsharp.org/ "http://restsharp.org/")|
|Shouldly|.NET Assertion Library|[![](https://github.com/fluidicon.png)GitHub - shouldly/shouldly: Should testing for .NET—the way assertions should be!](https://github.com/shouldly/shouldly)|

## Coding Standards

The coding standards of this framework should adhere to the recommendations of Domino’s API Development Standards. Please consult the Software Engineering Practice for more information.

## Writing New Tests

Prior to writing tests, please familiarise yourself with [xUnit](https://xunit.net/docs/getting-started/netcore/cmdline "https://xunit.net/docs/getting-started/netcore/cmdline") and [RestSharp](http://restsharp.org/getting-started/#basic-usage "http://restsharp.org/getting-started/#basic-usage").

### GET Example

To help explain how to write new tests within the AUTO API Framework, I have created an example project with some example tests which I’ll break down further below.  
  
Here’s an Example of a `GET` Test from the Example Store API.

        [Fact(Skip = "Waiting on pipeline to be built")]
        public async Task Get_StoreDetails()
        {
            var client = new RestClient("https://api.example.com/v1/example/example/#{example_store_id}#");
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", "Bearer #{example_store_orders_read_token}#");
            request.AddHeader("Content-Type", "application/json");
            IRestResponse response = client.Execute(request);
            response.Content.ShouldContain("Dominos - Test Store 1");
        }

**xUnit Facts and Skips**  
  
`[Fact(Skip = "Waiting on pipeline to be built")]`  
  
Fact refers to a xUnit Fact which we won’t go into too much detail now, but a Fact or Theory is required for a test to be recognized as a Test.

> _**Facts** are tests which are always true. They test invariant conditions._
> 
> _**Theories** are tests which are only true for a particular set of data._

Further reading:

- [https://xunit.net/docs/getting-started/netfx/visual-studio](https://xunit.net/docs/getting-started/netfx/visual-studio "https://xunit.net/docs/getting-started/netfx/visual-studio")
    
- [https://andrewlock.net/creating-parameterised-tests-in-xunit-with-inlinedata-classdata-and-memberdata/#:~:text=xUnit%20uses%20the%20%5BFact%5D%20attribute,with%20an%20%5BInlineData%5D%20attribute.](https://andrewlock.net/creating-parameterised-tests-in-xunit-with-inlinedata-classdata-and-memberdata/#:~:text=xUnit%20uses%20the%20%5BFact%5D%20attribute,with%20an%20%5BInlineData%5D%20attribute "https://andrewlock.net/creating-parameterised-tests-in-xunit-with-inlinedata-classdata-and-memberdata/#:~:text=xUnit%20uses%20the%20%5BFact%5D%20attribute,with%20an%20%5BInlineData%5D%20attribute")
    

The `Skip` part is a way of ignoring the test and a reason for the ignoring must be provided.  
  
**Using the RestSharp Client**

`var client = new RestClient("https://api.example.com/v1/example/example/#{example_store_id}#");`

Here is simply specify that we want to use the RestSharp client and where we want to make the request to.  
  
**Creating the RestSharp Request**

`var request = new RestRequest(Method.GET); request.AddHeader("Authorization", "Bearer #{example_store_orders_read_token}#"); request.AddHeader("Content-Type", "application/json");`

Here we build up our request, what we actually want to do to the endpoint we’re targeting.  
  
In this example, we’re doing a `GET` (`Method.GET`)

`var request = new RestRequest(Method.GET);`

Then adding 2 headers to the request which is common for modern APIs.

`request.AddHeader("Authorization", "Bearer #{example_store_orders_read_token}#"); request.AddHeader("Content-Type", "application/json");`

This is typically where any authorization or API keys etc may be required to be allowed to make your request to the API.  
  
**Submitting the RestSharp Request and Asserting data against the RestSharp Response**

`IRestResponse response = client.Execute(request); response.Content.ShouldContain("Dominos - Test Store 1");`

Now we’re in a position to submit the request and then check the response to make sure it’s responding with what we expect.  
  
To submit the request simply use `client.Execute(request)`however as we want to also check the data after, we change it to be `IRestResponse response = client.Execute(request)`

Now that we’ve submitted the request, we assert the data simply by typing `response.Content` then adding [Shouldy’s](https://github.com/shouldly/shouldly "https://github.com/shouldly/shouldly") `.ShouldContain()` to make an assertion to verify the response.  
  
Together you get `response.Content.ShouldContain("stuff we expect the response to say")`  
  
That’s it for a `GET` call!

### POST Example

        [Fact(Skip = "Placeholder")]
        public async Task PlaceOrderSuccess_ItShouldReturnStatusAs000()
        {
            var client = new RestClient(clientSettings.BaseUrl);
            var request = new RestRequest("/Orders/PlaceOrder", Method.POST);
            request.AddHeader("x-api-key", clientSettings.ApiKey);
            var payload = "./Payloads/TestThings.json";
            request.AddJsonBody(payload);
            IRestResponse response = client.Execute(request);
            response.Content.ShouldNotBeNullOrEmpty();
            response.Content.ShouldBe("000");
            output.WriteLine("Response Status Code: " + response.Content);
        }

As we covered off a lot of the basics in the `GET` Example, we’ll just focus on the differences and what’s required for a `POST` request.  
  
**Creating the RestSharp Request**

`var request = new RestRequest("/Orders/PlaceOrder", Method.POST); request.AddHeader("x-api-key", clientSettings.ApiKey);`

For `POST` request we’ll need to specify the path from the base URL (`“/Orders/PlaceOrder”`) and also `Method.POST`.  
  
Then do your `request.AddHeader()` as required.  
  
After that it’s payload time, which is the process of adding data to the `Body` of the request, which in most modern APIs will involve using `request.AddJsonBody()`.

There are many ways that the payload can be populated such as **in-line**, **from file (recommended)** or **dynamically created (even more recommended)**, so please consider your needs as a team.  
  
Main considerations include:

- Static Data vs Dynamic Data
    
- Age of the API - Modern vs Legacy Data Formats
    

`var payload = "./Payloads/TestThings.json"; request.AddJsonBody(payload);`

The above example is showing the **From File** option where we just need to provide the path to the payload and then add it to `request.AddJsonBody(payload)`.  
  
Similarly with the `GET` example, you can then just add your assertions using Shouldly.

### Further Reading  
  

- [http://restsharp.org/getting-started/#basic-usage](http://restsharp.org/getting-started/#basic-usage "http://restsharp.org/getting-started/#basic-usage")
    
- [http://restsharp.org/usage/parameters.html](http://restsharp.org/usage/parameters.html "http://restsharp.org/usage/parameters.html")
    

## Running Tests from Visual Studio

### Example Project - Demaecan Aggregator Service

#### Steps

1. Update `appsettings.Development.json`
    
2. Run Tests
    

#### Updating appSetting Configuration Files to target the Staging Environment  
  

Demaecan appsettings.Development.json

To target the Staging environment simply update `appsettings.Development.json` to the below values.

|   |   |
|---|---|
|**Original Value**|**New Value**|
|`#{DemaecanAggregatorServiceURI}#`|[https://olo-stage-tky-services-aggregators-demaecan-ft.dpe.pizza/api/](https://olo-stage-tky-services-aggregators-demaecan-ft.dpe.pizza/api/ "https://olo-stage-tky-services-aggregators-demaecan-ft.dpe.pizza/api/")|
|`#{DemaecanApiKey}#`|[Obtain Staging API Key From AWS Console or Ask a Developer for assistance]|
|`#{DemaecanCooperationID}#`|[Username from [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8624](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8624 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8624")]|
|`#{DemaecanCooperationPW}#`|[Password from [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8624](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8624 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8624")]|

#### Running the Test via Resharper Unit Testing

1. Click Extensions from the Top Visual Studio Navigation
    
2. Click ReSharper
    
3. Click Unit Tests
    
4. Click Unit Tests  
      
  ![[Pasted image 20250301225016.png]]
    
    ![](blob:https://dominos.atlassian.net/eff2ba60-63bd-45a6-9059-2f35837e972d#media-blob-url=true&id=158becea-719b-49d0-8499-03c76bd265b1&collection=contentId-1038255645&contextId=1038255645&width=790&height=569&alt=)
    
5. Expand Dominos.Services.Aggregators.Demaecan.Tests.External
    
6. Expand Dominos.Services.Aggregators.Demaecan.Tests
    
7. Expand External
    
8. Expand PlaceOrderTests  
      
    
  ![[Pasted image 20250301225031.png]]
    
    ![](blob:https://dominos.atlassian.net/1670a6e5-4d4d-4d4b-a2aa-6e6701513a01#media-blob-url=true&id=971fcd5e-6b2f-43ad-bc49-76cef22b7e02&collection=contentId-1038255645&contextId=1038255645&width=644&height=558&alt=)
    
9. Right Click on the Test you wish to Run
    
10. Select Run Unit Tests  
      
    
  ![[Pasted image 20250301225046.png]]
    
    ![](blob:https://dominos.atlassian.net/eea2759e-81f8-4c58-a440-d8ae59ab102a#media-blob-url=true&id=cc96e1d4-7401-4507-ab9a-5fb72d23350c&collection=contentId-1038255645&contextId=1038255645&width=493&height=229&alt=)
    
11. Test is now Running  
      
    
 ![[Pasted image 20250301225137.png]]
    
    
12. Test results will be displayed in the Unit Test Sessions window  
      
    ![[Pasted image 20250301225152.png]]
    
    

### Example Project - Uber Eats Aggregator Service

#### Steps

1. Update `appsettings.Development.json`
    
2. Run Tests
    

#### Updating appSetting Configuration Files to target the Staging Environment

Uber Eats appsettings.Development.json

To target the Staging environment update `appsettings.Development.json` to the below values.

|   |   |
|---|---|
|**Original Value**|**New Value**|
|`#{UberEatsAggregatorServiceURI}`|[Obtain Service URL from AWS Console or Ask a Developer for assistance]|
|`#{UberEatsApiKey}#`|[Obtain Staging API Key From AWS Console or Ask a Developer for assistance]|
|`#{UberClientID}#`|[Obtain from Uber Portal in the Developers Section - [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=10784](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=10784 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=10784")]|
|`#{UberClientSecret}#`|[Obtain from Uber Portal in the Developers Section - [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=10784](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=10784 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=10784")]|

#### Updating Tests with correct values to target the Staging Environment

**StoreTests**

        [Fact(Skip = "Waiting on pipeline to be built")]
        public async Task Get_StoreDetails()
        {
            var client = new RestClient("https://api.uber.com/v1/eats/stores/#{EatsStoreID}#");
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", "Bearer #{EatsStoreOrdersReadToken}#");
            request.AddHeader("Content-Type", "application/json");
            IRestResponse response = client.Execute(request);
            response.Content.ShouldContain("Dominos - Test Store 1");
        }

|   |   |
|---|---|
|**Original Value**|**New Value**|
|`#{EatsStoreID}#`|[Use one of either the below StoreUUID values:  <br>Dominos Test Store 1 - [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8714](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8714 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8714")  <br>Dominos Test Store 2 - [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8715](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8715 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8715")]|
|`#{EatsStoreOrdersReadToken}#`|[Generate Access Token either through Postman or provided middleware (not ready at the time of writing)]|

**OrderTests**

`[Fact(Skip = "Waiting on pipeline to be built")] public async Task GET_ActiveCreatedOrders() { var client = new RestClient("https://api.uber.com/v1/eats/stores/#{EatsStoreID}#/created-orders"); var request = new RestRequest(Method.GET); request.AddHeader("Authorization", "Bearer #{EatsStoreOrdersReadToken}#"); request.AddHeader("Content-Type", "application/json"); IRestResponse response = client.Execute(request); response.Content.ShouldBe("{\"orders\":[]}"); }`

|   |   |
|---|---|
|**Original Value**|**New Value**|
|`#{EatsStoreID}#`|[Use one of either the below StoreUUID values:  <br>Dominos Test Store 1 - [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8714](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8714 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8714")  <br>Dominos Test Store 2 - [https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8715](https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8715 "https://dominos.secretservercloud.com.au/SecretView.aspx?secretid=8715")]|
|`#{EatsStoreOrdersReadToken}#`|[Generate Access Token either through Postman or provided middleware (not ready at the time of writing)]|

#### Running the Test via Resharper Unit Testing

1. Click Extensions from the Top Visual Studio Navigation
    
2. Click ReSharper
    
3. Click Unit Tests
    
4. Click Unit Tests  
      
    
    ![[Pasted image 20250301225231.png]]
    
5. Expand Dominos.Services.Aggregators.UberEats.Tests.External
    
6. Expand Dominos.Services.Aggregators.UberEats.Tests.External
    
7. Expand Store
    
8. Expand StoreTests  
      
    
    ![[Pasted image 20250301225245.png]]
    
9. Right Click on the Test you wish to Run
    
10. Select Run Unit Tests  
      
    
    ![[Pasted image 20250301225321.png]]
    
    ![](blob:https://dominos.atlassian.net/47698695-f00d-48a4-9de4-e94c6068c228#media-blob-url=true&id=11833c9c-8d34-4c41-911d-e1d32c6b5137&collection=contentId-1038255645&contextId=1038255645&width=505&height=372&alt=)
    
11. Test is now Running  
      
    
    ![[Pasted image 20250301225313.png]]
    
12. Test results will be displayed within the Unit Test Sessions window
    

## Example Use Cases

Sample project Repo – [https://dominos-au.visualstudio.com/OneDigital/_git/Services.IdentityAccessManagement](https://dominos-au.visualstudio.com/OneDigital/_git/Services.IdentityAccessManagement "https://dominos-au.visualstudio.com/OneDigital/_git/Services.IdentityAccessManagement")

### Example Project - Modern API (Basic Implementation)

Example Project - GetStoreTests.cs

### Rakuten Aggregator - Old API using XML Payloads (Intermediate Implementation)

Rakuten Aggregator PlaceOrderTests.cs

### Checkout Service - Modern API with JSON Payloads (Advanced Implementation)

Checkout Service - WhenWePlaceOrderCash.cs
using Xunit;
using RestSharp;
using Newtonsoft.Json;
using Dominos.Services.Checkout.Api.v1.Checkout;
using Shouldly;
using Microsoft.Extensions.Configuration;
using System;
using Dominos.Services.Checkout.Tests.External.Integration.Fixtures;
using Dominos.Services.Checkout.Tests.External.Integration.Builders;

namespace Dominos.Services.Checkout.Tests.External.Integration
{
    [Collection("StoreMenu Collection")]
    public class WhenWePlaceOrderCash : IClassFixture<StoreMenuFixture>
    {
        private readonly IConfigurationRoot _configuration;
        private readonly IServiceProvider _serviceProvider;
        private readonly CheckoutTestSettings _settings;
        private readonly Guid _orderId;

        StoreMenuFixture Fixture; 

        public WhenWePlaceOrderCash (StoreMenuFixture fixture)
        {
            this.Fixture = fixture;

            _orderId = Guid.NewGuid();
            CreateOrderInState.InitiatedPaymentCash(_orderId, fixture);
        }
        
        [Fact]
        public void WeShouldBeAbleToPlaceOrderForPickupAUCash(){
            var productDetails = Fixture.ProductAU;
            var language = Fixture.settings.AU.Language;
            var storeNo = Fixture.settings.AU.StoreNo;
            var countryCode = Fixture.settings.AU.CountryCode;
            var productCode = Fixture.settings.AU.ProductCode;
            var productPricePickup = Fixture.ProductAU.Sizes[0].PriceInfo.PickupPrice;
            
            var client = new RestClient(Fixture.settings.CheckoutServiceClientSettings.BaseUrl);
            var request = new RestRequest(Fixture.settings.PlaceOrder, Method.POST);
            
            var payload = MakePlaceOrder.SimplePickupCash(_orderId, productPricePickup);

            request.AddJsonBody(payload);
            request.AddHeader("X-API-KEY", Fixture.settings.CheckoutServiceClientSettings.ApiKey);

            var clientResponse = client.Execute(request);
            
            var response = JsonConvert.DeserializeObject<PlaceOrderResponse>(clientResponse.Content);
            
            response.Message.ShouldNotBeNull();
            response.OrderId.ShouldBe(_orderId.ToString());
            response.Success.ShouldBeTrue();
        }
    }
}