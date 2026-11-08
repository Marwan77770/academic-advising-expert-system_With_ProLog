import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Calculator,
  GitCompare,
  BookOpen,
  HelpCircle,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Compass,
} from 'lucide-react';
import { ASSETS } from '../data/assets';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'regulations', label: 'Regulations & GPA', icon: GraduationCap },
    { id: 'expert-system', label: 'Expert System', icon: Sparkles, highlight: true },
    { id: 'gpa-calculator', label: 'GPA Calculator', icon: Calculator },
    { id: 'comparison', label: 'Comparison', icon: GitCompare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Zone: MUST University & Faculty Logos and Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 shrink-0"
            aria-label="Go to Home"
          >
            {/* University & Department Logo Crest */}
            <img
              src={ASSETS.mustLogo}
              alt="MUST University logo"
              onError={(e) => {
                const t = e.currentTarget;
                if (!t.dataset.fallback) {
                  t.dataset.fallback = '1';
                  t.src = ASSETS.publicLogo;
                }
              }}
              className="w-10 h-10 rounded-full bg-white object-contain shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                MUST <span className="text-indigo-600 dark:text-indigo-400 font-normal">IT Advising</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[180px] sm:max-w-none">
                Faculty of Information Technology
              </span>
            </div>
          </button>

          {/* Nav Links: Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
                      : item.highlight
                      ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Primary Action & Dark Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark/Light mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Quick Advising CTA Button */}
            <button
              onClick={() => handleNavClick('expert-system')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg shadow-sm hover:shadow-indigo-500/25 transition-all duration-150 whitespace-nowrap active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Advising System</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('expert-system')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Academic Advising Session</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
