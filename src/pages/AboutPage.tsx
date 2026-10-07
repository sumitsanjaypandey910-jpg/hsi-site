import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  Target,
  Eye,
  HeartHandshake,
  Layers,
  Award,
  Clock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';
import { HsiLogo } from '../components/HsiLogo';

interface AboutPageProps {
  onOpenConsultation: (product?: string) => void;
  onOpenPartnerModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenConsultation,
  onOpenPartnerModal,
}) => {
  return (
    <div className="bg-white">
      
      {/* Page Header / Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071325] via-[#0b1c36] to-[#0a192f] text-white py-16 md:py-24 border-b-2 border-orange-500">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300/90 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Financial Services & Wealth Solutions Firm</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Horizon Secure Investments</span>
            </h1>

            <p className="mt-4 text-orange-400 font-bold text-lg sm:text-xl font-heading">
              Building Financial Confidence. Protecting What Matters. Creating Long-Term Opportunities.
            </p>

            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Horizon Secure Investments (HSI) is a financial services and wealth solutions firm committed to helping individuals, families and businesses make informed decisions about their protection, investments and financial future.
            </p>

            {/* Quick Contact Ribbon */}
            <div className="mt-6 pt-6 border-t border-slate-700/60 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a
                href="tel:+919619973551"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: +91 96199 73551</span>
              </a>
              <a
                href={`https://wa.me/91${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
              >
                <span>WhatsApp: {COMPANY_INFO.whatsappNumber}</span>
              </a>
              <span className="text-slate-400">Mulund - West, Mumbai</span>
            </div>

          </div>
        </div>
      </section>

      {/* Firm Overview Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-orange-600" />
                <span>One Integrated Platform</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading leading-tight">
                Comprehensive Protection + Investment + Financial Planning
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We bring together solutions across <strong>Life Insurance, Health Insurance, General Insurance, Mutual Funds, Stock Markets, Bonds, Gold, ETFs, Forex and Financial Planning</strong>, giving our clients access to a broad range of financial products and solutions under one platform.
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                At HSI, we believe that financial planning is not simply about investing money. It is about understanding where you are today, identifying where you want to go and creating a disciplined financial approach to help you work towards your goals.
              </p>

              <div className="p-6 rounded-2xl bg-white border-2 border-orange-300 shadow-sm space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-800 font-heading">
                  Our Fundamental Ethos
                </div>
                <p className="text-sm font-semibold text-slate-800 italic">
                  "Clarity, transparency, diversification and long-term relationships rather than a one-size-fits-all approach."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-[#071325] text-white space-y-5 border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Horizon Secure Investments</h3>
                    <p className="text-xs text-orange-300">Protect. Invest. Grow.</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    <span>Life, Health & General Insurance Solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    <span>Mutual Funds, Stock Markets & Bonds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    <span>Gold, ETFs, Forex & Alternate Assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    <span>Disciplined Lifecycle Financial Planning</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenConsultation()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Request Free Financial Consultation
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span>Tailored Process</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Our Approach
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every individual and business has different financial priorities. Some may be looking for family protection and insurance, while others may be focused on wealth creation, retirement planning, children's future, regular income or portfolio diversification.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-6">
              <h3 className="text-lg font-black text-[#0a192f] font-heading">
                Our approach begins with understanding the client's:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Financial Goals", desc: "Short, medium and long-term milestones for you and your family." },
                  { title: "Current Financial Position", desc: "Assets, liabilities, cashflows and existing portfolio balance." },
                  { title: "Investment Horizon", desc: "Duration of investment aligned with liquidity needs." },
                  { title: "Protection Requirements", desc: "Adequate life, health and general insurance coverage." },
                  { title: "Risk Considerations", desc: "Risk tolerance and appropriate asset class volatility tolerance." },
                  { title: "Liquidity Requirements", desc: "Emergency reserves and immediate capital access." },
                  { title: "Long-term Priorities", desc: "Retirement security, wealth preservation and generational legacy." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Based on these considerations, we help clients understand different financial solutions and make informed decisions. We believe in clarity, transparency, diversification and long-term relationships rather than a one-size-fits-all approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Leadership Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-orange-600" />
              <span>Executive Management</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Our Leadership
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Experienced leaders combining financial expertise, entrepreneurial vision, and market discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Nikhil Bagwe */}
            <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-orange-400 transition-all shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black flex items-center justify-center text-2xl shadow-md font-heading">
                      NB
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-heading">
                        Nikhil Bagwe
                      </h3>
                      <div className="text-sm font-bold text-orange-600">
                        Founder
                      </div>
                    </div>
                  </div>
                  
                  {/* Direct Contact Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+917977661896"
                      className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-colors"
                      title="Direct Phone Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:hsinvest2026@gmail.com"
                      className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-colors"
                      title="Direct Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors font-bold text-xs"
                      title="Social Profile on X"
                    >
                      X
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 mb-4">
                  <div><strong>Phone:</strong> <a href="tel:+917977661896" className="text-orange-600 font-bold hover:underline">+91-7977661896</a></div>
                  <div><strong>Email:</strong> <a href="mailto:hsinvest2026@gmail.com" className="text-orange-600 font-bold hover:underline">hsinvest2026@gmail.com</a></div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Nikhil Bagwe is an experienced financial services professional and successful entrepreneur with exposure to various segments of the financial industry.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                  He has worked with reputed organizations including <strong>Bajaj Life Insurance Co., Reliance Nippon Life Insurance Co., Bajaj Allianz General Insurance Co., Cholamandalam GIC and Policybazaar</strong>, gaining experience across insurance and financial services.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                  Since 2018, Nikhil has been actively involved in Mutual Funds, Stock Markets and Bonds, developing practical exposure to investment products and market dynamics.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                  At Horizon Secure Investments, he focuses on business development, client relationships, financial solutions and long-term wealth-oriented strategies. His experience across insurance and investment products enables HSI to take a broader view of clients' financial requirements.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Founder • Horizon Secure Investments</span>
                <span className="font-bold text-orange-600">Client Solutions & Growth</span>
              </div>
            </div>

            {/* Sumegh Shejwal */}
            <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-orange-400 transition-all shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0a192f] to-blue-900 text-white font-black flex items-center justify-center text-2xl shadow-md font-heading">
                      SS
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-heading">
                        Sumegh Shejwal
                      </h3>
                      <div className="text-sm font-bold text-orange-600">
                        Co-Founder
                      </div>
                    </div>
                  </div>
                  
                  {/* Direct Contact Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href="mailto:hsinvest2026@gmail.com"
                      className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-colors"
                      title="Direct Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 mb-4">
                  <div><strong>Email:</strong> <a href="mailto:hsinvest2026@gmail.com" className="text-orange-600 font-bold hover:underline">hsinvest2026@gmail.com</a></div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Sumegh Shejwal is a successful entrepreneur and businessman with experience in the manufacturing sector and exposure to import and export businesses.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                  His entrepreneurial background has provided him with valuable experience in business operations, commercial decision-making and market dynamics.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                  He is also actively involved in <strong>Forex, Gold, ETFs, Mutual Funds and Stock Market investments</strong>. Sumegh follows market movements through charts, price movements and technical analysis, studying market trends and patterns to better understand market behaviour.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                  At Horizon Secure Investments, he contributes his entrepreneurial experience, business perspective and market-oriented approach to the firm's growth and development.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Co-Founder • Horizon Secure Investments</span>
                <span className="font-bold text-orange-600">Market Dynamics & Strategy</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Strength Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-orange-600" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Our Strength
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-orange-400 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Diverse Financial Experience</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our leadership combines experience across insurance, investments, entrepreneurship and financial markets, allowing HSI to approach financial requirements from multiple perspectives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-orange-400 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Comprehensive Solutions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                HSI brings together protection and investment solutions under one platform, covering insurance, investments and financial planning.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-orange-400 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Target className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Client-Centric Thinking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We understand that every client has different financial circumstances and goals. Our focus is on helping clients understand available options and their associated risks before making decisions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-orange-400 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Long-Term Perspective</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe meaningful financial progress is generally built over time through discipline, appropriate diversification, regular review and informed decision-making.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-orange-400 transition-all shadow-2xs space-y-3 md:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Relationship-Driven Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our objective is to develop long-term relationships with clients and remain a trusted financial partner through different stages of their financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-heading">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                To build a trusted and professionally driven financial services platform that helps individuals, families and businesses protect their financial interests, invest thoughtfully and work towards their long-term financial goals.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-heading">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                To provide clients with accessible, transparent and comprehensive financial solutions, supported by professional knowledge, market understanding and long-term relationship management.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              What We Believe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {[
              {
                title: "Protection comes first.",
                desc: "A strong financial plan should consider appropriate protection against life's uncertainties."
              },
              {
                title: "Investing requires discipline.",
                desc: "Long-term financial goals require patience, consistency and an understanding of risk."
              },
              {
                title: "Diversification matters.",
                desc: "Different asset classes can play different roles within a financial strategy."
              },
              {
                title: "Every client is different.",
                desc: "Financial solutions should be considered in the context of individual goals, circumstances and risk considerations."
              },
              {
                title: "Relationships matter.",
                desc: "We aim to be a long-term financial partner rather than simply a product provider."
              }
            ].map((b, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-black text-orange-600 mb-2">0{i + 1}</div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{b.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise & Registered Office */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#071325] via-[#0b1c36] to-[#071325] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Our Commitment</span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading">Our Promise</h2>
            <p className="max-w-3xl mx-auto text-xs sm:text-base text-slate-300 leading-relaxed">
              At Horizon Secure Investments, our goal is to simplify the financial journey by bringing together <strong>Protection + Investment + Planning</strong>. We strive to help our clients understand their choices, evaluate the associated risks and make informed financial decisions for their future.
            </p>
            <div className="text-xl sm:text-2xl font-black text-orange-400 tracking-wide pt-2">
              Horizon Secure Investments • Protect. Invest. Grow.
            </div>
          </div>

          {/* Registered Office Box */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700 text-left max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Office Address:</span>
            </div>
            <p className="text-sm text-slate-200 font-semibold leading-relaxed">
              {COMPANY_INFO.address}
            </p>
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div><strong>Mobile:</strong> <a href="tel:+919619973551" className="text-white hover:text-orange-400 font-bold">+91 96199 73551</a></div>
              <div><strong>WhatsApp:</strong> <span className="text-emerald-400 font-bold">{COMPANY_INFO.whatsappNumber}</span></div>
              <div><strong>Email:</strong> <a href="mailto:hsinvest2026@gmail.com" className="text-white hover:text-orange-400">hsinvest2026@gmail.com</a></div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => onOpenPartnerModal()}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-all cursor-pointer"
            >
              Partner With Us
            </button>
          </div>

          <p className="text-[11px] text-slate-400 max-w-3xl mx-auto pt-6 border-t border-slate-800">
            Insurance and investment products are subject to their respective terms, conditions, exclusions, charges and applicable regulations. Market-linked investments are subject to market risks, and returns are not guaranteed unless specifically stated by the product/provider.
          </p>

        </div>
      </section>

    </div>
  );
};
