require('dotenv').config();
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch'); // we use dynamic import for node-fetch or native fetch in node > 18
const app = express();
const port = 3000;

// ==========================================
// Google Business Profile OAuth & Location Finder
// ==========================================

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/auth/google/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ ERROR: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env file!');
  process.exit(1);
}

const oAuth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

app.get('/', (req, res) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/business.manage', 'email', 'profile'],
  });
  res.send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h2>Connect IDCraft to Google Business Profile</h2>
      <p>Click the button below to authorize and fetch your Location ID.</p>
      <a href="${authorizeUrl}" style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-top: 20px;">Authorize with Google</a>
    </div>
  `);
});

app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.send('No authorization code provided.');

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    console.log('\n✅ Successfully Authenticated!');
    console.log('📌 ACCESS TOKEN (Save this to .env as GOOGLE_ACCESS_TOKEN):\n', tokens.access_token);
    if (tokens.refresh_token) {
      console.log('\n📌 REFRESH TOKEN (Save this to keep session alive):\n', tokens.refresh_token);
    }

    // Now let's fetch the business accounts and locations
    // 1. Get Accounts
    let html = `<div style="font-family: sans-serif; padding: 40px;"><h2>✅ Authentication Successful!</h2>`;
    html += `<p>Look at your terminal for the tokens, or see your Account & Location IDs below:</p>`;

    const globalFetch = globalThis.fetch || (await import('node-fetch')).default;

    const accountsRes = await globalFetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    
    if (!accountsRes.ok) {
        throw new Error('Failed to fetch accounts: ' + await accountsRes.text());
    }
    
    const accountsData = await accountsRes.json();
    const accounts = accountsData.accounts || [];

    if (accounts.length === 0) {
      html += `<p style="color: red;">No Google Business accounts found for this email.</p>`;
    } else {
      for (const account of accounts) {
        html += `<hr/><h3 style="color: #2563EB;">Account Name: ${account.accountName} (ID: ${account.name})</h3>`;
        console.log(`\n🏢 Found Account: ${account.accountName} [${account.name}]`);

        // 2. Get Locations for this account
        const locRes = await globalFetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title,storeCode`, {
          headers: { Authorization: `Bearer ${tokens.access_token}` }
        });
        
        const locData = await locRes.json();
        const locations = locData.locations || [];

        if (locations.length === 0) {
          html += `<p>No locations found under this account.</p>`;
        } else {
          html += `<ul>`;
          for (const loc of locations) {
            // loc.name looks like "locations/123456789"
            const locationId = loc.name.split('/')[1];
            html += `<li><strong>${loc.title}</strong><br/>Location ID: <code style="background:#eee;padding:4px;border-radius:4px;">${locationId}</code> (Save this to .env as GOOGLE_LOCATION_ID)</li>`;
            console.log(`📍 Found Location: ${loc.title}`);
            console.log(`📌 LOCATION_ID: ${locationId}`);
          }
          html += `</ul>`;
        }
      }
    }

    html += `</div>`;
    res.send(html);

    console.log('\n✅ All done! Copy the Location ID and Access Token to your .env file, then you can close this server.');

  } catch (error) {
    console.error('Error during token exchange:', error);
    res.send('Authentication failed! Check the terminal for errors.');
  }
});

app.listen(port, () => {
  console.log(`\n🚀 Google Business Profile Auth Server is running!`);
  console.log(`👉 Open http://localhost:${port} in your browser to start.`);
});
