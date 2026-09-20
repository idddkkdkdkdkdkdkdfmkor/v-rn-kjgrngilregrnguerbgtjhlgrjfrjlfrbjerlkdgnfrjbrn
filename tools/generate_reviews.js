import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define categories matching all IDCraft deliverables
const CATEGORIES = [
  'pvc-cards',      // PVC ID Cards (School, College, Coaching)
  'lanyards',       // Custom Printed Satin Lanyards & Ribbons
  'trophies',       // Trophies, Medals & Award Plaques
  'certificates',   // Gold-foiled Certificates & Folders
  'corporate-rfid', // Corporate Badges & Smart RFID / Mifare
  'healthcare',     // Hospital, Doctor & Clinic Badges
  'nfc-cards',      // Digital NFC Business Cards & Smart Passes
  'urgent',         // Emergency 24-hr Dispatches & Single Cards
];

const CITIES = [
  'Lucknow', 'Delhi NCR', 'Gurgaon', 'Noida', 'Greater Noida', 'Kanpur', 
  'Varanasi', 'Prayagraj', 'Agra', 'Meerut', 'Mumbai', 'Navi Mumbai', 
  'Pune', 'Bengaluru', 'Hyderabad', 'Jaipur', 'Kota', 'Patna', 
  'Ranchi', 'Kolkata', 'Ahmedabad', 'Surat', 'Chandigarh', 'Ludhiana', 
  'Indore', 'Bhopal', 'Chennai', 'Coimbatore', 'Kochi', 'Dehradun',
  'Gorakhpur', 'Bareilly', 'Faridabad', 'Ghaziabad', 'Jodhpur', 'Udaipur'
];

const PERSONAS_BY_CAT = {
  'pvc-cards': ['School Principal', 'Academic Coordinator', 'Teacher', 'Coaching Institute Owner', 'College Dean', 'Administrative Officer', 'Hostel Warden'],
  'lanyards': ['School Administrator', 'HR Manager', 'Event Coordinator', 'College Secretary', 'Marketing Lead', 'Startup Founder'],
  'trophies': ['Sports Secretary', 'Annual Day Convener', 'School Principal', 'Tournament Director', 'Club President', 'Cultural Head'],
  'certificates': ['Examination Controller', 'Principal', 'Institute Director', 'Dean of Academics', 'Workshop Organizer'],
  'corporate-rfid': ['HR Director', 'IT Infrastructure Manager', 'Facility Head', 'Security In-charge', 'Operations Head', 'Startup Founder'],
  'healthcare': ['Hospital Administrator', 'Medical Superintendent', 'Nursing Supervisor', 'Clinic Director', 'Lab Manager'],
  'nfc-cards': ['Startup Founder', 'Sales Director', 'Managing Partner', 'Creative Agency Head', 'Consultant', 'Business Head'],
  'urgent': ['Parent', 'Student', 'Admin Assistant', 'HR Executive', 'Examination Coordinator']
};

const ORDER_SIZES_BY_CAT = {
  'pvc-cards': ['350 cards', '600 cards', '1,200 cards', '850 cards', '2,400 cards', '150 cards', '450 cards', '3,000 cards'],
  'lanyards': ['500 pcs', '1,000 pcs', '250 pcs', '2,000 pcs', '150 pcs', '800 pcs', '1,500 pcs'],
  'trophies': ['85 trophies & 200 medals', '120 custom trophies', '350 medals', '50 wooden mementos', '250 medals & 45 trophies', '180 acrylic awards'],
  'certificates': ['500 gold-foil certificates', '1,200 certificates', '350 certificate folders', '800 convocation certificates'],
  'corporate-rfid': ['250 RFID cards', '600 Mifare badges', '150 smart badges', '1,000 turnstile cards', '400 corporate credentials'],
  'healthcare': ['220 doctor & staff badges', '450 hospital credentials', '120 magnetic badges', '600 clinical IDs'],
  'nfc-cards': ['15 executive cards', '30 NFC metal cards', '50 matte black cards', '25 digital business cards', '10 smart founder cards'],
  'urgent': ['1 replacement card', '5 emergency cards', '2 urgent duplicate badges', '10 express sample cards', '1 urgent student pass']
};

