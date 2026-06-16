# 🤝 Contributing to PageGoblin

Thanks for your interest in making PageGoblin better! The goblin appreciates help.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/sayuru-akash/pagegoblin.git
cd pagegoblin

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL, AUTH_SECRET, ENCRYPTION_KEY

# Push database schema + seed
pnpm db:push
pnpm db:seed

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🛠️ Development Workflow

### Before You Code

1. **Check existing issues** — someone might already be working on it
2. **Open an issue** for new features or significant changes
3. **Keep PRs focused** — one feature/fix per PR

### Code Style

- **TypeScript strict mode** — no `any` unless absolutely necessary (and document why)
- **Zod validation** on all API inputs — never trust raw request bodies
- **Pure functions** for analysis logic — no side effects in the scoring engine
- **Descriptive commit messages** — follow [Conventional Commits](https://conventionalcommits.org)

### The Goblin Voice 🧌

All copy (complaints, verdicts, fixes) must follow the PageGoblin tone:

**Good:**
- "The hero section is doing interpretive dance instead of selling."
- "Your CTA is hiding like it owes someone money."

**Bad:**
- Personal insults against people
- Slurs, hate, or discriminatory language
- Extreme profanity
- Claims that a website will definitely fail

### Verification Checklist

Before submitting a PR, run:

```bash
pnpm verify   # env check + type-check + lint + build
pnpm test:run # unit tests (165+ passing)
pnpm e2e      # E2E tests (15 passing)
```

All three must pass.

## 🧪 Testing

### Unit Tests (Vitest)

```bash
pnpm test:run
```

Tests live in `__tests__/` directories next to the code they test. We aim for meaningful coverage of:
- Analysis engine (scoring, signals, complaints, fixes)
- API route handlers (status codes, error handling, validation)
- URL safety (SSRF prevention, private IP blocking)
- AI enhancer (guardrails, validation, fallback)

### E2E Tests (Playwright)

```bash
pnpm e2e
```

Smoke tests for all public pages, roast form flows, and navigation.

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router pages + API routes
│   ├── (public)/       # Marketing pages
│   ├── admin/          # Admin dashboard + settings
│   ├── api/            # REST API endpoints
│   └── dashboard/      # User dashboard
├── components/         # React components (brand, report, UI, motion)
├── lib/
│   ├── ai/            # AI enhancement layer (goblin prompt + enhancer)
│   ├── analysis/      # Deterministic scoring engine (FROZEN — do not modify)
│   ├── fetcher/       # SSRF-safe page fetcher
│   ├── reports/       # Report CRUD + serialization
│   └── admin/         # Admin service (API configs, settings)
└── generated/         # Prisma generated client (do not edit)
```

## 🐛 Reporting Bugs

Open a [GitHub issue](https://github.com/sayuru-akash/pagegoblin/issues) with:

1. **Title**: Short, descriptive
2. **Steps to reproduce**: Numbered list
3. **Expected vs actual behavior**
4. **Screenshots** (if visual)
5. **Environment**: Browser, OS, URL tested

## 📜 License

By contributing, you agree that your contributions are licensed under the MIT License.
