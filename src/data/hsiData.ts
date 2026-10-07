import { ProductItem, InsuranceCompany, PartnerBenefit, TrustPillar } from '../types';

export const COMPANY_INFO = {
  name: "HORIZON SECURE INVESTMENTS",
  shortName: "HSI",
  tagline: "Protect. Invest. Grow.",
  motto: "Building Financial Confidence. Protecting What Matters. Creating Long-Term Opportunities.",
  slogan: "PROTECT. INVEST. GROW.",
  phone: "+91 96199 73551",
  whatsappNumber: "7977661896",
  email: "hsinvest2026@gmail.com",
  advisoryEmail: "hsinvest2026@gmail.com",
  careersEmail: "hsinvest2026@gmail.com",
  address: "Office No. 124, 1st Floor, Shree Shankar Niwas, LBS ROAD, Near Mulund Check Naka, Mulund - West. Mumbai 400080. India.",
  operatingHours: "Monday – Saturday: 9:30 AM – 6:30 PM",
  director: {
    name: "Nikhil Bagwe",
    role: "Founder",
    phone: "+91-7977661896",
    social: "X",
    email: "hsinvest2026@gmail.com"
  }
};

export const TRUST_PILLARS: TrustPillar[] = [
  {
    title: "EXPERT ADVICE",
    subtitle: "Experienced Financial Specialists",
    description: "Personalized portfolio guidance curated by seasoned investment advisors and wealth managers.",
    iconName: "GraduationCap"
  },
  {
    title: "TRUST & INTEGRITY",
    subtitle: "Uncompromising Ethics",
    description: "Complete transparency with zero hidden charges, objective product recommendations, and fiduciary duty.",
    iconName: "ShieldCheck"
  },
  {
    title: "CUSTOMIZED SOLUTIONS",
    subtitle: "Tailored to Your Lifecycle",
    description: "Bespoke wealth strategies crafted specifically for your risk tolerance, cash flow, and generational goals.",
    iconName: "Sliders"
  },
  {
    title: "WEALTH & PROTECTION",
    subtitle: "Growth + Comprehensive Safety",
    description: "Balanced dual-engine approach: aggressive wealth accumulation with robust family insurance shields.",
    iconName: "TrendingUp"
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "mutual-funds",
    imageUrl: "/images/products/mutual-funds.jpg",
    imageFit: "cover",
    title: "MUTUAL FUNDS",
    category: "mutual_funds",
    categoryLabel: "Wealth Creation",
    iconName: "LineChart",
    shortDescription: "Build wealth, achieve goals and secure your financial future with smart investments.",
    subtypes: ["SIP", "LUMPSUM", "SWP", "STP"],
    detailedDescription: "Harness the power of compounding with expertly selected equity, debt, and hybrid mutual funds. Whether you invest ₹500/month or large capital sums, our research-backed fund baskets ensure consistent goal-oriented growth.",
    keyBenefits: [
      "Disciplined Rupee-Cost Averaging through SIP",
      "Systematic Withdrawal Plan (SWP) for tax-friendly monthly pension",
      "Systematic Transfer Plan (STP) for risk-managed staggered deployment",
      "Curated Top-Quartile Funds across Large, Mid, Flexi, and Multi-cap",
      "Regular portfolio rebalancing with annual tax harvesting"
    ],
    colorScheme: {
      badgeBg: "bg-blue-50 text-blue-900 border-blue-200",
      badgeText: "text-blue-700",
      border: "border-blue-200",
      gradient: "from-blue-600 to-indigo-900",
      accent: "#1e40af"
    }
  },
  {
    id: "life-insurance",
    title: "LIFE INSURANCE",
    category: "life_insurance",
    categoryLabel: "Family Security",
    iconName: "Shield",
    shortDescription: "Protect your loved ones, health and future with the right insurance solutions.",
    subtypes: ["SAVINGS", "ULIP", "TULIP", "PENSION", "CHILDREN PLAN"],
    detailedDescription: "Guaranteed family security coupled with long-term capital preservation. From pure term protection with critical illness riders to wealth-multiplying ULIPs and guaranteed child education corpus planners.",
    keyBenefits: [
      "Tax savings under Section 80C & Section 10(10D)",
      "High sum assured at optimal premium rates with top life insurers",
      "TULIP (Term Unit Linked Insurance Plan) for dual protection + market upside",
      "Guaranteed lifetime pension annuities for worry-free retirement",
      "Dedicated claims concierge with 99%+ settlement partner network"
    ],
    colorScheme: {
      badgeBg: "bg-emerald-50 text-emerald-900 border-emerald-200",
      badgeText: "text-emerald-700",
      border: "border-emerald-200",
      gradient: "from-emerald-700 to-teal-950",
      accent: "#047857"
    }
  },
  {
    id: "health-insurance",
    imageUrl: "/images/products/health-insurance.jpg",
    imageFit: "contain",
    title: "HEALTH INSURANCE / MEDICLAIM",
    category: "health_insurance",
    categoryLabel: "Healthcare Shield",
    iconName: "HeartPulse",
    shortDescription: "Protect your loved ones, health and future with the right insurance solutions.",
    subtypes: ["GMC", "GPA", "SENIOR CITIZEN PLAN", "CANCER CARE"],
    detailedDescription: "Shield your family savings from soaring medical inflation. Comprehensive hospitalization, daycare procedures, organ donor expenses, and specialized critical illness shields with cashless hospital network access.",
    keyBenefits: [
      "GMC (Group Medical Cover) for corporates & MSME employees",
      "GPA (Group Personal Accident) for 24/7 worldwide accidental safety",
      "Specialized Senior Citizen plans with reduced pre-existing waiting periods",
      "Dedicated Cancer Care & Critical Illness lump-sum payout policies",
      "12,000+ cashless network hospitals across India"
    ],
    colorScheme: {
      badgeBg: "bg-cyan-50 text-cyan-900 border-cyan-200",
      badgeText: "text-cyan-700",
      border: "border-cyan-200",
      gradient: "from-cyan-700 to-blue-950",
      accent: "#0e7490"
    }
  },
  {
    id: "general-insurance",
    imageUrl: "/images/products/general-insurance.jpg",
    imageFit: "contain",
    title: "GENERAL INSURANCE",
    category: "general_insurance",
    categoryLabel: "Asset & Liability Protection",
    iconName: "Umbrella",
    shortDescription: "Comprehensive protection for your assets, business and liabilities.",
    subtypes: ["MOTOR", "FIRE", "MARINE", "WC POLICY", "DIRECTOR LIABILITY POLICY"],
    detailedDescription: "Safeguard your commercial assets, enterprise operations, logistics, vehicles, and key corporate leadership from catastrophic operational or legal risks.",
    keyBenefits: [
      "Motor Insurance: Comprehensive zero-depreciation covers for fleets & private cars",
      "Fire & Special Perils: Plant, machinery, factory, and warehouse protection",
      "Marine Transit Insurance: Inland transit, export, and import cargo coverage",
      "Workmen Compensation (WC Policy) complying with statutory employee safety",
      "Directors & Officers (D&O) Liability: Protection against executive legal claims"
    ],
    colorScheme: {
      badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
      badgeText: "text-amber-700",
      border: "border-amber-200",
      gradient: "from-amber-700 to-stone-900",
      accent: "#b45309"
    }
  },
  {
    id: "stocks",
    imageUrl: "/images/products/stocks.jpg",
    imageFit: "cover",
    title: "STOCKS & TRADING",
    category: "stocks",
    categoryLabel: "Direct Equity",
    iconName: "CandlestickChart",
    shortDescription: "Trade smart. Invest better. Grow wealth with real-time opportunities.",
    subtypes: ["NSE / BSE", "FOREX", "INTRADAY", "F&O / DERIVATIVES"],
    detailedDescription: "Direct equity execution backed by quantitative market research, deep fundamentals, and swift technology. Access India's premier exchanges with institutional-grade risk management.",
    keyBenefits: [
      "Direct trading access on NSE & BSE with competitive brokerage",
      "Hedging & income generation strategies via Futures & Options (F&O)",
      "Technical intraday research calls with disciplined stop-loss guidance",
      "Currency & Forex exposure for enterprise hedging and active traders",
      "Dedicated relationship manager and portfolio tracking software"
    ],
    colorScheme: {
      badgeBg: "bg-violet-50 text-violet-900 border-violet-200",
      badgeText: "text-violet-700",
      border: "border-violet-200",
      gradient: "from-violet-800 to-slate-950",
      accent: "#6d28d9"
    }
  },
  {
    id: "bonds",
    imageUrl: "/images/products/bonds.jpg",
    imageFit: "cover",
    title: "BONDS & FIXED INCOME",
    category: "bonds",
    categoryLabel: "Guaranteed Returns",
    iconName: "Award",
    shortDescription: "Secure your future with stable, reliable and consistent returns.",
    subtypes: [
      "GOVERNMENT BONDS",
      "SECURED BONDS",
      "TAX SAVING BONDS",
      "GOVERNMENT SOVEREIGN BONDS",
      "SAFE & GUARANTEED RETURNS"
    ],
    detailedDescription: "Capital preservation with predictable, periodic income. Ideal for conservative investors, retirees, and corporate treasuries looking for sovereign safety and higher yields than bank fixed deposits.",
    keyBenefits: [
      "Sovereign Gold Bonds (SGB) & RBI Floating Rate Savings Bonds",
      "Section 54EC Capital Gain Tax Saving Bonds (REC, PFC, IRFC)",
      "High-yield AAA & AA+ rated Senior Secured Corporate Debentures",
      "Predictable cashflow with semi-annual or annual coupon payouts",
      "Zero equity market volatility with guaranteed redemption at maturity"
    ],
    colorScheme: {
      badgeBg: "bg-yellow-50 text-yellow-900 border-yellow-200",
      badgeText: "text-yellow-800",
      border: "border-yellow-200",
      gradient: "from-yellow-700 to-neutral-950",
      accent: "#a16207"
    }
  },
  {
    id: "fraction-of-property",
    title: "FRACTION OF PROPERTY",
    category: "fractional_property",
    categoryLabel: "Alternative Real Estate",
    iconName: "Building2",
    shortDescription: "Own a fraction. Enjoy full potential. Smart way to invest in real estate.",
    subtypes: ["COMMERCIAL ASSETS", "GRADE-A WAREHOUSES", "PRE-LEASED SPACES", "HIGH RENTAL YIELD"],
    detailedDescription: "Democratizing institutional commercial real estate. Participate in pre-leased Grade-A IT parks, premium offices, and logistics hubs with small ticket sizes, enjoying quarterly rental distributions and capital appreciation.",
    keyBenefits: [
      "Entry ticket starting at affordable fractions (from ₹5-10 Lakhs)",
      "Pre-leased to blue-chip multinational tenants (MNCs)",
      "8% - 10% gross annual rental payout credited quarterly",
      "Target Internal Rate of Return (IRR) of 14% - 17% including asset appreciation",
      "Fully managed by professional asset management trustees (SEBI SM REIT framework)"
    ],
    colorScheme: {
      badgeBg: "bg-purple-50 text-purple-900 border-purple-200",
      badgeText: "text-purple-700",
      border: "border-purple-200",
      gradient: "from-purple-800 to-slate-900",
      accent: "#7e22ce"
    }
  },
  {
    id: "loans",
    title: "LOANS & CREDIT SOLUTIONS",
    category: "loans",
    categoryLabel: "Flexible Capital",
    iconName: "BadgeIndianRupee",
    shortDescription: "Flexible solutions. Fast approvals. Your goals, our support.",
    subtypes: [
      "HOME LOAN (FRESH / BALANCE TRANSFER)",
      "PERSONAL LOAN",
      "BUSINESS LOAN",
      "LOAN AGAINST PROPERTY (LAP)",
      "WORKING CAPITAL",
      "LOAN AGAINST SHARES (LAS)",
      "TERM LOAN",
      "PROJECT LOAN"
    ],
    detailedDescription: "Tailored debt financing for individuals, entrepreneurs, and corporations. We partner with top banks and NBFCs to secure the lowest interest rates, minimal paperwork, and quick turnaround.",
    keyBenefits: [
      "Home Loans: Lowest interest rates with seamless balance transfer options",
      "Loan Against Property (LAP) for high-ticket business expansion",
      "Working Capital limits (Cash Credit / Overdraft) for uninterrupted trade",
      "Loan Against Shares & Mutual Funds (LAS) without liquidating your investments",
      "Project Loans & Term Debt structuring for manufacturing & infrastructure"
    ],
    colorScheme: {
      badgeBg: "bg-rose-50 text-rose-900 border-rose-200",
      badgeText: "text-rose-700",
      border: "border-rose-200",
      gradient: "from-rose-800 to-zinc-950",
      accent: "#be123c"
    }
  }
];

