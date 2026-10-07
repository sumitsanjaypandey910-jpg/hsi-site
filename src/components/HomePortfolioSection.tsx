import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';
import { useSiteContent, DEFAULT_PORTFOLIO } from '../context/SiteContentContext';

interface HomePortfolioSectionProps {
  onOpenConsultation: (portfolioName?: string) => void;
}

export const HomePortfolioSection: React.FC<HomePortfolioSectionProps> = ({ onOpenConsultation }) => {
  const { portfolio } = useSiteContent();

  const models = portfolio?.models && portfolio.models.length > 0
    ? portfolio.models
    : DEFAULT_PORTFOLIO.models;

  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{portfolio?.badge || 'Institutional Asset Allocation'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0a192f] font-heading">
              {portfolio?.title || 'Signature Model Portfolios'}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              {portfolio?.subtitle || 'Scientifically diversified multi-asset strategies engineered for resilience, capital growth, and predictable liquidity.'}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#0a192f] bg-[#0a192f] hover:bg-orange-600 hover:border-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-sm group"
            >
              <span>Explore All Allocation Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-orange-400/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-800 shadow-2xs">
                    {model.badge}
                  </span>
                  <span className="text-[11px] font-extrabold text-orange-600">
                    {model.riskLevel}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0a192f] font-heading group-hover:text-orange-600 transition-colors">
                  {model.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {model.description}
                </p>

                {/* Key Metrics */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-600 block">Target Return</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{model.targetReturn}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-600 block">Horizon</span>
                    <span className="font-bold text-slate-800 text-xs">{model.horizon}</span>
                  </div>
                </div>

                {/* Mini Allocation Stack */}
                {model.allocation && model.allocation.length > 0 && (
                  <div className="mt-4">
                    <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1.5">Asset Blend</span>
                    <div className="h-2 w-full rounded-full bg-slate-200 flex overflow-hidden">
                      {model.allocation.map((item, idx) => (
                        <div
                          key={idx}
                          title={`${item.label}: ${item.percent}%`}
                          className={`h-full ${item.color || 'bg-orange-500'}`}
                          style={{ width: `${item.percent}%` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(model.title)}
                  className="w-full py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-950 text-slate-900 font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Request Plan Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
