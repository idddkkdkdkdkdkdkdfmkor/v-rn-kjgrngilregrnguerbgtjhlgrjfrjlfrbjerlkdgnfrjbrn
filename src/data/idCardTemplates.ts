export const TEMPLATE_CATEGORIES = [
  'Modern School',
  'CBSE / ICSE',
  'Kids & Primary',
  'International & Luxury',
  'Sports & House',
] as const;

export type IDCardTemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];
export type IDCardTemplateSide = 'front' | 'back';
export type IDCardLayoutVariant = 'center' | 'split' | 'band' | 'edge' | 'badge';

export const DYNAMIC_PLACEHOLDERS = [
  'student_name',
  'photo',
  'school_logo',
  'school_name',
  'class',
  'section',
  'roll_number',
  'admission_number',
  'session',
  'dob',
  'blood_group',
  'father_name',
  'mother_name',
  'phone',
  'address',
  'transport_route',
  'house',
  'principal_signature',
  'qr_code',
  'barcode',
] as const;

export type DynamicPlaceholder = (typeof DYNAMIC_PLACEHOLDERS)[number];

const templateDefinitions = [
  ['royal-blue-academic', 'Royal Blue Academic', 'Modern School', 'Academic crest layout', '#1D4ED8', '#172554', '#DBEAFE', '#F59E0B', 'center'],
  ['emerald-green-school', 'Emerald Green School', 'Modern School', 'Eco academic layout', '#059669', '#064E3B', '#D1FAE5', '#0EA5E9', 'split'],
  ['crimson-red-school', 'Crimson Red School', 'Modern School', 'Bold house layout', '#DC2626', '#7F1D1D', '#FEE2E2', '#FBBF24', 'band'],
  ['navy-gold-premium', 'Navy Gold Premium', 'Modern School', 'Premium formal layout', '#0F172A', '#1E3A8A', '#FEF3C7', '#D97706', 'edge'],
  ['white-minimal-professional', 'White Minimal Professional', 'Modern School', 'Clean office layout', '#334155', '#0F172A', '#E2E8F0', '#10B981', 'badge'],
  ['cbse-blue-ribbon', 'CBSE Blue Ribbon', 'CBSE / ICSE', 'Affiliation ready', '#2563EB', '#1E40AF', '#BFDBFE', '#EF4444', 'band'],
  ['cbse-orange-modern', 'CBSE Orange Modern', 'CBSE / ICSE', 'Warm institutional style', '#EA580C', '#9A3412', '#FFEDD5', '#2563EB', 'split'],
  ['icse-purple-premium', 'ICSE Purple Premium', 'CBSE / ICSE', 'Refined council layout', '#7C3AED', '#4C1D95', '#EDE9FE', '#F59E0B', 'center'],
  ['green-eco-school', 'Green Eco School', 'CBSE / ICSE', 'Nature inspired', '#16A34A', '#14532D', '#DCFCE7', '#84CC16', 'edge'],
  ['smart-education-theme', 'Smart Education Theme', 'CBSE / ICSE', 'Digital learning layout', '#0891B2', '#164E63', '#CFFAFE', '#F97316', 'badge'],
  ['nursery-fun-theme', 'Nursery Fun Theme', 'Kids & Primary', 'Soft primary colors', '#EC4899', '#BE185D', '#FCE7F3', '#22C55E', 'center'],
  ['rainbow-primary-theme', 'Rainbow Primary Theme', 'Kids & Primary', 'Bright rainbow bands', '#F97316', '#7C2D12', '#FFEDD5', '#3B82F6', 'band'],
  ['cartoon-learning-theme', 'Cartoon Learning Theme', 'Kids & Primary', 'Playful learning layout', '#8B5CF6', '#5B21B6', '#EDE9FE', '#FACC15', 'split'],
  ['bright-color-play-school', 'Bright Color Play School', 'Kids & Primary', 'High energy preschool', '#14B8A6', '#0F766E', '#CCFBF1', '#EF4444', 'badge'],
  ['cambridge-white-premium', 'Cambridge White Premium', 'International & Luxury', 'White premium global', '#475569', '#111827', '#F8FAFC', '#B45309', 'edge'],
  ['ib-dark-minimal', 'IB Dark Minimal', 'International & Luxury', 'Dark minimal global', '#111827', '#020617', '#CBD5E1', '#38BDF8', 'split'],
  ['sapphire-blue-international', 'Sapphire Blue International', 'International & Luxury', 'International sapphire', '#0369A1', '#0C4A6E', '#E0F2FE', '#F59E0B', 'center'],
  ['luxury-black-gold', 'Luxury Black Gold', 'International & Luxury', 'Black gold executive', '#18181B', '#000000', '#FDE68A', '#D4AF37', 'edge'],
  ['sports-captain-theme', 'Sports Captain Theme', 'Sports & House', 'Captain and team cards', '#15803D', '#052E16', '#DCFCE7', '#F97316', 'band'],
  ['house-color-theme', 'House Color Theme', 'Sports & House', 'Red blue green yellow variants', '#2563EB', '#991B1B', '#DBEAFE', '#EAB308', 'badge'],
] as const;

