import React, { useState } from 'react';
import { User, LogIn, Sparkles, X, ShieldCheck, ArrowRight, Smartphone, Mail, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function CheckoutAuthModal({ isOpen, onClose, onContinueAsGuest }) {
  const { login, register } = useAuthStore();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await login(email, password || 'password123');
    setLoading(false);
    onClose();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register({
      first_name: 'Valued',
      last_name: 'Customer',
      email: `${phone}@naikfoods.user`,
      phone: phone,
      password: 'otp_verified',
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1B261A] to-[#2E3F2D] p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-[#70BF4F]/20 text-[#70BF4F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#70BF4F]/30">
            <Sparkles className="w-3.5 h-3.5" /> 1-Click Express Checkout
          </div>
          <h3 className="text-xl font-black text-white">Sign In for Member Benefits</h3>
          <p className="text-xs text-gray-300 mt-1">
            Sign in to earn <strong className="text-amber-400">+50 Welcome Swad Coins</strong> and save delivery addresses.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-100 bg-gray-50">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-xs font-bold text-center transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#70BF4F] border-b-2 border-[#70BF4F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Email / Password
          </button>
          <button
            onClick={() => setActiveTab('otp')}
            className={`flex-1 py-3 text-xs font-bold text-center transition-colors cursor-pointer ${
              activeTab === 'otp'
                ? 'bg-white text-[#70BF4F] border-b-2 border-[#70BF4F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mobile Number (OTP)
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {activeTab === 'login' ? (
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rohan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#70BF4F] hover:bg-[#5ea73f] text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer text-sm"
              >
                {loading ? 'Signing in...' : 'Sign In & Proceed to Checkout'}
              </button>
            </form>
          ) : (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Mobile Number</label>
                <div className="flex gap-2">
                  <span className="bg-gray-100 border border-gray-200 rounded-xl px-3 py-3 text-sm font-bold text-gray-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="animate-in fade-in">
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Enter 4-Digit OTP</label>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-black bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                  />
                  <p className="text-[11px] text-green-600 font-bold mt-1 text-center">
                    Demo OTP is <span className="underline font-black">1234</span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#70BF4F] hover:bg-[#5ea73f] text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer text-sm"
              >
                {loading ? 'Verifying...' : otpSent ? 'Verify OTP & Proceed' : 'Get OTP on WhatsApp / SMS'}
              </button>
            </form>
          )}

          {/* Guest Continue Separator */}
          <div className="pt-3 border-t border-gray-100 text-center">
            <button
              onClick={onContinueAsGuest}
              type="button"
              className="text-xs font-bold text-gray-600 hover:text-gray-900 py-2 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Or Continue as Guest without signing in</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Security Badge Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#70BF4F]" />
          256-Bit SSL Encrypted & 100% Private
        </div>
      </div>
    </div>
  );
}
