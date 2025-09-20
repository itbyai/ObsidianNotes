# Automation

## Question List
**What questions could be answered by the training**
- What automation code structure (webdriverio + typescript) looks like?
- How many skill sets have been involved in the automation solution?
- How to clone and run automation script locally?
- How to create/add new test cases under current framework?
- How to create and modify page object class for new element?
- How to identify the elements and do some actions?
- How to configure report and screens? 
- CI/CD and check the test reports?
- How to build the test from scratch?
- Any reference documents

## Introduction

::: tip
**webdriverio** + **typscript** + **chai** + **Mocha** + **Nodejs**
:::

<big>**What is webdriverio?**</big>

**WebdriverIO is built over NodeJS**, which is an implementation of the **JSON Wire Protocol**. Packaged into npm, it conducts communication using NodeJS, which is open-source and widely used for application development. It uses RESTful architecture to conduct automation testing.

**As a JavaScript library**, WebdriverIO simplifies the process of writing and executing automated tests for web applications. It abstracts the complexity of interacting with browsers using **WebDriver protocol** and provides a user-friendly interface for performing browser actions, assertions, and managing test workflows.

WebdriverIO is widely used by developers and testers to perform browser automation tasks, such as navigating to web pages, filling forms, clicking elements, and validating page content. Its flexible and extensible nature makes it suitable for various testing scenarios and allows integration with other testing frameworks, test runners, and Continuous Integration (CI) tools.

you can consider **WebdriverIO as a JavaScript library**. WebdriverIO is a popular test automation framework for web applications, primarily used for end-to-end testing. It provides a powerful and expressive API that allows developers to interact with web browsers programmatically using JavaScript.

The user writes the test script in JavaScript using the WebdriverIO library, where the Service request is sent via NodeJS as an HTTP command. It uses JSON Wire protocol, and the services module forwards the request to the browser.

Upon receiving the command, the browser performs the user actions, which tests the validity of the application functions.

**JSON Wire Protocol** is old version

**web protocol** is new version

**Understanding work flow**
<img src="../public/WebdriverIO-Architecture.png" alt="Image" width="800" height="300" />

**webdriverios + chromedriver + webdriver protocol**

In summary, WebDriverIO is a testing framework that utilizes the WebDriver protocol to automate web browsers. To automate the Chrome browser, WebDriverIO relies on Chromedriver, which acts as the intermediary between WebDriverIO and the Chrome browser. WebDriverIO sends commands to Chromedriver, which then executes those commands in the Chrome browser and returns the results back to WebDriverIO. This way, WebDriverIO enables automation of Chrome browser interactions and testing scenarios using JavaScript-based syntax and the WebDriver protocol.

**JS + webdriverio + chromedriver + browser**

From a theoretical perspective, the relationship between WebdriverIO, JavaScript, and Chromedriver can be understood as follows:

**WebdriverIO (WDIO)** is an automation testing framework based on JavaScript. It provides a rich set of APIs and tools for writing and executing automated test scripts. WDIO acts as a bridge between test scripts and web browsers, enabling interaction and control over the browsers.

**JavaScript** is a dynamic programming language commonly used for writing web scripts and applications. In the context of automation testing, JavaScript is often used as the language for writing test scripts, including those built with WDIO. JavaScript offers a rich syntax and built-in functionalities, making test script development and execution straightforward and flexible.

**Chromedriver** is a separate service that acts as an intermediary between WDIO and the Chrome browser. It is specifically designed to facilitate communication between WDIO and Chrome. Chromedriver functions by establishing a connection with the Chrome browser, enabling WDIO to control and interact with the browser's behavior. It receives instructions from WDIO, translates them into operations understandable and executable by Chrome, and returns the results to WDIO.

<img src="../public/webdriverio_chromedriver_browser.png" alt="Image" width="800" height="150" />

In essence:

WebdriverIO: Acts as an automation testing framework that allows test scripts to interact with web browsers.
JavaScript: Serves as the programming language used for writing test scripts, including those using WebdriverIO.
Chromedriver: Functions as a service and intermediary, enabling communication and control between WebdriverIO and the Chrome browser.
This relationship works as follows:

Chromedriver Configuration and Launch: Chromedriver is configured as a service within the WebdriverIO configuration file (wdio.conf.js). It is set up to work with Chrome as the desired browser.

Execution of WDIO Test Scripts: Test scripts written with WebdriverIO utilize the provided APIs to interact with Chromedriver. For example, commands such as browser.url() for navigating to a URL, browser.click() for clicking elements, or browser.setValue() for entering values.

Communication with Chromedriver: Test scripts communicate with Chromedriver using the provided WDIO commands and APIs. Instructions from WDIO are sent to Chromedriver, which translates them into operations that Chrome can understand and execute. The results are then returned to WDIO.

Control of Chrome Browser by Chromedriver: Chromedriver, through the established connection with Chrome, controls the behavior of the browser. It can simulate user actions, execute JavaScript, retrieve page information, and more.

## Nodejs
Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. It is built on the V8 JavaScript engine, which is the same engine used by Google Chrome. Node.js enables server-side execution of JavaScript, making it possible to run JavaScript code on the server and build scalable, real-time applications.


**Key features of Node.js** include:

1. **Asynchronous and Non-blocking**: Node.js uses an event-driven, non-blocking I/O model, which means it can handle multiple concurrent operations without getting blocked. This design makes it well-suited for building high-performance and scalable applications.

2. **NPM (Node Package Manager)**: Node.js comes with NPM, a powerful package manager that allows developers to easily install, share, and manage third-party libraries and modules.

3. **Server-side Development**: Node.js is commonly used for building server-side applications, such as web servers, APIs, real-time applications, and microservices.

4. **Cross-platform**: Node.js is compatible with various operating systems, including Windows, macOS, and Linux, making it a versatile choice for developers.

5. **JavaScript Everywhere**: By using Node.js, developers can write server-side and client-side code using the same language, JavaScript, which can streamline development and simplify code sharing.

As for the functions used when WebdriverIO sends commands to Chrome, it depends on the specific actions being performed and the WebdriverIO API methods being used. When using WebdriverIO to interact with the browser, a series of functions are invoked to facilitate the communication between WebdriverIO, the Selenium server, and the Chrome browser.

**For example**, if you use WebdriverIO's `browser.url()` method to navigate to a URL, several functions will be involved behind the scenes:

6. WebdriverIO sends a request to the Selenium server, which acts as a middleman between WebdriverIO and the browser.

7. The Selenium server communicates with the Chrome browser through the WebDriver protocol.

8. The Chrome browser receives the request, processes it, and navigates to the specified URL.

