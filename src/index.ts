import { spawn } from 'child_process';

async function main() {
  spawn('ls', { stdio: 'inherit' });
}

main().catch(err => {
  console.error('error', err);
});
