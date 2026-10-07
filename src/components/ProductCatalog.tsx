import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Shield, 
  HeartPulse, 
  Umbrella, 
  CandlestickChart, 
  Award, 
  Building2, 
  BadgeIndianRupee, 
  Search, 
  ArrowRight, 
  Check, 
  Sparkles,
  Info,
  Layers,
  Phone,
  MessageCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { PRODUCTS, COMPANY_INFO } from '../data/hsiData';
import { ProductItem } from '../types';

interface ProductCatalogProps {
  onSelectProduct: (productName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
  const [activeSection, setActiveSection] = useState<'all' | 'section1' | 'section2' | 'section3'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductItem | null>(null);

  const getCategoryIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'LineChart': return <TrendingUp className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Umbrella': return <Umbrella className={className} />;
      case 'CandlestickChart': return <CandlestickChart className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'BadgeIndianRupee': return <BadgeIndianRupee className={className} />;
      default: return <TrendingUp className={className} />;
    }
  };

  // Section 1: Protection & Insurance Solutions (Life, Health, General)
  const section1Products = useMemo(() => {
    return PRODUCTS.filter(p => ['life_insurance', 'health_insurance', 'general_insurance'].includes(p.category));
  }, []);

  // Section 2: Wealth Creation & Investments (Mutual Funds, Stocks/Gold, Bonds)
  const section2Products = useMemo(() => {
    return PRODUCTS.filter(p => ['mutual_funds', 'stocks', 'bonds'].includes(p.category));
  }, []);

  // Section 3: Strategic Wealth & Alternative Solutions (Fractional Property, Loans, and Comprehensive Advisory)
  const section3Products = useMemo(() => {
    return PRODUCTS.filter(p => ['fractional_property', 'loans'].includes(p.category));
  }, []);

  const filterList = (list: ProductItem[]) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;
    return list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q) ||
      item.subtypes.some(sub => sub.toLowerCase().includes(q)) ||
      item.keyBenefits.some(b => b.toLowerCase().includes(q))
    );
  };

  const renderProductCard = (product: ProductItem) => (
    <div
      key={product.id}
      className="flex flex-col justify-between bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs hover:border-orange-400 hover:shadow-md transition-all group"
    >
      <div>
        {product.imageUrl && (
          <div className="-mx-6 -mt-6 mb-5 h-44 overflow-hidden rounded-t-2xl bg-white border-b border-slate-100">
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
            />
          </div>
        )}
        {/* Card Top: Icon & Category Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0a192f] text-orange-400 flex items-center justify-center shadow-xs">
            {getCategoryIcon(product.iconName, "w-6 h-6")}
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${product.colorScheme.badgeBg}`}>
            {product.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-black text-[#0a192f] tracking-wide font-heading">
          {product.title}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed italic">
          "{product.shortDescription}"
        </p>

        {/* Subtypes / Badges */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Available Offerings:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.subtypes.map((sub, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-[11px] font-bold text-slate-800 transition-colors"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Key Benefits List */}
        <div className="mt-4 space-y-1.5 text-xs text-slate-700">
          {product.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
            <div key={bIdx} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => setSelectedProductDetail(product)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Details</span>
        </button>

        <button
          onClick={() => onSelectProduct(product.title)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          <span>Enquire</span>
          <ArrowRight className="w-3.5 h-3.5 text-orange-200" />
        </button>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>HSI Comprehensive Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight font-heading">
            Our Financial Products & Solutions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Organized into three dedicated advisory sections: Family Protection & Insurance, Wealth Creation & Capital Markets, and Strategic Portfolio Solutions.
          </p>
          <p className="mt-1 text-xs font-semibold text-orange-600">
            Partnered with Major Companies across India
          </p>
        </div>

        {/* 3-Section Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          
          {/* Section Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'all'
                  ? 'bg-[#0a192f] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All 3 Sections
            </button>
            <button
              onClick={() => setActiveSection('section1')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'section1'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Section 1: Insurance Solutions
            </button>
            <button
              onClick={() => setActiveSection('section2')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'section2'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Section 2: Wealth & Investments
            </button>
            <button
              onClick={() => setActiveSection('section3')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'section3'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Section 3: Portfolio & Alternatives
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products (SIP, Health, Bonds...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

        </div>

        {/* SECTION 1: Insurance Solutions */}
        {(activeSection === 'all' || activeSection === 'section1') && (
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-blue-200">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-900 uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Section 1</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] font-heading mt-0.5">
                  Protection & Insurance Solutions
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Life Insurance, Health Insurance and General Insurance with major companies
                </p>
              </div>
              <div className="mt-2 sm:mt-0 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 self-start sm:self-auto">
                Dealing with Major Insurance Companies
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterList(section1Products).map(renderProductCard)}
            </div>
          </div>
        )}

        {/* SECTION 2: Wealth & Investment Solutions */}
        {(activeSection === 'all' || activeSection === 'section2') && (
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-emerald-200">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Section 2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] font-heading mt-0.5">
                  Wealth & Capital Market Investments
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Mutual Funds (SIP / Lumpsum / SWP), Stock Markets, Gold & Sovereign Bonds
                </p>
              </div>
              <div className="mt-2 sm:mt-0 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
                Goal-Oriented Compounding
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterList(section2Products).map(renderProductCard)}
            </div>
          </div>
        )}

        {/* SECTION 3: Strategic Portfolio & Alternative Solutions */}
        {(activeSection === 'all' || activeSection === 'section3') && (
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-orange-200">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-900 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Section 3</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] font-heading mt-0.5">
                  HSI Comprehensive Portfolio & Strategic Solutions
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Lifecycle Asset Allocation, Fractional Commercial Real Estate & Institutional Credit
                </p>
              </div>
              <div className="mt-2 sm:mt-0 text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-900 border border-orange-200 self-start sm:self-auto">
                Bespoke Wealth Architecture
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Comprehensive Portfolio Advisory Card */}
              <div className="flex flex-col justify-between bg-gradient-to-b from-[#071325] to-[#0a192f] text-white rounded-2xl border-2 border-slate-700 p-6 shadow-md group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      Signature Advisory
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-white font-heading">
                    HSI COMPREHENSIVE PORTFOLIO
                  </h4>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    "Bringing together Protection + Investment + Financial Planning across Mutual Funds, Insurance, Stocks, Bonds, Gold and Alternate Assets under one disciplined strategy."
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Customized to your financial goals and risk profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Disciplined asset allocation & regular portfolio review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Dedicated relationship-driven support</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <a
                    href="tel:+919619973551"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Advisor</span>
                  </a>
                  <button
                    onClick={() => onSelectProduct("HSI Comprehensive Portfolio")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>Request Audit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-200" />
                  </button>
                </div>
              </div>

              {filterList(section3Products).map(renderProductCard)}
            </div>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProductDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedProductDetail.imageUrl && (
              <div className="mb-5 h-48 overflow-hidden rounded-2xl bg-white border border-slate-200">
                <img
                  src={selectedProductDetail.imageUrl}
                  alt={selectedProductDetail.title}
                  className={`w-full h-full ${selectedProductDetail.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                />
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0a192f] text-orange-400 flex items-center justify-center font-bold">
                {getCategoryIcon(selectedProductDetail.iconName, "w-6 h-6")}
              </div>
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${selectedProductDetail.colorScheme.badgeBg}`}>
                  {selectedProductDetail.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] font-heading mt-1">
                  {selectedProductDetail.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
              {selectedProductDetail.detailedDescription}
            </p>

            <div className="mb-6">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                Key Advantages & Features:
              </div>
              <div className="space-y-2">
                {selectedProductDetail.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <a
                href="tel:+919619973551"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-orange-600"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>+91 96199 73551</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProductDetail(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const prodName = selectedProductDetail.title;
                    setSelectedProductDetail(null);
                    onSelectProduct(prodName);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs shadow-md"
                >
                  Enquire for {selectedProductDetail.title} &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
