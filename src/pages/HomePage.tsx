import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  PieChart, 
  HelpCircle, 
  Building2, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { TrustPillars } from '../components/TrustPillars';
import { ProductCatalog } from '../components/ProductCatalog';
import { Calculators } from '../components/Calculators';
import { InsurancePartners } from '../components/InsurancePartners';
import { PartnerBenefits } from '../components/PartnerBenefits';
import { ContactSection } from '../components/ContactSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { HomePortfolioSection } from '../components/HomePortfolioSection';
import { COMPANY_INFO } from '../data/hsiData';

interface HomePageProps {
  onOpenConsultation: (product?: string) => void;
  onOpenPartnerModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenConsultation,
  onOpenPartnerModal,
}) => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        onOpenConsultation={onOpenConsultation}
        onOpenPartnerModal={onOpenPartnerModal}
      />

      {/* 4 Core Pillars from Brochure Footer */}
      <TrustPillars />

      {/* Comprehensive Product Catalog (Brochure Pages 2 & 3) */}
      <ProductCatalog onSelectProduct={onOpenConsultation} />

      {/* Dynamic Model Portfolios from Firestore */}
      <HomePortfolioSection onOpenConsultation={onOpenConsultation} />

      {/* Financial Planning & Wealth Calculators (SIP, Lumpsum, Loan EMI) */}
      <Calculators onPlanGoal={onOpenConsultation} />

      {/* Nature of Work - 25+ Insurance Tie-Ups (Brochure Page 4) */}
      <InsurancePartners onQuoteRequest={onOpenConsultation} />

      {/* Partner's Benefits & Leadership Track (Brochure Page 5) */}
      <PartnerBenefits onApplyPartner={onOpenPartnerModal} />

      {/* Dynamic Client Testimonials from Firestore */}
      <TestimonialsSection />

      {/* Discover Deep Website Sections Banner (Smooth Bridge to Subpages) */}
      <section className="py-14 bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-orange-500/10 border-y-2 border-orange-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Explore Our Full Knowledge Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Dedicated Advisory Hubs
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Dive deeper into our institutional frameworks, model portfolios, company heritage, and common queries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Hub 1: About */}
            <Link
              to="/about"
              className="group p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-orange-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-heading group-hover:text-orange-600 transition-colors">
                  About Horizon Secure Investments
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Building Financial Confidence. Protecting What Matters. Creating Long-Term Opportunities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-orange-700 group-hover:translate-x-1 transition-transform">
                <span>Discover About Us</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>

            {/* Hub 2: Services */}
            <Link
              to="/services"
              className="group p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-orange-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#071220]/5 text-[#071220] flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-[#0a192f]" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-heading group-hover:text-orange-600 transition-colors">
                  Full Service Catalog
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  In-depth analysis of SIPs, PMS, Fractional CRE, Term Life, SGBs, and competitive loan rates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-orange-700 group-hover:translate-x-1 transition-transform">
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>

            {/* Hub 3: Portfolio */}
            <Link
              to="/portfolio"
              className="group p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-orange-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-900 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <PieChart className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-heading group-hover:text-orange-600 transition-colors">
                  Model Portfolios
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Explore asset allocation baskets, historical benchmarks, and real client financial case studies.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-orange-700 group-hover:translate-x-1 transition-transform">
                <span>Explore Portfolios</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>

            {/* Hub 4: FAQ */}
            <Link
              to="/faq"
              className="group p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-orange-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-heading group-hover:text-orange-600 transition-colors">
                  FAQ & Knowledge
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Search answers on taxation (80C, 54EC), SIP step-up compounding, and claim settlement steps.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-orange-700 group-hover:translate-x-1 transition-transform">
                <span>Browse Answers</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact & Consultation Desk */}
      <ContactSection />
    </div>
  );
};
