import React, { useState } from 'react';
import { Image as ImageIcon, Save, Edit3, CheckCircle2, RotateCcw, UploadCloud, ExternalLink } from 'lucide-react';
import { ImagesContent } from '../../types';
import { ImageUploadField } from '../ImageUploadField';

interface AdminImagesSectionProps {
  initialData: ImagesContent;
  onSave: (data: ImagesContent) => Promise<void>;
  isSaving: boolean;
}

export const AdminImagesSection: React.FC<AdminImagesSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [data, setData] = useState<ImagesContent>(initialData);
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
              <ImageIcon className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Brand Media & Firebase Storage Assets
              </h2>
              <p className="text-xs text-slate-500">
                Directly upload and manage website logos, background banners, office photos, and regulatory certificates.
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
          <span>Image assets saved to Firestore and updated on the live website!</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <ImageUploadField
              label="Primary Brand Logo (Navbar & Footer)"
              value={data.logoUrl || ''}
              onChange={(url) => setData({ ...data, logoUrl: url })}
              folder="brand_logos"
              helperText="Upload official transparent PNG or SVG logo file."
              placeholder="https://.../logo.png"
            />
          </div>

          <div>
            <ImageUploadField
              label="Hero Section Wallpaper / Graphic"
              value={data.heroBannerBg || ''}
              onChange={(url) => setData({ ...data, heroBannerBg: url })}
              folder="hero_assets"
              helperText="Dark modern architectural or geometric finance banner."
              placeholder="https://..."
            />
          </div>

          <div>
            <ImageUploadField
              label="Mumbai BKC Office / Campus Photo"
              value={data.officeBkcImg || ''}
              onChange={(url) => setData({ ...data, officeBkcImg: url })}
              folder="office_photos"
              helperText="Photographs of the Bandra Kurla Complex office or building exterior."
              placeholder="https://..."
            />
          </div>

          <div>
            <ImageUploadField
              label="Principal Wealth Advisor Default Avatar"
              value={data.advisorDefaultAvatar || ''}
              onChange={(url) => setData({ ...data, advisorDefaultAvatar: url })}
              folder="advisors"
              helperText="Default headshot used across advisory desks and consultations."
              placeholder="https://..."
            />
          </div>

          <div>
            <ImageUploadField
              label="AMFI / IRDAI Regulatory Badge Graphic"
              value={data.certificateBadgeUrl || ''}
              onChange={(url) => setData({ ...data, certificateBadgeUrl: url })}
              folder="certificates"
              helperText="Official seal or verified certification mark."
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

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#071220] hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Media Assets'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
