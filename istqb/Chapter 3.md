# Static Testing

## 3.1 Static Testing Basics

### 3.1.1 Work Products Examinable by Static Testing

- Almost any work product can be examined: requirements, source code, test plans, test cases, product backlog items, documentation, contracts, models
- Products must be readable and understandable for reviews
- For static analysis, work products need formal structure
- Not appropriate: difficult to interpret items or those that shouldn't be analyzed by tools (e.g., 3rd party executables)

### 3.1.2 Value of Static Testing

- Detects defects in earliest SDLC phases (early testing principle)
- Identifies defects not detectable by dynamic testing (e.g., unreachable code)
- Evaluates quality and builds confidence in work products
- Creates shared understanding among stakeholders
- Improves communication between involved parties
- Reduces overall project costs despite initial implementation cost
- Detects certain code defects more efficiently than dynamic testing

### 3.1.3 Differences between Static Testing and Dynamic Testing

- Both aim to detect defects but with different approaches
- Static testing finds defects directly; dynamic testing causes failures requiring analysis
- Static testing can detect defects in rarely executed paths
- Static testing applies to non-executable work products; dynamic testing only to executable ones
- Static testing measures quality characteristics not dependent on execution; dynamic testing measures execution-dependent characteristics

**Defects easier to find through static testing:**

- Requirement defects (inconsistencies, ambiguities, contradictions)
- Design defects (inefficient database structures, poor modularization)
- Certain coding defects (undefined variables, unreachable code)
- Standard deviations (naming convention violations)
- Interface specification errors
- Security vulnerabilities (buffer overflows)
- Test coverage gaps

## 3.2 Feedback and Review Process

### 3.2.1 Benefits of Early and Frequent Stakeholder Feedback

- Early communication of potential quality problems
- Prevention of misunderstandings about requirements
- Earlier implementation of requirement changes
- Improved understanding for development team
- Focus on high-value features
- Positive impact on risk management

### 3.2.2 Review Process Activities

- **Planning**: Define scope, purpose, work product, quality characteristics, focus areas, exit criteria, standards, timeframes
- **Review initiation**: Ensure participants have access and understand their roles
- **Individual review**: Reviewers assess quality and identify anomalies using review techniques
- **Communication and analysis**: Analyze identified anomalies, make decisions on status, ownership, actions
- **Fixing and reporting**: Create defect reports, follow up on corrective actions, report results

### 3.2.3 Roles and Responsibilities in Reviews

- **Manager**: Decides what to review, provides resources
- **Author**: Creates and fixes the work product
- **Moderator/Facilitator**: Ensures effective meetings and safe environment
- **Scribe/Recorder**: Collates anomalies and records information
- **Reviewer**: Performs reviews (project member, subject matter expert, stakeholder)
- **Review leader**: Takes overall responsibility for the review

### 3.2.4 Review Types

- **Informal review**: No defined process, no formal documentation, focuses on detecting anomalies
- **Walkthrough**: Led by author, serves multiple objectives including education and consensus-building
- **Technical review**: Performed by technically qualified reviewers, led by moderator, focuses on consensus and decision-making
- **Inspection**: Most formal type, follows complete process, aims to find maximum anomalies, collects metrics for process improvement

### 3.2.5 Success Factors for Reviews

- Clear objectives and measurable exit criteria
- Appropriate review type selection
- Small chunks for better reviewer concentration
- Feedback to stakeholders and authors
- Adequate preparation time
- Management support
- Reviews embedded in organizational culture
- Adequate training for participants
- Effective meeting facilitation