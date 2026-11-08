/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProgramsPortalPage } from './pages/ProgramsPortalPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { RegulationsPage } from './pages/RegulationsPage';
import { ExpertSystemPage } from './pages/ExpertSystemPage';
import { GpaCalculatorPage } from './pages/GpaCalculatorPage';
import { ProgramComparisonPage } from './pages/ProgramComparisonPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PdfViewerModal } from './components/PdfViewerModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Scroll to top on page change
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Sticky Fixed Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {currentPage === 'programs' && (
          <ProgramsPortalPage
            onSelectProgram={(prog) => {
              if (prog === 'general-regulations') {
                navigateTo('regulations');
              } else {
                navigateTo(`program-${prog}`);
              }
            }}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {currentPage === 'program-ai' && (
          <ProgramDetailPage
            programId="ai"
            onBack={() => navigateTo('programs')}
            onOpenPdf={() => setIsPdfOpen(true)}
            onStartAdvising={() => navigateTo('expert-system')}
          />
        )}

        {currentPage === 'program-cs' && (
          <ProgramDetailPage
            programId="cs"
            onBack={() => navigateTo('programs')}
            onOpenPdf={() => setIsPdfOpen(true)}
            onStartAdvising={() => navigateTo('expert-system')}
          />
        )}

        {currentPage === 'program-is' && (
          <ProgramDetailPage
            programId="is"
            onBack={() => navigateTo('programs')}
            onOpenPdf={() => setIsPdfOpen(true)}
            onStartAdvising={() => navigateTo('expert-system')}
          />
        )}

        {currentPage === 'regulations' && (
          <RegulationsPage
            onOpenPdf={() => setIsPdfOpen(true)}
            onNavigateToGpa={() => navigateTo('gpa-calculator')}
          />
        )}

        {currentPage === 'expert-system' && (
          <ExpertSystemPage
            onNavigateToProgram={(prog) => navigateTo(`program-${prog}`)}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {currentPage === 'gpa-calculator' && (
          <GpaCalculatorPage
            onNavigateToRegulations={() => navigateTo('regulations')}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {currentPage === 'comparison' && (
          <ProgramComparisonPage
            onNavigateToProgram={(prog) => navigateTo(`program-${prog}`)}
            onStartAdvising={() => navigateTo('expert-system')}
          />
        )}

        {currentPage === 'faq' && (
          <FaqPage
            onOpenPdf={() => setIsPdfOpen(true)}
            onNavigateToGpa={() => navigateTo('gpa-calculator')}
            onStartAdvising={() => navigateTo('expert-system')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Embedded PDF Viewer Modal for official regulations */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
      />

      {/* Institutional Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
