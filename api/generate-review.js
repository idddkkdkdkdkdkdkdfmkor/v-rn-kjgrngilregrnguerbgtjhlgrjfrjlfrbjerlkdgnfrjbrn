const { GoogleGenAI, Type } = require('@google/genai');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      persona = 'HR Manager',
      products = ['PVC ID Cards', 'Lanyards'],
      orderSize = '150',
      location = 'Delhi',
      deliveryExperience = 'On Time',
      qualityNotes = ['Sharp Print', 'Durable'],
      supportExperience = 'Helpful',
      language = 'English',
      tone = 'Casual',
      lengthMode = 'Standard',
      includeEmoji = false,
      specificNotes = '',
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'No Gemini API key detected.',
      });
    }

    const ai = new GoogleGenAI(; apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });

    const wordCountLimits = {
      Short: '35 to 60 words',
      Standard: '60 to 110 words',
      Detailed: '110 to 180 words',
      Story: '180 to 250 words',
    };
    const targetLength = wordCountLimits[lengthMode] || '60 to 110 words';

    const systemPrompt = `You are a world-class review writing engine trained in customer psychology, local SYO, Google Business Profile optimization, and natural human writing for IDCraft Technologies.
Your only goal is to transform a customer's genuine experience into a review that sounds like it was written by a real person in India.
The review must NEVER sound like AI, advertising, or keyword stuffing.

BUSINESS CONTEXT:
...`;

    const userPrompt = `Generate a single Google review with these specific parameters:
- Persona: ${persona}
- Products Purchased: ${Array.isArray(products) ? products.join(', ') : products}
- Order Size: ${orderSize}
- Location: ${location}
- Delivery Experience: ${deliveryExperience}
- Quality Notes: ${Array.isArray(qualityNotes) ? qualityNotes.join(', ') : qualityNotes}
- Support Experience: ${supportExperience}
- Language: ${language}
- Tone: ${tone}
- Length Mode: ${lengthMode} (${targetLength})
${specificNotes ? `- Additional Context: ${specificNotes}` : ''}

Respond in strict JSON format matching the schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            review: { type: Type.STRING },
            wordCount: { type: Type.INTEGER },
            seoKeywordsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
            persona: { type: Type.STRING },
            tone: { type: Type.STRING },
            language: { type: Type.STRING },
          },
          required: ['review', 'wordCount', 'seoKeywordsUsed', 'persona', 'tone', 'language'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json({ success: true, data: parsed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