// Phrasing banks for procedural generation
const ENGLISH_TEMPLATES = {
  'pvc-cards': [
    (city, size, persona) => `As a ${persona} in ${city}, finding a reliable identity card manufacturer was always stressful until we found IDCraft. We ordered ${size} for our student batch. The 30mil solid PVC thickness is genuine bank-grade quality and the photo resolution is remarkably sharp. The library barcodes scan instantly without any alignment glitches. Delivered 3 days before our school reopening!`,
    (city, size, persona) => `Outstanding print clarity and solid finish! Placed a bulk order of ${size} for our institution in ${city}. Unlike local paper laminated cards that peel within months, these hydraulic thermal fused cards are 100% waterproof and scratch-resistant. The student emergency contact and blood group details came out crystal clear.`,
    (city, size, persona) => `Extremely pleased with our experience ordering ${size} from IDCraft India. Their team handled our Excel roster and photo folder without a single mix-up. The classroom-wise bundled packaging made distribution completely effortless for our staff in ${city}. Highly recommended for any school or college!`,
    (city, size, persona) => `Ordered ${size} for our coaching hub in ${city}. The double-sided color saturation is vibrant and the edge die-cutting is smooth with zero burrs. Parents and students both appreciated the clean, premium feel. Will definitely partner with IDCraft every academic session.`,
    (city, size, persona) => `We needed ${size} with custom bus route QR codes for our ${city} campus. IDCraft delivered exactly to our design specifications. Every single QR code was verified and scanned properly on parent mobile phones. Great coordination over WhatsApp and punctual air dispatch.`
  ],
  'lanyards': [
    (city, size, persona) => `Ordered ${size} 20mm premium multicolor satin lanyards for our organization in ${city}. The dye-sublimation print fidelity is exceptional—our brand logo and exact Pantone color were matched 100%. The heavy-duty metal dog-hooks and safety breakaways feel very sturdy.`,
    (city, size, persona) => `Super impressed with the lanyard quality from IDCraft! Ordered ${size} with custom institutional branding for our ${city} branch. The satin fabric is soft around the neck, doesn't fray, and the text print is razor sharp. Timely delivery and zero defects in the entire lot.`,
    (city, size, persona) => `The custom printed lanyards paired with our ID badges look remarkably executive. We got ${size} for our annual convention in ${city}. The metal clips are robust, not cheap wire hooks. IDCraft shared physical video proofs before bulk production which gave us immense confidence.`,
    (city, size, persona) => `Great craftsmanship on our ${size} satin ribbon order for our academy in ${city}. The colors did not bleed, the stitching on the clasp is reinforced, and dispatch was handled ahead of schedule via express courier.`
  ],
  'trophies': [
    (city, size, persona) => `Entrusted IDCraft with ${size} for our annual sports day in ${city}. The heavy die-cast metal medals had a satisfying weight and the laser-engraved acrylic trophies looked breathtaking on the award podium. Meticulous bubble packaging ensured zero scratches or glass chipping during transit!`,
    (city, size, persona) => `Spectacular awards and mementos! We ordered ${size} for our inter-school cultural fest in ${city}. The wooden base finish and custom golden plaque engraving were flawless. Chief guests and winners were all praises. Thank you IDCraft team for making our ceremony memorable!`,
    (city, size, persona) => `Ordered ${size} for our state championship held in ${city}. The ribbon quality on the medals was top notch with our federation logo woven nicely. Packaging was superb—every trophy was individually boxed in protective foam. Truly professional service.`
  ],
  'certificates': [
    (city, size, persona) => `We ordered ${size} for our convocation ceremony in ${city}. The 300 GSM textured paper stock and the metallic gold-foil emblem stamping added such a regal look to our graduating students' degrees. Delivered flat without a single bent corner!`,
    (city, size, persona) => `Exceptional certificate printing service from IDCraft. Ordered ${size} with security anti-copy background patterns and serial numbering for our ${city} institute. The paper grade is premium and ink density is rich. Very dependable team.`,
    (city, size, persona) => `Our ${size} requirement for the annual conference in ${city} was fulfilled flawlessly. The certificate folders with embossed logos were loved by all dignitaries. Prompt customer support and safe moisture-proof shipping.`
  ],
  'corporate-rfid': [
    (city, size, persona) => `As ${persona} for a tech facility in ${city}, we required ${size} compatible with our biometric turnstiles and HID readers. IDCraft encoded the Mifare 1K chips with 100% accuracy. The executive matte finish and micro-text security guilloche look world-class.`,
    (city, size, persona) => `Seamless turnstile integration! Ordered ${size} for our corporate headquarters in ${city}. Every single employee card read smoothly at our entrance barriers on day one. Communication was professional and pricing was unbeatable for manufacturer-direct quality.`,
    (city, size, persona) => `Transitioned our company access credentials to IDCraft's solid smart PVC cards. We got ${size} in ${city}. The cards resist daily wallet friction and pocket bending. The matching branded lanyards completed a very modern corporate look.`
  ],
  'healthcare': [
    (city, size, persona) => `In hospital environments, sanitizers and alcohol rubs wipe off standard printed badges quickly. We ordered ${size} with IDCraft's antimicrobial chemical-resistant coating for our hospital in ${city}. After months of daily spirit cleaning, the doctor badges remain spotless!`,
    (city, size, persona) => `Ordered ${size} with color-coded role bands (Doctor, Nurse, OT Technician) for our healthcare network in ${city}. The high-contrast typography and magnetic clips are gentle on scrub suits. Exceptional quality and durable manufacturing.`,
    (city, size, persona) => `Very reliable medical identity solution! Our ${size} order in ${city} arrived promptly. The integrated OT RFID keycard functions flawlessly with our secure wing door locks. Outstanding service and accountability from IDCraft.`
  ],
  'nfc-cards': [
    (city, size, persona) => `The matte black digital NFC business cards from IDCraft are a massive conversation starter at meetings in ${city}. One tap on an iPhone or Android transfers my complete contact info and portfolio instantly. The laser-engraved metallic finish feels ultra-luxurious!`,
    (city, size, persona) => `Got ${size} for our leadership and sales team in ${city}. The dynamic cloud profile is super easy to update anytime. No more throwing away paper business cards. The build quality is solid and tap response is instantaneous.`,
    (city, size, persona) => `Ordered customized NFC cards with our company logo for our executive team in ${city}. The sleek brushed finish and NTAG213 chip response on modern smartphones is flawless. Worth every single rupee!`
  ],
  'urgent': [
    (city, size, persona) => `Lost my identity badge just 48 hours before my board examinations in ${city}. IDCraft accepted our emergency request for ${size}, matched the original school database proof, and dispatched via express air courier within 24 hours. Cannot thank them enough! 🙏`,
    (city, size, persona) => `Our company had VIP auditors visiting our ${city} plant on Monday and we were short of credentials. IDCraft printed and delivered ${size} over the weekend. Lifesaver turnaround time with top-tier print fidelity.`,
    (city, size, persona) => `Most printers refuse single card orders, but IDCraft helped us immediately with ${size} for a new joinee in ${city}. Sent details on WhatsApp in the morning and received tracking by evening. Truly customer-centric team!`
  ]
};

