import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import postgres from 'postgres';

import { env } from '../src/config/index.js';

const seedFile = resolve(process.cwd(), 'database', 'seeds', 'seed.sql');
const sql = postgres(env.DATABASE_URL, { onnotice: () => {} });

try {
  const seedSql = await readFile(seedFile, 'utf8');

  // postgres.js protects pooled connections from transaction statements sent
  // through a normal query. The SQL file keeps BEGIN/COMMIT so it remains
  // runnable with psql; here we supply the transaction through sql.begin.
  const statements = seedSql
    .replace(/^\s*BEGIN\s*;\s*/i, '')
    .replace(/\s*COMMIT\s*;\s*$/i, '');

  await sql.begin(async (transaction) => {
    await transaction.unsafe(statements);
  });

  console.log(`Seed data loaded from ${seedFile}`);
} finally {
  await sql.end();
}
