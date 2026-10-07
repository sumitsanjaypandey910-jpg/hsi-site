import React, { useState } from 'react';
import { MessageSquare, Save, Edit3, CheckCircle2, RotateCcw, Plus, Trash2, Star } from 'lucide-react';
import { TestimonialItem } from '../../types';
import { ImageUploadField } from '../ImageUploadField';

interface AdminTestimonialsSectionProps {
  initialData: TestimonialItem[];
  onSave: (items: TestimonialItem[]) => Promise<void>;
  isSaving: boolean;
}

export const AdminTestimonialsSection: React.FC<AdminTestimonialsSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [items, setItems] = useState<TestimonialItem[]>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await onSave(items);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleItemChange = (index: number, field: keyof TestimonialItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    setItems(updated);
  };

  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `testi-${Date.now()}`,
      name: 'New Verified Investor',
      role: 'Business Owner / Doctor / Tech Executive',
      quote: 'Horizon Secure Investments structured our portfolio with complete transparency and exceptional fiduciary care.',
      portfolio: 'Wealth Advisory & Insurance Shield',
      city: 'Mumbai',
      rating: 5,
      avatarUrl: ''
    };
    setItems([...items, newTestimonial]);
    setIsEditing(true);
  };

  const handleRemoveTestimonial = (index: number) => {
    if (window.confirm(`Delete review from "${items[index]?.name}"?`)) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-800">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Client Testimonials & Reviews
              </h2>
              <p className="text-xs text-slate-500">
                Manage authentic client reviews, star ratings, professional roles, cities, and investor avatars uploaded to Firebase Storage.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddTestimonial}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#071220] hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review</span>
          </button>

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
            <span>{isEditing ? 'Editing Mode' : 'Toggle Edit'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit()}
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
          <span>Testimonials saved to Firestore! Live website updated instantly.</span>
        </div>
      )}

      {/* Testimonials Grid / List */}
      <div className="p-4 sm:p-6 space-y-6">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-900 text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {item.name || 'Investor Review'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveTestimonial(index)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Client Full Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                  placeholder="e.g. Senior Director, Tech MNC"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">City / Region</label>
                <input
                  type="text"
                  value={item.city || ''}
                  onChange={(e) => handleItemChange(index, 'city', e.target.value)}
                  placeholder="e.g. Mumbai, BKC"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Portfolio Strategy / Asset Tag</label>
                <input
                  type="text"
                  value={item.portfolio || ''}
                  onChange={(e) => handleItemChange(index, 'portfolio', e.target.value)}
                  placeholder="e.g. Balanced Wealth Builder"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Star Rating (1 to 5)</label>
                <select
                  value={item.rating || 5}
                  onChange={(e) => handleItemChange(index, 'rating', Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1">Client Testimonial Quote</label>
                <textarea
                  rows={3}
                  value={item.quote}
                  onChange={(e) => handleItemChange(index, 'quote', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              {/* Avatar Upload via Firebase Storage */}
              <div className="md:col-span-3">
                <ImageUploadField
                  label="Client Profile Avatar (Firebase Storage)"
                  value={item.avatarUrl || ''}
                  onChange={(url) => handleItemChange(index, 'avatarUrl', url)}
                  folder="testimonials"
                  helperText="Upload a professional headshot or photo of the investor."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setItems(initialData)}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Revert Changes</span>
        </button>

        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#071220] hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save All Testimonials to Firestore'}</span>
        </button>
      </div>
    </div>
  );
};