const HINGLISH_TEMPLATES = {
  'pvc-cards': [
    (city, size, persona) => `IDCraft Technologies se hamare school ke liye ${size} banwaye the ${city} mein. Photo print clarity aur color balance ekdum sharp hai. Sabse achhi baat ye lagi ki cards pure solid 30mil PVC ke hain, local lamination ki tarah peel nahi hote. Team ka coordination bohot smooth tha! 👍`,
    (city, size, persona) => `Hamare coaching institute (${city}) ke liye ${size} order kiye the. Library barcode scanner pe pehle hi shot mein scan ho gaya. Excel sheet data se photos match karne mein unhone zero mistake ki. Delivery bhi promised date se 2 din pehle mil gayi. Genuine manufacturer!`,
    (city, size, persona) => `Pehli baar IDCraft se bulk ID cards order kiye the aur experience lajawab raha. ${city} campus ke sabhi ${size} properly class-wise sort karke dispatch kiye gaye the. Finishing aur shine dono premium hai. Har saal inhi se banwayenge!`,
    (city, size, persona) => `Quality aur rate dono mein IDCraft ka koi muqabla nahi hai. ${city} mein humne ${size} receive kiye. Card edges smooth hain aur water-resistant lamination kaafi solid hai. Principal sir aur management sabhi bohot khush hue.`
  ],
  'lanyards': [
    (city, size, persona) => `IDCraft se custom satin lanyards (${size}) order kiye the ${city} ke liye. Logo ka print ekdum crisp hai aur color match bilkul hamare brand guidelines jaisa hai. Metal dog-hook clip heavy-duty hai, cheap plastic nahi. Bohot badhiya kaam!`,
    (city, size, persona) => `WhatsApp par design approve karne ke baad sirf 3 din mein ${size} deliver ho gaye ${city} mein. Satin ribbon ka material soft hai aur neck pe bilkul chubhta nahi. Best quality lanyards at genuine wholesale rates!`,
    (city, size, persona) => `Multicolor sublimation ribbon lanyards ki quality superb hai. Humne ${city} event ke liye ${size} mangwaye the. Hooks aur safety buckle kaafi strong hain. 10/10 recommend karunga sabhi institutions ko.`
  ],
  'trophies': [
    (city, size, persona) => `Hamare ${city} annual sports day ke liye ${size} order kiye the. Medals ka weight kaafi solid hai aur acrylic trophies par golden laser engraving ekdum royal lag rahi thi. Packaging itni safe thi ki transit mein ek bhi trophy damage nahi hui. Super impressed! 🏆`,
    (city, size, persona) => `Annual day function ke liye ${size} mangwaye the. Chief guests ne mementos ki finishing ki bohot tareef ki. Timing aur delivery commitement bilkul accurate tha. Thank you IDCraft team for making our event successful!`,
    (city, size, persona) => `State-level tournament in ${city} ke liye medals aur trophies ka lot time par deliver hua. Ribbon par custom federation print bhi neat tha. Awards quality dekh kar sabhi players khush ho gaye.`
  ],
  'certificates': [
    (city, size, persona) => `Convocation ke liye ${size} print karwaye the ${city} mein. 300 GSM paper stock aur metallic gold foil border ne certificates ko ekdum premium look diya. Packaging moisture-proof thi aur corners bilkul crease-free aaye!`,
    (city, size, persona) => `IDCraft se certificates aur folders ka lot mangwaya tha. Student names aur roll numbers ki print clarity bohot achhi aayi hai. Timely dispatch aur polite customer support. Highly recommended!`,
    (city, size, persona) => `Hamare workshop ke liye ${size} urgent basis par chahiye the. Team ne fast proof approval dekar express delivery karwayi ${city} mein. Quality top-notch hai!`
  ],
  'corporate-rfid': [
    (city, size, persona) => `Hamare ${city} office mein turnstile biometric entry ke liye ${size} banwaye the. Mifare RFID chip ka response ekdum instant hai, turnstile gate bina kisi delay ke khulta hai. Executive matte black finish looks extremely professional!`,
    (city, size, persona) => `Direct manufacturer se lene ka sabse bada fayda ye hua ki rate reasonable mila aur quality standard CR80 ISO bank-grade mili. ${size} across our ${city} facility smoothly deliver ho gaye. Great job IDCraft!`,
    (city, size, persona) => `Employee badges aur matching lanyards dono order kiye the. Photos aur QR codes perfectly scan hote hain. Pre-press proofing team ne WhatsApp par har query jaldi solve ki. Dependable B2B vendor!`
  ],
  'healthcare': [
    (city, size, persona) => `Hospital mein doctor aur nursing staff ke liye ${size} mangwaye the ${city} mein. Sanitizer aur alcohol wipes se daily saaf karne par bhi print ka color bilkul fade nahi hua. Magnetic holder badges bhi scrubs par safe hain!`,
    (city, size, persona) => `Doctor IDs and OT smart cards ki quality bahut achhi hai. IDCraft ki chemical-resistant lamination sach mein durable hai. ${city} branch ke liye best vendor!`,
    (city, size, persona) => `Department-wise color coding (ICU, OT, OPD) perfect aayi hai. Badges lightweight hain aur finish hygienic satin smooth hai. Timely hospital delivery ke liye thank you!`
  ],
  'nfc-cards': [
    (city, size, persona) => `Matte black NFC smart card purchase kiya tha ${city} client meetings ke liye. Phone par tap karte hi profile open ho jati hai. Logo ka spot UV finish looks super rich. Har meeting mein log impress ho jate hain! ✨`,
    (city, size, persona) => `Hamari sales team ke liye ${size} mangwaye the ${city} mein. Dynamic URL feature se details kabhi bhi update kar sakte hain. Build quality metal card jaisi solid lagti hai. Totally worth the investment!`,
    (city, size, persona) => `No more paper business cards! Tap to phone feature Android aur iPhone dono par smoothly kaam karta hai. Quick delivery aur premium luxury packaging mili.`
  ],
  'urgent': [
    (city, size, persona) => `Exam se 2 din pehle mera school ID card kho gaya tha. ${city} mein koi printer 1 card banane ko taiyar nahi tha, par IDCraft ne WhatsApp par detail lete hi 24 ghante ke andar exact card courier kar diya. Thank you so much! 🙏`,
    (city, size, persona) => `Monday client audit tha aur hamare 3 new joinees ke identity cards pending the. IDCraft ne weekend par emergency printing karke ${city} express delivery di. Real life saver team!`,
    (city, size, persona) => `Urgent single replacement card order kiya tha. Subah design approve kiya aur evening tak video proof ke sath tracking number mil gaya. Super fast service!`
  ]
};

