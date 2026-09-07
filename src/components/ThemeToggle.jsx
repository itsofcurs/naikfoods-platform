import React, { useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Starlit Sky Mode"
      title={theme === 'dark' ? 'Switch to Warm Sunlight Mode (दिवसाचा प्रकाश)' : 'Switch to Starlit Sky Night Mode (तारकांचे आकाश)'}
      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer ${
        theme === 'dark'
          ? 'bg-[#172554] text-yellow-300 hover:bg-[#1E3A8A] border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
          : 'bg-[#F6F8F9] text-gray-700 hover:bg-[#70BF4F] hover:text-white border border-gray-200/80'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <div className="relative flex items-center justify-center">
          <Moon className="w-4.5 h-4.5 transition-transform duration-300 rotate-[-15deg] fill-yellow-300" />
          <Sparkles className="w-2.5 h-2.5 text-sky-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45 text-amber-500" />
      )}
    </button>
  );
}