export const INSURANCE_PARTNERS: InsuranceCompany[] = [
  // Life Insurance
  {
    name: "Major Life Insurance Companies",
    category: "life",
    categoryName: "Life Insurance",
    logoPlaceholder: "Major Life Insurers",
    claimSettlementRatio: "99%+",
    speciality: "Pure Term, Savings & Guaranteed Income",
    highlights: ["High Sum Assured Term Covers", "Guaranteed Pension Annuities", "Comprehensive Critical Illness Riders"]
  },
  {
    name: "Major Term & Savings Insurers",
    category: "life",
    categoryName: "Life Insurance",
    logoPlaceholder: "Leading Life Partners",
    claimSettlementRatio: "98.8%+",
    speciality: "ULIP, TULIP & Wealth Accumulation",
    highlights: ["Tax-Efficient Wealth Creation", "Child Higher Education Funds", "Digital Claim Concierge"]
  },
  {
    name: "Major Retirement & Annuity Insurers",
    category: "life",
    categoryName: "Life Insurance",
    logoPlaceholder: "Retirement Partners",
    claimSettlementRatio: "99.2%+",
    speciality: "Lifelong Guaranteed Pension",
    highlights: ["Return of Purchase Price Options", "Joint Life Protection", "Immediate & Deferred Annuities"]
  },

  // Health Insurance
  {
    name: "Major Health Insurance Companies",
    category: "health",
    categoryName: "Health Insurance",
    logoPlaceholder: "Major Health Insurers",
    claimSettlementRatio: "95%+",
    speciality: "1-Crore Comprehensive Family Mediclaim",
    highlights: ["12,000+ Cashless Network Hospitals", "Zero Room Rent Restrictions", "No Claim Bonus Multiplier"]
  },
  {
    name: "Major Corporate & Group Health Insurers",
    category: "health",
    categoryName: "Health Insurance",
    logoPlaceholder: "Group Mediclaim",
    claimSettlementRatio: "97%+",
    speciality: "GMC & GPA for MSMEs and Enterprises",
    highlights: ["Pre-existing Disease Cover Day 1", "Maternity & Infant Protection", "24/7 Cashless Approvals"]
  },
  {
    name: "Major Critical Illness & Senior Care Insurers",
    category: "health",
    categoryName: "Health Insurance",
    logoPlaceholder: "Senior & Critical Care",
    claimSettlementRatio: "94%+",
    speciality: "Cardiac, Cancer & Senior Citizen Shields",
    highlights: ["Lump-Sum Critical Payouts", "Reduced Waiting Periods", "Global Emergency Medical Assistance"]
  },

  // General Insurance
  {
    name: "Major General Insurance Companies",
    category: "general",
    categoryName: "General Insurance",
    logoPlaceholder: "Major General Insurers",
    speciality: "Commercial Assets, Plant & Machinery",
    highlights: ["Standard Fire & Special Perils", "Industrial All Risk (IAR)", "Business Interruption Loss Cover"]
  },
  {
    name: "Major Corporate Liability Insurers",
    category: "general",
    categoryName: "General Insurance",
    logoPlaceholder: "Liability Partners",
    speciality: "Directors & Officers (D&O) & WC Policies",
    highlights: ["Statutory Workmen Compensation", "Professional Indemnity Covers", "Cyber Crime & Data Breach Liability"]
  },
  {
    name: "Major Motor & Marine Logistics Insurers",
    category: "general",
    categoryName: "General Insurance",
    logoPlaceholder: "Transit & Fleet Insurers",
    speciality: "Commercial Fleets & Inland/Export Cargo",
    highlights: ["Zero-Depreciation Fleet Covers", "Door-to-Door Marine Transit", "Rapid On-Site Survey & Claim Support"]
  }
];

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    step: 1,
    title: "PARTNER / LEADERSHIP ROLE",
    subtitle: "Purely a Partner Basis / Leadership Role",
    description: "Take command of your career as an equity-style business associate. You are not an employee — you operate as an entrepreneurial leader with full access to HSI's brand, licensed infrastructure, and institutional contracts.",
    perks: [
      "Leadership autonomy with no arbitrary sales targets",
      "Full institutional backing with major financial and insurance institutions",
      "Executive mentorship from top financial leaders and fund managers",
      "Access to proprietary wealth CRM and digital customer onboarding tools"
    ],
    badge: "Leadership Track"
  },
  {
    step: 2,
    title: "REVENUE GENERATION",
    subtitle: "Revenue Generation / PASSIVE Income",
    description: "Monetize an exhaustive catalog of financial products. Earn upfront revenues across Life, Health, General Insurance, Stocks, Bonds, Property fractions, and Loans from day one.",
    perks: [
      "Multiple revenue engines under one single code",
      "High commission slabs with transparent monthly settlement",
      "Cross-selling privileges across the entire HSI product basket",
      "Zero product manufacturing cost or underwriting hassle"
    ],
    badge: "Instant & High Cashflow"
  },
  {
    step: 3,
    title: "TRAIL INCOME",
    subtitle: "Trail Income for Long Term HORIZON",
    description: "Build an enduring generational financial annuity. Unlike one-time transaction fees, mutual funds and assets under advisory generate compound trail revenue month after month, year after year.",
    perks: [
      "Evergreen recurring trail commission as client AUM grows",
      "Compounding passive revenue that outlives individual transactions",
      "Valuable transferable business equity that you own",
      "Freedom to scale your wealth without linearly trading time"
    ],
    badge: "Long-Term Wealth"
  },
  {
    step: 4,
    title: "COMPANY CONTESTS",
    subtitle: "Company Contests & High-Voltage Rewards",
    description: "Participate in thrilling seasonal business challenges, sprint leagues, and festive contests with monetary bonuses, luxury gadgets, automobiles, and trophies.",
    perks: [
      "Quarterly & Annual Champion League trophies",
      "High-value incentives including luxury tech gadgets & motor vehicles",
      "Hall of Fame recognition in national investor summits",
      "Special fast-track bonuses for breakthrough advisory cases"
    ],
    badge: "Rewards & Fame"
  },
  {
    step: 5,
    title: "INTERNATIONAL CONVENTION",
    subtitle: "International Convention for Top Performers",
    description: "Fly across the globe with all expenses paid. Celebrate your milestones with your family in luxury 5-star resorts at world-class global financial capitals.",
    perks: [
      "All-inclusive luxury flights & 5-star hospitality",
      "Past & upcoming destinations: London, Zurich, Dubai, Singapore & Bali",
      "Exclusive networking with global asset managers and HNIs",
      "Gala dinner & red-carpet awards on an international stage"
    ],
    badge: "World Class Travel"
  }
];

export const TESTIMONIALS = [
  {
    name: "Rajesh V. Merchant",
    role: "Managing Director, Apex Logistics",
    quote: "Horizon Secure Investments handled both my corporate group health insurance and personal wealth portfolio. Their advice on balancing debt instruments with SIPs saved us substantial taxes while delivering steady 14% CAGR.",
    portfolio: "HNWI Portfolio & Group Health",
    city: "Mumbai"
  },
  {
    name: "Sunita Deshmukh",
    role: "HSI Leadership Partner since 2021",
    quote: "Transitioning to a Partner role with HSI was the turning point in my financial career. The multi-product license and trail income have enabled me to build a sustainable ₹3.5 Lakh monthly recurring revenue business.",
    portfolio: "Channel Partner Advisory",
    city: "Pune"
  },
  {
    name: "Anand K. Saxena",
    role: "Senior Consultant, Healthcare IT",
    quote: "Their fractional real estate advisory helped me invest in a Grade-A warehouse in Pune that pays a steady 9.2% annual rent directly into my bank account. Truly professional and completely transparent.",
    portfolio: "Fractional Real Estate & Bonds",
    city: "Bengaluru"
  }
];
