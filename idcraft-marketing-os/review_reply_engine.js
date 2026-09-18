require('dotenv').config();
const fetch = globalThis.fetch || require('node-fetch');

// ==========================================
// IDCraft India Growth OS - Automatic Review Replier
// ==========================================
// Strict Production Rules:
// 1. NO PAID APIs. Uses 100% Free AI models (Pollinations.ai for Text).
// 2. Strict adherence to Local SEO reply rules.
// 3. Keep replies under 80 words.
// ==========================================

const LOCATION_ID = process.env.GOOGLE_LOCATION_ID; 

// Mock reviews for testing until Google API is approved
const PENDING_REVIEWS = [
  {
    reviewId: "review_123",
    reviewerName: "Rahul Sharma",
    starRating: 5,
    comment: "Got school ID cards for our institution in Lucknow. The CR80 PVC quality is fantastic and delivery was fast.",
    createTime: "2026-09-17T10:00:00Z"
  }
];

// 1. Fetch unreplied reviews from Google Business Profile
async function getUnrepliedReviews() {
  console.log('⭐ Checking Google Maps for new customer reviews...');
  
  if (!process.env.GOOGLE_ACCESS_TOKEN || !LOCATION_ID) {
    console.log('⚠️ Google API pending approval. Using test review from queue...');
    return PENDING_REVIEWS;
  }

  try {
    const accountRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { 'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}` }
    });
    if (!accountRes.ok) throw new Error("Could not fetch accounts.");
    const accountData = await accountRes.json();
    const accountName = accountData.accounts[0].name;

    const cleanLocationId = LOCATION_ID.includes('/') ? LOCATION_ID.split('/')[1] : LOCATION_ID;
    const response = await fetch(`https://mybusiness.googleapis.com/v4/${accountName}/locations/${cleanLocationId}/reviews`, {
      headers: { 'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}` }
    });

    if (!response.ok) throw new Error(await response.text());
    
    const data = await response.json();
    // Filter reviews that don't have a reply yet
    return (data.reviews || []).filter(review => !review.reviewReply);
  } catch (error) {
    console.error('❌ Error fetching reviews:', error.message);
    return [];
  }
}

// 2. Free AI Review Reply Generation (Strict Rules)
async function generateReplyWithFreeAI(review) {
  console.log(`🤖 Generating personalized reply for ${review.reviewerName}...`);
  
  const prompt = `
You are the customer service manager for IDCraft India.
Strict Rules:
- Thank the customer (${review.reviewerName}) by name.
- If they mentioned a product, acknowledge it.
- If they mentioned a city, acknowledge it to boost Local SEO.
- Keep the reply friendly, professional, and UNDER 80 WORDS.
- Output ONLY the reply text. No quotes, no intro.

Customer Review: "${review.comment}"
Star Rating: ${review.starRating}/5
  `;

  try {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
    const text = await response.text();
    return text.trim();
  } catch (err) {
    console.error('❌ Free AI Text failed:', err.message);
    throw err;
  }
}

// 3. Post Reply to Google Business Profile
async function postReplyToGoogle(reviewName, replyText) {
  console.log(`📤 Posting reply to ${reviewName}...`);

  // SUBSTITUTE ROUTE: Make.com Webhook Bypass
  if (process.env.MAKE_WEBHOOK_URL) {
    console.log('⚡ MAKE.COM BYPASS DETECTED! Sending review reply data to Make.com...');
    try {
      const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'review',
          reviewId: reviewName,
          replyText: replyText,
          locationId: LOCATION_ID
        })
      });
      if (response.ok) {
        console.log('✅ Successfully sent reply to Make.com! Make will publish it.');
        return;
      }
    } catch (err) {
      console.error('❌ Make.com bypass failed:', err.message);
    }
  }

  // STANDARD ROUTE: Direct Google API
  if (!process.env.GOOGLE_ACCESS_TOKEN) {
    console.log('⚠️ Missing Google OAuth Token in .env. Skipping actual publish.');
    return;
  }

  try {
    const accountRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { 'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}` }
    });
    if (!accountRes.ok) throw new Error("Could not fetch accounts.");
    const accountData = await accountRes.json();
    const accountName = accountData.accounts[0].name;

    const cleanLocationId = LOCATION_ID.includes('/') ? LOCATION_ID.split('/')[1] : LOCATION_ID;
    const response = await fetch(`https://mybusiness.googleapis.com/v4/${accountName}/locations/${cleanLocationId}/reviews/${reviewId}/reply`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: replyText })
    });

    if (!response.ok) {
      throw new Error(`Google API Error: ${await response.text()}`);
    }
    console.log(`✅ Successfully replied to review ${reviewId}!`);
  } catch (err) {
    console.error('❌ Publishing failed:', err.message);
  }
}

async function run() {
  console.log('🚀 Starting IDCraft Review Reply Engine (Free Tier Edition)...');
  try {
    const reviews = await getUnrepliedReviews();
    
    if (reviews.length === 0) {
      console.log('📭 No new reviews to reply to.');
      return;
    }

    for (const review of reviews) {
      console.log(`\n💬 Processing 5-star review from: ${review.reviewerName}`);
      
      // 1. Get Free AI Text
      const finalReply = await generateReplyWithFreeAI(review);
      console.log('\n📝 FINAL AI REPLY:\n');
      console.log(finalReply);
      
      // 2. Publish to Google
      await postReplyToGoogle(review.reviewId, finalReply);
    }
    
    console.log('\n✅ Workflow complete.');
  } catch (err) {
    console.error('❌ Automation failed:', err);
  }
}

run();
