import { spawnSync } from 'node:child_process';

const action = process.argv[2];
const composeFile = 'database/docker-compose.yml';
const dockerCommand = process.platform === 'win32' ? 'docker.exe' : 'docker';
const actions = new Set(['up', 'down', 'reset']);

if (!actions.has(action)) {
  console.error('Usage: node scripts/docker-compose.mjs <up|down|reset>');
  process.exit(1);
}

function runDocker(args) {
  const result = spawnSync(dockerCommand, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`Unable to run Docker: ${result.error.message}`);
    return 1;
  }

  return result.status ?? 1;
}

function dockerIsRunning() {
  const result = spawnSync(dockerCommand, ['info'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  return !result.error && result.status === 0;
}

if (!dockerIsRunning()) {
  if (action === 'down') {
    console.log('Docker is not running; there is no local container to stop.');
    process.exit(0);
  }

  console.error(
    'Docker Desktop is not running. Start it first, or use the Supabase workflow: pnpm db:setup.',
  );
  process.exit(1);
}

const composeArgs = ['compose', '-f', composeFile];

if (action === 'up') {
  process.exit(runDocker([...composeArgs, 'up', '-d', '--wait', 'postgres']));
}

if (action === 'down') {
  process.exit(runDocker([...composeArgs, 'down']));
}

const downStatus = runDocker([...composeArgs, 'down', '-v']);
if (downStatus !== 0) process.exit(downStatus);

process.exit(runDocker([...composeArgs, 'up', '-d', '--wait', 'postgres']));
