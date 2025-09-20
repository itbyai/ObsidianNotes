# Summary of Test Activities Management

## 5.1. Test Planning

1. **Purpose and Content of a Test Plan**
    
    - Documents test objectives, resources, and processes
    - Serves as communication with stakeholders
    - Contains context, assumptions, stakeholders, communication, risks, approach, budget and schedule
2. **Tester's Contribution to Planning**
    
    - Release planning: writing testable user stories, risk analysis, effort estimation
    - Iteration planning: detailed risk analysis, determining testability, breaking down stories into tasks
3. **Entry and Exit Criteria**
    
    - Entry criteria: preconditions for activities (resources, testware, quality level)
    - Exit criteria: conditions to declare completion (thoroughness measures, binary criteria)
    - In Agile: "Definition of Done" and "Definition of Ready"
4. **Estimation Techniques**
    
    - Ratio-based estimation: using historical data from previous projects
    - Extrapolation: early measurements to approximate remaining work
    - Wideband Delphi: iterative expert-based estimations (Planning Poker in Agile)
    - Three-point estimation: weighted average of optimistic, likely, and pessimistic estimates
5. **Test Case Prioritization**
    
    - Risk-based: executing tests covering important risks first
    - Coverage-based: executing tests achieving highest coverage first
    - Requirements-based: executing tests related to highest priority requirements first
6. **Test Pyramid**
    
    - Model showing different tests with different granularity
    - Lower layers: small, isolated, fast tests
    - Higher layers: complex, high-level, end-to-end tests
7. **Testing Quadrants**
    
    - Q1 (technology-facing, support): component tests, automation
    - Q2 (business-facing, support): functional tests, acceptance criteria
    - Q3 (business-facing, critique): exploratory, usability, user acceptance
    - Q4 (technology-facing, critique): smoke tests, non-functional tests

## 5.2. Risk Management

1. **Risk Definition**
    
    - Risk level determined by likelihood and impact
2. **Project vs Product Risks**
    
    - Project risks: management issues affecting schedule, budget, scope
    - Product risks: quality issues affecting functionality, performance, security
3. **Product Risk Analysis**
    
    - Identification and assessment of risks
    - Influences test thoroughness and scope
    - Used to determine test levels, techniques, effort, and priorities
4. **Product Risk Control**
    
    - Mitigation actions: selecting appropriate testers, independence level, review processes, test techniques
    - Risk monitoring to ensure effectiveness of actions

## 5.3. Test Monitoring, Control and Completion

1. **Metrics used in Testing**
    
    - Project progress metrics
    - Test progress metrics
    - Product quality metrics
    - Defect metrics
    - Risk and coverage metrics
    - Cost metrics
2. **Test Reports**
    
    - Test progress reports: regular updates on status, deviations, impediments
    - Test completion reports: summary of completed testing, quality evaluation, lessons learned
3. **Communicating Test Status**
    
    - Various options: verbal, dashboards, electronic, formal reports
    - Communication tailored to stakeholder needs

## 5.4. Configuration Management

- Identifies, controls, and tracks work products
- Records configuration items, relationships, and versions
- Enables traceability throughout the test process

## 5.5. Defect Management

- Workflow from discovery to closure
- Defect report objectives: provide information, track quality, improve processes
- Key defect report contents: identifier, summary, context, steps to reproduce, severity, priority, status