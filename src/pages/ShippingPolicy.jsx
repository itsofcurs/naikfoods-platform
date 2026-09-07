export default function ShippingPolicy() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Shipping & Delivery Policy</h1>
      <p className="text-xs text-gray-400 mb-8">Last Updated: September 2026</p>

      <div className="prose prose-sm text-gray-700 space-y-6 leading-relaxed bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Delivery Timeline</h2>
          <p>
            Orders are freshly packed and dispatched from our Pune facility within 24 to 48 hours of confirmation.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Pune & Mumbai Metro:</strong> 1 – 2 business days.</li>
            <li><strong>Rest of Maharashtra:</strong> 2 – 4 business days.</li>
            <li><strong>Other States in India:</strong> 4 – 7 business days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Shipping Charges</h2>
          <p>
            We offer <strong>Free Standard Delivery</strong> on all orders above ₹499 across Maharashtra. For orders below this threshold, a flat delivery fee of ₹50 applies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Order Tracking</h2>
          <p>
            Once your package is dispatched, you will receive an SMS and Email notification with your AWB tracking link to track your order live.
          </p>
        </section>
      </div>
    </div>
  );
}
