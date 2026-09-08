import { useLanguageStore } from '../store/languageStore';

export default function ShippingPolicy() {
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
        {isMr ? 'डिलिव्हरी व शिपिंग धोरण' : 'Shipping & Delivery Policy'}
      </h1>
      <p className="text-xs text-gray-400 mb-8">
        {isMr ? 'शेवटचे अद्यतन: सप्टेंबर २०२६' : 'Last Updated: September 2026'}
      </p>

      <div className="prose prose-sm text-gray-700 space-y-6 leading-relaxed bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {isMr ? '१. डिलिव्हरी वेळापत्रक' : '1. Delivery Timeline'}
          </h2>
          <p>
            {isMr 
              ? 'ऑर्डरची पुष्टी झाल्यानंतर २४ ते ४८ तासांच्या आत आमच्या पुणे केंद्रातून ताजे पदार्थ पॅक करून पाठवले जातात.'
              : 'Orders are freshly packed and dispatched from our Pune facility within 24 to 48 hours of confirmation.'}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>{isMr ? 'पुणे व मुंबई मेट्रो:' : 'Pune & Mumbai Metro:'}</strong> {isMr ? '१ ते २ कामकाजाचे दिवस.' : '1 – 2 business days.'}
            </li>
            <li>
              <strong>{isMr ? 'उर्वरित महाराष्ट्र:' : 'Rest of Maharashtra:'}</strong> {isMr ? '२ ते ४ कामकाजाचे दिवस.' : '2 – 4 business days.'}
            </li>
            <li>
              <strong>{isMr ? 'भारतातील इतर राज्ये:' : 'Other States in India:'}</strong> {isMr ? '४ ते ७ कामकाजाचे दिवस.' : '4 – 7 business days.'}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {isMr ? '२. डिलिव्हरी शुल्क' : '2. Shipping Charges'}
          </h2>
          <p>
            {isMr 
              ? <>आम्ही संपूर्ण महाराष्ट्रात ₹४९९ वरील सर्व ऑर्डरवर <strong>मोफत होम डिलिव्हरी</strong> देतो. यापेक्षा कमी किमतीच्या ऑर्डरवर ₹५० डिलिव्हरी शुल्क लागू होते.</>
              : <>We offer <strong>Free Standard Delivery</strong> on all orders above ₹499 across Maharashtra. For orders below this threshold, a flat delivery fee of ₹50 applies.</>}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {isMr ? '३. पार्सल ट्रॅकिंग' : '3. Order Tracking'}
          </h2>
          <p>
            {isMr
              ? 'पार्सल रवाना झाल्यावर आपल्याला एसएमएस आणि ईमेलद्वारे लाइव्ह ट्रॅकिंग लिंक पाठवली जाते.'
              : 'Once your package is dispatched, you will receive an SMS and Email notification with your AWB tracking link to track your order live.'}
          </p>
        </section>
      </div>
    </div>
  );
}
