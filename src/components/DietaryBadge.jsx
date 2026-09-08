import React from 'react';
import { Leaf, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export default function DietaryBadge({ type = 'veg', className = '' }) {
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  const configs = {
    veg: {
      label: isMr ? '१००% शाकाहारी' : '100% Veg',
      icon: Leaf,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      dot: 'bg-emerald-600',
    },
    jain: {
      label: isMr ? 'जैन अनुकूल' : 'Jain Friendly',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-800 border-amber-200/80',
      dot: 'bg-amber-500',
    },
    upwas: {
      label: isMr ? 'उपवास स्पेशल' : 'उपवास / Fasting Special',
      icon: HeartPulse,
      color: 'bg-purple-50 text-purple-800 border-purple-200/80',
      dot: 'bg-purple-600',
    },
    glutenFree: {
      label: isMr ? 'ग्लुटेन-मुक्त' : 'Gluten-Free',
      icon: Leaf,
      color: 'bg-blue-50 text-blue-800 border-blue-200/80',
      dot: 'bg-blue-600',
    },
    handPounded: {
      label: isMr ? 'पारंपारिक जात्यावर' : 'खलबत्ता कुटलेले',
      icon: ShieldCheck,
      color: 'bg-stone-100 text-stone-800 border-stone-300/80',
      dot: 'bg-stone-600',
    },
    noPreservatives: {
      label: isMr ? 'रसायन विरहित' : 'Zero Preservatives',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-800 border-teal-200/80',
      dot: 'bg-teal-600',
    },
  };

  const current = configs[type] || configs.veg;
  const IconComponent = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border tracking-tight shadow-2xs ${current.color} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <IconComponent className="w-3 h-3 opacity-80" />
      <span>{current.label}</span>
    </span>
  );
}
