import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ExternalLink, Bot, RotateCcw } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

const KNOWLEDGE_BASE = [
  {
    keywords: ['return', 'refund', 'damaged', 'exchange', 'broken', 'cancel', 'परतावा', 'पैसे', 'नुकसान'],
    answerEn:
      'Namaskar! As per our official Refund Policy, returns and replacements are accepted for damaged or defective items if reported within 7 days of delivery with parcel photos. Refunds are processed back to your original payment method within 5–7 working days.',
    answerMr:
      'नमस्कार बाळ! आमच्या अधिकृत परतावा धोरणानुसार, पार्सल खराब किंवा तुटलेले असल्यास डिलिव्हरीच्या ७ दिवसांच्या आत फोटोंसह नोंदवल्यास त्वरित बदलून किंवा पैसे परत दिले जातात. परतावा ५-७ कामकाजाच्या दिवसांत तुमच्या मूळ बँक खात्यात जमा होतो.',
  },
  {
    keywords: ['shipping', 'delivery', 'pincode', 'track', 'time', 'how long', 'days', 'cost', 'charge', 'डिलिव्हरी', 'पोहोच', 'वेळ', 'शुल्क'],
    answerEn:
      'We offer express delivery across Maharashtra and India! Orders above ₹499 qualify for FREE Shipping (flat ₹50 for orders below ₹499). Deliveries within Pune and Mumbai take 24–48 hours, and other states take 3–5 working days.',
    answerMr:
      'आम्ही संपूर्ण महाराष्ट्रभर आणि देशभरात जलद होम डिलिव्हरी देतो! ₹४९९ वरील सर्व ऑर्डरवर मोफत डिलिव्हरी आहे (त्याखाली ₹५०). पुणे व मुंबईत २४-४८ तासांत आणि इतर शहरांत ३-५ दिवसांत पार्सल पोहोचते.',
  },
  {
    keywords: ['hour', 'time', 'timing', 'open', 'close', 'store', 'shop', 'visit', 'address', 'location', 'दुकान', 'पत्ता', 'पुणे', 'वेळ'],
    answerEn:
      'Our authentic flagship store is located at Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth, Pune 411002. We are open from 9:00 AM to 10:00 PM daily. Our online AI support is available 24/7!',
    answerMr:
      'आमचे मुख्य दुकान सेवा मित्र मंडळ चौक, फडगेट पोलीस चौकी जवळ, शुक्रवार पेठ, पुणे ४११००२ येथे आहे. दुकान दररोज सकाळी ९ ते रात्री १० पर्यंत उघडे असते. आणि मी (आजी AI) तुमच्यासाठी २४ तास उपलब्ध आहे!',
  },
  {
    keywords: ['fssai', 'safety', 'hygiene', 'license', 'quality', 'fda', 'pure', 'गुणवत्ता', 'शुद्ध', 'परवाना'],
    answerEn:
      'Naik Foods operates under FSSAI Central/State License No. 11524999000123. All masalas are stone-ground and hand-pounded (खलबत्ता पद्धत) using 100% natural, preservative-free ingredients with zero artificial colors or palm oil.',
    answerMr:
      'नाईक फूड्स FSSAI परवाना क्र. 11524999000123 अंतर्गत चालवले जाते. सर्व मसाले पारंपारिक पद्धतीने खलबत्त्यात कुटलेले व जात्यावर दळलेले आहेत. यात कोणतेही कृत्रिम रंग, पाम तेल किंवा प्रिझर्व्हेटिव्ह वापरले जात नाहीत.',
  },
  {
    keywords: ['thalipith', 'bhajni', 'recipe', 'how to make', 'flour', 'थालीपीठ', 'भाजणी', 'कृती'],
    answerEn:
      'To prepare authentic Thalipith using our Bhajni: Mix the flour with finely chopped onions, green chillies, coriander, salt, and warm water. Pat it gently on a damp cloth or butter paper, roast on a tawa with pure ghee, and serve with fresh white butter (loni) and our Shengdana Chutney!',
    answerMr:
      'खमंग थालीपीठ करण्याची आजीची कृती: भाजणीच्या पिठात बारीक चिरलेला कांदा, हिरवी मिरची, कोथिंबीर, मीठ आणि कोमट पाणी घालून मळून घ्या. ओल्या सुती कापडावर थापून तव्यावर साजूक तुपात खमंग भाजा. गरमागरम थालीपीठ ताज्या लोण्यासोबत आणि नाईक फूड्सच्या शेंगदाणा चटणीसोबत सर्व्ह करा!',
  },
  {
    keywords: ['masala', 'goda', 'kanda lasun', 'saoji', 'spicy', 'thecha', 'मसाला', 'गोडा', 'कांदा लसूण', 'सावजी', 'ठेचा', 'तिखट'],
    answerEn:
      'Our specialty masalas include traditional Goda Masala (mild & aromatic), Kolhapuri Kanda Lasun Masala (medium-hot), and Vidarbha Saoji Masala (झणझणीत spicy). All recipes originate from heirloom family techniques established in 1935.',
    answerMr:
      'आमच्या खास मसाल्यांमध्ये पारंपरिक गोडा मसाला (सुवासिक व सौम्य), कोल्हापुरी कांदा लसूण मसाला (मध्यम तिखट), आणि विदर्भाचा अस्सल सावजी मसाला (झणझणीत तिखट) यांचा समावेश आहे. सर्व पाककृती १९३५ पासूनच्या जुन्या परंपरेनुसार तयार केल्या जातात.',
  },
  {
    keywords: ['payment', 'upi', 'cod', 'cash on delivery', 'gpay', 'phonepe', 'पेमेंट', 'पैसे देणे', 'कॅश'],
    answerEn:
      'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) for orders between ₹299 and ₹1,500.',
    answerMr:
      'आम्ही सर्व प्रमुख UPI (GPay, PhonePe, Paytm), क्रेडिट/डेबिट कार्ड, नेट बँकिंग आणि ₹२९९ ते ₹१,५०० च्या दरम्यानच्या ऑर्डरवर कॅश ऑन डिलिव्हरी (COD) स्वीकारतो.',
  },
];

