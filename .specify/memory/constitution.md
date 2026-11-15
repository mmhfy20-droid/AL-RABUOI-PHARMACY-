# AL-RUBOU'I PHARMACY — Project Constitution

## Purpose
Deliver a secure, reliable, Arabic-first pharmacy commerce platform. Customer safety, truthful product information, privacy, and operational integrity take precedence over feature count or visual polish.

## Non-negotiable principles
1. **Evidence over claims.** Never claim a feature, integration, test, or deployment works without direct verification and recorded evidence.
2. **Clinical safety.** Never fabricate medicine names, indications, dosage, contraindications, interactions, warnings, or regulatory status. Clinical content must have an identified authoritative source and qualified human review before publication.
3. **Server authority.** The server is authoritative for prices, discounts, stock, order totals, permissions, payment state, and order transitions. Never trust client-submitted totals or payment success.
4. **Privacy by design.** Minimize personal and health-related data. Enforce least privilege, tenant/customer isolation, retention controls, and auditability.
5. **Secure by default.** Validate inputs, encode outputs, hash passwords with a modern password-hashing algorithm, protect sessions, rate-limit sensitive endpoints, and keep secrets outside source control.
6. **Human approval for consequential actions.** Require authorized human approval for clinical content, payment verification where no official provider verification exists, and publication of marketing claims.
7. **Arabic-first accessibility.** Arabic is the default language with correct RTL behavior. English must use correct LTR behavior. Design responsively and accessibly across mobile, tablet, and desktop.
8. **Modular, maintainable engineering.** Prefer the simplest architecture supported by the verified target environment. Avoid unnecessary services and dependencies.
9. **Test behavior, not appearances alone.** Use automated tests where practical, regression coverage for fixes, and explicit manual verification for critical end-to-end workflows.
10. **Honest integrations.** External services remain pending until credentials, official documentation, implementation, and a successful live test are all present.

## Delivery gates
- Requirements and acceptance criteria must be reviewed before implementation.
- Technology and hosting choices must be based on an inspection of the actual target environment and cost constraints.
- Security, privacy, accessibility, and pharmacy-domain review are required before release.
- A release report must separate implemented, tested, connected, pending, unavailable, and not verified items.

## Owner approval required
Obtain explicit owner approval before incurring costs, enabling live payments or customer messaging, transferring customer data to third parties, publishing clinical claims, importing real customer/patient data, or deploying to a production domain.

## Change control
Record material decisions, assumptions, unresolved questions, and their impact in the feature specification and plan. Amend this constitution only through a documented change with a rationale.
