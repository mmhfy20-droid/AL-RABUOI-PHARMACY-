---
name: spec-kit
description: Apply a specification-first development workflow to AL-Rubou'i Pharmacy. Use for requirements, architecture, implementation planning, task breakdown, consistency checks, implementation, and convergence.
---

# Spec Kit — Repository Workflow

This repository uses a Spec Kit-compatible, spec-driven development workflow. The official GitHub Spec Kit project is an open-source toolkit; its full CLI and agent command integration are not installed merely by adding this file. Follow the artifacts in `.specify/` and `specs/` as the repository's source of truth.

## Required sequence
1. **Constitution:** Read `.specify/memory/constitution.md` before planning or implementation.
2. **Specify:** Maintain the user-facing requirements, user stories, acceptance criteria, constraints, and open questions in the active `spec.md`.
3. **Clarify:** Resolve critical ambiguities with the owner. Never silently convert assumptions into requirements.
4. **Plan:** Record architecture, stack selection, data model, API boundaries, security, integrations, deployment, and operational decisions in `plan.md`. Choose technologies only after inspecting the real target environment.
5. **Checklist:** Validate requirement completeness, testability, safety, privacy, and consistency before implementation.
6. **Tasks:** Break work into dependency-ordered, testable tasks. Mark parallel-safe tasks only when they do not share mutable files or prerequisites.
7. **Analyze:** Cross-check spec, plan, tasks, constitution, and acceptance criteria. Resolve contradictions before coding.
8. **Implement:** Work in small increments. For behavior changes, use red-green-refactor: add a failing test, implement the smallest change, then run the relevant tests.
9. **Converge:** Compare the actual repository and test evidence against every task and acceptance criterion. Add remaining work as tasks; do not declare completion while critical gaps remain.

## Pharmacy-specific gates
- Product/medicine facts must not be invented. Track source, reviewer, and approval status for clinical information.
- Prescription-restricted products require a defined verification workflow before ordering/fulfilment.
- Payment success must come from a verified provider callback or an authorized manual verification process, never a customer click or unverified screenshot.
- Server-side logic owns price, discount, stock, totals, authorization, and order-state transitions.
- Medication reminders are optional, customer-entered, and require explicit consent.
- AI assistant outputs must not diagnose, prescribe, or invent dosage/medical claims; provide human escalation.
- Marketing content remains a draft until an authorized human approves it.
- Mark external integrations as connected only after an end-to-end test against the real provider.

## Evidence and status vocabulary
Use only: **implemented**, **automated-tested**, **manually-verified**, **connected**, **pending credentials**, **blocked**, **not available**, or **not verified**. A source file or placeholder alone is not evidence that a service is connected.

## Existing-project safety
Inspect existing files before editing. Preserve the existing team profiles and project guidance. Do not overwrite owner-authored material without fetching and reviewing the current version first.
