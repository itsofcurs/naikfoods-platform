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
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isRegister 
                ? (isMr ? 'नवीन सदस्य व्हा' : 'Become a Member') 
                : (isMr ? 'स्वागत आहे' : 'Welcome Back')}
            </h1>
            <p className="text-sm text-gray-600">
              {isRegister
                ? (isMr ? 'नाईक फूड्सचे सदस्य व्हा आणि सुलभ खरेदीचा आनंद घ्या.' : 'Create your Naik Foods member profile and enjoy smooth checkout.')
                : (isMr ? 'तुमच्या प्रोफाइलमध्ये प्रवेश करण्यासाठी आणि ऑर्डर तपासण्यासाठी साइन इन करा.' : 'Sign in to access your profile, track orders and saved addresses.')}
            </p>
          </div>

          {!isRegister ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {isMr ? 'ईमेल' : 'Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F] focus:ring-1 focus:ring-[#70BF4F]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {isMr ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F] focus:ring-1 focus:ring-[#70BF4F]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e293b] hover:bg-black text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer"
              >
                {loading 
                  ? (isMr ? 'साइन इन होत आहे...' : 'Signing in...') 
                  : (isMr ? 'साइन इन करा' : 'Sign In')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  {isMr ? 'खाते नाही का? ' : 'Not a member? '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-[#70BF4F] font-semibold hover:underline cursor-pointer"
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
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    {isMr ? 'पहिले नाव' : 'First Name'}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder={isMr ? 'रोहन' : 'Rohan'}
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    {isMr ? 'आडनाव' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder={isMr ? 'जाधव' : 'Jadhav'}
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {isMr ? 'ईमेल' : 'Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {isMr ? 'मोबाईल नंबर' : 'Phone'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {isMr ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <p className="text-[11px] text-gray-500">
                {isMr ? (
                  <>खाते तयार करून आपण नाईक फूड्सच्या <Link to="/in/privacy-policy" className="underline text-[#70BF4F]">गोपनीयता धोरण</Link> व <Link to="/in/terms" className="underline text-[#70BF4F]">नियम व अटी</Link> मान्य करता.</>
                ) : (
                  <>By creating an account, you agree to Naik Foods' <Link to="/in/privacy-policy" className="underline text-[#70BF4F]">Privacy Policy</Link> and <Link to="/in/terms" className="underline text-[#70BF4F]">Terms of Use</Link>.</>
                )}
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e293b] hover:bg-black text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {loading 
                  ? (isMr ? 'खाते तयार होत आहे...' : 'Creating account...') 
                  : (isMr ? 'खाते तयार करा' : 'Join Naik Foods')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  {isMr ? 'आधीच खाते आहे का? ' : 'Already a member? '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="text-[#70BF4F] font-semibold hover:underline cursor-pointer"
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
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#70BF4F]/10 text-[#70BF4F] font-bold text-xl flex items-center justify-center">
                {customer.first_name?.[0] || 'C'}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{customer.first_name} {customer.last_name}</h3>
                <p className="text-xs text-gray-500">{customer.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-[#70BF4F]/10 text-[#70BF4F]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4" />
                {isMr ? 'माहिती सारांश' : 'Overview'}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'orders' ? 'bg-[#70BF4F]/10 text-[#70BF4F]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-4 h-4" />
                {isMr ? 'माझ्या ऑर्डर्स' : 'Orders'}
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'addresses' ? 'bg-[#70BF4F]/10 text-[#70BF4F]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                {isMr ? 'साठवलेले पत्ते' : 'Addresses'}
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors pt-4 border-t border-gray-100 mt-4 cursor-pointer"
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
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMr ? `नमस्कार, ${customer.first_name}` : `Hello, ${customer.first_name}`}
                </h2>
                <p className="text-sm text-gray-600">
                  {isMr ? 'नाईक फूड्स ग्राहक डॅशबोर्डमध्ये आपले स्वागत आहे.' : 'Welcome to your Naik Foods member dashboard.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-gray-100 rounded-lg bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#70BF4F]" />
                    {isMr ? 'प्रोफाइल तपशील' : 'Profile Details'}
                  </h3>
                  <p className="text-sm text-gray-700"><strong>{isMr ? 'नाव:' : 'Name:'}</strong> {customer.first_name} {customer.last_name}</p>
                  <p className="text-sm text-gray-700"><strong>{isMr ? 'ईमेल:' : 'Email:'}</strong> {customer.email}</p>
                  <p className="text-sm text-gray-700"><strong>{isMr ? 'फोन:' : 'Phone:'}</strong> {customer.phone || (isMr ? 'नोंदवलेला नाही' : 'Not set')}</p>
                </div>

                <div className="p-5 border border-gray-100 rounded-lg bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#70BF4F]" />
                    {isMr ? 'ऑर्डर स्थिती' : 'Order Status'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isMr ? 'सध्या कोणतीही सक्रिय ऑर्डर नाही.' : 'You have 0 active orders.'}
                  </p>
                  <Link to="/in/store" className="text-sm font-bold text-[#70BF4F] hover:underline inline-flex items-center gap-1">
                    {isMr ? 'खरेदी सुरू करा →' : 'Start Shopping →'}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isMr ? 'तुमच्या ऑर्डर्स' : 'Your Orders'}
              </h2>
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-medium mb-1">
                  {isMr ? 'अजून कोणतीही ऑर्डर दिलेली नाही' : 'No orders yet'}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {isMr ? 'तुम्ही ऑर्डर दिल्यावर ती येथे दिसेल.' : 'When you place an order, it will appear here.'}
                </p>
                <Link to="/in/store" className="bg-[#70BF4F] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#5ca040] transition-colors inline-block">
                  {isMr ? 'उत्पादने पहा' : 'Explore Products'}
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isMr ? 'साठवलेले डिलिव्हरी पत्ते' : 'Saved Delivery Addresses'}
              </h2>
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-medium mb-1">
                  {isMr ? 'कोणताही पत्ता साठवलेला नाही' : 'No saved addresses'}
                </p>
                <p className="text-sm text-gray-400">
                  {isMr ? 'चेकआउट दरम्यान वापरलेले तुमचे पत्ते येथे आपोआप साठवले जातील.' : 'Your delivery addresses used at checkout will be saved here.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
