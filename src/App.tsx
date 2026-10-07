import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { ScrollToTop } from './components/ScrollToTop';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { PartnerApplicationModal } from './components/PartnerApplicationModal';
import { FloatingActions } from './components/FloatingActions';
import { AiChatBot } from './components/AiChatBot';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState('');

  const handleOpenConsultation = (productName?: string) => {
    setSelectedProductForModal(productName || 'Mutual Funds (SIP / Lumpsum)');
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleOpenPartnerModal = () => {
    setIsPartnerModalOpen(true);
  };

  const handleClosePartnerModal = () => {
    setIsPartnerModalOpen(false);
  };

  return (
    <AuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-amber-200 selection:text-slate-900">
            
            {/* Top Regulatory & Contact Ribbon */}
            <TopBar onOpenConsultation={handleOpenConsultation} />

            {/* Responsive Sticky Navigation Bar */}
            <Navbar
              onOpenConsultation={handleOpenConsultation}
              onOpenPartnerModal={handleOpenPartnerModal}
            />

            {/* Dynamic Route Pages */}
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      onOpenConsultation={handleOpenConsultation}
                      onOpenPartnerModal={handleOpenPartnerModal}
                    />
                  }
                />
                <Route
                  path="/about"
                  element={
                    <AboutPage
                      onOpenConsultation={handleOpenConsultation}
                      onOpenPartnerModal={handleOpenPartnerModal}
                    />
                  }
                />
                <Route
                  path="/services"
                  element={
                    <ServicesPage
                      onOpenConsultation={handleOpenConsultation}
                    />
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <PortfolioPage
                      onOpenConsultation={handleOpenConsultation}
                    />
                  }
                />
                <Route
                  path="/contact"
                  element={<ContactPage />}
                />
                <Route
                  path="/faq"
                  element={
                    <FaqPage
                      onOpenConsultation={handleOpenConsultation}
                    />
                  }
                />
                <Route
                  path="/admin"
                  element={<AdminPage />}
                />
                {/* Fallback to Home */}
                <Route
                  path="*"
                  element={
                    <HomePage
                      onOpenConsultation={handleOpenConsultation}
                      onOpenPartnerModal={handleOpenPartnerModal}
                    />
                  }
                />
              </Routes>
            </main>

            {/* Comprehensive Website Footer with Contact & Social Media Links */}
            <Footer
              onOpenConsultation={handleOpenConsultation}
              onOpenPartnerModal={handleOpenPartnerModal}
            />

            {/* Global Modals & Interactive Overlays */}
            <ConsultationModal
              isOpen={isConsultationOpen}
              onClose={handleCloseConsultation}
              prefilledProduct={selectedProductForModal}
            />

            <PartnerApplicationModal
              isOpen={isPartnerModalOpen}
              onClose={handleClosePartnerModal}
            />

            {/* WhatsApp & Quick Floating Actions */}
            <FloatingActions
              onOpenConsultation={() => handleOpenConsultation()}
              onOpenPartnerModal={handleOpenPartnerModal}
            />

            {/* Interactive AI Wealth Advisor Chatbot */}
            <AiChatBot onOpenConsultation={handleOpenConsultation} />

          </div>
        </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  );
}
