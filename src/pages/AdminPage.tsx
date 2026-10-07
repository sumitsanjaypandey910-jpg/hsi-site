import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  User, 
  Mail, 
  KeyRound, 
  Sparkles, 
  LogOut, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Layers, 
  PieChart, 
  MessageSquare, 
  Phone, 
  FileText, 
  Image as ImageIcon, 
  Award, 
  ExternalLink,
  Menu,
  X,
  Settings,
  ShieldCheck,
  Building2,
  ChevronRight,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSiteContent } from '../context/SiteContentContext';
import { HsiLogo } from '../components/HsiLogo';

import { AdminHeroSection } from '../components/admin/AdminHeroSection';
import { AdminAboutSection } from '../components/admin/AdminAboutSection';
import { AdminServicesSection } from '../components/admin/AdminServicesSection';
import { AdminPortfolioSection } from '../components/admin/AdminPortfolioSection';
import { AdminTestimonialsSection } from '../components/admin/AdminTestimonialsSection';
import { AdminContactSection } from '../components/admin/AdminContactSection';
import { AdminFooterSection } from '../components/admin/AdminFooterSection';
import { AdminImagesSection } from '../components/admin/AdminImagesSection';

type AdminTab = 
  | 'hero' 
  | 'about' 
  | 'services' 
  | 'portfolio' 
  | 'testimonials' 
  | 'contact' 
  | 'footer' 
  | 'images' 
  | 'system';

