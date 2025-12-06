import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import { users } from '../src/lib/data/users';
import { parse } from 'pg-connection-string';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const config = parse(databaseUrl);
const { host, port, user, password, database } = config;

const adapter = new PrismaPg({
  host,
  port,
  user,
  password,
  database,
  ssl: true,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        username: user.username,
        password: hash,
      },
    });
  }
}

void main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
