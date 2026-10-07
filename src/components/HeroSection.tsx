import React from 'react';
import { ArrowRight, Sparkles, Calculator, Users } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { HsiLogo } from './HsiLogo';

interface HeroSectionProps {
  onOpenConsultation: (product?: string) => void;
  onOpenPartnerModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation, onOpenPartnerModal }) => {
  const { hero, about, images } = useSiteContent();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-200 to-slate-300 text-[#0a192f] py-16 md:py-24 border-b border-slate-300">
      {/* Background Decorative Mesh & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {images.heroBannerBg && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
            style={{ backgroundImage: `url(${images.heroBannerBg})` }}
          />
        )}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a192f0d_1px,transparent_1px),linear-gradient(to_bottom,#0a192f0d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Regulatory Badge & Direct Phone Contact */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>{hero.badge || "Protect. Invest. Grow. • Mulund, Mumbai"}</span>
              </div>
              <a
                href="tel:+919619973551"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-600/40 text-emerald-700 text-xs font-bold transition-colors"
              >
                <span>📞 Call: +91 96199 73551</span>
              </a>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
                {hero.headingPrefix}{' '}
                <span className="text-orange-gradient">{hero.headingHighlight}</span>
                {hero.headingSuffix}
              </h1>
              <p className="text-orange-600 font-semibold text-lg sm:text-xl font-heading tracking-wide">
                {about.motto || "Plan Today. Protect Tomorrow. Prosper Always."}
              </p>
            </div>

            {/* Subtitle / Description */}
            <p className="text-slate-700 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.subtitle}
            </p>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold mr-1">Products:</span>
              <button
                onClick={() => scrollToSection('products')}
                className="px-2.5 py-1 rounded bg-white/70 hover:bg-white border border-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Mutual Funds (SIP/SWP)
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="px-2.5 py-1 rounded bg-white/70 hover:bg-white border border-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Life & Health Insurance
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="px-2.5 py-1 rounded bg-white/70 hover:bg-white border border-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Stocks & Bonds
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="px-2.5 py-1 rounded bg-white/70 hover:bg-white border border-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Fraction of Property
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="px-2.5 py-1 rounded bg-white/70 hover:bg-white border border-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Loans & Credit
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>{hero.primaryCtaText || "Book Free Financial Consultation"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('calculators')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0a192f] hover:bg-[#12294d] text-white font-semibold text-sm border border-[#0a192f] transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-orange-400" />
                <span>Calculate SIP & Returns</span>
              </button>

              <button
                onClick={() => onOpenPartnerModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-orange-600/60 hover:bg-orange-500/10 text-orange-700 font-semibold text-sm transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{hero.secondaryCtaText || "Partner With Us"}</span>
              </button>
            </div>

            {/* Commitment Pledge */}
            <div className="pt-2 text-xs text-slate-600 font-medium tracking-wide">
              <span>Motto: </span>
              <strong className="text-slate-900 font-semibold uppercase">
                {about.motto || "YOUR TRUST, OUR COMMITMENT."}
              </strong>
            </div>

          </div>

          {/* Right Column: Premium Emblem Presentation Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-white/95 to-slate-100/95 border border-slate-300 shadow-2xl backdrop-blur-sm relative group">
              
              {/* Corner Orange Accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-orange-500" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-orange-500" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-500" />

              {/* Brand Emblem / Custom Logo */}
              <div className="py-2 flex items-center justify-center">
                {images.logoUrl ? (
                  <img src={images.logoUrl} alt="Horizon Secure Investments" className="max-h-28 object-contain" />
                ) : (
                  <HsiLogo variant="full" size="xl" darkTheme={false} />
                )}
              </div>

              {/* Value Focus Bar */}
              <div className="mt-6 pt-6 border-t border-slate-300 grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-white/70 border border-slate-300">
                  <div className="text-sm font-bold text-orange-600">Protection</div>
                  <div className="text-[11px] text-slate-600 uppercase tracking-wider font-medium">Life & Health</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 border border-slate-300">
                  <div className="text-sm font-bold text-orange-600">Growth</div>
                  <div className="text-[11px] text-slate-600 uppercase tracking-wider font-medium">Invest & Plan</div>
                </div>
              </div>

              {/* Quick Quote Highlight */}
              <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center">
                <div className="text-xs text-orange-800 font-semibold">
                  Partnered with all Major Regulated Companies
                </div>
                <button
                  onClick={() => scrollToSection('insurance-partners')}
                  className="mt-1 text-[11px] text-orange-700 hover:text-orange-600 underline font-medium cursor-pointer"
                >
                  View Nature of Work Directory &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
