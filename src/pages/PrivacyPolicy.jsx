import HeroBanner from '../components/HeroBanner';

const privacySections = [
  {
    title: '1. Introduction',
    content:
      'Naik Foods is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our website or services.',
  },
  {
    title: '2. Information We Collect',
    content:
      'We may collect information such as your name, contact details, delivery address, payment information, and browsing behavior when you visit our site or place an order.',
  },
  {
    title: '3. How We Use Your Information',
    content:
      'We use your data to process orders, improve user experience, communicate updates, and for internal analytics. We never sell your data to third parties.',
  },
  {
    title: '4. Data Sharing and Disclosure',
    content:
      'We may share your data with trusted third-party service providers such as payment gateways and courier services. These partners are obligated to keep your information secure.',
  },
  {
    title: '5. Cookies and Tracking',
    content:
      'Our website uses cookies to enhance user experience, analyze website traffic, and personalize content. You can control cookie preferences in your browser settings.',
  },
  {
    title: '6. Data Security',
    content:
      'We implement industry-standard security practices to safeguard your personal data from unauthorized access, disclosure, alteration, or destruction.',
  },
  {
    title: '7. User Rights',
    content:
      'You have the right to access, update, or delete your personal information at any time. Contact us at support@naikfoods.com to request data changes.',
  },
  {
    title: '8. Children\'s Privacy',
    content:
      'Our services are not intended for children under 13. We do not knowingly collect personal information from children.',
  },
  {
    title: '9. Changes to Privacy Policy',
    content:
      'We reserve the right to update this Privacy Policy at any time. Changes will be reflected on this page, and continued use implies acceptance of the updated policy.',
  },
  {
    title: '10. Contact Information',
    content:
      'If you have any questions or concerns about this Privacy Policy, reach out to us at support@naikfoods.com.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-[#FDFCF7]">
      <HeroBanner
        title="Privacy Policy"
        subtitle="Your trust matters to us. Learn how we collect, protect, and handle your personal information."
        breadcrumbs={[
          { label: 'Home', href: '/in' },
          { label: 'Privacy Policy' },
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
