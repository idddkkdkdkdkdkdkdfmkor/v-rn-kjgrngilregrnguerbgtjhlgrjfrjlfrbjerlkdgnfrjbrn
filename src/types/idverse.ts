export type IDVerseCategory =
  | 'school-student'
  | 'teacher-faculty'
  | 'college-university'
  | 'corporate-employee'
  | 'hospital-staff'
  | 'factory-industrial'
  | 'visitor-guest'
  | 'vip-membership'
  | 'smart-rfid'
  | 'government-office';

export type IDVerseTheme =
  | 'royal-blue'
  | 'crimson-red'
  | 'emerald-green'
  | 'navy-gold'
  | 'purple-gradient'
  | 'orange-modern'
  | 'black-luxury'
  | 'sky-blue-corporate'
  | 'maroon-academic'
  | 'white-minimal';

export interface IDVerseRecord {
  id: string;
  category: IDVerseCategory;
  categoryLabel: string;
  theme: IDVerseTheme;
  orientation: 'vertical' | 'horizontal';
  
  // Organization / Institution
  organization: string;
  subTitle?: string;
  logoText: string;
  accentColor: string;
  bgGradient: string;
  
  // Holder Info
  holderName: string;
  holderPhoto: string;
  idNumber: string;
  admissionOrEmpId?: string;
  designationOrRole: string;
  departmentOrClass: string;
  bloodGroup: string;
  dobOrJoining?: string;
  validity: string;
  gender?: 'Male' | 'Female' | 'Other' | string;
  
  // Additional Category-Specific Front Data
  frontExtraFields?: { label: string; value: string }[];
  
  // Back Data
  fatherOrSpouseName?: string;
  motherName?: string;
  address: string;
  city: string;
  primaryPhone: string;
  emergencyPhone: string;
  email: string;
  busRoute?: string;
  libraryId?: string;
  hostName?: string;
  safetyInstructions?: string[];
  accessLevel?: string;
  tier?: string;
  terms?: string;
  authorizedSignatory: string;
  
  // Smart Credentials & Barcodes
  barcodeNumber: string; // 12-digit numeric e.g. 890126483921
  rfidNumber: string; // RFID-4829-9371-260001
  qrValue: string; // IDVERSE-CATEGORY-ID-NAME-2026
  nfcSupported?: boolean;
}

export interface IDVerseCategoryMeta {
  id: IDVerseCategory;
  name: string;
  tagline: string;
  badge: string;
  defaultOrientation: 'vertical' | 'horizontal';
  accentColor: string;
  iconName: string;
}
