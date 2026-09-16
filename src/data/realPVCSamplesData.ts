export interface PVCSampleCardData {
  id: string;
  institutionName: string;
  categoryLabel: string;
  tagline: string;
  theme: 'school-cbse' | 'it-corporate' | 'hospital-medical' | 'engineering-maroon' | 'gym-gold';
  city: string;
  
  // Front Card specifics
  front: {
    badgeText?: string;
    subBadge?: string;
    emblemType: 'school' | 'corporate' | 'medical' | 'university' | 'luxury-gym';
    emblemTitle: string;
    emblemSubtitle: string;
    affiliationText?: string;
    photoUrl: string;
    dummyName: string;
    roleOrClass: string;
    departmentOrProgram: string;
    dummyIdNumber: string;
    dummyBloodGroup: string;
    validTill: string;
    accentColor: string;
    headerBg: string;
    headerTextColor: string;
    extraFrontField?: { label: string; value: string };
  };

  // Back Card specifics (Strict Uniform Structure)
  back: {
    photoThumbnailUrl: string;
    dummyIdNumber: string;
    dummyDob: string;
    dummyBloodGroup: string;
    dummyEmergencyContact: string;
    dummyAddress: string;
    validTill: string;
    organizationAddress: string;
    website: string;
    email: string;
    signatoryTitle: string;
    barcodeCode: string;
  };
}

