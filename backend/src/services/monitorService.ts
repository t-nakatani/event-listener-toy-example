import { spawn } from 'child_process';
import path from 'path';

export const startMonitoring = (event: any) => {
  const monitorProcess = spawn('node', [
    path.join(__dirname, '../../../monitor-process/dist/index.js'),
    JSON.stringify(event),
  ]);

  monitorProcess.stdout.on('data', (data) => {
    console.log(`Monitor process output: ${data}`);
  });

  monitorProcess.stderr.on('data', (data) => {
    console.error(`Monitor process error: ${data}`);
  });

  monitorProcess.on('close', (code) => {
    console.log(`Monitor process exited with code ${code}`);
  });
};
