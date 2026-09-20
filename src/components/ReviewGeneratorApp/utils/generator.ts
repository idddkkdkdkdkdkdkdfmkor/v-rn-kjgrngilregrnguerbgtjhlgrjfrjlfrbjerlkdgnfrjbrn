import { GeneratedReview, ReviewGeneratorParams, PersonaType, ToneType, LanguageType, LengthModeType } from '../types';
import { REVIEWS_DATASET, ReviewItemData } from '../data/reviewsDataset';

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
  'RFID Smart Cards',
  'Doctor ID Badges',
  'NFC Business Cards',
  'Urgent ID Cards'
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

  if (/https?:\/\/|www\./i.test(reviewText)) {
    issues.push('Contains URL / web address');
  }

  if (/\b\d{10}\b|\b\+91\b/i.test(reviewText)) {
    issues.push('Contains phone number');
  }

  if (/#\w+/i.test(reviewText)) {
    issues.push('Contains hashtag');
  }

  const words = reviewText.split(/\s+/);
  const capsWords = words.filter((w) => w.length > 4 && w === w.toUpperCase() && /[A-Z]/.test(w));
  if (capsWords.length > 2) {
    issues.push('Excessive ALL-CAPS detected');
  }

  const hasProduct = /cards?|lanyards?|certificates?|medals?|troph(y|ies)|badges?|smart cards?|ribbons?/i.test(reviewText);
  const hasTimelineOrDelivery = /deliver(ed|y)|days?|time|dispatch|urgent|hours?|schedule|transit|commencement|courier/i.test(reviewText);
  const hasQuality = /print|finish|sharp|durable|pvc|colors?|quality|clarity|scann(ed|ing)|sturdy|acrylic|texture|gloss|matte/i.test(reviewText);
  const hasSupportOrValue = /price|worth|team|support|communication|service|cost|budget|guidelines|proof/i.test(reviewText);
  const hasEmotion = /happy|satisfied|impressed|grateful|relieved|pleased|honestly|best part|loved|खुशी|संतुष्ट|lajawab|shandar/i.test(reviewText);

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

/**
 * Filter reviews from the 1500+ dataset by category, language, and search query
 */
export function getFilteredReviews(
  category = 'all',
  language = 'Random',
  searchQuery = ''
): ReviewItemData[] {
  return REVIEWS_DATASET.filter((item) => {
    // Category match
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Language match
    if (language !== 'Random' && language !== 'All') {
      const normalizedLang = language === 'हिन्दी' ? 'Hindi' : language;
      if (item.language.toLowerCase() !== normalizedLang.toLowerCase()) {
        return false;
      }
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inText = item.review.toLowerCase().includes(q);
      const inPersona = item.persona.toLowerCase().includes(q);
      const inLoc = item.location.toLowerCase().includes(q);
      const inKeywords = item.seoKeywords.some((k) => k.toLowerCase().includes(q));
      return inText || inPersona || inLoc || inKeywords;
    }

    return true;
  });
}

/**
 * Fetch a random review from the dataset based on active filters
 */
export function getRandomFilteredReview(
  category = 'all',
  language = 'Random',
  excludeId?: number
): ReviewItemData {
  const filtered = getFilteredReviews(category, language);
  const pool = filtered.length > 1 && excludeId ? filtered.filter((r) => r.id !== excludeId) : filtered;

  if (pool.length === 0) {
    return REVIEWS_DATASET[Math.floor(Math.random() * REVIEWS_DATASET.length)];
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * Procedural combinatorial review generator for infinite permutations
 */
export function generateLocalReview(params: ReviewGeneratorParams, currentId: number): GeneratedReview {
  const { persona, products, orderSize, location, language, tone, lengthMode, includeEmoji } = params;

  let text = '';
  const selectedKws: string[] = [];

  const mainProd = products[0] || 'PVC ID Cards';
  const secondProd = products[1] || 'Satin Lanyards';

  if (mainProd && SEO_KEYWORD_POOL.includes(mainProd)) selectedKws.push(mainProd);
  if (secondProd && SEO_KEYWORD_POOL.includes(secondProd) && !selectedKws.includes(secondProd)) selectedKws.push(secondProd);

  if (language === 'Hinglish') {
    if (tone === 'Casual' || tone === 'Friendly') {
      text = `Honestly IDCraft se order karke kaafi acha experience raha. Humne ${location || 'Delhi NCR'} ke liye around ${orderSize || '500 cards'} ${mainProd} banwaye the. Print quality bohot sharp aayi hai aur colors bilkul accurate hain. Best part was that delivery time se 2 din pehle ho gayi. Support team ne proofs check karne mein bohot help ki. Worth the price!`;
      if (includeEmoji) text += ' 👍';
    } else {
      text = `IDCraft Technologies ne hamare ${orderSize || '1000 cards'} ${mainProd} aur matching ${secondProd} timely deliver kar diye. Print clarity aur card ki durability dono badhiya hain. WhatsApp par communication kaafi smooth raha and unhone sample jaldi approve karwa diya. Reliable vendor for identity solutions.`;
    }
  } else if (language === 'Hindi') {
    text = `हमारे संस्थान (${location || 'लखनऊ'}) के लिए ${orderSize || '500 कार्ड्स'} ${mainProd} और ${secondProd} तैयार करवाने का अनुभव अत्यंत संतोषजनक रहा। छपाई की गुणवत्ता स्पष्ट है और रंग बिल्कुल हमारे लोगो के अनुसार हैं। समय पर सुरक्षित पैकेजिंग के साथ डिलीवरी प्राप्त हुई। IDCraft की टीम का सहयोग सराहनीय रहा।`;
  } else {
    // English
    if (lengthMode === 'Short') {
      text = `Needed ${orderSize || '350 units'} ${mainProd} for our setup in ${location || 'Lucknow'}. What I liked most was the sharp print quality and quick dispatch. The cards arrived before time and communication was smooth throughout. Truly satisfied with IDCraft.`;
      if (includeEmoji) text += ' ✨';
    } else if (lengthMode === 'Detailed' || lengthMode === 'Story') {
      text = `We recently partnered with IDCraft Technologies for our annual batch of ${orderSize || '1,200 cards'} ${mainProd} alongside custom ${secondProd}. Managing credential logistics across our team in ${location || 'Delhi NCR'} is usually tedious, but their team handled the pre-press file checks with great precision. The photographic clarity on the cards was balanced nicely, and the QR codes / barcodes scanned immediately at our entry gates without a hitch. Delivery arrived two days ahead of our event timeline in secure partitioned cartons. Genuinely impressed with their consistency and wholesale direct pricing.`;
      if (includeEmoji) text += ' 👏';
    } else {
      // Standard
      text = `First time ordering from IDCraft Technologies for our ${location || 'regional'} branch. We got ${orderSize || '500 units'} ${mainProd} with custom ${secondProd}. Honestly, the print clarity and solid 30mil PVC thickness exceeded our expectations. Everything was delivered on time and the support team answered all our layout questions promptly. Very dependable team.`;
      if (includeEmoji) text += ' 👍';
    }
  }

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
