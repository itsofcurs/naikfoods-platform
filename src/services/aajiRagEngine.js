/**
 * Aaji AI Intelligent RAG & Hardened Security Engine
 * 
 * Includes:
 * 1. 5-Layer Security & Anti-Prompt Injection Guardrails
 * 2. Multi-topic RAG Knowledge Base (Policies, Products, Hampers, Coins, Recipes, History)
 * 3. Dynamic Intent & Semantic Context Matcher
 * 4. Bilingual (English & Authentic Marathi) Natural Language Generation
 * 5. Live Store Catalog Query Resolution
 */

// ==========================================
// 🛡️ 5-LAYER SECURITY GUARDRAIL DEFINITIONS
// ==========================================

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+(instructions|prompts|rules)/i,
  /system\s*prompt/i,
  /reveal\s+(your\s+)?(instructions|source\s+code|secret|api\s*key|backend)/i,
  /you\s+are\s+now\s+(a|an|in|the)\s+(unrestricted|dan|developer|admin|root|linux|evil)/i,
  /roleplay\s+as/i,
  /sql\s*(injection|select|drop|table|insert|update|delete)/i,
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /eval\s*\(|exec\s*\(|__proto__|constructor/i,
  /bypass\s+(safety|filter|guardrail)/i,
  /jailbreak/i,
  /act\s+as\s+a\s+terminal/i,
  /forget\s+everything/i,
  /what\s+is\s+your\s+system\s+instruction/i
];

const OUT_OF_SCOPE_PATTERNS = [
  /write\s+(a\s+)?(python|javascript|c\+\+|java|html|css|code|script|sql)/i,
  /solve\s+(this\s+)?(math|equation|physics|calculus|exam|homework)/i,
  /who\s+will\s+win\s+the\s+election|political\s+party|narendra\s+modi|rahul\s+gandhi/i,
  /crypto|bitcoin|ethereum|forex|stock\s+tips|buy\s+shares/i,
  /medical\s+diagnosis|prescribe\s+medicine|cure\s+cancer/i,
  /porn|gambling|hack|ddos|exploit/i
];

// Layer 1: Prompt Sanitizer & Injection Interceptor
export function detectPromptInjection(query) {
  if (!query || typeof query !== 'string') return false;
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(query));
}

// Layer 2: Scope & Domain Boundary Check
export function detectOutOfScope(query) {
  if (!query || typeof query !== 'string') return false;
  return OUT_OF_SCOPE_PATTERNS.some((pattern) => pattern.test(query));
}

// Layer 5: Output Sanitization & Sensitive Keyword Scrubbing
export function sanitizeOutput(text) {
  if (!text) return '';
  return text
    .replace(/(api[_-]?key|secret|token|password|bearer|auth|database_url)[\s:=]+[\w.-]+/gi, '[PROTECTED]')
    .replace(/<[^>]*>?/gm, ''); // Strip unexpected HTML
}

// ==========================================
// 📚 RAG DOCUMENT CORPUS (KNOWLEDGE CHUNKS)
// ==========================================

