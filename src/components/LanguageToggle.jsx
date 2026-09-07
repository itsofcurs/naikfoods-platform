import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      id="marathi-lang-toggle"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-950/60 dark:to-slate-800 text-emerald-900 dark:text-emerald-300 border-2 border-emerald-400/80 dark:border-emerald-500/60 text-xs font-black transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-md ring-2 ring-emerald-400/20"
      title={lang === 'en' ? 'अस्सल मराठी भाषेत पाहण्यासाठी क्लिक करा' : 'Switch to English'}
      aria-label="Toggle Marathi and English Language"
    >
      <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
      <span className="font-extrabold text-[12px] tracking-tight">
        {lang === 'en' ? 'मराठी' : 'English'}
      </span>
      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-black">
        {lang === 'en' ? 'MR' : 'EN'}
      </span>
    </button>
  );
}