const DEFAULT_CHIPS_EN = [
  '📦 Shipping Timelines & Rates',
  '🔄 Return & Refund Policy',
  '📍 Pune Store Location & Hours',
  '🌶️ Masala Spice Levels',
  '🛡️ FSSAI & Quality Standards',
];

const DEFAULT_CHIPS_MR = [
  '📦 डिलिव्हरी वेळ व दर',
  '🔄 परतावा व मनी-बॅक धोरण',
  '📍 पुणे दुकानाचा पत्ता व वेळ',
  '🌶️ मसाल्यांचे तिखट प्रमाण',
  '🛡️ FSSAI व शुद्धतेची हमी',
];

export default function AajiChatbot() {
  const { lang } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const greetingText = lang === 'mr'
      ? 'नमस्कार बाळ! मी तुझी आजी. अस्सल मराठमोळ्या पाककृती, मसाल्यांचे प्रमाण किंवा डिलिव्हरीबद्दल मला काहीही विचार!'
      : 'Namaskar! I am Aaji AI, your traditional culinary and policy guide for Naik Foods. How may I assist your shopping today?';
    
    setMessages([
      {
        sender: 'bot',
        text: greetingText,
        time: 'Just now',
      },
    ]);
  }, [lang]);

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
      let matchedItem = null;

      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
          matchedItem = item;
          break;
        }
      }

      const answerText = matchedItem
        ? (lang === 'mr' ? matchedItem.answerMr : matchedItem.answerEn)
        : (lang === 'mr'
          ? 'बाळ, मला अधिक अचूक उत्तर द्यायला आवडेल! विशेष ऑर्डर किंवा चौकशीसाठी तू आमच्या व्हॉट्सॲप सपोर्टवर (+९१ ९७३००४६२४७) थेट संपर्क साधू शकतोस.'
          : "I want to make sure you get the most accurate answer! For special custom orders or personal inquiries, you can instantly connect with our human customer support on WhatsApp at +91 9730046247.");

      const botReply = {
        sender: 'bot',
        text: answerText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 450);
  };

  const currentChips = lang === 'mr' ? DEFAULT_CHIPS_MR : DEFAULT_CHIPS_EN;

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
                  {lang === 'mr' ? 'आजी AI' : 'Aaji AI'} <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-white/90 font-medium">
                  {lang === 'mr' ? '२४/७ अधिकृत पाककृती व मदतनीस' : '24/7 Verified Policy & Recipe Guide'}
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
            {currentChips.map((chip, idx) => (
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
              placeholder={lang === 'mr' ? 'पाककृती, डिलिव्हरी किंवा धोरणांबद्दल विचारा...' : 'Ask about policies, shipping, recipes...'}
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
