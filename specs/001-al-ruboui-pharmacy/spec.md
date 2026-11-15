# Feature 001 — Al-Rubou'i Pharmacy Platform

**Status:** Initial specification drafted from the owner's master prompt; clarification and owner review still required.  
**Product:** الربوعي فارماسي / Al-Rubou'i Pharmacy  
**AI assistant:** Zero / Al-Rubou'i (final display name to confirm)  
**Primary language:** Arabic (RTL). Secondary language: English (LTR).

## 1. Problem and outcome
Build a real, secure, responsive pharmacy e-commerce platform that enables customers to discover pharmacy products, place and track orders, and contact pharmacy staff. Authorized staff need controlled tools for catalog, inventory, orders, customers, employees, reports, notifications, and marketing drafts.

This is not a static mockup. Any feature described as functional must be backed by working application logic and verification.

## 2. Users and roles
- Guest shopper: browse and search published products; use guest cart if enabled.
- Registered customer: manage profile and addresses, cart, orders, preferences, and optional reminders.
- Owner: full administration and first-owner setup.
- Administrator: explicitly assigned administrative permissions.
- Pharmacist: review product/clinical information and prescription workflows within granted permissions.
- Inventory manager: stock, batches, expiry, and inventory movements.
- Order manager: order processing and fulfilment.
- Customer support: customer enquiries and permitted order visibility.
- Marketing manager: prepare and edit campaign drafts; cannot publish without approval.

Access must follow least privilege and server-side role-based authorization.

## 3. Customer requirements
### 3.1 Storefront
- Arabic-first home page with brand identity, navigation, search, cart count, database-driven featured/popular/new products, categories, offers, pharmacy information, and footer.
- English language switch with correct LTR layout; Arabic defaults to RTL.
- Responsive mobile, tablet, and desktop layouts with accessible controls and clear loading, empty, and error states.

### 3.2 Catalog and product detail
- Categories are administrator-managed and support descriptions, images, and ordering.
- Products support Arabic/English names, descriptions, images, brand, category, price, discount, SKU/barcode, manufacturer, specifications, stock/availability, prescription flag, and batch/expiry data where applicable.
- Clinical/usage/storage information is shown only when supplied and reviewed by authorized staff using an authoritative source.
- Search covers Arabic and English names, brand, category, SKU, barcode when available, and approved keywords; include useful normalization, suggestions, filters, sorting, and no-results states.
- Product details show image gallery, price, discount, stock, specifications, warnings where verified, quantity control, cart action, related products, and optional 3D model only when a valid model asset exists.

### 3.3 Cart and checkout
- Add/remove/update cart items; show server-calculated subtotal, discount, delivery charge, and total.
- Validate stock and price on the server; prevent quantities above available stock and duplicate order submission.
- Checkout collects only necessary customer name, phone, delivery address, city/area, delivery instructions, and payment method.
- Restricted products require an approved prescription verification process before fulfilment.
- Guest checkout is a configurable decision, not assumed.

### 3.4 Accounts and orders
- Registration, login, logout, password reset, profile, phone, saved addresses, order history/details, status tracking, and security settings.
- Customers can access only their own records.
- Order status history is retained and visible according to permissions.

## 4. Payment and fulfilment
- Payment architecture is modular for Al-Jaib Wallet, Flousak, and administrator-enabled cash on delivery.
- Use official provider documentation and verified APIs only. If no official API/credentials are available, implement a clearly labeled manual verification workflow.
- Payment states include pending, verification required, successful, failed, and cancelled. Idempotency and verified transaction references are required.
- Do not infer delivery zones, fees, service coverage, or address from the owner's phone number. Make these administrator-configurable after confirmation.

## 5. AI assistant
- Bilingual customer assistant with product-database lookup, category/product search help, supported product facts, suggested questions, conversation history with privacy controls, and escalation to human staff.
- AI provider is configurable server-side. Without configuration, clearly state AI is unavailable and retain ordinary catalog search.
- No diagnosis, prescribing, independent recommendation of prescription-only medicines, invented dosage/contraindications, or unsupported treatment claims. Escalate clinical judgement and urgent situations appropriately.
- No access to private customer/admin data unless a specific, authorized, minimized use case is designed and approved.

## 6. Optional medication reminders
- Customer-created medication name, reminder times/days, start/end dates, edit, pause, and delete.
- Explicit consent before notification activation; easy disable/revoke; no automatic dosing or schedule generation.
- Treat reminder data as sensitive and minimize retention/access.

## 7. Pharmacy contact
- Display Dr. Saleem Al-Rubou'i and the contact phone supplied by the owner: 776661463.
- Call and WhatsApp actions require validation of the correct international phone format and WhatsApp destination before being marked verified.
- Do not invent physical address, opening hours, social links, or delivery coverage; make them configurable.

