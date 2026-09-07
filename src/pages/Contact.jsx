import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in the required fields');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Thank you! Your message has been received. Our team will get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[#70BF4F] font-bold text-xs uppercase tracking-wider block mb-1">
          Get in Touch
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          We’d Love to Hear From You
        </h1>
        <p className="text-gray-600 text-sm">
          Have questions about your order, our traditional recipes, or bulk/festive gifting? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Details Card */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
              Contact Information
            </h2>

            <div className="space-y-5 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#70BF4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">Headquarters</strong>
                  <span>Naik Foods, Pune, Maharashtra, India - 411001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#70BF4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">Phone & WhatsApp</strong>
                  <span>+91 97300 46247</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#70BF4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">Email</strong>
                  <span>support@naikfoods.co.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#70BF4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">Operating Hours</strong>
                  <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <a
              href="https://wa.me/919730046247"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Priya Deshmukh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Order Inquiry / Feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Your Message *
              </label>
              <textarea
                rows={5}
                required
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#70BF4F] hover:bg-[#5ca040] text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              {submitting ? 'Sending...' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Store Location (Exact iframe embed from Naik Foods) */}
      <section className="mt-12 max-w-6xl mx-auto">
        <div className="w-full h-[320px] md:h-[480px] rounded-[24px] md:rounded-[36px] overflow-hidden shadow-xl border-8 border-white bg-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.450232631114!2d73.85729959999999!3d18.5085455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1d2a1bab18f%3A0x612261ab2b10c199!2sNAIK%20FOODS!5e0!3m2!1sen!2sin!4v1776522670402!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Naik Foods location map"
          />
        </div>
      </section>
    </div>
  );
}
