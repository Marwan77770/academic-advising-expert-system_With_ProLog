import React, { useState } from 'react';
import {
  X,
  Download,
  Search,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';
import { ASSETS } from '../data/assets';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  initialSection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'viewer' | 'summary' | 'toc'>('viewer');

  if (!isOpen) return null;

  const tableOfContents = [
    {
      id: 'art-18-1',
      title: 'Article 18.1: University Requirements',
      titleAr: 'مادة 18.1: متطلبات الجامعة (12 ساعة)',
      page: 1,
      creditHours: '12 CH (8.57%)',
      summary: '6 Compulsory CH (Arabic, Computer Skills, English) + 6 Elective CH (Humanities, Psychology, Protocol, First Aid, Modern Issues).',
    },
    {
      id: 'art-18-2',
      title: 'Article 18.2: Mathematics & Basic Sciences',
      titleAr: 'مادة 18.2: الرياضيات والعلوم الأساسية (24 ساعة)',
      page: 2,
      creditHours: '24 CH (17.14%)',
      summary: '8 compulsory courses: Physics I & II, Calculus I & II, Logic Design, Linear Algebra, Discrete Math, Applied Probability & Statistics.',
    },
    {
      id: 'art-18-3',
      title: 'Article 18.3: College Computing Requirements',
      titleAr: 'مادة 18.3: متطلبات الكلية - علوم الحوسبة الأساسية (45 ساعة)',
      page: 2,
      creditHours: '45 CH (32.14%)',
      summary: '15 core computing courses: Intro to CS, Programming, OOP, Concepts of PL, Data Structures, Intro to AI, DBMS, Embedded Systems, Algorithms, Computer Architecture, Systems Analysis, Software Engineering, Operating Systems, Networks.',
    },
    {
      id: 'ai-specialization',
      title: 'Specialization: Artificial Intelligence (AI)',
      titleAr: 'المقررات الإجبارية والاختيارية لتخصص الذكاء الاصطناعي (47 ساعة)',
      page: 3,
      creditHours: '47 CH (33.57%)',
      summary: '35 CH Compulsory (AI Languages, Robotics, Kinematics, Data Science, Neural Networks, Image Processing, ML, HMI, NLP, Speech, Computer Vision) + 12 CH Elective.',
    },
    {
      id: 'art-21-cs',
      title: 'Article 21: Computer Science Specialization',
      titleAr: 'مادة 21: متطلبات تخصص علوم الحاسب (47 ساعة)',
      page: 11,
      creditHours: '47 CH (33.57%)',
      summary: '35 CH Compulsory (Graphics, Theory of Computation, Mobile Computing, Neural Networks, Image Processing, Compilers, Machine Learning, Security, Pattern Recognition, Parallel Computing) + 12 CH Elective.',
    },
    {
      id: 'art-22-is',
      title: 'Article 22: Information Systems Specialization',
      titleAr: 'مادة 22: متطلبات تخصص نظم المعلومات (47 ساعة)',
      page: 19,
      creditHours: '47 CH (33.57%)',
      summary: '35 CH Compulsory (E-Commerce, Data Science, Operations Research, Data Mining, Mobile Computing, Big Data Analytics, Simulation, BI & DSS, Security, GIS) + 12 CH Elective.',
    },
    {
      id: 'projects-training',
      title: 'Senior Graduation Projects & Summer Training',
      titleAr: 'خامساً وسابعاً: مشروعات التخرج والتدريب الصيفي الميداني',
      page: 4,
      creditHours: '6 CH + 90 Hours Training',
      summary: 'Senior Project I & II (6 CH, prerequisite 98 CH) + 90 hours non-credit practical training across 6 weeks after earning 63 credit hours.',
    },
    {
      id: 'decree-25',
      title: 'University Decree No. 25: GPA Registration Caps',
      titleAr: 'قرار رئيس الجامعة رقم 25: قواعد التسجيل وحدود الساعات والإنذار',
      page: 1,
      creditHours: 'Decree Bylaw',
      summary: 'Min 12 CH, max 18 CH. Students with GPA >= 3.0 or graduating may register up to 23 CH. Students on academic probation (GPA < 2.0) are limited to 12-14 CH.',
    },
  ];

  const filteredToc = tableOfContents.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Official Faculty Academic Regulations & Bylaws
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Misr University for Science and Technology · Decree No. 25 & Academic Regulations PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={ASSETS.regulationsPdf}
              download="MUST_Faculty_IT_Regulations.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close PDF Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector & Search Bar */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'viewer'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              PDF Document View
            </button>
            <button
              onClick={() => setActiveTab('toc')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'toc'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Articles & Table of Contents
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'summary'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Executive Summary Cards
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inside regulations..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'viewer' && (
            <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col">
              <iframe
                src={`${ASSETS.regulationsPdf}#toolbar=1&navpanes=1`}
                title="Academic Bylaws PDF"
                className="w-full flex-1 border-0"
              />
            </div>
          )}

          {activeTab === 'toc' && (
            <div className="p-6 h-full overflow-y-auto space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Showing {filteredToc.length} indexed articles and study plan sections from official bylaws:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredToc.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-500/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                        <span>{item.creditHours}</span>
                        <span className="text-slate-400">PDF Page ~{item.page}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs font-arabic text-slate-600 dark:text-slate-300 mt-0.5">
                        {item.titleAr}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        onClick={() => setActiveTab('viewer')}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>View Document Page</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="p-6 h-full overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Credit Hours System */}
                <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Credit Hours System
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 my-1 tabular-nums">
                    140 CH
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Standard courses are 3 credit hours (2 hrs lecture + 2 hrs lab/tutorial). Lab-only or university electives are 2 credit hours. Spans 8 semesters (4 academic levels).
                  </p>
                </div>

                {/* Card 2: GPA Rules */}
                <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-3">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    GPA Formula & Quality Points
                  </h4>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 my-1">
                    4.0 Scale
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Quality Points = Grade Point × Course CH. Term GPA = Total Quality Points / Total Registered CH. Excellent: ≥ 3.6, Very Good: ≥ 3.0, Good: ≥ 2.5, Pass: ≥ 2.0.
                  </p>
                </div>

                {/* Card 3: Registration Rules */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Registration Limits (Decree 25)
                  </h4>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 my-1 tabular-nums">
                    12 - 23 CH
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Min 12 CH, standard max 18 CH. Students with GPA ≥ 3.0 or graduating can register up to 23 CH. Warning status (GPA &lt; 2.0) limits registration to 12-14 CH.
                  </p>
                </div>

                {/* Card 4: Graduation Requirements */}
                <div className="p-5 rounded-2xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/40">
                  <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Graduation Criteria
                  </h4>
                  <div className="text-2xl font-bold text-violet-600 dark:text-violet-400 my-1">
                    4 Conditions
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    140 CH completed with GPA ≥ 2.0, pass Senior Project I & II (6 CH), complete 90 hours summer practical training, and pass Military Education.
                  </p>
                </div>

              </div>

              {/* Detailed Articles Breakdown */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Summary of Degree Structure (140 Credit Hours Total):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">University Requirements:</span>
                    <span className="block text-slate-500 dark:text-slate-400">12 CH (8.57%) · 6 Compulsory + 6 Elective</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">Math & Basic Sciences:</span>
                    <span className="block text-slate-500 dark:text-slate-400">24 CH (17.14%) · 8 Compulsory Courses</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">College Computing Core:</span>
                    <span className="block text-slate-500 dark:text-slate-400">45 CH (32.14%) · 15 Compulsory Courses</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">Major Specialization:</span>
                    <span className="block text-slate-500 dark:text-slate-400">47 CH (33.57%) · 35 Compulsory + 12 Elective</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">Senior Projects:</span>
                    <span className="block text-slate-500 dark:text-slate-400">6 CH (4.29%) · Project I & II (after 98 CH)</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">Optional Humanities/Business:</span>
                    <span className="block text-slate-500 dark:text-slate-400">6 CH (4.29%) · 3 Courses × 2 CH</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
