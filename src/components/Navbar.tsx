import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Shield, 
  TrendingUp, 
  HeartHandshake, 
  Calculator, 
  Users,
  Building2,
  HelpCircle,
  Briefcase,
  PhoneCall
} from 'lucide-react';
import { HsiLogo } from './HsiLogo';

interface NavbarProps {
  onOpenConsultation: (product?: string) => void;
  onOpenPartnerModal: () => void;
  onOpenChatBot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenConsultation, 
  onOpenPartnerModal,
  onOpenChatBot
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleOpenAi = () => {
    closeMobileMenu();
    if (onOpenChatBot) {
      onOpenChatBot();
      return;
    }
    // Check if chat trigger exists
    const chatBtn = document.getElementById('chatTriggerBtn');
    if (chatBtn) {
      chatBtn.click();
    } else {
      const windowEl = document.getElementById('chatWindow');
      if (windowEl) windowEl.classList.remove('hidden');
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all duration-200 ${
      isActive
        ? 'text-orange-600 bg-orange-50 shadow-2xs font-extrabold border border-orange-200'
        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5'
          : 'bg-white border-b border-slate-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center focus:outline-none group"
          >
            <HsiLogo variant="horizontal" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <NavLink
                to="/services"
                className={navLinkClass}
              >
                <div className="flex items-center gap-1">
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-orange-600' : ''}`} />
                </div>
              </NavLink>

              {/* Mega Dropdown */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 grid gap-1 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10.5px] font-black uppercase tracking-wider text-[#0a192f] border-b border-slate-100 flex items-center justify-between">
                    <span>Advisory Verticals (Brochure)</span>
                    <Link 
                      to="/services" 
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-orange-600 hover:underline font-bold text-[10px]"
                    >
                      View All &rarr;
                    </Link>
                  </div>
                  
                  <Link
                    to="/services#mutual-funds"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0a192f]">Mutual Funds & SIP</div>
                      <div className="text-[11px] text-slate-500 leading-snug">Wealth creation, ELSS tax saving, SWP pension cashflow</div>
                    </div>
                  </Link>

                  <Link
                    to="/services#insurance"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-800 shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0a192f]">Life & Health Protection</div>
                      <div className="text-[11px] text-slate-500 leading-snug">Term insurance, Mediclaim across 25+ insurers</div>
                    </div>
                  </Link>

                  <Link
                    to="/services#real-estate"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-800 shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0a192f]">Fractional Real Estate & Bonds</div>
                      <div className="text-[11px] text-slate-500 leading-snug">8-10% pre-leased CRE yield & RBI Sovereign Gold Bonds</div>
                    </div>
                  </Link>

                  <Link
                    to="/services#loans"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-slate-200 text-slate-800 shrink-0">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0a192f]">Institutional Loans</div>
                      <div className="text-[11px] text-slate-500 leading-snug">Home loans from 8.40%, LAP & Project Funding</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/portfolio" className={navLinkClass}>
              Portfolio
            </NavLink>

            <NavLink to="/faq" className={navLinkClass}>
              FAQ
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Phone Call */}
            <a
              href="tel:+919619973551"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 transition-colors"
              title="Call Us Now"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
              <span>+91 96199 73551</span>
            </a>

            {/* Reopen Chatbot Assistant Button */}
            <button
              onClick={handleOpenAi}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0a192f] text-xs font-extrabold border border-slate-300 shadow-2xs hover:scale-[1.02] transition-all cursor-pointer"
              title="Open Horizon Auto-Reply Assistant"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>💬 Reopen Chatbot</span>
            </button>

            {/* Free Consultation CTA */}
            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-200" />
              <span>Book Free Advisory</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 focus:outline-none cursor-pointer border border-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#0a192f]" /> : <Menu className="w-6 h-6 text-[#0a192f]" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2.5 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="flex flex-col space-y-1">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-orange-50 text-orange-600 font-black' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              🏠 Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-orange-50 text-orange-600 font-black' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              🏢 About Us & Trust Pillars
            </NavLink>

            <NavLink
              to="/services"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-orange-50 text-orange-600 font-black' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              💼 Advisory Services
            </NavLink>

            <NavLink
              to="/portfolio"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-orange-50 text-orange-600 font-black' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              📊 Model Portfolios & Asset Allocation
            </NavLink>

            <NavLink
              to="/faq"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-orange-50 text-orange-600 font-black' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              ❓ FAQ & Knowledge Base
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-orange-50 text-orange-600 font-black' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              📍 Contact Us
            </NavLink>
          </div>

          {/* Action Buttons in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="tel:+919619973551"
              className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call: +91 96199 73551</span>
            </a>

            <button
              onClick={handleOpenAi}
              className="w-full py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0a192f] font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>💬 Reopen Chatbot Assistant</span>
            </button>

            <button
              onClick={() => {
                closeMobileMenu();
                onOpenConsultation();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-200" />
              <span>Book Free Advisory Session</span>
            </button>

            <button
              onClick={() => {
                closeMobileMenu();
                onOpenPartnerModal();
              }}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-[#0a192f] font-bold text-xs bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-orange-500" />
              <span>Join as Partner / Agency Leader</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-500 font-semibold">
            <span>Mulund - West, Mumbai • Protect. Invest. Grow.</span>
          </div>
        </div>
      )}
    </header>
  );
};
