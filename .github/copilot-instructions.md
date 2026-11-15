# Repository-wide instructions

- Work only on AL-RABUOI PHARMACY in this repository.
- Do not assume requirements that the owner has not supplied or approved.
- Until the owner provides the application prompt, limit changes to project governance, team definitions, and readiness documentation. Do not create product screens, business logic, database schemas, sample medicine catalogs, payment flows, or deployment configuration.
- Before implementation, inspect the existing stack and conventions. Do not replace working code or introduce a framework without approval.
- For every behavior change, follow test-driven development: add a test that demonstrates the expected behavior, implement the smallest change, then run the relevant tests.
- Review security, privacy, accessibility, responsive behavior, performance, and localization.
- Treat medicine names, indications, contraindications, dosage, stock, and prices as regulated/high-impact data. Never fabricate clinical information. Require an authoritative source and an explicit owner approval workflow.
- Payment, delivery, messaging, maps, and notification integrations must be represented honestly. Never label a mock or placeholder as a live integration.
- Do not commit secrets or real customer/patient data. Use documented environment-variable placeholders only.
- Do not claim tests passed unless they were actually run and the result is available.
- Keep changes focused, documented, and reviewable.