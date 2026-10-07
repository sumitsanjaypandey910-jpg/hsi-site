export interface ProductSubcategory {
  id: string;
  name: string;
  tags: string[];
  description: string;
  keyHighlights: string[];
  targetAudience: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'mutual_funds' | 'life_insurance' | 'health_insurance' | 'general_insurance' | 'stocks' | 'bonds' | 'fractional_property' | 'loans';
  categoryLabel: string;
  iconName: string;
  shortDescription: string;
  subtypes: string[];
  detailedDescription: string;
  keyBenefits: string[];
  motto?: string;
  imageUrl?: string;
  imageFit?: 'cover' | 'contain';
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    gradient: string;
    accent: string;
  };
}

export interface InsuranceCompany {
  name: string;
  category: 'life' | 'health' | 'general';
  categoryName: string;
  logoPlaceholder: string;
  claimSettlementRatio?: string;
  speciality: string;
  highlights: string[];
}

export interface PartnerBenefit {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  perks: string[];
  badge: string;
}

export interface TrustPillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ConsultationRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  productInterest: string;
  investmentHorizon?: string;
  estimatedBudget?: string;
  notes?: string;
  timestamp: string;
}

export interface PartnerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  currentProfession: string;
  experienceYears: string;
  interests: string[];
  message: string;
  timestamp: string;
}

export interface HeroContent {
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  subtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export interface AboutContent {
  badge: string;
  mainHeading: string;
  highlightHeading: string;
  leadDescription: string;
  fiduciaryText: string;
  motto: string;
  experienceYears: string;
  aum: string;
  investorCount: string;
  insurancePartnerCount: string;
  channelPartnerCount: string;
}

export interface ServiceContentItem {
  id: string;
  title: string;
  badge: string;
  category: string;
  description: string;
  keyBenefits: string[];
}

export interface ImagesContent {
  logoUrl?: string;
  heroBannerBg?: string;
  officeBkcImg?: string;
  advisorDefaultAvatar?: string;
  certificateBadgeUrl?: string;
}

export interface ContactContent {
  address: string;
  phone: string;
  tollFree: string;
  emergencyClaims: string;
  email: string;
  advisoryEmail: string;
  careersEmail: string;
  operatingHours: string;
  whatsappNumber: string;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  quote: string;
  portfolio: string;
  city: string;
  avatarUrl?: string;
  rating?: number;
}

export interface PortfolioAllocationItem {
  label: string;
  percent: number;
  color?: string;
}

export interface PortfolioModelItem {
  id: string;
  title: string;
  badge: string;
  horizon: string;
  targetReturn: string;
  riskLevel: string;
  description: string;
  allocation: PortfolioAllocationItem[];
  idealFor: string;
  imageUrl?: string;
}

export interface PortfolioContent {
  badge: string;
  title: string;
  subtitle: string;
  models: PortfolioModelItem[];
}

export interface FooterContent {
  companyName: string;
  tagline: string;
  aboutText: string;
  amfiRegNumber?: string;
  irdaiLicenseNumber?: string;
  copyrightText: string;
  disclaimer: string;
  complianceNote: string;
}

