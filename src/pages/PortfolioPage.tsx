import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Briefcase, 
  FileText, 
  Award,
  Users
} from 'lucide-react';
import { useSiteContent, DEFAULT_PORTFOLIO } from '../context/SiteContentContext';

interface PortfolioPageProps {
  onOpenConsultation: (portfolioName?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenConsultation }) => {
  const { portfolio } = useSiteContent();
  const [selectedModel, setSelectedModel] = useState<number>(1);

  const modelPortfolios = portfolio?.models && portfolio.models.length > 0 
    ? portfolio.models 
    : DEFAULT_PORTFOLIO.models;

  const current = modelPortfolios[Math.min(selectedModel, modelPortfolios.length - 1)] || modelPortfolios[0];


  const caseStudies = [
    {
      title: "Retirement at 52 with ₹1.50 Lakh/Month SWP",
      client: "Senior IT VP (Bengaluru)",
      startingCorpus: "₹3.20 Crores",
      solution: "Structured a balanced advantage fund portfolio paired with 2 pre-leased commercial real estate units. Enabled monthly tax-efficient SWP payouts while allowing the core capital to grow by 9.4% annualized.",
      outcome: "Consistent monthly cashflow without touching principal capital for 6 years."
    },
    {
      title: "Funding Child's Overseas Medical Degree",
      client: "Doctor Couple (Pune)",
      startingCorpus: "₹45,000/month Step-up SIP",
      solution: "Designed an aggressive 10-year step-up SIP across Flexi-cap and Small-cap funds, alongside an emergency health cover shield to prevent medical emergencies from depleting education funds.",
      outcome: "Accumulated ₹84.5 Lakhs target corpus on schedule for university admission."
    },
    {
      title: "NRI Capital Gains & Real Estate Diversification",
      client: "NRI Tech Director (Dubai / Mumbai)",
      startingCorpus: "₹2.80 Crores (Property Sale Proceeds)",
      solution: "Invested ₹50 Lakhs in Section 54EC REC/PFC bonds saving ₹10 Lakhs in long-term capital gains tax, and deployed the remainder into Grade-A pre-leased commercial office spaces yielding 8.9% net.",
      outcome: "Saved ₹10L in immediate taxes and secured ₹1.70 Lakh/month passive rental income."
    }
  ];

  return (
    <div className="bg-white">
      
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071325] via-[#0b1c36] to-[#0a192f] text-white py-16 md:py-24 border-b-2 border-orange-500">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300/90 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Model Portfolios</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Asset Allocation Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              Institutional Portfolios Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Resilience & Yield</span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              We do not pick random stocks or chase hot tips. Every HSI model portfolio follows Nobel Prize-winning Modern Portfolio Theory (MPT) to optimize risk-adjusted returns.
            </p>

            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenConsultation('Model Portfolio Strategy Discussion')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Request Custom Asset Allocation Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Model Portfolio Explorer */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Explore Our 4 Signature Allocation Models
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Click any model below to inspect its targeted returns, risk grade, and asset distribution.
            </p>
          </div>

          {/* Model Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {modelPortfolios.map((model, idx) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(idx)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer border-2 ${
                  selectedModel === idx
                    ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-300/50'
                    : 'bg-white/70 border-slate-200 hover:border-orange-300 hover:bg-white'
                }`}
              >
                <div className="text-[10.5px] font-bold text-orange-600 uppercase tracking-wider mb-1">
                  Model {idx + 1}
                </div>
                <div className="text-xs font-black text-slate-900 font-heading leading-tight">
                  {model.title}
                </div>
                <div className="mt-2 text-[11px] font-bold text-slate-500">
                  Target: <span className="text-orange-600 font-extrabold">{model.targetReturn}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Model Showcase Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-orange-100 text-orange-950 text-xs font-black">
                  {current.badge}
                </div>

                <h3 className="text-2xl font-black text-slate-900 font-heading">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {current.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Target Return</div>
                    <div className="text-xs sm:text-sm font-black text-orange-600 font-heading mt-0.5">
                      {current.targetReturn}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Ideal Horizon</div>
                    <div className="text-xs sm:text-sm font-black text-slate-800 font-heading mt-0.5">
                      {current.horizon}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Risk Profile</div>
                    <div className="text-xs sm:text-sm font-black text-slate-800 font-heading mt-0.5">
                      {current.riskLevel}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong>Ideal For:</strong> {current.idealFor}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenConsultation(current.title)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-xs hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Deploy This Portfolio Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Asset Allocation Breakdown */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0a192f] font-heading">
                    Asset Distribution
                  </h4>
                  <span className="text-xs font-bold text-slate-500">100% Total</span>
                </div>

                {/* Visual Multi-Segment Bar */}
                <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
                  {current.allocation.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${item.color} h-full transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                      title={`${item.label}: ${item.percent}%`}
                    />
                  ))}
                </div>

                {/* Legend List */}
                <div className="space-y-2.5 pt-2">
                  {current.allocation.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                        <span className="font-semibold text-slate-700">{item.label}</span>
                      </div>
                      <span className="font-black text-slate-900 font-heading">{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Historical Benchmarks 15-Year Asset Returns */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Historical Long-Term Evidence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              15-Year Asset Class Comparison (India)
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              Why a diversified multi-asset allocation beats single-asset concentration over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase">Equities (Nifty 50 TRI)</div>
              <div className="text-2xl font-black text-emerald-600 font-heading mt-1">~13.8% CAGR</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Highest wealth compounder, beats inflation by ~7-8%, but requires absorbing short-term market corrections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50/70 border-2 border-orange-300">
              <div className="text-xs font-bold text-orange-800 uppercase">Sovereign Gold (RBI SGB)</div>
              <div className="text-2xl font-black text-orange-600 font-heading mt-1">~11.2% CAGR</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Unmatched geopolitical crisis hedge + 2.50% annual interest payout and 100% tax-free maturity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <div className="text-xs font-bold text-slate-700 uppercase">Fractional Commercial CRE</div>
              <div className="text-2xl font-black text-[#0a192f] font-heading mt-1">~14.5% IRR</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                8-10% direct monthly rental payouts plus periodic capital appreciation on Grade-A tenant lease renewal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <div className="text-xs font-bold text-slate-700 uppercase">Fixed Deposits & Debt Funds</div>
              <div className="text-2xl font-black text-[#0a192f] font-heading mt-1">~6.8% CAGR</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Guaranteed nominal capital safety, but barely breaks even against real inflation and post-tax erosion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Life Client Case Studies */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Client Case Studies
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              Real-world portfolio engineering executed for our investors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-orange-400 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-[10.5px] font-bold text-orange-600 uppercase tracking-widest">
                    Case Study 0{idx + 1}
                  </div>
                  <h3 className="text-base font-black text-slate-900 font-heading leading-snug">
                    {study.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-slate-500 pb-2 border-b border-slate-100">
                    Client Profile: {study.client} • Initial: <span className="text-orange-800 font-bold">{study.startingCorpus}</span>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong>Strategy Implemented:</strong> {study.solution}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="text-[10px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Realized Outcome:</span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold mt-1 leading-snug">
                    {study.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-gradient-to-r from-[#071325] via-[#0b1c36] to-[#0a192f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black font-heading">
            Get a Second Opinion on Your Current Investments
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Upload or share your existing mutual fund and insurance folios for a free mathematical risk-overlap and fee-leakage audit.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation('Comprehensive Portfolio Audit')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              Book Portfolio Audit Session
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
