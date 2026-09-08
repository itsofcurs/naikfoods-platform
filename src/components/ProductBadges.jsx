import React from 'react';

/**
 * Returns calculated spice level (1 = Mild, 2 = Medium, 3 = High/Kolhapuri)
 */
export function getProductSpiceLevel(product) {
  if (!product) return 2;
  const title = (product.title || '').toLowerCase();
  const tags = (product.tags || []).map(t => (t.value || '').toLowerCase()).join(' ');
  const combined = `${title} ${tags}`;

  // Level 1: Mild (सुंदर चव)
  if (
    combined.includes('paan') ||
    combined.includes('mukhwas') ||
    combined.includes('sweet') ||
    combined.includes('gulab') ||
    combined.includes('banana') ||
    combined.includes('chirote') ||
    combined.includes('roll') ||
    combined.includes('cake') ||
    combined.includes('modak') ||
    combined.includes('laddu') ||
    combined.includes('ladoo') ||
    combined.includes('peda') ||
    combined.includes('jalebi') ||
    combined.includes('sakhar') ||
    combined.includes('mitha')
  ) {
    return 1;
  }

  // Level 3: High / Kolhapuri Special (झणझणीत)
  if (
    combined.includes('kolhapuri') ||
    combined.includes('thecha') ||
    combined.includes('lasun') ||
    combined.includes('garlic') ||
    combined.includes('chilli') ||
    combined.includes('mirchi') ||
    combined.includes('spicy') ||
    combined.includes('schezwan') ||
    combined.includes('peri peri') ||
    combined.includes('kala masala') ||
    combined.includes('red joy') ||
    combined.includes('tambda')
  ) {
    return 3;
  }

  // Level 2: Medium (मध्यम तिखट) - Default for typical masalas, chivda, chakali, khakhra, noodles
  return 2;
}

/**
 * Returns dynamic dietary & authentic process badges for a product
 */
export function getProductBadges(product, isMr = false) {
  if (!product) return [];
  const title = (product.title || '').toLowerCase();
  const tags = (product.tags || []).map(t => (t.value || '').toLowerCase()).join(' ');
  const combined = `${title} ${tags}`;
  const badges = [];

  // Upwas / Fasting Special 🥥
  if (
    combined.includes('upwas') ||
    combined.includes('sabudana') ||
    combined.includes('rajgira') ||
    combined.includes('bhagar') ||
    combined.includes('singhada') ||
    combined.includes('fasting')
  ) {
    badges.push({
      id: 'upwas',
      icon: '🥥',
      labelEn: 'Upwas Special',
      labelMr: 'उपवास स्पेशल',
      bg: 'bg-amber-100/90 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700',
    });
  }

  // Gluten-Free Flour 🌾
  if (
    combined.includes('jowar') ||
    combined.includes('bajra') ||
    combined.includes('ragi') ||
    combined.includes('nachni') ||
    combined.includes('millet') ||
    combined.includes('rice flour') ||
    combined.includes('poha')
  ) {
    badges.push({
      id: 'gluten-free',
      icon: '🌾',
      labelEn: 'Gluten-Free',
      labelMr: 'ग्लुटेन-मुक्त',
      bg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700',
    });
  }

  // Hand-Pounded (खलबत्ता कुटलेले) 🔨
  if (
    combined.includes('masala') ||
    combined.includes('lonche') ||
    combined.includes('pickle') ||
    combined.includes('thecha') ||
    combined.includes('chutney') ||
    combined.includes('powder')
  ) {
    badges.push({
      id: 'hand-pounded',
      icon: '🔨',
      labelEn: 'Hand-Pounded',
      labelMr: 'खलबत्ता कुटलेले',
      bg: 'bg-orange-100/90 text-orange-900 border-orange-300 dark:bg-orange-950/80 dark:text-orange-200 dark:border-orange-700',
    });
  }

  // Zero Palm Oil / Zero Artificial Preservatives 🚫
  if (
    combined.includes('chivda') ||
    combined.includes('chakali') ||
    combined.includes('khakhra') ||
    combined.includes('namkeen') ||
    combined.includes('bhakarwadi') ||
    combined.includes('chips') ||
    combined.includes('noodles')
  ) {
    badges.push({
      id: 'zero-palm-oil',
      icon: '🚫',
      labelEn: 'Zero Palm Oil',
      labelMr: 'पाम तेल मुक्त',
      bg: 'bg-teal-100/90 text-teal-900 border-teal-300 dark:bg-teal-950/80 dark:text-teal-200 dark:border-teal-700',
    });
  }

  // 100% Vegetarian & Pure 🟢 (Always applies to authentic Naik Foods)
  if (badges.length === 0) {
    badges.push({
      id: 'pure-veg',
      icon: '🟢',
      labelEn: '100% Pure Veg',
      labelMr: '१००% शुद्ध शाकाहारी',
      bg: 'bg-green-100/90 text-green-900 border-green-300 dark:bg-green-950/80 dark:text-green-200 dark:border-green-700',
    });
  }

  return badges;
}

/**
 * ProductBadgePill component for cards & details
 */
export default function ProductBadgePill({ product, isMr = false, max = 2, className = '' }) {
  const badges = getProductBadges(product, isMr).slice(0, max);

  return (
    <div className={`flex flex-wrap items-center gap-1 ${className}`}>
      {badges.map((b) => (
        <span
          key={b.id}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border shadow-2xs backdrop-blur-md uppercase tracking-wider ${b.bg}`}
          title={isMr ? b.labelMr : b.labelEn}
        >
          <span>{b.icon}</span>
          <span>{isMr ? b.labelMr : b.labelEn}</span>
        </span>
      ))}
    </div>
  );
}
