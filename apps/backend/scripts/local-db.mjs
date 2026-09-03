import { spawnSync } from 'node:child_process';

const action = process.argv[2];
const localDatabaseUrl =
  process.env.LOCAL_DATABASE_URL ??
  'postgresql://gdg_user:gdg_password@localhost:5432/gdg_challenges';
const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

if (!['setup', 'reset', 'seed'].includes(action)) {
  console.error('Usage: node scripts/local-db.mjs <setup|reset|seed>');
  process.exit(1);
}

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`Unable to run ${command}: ${result.error.message}`);
    return 1;
  }

  return result.status ?? 1;
}

if (action !== 'seed') {
  const composeAction = action === 'reset' ? 'reset' : 'up';
  const composeStatus = run(process.execPath, [
    'scripts/docker-compose.mjs',
    composeAction,
  ]);

  if (composeStatus !== 0) process.exit(composeStatus);
}

const localEnvironment = {
  ...process.env,
  DATABASE_URL: localDatabaseUrl,
};

const command = action === 'seed' ? 'db:seed' : 'db:migrate';
process.exit(run(pnpmCommand, ['run', command], localEnvironment));
