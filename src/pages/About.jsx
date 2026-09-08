import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import {
  Compass,
  Sprout,
  Flame,
  Truck,
  ShieldCheck,
  Sparkles,
  Users,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  const statItems = [
    { 
      label: '1938', 
      sub: isMr ? 'परंपरेची सुरुवात' : 'Legacy Began', 
      desc: isMr ? 'नाईक सीड्सच्या स्थापनेने पाया रचला.' : 'Founded with Naik Seeds.' 
    },
    { 
      label: '75+', 
      sub: isMr ? 'वर्षांचा अतूट विश्वास' : 'Years of Trust', 
      desc: isMr ? 'पिढ्यानपिढ्या ग्राहकांची सेवा.' : 'Serving generations.' 
    },
    { 
      label: '04', 
      sub: isMr ? 'यशस्वी कौटुंबिक व्यवसाय' : 'Family Ventures', 
      desc: isMr ? 'कृषी क्षेत्रापासून आदरातिथ्यापर्यंत.' : 'Agriculture to hospitality.' 
    },
    { 
      label: '2025', 
      sub: isMr ? 'नाईक फूड्सचा नवा अध्याय' : 'Naik Foods', 
      desc: isMr ? 'अस्सल मराठमोळा खाद्य ब्रँड.' : 'A new chapter begins.' 
    },
  ];

  const workSteps = [
    {
      title: isMr ? 'पारंपारिक पाककृती शोध' : 'Sourcing Regional Recipes',
      description: isMr ? 'कोकण ते विदर्भातील स्थानिक कारागीर व आजींच्या कृतींचे संकलन.' : 'Collaborating with local artisans from Konkan to Vidarbha.',
      icon: Compass,
    },
    {
      title: isMr ? 'दर्जेदार घटकांची निवड' : 'Ingredient Selection',
      description: isMr ? 'उत्कृष्ट ताज्या व नैसर्गिक स्थानिक धान्यांची आणि मसाल्यांची निवड.' : 'Only the finest local ingredients for peak freshness.',
      icon: Sprout,
    },
    {
      title: isMr ? 'मायेने व काळजीपूर्वक बनवणे' : 'Preparation with Care',
      description: isMr ? 'आधुनिक स्वच्छता मानकांसह पारंपारिक जात्यावर व खलबत्यातील पद्धत.' : 'Traditional methods with modern hygiene standards.',
      icon: Flame,
    },
    {
      title: isMr ? 'पॅकिंग व होम डिलिव्हरी' : 'Curation & Delivery',
      description: isMr ? 'पुण्यातील केंद्रातून ताजे पॅक करून थेट तुमच्या घरापर्यंत पोहोचवणे.' : 'Freshly packed in Pune for your doorstep delivery.',
      icon: Truck,
    },
    {
      title: isMr ? 'गुणवत्ता व चवीची हमी' : 'Quality Assurance',
      description: isMr ? 'चव, स्वच्छता आणि सुरक्षित पॅकेजिंगची कठोर FSSAI तपासणी.' : 'Strict checks for taste, hygiene, and packaging.',
      icon: ShieldCheck,
    },
  ];

  const valuesList = [
    {
      id: 'authenticity',
      icon: Sparkles,
      title: isMr ? 'अस्सलता व पारंपारिकता' : 'Authenticity',
      description: isMr ? 'प्रत्येक पदार्थ पारंपारिक वारसा कृतीनुसार तयार केला जातो, ज्यामुळे प्रत्येक घासात अस्सल मराठमोळा स्वाद मिळतो.' : 'Every dish is crafted with heirloom recipes to ensure a true Maharashtrian soul in every bite.',
    },
    {
      id: 'reliability',
      icon: ShieldCheck,
      title: isMr ? 'विश्वासार्हता व स्वच्छता' : 'Reliability',
      description: isMr ? 'काळजीपूर्वक तयारीपासून वेळेवर डिलिव्हरीपर्यंत, आम्ही स्वच्छता आणि विश्वासाचे सर्वोच्च मानक राखतो.' : 'From careful preparation to timely delivery, we maintain the highest standards of hygiene and trust.',
    },
    {
      id: 'community',
      icon: Users,
      title: isMr ? 'शेतकरी व समाज सक्षमीकरण' : 'Community',
      description: isMr ? 'आम्ही स्थानिक शेतकरी आणि महिला गृहउद्योजकांना बळ देऊन महाराष्ट्राच्या मूळ परंपरेला आधार देतो.' : 'We empower local farmers and home chefs, building a sustainable network that supports Maharashtra’s roots.',
    },
    {
      id: 'regional',
      icon: MapPin,
      title: isMr ? 'प्रांतिक खाद्य संस्कृतीचा अभिमान' : 'Regional Pride',
      description: isMr ? 'कोकणच्या किनारपट्टीपासून विदर्भाच्या सावजी स्वादापर्यंत, महाराष्ट्राचा समृद्ध खाद्य वारसा तुमच्या ताटात आणणे.' : 'Bringing you the diverse culinary landscape of Maharashtra, from the Konkan coast to the heart of Vidarbha.',
    },
  ];

  return (
    <div className="w-full bg-white font-sans text-[#161915] selection:bg-[#70BF4F]/20 selection:text-[#161915]">
      
      {/* TOP HEADER GREEN BANNER */}
      <section className="relative w-full bg-[#70BF4F] py-14 md:py-20 overflow-hidden text-center text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: 'url("/banners/Hero-Banner.png")' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 font-manrope">
            {isMr ? 'आमच्याबद्दल' : 'About Us'}
          </h1>
          <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto">
            {isMr 
              ? '१९३८ पासूनची परंपरा, शुद्धता आणि अस्सल मराठमोळ्या स्वादाचा समृद्ध वारसा'
              : 'Insights, tips, and updates to help you shop smarter and live better'}
          </p>
        </div>
      </section>

      {/* SECTION 1: OUR LEGACY - From Seeds to Sustenance */}
      <section className="relative overflow-hidden bg-white py-12 md:py-24">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F2F7F5] z-0 blur-3xl pointer-events-none"
        />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Legacy Story & Stats */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[#70BF4F] font-extrabold text-xs uppercase tracking-[0.2em] block mb-2">
                  {isMr ? 'आमचा वारसा' : 'OUR LEGACY'}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-black text-[#161915] leading-[1.1] mb-6">
                  {isMr ? (
                    <>बियाण्यांपासून ते <br className="hidden sm:inline" /><span className="text-[#70BF4F]">अस्सल अन्नापर्यंत</span></>
                  ) : (
                    <>From Seeds to <br className="hidden sm:inline" /><span className="text-[#70BF4F]">Sustenance</span></>
                  )}
                </h2>
                
                {isMr ? (
                  <>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px]">
                      १९३८ मध्ये <strong className="text-gray-900 font-bold">कै. श्री. अनंत बाळकृष्ण नाईक</strong> यांनी सुरू केलेल्या वारशावर आधारित, नाईक कुटुंबाने कृषी, आदरातिथ्य आणि व्यवसाय क्षेत्रात आठ दशकांहून अधिक काळ ग्राहकांचा अतूट विश्वास संपादन केला आहे. <strong className="text-gray-900 font-bold">नाईक सीड्स</strong> पासून ते <strong className="text-gray-900 font-bold">सुशील लॉजिंग</strong>, <strong className="text-gray-900 font-bold">सुशील डायनिंग हॉल</strong> आणि <strong className="text-gray-900 font-bold">नाईक लँडस्केप सर्व्हिसेस</strong> पर्यंतचा हा प्रवास नेहमीच गुणवत्ता आणि सेवेने प्रेरित राहिला आहे.
                    </p>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px] mt-4">
                      हाच समृद्ध वारसा पुढे नेत, २०२५ मध्ये <strong className="text-gray-900 font-bold">सौ. प्रिया चंदन नाईक</strong> यांनी <strong className="text-gray-900 font-bold">नाईक फूड्स</strong> ची स्थापना केली — ज्याद्वारे पिढ्यानपिढ्या चालत आलेली शुद्धता, चव आणि मराठमोळी आपुलकी एकाच विश्वासाच्या नावाखाली घराघरांत पोहोचवली जात आहे.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px]">
                      Rooted in a legacy that began in 1938 with{' '}
                      <strong className="text-gray-900 font-bold">Late Shri Anant Balkrishna Naik</strong>, the
                      Naik family has spent over eight decades building trust across agriculture, hospitality, and
                      lifestyle sectors. From the foundation of{' '}
                      <strong className="text-gray-900 font-bold">Naik Seeds</strong> to ventures like{' '}
                      <strong className="text-gray-900 font-bold">Sushil Lodging</strong>,{' '}
                      <strong className="text-gray-900 font-bold">Sushil Dining Hall</strong>, and{' '}
                      <strong className="text-gray-900 font-bold">Naik Landscape Services</strong>, the journey
                      has always been driven by quality, service, and innovation.
                    </p>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px] mt-4">
                      Continuing this legacy, <strong className="text-gray-900 font-bold">Naik Foods</strong>,
                      founded in 2025 by{' '}
                      <strong className="text-gray-900 font-bold">Mrs. Priya Chandan Naik</strong>, brings
                      together wholesome and high-quality food products under one trusted name — carrying forward
                      generations of dedication, purity, and excellence.
                    </p>
                  </>
                )}
              </div>

              {/* 4 Stat Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-5 pt-2">
                {statItems.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 rounded-[20px] bg-[#F9FBF9] border border-[#F0F2EF] hover:border-[#70BF4F] hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-default"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-[#70BF4F] mb-1 leading-none">
                      {stat.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#161915] leading-tight mb-1">
                      {stat.sub}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Founder Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:mt-6">
                <div
                  aria-hidden="true"
                  className="absolute -top-5 -right-5 w-full h-full bg-[#F2F7F5] z-0 pointer-events-none"
                  style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                />

                <div className="relative w-full h-[460px] sm:h-[550px] lg:h-[620px] rounded-[32px] overflow-hidden z-10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-8 border-white bg-gray-100">
                  <img
                    src="/about/founder.jpeg"
                    alt="Mrs. Priya Chandan Naik, Founder of Naik Foods"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="hidden md:block absolute bottom-8 -left-6 bg-[#70BF4F] text-white p-4 rounded-[18px] z-20 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <h6 className="font-black text-lg leading-tight">{isMr ? '१९३८ पासून' : 'Since 1938'}</h6>
                  <p className="text-xs text-white/90 font-medium">{isMr ? 'पिढ्यान्‌पिढ्यांचा विश्वास' : 'Generations of trust'}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: OUR INSPIRATION - Our AAJI */}
      <section className="py-12 md:py-24 bg-white border-t border-gray-100/80">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-black text-[#161915] leading-[1.1]">
              {isMr ? (
                <>आमची प्रेरणा, <br /><span className="text-[#70BF4F]">आमची आजी</span></>
              ) : (
                <>Our Inspiration, <br /><span className="text-[#70BF4F]">Our AAJI</span></>
              )}
            </h2>

            <div className="flex flex-col gap-4 text-base sm:text-lg leading-relaxed">
              {isMr ? (
                <>
                  <p className="text-[#161915] font-medium">
                    <strong className="font-bold text-gray-900">नाईक फूड्स</strong> ची कहाणी ही नाईक कुटुंबाच्या पुण्यातील ७० हून अधिक वर्षांच्या कृषी व खाद्य संस्कृतीच्या नात्यात गुंफलेली आहे.
                  </p>
                  <p className="text-gray-600">
                    १९८० च्या दशकात <strong className="text-gray-900 font-bold">कै. सरिता नाईक</strong> (आमच्या लाडक्या आजी) यांनी पुण्यातील पहिले केक मॅन्युफॅक्चरिंग वर्ग सुरू करून नवकल्पनांचा पाया घातला. त्यांचे स्वयंपाकघर हे केवळ स्वयंपाकाचे ठिकाण नव्हते, तर तेथे परंपरा आणि नवनिर्मितीचा अनोखा संगम होता.
                  </p>
                  <p className="text-gray-600">
                    १९९२ मध्ये कुटुंबाने <a href="https://hotelsushil.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#161915] underline decoration-[#70BF4F] decoration-2 underline-offset-4 hover:text-[#70BF4F] transition-colors">हॉटेल सुशील</a> ची स्थापना करून आदरातिथ्य क्षेत्रात आपले स्थान अधिक मजबूत केले.
                  </p>
                  <p className="text-gray-600">
                    आजी या सर्वांचे हृदय होत्या — ज्यांनी अस्सल मराठमोळ्या पाककृती आणि हाताने कुटलेले मसाले यात परिपूर्णता मिळवली. आज नाईक फूड्स ही त्यांच्याच प्रेरणेला दिलेली एक कृतज्ञता आहे — असे पदार्थ जे केवळ चविष्ट नाहीत, तर घराच्या मायेची आठवण करून देतात.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[#161915] font-medium">
                    The story of <strong className="font-bold text-gray-900">Naik Foods</strong> is deeply rooted in
                    the legacy of the Naik family, which has been connected to agriculture in Pune for over 70
                    years—a foundation built on authenticity, quality, and respect for tradition.
                  </p>
                  <p className="text-gray-600">
                    In the late 1980s, <strong className="text-gray-900 font-bold">Late Sarita Naik</strong> (our
                    beloved Aaji) took this legacy a step further by starting Pune’s first cake manufacturing
                    classes, long before baking became mainstream. Her kitchen was more than a place to cook—it was
                    a space where tradition met innovation, where every recipe was crafted with precision and love.
                  </p>
                  <p className="text-gray-600">
                    In 1992, the family expanded its journey in hospitality with the establishment of{' '}
                    <a
                      href="https://hotelsushil.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#161915] underline decoration-[#70BF4F] decoration-2 underline-offset-4 hover:text-[#70BF4F] transition-colors"
                    >
                      Hotel Sushil
                    </a>
                    , further strengthening our connection with serving people and creating comforting experiences.
                  </p>
                  <p className="text-gray-600">
                    Aaji was the heart of it all—an innovator who perfected authentic Maharashtrian recipes and
                    handcrafted masalas. Her techniques carried the essence of home, perfected through years of
                    intuition and care. Today, Naik Foods is a tribute to her legacy—sharing food that doesn’t just
                    taste good, but feels like home.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 relative w-full sm:w-[80%] md:w-[440px] mx-auto">
            <div
              aria-hidden="true"
              className="hidden md:block absolute -top-4 -right-4 w-28 h-28 border-t-4 border-r-4 border-[#70BF4F] rounded-tr-[28px] z-0 pointer-events-none"
            />

            <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] rounded-[24px] overflow-hidden bg-[#f5f5f5] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] z-10 border-4 border-white">
              <img
                src="/about/aaji.jpg"
                alt="Late Sarita Naik - The inspiration behind Naik Foods"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: HOW WE WORK (5 Step Process) */}
      <section className="py-16 md:py-24 bg-[#F8FAF7]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#70BF4F] font-extrabold text-xs uppercase tracking-[0.2em] block mb-2">
              {isMr ? 'कार्यपद्धती' : 'OUR PROCESS'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              {isMr ? 'गुणवत्ता आणि शुद्धतेची ५ सूत्रे' : 'How We Bring Authenticity to You'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {workSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-[#70BF4F] flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE VALUES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#70BF4F] font-extrabold text-xs uppercase tracking-[0.2em] block mb-2">
              {isMr ? 'आमची मूल्ये' : 'OUR VALUES'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              {isMr ? 'ज्या मूल्यांवर आम्ही काम करतो' : 'The Values That Guide Us'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valuesList.map((val) => {
              const IconComp = val.icon;
              return (
                <div key={val.id} className="p-8 rounded-3xl bg-[#F9FBF9] border border-[#EAEDE9] flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#70BF4F] shadow-sm flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{val.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 bg-[#161915] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 font-serif">
            {isMr ? 'अस्सल मराठमोळा स्वाद अनुभवायचा आहे?' : 'Taste the Authentic Heritage Today'}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8">
            {isMr 
              ? 'आमची पारंपारिक उत्पादने पहा आणि घरपोच मागवा.'
              : 'Explore our wide range of handcrafted pickles, stone-pounded masalas, and crispy snacks.'}
          </p>
          <Link
            to="/in/store"
            className="inline-flex items-center gap-2 bg-[#70BF4F] hover:bg-[#5ca040] text-white px-8 py-3.5 rounded-2xl font-bold transition-transform hover:scale-105"
          >
            {isMr ? 'खरेदी सुरू करा' : 'Explore Store'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
