import React from 'react';
import {
  Sparkles,
  BookOpen,
  Calculator,
  GitCompare,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
} from 'lucide-react';
import { UNIVERSITY_INFO, FACULTY_STATS, PROGRAMS } from '../data/academicData';
import { ASSETS } from '../data/assets';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenPdf: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenPdf }) => {
  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      
      {/* 1) Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Institution kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                <Cpu className="w-3.5 h-3.5" />
                <span>Misr University for Science and Technology · Faculty of IT</span>
              </div>

              {/* Main Heading & Subtitle */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                Academic Advising <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
                  Expert System
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Helping Students Choose the Right Academic Program
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A rule-based knowledge inference platform for prospective and enrolled students at the Faculty of Information Technology. Synthesizes student aptitudes, algorithmic interests, and academic bylaws into personalized degree pathways.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('expert-system')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-md shadow-indigo-500/25 transition-all duration-200 active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Expert System</span>
                </button>

                <button
                  onClick={() => onNavigate('programs')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Explore Programs</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Decree No. 25 Bylaws Integrated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>140 Credit Hours Scale</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-500" />
                  <span>Accredited Faculty</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 group">
                <img
                  src={ASSETS.heroFaculty}
                  alt="MUST University main campus"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = '1';
                      target.src = ASSETS.publicHeroFaculty;
                    }
                  }}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                    MUST Technology Campus
                  </span>
                  <h3 className="text-lg font-bold mt-1 text-white">
                    Faculty of Information Technology
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Specialized majors in Artificial Intelligence, Computer Science, and Information Systems.
                  </p>
                </div>
              </div>

              {/* Floating Quick Action Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-xl glass-card bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Official GPA Calculator
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Accurate quality points from decree
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('gpa-calculator')}
                  className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                  aria-label="Calculate GPA"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2) Statistics Section (Animated Counters) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {FACULTY_STATS.programsCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mt-1">
              Academic Programs
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              AI, CS & Information Systems
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {FACULTY_STATS.studentsCount.toLocaleString()}+
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mt-1">
              Active Enrolled Students
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Guided by Academic Advising
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 tabular-nums">
              {FACULTY_STATS.coursesCount}+
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mt-1">
              Accredited Courses
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Full Prerequisite Trees
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {FACULTY_STATS.creditHoursRequired} CH
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mt-1">
              Graduation Requirement
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Across 4 Academic Levels
            </span>
          </div>
        </div>
      </section>

      {/* 3) About University & Faculty Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* University Overview */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-4 h-4" />
                <span>About Misr University for Science and Technology (MUST)</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {UNIVERSITY_INFO.name}
              </h2>
              <p className="text-xs font-arabic text-slate-600 dark:text-slate-400 font-medium">
                {UNIVERSITY_INFO.nameAr}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {UNIVERSITY_INFO.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                    University Vision
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {UNIVERSITY_INFO.vision}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                    University Mission
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {UNIVERSITY_INFO.mission}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Established 1996 · Presidential Decree No. 245</span>
              <button
                onClick={onOpenPdf}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Read Official Bylaws PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Faculty of IT Overview */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <Cpu className="w-4 h-4" />
                <span>Faculty of Information Technology</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Academic Excellence & Three Specialized Programs
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Faculty of Information Technology comprises three leading academic departments, each tailored to distinct technological frontiers:
              </p>

              <div className="space-y-3">
                <div
                  onClick={() => onNavigate('program-ai')}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 cursor-pointer transition-colors bg-indigo-50/30 dark:bg-indigo-950/20 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      1. Artificial Intelligence (AI) Department
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Machine learning, neural networks, robotics, NLP, and computer vision.
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                </div>

                <div
                  onClick={() => onNavigate('program-cs')}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer transition-colors bg-blue-50/30 dark:bg-blue-950/20 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      2. Computer Science (CS) Department
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Core theory, algorithms, operating systems, compilers, and cybersecurity.
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>

                <div
                  onClick={() => onNavigate('program-is')}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition-colors bg-emerald-50/30 dark:bg-emerald-950/20 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      3. Information Systems (IS) Department
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Enterprise architecture, big data analytics, business intelligence & DSS.
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>{UNIVERSITY_INFO.dean}</span>
              <button
                onClick={() => onNavigate('comparison')}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Compare Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4) Core Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Advising Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Engineered for Student Success & Academic Planning
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Explore dedicated modules designed to guide your 4-year undergraduate journey from freshman matriculation to graduation capstone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Expert System */}
          <div
            onClick={() => onNavigate('expert-system')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Rule-Based Expert System
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Chatbot-style diagnostic advisor that analyzes your strengths, computational interests, and career goals to compute program recommendation confidence scores.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Launch Advisor Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 2: GPA Calculator */}
          <div
            onClick={() => onNavigate('gpa-calculator')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Official GPA Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Calculates term and cumulative GPA using exact university quality points (A=4.0, A-=3.6, B+=3.3...) and verifies semester credit caps under Decree No. 25.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Calculate Grades & Credits</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 3: Program Comparison */}
          <div
            onClick={() => onNavigate('comparison')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GitCompare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                Program Comparison & Radar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Side-by-side radar chart evaluating AI, CS, and IS across 8 dimensions: programming, mathematics, AI depth, business systems, market demand, and research.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <span>View Comparative Radar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 4: Academic Regulations */}
          <div
            onClick={() => onNavigate('regulations')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                Academic Regulations & GPA Rules
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Full digital breakdown of credit hour rules, probation warnings (GPA &lt; 2.0), registration caps (12-23 CH), and embedded PDF viewer.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Browse Bylaws & Rules</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 5: Graduate Requirements */}
          <div
            onClick={() => onNavigate('regulations')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                Graduation Requirements
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Track the 4 pillars of graduation: 140 credit hours with GPA ≥ 2.0, Senior Project I & II (6 CH), 90 hours summer training, and Military Education.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Check Degree Checklists</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 6: Study Plan Flowcharts */}
          <div
            onClick={() => onNavigate('programs')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                Interactive Study Plans & Flowcharts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Visual prerequisite maps, semester-by-semester courses, and official faculty flowcharts for AI, CS, and IS majors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Explore Study Plans</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 5) Visual Laboratory & Campus Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative group">
            <img
              src={ASSETS.aiRoboticsLab}
              alt="MUST University New Campus"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = '1';
                  target.src = ASSETS.publicAiRoboticsLab;
                }
              }}
              className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold text-indigo-300">Modern Campus</span>
              <h4 className="text-base font-bold mt-1 text-white">
                MUST University New Campus
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Modern facilities and learning spaces built for hands-on technology education.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative group">
            <img
              src={ASSETS.studentsHub}
              alt="MUST University Library Main Hall"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = '1';
                  target.src = ASSETS.publicStudentsHub;
                }
              }}
              className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold text-cyan-300">Learning & Study Space</span>
              <h4 className="text-base font-bold mt-1 text-white">
                Library Main Hall
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                A quiet space for study, research, and graduation project work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6) Final Advising CTA Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Ready to find your ideal IT degree?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
              Launch Your Interactive Academic Advising Session
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Answer 7 targeted questions covering your mathematical preferences, programming style, and career ambitions. Receive immediate recommendation percentages with explainable rule traces.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('expert-system')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all active:scale-95"
            >
              Start Advising Session
            </button>
            <button
              onClick={() => onNavigate('gpa-calculator')}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              Calculate GPA
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