## 8. Administration
- Secure dashboard with database-backed sales/order/customer/stock metrics.
- Product/category/brand/image management with validation and destructive-action confirmation.
- Inventory movements, adjustments, low/out-of-stock alerts, batch/expiry tracking, and actor/time audit records.
- Order search/filter, controlled status transitions, payment verification, fulfilment assignment, internal notes, and history.
- Employee lifecycle and role/permission management.
- Reports for sales, best sellers, stock, inventory value, orders, payments, and customer activity with date filters and appropriate export.
- Customer data access must be permission-scoped and audited.

## 9. Marketing and notifications
- Marketing module generates editable drafts for product promotions, announcements, and campaigns. All content remains unpublished until human approval.
- Social publishing only through official APIs and authorized accounts; otherwise provide approved copy/download output.
- In-app notifications for order/payment/stock/expiry/support/campaign events. Email/SMS/WhatsApp/push only when provider credentials and real tests exist.
- Medication reminders are separate, opt-in notifications.

## 10. Data and platform capabilities
Expected data domains: users, roles, permissions, profiles, addresses, products, categories, brands, product images, inventory, stock movements, batches, orders, order items, payments/transactions, reminders, notifications, AI conversations, marketing campaigns/drafts, settings, and audit logs.
The final schema and relationships are decided in the plan after stack/environment inspection.

Required platform properties: migrations, server-side validation, authorization, pagination, search/filtering, consistent errors, logging, backups, audit trails, secure file handling, and environment-based secrets.

## 11. Design and accessibility
- Premium dark interface: deep black/navy, electric blue/cyan accents, restrained glow, glass-like panels, subtle motion, premium Arabic typography, clean spacing, professional icons.
- Consistent design tokens/components for typography, colors, buttons, cards, forms, navigation, dialogs, notifications, loading/error/empty states.
- Correct Arabic RTL and English LTR; mobile-first and keyboard/accessibility support.
- Avoid unnecessary animation or effects that impair readability, performance, or accessibility.

## 12. Security and privacy
Secure authentication and password hashing; RBAC; customer record isolation; input validation/output encoding; SQL injection/XSS/CSRF protections as applicable; rate limits; secure sessions; safe uploads; API authorization; server-side pricing/stock; verified payment callbacks; secrets outside source control; audit logs; data minimization and retention controls.
Privacy policy and terms must be editable and reviewed for applicable local requirements. Do not claim legal/regulatory compliance without qualified review.

## 13. Acceptance criteria
1. Product and category content is loaded from the database, not hardcoded production arrays.
2. Arabic/English switching updates language and layout direction correctly.
3. Search works for supported Arabic and English product fields.
4. Cart and checkout totals are calculated and validated server-side.
5. Stock cannot be oversold through concurrent or manipulated client requests.
6. Customers cannot access another customer's orders, addresses, or reminders.
7. Employee access is limited by role and enforced server-side.
8. Order state changes and inventory movements are attributable and auditable.
9. Payment cannot become successful from an untrusted client action.
10. Restricted items cannot proceed to fulfilment without required verification.
11. AI assistant cannot present itself as a clinician or invent medical advice.
12. Reminders require explicit consent and can be disabled.
13. Marketing content cannot publish without authorized approval.
14. External integrations are accurately labeled connected/pending/unavailable and tested against real providers before being called connected.
15. Critical customer/admin flows have automated and/or documented manual verification evidence.
16. Deployment is called successful only after the production URL is opened and smoke-tested.

## 14. Open questions — must be resolved
- Confirm final AI assistant display name: Zero, Al-Rubou'i, or “Zero — Al-Rubou'i”.
- Confirm whether the supplied phone 776661463 is a Yemen number and approve its international/WhatsApp formatting.
- Confirm pharmacy physical address, opening hours, and actual delivery zones/fees (or leave unset).
- Confirm catalog source and who verifies clinical information; no invented seed catalog.
- Confirm whether guest checkout is allowed.
- Confirm which payment providers can supply official documentation, merchant credentials, and callback/webhook support.
- Confirm hosting provider, domain, budget ceiling, and whether the existing Higgsfield page is to be replaced or left untouched.
- Confirm which notification channels are required at launch.
- Confirm applicable operating jurisdiction and obtain qualified review for pharmacy, prescription, privacy, and e-commerce obligations.
- Confirm who may approve products, prescriptions, refunds, marketing, and payment verification.

## 15. Explicit exclusions until confirmed
No fake product catalog, fake medicine facts, fabricated address/hours/delivery coverage, unverified payment connection, live social publishing, real customer-data import, paid service activation, or production deployment without required owner approval.
