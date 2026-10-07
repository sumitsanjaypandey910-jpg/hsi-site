import React from 'react';
import { Phone, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';

interface TopBarProps {
  onOpenConsultation: (product?: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenConsultation }) => {
  return (
    <div className="bg-[#071220] text-slate-300 text-xs py-2.5 border-b border-slate-800/90 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Side: Trust Credentials */}
        <div className="flex items-center gap-4 text-[11px] tracking-wide">
          <div className="flex items-center gap-1.5 text-orange-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            <span>Protect. Invest. Grow.</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Partnered with Major Companies</span>
          </div>
          <span className="text-slate-700 hidden md:inline">|</span>
          <div className="items-center gap-1 text-slate-400 hidden md:flex">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Mon–Sat: 9:30 AM – 6:30 PM IST</span>
          </div>
        </div>

        {/* Right Side: Quick Contact & Fast Advisory Action */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            title="Call Us"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
          </a>

          <a
            href={`https://wa.me/91${COMPANY_INFO.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            title="WhatsApp Us"
          >
            <span className="text-emerald-400 font-bold">WhatsApp: {COMPANY_INFO.whatsappNumber}</span>
          </a>

          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="hidden lg:flex items-center gap-1.5 hover:text-orange-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-slate-300">{COMPANY_INFO.email}</span>
          </a>

          <button
            onClick={() => onOpenConsultation()}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-3 py-1 rounded-md text-[11px] transition-all shadow-sm shadow-orange-950/20 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-orange-200" />
            <span>Free Portfolio Review</span>
          </button>
        </div>

      </div>
    </div>
  );
};
