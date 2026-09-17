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
    const response = await fetch(`https://mybusiness.googleapis.com/v4/accounts/YOUR_ACCOUNT_ID/locations/${LOCATION_ID}/reviews`, {
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
async function postReplyToGoogle(reviewId, replyText) {
  console.log('🌍 Publishing reply to Google Maps...');
  
  if (!process.env.GOOGLE_ACCESS_TOKEN || !LOCATION_ID) {
    console.log('⚠️ Google API pending approval. Skipping actual publish.');
    return;
  }

  try {
    const response = await fetch(`https://mybusiness.googleapis.com/v4/accounts/YOUR_ACCOUNT_ID/locations/${LOCATION_ID}/reviews/${reviewId}/reply`, {
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
