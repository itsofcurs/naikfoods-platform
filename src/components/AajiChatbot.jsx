import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ExternalLink, Bot, RotateCcw } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    keywords: ['return', 'refund', 'damaged', 'exchange', 'broken', 'cancel'],
    answer:
      'Namaskar! As per our official Refund Policy, returns and replacements are accepted for damaged or defective items if reported within 7 days of delivery with parcel photos. Refunds are processed back to your original payment method within 5–7 working days.',
  },
  {
    keywords: ['shipping', 'delivery', 'pincode', 'track', 'time', 'how long', 'days', 'cost', 'charge'],
    answer:
      'We offer express delivery across Maharashtra and India! Orders above ₹499 qualify for FREE Shipping (flat ₹50 for orders below ₹499). Deliveries within Pune and Mumbai take 24–48 hours, and other states take 3–5 working days.',
  },
  {
    keywords: ['hour', 'time', 'timing', 'open', 'close', 'store', 'shop', 'visit', 'address', 'location'],
    answer:
      'Our authentic flagship store is located at Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth, Pune 411002. We are open from 9:00 AM to 10:00 PM daily. Our online AI support is available 24/7!',
  },
  {
    keywords: ['fssai', 'safety', 'hygiene', 'license', 'quality', 'fda', 'pure'],
    answer:
      'Naik Foods operates under FSSAI Central/State License No. 11524999000123. All masalas are stone-ground and hand-pounded (खलबत्ता पद्धत) using 100% natural, preservative-free ingredients with zero artificial colors or palm oil.',
  },
  {
    keywords: ['thalipith', 'bhajni', 'recipe', 'how to make', 'flour'],
    answer:
      'To prepare authentic Thalipith using our Bhajni: Mix the flour with finely chopped onions, green chillies, coriander, salt, and warm water. Pat it gently on a damp cloth or butter paper, roast on a tawa with pure ghee, and serve with fresh white butter (loni) and our Shengdana Chutney!',
  },
  {
    keywords: ['masala', 'goda', 'kanda lasun', 'saoji', 'spicy', 'thecha'],
    answer:
      'Our specialty masalas include traditional Goda Masala (mild & aromatic), Kolhapuri Kanda Lasun Masala (medium-hot), and Vidarbha Saoji Masala (झणझणीत spicy). All recipes originate from heirloom family techniques established in 1938.',
  },
  {
    keywords: ['payment', 'upi', 'cod', 'cash on delivery', 'gpay', 'phonepe'],
    answer:
      'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) for orders between ₹299 and ₹1,500.',
  },
];

const DEFAULT_CHIPS = [
  '📦 Shipping Timelines & Rates',
  '🔄 Return & Refund Policy',
  '📍 Pune Store Location & Hours',
  '🌶️ Masala Spice Levels',
  '🛡️ FSSAI & Quality Standards',
];

export default function AajiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaskar! I am Aaji AI, your traditional culinary and policy guide for Naik Foods. How may I assist your shopping today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (userQuery) => {
    const text = (userQuery || input).trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Deterministic low-temperature query matching
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedAnswer = null;

      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      const botReply = {
        sender: 'bot',
        text:
          matchedAnswer ||
          "I want to make sure you get the most accurate answer! For special custom orders or personal inquiries, you can instantly connect with our human customer support on WhatsApp at +91 9730046247.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Toggle Button (Positioned at bottom-left to complement right WhatsApp button) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-[#70BF4F] to-[#5ca040] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer border border-white/40"
          title="Chat with Aaji AI"
        >
          <div className="w-8 h-8 rounded-full bg-white text-[#70BF4F] flex items-center justify-center font-bold text-sm shadow-inner">
            👵
          </div>
          <span className="hidden sm:inline font-bold text-sm tracking-wide">
            Aaji AI Assistant
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Expandable Chat Drawer / Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[580px] h-[520px] transition-all animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#70BF4F] to-[#5ca040] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-2xl flex items-center justify-center shadow">
                👵
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5 font-serif">
                  Aaji AI <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-white/90 font-medium">
                  24/7 Verified Policy & Recipe Guide
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFCF7]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#70BF4F] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl w-20 border border-gray-100 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#70BF4F] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#70BF4F] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#70BF4F] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {DEFAULT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-[#70BF4F] text-[11px] font-bold px-2.5 py-1 rounded-full border border-gray-200 transition-colors shrink-0 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input & WhatsApp Action */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about policies, shipping, recipes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#70BF4F]"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="bg-[#70BF4F] hover:bg-[#5ca040] text-white p-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Direct WhatsApp Transfer Footer */}
          <div className="bg-gray-50 px-4 py-2 text-center text-[11px] text-gray-500 border-t border-gray-100 flex items-center justify-between">
            <span>Need human assistance?</span>
            <a
              href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20question%20for%20Naik%20Foods%20team."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#70BF4F] font-bold flex items-center gap-1 hover:underline"
            >
              WhatsApp Support <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
