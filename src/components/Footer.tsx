import React from 'react';
import { Mail, MapPin, Phone, ExternalLink, GraduationCap, Github, Linkedin } from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/academicData';
import { ASSETS } from '../data/assets';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Faculty Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.mustLogo}
                alt="MUST University logo"
                className="w-9 h-9 rounded-full bg-white object-contain shadow-sm"
              />
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                  MUST IT Advising
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Faculty of Information Technology
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              An intelligent knowledge-based advising platform designed to mentor students through academic program selection, credit-hour planning, and graduation requirements according to official university bylaws.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-4 h-4" />
              <span>Graduation Project · Class of 2026</span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Academic Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('program-ai')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Artificial Intelligence (AI Major)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('program-cs')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Computer Science (CS Major)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('program-is')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Information Systems (IS Major)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('regulations')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  General Academic Regulations & Bylaws
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('expert-system')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Rule-Based Advising Expert System
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gpa-calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Official GPA & Registration Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('comparison')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Multi-Dimensional Program Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Academic Bylaws FAQ Knowledge Base
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: University Contacts */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Campus & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>{UNIVERSITY_INFO.campus}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>+20 (2) 3824-7455 / Ext: 412</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>it.advising@must.edu.eg</span>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href="https://must.edu.eg"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Official University Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {UNIVERSITY_INFO.faculty} · {UNIVERSITY_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Supreme Council of Universities Accreditation</span>
            <span>·</span>
            <button onClick={() => onNavigate('regulations')} className="hover:underline">
              Bylaw Decree No. 25
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