const HINDI_TEMPLATES = {
  'pvc-cards': [
    (city, size, persona) => `हमारे विद्यालय (${city}) के लिए ${size} तैयार करवाने का अनुभव अत्यंत संतोषजनक रहा। 30mil ठोस पीवीसी की गुणवत्ता और फोटो की स्पष्टता उत्कृष्ट है। बारकोड स्कैनर तुरंत काम कर रहा है। समय पर सुरक्षित पैकेजिंग के साथ डिलीवरी प्राप्त हुई।`,
    (city, size, persona) => `IDCraft Technologies द्वारा हमारे संस्थान के लिए प्रिंट किए गए आईडी कार्ड्स की फिनिशिंग बहुत मजबूत और वाटरप्रूफ है। कक्षा-वार व्यवस्थित पैकिंग से वितरण में बहुत सुविधा हुई। टीम का व्यवहार अत्यंत सहयोगी रहा।`,
    (city, size, persona) => `${city} में हमारे कोचिंग संस्थान के लिए ${size} मँगवाए थे। विद्यार्थियों की फोटो और आपातकालीन संपर्क विवरण बिल्कुल स्पष्ट हैं। उचित मूल्य और उच्च कोटि की प्रिंटिंग!`
  ],
  'lanyards': [
    (city, size, persona) => `हमारे संस्थान के लोगो और नाम के साथ ${size} साटन रिबन प्रिंट करवाए। रंगों का मिलान एकदम सटीक रहा और मेटल डॉग-हुक क्लिप काफी मजबूत हैं। ${city} में समय पर पार्सल प्राप्त हुआ।`,
    (city, size, persona) => `मल्टीकलर सब्लिमेशन लैनयार्ड्स की गुणवत्ता बहुत सुंदर है। रिबन का कपड़ा आरामदायक है और छपाई लंबे समय तक चलने वाली है। सभी शिक्षण संस्थानों के लिए उत्तम विकल्प।`
  ],
  'trophies': [
    (city, size, persona) => `वार्षिक खेलकूद प्रतियोगिता के लिए ${size} का आर्डर दिया था। पदकों का वजन और ट्राफियों पर लेजर नक्काशी बहुत ही आकर्षक है। सुरक्षित फोम पैकेजिंग में डिलीवरी मिली, कोई भी नुकसान नहीं हुआ।`,
    (city, size, persona) => `वार्षिक उत्सव के लिए मंगाए गए पुरस्कारों की सभी अतिथियों ने प्रशंसा की। समयबद्ध डिलीवरी और उत्कृष्ट शिल्प कौशल के लिए IDCraft का हार्दिक धन्यवाद!`
  ],
  'certificates': [
    (city, size, persona) => `दीक्षांत समारोह के लिए ${size} स्वर्ण पन्नी (Gold-foil) बॉर्डर के साथ प्रिंट करवाए। 300 GSM मोटे कागज की गुणवत्ता और छपाई का स्तर बहुत ही भव्य है। सुरक्षित डिलीवरी मिली।`,
    (city, size, persona) => `हमारे वार्षिक सम्मेलन के लिए प्रमाण पत्र और फोल्डर बहुत सुंदर बने हैं। संस्थान का नाम और लोगो स्पष्ट और चमकदार है।`
  ],
  'corporate-rfid': [
    (city, size, persona) => `हमारे ${city} कार्यालय में बायोमेट्रिक टर्नस्टाइल प्रवेश हेतु ${size} तैयार करवाए। आरएफआईडी चिप तुरंत रीड होती है और कार्ड की गुणवत्ता प्रीमियम बैंक कार्ड जैसी है।`,
    (city, size, persona) => `कर्मचारी पहचान पत्र और लैनयार्ड्स की फिनिशिंग अत्यंत पेशेवर है। सीधा फैक्ट्री से मिलने के कारण मूल्य भी काफी किफायती रहा।`
  ],
  'healthcare': [
    (city, size, persona) => `अस्पताल के डॉक्टर्स और नर्सिंग स्टाफ के लिए सैनिटाइज़र-प्रतिरोधी ${size} मँगवाए। दैनिक सैनिटाइजेशन के बाद भी प्रिंट बिल्कुल नहीं छूटा। स्वास्थ्य संस्थानों के लिए उत्तम।`,
    (city, size, persona) => `विभाग-वार रंग कोडिंग बहुत स्पष्ट है और मैग्नेटिक क्लिप वाले बैज ड्रेस को नुकसान नहीं पहुंचाते। उत्कृष्ट निर्माण गुणवत्ता।`
  ],
  'nfc-cards': [
    (city, size, persona) => `डिजिटल एनएफसी विजिटिंग कार्ड बहुत ही आधुनिक और उपयोगी है। फोन पर सिर्फ टच करते ही प्रोफाइल खुल जाती है। मैट ब्लैक लग्जरी लुक बहुत प्रभावशाली है।`,
    (city, size, persona) => `हमारी प्रबंधन टीम के लिए ${size} स्मार्ट कार्ड्स बनवाए। टिकाऊपन और आधुनिक तकनीक का बेहतरीन संयोजन।`
  ],
  'urgent': [
    (city, size, persona) => `परीक्षा से पूर्व प्रवेश पत्र हेतु तत्काल पहचान पत्र की आवश्यकता थी। IDCraft ने मात्र 24 घंटे में नया कार्ड तैयार कर ${city} पहुँचा दिया। त्वरित सहायता के लिए बहुत आभार! 🙏`,
    (city, size, persona) => `आपातकालीन स्थिति में एक ही दिन में डुप्लीकेट कार्ड बनाकर भेजा। ग्राहक सेवा बहुत तत्पर और विश्वसनीय है।`
  ]
};

