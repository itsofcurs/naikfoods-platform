import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sprout,
  Flame,
  Truck,
  ShieldCheck,
  Sparkles,
  Users,
  MapPin,
  ArrowRight
} from 'lucide-react';

const statItems = [
  { label: '1938', sub: 'Legacy Began', desc: 'Founded with Naik Seeds.' },
  { label: '75+', sub: 'Years of Trust', desc: 'Serving generations.' },
  { label: '04', sub: 'Family Ventures', desc: 'Agriculture to hospitality.' },
  { label: '2025', sub: 'Naik Foods', desc: 'A new chapter begins.' },
];

const workSteps = [
  {
    title: 'Sourcing Regional Recipes',
    description: 'Collaborating with local artisans from Konkan to Vidarbha.',
    icon: Compass,
  },
  {
    title: 'Ingredient Selection',
    description: 'Only the finest local ingredients for peak freshness.',
    icon: Sprout,
  },
  {
    title: 'Preparation with Care',
    description: 'Traditional methods with modern hygiene standards.',
    icon: Flame,
  },
  {
    title: 'Curation & Delivery',
    description: 'Freshly packed in Pune for your doorstep delivery.',
    icon: Truck,
  },
  {
    title: 'Quality Assurance',
    description: 'Strict checks for taste, hygiene, and packaging.',
    icon: ShieldCheck,
  },
];

const valuesList = [
  {
    id: 'authenticity',
    icon: Sparkles,
    title: 'Authenticity',
    description: 'Every dish is crafted with heirloom recipes to ensure a true Maharashtrian soul in every bite.',
  },
  {
    id: 'reliability',
    icon: ShieldCheck,
    title: 'Reliability',
    description: 'From careful preparation to timely delivery, we maintain the highest standards of hygiene and trust.',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community',
    description: 'We empower local farmers and home chefs, building a sustainable network that supports Maharashtra’s roots.',
  },
  {
    id: 'regional',
    icon: MapPin,
    title: 'Regional Pride',
    description: 'Bringing you the diverse culinary landscape of Maharashtra, from the Konkan coast to the heart of Vidarbha.',
  },
];