9. The Chrome browser sends the response back through the WebDriver protocol to the Selenium server.

10. The Selenium server forwards the response to WebdriverIO, indicating the navigation was successful or if there were any errors.

These are just some of the functions involved in the overall process. WebdriverIO abstracts much of the complexity, allowing developers to interact with the browser through simple and expressive API methods. The exact number of functions used may vary depending on the specific actions performed and the complexity of the commands being sent to the browser.

**The whole work flow**

      +------------------+
      |   WebdriverIO   |
      +------------------+
                |
                | Uses WebDriver Protocol
                |
      +------------------+
      |  Selenium Server |
      +------------------+
                |
                | Controls
                |
      +------------------+
      |   Chromedriver   |
      +------------------+
                |
                | Controls
                |
      +------------------+
      |   Chrome Browser |
      +------------------+


## Code Structure
<img src="../public/structure.png" alt="Image" width="450" height="1200" />

**folder explanation**

**actions**
 - all functions related to webdriver

**config**
  - config file for testing
  - webdriver config file

**helpers**
  - getconfig file - reading json file and export it
  - fos config file

**scenes**
  - page object class

**src**
  - all test cases

**refrence docs**
  - [webdriverio](https://webdriver.io/docs/automationProtocols/)

**reports**
  - all report and screenshot

## Test Case Exmaple

this is typical example **credit-card.ts** test case level. Actually page object to build test cases. so page object is very important.
```
import {
  checkoutScene,
  commonScene,
  driver,
  getConfig,
  homeScene,
  menuScene,
  orderBuilder,
  orderTimeScene,
  paymentScene,
  storeSearchScene,
  trackerScene,
} from 'tucson.webio'
```
- How to access all exports by importing folder?
- Show it in the code? 
- How to write export and import?

```

let config
describe('I can place a pickup order using credit card', function () 
  before(async function () {
    config = await getConfig()
    if (!(await commonScene.isOrderTimeSlotAvailable(config.env.stores.defaultStore.storeNo, 'Pickup'))) {
      await this.skip()
    }
  })
// test case
  it('I start an order for pick up', async function () {
    await commonScene.initialiseTest({ url: config.env.orderingBaseURL, country: config.env.country })
    await homeScene.selectPickupButton()
    await storeSearchScene.enterPickupStore(config.env.stores.defaultStore)
    await orderTimeScene.orderAsap('Pickup')
  })

  it('I quick add a pizza to my order via the menu', async function () {
    if ((await driver.getEnv()) === 'PROD') {
      await orderBuilder.quickAddPickupProductToBasket()
    } else {
      await menuScene.addProductFromMenu(config.env.products.defaultProduct)
    }
  })

  it('I enter my personal details', async function () {
    await menuScene.selectViewOrder()
    await orderBuilder.fillPersonalDetails()
    await checkoutScene.clickPlaceOrder()
  })

  it('I attempt to pay with a credit card with not enough balance', async function () {
    if ((await driver.getEnv()) !== 'PROD') {
      await paymentScene.selectPaymentMethod('CreditCard')
      await paymentScene.enterCreditCardDetails(config)
      await paymentScene.enterCreditCardName('NOT_ENOUGH_BALANCE : 51 : INSUFFICIENT FUNDS')
      await paymentScene.selectPayNowButton('CreditCard')
      await paymentScene.closePaymentError()
      await paymentScene.payWithCreditCard(config)
    } else {
      await this.skip()
    }
  })

  it('I pay with credit card and enter OSID security details if prompted', async function () {
    if ((await driver.getEnv()) === 'PROD') {
      await paymentScene.payWithCreditCard(config)
      await paymentScene.enterOSID(config)
    } else {
      await this.skip()
    }
  })

  it('Then the order should be placed successfully', async function () {
    await trackerScene.viewLoadingIndicatorCard()
    await trackerScene.waitForTracker()
  })
})

```

## Mocha functions

### Test Suite Functions
- `describe(title, fn)`: Defines a test suite or a group of related test cases.
- `context(title, fn)`: An alias for `describe`, used to define a test suite.
- `before(fn)`: Runs the provided function before all test cases in a test suite.
- `beforeEach(fn)`: Runs the provided function before each test case in a test suite.
- `after(fn)`: Runs the provided function after all test cases in a test suite.
- `afterEach(fn)`: Runs the provided function after each test case in a test suite.

### Test Case Functions
- `it(title, fn)`: Defines an individual test case.
- `specify(title, fn)`: An alias for `it`, used to define a test case.
- `skip(title, fn)`: Skips the execution of a test case or a test suite.
- `only(title, fn)`: Runs only the specified test case or test suite.

### Assertion Functions
- `assert(expression, message)`: Asserts that the provided expression is truthy.
- `expect(value)`: Creates an assertion object to perform various assertions on the value.
- `should`: Extends the prototype of an object to add assertion functions.

Asynchronous Testing
done: Signals the completion of an asynchronous test case.
timeout: Specifies the maximum time to wait for an asynchronous test case to complete.
async/await: Allows writing asynchronous test cases using async functions and await expressions.
Promise: Provides support for testing functions that return Promises.

### Hooks Functions
- `before(fn)`: Runs the provided function before a specific test case or test suite.
- `beforeEach(fn)`: Runs the provided function before each specific test case or test suite.
- `after(fn)`: Runs the provided function after a specific test case or test suite.
- `afterEach(fn)`: Runs the provided function after each specific test case or test suite.

### Other Functions
- `timeout(ms)`: Sets the timeout for each test case.
- `retries(n)`: Specifies the number of times a failed test case should be retried.
- `reporter(name)`: Sets the reporter to be used for test results output.
- `grep(pattern)`: Runs only the test cases whose titles match the provided pattern.

### Test Coverage
- nyc: Integrates Mocha with the nyc code coverage tool to measure test coverage.
### Test Reports
- reporter: Sets the output format for test reports.
- reporterOptions: Configures additional options for the selected reporter.

Please note that this is not an exhaustive list of all functions provided by Mocha, but it covers the most commonly used ones. Refer to the official Mocha documentation for a comprehensive list of available functions and their detailed usage.

## Scenes (Page Object)

::: tip
This is an example of page object class (payment page)
:::

```
/* eslint-disable no-empty */
import { expect } from 'chai'
import { commonScene, driver } from 'tucson.webio'

class PaymentScene {
  public banContactCancel = `[data-testid="cancel-payment.button"]`
  public banContactContainer = `[data-testid=adyen-MisterCash-bcmc-component-container]`
  public banContactMobileAppButton = `.adyen-checkout__button__text`
  public banContactMobileQrCode = `img[alt="Scan QR code"]`
  public banContactPassword = `#password`
  public banContactSubmit = `.paySubmit`
  public banContactUserName = `#username`
  public cardHolderNameField = `.adyen-checkout__card__holderName__input`
  public cardNumberContainer = `[data-cse="encryptedCardNumber"]`
  public cardNumberField = `[data-fieldtype="encryptedCardNumber"]`
  public ccvContainer = `[data-cse="encryptedSecurityCode"]`
  public ccvField = `[data-fieldtype="encryptedSecurityCode"]`
  public creditCardContainer = `[data-testid=adyen-CreditCard-scheme-component-container]`
  public creditCardIframe = `iframe`
  public edenredConnectWithMyEdenred = `button[value="Legacy"]`
  public edenredLastBtn = `[class="btn btn-primary"]`
  public edenredLogin = `#login`
  public edenredLoginButton = `[data-testid="payment-method.Edenred.payment-button"]`
  public edenredPassword = `#Password`
  public edenredPin = `#inputPan`
  public edenredPinEnter = `.btn-primary`
  public edenredUsername = `#Username`
  public expiryDateContainer = `[data-cse="encryptedExpiryDate"]`
  public expiryDateField = `[data-fieldtype="encryptedExpiryDate"]`
  public giftCardNameField = `#adyen-giftcard-holderName`
  public giftCardNumberContainer = `[title="Iframe for secured gift card number"]`
  public giftCardNumberField = `[data-fieldtype="encryptedCardNumber"]`
  public giftCardPinContainer = `[title="Iframe for secured gift card security code"]`
  public giftCardPinField = `[data-fieldtype="encryptedSecurityCode"]`
  public iDealContainer = `[data-testid=adyen-iDeal-ideal-component-container]`
  public iDealSelectBank = `.adyen-checkout__dropdown__button`
  public iDealSubmit = `[name='button.edit']`
  public klarnaAcceptCookiesBtn = `//div[@class='modal-content js-modal-content']//button[@class='cookie-modal-accept-all button-primary']`
  public klarnaAccountNumber = `#BackendFormLOGINNAMEUSERID`
  public klarnaBankCodeSearch = `#BankCodeSearch`
  public klarnaBankSearchResults = `#BankSearcherResults`
  public klarnaCookieModal = `#Modal`
  public klarnaNextBtn = `.button-right`
  public klarnaPin = `#BackendFormUSERPIN`
  public klarnaTan = `#BackendFormTan`
  public noTouchID = `//button[text()='No']`
  public osidNextButton = `#verify-btn-elongated`
  public osidNextButtonAlt = `#btnOtpSubmit`
  public osidNumber = `#text-input`
  public osidNumberAlt = `#enterPIN`
  public outstandingBalance = `[data-testid="split-payment.order.outstanding.balance.label"]`
  public payNowAppCancelButton = `[data-testid="cancel-payment.button"]`
  public payNowAppQrCode = `img[alt="Scan QR code"]`
  public payPalAddCardButton = `[data-testid="add-fi-link"]`
  public payPalCookiePrompt = `#acceptAllButton`
  public payPalEmailInput = `#email`
  public payPalLogin = `#btnLogin`
  public payPalLoginScreen = `#login`
  public payPalNext = `#btnNext`
  public payPalPassword = `#password`
  public payPalPaymentContainer = '[data-testid="first-fis"]'
  public payPalSubmitPayment = `#payment-submit-btn`
  public payPalWidgetButton = `//span`
  public payPalWidgetIframe = `[title='PayPal']`
  public paymentErrorConfirmButton = '[data-testid="payment-error.confirm"]'
  public paymentErrorOverlay = '[data-testid="generic-card.payment-error"]'
  public paymentErrorThreeDSOverlay = '[data-testid="generic-card.recoverable-error"]'
  public requireChangeRadioButton = `[data-testid="customer-requires-change.field"]`
  public savePaymentCheckbox = `.adyen-checkout__store-details`
  public splitPaymentDialog = `[data-testid="split-payment"]`
  public splitPaymentPartialPrice = `[data-testid="split-payment.payment-card.price"]`
  public threeDSContainer = `#threedsContainer`
  public threeDSIframe = `[name="threeDSIframe"]`
  public threeDSPassword = `[name="answer"]`
  public threeDSSubmit = `[type="submit"]`
  public tipTheDriverAddButton = `[data-testid="save-tip-button"]`
  public tipTheDriverAmount = `[data-testid="driver-tip.price"]`
  public tipTheDriverCard = `[data-testid="tip-the-driver.card-title"]`
  public tipTheDriverOtherButton = `[data-testid="tip-toggles.toggle.Other"]`
  public tipTheDriverTipInputField = `[data-testid="save-tip-input.fancy-text-field"]`
  public unrecoverableErrorOverlay = `[data-testid="generic-card.unrecoverable-error"]`

  public async addTipToDriver(tipAmount) {
    await $(this.tipTheDriverCard).waitForDisplayed()
    await $(this.tipTheDriverOtherButton).click()
    await $(this.tipTheDriverTipInputField).setValue(tipAmount)
    await $(this.tipTheDriverAddButton).click()
  }

  public async paymentMethodFieldContainer(paymentMethod, paymentField) {
    return paymentMethod != null
      ? await (await $(paymentMethod).$(paymentField)).$(this.creditCardIframe)
      : await $(paymentField).$(this.creditCardIframe)
  }

  public async paymentMethodRoundUpForCharity(paymentMethod, adyenPaymentType?: string) {
    return `[data-testid="payment-method.${await this._getID(
      paymentMethod,
      adyenPaymentType,
    )}.round-up-for-charity.input.checkbox.container"]`
  }

  public async paymentMethodRadioButton(paymentMethod, adyenPaymentType?: string) {
    return `[data-testid^="payment-method.${await this._getID(paymentMethod, adyenPaymentType)}"][data-testid$=".tab"]`
  }

  public async payNowButton(paymentMethod, adyenPaymentType?: string) {
    return `[data-testid^="payment-method.${await this._getID(
      paymentMethod,
      adyenPaymentType,
    )}"][data-testid$=".payment-button"]`
  }

  public async payNowButtonLoading(paymentMethod, adyenPaymentType?: string) {
    return `[data-testid^="payment-method.${await this._getID(
      paymentMethod,
      adyenPaymentType,
    )}"][data-testid$=".payment-button.loading"]`
  }

  public async selectPaymentMethod(paymentMethod, adyenPaymentType?: string) {
    if (await commonScene.getFeatureToggle('google-pay-enabled')) {
      // slow loading payment method - need to wait for it to display before making selection
      await $(await this.paymentMethodRadioButton('GooglePay-paywithgoogle', adyenPaymentType)).waitForDisplayed()
    }
    await driver.click(await this.paymentMethodRadioButton(paymentMethod, adyenPaymentType))
  }

  public async checkRoundUpCharity(paymentMethod, adyenPaymentType?: string) {
    await driver.click(await this.paymentMethodRoundUpForCharity(paymentMethod, adyenPaymentType))
  }

  public async processSavedPayment(config, savedCreditCard) {
    await this.enterCreditCardCcv(
      config.env.creditCard.visa.ccv,
      `[data-testid^=${savedCreditCard}][data-testid$="-container"]`,
    )
  }

  public async processAdyenPayPalPayment(email, password) {
    await this.selectPayNowButton('PayPal', 'paypal')
    await this.waitForPayPalLoginScreenLoad()
    await driver.setText(this.payPalEmailInput, email)
    if (await $(this.payPalNext).isDisplayed()) {
      await driver.click(this.payPalNext)
    }
    await driver.setText(this.payPalPassword, password)
    await driver.click(this.payPalLogin)
    await this.waitForPayPalPaymentScreenLoad()
    await this.waitForPayPalCookiePrompt()
    await driver.click(this.payPalSubmitPayment)
  }

  public async waitForPayPalCookiePrompt() {
    try {
      await $(this.payPalCookiePrompt).waitForDisplayed({ timeout: 5000 })
      await $(this.payPalCookiePrompt).click()
    } catch {
      driver.log('Info: PayPal cookie Prompt not found. Proceeding to place order.')
    }
  }

  public async processPayPalPayment(payPalLoginDetails) {
    let email
    let password

    if ((await driver.getEnv()) === 'PROD') {
      email = payPalLoginDetails.production.emailId
      password = payPalLoginDetails.production.password
    } else {
      email = payPalLoginDetails.test.emailId
      password = payPalLoginDetails.test.password
    }

    // if our button is not available, then pay with the paypal widget
    if (await this.isPaypalWidgetEnabled()) {
      return await this.payWithPaypalWidget(email, password)
    }

    return await this.payWithPaypalRedirect(email, password)
  }

  private async isPaypalWidgetEnabled() {
    try {
      await $(await this.payNowButton('PayPal')).waitForExist({ timeout: 1500 })

      return false
    } catch {
      return true
    }
  }

  private async payWithPaypalRedirect(email, password) {
    await this.selectPayNowButton('PayPal')
    await this.completePayPalPayment(email, password)
  }

  private async payWithPaypalWidget(email, password) {
    await this.clickPayPalWidget()
    await driver.switchToPopUpWindow()
    await this.completePayPalPayment(email, password)
    await driver.switchToDominosWindow()
  }

  private async completePayPalPayment(email, password) {
    await driver.setText(this.payPalEmailInput, email)
    if (!(await $(this.payPalPassword).isDisplayed())) {
      await driver.click(this.payPalNext)
    }
    await driver.setText(this.payPalPassword, password)
    await driver.click(this.payPalLogin)
    await this.waitForPayPalPaymentScreenLoad()
    await driver.click(this.payPalSubmitPayment)
  }

  private async clickPayPalWidget() {
    await $(this.payPalWidgetIframe).waitForDisplayed({ timeout: 30000 })
    await browser.switchToFrame(await $(this.payPalWidgetIframe))
    await driver.waitForElement(this.payPalWidgetButton, 5000)
    await browser.execute(`arguments[0].click();`, await $(this.payPalWidgetButton))
    await browser.switchToParentFrame()
  }

  public async selectConnectWithMyEdenred() {
    await $(this.edenredConnectWithMyEdenred).waitForDisplayed({ timeout: 30000 })
    try {
      if (await $(this.edenredConnectWithMyEdenred).isDisplayed()) {
        await driver.click(this.edenredConnectWithMyEdenred)
      } else {
        driver.log('Info: No Edenred connect with my edenred button. ignore the step.')
      }
    } catch {
      driver.log('Info: No Edenred connect selection page. ignore the step.')
    }
  }

  public async loginEdenredAccount(email, password, Pin) {
    try {
      await $(this.edenredUsername).waitForDisplayed({ timeout: 30000 })
      await driver.setText(this.edenredUsername, email)
      await driver.setText(this.edenredPassword, password)
      await driver.click(this.edenredLogin)
      if (await $(this.edenredPin).isDisplayed()) {
        await driver.setText(this.edenredPin, Pin)
        await driver.click(this.edenredPinEnter)
      }
      await driver.click(this.edenredLastBtn)
    } catch {
      driver.log('Info: Edenred login page has some issues. ignore the testing.')
    }
  }

  public async waitForPayPalLoginScreenLoad() {
    await $(this.payPalLoginScreen).waitForExist({ timeout: 30000 })
  }

  public async waitForPayPalPaymentScreenLoad() {
    await $(this.payPalAddCardButton).waitForExist({ timeout: 20000 })
  }

  public async selectPayNowButton(paymentMethod, adyenPaymentType?: string) {
    await this.waitForPayNowButtonLoad(paymentMethod, adyenPaymentType)
    await driver.click(await this.payNowButton(paymentMethod, adyenPaymentType))
  }

  public async enterOSID(config) {
    //  ensure we are using prod credit card details
    if (!config.env.creditCard.production.cardNumber.includes('#{CreditCardNumber}#')) {
      try {
        await $(this.threeDSContainer).waitForDisplayed({ timeout: 60000 })
        await $(this.threeDSIframe).waitForDisplayed({ timeout: 20000 })
        await browser.switchToFrame(await $(this.threeDSIframe))
        driver.log('Info: OSID Prompt Detected. Entering OSID')
        await $(this.osidNumber).click()
        await $(this.osidNumber).addValue(config.env.creditCard.production.osid)
        await $(this.osidNextButton).click()
        driver.log('Info: OSID has been entered')
      } catch {
        try {
          driver.log('Info: OSID Prompt Detected. Entering OSID')
          await $(this.osidNumberAlt).click()
          await $(this.osidNumberAlt).addValue(config.env.creditCard.production.osid)
          await $(this.osidNextButtonAlt).click()
          driver.log('Info: OSID has been entered')
        } catch {
          driver.log('Info: OSID Prompt not found. Proceeding to Tracker.')
        }
      }
    }
  }

  public async enterCreditCardNumber(cardNumber) {
    const paymentCardNumberContainer = await this.paymentMethodFieldContainer(
      this.creditCardContainer,
      this.cardNumberContainer,
    )
    await this.enterCardNumber(paymentCardNumberContainer, cardNumber)
  }

  public async enterBanContactCardNumber(cardNumber) {
    const paymentMethodFieldContainer = await this.paymentMethodFieldContainer(
      this.banContactContainer,
      this.cardNumberContainer,
    )
    await this.enterCardNumber(paymentMethodFieldContainer, cardNumber)
  }

  public async enterCardNumber(paymentCardNumberContainer, cardNumber) {
    await paymentCardNumberContainer.waitForDisplayed({ timeout: 20000 })
    await browser.switchToFrame(paymentCardNumberContainer)
    await $(this.cardNumberField).waitForDisplayed()
    await $(this.cardNumberField).setValue(cardNumber)
    await browser.switchToParentFrame()
  }

  public async enterCreditCardExpiry(expiryDate) {
    const paymentCardExpiryDateContainer = await this.paymentMethodFieldContainer(
      this.creditCardContainer,
      this.expiryDateContainer,
    )
    await this.enterCardExpiry(paymentCardExpiryDateContainer, expiryDate)
  }

  public async enterBanContactCardExpiry(expiryDate) {
    const paymentCardExpiryDateContainer = await this.paymentMethodFieldContainer(
      this.banContactContainer,
      this.expiryDateContainer,
    )
    await this.enterCardExpiry(paymentCardExpiryDateContainer, expiryDate)
  }

  public async enterCardExpiry(paymentCardExpiryDateContainer, expiryDate) {
    await paymentCardExpiryDateContainer.waitForDisplayed()
    await browser.switchToFrame(paymentCardExpiryDateContainer)
    await $(this.expiryDateField).waitForDisplayed()
    await $(this.expiryDateField).click()
    await $(this.expiryDateField).setValue(expiryDate)
    await browser.switchToParentFrame()
  }

  public async enterCreditCardCcv(ccv, creditCardContainer = this.creditCardContainer) {
    const creditCardCcvContainer = await (await $(creditCardContainer).$(this.ccvContainer)).$(this.creditCardIframe)
    await creditCardCcvContainer.waitForDisplayed()
    await browser.switchToFrame(creditCardCcvContainer)
    await $(this.ccvField).waitForDisplayed()
    await $(this.ccvField).setValue(ccv)
    await browser.switchToParentFrame()
  }

  public async enterAdyenGiftCardNumber(giftCardNumber) {
    await $(this.giftCardNumberContainer).waitForDisplayed({ timeout: 20000 })
    await browser.switchToFrame(await $(this.giftCardNumberContainer))
    await $(this.giftCardNumberField).waitForDisplayed()
    await $(this.giftCardNumberField).setValue(giftCardNumber)
    await browser.switchToParentFrame()
  }

  public async enterAdyenGiftCardPin(giftCardPin) {
    await $(this.giftCardPinContainer).waitForDisplayed({ timeout: 20000 })
    await browser.switchToFrame(await $(this.giftCardPinContainer))
    await $(this.giftCardPinField).waitForDisplayed()
    await $(this.giftCardPinField).setValue(giftCardPin)
    await browser.switchToParentFrame()
  }

  public async enterCreditCardDetails(config) {
    if ((await driver.getEnv()) === 'PROD') {
      await this.enterCreditCardNumber(config.env.creditCard.production.cardNumber)
      await this.enterCreditCardExpiry(config.env.creditCard.production.expiry)
      await this.enterCreditCardCcv(config.env.creditCard.production.ccv)
      await this.enterCreditCardName(config.env.creditCard.production.cardHolderName)
    } else {
      await this.enterCreditCardNumber(config.env.creditCard.visa.cardNumber)
      await this.enterCreditCardExpiry(config.env.creditCard.visa.expiry)
      await this.enterCreditCardCcv(config.env.creditCard.visa.ccv)
      await this.enterCreditCardName(config.env.creditCard.visa.cardHolderName)
    }
  }

  public async enter3DSCreditCardDetails(config) {
    await this.enterCreditCardNumber(config.env.creditCard.tds.cardNumber)
    await this.enterCreditCardExpiry(config.env.creditCard.tds.expiry)
    await this.enterCreditCardCcv(config.env.creditCard.tds.ccv)
    await this.enterCreditCardName(config.env.creditCard.tds.cardHolderName)
  }

  public async enterGiftCardDetails(config, isEnoughBalance) {
    await this.enterAdyenGiftCardNumber(config.env.giftcard.number)
    await this.enterAdyenGiftCardPin(config.env.giftcard.pin)
    if (isEnoughBalance) {
      await this.enterAdyenGiftCardName(config.env.giftcard.name)
    } else {
      await this.enterAdyenGiftCardName('NOT_ENOUGH_BALANCE')
    }
  }

  public async setEdenredLimitPay() {
    const limitUrl = (await browser.getUrl()) + '?limit-payment-balance=true'
    await browser.navigateTo(limitUrl)
  }

  public async enterAdyenGiftCardName(name) {
    await driver.setText(this.giftCardNameField, name)
  }

  public async enterCreditCardName(name) {
    await (await $(this.creditCardContainer).$(this.cardHolderNameField)).setValue(name)
  }

  public async enterBanContactCardName(name) {
    await (await $(this.banContactContainer).$(this.cardHolderNameField)).setValue(name)
  }

  public async processKlarnaPayment(config) {
    try {
      await $(this.klarnaCookieModal).waitForDisplayed({ timeout: 30000 })
    } catch {
      driver.log('Klarna cookie prompt not found')
    }

    await this.dismissKlarnaCookies()
    await driver.click(this.klarnaBankCodeSearch)
    await driver.setText(this.klarnaBankCodeSearch, config.env.klarna.bankName)
    await driver.click(this.klarnaBankSearchResults)
    await this.dismissKlarnaCookies()
    await driver.setText(this.klarnaAccountNumber, config.env.klarna.accountNumber)
    await driver.setText(this.klarnaPin, config.env.klarna.accountPin)
    await driver.click(this.klarnaNextBtn)
    await this.dismissKlarnaCookies()
    await driver.click(this.klarnaNextBtn)
    await this.dismissKlarnaCookies()
    await driver.setText(this.klarnaTan, config.env.klarna.accountPin)
    await this.dismissKlarnaCookies()
    await driver.click(this.klarnaNextBtn)
    await this.dismissKlarnaCookies()
  }

  public async dismissKlarnaCookies() {
    try {
      await browser.waitUntil(async () => await $(this.klarnaCookieModal).isDisplayed(), { timeout: 3000 })
    } catch {
      driver.log('Klarna cookie prompt not found, continue with test')
    }
    if (await $(this.klarnaAcceptCookiesBtn).isDisplayed()) {
      await $(this.klarnaAcceptCookiesBtn).click()
    }
  }

  public async enterBanContactCreditCardDetails(config) {
    await this.enterBanContactCardNumber(config.env.creditCard.banContact.cardNumber)
    await this.enterBanContactCardExpiry(config.env.creditCard.banContact.expiry)
    await this.enterBanContactCardName(config.env.creditCard.banContact.cardHolderName)
  }

  public async processBanContactAuthorization(config) {
    await driver.setText(this.banContactUserName, config.env.creditCard.banContact.userName)
    await driver.setText(this.banContactPassword, config.env.creditCard.banContact.password)
    await driver.click(this.banContactSubmit)
  }

  public async validateBancontactMobileQrCode() {
    if (await driver.isMobile()) {
      await $(this.banContactMobileAppButton).waitForExist({ timeout: 60000 })
      await $(this.banContactMobileAppButton).click()
    } else {
      await $(this.banContactMobileQrCode).waitForExist({ timeout: 60000 })
      await $(this.banContactCancel).click()
    }
  }

  public async validatePayNowQrCode() {
    if (await driver.isMobile()) {
      await $(this.payNowAppCancelButton).waitForExist({ timeout: 10000 })
      await $(this.payNowAppCancelButton).click()
    } else {
      await $(this.payNowAppQrCode).waitForExist({ timeout: 10000 })
      await $(this.payNowAppCancelButton).click()
    }
  }

  public async processiDealPayment() {
    await (await $(this.iDealContainer).$(this.iDealSelectBank)).click()
    const paymentOptions = await $(this.iDealContainer).$$('li')
    const paymentOption = await this.selectRandomIdealIssuer(paymentOptions)
    await driver.click(paymentOption)
    await this.selectPayNowButton('iDeal-ideal')
    await $(this.iDealSubmit).waitForDisplayed({ timeout: 30000 })
    await $(this.iDealSubmit).click()
  }

  public async selectRandomIdealIssuer(paymentOptions) {
    let random
    let text
    do {
      random = Math.floor(Math.random() * paymentOptions.length)
      text = await paymentOptions[random].getText()
    } while (['Test Issuer Cancelled', 'Test Issuer Refused', 'Test Issuer Pending'].includes(text))

    return paymentOptions[random]
  }

  public async complete3DSSecurity() {
    await $(this.threeDSIframe).waitForDisplayed({ timeout: 30000 })
    await browser.switchToFrame(await $(this.threeDSIframe))
    await driver.setText(this.threeDSPassword, 'password')
    await driver.click(this.threeDSSubmit)
    await browser.switchToParentFrame()
  }

  public async waitForPayNowButtonLoad(paymentMethod, adyenPaymentType?: string) {
    await $(await this.payNowButton(paymentMethod, adyenPaymentType)).waitForDisplayed({ timeout: 6000 })
    await $(await this.payNowButtonLoading(paymentMethod, adyenPaymentType)).waitForDisplayed({ reverse: true })
  }

  public async isSavedPaymentDisplayed() {
    return await $(this.savePaymentCheckbox).isExisting()
  }

  public async isRoundUpCharityDisplayed(paymentMethod, adyenPaymentType?: string) {
    return $(await this.paymentMethodRoundUpForCharity('CreditCard-scheme')).isDisplayed()
  }

  public async payWithCreditCard(config, loggedIn = false) {
    await this.selectPaymentMethod('CreditCard')
    await this.enterCreditCardDetails(config)
    if (loggedIn) {
      await expect(await this.isSavedPaymentDisplayed()).to.equal(
        true,
        'Credit card saved payment checkbox is not displaying and it should be',
      )
      await paymentScene.saveCreditCard()
    } else {
      await expect(await this.isSavedPaymentDisplayed()).to.equal(
        false,
        'Credit card saved payment checkbox is displaying and it should not be',
      )
    }

    await this.selectPayNowButton('CreditCard')
  }

  public async payWithCreditCardAndCharityOption(config, roundUpForCharity = false) {
    await this.selectPaymentMethod('CreditCard')
    await this.enterCreditCardDetails(config)
    await expect(await this.isSavedPaymentDisplayed()).to.equal(
      false,
      'Credit card saved payment checkbox is displayed',
    )
    if (roundUpForCharity) {
      await this.checkRoundUpCharity('CreditCard')
    }
    await this.selectPayNowButton('CreditCard')
  }

  public async payWithPaypalAndCharityOption(config, roundUpForCharity = false) {
    await this.selectPaymentMethod('PayPal')
    await expect(await this.isSavedPaymentDisplayed()).to.equal(false, 'PayPal payment checkbox is displayed')
    if (roundUpForCharity) {
      await this.checkRoundUpCharity('PayPal')
    }
  }

  public async payWithCreditCard3DS(config) {
    await this.selectPaymentMethod('CreditCard')
    await this.enter3DSCreditCardDetails(config)
    await this.selectPayNowButton('CreditCard')
    await this.complete3DSSecurity()
  }

  public async payWithCreditCard3DSAndCharityOption(config, roundUpForCharity = false) {
    await this.selectPaymentMethod('CreditCard')
    await this.enter3DSCreditCardDetails(config)
    if (roundUpForCharity) {
      await this.checkRoundUpCharity('CreditCard')
    }
    await this.selectPayNowButton('CreditCard')
    await this.complete3DSSecurity()
  }

  public async payWithAdyenGiftCard(config, isEnoughBalance = true) {
    await this.selectPaymentMethod('GiftCard')
    await this.enterGiftCardDetails(config, isEnoughBalance)
    await this.selectPayNowButton('GiftCard')
  }

  public async isOutstandingBalanceDisplayed() {
    try {
      await browser.waitUntil(async () => await $(this.outstandingBalance).isDisplayed(), { timeout: 6000 })
    } catch {
      driver.log('outstanding balance page is not found, continue with test')
    }
    if (await $(this.outstandingBalance).isDisplayed()) {
      return true
    }

    return false
  }

  public async isSplitPaymentDialogDisplayed() {
    await $(this.splitPaymentPartialPrice).waitForDisplayed()

    return $(this.splitPaymentPartialPrice).isDisplayed()
  }

  public async saveCreditCard() {
    const savePaymentCheckboxes = await $$(this.savePaymentCheckbox)
    for (const each of savePaymentCheckboxes) {
      if (await each.isDisplayed()) {
        await driver.click(each)
        break
      }
    }
  }

  public async closePaymentError() {
    await $(this.paymentErrorOverlay).waitForExist({ timeout: 20000 })
    await driver.click(this.paymentErrorConfirmButton)
  }

  public async selectRequireChange() {
    await driver.click(this.requireChangeRadioButton)
  }

  public async isChangeRequiredDisplayed() {
    return $(this.requireChangeRadioButton).isDisplayed()
  }

  private async _getID(paymentMethod, adyenPaymentType?: string) {
    if (adyenPaymentType !== undefined) {
      return `${paymentMethod}-${adyenPaymentType}`
    }
    if (paymentMethod === 'CreditCard') {
      return `${paymentMethod}-scheme`
    }
    if (paymentMethod === 'GiftCard') {
      return `${paymentMethod}-giftcard`
    }

    return paymentMethod
  }
}

