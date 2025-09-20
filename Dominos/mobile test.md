Sauce labs provides a facility to select the builds from the pipeline in Sauce Labs UI it self, which saves more time that downloading and uploading the build manually.

1. Login to Sauce Labs and navigate to App Distribution ([https://mobile.saucelabs.com/?rg=us-west-1](https://mobile.saucelabs.com/?rg=us-west-1 "https://mobile.saucelabs.com/?rg=us-west-1"))
    

![[Pasted image 20250827221654.png]]


2. Will take you to a new browser window 'Test Fairy' which you can select the specific build
    
3. For Ex: if you want to test Stage Global build for iOS
    
    1. Select STAGE_GLOBAL / iOS ([https://mobile.saucelabs.com/projects/6996509-stageglobal/](https://mobile.saucelabs.com/projects/6996509-stageglobal/ "https://mobile.saucelabs.com/projects/6996509-stageglobal/"))
        

![[Pasted image 20250827221711.png]]


4. In this list you will see all the builds that has been successllly deployed to SauceLabs in the olo.mobile-global-app pipeline, if a specific build has not successfully deployed to saucelabs pipeline then you will not find that specific build in this list.
    

![[Pasted image 20250827221735.png]]

![[Pasted image 20250827221750.png]]

5. Select the preffred build and tap on the Small mobile icon on the right which allows you to test on a sauce labs real device
    

![[Pasted image 20250827221803.png]]

6. Once you tap on the Small Mobile icon you will navigate to the below window where you can select the Specific Device, and the OS version. And Select the divice.
    

Note: If you are testing Staging Build, then you have to select/configure the proxy tunnel. You can refer the below document to get the tunnel configured.

[Sauce Labs | How to upload test builds manually](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/6900744501)

[How to configure Tunnel for App Testing on Sauce lab ?](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/6497763671)

![[Pasted image 20250827221823.png]]

7. Click on Start Test, you will navigate to a new window which will open your test device.
    

![[Pasted image 20250827221835.png]]

8. Once you done with the Testing, you can click on the 'End Session' button on the Top right corner, which will navgate you screen where you can set
    
    1. Pass/Fall for your test
        
    2. Test Identifier/ Test Case name
        
    3. Save the test results
        
    4. Start new session
        

![[Pasted image 20250827221849.png]]

9. If you select
    
    1. 'Start New Test', then you will navigate to the previous screen on step 6
        
    2. Save your test resuts will be saved in Video format as below, You can locate them anytime by following the below path
        
        1. Dashboard → Live → Test Results ([https://app.saucelabs.com/dashboard/live](https://app.saucelabs.com/dashboard/live "https://app.saucelabs.com/dashboard/live"))
            

![[Pasted image 20250827221858.png]]

![[Pasted image 20250827221907.png]]