export default function About() {
  return (
    <div className="w-full bg-white font-sans text-[#161915] selection:bg-[#70BF4F]/20 selection:text-[#161915]">
      
      {/* TOP HEADER GREEN BANNER (Exact Match with Original Website) */}
      <section className="relative w-full bg-[#70BF4F] py-14 md:py-20 overflow-hidden text-center text-white">
        {/* Vegetable Pattern Watermark Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: 'url("/banners/Hero-Banner.png")' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 font-manrope">
            About Us
          </h1>
          <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto">
            Insights, tips, and updates to help you shop smarter and live better
          </p>
        </div>
      </section>

      {/* SECTION 1: OUR LEGACY - From Seeds to Sustenance */}
      <section className="relative overflow-hidden bg-white py-12 md:py-24">
        {/* Background Decorative Blur Circle */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F2F7F5] z-0 blur-3xl pointer-events-none"
        />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Legacy Story & Stats */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[#70BF4F] font-extrabold text-xs uppercase tracking-[0.2em] block mb-2">
                  OUR LEGACY
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-black text-[#161915] leading-[1.1] mb-6">
                  From Seeds to <br className="hidden sm:inline" />
                  <span className="text-[#70BF4F]">Sustenance</span>
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px]">
                  Rooted in a legacy that began in 1938 with{' '}
                  <strong className="text-gray-900 font-bold">Late Shri Anant Balkrishna Naik</strong>, the
                  Naik family has spent over eight decades building trust across agriculture, hospitality, and
                  lifestyle sectors. From the foundation of{' '}
                  <strong className="text-gray-900 font-bold">Naik Seeds</strong> to ventures like{' '}
                  <strong className="text-gray-900 font-bold">Sushil Lodging</strong>,{' '}
                  <strong className="text-gray-900 font-bold">Sushil Dining Hall</strong>, and{' '}
                  <strong className="text-gray-900 font-bold">Naik Landscape Services</strong>, the journey
                  has always been driven by quality, service, and innovation.
                </p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px] mt-4">
                  Continuing this legacy, <strong className="text-gray-900 font-bold">Naik Foods</strong>,
                  founded in 2025 by{' '}
                  <strong className="text-gray-900 font-bold">Mrs. Priya Chandan Naik</strong>, brings
                  together wholesome and high-quality food products under one trusted name — carrying forward
                  generations of dedication, purity, and excellence.
                </p>
              </div>

              {/* 4 Stat Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-5 pt-2">
                {statItems.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 rounded-[20px] bg-[#F9FBF9] border border-[#F0F2EF] hover:border-[#70BF4F] hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-default"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-[#70BF4F] mb-1 leading-none">
                      {stat.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#161915] leading-tight mb-1">
                      {stat.sub}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Founder Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:mt-6">
                {/* Organic Background Blob Shape */}
                <div
                  aria-hidden="true"
                  className="absolute -top-5 -right-5 w-full h-full bg-[#F2F7F5] z-0 pointer-events-none"
                  style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                />

                {/* Main Image Card */}
                <div className="relative w-full h-[460px] sm:h-[550px] lg:h-[620px] rounded-[32px] overflow-hidden z-10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-8 border-white bg-gray-100">
                  <img
                    src="/about/founder.jpeg"
                    alt="Mrs. Priya Chandan Naik, Founder of Naik Foods"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Floating "Since 1938" Badge */}
                <div className="hidden md:block absolute bottom-8 -left-6 bg-[#70BF4F] text-white p-4 rounded-[18px] z-20 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <h6 className="font-black text-lg leading-tight">Since 1938</h6>
                  <p className="text-xs text-white/90 font-medium">Generations of trust</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: OUR INSPIRATION - Our AAJI */}
      <section className="py-12 md:py-24 bg-white border-t border-gray-100/80">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Text & Legacy of Aaji */}
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-black text-[#161915] leading-[1.1]">
              Our Inspiration, <br />
              <span className="text-[#70BF4F]">Our AAJI</span>
            </h2>

            <div className="flex flex-col gap-4 text-base sm:text-lg leading-relaxed">
              <p className="text-[#161915] font-medium">
                The story of <strong className="font-bold text-gray-900">Naik Foods</strong> is deeply rooted in
                the legacy of the Naik family, which has been connected to agriculture in Pune for over 70
                years—a foundation built on authenticity, quality, and respect for tradition.
              </p>

              <p className="text-gray-600">
                In the late 1980s, <strong className="text-gray-900 font-bold">Late Sarita Naik</strong> (our
                beloved Aaji) took this legacy a step further by starting Pune’s first cake manufacturing
                classes, long before baking became mainstream. Her kitchen was more than a place to cook—it was
                a space where tradition met innovation, where every recipe was crafted with precision and love.
              </p>

              <p className="text-gray-600">
                In 1992, the family expanded its journey in hospitality with the establishment of{' '}
                <a
                  href="https://hotelsushil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#161915] underline decoration-[#70BF4F] decoration-2 underline-offset-4 hover:text-[#70BF4F] transition-colors"
                >
                  Hotel Sushil
                </a>
                , further strengthening our connection with serving people and creating comforting experiences.
              </p>

              <p className="text-gray-600">
                Aaji was the heart of it all—an innovator who perfected authentic Maharashtrian recipes and
                handcrafted masalas. Her techniques carried the essence of home, perfected through years of
                intuition and care. Today, Naik Foods is a tribute to her legacy—sharing food that doesn’t just
                taste good, but feels like home.
              </p>
            </div>
          </div>

          {/* Right Image: Aaji Photo Container */}
          <div className="flex-shrink-0 relative w-full sm:w-[80%] md:w-[440px] mx-auto">
            {/* Corner Green Decorative Frame Accent */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute -top-4 -right-4 w-28 h-28 border-t-4 border-r-4 border-[#70BF4F] rounded-tr-[28px] z-0 pointer-events-none"
            />

            <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] rounded-[24px] overflow-hidden bg-[#f5f5f5] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] z-10 border-4 border-white">
              <img
                src="/about/aaji.jpg"
                alt="Late Sarita Naik - The inspiration behind Naik Foods"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: HOW WE WORK - From Farm to Your Kitchen */}
      <section className="py-12 md:py-24 bg-[#FAFCFA] border-t border-b border-gray-100">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky Hero & Banner */}
            <div className="flex-1 lg:sticky lg:top-28 w-full">
              <span className="text-[#70BF4F] font-black text-xs uppercase tracking-[0.2em] block mb-2">
                HOW WE WORK
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-black text-[#161915] leading-[1.1] mt-1 mb-4">
                From Farm to <br className="hidden sm:inline" />
                <span className="text-[#70BF4F]">Your Kitchen</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-[500px]">
                Our process is a labor of love, ensuring that the soul of Maharashtrian cuisine remains untampered and authentic.
              </p>

              {/* Interactive Banner Card */}
              <div className="relative rounded-[32px] overflow-hidden h-72 sm:h-80 w-full shadow-[0_30px_60px_rgba(0,0,0,0.1)] group bg-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/about/image.jpg"
                  alt="Naik Foods preparation and sourcing process"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />
                
                <Link
                  to="/store"
                  className="absolute bottom-6 left-6 inline-flex items-center gap-2 bg-white text-[#161915] font-extrabold px-6 py-3 rounded-xl z-20 shadow-lg hover:bg-[#70BF4F] hover:text-white transition-all duration-300 text-sm"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Vertical Process Timeline */}
            <div className="flex-1 w-full flex justify-center pt-4 lg:pt-0">
              <div className="w-full space-y-0">
                {workSteps.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isLast = idx === workSteps.length - 1;
                  return (
                    <div
                      key={step.title}
                      className={`flex gap-6 relative ${!isLast ? 'pb-10' : 'pb-0'}`}
                    >
                      {/* Vertical Dashed Line */}
                      {!isLast && (
                        <div
                          aria-hidden="true"
                          className="absolute left-[27px] top-[60px] bottom-0 w-[2px] border-l-2 border-dashed border-[#70BF4F]/40"
                        />
                      )}

                      {/* Circular Icon Node */}
                      <div className="w-14 h-14 rounded-full bg-white border-2 border-[#70BF4F] flex items-center justify-center text-[#70BF4F] z-10 shadow-[0_4px_10px_rgba(112,191,79,0.2)] flex-shrink-0 transition-transform hover:scale-110 duration-200">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Step Text */}
                      <div className="pt-2">
                        <h3 className="text-xl font-extrabold text-[#161915] mb-1.5">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-[420px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: OUR VALUES */}
      <section className="bg-[#F2F7F5] py-16 md:py-24 px-4 sm:px-6 lg:px-12 w-full">
        <div className="max-w-[1280px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-[#161915] leading-[1.1] mb-3">
              Our <span className="text-[#70BF4F]">Values</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              At Naik Foods, we're passionate about preserving Maharashtra's culinary legacy with authenticity and care.
            </p>
          </div>

          {/* 4 Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesList.map((val) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.id}
                  className="p-6 sm:p-8 rounded-[24px] bg-white h-full min-h-[260px] flex flex-col items-center sm:items-start text-center sm:text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-gray-100/80"
                >
                  <div className="mb-6 bg-[#70BF4F] rounded-[16px] w-14 h-14 flex items-center justify-center shadow-[0_8px_20px_-6px_#70BF4F] mx-auto sm:mx-0 flex-shrink-0">
                    <IconComp className="text-white w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#161915] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
