# Tasks — Feature 001

**Status:** Planning tasks only; no application implementation has started.

## Phase 0 — Discovery and decisions
- [ ] T001 Inspect repository contents, existing application state, workflows, and deployment configuration.
- [ ] T002 Inspect target hosting/database/storage options and document free-tier limits and likely costs.
- [ ] T003 Resolve the open questions in `spec.md` with the owner.
- [ ] T004 Confirm catalog data source, clinical review owner, prescription workflow, and product publishing rules.
- [ ] T005 Verify official Al-Jaib and Flousak integration documentation and merchant access availability.
- [ ] T006 Approve stack, architecture, hosting, and cost implications before implementation.

## Phase 1 — Foundation
- [ ] T007 Scaffold the selected application architecture and reproducible development/build configuration.
- [ ] T008 Establish design tokens, Arabic RTL, English LTR, and responsive shell.
- [ ] T009 Create database schema and migrations for identity, catalog, orders, inventory, settings, and audit.
- [ ] T010 Implement authentication, secure owner bootstrap, sessions, RBAC, and authorization tests.

## Phase 2 — Catalog and storefront
- [ ] T011 Implement category/brand/product management and verified product publication workflow.
- [ ] T012 Implement secure image upload and product image gallery.
- [ ] T013 Implement Arabic/English catalog search, filters, sorting, and pagination.
- [ ] T014 Build home, category, catalog, and product detail pages backed by database records.

## Phase 3 — Commerce
- [ ] T015 Implement server-authoritative pricing, cart, discounts, and delivery fee rules.
- [ ] T016 Implement transactional stock reservation and oversell/concurrency tests.
- [ ] T017 Implement checkout validation, prescription verification gate, and idempotent order creation.
- [ ] T018 Implement customer profiles, addresses, order history, and ownership isolation tests.

## Phase 4 — Administration and inventory
- [ ] T019 Implement admin dashboard metrics from real database records.
- [ ] T020 Implement inventory movements, batch/expiry tracking, and low-stock alerts.
- [ ] T021 Implement order workflow, payment verification controls, and status audit history.
- [ ] T022 Implement employee management, least-privilege roles, and audit logs.
- [ ] T023 Implement reports, filters, and safe export.

## Phase 5 — Integrations and optional features
- [ ] T024 Implement payment adapter contracts and manual verification workflow.
- [ ] T025 Implement live wallet adapters only if official docs and merchant credentials are available.
- [ ] T026 Implement configurable server-side AI assistant with pharmacy safety boundaries and human escalation.
- [ ] T027 Implement consent-based reminders and notification preferences.
- [ ] T028 Implement in-app notifications and optional external provider adapters.
- [ ] T029 Implement marketing drafts, human approval, and publishing-history controls.

## Phase 6 — Verification and release
- [ ] T030 Run automated unit, integration, authorization, and end-to-end tests; record results.
- [ ] T031 Verify mobile/tablet/desktop layouts, Arabic RTL, English LTR, keyboard access, and accessibility.
- [ ] T032 Run security, dependency, privacy, and pharmacy-domain reviews.
- [ ] T033 Document installation, environment variables, migrations, backups, deployment, and admin bootstrap.
- [ ] T034 Deploy only after owner approval; verify production URL and critical smoke tests.
- [ ] T035 Produce evidence-based completion report with connected/pending/unavailable/not-verified integrations.

## Task rules
- Add tests before behavior changes and record the command/result used to run them.
- Each task must identify changed files and acceptance evidence when implementation begins.
- Do not mark a task complete because files were created; require verification.
- Tasks may be split into smaller tasks after stack and environment discovery.