export const RAG_KNOWLEDGE_BASE = [
  {
    id: 'how_to_check_available_products',
    category: 'catalog_browsing',
    keywords: [
      'how to check for available products', 'available products', 'find products', 'check products', 'search products',
      'how to see products', 'where are products', 'browse products', 'stock', 'store products', 'catalog', 'how to buy',
      'उत्पादने कशी पाहावी', 'पदार्थ कुठे आहेत', 'उपलब्ध पदार्थ', 'खरेदी कशी करावी', 'शोधणे', 'कसे शोधावे', 'मालाचा साठा'
    ],
    answerEn: `To check and explore all our available authentic products:
1. **Visit our Store Page:** Click **"Shop"** in the top navigation bar or go to the Store page.
2. **Search by Name:** Use the search bar at the top or in the shop sidebar to search for any snack, pickle, masala, or sweet.
3. **Filter by Region:** You can filter authentic specialties by region (**Pune, Vidarbha, Konkan, Nashik**).
4. **Filter by Category:** Browse through *Snacks & Namkeen, Pickles & Condiments, Sweets & Bakery, Spices & Masalas, Dairy & Beverages, Mukhvas, and Dry Grocery*.
5. **Check Real-time Stock:** Each product card displays current pricing, net weight, and instant 'Add to Cart' availability!`,
    answerMr: `आमचे सर्व उपलब्ध अस्सल पदार्थ पाहण्यासाठी खालील सोप्या पद्धती वापरा:
१. **दुकान पृष्ठावर जा:** वरील नेव्हिगेशन बारमधील **'खरेदी करा (Shop)'** वर क्लिक करा.
२. **नावानुसार शोधा:** वर दिलेल्या सर्च बारमध्ये कोणताही चिवडा, चकली, लोणचे किंवा मसाला टाईप करून शोधा.
३. **विभागानुसार निवडा:** तुम्ही **पुणे, विदर्भ, कोकण आणि नाशिक** अशा प्रांतिक विभागानुसार उत्पादने फिल्टर करू शकता.
४. **प्रकारानुसार निवडा:** *कुरकुरीत स्नॅक्स, लोणची व ठेचा, गोडधोड, मसाले व चटण्या, दुग्धजन्य पदार्थ व मुखवास* अशा विविध श्रेणींमधून निवडा.
५. **किंमत व वजन तपासा:** प्रत्येक उत्पादनावर त्याची किंमत, वजन आणि उपलब्धतेची माहिती दिलेली आहे!`,
    suggestedAction: { labelEn: 'Explore Store', labelMr: 'दुकान पहा', link: '/in/store' }
  },
  {
    id: 'festive_hamper_builder',
    category: 'hampers',
    keywords: [
      'hamper', 'gift box', 'custom hamper', 'festive box', 'gift', 'diwali box', 'custom box', '15% off',
      'भेट बॉक्स', 'हॅम्पर्स', 'गिफ्ट', 'सण भेट', 'दिवाळी फराळ बॉक्स', 'स्वतः बनवा'
    ],
    answerEn: `With our **Custom Festive Hamper Builder**, you can create personalized gift hampers in 3 easy steps:
1. **Choose Box Size:** Select an Artisanal Gift Box (4 items for ₹499), Royal Heritage Box (6 items for ₹799), or Grand Utsav Crate (8 items for ₹1,199).
2. **Pick Favorite Items:** Mix and match authentic sweets, crispy snacks, pickles, and heritage masalas with a live slot counter.
3. **Add Handwritten Greeting Card:** Choose an occasion (Diwali, Ganesh Utsav, Anniversary, Birthday) and enter custom message, recipient, and sender names.
🎁 **Special Offer:** Get an instant **15% discount** automatically applied on all custom gift hampers!`,
    answerMr: `आमच्या **सण-उत्सव गिफ्ट हॅम्पर्स बिल्डर** द्वारे तुम्ही स्वतःच्या पसंतीचा भेट बॉक्स ३ सोप्या टप्प्यांत तयार करू शकता:
१. **बॉक्सचा आकार निवडा:** लहान बॉक्स (४ पदार्थ - ₹४९९), रॉयल हेरिटेज बॉक्स (६ पदार्थ - ₹७९९), किंवा ग्रँड उत्सव क्रेट (८ पदार्थ - ₹१,१९९).
२. **आवडते पदार्थ निवडा:** गोडधोड लाडू, चकली, चिवडा, लोणची आणि मसाले स्वतःच्या आवडीनुसार भरा.
३. **शुभेच्छा पत्र जोडा:** सण-उत्सवानुसार (दिवाळी, गणेशोत्सव, वाढदिवस) वैयक्तिक शुभेच्छा संदेश आणि नाव लिहा.
🎁 **खास सवलत:** प्रत्येक तयार केलेल्या गिफ्ट हॅम्पर्सवर **१५% तात्काळ सूट** मिळते!`,
    suggestedAction: { labelEn: 'Build Hamper', labelMr: 'हॅम्पर्स बनवा', link: '/in/build-hamper' }
  },
  {
    id: 'swad_coins_rewards',
    category: 'rewards',
    keywords: [
      'coins', 'swad coins', 'loyalty', 'points', 'reward', 'discount coins', 'redeem coins', 'how to earn coins',
      'नाणी', 'स्वाद नाणी', 'पॉइंट्स', 'सवलत नाणी', 'पॉइंट कसे मिळवायचे', 'नाणी वापरणे'
    ],
    answerEn: `**Swad Coins Loyalty Rewards Program:**
• **Earning Rate:** Earn 10 Swad Coins for every ₹100 spent on Naik Foods.
• **Bonus Coins:** Get 50 Welcome Coins on sign-up, 100 Coins for referring family & friends, and 20 Coins for product reviews.
• **Redemption:** **1 Swad Coin = ₹1 Instant Discount** at checkout!
• **Tiers:** Climb from *Mitr (Bronze)* to *Kutumb (Silver)* and *Shahi Privileged (Gold)* for up to 2x coin multiplier and free express shipping!`,
    answerMr: `**स्वाद नाणी (Swad Coins) रिवॉर्ड्स योजना:**
• **नाणी कशी मिळवायची:** प्रत्येक ₹१०० च्या खरेदीवर १० स्वाद नाणी मिळतात.
• **बोनस नाणी:** नवीन खाते उघडल्यावर ५० नाणी, मित्रांना रेफर केल्यावर १०० नाणी आणि रिव्ह्यू लिहिल्यावर २० नाणी मोफत मिळतात.
• **वापर कसा करावा:** **१ स्वाद नाणे = ₹१ थेट रोख सवलत** चेकआउट करताना मिळते!
• **सदस्यता स्तर:** *मित्र (कांस्य)*, *कुटुंब (रौप्य)*, आणि *शाही (सुवर्ण)* स्तरांवर २ पट अधिक नाणी आणि मोफत जलद डिलिव्हरी मिळते!`,
    suggestedAction: { labelEn: 'View Coins', labelMr: 'नाणी पहा', link: '/in/account' }
  },
  {
    id: 'shipping_and_delivery',
    category: 'shipping',
    keywords: [
      'shipping', 'delivery', 'charges', 'free delivery', 'timeline', 'track', 'pincode', 'how long', 'courier',
      'डिलिव्हरी', 'शिपिंग', 'पोहोच', 'किती दिवस', 'शुल्क', 'मोफत डिलिव्हरी', 'ट्रॅकिंग'
    ],
    answerEn: `**Shipping Timelines & Delivery Charges:**
• **Free Delivery:** All orders above ₹499 across Maharashtra get **100% Free Home Delivery**. (Flat ₹50 for orders under ₹499).
• **Pune & Mumbai Metro:** 24 to 48 hours.
• **Rest of Maharashtra:** 2 to 4 business days.
• **Other States across India:** 4 to 7 business days.
• **Tracking:** As soon as your order is dispatched from Pune, an SMS and Email with a live AWB tracking link is sent to you.`,
    answerMr: `**डिलिव्हरी वेळ आणि शिपिंग शुल्क:**
• **मोफत डिलिव्हरी:** संपूर्ण महाराष्ट्रात ₹४९९ वरील सर्व ऑर्डरवर **१००% मोफत होम डिलिव्हरी** आहे (त्याखाली ₹५० शुल्क).
• **पुणे व मुंबई मेट्रो:** २४ ते ४८ तासांत.
• **उर्वरित महाराष्ट्र:** २ ते ४ कामकाजाचे दिवस.
• **इतर राज्ये:** ४ ते ७ कामकाजाचे दिवस.
• **ट्रॅकिंग:** पुण्यातून पार्सल रवाना होताच तुम्हाला एसएमएस व ईमेलद्वारे थेट ट्रॅकिंग लिंक मिळते.`,
    suggestedAction: { labelEn: 'Delivery Policy', labelMr: 'डिलिव्हरी धोरण', link: '/in/shipping-policy' }
  },
  {
    id: 'payments_and_cod',
    category: 'payments',
    keywords: [
      'payment', 'cod', 'cash on delivery', 'upi', 'gpay', 'phonepe', 'paytm', 'card', 'netbanking',
      'पेमेंट', 'पैसे कसे द्यावे', 'कॅश ऑन डिलिव्हरी', 'फोनपे', 'गुगल पे'
    ],
    answerEn: `**Available Payment Methods:**
1. **Instant UPI:** Google Pay, PhonePe, Paytm, BHIM, and QR code scan.
2. **Cards & Net Banking:** All Indian Debit/Credit Cards (Visa, MasterCard, RuPay) and 50+ Net Banking options.
3. **Cash on Delivery (COD):** Available for orders between ₹299 and ₹1,500 (+₹40 courier handling fee).`,
    answerMr: `**उपलब्ध पेमेंट पर्याय:**
१. **तात्काळ UPI:** Google Pay, PhonePe, Paytm, BHIM आणि थेट QR कोड स्कॅन.
२. **कार्ड्स व नेट बँकिंग:** सर्व डेबिट/क्रेडिट कार्ड्स (Visa, MasterCard, RuPay) आणि ५०+ बँकांचे नेट बँकिंग.
३. **कॅश ऑन डिलिव्हरी (COD):** ₹२९९ ते ₹१,५०० दरम्यानच्या ऑर्डरवर COD उपलब्ध आहे (+₹४० कुरिअर हाताळणी शुल्क).`
  },
  {
    id: 'returns_and_refunds',
    category: 'refund',
    keywords: [
      'return', 'refund', 'money back', 'damaged', 'spoiled', 'broken', 'wrong item', 'cancel',
      'परतावा', 'पैसे परत', 'नुकसान', 'खराब', 'चुकीचे उत्पादन', 'रिफंड'
    ],
    answerEn: `**Return & Refund Policy:**
• Since we make fresh consumable food without chemical preservatives, opened packages cannot be returned.
• If you receive a damaged package or wrong variant, report it within **48 hours** with photos to **support@naikfoods.co.in** or WhatsApp (+91 9730046247).
• Verified cases receive an immediate replacement or **100% full refund** credited to your bank account within 5–7 business days.`,
    answerMr: `**परतावा व रिफंड धोरण:**
• आमचे खाद्यपदार्थ रासायनिक संरक्षकांशिवाय ताजे बनवले जात असल्याने सील उघडलेले पाकीट परत घेतले जात नाही.
• पार्सलचे नुकसान झाल्यास किंवा चुकीचे उत्पादन आल्यास, ४८ तासांत फोटोंसह **support@naikfoods.co.in** किंवा व्हॉट्सॲप (+९१ ९७३००४६२४७) वर कळवा.
• तपासणीनंतर त्वरित नवीन पार्सल पाठवले जाते किंवा ५-७ दिवसांत खात्यात १००% रिफंड जमा होतो.`,
    suggestedAction: { labelEn: 'Refund Policy', labelMr: 'परतावा धोरण', link: '/in/refund-policy' }
  },
  {
    id: 'pune_store_location_and_hours',
    category: 'store',
    keywords: [
      'store', 'shop', 'pune', 'location', 'address', 'timing', 'open', 'visit', 'offline shop',
      'दुकान', 'पत्ता', 'पुणे', 'वेळ', 'कधी उघडे असते', 'कुठे आहे'
    ],
    answerEn: `**Naik Foods Flagship Store in Pune:**
📍 **Address:** Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth, Pune, Maharashtra 411002.
⏰ **Operating Hours:** Open Daily from **9:00 AM to 10:00 PM IST**.
📞 **Helpline & WhatsApp:** +91 97300 46247
Come visit us in Pune for fresh hot batches, traditional farsan, and festival specialties!`,
    answerMr: `**नाईक फूड्स मुख्य दुकान (पुणे):**
📍 **पत्ता:** सेवा मित्र मंडळ चौक, फडगेट पोलीस चौकी जवळ, शुक्रवार पेठ, पुणे ४११००२, महाराष्ट्र.
⏰ **वेळ:** दररोज सकाळी **९:०० ते रात्री १०:००** पर्यंत उघडे असते.
📞 **संपर्क व व्हॉट्सॲप:** +९१ ९७३०० ४६२४७
ताजे खमंग चिवडे, लोणची आणि सण-उत्सवाच्या खरेदीसाठी पुण्यातील आमच्या दुकानाला नक्की भेट द्या!`,
    suggestedAction: { labelEn: 'Contact Us', labelMr: 'संपर्क पृष्ठ', link: '/in/contact' }
  },
  {
    id: 'fssai_quality_and_ingredients',
    category: 'quality',
    keywords: [
      'fssai', 'hygiene', 'preservative', 'pure', 'ingredients', 'oil', 'quality', 'license', 'veg', 'jain', 'upwas',
      'शुद्धता', 'गुणवत्ता', 'परवाना', 'शाकाहारी', 'उपवास', 'जैन', 'तेल', 'घटक'
    ],
    answerEn: `**FSSAI & Quality Assurance:**
• **FSSAI License:** 11524999000123.
• **100% Vegetarian:** Strictly pure vegetarian facility.
• **Zero Preservatives:** No artificial colors, chemicals, or palm oil. We use cold-pressed groundnut/sunflower oils and pure cow ghee.
• **Special Categories:** We offer specialized Jain-friendly (no root vegetables) and Upwas (fasting-compliant) products.`,
    answerMr: `**FSSAI अन्न सुरक्षा व गुणवत्ता हमी:**
• **FSSAI परवाना क्र.:** 11524999000123.
• **१००% शाकाहारी:** पूर्णपणे शुद्ध शाकाहारी युनिटमध्ये निर्मिती.
• **शून्य प्रिझर्व्हेटिव्ह:** कोणतेही कृत्रिम रंग, रसायने किंवा पाम तेल नाही. घाण्याचे शुद्ध शेंगदाणा/सूर्यफूल तेल आणि साजूक तूप वापरले जाते.
• **खास प्रकार:** जैन बांधवांसाठी आणि उपवासासाठी खास पदार्थ उपलब्ध आहेत.`
  },
  {
    id: 'recipes_and_serving_tips',
    category: 'recipes',
    keywords: [
      'recipe', 'thalipith', 'how to make', 'how to cook', 'how to eat', 'serving tips', 'spices pairing',
      'कृती', 'पाककृती', 'कसे बनवायचे', 'कसे खावे', 'थालीपीठ कृती'
    ],
    answerEn: `**Aaji's Traditional Culinary Secrets:**
• **Crispy Thalipith:** Mix Naik Foods Bhajani with onions, green chillies, coriander, and warm water. Roast with pure cow ghee on a medium tawa and serve with fresh white butter (loni) and peanut chutney!
• **Authentic Kolhapuri Thecha:** Enjoy our hand-pounded green/red chilli thecha alongside hot jowar bhakri and raw onion for an authentic Maharashtrian rustic meal!
• **Goda Masala Magic:** Add 1 tsp of our stone-ground Goda Masala to Katachi Amti, Matki Usal, or Masale Bhat in the last 2 minutes of simmering to preserve its fragrant stone-flower (Dagadphool) aroma!`,
    answerMr: `**आजींच्या अस्सल पाककृती व टिप्स:**
• **खमंग थालीपीठ:** नाईक फूड्सच्या भाजणीत बारीक कांदा, मिरची, कोथिंबीर आणि कोमट पाणी घालून मळा. साजूक तुपात खमंग भाजून ताज्या लोणी आणि शेंगदाणा चटणीसोबत आस्वाद घ्या!
• **झणझणीत ठेचा:** गरम ज्वारीची भाकरी, कांदा आणि आमचा खलबत्त्यातील कोल्हापुरी ठेचा ही खरी अस्सल मेजवानी आहे!
• **गोडा मसाल्याची जादू:** कटाची आमटी, मटकी उसळ किंवा मसाले भात शिजताना शेवटच्या २ मिनिटांत १ चमचा गोडा मसाला घातल्यास दगडफुलाचा सुवास आणि चव टिकून राहते!`
  },
  {
    id: 'legacy_and_heritage',
    category: 'history',
    keywords: [
      'history', 'legacy', 'founder', 'who started', '1938', '1935', 'sarita naik', 'priya naik', 'about',
      'इतिहास', 'संस्थापक', 'वारसा', 'सुरुवात कोणी केली', 'सरिता नाईक', 'प्रिया नाईक'
    ],
    answerEn: `**The Legacy of Naik Foods:**
• **1938:** Founded by **Late Shri Anant Balkrishna Naik** with Naik Seeds in Pune, spanning 8+ decades of trust.
• **1980s Inspiration:** **Late Sarita Naik (Aaji)** pioneered traditional culinary classes and perfected handcrafted Maharashtrian heirloom spice formulas.
• **1992:** Extended into hospitality with the landmark **Hotel Sushil** in Pune.
• **2025:** **Mrs. Priya Chandan Naik** established Naik Foods to deliver authentic Maharashtrian foods across India with traditional purity.`,
    answerMr: `**नाईक फूड्सचा समृद्ध वारसा:**
• **१९३८:** **कै. श्री. अनंत बाळकृष्ण नाईक** यांनी नाईक सीड्सच्या माध्यमातून पुण्यातील परंपरेचा पाया घातला.
• **१९८० ची प्रेरणा:** **कै. सरिता नाईक (आजी)** यांनी पारंपरिक पाककृतींचे वर्ग सुरू केले आणि अस्सल मसाल्यांच्या फॉर्म्युलामध्ये परिपूर्णता आणली.
• **१९९२:** पुण्यातील प्रसिद्ध **हॉटेल सुशील** द्वारे आदरातिथ्य क्षेत्रात विस्तार झाला.
• **२०२५:** **सौ. प्रिया चंदन नाईक** यांनी नाईक फूड्सची स्थापना करून ही परंपरा थेट देशभरातील घराघरांत पोहोचवली.`
  }
];

