import "dotenv/config";

const required = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "ENCRYPTION_KEY",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
] as const;

const optional = [
  "APP_URL",
  "APP_DOMAIN",
  "NEXT_PUBLIC_APP_URL",
  "AUTH_URL",
  "NEXTAUTH_URL",
  "DOCKER_BUILD",
] as const;

function mask(value: string): string {
  if (value.length <= 8) return "****";
  return value.slice(0, 4) + "****" + value.slice(-4);
}

console.log("=== Environment Verification ===\n");

let hasError = false;

for (const key of required) {
  const value = process.env[key];
  if (!value) {
    console.log(`  ✗ ${key} — MISSING (required)`);
    hasError = true;
  } else {
    console.log(`  ✓ ${key} = ${mask(value)}`);
  }
}

console.log();

for (const key of optional) {
  const value = process.env[key];
  if (value) {
    console.log(`  ✓ ${key} = ${mask(value)}`);
  } else {
    console.log(`  ○ ${key} — not set (optional)`);
  }
}

console.log();

if (hasError) {
  console.log("Status: FAIL — missing required variables");
  process.exit(1);
} else {
  console.log("Status: OK");
}
