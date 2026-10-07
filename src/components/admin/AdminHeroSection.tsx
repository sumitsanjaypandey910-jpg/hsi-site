import React, { useState } from 'react';
import { Sparkles, Save, Edit3, CheckCircle2, RotateCcw, Eye, ExternalLink } from 'lucide-react';
import { HeroContent } from '../../types';
import { ImageUploadField } from '../ImageUploadField';

interface AdminHeroSectionProps {
  initialData: HeroContent;
  onSave: (data: HeroContent) => Promise<void>;
  isSaving: boolean;
}

export const AdminHeroSection: React.FC<AdminHeroSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [data, setData] = useState<HeroContent>(initialData);
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
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Hero Section
              </h2>
              <p className="text-xs text-slate-500">
                Manage high-impact headlines, trust badges, call-to-actions, and background banners on the homepage.
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
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
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
          <span>Hero section saved to Firestore and updated on the live website!</span>
        </div>
      )}

      {/* Live Preview Card */}
      <div className="p-4 sm:p-6 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Live Homepage Hero Preview
          </span>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1"
          >
            <span>Open Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        
        <div className="rounded-xl border border-slate-800 bg-[#071325] p-6 text-white relative overflow-hidden">
          {data.heroBgImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
              style={{ backgroundImage: `url(${data.heroBgImage})` }}
            />
          )}
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold">
              {data.badge || 'Protect. Invest. Grow. • Mulund, Mumbai'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight">
              {data.headingPrefix} <span className="text-orange-400">{data.headingHighlight}</span>{data.headingSuffix}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {data.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs">
                {data.primaryCtaText || 'Book Free Wealth Audit'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#0a192f] border border-orange-400/30 text-orange-300 font-bold text-xs">
                {data.secondaryCtaText || 'Partner With Us'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Top Trust Badge Text
            </label>
            <input
              type="text"
              value={data.badge || ''}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              placeholder="e.g. Protect. Invest. Grow. • Mulund, Mumbai"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={data.headingPrefix || ''}
              onChange={(e) => setData({ ...data, headingPrefix: e.target.value })}
              placeholder="e.g. Securing Tomorrow's"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Heading Highlight Word (Orange Accent)
            </label>
            <input
              type="text"
              value={data.headingHighlight || ''}
              onChange={(e) => setData({ ...data, headingHighlight: e.target.value })}
              placeholder="e.g. Wealth"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold text-orange-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Heading Suffix
            </label>
            <input
              type="text"
              value={data.headingSuffix || ''}
              onChange={(e) => setData({ ...data, headingSuffix: e.target.value })}
              placeholder="e.g. , Today."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Hero Subtitle & Value Proposition
            </label>
            <textarea
              rows={3}
              value={data.subtitle || ''}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              placeholder="e.g. 15+ Years of trusted financial planning, multi-asset wealth compounding..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Primary Button Text (Opens Consultation)
            </label>
            <input
              type="text"
              value={data.primaryCtaText || ''}
              onChange={(e) => setData({ ...data, primaryCtaText: e.target.value })}
              placeholder="e.g. Book Free Wealth Audit"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Secondary Button Text (Opens Partner Track)
            </label>
            <input
              type="text"
              value={data.secondaryCtaText || ''}
              onChange={(e) => setData({ ...data, secondaryCtaText: e.target.value })}
              placeholder="e.g. Partner With Us"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {/* Hero Banner Upload to Firebase Storage */}
          <div className="md:col-span-2 pt-2">
            <ImageUploadField
              label="Hero Background Banner (Uploaded to Firebase Storage)"
              value={data.heroBgImage || ''}
              onChange={(url) => setData({ ...data, heroBgImage: url })}
              folder="hero_banners"
              helperText="Upload a high-resolution dark architecture, Mumbai financial skyline, or abstract texture."
              placeholder="https://..."
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

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a192f] hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Hero Section'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
