import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Comprehensive product title map for 100% authentic Marathi conversion
const PRODUCT_TITLE_MAP = {
  'Special Poha Chivda': 'खास पोहा चिवडा',
  'Corn Flakes Chivda': 'मका पोहा चिवडा',
  'Methi Chakali': 'खमंग मेथी चकली',
  'Butter Chakali': 'बटर चकली',
  'Diet Bhel': 'डाएट भेळ',
  'Kolhapuri Bhadang': 'झणझणीत कोल्हापुरी भडंग',
  'Puneri Bakarwadi': 'पुणेरी खमंग बाकरवडी',
  'Bakarwadi': 'खमंग बाकरवडी',
  'Roasted Jowar Puffs': 'भाजलेली ज्वारी पफ्स',
  'Jwari Bhel': 'ज्वारीची खमंग भेळ',
  'Thepla': 'गरमागरम गुजराती थेपला',
  'Methi Thepla': 'मेथी थेपला',
  'Mango Pickle': 'पारंपारिक कैरीचे लोणचे',
  'Kairi Lonche': 'कैरीचे लोणचे',
  'Lemon Pickle': 'आंबट-गोड लिंबू लोणचे',
  'Limbu Lonche': 'लिंबू लोणचे',
  'Ambadi Pickle': 'अस्सल अंबाडी लोणचे',
  'Ambadi Lonche': 'अंबाडी लोणचे',
  'Green Chilli Pickle': 'हिरवी मिरची लोणचे',
  'Mirchi Lonche': 'मिरचीचे लोणचे',
  'Kolhapuri Thecha': 'झणझणीत कोल्हापुरी ठेचा',
  'Red Chilli Thecha': 'लाल मिरचीचा ठेचा',
  'Green Chilli Thecha': 'हिरव्या मिरचीचा ठेचा',
  'Solapuri Shenga Chutney': 'खमंग सोलापुरी शेंगदाणा चटणी',
  'Shenga Chutney': 'शेंगदाणा चटणी',
  'Jawad Chutney': 'जवस चटणी',
  'Karale Chutney': 'खुरासणी / कारळे चटणी',
  'Dry Garlic Chutney': 'सुकी लसूण चटणी',
  'Kanda Lasun Masala': 'कांदा लसूण मसाला',
  'Goda Masala': 'पारंपारिक गोडा मसाला',
  'Malvani Masala': 'सिंधुदुर्ग मालवणी मसाला',
  'Saoji Masala': 'नागपूरी सावजी मसाला',
  'Misal Masala': 'झणझणीत मिसळ मसाला',
  'Biryani Masala': 'शाही बिर्याणी मसाला',
  'Garam Masala': 'शाही गरम मसाला',
  'Paan Mukhwas': 'शाही कलकत्ता पान मुखवास',
  'Alphonso Mango Pulp': 'अस्सल रत्नागिरी हापूस आंबा रस',
  'Pure Desi Cow Ghee': 'शुद्ध देशी गायीचे साजूक तूप',
  'Besan Laddoo': 'खमंग बेसनाचे लाडू',
  'Dink Laddoo': 'पौष्टिक डिंकाचे लाडू',
  'Rava Laddoo': 'रवा लाडू',
  'Chirote': 'पाकळीचे चिरोटे',
  'Anarse': 'पारंपारिक अनरसे',
  'Shankarpale': 'गोड शंकरपाळे',
  'Tikhat Shankarpale': 'तिखट शंकरपाळे',
  'Gulab Jamun': 'गुलाब जामुन',
  'Kaju Katli': 'काजू कतली',
  'Amba Vadi': 'आंबा वडी',
  'Kaju Modak': 'काजू मोदक',
  'Ukdiche Modak': 'उकडीचे मोदक',
  'Kokum Agal': 'शुद्ध कोकण कोकम आगळ',
  'Amla Candy': 'पाचक आवळा कॅण्डी',
  'Khakhra': 'कुरकुरीत खाकरा'
};

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      lang: 'en', // 'en' | 'mr'
      toggleLanguage: () => {
        const nextLang = get().lang === 'en' ? 'mr' : 'en';
        set({ lang: nextLang });
      },
      setLanguage: (lang) => set({ lang }),
      
      // Translates product titles
      translateProductName: (title) => {
        if (!title) return '';
        const isMr = get().lang === 'mr';
        if (!isMr) return title;
        
        // Exact match check
        if (PRODUCT_TITLE_MAP[title]) return PRODUCT_TITLE_MAP[title];
        
        // Substring / keyword replacement
        for (const [enKey, mrVal] of Object.entries(PRODUCT_TITLE_MAP)) {
          if (title.toLowerCase().includes(enKey.toLowerCase())) {
            return title.replace(new RegExp(enKey, 'gi'), mrVal);
          }
        }
        
        // Keyword fallbacks
        let translated = title;
        const replacements = [
          [/Chivda/gi, 'चिवडा'],
          [/Chakali/gi, 'चकली'],
          [/Bhel/gi, 'भेळ'],
          [/Laddoo|Laddu/gi, 'लाडू'],
          [/Pickle|Lonche/gi, 'लोणचे'],
          [/Thecha/gi, 'ठेचा'],
          [/Chutney/gi, 'चटणी'],
          [/Masala/gi, 'मसाला'],
          [/Mukhwas|Mukhvas/gi, 'मुखवास'],
          [/Ghee/gi, 'तूप'],
          [/Pulp/gi, 'रस'],
          [/Sev/gi, 'शेव'],
          [/Farsan/gi, 'फरसाण'],
          [/Papad/gi, 'पापड'],
          [/Kurdaya/gi, 'कुरडया'],
          [/Wafers/gi, 'वेफर्स'],
          [/Chips/gi, 'चिप्स'],
          [/Special/gi, 'खास'],
          [/Authentic/gi, 'अस्सल'],
          [/Traditional/gi, 'पारंपारिक'],
          [/Spicy/gi, 'तिखट'],
          [/Sweet/gi, 'गोड'],
          [/Roasted/gi, 'भाजलेले'],
          [/Crispy/gi, 'कुरकुरीत'],
          [/Pure/gi, 'शुद्ध'],
          [/Organic/gi, 'सेंद्रिय']
        ];
        
        for (const [regex, rep] of replacements) {
          translated = translated.replace(regex, rep);
        }
        return translated;
      },

      // Translates category names
      translateCategory: (cat) => {
        const isMr = get().lang === 'mr';
        if (!isMr) return cat;
        const catMap = {
          'Snacks and Namkeen': 'कुरकुरीत स्नॅक्स व फरसाण',
          'snacks-and-namkeen': 'कुरकुरीत स्नॅक्स व फरसाण',
          'Pickles & Condiments': 'पारंपारिक लोणची व ठेचा',
          'pickles-and-condiments': 'पारंपारिक लोणची व ठेचा',
          'Sweets & Bakery': 'गोडधोड व बेकरी उत्पादने',
          'sweets-and-bakery': 'गोडधोड व बेकरी उत्पादने',
          'Dairy & Beverages': 'दुग्धजन्य पदार्थ व पेये',
          'dairy-and-beverages': 'दुग्धजन्य पदार्थ व पेये',
          'Mukhvas & Digestives': 'मुखवास व पाचक',
          'mukhvas-and-digestives': 'मुखवास व पाचक',
          'Dry Grocery': 'धान्य व किराणा',
          'dry-grocery': 'धान्य व किराणा',
          'Dry / Instant Grocery': 'धान्य व इन्स्टंट किराणा',
          'dry-instant-grocery': 'धान्य व इन्स्टंट किराणा',
          'Spices & Masalas': 'अस्सल मसाले व खमंग चटण्या',
          'spices-and-masalas': 'अस्सल मसाले व खमंग चटण्या',
          'Confectionery': 'खाद्यपदार्थ व मिठाई',
          'confectionery': 'खाद्यपदार्थ व मिठाई',
          'All Categories': 'सर्व प्रकार',
          'all': 'सर्व प्रकार'
        };
        return catMap[cat] || cat;
      },

      // Translates region names
      translateRegion: (region) => {
        const isMr = get().lang === 'mr';
        if (!isMr) return region;
        const regionMap = {
          'Pune': 'पुणे',
          'Vidarbha': 'विदर्भ',
          'Konkan': 'कोकण',
          'Nashik': 'नाशिक',
          'Kolhapur': 'कोल्हापूर',
          'Solapur': 'सोलापूर',
          'Marathwada': 'मराठवाडा',
          'Nagpur': 'नागपूर',
          'Maharashtra': 'महाराष्ट्र'
        };
        return regionMap[region] || region;
      },

      // Translates weights & numbers
      translateWeight: (wt) => {
        const isMr = get().lang === 'mr';
        if (!isMr || !wt) return wt;
        return String(wt)
          .replace(/g\b/g, ' ग्रॅम')
          .replace(/kg\b/g, ' किलो')
          .replace(/ml\b/g, ' मिली')
          .replace(/L\b/g, ' लिटर');
      },

      // Comprehensive UI Translation Dictionary
      t: (key) => {
        const translations = {
          // Navigation
          home: { en: 'Home', mr: 'मुख्यपृष्ठ' },
          shop: { en: 'Shop', mr: 'खरेदी करा' },
          ourStore: { en: 'Our Store', mr: 'आमचे दुकान' },
          buildHamper: { en: 'Build Hamper', mr: 'भेट बॉक्स बनवा' },
          hamperBadge: { en: '15% Off 🎁', mr: '१५% सूट 🎁' },
          about: { en: 'About', mr: 'आमच्याबद्दल' },
          blogs: { en: 'Blogs', mr: 'पाककृती व लेख' },
          contact: { en: 'Contact', mr: 'संपर्क' },
          searchPlaceholder: { en: 'Search products...', mr: 'पदार्थ किंवा मसाला शोधा...' },
          coinsLabel: { en: 'Coins', mr: 'नाणी' },
          wishlist: { en: 'Wishlist', mr: 'आवडती यादी' },
          cart: { en: 'Cart', mr: 'खरेदी पिशवी' },
          account: { en: 'Account', mr: 'खाते' },
          myAccount: { en: 'My Account', mr: 'माझे खाते' },
          
          // Header / Top Announcement
          freeShippingBanner: { 
            en: '🚚 Free Delivery on orders above ₹499 across Maharashtra!', 
            mr: '🚚 संपूर्ण महाराष्ट्रात ₹४९९ वरील सर्व ऑर्डरवर मोफत होम डिलिव्हरी!' 
          },
          heritageCallout: {
            en: 'Pure Maharashtrian Taste Since 1935',
            mr: '१९३५ पासूनचा अस्सल मराठमोळा स्वाद'
          },

          // Common Action Buttons
          shopNow: { en: 'Shop Now', mr: 'आत्ताच खरेदी करा' },
          addToCart: { en: 'Add to Cart', mr: 'कार्टमध्ये जोडा' },
          added: { en: 'Added!', mr: 'जोडले!' },
          exploreCollection: { en: 'Shop the Collection', mr: 'सर्व उत्पादने पहा' },
          locateShop: { en: 'Locate Our Shop', mr: 'दुकानाची माहिती' },
          explorePickles: { en: 'Explore Pickles', mr: 'लोणची प्रकार पहा' },
          viewAll: { en: 'View All', mr: 'सर्व पहा' },
          buyNow: { en: 'Buy Now', mr: 'त्वरित खरेदी करा' },
          continueShopping: { en: 'Continue Shopping', mr: 'आणखी खरेदी करा' },
          proceedToCheckout: { en: 'Proceed to Checkout', mr: 'ऑर्डर पूर्ण करा' },
          applyPromo: { en: 'Apply', mr: 'लागू करा' },
          remove: { en: 'Remove', mr: 'काढून टाका' },
          clearAll: { en: 'Clear All Filters', mr: 'सर्व फिल्टर्स हटवा' },
          showing: { en: 'Showing', mr: 'दाखवत आहोत' },
          of: { en: 'of', mr: 'पैकी' },
          authenticProducts: { en: 'Authentic Products', mr: 'अस्सल उत्पादने' },

          // Home Page Hero & Sections
          heroBadge1: { en: '🌿 NAIK FOODS ORIGINAL', mr: '🌿 नाईक फूड्स मूळ परंपरा' },
          heroTitle1: { en: 'The Heart of Authentic Maharashtra', mr: 'अस्सल मराठमोळ्या स्वादाची खरी ओळख' },
          heroSubtitle1: { 
            en: 'From hand-pounded masalas to farm-fresh staples, bring the traditional flavors of Vidarbha to your kitchen.',
            mr: 'पारंपारिक जात्यावरचे मसाले ते शेतातील ताजी उत्पादने, विदर्भ आणि कोकणचा अस्सल स्वाद आता तुमच्या घरी.'
          },
          heroTitle2: { en: 'Visit Our Authentic Food Store', mr: 'पुण्यातील आमच्या मुख्य दुकानाला भेट द्या' },
          heroSubtitle2: { 
            en: 'Experience the tradition in person. Visit our flagship store in Pune for the freshest batches and local specialties.',
            mr: 'ताजे खमंग पदार्थ आणि अस्सल मराठमोळी मेजवानी. आजच आमच्या पुणे येथील दुकानाला भेट द्या.'
          },
          heroTitle3: { en: "Aaji's Recipe: Traditional Pickles", mr: 'आजीच्या हातची पारंपरिक लोणची' },
          heroSubtitle3: { 
            en: 'Sun-dried, oil-preserved, and made with 100% natural ingredients. No preservatives, just pure nostalgia.',
            mr: 'उन्हात वाळवलेली, शुद्ध तेलात मुरलेली १००% नैसर्गिक लोणची. कोणतेही कृत्रिम घटक नाहीत.'
          },

          // Trust Badges
          pureTaste: { en: '100% Authentic Maharashtrian Taste', mr: '१००% अस्सल मराठमोळा चविष्ट स्वाद' },
          stoneGround: { en: 'Traditional Stone-Pounded Spices', mr: 'पारंपारिक पद्धतीने कुटलेले मसाले' },
          freeDelivery: { en: 'Free Delivery Across Maharashtra', mr: 'महाराष्ट्रभर मोफत व जलद डिलिव्हरी' },
          qualityAssured: { en: 'Quality & Hygiene Assured', mr: 'उत्कृष्ट दर्जा व शुद्धतेची हमी' },

          // Featured Categories Section
          exploreCategories: { en: 'Explore Our Categories', mr: 'आमचे खास खाद्य प्रकार' },
          categoriesSubtitle: { 
            en: 'Handcrafted with heritage recipes, natural ingredients, and authentic regional love.',
            mr: 'पारंपरिक कृती, शुद्ध घटक आणि आपुलकीने तयार केलेली अस्सल उत्पादने.'
          },

          // Flash Deals / Hot Offers
          flashDealsTitle: { en: '🔥 Hot Festive Offers & Bestsellers', mr: '🔥 खास सणासुदीच्या सवलती आणि लोकप्रिय पदार्थ' },
          flashDealsSub: { en: 'Limited time discounts on family favorites. Grab before stock runs out!', mr: 'मर्यादित काळासाठी विशेष सूट. साठा संपेपर्यंत त्वरित खरेदी करा!' },
          endsIn: { en: 'Offer Ends In:', mr: 'सवलत संपण्यास वेळ:' },
          hours: { en: 'Hrs', mr: 'तास' },
          mins: { en: 'Mins', mr: 'मि.' },
          secs: { en: 'Secs', mr: 'से.' },

          // Why Choose Us
          whyNaikTitle: { en: 'Why Families Choose Naik Foods', mr: 'हजारो कुटुंबे नाईक फूड्सवर का विश्वास ठेवतात?' },
          whyNaikSub: { en: 'Preserving Maharashtra culinary legacy with zero compromises.', mr: 'महाराष्ट्राचा समृद्ध खाद्य वारसा टिकवून ठेवण्याचा आमचा प्रामाणिक प्रयत्न.' },

          // Customer Testimonials
          reviewsTitle: { en: 'Loved by Over 50,000+ Happy Foodies', mr: '५०,०००+ समाधानी ग्राहकांचे प्रेम आणि विश्वास' },
          reviewsSub: { en: 'Real reviews from families across Pune, Mumbai, Nagpur & beyond.', mr: 'पुणे, मुंबई, नागपूर आणि जगभरातील खवय्यांचे अस्सल अभिप्राय.' },

          // Festive Hamper Banner
          hamperBannerTitle: { en: '🎁 Build a Custom Festive Hamper & Get 15% Off', mr: '🎁 तुमचा सण-उत्सव गिफ्ट हॅम्पर्स स्वतः बनवा आणि मिळवा १५% सूट' },
          hamperBannerSub: { 
            en: 'Handpick 4 to 8 of your favorite sweets, savories, and pickles with a personalized greeting card.',
            mr: 'तुमच्या आवडीचे ४ ते ८ गोडधोड, खमंग चिवडे व लोणची निवडा आणि सोबत मोफत शुभेच्छा पत्र पाठवा.'
          },
          buildHamperBtn: { en: 'Create Your Gift Hamper', mr: 'गिफ्ट बॉक्स तयार करा' },

          // Cart Page
          yourCart: { en: 'Your Shopping Cart', mr: 'तुमची खरेदी पिशवी' },
          cartEmpty: { en: 'Your cart is currently empty', mr: 'तुमची खरेदी पिशवी रिकामी आहे' },
          startShopping: { en: 'Browse Our Store', mr: 'उत्पादने पहा' },
          orderSummary: { en: 'Order Summary', mr: 'ऑर्डर तपशील' },
          subtotal: { en: 'Subtotal', mr: 'एकूण रक्कम' },
          deliveryFee: { en: 'Delivery Fee', mr: 'डिलिव्हरी शुल्क' },
          free: { en: 'FREE', mr: 'मोफत' },
          total: { en: 'Total Amount', mr: 'एकूण देय रक्कम' },
          swadCoinsBalance: { en: 'Redeem Swad Coins', mr: 'स्वाद नाणी वापरा' },
          swadCoinsDesc: { en: 'Use coins for instant order discount (1 Coin = ₹1)', mr: 'प्रत्येक नाण्यावर ₹१ ची तात्काळ सूट' },
          applyCoupon: { en: 'Have a Promo Code?', mr: 'कूपन कोड आहे का?' },
          frequentlyBoughtTogether: { en: 'Frequently Bought Together', mr: 'इतर ग्राहकांनी सोबत खरेदी केलेले पदार्थ' },
          addCompanion: { en: '+ Add', mr: '+ जोडा' },
          freeDeliveryProgress: { 
            en: 'Add ₹{amount} more for FREE Delivery!', 
            mr: 'मोफत डिलिव्हरीसाठी अजून ₹{amount} ची खरेदी करा!' 
          },
          freeDeliveryUnlocked: { 
            en: '🎉 Congratulations! You have unlocked FREE Delivery!', 
            mr: '🎉 अभिनंदन! तुम्हाला मोफत होम डिलिव्हरी मिळाली आहे!' 
          },

          // Checkout Page
          checkoutTitle: { en: 'Express Checkout', mr: 'सुरक्षित पेमेंट व चेकआउट' },
          deliveryAddress: { en: '1. Delivery Address', mr: '१. डिलिव्हरी पत्ता' },
          paymentMethod: { en: '2. Select Payment Method', mr: '२. पेमेंट पद्धत निवडा' },
          instantUpi: { en: 'Instant UPI (GPay, PhonePe, Paytm, QR)', mr: 'तात्काळ UPI (GPay, PhonePe, Paytm, QR)' },
          cardsNetbanking: { en: 'Credit/Debit Cards & Net Banking', mr: 'क्रेडिट/डेबिट कार्ड व नेट बँकिंग' },
          cod: { en: 'Cash on Delivery (COD)', mr: 'कॅश ऑन डिलिव्हरी (COD)' },
          codNote: { 
            en: 'COD available on orders between ₹299 and ₹1,500 (+₹40 courier handling fee).', 
            mr: '₹२९९ ते ₹१,५०० च्या दरम्यानच्या ऑर्डरवर COD उपलब्ध आहे (+₹४० हाताळणी शुल्क).' 
          },
          placeOrder: { en: 'Place Order & Pay', mr: 'ऑर्डर निश्चित करा' },
          pinOnMap: { en: 'Pinpoint Exact Delivery Location on Map', mr: 'नकाशावर अचूक डिलिव्हरी ठिकाण निवडा' },
          deliverHere: { en: 'Deliver to this location', mr: 'या पत्त्यावर डिलिव्हरी करा' },
          fullName: { en: 'Full Name', mr: 'पूर्ण नाव' },
          phoneNumber: { en: 'Phone Number', mr: 'मोबाईल नंबर' },
          flatHouse: { en: 'Flat / House No. / Building', mr: 'घर / इमारत / फ्लॅट क्र.' },
          areaStreet: { en: 'Area / Street / Colony', mr: 'परिसर / रस्ता / वसाहत' },
          city: { en: 'City', mr: 'शहर' },
          state: { en: 'State', mr: 'राज्य' },
          pincode: { en: 'Pincode', mr: 'पिनकोड' },
          addressType: { en: 'Address Type', mr: 'पत्त्याचा प्रकार' },
          homeTag: { en: 'Home', mr: 'घर' },
          workTag: { en: 'Work', mr: 'कार्यालय' },
          otherTag: { en: 'Other', mr: 'इतर' },

          // Product Details Page
          fssaiTab: { en: 'FSSAI & Statutory Details', mr: 'FSSAI व नियामक तपशील' },
          ingredientsTab: { en: 'Ingredients & Allergen Info', mr: 'घटक व ॲलर्जी माहिती' },
          recipeTab: { en: 'Aaji’s Recipe & Serving Tips', mr: 'आजींची कृती व सर्व्हिंग टिप्स' },
          checkDelivery: { en: 'Check Delivery Availability', mr: 'डिलिव्हरी उपलब्धता तपासा' },
          pincodePlaceholder: { en: 'Enter 6-digit Pincode', mr: '६-अंकी पिनकोड टाका' },
          checkBtn: { en: 'Check', mr: 'तपासा' },
          inclusiveGst: { en: 'Inclusive of all GST', mr: 'सर्व कर (GST) समाविष्ट' },
          netWt: { en: 'Net Wt:', mr: 'वजन:' },
          legacyTag: { en: '1938 Legacy Heritage', mr: '१९३८ पासूनचा वारसा' },
          pureHygiene: { en: '100% Pure & Hygienic', mr: '१००% शुद्ध व सुरक्षित' },
          mahaDelivery: { en: 'Maharashtra Delivery', mr: 'महाराष्ट्रभर डिलिव्हरी' },

          // Hamper Builder Page
          hamperStep1: { en: 'Step 1: Choose Hamper Box Size', mr: 'टप्पा १: गिफ्ट बॉक्सचा आकार निवडा' },
          hamperStep2: { en: 'Step 2: Pick Your Traditional Items', mr: 'टप्पा २: तुमचे आवडते पदार्थ निवडा' },
          hamperStep3: { en: 'Step 3: Add Greeting Card & Message', mr: 'टप्पा ३: शुभेच्छा संदेश व पत्र जोडा' },
          selectedItems: { en: 'Selected Items', mr: 'निवडलेले पदार्थ' },
          addHamperToCart: { en: 'Add Custom Hamper to Cart', mr: 'तयार हॅम्पर्स कार्टमध्ये जोडा' },

          // Wishlist Page
          myWishlist: { en: 'My Saved Favorites', mr: 'माझे आवडते पदार्थ' },
          wishlistEmpty: { en: 'No favorites saved yet.', mr: 'कोणतेही आवडते पदार्थ जोडलेले नाहीत.' },
          exploreToSave: { en: 'Explore our traditional snacks, pickles and masalas to save your favorites!', mr: 'आमचे अस्सल चिवडे, लोणची आणि मसाले पाहून आवडती यादी तयार करा!' },

          // Store / Shop Page
          allProducts: { en: 'All Products', mr: 'सर्व उत्पादने' },
          filterByCategory: { en: 'Filter by Category', mr: 'प्रकारानुसार निवडा' },
          filterByRegion: { en: 'Filter by Region', mr: 'विभागानुसार निवडा' },
          filterByVendor: { en: 'Filter by Brand / Vendor', mr: 'उत्पादक / ब्रँडनुसार' },
          sortBy: { en: 'Sort By', mr: 'क्रमवारी' },
          newestFirst: { en: 'Newest First', mr: 'नवीनतम उत्पादने' },
          priceLowHigh: { en: 'Price: Low to High', mr: 'किंमत: कमी ते जास्त' },
          priceHighLow: { en: 'Price: High to Low', mr: 'किंमत: जास्त ते कमी' },
          ratingSort: { en: 'Customer Rating', mr: 'ग्राहकांची पसंती' },
          inStockOnly: { en: 'In Stock Only', mr: 'फक्त उपलब्ध साठा' },
          spiceMeter: { en: 'Spice Level', mr: 'तिखटपणा' },
          dietaryPill: { en: '100% Vegetarian', mr: '१००% शाकाहारी' },

          // Regional Taste Map
          tasteMapTitle: { en: 'Explore Maharashtra’s Regional Flavors', mr: 'महाराष्ट्राच्या अस्सल प्रांतिक चवींची सफर' },
          tasteMapSub: { en: 'Taste the diverse culinary heritage across Kokan, Vidarbha, Pune & Marathwada.', mr: 'कोकण, विदर्भ, पश्चिम महाराष्ट्र व मराठवाड्याची पारंपरिक खाद्य संस्कृती.' },

          // Footer
          visitStoreTitle: { en: 'Visit Our Flagship Store', mr: 'आमच्या दुकानाला भेट द्या' },
          storeAddress: { 
            en: 'Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth, Pune 411002', 
            mr: 'सेवा मित्र मंडळ चौक, फडगेट पोलीस चौकी जवळ, शुक्रवार पेठ, पुणे ४११००२' 
          },
          storeHours: { en: '9 AM - 10 PM Daily', mr: 'दररोज सकाळी ९ ते रात्री १०' },
          getDirections: { en: 'Get Directions', mr: 'नकाशा व रस्ता पहा' },
          quickLinks: { en: 'Quick Links', mr: 'महत्वाच्या लिंक्स' },
          categoriesFooter: { en: 'Categories', mr: 'खाद्य प्रकार' },
          copyright: { 
            en: '© 2026 Naik Foods • Pure Maharashtrian Taste Since 1935', 
            mr: '© २०२६ नाईक फूड्स • १९३५ पासूनचा अस्सल मराठमोळा स्वाद' 
          },
          termsLink: { en: 'Terms & Conditions', mr: 'नियम व अटी' },
          privacyLink: { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' },
          shippingLink: { en: 'Shipping Policy', mr: 'डिलिव्हरी धोरण' },
          refundLink: { en: 'Refund Policy', mr: 'परतावा धोरण' },

          // Aaji AI Chatbot
          aajiTitle: { en: '👵 Aaji AI Assistant', mr: '👵 आजी AI मदतनीस' },
          aajiGreeting: { 
            en: 'Namaskar! I am your culinary Aaji. Ask me anything about traditional recipes, spice levels, or delivery times!',
            mr: 'नमस्कार बाळ! मी तुझी आजी. अस्सल मराठमोळ्या पाककृती, मसाल्यांचे प्रमाण किंवा डिलिव्हरीबद्दल मला काहीही विचार!'
          }
        };

        const currentLang = get().lang || 'en';
        return translations[key]?.[currentLang] || translations[key]?.en || key;
      }
    }),
    {
      name: 'naikfoods-language-storage',
    }
  )
);
