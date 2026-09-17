import { GeneratedReview, ReviewGeneratorParams, PersonaType, ToneType, LanguageType, LengthModeType } from '../types';

export const SEO_KEYWORD_POOL = [
  'PVC ID Cards',
  'School ID Cards',
  'Employee ID Cards',
  'Student ID Cards',
  'ID Card Printing',
  'Lanyards',
  'Certificates',
  'Medals',
  'Trophies',
  'QR Code ID Cards',
  'Custom ID Cards',
  'School Branding',
];

export const PERSONAS: PersonaType[] = [
  'School Principal',
  'Teacher',
  'Parent',
  'Student',
  'HR Manager',
  'Startup Founder',
  'Hospital Administrator',
  'NGO Coordinator',
  'Event Organizer',
  'Coaching Institute Owner',
];

export const TONES: ToneType[] = ['Casual', 'Professional', 'Emotional', 'Minimal', 'Friendly'];

export const LANGUAGES: LanguageType[] = ['English', 'Hinglish', 'Hindi'];

export const LENGTH_MODES: { label: LengthModeType; range: string; min: number; max: number }[] = [
  { label: 'Short', range: '35–60 words', min: 35, max: 60 },
  { label: 'Standard', range: '60–110 words', min: 60, max: 110 },
  { label: 'Detailed', range: '110–180 words', min: 110, max: 180 },
  { label: 'Story', range: '180–250 words', min: 180, max: 250 },
];

export function countWords(text: string): number {
  if (!text) return 0;
  // Handle Hindi and English word splits cleanly
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function detectKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];
  for (const kw of SEO_KEYWORD_POOL) {
    if (lower.includes(kw.toLowerCase())) {
      matched.push(kw);
    }
  }
  return matched;
}

export function calculateKeywordDensity(text: string, keywords: string[]): number {
  const totalWords = countWords(text);
  if (totalWords === 0) return 0;

  let keywordWordCount = 0;
  const lower = text.toLowerCase();

  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    const count = (lower.match(new RegExp(kwLower, 'g')) || []).length;
    const kwWords = kw.split(' ').length;
    keywordWordCount += count * kwWords;
  }

  return Number(((keywordWordCount / totalWords) * 100).toFixed(1));
}

export interface ComplianceCheck {
  isCompliant: boolean;
  issues: string[];
  authenticityChecks: {
    hasProduct: boolean;
    hasTimelineOrDelivery: boolean;
    hasQuality: boolean;
    hasSupportOrValue: boolean;
    hasEmotion: boolean;
  };
}

export function checkReviewCompliance(reviewText: string): ComplianceCheck {
  const issues: string[] = [];
  const lower = reviewText.toLowerCase();

  // Banned phrases check
  const bannedPhrases = [
    'best in india',
    '100% guaranteed',
    'buy now',
    'click here',
    'discount code',
    'call us at',
    'visit website',
  ];

  for (const phrase of bannedPhrases) {
    if (lower.includes(phrase)) {
      issues.push(`Contains promotional cliché: "${phrase}"`);
    }
  }

  // URL check
  if (/https?:\/\/|www\./i.test(reviewText)) {
    issues.push('Contains URL / web address');
  }

  // Phone number check
  if (/\b\d{10}\b|\b\+91\b/i.test(reviewText)) {
    issues.push('Contains phone number');
  }

  // Hashtag check
  if (/#\w+/i.test(reviewText)) {
    issues.push('Contains hashtag');
  }

  // All caps check (words longer than 3 chars in all caps)
  const words = reviewText.split(/\s+/);
  const capsWords = words.filter((w) => w.length > 4 && w === w.toUpperCase() && /[A-Z]/.test(w));
  if (capsWords.length > 2) {
    issues.push('Excessive ALL-CAPS detected');
  }

  // Authenticity markers
  const hasProduct = /cards?|lanyards?|certificates?|medals?|troph(y|ies)|badges?|smart cards?/i.test(reviewText);
  const hasTimelineOrDelivery = /deliver(ed|y)|days?|time|dispatch|urgent|hours?|schedule|transit|commencement/i.test(reviewText);
  const hasQuality = /print|finish|sharp|durable|pvc|colors?|quality|clarity|scann(ed|ing)|sturdy|acrylic|texture/i.test(reviewText);
  const hasSupportOrValue = /price|worth|team|support|communication|service|cost|budget|guidelines|proof/i.test(reviewText);
  const hasEmotion = /happy|satisfied|impressed|grateful|relieved|pleased|honestly|best part|loved|खुशी|संतुष्ट/i.test(reviewText);

  return {
    isCompliant: issues.length === 0,
    issues,
    authenticityChecks: {
      hasProduct,
      hasTimelineOrDelivery,
      hasQuality,
      hasSupportOrValue,
      hasEmotion,
    },
  };
}

