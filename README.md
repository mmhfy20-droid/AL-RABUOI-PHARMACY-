# AL-RUBOU'I PHARMACY

**الربوعي فارماسي | Al-Rubou'i Pharmacy**

Arabic-first pharmacy e-commerce application. This repository is now an application foundation under active implementation; it is not yet production-ready.

## Technology baseline
- Next.js 16.4.6 / React 19.3.1 / TypeScript
- PostgreSQL with Prisma ORM 7.10.1 and the PostgreSQL driver adapter
- Zod request validation, bcryptjs password hashing, and signed HttpOnly session cookies
- Vitest unit tests and GitHub Actions CI

Versions were selected from current stable release lines; the target hosting provider and database service remain unselected until their availability, limits, and costs are confirmed.

## Current implementation
- [x] Spec-driven project constitution, specification, plan, tasks, and quality checklist
- [x] Next.js application shell with Arabic RTL dark premium styling
- [x] Storefront reads active categories and published products from PostgreSQL when configured
- [x] Database-backed category, product detail, and bilingual-field search routes
- [x] PostgreSQL Prisma schema for users, roles, catalog, stock, batches, orders, payments, reminders, notifications, marketing, and audit records
- [x] Customer registration/login/logout API endpoints with password hashing and signed HttpOnly cookies
- [x] Customer login and registration pages
- [x] Customer account page with own-order listing
- [x] Persistent customer cart with server-side stock checks, quantity updates, and item removal
- [x] AL-RABUOI assistant identity, Arabic assistant page, guarded chat API contract, readiness checks, and setup guide
- [x] Role permission matrix and database-backed admin dashboard access guard
- [x] One-time owner bootstrap script requiring secure environment variables
- [x] Commerce domain tests for order totals and allowed status transitions
- [x] Authentication input validation tests
- [x] CI workflow for Prisma validation, tests, type checking, and production build
- [ ] Database migrations generated and applied to a real PostgreSQL database
- [ ] Rate limiting and complete security hardening
- [ ] Checkout and transactional order creation (not implemented yet)
- [ ] Password reset, email/phone verification, and robust distributed rate limiting
- [ ] Admin UI and server-enforced role permissions
- [ ] AL-RABUOI provider credentials, model adapter, verified knowledge retrieval, pharmacist escalation, and assistant integration tests
- [ ] Payment, notification, and WhatsApp integrations
- [ ] Hosting selection, deployment, and production smoke test

## Run locally
Requirements: Node.js 22.12+ and npm.

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a PostgreSQL database you control.
3. Set `AUTH_SECRET` to a unique random secret of at least 32 characters.
4. Install dependencies: `npm install`.
5. Generate the Prisma client: `npm run db:generate`.
6. Validate the schema: `npm run db:validate`.
7. After a migration has been created and reviewed, apply it with `npm run db:migrate:deploy`.
8. Start development: `npm run dev`.

## Owner account
Set `OWNER_EMAIL`, `OWNER_PASSWORD` (at least 16 characters), and `OWNER_NAME` securely in the environment, then run `npm run bootstrap:owner` once. The script refuses to create a second owner. Remove the bootstrap password from the environment after use.

## Health endpoint
`GET /api/health` reports whether the database is configured and reachable. It does not expose connection details.

## Integrations
Al-Jaib, Flousak, the AL-RABUOI model provider, email, SMS, WhatsApp messaging, and push notifications are **not connected**. The AL-RABUOI page and guarded API placeholder exist, but the chat is intentionally disabled until credentials and a provider adapter are supplied and tested. Their credentials and official provider access have not been supplied or verified. No payment can be marked successful through a customer action.

## Pharmacy safety
No medicine catalog is fabricated. Clinical and usage information must be sourced and reviewed by qualified pharmacy staff before publication. Restricted products require a verified workflow before fulfilment.

## Spec-driven workflow
See `.specify/memory/constitution.md`, `.github/skills/spec-kit/SKILL.md`, and `specs/001-al-ruboui-pharmacy/`.

## Current limitations
This is an early implementation foundation. Automated CI results and real database connectivity must be checked before treating the build as verified. No production URL exists yet.
