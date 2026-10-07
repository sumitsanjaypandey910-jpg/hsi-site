import React from 'react';
import { MessageCircle, PhoneCall, Sparkles, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';

interface FloatingActionsProps {
  onOpenConsultation: () => void;
  onOpenPartnerModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenConsultation,
  onOpenPartnerModal,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Quick Consultation Pill */}
      <button
        onClick={onOpenConsultation}
        className="pointer-events-auto group hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#071220] hover:bg-[#0a192f] text-white text-xs font-bold shadow-xl border border-orange-500/50 transition-all hover:scale-105 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
        <span>Free Advisory</span>
      </button>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917977661896?text=Hello%20Horizon%20Secure%20Investments%2C%20I%20would%20like%20to%20know%20more%20about%20your%20financial%20services"
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all focus:outline-none"
        aria-label="Chat on WhatsApp"
        title="Chat with HSI Advisor on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
      </a>

    </div>
  );
};