// SEO keyword mapping by category
const KEYWORDS_BY_CAT = {
  'pvc-cards': ['PVC ID Cards', 'School ID Cards', 'Student ID Cards', 'ID Card Printing', 'Waterproof PVC'],
  'lanyards': ['Satin Lanyards', 'Custom Lanyards', 'Sublimation Ribbons', 'ID Card Ribbons', 'Breakaway Lanyards'],
  'trophies': ['Trophies', 'Medals', 'Sports Awards', 'Acrylic Trophies', 'Custom Mementos'],
  'certificates': ['Certificates', 'Gold Foil Certificates', 'Convocation Degrees', 'Certificate Printing'],
  'corporate-rfid': ['Employee ID Cards', 'RFID Smart Cards', 'Turnstile Access Badges', 'Corporate ID Badges'],
  'healthcare': ['Hospital Staff Cards', 'Doctor ID Badges', 'Medical Badges', 'Sanitizer Proof Cards'],
  'nfc-cards': ['Digital NFC Business Cards', 'Smart NFC Cards', 'Tap to Phone Cards', 'Executive Cards'],
  'urgent': ['Urgent ID Card Printing', 'Same Day Dispatch', 'Emergency Replacement Card', 'Single Card Print']
};

// Generate 1600 reviews (200 per category: 100 English, 70 Hinglish, 30 Hindi)
const allReviews = [];
let currentId = 1;

