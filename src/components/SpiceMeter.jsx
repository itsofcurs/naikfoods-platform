import React from 'react';

export default function SpiceMeter({ level = 1, showLabel = true, compact = false, className = '' }) {
  // Level: 1 = Mild (सुंदर चव), 2 = Medium (मध्यम तिखट), 3 = High / Kolhapuri (झणझणीत)
  const numericLevel = Math.max(1, Math.min(3, Number(level) || 1));

  const levelConfigs = {
    1: {
      label: 'Mild',
      marathi: 'सुंदर चव',
      chilli: '🌶️',
      color: 'text-amber-600',
      bg: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
    },
    2: {
      label: 'Medium',
      marathi: 'मध्यम तिखट',
      chilli: '🌶️🌶️',
      color: 'text-orange-600',
      bg: 'bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800',
    },
    3: {
      label: 'High (Kolhapuri)',
      marathi: 'झणझणीत',
      chilli: '🌶️🌶️🌶️',
      color: 'text-red-600',
      bg: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/60 dark:text-red-200 dark:border-red-800',
    },
  };

  const current = levelConfigs[numericLevel];

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${current.bg} ${className}`}
        title={`Spice Level: ${current.label} (${current.marathi})`}
      >
        <span className="text-[12px]">{current.chilli}</span>
        <span className="text-[10px] font-extrabold">{current.label}</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${current.bg} ${className}`}
      title={`Spice Level: ${current.label} (${current.marathi})`}
    >
      <span className="tracking-tight text-sm">{current.chilli}</span>
      {showLabel && (
        <span className="font-bold tracking-wide">
          {current.label} <span className="opacity-80 text-[11px]">({current.marathi})</span>
        </span>
      )}
    </div>
  );
}
