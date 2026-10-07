import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  HeroContent, 
  AboutContent, 
  ServiceContentItem, 
  ImagesContent, 
  ContactContent, 
  TestimonialItem,
  PortfolioContent,
  FooterContent
} from '../types';
import { COMPANY_INFO, TESTIMONIALS } from '../data/hsiData';

// Default content seed
export const DEFAULT_HERO: HeroContent = {
  badge: "Protect. Invest. Grow. • Mulund, Mumbai",
  headingPrefix: "Securing Tomorrow's",
  headingHighlight: "Wealth",
  headingSuffix: ", Today.",
  subtitle: "Comprehensive financial solutions across Mutual Funds, Insurance (Life, Health, General), Stocks, Bonds, Gold, ETFs, and Strategic Planning.",
  primaryCtaText: "Book Free Wealth Audit",
  secondaryCtaText: "Partner With Us"
};

export const DEFAULT_ABOUT: AboutContent = {
  badge: "Financial Services & Wealth Solutions Firm",
  mainHeading: "Building Financial Confidence.",
  highlightHeading: "Protecting What Matters.",
  leadDescription: "Horizon Secure Investments (HSI) is a financial services and wealth solutions firm committed to helping individuals, families and businesses make informed decisions about their protection, investments and financial future.",
  fiduciaryText: "We believe that financial planning is not simply about investing money. It is about understanding where you are today, identifying where you want to go and creating a disciplined financial approach to help you work towards your goals.",
  motto: COMPANY_INFO.motto,
  experienceYears: "",
  aum: "",
  investorCount: "",
  insurancePartnerCount: "Major Companies",
  channelPartnerCount: ""
};

export const DEFAULT_SERVICES: ServiceContentItem[] = [
  {
    id: "mutual-funds",
    title: "Mutual Funds & SIP Wealth Planning",
    badge: "Wealth Creation & Compounding",
    category: "wealth",
    description: "Build long-term generational wealth, beat inflation, and achieve major life milestones with professionally managed equity, hybrid, and debt mutual funds.",
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
    badge: "Pure Family Safety Shield",
    category: "insurance",
    description: "Safeguard your family against life's greatest uncertainties with high-cover, low-cost pure term plans and tailored savings solutions from 25+ certified insurance tie-ups.",
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
    badge: "Medical Emergency Shield",
    category: "insurance",
    description: "Never compromise on medical care. Access cashless treatments across 10,000+ top-tier hospitals in India with comprehensive individual and family floater health covers.",
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
    badge: "High-Yield Passive Income",
    category: "alternative",
    description: "Co-own premium Grade-A IT parks, commercial bank towers, and Grade-A logistics warehouses with blue-chip MNC tenants and institutional lease security.",
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
    badge: "Sovereign Safety & Capital Gains",
    category: "fixed_income",
    description: "Eliminate equity volatility with government-backed debt instruments, RBI gold bonds, and capital gains tax saving bonds.",
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
    badge: "Lowest Interest Financing",
    category: "loans",
    description: "Partnering with leading banks and HFCs to secure the lowest possible borrowing rates, rapid sanctions, and minimal documentation.",
    keyBenefits: [
      "Direct tie-ups with HDFC Bank, ICICI Bank, SBI, Axis Bank, and Bajaj Finserv",
      "Doorstep document pick-up and dedicated relationship manager for fast sanction",
      "Zero foreclosure charges on floating-rate home loans",
      "Maximum loan-to-value (LTV) ratios negotiated for clients"
    ]
  }
];

