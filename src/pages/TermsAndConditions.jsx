import HeroBanner from '../components/HeroBanner';

const termsSections = [
  {
    title: '1. Introduction',
    content:
      'Welcome to Naik Foods! These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms.',
  },
  {
    title: '2. Product Information',
    content:
      'We strive to ensure that all product descriptions, prices, and availability are accurate. However, Naik Foods reserves the right to modify this information at any time without notice.',
  },
  {
    title: '3. Orders and Payments',
    content:
      'All orders are subject to acceptance and availability. Payments must be made through our secure payment gateways. We reserve the right to cancel any order at our discretion.',
  },
  {
    title: '4. Shipping and Delivery',
    content:
      'Delivery times may vary depending on your location and availability of products. We aim to dispatch all orders promptly and will inform you of any delays.',
  },
  {
    title: '5. Returns and Refunds',
    content:
      'Returns are accepted only for damaged or defective products. Refunds will be processed after inspection and may take up to 7 working days.',
  },
  {
    title: '6. User Conduct',
    content:
      'Users are expected to use our platform ethically and refrain from any activity that may harm the website or its users.',
  },
  {
    title: '7. Intellectual Property',
    content:
      'All content, branding, and materials on Naik Foods are protected by copyright laws. You may not reproduce or distribute any part of this content without written permission.',
  },
  {
    title: '8. Privacy Policy',
    content:
      'Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect and use your data.',
  },
  {
    title: '9. Changes to Terms',
    content:
      'Naik Foods reserves the right to change or modify these Terms and Conditions at any time. Continued use of the site implies acceptance of these changes.',
  },
  {
    title: '10. Contact Us',
    content:
      'For any queries or concerns regarding our terms, please contact us at support@naikfoods.com.',
  },
];

export default function TermsAndConditions() {
  return (
    <div className="w-full min-h-screen bg-[#FDFCF7]">
      <HeroBanner
        title="Terms & Conditions"
        subtitle="Everything you need to know about shopping with us — simple, transparent, and fair terms."
        breadcrumbs={[
          { label: 'Home', href: '/in' },
          { label: 'Terms & Conditions' },
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
