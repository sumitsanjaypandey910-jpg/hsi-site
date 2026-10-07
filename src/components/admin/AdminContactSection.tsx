import React, { useState } from 'react';
import { Phone, Save, Edit3, CheckCircle2, RotateCcw, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { ContactContent } from '../../types';

interface AdminContactSectionProps {
  initialData: ContactContent;
  onSave: (data: ContactContent) => Promise<void>;
  isSaving: boolean;
}

export const AdminContactSection: React.FC<AdminContactSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [data, setData] = useState<ContactContent>(initialData);
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
              <Phone className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Contact Details & Desk Operations
              </h2>
              <p className="text-xs text-slate-500">
                Configure corporate BKC addresses, advisory phone lines, 24/7 claims facilitation hotline, and verified WhatsApp number.
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
          <span>Contact details saved to Firestore! Updated on website header, footer & contact desks.</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Corporate Headquarters Address
            </label>
            <textarea
              rows={2}
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Primary Advisory Phone
            </label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Toll-Free Helpline
            </label>
            <input
              type="text"
              value={data.tollFree}
              onChange={(e) => setData({ ...data, tollFree: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              24/7 Emergency Claims Hotline
            </label>
            <input
              type="text"
              value={data.emergencyClaims || ''}
              onChange={(e) => setData({ ...data, emergencyClaims: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-red-600 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              WhatsApp Integration Number (No + or spaces)
            </label>
            <input
              type="text"
              value={data.whatsappNumber || ''}
              onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
              placeholder="e.g. 919820012345"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold text-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Primary Client Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Advisory Desk Email
            </label>
            <input
              type="email"
              value={data.advisoryEmail}
              onChange={(e) => setData({ ...data, advisoryEmail: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Careers & Partner Email
            </label>
            <input
              type="email"
              value={data.careersEmail || ''}
              onChange={(e) => setData({ ...data, careersEmail: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Operating Hours
            </label>
            <input
              type="text"
              value={data.operatingHours}
              onChange={(e) => setData({ ...data, operatingHours: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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
            <span>{isSaving ? 'Saving Changes...' : 'Save Contact Details'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
