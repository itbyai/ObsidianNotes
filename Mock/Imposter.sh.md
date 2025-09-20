Platform team have gathered all the detailed steps and what’s happening in the background here - [Imposter.sh - Local Development and Testing](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117)

This page is to list the simplified steps to create an imposter in few minutes!

## Option 1 - You have to test in SBX, but in there, the service does not behave the same way as in stage

The below steps will create a mock of the service in SBX based on its response in stage.

### **Step 1 - Add imposter service name in Azure-pipelines.yml**

If Service A is making a call to Service B and if Service B is still not yet ready, in the repo for Service A, you can create an imposter for Service B by adding the below lines in Azure-pipelines.yml,. “Service-upsell” is an example I used.

`imposterServices: - service-upsell`

- Open image-20240625-012719.png
    
    ![image-20240625-012719.png](blob:https://dominos.atlassian.net/3356382c-37bb-4881-af8f-7d86b288cc1e#media-blob-url=true&id=b238e8cc-5a15-4e33-9064-de48a81fc026&collection=contentId-5772247159&contextId=5772247159&mimeType=image%2Fpng&name=image-20240625-012719.png&size=112268&width=1055&height=626&alt=image-20240625-012719.png)
    

### Step 2 - Add variables in SBX.yml

`# Imposter - name: UpsellServiceClientSettings.BaseUrl value: http://$(Azure.AKS.AppName)-imposter/service-upsell`

To get the “name”, refer to appsettings so you can use the same name.

- Open image-20240625-012940.png
    
    ![image-20240625-012940.png](blob:https://dominos.atlassian.net/8f41d028-9df5-41d3-bc68-3790089cf6ea#media-blob-url=true&id=860936a1-e328-420f-a356-817239c9a09e&collection=contentId-5772247159&contextId=5772247159&width=1159&height=643&alt=image-20240625-012940.png)
    

### **Step 3 - Commit your changes and deploy**

Pipeline variables in Sbx.yml is used to populate helm and these are used to populate the app settings. So the imposter base url that you updated in Sbx.yml will now be populated in the appsettings against `UpsellServiceClientSettings.BaseUrl`

Its ready for use now.

You can create imposter for multiple services this way just by mentioning them all in Azure-pipelines.yml . All of the services for which u can creating the imposter would be mentioned in combined.json as below.

Also, please note that, to try it out on the swagger page, the “servers” select box has to be changed from local host to cluster.

Open image-20240626-030941.png

![image-20240626-030941.png](blob:https://dominos.atlassian.net/bbe085fc-f5f1-4857-8945-acb3c48049f9#media-blob-url=true&id=abb4e9fb-e033-45fa-990b-9a76e16a7647&collection=contentId-5772247159&contextId=5772247159&mimeType=image%2Fpng&name=image-20240626-030941.png&size=105230&width=1895&height=941&alt=image-20240626-030941.png)

### Step 4 (optional)- Checking logs

You can see the paths here in the logs.

==To view the available swagger endpoints,== [https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/_spec/](https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/_spec/ "https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/_spec/") can be used (_spec is part of swagger server)

To view the available rest endpoints, [https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/](https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/ "https://dpe-sbx-agw-aue-aks-001.dpeaz.pizza/ns-cit/function-upsell-sync-imposter/") can be used

- Open image-20240625-042015.png
    
    ![image-20240625-042015.png](blob:https://dominos.atlassian.net/1bde4513-547c-4363-86ee-ac9bf4a4d3b5#media-blob-url=true&id=06fc19d1-51cb-4a87-8e2d-0449cc430a2e&collection=contentId-5772247159&contextId=5772247159&mimeType=image%2Fpng&name=image-20240625-042015.png&size=181005&width=1194&height=976&alt=image-20240625-042015.png)
    

You can also see the imposter configurations by going to the pipeline and click on “published”

- Open image-20240625-043957.png
    
    ![image-20240625-043957.png](blob:https://dominos.atlassian.net/7fedef5f-cbb4-44a6-b497-ab148657bed5#media-blob-url=true&id=345dc435-cbc1-4cfa-a3f7-542f1c52ce89&collection=contentId-5772247159&contextId=5772247159&mimeType=image%2Fpng&name=image-20240625-043957.png&size=50196&width=1248&height=470&alt=image-20240625-043957.png)
    

- Open image-20240625-044054.png
    
    ![image-20240625-044054.png](blob:https://dominos.atlassian.net/437e04ae-3d41-4a09-979b-adb546060054#media-blob-url=true&id=c08bead6-ba69-4885-8025-d5efc8c294a4&collection=contentId-5772247159&contextId=5772247159&mimeType=image%2Fpng&name=image-20240625-044054.png&size=40335&width=793&height=729&alt=image-20240625-044054.png)
    

_**NOTE** - Below can change depending on where you service is hosted._

You can also check in AKS pods by going to Azure portal with your -a account → Look for dpe-sbx-aks-aue-001 → search for “Services and ingresses” → Filter by your service name. (you have to enter the full name as it does not support partial search) → Go to “Pods” tab → Select your service’s pod and you can see that the base url is now imposter

- Open image-20240625-042746.png
    
    ![image-20240625-042746.png](blob:https://dominos.atlassian.net/26370a38-19e8-4806-addc-c80870b8a96a#media-blob-url=true&id=f0bc44c6-7d90-4103-886a-aa3ca2e5620c&collection=contentId-5772247159&contextId=5772247159&mimeType=image%2Fpng&name=image-20240625-042746.png&size=109646&width=971&height=724&alt=image-20240625-042746.png)
    

## Option 2 - You need to make a mock of the service in SBX and also override the response of it.

I have not tried this out but here is the link on how to do it [Imposter.sh - Local Development and Testing | Local Development](https://dominos.atlassian.net/wiki/spaces/PF/pages/5341315117/Imposter.sh+-+Local+Development+and+Testing#Local-Development)