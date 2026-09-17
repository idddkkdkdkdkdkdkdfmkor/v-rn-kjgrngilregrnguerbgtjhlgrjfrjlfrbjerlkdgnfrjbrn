import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export const MarketingGuidePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>AI Marketing Machine Guide | IDCraft India</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-brand-primary p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            IDCraft India AI Marketing Machine (₹0/month)
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            Complete Step-by-Step Automation Guide & Growth OS
          </p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-12 text-slate-700 text-lg leading-relaxed">
          
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <p className="font-medium text-blue-900">
              This is the setup I'd build if IDCraft India was my own business. It turns Google Business into an AI employee that works every day: creates posts, replies to reviews, tracks leads, and improves local SEO automatically.
            </p>
            <p className="mt-4 text-blue-800">
              <strong>End result:</strong> Every morning at 9 AM, IDCraft India publishes an SEO-optimized Google Business post with an image, replies to new reviews, updates a Google Sheet dashboard, and prepares content for Delhi, Noida, Ghaziabad, Lucknow, and Pan India. This is possible through Google Business Profile APIs and automation platforms like n8n.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">What We're Building (Architecture)</h2>
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">One AI Employee for Google Business</h3>
            <p className="mb-6">Everything runs automatically after the initial setup. Every box is one node in n8n. n8n has built-in Google Business Profile nodes for posts and reviews.</p>
            
            <div className="bg-slate-50 p-6 rounded-xl border">
              <h4 className="font-bold text-slate-900 mb-4">Automation Flow:</h4>
              <ol className="list-decimal pl-5 space-y-2 font-medium">
                <li>Schedule (9:00 AM Daily)</li>
                <li>Google Sheets (Topics + Cities + Products)</li>
                <li>ChatGPT / GPT-4 (Generate SEO Post + Caption + CTA)</li>
                <li>AI Image Generator (Create CR80 Product Image)</li>
                <li>Google Business Profile API (Publish Post • Upload Photo • CTA)</li>
                <li>Review Monitor (Reply Automatically + Save Reviews)</li>
                <li>IDCraft SEO Dashboard update</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">PHASE 1 — Create the Brain (Google Sheets Database)</h2>
            <p className="mb-4"><strong>Time:</strong> 20 minutes</p>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Why Google Sheets?</h3>
            <p className="mb-6">Google Sheets becomes the memory of your marketing AI. Instead of asking ChatGPT every day "write today's post", the AI reads today's topic from the sheet.</p>
            
            <h4 className="font-bold text-slate-900 mb-2">Drive Folder Structure:</h4>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-slate-200 border">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sheet Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Purpose</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr><td className="px-6 py-4 font-medium text-slate-900">Topics</td><td className="px-6 py-4">Daily content ideas.</td></tr>
                  <tr><td className="px-6 py-4 font-medium text-slate-900">Reviews</td><td className="px-6 py-4">Store every Google review.</td></tr>
                  <tr><td className="px-6 py-4 font-medium text-slate-900">Products</td><td className="px-6 py-4">Price list.</td></tr>
                  <tr><td className="px-6 py-4 font-medium text-slate-900">Photos</td><td className="px-6 py-4">Product photos.</td></tr>
                  <tr><td className="px-6 py-4 font-medium text-slate-900">Analytics</td><td className="px-6 py-4">Performance tracking.</td></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-bold text-slate-900 mb-2">Topics Sheet Structure:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-600">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-600">Topic</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-600">City</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-600">Keywords</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                  <tr><td className="px-4 py-2">18 Sept</td><td className="px-4 py-2">GD Goenka Student IDs</td><td className="px-4 py-2">Lucknow</td><td className="px-4 py-2">school ID card Lucknow</td><td className="px-4 py-2 text-orange-600 font-medium">Pending</td></tr>
                  <tr><td className="px-4 py-2">19 Sept</td><td className="px-4 py-2">RFID Staff Card</td><td className="px-4 py-2">Delhi</td><td className="px-4 py-2">RFID employee card Delhi</td><td className="px-4 py-2 text-orange-600 font-medium">Pending</td></tr>
                  <tr><td className="px-4 py-2">20 Sept</td><td className="px-4 py-2">CR80 Smart ID Cards</td><td className="px-4 py-2">Ghaziabad</td><td className="px-4 py-2">PVC ID card Ghaziabad</td><td className="px-4 py-2 text-orange-600 font-medium">Pending</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 italic">The AI reads only Pending rows and publishes one each day.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">PHASE 2 — Setup Google Business API</h2>
            <p className="mb-4"><strong>Time:</strong> 30–40 minutes</p>
            <p className="mb-6">Google does not allow automation without permission. You must enable the Google Business Profile API and connect your business using OAuth credentials.</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Step 1:</strong> Create Google Cloud Project ("IDCraft India Business Automation").</li>
              <li><strong>Step 2:</strong> Enable APIs (Business Profile API, Business Information API, Google Sheets API, Google Drive API).</li>
              <li><strong>Step 3:</strong> Create OAuth Credentials (External App, business email).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">PHASE 3 — Install n8n (FREE Forever)</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Why n8n?</h3>
            <p className="mb-4">n8n is your automation engine. Think of it as: IF something happens → DO something automatically.</p>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
              docker run -it --name n8n \<br/>
              -p 5678:5678 \<br/>
              -v n8n_data:/home/node/.n8n \<br/>
              docker.n8n.io/n8nio/n8n
            </div>
            <p>Runs offline, free, and workflows stay on your PC.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">PHASE 5 — Workflow 1 (Automatic Daily Google Post)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Schedule Node</h4>
                <p className="text-sm">Runs Daily at 9:00 AM IST. Schools and office admins search during business hours.</p>
              </div>
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Google Sheets Node</h4>
                <p className="text-sm">Reads 'Topics' sheet where Status = Pending. Limit 1 row.</p>
              </div>
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">ChatGPT Node</h4>
                <p className="text-sm">Writes 220-word SEO post mentioning city 3 times, CR80 PVC, QR codes, fast delivery, and CTA.</p>
              </div>
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Google Business Profile Node</h4>
                <p className="text-sm">Publishes as 'Update', attaches AI Image, adds 'Call' CTA with 9336522126.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">PHASE 6 — Automatic Review Replies</h2>
            <p className="mb-4">New Review arrives on Google → ChatGPT writes personalized reply → Google Business posts the reply → Google Sheet stores review + rating.</p>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-bold text-green-900 mb-2">ChatGPT Prompt Rules:</h4>
              <ul className="list-disc pl-5 text-green-800 space-y-1 mb-4">
                <li>Thank customer by name.</li>
                <li>Mention product they purchased if available.</li>
                <li>Mention city if review contains location.</li>
                <li>Keep reply under 80 words (friendly & professional).</li>
              </ul>
              <h4 className="font-bold text-green-900 mb-1">Example Output:</h4>
              <p className="italic text-green-800">"Thank you, Rahul, for choosing IDCraft India for your school ID cards in Lucknow. We're glad you liked the CR80 PVC quality and quick delivery. We look forward to serving your institution again."</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-2">PHASE 10 — Local SEO Machine (100 Cities)</h2>
            <p className="mb-6">This is the biggest ranking advantage. The AI rotates cities every day because Google Maps ranks businesses that consistently publish locally relevant content.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 border rounded-lg text-center">
                <div className="font-bold text-brand-primary">Lucknow</div>
                <div className="text-xs text-slate-500 mt-1">GD Goenka, CMS, DPS</div>
              </div>
              <div className="bg-slate-50 p-4 border rounded-lg text-center">
                <div className="font-bold text-brand-primary">Delhi</div>
                <div className="text-xs text-slate-500 mt-1">DPS RK Puram, Amity</div>
              </div>
              <div className="bg-slate-50 p-4 border rounded-lg text-center">
                <div className="font-bold text-brand-primary">Ghaziabad</div>
                <div className="text-xs text-slate-500 mt-1">Presidium, Ryan</div>
              </div>
              <div className="bg-slate-50 p-4 border rounded-lg text-center">
                <div className="font-bold text-brand-primary">Noida</div>
                <div className="text-xs text-slate-500 mt-1">Pathways, Lotus Valley</div>
              </div>
            </div>
          </section>

          <section className="bg-amber-50 p-8 rounded-2xl border border-amber-200">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">IDCraft Growth OS v1.0 Recommendation</h2>
            <p className="text-amber-800 mb-6">
              I'd build this as 12 ready-made n8n workflows specifically for your ID card business. It uses Google APIs, Sheets, and n8n without any paid services.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-amber-900 font-medium">
              <li>✅ 1. Daily Google Business Posts</li>
              <li>✅ 2. Automatic Review Replies</li>
              <li>✅ 3. Maps SEO Keyword Gen</li>
              <li>✅ 4. Admission Season Posts</li>
              <li>✅ 5. City-specific content rotation</li>
              <li>✅ 6. Product Catalog Auto Publisher</li>
              <li>✅ 7. Photo Caption Generator</li>
              <li>✅ 8. Review QR Analytics</li>
              <li>✅ 9. Competitor Monitor</li>
              <li>✅ 10. WhatsApp Lead Bot</li>
              <li>✅ 11. Lead CRM in Google Sheets</li>
              <li>✅ 12. Monthly Performance Report</li>
            </ul>
          </section>
          
        </div>
      </div>
    </div>
  );
};
