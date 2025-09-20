- [Prerequisites](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Prerequisites)
- [Installing Imposter CLI](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Installing-Imposter-CLI)
    - [Homebrew](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Homebrew)
    - [Shell script](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Shell-script)
- [Starting Imposter with Graal](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Starting-Imposter-with-Graal)
- [Local Development](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Development)
    - [Folder Structure](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Folder-Structure)
    - [What’s in the Config file?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#What%E2%80%99s-in-the-Config-file%3F)
    - [What's in ‘data’?](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#What's-in-%E2%80%98data%E2%80%99%3F)
- [Local Testing](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Testing)

## Prerequisites

==You must have Docker installed and running.==

Due to licensing restrictions, we are not allowed to use [Docker Desktop](https://www.docker.com/products/docker-desktop/ "https://www.docker.com/products/docker-desktop/") . But there are other alternatives like [Rancher Desktop](https://rancherdesktop.io/ "https://rancherdesktop.io/") or [Colima.](https://github.com/abiosoft/colima "https://github.com/abiosoft/colima")

If you are using windows, here’s a [document](https://dominos.atlassian.net/wiki/spaces/EDDT/pages/4994138982 "https://dominos.atlassian.net/wiki/spaces/EDDT/pages/4994138982") that can guide you to run Docker without having Docker Desktop

## Installing Imposter CLI

#### Homebrew

If you have Homebrew installed:

`brew tap gatehill/imposter brew install imposter`

#### Shell script

Or, use this one liner (macOS and Linux only):

`curl -L https://raw.githubusercontent.com/gatehill/imposter-cli/main/install/install_imposter.sh | bash -`

## Starting Imposter with Graal

We recommend adding this alias to your shell environment:

`echo "alias imposter='imposter '\nalias up='up -t docker-all -r --env \"IMPOSTER_JS_PLUGIN=js-graal-compat\"'" >>~/.zshrc`

To start imposter just run:

`imposter up`

If you got error `Cannot connect to the Docker daemon at unix:///var/run/docker.sock` it means imposter cannot connect to Docker endpoint. You can query all Docker endpoints by running `docker context ls` then create symbolic link from endpoint of your tool to `/var/run/docker.sock`, for example if you use Rancher Desktop you may run `sudo ln -s /Users/<UserName>/.rd/docker.sock /var/run/docker.sock`

**Note:** Detailed information regarding installing and running imposter can be found [here](https://docs.imposter.sh/run_imposter_cli/#different-distributions "https://docs.imposter.sh/run_imposter_cli/#different-distributions")

## Local Development

### Folder Structure

To develop and run mocks using ==Imposter==, make sure you have a folder name **imposter** under the pipeline folder. Add a sub-folder to create a mock for each feature you want to test. Each feature folder will have two sub-folders named **==data==** and **script** , and a **config file**

Lets take [Service.Taguchi.Membership](https://dev.azure.com/dominos-au/OneDigital/_git/Service.Taguchi.Membership?path=%2Fpipeline&version=GBPF-722&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/Service.Taguchi.Membership?path=%2Fpipeline&version=GBPF-722&_a=contents") repo to demonstrate how it works:

![[Pasted image 20250827233526.png]]

### ==What’s in the Config file?==

![image-20240121-232645.![[Pasted image 20250827233536.png]]

Here’s an example how you can set up your config file.

In this case, there is one resource defined. The `path` key under the resource defines the URL path for the endpoint and the`response` key under the resource defines how the API should respond when this endpoint is hit. The `scriptFile` key specifies a JavaScript file (`script/api_countryCode_marketingsubscriptions_email.js`) that should be run to generate the response. This allows for dynamic responses based on the request or other factors.

**Important :** Your configuration file must be named with the suffix `-config.yaml` — Here ==it's==`customer-config.yaml`

### What's in ‘data’?

![[Pasted image 20250827233612.png]]

Data usually contains the response files for the requests. These are predefined response file are passed in the body.

## Local Testing

Once everything is configured run it locally.

`cd /path/to/imposter folder imposter up -r`

On your [local](http://localhost:8080/ "http://localhost:8080/") server, pass the api path from your config file as request and get the response you have set for the particular request.

![[Pasted image 20250827233624.png]]