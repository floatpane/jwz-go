# Security Policy

## Supported Versions

Only the latest release of jwz-go is supported with security updates.

## Reporting a Vulnerability

If you discover a security vulnerability in jwz-go, please report it responsibly. **Do not open a public issue.**

Email us at [us@floatpane.com](mailto:us@floatpane.com) with:

- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fixes (optional)

We will acknowledge your report within 48 hours and aim to provide a fix or mitigation plan within 7 days, depending on severity.

## Scope

This policy covers the jwz-go codebase and its official releases.

Of particular interest:

- Algorithmic complexity attacks via crafted `References` / `In-Reply-To` chains (cycles, deep nesting, ReDoS in subject normalization).
- Memory exhaustion from large or pathological header sets.
- Determinism failures (Build returning different output for identical input).

Third-party dependencies are outside our direct control, but we will work to address reported issues in them as quickly as possible.

## Disclosure

We ask that you give us reasonable time to address the issue before disclosing it publicly. We are committed to crediting reporters in release notes (unless you prefer to remain anonymous).
