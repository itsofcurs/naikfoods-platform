import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Account() {
  const { customer, isAuthenticated, login, register, logout, loading } = useAuthStore();
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  const [isRegister, setIsRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error(isMr ? 'कृपया सर्व माहिती भरा' : 'Please fill in all fields');
      return;
    }
    const res = await login(loginEmail, loginPassword);
    if (res.success) {
      toast.success(isMr ? `पुन्हा स्वागत आहे, ${res.customer?.first_name || 'ग्राहक'}!` : `Welcome back, ${res.customer?.first_name || 'Customer'}!`);
    } else {
      toast.error(res.error || (isMr ? 'ईमेल किंवा पासवर्ड चुकीचा आहे' : 'Invalid credentials'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !regEmail || !regPassword) {
      toast.error(isMr ? 'कृपया आवश्यक माहिती भरा' : 'Please fill in required fields');
      return;
    }
    const res = await register({
      first_name: firstName,
      last_name: lastName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
    });
    if (res.success) {
      toast.success(isMr ? 'खाते यशस्वीरित्या तयार झाले!' : 'Account created successfully!');
    } else {
      toast.error(res.error || (isMr ? 'खाते तयार करता आले नाही' : 'Failed to create account'));
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success(isMr ? 'यशस्वीरित्या बाहेर पडलात' : 'Signed out successfully');
  };

  // If not authenticated, render Login/Register UI
  if (!isAuthenticated || !customer) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 font-serif">
              {isRegister 
                ? (isMr ? 'नवीन सदस्य व्हा' : 'Become a Member') 
                : (isMr ? 'स्वागत आहे' : 'Welcome Back')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isRegister
                ? (isMr ? 'नाईक फूड्सचे सदस्य व्हा आणि सुलभ खरेदीचा आनंद घ्या.' : 'Create your Naik Foods member profile and enjoy smooth checkout.')
                : (isMr ? 'तुमच्या प्रोफाइलमध्ये प्रवेश करण्यासाठी आणि ऑर्डर तपासण्यासाठी साइन इन करा.' : 'Sign in to access your profile, track orders and saved addresses.')}
            </p>
          </div>

          {!isRegister ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  {isMr ? 'ईमेल' : 'Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F] focus:ring-1 focus:ring-[#70BF4F]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  {isMr ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F] focus:ring-1 focus:ring-[#70BF4F]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e293b] dark:bg-[#70BF4F] hover:bg-black dark:hover:bg-[#5ca040] text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-sm"
              >
                {loading 
                  ? (isMr ? 'साइन इन होत आहे...' : 'Signing in...') 
                  : (isMr ? 'साइन इन करा' : 'Sign In')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isMr ? 'खाते नाही का? ' : 'Not a member? '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-[#70BF4F] dark:text-[#86EFAC] font-bold hover:underline cursor-pointer"
                  >
                    {isMr ? 'नवीन खाते उघडा' : 'Join us'}
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    {isMr ? 'पहिले नाव' : 'First Name'}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder={isMr ? 'रोहन' : 'Rohan'}
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    {isMr ? 'आडनाव' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder={isMr ? 'जाधव' : 'Jadhav'}
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  {isMr ? 'ईमेल' : 'Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  {isMr ? 'मोबाईल नंबर' : 'Phone'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  {isMr ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-[#131E35] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {isMr ? (
                  <>खाते तयार करून आपण नाईक फूड्सच्या <Link to="/in/privacy-policy" className="underline text-[#70BF4F] dark:text-[#86EFAC]">गोपनीयता धोरण</Link> व <Link to="/in/terms" className="underline text-[#70BF4F] dark:text-[#86EFAC]">नियम व अटी</Link> मान्य करता.</>
                ) : (
                  <>By creating an account, you agree to Naik Foods' <Link to="/in/privacy-policy" className="underline text-[#70BF4F] dark:text-[#86EFAC]">Privacy Policy</Link> and <Link to="/in/terms" className="underline text-[#70BF4F] dark:text-[#86EFAC]">Terms of Use</Link>.</>
                )}
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e293b] dark:bg-[#70BF4F] hover:bg-black dark:hover:bg-[#5ca040] text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-sm"
              >
                {loading 
                  ? (isMr ? 'खाते तयार होत आहे...' : 'Creating account...') 
                  : (isMr ? 'खाते तयार करा' : 'Join Naik Foods')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isMr ? 'आधीच खाते आहे का? ' : 'Already a member? '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="text-[#70BF4F] dark:text-[#86EFAC] font-bold hover:underline cursor-pointer"
                  >
                    {isMr ? 'साइन इन करा' : 'Sign in'}
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Authenticated Member Dashboard
  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-full bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] font-black text-xl flex items-center justify-center border border-[#70BF4F]/30 shadow-inner">
                {customer.first_name?.[0] || 'C'}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white truncate">{customer.first_name} {customer.last_name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{customer.email}</p>
              </div>
            </div>

            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] border border-[#70BF4F]/40 shadow-[0_0_12px_rgba(112,191,79,0.15)]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#18263E]'
                }`}
              >
                <User className="w-4 h-4 text-[#70BF4F] dark:text-[#86EFAC]" />
                {isMr ? 'माहिती सारांश' : 'Overview'}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] border border-[#70BF4F]/40 shadow-[0_0_12px_rgba(112,191,79,0.15)]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#18263E]'
                }`}
              >
                <Package className="w-4 h-4 text-[#70BF4F] dark:text-[#86EFAC]" />
                {isMr ? 'माझ्या ऑर्डर्स' : 'Orders'}
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] border border-[#70BF4F]/40 shadow-[0_0_12px_rgba(112,191,79,0.15)]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#18263E]'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#70BF4F] dark:text-[#86EFAC]" />
                {isMr ? 'साठवलेले पत्ते' : 'Addresses'}
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                {isMr ? 'बाहेर पडा' : 'Log out'}
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {activeTab === 'overview' && (
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white font-serif tracking-tight">
                  {isMr ? `नमस्कार, ${customer.first_name}` : `Hello, ${customer.first_name}`}
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {isMr ? 'नाईक फूड्स ग्राहक डॅशबोर्डमध्ये आपले स्वागत आहे.' : 'Welcome to your Naik Foods member dashboard.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Details Card - Adaptive & Highlighted */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-gray-50 dark:from-[#132238] dark:via-[#101B2E] dark:to-[#0B1324] border border-emerald-200/90 dark:border-emerald-500/30 shadow-sm dark:shadow-[0_0_20px_rgba(112,191,79,0.08)] relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] flex items-center justify-center border border-[#70BF4F]/30 shadow-xs">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-lg font-serif">
                        {isMr ? 'प्रोफाइल तपशील' : 'Profile Details'}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-emerald-400/90 font-medium">
                        {isMr ? 'तुमची नोंदणीकृत माहिती' : 'Your verified contact details'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/90 dark:bg-[#18263E] border border-gray-200/80 dark:border-gray-700/80 p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{isMr ? 'नाव' : 'Name'}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{customer.first_name} {customer.last_name}</span>
                    </div>

                    <div className="bg-white/90 dark:bg-[#18263E] border border-gray-200/80 dark:border-gray-700/80 p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{isMr ? 'ईमेल' : 'Email'}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{customer.email}</span>
                    </div>

                    <div className="bg-white/90 dark:bg-[#18263E] border border-gray-200/80 dark:border-gray-700/80 p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{isMr ? 'फोन' : 'Phone'}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{customer.phone || (isMr ? 'नोंदवलेला नाही' : '+91 9876543210')}</span>
                    </div>
                  </div>
                </div>

                {/* Order Status Card - Adaptive & Highlighted */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-gray-50 dark:from-[#1E2235] dark:via-[#161B2E] dark:to-[#0B1324] border border-amber-200/90 dark:border-amber-500/30 shadow-sm dark:shadow-[0_0_20px_rgba(245,158,11,0.08)] relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 dark:bg-amber-500/25 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-xs">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-lg font-serif">
                          {isMr ? 'ऑर्डर स्थिती' : 'Order Status'}
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-amber-400/90 font-medium">
                          {isMr ? 'सक्रिय आणि मागील ऑर्डर्स' : 'Recent purchases & tracking'}
                        </p>
                      </div>
                    </div>

                    {customer.orders && customer.orders.length > 0 ? (
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-950/80 text-green-800 dark:text-[#86EFAC] border border-green-300 dark:border-green-700/80">
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-[#86EFAC]" />
                          {isMr 
                            ? `आपल्याकडे ${customer.orders.length} ऑर्डर नोंदी आहेत.` 
                            : `You have ${customer.orders.length} placed order(s).`}
                        </div>

                        <div className="bg-white/90 dark:bg-[#18263E] border border-gray-200/80 dark:border-gray-700/80 p-3.5 rounded-xl">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>{isMr ? 'नवीनतम ऑर्डर' : 'Latest Order'}</span>
                            <span className="font-bold text-green-700 dark:text-[#86EFAC] bg-green-50 dark:bg-green-950/50 px-2 py-0.5 rounded-md border border-green-200 dark:border-green-800">
                              {customer.orders[0].status || 'Confirmed'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900 dark:text-white text-sm">
                              #{customer.orders[0].orderId}
                            </span>
                            <span className="font-black text-gray-900 dark:text-white text-base">
                              ₹{customer.orders[0].total}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/90 dark:bg-[#18263E] border border-gray-200/80 dark:border-gray-700/80 p-4 rounded-xl text-center">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                          {isMr ? 'सध्या कोणतीही सक्रिय ऑर्डर नाही.' : 'You have 0 active orders.'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {isMr ? 'महाराष्ट्रीयन खाद्यपदार्थांची चव चाखा.' : 'Taste authentic Maharashtrian delicacies.'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-amber-100 dark:border-gray-800 flex items-center justify-between">
                    {customer.orders && customer.orders.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab('orders')}
                        className="w-full bg-[#70BF4F] hover:bg-[#5ca040] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isMr ? 'सर्व ऑर्डर्स पहा' : 'View All Orders'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link 
                        to="/in/store" 
                        className="w-full bg-[#70BF4F] hover:bg-[#5ca040] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-center"
                      >
                        {isMr ? 'खरेदी सुरू करा' : 'Start Shopping'}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white font-serif">
                    {isMr ? 'तुमच्या ऑर्डर्स' : 'Your Orders'}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {isMr ? 'सर्व मागील व चालू ऑर्डर्सचा तपशील' : 'Track and review all your past and live orders'}
                  </p>
                </div>
                {customer.orders && customer.orders.length > 0 && (
                  <span className="text-xs font-bold bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] px-3.5 py-1.5 rounded-full border border-[#70BF4F]/30 shadow-xs">
                    {customer.orders.length} {isMr ? 'ऑर्डर्स' : 'Orders'}
                  </span>
                )}
              </div>

              {customer.orders && customer.orders.length > 0 ? (
                <div className="space-y-6">
                  {customer.orders.map((order, idx) => (
                    <div
                      key={order.orderId || idx}
                      className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131E35] rounded-2xl p-5 hover:border-gray-300 dark:hover:border-emerald-500/40 transition-all shadow-sm dark:shadow-[0_0_15px_rgba(112,191,79,0.04)]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-700/80 mb-4 bg-gray-50/80 dark:bg-[#18263E] p-3.5 rounded-xl border border-gray-100 dark:border-gray-700/60">
                        <div>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider block">
                            {isMr ? 'ऑर्डर क्रमांक' : 'Order ID'}
                          </span>
                          <h4 className="font-black text-gray-900 dark:text-white text-sm sm:text-base font-mono">
                            #{order.orderId}
                          </h4>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider block">
                            {isMr ? 'दिनांक' : 'Date'}
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {order.date}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider block">
                            {isMr ? 'एकूण रक्कम' : 'Total Amount'}
                          </span>
                          <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
                            ₹{order.total} <span className="text-[11px] font-normal text-gray-500 dark:text-gray-400">({order.paymentMethod || 'PREPAID'})</span>
                          </p>
                        </div>

                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-950/80 text-green-800 dark:text-[#86EFAC] border border-green-300 dark:border-green-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-[#86EFAC]" />
                            {order.status || (isMr ? 'निश्चित झाली' : 'Confirmed')}
                          </span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3 mb-4">
                        {order.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-3.5 p-2 rounded-xl bg-gray-50/50 dark:bg-[#18263E]/60 border border-gray-100 dark:border-gray-800">
                            <div className="w-14 h-14 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl p-1 flex-shrink-0 overflow-hidden shadow-xs">
                              {item.product?.thumbnail ? (
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                  <Package className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                {item.product?.title || 'Delicacy'}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                {isMr ? 'प्रमाण:' : 'Qty:'} <span className="font-bold text-gray-900 dark:text-white">{item.quantity}</span> × ₹{item.variant?.prices?.[0]?.amount ? (item.variant.prices[0].amount / 100) : 120}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address footer */}
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-700/80 text-xs text-gray-600 dark:text-gray-300 flex flex-wrap items-center justify-between gap-2 bg-gray-50/60 dark:bg-[#18263E]/40 p-3 rounded-xl">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#70BF4F] dark:text-[#86EFAC] flex-shrink-0" />
                          <span className="line-clamp-1"><strong className="text-gray-900 dark:text-white font-bold">{isMr ? 'डिलिव्हरी पत्ता:' : 'Delivered to:'}</strong> {order.address}</span>
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                          {isMr ? '⚡ अंदाजे वेळ: २४ - ४८ तास' : '⚡ Express Delivery: 24 - 48 hrs'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-[#131E35]/40">
                  <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-900 dark:text-white font-bold mb-1 text-base">
                    {isMr ? 'अजून कोणतीही ऑर्डर दिलेली नाही' : 'No orders yet'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    {isMr ? 'तुम्ही ऑर्डर दिल्यावर ती येथे दिसेल.' : 'When you place an order, it will appear here.'}
                  </p>
                  <Link to="/in/store" className="bg-[#70BF4F] hover:bg-[#5ca040] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2 shadow-sm">
                    {isMr ? 'उत्पादने पहा' : 'Explore Products'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white font-serif">
                    {isMr ? 'साठवलेले डिलिव्हरी पत्ते' : 'Saved Delivery Addresses'}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {isMr ? 'जलद चेकआउटसाठी सेव्ह केलेले पत्ते' : 'Saved addresses for quick 1-click checkout'}
                  </p>
                </div>
                {customer.addresses && customer.addresses.length > 0 && (
                  <span className="text-xs font-bold bg-[#70BF4F]/15 dark:bg-[#70BF4F]/25 text-[#70BF4F] dark:text-[#86EFAC] px-3.5 py-1.5 rounded-full border border-[#70BF4F]/30 shadow-xs">
                    {customer.addresses.length} {isMr ? 'पत्ते' : 'Addresses'}
                  </span>
                )}
              </div>

              {customer.addresses && customer.addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customer.addresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#131E35] rounded-2xl p-5 hover:border-emerald-500/40 transition-all shadow-sm relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-[#86EFAC] text-xs font-bold px-3 py-0.5 rounded-full uppercase border border-emerald-300 dark:border-emerald-800">
                          {addr.tag || 'Home'}
                        </span>
                        <MapPin className="w-4.5 h-4.5 text-[#70BF4F] dark:text-[#86EFAC]" />
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
                        {addr.recipient || `${customer.first_name} ${customer.last_name}`}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                        {addr.address}
                      </p>
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
                        {addr.pincode && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center justify-between">
                            <span>{isMr ? 'पिनकोड:' : 'Pincode:'}</span>
                            <span className="font-bold text-gray-900 dark:text-white">{addr.pincode}</span>
                          </p>
                        )}
                        {addr.phone && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center justify-between">
                            <span>{isMr ? 'फोन:' : 'Phone:'}</span>
                            <span className="font-bold text-gray-900 dark:text-white">{addr.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-[#131E35]/40">
                  <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-900 dark:text-white font-bold mb-1 text-base">
                    {isMr ? 'कोणताही पत्ता साठवलेला नाही' : 'No saved addresses'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isMr ? 'चेकआउट दरम्यान वापरलेले तुमचे पत्ते येथे आपोआप साठवले जातील.' : 'Your delivery addresses used at checkout will be saved here.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
