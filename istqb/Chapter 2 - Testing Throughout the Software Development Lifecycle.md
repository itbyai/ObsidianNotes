# Testing Throughout the Software Development Lifecycle

## 2.1 Testing in the Context of a Software Development Lifecycle (SDLC)

### 2.1.1 Impact of SDLC on Testing

- SDLC choice affects scope and timing of test activities
- Influences test documentation detail, techniques, approach, automation extent, and tester roles
- Sequential models: Testers participate in early reviews but dynamic testing occurs later
- Iterative/incremental models: Both static and dynamic testing may occur at all test levels
- Agile development: Accommodates frequent change with lightweight documentation, extensive automation, and experience-based testing

### 2.1.2 Good Testing Practices Across All SDLCs

- Every development activity has a corresponding test activity
- Different test levels have specific objectives to ensure comprehensive coverage
- Test analysis/design begins during corresponding development phase
- Testers review work products as early as drafts are available

### 2.1.3 Test-Driven Development Approaches

- **Test-Driven Development (TDD)**: Tests written first, then code developed to pass tests
- **Acceptance Test-Driven Development (ATDD)**: Tests derived from acceptance criteria before development
- **Behavior-Driven Development (BDD)**: Tests express desired behavior in natural language (Given/When/Then format)
- All approaches implement early testing and shift left principles
- Tests persist as automated tests for future quality assurance

### 2.1.4 DevOps and Testing

- DevOps creates synergy between development and operations teams
- **Benefits**:
    - Fast feedback on code quality
    - Encourages high-quality code with component tests
    - Establishes stable test environments through automation
    - Increases visibility of non-functional characteristics
    - Reduces repetitive manual testing
    - Minimizes regression risk
- **Challenges**:
    - Requires defined delivery pipeline
    - CI/CD tools need implementation and maintenance
    - Test automation demands resources
    - Manual testing still needed despite automation

### 2.1.5 Shift Left

- Testing performed earlier in SDLC without neglecting later testing
- **Good practices**:
    - Review specifications from tester perspective
    - Write test cases before code
    - Implement CI/CD for fast feedback
    - Complete static analysis before dynamic testing
    - Perform non-functional testing at component level when possible
- May require more initial effort but saves costs later
- Needs stakeholder buy-in

### 2.1.6 Retrospectives and Process Improvement

- Held at end of project, iteration, or when needed
- Participants discuss successes, failures, and improvements
- **Benefits for testing**:
    - Increased effectiveness/efficiency
    - Improved testware quality
    - Team bonding and learning
    - Enhanced test basis quality
    - Better cooperation between development and testing

## 2.2 Test Levels and Test Types

### 2.2.1 Test Levels

- **Component testing**: Testing isolated components, often performed by developers
- **Component integration testing**: Focus on interfaces and interactions between components
- **System testing**: Evaluating overall system behavior and capabilities
- **System integration testing**: Testing interfaces between system and external systems/services
- **Acceptance testing**: Validating system readiness for deployment (user, operational, contractual, regulatory, alpha, beta)
- Test levels distinguished by test object, objectives, basis, defects/failures, and approach/responsibilities

### 2.2.2 Test Types

- **Functional testing**: Evaluates what the system should do
- **Non-functional testing**: Evaluates how well the system behaves (performance, compatibility, usability, reliability, security, maintainability, portability, safety)
- **Black-box testing**: Specification-based testing without knowledge of internal structure
- **White-box testing**: Structure-based testing derived from implementation or internal structure
- All test types applicable to all test levels with different focus

### 2.2.3 Confirmation Testing and Regression Testing

- **Confirmation testing**: Verifies that defects have been fixed
- **Regression testing**: Ensures changes haven't caused adverse consequences
- Both needed at all test levels when defects are fixed or changes made
- Regression testing is ideal for automation, especially in CI/CD environments

## 2.3 Maintenance Testing

- Covers corrective, adaptive, and performance-improving maintenance
- Scope depends on risk level, system size, and change size
- **Triggers**:
    - Modifications (planned enhancements, corrective changes, hot fixes)
    - Environment upgrades/migrations
    - System retirement (requiring data archiving and retrieval testing)
- Impact analysis helps decide if changes should be made based on potential consequences