export type IDCardTemplateId = (typeof templateDefinitions)[number][0];

export interface IDCardMember {
  id: string;
  templateId: IDCardTemplateId;
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
  photoUrl: string;
  barcodeNumber: string;
  qrPayload: string;
  rollNumber?: string;
  admissionNumber?: string;
  className?: string;
  section?: string;
  session?: string;
  dob?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
  transportRoute?: string;
  house?: string;
  website?: string;
  email?: string;
}

export interface IDCardTemplateMeta {
  id: IDCardTemplateId;
  name: string;
  subtitle: string;
  category: IDCardTemplateCategory;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  highlightColor: string;
  headerGradient: string;
  footerColor: string;
  layout: IDCardLayoutVariant;
  orientation: 'horizontal' | 'vertical';
  sides: IDCardTemplateSide[];
  placeholders: DynamicPlaceholder[];
}

export const ID_CARD_TEMPLATES = Object.fromEntries(
  templateDefinitions.map(([id, name, category, subtitle, primaryColor, secondaryColor, accentColor, highlightColor, layout]) => [
    id,
    {
      id,
      name,
      subtitle,
      category,
      primaryColor,
      secondaryColor,
      accentColor,
      highlightColor,
      headerGradient: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      footerColor: primaryColor,
      layout,
      orientation: 'horizontal',
      sides: ['front', 'back'],
      placeholders: DYNAMIC_PLACEHOLDERS,
    },
  ])
) as unknown as Record<IDCardTemplateId, IDCardTemplateMeta>;

export const PREMIUM_TEMPLATE_IDS = templateDefinitions.map(([id]) => id) as IDCardTemplateId[];

export function getDesignerElementsForTemplate(templateId: IDCardTemplateId) {
  const template = ID_CARD_TEMPLATES[templateId];
  const sample = SAMPLE_MEMBERS.find((m) => m.templateId === templateId) ?? SAMPLE_MEMBERS[0];
  const split = template.layout === 'split';
  const edge = template.layout === 'edge';
  const band = template.layout === 'band';
  const badge = template.layout === 'badge';

  return [
    {
      id: 'bg-header',
      type: 'shape' as const,
      x: -2,
      y: -2,
      width: 244,
      height: band ? 82 : edge ? 380 : 118,
      backgroundColor: template.primaryColor,
      borderRadius: 12,
    },
    {
      id: 'accent-panel',
      type: 'shape' as const,
      x: split ? 140 : 18,
      y: split ? 78 : 96,
      width: split ? 86 : 204,
      height: split ? 180 : 20,
      backgroundColor: template.highlightColor,
      borderRadius: badge ? 20 : 8,
    },
    {
      id: 'logo-text',
      type: 'text' as const,
      x: edge ? 24 : 18,
      y: edge ? 24 : 20,
      content: '{{school_name}}',
      fontSize: 15,
      fontWeight: '900',
      color: '#FFFFFF',
    },
    {
      id: 'tagline',
      type: 'text' as const,
      x: edge ? 24 : 18,
      y: edge ? 50 : 44,
      content: sample.tagline.toUpperCase(),
      fontSize: 7,
      fontWeight: 'bold',
      color: template.accentColor,
    },
    {
      id: 'photo',
      type: 'image' as const,
      x: split ? 154 : 70,
      y: split ? 126 : 84,
      width: split ? 72 : 100,
      height: split ? 92 : 100,
      backgroundColor: '#F1F5F9',
      borderRadius: badge || template.category === 'Kids & Primary' ? 18 : 50,
    },
    {
      id: 'student-name',
      type: 'text' as const,
      x: split ? 18 : 34,
      y: split ? 150 : 198,
      content: '{{student_name}}',
      fontSize: split ? 18 : 21,
      fontWeight: '900',
      color: edge ? '#FFFFFF' : '#0F172A',
    },
    {
      id: 'class-section',
      type: 'text' as const,
      x: split ? 18 : 58,
      y: split ? 178 : 230,
      content: 'Class {{class}} - {{section}}',
      fontSize: 11,
      fontWeight: 'bold',
      color: edge ? template.accentColor : template.primaryColor,
    },
    {
      id: 'admission',
      type: 'text' as const,
      x: 20,
      y: 280,
      content: 'ADM {{admission_number}}  ROLL {{roll_number}}',
      fontSize: 9,
      fontWeight: '900',
      color: edge ? '#FFFFFF' : '#0F172A',
    },
    {
      id: 'qr-code',
      type: 'shape' as const,
      x: 184,
      y: 280,
      width: 36,
      height: 36,
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
    },
    {
      id: 'signature',
      type: 'text' as const,
      x: 20,
      y: 340,
      content: 'Principal Signature',
      fontSize: 8,
      fontWeight: 'bold',
      color: edge ? '#FFFFFF' : '#64748B',
    },
  ];
}

