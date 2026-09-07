import React from 'react';
import { Flame } from 'lucide-react';

export default function SpiceMeter({ level = 1, showLabel = true, className = '' }) {
  // Level: 1 = Mild (सुंदर चव), 2 = Medium (मध्यम तिखट), 3 = Hot / Kolhapuri (झणझणीत)
  const numericLevel = Math.max(1, Math.min(3, Number(level) || 1));

  const levelConfigs = {
    1: {
      label: 'Mild',
      marathi: 'सुंदर चव',
      color: 'text-amber-500 fill-amber-500',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    2: {
      label: 'Medium Spicy',
      marathi: 'मध्यम तिखट',
      color: 'text-orange-500 fill-orange-500',
      bg: 'bg-orange-50 text-orange-800 border-orange-200',
    },
    3: {
      label: 'Kolhapuri Hot',
      marathi: 'झणझणीत',
      color: 'text-red-600 fill-red-600',
      bg: 'bg-red-50 text-red-800 border-red-200',
    },
  };

  const current = levelConfigs[numericLevel];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg} ${className}`}
      title={`Spice Level: ${current.label} (${current.marathi})`}
    >
      <div className="flex items-center -space-x-1">
        {[1, 2, 3].map((step) => (
          <Flame
            key={step}
            className={`w-3.5 h-3.5 ${
              step <= numericLevel
                ? current.color
                : 'text-gray-300 fill-transparent opacity-40'
            } transition-all`}
          />
        ))}
      </div>

      {showLabel && (
        <span className="font-medium tracking-wide">
          {current.label} <span className="opacity-75 text-[10px]">({current.marathi})</span>
        </span>
      )}
    </div>
  );
}