for (const cat of CATEGORIES) {
  const personas = PERSONAS_BY_CAT[cat];
  const orderSizes = ORDER_SIZES_BY_CAT[cat];
  const enTemplates = ENGLISH_TEMPLATES[cat];
  const hnTemplates = HINGLISH_TEMPLATES[cat];
  const hiTemplates = HINDI_TEMPLATES[cat];
  const keywords = KEYWORDS_BY_CAT[cat];

  // English (100)
  for (let i = 0; i < 100; i++) {
    const city = CITIES[(i * 3 + currentId) % CITIES.length];
    const persona = personas[i % personas.length];
    const size = orderSizes[(i * 2 + 1) % orderSizes.length];
    const templateFn = enTemplates[i % enTemplates.length];
    const baseText = templateFn(city, size, persona);
    
    const wordCount = baseText.trim().split(/\s+/).length;
    const lengthCategory = wordCount < 55 ? 'Short' : wordCount < 105 ? 'Standard' : 'Detailed';
    const hasEmoji = i % 3 === 0;

    allReviews.push({
      id: currentId++,
      category: cat,
      persona: persona,
      tone: i % 4 === 0 ? 'Professional' : i % 4 === 1 ? 'Casual' : i % 4 === 2 ? 'Friendly' : 'Detailed',
      language: 'English',
      wordCount: wordCount,
      lengthCategory: lengthCategory,
      seoKeywords: [keywords[0], keywords[1] || 'ID Card Printing'],
      hasEmoji: hasEmoji,
      orderSize: size,
      location: city,
      rating: 5,
      review: baseText
    });
  }

  // Hinglish (70)
  for (let i = 0; i < 70; i++) {
    const city = CITIES[(i * 5 + currentId) % CITIES.length];
    const persona = personas[(i + 2) % personas.length];
    const size = orderSizes[(i * 3) % orderSizes.length];
    const templateFn = hnTemplates[i % hnTemplates.length];
    const baseText = templateFn(city, size, persona);
    
    const wordCount = baseText.trim().split(/\s+/).length;
    const lengthCategory = wordCount < 55 ? 'Short' : wordCount < 105 ? 'Standard' : 'Detailed';
    const hasEmoji = i % 2 === 0;

    allReviews.push({
      id: currentId++,
      category: cat,
      persona: persona,
      tone: i % 3 === 0 ? 'Casual' : i % 3 === 1 ? 'Friendly' : 'Emotional',
      language: 'Hinglish',
      wordCount: wordCount,
      lengthCategory: lengthCategory,
      seoKeywords: [keywords[0], keywords[1] || 'ID Card Printing'],
      hasEmoji: hasEmoji,
      orderSize: size,
      location: city,
      rating: 5,
      review: baseText
    });
  }

  // Hindi (30)
  for (let i = 0; i < 30; i++) {
    const city = CITIES[(i * 7 + currentId) % CITIES.length];
    const persona = personas[(i + 1) % personas.length];
    const size = orderSizes[(i * 2) % orderSizes.length];
    const templateFn = hiTemplates[i % hiTemplates.length];
    const baseText = templateFn(city, size, persona);
    
    const wordCount = baseText.trim().split(/\s+/).length;
    const lengthCategory = wordCount < 55 ? 'Short' : wordCount < 105 ? 'Standard' : 'Detailed';

    allReviews.push({
      id: currentId++,
      category: cat,
      persona: persona,
      tone: 'Professional',
      language: 'Hindi',
      wordCount: wordCount,
      lengthCategory: lengthCategory,
      seoKeywords: [keywords[0], keywords[1] || 'आईडी कार्ड प्रिंटिंग'],
      hasEmoji: i % 4 === 0,
      orderSize: size,
      location: city,
      rating: 5,
      review: baseText
    });
  }
}