export const REAL_PVC_SAMPLES: PVCSampleCardData[] = [
  {
    id: 'sample-cbse-school',
    institutionName: 'Delhi Public School, R.K. Puram',
    categoryLabel: '1. CBSE School Student ID Card',
    tagline: 'CBSE Affiliated Senior Secondary School • New Delhi',
    theme: 'school-cbse',
    city: 'New Delhi',
    front: {
      badgeText: 'STUDENT PASS',
      emblemType: 'school',
      emblemTitle: 'DELHI PUBLIC SCHOOL',
      emblemSubtitle: 'R.K. PURAM • NEW DELHI',
      affiliationText: 'CBSE Affiliation No: 2730015 | School Code: 65541',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      dummyName: 'AARAV SHARMA',
      roleOrClass: 'Class X – Section B (2025–26)',
      departmentOrProgram: 'House: Ganga • Roll No: 24',
      dummyIdNumber: 'DPS-2025-0841',
      dummyBloodGroup: 'O +ve',
      validTill: '31-MAR-2027',
      accentColor: '#1d4ed8',
      headerBg: 'from-blue-900 via-blue-800 to-indigo-900',
      headerTextColor: '#ffffff',
      extraFrontField: { label: 'BUS ROUTE', value: 'Route 14 (Hauz Khas)' }
    },
    back: {
      photoThumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
      dummyIdNumber: 'DPS-2025-0841',
      dummyDob: '14-Aug-2009',
      dummyBloodGroup: 'O +ve',
      dummyEmergencyContact: '+91 98102 34567',
      dummyAddress: 'Flat 402, Shivalik Apartments, Sector 9, R.K. Puram, New Delhi - 110022',
      validTill: '31-MAR-2027',
      organizationAddress: 'Sector XII, R.K. Puram, New Delhi, Delhi - 110022',
      website: 'www.dpsrkp.net',
      email: 'principal@dpsrkp.net',
      signatoryTitle: 'Principal / Authorized Signatory',
      barcodeCode: '273001509284'
    }
  },
  {
    id: 'sample-it-company',
    institutionName: 'TechVeda Systems Private Limited',
    categoryLabel: '2. IT Company Employee ID Card',
    tagline: 'Global Enterprise Cloud & AI Engineering Campus',
    theme: 'it-corporate',
    city: 'Bengaluru',
    front: {
      badgeText: 'CORPORATE IDENTITY',
      subBadge: 'SEZ CAMPUS 1',
      emblemType: 'corporate',
      emblemTitle: 'TECHVEDA SYSTEMS',
      emblemSubtitle: 'ENTERPRISE CLOUD LABS • INDIA',
      affiliationText: 'Corporate Identity No: U72200KA2016PTC089104',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      dummyName: 'ROHAN KRISHNAN',
      roleOrClass: 'Senior Cloud Solutions Architect',
      departmentOrProgram: 'Dept: DevOps & Platform Engineering',
      dummyIdNumber: 'TVS-BLR-8842',
      dummyBloodGroup: 'B +ve',
      validTill: '31-DEC-2028',
      accentColor: '#0ea5e9',
      headerBg: 'from-slate-950 via-slate-900 to-sky-950',
      headerTextColor: '#ffffff',
      extraFrontField: { label: 'WORK LOCATION', value: 'Tower B, Floor 6' }
    },
    back: {
      photoThumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      dummyIdNumber: 'TVS-BLR-8842',
      dummyDob: '22-May-1992',
      dummyBloodGroup: 'B +ve',
      dummyEmergencyContact: '+91 98450 12890',
      dummyAddress: '404 Ferns Residency, Sarjapur Outer Ring Road, Bellandur, Bengaluru - 560103',
      validTill: '31-DEC-2028',
      organizationAddress: 'Tower B, Global Tech Park, Electronics City Phase 1, Bengaluru - 560100',
      website: 'www.techvedasystems.in',
      email: 'security.hr@techvedasystems.in',
      signatoryTitle: 'VP – Human Resources & Compliance',
      barcodeCode: '884272200104'
    }
  },
  {
    id: 'sample-hospital-staff',
    institutionName: 'Apollo Multispeciality Hospitals',
    categoryLabel: '3. Multispeciality Hospital Staff ID Card',
    tagline: 'Tertiary Care & Super Specialty Healthcare Institute',
    theme: 'hospital-medical',
    city: 'Chennai',
    front: {
      badgeText: 'DOCTOR / CRITICAL CARE',
      subBadge: 'SUPER SPECIALITY',
      emblemType: 'medical',
      emblemTitle: 'APOLLO HOSPITALS',
      emblemSubtitle: 'INSTITUTE OF CARDIAC SCIENCES',
      affiliationText: 'NABH & JCI Accredited Healthcare Provider',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      dummyName: 'DR. ANANYA DESHMUKH',
      roleOrClass: 'Senior Consultant – Cardiology',
      departmentOrProgram: 'Dept: Interventional Cardio-Thoracic',
      dummyIdNumber: 'APH-DOC-3190',
      dummyBloodGroup: 'AB +ve',
      validTill: '30-NOV-2027',
      accentColor: '#059669',
      headerBg: 'from-emerald-900 via-emerald-800 to-teal-950',
      headerTextColor: '#ffffff',
      extraFrontField: { label: 'COUNCIL REG NO', value: 'MMC / 2014 / 09823' }
    },
    back: {
      photoThumbnailUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
      dummyIdNumber: 'APH-DOC-3190',
      dummyDob: '18-Oct-1988',
      dummyBloodGroup: 'AB +ve',
      dummyEmergencyContact: '+91 99201 44829',
      dummyAddress: 'Villa 12, Gulmohar Enclave, Greams Road, Thousand Lights, Chennai - 600006',
      validTill: '30-NOV-2027',
      organizationAddress: '21 Greams Lane, Off Greams Road, Thousand Lights, Chennai, TN - 600006',
      website: 'www.apollohealth.in',
      email: 'med.superintendent@apollohealth.in',
      signatoryTitle: 'Medical Superintendent / Chief Medical Officer',
      barcodeCode: '319005966914'
    }
  },
  {
    id: 'sample-engineering-college',
    institutionName: 'Vellore Institute of Technology (VIT)',
    categoryLabel: '4. Engineering College Student ID Card',
    tagline: 'Institution of Eminence • Deemed University u/s 3 UGC Act',
    theme: 'engineering-maroon',
    city: 'Vellore',
    front: {
      badgeText: 'UNIVERSITY STUDENT PASS',
      emblemType: 'university',
      emblemTitle: 'VELLORE INSTITUTE OF TECHNOLOGY',
      emblemSubtitle: 'A PLACE TO LEARN, A CHANCE TO GROW',
      affiliationText: 'NAAC A++ Accredited | Ranked #8 in NIRF Universities',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      dummyName: 'ADITYA VARMA',
      roleOrClass: 'B.Tech – Computer Science & Engg.',
      departmentOrProgram: 'School: SCOPE • Batch: 2024–2028',
      dummyIdNumber: '24BCE10482',
      dummyBloodGroup: 'A +ve',
      validTill: '30-JUN-2028',
      accentColor: '#881337',
      headerBg: 'from-rose-950 via-rose-900 to-stone-900',
      headerTextColor: '#ffffff',
      extraFrontField: { label: 'HOSTEL BLOCK', value: 'Block-H Room 312' }
    },
    back: {
      photoThumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      dummyIdNumber: '24BCE10482',
      dummyDob: '05-Jan-2006',
      dummyBloodGroup: 'A +ve',
      dummyEmergencyContact: '+91 98402 77192',
      dummyAddress: 'Room 312, Block-H Men’s Hostel, VIT Main Campus, Katpadi, Vellore - 632014',
      validTill: '30-JUN-2028',
      organizationAddress: 'Katpadi, Thiruvalam Road, Vellore, Tamil Nadu - 632014',
      website: 'www.vit.ac.in',
      email: 'registrar.office@vit.ac.in',
      signatoryTitle: 'Dean – Student Welfare & Academic Affairs',
      barcodeCode: '241048288133'
    }
  },
  {
    id: 'sample-gym-club',
    institutionName: 'The Royal Gym & Olympic Fitness Club',
    categoryLabel: '5. Gym / Club Membership Card',
    tagline: 'Ultra-Luxury Athletic Wellness & Olympic Training Spa',
    theme: 'gym-gold',
    city: 'Gurugram',
    front: {
      badgeText: 'VIP MEMBERSHIP',
      subBadge: 'DIAMOND TIER',
      emblemType: 'luxury-gym',
      emblemTitle: 'THE ROYAL GYM & OLYMPIC CLUB',
      emblemSubtitle: 'PREMIER PRIVATE HEALTH CLUB',
      affiliationText: 'Certified Member – International Health & Racquet Club Federation',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      dummyName: 'VIKRAMADITYA SINGHANIA',
      roleOrClass: 'Elite All-Access Diamond Patron',
      departmentOrProgram: 'Perk: Personal Trainer + Hydro-Spa',
      dummyIdNumber: 'RGC-VIP-0077',
      dummyBloodGroup: 'B -ve',
      validTill: '31-DEC-2029',
      accentColor: '#d97706',
      headerBg: 'from-zinc-950 via-neutral-900 to-black',
      headerTextColor: '#fbbf24',
      extraFrontField: { label: 'LOCKER PRIVILEGE', value: 'Private Locker #12' }
    },
    back: {
      photoThumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      dummyIdNumber: 'RGC-VIP-0077',
      dummyDob: '11-Nov-1985',
      dummyBloodGroup: 'B -ve',
      dummyEmergencyContact: '+91 98111 99283',
      dummyAddress: 'Penthouse 18B, The Magnolias, Golf Course Road, DLF Phase 5, Gurugram - 122002',
      validTill: '31-DEC-2029',
      organizationAddress: '44 Golf Course Road, Sector 54, Gurugram, Haryana - 122002',
      website: 'www.royalgymclub.in',
      email: 'concierge@royalgymclub.in',
      signatoryTitle: 'General Manager / Club Secretary',
      barcodeCode: '007721590629'
    }
  }
];