const photos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&q=80',
];

const names = ['Aarav Sharma', 'Ananya Patel', 'Kabir Malhotra', 'Priya Nair', 'Ishaan Mehta', 'Sara Khan'];
const classes = ['XI Science A', 'X B', 'VIII C', 'VI A', 'III B', 'Sports Captain'];

export const SAMPLE_MEMBERS: IDCardMember[] = PREMIUM_TEMPLATE_IDS.flatMap((templateId, templateIndex) => {
  const template = ID_CARD_TEMPLATES[templateId];
  return [0, 1].map((offset) => {
    const index = (templateIndex + offset) % names.length;
    const admission = `IDC-${String(templateIndex + 1).padStart(2, '0')}-${String(offset + 841).padStart(4, '0')}`;
    return {
      id: `${templateId}-${offset + 1}`,
      templateId,
      institutionName: template.category === 'International & Luxury' ? 'Global Scholars International' : 'Delhi Public Academy',
      tagline: template.category === 'CBSE / ICSE' ? 'Affiliated School Identity Card' : template.subtitle,
      personName: names[index],
      designation: 'STUDENT',
      idNumber: admission,
      admissionNumber: admission,
      rollNumber: String(20 + templateIndex + offset),
      className: classes[index].split(' ')[0],
      section: classes[index].split(' ').slice(1).join(' ') || 'A',
      departmentOrClass: classes[index],
      session: '2026-27',
      dob: `0${(index % 8) + 1}-0${(index % 7) + 1}-2012`,
      bloodGroup: ['B +ve', 'A +ve', 'O +ve', 'AB +ve'][index % 4],
      fatherName: ['Rajesh Sharma', 'Manish Patel', 'Rohit Malhotra', 'Sanjay Nair'][index % 4],
      motherName: ['Neha Sharma', 'Kavita Patel', 'Ritu Malhotra', 'Anita Nair'][index % 4],
      validUpto: 'MAY 2027',
      emergencyPhone: `+91 98765 43${String(210 + index).slice(-3)}`,
      phone: `+91 98765 43${String(210 + index).slice(-3)}`,
      address: 'Sector 45, Noida, Uttar Pradesh - 201301',
      photoUrl: photos[index],
      barcodeNumber: `89012648${String(3921 + templateIndex * 2 + offset).padStart(4, '0')}`,
      qrPayload: `https://idcraftindia.com/verify?id=${admission}`,
      transportRoute: `Route ${String.fromCharCode(65 + (index % 5))}`,
      house: ['Red', 'Blue', 'Green', 'Yellow'][index % 4],
      website: 'www.idcraftindia.com',
      email: 'office@delhipublicacademy.edu.in',
    };
  });
});
