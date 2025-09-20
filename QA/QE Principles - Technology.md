### Principle 1: Build and maintain effective Regression tests, following the Test Pyramid approach.

Click here for more info ....

### Tests are: Fast, Reliable, Maintainable, Isolated, Repeatable.

e2e tests are often seen as a "cover all" type of test. Due to the focus on e2e tests, this results in test coverage with big gaps because there is a lack of integration and external API tests.

Follow the [![](https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca)Seven Principles of Testing](https://www.linkedin.com/pulse/seven-principles-testing-adrian-cosma/)

Test Pyramid:

[DevOpsGroup | Sourced Group](https://www.devopsgroup.com/insights/resources/diagrams/all/the-testing-pyramid/)

[![](https://martinfowler.com/favicon.ico)bliki: Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

|   |
|---|
|**Do’s**|
|Automation first|
|Tests should clearly show what is being tested.|
|The overlap of different tests should be minimal.|
|Testing Behaviour vs. Testing Implementation<br><br>Tests that are independent of implementation details are easier to maintain since they don't need to be changed each time you make a change to the implementation. They're also easier to understand. If the code's implementation changes, the tests shouldn't need to be updated.<br><br>In most cases, tests should focus on testing the code's public API, and the code's implementation details shouldn't need to be exposed to tests.|

|   |
|---|
|**Dont 's**|
|Test should NOT encourage or accept bad implementations.|
|Manual testing should not be considered as something to get things done quicker.|
|Automate everything. Keep in mind the Test Pyramid.|

---

### Principle 2: Use the right tool for the job.

Click here for more info ....

Consistent use of our tools/frameworks will ensure we are capable of working in all areas of our software ecosystem.

- Using the same method to deliver tests in respective areas of our ecosystem will ensure everyone is capable of working on everything.
    
- Using the same programming language used in the software will simplify the repo and allow the developer to contribute
    

|   |   |
|---|---|
|**Component Type**|**Tool/framework**|
|Web|[![](https://webdriver.io/img/favicon.png)WebdriverIO · Next-gen browser and mobile automation test framework for Node.js \| WebdriverIO](http://webdriver.io/)|
|Mobile|Appium<br><br>SauceLabs for virtual device testing|
|API|RestSharp -[Hello from RestSharp \| RestSharp](https://restsharp.dev/)|
|||

|   |   |
|---|---|
|Integration|Implementation Language (C#, JS / TS, ...)|
|Unit|Implementation Language (C#, JS / TS, ...) + Shouldly|
|Load / Performance|Locust (using Python)|
|||

**Note:** the terminology of what constitutes an integration test vs a unit test vs a functional test needs to be defined

Test-Driven Development

For unit tests, we do not use additional frameworks. Stick to the core unit test libraries inherent to the programming language (xunit/nUnit, nSubstitute, Jest, etc..)

---

### Principle 3: Non-functional testing is part of our service.

Click here for more info ....

As quality engineers, we are delivering more than just a testing service. We are assuring the structural quality of the software.

Non-functional testing is about ensuring the overall quality of the software is sound. Whilst there are other areas of non-functional testing to be considerate of, these areas are key:

|   |   |
|---|---|
|Accessibility|[Accessibility Lowbar](https://dominos.atlassian.net/wiki/spaces/SellAndTrack/pages/1800372368)<br><br>Use the WAVE chrome plugin: [![](https://wave.webaim.org/favicon.ico)WAVE Chrome, Firefox, and Edge Extensions](https://wave.webaim.org/extension/)|
|Security|Pen testing is left to the security department so what part do we play?<br><br>Basic security features should be tested. Consider:<br><br>- API security through keys (and keys not in the code, scripts etc)<br>    <br>- website and app access restrictions (ie. ensuring users can't view what they're not supposed to)<br>    <br>- watch out for vulnerabilities in code (everyone's job)|
|Data Sensitivity|GDPR is part of our world. We need to consider data sensitivity concerns such as ensuring PII data is protected in the right circumstances|
|Load & Performance|The Locust load test can be used for now  <br>See [Load Testing (locust)](https://dominos.atlassian.net/wiki/spaces/MAD/pages/874349465)|

---

### Principle 4: Run tests as part of the build and deployment

Click here for more info ....

Although tests won't be included in the production release package, they should reside in the repository.

Dependent on the investment approach, tests are part of the software package.

Key points:

- Automated pipelines run each flavor of tests on software build
    
- Reports show coverage where applicable
    
- Executed tests with fail/pass
    
- Performance Quality Gates - integration and API tests have response time targets (like an SLA)
    

|   |
|---|
|Build Pipelines<br><br>- compile the code<br>    <br>- run unit tests<br>    <br>- run integration tests<br>    <br>- run any other tests such as contract validation<br>    <br>- static code analysis|
|Release Pipelines : SBX -> CI -> Stage -> (UAT) -> Prod<br><br>When a build is deployed, a Test pipeline should be triggered that runs tests against the deployed build.<br><br>Depending on the configuration, a rollback can be triggered automatically if tests fail or a quality gate/score is not reached.<br><br>This is not always desired though. Sometimes a failed test needs to be investigated.|

---

### Principle 5: Keep it Simple, Stupid

Click here for more info ....

Follow [![](https://www.interaction-design.org/favicon.ico)KISS (Keep it Simple, Stupid) - A Design Principle](https://www.interaction-design.org/literature/article/kiss-keep-it-simple-stupid-a-design-principle)

Our code should be kept simple and single purpose.

Sometimes some code duplication is acceptable if it makes it easier to read and maintain.

We DON’T over-complicate things for the sake of making it elegant.

We DON’T re-invent the wheel. Instead, we use proven technologies, frameworks, patterns, …

We help and encourage designing and building systems with testing in mind.


### Principle 6: Invest the right amount of effort

Click here for more info ....

Refer to: [Common Process Principles | Invest the right amount of effort](https://dominos.atlassian.net/wiki/spaces/SE/pages/4719117320/Common+Process+Principles#Invest-the-right-amount-of-effort)

---

### Principle 7: Write system documentation that gives direction rather than answers

Click here for more info ....

Our documentation will reside in 2 key areas:

|   |   |
|---|---|
|Open image-20210914-055330.png<br><br>![](blob:https://dominos.atlassian.net/77b9c2c5-c011-49a1-b683-d8ae8bb634b7#media-blob-url=true&id=f672ea80-b22f-4bbc-b758-2a3d0f9f8044&collection=contentId-2358543490&contextId=2358543490&mimeType=image%2Fpng&name=image-20210914-055330.png&size=45239&width=512&height=512&alt=)<br><br>A README for test execution and configuration should exist in every repo that gives instruction on setup and execution.|Open image-20210914-055429.png<br><br>![](blob:https://dominos.atlassian.net/768ca3ec-0f2b-4b7b-9775-bfdc32cf0131#media-blob-url=true&id=dedfffa5-887c-48d5-aa8f-6dddbe6fa8af&collection=contentId-2358543490&contextId=2358543490&mimeType=image%2Fpng&name=image-20210914-055429.png&size=21949&width=1022&height=129&alt=)<br><br>The ability to find what you are looking for is easier in a wiki. The searchable page for engineers to find the basic information and link to repo's, access info etc. is necessary particularly for onboarding.|
|- refer to confluence & other links<br>    <br>- how to compile<br>    <br>- how to run<br>    <br>- how to configure<br>    <br>- code structure notes<br>    <br>- key considerations<br>    <br>- troubleshooting<br>    <br>- common issues|- repo information<br>    <br>- where to find build and release pipelines<br>    <br>- links to external documentation<br>    <br>- links to relevant LaunchDarkly feature toggles<br>    <br>- links to architecture diagrams<br>    <br>- information on where it runs<br>    <br>- links to relevant projects<br>    <br>- links to access requirements|
|WHAT NOT TO DOCUMENT  <br>Don't list tests individually|   |

---

### Principle 8: Estimate the work, not just the features

Click here for more info ....

A QE MUST be involved in inception & estimation

During planning - there should be individual user stories for setup tasks (eg. setting up the framework for tests to be executed within the pipeline). Plan necessary spikes.

Per Feature, the QE should factor in these items listed for their estimate:

- Pipelines
    
- Automated tests (not only e2e)
    
- Documentation
    
- Existing Tech Debt
    
- Outdated tools, packages, environments, ...
    
- Future direction, use, changes, features, ....
    
- Monitoring
    
- Releases
    

---

### Principle 9: Testing doesn’t end after a project finishes

Click here for more info ....

2 aspects to this point.

1. Project handover  
      
    Project Teams cannot hand over unhealthy builds anymore. Subject to our investment approach, build and release pipelines must show green build, test and deployment reports.
    
    The motivation is to direct engineers (software & quality) to hand work over in a healthy state. This is to say, software compiles regularly without failures on unit tests or regression tests.
    
2. Ongoing maintenance  
      
    Maintenance work to follow appropriate investment path. If we are investing in the software still, maintenance work should add/change tests to compliment the bug fixed or change made.
---