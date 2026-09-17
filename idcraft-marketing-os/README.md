# IDCraft India - AI Marketing Machine 🚀 (₹0/MONTH EDITION)

This is the production-grade implementation of the IDCraft Growth OS. It is strictly rules-based, engineered to eliminate AI hallucinations, and costs exactly **₹0 per month** using 100% free AI models.

## How it works for free:
- **Google Sheets Database**: Reads your public sheet directly using CSV parsing. **(No Google Cloud Service Account Keys needed!)**
- **AI Text Generation**: Uses `text.pollinations.ai` which provides GPT/LLaMA level text generation completely free, no API keys required.
- **AI Image Generation**: Uses `image.pollinations.ai` to instantly generate 1024x1024 photorealistic product images completely free, no API keys required.
- **Google Business Profile**: Publishes the post using standard free OAuth.

## Included Components

1. **`docker-compose.yml`**: The configuration to run **n8n** (the visual automation engine) locally if you prefer visual nodes.
2. **`daily_post_engine.js`**: The highly strict, production-level Node.js implementation of the Google Business Profile daily poster.

## How to use the Node.js Implementation (`daily_post_engine.js`)

This is the fastest, most reliable way to execute the workflow outlined in your document. It connects directly to your Google Sheet, applies strict keyword rules, generates content and images via Free AI, and publishes to Google My Business.

### 1. Setup
Create a `.env` file in this directory (Only needed for Google Business Profile publishing):
```env
# ONLY NEEDED FOR ACTUAL PUBLISHING TO MAPS
GOOGLE_LOCATION_ID="your-gmb-location-id"
GOOGLE_ACCESS_TOKEN="your-gmb-oauth-token"
```

*Note: You do NOT need OpenAI or Google Service Account keys anymore!*

### 2. Run the Engine
```bash
node daily_post_engine.js
```

You can set this script to run daily at 9:00 AM using a standard Windows Scheduled Task or PM2.

## How to use n8n

If you prefer to build out the visual drag-and-drop workflows as described in the guide:

1. Ensure Docker Desktop is installed and running on Windows.
2. Run this command in this folder:
   ```bash
   docker-compose up -d
   ```
3. Open `http://localhost:5678` in your browser.
4. You can visually recreate the nodes or add Google OAuth natively through the n8n UI.
