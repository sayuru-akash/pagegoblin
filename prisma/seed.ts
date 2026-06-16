import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
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

  // Keys must match what the admin settings form & service read
  const settings = [
    { key: "siteTitle", value: "PageGoblin" },
    { key: "siteTagline", value: "The tiny goblin that judges your website" },
    { key: "defaultVisibility", value: "UNLISTED" },
    { key: "rateLimitPerHour", value: 20 },
    { key: "aiModeEnabled", value: false },
  ];

  for (const setting of settings) {
    await prisma.appSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: { key: setting.key, value: setting.value as unknown as Prisma.InputJsonValue },
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