export const paymentScene = new PaymentScene()


```
11. Summary about identifying elements

    1.1 by [attribute=value]

    1.2 by .class

    1.3 by #id

    1.4 by element [attribute=value]

    for more details [identify element](https://www.w3schools.com/cssref/css_selectors.php)
 
12. Build up a function with few actions
```
public async addTipToDriver(tipAmount) {
    await $(this.tipTheDriverCard).waitForDisplayed()
    await $(this.tipTheDriverOtherButton).click()
    await $(this.tipTheDriverTipInputField).setValue(tipAmount)
    await $(this.tipTheDriverAddButton).click()
  }
```
    
13. An toggle
```
public async selectPaymentMethod(paymentMethod, adyenPaymentType?: string) {
    if (await commonScene.getFeatureToggle('google-pay-enabled')) {
      // slow loading payment method - need to wait for it to display before making selection
      await $(await this.paymentMethodRadioButton('GooglePay-paywithgoogle', adyenPaymentType)).waitForDisplayed()
    }
    await driver.click(await this.paymentMethodRadioButton(paymentMethod, adyenPaymentType))
  }
```




## skill sets
When talking about WebdriverIO and TypeScript for automation, several skill sets may be involved. Here are some key areas of expertise that are beneficial for effective automation with WebdriverIO and TypeScript:

14. **JavaScript/TypeScript**: Strong proficiency in **JavaScript/TypeScript** is essential as WebdriverIO is primarily based on JavaScript. You should have a good understanding of JavaScript/TypeScript syntax, concepts, and features.

15. **Web technologies**: Familiarity with HTML, CSS, and DOM manipulation is important for interacting with web elements and performing actions on web pages.

16. **Test frameworks**: WebdriverIO supports multiple test frameworks such as **Mocha**, Jasmine, and Jest. Familiarity with these frameworks and their associated concepts, such as test suites, test cases, and assertions, is necessary.

17. **Browser automation**: Understanding how browsers work and having knowledge of the **WebDriver protocol** is important. You should be able to set up and manage browser instances, navigate through pages, interact with elements, handle cookies, and perform other browser-related tasks.

18. **Page Object Model (POM)**: POM is a design pattern commonly used in automation to create reusable and maintainable code. Knowing how to implement POM effectively using WebdriverIO and TypeScript will help organize your test code and improve readability.

19. **Element identification and manipulation**: Proficiency in using CSS selectors, XPath, or other methods to locate and interact with elements on web pages is crucial. This includes actions such as clicking, typing, selecting options, handling dropdowns, checkboxes, and radio buttons.

20. **Asynchronous programming**: JavaScript/TypeScript heavily relies on asynchronous programming using Promises, async/await, or other mechanisms. Understanding how to handle asynchronous tasks effectively, including waiting for element visibility, making API requests, and handling timeouts, is important.

21. **Test reporting and debugging**: Familiarity with reporting frameworks like Allure or generating custom test reports is beneficial. Additionally, having debugging skills to identify and troubleshoot issues in test scripts or automation environments is valuable.

22. **Source control**: Proficiency in using Git or other version control systems is essential for collaborating with a team, managing code changes, and resolving conflicts.

23. **Continuous Integration/Deployment (CI/CD)**: Understanding CI/CD concepts and being able to integrate automated tests into CI/CD pipelines, such as Jenkins, CircleCI, or GitLab CI/CD, will help in automating the build and deployment processes.

24. **Code debugging and profiling**: Proficiency in using browser developer tools, such as Chrome DevTools, for inspecting and debugging code can be valuable for identifying and resolving issues encountered during test automation.

25. **Cross-browser and cross-platform testing**: WebdriverIO enables testing across various browsers and platforms. Knowing how to configure and execute tests on different browsers (Chrome, Firefox, Safari, etc.) and platforms (Windows, macOS, Linux) can help ensure broad compatibility of your application.

References


- [Webdriver.io for e2e tests](https://webdriver.io/docs/gettingstarted)


## elements
<img src="../public/mydetails.png" alt="Image" width="300" height="500" />

26. **how to set text in the name filed** (in checkout page)
```
  public async enterCustomerName(customerName) {
    await driver.clearTextField(this.customerNameInput)
    await driver.setText(this.customerNameInput, customerName)
  }
