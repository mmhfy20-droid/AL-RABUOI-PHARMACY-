---
name: backend-api-quality
description: Implement secure and testable API behavior.
---

# Backend API Quality

1. Define request/response contracts and validation rules.
2. Enforce authentication and authorization server-side.
3. Validate and normalize all untrusted input.
4. Use safe errors and avoid leaking sensitive details.
5. Keep secrets in environment configuration, never source control.
6. Add tests for success, invalid input, unauthorized access, and failure paths.
7. Document rate limits, external dependencies, and unverified integrations.
