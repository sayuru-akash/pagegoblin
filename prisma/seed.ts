import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hash } from "bcryptjs";
import { encryptSecret } from "../src/lib/crypto";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const connectionString = requiredEnv("DATABASE_URL");
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const adminEmail = requiredEnv("ADMIN_EMAIL");
  const adminPassword = requiredEnv("ADMIN_PASSWORD");
  const encryptionKey = requiredEnv("ENCRYPTION_KEY");

  console.log("Seeding database...");

  const passwordHash = await hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", passwordHash },
    create: {
      email: adminEmail,
      name: "Admin",
      role: "ADMIN",
      passwordHash,
    },
  });
  console.log("  ✓ Admin user");

  const settings = [
    { key: "site.name", value: { value: "PageGoblin" } },
    { key: "roast.defaultMode", value: { value: "DETERMINISTIC" } },
    { key: "ai.enabled", value: { value: false } },
    { key: "rateLimit.roastsPerHour", value: { value: 20 } },
  ];

  for (const setting of settings) {
    await prisma.appSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("  ✓ App settings");

  const placeholderKey = encryptSecret("", encryptionKey);

  await prisma.apiConfig.upsert({
    where: { name: "OpenAI Compatible" },
    update: {},
    create: {
      name: "OpenAI Compatible",
      providerType: "OPENAI_COMPATIBLE",
      baseUrl: "https://api.openai.com/v1",
      encryptedApiKey: placeholderKey,
      model: "gpt-4.1-mini",
      enabled: false,
    },
  });
  console.log("  ✓ Default API config");

  await prisma.$disconnect();
  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
