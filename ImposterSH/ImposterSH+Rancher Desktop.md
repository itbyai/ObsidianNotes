
- [Prerequisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Prerequisites)
- [Installing Imposter CLI](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Installing-Imposter-CLI)
    - [Homebrew](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Homebrew)
    - [Shell script](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Shell-script)
- [Starting Imposter with Graal](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Starting-Imposter-with-Graal)
- [Local Development](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Development)
    - [Folder Structure](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Folder-Structure)
    - [What’s in the Config file?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#What%E2%80%99s-in-the-Config-file%3F)
    - [What's in the Script?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#What's-in-the-Script%3F)
        - [What is the purpose of stubtools.js?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#What-is-the-purpose-of-stubtools.js%3F)
    - [What's in the Data?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#What's-in-the-Data%3F)
- [Local Testing](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Testing)
## Prerequisites

==You must have Docker installed and running.==

Due to licensing restrictions, we are not allowed to use [Docker Desktop](https://www.docker.com/products/docker-desktop/ "https://www.docker.com/products/docker-desktop/") . But there are other alternatives like [Rancher Desktop](https://rancherdesktop.io/ "https://rancherdesktop.io/") or [Colima.](https://github.com/abiosoft/colima "https://github.com/abiosoft/colima")

Rancher Desktop安装之后，需要允许admin权限
![[Pasted image 20240513224438.png]]
If you are using windows, here’s a [document](https://dominos.atlassian.net/wiki/spaces/EDDT/pages/4994138982 "/wiki/spaces/EDDT/pages/4994138982") that can guide you to run Docker without having Docker Desktop




## Installing Imposter CLI

#### Homebrew

If you have Homebrew installed:

`brew tap gatehill/imposter brew install imposter`

#### Shell script

Or, use this one liner (macOS and Linux only):

`curl -L https://raw.githubusercontent.com/gatehill/imposter-cli/main/install/install_imposter.sh | bash -`

## Starting Imposter with Graal

We recommend adding this alias to your shell environment:

`echo "alias imposter='imposter '\nalias up='up -t docker-all -r --env \"IMPOSTER_JS_PLUGIN=js-graal\"'" >>~/.zshrc`

To start imposter just run:

`imposter up`

**Note:** Detailed information regarding installing and running imposter can be found [here](https://docs.imposter.sh/run_imposter_cli/#different-distributions "https://docs.imposter.sh/run_imposter_cli/#different-distributions")

## Local Development

### Folder Structure

To develop and run mocks using ==Imposter==, make sure you have a folder name **imposter** under the pipeline folder. Add a sub-folder to create a mock for each feature you want to test. Each feature folder will have two sub-folders named **==data==** and **script** , a **config file** and a script file **stubtools.js.**

Lets take [Service.Taguchi.Membership](https://dev.azure.com/dominos-au/OneDigital/_git/Service.Taguchi.Membership?path=%2Fpipeline&version=GBPF-722&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/Service.Taguchi.Membership?path=%2Fpipeline&version=GBPF-722&_a=contents") repo to demonstrate how it works:

![[Pasted image 20250121102514.png]]

### ==What’s in the Config file?==

![[Pasted image 20250121103914.png]]

Here’s an example how you can set up your config file.

In this case, there is one resource defined. The `path` key under the resource defines the URL path for the endpoint and the`response` key under the resource defines how the API should respond when this endpoint is hit. The `scriptFile` key specifies a JavaScript file (`script/api_countryCode_marketingsubscriptions_email.js`) that should be run to generate the response. This allows for dynamic responses based on the request or other factors.

**Important :** Your configuration file must be named with the suffix `-config.yaml` — Here ==it's==`customer-config.yaml`

### What's in the Script?

It is very important to understand the use of stubtools.js before setting up a script file.

#### What is the purpose of stubtools.js?

The `stubtools.js` is a collection of utility functions to handle http requests, parse and manipulate JSON objects and interact with files.

- The`jsonRequest` function is used to parse a request object into a JSON format. It extracts the headers, path parameters, and query parameters from the request string and stores them in separate objects and then returns an object containing all these details.
    
- The `respondWith` and `log` functions are used to stringify an object before responding with it or logging it.
    
- The `respondMatchedQuery` function is used to respond with a predefined response if the request matches certain criteria.
    

![[Pasted image 20250121111605.png]]

==Here, the script file uses== `====respondMatchedQuery====` ==from== `==stubtools.js==` to define how the server should respond to different types of requests. It takes an array of objects, each representing a different response that the server can send based on the details of the incoming request.

In this case, the object in the array define responses for GET requests with specific 'countryCode' and 'email' path parameters. If a request matches these parameters, the server will respond with a 200 status code and the contents of the `data/api_countryCode_marketingsubscriptions_email.json` file.

### What's in the Data?

![[Pasted image 20250121111705.png]]
Data usually contains the response files for the requests. These are predefined response file are passed in the body.

## Local Testing

Once everything is configured run it locally.

`cd /path/to/imposter folder 
`imposter up -r`

On your [local](http://localhost:8080/ "http://localhost:8080/") server, pass the api path from your config file as request and get the response you have set for the particular request.
![[Pasted image 20250121112049.png]]

如何配置pipeline里边的环境变量：
![[Pasted image 20240513224717.png]]

# Status

_What is the status, e.g. proposed, accepted, rejected, deprecated, superseded?_

1. proposed
    

# Context

_What is the issue that we're seeing that is motivating this decision or change?_

We wish to provide a proper way for consumers to publish imposter configurations that map some input value to some example response.

|   |   |
|---|---|
|**Features**||
|**Basic Imposter Implementation v1.0**<br><br>- Given a list of services we fetch the swagger definitions from the stage endpoint and generate a basic config file.<br>    <br>- If a swagger file includes example responses only the first one will be returned no matter the input<br>    <br><br>`https://dpe-stage-agw-aue-aks-001.dpeaz.pizza/$SERVICE/swagger/v1/swagger.yaml`|`extends: template: platform.yml@templates parameters: imposterServices: - service-a - service-b`|
|**Advanced Imposter Implementation v2.0**<br><br>- A folder that holds custom overrides for swagger and config files that gets merged with the basic implementation<br>    <br>- Using Imposter.sh features we can use parameters from the query, path or form to specify which example to respond with or specify our own payload as a response with javascript or a separate response file|`pipeline/imposter/ service-a/ data/swagger.yaml service-a-config.yaml service-b/ data/swagger.yaml service-b-config.yaml`|
|**Expert Imposter Implementation v3.0**<br><br>- A package management solution that supports:<br>    <br>    - Dependencies<br>        <br>    - Configuration Validation<br>        <br>    - Versioning<br>        <br>    - Publishing<br>        <br>    - Pulling<br>        <br>    - Lockfiles?<br>        <br>- We wish to add the ability for the above configurations to be shared automatically between teams|`{ "name": "platform.demoproject.dotnet.imposter", "version": "1.0.0", "description": "A configuration for imposter dependencies for platform demoproject dotnet", "main": "index.js", "scripts": { "lint": "imposter-config lint", "build": "imposter-config build", "test": "imposter-config test", "start": "imposter-config start" }, "author": "Oliver", "license": "ISC", "dependencies": { "imposter-service-random": "^1.0.0" }, "basicEndpoint": "https://dpe-stage-agw-aue-aks-001.dpeaz.pizza/$SERVICE_NAME/swagger/v1/swagger.yaml", "basicDependencies": { "service-callerid" : "basic", } }`|

### ==Do we need to continue to support the basic version==?

As long as teams aren’t yet publishing imposter packages we’ll need to continue to support the most basic version until every service has a package. It’ll be encouraged to use the newest configuration however there are still use cases for the old one.

### ==What language would make the most sense for building a tool around Imposter?==

Imposter configuration consists of YAML and Javascript. And since there’s no YAML package manager that I know of the system that makes the most sense is npm/yarn (Javascript).

### Does package.json allow you to add fields to it?

As long as you don’t collide with the keys that npm actually use you could put any valid json inside your package.json. With this feature we can move our basic imposter configuration into the same location as the expert.

### Should we allow the consumer to specify a custom endpoint to fetch the swagger file?

We’ve already had multiple teams ask if they can use the swagger from sbx instead of from stage when they’re testing their own swagger. However, this doesn’t fix the problem that the configuration is fetching from the previous deployment instead of the current. The next question addresses that.

### Should we generate swagger.yaml with swashbuckle before publishing?

The current problem for teams wanting to publish and test their imposter configurations is using their swashbuckle config from stage when they’re trying to add examples to sbx. We want to give the consumers a way to generate their swagger.yaml and test it at the same time right at the start of the pipeline and ideally test the changes done on that current build/branch.

### Where should consumers wishing to publish a configuration put their files?

Having the configuration that a team is consuming be part of the configuration they’re publishing is asking for circular dependencies. Publishing an imposter config will need to be a separate directory such as `pipeline/imposter-publish`.

### How do consumers test the configurations they wish to publish?

Here’s a suggested data flow:

1. Under `pipeline/imposter-publish` would be a package.json file that specifies the version of the package as well as any of the dependencies the package has.
    
2. An example is added to the C# template
    
3. Swashbuckle will generate swagger.yaml under the data directory of the `pipeline/imposter-publish`
    
4. ==When we build the consumer configuration we will implicitly or explicitly pull across the configuration from the== `==imposter-publish==` ==folder into the== `==imposter==` ==folder for testing on the pipeline==
    
5. Then that built configuration will be sent to the storage container which will then be used for deployment.
    
6. Once the configuration has been tested in stage it can be published for other teams to use (along with the version incremented).
    

# Decision

_What is the decision / change that we're proposing and/or doing?_

**A proof of concept can be found here** [![](https://github.githubassets.com/favicon.ico)https://github.com/dominos-dpe/Platform.Pipeline.Imposter.Config/tree/PF-881](https://github.com/dominos-dpe/Platform.Pipeline.Imposter.Config/tree/PF-881)Connect your Github account

I propose an npm app that has the following commands achieving the above requirements.

**P.S==. Building will likely now involve copying the downloaded packages to a bin folder==**

### Legend

- Consumer – Installs prebuilt imposters of services and tests their own service or application by having it interact with the imposters. Can optionally augment the base behaviour of the Imposters by adding additional configuration.
    
- Publisher – Offers a prebuilt Imposter of their service via a package feed
    
- A publisher can also be a consumer. The Used By column below lists what _role_ the person has assumed when performing an action.
    

|   |   |   |
|---|---|---|
|**Requirement**|**Command**|**Used By**|
|Gives a list of the available commands and what they do|`imposter-config -h`|Consumer/Publisher|
|Gives the version of the tool|`imposter-config -v`|Consumer/Publisher|
|Generate the required dependency files as well as a basic starting imposter. Has options between starting a rest or swagger version.|`==imposter-config init==`  <br>`==[--consumer==/--publisher]`  <br>`[--swagger/--rest]`|Consumer/Publisher|
|**Checks local correctness of Imposter Configuration**<br><br>The application will look at the configuration files in the current directory and check the following:<br><br>- Valid yaml<br>    <br>- path is present for openapi configs<br>    <br>- basePath is present for rest configs<br>    <br>- stripServerPath is included for openapi configs<br>    <br>- 1 specFile is included for openapi configs<br>    <br>- The specFile exists *(maybe not because in some cases it may not have been generated yet)|`imposter-config lint`|Consumer and Publisher checking whether their individual `imposter-config.yaml` files are correct.|
|**Checks global correctness across Imposter Configurations**<br><br>Will check the validity of the built configuration for:<br><br>- Path collisions<br>    <br>- Imposter startup|`imposter-config ==test==`|Consumer checking whether all the downloaded imposter configurations work together|
|Check whether the imposter service endpoint is being passed to the deployed application correctly. ie.<br><br>`sbx.yml -> helm/values.yaml -> appsettings.json`|`imposter-config endpoint`|==Consumer==|
|Will update the version of the package.json with the current build number and do last checks before using npm publish to release the package from stage.|`imposter-config publish`|Publisher|
|Will install the dependencies specified by the package management chosen.<br><br>- Download packaged imposter dependencies<br>    <br>- Download basic imposter dependencies|`imposter-config install`|Consumer|
|The application will build all the relevant config into a `bin` or equivalent folder including:<br><br>- Merge/overwrite downloaded configurations with overridden configurations|`imposter-config build`|Consumer’s pipeline|
|Uses swashbuckle to generate the swagger.yaml file from the dotnet project|`imposter-config swagger`|Publisher|
|The application wipes the `bin` folder to build from a blank slate.|`imposter-config clean`|Consumer|
|Will start **OUR SPECIFIC VERSION** of the imposter service in the built `bin` folder.|`imposter-config start`|Consumer/Publisher|
|Deploys the built and merged configuration to the configured azure storage container so that the deployed imposter can download and start with the configuration.|`imposter-config deploy`|Consumer’s pipeline|

# Consequences

_What becomes easier or more difficult to do because of this decision / change?_

Having all of this functionality as a standalone application makes implementing the features on the pipeline as easy as installing the app and calling the same commands that a consumer could do manually.

## Consumer Workflow

What process would need to be followed for a consumer to use this tool?

- Install NodeJS/Dotnet Runtime
    
- Connect to the dominos npm/nuget registry. Following instructions here:  
    [https://dominos-au.visualstudio.com/OneDigital/_artifacts/feed/Yarn/connect](https://dominos-au.visualstudio.com/OneDigital/_artifacts/feed/Yarn/connect "https://dominos-au.visualstudio.com/OneDigital/_artifacts/feed/Yarn/connect")
    
- Install our `imposter-config` cli tool:
    
    `npm install -g dominos-imposter-config`
    
- Under `Consumer.Repo/pipeline/imposter` run `imposter-config init --consumer`
    
- To install packages run `npm i service-package`
    
- To build the imposter run `imposter-config build`
    
- To run the linter run `imposter-config lint`
    
- To start the imposter config run `imposter-config start`
    

## Publisher Workflow

What process would a imposter configuration publisher follow to use this tool?

- Install NodeJS
    
- Connect to the dominos npm registry. Following instructions here:  
    [https://dominos-au.visualstudio.com/OneDigital/_artifacts/feed/Yarn/connect](https://dominos-au.visualstudio.com/OneDigital/_artifacts/feed/Yarn/connect "https://dominos-au.visualstudio.com/OneDigital/_artifacts/feed/Yarn/connect")
    
- Install our `imposter-config` cli tool:
    
    `npm install -g dominos-imposter-config`
    
- Under `Publisher.Repo/pipeline/imposter-publish` run `imposter-config init --publisher`
    
- Build out your Imposter.sh configuration
    
- Run `imposter-config lint` to check that your config files contain all the relevant components for a rest or openapi plugin.
    
- Run `imposter-config swagger` to generate your swagger specFile
    
- Run `imposter-config test` to check that all paths and endpoints are valid
    
- Commit the configuration for the pipeline to publish to the relevant artifact registry
    

# Impact / cost of change

_What is the impact of this decision on the team, consumers and the business? What is the cost to change this decision? i.e. reversibility_

We can always add more features to the application as the consumers request them. The separation of consuming package and publishing package is also a good idea generally.