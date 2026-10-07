import React, { useState } from 'react';
import { PieChart, Save, Edit3, CheckCircle2, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, TrendingUp } from 'lucide-react';
import { PortfolioContent, PortfolioModelItem, PortfolioAllocationItem } from '../../types';
import { ImageUploadField } from '../ImageUploadField';

interface AdminPortfolioSectionProps {
  initialData: PortfolioContent;
  onSave: (data: PortfolioContent) => Promise<void>;
  isSaving: boolean;
}

export const AdminPortfolioSection: React.FC<AdminPortfolioSectionProps> = ({
  initialData,
  onSave,
  isSaving
}) => {
  const [data, setData] = useState<PortfolioContent>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await onSave(data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleModelChange = (index: number, field: keyof PortfolioModelItem, val: any) => {
    const updatedModels = [...(data.models || [])];
    updatedModels[index] = { ...updatedModels[index], [field]: val };
    setData({ ...data, models: updatedModels });
  };

  const handleAllocationChange = (mIndex: number, aIndex: number, field: keyof PortfolioAllocationItem, val: any) => {
    const updatedModels = [...(data.models || [])];
    const currentAllocations = [...(updatedModels[mIndex].allocation || [])];
    currentAllocations[aIndex] = { ...currentAllocations[aIndex], [field]: val };
    updatedModels[mIndex] = { ...updatedModels[mIndex], allocation: currentAllocations };
    setData({ ...data, models: updatedModels });
  };

  const handleAddAllocation = (mIndex: number) => {
    const updatedModels = [...(data.models || [])];
    const currentAllocations = [...(updatedModels[mIndex].allocation || [])];
    currentAllocations.push({
      label: 'New Asset Class',
      percent: 10,
      color: 'bg-amber-500'
    });
    updatedModels[mIndex] = { ...updatedModels[mIndex], allocation: currentAllocations };
    setData({ ...data, models: updatedModels });
  };

  const handleRemoveAllocation = (mIndex: number, aIndex: number) => {
    const updatedModels = [...(data.models || [])];
    const currentAllocations = [...(updatedModels[mIndex].allocation || [])];
    currentAllocations.splice(aIndex, 1);
    updatedModels[mIndex] = { ...updatedModels[mIndex], allocation: currentAllocations };
    setData({ ...data, models: updatedModels });
  };

  const handleAddModel = () => {
    const newModel: PortfolioModelItem = {
      id: `model-${Date.now()}`,
      title: 'New Asset Allocation Strategy',
      badge: 'Custom Allocation',
      horizon: '3 to 7 Years',
      targetReturn: '10.5% – 12.5% p.a.',
      riskLevel: 'Moderate',
      description: 'Balanced strategy aiming for inflation-beating capital growth and downside risk control.',
      idealFor: 'Professionals seeking structured wealth creation without speculative volatility.',
      allocation: [
        { label: 'Equity Mutual Funds', percent: 50, color: 'bg-emerald-600' },
        { label: 'Corporate Debt & Arbitrage', percent: 35, color: 'bg-blue-600' },
        { label: 'Sovereign Gold Bonds', percent: 15, color: 'bg-amber-500' }
      ]
    };
    const currentModels = [...(data.models || [])];
    setData({ ...data, models: [...currentModels, newModel] });
    setExpandedIndex(currentModels.length);
    setIsEditing(true);
  };

  const handleRemoveModel = (index: number) => {
    const currentModels = [...(data.models || [])];
    if (window.confirm(`Delete "${currentModels[index]?.title}" model?`)) {
      currentModels.splice(index, 1);
      setData({ ...data, models: currentModels });
      if (expandedIndex === index) setExpandedIndex(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-800">
              <PieChart className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Portfolio Section & Signature Models
              </h2>
              <p className="text-xs text-slate-500">
                Configure backtested multi-asset model allocations, target returns, risk indicators, and asset breakdowns.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddModel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#071220] hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Strategy</span>
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
          <span>Portfolio section & models saved to Firestore! Live website updated instantly.</span>
        </div>
      )}

      {/* General Portfolio Header Settings */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Section Headline & Subtitle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Badge</label>
            <input
              type="text"
              value={data.badge || ''}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">Section Title</label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-800 mb-1">Section Subtitle</label>
            <textarea
              rows={2}
              value={data.subtitle || ''}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Model Portfolios List */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Model Strategies ({(data.models || []).length})
          </span>
          <button
            type="button"
            onClick={handleAddModel}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Model</span>
          </button>
        </div>

        {(data.models || []).map((model, mIndex) => {
          const isExpanded = expandedIndex === mIndex;

          return (
            <div
              key={model.id || mIndex}
              className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
            >
              {/* Summary Bar */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : mIndex)}
                className="p-3.5 sm:p-4 bg-white flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-900 text-xs font-bold flex items-center justify-center shrink-0">
                    {mIndex + 1}
                  </span>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {model.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-900 border border-orange-200/80">
                        {model.riskLevel}
                      </span>
                      <span className="text-xs text-emerald-700 font-bold hidden sm:inline">
                        {model.targetReturn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveModel(mIndex);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete model"
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

              {/* Form Fields for Model */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Model Name</label>
                      <input
                        type="text"
                        value={model.title}
                        onChange={(e) => handleModelChange(mIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={model.badge || ''}
                        onChange={(e) => handleModelChange(mIndex, 'badge', e.target.value)}
                        placeholder="e.g. Moderate Risk • Core Flagship"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Target Return</label>
                      <input
                        type="text"
                        value={model.targetReturn || ''}
                        onChange={(e) => handleModelChange(mIndex, 'targetReturn', e.target.value)}
                        placeholder="e.g. 11.5% – 13.5% p.a."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold text-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Investment Horizon</label>
                      <input
                        type="text"
                        value={model.horizon || ''}
                        onChange={(e) => handleModelChange(mIndex, 'horizon', e.target.value)}
                        placeholder="e.g. 5 to 7+ Years"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Risk Grade</label>
                      <select
                        value={model.riskLevel || 'Moderate'}
                        onChange={(e) => handleModelChange(mIndex, 'riskLevel', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                      >
                        <option value="Low">Low Risk</option>
                        <option value="Moderate-Low">Moderate-Low Risk</option>
                        <option value="Moderate">Moderate Risk</option>
                        <option value="High Growth">High Growth / Alpha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Ideal Investor Profile</label>
                      <input
                        type="text"
                        value={model.idealFor || ''}
                        onChange={(e) => handleModelChange(mIndex, 'idealFor', e.target.value)}
                        placeholder="e.g. Working professionals aged 30-50..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={model.description}
                        onChange={(e) => handleModelChange(mIndex, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>

                    {/* Image Upload for this portfolio model */}
                    <div className="md:col-span-2">
                      <ImageUploadField
                        label="Portfolio Strategy Illustration or Chart Image (Firebase Storage)"
                        value={model.imageUrl || ''}
                        onChange={(url) => handleModelChange(mIndex, 'imageUrl', url)}
                        folder="portfolio_models"
                        helperText="Optional chart illustration or graphic for this model."
                      />
                    </div>

                    {/* Asset Allocation Breakdown */}
                    <div className="md:col-span-2 space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800">
                          Asset Allocation Percentages (Must sum to ~100%)
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddAllocation(mIndex)}
                          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Asset Class</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(model.allocation || []).map((alloc, aIndex) => (
                          <div key={aIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={alloc.label}
                              onChange={(e) => handleAllocationChange(mIndex, aIndex, 'label', e.target.value)}
                              placeholder="Asset name (e.g. Equity, Debt, Gold)"
                              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            />
                            <div className="flex items-center gap-1 w-24">
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={alloc.percent}
                                onChange={(e) => handleAllocationChange(mIndex, aIndex, 'percent', Number(e.target.value))}
                                className="w-16 px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none text-right font-bold"
                              />
                              <span className="text-xs text-slate-500 font-bold">%</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveAllocation(mIndex, aIndex)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                              title="Delete asset"
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
          onClick={() => setData(initialData)}
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
          <span>{isSaving ? 'Saving...' : 'Save All Portfolio Data to Firestore'}</span>
        </button>
      </div>
    </div>
  );
};
