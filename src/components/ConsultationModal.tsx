import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, PhoneCall, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledProduct = '',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    product: prefilledProduct || 'Mutual Funds (SIP / Lumpsum)',
    budgetOrInvestment: '₹5,000 - ₹25,000 / month',
    timeHorizon: '5 - 10 Years',
    message: '',
  });

  // Sync if prefilledProduct changes
  React.useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#071220] text-white p-6 relative border-b-2 border-orange-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
          <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Horizon Secure Advisory Desk</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-heading">
            Request Free Advisory Session
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Plan Today. Protect Tomorrow. Prosper Always.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 font-heading">
                Advisory Request Confirmed!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your inquiry for <strong>{formData.product}</strong> has been assigned to a certified wealth manager.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Advisory Ticket ID:</span>
                  <span className="font-mono font-bold text-slate-800">
                    HSI-ADV-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Product Segment:</span>
                  <span className="font-bold text-slate-800">{formData.product}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Client Contact:</span>
                  <span className="font-bold text-slate-800">{formData.phone}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/919820012345?text=Hello%20HSI,%20I%20requested%20advisory%20for%20${encodeURIComponent(formData.product)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Patil"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Pune, Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Product / Service of Interest *
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                >
                  <option value="Mutual Funds (SIP / Lumpsum / SWP / STP)">Mutual Funds (SIP / Lumpsum / SWP / STP)</option>
                  <option value="Life Insurance (Savings / ULIP / TULIP / Pension / Child)">Life Insurance (Savings / ULIP / TULIP / Pension / Child)</option>
                  <option value="Health Insurance / Mediclaim (GMC / GPA / Senior / Cancer)">Health Insurance / Mediclaim (GMC / GPA / Senior / Cancer)</option>
                  <option value="General Insurance (Motor / Fire / Marine / WC / D&O)">General Insurance (Motor / Fire / Marine / WC / D&O)</option>
                  <option value="Stocks & Trading (NSE / BSE / F&O / Derivatives)">Stocks & Trading (NSE / BSE / F&O / Derivatives)</option>
                  <option value="Bonds (Govt / Secured / Tax Saving / Sovereign)">Bonds (Govt / Secured / Tax Saving / Sovereign)</option>
                  <option value="Fraction of Property (Commercial Real Estate)">Fraction of Property (Commercial Real Estate)</option>
                  <option value="Loans (Home / Personal / Business / LAP / LAS / Project)">Loans (Home / Personal / Business / LAP / LAS / Project)</option>
                  <option value="Complete Family Portfolio Health Check">Complete Family Portfolio Health Check</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Investment or Loan Requirement
                  </label>
                  <select
                    value={formData.budgetOrInvestment}
                    onChange={(e) => setFormData({ ...formData, budgetOrInvestment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="₹1,000 - ₹10,000 / month">₹1,000 - ₹10,000 / month</option>
                    <option value="₹10,000 - ₹50,000 / month">₹10,000 - ₹50,000 / month</option>
                    <option value="₹50,000 - ₹2,00,000 / month">₹50,000 - ₹2,00,000 / month</option>
                    <option value="₹5 Lakhs - ₹25 Lakhs (Lump)">₹5 Lakhs - ₹25 Lakhs (Lump)</option>
                    <option value="₹25 Lakhs - ₹1 Crore+ (HNI)">₹25 Lakhs - ₹1 Crore+ (HNI)</option>
                    <option value="Loan: ₹10 Lakhs - ₹50 Lakhs">Loan: ₹10 Lakhs - ₹50 Lakhs</option>
                    <option value="Loan: ₹50 Lakhs - ₹5 Crores+">Loan: ₹50 Lakhs - ₹5 Crores+</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Investment Time Horizon
                  </label>
                  <select
                    value={formData.timeHorizon}
                    onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="Short Term (1 - 3 Years)">Short Term (1 - 3 Years)</option>
                    <option value="Medium Term (3 - 5 Years)">Medium Term (3 - 5 Years)</option>
                    <option value="Long Term (5 - 10 Years)">Long Term (5 - 10 Years)</option>
                    <option value="Generational Wealth (10+ Years)">Generational Wealth (10+ Years)</option>
                    <option value="Immediate (Loan / Health Cover)">Immediate (Loan / Health Cover)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Specific Query / Existing Policies (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any existing funds or coverage you'd like us to evaluate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-md transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Free Advisory Call</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
