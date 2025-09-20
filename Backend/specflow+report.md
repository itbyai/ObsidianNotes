When we started to explore C# related libraries for doing API automation for my project, Rest Sharp came on top. The main challenges we faced while developing using the rest sharp is :

1. Newer version (107) of RestSharp brought in more changes which does not have any good references on the web.
2. Very less documentation / references on the newer version (107 & beyond) which made us spend more time in correcting the issues.

So wanted to share those changes here along with the steps to create Suite using RestSharp from the scratch.

**Outline :**

1) Changes that are done in Rest Sharp version 107 which is the big change where most of the interfaces are deprecated.

2) Creating a Api automation framework using Specflow and Rest Sharp from the scratch

Before starting with this, let us understand basically what is RestSharp and SpecFlow.

[**RestSharp**](http://restsharp.org/)

RestSharp is a comprehensive, open-source HTTP client library that works with all kinds of DotNet technologies. It can be used to build robust applications by making it easy to interface with public APIs and quickly access data without the complexity of dealing with raw HTTP requests. We will use the RestSharp library in our RESTful API testing

![](https://miro.medium.com/v2/resize:fit:1400/1*ShAAEVOr2q87oMpFBQbnGw.jpeg)

[**SpecFlow**](http://specflow.org/)

Use SpecFlow to define, manage and automatically execute human-readable acceptance tests in .NET projects. Writing easily understandable tests (in [Gherkin language](https://github.com/cucumber/cucumber/wiki/Gherkin)) is a cornerstone of the BDD paradigm and also helps build up a living documentation of your system.

**Changes done in Rest Sharp version 107**

The most important change is that RestSharp stop using the legacy HttpWebRequest class, and uses well-known ‘HttpClient’ instead. This move solves lots of issues, like hanging connections due to improper HttpClient instance cache, updated protocols support, and many other problems.

Another big change is that SimpleJson is retired completely from the code base. Instead, RestSharp uses JsonSerializer from the System.Text.Json package, which is the default serializer for ASP.NET Core.

**RestClient and options :**

The IRestClient interface is deprecated in v107, but brought back in v109. The new interface, however, has a much smaller API compared to previous versions. We would be using RestClient after 107 versions.Client options were moved to RestClientOptions.

![](https://miro.medium.com/v2/resize:fit:1400/1*zD9CUXkDxKD5lLbDrh-ZiA.png)

Code for creating a rest client for api testing

**RestClient Object Lifecycle :**

Do not instantiate `RestClient` for each HTTP call. RestSharp creates a new instance of `HttpClient` internally, and you will get lots of hanging connections, and eventually exhaust the connection pool.

Either register the client as Singleton or set the client in the ScenarioContext if you are following the specflow BDD approach.

**Body Parameters :**

AddParameter(“application/json”, …, ParameterType.RequestBody) is replaced by the AddBody

![](https://miro.medium.com/v2/resize:fit:1400/1*A3ULI3ReAk57FpiOTJ8P9Q.png)

Code for adding the body to the request

**Making Requests :**

**IRestRequest** is deprecated. **RestRequest** should be used to create a request.

**Returning Response :**

**IRestResponse** is deprecated. Instead **RestResponse** should be used to get the response.

**Creating an API Automation Framework :**

**Installation / Setup :**

**1)** Download visual studio from the below link : [https://www.visualstudio.com/downloads/](https://www.visualstudio.com/downloads/)

**Creating an Automation Test Project in Visual Studio :**

1. Launch Visual Studio

2. Click File → New → Project

3. Select Visual C# → Console Application (.NET Framework) — we can use the console app to leave messages about our tests and help us debug

4. Name the Console App project something suitable (e.g. ProductAutomation) and also name the Solution itself something appropriate

Set the ‘.NET Framework’ version to something which is supported by RestSharp, e.g. v4.5.2.

**Adding Nuget Package :**

1) Search for Xunit and install the latest one

2) Under Specflow , search and install Specflow, Specflow Assist Dynamic and Specflow.XUnit

3)Search for RestSharp and install the latest version of it.

4)Search for Microsoft and install the package Microsoft.Net.Test.Sdk

5)Search for FluentAssertions and install the latest package of the same.

6)Search for ExtentReports and install the latest package of the same.

![](https://miro.medium.com/v2/resize:fit:1400/1*mvM8yRkkvbTLF_MtIG5SMg.png)

Project File after adding all the Nuget Packages

**Framework Structure :**

![](https://miro.medium.com/v2/resize:fit:1400/1*C_Dn2NKHH9jxhZWVGY_pDw.png)

Framework structure of the api automation suite

**Tests :** This folder contains two folders Features and Steps . Features folder contains the scenario files. Steps contains the step definition of the scenarios

**Utility :** Utility folder contains all the common utility classes

**Model :** Model folder contains all the POJO classes that is needed for setting the request body/ response body

**Configs :** Configs folder contains all the config files that contains different settings

**Hooks :** Hooks folder contains the hook classes

**Integrating Extent Reports**

Extent Reports is a popular reporting library for creating beautiful and interactive HTML reports

Once the nuget package is added, follow the steps to generate the report :

1. Create an ExtentReports object: Create an ExtentReports object in your test class to initialize the report and set the file path for the report.

ExtentReports extent = new ExtentReports();  
extent.AttachReporter(new ExtentHtmlReporter(@"C:\Reports\TestReport.html"));

2) Create an init method to initiate the html reporter

public static void ExtentReportInit(){  
    var htmlReporter = new ExtentHtmlReporter(testResultPath);  
    htmlReporter.Config.ReportName = "Automation status Report";  
    htmlReporter.Config.DocumentTitle = "Automations status report";  
    htmlReporter.Config.Theme = Theme.Standard;  
    htmlReporter.Start();  
  
    _extentReports = new ExtentReports();  
    _extentReports.AttachReporter(htmlReporter);  
}

3)To clear the reports, use flush

public static void cleanReport(){  
    _extentReports.Flush();  
}

Here is the Automation framework created using Rest Sharp and Spec flow. This would be a good reference :

[

## GitHub - preethy1991/RestSharpAutomationFramework at master

### You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or…

github.com



](https://github.com/preethy1991/RestSharpAutomationFramework/tree/master?source=post_page-----5fefe353b5a7--------------------------------)

Happy Learning!!