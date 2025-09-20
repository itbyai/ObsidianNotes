**Table of contents:**

- [Getting access](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Getting-access)
- [Code repos](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Code-repos)
    - [Access to Git](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Access-to-Git)
    - [Access to NPM](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Access-to-NPM)
    - [Frontend](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Frontend)
        - [Mac users:](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Mac-users%3A)
    - [Graph (BFF)](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Graph-\(BFF\))
        - [GraphQL Playground](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#GraphQL-Playground)
        - [Debugging graph errors](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Debugging-graph-errors)
    - [Load testing](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Load-testing)
- [Pipelines](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Pipelines)
- [Environments](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Environments)
- [Infrastructure](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Infrastructure)
- [Logging and monitoring](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Logging-and-monitoring)
- [Tech debt](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Tech-debt)
- [Production testing](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Production-testing)
- [Support](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Support)
- [Features and Testing tips](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Features-and-Testing-tips)
- [Nextgen web e2e - How to run locally](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Nextgen-web-e2e---How-to-run-locally%5BhardBreak%5D)
    - [MAC user](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#MAC-user)
    - [Windows user](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Windows-user)
    - [Troubleshooting](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1344899942/Technical+onboarding+-+Next+Gen+OLO#Troubleshooting)

# Getting access

Developers and QEs need the following:

Ask for this request from [support@dominos.com.au:](mailto:support@dominos.com.au "mailto:support@dominos.com.au")

- [Microsoft](http://login.microsoftonline.com/ "http://login.microsoftonline.com/"): [Office365](https://outlook.office.com/ "https://outlook.office.com/") and Teams
    
- [Confluence](https://dominos.atlassian.net/wiki/ "https://dominos.atlassian.net/wiki/")
    
- [DevOps](https://dominos-au.visualstudio.com/ "https://dominos-au.visualstudio.com/")
    
    - Basic user (not Stakeholder)
        
    - Projects: OneDigital (Contributor), OnlineOrdering (Contributor), Architecture (Contributor)
        
    - Ability to access Boards, Repos, and Pipelines
        
    - Assign to AD groups
        
        - “[OneDigital]\NextGen OLO FrontEnd” for pipeline access
            
        - “[OneDigital]\Release Pipeline.Contributor” for pipeline approvals
            
- [AWS](https://dpe.awsapps.com/start "https://dpe.awsapps.com/start"): “Team-Technology-Framework” role
    
- Azure:
    
    - “DPE-RS-TEST-Contributor” and “dpe-rs-prod” roles (old subscription)
        
    - [Commerce platform](https://dominos.atlassian.net/wiki/spaces/Sys1D/pages/1982563296 "https://dominos.atlassian.net/wiki/spaces/Sys1D/pages/1982563296") - **dpe-software-engineer** for devs, **dpe-quality-engineer** for QEs
        
- [New Relic](https://newrelic.com/ "https://newrelic.com/")
    
- [Lucid Chart](https://app.lucidchart.com/ "https://app.lucidchart.com/")
    
    - Lucid Chart (not Lucid Spark)
        
    - Access to Team Folders: “OLO Next Gen”, “Architecture”, “System - OneDigital”
        
- [OLO CMS](http://cms.admintools.dominostest.com.au/Calendar "http://cms.admintools.dominostest.com.au/Calendar") and [Voucher Tool](http://inside.dominostest.com.au/sites/vouchersadmin/Pages/FindVoucher.aspx "http://inside.dominostest.com.au/sites/vouchersadmin/Pages/FindVoucher.aspx")
    
    - Support needs to grant you access, then you can use your AD/Okta credentials
        

Once you have access from support, you should be able to setup the following yourself:

- [VPN](http://remote2.dominos.com.au/ "http://remote2.dominos.com.au/"): visit [http://remote2.dominos.com.au/](http://remote2.dominos.com.au/ "http://remote2.dominos.com.au/") to download Global Protect client
    
- [Okta](https://dominos.okta.com/ "https://dominos.okta.com/"): visit [https://dominos.okta.com/](https://dominos.okta.com/ "https://dominos.okta.com/")
    

Ask for this request from [training@dominos.com.au](mailto:training@dominos.com.au "mailto:training@dominos.com.au"):

- [DOTTI](https://training.dominos.com.au/ "https://training.dominos.com.au/") (training)
    

Ask the IM to request access from Internetrix:

- [Internetrix Slack](http://internetrix.slack.com/ "http://internetrix.slack.com") - guest access (Internetrix is the vendor that is helping with Google Analytics)
    

The following access can be granted by another developer within the Next Gen team:

- [Zeplin](https://app.zeplin.io/projects "https://app.zeplin.io/projects") - no longer used
    
- [Locize](https://www.locize.app/ "https://www.locize.app/")
    

_Note on Lucid Chart accounts: it's best to be invited to the Org by support. Domino’s has two types of licenses: one is LucidSpark, which is essentially read only and provisioned by default with an invite, and the other is LucidChart (the one we want), which is more expensive and needs approval to be charged out. Depending on how many licences Domino’s has available, support might need to order one which can take a few days to be processed._

Tech Lead-specific access

# Code repos

## Access to Git

To clone from the DevOps Git repo, you can add your SSH public key to your profile in DevOps using the [SSH public keys](https://dev.azure.com/dominos-au/_usersSettings/keys "https://dev.azure.com/dominos-au/_usersSettings/keys") option under the User Settings menu.

Please reference Microsoft’s documentation for [setting up SSH keys](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops "https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops"). This will remove the need to provide username and password for git commands.

## Access to NPM

To fetch packages from Domino’s NPM repo, you need to create a DevOps Personal Access Token (PAT) with Package Read & Write access. Use the [Personal access tokens](https://dev.azure.com/dominos-au/_usersSettings/tokens "https://dev.azure.com/dominos-au/_usersSettings/tokens") option, also under the User Settings menu.

To create a “.npmrc” file configuring your PAT for the Domino’s NPM repo, you can see Microsoft’s own instructions by clicking ‘Connect to feed’ on the [Yarn package feed](https://dominos-au.visualstudio.com/OneDigital/_packaging?_a=feed&feed=Yarn "https://dominos-au.visualstudio.com/OneDigital/_packaging?_a=feed&feed=Yarn") page, selecting “npm”, and choosing your operation system. Or you can just copy the config below, but note that you’ll need to encode your PAT using Base64.

Tip: create a parent directory into which you clone Domino’s node projects and place your .npmrc there. This means you can configure your access tokens in one place and also prevents you from accidentally committing tokens to the per-repo .npmrc file.

The OLO FE and BFF projects use different URLs for NPM ([dominos-au.pkgs.visualstudio.com](http://dominos-au.pkgs.visualstudio.com/ "http://dominos-au.pkgs.visualstudio.com") vs [pkgs.dev.azure.com/dominos-au](http://pkgs.dev.azure.com/dominos-au "http://pkgs.dev.azure.com/dominos-au")). If you configure both of them in one .npmrc, it should look like this:

`; begin auth token //dominos-au.pkgs.visualstudio.com/_packaging/Yarn/npm/registry/:username=dominos-au //dominos-au.pkgs.visualstudio.com/_packaging/Yarn/npm/registry/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] //dominos-au.pkgs.visualstudio.com/_packaging/Yarn/npm/registry/:email=npm requires email to be set but doesn't use the value //dominos-au.pkgs.visualstudio.com/_packaging/Yarn/npm/:username=dominos-au //dominos-au.pkgs.visualstudio.com/_packaging/Yarn/npm/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] //dominos-au.pkgs.visualstudio.com/_packaging/Yarn/npm/:email=npm requires email to be set but doesn't use the value ; end auth token ; begin auth token //pkgs.dev.azure.com/dominos-au/_packaging/Yarn/npm/registry/:username=dominos-au //pkgs.dev.azure.com/dominos-au/_packaging/Yarn/npm/registry/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] //pkgs.dev.azure.com/dominos-au/_packaging/Yarn/npm/registry/:email=npm requires email to be set but doesn't use the value //pkgs.dev.azure.com/dominos-au/_packaging/Yarn/npm/:username=dominos-au //pkgs.dev.azure.com/dominos-au/_packaging/Yarn/npm/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] //pkgs.dev.azure.com/dominos-au/_packaging/Yarn/npm/:email=npm requires email to be set but doesn't use the value ; end auth token`

## Frontend

Repo:

- [https://dev.azure.com/dominos-au/OneDigital/_git/olo.web](https://dev.azure.com/dominos-au/OneDigital/_git/olo.web "https://dev.azure.com/dominos-au/OneDigital/_git/olo.web") - ADO disabled since 14th Feb 2025 and migrated to GitHub
    

New Repo link in Github

- [https://github.com/dominos-dpe/olo.web](https://github.com/dominos-dpe/olo.web)Connect your Github account .
    

Getting started:

Connect to VPN. This step is required to successfully download `static-data` files for different regions and successfully build frontend package.

If using a windows machine, ensure you have Python installed.

`olo.web$ # follow readme/vsts instructions, add token to ../.npmrc olo.web$ yarn install olo.web$ yarn start:dev olo.web$ yarn run test:all`

On windows if still facing issues launching application with `yarn start:dev` refer following steps

In VS terminal go to tucson.webio, run yarn install from there and run test from the folder

`cd e2e/tucson.webio yarn install yarn test:chrome:mobile:nl --spec <scenario name from src> *<--this is to run any specific test locally`

Add the following to the host file to allow for testing of other markets

`127.0.0.1 localhost 255.255.255.255 broadcasthost ::1 localhost 127.0.0.1 dominos.local.com.au 127.0.0.1 dominos.local.co.nz 127.0.0.1 dominos.local.de 127.0.0.1 dominos.local.nl 127.0.0.1 dominos.local.be 127.0.0.1 dominos.local.fr 127.0.0.1 dominos.local.lu 127.0.0.1 dominos.local.jp 127.0.0.1 dominos.local.com.sg 127.0.0.1 dominos.local.com.my 127.0.0.1 dominos.local.com.tw 127.0.0.1 dominos.local.com.kh`

Run the market site using the port. eg. [http://dominos.local.jp:8080/](http://dominos.local.jp:8080/ "http://dominos.local.jp:8080/")

### Mac users:

If running [olo.web](http://olo.web/ "http://olo.web") locally on mac shows `403` errors for all `json` resource files

- Check if you are connected to VPN
    
- Check if you can access the resource through browser
    
- **If nothing works**, check if you have **IPv6** enabled on your Mac and if it does follow below steps to disable this option:
    
    - Open _System Preferences_ > _Network_.
        
    - Select the active network adapter (Wi-Fi or Ethernet ) from the left panel.
        
    - Click on the _Advanced_ button from the right panel.
        
    - Next, click on the _TCP/IP_ tab.
        
    - Select the _Configure IPv6_ drop-down menu and set it to _Off_. 
        
    - Click the _OK_ button.
        
    - Restart your Mac to make sure the IPv6 is disabled.
        
    - It should look something like below:
        
    
    ![[Pasted image 20250827140551.png]]
    

There are cases when you would like to verify something without the backend (or BFF), like simulating error cases or dealing with cases the backend is not ready yet. So there is a way to mock these data/interactions in the front-end. This document can help you with that.

[Using mocks in local/pr pipeline](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/4649912129)

## Graph (BFF)

Repos:

- [https://dominos-au.visualstudio.com/OneDigital/_git/olo.graph](https://dominos-au.visualstudio.com/OneDigital/_git/olo.graph "https://dominos-au.visualstudio.com/OneDigital/_git/olo.graph")
    
- [https://dominos-au.visualstudio.com/OneDigital/_git/BFF.Types](https://dominos-au.visualstudio.com/OneDigital/_git/BFF.Types "https://dominos-au.visualstudio.com/OneDigital/_git/BFF.Types")
    

Getting started:

`olo.graph$ # follow readme/vsts instructions, add token to ../.npmrc olo.graph$ yarn install olo.graph$ yarn run start`

In addition to the steps in the ReadMe, the following steps are needed to make BFF work locally:

1. Add `NODE_TLS_REJECT_UNAUTHORIZED = 0` to `.env`
    
2. Replace `cors-options.ts` with file below.
    
3. add `dpe-country: au` and `dpe-language: en` headers when calling
    

`// cors-options.ts export const corsOptions = { origin: false, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'], credentials: true, optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 }`

### **GraphQL Playground**

Since we use the Apollo GraphQL implementation, we have the Playground UI on our BFF / Graph server - this is a really good way of exploring the schema / interactions currently available.

- [https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/ "https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/")
    
- [http://localhost:4000/graphql](http://localhost:4000/graphql "http://localhost:4000/graphql") (this is also available on CI / Stage endpoints)
    

Example query (see more [here](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1361838304 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1361838304")):

`query { storeSearch(searchString:"Hamilton") { storeNo media { name } } }`

### Debugging graph errors

Query the Application Insights logs using help from [Next Gen AI Queries](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1792478245 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1792478245") and [BE Logging events](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1708359712 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1708359712") pages.

## Load testing

See [Load Testing - Next Gen OLO](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1420264047)

# Pipelines

Build pipelines are under the OneDigital [Apps](https://dominos-au.visualstudio.com/OneDigital/_build?_a=allDefinitions&path=%5CApp%5C "https://dominos-au.visualstudio.com/OneDigital/_build?_a=allDefinitions&path=%5CApp%5C") and [BFF](https://dominos.atlassian.net/wiki/spaces/GTS/pages/680231219 "https://dominos.atlassian.net/wiki/spaces/GTS/pages/680231219") folders.

|   |   |
|---|---|
|**Pipeline**|**Description**|
|[App.OneDigital.Web-CI](https://dominos-au.visualstudio.com/OneDigital/_apps/hub/ms.vss-ciworkflow.build-ci-hub?_a=edit-build-definition&id=708 "https://dominos-au.visualstudio.com/OneDigital/_apps/hub/ms.vss-ciworkflow.build-ci-hub?_a=edit-build-definition&id=708")|Web frontend|
|[App.OneDigital.Localization-CI](https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=732 "https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=732")|Translations|
|[olo.web PVT](https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1078&_a=summary "https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=1078&_a=summary")|Automated tests for prod releases|
|[olo.graph [Experimental]](https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=553 "https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=553")|Graph|
|[OneDigital.BFF.Types](https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=348 "https://dominos-au.visualstudio.com/OneDigital/_build?definitionId=348")|Graph types|
|[App.OneDigital.Native-CI-Multi](https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=691 "https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=691")|Native App|
|[App.OneDigital.OffersApp-CD-PVT](https://dominos.atlassian.net/wiki/spaces/GTS/pages/680231219 "https://dominos.atlassian.net/wiki/spaces/GTS/pages/680231219")|**Not used by our project**<br><br>Runs e2e tests on the old/existing JP Offers App. Although the test scripts and pipeline are under OneDigital, the app it's testing is under OnlineOrdering.|

Release pipelines:

|   |   |
|---|---|
|**Pipeline**|**Description**|
|[App.OneDigital.Web-CD](https://dominos-au.visualstudio.com/OneDigital/_release?view=mine&_a=releases&definitionId=142 "https://dominos-au.visualstudio.com/OneDigital/_release?view=mine&_a=releases&definitionId=142")|Website|
|[App.OneDigital.Localization-CD](https://dominos-au.visualstudio.com/OneDigital/_release?definitionId=156&view=mine&_a=releases "https://dominos-au.visualstudio.com/OneDigital/_release?definitionId=156&view=mine&_a=releases")|Translations|
|[App.OneDigital.Native-CD](https://dominos.atlassian.net/wiki/spaces/SE/pages/1130365000 "https://dominos.atlassian.net/wiki/spaces/SE/pages/1130365000")|Native|
|[Infra.LoadTest.OLOGraph](https://dominos-au.visualstudio.com/OneDigital/_release?_a=releases&view=mine&definitionId=167 "https://dominos-au.visualstudio.com/OneDigital/_release?_a=releases&view=mine&definitionId=167")|Graph Load Test|

To modify these pipelines, you need to be in the “[OneDigital]\NextGen OLO FrontEnd” group.

# Environments

See [Environments - Next Gen OLO](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1371476899).

# Infrastructure

Next Gen OLO developers are responsible for deploying FE infrastructure, including writing infrastructure-as-code and creating release pipelines. The Next Gen OLO website is hosted in AWS; however, as of Nov 2020, there is also a Logic App in Azure to trigger release of new translation assets.

In AWS, initial scripts should be tested in the SBX (sandbox) account, which is the only environment where folks manually create/delete resources. Then scripts are pushed to Git and deployed by automated pipelines to the CI, Stage, Prod, and DPE-LunchOrder accounts, i.e. only build agents are modifying infrastructure in non-sandbox environments.

In Azure, pre-prod infrastructure is deployed manually to DPE-RS-TEST. There is currently no infrastructure-as-code on the Azure side. (Note that although some teams in Domino’s use DPE-ORDERING-DEV as a sandbox environment, we’ve been advised by architecture that we should just use DPE-RS-TEST.)

# Logging and monitoring

For Azure Application Insights, we need access to the DPE Commerce buckets: see this page for links [Front End Log Events | Links](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1759969560/Front+End+Log+Events#Links)

Example AI Log Queries:

- [Front End Examples](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1759969560 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1759969560")
    
- [Graph Examples](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1792478245 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1792478245")
    

For New Relic:

- Dominos Pizza Enterprises
    
- AWS OLO Prod
    
- AWS OLO NonProd
    
- Big Data Prod
    
- Big Data NonProd
    
- Business Intelligence
    
- Aggregators
    
- Japan Pulse VM
    
- ANZ Pulse
    

# Tech debt

Our Tech Debt Radar is in Lucid Spark [here](https://lucid.app/lucidspark/cbf8017a-88e9-4072-b713-1083aedb5606/edit?shared=true "https://lucid.app/lucidspark/cbf8017a-88e9-4072-b713-1083aedb5606/edit?shared=true") ([invite link](https://lucid.app/lucidspark/invitations/accept/ee05e7c8-95f0-43e1-a03d-f977aa4a04bb "https://lucid.app/lucidspark/invitations/accept/ee05e7c8-95f0-43e1-a03d-f977aa4a04bb")).

# Production testing

To have your production orders auto-cancelled, you need to send an email to [app.support@dominos.com.au](mailto:app.support@dominos.com.au "mailto:app.support@dominos.com.au") giving your name Name, Phone Number, and Email Address, asking to be added to the **Cloud Application Support Whitelist**. Note that if you provide your Domino’s email and personal mobile, you’ll still be able to have your personal orders go through: they just have to use a personal email alongside that same mobile number.

Example email:

> G’day,Could the following please be added to the **Cloud Application Support Whitelist** to auto-cancel any production orders they place at store during PVT?(Have copied Andrew Fraser who can confirm we need this access as members of the Next Gen OLO Web team)  
> **Name      Phone Number     Email Address**  
> …             …                            … 

# Support

For Corporate IT support, email [support@dominos.com.au](mailto:support@dominos.com.au "mailto:support@dominos.com.au")

For Infrastructure IT support, email [issupport@dominos.com.au](mailto:issupport@dominos.com.au "mailto:issupport@dominos.com.au")

# Features and Testing tips

[Features](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/2151350515 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/2151350515") - an overview of what we learned about legacy features.

[Testing tips](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/2016219574 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/2016219574") - resources on how to test specific features.

# Nextgen web e2e - How to run locally  
  

### MAC user

- Clone latest master from here - [https://dominos-au.visualstudio.com/OneDigital/_git/olo.web](https://dominos-au.visualstudio.com/OneDigital/_git/olo.web "https://dominos-au.visualstudio.com/OneDigital/_git/olo.web")
    
- Follow the instructions given in readme file - [https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview](https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview "https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview")
    

### Windows user

- Clone latest master from here - [https://dominos-au.visualstudio.com/OneDigital/_git/olo.web](https://dominos-au.visualstudio.com/OneDigital/_git/olo.web "https://dominos-au.visualstudio.com/OneDigital/_git/olo.web")
    
- Follow the instructions given in readme file - [https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview](https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview "https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview")
    
    - Can install chocolatey instead of Homebrew
        
    - As mentioned in the above section --> Access to NPM. There is a slight different while setting up for Windows.
        
        ![[Pasted image 20250827143045.png]]
        ![[Pasted image 20250827143100.png]]
        

### Troubleshooting

|   |   |   |
|---|---|---|
||**Error**|**Solution**|

|                   |                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                   | **Error**                                                                                                                                                                                                               | **Solution**                                                                                                                                                                                                                                                                                                               |
| 1. Windows        | ![](blob:https://dominos.atlassian.net/57778ce9-4d25-422d-9130-085747dfd6c0#media-blob-url=true&id=d4db3113-2862-4e70-9cfe-9548d1e3112a&collection=contentId-1344899942&contextId=1344899942&width=1294&height=70&alt=) | - That means you don't have authorization to download the packages.<br>    <br>- Follow the npmrc step from readme file, for the Windows.<br>    <br>- If still getting same error, generate a new key long expiry date and try again.                                                                                     |
|                   | Error while building solution after setting up locally                                                                                                                                                                  | - Initially installation of NPM had errors and so was not able to progress further<br>    <br>- Make sure NPM and Yarn installation successfully completed before setting up.                                                                                                                                              |
|                   | ![](blob:https://dominos.atlassian.net/398d14ad-462d-47a0-8aea-9766f25aae95#media-blob-url=true&id=2e265a57-5b1c-471e-b493-8d5cc8252759&collection=contentId-1344899942&contextId=1344899942&width=792&height=67&alt=)  | - Please use node 14.17 ([https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview](https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview "https://dev.azure.com/dominos-au/OneDigital/_git/olo.web?path=/readme.md&_a=preview"))                                 |
| 2. MAC            |                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                            |
| 3. General issues | Chrome driver download issue with M1 Chip                                                                                                                                                                               | Please see the solution here - [https://dominos-au.visualstudio.com/OneDigital/_git/olo.web?version=GBmaster&path=/readme.md](https://dominos-au.visualstudio.com/OneDigital/_git/olo.web?version=GBmaster&path=/readme.md "https://dominos-au.visualstudio.com/OneDigital/_git/olo.web?version=GBmaster&path=/readme.md") |