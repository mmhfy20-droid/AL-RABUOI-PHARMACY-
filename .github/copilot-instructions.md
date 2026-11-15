# Repository-wide instructions

- Work only on AL-RUBOU'I PHARMACY in this repository.
- Read `.specify/memory/constitution.md` and the active feature files under `specs/001-al-ruboui-pharmacy/` before planning or changing behavior.
- Use the repository's Spec Kit-compatible workflow documented in `.github/skills/spec-kit/SKILL.md`: specify, clarify, plan, checklist, tasks, analyze, implement, and converge.
- Keep confirmed requirements, assumptions, decisions, and unresolved questions separate. Do not silently turn assumptions into requirements.
- The owner has supplied the master prompt; implementation may proceed after critical ambiguities, architecture, and cost decisions are resolved and documented.
- Before implementation, inspect the existing stack and target deployment environment. Do not introduce a framework or paid service without evidence that it is supported and owner approval where cost is involved.
- For every behavior change, follow test-driven development: add a test that demonstrates the expected behavior, implement the smallest change, then run the relevant tests.
- Review security, privacy, accessibility, responsive behavior, performance, and localization.
- Treat medicine names, indications, contraindications, dosage, stock, and prices as high-impact data. Never fabricate clinical information. Require an authoritative source and explicit qualified review before publication.
- Payment, delivery, messaging, maps, and notification integrations must be represented honestly. Never label a mock or placeholder as a live integration.
- Do not mark a payment successful based on a customer click or unverified screenshot.
- Medication reminders require explicit customer consent; marketing content requires authorized human approval before publication.
- Do not commit secrets or real customer/patient data. Use documented environment-variable placeholders only.
- Do not claim tests passed unless they were actually run and the result is available.
- Keep changes focused, documented, reviewable, and consistent with the active specification.