export function formatReviewCard(review: GeneratedReview): string {
  return `Review #${review.id}:
Persona: ${review.persona}
Tone: ${review.tone}
Language: ${review.language}
Word Count: ${review.wordCount}
SEO Keywords Used: ${review.seoKeywords.join(', ') || 'None'}

Review:
${review.review}`;
}

// Client-side fallback generator adhering strictly to IDCraft Human Engine guidelines
export function generateLocalReview(params: ReviewGeneratorParams, currentId: number): GeneratedReview {
  const { persona, products, orderSize, location, deliveryExperience, qualityNotes, supportExperience, language, tone, lengthMode, includeEmoji } = params;

  let text = '';
  const selectedKws: string[] = [];

  const mainProd = products[0] || 'PVC ID Cards';
  const secondProd = products[1] || 'Lanyards';

  if (mainProd && SEO_KEYWORD_POOL.includes(mainProd)) selectedKws.push(mainProd);
  if (secondProd && SEO_KEYWORD_POOL.includes(secondProd) && !selectedKws.includes(secondProd)) selectedKws.push(secondProd);

  if (language === 'Hinglish') {
    if (tone === 'Casual' || tone === 'Friendly') {
      text = `Honestly IDCraft se order karke kaafi acha experience raha. Humne ${location} ke liye around ${orderSize} ${mainProd} banwaye the. Print quality bohot sharp aayi hai aur colors bilkul accurate hain. Best part was that delivery time se pehle ho gayi. Support team ne bhi proofs check karne mein bohot help ki. Worth the price!`;
      if (includeEmoji) text += ' 👍';
    } else {
      text = `IDCraft Technologies ne hamare ${orderSize} ${mainProd} aur matching ${secondProd} timely deliver kar diye. Print clarity aur card ki durability dono badhiya hain. WhatsApp par communication kaafi smooth raha and unhone sample jaldi approve karwa diya. Reliable vendor in Delhi NCR.`;
    }
  } else if (language === 'Hindi') {
    text = `हमारे संस्थान के लिए ${orderSize} ${mainProd} और ${secondProd} तैयार करवाने का अनुभव अत्यंत संतोषजनक रहा। छपाई की गुणवत्ता स्पष्ट है और रंग बिल्कुल हमारे लोगो के अनुसार हैं। समय पर सुरक्षित पैकेजिंग के साथ डिलीवरी प्राप्त हुई। IDCraft की टीम का सहयोग सराहनीय रहा।`;
  } else {
    // English
    if (lengthMode === 'Short') {
      text = `Needed ${orderSize} ${mainProd} for our setup in ${location}. What I liked most was the sharp print quality and quick dispatch. The cards arrived before time and communication was smooth throughout. Truly satisfied with IDCraft.`;
      if (includeEmoji) text += ' ✨';
    } else if (lengthMode === 'Detailed' || lengthMode === 'Story') {
      text = `We recently partnered with IDCraft Technologies for our annual batch of ${orderSize} ${mainProd} alongside custom ${secondProd}. Managing credential logistics across our team in ${location} is usually tedious, but their team handled the pre-press file checks with great precision. The photographic clarity on the cards was balanced nicely, and the QR codes scanned immediately at our entry gates without a hitch. Delivery arrived two days ahead of our event timeline in secure partitioned cartons. Genuinely impressed with their consistency and fair pricing.`;
      if (includeEmoji) text += ' 👏';
    } else {
      // Standard
      text = `First time ordering from IDCraft Technologies for our ${location} branch. We got ${orderSize} ${mainProd} with custom ${secondProd}. Honestly, the print clarity and card thickness exceeded our expectations. Everything was delivered on time and the support team answered all our layout questions promptly. Very dependable team.`;
      if (includeEmoji) text += ' 👍';
    }
  }

  // Ensure 2-4 keywords
  const detected = detectKeywords(text);
  const keywordsUsed = detected.length >= 2 ? detected : Array.from(new Set([...selectedKws, 'ID Card Printing']));

  const wordCount = countWords(text);

  return {
    id: currentId,
    persona,
    tone,
    language,
    wordCount,
    lengthCategory: lengthMode,
    seoKeywords: keywordsUsed,
    review: text,
    hasEmoji: includeEmoji,
    orderSize,
    location,
    rating: 5,
  };
}
