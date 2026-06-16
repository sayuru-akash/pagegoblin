# PageGoblin

The tiny goblin that judges your website.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Setup

Requires a running PostgreSQL instance. Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
# Edit DATABASE_URL, AUTH_SECRET, ENCRYPTION_KEY, ADMIN_EMAIL, ADMIN_PASSWORD
```

Push schema and seed:

```bash
pnpm db:push
pnpm db:seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | TypeScript type checking |
| `pnpm test:run` | Run analysis engine tests (Vitest) |
| `pnpm verify` | Full verification (env + type-check + lint + build) |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:seed` | Seed database with defaults |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm env:check` | Verify environment variables |

## Docker

```bash
DOCKER_BUILD=1 pnpm build
```

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev)
- [Prisma](https://prisma.io) 7 + PostgreSQL
- [Auth.js](https://authjs.dev) (Prisma adapter)
- [Zod](https://zod.dev)

## Analysis Engine

The deterministic analysis engine lives in `src/lib/analysis`. It is a set of pure functions — no AI calls, no network requests, no database access. Signals are validated with a Zod schema and all data is minimized before processing.

### Public API

| Export | Source | Description |
|--------|--------|-------------|
| `sanitizePageSignals` | `signals.ts` | Validates and sanitizes raw input via Zod |
| `detectPageRisk` | `signals.ts` | Flags private/internal pages (localhost, dashboard, admin, body-text keywords) |
| `analyzePage` | `engine.ts` | Full analysis pipeline: sanitize → risk → score → complaints → fixes → summary |
| `normalizePageUrl` | `url.ts` | Normalizes URL and extracts domain |
| `PageSignalsSchema` | `schema.ts` | Zod schema for input validation |
| `AnalysisResultSchema` | `schema.ts` | Zod schema for output validation |

## Safe Page Fetcher

The fetcher in `src/lib/fetcher` safely fetches web pages and extracts signals for analysis.

### Public API

| Export | Source | Description |
|--------|--------|-------------|
| `assertSafeFetchUrl` | `url-safety.ts` | Validates URL safety before fetching |
| `fetchPageHtml` | `page-fetcher.ts` | Fetches raw HTML with safety constraints |
| `fetchAndExtractSignals` | `page-fetcher.ts` | Fetches and extracts `PageSignals` in one call |
| `extractSignalsFromHtml` | `html-signals.ts` | Extracts signals from raw HTML |
| `PageFetchError` | `types.ts` | Typed fetch error with error codes |

### Safety Constraints

- **Protocol**: HTTP/HTTPS only
- **SSRF protection**: Private network IPs blocked (localhost, 10.x, 192.168.x, etc.)
- **DNS pinning**: Private IPs resolved via DNS are rejected
- **Redirect limit**: Configurable max redirects (default 3)
- **Timeout**: Configurable request timeout (default 8s)
- **Body cap**: Response size limit (default 1.5MB)
- **Content-type**: HTML-only responses accepted
- **Data minimization**: Full HTML is not persisted; only extracted signals are returned

### Tests

```bash
pnpm test:run
```

Includes fetcher safety tests, redirect handling, content-type validation, and signal extraction.

## AI Enhancement Layer

When an admin enables AI mode and configures an OpenAI-compatible API, users can opt into AI-enhanced roasts. The AI enhances the roast **copy** (verdict, complaints, fixes) while the **score stays deterministic** — the goblin score is always computed objectively from page signals.

### How it works

1. Admin configures an OpenAI-compatible API key in `/admin/api-config`
2. Admin enables AI mode in `/admin/settings`
3. Users see an optional "Goblin AI mode" toggle on the roast form
4. When enabled, the deterministic analysis runs first, then the AI sharpens the copy in goblin voice
5. Graceful fallback: if AI fails for any reason, the deterministic roast is used

### Public API

| Export | Source | Description |
|--------|--------|-------------|
| `enhanceRoastWithAI` | `ai/roast-enhancer.ts` | Enhances roast copy via OpenAI-compatible API with Zod validation + fallback |
| `buildSystemPrompt` | `ai/goblin-prompt.ts` | Goblin persona system prompt with strict guardrails |
| `buildUserPrompt` | `ai/goblin-prompt.ts` | Page-specific prompt with signals + deterministic findings |
| `getEnabledAiConfig` | `admin/service.ts` | Returns decrypted enabled API config for the enhancer |

## Admin Area

Admin users (role: `ADMIN`) get access to:

- **Dashboard** (`/admin`) — stats: total reports, users, avg score, weekly volume
- **API Config** (`/admin/api-config`) — add/test/toggle OpenAI-compatible API keys (encrypted at rest)
- **Settings** (`/admin/settings`) — AI mode toggle, rate limits, default visibility, branding

Admin authentication uses Auth.js v5 credentials provider with bcrypt-hashed passwords and JWT sessions.

## Chrome Extension

The companion Chrome extension lives at [sayuru-akash/pagegoblin-chrome-ext](https://github.com/sayuru-akash/pagegoblin-chrome-ext). It provides instant local roasts via the same deterministic engine, with on-demand page signal extraction (activeTab only).

## Playwright E2E Tests

```bash
pnpm e2e
```

Smoke tests for all public pages, roast form interactions, and site navigation.

## License

MIT © Sayuru Amarasinghe
