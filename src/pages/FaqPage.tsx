import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Building2,
  FileText
} from 'lucide-react';

interface FaqPageProps {
  onOpenConsultation: (topic?: string) => void;
  onOpenChatBot?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenConsultation, onOpenChatBot }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const comprehensiveFaqs = [
    {
      id: "faq-1",
      category: "general",
      categoryLabel: "Getting Started & Trust",
      question: "How does Horizon Secure Investments (HSI) operate with regulatory bodies?",
      answer: "Horizon Secure Investments operates in strict compliance with applicable regulatory frameworks in India. All client investments, folios, and policies are held directly under your name with the respective regulated fund houses and insurance underwriters, ensuring maximum institutional safety and investor protection."
    },
    {
      id: "faq-2",
      category: "general",
      categoryLabel: "Getting Started & Trust",
      question: "Are your advisory consultations and portfolio reviews free of cost?",
      answer: "Yes. Our initial 45-minute comprehensive financial health audit, risk profiling, and second-opinion portfolio review are 100% complimentary with zero obligation. As an institutional distributor, we earn regulated distributor commissions directly from the asset management companies and insurers when you invest, ensuring no out-of-pocket advisory fees for our retail and HNI clients."
    },
    {
      id: "faq-3",
      category: "mutual_funds",
      categoryLabel: "Mutual Funds & SIP",
      question: "What is the difference between an SIP and a Lumpsum investment?",
      answer: "A Systematic Investment Plan (SIP) allows you to invest a fixed sum (starting from ₹500/month) at regular intervals (monthly or quarterly). It takes advantage of 'Rupee Cost Averaging' by buying more units when market prices drop and fewer when they rise, shielding you from timing the market. A Lumpsum investment deploys a single capital amount all at once, which works best when market valuations are attractive or when invested via a Systematic Transfer Plan (STP) through a liquid debt fund."
    },
    {
      id: "faq-4",
      category: "mutual_funds",
      categoryLabel: "Mutual Funds & SIP",
      question: "How are capital gains taxed on equity and debt mutual funds in India?",
      answer: "For Equity-oriented mutual funds held for over 12 months, Long-Term Capital Gains (LTCG) above ₹1.25 Lakhs per financial year are taxed at 12.5% (effective post-Union Budget 2024 revisions). Short-Term Capital Gains (STCG, held <12 months) are taxed at 20%. For Debt mutual funds invested on or after April 1, 2023, gains are added to your taxable income and taxed at your applicable slab rate, which is why we often recommend arbitrage or conservative hybrid funds as tax-efficient alternatives."
    },
    {
      id: "faq-5",
      category: "insurance",
      categoryLabel: "Life & Health Insurance",
      question: "How much Term Life Insurance cover should I ideally purchase?",
      answer: "Under standard actuarial Human Life Value (HLV) guidelines, your term insurance sum assured should be at least 15 to 20 times your current annual take-home income, plus an amount equal to all outstanding liabilities (home loan, business debts) and future milestone expenses (e.g. higher education for children). For example, if you earn ₹15 Lakhs/year with a ₹50 Lakh home loan, an ideal term cover is between ₹2.5 Crores and ₹3 Crores."
    },
    {
      id: "faq-6",
      category: "insurance",
      categoryLabel: "Life & Health Insurance",
      question: "Why do I need a personal health insurance policy if my employer already provides Group Mediclaim?",
      answer: "Corporate Group Medical Insurance (GMC) has significant vulnerabilities: 1) It ceases immediately the day you change jobs, get laid off, or retire; 2) Corporate covers typically have modest limits (₹3 Lakhs to ₹5 Lakhs) with stringent room-rent caps and co-pay clauses; 3) If you develop a pre-existing condition later in life, securing an individual retail policy becomes difficult or expensive. Having a personal 1-Crore Super Health Cover guarantees uninterrupted lifetime renewability."
    },
    {
      id: "faq-7",
      category: "alternative",
      categoryLabel: "Fractional Real Estate & Bonds",
      question: "What is Fractional Real Estate and how do I earn returns from it?",
      answer: "Fractional Commercial Real Estate (CRE) allows individual investors to pool capital (typically starting at ₹10 Lakhs to ₹25 Lakhs) to co-own Grade-A commercial office buildings, IT parks, or logistics warehouses leased to blue-chip multinational tenants. You receive monthly rental income deposited directly into your bank account (yielding 8% to 10% annually), plus proportional capital appreciation (14% to 16% targeted IRR) when the property appreciates or is sold after a 5 to 7-year holding period."
    },
    {
      id: "faq-8",
      category: "alternative",
      categoryLabel: "Fractional Real Estate & Bonds",
      question: "What are RBI Sovereign Gold Bonds (SGB) and what are their benefits over physical gold?",
      answer: "Sovereign Gold Bonds are government securities issued by the Reserve Bank of India on behalf of the Government of India. Key benefits include: 1) You earn an additional 2.50% annual interest on the issue price paid semi-annually; 2) Zero making charges, zero storage risk, and zero GST; 3) 100% tax exemption on capital gains upon maturity after 8 years; 4) Sovereign credit safety with no risk of default."
    },
    {
      id: "faq-9",
      category: "taxation",
      categoryLabel: "Taxation & Compliance",
      question: "How can I maximize tax savings under Sections 80C, 80D, and 54EC?",
      answer: "Under Section 80C, you can deduct up to ₹1,50,000 using ELSS mutual funds (highest historical return and lowest 3-year lock-in), term insurance premiums, and PPF. Under Section 80D, you can claim an additional ₹25,000 for self/family health insurance and up to ₹50,000 for senior citizen parents (total ₹75,000). For real estate capital gains, Section 54EC permits investing up to ₹50 Lakhs in REC/PFC bonds to save 20% LTCG tax without purchasing another residential property."
    },
    {
      id: "faq-10",
      category: "general",
      categoryLabel: "Getting Started & Trust",
      question: "How do I monitor my investments after onboarding with Horizon Secure Investments?",
      answer: "You receive access to an institutional multi-asset dashboard where all your mutual fund folios, insurance policies, fractional real estate certificates, and bond holdings are consolidated in real time. Additionally, our dedicated relationship managers provide quarterly performance statements, tax-pack summaries for annual filing, and scheduled portfolio rebalancing check-ins."
    }
  ];

  const filteredFaqs = useMemo(() => {
    return comprehensiveFaqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) || 
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const triggerChat = () => {
    if (onOpenChatBot) {
      onOpenChatBot();
      return;
    }
    const chatBtn = document.getElementById('chatTriggerBtn');
    if (chatBtn) {
      chatBtn.click();
    } else {
      const windowEl = document.getElementById('chatWindow');
      if (windowEl) windowEl.classList.remove('hidden');
    }
  };

  return (
    <div className="bg-white">
      
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071325] via-[#0b1c36] to-[#0a192f] text-white py-16 md:py-24 border-b-2 border-orange-500">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300/90 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ & Knowledge Base</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Transparent Wealth Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Financial Questions</span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Objective, straightforward answers regarding mutual funds, insurance covers, fractional real estate, and tax optimization strategies.
            </p>

            {/* Live Search Input Bar */}
            <div className="mt-8 max-w-xl relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. SIP, 80C, Mediclaim, CRE, Bonds)..."
                className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium text-xs sm:text-sm border-2 border-orange-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="w-5 h-5 text-orange-600 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-bold scrollbar-none">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'Getting Started & Trust' },
              { id: 'mutual_funds', label: 'Mutual Funds & SIP' },
              { id: 'insurance', label: 'Life & Health Insurance' },
              { id: 'alternative', label: 'Fractional CRE & Gold' },
              { id: 'taxation', label: 'Tax Planning (80C & 54EC)' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0a192f] text-orange-400 border-2 border-orange-500 font-black shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border-2 border-slate-200 text-center space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 font-heading">
                No matching questions found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Couldn't find an answer for "{searchQuery}"? Ask our AI Financial Advisor directly or contact a live consultant.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={triggerChat}
                  className="px-4 py-2 rounded-xl bg-orange-100 text-orange-950 border border-orange-400 font-black text-xs cursor-pointer"
                >
                  Ask Horizon AI Advisor &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl transition-all duration-200 border-2 ${
                      isExpanded
                        ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-300/30'
                        : 'bg-white border-slate-200/80 hover:border-orange-300'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="space-y-1">
                        <span className="text-[10.5px] font-bold text-orange-600 uppercase tracking-wider block">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`p-1.5 rounded-full bg-slate-100 text-slate-700 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180 bg-orange-100 text-orange-900' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-medium">
                        <p>{faq.answer}</p>
                        
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <span className="text-slate-400 text-[11px]">Was this helpful?</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={triggerChat}
                              className="px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-900 text-[11px] font-bold border border-orange-200 cursor-pointer"
                            >
                              ✨ Ask AI for more detail
                            </button>
                            <button
                              onClick={() => onOpenConsultation(faq.question)}
                              className="px-3 py-1 rounded-lg bg-[#0a192f] hover:bg-slate-800 text-orange-300 text-[11px] font-bold cursor-pointer"
                            >
                              Consult An Advisor &rarr;
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Still Have Questions Box */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-400/10 to-orange-500/10 border-2 border-orange-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-black uppercase tracking-wider text-[#0a192f] font-heading">
                Need Specific Numbers for Your Portfolio?
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                Have an Unanswered Question?
              </h3>
              <p className="text-xs text-slate-600 max-w-md">
                Our team responds to queries in under 30 minutes during business hours. Call, WhatsApp, or connect with our AI Advisor.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={triggerChat}
                className="px-4 py-2.5 rounded-xl bg-white text-slate-950 border-2 border-orange-400 font-black text-xs hover:bg-orange-50 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>✨ Ask AI Advisor</span>
              </button>
              <button
                onClick={() => onOpenConsultation('General Query from FAQ')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                Talk to an Advisor
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
