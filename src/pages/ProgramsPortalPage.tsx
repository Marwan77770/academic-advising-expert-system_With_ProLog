import React from 'react';
import {
  Sparkles,
  BookOpen,
  Cpu,
  Database,
  Binary,
  ArrowRight,
  FileText,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import { PROGRAMS } from '../data/academicData';

interface ProgramsPortalPageProps {
  onSelectProgram: (programId: 'general-regulations' | 'ai' | 'cs' | 'is') => void;
  onOpenPdf: () => void;
}

export const ProgramsPortalPage: React.FC<ProgramsPortalPageProps> = ({
  onSelectProgram,
  onOpenPdf,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Faculty Academic Programs Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Degree Programs & Regulations
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Select any of the four portals below to access comprehensive curriculum plans, credit hours distributions, course prerequisites, and official university regulation bylaws.
        </p>
      </div>

      {/* The 4 Large Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: General Regulations */}
        <div
          onClick={() => onSelectProgram('general-regulations')}
          className="relative group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center mb-6 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              <span>Official University Bylaws</span>
              <span>·</span>
              <span>27 Pages Document</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              1. General Academic Regulations
            </h3>
            <p className="text-xs font-arabic text-slate-500 mt-1">
              اللائحة الأكاديمية العامة وقواعد التسجيل ونظام الساعات المعتمدة
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Complete faculty bylaws covering Articles 18.1 to 22: Credit Hours System (140 CH), registration minimums and maximums (Decree 25), GPA formula, quality points, academic warnings, and graduation requirements with embedded PDF viewer.
            </p>

            {/* Micro badges */}
            <div className="grid grid-cols-2 gap-2 mt-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>140 Credit Hours Total</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>Decree No. 25 Caps</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Open Regulations & PDF Viewer</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: AI Program */}
        <div
          onClick={() => onSelectProgram('ai')}
          className="relative group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-violet-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-2">
              <span>Specialized Major</span>
              <span>·</span>
              <span>Cognitive Systems & Robotics</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              2. Artificial Intelligence (AI) Program
            </h3>
            <p className="text-xs font-arabic text-slate-500 mt-1">
              برنامج الذكاء الاصطناعي - تعلم الآلة، الروبوتات، والرؤية الحاسوبية
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Explore 35 CH compulsory and 12 CH elective AI courses including Neural Networks (AI 343), Robotics Kinematics (AI 332), Machine Learning (AI 414), Computer Vision (AI 483), and full visual flowchart.
            </p>

            {/* Micro badges */}
            <div className="grid grid-cols-2 gap-2 mt-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                <span>35 CH Major Core</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Visual Prereq Flowchart</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400">
            <span>Explore AI Curriculum & Study Plan</span>
            <div className="w-8 h-8 rounded-full bg-violet-50 dark:bg-violet-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: CS Program */}
        <div
          onClick={() => onSelectProgram('cs')}
          className="relative group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Binary className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
              <span>Specialized Major</span>
              <span>·</span>
              <span>Theory, Compilers & Systems</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              3. Computer Science (CS) Program
            </h3>
            <p className="text-xs font-arabic text-slate-500 mt-1">
              برنامج علوم الحاسب - النظم الموزعة، أمن المعلومات، ونظرية الحوسبة
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Article 21 curriculum: In-depth study of Theory of Computation (CS 321), Compiler Design (CS 411), Parallel Computing (CS 484), Computer Security (CS 452), and Computer Graphics (CS 302).
            </p>

            {/* Micro badges */}
            <div className="grid grid-cols-2 gap-2 mt-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Binary className="w-3.5 h-3.5 text-blue-500" />
                <span>35 CH Compulsory CS</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                <span>Official CS Prerequisite Map</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
            <span>Explore CS Curriculum & Study Plan</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4: IS Program */}
        <div
          onClick={() => onSelectProgram('is')}
          className="relative group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center mb-6 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Database className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              <span>Specialized Major</span>
              <span>·</span>
              <span>Enterprise & Big Data Systems</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              4. Information Systems (IS) Program
            </h3>
            <p className="text-xs font-arabic text-slate-500 mt-1">
              برنامج نظم المعلومات - ذكاء الأعمال، قواعد البيانات الضخمة، ودعم القرار
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Article 22 curriculum: Mastering Electronic Commerce (IS 301), Operations Research (IS 321), Big Data Analytics (IS 421), Business Intelligence & DSS (IS 432), and Enterprise Geographic Info Systems.
            </p>

            {/* Micro badges */}
            <div className="grid grid-cols-2 gap-2 mt-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                <span>35 CH Compulsory IS</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Layers className="w-3.5 h-3.5 text-teal-500" />
                <span>Full Degree Roadmap</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>Explore IS Curriculum & Study Plan</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

      {/* Quick Access to Bylaws Document */}
      <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Need to inspect the original PDF decree and credit-hour tables?
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Access the embedded PDF reader with indexed tables of contents and search.
            </div>
          </div>
        </div>

        <button
          onClick={onOpenPdf}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
        >
          Open Regulations PDF
        </button>
      </div>

    </div>
  );
};
