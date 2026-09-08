import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export default function Footer() {
  const { t, translateCategory } = useLanguageStore();

  return (
    <footer className="w-full relative text-white pt-16 md:pt-24 font-sans overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #bcccb4 0%, #70BF4F 100%)' }}
      />

      {/* Vegetable Watermark Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/backgrounds/bg01.png")' }}
      />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/20 text-center md:text-left">
          
          {/* Column 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-8 mx-auto md:mx-0">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Naik Foods"
                className="h-auto w-[160px] drop-shadow-md mx-auto md:mx-0 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.naikfoods.co.in/logo/logo.png';
                }}
              />
            </Link>

            <p className="text-[#161915]/80 text-lg leading-relaxed max-w-sm font-bold mx-auto md:mx-0">
              {t('heritageCallout')}
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/naikfoods_?igsh=N250eml2cGRiZjQw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naik Foods on Instagram"
                className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg"
                style={{ color: '#E4405F' }}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1E4FgsuWMb/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naik Foods on Facebook"
                className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg"
                style={{ color: '#1877F2' }}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20question%20about%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naik Foods on WhatsApp"
                className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg"
                style={{ color: '#25D366' }}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: SHOP (2 cols) */}
          <div className="lg:col-span-2 space-y-6 mx-auto md:mx-0">
            <h3 className="text-sm font-black tracking-[0.2em] text-[#70BF4F] uppercase border-b-2 border-[#161915]/10 pb-2">
              {t('shop')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/store?category=snacks-and-namkeen"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {translateCategory('Snacks and Namkeen')}
                </Link>
              </li>
              <li>
                <Link
                  to="/store?category=pickles-and-condiments"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {translateCategory('Pickles & Condiments')}
                </Link>
              </li>
              <li>
                <Link
                  to="/store?category=sweets-and-bakery"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {translateCategory('Sweets & Bakery')}
                </Link>
              </li>
              <li>
                <Link
                  to="/store?category=dairy-and-beverages"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {translateCategory('Dairy & Beverages')}
                </Link>
              </li>
              <li>
                <Link
                  to="/store?category=mukhvas-and-digestives"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {translateCategory('Mukhvas & Digestives')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-6 mx-auto md:mx-0">
            <h3 className="text-sm font-black tracking-[0.2em] text-[#70BF4F] uppercase border-b-2 border-[#161915]/10 pb-2">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/in/about"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/in/blog"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {t('blogs')}
                </Link>
              </li>
              <li>
                <Link
                  to="/in/store"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link
                  to="/in/contact"
                  className="text-[15px] text-white font-bold hover:text-[#161915] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit Our Store Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6 bg-white/20 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/30 self-start mx-auto md:mx-0 text-left w-full max-w-md">
            <h3 className="text-xl font-black tracking-tight text-[#70BF4F]">
              {t('visitStoreTitle')}
            </h3>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <a
                  href="https://www.google.com/maps/place/NAIK+FOODS/@18.5085455,73.8572996,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c1d2a1bab18f:0x612261ab2b10c199!8m2!3d18.5085455!4d73.8572996!16s%2Fg%2F11yk9025kq?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-5 h-5 text-white shrink-0 group-hover:text-[#161915] transition-colors mt-0.5" />
                  <p className="text-white font-bold text-sm leading-relaxed group-hover:text-[#161915] transition-colors">
                    {t('storeAddress')}
                  </p>
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-row flex-wrap gap-3 items-center justify-start">
                <a
                  href="tel:+919730046247"
                  className="flex items-center gap-3 text-white hover:text-[#161915] transition-colors"
                >
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <span className="font-black text-sm">+91 9730046247</span>
                </a>
              </div>

              {/* Hours */}
              <div className="flex flex-row flex-wrap gap-3 items-center justify-start">
                <Clock className="w-5 h-5 text-white shrink-0" />
                <p className="text-white text-sm font-bold italic">
                  {t('storeHours')}
                </p>
              </div>

              {/* Button */}
              <a
                href="https://www.google.com/maps/place/NAIK+FOODS/@18.5085455,73.8572996,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c1d2a1bab18f:0x612261ab2b10c199!8m2!3d18.5085455!4d73.8572996!16s%2Fg%2F11yk9025kq?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button
                  type="button"
                  className="w-full py-4 bg-white text-[#70BF4F] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#70BF4F] hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                >
                  {t('getDirections')}
                </button>
              </a>
            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright Bar */}
        <div className="pt-6 pb-6 border-t border-white/15">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            <div className="text-white text-xs sm:text-sm font-bold text-center lg:text-left order-2 lg:order-1">
              {t('copyright')}
            </div>

            <div className="flex items-center gap-6 order-1 lg:order-2">
              <Link
                to="/in/terms-and-conditions"
                className="text-white text-xs sm:text-sm font-semibold hover:text-[#161915] hover:underline transition-colors cursor-pointer"
              >
                {t('termsLink')}
              </Link>
              <Link
                to="/in/privacy-policy"
                className="text-white text-xs sm:text-sm font-semibold hover:text-[#161915] hover:underline transition-colors cursor-pointer"
              >
                {t('privacyLink')}
              </Link>
            </div>

            {/* Payment / Razorpay Secure Badges */}
            <div className="flex items-center gap-3 text-white/90 order-3">
              <span className="font-extrabold text-xs tracking-wider border border-white/40 px-2 py-0.5 rounded bg-white/10">
                VISA
              </span>
              <div className="flex items-center -space-x-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90 inline-block"></span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                Razorpay Secure
              </span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
