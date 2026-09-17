require('dotenv').config();
const cron = require('node-cron');
const { spawn } = require('child_process');

console.log('====================================================');
console.log('🚀 IDCraft India - Production Automation Service Started');
console.log('====================================================');
console.log('This service will run continuously in the background.');
console.log('• Daily Google Post scheduled for 09:00 AM every day.');
console.log('• Review Replier scheduled for every 4 hours.');

function runScript(scriptName) {
  console.log(`\n[${new Date().toISOString()}] ⚡ Triggering ${scriptName}...`);
  
  const process = spawn('node', [scriptName], { stdio: 'inherit' });
  
  process.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ ${scriptName} exited with code ${code}`);
    } else {
      console.log(`✅ ${scriptName} completed successfully.`);
    }
  });
}

// 1. Daily Post Engine (Runs every day at 09:00 AM)
cron.schedule('0 9 * * *', () => {
  console.log('\n⏰ CRON TRIGGER: Running Daily Post Engine...');
  runScript('daily_post_engine.js');
});

// 2. Review Reply Engine (Runs every 4 hours)
cron.schedule('0 */4 * * *', () => {
  console.log('\n⏰ CRON TRIGGER: Checking for new reviews...');
  runScript('review_reply_engine.js');
});

console.log('⏳ Waiting for next cron trigger...\n');
