import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, Download, Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';

interface PartnerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerApplicationModal: React.FC<PartnerApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    currentRole: 'Insurance Advisor / Agent',
    experience: '1-3 Years',
    interests: ['Mutual Funds', 'Insurance', 'Loans'],
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const toggleInterest = (item: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(item);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== item) };
      } else {
        return { ...prev, interests: [...prev.interests, item] };
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
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
            <span>GROW WITH HORIZON</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-heading">
            Partner / Leadership Role Application
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Partner • Lead • Generate • Build a Long-Term Horizon
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 font-heading">
                Application Received Successfully!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our Senior Partner Alliances Director will review your profile and contact you within 24 business hours.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Application Reference ID:</span>
                  <span className="font-mono font-bold text-slate-800">
                    HSI-PTR-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Target Role:</span>
                  <span className="font-bold text-slate-800">Leadership Business Associate</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Registered Contact:</span>
                  <span className="font-bold text-slate-800">{formData.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/919820012345?text=Hello%20Horizon%20Secure%20Investments,%20I%20just%20submitted%20my%20Partner%20Application%20for%20${encodeURIComponent(formData.fullName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Chat with Partner Desk</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
                >
                  Close & Back to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
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
                    placeholder="advisor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City / Location *
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current Background
                  </label>
                  <select
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="Insurance Advisor / Agent">Insurance Advisor / Agent</option>
                    <option value="Mutual Fund Distributor (MFD)">Mutual Fund Distributor (MFD)</option>
                    <option value="CA / Tax Consultant / Advocate">CA / Tax Consultant / Advocate</option>
                    <option value="Banker / Loan DSA">Banker / Loan DSA</option>
                    <option value="Real Estate Consultant">Real Estate Consultant</option>
                    <option value="Corporate Professional looking for Passive Income">Corporate Professional</option>
                    <option value="Fresher / Entrepreneur">Fresher / Entrepreneur</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Industry Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="Fresher / < 1 Year">Fresher / &lt; 1 Year</option>
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5-10 Years">5 - 10 Years</option>
                    <option value="10+ Years (Senior Leader)">10+ Years (Senior Leader)</option>
                  </select>
                </div>
              </div>

              {/* Product Interests */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Products You Want to Distribute & Lead
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Mutual Funds & SIP',
                    'Life Insurance',
                    'Health & Mediclaim',
                    'General Insurance',
                    'Bonds & Fixed Income',
                    'Fraction of Property',
                    'Loans (Home/LAP/Business)',
                  ].map((p) => {
                    const isSelected = formData.interests.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => toggleInterest(p)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all ${
                          isSelected
                            ? 'bg-orange-100 text-orange-950 border-orange-400'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Brief Note or Aspiration (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your current client base or monthly goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              {/* Regulatory Assurance */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2 text-[11px] text-slate-700">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>
                  By submitting, you agree to connect with HSI Partner Desk. You will receive multi-product distribution codes and training without upfront franchise fees.
                </span>
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
                  className="px-6 py-2.5 rounded-lg bg-[#0a192f] hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-orange-400" />
                      <span>Submit Partner Application</span>
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
