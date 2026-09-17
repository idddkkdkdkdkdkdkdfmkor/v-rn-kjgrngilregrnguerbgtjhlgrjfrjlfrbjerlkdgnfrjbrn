export type PersonaType =
  | 'School Principal'
  | 'Teacher'
  | 'Parent'
  | 'Student'
  | 'HR Manager'
  | 'Startup Founder'
  | 'Hospital Administrator'
  | 'NGO Coordinator'
  | 'Event Organizer'
  | 'Coaching Institute Owner';

export type ToneType = 'Casual' | 'Professional' | 'Emotional' | 'Minimal' | 'Friendly';

export type LanguageType = 'English' | 'Hinglish' | 'Hindi';

export type LengthModeType = 'Short' | 'Standard' | 'Detailed' | 'Story';

export interface GeneratedReview {
  id: number;
  persona: PersonaType;
  tone: ToneType;
  language: LanguageType;
  wordCount: number;
  lengthCategory: LengthModeType;
  seoKeywords: string[];
  review: string;
  hasEmoji: boolean;
  orderSize?: string;
  location?: string;
  rating: number;
}

export interface ReviewGeneratorParams {
  persona: PersonaType;
  products: string[];
  orderSize: string;
  location: string;
  deliveryExperience: string;
  qualityNotes: string[];
  supportExperience: string;
  language: LanguageType;
  tone: ToneType;
  lengthMode: LengthModeType;
  includeEmoji: boolean;
}