export const AdminPage: React.FC = () => {
  const { user, loading: authLoading, signIn, signUpAdmin, signOut, authError, clearAuthError } = useAuth();
  const { 
    hero, 
    about, 
    services, 
    portfolio, 
    images, 
    contact, 
    testimonials, 
    footer,
    saveHero, 
    saveAbout, 
    saveServices, 
    savePortfolio, 
    saveImages, 
    saveContact, 
    saveTestimonials,
    saveFooter,
    resetToDefaults 
  } = useSiteContent();

  // Auth Form State
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Toast / Status notification
  const [saveStatus, setSaveStatus] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setSaveStatus({ msg, type });
    setTimeout(() => {
      setSaveStatus(null);
    }, 4500);
  };

  // Auth Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSubmitting(true);
    try {
      if (isRegisterMode) {
        await signUpAdmin(emailInput.trim(), passwordInput);
        showToast('Admin account created and logged in successfully!');
      } else {
        await signIn(emailInput.trim(), passwordInput);
        showToast('Welcome back, Admin!');
      }
    } catch (err) {
      // Error handled by AuthContext
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmailInput('admin@horizonsecureinvestments.com');
    setPasswordInput('Admin@2026');
  };

  const handleResetToDefaults = async () => {
    if (!window.confirm('Are you sure you want to reset all website content to the default brochure information? This will restore initial Firestore entries.')) {
      return;
    }
    setIsSaving(true);
    try {
      await resetToDefaults();
      showToast('All website sections successfully reset to verified defaults!');
    } catch (err: any) {
      showToast('Reset failed: ' + (err?.message || 'Unknown error'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#071220] flex items-center justify-center p-4 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-orange-400 font-bold uppercase tracking-widest">
            Connecting to Firebase Services...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: ADMIN LOGIN SCREEN (Unauthenticated)
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#071325] via-[#0b1c36] to-[#0a192f] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          
          {/* Logo & Back to Home */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-block hover:scale-105 transition-transform">
              <HsiLogo variant="horizontal" size="md" darkTheme={true} />
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-orange-400" />
              <span>Firebase Security Console</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
              Website Content Admin
            </h1>
            <p className="text-xs text-slate-300">
              Sign in with your administrator credentials to update website content directly in Firebase Firestore and Storage.
            </p>
          </div>

          {/* Login Card */}
          <div className="mt-8 bg-[#0f2342]/95 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{authError}</span>
                  <button 
                    type="button" 
                    onClick={clearAuthError}
                    className="block text-[11px] text-red-400 hover:underline mt-1 font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@horizonsecureinvestments.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {authSubmitting ? 'Authenticating with Firebase...' : (isRegisterMode ? 'Register New Admin Account' : 'Authenticate & Open Dashboard')}
              </button>
            </form>

            {/* Quick Demo Helper & Toggle */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-2.5 text-center">
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] font-bold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
              >
                Auto-fill Authorized Demo Admin Credentials
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  clearAuthError();
                }}
                className="text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                {isRegisterMode ? 'Already have an admin account? Sign In' : 'Need to create an initial admin account? Register'}
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-xs text-slate-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1">
              <span>&larr; Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const navTabs: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'about', label: 'About & Firm', icon: Award },
    { id: 'services', label: 'Services Catalog', icon: Layers, badge: `${services.length}` },
    { id: 'portfolio', label: 'Model Portfolios', icon: PieChart, badge: `${portfolio?.models?.length || 4}` },
    { id: 'testimonials', label: 'Client Reviews', icon: MessageSquare, badge: `${testimonials.length}` },
    { id: 'contact', label: 'Contact & Desks', icon: Phone },
    { id: 'footer', label: 'Footer & Compliance', icon: FileText },
    { id: 'images', label: 'Media & Storage', icon: ImageIcon },
    { id: 'system', label: 'Firestore Sync', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-[#071220] border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Console Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <HsiLogo variant="mark" size="sm" darkTheme={true} />
              <div className="hidden sm:block">
                <span className="font-heading font-black text-sm text-white tracking-wide block">
                  HSI Content Admin
                </span>
                <span className="text-[10px] text-orange-400 font-bold block">
                  Firebase Real-Time CMS
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Actions & User Info */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              title="Open website homepage in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">View Live Site</span>
            </a>

            {/* Current Admin Email */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[180px]">{user.email}</span>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/80 text-xs font-bold transition-colors cursor-pointer"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Global Toast Notification */}
      {saveStatus && (
        <div className="sticky top-16 z-20 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md text-center flex items-center justify-center gap-2">
          {saveStatus.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span>{saveStatus.msg}</span>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar Navigation (Desktop) & Mobile Pills */}
          <div className="lg:col-span-3">
            
            {/* Desktop Navigation Card */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs p-3 sticky top-24">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Content Modules
              </div>

              <nav className="space-y-1">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0a192f] text-orange-400 shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isActive ? 'bg-orange-500/20 text-orange-300' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100 px-3">
                <span className="text-[10px] text-slate-400 block font-medium">
                  Connected Database:
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-800 block truncate">
                  HSI-Firestore (v1)
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                  ● Real-Time Sync Active
                </span>
              </div>
            </div>

            {/* Mobile Navigation Tabs (Scrollable Bar) */}
            <div className="lg:hidden bg-white rounded-xl border border-slate-200 shadow-xs p-2 overflow-x-auto flex gap-1.5 no-scrollbar">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#0a192f] text-orange-400'
                        : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Active Tab Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {activeTab === 'hero' && (
              <AdminHeroSection
                initialData={hero}
                onSave={async (data) => {
                  setIsSaving(true);
                  try {
                    await saveHero(data);
                    showToast('Hero section updated! Changes are live on the homepage.');
                  } catch (err: any) {
                    showToast('Failed to save Hero: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'about' && (
              <AdminAboutSection
                initialData={about}
                onSave={async (data) => {
                  setIsSaving(true);
                  try {
                    await saveAbout(data);
                    showToast('About section updated! Changes are live on the website.');
                  } catch (err: any) {
                    showToast('Failed to save About: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'services' && (
              <AdminServicesSection
                initialData={services}
                onSave={async (items) => {
                  setIsSaving(true);
                  try {
                    await saveServices(items);
                    showToast('Services catalog updated! Changes are live on the website.');
                  } catch (err: any) {
                    showToast('Failed to save Services: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'portfolio' && (
              <AdminPortfolioSection
                initialData={portfolio}
                onSave={async (data) => {
                  setIsSaving(true);
                  try {
                    await savePortfolio(data);
                    showToast('Portfolio models updated! Live website updated instantly.');
                  } catch (err: any) {
                    showToast('Failed to save Portfolio: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'testimonials' && (
              <AdminTestimonialsSection
                initialData={testimonials}
                onSave={async (items) => {
                  setIsSaving(true);
                  try {
                    await saveTestimonials(items);
                    showToast('Testimonials updated! Live website updated instantly.');
                  } catch (err: any) {
                    showToast('Failed to save Testimonials: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'contact' && (
              <AdminContactSection
                initialData={contact}
                onSave={async (data) => {
                  setIsSaving(true);
                  try {
                    await saveContact(data);
                    showToast('Contact details updated! Live website updated instantly.');
                  } catch (err: any) {
                    showToast('Failed to save Contact: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'footer' && (
              <AdminFooterSection
                initialData={footer}
                onSave={async (data) => {
                  setIsSaving(true);
                  try {
                    await saveFooter(data);
                    showToast('Footer details updated! Live website updated instantly.');
                  } catch (err: any) {
                    showToast('Failed to save Footer: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'images' && (
              <AdminImagesSection
                initialData={images}
                onSave={async (data) => {
                  setIsSaving(true);
                  try {
                    await saveImages(data);
                    showToast('Image assets updated! Live website updated instantly.');
                  } catch (err: any) {
                    showToast('Failed to save Images: ' + (err?.message || 'Unknown error'), 'error');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'system' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="p-3 rounded-xl bg-orange-100 text-orange-800">
                    <Database className="w-6 h-6" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-heading">
                      Database Synchronization & System Reset
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage real-time Firestore synchronization, database health, and content seeding.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Firestore Collections</span>
                    <p className="text-xs text-slate-500 mb-3">
                      Collection <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">siteContent</code> contains documents: <code className="text-orange-800 font-mono">hero</code>, <code className="text-orange-800 font-mono">about</code>, <code className="text-orange-800 font-mono">services</code>, <code className="text-orange-800 font-mono">portfolio</code>, <code className="text-orange-800 font-mono">testimonials</code>, <code className="text-orange-800 font-mono">contact</code>, <code className="text-orange-800 font-mono">footer</code>, <code className="text-orange-800 font-mono">images</code>.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>onSnapshot Real-Time Listener Active</span>
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Firebase Storage Bucket</span>
                    <p className="text-xs text-slate-500 mb-3">
                      High-speed cloud image assets, client testimonial avatars, and company brochures are uploaded directly with resumable progress tracking.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-orange-800 font-bold bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      <span>Firebase Storage Connected</span>
                    </span>
                  </div>
                </div>

                {/* Reset Section */}
                <div className="p-4 sm:p-5 rounded-xl border border-red-200 bg-red-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-red-900">
                      Reset All Content to Official Brochure Defaults
                    </h3>
                    <p className="text-xs text-red-700 mt-0.5">
                      Restores all sections (Hero, About, 6 Services, 4 Portfolio Models, Testimonials, Contact, Footer) to the verified brochure defaults.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All to Defaults</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
