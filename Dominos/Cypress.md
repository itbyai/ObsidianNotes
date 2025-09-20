## What is Cypress?

[Cypress.io](http://cypress.io/ "http://cypress.io/")  is an open-source javascript front-end testing tool, built for the modern web.

**Cypress Runner**

Preview unavailable

## Feature List

**Time Travel**

Cypress takes snapshots as your tests run. Simply hover over commands in the Command Log to see exactly what happened at each step.

**Debuggability**

Stop guessing why your tests are failing. Debug directly from familiar tools like Chrome DevTools. Our readable errors and stack traces make debugging lightning fast.

**Real Time Reloads**

Cypress automatically reloads whenever you make changes to your tests. See commands execute in real time in your app.

**Automatic waiting**

Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.

**Spies, stubs and clocks**

Verify and control the behaviour of functions, server responses, or timers. The same functionality you love from unit testing is right at your fingertips.

**Network traffic control**

Easily control, stub, and test edge cases without involving your server. You can stub network traffic however you like.

**Consistent Results**

Our architecture doesn’t use Selenium or WebDriver. Say hello to fast, consistent and reliable tests that are flake-free.

**Screenshots and videos**

Review screenshots taken automatically on failure, or videos of your entire test suite when run headlessly.

Full Feature List: [https://www.cypress.io/features/](https://www.cypress.io/features/ "https://www.cypress.io/features/") 

## Official Documentation

As Cypress is it's own contained framework, the official documentation is a fantastic resource and should be your go-to reference.

[https://docs.cypress.io](https://docs.cypress.io/ "https://docs.cypress.io/")

Cypress - DB connection and Seeding test DB
Cypress methods to connect to the db varies with the type of DB. Putting down the method I used in Voucher Admin Tool to connect to SQL server.

## Install :

Plugins and libraries to be installed for helping cypress connect to sql server

- Tedious library
    
- cypress-sql-server plugin
    

For Tedious dependency

> npm install tedious

For sql server plugin

> npm install cypress-sql-server

This would also add the respective dependencies in the **package.json** file

---

## Configure :

## cypress/plugins/index.js

To initialise cypress-sql-server plugin add below content in index.js file

`const sqlServer = require('cypress-sql-server'); module.exports = (on, config) => { tasks = sqlServer.loadDBPlugin(config.db); on('task', tasks); }`

## support/index.js

`import sqlServer from 'cypress-sql-server'; sqlServer.loadDBCommands();`

## cypress.json

DB credentials for the connection to be added in below format

`"db": { "userName": "", "password": "", "server": "localhost", "options": { "database": "Discount123", "encrypt": true, "rowCollectionOnRequestCompletion" : true } }`

## Query

you can provide your queries to the database as below

`describe('Query the database', function() { it('Get data', function() { cy.sqlServer("SELECT * FROM [Discount123].[dbo].[abcd] where Name like '%1 NY Range Pizza %'") }) })`

Bypass UI
One of the Cypress best practice is to bypass UI and land to the page under test. For Eg, if you have completed testing login page, then for your subsequent tests, you do not have to login via UI. Also if you would like to set some state, before your actual test, you can add them via API calls and land directly into the page under test instead of doing datasetup by visting UI. This reduces the chance for the script to fail and also makes it faster.

Reference - [https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in "https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in") 

Below is an example where the Genesis login is performed through API, the state is set using window.localStorage.setItem and cy.visit(URL) takes you to the landing page without asking the user to login.

Cypress.Commands.add('loginApi', () => {

``cy.request({ method: 'POST', url: 'https://dominos-dev.okta.com/api/v1/authn', headers: { 'Content-Type': 'application/json', }, body: { username: 'Test.User', password: 'Test123$', options: { -----> These details vary based on the request payload of your API warnBeforePasswordExpired: true, multiOptionalFactorEnroll: false, }, }, }).as('currentUser') .then((resp) => { -----> okta token found under Applications tab in dev tool ->Storage ->Local storage window.localStorage.setItem("okta-token-storage", `{"idToken":{"idToken":"qY7a2Omy3jzhx0fWq5pRRzyXkN8avJi9g","expiresAt":1562909363,"tokenType":"Bearer","scopes":["openid","email","profile"],"authorizeUrl":"https://dominos-dev.okta.com/oauth2/ausbg6kx0dyBMwhzt356/v1/authorize","userinfoUrl":"https://dominos-dev.okta.com/oauth2/ausbg6kx0dyBMwhzt356/v1/userinfo"}}`) })})``


**How to hit API's using Cypress?**  
Below given are sample codes for automating Get and Post methods using Cypress. Put and delete are similar to this. Depending on the way your API is implemented, modifications will be required to get it working.  
If the API end point accepts query parameters, it can be parameterised and appended to the URL as shown in the below example.

**GET**

Cypress.Commands.add('getStoresOpeningHoursAPI', () => {

`cy.request({ method: 'GET', url: Cypress.env(API_ENDPOINT_URL) OR Cypress.env("getStoreGroup") + -----> _Parameterized URL example_ "query.countryCode=" + attribute.countryCode.Australia -----> _Fetching data from fixture file to avoid hard coding of query parameter_ }).then((res) => { expect(res.status).to.eql(200); --------> _examples of different assertions that you can do on the API response._ expect(res.body).to.not.be.null; expect(res.body).to.have.length(604); expect(res.body.StoreGroupCode).to.eql("Custom.AU_National"); expect(res.body).has.property("CountryCode", "AU"); }) })})`

**POST**

Cypress.Commands.add('postAlternateHoursAPI', () => {

`cy.request({ method: 'POST', url: Cypress.env(ENDPOINT_URL), headers: { ----->Depending on the nature of your API this could change 'Content-Type': 'application/json', 'X-API-KEY': 'DevApiKey', }, body: { ------> Make sure that you feed all required data in the body. alternateTradingHour: { countryCode: 'AU', dateOfTrade: '2019-05-14', tradingOpenTime: '10:30:00', tradingCloseTime: '23:30:00', alternateTradingHourOpts: [], }, }, }) .then((res) => { expect(res.status).to.eql(201) })})`