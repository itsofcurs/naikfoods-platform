import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function HeroBanner({
  title,
  subtitle,
  bgImage = '/banners/Hero-Banner.png',
  bgColor = '#70BF4F',
  breadcrumbs,
  className = '',
}) {
  return (
    <section
      className={`relative w-full py-12 md:py-16 text-center text-white mb-6 md:mb-8 overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Semi-transparent tint to ensure readability while preserving the background pattern */}
      <div className="absolute inset-0 bg-[#70BF4F]/85 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-serif">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/95 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-4 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center flex-wrap gap-1.5 text-xs sm:text-sm font-medium text-white/80"
          >
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60 text-white" />}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="text-white/80 hover:text-white hover:underline transition-all"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
