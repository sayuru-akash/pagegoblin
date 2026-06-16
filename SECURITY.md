# 🔒 Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | ✅ Active support  |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability in PageGoblin, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

### How to Report

1. Email **info@codezela.com** with the subject `PageGoblin Security Report`
2. Include a detailed description of the vulnerability
3. Provide steps to reproduce (if applicable)
4. We will acknowledge receipt within **48 hours**

### Response Timeline

| Stage | Target |
|-------|--------|
| Acknowledgment | 48 hours |
| Initial assessment | 5 days |
| Fix or mitigation | 30 days (severity dependent) |
| Public disclosure | After fix is deployed |

## Security Measures

PageGoblin implements the following security practices:

### 🔐 Authentication
- Auth.js v5 with JWT sessions
- bcrypt password hashing (12 rounds)
- Role-based access control (USER / ADMIN)
- Session expiry and rotation

### 🛡️ API Security
- SSRF protection on URL fetcher (blocks private IPs, localhost, metadata endpoints)
- DNS pinning to prevent rebinding attacks
- Request size limits (1.5 MB max)
- Timeout enforcement (8s default)
- Rate limiting (10 requests / 60s per IP for roast API)
- Zod input validation on all endpoints

### 🔑 Secret Management
- API keys encrypted at rest (AES-256-GCM)
- No secrets in source code or client bundles
- Environment variable validation at startup
- `.env` files gitignored

### 🌐 Web Security Headers
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (restricts camera, microphone, geolocation)

### 🧌 Extension Privacy
- Minimal permissions: `activeTab`, `scripting`, `storage` only
- No auto-scanning or background monitoring
- No remote code execution
- Private page warnings before data transmission
- Data minimization: only page signals extracted (no full HTML)

## Bug Bounty

We appreciate responsible disclosure. While we don't have a formal bounty program, contributors who report valid security issues will be credited (unless they prefer to remain anonymous).

## Contact

- **Security email:** info@codezela.com
- **GitHub:** [sayuru-akash/pagegoblin](https://github.com/sayuru-akash/pagegoblin)
