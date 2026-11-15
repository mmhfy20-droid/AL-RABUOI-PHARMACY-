# Implementation Plan — Feature 001

**Status:** Draft. Stack and hosting are intentionally undecided pending environment inspection.

## 1. Architecture decision process
Before choosing frameworks or managed services:
1. Inspect the repository, GitHub Actions/deployment options, available hosting, database support, file storage, and current application state.
2. Compare at least two viable stacks against: free-tier availability, Yemen accessibility, Android-friendly maintenance, security, relational data support, deployment complexity, backups, and future operating cost.
3. Document chosen stack, versions, service limits, and owner approval for any paid dependency.
4. Do not assume the preferred React/PostgreSQL stack is deployable until verified.

## 2. Proposed logical modules
- Storefront and localization (Arabic RTL / English LTR)
- Identity, sessions, profiles, roles, permissions
- Product catalog, categories, brands, images, search
- Cart, pricing, checkout, orders, order status
- Inventory, stock movements, batches, expiry
- Payments and manual verification
- Admin dashboard, employees, reports, audit
- AI assistant and human escalation
- Reminders and notification preferences
- Marketing drafts and approval workflow
- Configuration, privacy, terms, logging, backups

These are logical boundaries; they do not imply microservices. Prefer a modular monolith unless verified scale or operational requirements justify separate services.

## 3. Data integrity and transaction boundaries
- Persist money in an exact decimal representation or integer minor units; never use binary floating-point for authoritative totals.
- Snapshot product name/SKU/unit price/discount on order items so historical orders remain understandable.
- Recalculate prices and delivery fees on the server at checkout.
- Reserve/decrement inventory transactionally to prevent overselling; define cancellation/restock behavior.
- Make order creation and payment event handling idempotent.
- Keep payment state distinct from order fulfilment state.
- Record stock adjustments, batch changes, order transitions, payment verification, and privileged actions in audit history.

## 4. Security design requirements
- Enforce authorization on every protected server route/action.
- Separate customer, staff, and owner privileges.
- Use secure password hashing and session/cookie configuration appropriate to the selected framework.
- Add rate limiting to authentication, password reset, contact, and AI endpoints.
- Validate uploads by type, size, and content; store outside executable paths.
- Keep all secrets in deployment environment variables/secret storage.
- Define data retention and access rules for reminders and AI conversations.
- Add threat-model review before production release.

## 5. Integration strategy
- Payments: provider adapter interface; implement live adapter only from official docs and credentials; otherwise manual verification with audit trail.
- AI: server-side provider adapter; no browser key; safe fallback when unconfigured.
- Notifications: provider adapters with in-app baseline; external channels pending credentials and tests.
- Social platforms: official API only; draft/approval gate remains mandatory.
- 3D viewer: only when a valid approved model asset is supplied.

## 6. Delivery phases
1. Environment and repository audit; decisions and requirement clarification.
2. Project foundation, localization, design tokens, database migrations, authentication.
3. Catalog, categories, search, product detail and admin product management.
4. Cart, checkout, pricing, stock reservation, orders, customer account.
5. Inventory, batches, audit, staff roles, admin workflows, reports.
6. Payment manual workflow and verified provider adapters where possible.
7. Zero assistant, optional consent-based reminders, notification framework.
8. Marketing draft/approval module and optional official publishing integrations.
9. Security, accessibility, responsive, performance, backup, and regression verification.
10. Deployment and handover only after environment and owner approvals.

## 7. Quality gates
- Requirements checklist passes before implementation.
- Architecture and cost decisions approved before adding paid services.
- Automated tests for critical domain logic and authorization.
- Integration tests for database/API/payment adapters.
- End-to-end checks for customer and admin journeys.
- Manual mobile/RTL/LTR review.
- Security review and release audit.
- Production smoke test and rollback/backup instructions.

## 8. Decisions not yet made
- Frontend/backend framework and language
- Relational database provider
- Authentication/session strategy
- Image/file storage
- Hosting and domain
- Email/SMS/WhatsApp/push providers
- AI provider and cost ceiling
- Payment API availability
- Delivery-zone model
