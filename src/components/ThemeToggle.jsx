import React, { useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Sunlight Day Mode' : 'Switch to Starlit Sky Night Mode'}
      title={isDark ? 'Switch to Sunlight Day Mode (दिवसाचा प्रकाश)' : 'Switch to Starlit Sky Night Mode (तारकांचे आकाश)'}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer ${
        isDark
          ? 'bg-[#1E293B] text-amber-300 hover:bg-[#334155] border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95'
          : 'bg-[#F6F8F9] text-gray-700 hover:bg-[#70BF4F] hover:text-white border border-gray-200/80 hover:scale-105 active:scale-95'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 transition-transform duration-300 hover:rotate-90 text-amber-300 fill-amber-300/30" />
      ) : (
        <Moon className="w-4.5 h-4.5 transition-transform duration-300 hover:-rotate-12 text-gray-700 hover:text-white" />
      )}
    </button>
  );
}