```



## local

27. **Clone Repo** address 

`https://dominos-au.visualstudio.com/DefaultCollection/OneDigital/_git/olo.web` 

28. **Create Credential**

<img src="../public/credential.png" alt="Image" width="400" height="240" />

29. **nodejs: 16** install nodejs
```
feng.xiao@M9CJDVQFJ4 olo.web % node -v
v16.20.0
```

30. **Vscode** install vscode
```
feng.xiao@M9CJDVQFJ4 olo.web % node -v
v16.20.0
```

31. **chrome version in js file**
```
const drivers = {
  chrome: { version: '113.0.5672.63' },
}
```
32. **baseurl in config file**
```
  "country": "AU",
    "orderingBaseURL": "https://ordering-ci.dominostest.com.au",
    "oloLocalHost": "http://localhost:8080/",
```

33. **miss driver**

<img src="../public/missingwebdriver.png" alt="Image" width="800" height="150" />

this is the path /Users/feng.xiao/SourceCode/olo.web/node_modules/selenium-standalone/.selenium/chromedriver/114.0.5735.198-arm64/chromedriver

<img src="../public/chromedrivererror.png" alt="Image" width="800" height="150" />

- Alternative method

```/[code-path]/node_modules/selenium-standalone/lib/compute-download-urls.js```


