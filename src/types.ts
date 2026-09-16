export interface IDCardProduct {
  id: string;
  name: string;
  slug: string;
  category: 'education' | 'corporate' | 'healthcare' | 'tech' | 'events' | 'membership';
  tagline: string;
  description: string;
  features: string[];
  specs: {
    material: string;
    thickness: string;
    dimensions: string;
    printing: string;
    durability: string;
    chipType?: string;
    finish: string;
  };
  startingPrice: number;
  popularFor: string[];
  imageUrl: string;
  badge?: string;
}

export interface GalleryCard {
  id: string;
  title: string;
  institution: string;
  city: string;
  category: 'schools' | 'corporate' | 'hospital' | 'college' | 'events' | 'factory';
  frontImage: string;
  backImage: string;
  features: string[];
  thickness: string;
  lanyardType: string;
}

export interface IndustryData {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  recommendedCard: string;
  keyFeatures: string[];
  typicalVolume: string;
  turnaroundTime: string;
  sampleClient: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  organization: string;
  city: string;
  avatar: string;
  rating: number;
  comment: string;
  cardsPrinted: string;
  verifiedBadge: boolean;
}

export interface FAQItem {
  id: string;
  category: 'orders' | 'specs' | 'delivery' | 'rfid' | 'samples';
  question: string;
  answer: string;
}

export interface CalculatorState {
  quantity: number;
  isDoubleSided: boolean;
  thickness: '30mil' | '40mil';
  finish: 'gloss' | 'matte' | 'frosted';
  lanyard: 'none' | 'plain-16mm' | 'satin-20mm-printed' | 'premium-doghook';
  lanyardColor: string;
  holder: 'none' | 'soft-pouch' | 'hard-acrylic' | 'magnetic-badge';
  techAddon: 'none' | 'barcode-qr' | 'rfid-1356' | 'nfc-ntag213' | 'magnetic-stripe';
  hologramSeal: boolean;
}

export interface QuoteBreakdown {
  baseCardPrice: number;
  lanyardPrice: number;
  holderPrice: number;
  techPrice: number;
  hologramPrice: number;
  totalPerCard: number;
  subtotal: number;
  discountPercentage: number;
  savings: number;
  discountedSubtotal: number;
  gstAmount: number;
  estimatedTotal: number;
}

export interface InquiryFormData {
  organization: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  quantity: number;
  category: string;
  needLanyard: boolean;
  needDesignAssistance: boolean;
  message: string;
  fileName?: string;
  fileSize?: string;
}

export interface CardCustomizerData {
  template: 'school' | 'corporate' | 'hospital' | 'club';
  institutionName: string;
  tagline: string;
  personName: string;
  designation: string;
  idNumber: string;
  departmentOrClass: string;
  bloodGroup: string;
  validUpto: string;
  emergencyPhone: string;
  address: string;
  themeColor: string;
  photoUrl: string;
  logoUrl: string;
  lanyardText: string;
  lanyardColor: string;
  barcodeNumber: string;
  qrPayload: string;
  showHoloSeal: boolean;
}
