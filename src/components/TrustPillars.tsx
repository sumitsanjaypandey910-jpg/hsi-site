import React from 'react';
import { Award, ShieldCheck, Sliders, TrendingUp, CheckCircle2 } from 'lucide-react';
import { TRUST_PILLARS, COMPANY_INFO } from '../data/hsiData';

export const TrustPillars: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <Award className="w-6 h-6 text-orange-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-emerald-600" />;
      case 'TrendingUp':
      default:
        return <TrendingUp className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3 border border-orange-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
            <span>Our Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            Built on Uncompromising Principles
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            At Horizon Secure Investments, our fiduciary ethos puts your long-term prosperity first. We combine objective analytical research with bespoke financial engineering.
          </p>
          <div className="mt-2 text-xs font-extrabold tracking-widest text-orange-600 uppercase">
            {COMPANY_INFO.slogan}
          </div>
        </div>

        {/* 4 Pillars Grid (Page 2 & 3 Footer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="wp-card p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4">
                  {getIcon(pillar.iconName)}
                </div>
                <h3 className="text-base font-black text-[#0a192f] tracking-wide">
                  {pillar.title}
                </h3>
                <div className="text-xs font-bold text-orange-600 mb-2">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center text-[11px] font-semibold text-slate-700">
                <span className="text-orange-500 mr-1.5 font-bold">✓</span>
                <span>Verified Client Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Slogan & Motto Banner - Dominant 50% Navy */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#071325] via-[#0b1c36] to-[#071325] p-6 sm:p-8 text-white text-center shadow-lg border border-slate-700">
          <div className="max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
              The Horizon Secure Investments Creed
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold italic text-slate-100">
              "{COMPANY_INFO.motto}"
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {COMPANY_INFO.slogan} — Navigating volatile financial markets with disciplined risk architecture.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
