import HeroBanner from '../components/HeroBanner';
import { useLanguageStore } from '../store/languageStore';

export default function PrivacyPolicy() {
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  const privacySections = [
    {
      title: isMr ? '१. परिचय व धोरण' : '1. Introduction',
      content: isMr
        ? 'नाईक फूड्स आपल्या गोपनीयतेचे रक्षण करण्यासाठी कटिबद्ध आहे. हे गोपनीयता धोरण स्पष्ट करते की आपण आमच्या वेबसाइटचा वापर करता तेव्हा आम्ही आपला वैयक्तिक डेटा कसा गोळा करतो, वापरतो आणि सुरक्षित ठेवतो.'
        : 'Naik Foods is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our website or services.',
    },
    {
      title: isMr ? '२. आम्ही कोणती माहिती गोळा करतो' : '2. Information We Collect',
      content: isMr
        ? 'आपण ऑर्डर देताना किंवा खाते तयार करताना आम्ही आपले नाव, मोबाईल नंबर, डिलिव्हरी पत्ता आणि ईमेल पत्ता गोळा करतो.'
        : 'We may collect information such as your name, contact details, delivery address, payment information, and browsing behavior when you visit our site or place an order.',
    },
    {
      title: isMr ? '३. माहितीचा वापर कसा केला जातो' : '3. How We Use Your Information',
      content: isMr
        ? 'आम्ही आपल्या डेटाचा वापर फक्त ऑर्डर्स प्रक्रिया करण्यासाठी, डिलिव्हरी अपडेट्स पाठवण्यासाठी आणि सेवा सुधारण्यासाठी करतो. आम्ही आपला डेटा कोणत्याही तृतीय पक्षाला विकत नाही.'
        : 'We use your data to process orders, improve user experience, communicate updates, and for internal analytics. We never sell your data to third parties.',
    },
    {
      title: isMr ? '४. डेटा सुरक्षा मानके' : '4. Data Security',
      content: isMr
        ? 'आपला डेटा सुरक्षित ठेवण्यासाठी आम्ही उच्च दर्जाचे एनक्रिप्शन आणि उद्योग-मानक सुरक्षा उपाय वापरतो.'
        : 'We implement industry-standard security practices to safeguard your personal data from unauthorized access, disclosure, alteration, or destruction.',
    },
    {
      title: isMr ? '५. संपर्क माहिती' : '5. Contact Information',
      content: isMr
        ? 'गोपनीयता धोरणाबाबत काही प्रश्न असल्यास support@naikfoods.co.in वर संपर्क साधा.'
        : 'If you have any questions or concerns about this Privacy Policy, reach out to us at support@naikfoods.com.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFCF7]">
      <HeroBanner
        title={isMr ? 'गोपनीयता धोरण' : 'Privacy Policy'}
        subtitle={isMr ? 'तुमचा विश्वास आमच्यासाठी महत्त्वाचा आहे. आम्ही तुमची वैयक्तिक माहिती कशी सुरक्षित ठेवतो ते जाणून घ्या.' : 'Your trust matters to us. Learn how we collect, protect, and handle your personal information.'}
        breadcrumbs={[
          { label: isMr ? 'मुख्यपृष्ठ' : 'Home', href: '/' },
          { label: isMr ? 'गोपनीयता धोरण' : 'Privacy Policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        {privacySections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAEDE9] shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-lg sm:text-xl font-bold text-[#70BF4F] mb-2 font-serif">
              {section.title}
            </h2>
            <p className="text-[#585E61] text-sm sm:text-base leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