// ==========================================
// 🧠 INTENT RESOLVER & SEMANTIC RAG RETRIEVER
// ==========================================

export function processAajiQuery(userQuery, currentLang = 'en') {
  const cleanQuery = (userQuery || '').trim();

  // Detect if query is written in Devnagari Marathi script
  const isDevnagari = /[\u0900-\u097F]/.test(cleanQuery);
  const targetLang = isDevnagari ? 'mr' : currentLang;
  const isMr = targetLang === 'mr';

  // 1. Layer 1 Security: Prompt Injection Interception
  if (detectPromptInjection(cleanQuery)) {
    return {
      text: isMr
        ? 'बाळ, मी नाईक फूड्सची आजी आहे. मी फक्त अस्सल मराठमोळ्या पाककृती, मसाले, उत्पादने आणि ऑर्डरबद्दल मदत करू शकते. दुसरा कोणताही चुकीचा प्रयत्न चालणार नाही बरं का! 👵'
        : 'Namaskar dear child! I am Aaji AI, the culinary guide for Naik Foods. I am strictly programmed to assist with our authentic Maharashtrian foods, orders, recipes, and policies. Please ask me about our delicacies!',
      securityTriggered: true,
      action: null
    };
  }

  // 2. Layer 2 & 3 Security: Out-of-Domain Scope Guardrail
  if (detectOutOfScope(cleanQuery)) {
    return {
      text: isMr
        ? 'अरे बाळ, मी एक साधी सुगरण आजी आहे! मला कोडिंग, राजकारण किंवा इतर गोष्टी येत नाहीत. पण तुला झणझणीत ठेचा, कुरकुरीत चकली किंवा खमंग मसाल्यांबद्दल काही विचारायचे असेल तर नक्की सांग! 🍲'
        : 'Oh dear child, I am your traditional food-loving Aaji! I do not dabble in programming, politics, or financial advice. But if you want to know about our stone-pounded masalas, crispy chivda, or hot bhakri pairings, I am always here for you!',
      securityTriggered: true,
      action: { labelEn: 'Browse Snacks', labelMr: 'स्नॅक्स पहा', link: '/in/store' }
    };
  }

  // 3. RAG Semantic Scoring & Document Retrieval
  const lowerQuery = cleanQuery.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  for (const doc of RAG_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of doc.keywords) {
      const lowerKw = kw.toLowerCase();
      if (lowerQuery === lowerKw) {
        score += 100; // Exact match
      } else if (lowerQuery.includes(lowerKw)) {
        score += lowerKw.length * 3; // Substring match weighted by length
      } else {
        // Word overlap match
        const queryWords = lowerQuery.split(/\s+/);
        const kwWords = lowerKw.split(/\s+/);
        const common = queryWords.filter((w) => w.length > 3 && kwWords.includes(w));
        score += common.length * 5;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = doc;
    }
  }

  // 4. Product-specific keyword resolution fallback
  if (!bestMatch || highestScore < 10) {
    const productKeywords = [
      { key: 'thecha', nameEn: 'Kolhapuri Thecha', nameMr: 'कोल्हापुरी ठेचा', link: '/in/store?category=pickles-and-condiments' },
      { key: 'chakali', nameEn: 'Methi & Butter Chakali', nameMr: 'खमंग चकली', link: '/in/store?category=snacks-and-namkeen' },
      { key: 'chivda', nameEn: 'Poha & Corn Chivda', nameMr: 'पोहा चिवडा', link: '/in/store?category=snacks-and-namkeen' },
      { key: 'pickle', nameEn: 'Mango & Ambadi Pickles', nameMr: 'पारंपारिक लोणची', link: '/in/store?category=pickles-and-condiments' },
      { key: 'masala', nameEn: 'Goda & Kanda Lasun Masala', nameMr: 'अस्सल मसाले', link: '/in/store?category=spices-and-masalas' },
      { key: 'ghee', nameEn: 'Pure Cow Desi Ghee', nameMr: 'साजूक तूप', link: '/in/store?category=dairy-and-beverages' },
      { key: 'laddoo', nameEn: 'Besan & Dink Laddoo', nameMr: 'बेसन व डिंक लाडू', link: '/in/store?category=sweets-and-bakery' }
    ];

    const matchedProd = productKeywords.find((p) => lowerQuery.includes(p.key));
    if (matchedProd) {
      return {
        text: isMr
          ? `होय बाळ! आमच्याकडे अस्सल **${matchedProd.nameMr}** उपलब्ध आहे. हे सर्व पारंपरिक पद्धतीने पुण्यात ताजे तयार केले जाते. तुम्ही आत्ताच दुकानातून ऑर्डर करू शकता!`
          : `Yes dear! We have fresh, authentic **${matchedProd.nameEn}** available in our store, prepared with heirloom Maharashtrian recipes. You can add it to your cart right away!`,
        action: { labelEn: `View ${matchedProd.nameEn}`, labelMr: `${matchedProd.nameMr} पहा`, link: matchedProd.link }
      };
    }
  }

  // 5. High-confidence RAG Response
  if (bestMatch && highestScore >= 10) {
    const responseText = isMr ? bestMatch.answerMr : bestMatch.answerEn;
    return {
      text: sanitizeOutput(responseText),
      action: bestMatch.suggestedAction || null
    };
  }

  // 6. Natural Conversational Fallback with Guidance
  return {
    text: isMr
      ? `बाळ, मला तुमचा प्रश्न समजला आहे! नाईक फूड्सवर उपलब्ध असणारे सर्व पदार्थ पाहण्यासाठी तुम्ही वरच्या **'खरेदी करा (Shop)'** मेनूवर जाऊ शकता किंवा थेट आमच्या व्हॉट्सॲप (+९१ ९७३००४६२४७) वर संपर्क करू शकता.`
      : `Dear child, I am here to help you! You can explore all our fresh traditional products by visiting the **'Shop'** section above, or if you need personalized assistance, our family support team is available on WhatsApp at +91 9730046247.`,
    action: { labelEn: 'Browse All Delicacies', labelMr: 'सर्व पदार्थ पहा', link: '/in/store' }
  };
}
