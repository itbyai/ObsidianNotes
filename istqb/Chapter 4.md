I'll summarize the key points from the provided text in markdown format, keeping it in English.

# Software Testing Techniques and Management Summary

## 4. Test Analysis and Design

### 4.1 Test Techniques Overview

- Test techniques help develop systematic test cases and identify test conditions
- Three main categories:
    - **Black-box (specification-based)** techniques: based on analysis of specified behavior without reference to internal structure
    - **White-box (structure-based)** techniques: based on analysis of internal structure and processing
    - **Experience-based** techniques: leverage tester knowledge/experience; complementary to other approaches

### 4.2 Black-Box Test Techniques

#### 4.2.1 Equivalence Partitioning (EP)

- Divides data into partitions where all elements are processed the same way
- One test case per partition is sufficient
- Coverage = number of partitions exercised / total partitions
- Each Choice coverage required for multiple sets of partitions

#### 4.2.2 Boundary Value Analysis (BVA)

- Based on testing boundaries of equivalence partitions
- Two versions: 2-value BVA and 3-value BVA
- 3-value BVA is more rigorous (tests boundary value and both neighbors)
- Focus on boundaries where defects are more likely

#### 4.2.3 Decision Table Testing

- Tests combinations of conditions and their outcomes
- Coverage items are columns containing feasible combinations
- Effective for complex business rules and logic

#### 4.2.4 State Transition Testing

- Tests system behavior across different states and transitions
- Coverage criteria include:
    - All states coverage
    - Valid transitions coverage (0-switch)
    - All transitions coverage (includes invalid transitions)

### 4.3 White-Box Test Techniques

#### 4.3.1 Statement Testing

- Coverage items are executable statements
- Coverage = statements exercised / total executable statements
- 100% coverage ensures all statements executed at least once

#### 4.3.2 Branch Testing

- Coverage items are branches (transfers of control)
- Includes conditional and unconditional branches
- Branch coverage subsumes statement coverage

#### 4.3.3 Value of White-Box Testing

- Considers entire implementation
- Can detect defects even with vague specifications
- Provides objective measurement of coverage

### 4.4 Experience-Based Test Techniques

#### 4.4.1 Error Guessing

- Anticipates errors based on tester knowledge and experience
- Uses fault attacks to identify potential defects
- Based on previous failures and common software failures

#### 4.4.2 Exploratory Testing

- Tests are designed, executed, and evaluated simultaneously
- Often structured with session-based approach
- Useful with inadequate specifications or time pressure

#### 4.4.3 Checklist-Based Testing

- Uses checklists built from experience
- Checklists should be regularly updated
- Provides guidelines and consistency

### 4.5 Collaboration-Based Test Approaches

#### 4.5.1 Collaborative User Story Writing

- User stories follow the "3 C's": Card, Conversation, Confirmation
- Good stories follow INVEST principles: Independent, Negotiable, Valuable, Estimable, Small, Testable
- Created through collaboration between business, development, and testing

#### 4.5.2 Acceptance Criteria

- Define conditions for user story acceptance
- Can be scenario-oriented or rule-oriented
- Used for scope definition, consensus, and test basis

#### 4.5.3 Acceptance Test-Driven Development (ATDD)

- Test-first approach where test cases precede implementation
- Process includes specification workshops and test creation
- Test cases become executable requirements

