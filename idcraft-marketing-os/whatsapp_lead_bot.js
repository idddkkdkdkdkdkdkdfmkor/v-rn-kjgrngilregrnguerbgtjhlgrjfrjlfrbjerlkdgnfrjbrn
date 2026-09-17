require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// ==========================================
// IDCraft India Growth OS - WhatsApp Lead Bot (Free Tier)
// ==========================================
// Strict Rules:
// 1. Uses whatsapp-web.js (100% Free, NO Meta Developer Account Needed).
// 2. Uses Pollinations.ai Text API for AI replies.
// 3. Captures leads and saves them to console (can be sent to Google Sheets later).
// ==========================================

console.log('🚀 Starting IDCraft WhatsApp Lead Bot...');

const client = new Client({
    authStrategy: new LocalAuth(), // Saves session so you only scan QR once
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Generate QR Code for login
client.on('qr', (qr) => {
    console.log('\n📱 SCAN THIS QR CODE WITH YOUR IDCraft WHATSAPP:\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ONLINE and listening for leads!');
});

client.on('message', async msg => {
    // Only respond to private messages (ignore groups)
    const chat = await msg.getChat();
    if (chat.isGroup) return;

    console.log(`\n📩 New message from ${msg.from}: ${msg.body}`);

    // Simple AI prompt for IDCraft Sales
    const prompt = `
    You are the friendly AI sales assistant for IDCraft India (manufacturing B2B corporate ID cards, RFID, lanyards).
    A potential customer just messaged on WhatsApp: "${msg.body}"
    
    Rules:
    - Keep it very short (1-2 sentences).
    - Ask a follow up question about how many cards they need or what type.
    - Mention Jagjeet Singh is available for volume pricing.
    - Output ONLY the exact text you want to send back.
    `;

    try {
        console.log('🤖 Generating AI Response...');
        // Use free Pollinations AI
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
        const replyText = await response.text();
        
        console.log(`📤 Sending Reply: ${replyText.trim()}`);
        await msg.reply(replyText.trim());
        
    } catch (err) {
        console.error('❌ AI Reply failed:', err.message);
        // Fallback message
        await msg.reply('Thank you for contacting IDCraft India! Our team is currently busy, but Mr. Jagjeet Singh will get back to you shortly. For urgent bulk orders, please call +91 9336522126.');
    }
});

client.initialize();
