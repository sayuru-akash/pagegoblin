import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z.string().min(16),
  APP_URL: z.string().url().default("https://pagegoblin.org"),
  AUTH_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
});

const publicEnvSchema = z.object({
  APP_URL: z.string().url().default("https://pagegoblin.org"),
  APP_DOMAIN: z.string().default("pagegoblin.org"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;

let _serverEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (_serverEnv) return _serverEnv;

  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Invalid server environment variables: ${missing}`);
  }

  _serverEnv = result.data;
  return _serverEnv;
}

export function getPublicEnv(): PublicEnv {
  return publicEnvSchema.parse({
    APP_URL: process.env.APP_URL ?? "https://pagegoblin.org",
    APP_DOMAIN: process.env.APP_DOMAIN ?? "pagegoblin.org",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });
}
