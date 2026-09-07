import React from 'react';
import { Truck, CheckCircle2, Sparkles } from 'lucide-react';

export default function FreeShippingBar({ currentAmount = 0, threshold = 499, className = '' }) {
  const amount = Number(currentAmount) || 0;
  const target = Number(threshold) || 499;
  const remaining = Math.max(0, target - amount);
  const percentage = Math.min(100, Math.round((amount / target) * 100));
  const isUnlocked = remaining === 0;

  return (
    <div className={`w-full bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs ${className}`}>
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
        <span className="flex items-center gap-1.5 text-gray-800">
          <Truck className={`w-4 h-4 ${isUnlocked ? 'text-[#70BF4F]' : 'text-amber-600'}`} />
          {isUnlocked ? (
            <span className="text-[#70BF4F] flex items-center gap-1 font-extrabold">
              <CheckCircle2 className="w-4 h-4" /> You've unlocked FREE Delivery across Maharashtra!
            </span>
          ) : (
            <span>
              Add <strong className="text-[#70BF4F]">₹{remaining}</strong> more for{' '}
              <span className="underline decoration-[#70BF4F] decoration-2">FREE Shipping</span>
            </span>
          )}
        </span>
        <span className="text-xs text-gray-500 font-semibold">{percentage}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isUnlocked
              ? 'bg-gradient-to-r from-[#70BF4F] to-[#5ca040]'
              : 'bg-gradient-to-r from-amber-400 to-[#70BF4F]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isUnlocked && (
        <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#70BF4F]" /> Express dispatch from Pune kitchen within 24 hours.
        </p>
      )}
    </div>
  );
}
