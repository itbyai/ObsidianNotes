Platform team have gathered all the detailed steps and what’s happening in the background here - [Imposter.sh - Local Development and Testing](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117)

This page is to list the simplified steps to create an imposter in few minutes!

## Option 1 - You have to test in SBX, but in there, the service does not behave the same way as in stage

The below steps will create a mock of the service in SBX based on its response in stage.

### **Step 1 - Add imposter service name in Azure-pipelines.yml**

If Service A is making a call to Service B and if Service B is still not yet ready, in the repo for Service A, you can create an imposter for Service B by adding the below lines in Azure-pipelines.yml,. “Service-upsell” is an example I used.

`imposterServices: - service-upsell`

![[Pasted image 20250827233806.png]]
    

### Step 2 - Add variables in SBX.yml

`# Imposter - name: UpsellServiceClientSettings.BaseUrl value: http://$(Azure.AKS.AppName)-imposter/service-upsell`

To get the “name”, refer to appsettings so you can use the same name.

![[Pasted image 20250827233820.png]]
    

### **Step 3 - Commit your changes and deploy**

Pipeline variables in Sbx.yml is used to populate helm and these are used to populate the app settings. So the imposter base url that you updated in Sbx.yml will now be populated in the appsettings against `UpsellServiceClientSettings.BaseUrl`

Its ready for use now.

You can create imposter for multiple services this way just by mentioning them all in Azure-pipelines.yml . All of the services for which u can creating the imposter would be mentioned in combined.json as below.

Also, please note that, to try it out on the swagger page, the “servers” select box has to be changed from local host to cluster.

![[Pasted image 20250827233856.png]]

### Step 4 (optional)- Checking logs

You can see the paths here in the logs.

==To view the available swagger endpoints,== [https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/_spec/](https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/_spec/ "https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/_spec/") can be used (_spec is part of swagger server)

To view the available rest endpoints, [https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/](https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/ "https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/") can be used

![[Pasted image 20250827233914.png]]
    

You can also see the imposter configurations by going to the pipeline and click on “published”

- ![image-20240625-043957.png](blob:https://dominos.atlassian.net/182d7094-e1c3-4c43-8326-dede8cfe376b#media-blob-url=true&id=345dc435-cbc1-4cfa-a3f7-542f1c52ce89&collection=contentId-5772247159&contextId=5772247159&width=1248&height=470&alt=image-20240625-043957.png)![[Pasted image 20250827233926.png]]
    

![[Pasted image 20250827233941.png]]
    

_**NOTE** - Below can change depending on where you service is hosted._

You can also check in AKS pods by going to Azure portal with your -a account → Look for dpe-sbx-aks-aue-001 → search for “Services and ingresses” → Filter by your service name. (you have to enter the full name as it does not support partial search) → Go to “Pods” tab → Select your service’s pod and you can see that the base url is now imposter

![[Pasted image 20250827233958.png]]
    

## Option 2 - You need to make a mock of the service in SBX and also override the response of it.

I have not tried this out but here is the link on how to do it [https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Development](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Development)