<img src="../public/ChromeDriverFix.png" alt="Image" width="800" height="150" />


34. **performance issue**

it probably related to the code, you can comment it out

`await this.initNetworkLogging(url) in driver.actions`

## Mocha 
Mocha is a feature-rich JavaScript testing framework that runs on Node.js and in the browser. It provides a flexible and powerful environment for writing and running tests, with support for various testing styles and assertions. Here is a list of some of the main functions supported by Mocha:

### Describe Blocks
`describe(title, fn)`: Defines a block of tests with a descriptive title.

### Test Cases
`it(title, fn)`: Defines an individual test case with a title and a test function.

### Hooks
`before(fn)`: Runs the given function once before all test cases in a `describe` block.
`beforeEach(fn)`: Runs the given function before each test case in a `describe` block.
`after(fn)`: Runs the given function once after all test cases in a `describe` block.
`afterEach(fn)`: Runs the given function after each test case in a `describe` block.

### Asynchronous Testing
`it(title, fn)`: Supports asynchronous testing by accepting an asynchronous function (`fn`) or returning a promise.

### Test Skipping
`it.skip(title, fn)`: Skips a test case and does not execute it.
`describe.skip(title, fn)`: Skips a block of tests and does not execute any test cases within it.

### Test Exclusivity
`it.only(title, fn)`: Executes only the specified test case and ignores all other test cases.
`describe.only(title, fn)`: Executes only the specified block of tests and ignores all other test cases and blocks.