console.log(`Generated total of ${allReviews.length} reviews!`);

// Export as TypeScript file
const outContent = `// Auto-generated 1600 curated authentic humanized reviews for IDCraft India
// Spans all side products, deliverables, personas, languages and Indian cities

export interface ReviewItemData {
  id: number;
  category: string;
  persona: string;
  tone: string;
  language: 'English' | 'Hinglish' | 'Hindi';
  wordCount: number;
  lengthCategory: 'Short' | 'Standard' | 'Detailed';
  seoKeywords: string[];
  hasEmoji: boolean;
  orderSize: string;
  location: string;
  rating: number;
  review: string;
}

export const REVIEWS_DATASET: ReviewItemData[] = ${JSON.stringify(allReviews, null, 2)};

export const REVIEW_CATEGORIES = [
  { id: 'all', name: 'All (1,600+)', icon: '⭐' },
  { id: 'pvc-cards', name: 'PVC ID Cards', icon: '🪪' },
  { id: 'lanyards', name: 'Lanyards & Ribbons', icon: '🎗️' },
  { id: 'trophies', name: 'Trophies & Medals', icon: '🏆' },
  { id: 'certificates', name: 'Certificates & Folders', icon: '📜' },
  { id: 'corporate-rfid', name: 'Corporate & RFID', icon: '🏢' },
  { id: 'healthcare', name: 'Hospital Badges', icon: '🏥' },
  { id: 'nfc-cards', name: 'NFC Smart Cards', icon: '⚡' },
  { id: 'urgent', name: 'Urgent Dispatches', icon: '🚀' },
];
`;

const targetPath = path.resolve(__dirname, '../src/components/ReviewGeneratorApp/data/reviewsDataset.ts');
fs.writeFileSync(targetPath, outContent, 'utf-8');
console.log(`Wrote dataset to ${targetPath} successfully! File size: ${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB`);
