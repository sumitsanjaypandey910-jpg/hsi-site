import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  User,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'Mutual Funds (SIP / Lumpsum)',
    investmentHorizon: '5-10 Years',
    preferredTime: 'Morning (10 AM - 1 PM)',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'consultations'), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        product: formData.product,
        investmentHorizon: formData.investmentHorizon,
        preferredTime: formData.preferredTime,
        message: formData.message,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Consultation logging error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white">
      
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071325] via-[#0b1c36] to-[#0a192f] text-white py-16 md:py-24 border-b-2 border-orange-500">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300/90 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Contact Us</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Direct Advisory Desk & Client Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              Let's Discuss Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Financial Future</span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Visit our office in Mulund West, Mumbai, speak directly with our experienced advisors, or send an enquiry for a prompt callback.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="tel:+919619973551"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Us: +91 96199 73551</span>
              </a>
              <a
                href={`https://wa.me/91${COMPANY_INFO.whatsappNumber}?text=Hello%20Horizon%20Secure%20Investments%2C%20I%20would%20like%20to%20connect%20with%20an%20advisor`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-slate-950 font-black text-xs shadow-md transition-colors"
              >
                <span>💬 WhatsApp: {COMPANY_INFO.whatsappNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Office Details & Leadership Channels */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Office Address Card */}
              <div className="p-6 rounded-3xl bg-[#071325] text-white space-y-5 shadow-lg border-2 border-slate-700">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-400 font-heading">
                    Office Address:
                  </span>
                  <h2 className="text-xl font-bold font-heading">
                    Horizon Secure Investments
                  </h2>
                  <p className="text-xs text-orange-300 font-medium">
                    Protect. Invest. Grow.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {COMPANY_INFO.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{COMPANY_INFO.operatingHours} IST</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                    <div>
                      <a href="tel:+919619973551" className="font-bold text-white hover:text-orange-300 transition-colors">
                        +91 96199 73551
                      </a>
                      <span className="text-[11px] text-slate-400 block">General Inquiries & Client Advisory</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-orange-300 transition-colors truncate">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/91${COMPANY_INFO.whatsappNumber}?text=Hello%20Horizon%20Secure%20Investments%2C%20I%20would%20like%20to%20schedule%20a%20wealth%20consultation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>💬 Direct WhatsApp Advisor Chat (7977661896)</span>
                  </a>
                </div>
              </div>

              {/* Founder Details Card */}
              <div className="p-6 rounded-3xl bg-white border-2 border-orange-300 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-800 font-heading">
                    Details About Founder
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-bold text-[10px]">
                    Direct Contact
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <h3 className="text-lg font-black text-[#0a192f] font-heading">
                      Nikhil Bagwe
                    </h3>
                    <div className="text-xs font-bold text-orange-600">
                      Founder
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-500">Phone: </span>
                        <a href="tel:+917977661896" className="font-bold text-slate-900 hover:text-orange-600">
                          +91-7977661896
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-500">Email: </span>
                        <a href="mailto:hsinvest2026@gmail.com" className="font-bold text-slate-900 hover:text-orange-600">
                          hsinvest2026@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-3.5 text-center font-bold text-orange-600 text-xs">𝕏</span>
                      <div>
                        <span className="font-semibold text-slate-500">Social: </span>
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="font-bold text-slate-900 hover:underline">
                          X (Twitter)
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                    Experienced financial services professional with exposure to Bajaj Life Insurance, Reliance Nippon Life, Bajaj Allianz General Insurance, Cholamandalam GIC and Policybazaar. Active in Mutual Funds, Stocks and Bonds since 2018.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Contact & Lead Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                    <span>Advisory Intake</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0a192f] font-heading">
                    Send an Enquiry or Request a Callback
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your requirements and an advisor will connect with you promptly.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-in fade-in-50">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-emerald-950 font-heading">
                        Enquiry Received!
                      </h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Thank you, <strong>{formData.name}</strong>. An advisor specializing in <strong>{formData.product}</strong> will reach you at <strong>{formData.phone}</strong> promptly.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href="tel:+919619973551"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                      >
                        Call Directly: +91 96199 73551
                      </a>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            product: 'Mutual Funds (SIP / Lumpsum)',
                            investmentHorizon: '5-10 Years',
                            preferredTime: 'Morning (10 AM - 1 PM)',
                            message: ''
                          });
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-400 text-emerald-900 font-bold text-xs hover:bg-emerald-100 transition-colors"
                      >
                        Submit Another Query
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
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Joshi"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. ramesh@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          What Are You Looking For? *
                        </label>
                        <select
                          value={formData.product}
                          onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium bg-white"
                        >
                          <option>Mutual Funds (SIP / Lumpsum / SWP)</option>
                          <option>Life Insurance (Term / Savings / ULIP)</option>
                          <option>Health Insurance (Mediclaim / Super Top-Up)</option>
                          <option>General Insurance (Motor / Commercial / Fire)</option>
                          <option>Stocks & Gold (Direct Equity / SGB)</option>
                          <option>Bonds & Fixed Income (54EC / PSU Bonds)</option>
                          <option>HSI Comprehensive Portfolio</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Specific Questions or Current Portfolio Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. Looking to review current policies or start a monthly SIP..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Submitting Request...' : 'Confirm & Schedule Consultation'}</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-500 text-center pt-1">
                      🔒 Zero spam guarantee. We respect your privacy. All details are kept strictly confidential.
                    </p>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transit & Office Directions Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#0a192f] font-heading">
                By Road (LBS Marg)
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Located on LBS Road near Mulund Check Naka at Shree Shankar Niwas, convenient to reach from Mulund, Thane, Bhandup and Eastern Express Highway.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#0a192f] font-heading">
                By Central Railway
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Mulund Railway Station is nearby, with easy auto-rickshaw and bus connections straight to LBS Road Mulund Check Naka.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#0a192f] font-heading">
                Virtual & Phone Consultations
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We also host phone, Google Meet, and Zoom advisory sessions for pan-India and NRI clients. Call <strong>+91 96199 73551</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
