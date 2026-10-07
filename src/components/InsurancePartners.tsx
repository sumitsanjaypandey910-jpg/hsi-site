import React, { useState } from 'react';
import { ShieldCheck, HeartPulse, Umbrella, LifeBuoy, CheckCircle2, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { INSURANCE_PARTNERS } from '../data/hsiData';
import { InsuranceCompany } from '../types';

interface InsurancePartnersProps {
  onQuoteRequest: (companyName: string) => void;
}

export const InsurancePartners: React.FC<InsurancePartnersProps> = ({ onQuoteRequest }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'life' | 'health' | 'general'>('all');

  const lifeCompanies = INSURANCE_PARTNERS.filter((c) => c.category === 'life');
  const healthCompanies = INSURANCE_PARTNERS.filter((c) => c.category === 'health');
  const generalCompanies = INSURANCE_PARTNERS.filter((c) => c.category === 'general');

  return (
    <section id="insurance-partners" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header from Brochure Page 4 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a192f] text-orange-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Institutional Industry Alliances</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight font-heading">
            NATURE OF WORK
          </h2>
          <p className="mt-2 text-base sm:text-lg font-bold text-orange-600">
            Dealing with all Major Insurance Companies
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            We work in partnership with India's major and leading insurance companies across Life, Health, and General Insurance. We compare policies across major providers to guarantee optimal coverage, transparent terms, and maximum claim support for your family and business.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#0a192f] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Major Insurers
            </button>
            <button
              onClick={() => setActiveCategory('life')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'life'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Life Insurance
            </button>
            <button
              onClick={() => setActiveCategory('health')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'health'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Health Insurance
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'general'
                  ? 'bg-[#0a192f] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              General Insurance
            </button>
          </div>
        </div>

        {/* 3-Column Nature of Work Grid (Direct mapping of Page 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMN 1: LIFE INSURANCE */}
          {(activeCategory === 'all' || activeCategory === 'life') && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#0a192f] text-white p-5 flex items-center justify-between border-b-2 border-orange-500">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black tracking-wide font-heading">
                        LIFE INSURANCE
                      </h3>
                      <p className="text-[11px] text-blue-200">Term, ULIP, Savings & Pension</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-900/80 px-2 py-0.5 rounded text-blue-200 font-semibold">
                    Major Companies
                  </span>
                </div>

                <div className="p-4 divide-y divide-slate-100">
                  {lifeCompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {company.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {company.speciality} {company.claimSettlementRatio ? `• CSR: ${company.claimSettlementRatio}` : ''}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onQuoteRequest(`${company.name} (Life Insurance)`)}
                        className="text-[11px] font-bold text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => onQuoteRequest('Life Insurance Comparison with Major Companies')}
                  className="w-full py-2.5 rounded-lg bg-[#0a192f] text-white text-xs font-bold hover:bg-[#162f56] transition-colors cursor-pointer"
                >
                  Compare Plans Across Major Companies
                </button>
              </div>
            </div>
          )}

          {/* COLUMN 2: HEALTH INSURANCE */}
          {(activeCategory === 'all' || activeCategory === 'health') && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#0a192f] text-white p-5 flex items-center justify-between border-b-2 border-emerald-500">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black tracking-wide font-heading">
                        HEALTH INSURANCE
                      </h3>
                      <p className="text-[11px] text-emerald-200">Mediclaim, GMC, GPA & Senior Care</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-200 font-semibold">
                    Major Companies
                  </span>
                </div>

                <div className="p-4 divide-y divide-slate-100">
                  {healthCompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-900 transition-colors">
                            {company.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {company.speciality} {company.claimSettlementRatio ? `• CSR: ${company.claimSettlementRatio}` : ''}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onQuoteRequest(`${company.name} (Health Insurance)`)}
                        className="text-[11px] font-bold text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => onQuoteRequest('Health Insurance Cashless Comparison')}
                  className="w-full py-2.5 rounded-lg bg-[#0a192f] text-white text-xs font-bold hover:bg-[#162f56] transition-colors cursor-pointer"
                >
                  Cashless Networks Across Major Companies
                </button>
              </div>
            </div>
          )}

          {/* COLUMN 3: GENERAL INSURANCE */}
          {(activeCategory === 'all' || activeCategory === 'general') && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#0a192f] text-white p-5 flex items-center justify-between border-b-2 border-orange-500">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                      <Umbrella className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black tracking-wide font-heading">
                        GENERAL INSURANCE
                      </h3>
                      <p className="text-[11px] text-orange-200">Motor, Fire, Marine, WC & D&O</p>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-orange-200 font-semibold">
                    Major Companies
                  </span>
                </div>

                <div className="p-4 divide-y divide-slate-100">
                  {generalCompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {company.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {company.speciality}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onQuoteRequest(`${company.name} (General Insurance)`)}
                        className="text-[11px] font-bold text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => onQuoteRequest('Commercial & Liability Insurance')}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Protect Business & Commercial Assets with Major Insurers
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Claim Assistance Guarantee Bar */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0a192f] font-heading">
                Dedicated 24/7 Claim Concierge Desk
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                When an emergency strikes, you never stand alone against the insurance company. Horizon Secure Investments provides on-ground hospital coordination, documentation assistance, and rapid claim settlement advocacy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:18002098899"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"
            >
              <PhoneCall className="w-4 h-4 text-orange-600" />
              <span>Claims Helpline: 1800 209 8899</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
