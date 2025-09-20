android requirement for e2e

appium/webdriverio requires the [webview to be debug enabled](https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/applications/olo.native/android/app/src/main/java/com/arizona/MainApplication.java&version=GBmaster&line=68&lineEnd=70&lineStartColumn=5&lineEndColumn=6&lineStyle=plain&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/applications/olo.native/android/app/src/main/java/com/arizona/MainApplication.java&version=GBmaster&line=68&lineEnd=70&lineStartColumn=5&lineEndColumn=6&lineStyle=plain&_a=contents"). so we build two skelenton .apk, one is used for e2e

![[Pasted image 20250827222729.png]]

![[Pasted image 20250827222737.png]]

![[Pasted image 20250827222753.png]]

we need to make sure the pipeline has webview has debug mode on when we upload to saucelabs. The correct way is to use `base/e2e/*.apk` when we get the pipeline to process and resign the apk.
![[Pasted image 20250827222859.png]]

for the pipeline that builds adhoc and enterprise ios & android, I’ll make sure that for android adhoc build have webview debug enabled. To do that, we can set the APK_FOLDER/APK_DIR to be `base` for enterprise builds or `base/e2e`. Our [pipeline will use a bash script that needs to know which apk](https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/extract_apk_replace_variables.sh&version=GBmaster&line=15&lineEnd=15&lineStartColumn=3&lineEndColumn=188&lineStyle=plain&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/extract_apk_replace_variables.sh&version=GBmaster&line=15&lineEnd=15&lineStartColumn=3&lineEndColumn=188&lineStyle=plain&_a=contents") to use to replace variables and resign the app.

[this is the bash script that will unzip the apk](https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/extract_apk_replace_variables.sh&version=GBmaster&line=15&lineEnd=15&lineStartColumn=3&lineEndColumn=188&lineStyle=plain&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/extract_apk_replace_variables.sh&version=GBmaster&line=15&lineEnd=15&lineStartColumn=3&lineEndColumn=188&lineStyle=plain&_a=contents"), APK_DIR will be used to set the path of the apk, `base` for webview debug mode to be disabled, `base/e2e` for webview debug mode to be enabled.  
  ![[Pasted image 20250827222919.png]]

this are the steps in the pipeline where it sets the value of the apk path:
![[Pasted image 20250827222940.png]]
![[Pasted image 20250827222955.png]]
![[Pasted image 20250827223009.png]]

for the Mobile-App_deployment task group, APK_FOLDER input only appears if you select task version `2`
![[Pasted image 20250827223019.png]]

I’ve made sure [App.OneDigital.Native-CD-PR](https://dev.azure.com/dominos-au/OneDigital/_releaseDefinition?definitionId=470&_a=definition-pipeline "https://dev.azure.com/dominos-au/OneDigital/_releaseDefinition?definitionId=470&_a=definition-pipeline") adhoc android builds to use base/e2e  
  
![[Pasted image 20250827223035.png]]
![[Pasted image 20250827223053.png]]

we can now see that Staging Adhoc, the APK_DIR is set to `base/e2e` while other deployments like prod, enterprise, they use APK_DIR set to `base`  
  ![[Pasted image 20250827223108.png]]

PS. for the Mobile-App-Deployment, I had to `add default value for APPLE_CERTIFICATE_SIGNING_IDENTITY, Apple_KeyContent, APPLE_PROV_PROFILE_UUID`
![[Pasted image 20250827223127.png]]

## DEPLOY_TO_SAUCELABS flag

i’ve added this DEPLOY_TO_SAUCELABS flag so that we can enable some saucelabs tasks to run. We currently have it set for any staging ADHOC deployments  
  
![[Pasted image 20250827223139.png]]

if DEPLOY_TO_SAUCELABS is true, we allow the saucelabs bash scripts to execute

  ![[Pasted image 20250827223149.png]]
  
One thing to refactor the variable group:

1. remove pipeline task and update the ios bash script:
    

[Microsoft has default variables for this apple provisioning profile and apple certificate signing identity](https://learn.microsoft.com/en-us/azure/devops/pipelines/apps/mobile/app-signing?view=azure-devops&tabs=apple-install-during-build#reference-the-files-in-your-xcode-task "https://learn.microsoft.com/en-us/azure/devops/pipelines/apps/mobile/app-signing?view=azure-devops&tabs=apple-install-during-build#reference-the-files-in-your-xcode-task") `$(APPLE_CERTIFICATE_SIGNING_IDENTITY) and $(APPLE_PROV_PROFILE_UUID)`
![[Pasted image 20250827223207.png]]
modify this [ios bash script](https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/replace_variables_repackage_ipa.sh&version=GBmaster&line=16&lineEnd=51&lineStartColumn=3&lineEndColumn=69&lineStyle=plain&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/replace_variables_repackage_ipa.sh&version=GBmaster&line=16&lineEnd=51&lineStartColumn=3&lineEndColumn=69&lineStyle=plain&_a=contents")
![[Pasted image 20250827223221.png]]

2. maybe we have to set CI android to use `base/e2e` so that the webview debug mode is on.

3. should we use `saucelabs` flag to detect if the deployment needs to use `base/e2e` and deploy app to saucelabs server? or else I can detect if the condition for APK_FOLDER is `base/e2e`

#   
Triggering the e2e build pipeline:

  
after we deploy to saucelabs, we want to trigger this build pipeline: [https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=1443](https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=1443 "https://dev.azure.com/dominos-au/OneDigital/_build?definitionId=1443")
![[Pasted image 20250827223242.png]]

since the release task runs a multiplier, we will wait until the ios and android has been deployed so that we can trigger the saucelabs.
![[Pasted image 20250827223253.png]]
the best way is to wait until staging adhoc has finished deploying, then we can trigger a staging task that will run the e2e saucelabs trigger.

Things to check:

this trigger for e2e saucelabs need to make sure it uses the right apk and ipa file, we upload to saucelabs with the build number, so we have to make sure the e2e saucelabs use the same file

make sure your agent job `allows scripts to access OAuth Token`, only then you can trigger the e2e saucelabs the build pipeline. make sure you untick all the artifact download to save deployment time
![[Pasted image 20250827223306.png]]

# Next Step: make sure the saucelabs run the correct file

  
since we have many developers creating PRs and triggering the Staging Adhoc deployment, we will need to use a unique identifier for the apk and ipas that we upload.  
when we upload to saucelabs, we pass in [the file name and description](https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/saucelabs_uploadApp.sh&version=GBmaster&line=21&lineEnd=22&lineStartColumn=5&lineEndColumn=39&lineStyle=plain&_a=contents "https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile?path=/azure-pipeline_scripts/saucelabs_uploadApp.sh&version=GBmaster&line=21&lineEnd=22&lineStartColumn=5&lineEndColumn=39&lineStyle=plain&_a=contents")
![[Pasted image 20250827223321.png]]
we would need to make sure saucelabs run the correct app build by passing the correct file name [for ios](https://dominos-au.visualstudio.com/OneDigital/_git/olo.mobile?path=/e2e/config/wdio.sauce.ios.conf.js&version=GBmaster&line=12&lineEnd=12&lineStartColumn=9&lineEndColumn=87&lineStyle=plain&_a=contents "https://dominos-au.visualstudio.com/OneDigital/_git/olo.mobile?path=/e2e/config/wdio.sauce.ios.conf.js&version=GBmaster&line=12&lineEnd=12&lineStartColumn=9&lineEndColumn=87&lineStyle=plain&_a=contents") [and android](https://dominos-au.visualstudio.com/OneDigital/_git/olo.mobile?path=/e2e/config/wdio.sauce.android.conf.js&version=GBmaster&line=12&lineEnd=12&lineStartColumn=9&lineEndColumn=87&lineStyle=plain&_a=contents "https://dominos-au.visualstudio.com/OneDigital/_git/olo.mobile?path=/e2e/config/wdio.sauce.android.conf.js&version=GBmaster&line=12&lineEnd=12&lineStartColumn=9&lineEndColumn=87&lineStyle=plain&_a=contents").  
  
since we only trigger the e2e build pipeline, we need to see if we can pass in an argument so that e2e build pipeline can run the correct ipa and apk file.

The Trigger Build Task that we use have build parameter arguments where you can pass variables (comma seperated), as shown in [its manual](https://marketplace.visualstudio.com/items?itemName=benjhuser.tfs-extensions-build-tasks#Build%20and%20Template%20Parameters "https://marketplace.visualstudio.com/items?itemName=benjhuser.tfs-extensions-build-tasks#Build%20and%20Template%20Parameters"). we can use this to pass in the file name or build number.
![[Pasted image 20250827223337.png]]
in the e2e build pipeline, we can see that the parameter has been passed
![[Pasted image 20250827223347.png]]
later when the e2e pipeline passes for a PR, we would like it to approve the PR stating that e2e test has passed.  

gotchas:

how the e2e pipeline was able to keep the saucelabs tunnel running was to put & at the end of the bash command
![[Pasted image 20250827223402.png]]