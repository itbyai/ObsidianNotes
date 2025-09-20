# e2ejourney

## Test cases

this is typical example **credit-card.ts** test case level. Actually page object to build test cases. so page object is very important.
```
// import page object
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

let config
// define test block
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

## scenes

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
1. Summary about identifying elements

    1.1 by [attribute=value]

    1.2 by .class

    1.3 by #id

    1.4 by element [attribute=value]

    for more details [identify element](https://www.w3schools.com/cssref/css_selectors.php)
 
2. Build up a function with few actions
```
public async addTipToDriver(tipAmount) {
    await $(this.tipTheDriverCard).waitForDisplayed()
    await $(this.tipTheDriverOtherButton).click()
    await $(this.tipTheDriverTipInputField).setValue(tipAmount)
    await $(this.tipTheDriverAddButton).click()
  }
```
    
1. An toggle
```
public async selectPaymentMethod(paymentMethod, adyenPaymentType?: string) {
    if (await commonScene.getFeatureToggle('google-pay-enabled')) {
      // slow loading payment method - need to wait for it to display before making selection
      await $(await this.paymentMethodRadioButton('GooglePay-paywithgoogle', adyenPaymentType)).waitForDisplayed()
    }
    await driver.click(await this.paymentMethodRadioButton(paymentMethod, adyenPaymentType))
  }
```

