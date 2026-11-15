# AL-RABUOI PHARMACY — Delivery Team

This is a role-based working structure. These profiles define responsibilities and review boundaries; they are not a claim that independent agents are running continuously or in parallel.

## Delivery team
1. **Project Lead / Coordinator** — owns scope, milestones, dependency tracking, decisions, and owner approvals.
2. **Product Analyst** — converts the owner's prompt into user stories, acceptance criteria, and unresolved questions.
3. **Solution Architect** — proposes application architecture, boundaries, data flow, and hosting options.
4. **UI/UX Designer** — designs the visual system, responsive journeys, accessibility, and interaction states.
5. **Frontend Engineer** — implements accessible, responsive customer and admin interfaces.
6. **Backend Engineer** — implements validated APIs, authentication, authorization, and business rules.
7. **Database Engineer** — designs schema, migrations, indexing, backups, and data integrity.
8. **Pharmacy Domain Reviewer** — checks catalog workflows and ensures clinical claims are never invented; requires qualified human approval for clinical content.
9. **Commerce Engineer** — handles cart, checkout, order lifecycle, pricing, and payment-state integrity.
10. **Inventory & Fulfilment Engineer** — handles stock, delivery zones, dispatch, and order tracking.
11. **Security Engineer** — threat-models authentication, access control, input validation, secrets, and privacy.
12. **SEO & Performance Engineer** — handles metadata, indexing, Core Web Vitals, and asset optimization.
13. **Release Engineer** — handles CI, build reproducibility, environment configuration, and deployment readiness.

## Independent review and QA team
14. **Code Reviewer** — reviews maintainability, correctness, and scope.
15. **Functional QA Engineer** — verifies user journeys and edge cases.
16. **Integration QA Engineer** — verifies API, database, and external service boundaries.
17. **Security QA Engineer** — verifies authorization, validation, data exposure, and dependency risks.
18. **Compatibility & Performance QA Engineer** — checks mobile layouts, browser support, and performance.
19. **Release Auditor** — checks evidence, known defects, rollback notes, and handover completeness.

## Collaboration protocol
- The Project Lead breaks work into bounded tasks and records dependencies.
- Product Analyst records assumptions separately from confirmed requirements.
- Architect proposes a design; implementation begins only after the owner approves the requirements and material architecture decisions.
- Engineers work in small changes with tests for behavior changes.
- Review and QA are separate gates; authors do not self-certify their own work.
- Defects are logged with reproduction steps, severity, expected result, and evidence.
- Fixes require regression tests and re-verification.
- The Release Auditor reports what was actually checked, what remains unverified, and any known limitations.

## Approval boundaries
Owner approval is required before:
- choosing paid services or incurring costs;
- enabling live payments, customer messaging, or third-party data transfer;
- publishing medicine claims or dosage information;
- importing real customer or patient data;
- deploying to a production domain or changing an existing live site.

## Completion rule
The project is not "ready" merely because files exist or a build succeeds. Readiness requires verified critical customer and admin flows, security review, responsive checks, tests, deployment verification, and a written list of remaining limitations.