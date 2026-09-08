import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ExternalLink, Bot, RotateCcw, ArrowRight, ShieldCheck, Key, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { processAajiQuery } from '../services/aajiRagEngine';
import toast from 'react-hot-toast';

const DEFAULT_CHIPS_EN = [
  '🛍️ How to check available products?',
  '🎁 Build Festive Hamper (15% Off)',
  '🪙 How do Swad Coins work?',
  '📦 Shipping Timelines & Rates',
  '🔄 Return & Refund Policy',
  '📍 Pune Store Location & Hours',
  '🍲 Aaji’s Thalipith Recipe'
];

const DEFAULT_CHIPS_MR = [
  '🛍️ उपलब्ध पदार्थ कसे पाहावे?',
  '🎁 भेट बॉक्स कसा बनवावा? (१५% सूट)',
  '🪙 स्वाद नाणी कशी वापरावी?',
  '📦 डिलिव्हरी वेळ व मोफत दर',
  '🔄 परतावा व रिफंड धोरण',
  '📍 पुणे दुकानाचा पत्ता व वेळ',
  '🍲 खमंग थालीपीठाची आजीची कृती'
];

export default function AajiChatbot() {
  const { lang } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const chatEndRef = useRef(null);
  const chatDrawerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && chatDrawerRef.current && !chatDrawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const greetingText = lang === 'mr'
      ? 'नमस्कार बाळ! मी तुझी आजी. अस्सल मराठमोळ्या पाककृती, उपलब्ध उत्पादने, सण-उत्सव भेट बॉक्सेस किंवा डिलिव्हरीबद्दल मला काहीही विचार! 👵✨'
      : 'Namaskar dear child! I am Aaji AI, your traditional culinary guide and customer assistant for Naik Foods. Ask me anything about our available snacks, pickles, hampers, or delivery! 👵✨';
    
    setMessages([
      {
        sender: 'bot',
        text: greetingText,
        time: 'Just now',
        action: { labelEn: 'Browse Store', labelMr: 'दुकान पहा', link: '/in/store' }
      },
    ]);
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  const handleSend = async (userQuery) => {
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
    setIsThinking(true);
    setThinkingStep(lang === 'mr' ? 'आजी विचार करत आहे व माहिती शोधत आहे... 🧠💭' : 'Aaji is thinking & searching recipe documents... 🧠💭');

    // Dynamic Thinking Pipeline + RAG / LLM execution
    try {
      const queryResult = await processAajiQuery(text, lang);

      const botReply = {
        sender: 'bot',
        text: queryResult.text,
        action: queryResult.action || null,
        isLLM: queryResult.isLLM || false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Aaji AI processing error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: lang === 'mr' 
            ? 'बाळ, मला समजण्यात थोडी अडचण आली. कृपया पुन्हा विचारून पहा किंवा व्हॉट्सॲपवर संपर्क करा.'
            : 'Dear child, I encountered a brief glitch. Please try asking again or contact our family on WhatsApp.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsThinking(false);
      setThinkingStep('');
    }
  };

  const currentChips = lang === 'mr' ? DEFAULT_CHIPS_MR : DEFAULT_CHIPS_EN;

  return (
    <>
      {/* Floating Toggle Button */}
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
            {lang === 'mr' ? 'आजी AI सहाय्यक' : 'Aaji AI Assistant'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Expandable Chat Drawer */}
      {isOpen && (
        <div 
          ref={chatDrawerRef}
          className="fixed bottom-6 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[620px] h-[560px] transition-all animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#70BF4F] to-[#5ca040] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-2xl flex items-center justify-center shadow">
                👵
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5 font-serif">
                  {lang === 'mr' ? 'आजी AI (बुद्धिमत्ता व RAG)' : 'Aaji AI (RAG + LLM)'} <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[10px] text-white/90 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-200 inline" />
                  {lang === 'mr' ? '२४/७ ५-स्तरीय सुरक्षित व अधिकृत मार्गदर्शक' : '24/7 Culinary Guide & Assistant'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Aaji AI"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
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
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#70BF4F] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm'
                  }`}
                >
                  {msg.text}

                  {/* Interactive Action Chip */}
                  {msg.action && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100/80">
                      <Link
                        to={msg.action.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 bg-[#70BF4F]/10 hover:bg-[#70BF4F] text-[#70BF4F] hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 group cursor-pointer"
                      >
                        <span>{lang === 'mr' ? msg.action.labelMr : msg.action.labelEn}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Thinking / Cognitive State */}
            {isThinking && (
              <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200/60 p-3 rounded-2xl text-amber-900 text-xs font-semibold max-w-[85%] shadow-xs animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                <span>{thinkingStep}</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto hide-scrollbar">
            {currentChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.replace(/^[^\s]+\s/, ''))}
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
              placeholder={lang === 'mr' ? 'उपलब्ध पदार्थ, पाककृती, डिलिव्हरी किंवा धोरणांबद्दल विचारा...' : 'Ask about available products, policies, recipes...'}
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
            <span>{lang === 'mr' ? 'थेट प्रतिनिधीशी बोलायचे आहे?' : 'Need human assistance?'}</span>
            <a
              href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20question%20for%20Naik%20Foods%20team."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#70BF4F] font-bold flex items-center gap-1 hover:underline"
            >
              {lang === 'mr' ? 'व्हॉट्सॲप सपोर्ट' : 'WhatsApp Support'} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
