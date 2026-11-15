import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

try {
  const email = process.env.OWNER_EMAIL?.trim().toLowerCase();
  const password = process.env.OWNER_PASSWORD;
  const fullName = process.env.OWNER_NAME?.trim();

  if (!email || !password || !fullName) {
    throw new Error("Set OWNER_EMAIL, OWNER_PASSWORD, and OWNER_NAME in the environment before running this script.");
  }
  if (password.length < 16) throw new Error("OWNER_PASSWORD must contain at least 16 characters.");

  const existingOwner = await prisma.user.findFirst({ where: { role: "OWNER" } });
  if (existingOwner) throw new Error("An owner account already exists. Bootstrap is disabled after first use.");

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, fullName, passwordHash, role: "OWNER" },
  });
  process.stdout.write("Owner account created. Remove the bootstrap credentials from the environment now.\n");
} finally {
  await prisma.$disconnect();
}
