import React, { useState } from 'react';
import { Award, Save, Edit3, CheckCircle2, RotateCcw, Building2, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import { AboutContent } from '../../types';
import { ImageUploadField } from '../ImageUploadField';

interface AdminAboutSectionProps {
  initialData: AboutContent;
  onSave: (data: AboutContent) => Promise<void>;
  isSaving: boolean;
}

export const AdminAboutSection: React.FC<AdminAboutSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [data, setData] = useState<AboutContent>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetForm = () => {
    setData(initialData);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-800">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                About & Company Heritage
              </h2>
              <p className="text-xs text-slate-500">
                Update institutional credentials, fiduciary philosophy, firm metrics (AUM, clients), and Mumbai BKC headquarters photo.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isEditing 
                ? 'bg-orange-100 text-orange-900 border border-orange-300' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Editing Active' : 'Toggle Edit Mode'}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save to Firestore'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>About section saved to Firestore and updated on the live website!</span>
        </div>
      )}

      {/* Metrics Highlights Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
          Key Institutional Metrics (Live on Site)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
            <span className="text-base font-black text-slate-900 font-heading">{data.experienceYears || '15+'} Years</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Assets Managed</span>
            <span className="text-base font-black text-orange-600 font-heading">{data.aum || '₹1,850 Cr+'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Families</span>
            <span className="text-base font-black text-slate-900 font-heading">{data.investorCount || '18,500+'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Insurance Tie-ups</span>
            <span className="text-base font-black text-slate-900 font-heading">{data.insurancePartnerCount || '25+'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Partners</span>
            <span className="text-base font-black text-slate-900 font-heading">{data.channelPartnerCount || '500+'}</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Top Badge Text
            </label>
            <input
              type="text"
              value={data.badge || ''}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              placeholder="e.g. Financial Services & Wealth Solutions Firm"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Corporate Motto / Slogan
            </label>
            <input
              type="text"
              value={data.motto || ''}
              onChange={(e) => setData({ ...data, motto: e.target.value })}
              placeholder="e.g. Preserving Capital, Growing Legacies"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Main Heading
            </label>
            <input
              type="text"
              value={data.mainHeading || ''}
              onChange={(e) => setData({ ...data, mainHeading: e.target.value })}
              placeholder="e.g. Preserving & Multiplying"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Highlight Heading (Orange Accent)
            </label>
            <input
              type="text"
              value={data.highlightHeading || ''}
              onChange={(e) => setData({ ...data, highlightHeading: e.target.value })}
              placeholder="e.g. Generational Wealth"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold text-orange-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Lead Heritage Description
            </label>
            <textarea
              rows={3}
              value={data.leadDescription || ''}
              onChange={(e) => setData({ ...data, leadDescription: e.target.value })}
              placeholder="Headquartered in Mumbai's Bandra-Kurla Complex (BKC)..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Fiduciary Integrity Declaration
            </label>
            <textarea
              rows={3}
              value={data.fiduciaryText || ''}
              onChange={(e) => setData({ ...data, fiduciaryText: e.target.value })}
              placeholder="We maintain zero conflict of interest. Your investment folios remain directly in your own name..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {/* Metric input fields */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Experience Years
            </label>
            <input
              type="text"
              value={data.experienceYears || ''}
              onChange={(e) => setData({ ...data, experienceYears: e.target.value })}
              placeholder="15+"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Assets Under Advisory (AUM)
            </label>
            <input
              type="text"
              value={data.aum || ''}
              onChange={(e) => setData({ ...data, aum: e.target.value })}
              placeholder="₹1,850 Cr+"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Investor & Family Count
            </label>
            <input
              type="text"
              value={data.investorCount || ''}
              onChange={(e) => setData({ ...data, investorCount: e.target.value })}
              placeholder="18,500+"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Insurance Institutional Tie-ups
            </label>
            <input
              type="text"
              value={data.insurancePartnerCount || ''}
              onChange={(e) => setData({ ...data, insurancePartnerCount: e.target.value })}
              placeholder="25+"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <ImageUploadField
              label="BKC Headquarters / Team Photo (Uploaded to Firebase Storage)"
              value={data.officePhoto || ''}
              onChange={(url) => setData({ ...data, officePhoto: url })}
              folder="about_images"
              helperText="Upload an exterior or interior photograph of the BKC Mumbai office."
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetForm}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revert Unsaved Changes</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#071220] hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Changes...' : 'Save About Section'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
