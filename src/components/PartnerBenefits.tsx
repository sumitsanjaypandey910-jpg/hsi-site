import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Repeat, 
  Trophy, 
  Plane, 
  ArrowRight, 
  Sparkles, 
  CheckCircle,
  Compass
} from 'lucide-react';
import { PARTNER_BENEFITS } from '../data/hsiData';

interface PartnerBenefitsProps {
  onApplyPartner: () => void;
}

export const PartnerBenefits: React.FC<PartnerBenefitsProps> = ({ onApplyPartner }) => {
  const getBenefitIcon = (step: number) => {
    switch (step) {
      case 1: return <Compass className="w-6 h-6 text-white" />;
      case 2: return <TrendingUp className="w-6 h-6 text-white" />;
      case 3: return <Repeat className="w-6 h-6 text-white" />;
      case 4: return <Trophy className="w-6 h-6 text-white" />;
      case 5: return <Plane className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="partner-benefits" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header from Brochure Page 5 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-orange-600" />
            <span>Entrepreneurial Advisory Career</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a192f] tracking-tight font-heading">
            PARTNER’S BENEFITS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium">
            A partnership opportunity built around leadership, growth and long-term income.
          </p>
        </div>

        {/* 5 Numbered Benefit Cards (Direct mapping from Page 5) */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {PARTNER_BENEFITS.map((item) => (
            <div
              key={item.step}
              className="wp-card p-6 sm:p-7 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-orange-400 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6 group"
            >
              {/* Number Badge */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#162f56] text-white flex items-center justify-center font-black text-2xl font-heading shadow-md shrink-0 border border-orange-500/40 group-hover:scale-105 transition-transform">
                {item.step}
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-lg font-black text-[#0a192f] font-heading tracking-wide">
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 border border-orange-200">
                    {item.badge}
                  </span>
                </div>

                <div className="text-xs font-bold text-orange-600 mb-2">
                  {item.subtitle}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Sub perks checklist */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {item.perks.slice(0, 2).map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  onClick={onApplyPartner}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white group-hover:bg-[#0a192f] text-slate-800 group-hover:text-white border border-slate-300 group-hover:border-[#0a192f] text-xs font-bold transition-all cursor-pointer"
                >
                  Join Role &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Big Banner from Brochure Page 5: GROW WITH HORIZON */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#071325] via-[#0b1c36] to-[#071325] p-8 sm:p-10 text-white text-center shadow-2xl border border-slate-700 relative overflow-hidden">
          
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              HSI Entrepreneurial Network
            </span>
            
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-wide text-white">
              GROW WITH HORIZON
            </h3>
            
            <p className="text-sm sm:text-base font-semibold tracking-wide text-orange-200">
              Partner • Lead • Generate • Build a Long-Term Horizon
            </p>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Whether you are an established IFA, tax consultant, banker, or ambitious professional, unlock unlimited institutional backing, multi-product distribution codes, and compounding trail income.
            </p>

            <div className="pt-4">
              <button
                onClick={onApplyPartner}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm tracking-wide shadow-xl shadow-orange-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Submit Partner / Leadership Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Background subtle elements */}
          <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-orange-500/10 rounded-full blur-2xl" />
          <div className="absolute -top-16 -left-16 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl" />
        </div>

      </div>
    </section>
  );
};
