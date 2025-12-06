import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { parse } from 'pg-connection-string';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
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

    super({ adapter });
  }
}
