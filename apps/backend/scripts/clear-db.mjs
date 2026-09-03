import postgres from 'postgres';

if (!process.argv.includes('--confirm')) {
  console.error(
    'Refusing to clear the database. Run this command again with --confirm if this is intentional:',
  );
  console.error('  pnpm db:clear -- --confirm');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production') {
  console.error('Refusing to clear a production database.');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required. Check apps/backend/.env.');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { onnotice: () => {} });

try {
  await sql.begin(async (transaction) => {
    await transaction.unsafe(`
      TRUNCATE TABLE
        attempts,
        points,
        user_streaks,
        challenges,
        categories,
        users
      CASCADE
    `);
  });

  console.log('Cleared development data from the configured DATABASE_URL database.');
} finally {
  await sql.end();
}
