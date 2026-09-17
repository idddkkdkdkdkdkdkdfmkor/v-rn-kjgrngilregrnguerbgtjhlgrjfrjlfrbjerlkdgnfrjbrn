export interface ReviewCategory {
  id: string;
  name: string;
  icon: string;
  defaultProduct: string;
}

export const CATEGORIES: ReviewCategory[] = [
  { id: 'all', name: 'General / Popular', icon: '⭐', defaultProduct: 'PVC ID Cards & Lanyards' },
  { id: 'school', name: 'School & College', icon: '🏫', defaultProduct: 'School ID Cards' },
  { id: 'corporate', name: 'Corporate & HR', icon: '🏢', defaultProduct: 'Employee ID Cards' },
  { id: 'coaching', name: 'Coaching Institute', icon: '📚', defaultProduct: 'Student ID Cards' },
  { id: 'awards', name: 'Trophies & Medals', icon: '🏆', defaultProduct: 'Trophies & Medals' },
  { id: 'urgent', name: 'Urgent / Single Card', icon: '⚡', defaultProduct: 'Custom ID Cards' },
];

export interface ClientReviewItem {
  id: string;
  category: string;
  language: 'English' | 'Hinglish' | 'Hindi';
  text: string;
  keywords: string[];
}

export const CLIENT_REVIEWS: ClientReviewItem[] = [
  // ==========================================
  // 1. GENERAL / POPULAR (ALL)
  // ==========================================
  // English
  {
    id: 'gen-en-1',
    category: 'all',
    language: 'English',
    text: 'Outstanding craftsmanship from IDCraft Technologies! Ordered a custom set of PVC identity cards along with premium satin lanyards. The colors are vivid, the photo resolution is razor-sharp, and the cards feel very sturdy in hand. Delivery was ahead of estimated time.',
    keywords: ['PVC ID Cards', 'Satin Lanyards', 'ID Card Printing'],
  },
  {
    id: 'gen-en-2',
    category: 'all',
    language: 'English',
    text: 'Super impressed with the speed and finishing. Sent our artwork via WhatsApp and received clean digital mockups within an hour. The physical cards arrived in safe bubble packaging with zero defects. Will definitely order again.',
    keywords: ['Custom ID Cards', 'Fast Delivery', 'Digital Mockups'],
  },
  {
    id: 'gen-en-3',
    category: 'all',
    language: 'English',
    text: 'Affordable pricing without cutting corners on material quality. The card thickness is genuine CR80 standard PVC that does not bend or crack easily. Staff was polite, knowledgeable, and gave us updates at every printing stage.',
    keywords: ['CR80 Standard PVC', 'Affordable Pricing', 'Customer Service'],
  },
  {
    id: 'gen-en-4',
    category: 'all',
    language: 'English',
    text: 'Reliable printing partner for our recurring ID requirements. The badge clips and lanyard hooks are heavy-duty metal rather than cheap plastic. Seamless coordination and timely doorstep shipping.',
    keywords: ['Heavy-Duty Metal Clips', 'Lanyards', 'Reliable Printing'],
  },

  // Hinglish
  {
    id: 'gen-hn-1',
    category: 'all',
    language: 'Hinglish',
    text: 'IDCraft Technologies ki service sach me lajawab hai. Custom PVC cards aur multicolor ribbon lanyards order kiye the. Photo print ekdum clear aayi hai aur card ka finish kaafi solid hai, bilkul bhi cheap feel nahi hota.',
    keywords: ['Custom PVC Cards', 'Multicolor Ribbon', 'Photo Print'],
  },
  {
    id: 'gen-hn-2',
    category: 'all',
    language: 'Hinglish',
    text: 'WhatsApp par draft approval se lekar delivery tak sab kuch smooth raha. Rate bhi market se kaafi genuine hai aur kaam me zero compromise. Card ki edges smooth hain aur colors bilkul sharp hain.',
    keywords: ['Draft Approval', 'Genuine Rates', 'Smooth Edges'],
  },
  {
    id: 'gen-hn-3',
    category: 'all',
    language: 'Hinglish',
    text: 'Pehli baar order kiya tha toh thoda doubt tha, par final result dekh kar dil khush ho gaya. 3 din me proper packaging ke sath parcel receive ho gaya. Strongly recommend karta hoon sabhi ko!',
    keywords: ['Safe Packaging', 'Timely Parcel', 'Quality Printing'],
  },
  {
    id: 'gen-hn-4',
    category: 'all',
    language: 'Hinglish',
    text: 'Bahut hi professional team hai. Urgent requirement thi aur inhone timeline match karke diya. Quality aisi hai jo lambe time tak durable rahegi. Excellent customer support aur polite behavior!',
    keywords: ['Professional Team', 'Urgent Printing', 'Durable PVC'],
  },

  // Hindi
  {
    id: 'gen-hi-1',
    category: 'all',
    language: 'Hindi',
    text: 'IDCraft Technologies से हमारे संस्थान के लिए कार्ड और रिबन प्रिंट करवाए। छपाई की गुणवत्ता बहुत स्पष्ट है और रंग बिल्कुल हमारे लोगो के अनुसार हैं। समय पर सुरक्षित डिलीवरी मिली। टीम का व्यवहार अत्यंत सहयोगी रहा।',
    keywords: ['ID Cards', 'Lanyards', 'ID Card Printing'],
  },

  // ==========================================
  // 2. SCHOOL & COLLEGE
  // ==========================================
  // English
  {
    id: 'sch-en-1',
    category: 'school',
    language: 'English',
    text: 'IDCraft printed the complete annual batch of ID cards for our school students and faculty. The photographs came out crystal-clear and the school crest on the woven lanyards looks dignified. Flawless execution on bulk data.',
    keywords: ['School ID Cards', 'Student Photographs', 'Woven Lanyards'],
  },
  {
    id: 'sch-en-2',
    category: 'school',
    language: 'English',
    text: 'Managing 600+ student records is usually chaotic, but IDCraft data handling was impeccable. Not a single typo in names or blood groups, and the class barcodes scanned on our attendance reader on the first attempt.',
    keywords: ['Bulk Data Handling', 'Barcode Scanning', 'Attendance System'],
  },
  {
    id: 'sch-en-3',
    category: 'school',
    language: 'English',
    text: 'Ordered college library cards with encoded QR codes and transparent badge holders. The lamination finish prevents scratches and fading from regular student usage. Delivered neatly arranged by grade and section.',
    keywords: ['Library Cards', 'QR Codes', 'Transparent Holders'],
  },

  // Hinglish
  {
    id: 'sch-hn-1',
    category: 'school',
    language: 'Hinglish',
    text: 'Hamare school ke naye session ke liye 400+ student ID cards banwaye the. Excel sheet se data accurately match hua, ek bhi student ka naam ya roll number galat nahi tha. Parents aur teachers dono ko cards pasand aaye.',
    keywords: ['Student ID Cards', 'Excel Data Verification', 'School Session'],
  },
  {
    id: 'sch-hn-2',
    category: 'school',
    language: 'Hinglish',
    text: 'Bachho ke ID cards aur customized school lanyards ki quality top notch hai. Colors washable hain aur ribbon skin par chubhta nahi hai. Session reopen hone se pehle hi complete dispatch mil gaya.',
    keywords: ['Customized Lanyards', 'Washable Colors', 'Soft Ribbon'],
  },
  {
    id: 'sch-hn-3',
    category: 'school',
    language: 'Hinglish',
    text: 'College fest aur library entry ke liye cards banwaye the. Barcode reader par instant scan ho raha hai. Rate bulk quantity ke hisab se bohot reasonable mila aur packing class-wise sorted aayi.',
    keywords: ['College Fest', 'Barcode Scanner', 'Bulk Discount'],
  },
  {
    id: 'sch-hn-4',
    category: 'school',
    language: 'Hinglish',
    text: 'Principal sir ne special instruction diya tha emergency blood group highlight karne ka, aur IDCraft ne design me bina extra charge perfectly integrate kar diya. Truly cooperative team!',
    keywords: ['Blood Group Detail', 'Emergency Contact', 'Design Customization'],
  },

  // Hindi
  {
    id: 'sch-hi-1',
    category: 'school',
    language: 'Hindi',
    text: 'हमारे विद्यालय के सभी छात्रों के school ID cards समय पर तैयार करवा कर देने के लिए IDCraft का धन्यवाद। बच्चों की फोटो और जानकारी बिल्कुल साफ छपी है। पैकिंग और डिलीवरी भी बहुत व्यवस्थित थी।',
    keywords: ['School ID Cards', 'School Branding'],
  },

  // ==========================================
  // 3. CORPORATE & HR
  // ==========================================
  // English
  {
    id: 'corp-en-1',
    category: 'corporate',
    language: 'English',
    text: 'Ordered corporate ID badges for our IT firms new office branch. The matte finish gives a sophisticated executive look, and the dual-sided printing maintains crisp legibility. Prompt billing and GST compliance.',
    keywords: ['Corporate ID Badges', 'Matte Finish', 'GST Billing'],
  },
  {
    id: 'corp-en-2',
    category: 'corporate',
    language: 'English',
    text: 'The security RFID cards work effortlessly with our turnstile entry gates. IDCraft took extra care to match our brands exact hex color code for the lanyards. Great communication and professional ethics.',
    keywords: ['RFID Cards', 'Turnstile Gates', 'Hex Color Matching'],
  },
  {
    id: 'corp-en-3',
    category: 'corporate',
    language: 'English',
    text: 'As an HR manager, finding a dependable vendor for new joinee welcome kits was crucial. IDCraft delivers high-grade badges and metal lobster clips that hold up to daily office commutes.',
    keywords: ['New Joinee Badges', 'Metal Lobster Clips', 'HR Vendor'],
  },

  // Hinglish
  {
    id: 'corp-hn-1',
    category: 'corporate',
    language: 'Hinglish',
    text: 'Office ke new joinees ke liye employee ID cards aur company logo wale lanyards order kiye the. Matte PVC finish dekhne me kaafi premium lagti hai. WhatsApp support par updates time to time milte rahe.',
    keywords: ['Employee ID Cards', 'Company Logo', 'Matte PVC Finish'],
  },
  {
    id: 'corp-hn-2',
    category: 'corporate',
    language: 'Hinglish',
    text: 'Turnstile attendance gate ke sensor par smart cards turant catch kar rahe hain. Ribbon par company ka logo aur tagline bilkul crisp print hui hai. Corporate needs ke liye best vendor hai.',
    keywords: ['Smart Cards', 'Turnstile Attendance', 'Crisp Ribbon Print'],
  },
  {
    id: 'corp-hn-3',
    category: 'corporate',
    language: 'Hinglish',
    text: 'Fast turnaround and professional billing with GST invoice. Card holders ki quality bhi sturdy hai aur clip daily use me tutne wali nahi hai. Overall hassle-free experience with IDCraft team.',
    keywords: ['GST Invoice', 'Sturdy Card Holders', 'Quick Turnaround'],
  },
  {
    id: 'corp-hn-4',
    category: 'corporate',
    language: 'Hinglish',
    text: 'Startups ke liye small batch badges banwana aksar expensive hota hai, par IDCraft ne minimum quantity par bhi corporate pricing offer ki. Badge quality looks as good as multinational firms.',
    keywords: ['Small Batch Printing', 'Startup Friendly', 'Executive Look'],
  },

  // ==========================================
  // 4. COACHING INSTITUTE
  // ==========================================
  // English
  {
    id: 'coach-en-1',
    category: 'coaching',
    language: 'English',
    text: 'We run an entrance coaching institute and needed 250 batch cards with distinct color bands for morning and evening shifts. IDCraft organized everything flawlessly. The batch bar codes scan reliably on our gate scanners.',
    keywords: ['Coaching ID Cards', 'Batch Colors', 'Barcode Scanners'],
  },
  {
    id: 'coach-en-2',
    category: 'coaching',
    language: 'English',
    text: 'Great experience ordering coaching ID cards. The student photographs were sourced from various phone cameras, yet IDCraft color-corrected them so every card looked sharp and uniform. Very pleased!',
    keywords: ['Photo Color Correction', 'Uniform Print', 'Student Cards'],
  },
  {
    id: 'coach-en-3',
    category: 'coaching',
    language: 'English',
    text: 'Pocket-friendly pricing for bulk student admissions. The PVC material withstands being tucked in bags and pockets without fraying at the borders. Highly dependable team for educational institutes.',
    keywords: ['Durable PVC', 'Pocket Friendly', 'Educational Institute'],
  },

  // Hinglish
  {
    id: 'coach-hn-1',
    category: 'coaching',
    language: 'Hinglish',
    text: 'Coaching centre ke students ke liye batch wise ID cards print karwaye. Morning aur evening batch ke alag-alag color borders ekdum neat the. Biometric attendance reader par scanner smoothly kaam kar raha hai.',
    keywords: ['Batch Wise Cards', 'Biometric Attendance', 'Neat Borders'],
  },
  {
    id: 'coach-hn-2',
    category: 'coaching',
    language: 'Hinglish',
    text: 'Students ke mobile photos the fir bhi inki team ne editing karke cards par clarity bohot badhiya di. Rate per card kaafi affordable raha aur delivery bhi 48 ghante me ho gayi.',
    keywords: ['Photo Retouching', 'Affordable Rates', 'Fast Shipping'],
  },
  {
    id: 'coach-hn-3',
    category: 'coaching',
    language: 'Hinglish',
    text: 'Institute ke test series entry pass ke liye card banwaye the. Water resistant PVC hone ki wajah se cards kharab nahi hote. IDCraft ka coordination kaafi helpful tha.',
    keywords: ['Water Resistant PVC', 'Test Series Pass', 'Friendly Support'],
  },
  {
    id: 'coach-hn-4',
    category: 'coaching',
    language: 'Hinglish',
    text: 'Admission season me time ki kami hoti hai. Inhone roll number format aur QR codes khud generate karke verify karwaye. Zero errors and 100% satisfaction!',
    keywords: ['QR Code Generation', 'Roll Number Verification', 'Zero Errors'],
  },

  // ==========================================
  // 5. TROPHIES & MEDALS
  // ==========================================
  // English
  {
    id: 'awards-en-1',
    category: 'awards',
    language: 'English',
    text: 'Commissioned custom wooden-acrylic trophies and gold finish medals for our inter-school debate championship. The gold laser engraving was immaculate, and the protective packaging ensured zero scratches in transit.',
    keywords: ['Acrylic Trophies', 'Gold Finish Medals', 'Laser Engraving'],
  },
  {
    id: 'awards-en-2',
    category: 'awards',
    language: 'English',
    text: 'Superb craftsmanship on our corporate annual awards. The crystal mementos had substantial heft, polished bevel edges, and the text was aligned with millimeter precision. Our management was delighted.',
    keywords: ['Crystal Mementos', 'Polished Edges', 'Corporate Awards'],
  },
  {
    id: 'awards-en-3',
    category: 'awards',
    language: 'English',
    text: 'Ordered 100 die-cast medals with customized tricolor neck ribbons for a marathon event. The medal weight felt substantial and the ribbon stitching was robust. True value for money!',
    keywords: ['Die-Cast Medals', 'Tricolor Neck Ribbon', 'Marathon Awards'],
  },

  // Hinglish
  {
    id: 'awards-hn-1',
    category: 'awards',
    language: 'Hinglish',
    text: 'Annual sports meet ke liye gold, silver aur bronze medals ka order diya tha. Medals ka weight kaafi solid hai aur ribbon ki stitching strong hai. Winners medals pehan kar bohot khush the!',
    keywords: ['Sports Medals', 'Solid Weight', 'Strong Ribbon Stitching'],
  },
  {
    id: 'awards-hn-2',
    category: 'awards',
    language: 'Hinglish',
    text: 'Cultural program ke chief guests ke liye customized acrylic trophies banwayi thi. Laser cutting aur text alignment ekdum perfect tha. Har trophy individual box packing me safe aayi.',
    keywords: ['Acrylic Trophies', 'Laser Cutting', 'Individual Box Packing'],
  },
  {
    id: 'awards-hn-3',
    category: 'awards',
    language: 'Hinglish',
    text: 'Event se do din pehle urgent mementos ki zarurat pad gayi thi. IDCraft ne timely delivery karke hamara event bacha liya. Quality aur shine dono shandar thi.',
    keywords: ['Urgent Mementos', 'Fast Delivery', 'Shining Finish'],
  },
  {
    id: 'awards-hn-4',
    category: 'awards',
    language: 'Hinglish',
    text: 'Badminton tournament ke prizes ke liye wooden base trophies customize karwayi. Name plate par spelling aur logo embossing kaafi neat thi. Pure tournament me awards ki taareef hui.',
    keywords: ['Wooden Base Trophies', 'Embossed Logo', 'Tournament Prizes'],
  },

  // ==========================================
  // 6. URGENT / SINGLE CARD
  // ==========================================
  // English
  {
    id: 'urg-en-1',
    category: 'urgent',
    language: 'English',
    text: 'Lost my office ID badge a day prior to an important client audit. Contacted IDCraft in panic, and they verified my old digital file, printed, and dispatched a replica within hours. Lifesaver service!',
    keywords: ['Single Replacement Card', 'Rapid Dispatch', 'Office Audit'],
  },
  {
    id: 'urg-en-2',
    category: 'urgent',
    language: 'English',
    text: 'Needed an urgent single replacement card with custom barcode for gate clearance. Most vendors refuse single-piece orders, but IDCraft treated my request with utmost priority. Respect for their dedication.',
    keywords: ['Single Piece Order', 'Gate Clearance', 'High Priority'],
  },
  {
    id: 'urg-en-3',
    category: 'urgent',
    language: 'English',
    text: 'Super rapid turnaround! Approved the digital proof in the morning and picked up the completed card before evening. Sharp photo clarity and perfect matching dimensions.',
    keywords: ['Same Day Delivery', 'Digital Proof', 'Matching Dimensions'],
  },

  // Hinglish
  {
    id: 'urg-hn-1',
    category: 'urgent',
    language: 'Hinglish',
    text: 'Exam hall ticket ke sath photo ID card compulsory tha aur mera card kho gaya tha. IDCraft ne 24 ghante ke andar exact replacement card bana kar courier kar diya. Itni fast service maine pehle kabhi nahi dekhi!',
    keywords: ['Exam Photo ID', '24 Hour Courier', 'Emergency Replacement'],
  },
  {
    id: 'urg-hn-2',
    category: 'urgent',
    language: 'Hinglish',
    text: 'Ek single urgent card ke liye mostly printers mana kar dete hain, par IDCraft ne turant accept kiya aur sample matching karke dispatch kiya. Super helpful behavior aur best print quality.',
    keywords: ['Single Card Print', 'Sample Matching', 'Helpful Staff'],
  },
  {
    id: 'urg-hn-3',
    category: 'urgent',
    language: 'Hinglish',
    text: 'Subah WhatsApp par details bheji aur shaam tak ready card ka video preview mil gaya. Next day subah mere hath me card tha. Urgent needs ke liye in par blind trust kar sakte hain.',
    keywords: ['WhatsApp Video Preview', 'Next Day Delivery', 'Urgent Trust'],
  },
  {
    id: 'urg-hn-4',
    category: 'urgent',
    language: 'Hinglish',
    text: 'Collar badge pin toot gaya tha aur naya identity card instantly chahiye tha. Inhone customized PVC badge with magnetic clip ready karke courier kar diya. Totally worth it!',
    keywords: ['Magnetic Clip Badge', 'Customized PVC', 'Instant Dispatch'],
  },
];

export const GOOGLE_PLACE_ID = 'ChIJOTJwmGE8gyIRJMKALz4y9qY';
// Direct link that immediately opens the "Write a review" box with 5 stars:
export const GOOGLE_DIRECT_WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJOTJwmGE8gyIRJMKALz4y9qY';
export const GOOGLE_MAPS_LISTING_URL = 'https://maps.app.goo.gl/Swyyj8i3fuG7sDbx7';
export const GOOGLE_REVIEW_URL = GOOGLE_DIRECT_WRITE_REVIEW_URL;
export const OFFICIAL_WEBSITE_URL = 'http://idcraft.dpdns.org/';
