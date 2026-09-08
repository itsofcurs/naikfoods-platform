import HeroBanner from '../components/HeroBanner';
import { useLanguageStore } from '../store/languageStore';

export default function TermsAndConditions() {
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  const termsSections = [
    {
      title: isMr ? '१. प्रस्तावना' : '1. Introduction',
      content: isMr
        ? 'नाईक फूड्समध्ये आपले स्वागत आहे! हे नियम व अटी आमच्या संकेतस्थळाच्या आणि सेवांच्या वापराचे नियमन करतात. आमच्या प्लॅटफॉर्मचा वापर करून आपण या अटींचे पालन करण्याचे मान्य करता.'
        : 'Welcome to Naik Foods! These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms.',
    },
    {
      title: isMr ? '२. उत्पादन माहिती' : '2. Product Information',
      content: isMr
        ? 'आम्ही सर्व उत्पादनांचे वर्णन, किमती आणि उपलब्धता अचूक ठेवण्याचा प्रामाणिक प्रयत्न करतो. तथापि, कोणत्याही पूर्वसूचनेशिवाय ही माहिती बदलण्याचा अधिकार नाईक फूड्सकडे राखीव आहे.'
        : 'We strive to ensure that all product descriptions, prices, and availability are accurate. However, Naik Foods reserves the right to modify this information at any time without notice.',
    },
    {
      title: isMr ? '३. ऑर्डर्स आणि पेमेंट्स' : '3. Orders and Payments',
      content: isMr
        ? 'सर्व ऑर्डर्स मालाच्या उपलब्धतेवर अवलंबून असतात. पेमेंट्स आमच्या सुरक्षित पेमेंट गेटवे किंवा अधिकृत COD द्वारे केली जाणे आवश्यक आहे.'
        : 'All orders are subject to acceptance and availability. Payments must be made through our secure payment gateways. We reserve the right to cancel any order at our discretion.',
    },
    {
      title: isMr ? '४. शिपिंग आणि डिलिव्हरी' : '4. Shipping and Delivery',
      content: isMr
        ? 'डिलिव्हरीचा कालावधी आपल्या स्थानावर आधारित असतो. आम्ही २४ ते ४८ तासांत ताज्या बॅचेस पाठवण्याचे उद्दिष्ट ठेवतो.'
        : 'Delivery times may vary depending on your location and availability of products. We aim to dispatch all orders promptly and will inform you of any delays.',
    },
    {
      title: isMr ? '५. परतावा आणि रिफंड' : '5. Returns and Refunds',
      content: isMr
        ? 'अन्नपदार्थ नाशवंत असल्यामुळे केवळ वाहतुकीदरम्यान नुकसान झालेल्या किंवा चुकीच्या उत्पादनांसाठीच परतावा स्वीकारला जातो. तपासणीनंतर ५-७ कामकाजाच्या दिवसांत रिफंड जमा होतो.'
        : 'Returns are accepted only for damaged or defective products. Refunds will be processed after inspection and may take up to 7 working days.',
    },
    {
      title: isMr ? '६. बौद्धिक संपदा अधिकार' : '6. Intellectual Property',
      content: isMr
        ? 'नाईक फूड्सवरील सर्व सामग्री, लोगो, डिझाइन आणि ट्रेडमार्क हे प्रताधिकार कायद्याद्वारे संरक्षित आहेत. लेखी परवानगीशिवाय कोणतीही सामग्री वापरण्यास मनाई आहे.'
        : 'All content, branding, and materials on Naik Foods are protected by copyright laws. You may not reproduce or distribute any part of this content without written permission.',
    },
    {
      title: isMr ? '७. गोपनीयता धोरण' : '7. Privacy Policy',
      content: isMr
        ? 'आपली वैयक्तिक माहिती आमच्याकडे पूर्णपणे सुरक्षित आहे. आम्ही ती कोणत्याही तृतीय पक्षाला विकत नाही.'
        : 'Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect and use your data.',
    },
    {
      title: isMr ? '८. संपर्क' : '8. Contact Us',
      content: isMr
        ? 'काही शंका किंवा अधिक माहितीसाठी कृपया support@naikfoods.co.in वर संपर्क साधा.'
        : 'For any queries or concerns regarding our terms, please contact us at support@naikfoods.com.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFCF7]">
      <HeroBanner
        title={isMr ? 'नियम व अटी' : 'Terms & Conditions'}
        subtitle={isMr ? 'आमच्यासोबत खरेदी करताना जाणून घेण्यासारखे सर्व पारदर्शक आणि सोपे नियम.' : 'Everything you need to know about shopping with us — simple, transparent, and fair terms.'}
        breadcrumbs={[
          { label: isMr ? 'मुख्यपृष्ठ' : 'Home', href: '/' },
          { label: isMr ? 'नियम व अटी' : 'Terms & Conditions' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        {termsSections.map((section, idx) => (
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
