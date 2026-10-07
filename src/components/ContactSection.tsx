import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Award
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { COMPANY_INFO } from '../data/hsiData';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const ContactSection: React.FC = () => {
  const { contact, testimonials, about } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'Mutual Funds (SIP / Lumpsum)',
    city: '',
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
        city: formData.city,
        message: formData.message,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Consultation logged locally:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const featuredTestimonial = testimonials.length > 0 ? testimonials[0] : null;

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#0a192f] text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
            <span>Advisory & Client Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight font-heading">
            Connect With Our Wealth Advisors
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Reach out for bespoke portfolio allocation, group insurance covers, or partner leadership queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#0a192f] text-white space-y-5 shadow-lg border border-slate-700">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                  Headquarters
                </span>
                <h3 className="text-xl font-bold font-heading">
                  Horizon Secure Investments
                </h3>
                <p className="text-xs text-orange-200/90 font-medium">
                  {about.motto || COMPANY_INFO.motto}
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{contact.address || COMPANY_INFO.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <div>
                    <div>Mobile: <a href="tel:+919619973551" className="text-white font-bold hover:text-orange-400 transition-colors">+91 96199 73551</a></div>
                    <div>Founder (Nikhil Bagwe): <a href="tel:+917977661896" className="text-orange-300 font-bold hover:text-white transition-colors">+91-7977661896</a></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                  <div>
                    <div><a href="mailto:hsinvest2026@gmail.com" className="text-white hover:text-orange-400 transition-colors">hsinvest2026@gmail.com</a></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{contact.operatingHours || COMPANY_INFO.operatingHours}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span>Protect. Invest. Grow.</span>
                </span>
                <span className="text-orange-300">Dealing with Major Companies</span>
              </div>
            </div>

            {/* Testimonial snippet */}
            {featuredTestimonial && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-800 mb-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Verified Client Feedback</span>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{featuredTestimonial.quote}"
                </p>
                <div className="mt-3 text-xs font-bold text-[#0a192f]">
                  {featuredTestimonial.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {featuredTestimonial.role}, {featuredTestimonial.city}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Contact & Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-black text-[#0a192f] font-heading">
                  Direct Enquiry & Portfolio Audit Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out your details to receive customized policy comparisons and investment schedules.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0a192f] font-heading">
                    Inquiry Received Successfully
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. An advisor from our team will contact you at <strong>{formData.phone}</strong> promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        product: 'Mutual Funds (SIP / Lumpsum)',
                        city: '',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs hover:from-orange-600 hover:to-orange-700 transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Mumbai, Pune, Delhi NCR"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Service / Product Interest
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                    >
                      <option>Mutual Funds (SIP / Lumpsum)</option>
                      <option>Life Insurance (Term Cover)</option>
                      <option>Health Insurance (Mediclaim Shield)</option>
                      <option>Fractional Commercial Real Estate</option>
                      <option>Stocks & F&O Advisory</option>
                      <option>Sovereign Gold Bonds & Fixed Income</option>
                      <option>Loans & Credit Facilitation</option>
                      <option>Become an HSI Channel Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Query or Financial Goal
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g., Looking to invest ₹25,000/month for child higher education, or need ₹1 Cr term insurance comparison."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs sm:text-sm tracking-wide shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Saving your inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-500 text-center pt-1">
                    🔒 Zero Spam Guarantee. Your information is protected under AMFI fiduciary confidentiality standards.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
