export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Refund & Return Policy</h1>
      <p className="text-xs text-gray-400 mb-8">Last Updated: September 2026</p>

      <div className="prose prose-sm text-gray-700 space-y-6 leading-relaxed bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Perishable Goods Policy</h2>
          <p>
            Because we sell consumable, traditional food products prepared without chemical preservatives, we cannot accept returns once the food packaging has been opened.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Damaged or Incorrect Items</h2>
          <p>
            If you receive a package that was damaged in transit or received the wrong product variant, please notify us within <strong>48 hours</strong> of delivery with clear photographs at <strong>support@naikfoods.co.in</strong> or WhatsApp us at <strong>+91 97300 46247</strong>.
          </p>
          <p className="mt-2">
            Upon verification, we will immediately initiate a replacement dispatch or issue a 100% full refund back to your original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Refund Processing Time</h2>
          <p>
            Approved refunds are credited to the original payment source within 5 to 7 business days as per banking standards.
          </p>
        </section>
      </div>
    </div>
  );
}
