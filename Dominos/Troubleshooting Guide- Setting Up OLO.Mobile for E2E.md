To do setup locally olo.mobile with appium, follow the steps mentioned in README.md file in olo.mobile repo ([olo.mobile - Repos (azure.com](https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile "https://dev.azure.com/dominos-au/OneDigital/_git/olo.mobile"))

while running, `` Run `yarn ios` `` command if you get attached error-

**Problem-**

![[Pasted image 20250827222401.png]]

**Solution 1-**

- `` Run `pod install` ``in ios directory 'olo.mobile/applications/olo.native/ios'
    
- `` Run `yarn ios` `` from olo.mobile root directory
    

**Solution2-**

If solution1 doesn’t work, try solution2.

- `` Run `pod update hermes-engine --no-repo-update` `` in ios directory 'olo.mobile/applications/olo.native/ios'
    
- `` Run `yarn ios` `` from olo.mobile root directory
    

**Problem** -After installing Appium, if you get attached pop-up.

![[Pasted image 20250827222411.png]]

**Solution** - From MAC system setting, allow “App store and identifeid developers”

![[Pasted image 20250827222419.png]]

**Problem** - XCode WebdriverAgentRunner - issue

![[Pasted image 20250827222427.png]]

After upgrading xcode 14 ->15 , Xcode 15.2 , 15.3-> 15.4, if you get error in xcode--

“ Command PhaseScriptExecution failed with a nonzero exit code”

**Solution-**

Downgrade the XCode to 15.3/15.2 from 15.4

**Problem -**

![[Pasted image 20250827222438.png]]

**Solution** - `yarn add --dev @wdio/cli`

Note: The above attached error will pop up if you have below mentioned setup

Appium version (Latest)-v2.11.3

`wdio/appium-service": "^9.0.7",` version

XCode- 15.3

MAC OS-14.4

**Problem -**

error execa@9.3.1: The engine "node" is incompatible with this module. Expected version "^18.19.0 || >=20.5.0". Got "18.18.2" error Found incompatible module.

- Nodev18.18.2
    

Appium- 2.11.3

**Solution-**

upgrade node by running command on user root folder

- `` nvm install v18.19.0` ``
    

**Problem -**

error cli-spinners@3.1.0: The engine "node" is incompatible with this module. Expected version ">=18.20". Got "18.19.0". error Found incompatible module.

- Nodev18.19.0
    

Appium- 2.11.3/Appium -2.5.3/2.5.4

**Solution-**

`yarn add cli-spinners`

Problem -

While running E2E in olo.mobile/e2e.. if you get this error with node v18.19.0

![[Pasted image 20250827222501.png]]

**Solution-**

yarn add @wdio/cli --dev--W

**Problem--**

![[Pasted image 20250827222512.png]]

**Solution --**

Please follow the steps for webdriver agent mentioned in below confluence page.

[Apple Silicon & Webdriver Agent issues for E2E & App builds - Project Delivery - Confluence (atlassian.net)](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/4873453582 "https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/4873453582")

Note: Currently olo.mobile is not supporting V19.0.0/V20.0.0, it may end up with this error--

![[Pasted image 20250827222522.png]]

![[Pasted image 20250827222527.png]]

Solution- Downgrade node to ~v18….