### Test Timeouts
`it(title, fn)` or `test(title, fn)`: Supports setting a maximum time for a test case to complete by passing a timeout value as the third argument.

### Pending Tests
`it(title)`: Declares a test case as "pending" without providing an implementation.

### Test Assertions
Mocha does not provide built-in assertion functions but can work with various assertion libraries such as:
- [Chai](https://www.chaijs.com/)
- [Should.js](https://shouldjs.github.io/)
- [Expect.js](https://github.com/Automattic/expect.js)

This list covers some of the main functions supported by Mocha, but there may be additional features and functions available in newer versions of Mocha or through plugins. It is recommended to refer to the official Mocha documentation for the most up-to-date and comprehensive information.

## Chai 
Chai is an assertion library for JavaScript that works seamlessly with testing frameworks like Mocha. It provides a wide range of assertion styles and chainable expressions for making assertions in tests. Here is a list of some of the main functions supported by Chai:

### Assert Style
```javascript
assert(expression, [message])
```
- `assert` function for making assertions in the assert style.

### Expect Style
```javascript
expect(actual).to.be.[assertion](expected, [message])
```
- `expect` function for making assertions in the expect style.
- Chainable expressions (`to`, `be`, `been`, `is`, `that`, `which`, `and`, `has`, `have`, `with`, `at`, `of`, `same`, `but`, `does`, `do`, `an`, `in`, `not`, `deep`, `nested`, `any`, `all`) for building readable assertions.
- Various assertion methods (`equal`, `exist`, `true`, `false`, `null`, `undefined`, `NaN`, `empty`, `above`, `least`, `below`, `most`, `within`, `instanceof`, `property`, `ownProperty`, `length`, `lengthOf`, `match`, `string`, `keys`, `throw`, `respondTo`, `satisfy`, `members`, `include`, `includes`, `contain`, `contains`, `oneOf`, `above`, `below`, `within`, `ordered`, `deep`, `any`, `all`, `a`, `an`, `of`, `is`, `not`, `deep`, `nested`, `property`, `ownProperty`, `ownPropertyDescriptor`, `ownPropertyDescriptorVal`, `ownPropertyDescriptorGet`, `ownPropertyDescriptorSet`, `extensible`, `sealed`, `frozen`, `empty`, `exist`, `null`, `undefined`, `true`, `false`, `NaN`, `finite`, `arguments`, `instanceof`, `instanceOf`, `match`, `string`, `keys`, `throw`, `respondTo`, `satisfy`, `members`, `include`, `includes`, `contain`, `contains`, `oneOf`, `change`, `increase`, `decrease`, `by`) for performing different types of assertions.

### Should Style
```javascript
actual.should.[assertion](expected)
```
- `should` property added to all objects for making assertions in the should style.
- Chainable expressions (`to`, `be`, `been`, `is`, `and`, `have`, `with`, `at`, `of`, `same`, `but`, `does`, `do`, `an`, `in`, `not`) for building readable assertions.
- Various assertion methods (`equal`, `exist`, `true`, `false`, `null`, `undefined`, `NaN`, `empty`, `above`, `least`, `below`, `most`, `within`, `instanceof`, `property`, `ownProperty`, `length`, `match`, `string`, `keys`, `throw`, `respondTo`, `satisfy`, `members`, `include`, `includes`, `contain`, `contains`, `oneOf`, `above`, `below`, `within`, `ordered`, `deep`, `any`, `all`, `a`, `an`, `of`, `is`, `not`, `deep`, `nested`, `property`, `ownProperty`, `ownPropertyDescriptor`, `ownPropertyDescriptorVal`, `ownPropertyDescriptorGet`, `ownPropertyDescriptorSet`, `extensible`, `sealed`, `frozen`, `empty`, `exist`, `null`, `undefined`, `true`, `false`, `NaN`, `finite`, `arguments`, `instanceof`, `

instanceOf`, `match`, `string`, `keys`, `throw`, `respondTo`, `satisfy`, `members`, `include`, `includes`, `contain`, `contains`, `oneOf`, `change`, `increase`, `decrease`, `by`) for performing different types of assertions.

This list covers some of the main functions supported by Chai. Chai also provides additional features and plugins for extending its capabilities. It is recommended to refer to the official Chai documentation for a comprehensive understanding of its functions and usages.


## Selector 

Certainly! Here's a summary of commonly used selector syntax in WebdriverIO, presented in a markdown table:

| Selector Type | Syntax | Description |
| ------------- | ------ | ----------- |
| ID Selector | `#elementId` | Selects an element with the specified ID attribute. |
| Class Selector | `.className` | Selects elements with the specified class attribute. |
| Tag Selector | `tagName` | Selects elements with the specified HTML tag name. |
| Attribute Selector | `[attribute=value]` | Selects elements with the specified attribute and value. |
| Child Selector | `parentElement > childElement` | Selects direct child elements of the specified parent element. |
| Descendant Selector | `ancestorElement descendantElement` | Selects descendant elements of the specified ancestor element. |
| Sibling Selector | `element + adjacentElement` | Selects the element that is immediately adjacent to another element. |
| Pseudo-class Selector | `element:pseudo-class` | Selects elements based on a specific state or condition. |
| nth-child Selector | `:nth-child(n)` | Selects the nth child element of its parent. |
| nth-of-type Selector | `:nth-of-type(n)` | Selects the nth element of its type among siblings. |
| CSS Selector | `selector1, selector2` | Selects elements that match any of the specified selectors. |
| XPath Selector | `//xpathExpression` | Selects elements using XPath expressions. |

These are just a few examples of commonly used selector syntax in WebdriverIO. It's important to note that the specific selectors and their syntax may vary depending on the version of WebdriverIO you are using and the underlying browser automation tool (such as Selenium or Puppeteer). Make sure to consult the official WebdriverIO documentation for the version you are using to get the most accurate and up-to-date information on selector syntax and usage.