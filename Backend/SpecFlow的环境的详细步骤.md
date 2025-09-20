> By: Megha Gangwal(gangwal@kth.se), MD Rezaul Hasan(mrhasa@kth.se)

![](https://miro.medium.com/v2/resize:fit:1400/1*Wro0AtEzzds_y4SmttbLUA.jpeg)

**Introduction**:

The learning objective of this tutorial is:

- At the end of the tutorial, the learner must be able to understand the basic concepts of the RestSharp & SpecFlow.
- Learners should be able to set up the RestSharp and SpecFlow on the .Net Core project for API Testing.

This tutorial will take approximately 30–40 min depending on the learner’s knowledge and installed software.

Before we start the tutorial, let us ask ourselves a couple of questions,

- Why do we need automated testing?
- Why do we need RestSharp?
- What is the use of SpecFlow?

There are many advantages or benefits of automated testing, some of them are:

- It helps in finding the bug early in the development phase, resulting in an increase in efficiency
- Automated Testing helps in the reduction of manual errors and omissions.
- Automated Testing improves the traceability of requirements across multiple systems, thus reducing the effort in error detection and maintenance of the systems

Due to these advantages, the industry has adopted automated testing to a great degree.

**RestSharp**:

RestSharp is an open-source HTTP client library. It is one of the most used libraries for the Rest API Testing in .Net and .Net Core.

Asynchronous request handling is a key requirement for development on the Microsoft platform. RestSharp supports both synchronous as well as asynchronous requests.

The RestSharp also allows configuring different parts of HTTP call requests, which provides greater flexibility to developers to customize and test. However, it does not support API calls over HTTP/2.

It also supports inbuilt serialization and deserialization and various authentication methods.

Overall RestSharp is a constantly updated open-source library, which provides an easy way to test .net-based applications.

**SpecFlow:**

Specflow is an open-source testing framework hosted on GitHub. It supports Behavior Design Development (BDD) practices in .NET. It uses Gherkin syntax to write the test cases and we used cucumber extension for syntax highlighting as well as for basic snippets support. Some of the key concepts used in SpecFlow are

Feature File — It is written in plain text. It defines the test suite in terms of features and contains the actual tests which are called Scenarios.

- Feature — Feature states the goal for the Feature File. When the Feature File is complete, a tag is included at this level so that all of the test Scenarios contained within the file can be run from a single command
- Scenario — Individual tests are defined by “Scenario:” followed by a unique name. It defines the expected behavior of the application under test. The first line states the goal of the given Scenario. The subsequent lines define the steps needed to complete the test. There are the following commands reserved by Specflow to define the steps

**Given**: Used for describing a set of pre-conditions for the scenario

**When**: Used for describing an action or execution step.

**Then**: Used for describing the outcome of the scenario and essentially where the validations should be placed in

SpecFlow has a number of key features such as:

1. It completely integrates with Visual Studio (VS) and utilizes VS IDE capabilities

2. It gives complete VS debugger support, which helps in setting the breakpoints on Given/ When/Then lines in .feature files and step through their execution. y

3. StepFlow supports step definitions in any .NET language.

4. SpecFlow feature files comply with an NUnit test assembly. It can be used by an NUnit-compatible test runner or existing CI infrastructure to run the specifications with no additional configuration

**Essential Installations:**

To do API Testing using RestSharp And SpecFlow on the Linux platform following installations are needed.

1. Visual Studio Code(vscode) installation.
2. Install .Net Core SDK
3. Install .Net Core runtime
4. Install NuGet package manager extension
5. Install C# extension
6. Install Cucumber
7. Install Gherkin Indent
8. Install .Net Core Test Explorer
9. Install json-server
10. Install RestSharp
11. Install SpecFlow
12. Installations of supporting packages

**How to install vscode:**

Follow the following steps

1. To download vscode on the Linux platform, please click on this [link](https://code.visualstudio.com/download)
2. After Link has been opened, select the file corresponding to your operating system to download or you can just click on the download option it will automatically download the file corresponding to your operating system. We have selected the .deb extension file for our Linux system.
3. To install, use the following instructions: Go to your download folder and open your terminal from that folder, then run the command below with the downloaded file name.

**sudo dpkg -i code_1.56.2–1620838498_amd64.deb**

Or you can install it from ubuntu software.

**Installing .Net Core SDK**

1. Open the terminal window and then execute the following commands:

**wget** [**https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb**](https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb)**sudo dpkg -i packages-microsoft-prod.deb****sudo apt update****sudo apt install apt-transport-https -y****sudo apt install dotnet-sdk-3.1**

You could see the following scenario on your terminal

![](https://miro.medium.com/v2/resize:fit:1400/0*Mjx3sL9mD6gkhJ1U)

**Installing .Net Core runtime**

.NET Core Runtime is required for the system, where you only need to run the application. To install Dotnet core runtime on Ubuntu 18.04 Linux system, execute the following commands:

**sudo apt update****sudo apt install apt-transport-https -y****sudo apt install dotnet-runtime-3.1**

**Install NuGet package manager extension**

Open visual studio code from your terminal by using the command :

**code .**

![](https://miro.medium.com/v2/resize:fit:1400/0*DqimoOg1wY5dVBJ6)

Now you could see the visual studio code IDE opened. On the left side of the IDE, you can find an extension symbol which is pointed by a red arrow in the snapshot. Click on the extension, you will see the generated window as shown below and search for NuGet package manager.

![](https://miro.medium.com/v2/resize:fit:1400/0*m5is5zDAj13Uy6Sv)

Click on the install button(We have already installed so that’s why you can see uninstall option). In this way, your NuGet package got installed.

**Install C# extension**

Now in the opened extension search engine, search for c#. Select C# V1.23.12 and click on the install option.

![](https://miro.medium.com/v2/resize:fit:1400/0*T5yEXbl6o7KNOV70)

**Install Cucumber**

In the opened extension search engine, search for Cucumber. Select Cucumber and click on the install option.

![](https://miro.medium.com/v2/resize:fit:1400/0*7cUCIvklhie2OiQR)

**Install Gherkin Indent**

In the opened extension search engine, search for Gherkin Indent. Select Gherkin Indent and click on the install option.

![](https://miro.medium.com/v2/resize:fit:1400/0*xSFHEB5YjHabR27O)

**Install .Net Core Test Explorer**

In the opened extension search engine, search for .Net core Test Explorer. You can see like below. Select .Net core Test Explorer and click on the install option.

![](https://miro.medium.com/v2/resize:fit:1400/0*oyESCCOqt3JzQGkn)

**Install json-server**

1. Nodejs installation for npm

- Download the installer from [NodeJS WebSite](https://nodejs.org/en/) according to your operating system.
- Run the installer.
- Follow the installer steps, agree on the license agreement and click the next button.

Or, run the below command

**sudo apt install nodejs**

To verify Nodejs installation is correct, type

**node**

on your terminal window, you will enter into a node terminal like this:

![](https://miro.medium.com/v2/resize:fit:1400/0*p4QLwoMQC7CC5E9p)

Exit from the terminal by pressing Ctrl + c and again open the new terminal window, type,

**sudo apt install npm****//for checking npm  
npm** 

to check npm commands are executing or not.

![](https://miro.medium.com/v2/resize:fit:1400/0*Lwq0wj5SZLUCIlgU)

Great! You have successfully installed npm.

2. To install json server: Run this command on the terminal window

**sudo npm install -g json-server**

3. Create a folder called restsharpSpecFlow on your desktop and inside that folder Create db.json file Code: Paste this code inside the db.json file and save it:

**{  
“posts”: [  
{ “id”: 1, “title”: “json-server”, “author”: “typicode” }  
],  
“comments”: [  
{ “id”: 1, “body”: “some comment”, “postId”: 1 }  
],  
“profile”: { “name”: “typicode” }  
}**

On the terminal window go to your newly created folder and execute the following command to run json-server.

**json-server db.json**

Now if you go to the [link](http://localhost:3000/posts/1), you’ll get a response link below

**{ “id”: 1, “title”: “json-server”, “author”: “typicode” }**

Shutdown the json-server from the terminal by pressing Ctrl+c

**Install RestSharp**

Open the terminal through the folder restsharpSpecFlow that you have created for the db.json file.

Execute the following command which will create an NUnit project.

**dotnet new nunit**

It will create 3 files: obj folder, UnitTest1.cs,and restsharpSpecFlow.csproj

restsharpSpecFlow.csproj file will look like this:

![](https://miro.medium.com/v2/resize:fit:1314/0*bf_lSUdzbedlMyDo)

Now let’s install RestSharp: The command for installing RestSharp:

**dotnet add package RestSharp -v 106.11.7**

**Install SpecFlow**

The command for installing SpecFlow:

**dotnet add package SpecFlow -v 3.8.7**

**Installations of supporting packages**

To read json file we need this package which helps RestSharp to deserialize received data.

**dotnet add package RestSharp.Newtonsoft.Json -v 1.5.1**

For connecting with the NUnit test case and SpecFlow run this command

**dotnet add package SpecFlow.NUnit -v 3.8.7**

This MSBuild package enables the code-behind file generation at build time.

**dotnet add package SpecFlow.Tools.MsBuild.Generation -v 3.8.7**

Also, run the below command for avoiding the NUnit version issue:

**dotnet add package NUnit -v 3.13.1**

After installing above all packages the restsharpSpecFlow.csproj file will look like this:

![](https://miro.medium.com/v2/resize:fit:1400/1*lQkTSq4IMs-hbV34DMgk4Q.png)

**Execution of the tutorial:** Once you complete the installations, then follow the steps below:

**(A) RestSharp Integration**

**(B) SpecFlow Integration**

Let’s do RestSharp Integration first

**(A) RestSharp Integration**

1. Open the vscode through the terminal from the already created folder restsharpSpecFlow by the following command

**code .**

You can see three files are present there: obj folder, UnitTest1.cs, and restsharpSpecFlow.csproj

2. Open UnitTest1.cs file

3. Now first of all build the project through the vscode terminal by using the command

**dotnet build**

![](https://miro.medium.com/v2/resize:fit:1400/0*I4KGYTWLQWR9ZPSr)

4. Now import the following packages in the UnitTest1.cs file:

Packages:

**using RestSharp;  
using System.Collections.Generic;**

5. Do the following changes inside the public class Tests of the UnitTest1.cs file

**[TestFixture]  
public class Tests  
{  
 [Test]  
 public void TestGetRequest()  
  {  
    var restClient = new RestClient(“http://localhost:3000/");  
    var request = new RestRequest(“posts/{postid}”, Method.GET);  
    request.AddUrlSegment(“postid”, 1);  
    var response = restClient.Execute(request);  
    var deserialize = new    RestSharp.Serialization.Json.JsonDeserializer();  
    var outputData = deserialize.Deserialize<Dictionary<string,   string>>(response);**    **var result = outputData[“author”];  
    Assert.That(result, Is.EqualTo(“typicode”), “Author is not   correct”);  
  }** **[Test]  
 public void TestPostRequest()  
 {  
    var restClient = new RestClient(“http://localhost:3000/");  
    var request = new RestRequest(“posts/{postid}/profile”, Method.POST);  
    request.AddJsonBody(new { name = “raju” });  
    request.AddUrlSegment(“postid”, 3);  
    var response = restClient.Execute(request);  
    var deserialize = new RestSharp.Serialization.Json.JsonDeserializer();  
    var outputData = deserialize.Deserialize<Dictionary<string, string>>(response);**    **var result = outputData[“name”];  
    Assert.That(result, Is.EqualTo(“raju”), “Author is not correct”);  
  }  
}**

Make sure that all double quotes (“ ”)are correctly used as C# syntex.

Let’s understand the code in detail:

**5.1 Creating Client Connection:**

//Creating Client connection**var restClient = new RestClient(“http://localhost:3000/");**

Creation of the RestClient opens the browser and gets it ready to call any server using a URL. In our scenario, RestClient initializes a client with the specified root address.

**5.2 Creating Request for GET method:**

//Creating request to get all data from server**var request = new RestRequest(“posts/{postid}”, Method.GET);**

Now our Client connection is established, so the client is ready to send requests to the server. Here, RestRequest class creates HTTP Requests to the specified URL. RestRequest class supports different HTTP methods like GET, POST, etc.

Here we are using the GET method to retrieve the information corresponding to attribute “postid”

**5.3 Executing Request on the Server for GET method:**

// Executing request to server and checking server response**request.AddUrlSegment(“postid”, 1);  
var response = restClient.Execute(request);**

Execute method is used to send the request to the json-server and get the response. The received response is stored in the response object.

Here the request is made for postid =1

**5.4 Creating Request for POST method:**

**var request = new RestRequest(“posts/{postid}/profile”, Method.POST);  
request.AddJsonBody(new { name = “raju” });  
request.AddUrlSegment(“postid”, 3);  
var response = restClient.Execute(request);**

Here we are using the POST method to add the information to the /profile route:

postid = 3 and name = raju

**5.5 Deserialization**

RestSharp contains inbuilt de-serializers that support XML and JSON. The correct de-serializer is chosen by RestSharp, based on the content type returned by the server.

Deserialize method converts the string form of json to object data. After that, we add data to the dictionary list.

**var deserialize = new RestSharp.Serialization.Json.JsonDeserializer();  
var outputData = deserialize.Deserialize<Dictionary<string, string>>(response);**

**5.6 Verifying Response**

**var result = outputData[“author”];  
Assert.That(result, Is.EqualTo(“typicode”), “Author is not correct”);**

`[Assert class](https://docs.microsoft.com/en-us/dotnet/api/microsoft.visualstudio.testtools.unittesting.assert?view=mstest-net-1.3.2)` is used to verify various assertions. Here we are verifying the “author” name for the corresponding postid i.e. 1. RestSharp provides the capability to assert various data items in the response.

**6. Build UnitTest**

Again build the UnitTest1.cs file by the following command

**dotnet build** 

the result will be as shown in the figure:

![](https://miro.medium.com/v2/resize:fit:1400/0*WkVsu2-HbEz_w7ys)

**7.** **Configuration of vscode with .Net Test Explorer**

You need to config the vscode with .net test explorer to execute UnitTest. For this go to vscode settings(you can find it from the bottom left corner) and click on it.

Follow the following instructions for configuration

**extension-> .Net Core Test Explorer-> Test Project path: restsharpSpecFlow.csproj**

Reopen vscode and you can see the test cases like this.

![](https://miro.medium.com/v2/resize:fit:1400/0*p05n1-3WNEU4b3mb)

**8. Executing the Test cases**

Now run the test cases by clicking the arrow button shown in the figure from step 7.

**Ohhh!!!** There is an error,

![](https://miro.medium.com/v2/resize:fit:930/1*iAsoWmfox_Ed1vXFCr6WmQ.jpeg)

We forgot to run json-server.

So make sure that you run your json-server from the same restsharpSpecFlow folder by using the command:

**json-server db.json**

The new terminal window of opened json-server will look like this

![](https://miro.medium.com/v2/resize:fit:1400/0*zm9W1eipgF1lMvwF)

Now again run the test cases(as illustrated in step 8).

You can verify that our test cases executed properly by a green tick mark and if it fails, it will be shown by a red cross(X) mark.

![](https://miro.medium.com/v2/resize:fit:1400/0*4LiL6kLaUzzVbMP0)

**(B) SpecFlow Integration**

1. **Create specflow.json file:**

To create a specflow.json file using the following instructions.

**click on .vscode folder(location: top left of your vscode IDE ) and right click to create a file name it as sepcflow.json**

Or, If you do not see any .vscode folder then you can create a specflow.json file inside your project folder.

The use of this file is that it will help SpecFlow to understand the language of the instructions specified in the Feature file.

Paste this code into the specflow.json file and save it.

**{  
 “language”:  
 {  
 “feature”: “en-nz”  
 }  
}**

**2. Creating folders:**

Right-click on the sidebar and create 2 folders inside the project:

I. Feature,

II. Steps

Open Feature folder. Right-click on the Feature folder and Create a file and name it as GetPost.feature

Open Steps folder. Right-click on the Steps folder and Create a file and name it as GetPost.steps.cs

![](https://miro.medium.com/v2/resize:fit:564/1*f8gT8c3JEGBmlW_rGqt3BA.png)

now reopen your GetPost.feature file and insert the following scenario.

**Feature: GetPost**        **Test GET posts operation with RestSharp.Net****Scenario: Verify author of the posts 1**        **Given I perform GET operation for “posts/{postid}”**        **And I perform operation for post “1”**        **Then I should see the “author” name as “typicode”**

Here, we are specifying the scenario

**Given**: Our specified pre-condition is like this wants to perform GET operation with respect to postid.

**And**: Specifically for postid = 1

**Then**: We want to verify that the “author ”name should be “typicode ”for the received response of postid = 1

Now open GetPost.Steps.cs file and paste the following code

**using System.Collections.Generic;  
using RestSharp;  
using NUnit.Framework;  
using TechTalk.SpecFlow;  
using System;****//make sure that your namespace is same as your project namespace.  
namespace restsharpSpecFlow.Steps   
{**  **[Binding]**  **public class GetPostSteps  
  {  
    public RestClient restClient = new  RestClient(“http://localhost:3000/");**    **public RestRequest restRequest = new RestRequest();**    **[Given(@”I perform GET operation for “”(.*)”””)]  
    public void GivenIPerformGETOperationFor(string url)  
    {  
      restRequest = new RestRequest(url, Method.GET);  
    }**    **[Given(@”I perform operation for post “”(.*)”””)]  
    public void GivenIPerformOperationForPost(int postId)  
    {  
      restRequest.AddUrlSegment(“postid”, postId.ToString());  
      var response = restClient.Execute(restRequest);  
    }**    **[Then(@”I should see the “”(.*)”” name as “”(.*)”””)]  
    public void ThenIShouldSeeTheNameAs(string key, string value)  
    {**      **var response = restClient.Execute(restRequest);  
      var deserialize = new RestSharp.Serialization.Json.JsonDeserializer();**      **var outputData = deserialize.Deserialize<Dictionary<string, string>>(response);**      **var result = outputData[“author”];  
      Assert.That(result, Is.EqualTo(value), “Author is not correct”);  
    }  
  }  
}**

The GetPost.Steps.cs file provides the connection between the feature file and the application interface. In the feature file, we have specified instructions and here all the instructions are implemented. For example,

**//annotation =instruction in feature file****[Given(@”I perform GET operation for “”(.*)”””)]  
public void GivenIPerformGETOperationFor(string url)  
{  
restRequest = new RestRequest(url, Method.GET);  
}  
//defination of the instruction**

Now build your project again by using the command.

**dotnet build** 

When you successfully build your project you can see in test explorer, that there is new test case is added which called Feature.GetPostFeature.

Now run all test cases by pressing the run all test button(triangular play button).

Final result:

![](https://miro.medium.com/v2/resize:fit:1400/0*AXCa7aAktnEtl4WS)

Well, you know how to Test rest API by using RestSharp and SpecFlow on the dotnet environment.

**For more information on**

- The [**json-server**](https://github.com/typicode/json-server) is a popular tool for front-end developers to quickly setting up a fully fake REST API.
- [**NUnit**](https://www.c-sharpcorner.com/UploadFile/84c85b/nunit-with-C-Sharp/) is a unit-testing framework for .NET applications in which the entire application is divided into modules and each module is tested independently. This Framework provides a number of attributes like Test-Fixtures, Test methods, ExpectedException, and Ignore methods.
- [**NuGet Package manager**](https://www.nuget.org/) is a CLI for installing .Net core packages.
- This [**.NET Core**](https://www.tutorialsteacher.com/core/dotnet-core) framework runs on different operating systems like Windows, macOS, and Linux.
- [**RestSharp**](https://restsharp.dev/)
- [**SpecFlow**](https://specflow.org/)
- [**Visual Studio Code**](https://code.visualstudio.com/docs)
- [**Code Repo**](https://github.com/MDRezaulHasan/RestSharp-SpecFlow-testCase)

[

Api Testing

](https://medium.com/tag/api-testing?source=post_page-----2f814bccd8ea---------------api_testing-----------------)

[  
](https://medium.com/tag/restsharp?source=post_page-----2f814bccd8ea---------------restsharp-----------------)