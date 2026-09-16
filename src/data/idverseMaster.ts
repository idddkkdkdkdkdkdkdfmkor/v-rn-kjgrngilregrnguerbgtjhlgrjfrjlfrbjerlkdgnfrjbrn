import {
  IDVerseRecord,
  IDVerseCategory,
  IDVerseCategoryMeta,
  IDVerseTheme,
} from '../types/idverse';
import {
  SCHOOL_STUDENT_RECORDS,
  TEACHER_FACULTY_RECORDS,
  COLLEGE_UNIVERSITY_RECORDS,
  CORPORATE_EMPLOYEE_RECORDS,
  HOSPITAL_STAFF_RECORDS,
} from './idverseCategories';
import {
  FACTORY_INDUSTRIAL_RECORDS,
  VISITOR_GUEST_RECORDS,
  VIP_MEMBERSHIP_RECORDS,
  BARCODE_RFID_SMART_RECORDS,
  GOVERNMENT_OFFICE_RECORDS,
} from './idverseCategoriesPart2';

export const IDVERSE_CATEGORIES_META: IDVerseCategoryMeta[] = [
  {
    id: 'school-student',
    name: 'School Student ID Card',
    tagline: 'CBSE, ICSE, Convent, International & Public Schools with Bus Route & Parent QR',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#2563EB',
    iconName: 'GraduationCap',
  },
  {
    id: 'teacher-faculty',
    name: 'Teacher / Faculty ID Card',
    tagline: 'Principals, PGT, TGT, STEM Mentors & Librarians with Faculty Lounge RFID',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#D97706',
    iconName: 'Briefcase',
  },
  {
    id: 'college-university',
    name: 'College / University Student ID',
    tagline: 'IITs, AIIMS, IIMs, B.Tech, MBBS, Law & Management Scholars with Library RFID',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#7C3AED',
    iconName: 'BookOpen',
  },
  {
    id: 'corporate-employee',
    name: 'Corporate Employee ID Card',
    tagline: 'Tech Startups, Banks, MNC IT Parks, BFSI & Retail Badges with Turnstile RFID',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#0284C7',
    iconName: 'Building',
  },
  {
    id: 'hospital-staff',
    name: 'Hospital Staff ID Card',
    tagline: 'Doctors, ICU Specialists, Surgeons, Radiologists & Nursing Officers with OT Access',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#059669',
    iconName: 'HeartPulse',
  },
  {
    id: 'factory-industrial',
    name: 'Factory / Industrial Employee ID',
    tagline: 'Automobile, Steel, Chemical, Power Plants & Warehouses with Shift & PPE Alerts',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#EA580C',
    iconName: 'Factory',
  },
  {
    id: 'visitor-guest',
    name: 'Visitor / Guest Pass',
    tagline: 'Vendors, Interview Candidates, VIP Guests & Contractors with Host Escort Rules',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#DC2626',
    iconName: 'UserCheck',
  },
  {
    id: 'vip-membership',
    name: 'VIP / Membership Card',
    tagline: 'Golf Resorts, Luxury Gyms, Private Dining, Salons & Heritage Clubs with Foil Accents',
    badge: '20 Active Records',
    defaultOrientation: 'horizontal',
    accentColor: '#D97706',
    iconName: 'Crown',
  },
  {
    id: 'smart-rfid',
    name: 'Barcode / RFID Smart Card',
    tagline: 'Mifare 1K, NFC 13.56MHz, DesFire, FASTag & Turnstile Credentials with UID',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#9333EA',
    iconName: 'Cpu',
  },
  {
    id: 'government-office',
    name: 'Government / Office Staff ID',
    tagline: 'Municipal Corporations, Electricity Boards, Police Wings & Secretariat Officers',
    badge: '20 Active Records',
    defaultOrientation: 'vertical',
    accentColor: '#1E3A8A',
    iconName: 'Shield',
  },
];

// Master 200 Records
export const ALL_IDVERSE_RECORDS: IDVerseRecord[] = [
  ...SCHOOL_STUDENT_RECORDS,
  ...TEACHER_FACULTY_RECORDS,
  ...COLLEGE_UNIVERSITY_RECORDS,
  ...CORPORATE_EMPLOYEE_RECORDS,
  ...HOSPITAL_STAFF_RECORDS,
  ...FACTORY_INDUSTRIAL_RECORDS,
  ...VISITOR_GUEST_RECORDS,
  ...VIP_MEMBERSHIP_RECORDS,
  ...BARCODE_RFID_SMART_RECORDS,
  ...GOVERNMENT_OFFICE_RECORDS,
];

export const THEME_COLOR_CONFIG: Record<
  IDVerseTheme,
  { label: string; bg: string; text: string; ring: string; hex: string }
> = {
  'royal-blue': { label: 'Royal Blue', bg: 'bg-blue-600', text: 'text-blue-700', ring: 'ring-blue-500', hex: '#2563EB' },
  'crimson-red': { label: 'Crimson Red', bg: 'bg-rose-600', text: 'text-rose-700', ring: 'ring-rose-500', hex: '#DC2626' },
  'emerald-green': { label: 'Emerald Green', bg: 'bg-emerald-600', text: 'text-emerald-700', ring: 'ring-emerald-500', hex: '#059669' },
  'navy-gold': { label: 'Navy Gold', bg: 'bg-amber-600', text: 'text-amber-700', ring: 'ring-amber-500', hex: '#D97706' },
  'purple-gradient': { label: 'Purple Gradient', bg: 'bg-purple-600', text: 'text-purple-700', ring: 'ring-purple-500', hex: '#9333EA' },
  'orange-modern': { label: 'Orange Modern', bg: 'bg-orange-600', text: 'text-orange-700', ring: 'ring-orange-500', hex: '#EA580C' },
  'black-luxury': { label: 'Black Luxury', bg: 'bg-zinc-900', text: 'text-zinc-900', ring: 'ring-zinc-600', hex: '#18181B' },
  'sky-blue-corporate': { label: 'Sky Blue Corporate', bg: 'bg-sky-600', text: 'text-sky-700', ring: 'ring-sky-500', hex: '#0284C7' },
  'maroon-academic': { label: 'Maroon Academic', bg: 'bg-red-800', text: 'text-red-900', ring: 'ring-red-700', hex: '#991B1B' },
  'white-minimal': { label: 'White Minimal Premium', bg: 'bg-slate-200', text: 'text-slate-800', ring: 'ring-slate-400', hex: '#64748B' },
};

// Helper function to export records to CSV
export function exportIDVerseRecordsToCSV(records: IDVerseRecord[]): string {
  const headers = [
    'Category',
    'ID_Number',
    'Holder_Name',
    'Organization',
    'Designation_Or_Role',
    'Department_Or_Class',
    'Blood_Group',
    'Validity',
    'Emergency_Phone',
    'City',
    'Address',
    'Barcode_Code128',
    'RFID_Uid',
    'QR_Payload',
  ];

  const rows = records.map((r) => [
    `"${r.categoryLabel}"`,
    `"${r.idNumber}"`,
    `"${r.holderName}"`,
    `"${r.organization}"`,
    `"${r.designationOrRole}"`,
    `"${r.departmentOrClass}"`,
    `"${r.bloodGroup}"`,
    `"${r.validity}"`,
    `"${r.emergencyPhone}"`,
    `"${r.city}"`,
    `"${r.address.replace(/"/g, '""')}"`,
    `"${r.barcodeNumber}"`,
    `"${r.rfidNumber}"`,
    `"${r.qrValue}"`,
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
