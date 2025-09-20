非常好的问题！下面我给你**详细介绍一个 Java 自动化测试项目**，**同时使用 BDD（Cucumber）+ TestNG** 的真实结构和例子：  
✅ 解释为什么这么设计  
✅ 项目结构  
✅ feature 文件（BDD）  
✅ step definitions（实现步骤）  
✅ TestNG 测试类（API/非 BDD 测试）  
✅ testng.xml 组织方式  
✅ 标签管理（@smoke, @regression）  
✅ 在 CI/CD 中如何根据分支选择执行

这非常适合：

- 大型或多层次测试项目
    
- 同时需要业务面向（UI 测试/端到端）和技术面向（API、单元测试）的团队
    

---

## ☕ **1️⃣ 为什么要一起用？**

- **Cucumber (BDD)**：描述用户行为，面向业务，可读性好
    
- **TestNG**：强大的测试执行器：并行执行、依赖关系、分组执行、suite 管理
    
- 两者结合：  
    ✅ BDD 测试更好看、可读性强  
    ✅ TestNG 可以管理非 BDD 测试（比如 API 测试）  
    ✅ 用 testng.xml 管理全局 suite（比如 nightly build 跑所有 tests）
    

---

## 📦 **2️⃣ 项目结构示例**

```
src/test/
├── java
│   ├── runners/                # Cucumber 测试运行器 (TestNG)
│   │   └── RunCucumberTest.java
│   ├── steps/                  # Step definitions
│   │   └── LoginSteps.java
│   ├── pages/                  # 页面对象
│   │   └── LoginPage.java
│   └── api/                    # TestNG 原生 API 测试
│       └── UserApiTest.java
└── resources
    └── features/
        └── login.feature
testng.xml                      # 测试套件配置
pom.xml                         # Maven 配置
```

---

## 📄 **3️⃣ Feature 文件（resources/features/login.feature）**

```gherkin
Feature: Login functionality

  @smoke @login
  Scenario: Login with valid credentials
    Given User is on login page
    When User enters valid username and password
    Then User should see the dashboard
```

- 用 Gherkin 描述行为
    
- 标签 `@smoke` 用于冒烟测试
    

---

## 🧪 **4️⃣ Step definitions（steps/LoginSteps.java）**

```java
package steps;

import io.cucumber.java.en.*;
import org.testng.Assert;
import pages.LoginPage;
import utils.DriverFactory;

public class LoginSteps {
    LoginPage loginPage = new LoginPage(DriverFactory.getDriver());

    @Given("User is on login page")
    public void openLoginPage() {
        loginPage.open();
    }

    @When("User enters valid username and password")
    public void doLogin() {
        loginPage.login("testuser", "pass123");
    }

    @Then("User should see the dashboard")
    public void verifyDashboard() {
        Assert.assertTrue(loginPage.isDashboardVisible());
    }
}
```

---

## ⚙ **5️⃣ TestNG 测试运行器（runners/RunCucumberTest.java）**

```java
package runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = "steps",
    tags = "@smoke",   // 指定运行哪些标签
    plugin = {"pretty", "html:target/cucumber-reports.html"}
)
public class RunCucumberTest extends AbstractTestNGCucumberTests {
    // 继承 TestNG 的基类，TestNG 会运行 BDD 场景
}
```

---

## 🛠 **6️⃣ TestNG 原生 API 测试（api/UserApiTest.java）**

```java
package api;

import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;

public class UserApiTest {

    @Test(groups = {"api", "smoke"})
    public void getUserDetails() {
        given()
          .when().get("https://example.com/api/user/1")
          .then().statusCode(200);
    }
}
```

- 用 `@Test(groups=...)` 标记测试组
    
- 无需 BDD，也可以写复杂的接口测试
    

---

## 🗂 **7️⃣ testng.xml 组织测试套件**

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Full Test Suite" parallel="false">
    <test name="BDD Tests">
        <classes>
            <class name="runners.RunCucumberTest"/>
        </classes>
    </test>
    <test name="API Tests">
        <classes>
            <class name="api.UserApiTest"/>
        </classes>
    </test>
</suite>
```

这样：  
✅ 一起运行所有测试  
✅ 分开跑也可以

---

## 🏷 **8️⃣ 标签管理与选择性执行**

- Feature 文件里加 `@smoke`, `@regression`
    
- 在运行器里用 `tags="@smoke"` 只跑 smoke
    
- 在 CI/CD 用 Maven 覆盖：
    

```bash
mvn test -Dcucumber.filter.tags="@regression"
```

对于 TestNG 原生测试，也可以：

```bash
mvn test -Dgroups=api
```

---

## 🛠 **9️⃣ 在 CI/CD 中使用分支控制**

在 Jenkins / GitHub Actions：

- 如果是 `develop` 分支：只跑 `@smoke` + api group
    
- 如果是 `release` 分支：跑 `@regression` + 所有 api 测试
    

示例（Jenkinsfile）：

```groovy
if (env.BRANCH_NAME == 'develop') {
    sh 'mvn test -Dcucumber.filter.tags="@smoke" -Dgroups=api'
} else if (env.BRANCH_NAME == 'release') {
    sh 'mvn test -Dcucumber.filter.tags="@regression"'
}
```

---

## ✅ **10️⃣ 优势总结**

||Cucumber (BDD)|TestNG|
|---|---|---|
|优势|可读性、业务驱动|强大的并行执行、依赖、suite 管理|
|场景|UI / 端到端|API / 非 UI 测试|
|如何结合|AbstractTestNGCucumberTests + testng.xml||

结合使用：

- UI 测试用 BDD
    
- API / DB 测试用 TestNG 原生
    
- TestNG 管理所有 suite
    

---

## ✏ **结论**

> 在大型项目中，推荐**同时使用 Cucumber (BDD) + TestNG**：
> 
> - BDD 提升可读性，让业务团队参与
>     
> - TestNG 管理 suite 和执行，跑不同类型的测试
>     

---

