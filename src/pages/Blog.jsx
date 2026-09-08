import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { Calendar, Clock, ArrowRight, Tag, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'secrets-of-crispy-methi-chakali',
    title: 'The Secret Behind Crisp & Fragrant Methi Chakali',
    titleMr: 'खमंग आणि कुरकुरीत मेथी चकलीचे पारंपरिक रहस्य',
    excerpt: 'Learn the traditional ratios of roasted Bhajani flour and fresh fenugreek leaves that make Maharashtrian Chakali irresistibly crisp without absorbing excess oil.',
    excerptMr: 'भाजणीचे अचूक प्रमाण आणि मेथीच्या पानांचा स्वाद — तेलकट न होता अतिशय कुरकुरीत चकली बनवण्याची पारंपरिक पद्धत जाणून घ्या.',
    category: 'Snacks & Namkeen',
    categoryMr: 'स्नॅक्स व फरसाण',
    readTime: '4 min read',
    readTimeMr: '४ मिनिटे वाचन',
    date: 'Sep 02, 2026',
    dateMr: '२ सप्टेंबर २०२६',
    author: 'Mrs. Priya Naik',
    authorMr: 'सौ. प्रिया नाईक',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1779968324/medusa/1779968322289-IMG_3854.JPG.jpeg.jpg',
    content: `
      Chakali is not just a festive snack; in Maharashtra, it is an emotion. The distinct spiral shape, the crispy bite, and the burst of spices like cumin, carom seeds, and dry fenugreek (methi) leaves create an unmatched tea-time companion.

      ### The Importance of Bhajanic Flour
      The base of true Maharashtrian Chakali is 'Bhajani' — a specially proportioned mixture of rice, chana dal, urad dal, and coriander seeds roasted slowly on low heat before being stone ground.

      ### Adding the Twist of Methi
      At Naik Foods, we add carefully selected dehydrated methi leaves that add an earthy bitterness balancing the deep savory spices.
    `,
    contentMr: `
      चकली हा महाराष्ट्रात फक्त दिवाळीचा फराळ नसून एक भावना आहे. सुरेख काटेरी वेढा, प्रत्येक घासात कुरकुरीतपणा आणि जिरे, ओवा व मेथीच्या पानांचा सुवास संध्याकाळच्या चहाची रंगत वाढवतो.

      ### भाजणीचे महत्त्व
      अस्सल मराठमोळ्या चकलीचा आत्मा हा 'भाजणी' मध्ये असतो. तांदूळ, चणा डाळ, उडीद डाळ आणि धने मंद आचेवर खमंग भाजून जात्यावर दळलेली भाजणी चकलीला खरी चव देते.

      ### मेथीचा स्वाद
      नाईक फूड्समध्ये आम्ही खास वाळवलेली मेथीची पाने वापरतो, ज्यामुळे चकलीला एक अप्रतिम सुगंध आणि चव मिळते.
    `
  },
  {
    id: 2,
    slug: 'traditional-ambadi-bhaji-lonche-heritage',
    title: 'Ambadi Lonche: A Forgotten Gem of Marathwada & Vidarbha',
    titleMr: 'अंबाडी लोणचे: मराठवाडा व विदर्भाचा विस्मरणात गेलेला अनमोल ठेवा',
    excerpt: 'Ambadi (Roselle / Sorrel leaves) pickle has been a staple in rural Maharashtra for centuries. Discover its natural gut-healthy tanginess and medicinal benefits.',
    excerptMr: 'अंबाडीच्या पानांचे नैसर्गिक आंबट-तिखट लोणचे — पचनास उत्तम आणि आरोग्यासाठी अत्यंत गुणकारी असलेला पारंपरिक वारसा.',
    category: 'Pickles & Condiments',
    categoryMr: 'लोणची व ठेचा',
    readTime: '5 min read',
    readTimeMr: '५ मिनिटे वाचन',
    date: 'Aug 24, 2026',
    dateMr: '२४ ऑगस्ट २०२६',
    author: 'Late Sarita Naik Legacy',
    authorMr: 'कै. सरिता नाईक वारसा',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1780121990/medusa/1780121988900-pomelli_photoshoot_image_1_1_0529%20%287%29.png.jpg',
    content: `
      Ambadi (Gongura or Roselle) is packed with Vitamin C, Iron, and natural antioxidants. In traditional Maharashtrian households, preparing Ambadi pickle is an art.

      ### How It Is Made
      Tender sorrel leaves are hand-plucked, cleaned, and sautéed with mustard oil, roasted fenugreek powder, crushed garlic, and Kolhapuri red chili flakes. The result is a tongue-tingling pickle that elevates simple Dal-Rice or Bhakri into a royal feast.
    `,
    contentMr: `
      अंबाडीच्या पानांमध्ये भरपूर प्रमाणात व्हिटॅमिन सी, लोह आणि नैसर्गिक अँटीऑक्सिडंट्स असतात.

      ### कसे बनवले जाते?
      कोवळी पाने निवडून, मोहरीच्या तेलात, भाजलेल्या मेथी दाण्यांची पूड, ठेचलेला लसूण आणि कोल्हापुरी लाल तिखट घालून हे लोणचे तयार केले जाते. गरमागरम वरण-भात किंवा ज्वारीच्या भाकरीसोबत हा एक शाही बेत ठरतो.
    `
  },
  {
    id: 3,
    slug: 'why-jowar-is-the-superfood-you-need',
    title: 'Why Jowar (Sorghum) Is the Ultimate Modern Superfood',
    titleMr: 'ज्वारी: आधुनिक आरोग्यासाठी परिपूर्ण सुपरफूड का आहे?',
    excerpt: 'Gluten-free, fiber-rich, and diabetic-friendly: why shifting to traditional millet snacks like Jwari Bhel & Jowar Chivda transforms your daily digestion and energy.',
    excerptMr: 'ग्लुटेन-मुक्त, भरपूर फायबर आणि मधुमेहासाठी उपयुक्त: ज्वारीची भेळ आणि चिवड्यासारखे पारंपरिक स्नॅक्स आरोग्यासाठी का सर्वोत्तम आहेत ते जाणून घ्या.',
    category: 'Health & Wellness',
    categoryMr: 'आरोग्य व पोषण',
    readTime: '3 min read',
    readTimeMr: '३ मिनिटे वाचन',
    date: 'Aug 15, 2026',
    dateMr: '१५ ऑगस्ट २०२६',
    author: 'Naik Foods Culinary Team',
    authorMr: 'नाईक फूड्स टीम',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1781146398/medusa/1781146396686-pomelli_photoshoot_image_1_1_0526%20%282%29%20%282%29.png.jpg',
    content: `
      Millets have been the backbone of rural Indian nutrition for over 3,000 years. Sorghum (Jowar) stands out due to its high dietary fiber, complex carbohydrates, and zero gluten content.

      Snacking on puffed Jowar (Jwari Bhel) gives you long-lasting energy without glucose spikes, making it an ideal choice for healthy living.
    `,
    contentMr: `
      भरडधान्ये ही हजारो वर्षांपासून आपल्या आहाराचा मुख्य आधार आहेत. ज्वारीमध्ये उच्च फायबर आणि शून्य ग्लुटेन असल्यामुळे ती पचनास हलकी आणि ऊर्जा देणारी असते.

      भाजलेल्या ज्वारीची भेळ खाल्ल्याने शरीराला दीर्घकाळ ऊर्जा मिळते आणि रक्तातील साखरेचे प्रमाण नियंत्रित राहण्यास मदत होते.
    `
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  const categories = useMemo(() => {
    const set = new Set(['All']);
    BLOG_POSTS.forEach(b => set.add(isMr ? b.categoryMr : b.category));
    return Array.from(set);
  }, [isMr]);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter(b => (isMr ? b.categoryMr : b.category) === selectedCategory);
  }, [selectedCategory, isMr]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error(isMr ? 'कृपया योग्य ईमेल टाका.' : 'Please enter a valid email.');
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      toast.success(isMr ? 'वृत्तपत्राची सदस्यता यशस्वीरित्या घेतली!' : 'Successfully subscribed to Culinary Gazette!');
      setNewsletterEmail('');
    }, 600);
  };

  return (
    <div className="w-full bg-[#FDFCF7] min-h-screen pb-20 font-sans text-[#161915]">
      {/* Top Banner */}
      <section className="relative w-full bg-[#70BF4F] py-14 md:py-20 overflow-hidden text-center text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: 'url("/banners/Hero-Banner.png")' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3">
            {isMr ? 'अस्सल पाककृती व संस्कृती' : 'Naik Heritage & Recipes'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 font-serif">
            {isMr ? 'पाककृती, आरोग्य व खाद्य परंपरा' : 'Culinary Gazette & Stories'}
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto">
            {isMr 
              ? 'महाराष्ट्रातील पारंपरिक मसाले, आजींच्या जुन्या कृती आणि पौष्टिक धान्यांची माहितीपूर्ण सफर.'
              : 'Heirloom family recipes, spice-grinding secrets, and wellness insights from the heart of Pune.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#70BF4F] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat === 'All' ? (isMr ? 'सर्व लेख' : 'All Stories') : cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-[#EAEDE9] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={post.image}
                  alt={isMr ? post.titleMr : post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black text-[#70BF4F] shadow-sm uppercase">
                  {isMr ? post.categoryMr : post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#70BF4F]" />
                    {isMr ? post.dateMr : post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#70BF4F]" />
                    {isMr ? post.readTimeMr : post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#70BF4F] transition-colors mb-2 font-serif line-clamp-2">
                  <Link to={`/in/blog/${post.slug}`}>
                    {isMr ? post.titleMr : post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {isMr ? post.excerptMr : post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {isMr ? post.authorMr : post.author}
                  </span>
                  <Link
                    to={`/in/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#70BF4F] hover:text-[#5ca040]"
                  >
                    {isMr ? 'पूर्ण वाचा' : 'Read Story'} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-br from-[#F8FAF6] to-white dark:from-[#0F172A] dark:to-[#131E35] p-8 sm:p-12 rounded-3xl border border-[#EAEDE9] dark:border-[#1E293B] text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2 font-serif">
            {isMr ? 'आजीच्या अस्सल पाककृती थेट ईमेलवर मिळवा' : 'Receive Grandma’s Secret Recipes in Your Inbox'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 max-w-xl mx-auto">
            {isMr 
              ? 'सणासुदीच्या खास ऑफर, नवीन उत्पादने आणि पारंपारिक पाककृतींसाठी आजच सामील व्हा.'
              : 'Join over 15,000+ food lovers who receive our seasonal recipe gazettes, spice-pairing guides, and exclusive discounts.'}
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder={isMr ? 'तुमचा ईमेल पत्ता टाका...' : 'Enter your email address...'}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow bg-white dark:bg-[#131E35] border border-gray-200 dark:border-[#243556] text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#70BF4F]"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-[#70BF4F] hover:bg-[#5ca040] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isSubscribing 
                ? (isMr ? 'नोंदणी होत आहे...' : 'Subscribing...') 
                : (isMr ? 'सदस्यता घ्या' : 'Subscribe')}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
