import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#F6F8F9] hover:bg-[#70BF4F]/15 text-[#1B1B1B] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:hover:bg-[#334155] border border-gray-200/80 dark:border-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
      title={lang === 'en' ? 'Switch to Marathi (मराठी)' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <Globe className="w-3.5 h-3.5 text-[#70BF4F]" />
      <span className="font-extrabold text-[11px] tracking-wide">
        {lang === 'en' ? 'मराठी' : 'EN'}
      </span>
    </button>
  );
}
