import React, { useState } from 'react';
import { Layers, Save, Edit3, CheckCircle2, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { ServiceContentItem } from '../../types';

interface AdminServicesSectionProps {
  initialData: ServiceContentItem[];
  onSave: (items: ServiceContentItem[]) => Promise<void>;
  isSaving: boolean;
}

export const AdminServicesSection: React.FC<AdminServicesSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [items, setItems] = useState<ServiceContentItem[]>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  React.useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await onSave(items);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleServiceChange = (index: number, field: keyof ServiceContentItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    setItems(updated);
  };

  const handleBenefitChange = (serviceIdx: number, benefitIdx: number, text: string) => {
    const updated = [...items];
    const currentBenefits = [...(updated[serviceIdx].keyBenefits || [])];
    currentBenefits[benefitIdx] = text;
    updated[serviceIdx] = { ...updated[serviceIdx], keyBenefits: currentBenefits };
    setItems(updated);
  };

  const handleAddBenefit = (serviceIdx: number) => {
    const updated = [...items];
    const currentBenefits = [...(updated[serviceIdx].keyBenefits || [])];
    currentBenefits.push('New key client benefit feature');
    updated[serviceIdx] = { ...updated[serviceIdx], keyBenefits: currentBenefits };
    setItems(updated);
  };

  const handleRemoveBenefit = (serviceIdx: number, benefitIdx: number) => {
    const updated = [...items];
    const currentBenefits = [...(updated[serviceIdx].keyBenefits || [])];
    currentBenefits.splice(benefitIdx, 1);
    updated[serviceIdx] = { ...updated[serviceIdx], keyBenefits: currentBenefits };
    setItems(updated);
  };

  const handleAddService = () => {
    const newService: ServiceContentItem = {
      id: `service-${Date.now()}`,
      title: 'New Wealth Advisory Solution',
      badge: 'Bespoke Offering',
      category: 'wealth',
      description: 'Comprehensive financial planning tailored to individual and corporate goals.',
      keyBenefits: [
        'Dedicated SEBI-qualified fiduciary relationship manager',
        'Direct folio holding with AMCs and depository participants',
        'Quarterly performance and tax-loss review reports'
      ]
    };
    setItems([...items, newService]);
    setExpandedIndex(items.length);
    setIsEditing(true);
  };

  const handleRemoveService = (index: number) => {
    if (window.confirm(`Delete "${items[index]?.title}" from the catalog?`)) {
      setItems(items.filter((_, i) => i !== index));
      if (expandedIndex === index) {
        setExpandedIndex(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-800">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Services & Product Catalog
              </h2>
              <p className="text-xs text-slate-500">
                Manage the wealth advisory offerings (Mutual Funds, Term Insurance, Mediclaim, Fractional CRE, Sovereign Bonds, Loans).
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#071220] hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Offering</span>
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
          <span>Services catalog saved to Firestore! Live website updated instantly.</span>
        </div>
      )}

      {/* Services List */}
      <div className="p-4 sm:p-6 space-y-4">
        {items.map((service, sIndex) => {
          const isExpanded = expandedIndex === sIndex;

          return (
            <div
              key={service.id || sIndex}
              className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
            >
              {/* Accordion Summary Row */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : sIndex)}
                className="p-3.5 sm:p-4 bg-white flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-900 text-xs font-bold flex items-center justify-center shrink-0">
                    {sIndex + 1}
                  </span>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {service.title || 'Untitled Service'}
                      </h3>
                      {service.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-900 border border-orange-200/80 hidden sm:inline-block">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-lg mt-0.5">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveService(sIndex);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Edit Form */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleServiceChange(sIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Tag Badge Text
                      </label>
                      <input
                        type="text"
                        value={service.badge || ''}
                        onChange={(e) => handleServiceChange(sIndex, 'badge', e.target.value)}
                        placeholder="e.g. Wealth Creation & Compounding"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Category
                      </label>
                      <select
                        value={service.category || 'wealth'}
                        onChange={(e) => handleServiceChange(sIndex, 'category', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      >
                        <option value="wealth">Wealth Planning & Mutual Funds</option>
                        <option value="insurance">Term & Health Insurance</option>
                        <option value="alternative">Alternative Real Estate (CRE)</option>
                        <option value="fixed_income">Sovereign Bonds & Fixed Income</option>
                        <option value="loans">Bank Loans & Institutional Credit</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Comprehensive Description
                      </label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => handleServiceChange(sIndex, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>

                    {/* Key Benefits Bullet Points */}
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800">
                          Key Value Highlights (Bullet Points)
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBenefit(sIndex)}
                          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(service.keyBenefits || []).map((bullet, bIndex) => (
                          <div key={bIndex} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleBenefitChange(sIndex, bIndex, e.target.value)}
                              placeholder="Key benefit description..."
                              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBenefit(sIndex, bIndex)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                              title="Delete bullet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
          <span>{isSaving ? 'Saving...' : 'Save All Services to Firestore'}</span>
        </button>
      </div>
    </div>
  );
};
