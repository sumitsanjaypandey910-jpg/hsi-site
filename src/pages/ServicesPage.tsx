import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Building2, 
  CandlestickChart, 
  Award, 
  BadgeIndianRupee, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  HeartHandshake, 
  FileText, 
  Percent, 
  Lock, 
  Coins 
} from 'lucide-react';
import { PRODUCTS } from '../data/hsiData';
import { ProductItem } from '../types';
import { useSiteContent } from '../context/SiteContentContext';

interface ServicesPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const { services: dynamicServices } = useSiteContent();
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

  const detailedServices = [
    {
      id: "mutual-funds",
      title: "Mutual Funds & SIP Wealth Planning",
      category: "wealth",
      badge: "Wealth Creation & Compounding",
      icon: TrendingUp,
      iconColor: "text-blue-600 bg-blue-100",
      description: "Build long-term generational wealth, beat inflation, and achieve major life milestones with professionally managed equity, hybrid, and debt mutual funds.",
      subtypes: [
        { name: "SIP (Systematic Investment Plan)", desc: "Invest a fixed amount monthly (starting ₹500) to harness rupee cost averaging and power of compounding." },
        { name: "Lumpsum Deployment", desc: "Deploy surplus capital into balanced advantage or dynamic asset allocation funds based on market valuation." },
        { name: "SWP (Systematic Withdrawal Plan)", desc: "Generate predictable, tax-advantaged monthly income streams ideal for retirees and second-income seekers." },
        { name: "STP (Systematic Transfer Plan)", desc: "Park funds in liquid debt funds and systematically transfer into equities during market corrections." },
        { name: "ELSS Tax Saver", desc: "Save up to ₹46,800 in taxes under Section 80C with the shortest 3-year lock-in period among all 80C options." }
      ],
      keyBenefits: [
        "Curated fund baskets based on Sharpe ratio and alpha generation",
        "Direct folios held safely with SEBI-regulated AMCs and depositories",
        "Quarterly portfolio rebalancing and tax-loss harvesting guidance",
        "Goal-aligned tracking for child education, marriage, and retirement"
      ]
    },
    {
      id: "insurance",
      title: "Comprehensive Life & Term Protection",
      category: "insurance",
      badge: "Pure Family Safety Shield",
      icon: Shield,
      iconColor: "text-emerald-600 bg-emerald-100",
      description: "Safeguard your family against life's greatest uncertainties with high-cover, low-cost pure term plans and tailored savings solutions from 25+ certified insurance tie-ups.",
      subtypes: [
        { name: "Pure Term Life Insurance", desc: "Get ₹1 Crore to ₹10 Crore life cover at affordable annual premiums to replace family income." },
        { name: "Critical Illness Rider", desc: "Lump sum payout on diagnosis of 36+ major illnesses like cancer or heart bypass to protect savings." },
        { name: "Return of Premium (ROP)", desc: "100% of all paid premiums refunded at maturity if the policyholder survives the term." },
        { name: "Guaranteed Savings & Annuity", desc: "Lock in fixed, tax-free annual returns and lifetime pension annuities backed by top insurers." }
      ],
      keyBenefits: [
        "Partnered with all major regulated life and health insurance companies",
        "Average Claim Settlement Ratio (CSR) of our partners exceeds 99.1%",
        "Dedicated in-house claim settlement assistance team for family support",
        "Tax benefits under Section 80C and Section 10(10D)"
      ]
    },
    {
      id: "health",
      title: "Family Health & Mediclaim Advisory",
      category: "insurance",
      badge: "Medical Emergency Shield",
      icon: Shield,
      iconColor: "text-rose-600 bg-rose-100",
      description: "Never compromise on medical care. Access cashless treatments across 10,000+ top-tier hospitals in India with comprehensive individual and family floater health covers.",
      subtypes: [
        { name: "1-Crore Super Health Cover", desc: "High-sum-insured policies designed to absorb escalating medical inflation and organ transplants." },
        { name: "Family Floater Mediclaim", desc: "Single policy protecting self, spouse, and children with shared sum insured and maternity perks." },
        { name: "Senior Citizen Health Care", desc: "Specialized coverage for parents aged 60+ with reduced waiting periods and pre-existing cover." },
        { name: "Corporate Group Health (GMC)", desc: "Custom employee health insurance, accident covers (GPA), and cashless OPD cards for business owners." }
      ],
      keyBenefits: [
        "10,000+ cashless network hospitals across India",
        "Zero room rent sub-limits and comprehensive pre & post-hospitalization cover",
        "Tax deduction up to ₹75,000 under Section 80D for self and parents",
        "24/7 emergency claim facilitation team on speed dial"
      ]
    },
    {
      id: "real-estate",
      title: "Fractional Commercial Real Estate (CRE)",
      category: "alternative",
      badge: "High-Yield Passive Income",
      icon: Building2,
      iconColor: "text-purple-600 bg-purple-100",
      description: "Co-own premium Grade-A IT parks, commercial bank towers, and Grade-A logistics warehouses with blue-chip MNC tenants and institutional lease security.",
      subtypes: [
        { name: "Pre-Leased Commercial Offices", desc: "Leased to Fortune 500 corporations with 9-year lock-ins and 15% rent escalations every 3 years." },
        { name: "Grade-A Logistics & Warehousing", desc: "High-demand fulfillment hubs leased to major e-commerce and 3PL supply chain giants." },
        { name: "Fractional Ownership SPVs", desc: "Regulated Special Purpose Vehicles with physical land registration and deed allotment." }
      ],
      keyBenefits: [
        "8.0% to 10.0% in-hand annual rental yield deposited directly into your bank account monthly",
        "13.5% to 16.0% targeted Internal Rate of Return (IRR) with capital appreciation",
        "Accessible entry tickets (₹10L - ₹25L) compared to ₹20+ Crores for full commercial buildings",
        "Complete property management, tenant maintenance, and legal diligence handled"
      ]
    },
    {
      id: "bonds",
      title: "Sovereign Gold Bonds & Fixed Income",
      category: "fixed_income",
      badge: "Sovereign Safety & Capital Gains",
      icon: Coins,
      iconColor: "text-amber-600 bg-amber-100",
      description: "Eliminate equity volatility with government-backed debt instruments, RBI gold bonds, and capital gains tax saving bonds.",
      subtypes: [
        { name: "RBI Sovereign Gold Bonds (SGB)", desc: "Earn 2.50% annual interest on gold value plus 100% tax-free capital gains on 8-year maturity." },
        { name: "Section 54EC Capital Gains Bonds", desc: "Save 20% LTCG tax on sale of immovable property by investing in REC, PFC, or NHAI bonds." },
        { name: "AAA Rated Corporate Fixed Deposits", desc: "Lock in 8.25% - 8.85% interest with leading non-banking financial corporations and Bajaj Finance." },
        { name: "Non-Convertible Debentures (NCDs)", desc: "Listed high-coupon debt instruments offering steady quarterly or annual cashflow." }
      ],
      keyBenefits: [
        "100% sovereign safety on RBI & Public Sector Undertaking (PSU) bonds",
        "Tax exemption on gold capital gains (unlike physical jewellery with making charges)",
        "Zero deduction of TDS on select capital gains bonds",
        "Predictable cashflow for retirees and family trusts"
      ]
    },
    {
      id: "loans",
      title: "Institutional Credit & Loan Solutions",
      category: "loans",
      badge: "Lowest Interest Financing",
      icon: HeartHandshake,
      iconColor: "text-indigo-600 bg-indigo-100",
      description: "Partnering with leading banks and HFCs to secure the lowest possible borrowing rates, rapid sanctions, and minimal documentation.",
      subtypes: [
        { name: "Home Loans (Starting 8.40%)", desc: "New purchase, resale, plot construction, and balance transfer with top private and PSU banks." },
        { name: "Loan Against Property (LAP)", desc: "Unlock liquidity from residential or commercial real estate for business expansion or child education." },
        { name: "Loan Against Securities (LAS)", desc: "Get instant overdraft limits against mutual funds and shares without liquidating your investments." },
        { name: "SME & Working Capital Loans", desc: "Unsecured business loans, machinery financing, and overdraft facilities for growing enterprises." }
      ],
      keyBenefits: [
        "Direct tie-ups with HDFC Bank, ICICI Bank, SBI, Axis Bank, and Bajaj Finserv",
        "Doorstep document pick-up and dedicated relationship manager for fast sanction",
        "Zero foreclosure charges on floating-rate home loans",
        "Maximum loan-to-value (LTV) ratios negotiated for clients"
      ]
    }
  ];

  const mergedServices = detailedServices.map((ds) => {
    const override = dynamicServices.find((s) => s.id === ds.id);
    if (override) {
      return {
        ...ds,
        title: override.title,
        badge: override.badge,
        description: override.description,
        keyBenefits: override.keyBenefits && override.keyBenefits.length > 0 ? override.keyBenefits : ds.keyBenefits
      };
    }
    return ds;
  });

  const filteredServices = selectedVertical === 'all'
    ? mergedServices
    : mergedServices.filter(s => s.category === selectedVertical);

  return (
    <div className="bg-white">
      
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071325] via-[#0b1c36] to-[#0a192f] text-white py-16 md:py-24 border-b-2 border-orange-500">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300/90 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Advisory Services</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Multi-Asset Wealth & Risk Advisory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              Institutional Advisory for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Every Financial Horizon</span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              From monthly ₹500 SIPs to ₹50 Crore corporate treasury allocations, Horizon Secure Investments curates research-backed solutions across 6 core financial disciplines.
            </p>

            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenConsultation('Comprehensive Advisory Overview')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Schedule Free Portfolio Consultation
              </button>
              <Link
                to="/portfolio"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
              >
                View Model Portfolios &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
            <span className="text-slate-400 uppercase text-[11px] mr-2 shrink-0">Filter By Domain:</span>
            {[
              { id: 'all', label: 'All Services (6)' },
              { id: 'wealth', label: 'Mutual Funds & Wealth' },
              { id: 'insurance', label: 'Life & Health Cover' },
              { id: 'alternative', label: 'Fractional Real Estate' },
              { id: 'fixed_income', label: 'Bonds & Gold' },
              { id: 'loans', label: 'Loans & Credit' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedVertical(tab.id)}
                className={`px-3 py-1.5 rounded-xl shrink-0 transition-all cursor-pointer ${
                  selectedVertical === tab.id
                    ? 'bg-[#0a192f] text-orange-400 border-2 border-orange-500 font-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detailed Cards */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                id={service.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-orange-400 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${service.iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-orange-100 text-orange-950 text-[11px] font-black uppercase tracking-wide">
                        {service.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => onOpenConsultation(service.title)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Plan This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sub-Offerings Grid */}
                <div className="mt-6">
                  <h3 className="text-xs font-black uppercase tracking-wider text-orange-900 mb-3">
                    Key Offerings & Solutions Under This Vertical:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {service.subtypes.map((sub, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-orange-300 hover:bg-white transition-colors"
                      >
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                          <span>{sub.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {sub.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {service.keyBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* The HSI 4-Step Advisory Process */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a192f] text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Scientific Approach</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Our 4-Step Wealth Engineering Process
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Every client portfolio undergoes a disciplined actuarial and financial planning lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Financial Health Audit",
                desc: "We analyze existing cashflows, insurance coverages, outstanding debts, and tax brackets to uncover hidden vulnerabilities."
              },
              {
                step: "02",
                title: "Risk & Horizon Profiling",
                desc: "Quantify your risk tolerance and match capital buckets to specific lifecycle horizons (0-3 yrs, 3-7 yrs, 7+ yrs)."
              },
              {
                step: "03",
                title: "Strategic Asset Allocation",
                desc: "Deploy curated mutual fund baskets, fractional real estate yields, and pure insurance shields with zero conflict of interest."
              },
              {
                step: "04",
                title: "Continuous Rebalancing",
                desc: "Regular quarterly audits, harvest tax losses, and rebalance between equity and debt when market valuations hit extremes."
              }
            ].map((p, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-orange-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-orange-600 font-heading mb-3">
                    {p.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-medium">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-orange-800">
                  Step {i + 1} of 4
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
            Need Guidance on the Best Product Combination?
          </h2>
          <p className="text-xs sm:text-sm font-semibold max-w-xl mx-auto text-slate-300">
            Our experienced wealth advisors evaluate your current portfolio free of cost. Get an objective, independent second opinion.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation('Comprehensive Asset Advisory')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              Request Free Portfolio Audit &rarr;
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
