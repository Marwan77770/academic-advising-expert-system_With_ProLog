import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Briefcase,
  Layers,
  ArrowLeft,
  FileText,
  Search,
  Maximize2,
  X,
  Sparkles,
  ChevronRight,
  Clock,
  Award,
} from 'lucide-react';
import { PROGRAMS, COURSES_CATALOG } from '../data/academicData';
import { ASSETS } from '../data/assets';
import { Course } from '../types/academic';

interface ProgramDetailPageProps {
  programId: 'ai' | 'cs' | 'is';
  onBack: () => void;
  onOpenPdf: () => void;
  onStartAdvising: () => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  programId,
  onBack,
  onOpenPdf,
  onStartAdvising,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [courseSearch, setCourseSearch] = useState('');
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);

  const program = PROGRAMS[programId];

  // Filter courses relevant to this program
  const relevantCourses = COURSES_CATALOG.filter((c) => {
    const isProgramCourse =
      c.department === 'General' ||
      c.department === (programId.toUpperCase() as 'AI' | 'CS' | 'IS');

    const matchesSemester =
      selectedSemester === 'all' || c.semester === selectedSemester;

    const matchesSearch =
      courseSearch === '' ||
      c.code.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      (c.nameAr && c.nameAr.includes(courseSearch));

    return isProgramCourse && matchesSemester && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Programs</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Open Bylaws PDF</span>
          </button>
          <button
            onClick={onStartAdvising}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check My Fit for {programId.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Program Hero Banner */}
      <div className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-r ${program.color} text-white shadow-xl relative overflow-hidden`}>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
            <span>Specialized Degree Program</span>
            <span>·</span>
            <span>140 Credit Hours Total</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {program.name}
          </h1>

          <p className="text-sm font-arabic font-medium opacity-90">
            {program.nameAr}
          </p>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal pt-1">
            {program.tagline}
          </p>
        </div>
      </div>

      {/* Program Overview, Vision & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Overview (2 cols) */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Program Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {program.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                Program Vision
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {program.vision}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Program Mission
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {program.mission}
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Key Learning Outcomes (Competencies)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              {program.learningOutcomes.map((lo, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{lo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Opportunities & Skills Acquired (1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Briefcase className="w-4 h-4" />
              <span>Career Opportunities</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {program.careerOpportunities.map((career, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-medium">{career}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
              <span>Core Skills & Tooling</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {program.skillsAcquired.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Official Prerequisite Flowchart Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Official Study Plan & Prerequisite Flowchart
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Approved faculty roadmap mapping course dependencies across Semesters 1 through 8.
            </p>
          </div>

          <button
            onClick={() => setIsFlowchartModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand Full Flowchart Image</span>
          </button>
        </div>

        {/* Flowchart Image Container */}
        <div
          onClick={() => setIsFlowchartModalOpen(true)}
          className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 cursor-pointer group"
        >
          <img
            src={program.flowchartImage}
            alt={`${program.name} Study Plan Prerequisite Map`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = '1';
                const fallback =
                  program.id === 'ai'
                    ? ASSETS.publicAiFlowchart
                    : program.id === 'cs'
                    ? ASSETS.publicCsFlowchart
                    : ASSETS.publicIsFlowchart;
                target.src = fallback;
              }
            }}
            className="w-full max-h-[460px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg">
              Click to view high-resolution flowchart
            </span>
          </div>
        </div>
      </div>

      {/* Interactive 8-Semester Course Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Curriculum Courses & Credit Hours
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Showing {relevantCourses.length} courses matching active filters.
            </p>
          </div>

          {/* Search & Semester Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Filter by code or course name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Semester Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
          <button
            onClick={() => setSelectedSemester('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap shrink-0 ${
              selectedSemester === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Semesters
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedSemester === sem
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Semester {sem}
            </button>
          ))}
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] uppercase font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Course Code</th>
                <th className="px-4 py-3">Course Title</th>
                <th className="px-3 py-3 text-center">Credit Hours</th>
                <th className="px-3 py-3 text-center">Lec + Tut + Lab</th>
                <th className="px-4 py-3">Prerequisite</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-3 py-3 text-center">Semester</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {relevantCourses.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                    {c.code}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {c.name}
                    </div>
                    {c.nameAr && (
                      <div className="text-[11px] font-arabic text-slate-400">
                        {c.nameAr}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center font-bold tabular-nums text-slate-900 dark:text-white">
                    {c.creditHours} CH
                  </td>
                  <td className="px-3 py-3 text-center font-mono text-[11px] text-slate-500 tabular-nums">
                    ({c.lectureHours}+{c.tutorialHours}+{c.labHours})
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {c.prerequisite === 'None' ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      <span className="font-medium text-amber-600 dark:text-amber-400">
                        {c.prerequisite}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {c.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                    {c.semester ? `Sem ${c.semester}` : 'Elective'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fullscreen Flowchart Modal */}
      {isFlowchartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 text-white">
              <h3 className="text-sm font-bold">
                {program.name} · Official Prerequisite Flowchart
              </h3>
              <button
                onClick={() => setIsFlowchartModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-950">
              <img
                src={program.flowchartImage}
                alt={`${program.name} Fullscreen Flowchart`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    const fallback =
                      program.id === 'ai'
                        ? ASSETS.publicAiFlowchart
                        : program.id === 'cs'
                        ? ASSETS.publicCsFlowchart
                        : ASSETS.publicIsFlowchart;
                    target.src = fallback;
                  }
                }}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
