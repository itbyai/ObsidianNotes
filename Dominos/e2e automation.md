- [Context](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7113050564/OLO.Mobile+accessibility+test+id+Assessment#Context)
- [Definition](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7113050564/OLO.Mobile+accessibility+test+id+Assessment#Definition)
    - [accessibility id (Appium)](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7113050564/OLO.Mobile+accessibility+test+id+Assessment#accessibility-id-\(Appium\))
    - [testID (React Native)](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7113050564/OLO.Mobile+accessibility+test+id+Assessment#testID-\(React-Native\))
- [Best Practices](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7113050564/OLO.Mobile+accessibility+test+id+Assessment#Best-Practices)
- [Objective](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7113050564/OLO.Mobile+accessibility+test+id+Assessment#Objective)

# **Context**

The best practise in creating robust automation test is to use the `testID`/`accessibility id` instead of using `xpath` as a locator. Currently, throughout the olo.mobile there’s lacking in these IDs. Mostly dominated by `xpath` which is unreliable & contribute to flaky test, often results in test failure.

|                                                                                                                                                                                                 |                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Good Practice**                                                                                                                                                                               | **Bad Practice**                                                                                                                                                                  |
| This element has:<br><br>- accessibility id ![check mark button](https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/ef8b0642-7523-4e13-9fd3-01b65648acf6/64x64/2705.png) | This element does not have:<br><br>- accessibility id ![Cross Mark](https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/atlassian/productivityEmojis/cross-64px.png) |
| ![[Pasted image 20250827225221.png]]                                                                                                                                                            | ![[Pasted image 20250827225236.png]]                                                                                                                                              |
|                                                                                                                                                                                                 |                                                                                                                                                                                   |

# **Definition**

### accessibility id (Appium)

`accessibility id` is a cross-platform locator strategy used by Appium.

1. It's used to find elements by their accessibility label.
    
2. Works across both iOS and Android.
    

Usage in WebdriverIO:

`$('~yourAccessibilityId')`

This is equivalent to:

`driver.findElement('accessibility id', 'yourAccessibilityId')`

### testID (React Native)

`testID` is a React Native prop used to mark elements for testing.

- On iOS, it maps to the **accessibility identifier.**
    
- On Android, it maps to the **view's content-description.**
    

In React Native, setting:

`<View testID="yourTestId" />`

Locate an element using the `accessibility id` locator in Appium/WebdriverIO:

`$('~yourTestId')`

In React Native apps, `testID` becomes the `accessibility id` in Appium

# Best Practices

1. Use `testID` and `accessibilityLabel` together. For iOS, `accessibilityLabel` is often prioritized, while on Android, `testID` maps to `resource-id`.  
      
    
    `<TextInput testID="delivery-address.input.unitNo.input" accessibilityLabel="Unit Number Input" ... />`
    
2. Prefer `resource-id` over XPath for Android selectors. XPath can be fragile and slow, while `resource-id` is more reliable and performant.
    
3. Leverage `accessibilityId` in your selectors — Appium translates this to the right native identifier depending on the platform.  
      
    
    `const input = await driver.findElement('accessibility id', 'delivery-address.input.unitNo.input');`
    
4. Avoid flaky selectors: Dynamic text, index-based paths, or deep XPath trees can lead to unreliable tests.
    
5. Consider Appium Inspector (Standalone/SauceLabs) or UIAutomatorViewer to verify actual accessibility properties during runtime.
    

# **Objective**

The objective of this documentation is to list down (every) elements in the OLO.Mobile screens & identify those with/without `testID`/`accessibility id`. These are the list of screens that will be covered:

- [Missing test Id - Home/Sign In/Sign Up](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7114195123/Missing+test+Id+-+Home+Sign+In+Sign+Up)
    
- [Missing test Id - Delivery/Pick Up/Timed Order](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7125729353/Missing+test+Id+-+Delivery+Pick+Up+Timed+Order)
    
- [Missing test Id - Menu/Basket](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7172882692/Missing+test+Id+-+Menu+Basket)
    
- [Missing test Id - More/My Account/Offers](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7177470087/Missing+test+Id+-+More+My+Account+Offers)
    
- [Missing test Id - My Details/Payment Method/Live Pizza Tracker](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7190806819/Missing+test+Id+-+My+Details+Payment+Method+Live+Pizza+Tracker)
    
- [Missing Test Ids](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/7229210628/Missing+Test+Ids)