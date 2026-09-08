import { useLanguageStore } from '../store/languageStore';

export default function RefundPolicy() {
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
        {isMr ? 'परतावा व रिफंड धोरण' : 'Refund & Return Policy'}
      </h1>
      <p className="text-xs text-gray-400 mb-8">
        {isMr ? 'शेवटचे अद्यतन: सप्टेंबर २०२६' : 'Last Updated: September 2026'}
      </p>

      <div className="prose prose-sm text-gray-700 space-y-6 leading-relaxed bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {isMr ? '१. नाशवंत अन्नपदार्थ धोरण' : '1. Perishable Goods Policy'}
          </h2>
          <p>
            {isMr
              ? 'आम्ही रासायनिक संरक्षकांशिवाय तयार केलेले अस्सल आणि पारंपरिक खाद्यपदार्थ पुरवतो. अन्न सुरक्षा आणि स्वच्छतेच्या कारणास्तव, सीलबंद पॅकेट उघडल्यानंतर परतावा स्वीकारला जात नाही.'
              : 'Because we sell consumable, traditional food products prepared without chemical preservatives, we cannot accept returns once the food packaging has been opened.'}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {isMr ? '२. नुकसानग्रस्त किंवा चुकीचे उत्पादन' : '2. Damaged or Incorrect Items'}
          </h2>
          <p>
            {isMr ? (
              <>
                वाहतुकीदरम्यान पार्सलचे नुकसान झाल्यास किंवा चुकीचे उत्पादन प्राप्त झाल्यास, कृपया डिलिव्हरीच्या <strong>४८ तासांच्या आत</strong> स्पष्ट फोटोसह आम्हाला <strong>support@naikfoods.co.in</strong> किंवा व्हॉट्सॲप <strong>+91 97300 46247</strong> वर कळवा.
              </>
            ) : (
              <>
                If you receive a package that was damaged in transit or received the wrong product variant, please notify us within <strong>48 hours</strong> of delivery with clear photographs at <strong>support@naikfoods.co.in</strong> or WhatsApp us at <strong>+91 97300 46247</strong>.
              </>
            )}
          </p>
          <p className="mt-2">
            {isMr
              ? 'तपासणीनंतर आम्ही त्वरित नवीन पार्सल पाठवू किंवा आपल्या मूळ पेमेंट खात्यात १००% पूर्ण रिफंड जारी करू.'
              : 'Upon verification, we will immediately initiate a replacement dispatch or issue a 100% full refund back to your original payment method.'}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {isMr ? '३. रिफंड जमा होण्याचा कालावधी' : '3. Refund Processing Time'}
          </h2>
          <p>
            {isMr
              ? 'मंजूर केलेला रिफंड बँकिंग नियमांनुसार ५ ते ७ कामकाजाच्या दिवसांत आपल्या खात्यात जमा होतो.'
              : 'Approved refunds are credited to the original payment source within 5 to 7 business days as per banking standards.'}
          </p>
        </section>
      </div>
    </div>
  );
}