export const DEFAULT_PORTFOLIO: PortfolioContent = {
  badge: "Custom Asset Allocations",
  title: "Institutional Model Portfolios",
  subtitle: "Backtested, multi-asset diversification strategies customized for capital preservation, balanced compounding, and monthly tax-efficient cashflows.",
  models: [
    {
      id: "conservative",
      title: "Conservative Capital Preservation",
      badge: "Low Risk • Retirees & Senior Citizens",
      horizon: "2 to 5 Years",
      targetReturn: "8.5% – 9.8% p.a.",
      riskLevel: "Low",
      description: "Designed for capital safety, inflation protection, and predictable monthly liquidity. Minimal volatility with focus on AAA corporate debt and sovereign gold.",
      allocation: [
        { label: "High-Quality Debt & Liquid Funds", percent: 60, color: "bg-blue-600" },
        { label: "Large-Cap & Index Equities", percent: 20, color: "bg-emerald-600" },
        { label: "RBI Sovereign Gold Bonds (SGB)", percent: 15, color: "bg-amber-500" },
        { label: "Emergency Cash & Arbitrage", percent: 5, color: "bg-slate-500" }
      ],
      idealFor: "Retired individuals, family trusts, or capital parking before property acquisition.",
      imageUrl: ""
    },
    {
      id: "balanced",
      title: "Balanced Wealth Builder (Signature)",
      badge: "Moderate Risk • Core Flagship",
      horizon: "5 to 7+ Years",
      targetReturn: "11.5% – 13.5% p.a.",
      riskLevel: "Moderate",
      description: "Our most popular multi-asset strategy. Balances high equity compounding with debt stability and fractional real estate passive rental yields.",
      allocation: [
        { label: "Flexi-Cap & Mid-Cap Equities", percent: 50, color: "bg-emerald-600" },
        { label: "Short Duration & Corporate Debt", percent: 25, color: "bg-blue-600" },
        { label: "Fractional Commercial Real Estate", percent: 15, color: "bg-purple-600" },
        { label: "Sovereign Gold & Silver Baskets", percent: 10, color: "bg-amber-500" }
      ],
      idealFor: "Working professionals aged 30-50 building a retirement corpus or child education fund.",
      imageUrl: ""
    },
    {
      id: "aggressive",
      title: "Aggressive Alpha Compounding",
      badge: "High Growth • Long Horizon",
      horizon: "7 to 10+ Years",
      targetReturn: "14.0% – 16.5% p.a.",
      riskLevel: "High Growth",
      description: "Maximum long-term compounding. Heavily tilted toward market leaders, small-cap innovators, and high-beta thematic opportunities.",
      allocation: [
        { label: "Mid & Small-Cap Alpha Equities", percent: 50, color: "bg-emerald-600" },
        { label: "Large-Cap & Global Tech Equities", percent: 30, color: "bg-teal-600" },
        { label: "Fractional Commercial Real Estate", percent: 10, color: "bg-purple-600" },
        { label: "Tactical Liquid Cash for Dips", percent: 10, color: "bg-slate-500" }
      ],
      idealFor: "Young earners, entrepreneurs, and high-risk appetite investors with 7+ year runways.",
      imageUrl: ""
    },
    {
      id: "high_yield",
      title: "High-Yield Alternative Cashflow",
      badge: "Passive Income • Real Assets",
      horizon: "5+ Years",
      targetReturn: "9.5% – 11.5% Cashflow + Growth",
      riskLevel: "Moderate-Low",
      description: "Engineered specifically to generate consistent monthly and quarterly bank deposits without liquidating base capital.",
      allocation: [
        { label: "Pre-Leased Commercial Real Estate (CRE)", percent: 45, color: "bg-purple-600" },
        { label: "High-Coupon Senior Debt & NCDs", percent: 35, color: "bg-blue-600" },
        { label: "High-Dividend Mutual Funds & REITs", percent: 20, color: "bg-emerald-600" }
      ],
      idealFor: "HNIs seeking regular tax-smart cash payouts and NRIs diversifying Indian portfolios.",
      imageUrl: ""
    }
  ]
};

export const DEFAULT_IMAGES: ImagesContent = {
  logoUrl: "",
  heroBannerBg: "",
  officeBkcImg: "",
  advisorDefaultAvatar: "",
  certificateBadgeUrl: ""
};

export const DEFAULT_CONTACT: ContactContent = {
  address: COMPANY_INFO.address,
  phone: COMPANY_INFO.phone,
  tollFree: COMPANY_INFO.phone,
  emergencyClaims: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  advisoryEmail: COMPANY_INFO.advisoryEmail,
  careersEmail: COMPANY_INFO.careersEmail,
  operatingHours: COMPANY_INFO.operatingHours,
  whatsappNumber: "7977661896"
};

export const DEFAULT_FOOTER: FooterContent = {
  companyName: "Horizon Secure Investments",
  tagline: "Protect. Invest. Grow.",
  aboutText: "Horizon Secure Investments (HSI) is a financial services and wealth solutions firm committed to helping individuals, families and businesses make informed decisions about their protection, investments and financial future.",
  amfiRegNumber: "",
  irdaiLicenseNumber: "",
  copyrightText: "© 2026 Horizon Secure Investments. All rights reserved.",
  disclaimer: "Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. Insurance and investment products are subject to their respective terms, conditions, exclusions, charges and applicable regulations.",
  complianceNote: "Insurance and investment products are subject to their respective terms, conditions, exclusions, charges and applicable regulations. Market-linked investments are subject to market risks, and returns are not guaranteed unless specifically stated by the product/provider."
};

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = TESTIMONIALS.map((t, index) => ({
  id: `testi-${index + 1}`,
  name: t.name,
  role: t.role,
  quote: t.quote,
  portfolio: t.portfolio,
  city: t.city,
  rating: 5,
  avatarUrl: ""
}));

