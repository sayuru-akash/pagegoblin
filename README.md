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

## License

MIT © Sayuru Amarasinghe
