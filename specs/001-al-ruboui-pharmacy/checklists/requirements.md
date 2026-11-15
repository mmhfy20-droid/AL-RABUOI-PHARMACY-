# Requirements Quality Checklist

Use this before approving the specification and again when material scope changes. A checked item means the requirement is clear and testable; it does not mean the feature has been implemented.

- [ ] Each customer and staff role has explicit allowed and forbidden actions.
- [ ] Every critical user journey has a defined success path and failure/empty states.
- [ ] Product and clinical data has a named source, reviewer, and publication rule.
- [ ] Prescription-required products have a defined verification and fulfilment gate.
- [ ] Cart, discount, delivery, tax/fee (if applicable), and final total rules are unambiguous.
- [ ] Inventory reservation, concurrent checkout, cancellation, and restocking behavior are defined.
- [ ] Payment success, failure, pending, duplicate callback, refund, and manual verification behavior are defined.
- [ ] Customer data isolation and employee least-privilege permissions are testable.
- [ ] Arabic/English localization and RTL/LTR behavior are testable.
- [ ] Reminder consent, disable/revoke, and retention behavior are defined.
- [ ] AI safety, escalation, privacy, and unconfigured fallback are defined.
- [ ] Marketing approval and publishing authorization are defined.
- [ ] Notification channels and provider dependencies are explicitly identified.
- [ ] Delivery coverage, fee, address, and operating hours are confirmed or left explicitly unconfigured.
- [ ] Hosting, domain, backups, budget, and operational ownership are confirmed.
- [ ] External integrations are not described as connected without credentials and successful tests.
- [ ] Acceptance criteria have observable verification methods.
- [ ] Applicable pharmacy, privacy, prescription, and commerce obligations are assigned for qualified review.
