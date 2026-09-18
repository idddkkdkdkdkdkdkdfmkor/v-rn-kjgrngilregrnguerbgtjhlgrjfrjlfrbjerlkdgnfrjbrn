require('dotenv').config();
const { parse } = require('csv-parse/sync');

// ==========================================
// IDCraft India Growth OS - Daily Post Engine (₹0/MONTH EDITION)
// ==========================================
// Strict Production Rules:
// 1. NO PAID APIs. Uses 100% Free AI models (Pollinations.ai for Text & Images).
// 2. NO GOOGLE CLOUD KEYS needed to read the sheet (Reads public CSV).
// 3. Strict Keyword enforcement.
// ==========================================

const SPREADSHEET_ID = '11lK1Jp8-dyjBUJN9vXDsvMf_6AE8yqFCAgfYGba6WJ4';
const SHEET_NAME = 'Topics';
const LOCATION_ID = process.env.GOOGLE_LOCATION_ID; 
const PHONE_NUMBER = '9336522126';

// 1. Read Google Sheet (Zero API Keys required for public sheets)
async function getTodayTopic() {
  console.log('📊 Fetching content strategy directly from Google Sheets (No Keys Required)...');
  
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
  
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    // Parse CSV
    const rows = parse(csvText, {
      skip_empty_lines: true
    });

    // Find the first valid row (skipping headers at index 0)
    // Row mapping based on IDCraft's custom sheet:
    // 1: Date | 7: City | 9: Product | 11: Pre-written Content | 15: Keyword | 20: Image Prompt
    
    if (rows.length < 2) {
      console.log('No data found in sheet.');
      return null;
    }

    // Attempt to find a row matching today's date (YYYY-MM-DD)
    // IDCraft's date column is at index 1
    const todayStr = new Date().toISOString().split('T')[0];
    let todayRow = rows.find(r => r[1] === todayStr);

    if (!todayRow) {
      console.log(`⚠️ No specific topic found for ${todayStr}. Rotating to a standard topic...`);
      // Deterministic rotation based on the current day of the year to ensure a unique post every day
      // Math handles looping back to the start if we exceed the sheet length
      const start = new Date(new Date().getFullYear(), 0, 0);
      const diff = new Date() - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      
      const rowIndex = (dayOfYear % (rows.length - 1)) + 1; // +1 to skip header
      todayRow = rows[rowIndex];
    }

    return {
      date: todayRow[1],
      city: todayRow[7],
      product: todayRow[9],
      preWrittenContent: todayRow[11],
      keyword: todayRow[15],
      imagePrompt: todayRow[20]
    };

  } catch (error) {
    console.error('❌ Error reading Google Sheet CSV:', error.message);
    throw error;
  }
}

// 2. Free AI Text Generation (Strict Rules)
async function refineContentWithFreeAI(topic) {
  console.log('🤖 Refining content using Free AI LLM (Strict SEO Rules)...');
  
  const prompt = `
You are the elite Local SEO Manager for IDCraft India.
Strict Rules:
- Mention the city "${topic.city}" exactly 3 times naturally.
- Focus keyword must be used: "${topic.keyword}"
- Product focus: ${topic.product}
- Maintain the original intent: ${topic.preWrittenContent}
- Must include CTA to call ${PHONE_NUMBER}.
- Output ONLY the final post text (max 220 words). No intro/outro/pleasantries.
  `;

  try {
    // Pollinations Text API uses advanced models (like GPT/LLaMA) completely free with no keys
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
    const text = await response.text();
    return text.trim();
  } catch (err) {
    console.error('❌ Free AI Text failed:', err.message);
    throw err;
  }
}

// 3. Free AI Image Generation
function getFreeImageURL(imagePrompt) {
  console.log('🎨 Generating hyper-realistic product image via Free Image AI...');
  
  const strictPrompt = `Photorealistic commercial product photography for IDCraft India. ${imagePrompt}. NO TEXT. Professional lighting, 8k resolution.`;
  
  // Pollinations Image API generates high-quality images directly via GET request URL
  // We append &nologo=true to keep it clean for business use.
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(strictPrompt)}?width=1024&height=1024&nologo=true`;
  
  return imageUrl;
}

// 4. Post to Google Business Profile (Requires standard free OAuth)
async function postToGoogleBusinessProfile(content, imageUrl) {
  console.log('🌍 Publishing to Google Business Profile...');
  
  // SUBSTITUTE ROUTE: Make.com Webhook Bypass
  if (process.env.MAKE_WEBHOOK_URL) {
    console.log('⚡ MAKE.COM BYPASS DETECTED! Sending post data to Make.com for instant publishing...');
    try {
      const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'post',
          text: content,
          imageUrl: imageUrl,
          locationId: LOCATION_ID
        })
      });
      if (response.ok) {
        console.log('✅ Successfully sent to Make.com! Make will now publish it to Google.');
        return;
      }
    } catch (err) {
      console.error('❌ Make.com bypass failed:', err.message);
    }
  }

  // STANDARD ROUTE: Direct Google API (Requires Approval)
  if (!process.env.GOOGLE_ACCESS_TOKEN || !LOCATION_ID) {
    console.log('⚠️ Missing Google OAuth Token or Location ID in .env. Skipping actual publish.');
    return;
  }

  const postBody = {
    languageCode: "en-IN",
    summary: content,
    callToAction: {
      actionType: "CALL",
    },
    media: [
      {
        mediaFormat: "PHOTO",
        sourceUrl: imageUrl,
      }
    ]
  };

  try {
    // Dynamically fetch Account ID
    const accountRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { 'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}` }
    });
    
    if (!accountRes.ok) throw new Error("Could not fetch accounts. Ensure GBP API is enabled.");
    
    const accountData = await accountRes.json();
    const accounts = accountData.accounts || [];
    
    if (accounts.length === 0) throw new Error("No Google Business accounts found.");
    
    const accountName = accounts[0].name; // e.g., "accounts/1029384"
    
    // Construct proper posting URL
    const cleanLocationId = LOCATION_ID.includes('/') ? LOCATION_ID.split('/')[1] : LOCATION_ID;
    const postUrl = `https://mybusiness.googleapis.com/v4/${accountName}/locations/${cleanLocationId}/localPosts`;

    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API Error: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Successfully published to Google Maps directly!', data.searchUrl || '');
  } catch (err) {
    console.error('❌ Publishing failed:', err.message);
  }
}

async function run() {
  console.log('🚀 Starting IDCraft Daily Post Engine (Free Tier Edition)...');
  try {
    const topic = await getTodayTopic();
    if (!topic) return;

    console.log(`\n📌 Target: ${topic.city} | Keyword: ${topic.keyword}`);
    
    // 1. Get Free AI Text
    const finalPost = await refineContentWithFreeAI(topic);
    console.log('\n📝 FINAL POST CONTENT (From Free AI):\n');
    console.log(finalPost);

    // 2. Get Free Image URL
    const imageUrl = getFreeImageURL(topic.imagePrompt);
    console.log('\n🖼️ FREE AI IMAGE URL (Click to view):');
    console.log(imageUrl);
    
    // 3. Publish to Google
    await postToGoogleBusinessProfile(finalPost, imageUrl);
    
    console.log('\n✅ Workflow complete.');
  } catch (err) {
    console.error('❌ Automation failed:', err);
  }
}

run();