interface SiteContentContextType {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceContentItem[];
  portfolio: PortfolioContent;
  images: ImagesContent;
  contact: ContactContent;
  testimonials: TestimonialItem[];
  footer: FooterContent;
  loading: boolean;
  saveHero: (data: Partial<HeroContent>) => Promise<void>;
  saveAbout: (data: Partial<AboutContent>) => Promise<void>;
  saveServices: (data: ServiceContentItem[]) => Promise<void>;
  savePortfolio: (data: Partial<PortfolioContent>) => Promise<void>;
  saveImages: (data: Partial<ImagesContent>) => Promise<void>;
  saveContact: (data: Partial<ContactContent>) => Promise<void>;
  saveTestimonials: (data: TestimonialItem[]) => Promise<void>;
  saveFooter: (data: Partial<FooterContent>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO);
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT);
  const [services, setServices] = useState<ServiceContentItem[]>(DEFAULT_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioContent>(DEFAULT_PORTFOLIO);
  const [images, setImages] = useState<ImagesContent>(DEFAULT_IMAGES);
  const [contact, setContact] = useState<ContactContent>(DEFAULT_CONTACT);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [footer, setFooter] = useState<FooterContent>(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for the siteContent collection in Firestore
    const unsub = onSnapshot(
      collection(db, 'siteContent'),
      (snapshot) => {
        snapshot.forEach((docSnap) => {
          const id = docSnap.id;
          const data = docSnap.data();

          if (id === 'hero' && data) {
            setHero((prev) => ({ ...prev, ...data }));
          } else if (id === 'about' && data) {
            setAbout((prev) => ({ ...prev, ...data }));
          } else if (id === 'services' && data && Array.isArray(data.items)) {
            setServices(data.items);
          } else if (id === 'portfolio' && data) {
            setPortfolio((prev) => ({ ...prev, ...data }));
          } else if (id === 'images' && data) {
            setImages((prev) => ({ ...prev, ...data }));
          } else if (id === 'contact' && data) {
            setContact((prev) => ({ ...prev, ...data }));
          } else if (id === 'testimonials' && data && Array.isArray(data.items)) {
            setTestimonials(data.items);
          } else if (id === 'footer' && data) {
            setFooter((prev) => ({ ...prev, ...data }));
          }
        });
        setLoading(false);
      },
      (error) => {
        console.warn('Firestore real-time subscription error, using defaults:', error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const saveHero = async (data: Partial<HeroContent>) => {
    const updated = { ...hero, ...data, updatedAt: new Date().toISOString() };
    setHero(updated);
    await setDoc(doc(db, 'siteContent', 'hero'), updated, { merge: true });
  };

  const saveAbout = async (data: Partial<AboutContent>) => {
    const updated = { ...about, ...data, updatedAt: new Date().toISOString() };
    setAbout(updated);
    await setDoc(doc(db, 'siteContent', 'about'), updated, { merge: true });
  };

  const saveServices = async (items: ServiceContentItem[]) => {
    setServices(items);
    await setDoc(doc(db, 'siteContent', 'services'), { items, updatedAt: new Date().toISOString() }, { merge: true });
  };

  const savePortfolio = async (data: Partial<PortfolioContent>) => {
    const updated = { ...portfolio, ...data, updatedAt: new Date().toISOString() };
    setPortfolio(updated);
    await setDoc(doc(db, 'siteContent', 'portfolio'), updated, { merge: true });
  };

  const saveImages = async (data: Partial<ImagesContent>) => {
    const updated = { ...images, ...data, updatedAt: new Date().toISOString() };
    setImages(updated);
    await setDoc(doc(db, 'siteContent', 'images'), updated, { merge: true });
  };

  const saveContact = async (data: Partial<ContactContent>) => {
    const updated = { ...contact, ...data, updatedAt: new Date().toISOString() };
    setContact(updated);
    await setDoc(doc(db, 'siteContent', 'contact'), updated, { merge: true });
  };

  const saveTestimonials = async (items: TestimonialItem[]) => {
    setTestimonials(items);
    await setDoc(doc(db, 'siteContent', 'testimonials'), { items, updatedAt: new Date().toISOString() }, { merge: true });
  };

  const saveFooter = async (data: Partial<FooterContent>) => {
    const updated = { ...footer, ...data, updatedAt: new Date().toISOString() };
    setFooter(updated);
    await setDoc(doc(db, 'siteContent', 'footer'), updated, { merge: true });
  };

  const resetToDefaults = async () => {
    setHero(DEFAULT_HERO);
    setAbout(DEFAULT_ABOUT);
    setServices(DEFAULT_SERVICES);
    setPortfolio(DEFAULT_PORTFOLIO);
    setImages(DEFAULT_IMAGES);
    setContact(DEFAULT_CONTACT);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setFooter(DEFAULT_FOOTER);

    await Promise.all([
      setDoc(doc(db, 'siteContent', 'hero'), { ...DEFAULT_HERO, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'about'), { ...DEFAULT_ABOUT, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'services'), { items: DEFAULT_SERVICES, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'portfolio'), { ...DEFAULT_PORTFOLIO, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'images'), { ...DEFAULT_IMAGES, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'contact'), { ...DEFAULT_CONTACT, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'testimonials'), { items: DEFAULT_TESTIMONIALS, updatedAt: new Date().toISOString() }),
      setDoc(doc(db, 'siteContent', 'footer'), { ...DEFAULT_FOOTER, updatedAt: new Date().toISOString() })
    ]);
  };

  return (
    <SiteContentContext.Provider
      value={{
        hero,
        about,
        services,
        portfolio,
        images,
        contact,
        testimonials,
        footer,
        loading,
        saveHero,
        saveAbout,
        saveServices,
        savePortfolio,
        saveImages,
        saveContact,
        saveTestimonials,
        saveFooter,
        resetToDefaults
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};

