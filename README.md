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

## License

MIT © Sayuru Amarasinghe
