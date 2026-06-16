<div align="center">

# 🧌 PageGoblin

### The tiny goblin that judges your website.

**Drop a URL. Watch the goblin drag your page behind the shed.**

[![Live Site](https://img.shields.io/badge/🌐_Live-pagegoblin.org-4ade80?style=for-the-badge)](https://pagegoblin.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-165%20passing-4ade80?style=for-the-badge)](#testing)
[![Chrome Extension](https://img.shields.io/badge/Extension-WXT%20%2B%20React-purple?style=for-the-badge)](https://github.com/sayuru-akash/pagegoblin-chrome-ext)

</div>

---

## 🎯 What is PageGoblin?

PageGoblin is the **funny, memorable, founder-led website roast product**. It feels like a playful browser creature that brutally but usefully reviews a webpage. It is **not** a normal audit tool — it is a **conversion and trust teardown wrapped in goblin humour.**

> *"The hero section is doing interpretive dance instead of selling."*
> *"Your CTA is hiding like it owes someone money."*
> *"Pretty page. Weak pitch. Classic crime."*

### ✨ Features

- 🔥 **Instant Goblin Score** — Drop a URL and get a 0–100 score in seconds
- 🎭 **Goblin Complaints** — Trust gaps, dead CTAs, buzzword overload, buyer confusion — all roasted in goblin voice
- 🔧 **Actually Useful Fixes** — Every complaint comes with a real, actionable recommendation
- 📊 **Category Breakdown** — Trust Tax, CTA Corpse, Fluff Damage, Buyer Confusion, Conversion Friction
- 🤖 **AI-Enhanced Mode** — Optional AI sharpening of the roast copy (admin-configured, user-opt-in)
- 🔐 **Auth & Dashboard** — Save roasts, manage visibility, track history
- 🛡️ **Admin Panel** — Configure OpenAI-compatible APIs, manage settings, view stats
- 🔗 **Shareable Reports** — Public/unlisted/private visibility, copy summary, download markdown
- 🧌 **Chrome Extension** — Instant local roast from any tab with minimal permissions
- ⚡ **SSRF-Safe Fetcher** — Private IPs blocked, DNS pinning, size limits, timeout enforcement

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **UI** | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (strict) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) — custom Goblin design system |
| **Animations** | [Motion](https://motion.dev) (framer-motion) |
| **Database** | [Prisma 7](https://prisma.io) + PostgreSQL ([NeonDB](https://neon.tech)) |
| **Auth** | [Auth.js v5](https://authjs.dev) (credentials provider, JWT sessions) |
| **Validation** | [Zod](https://zod.dev) on every API input |
| **Testing** | [Vitest](https://vitest.dev) (165 unit tests) + [Playwright](https://playwright.dev) (15 E2E tests) |
| **Deployment** | [Vercel](https://vercel.com) + Docker (standalone) |
| **Domain** | [pagegoblin.org](https://pagegoblin.org) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ (via [nvm](https://github.com/nvm-sh/nvm))
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)
- PostgreSQL database (we recommend [NeonDB](https://neon.tech) — free tier)

### Installation

```bash
# Clone
git clone https://github.com/sayuru-akash/pagegoblin.git
cd pagegoblin

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your database URL, auth secret, encryption key

# Push database schema + seed admin user
pnpm db:push
pnpm db:seed

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `AUTH_SECRET` | Random string for JWT signing | ✅ |
| `ENCRYPTION_KEY` | 16+ char key for encrypting API keys | ✅ |
| `ADMIN_EMAIL` | Admin user email (for seeding) | ✅ |
| `ADMIN_PASSWORD` | Admin user password (for seeding) | ✅ |
| `APP_URL` | Public URL (e.g. `https://pagegoblin.org`) | ✅ |

---

## 📁 Project Structure

```
src/
├── app/                         # Next.js App Router
│   ├── page.tsx                 # 🏠 Homepage with roast form
│   ├── analyze/                 # 🔍 Dedicated analyze page
│   ├── roasts/[slug]/           # 📊 Full roast report page
│   ├── how-it-works/            # 📖 How it works
│   ├── examples/                # 🎨 Example roast cards
│   ├── privacy/                 # 🔒 Privacy policy
│   ├── terms/                   # 📜 Terms of service
│   ├── support/                 # 💬 Support/contact
│   ├── signin/                  # 🔑 Sign in page
│   ├── signup/                  # ✨ Sign up page
│   ├── dashboard/               # 📂 User dashboard (auth required)
│   ├── admin/                   # 🛡️ Admin panel (admin role)
│   │   ├── page.tsx             #    Dashboard stats
│   │   ├── api-config/          #    OpenAI API configuration
│   │   └── settings/            #    App settings
│   ├── api/                     # 🌐 REST API
│   │   ├── roasts/              #    Create + fetch roast reports
│   │   ├── share/               #    Sharing endpoints
│   │   ├── dashboard/           #    User dashboard data
│   │   ├── admin/               #    Admin-only endpoints
│   │   ├── auth/                #    Auth.js routes
│   │   └── settings/            #    Public + admin settings
│   ├── layout.tsx               # 🎨 Root layout + metadata
│   ├── globals.css              # 🎨 Global styles + Tailwind
│   ├── not-found.tsx            # 404 page (goblin themed)
│   ├── error.tsx                # Global error boundary
│   ├── loading.tsx              # Global loading state
│   ├── robots.ts                # 🤖 SEO robots.txt
│   ├── sitemap.ts               # 🗺️ SEO sitemap.xml
│   ├── manifest.ts              # 📱 PWA manifest
│   └── proxy.ts                 # 🛡️ Security headers middleware
├── components/
│   ├── brand/                   # 🧌 Goblin mascot, logo, eye
│   ├── report/                  # 📊 Score orb, complaints, fixes, verdict
│   ├── roast/                   # 🔥 URL roast form (with AI toggle)
│   ├── dashboard/               # 📂 Dashboard components
│   ├── admin/                   # 🛡️ Admin forms
│   ├── layout/                  # 🏗️ Header, footer
│   ├── motion/                  # ✨ Reveal, stagger, text animations
│   └── ui/                      # 🎨 Button, Card, Input, Badge, etc.
├── lib/
│   ├── analysis/                # 🧠 Deterministic scoring engine (FROZEN)
│   │   ├── engine.ts            #    Main pipeline
│   │   ├── scoring.ts           #    Category scores + goblin score
│   │   ├── signals.ts           #    Sanitize + risk detection
│   │   ├── roast-copy.ts        #    Verdicts, crimes, summaries
│   │   ├── schema.ts            #    Zod validation schemas
│   │   ├── types.ts             #    TypeScript interfaces
│   │   └── url.ts               #    URL normalization
│   ├── ai/                      # 🤖 AI enhancement layer
│   │   ├── goblin-prompt.ts     #    Persona system prompt + guardrails
│   │   ├── roast-enhancer.ts    #    OpenAI-compatible enhancer + fallback
│   │   └── types.ts             #    AI interfaces
│   ├── fetcher/                 # 🌐 SSRF-safe page fetcher
│   │   ├── page-fetcher.ts      #    Fetch HTML with safety limits
│   │   ├── html-signals.ts      #    Extract PageSignals from HTML
│   │   ├── url-safety.ts        #    SSRF protection (private IP blocking)
│   │   └── ip-check.ts          #    DNS resolution check
│   ├── reports/                 # 📝 Report CRUD + serialization
│   ├── admin/                   # 🛡️ Admin service (API configs, settings)
│   ├── auth-guards.ts           # 🔐 Role-based route protection
│   ├── crypto.ts                # 🔑 AES-256-GCM encryption
│   ├── rate-limit.ts            # ⏱️ In-memory rate limiter
│   ├── db.ts                    # 🗄️ Prisma client singleton
│   ├── env.ts                   # ✅ Environment validation
│   └── utils.ts                 # 🔧 Shared utilities
├── generated/                   # ⚙️ Prisma generated client
└── types/                       # 📝 Type augmentations
```

---

## 🧠 The Goblin Scoring Engine

The deterministic analysis engine is the **heart** of PageGoblin. It is a set of pure functions — no AI, no network, no database. It produces **identical scores** every time for the same input.

### How the Goblin Scores

| Category | What it measures | Weight |
|----------|-----------------|--------|
| 🛡️ **Trust Tax** | Testimonials, case studies, client logos, security badges, contact info | 20% |
| 💀 **CTA Corpse** | CTA presence, specificity, competing actions, weak vs strong CTAs | 25% |
| 📢 **Fluff Damage** | Buzzword density, vague copy, substance vs filler | 15% |
| 😵 **Buyer Confusion** | H1 clarity, offer specificity, who/what/outcome signals | 25% |
| 🔄 **Conversion Friction** | Next-step clarity, trust near CTA, friction points | 15% |

The **Goblin Score** (0–100) is a weighted average — clarity and CTA strength matter most.

### Goblin Verdicts by Score

| Score | Verdict |
|-------|---------|
| 85–100 | "Your page is dangerously competent. The goblin has nothing to roast. Suspicious." |
| 70–84 | "Solid page. A few goblin grumbles, but you clearly tried. Respect." |
| 55–69 | "Mediocre. Like a sandwich with no filling — structurally there, but disappointing." |
| 40–54 | "Oof. Your page is confusing, vague, and desperately needs a CTA intervention." |
| 25–39 | "This page is a conversion crime scene. The goblin is filing a police report." |
| 0–24 | "The goblin has fainted. Revive it by adding literally any trust signals." |

---

## 🤖 AI Enhancement Layer

When an admin enables AI mode and configures an OpenAI-compatible API, users can opt into AI-enhanced roasts:

```
User toggles AI → Deterministic analysis runs first → 
AI enhances the COPY (verdict, complaints, fixes) → 
Score stays 100% deterministic (objective) →
Graceful fallback if AI fails
```

**Guardrails baked into the system prompt:**
- ✅ Roast the webpage, never the people
- ✅ No slurs, hate, or harassment
- ✅ No extreme profanity — witty, not crude
- ✅ Every complaint includes a genuinely useful fix
- ✅ Stay focused on trust, clarity, CTA, copy, conversion

---

## 🛡️ Admin Panel

Admin users (`role: ADMIN`) get access to:

| Page | Features |
|------|----------|
| `/admin` | Dashboard: total reports, users, avg score, weekly volume |
| `/admin/api-config` | Add/test/toggle OpenAI-compatible API keys (AES-256 encrypted at rest) |
| `/admin/settings` | AI mode toggle, rate limits, default visibility, branding |

---

## 🌐 API Reference

### Public Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/roasts` | Create a roast from `{ url }` or `{ signals }` |
| `GET` | `/api/roasts/[slug]` | Fetch a roast report by slug |
| `GET` | `/api/settings/public` | Public settings (AI availability) |
| `POST` | `/api/auth/signup` | Create a new account |
| `GET/POST` | `/api/auth/[...nextauth]` | Auth.js handlers |

### Authenticated Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/dashboard/roasts` | User | User's roast history (paginated) |
| `PATCH/DELETE` | `/api/dashboard/roasts/[slug]` | User | Update visibility / delete roast |
| `GET/PATCH/POST/DELETE` | `/api/admin/api-config` | Admin | CRUD for API configurations |
| `POST` | `/api/admin/api-config/[id]/test` | Admin | Test API connection |
| `GET/PATCH` | `/api/admin/settings` | Admin | Read/update app settings |

### Rate Limiting

- **Roast API**: 10 requests per 60 seconds per IP
- **Auth API**: Built-in Auth.js protections
- Headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## 🔒 Security

### SSRF Protection

The page fetcher blocks:
- Private IPs (localhost, 10.x, 192.168.x, 172.16-31.x)
- DNS rebinding attacks (DNS pinning)
- Non-HTTP(S) protocols
- Responses > 1.5 MB
- Redirects > 3 hops
- Non-HTML content types

### Security Headers

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

See [SECURITY.md](SECURITY.md) for the full policy.

---

## 🧪 Testing

### Unit Tests (Vitest) — 165 passing

```bash
pnpm test:run
```

Covers: analysis engine, scoring, URL safety, SSRF prevention, HTML signal extraction, API routes, AI enhancer.

### E2E Tests (Playwright) — 15 passing

```bash
pnpm e2e
```

Covers: all public page rendering, roast form flow, navigation, validation errors.

### Full Verification

```bash
pnpm verify  # env check + type-check + lint + build
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm type-check` | TypeScript strict check |
| `pnpm test:run` | Unit tests |
| `pnpm e2e` | E2E tests |
| `pnpm verify` | Full verification suite |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:seed` | Seed admin user + default settings |
| `pnpm db:studio` | Open Prisma Studio |

---

## 🐳 Docker

```bash
# Build
docker build -t pagegoblin .

# Run (requires env vars at runtime)
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e AUTH_SECRET="..." \
  -e ENCRYPTION_KEY="..." \
  pagegoblin
```

The Dockerfile uses Next.js standalone output for minimal image size.

---

## 🧌 Chrome Extension

The companion Chrome extension lives at [sayuru-akash/pagegoblin-chrome-ext](https://github.com/sayuru-akash/pagegoblin-chrome-ext).

- **Instant local roast** — Goblin Score computed in the popup, no server needed
- **Minimal permissions** — `activeTab`, `scripting`, `storage` only
- **No auto-scanning** — The goblin only wakes when you click
- **Private page warnings** — Localhost, dashboards, and login pages trigger warnings

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, code style, and the goblin voice guide.

---

## 📄 License

MIT © [Sayuru Amarasinghe](https://github.com/sayuru-akash)

---

<div align="center">

**🧌 Built with goblin energy by [Sayuru](https://github.com/sayuru-akash)**

[🌐 pagegoblin.org](https://pagegoblin.org) · [📦 GitHub](https://github.com/sayuru-akash/pagegoblin) · [📧 info@codezela.com](mailto:info@codezela.com)

</div>
