import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  AlertTriangle,
  Info,
  BookOpen,
} from 'lucide-react';
import { OFFICIAL_GRADE_SCALE } from '../utils/academicRules';
import { GradeKey } from '../types/academic';
import { ASSETS } from '../data/assets';

interface RegulationsPageProps {
  onOpenPdf: () => void;
  onNavigateToGpa: () => void;
}

export const RegulationsPage: React.FC<RegulationsPageProps> = ({
  onOpenPdf,
  onNavigateToGpa,
}) => {
  const [selectedCreditHourView, setSelectedCreditHourView] = useState<'3' | '2'>('3');

  const gradeKeys: GradeKey[] = [
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D+',
    'D',
    'F',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Misr University for Science & Technology · Decree No. 25</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Regulations & GPA Rules
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Official regulations governing credit hours, quality points calculation, academic probation, registration caps, and graduation criteria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Open Regulations PDF</span>
          </button>
          <a
            href={ASSETS.regulationsPdf}
            download="MUST_Regulations.pdf"
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800"
            aria-label="Download Official PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 1) GPA Rules Section (Loaded from gpa_rules_DONE_54195c4e.json) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <Award className="w-4 h-4" />
              <span>Section 1: Official GPA Calculation Rules</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Grade Scale & Quality Points Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Directly loaded from <code className="font-mono text-indigo-600 dark:text-indigo-400">gpa_rules_DONE_54195c4e.json</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Show scale for:</span>
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
              <button
                onClick={() => setSelectedCreditHourView('3')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedCreditHourView === '3'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                3 Credit Hours (Max 150)
              </button>
              <button
                onClick={() => setSelectedCreditHourView('2')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedCreditHourView === '2'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                2 Credit Hours (Max 100)
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Formula Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
          <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Mathematical Formula Established by Decree</span>
          </div>
          <div className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900 overflow-x-auto">
            GPA = ∑ ( Quality Points of Course ) / ∑ ( Credit Hours of all registered courses )
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-arabic">
            درجة الطالب (Grade) في أي مادة يتم تحويلها لقيمة (quality points) بضرب عدد ساعات المقرر في نقاط التقدير. يتم جمع قيم كل المواد المسجلة ثم يقسم المجموع على إجمالي الساعات المسجلة.
          </p>
        </div>

        {/* Official Grade Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] uppercase font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Letter Grade</th>
                <th className="px-4 py-3">Quality Points / Credit</th>
                <th className="px-4 py-3">
                  {selectedCreditHourView === '3' ? 'Total QP (3 CH Course)' : 'Total QP (2 CH Course)'}
                </th>
                <th className="px-4 py-3">
                  {selectedCreditHourView === '3' ? 'Minimum Marks (out of 150)' : 'Minimum Marks (out of 100)'}
                </th>
                <th className="px-4 py-3">Academic Classification</th>
                <th className="px-4 py-3 font-arabic">التقدير بالعربية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {gradeKeys.map((g) => {
                const entry = OFFICIAL_GRADE_SCALE[g];
                const multiplier = selectedCreditHourView === '3' ? 3 : 2;
                const totalQP = (entry.qualityPointsPerCredit * multiplier).toFixed(1);
                const minMark =
                  selectedCreditHourView === '3'
                    ? entry.minPercentage3CH > 0
                      ? `${entry.minPercentage3CH} / 150 (≥ ${(entry.minPercentage3CH / 1.5).toFixed(0)}%)`
                      : '< 90 / 150 (Fail)'
                    : entry.minPercentage2CH > 0
                    ? `${entry.minPercentage2CH} / 100 (≥ ${entry.minPercentage2CH}%)`
                    : '< 60 / 100 (Fail)';

                return (
                  <tr key={g} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-bold font-mono text-sm text-slate-900 dark:text-white">
                      {g}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
                      {entry.qualityPointsPerCredit.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                      {totalQP} pts
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500">
                      {minMark}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                      {entry.descriptionEn}
                    </td>
                    <td className="px-4 py-3 font-arabic font-medium text-slate-600 dark:text-slate-400">
                      {entry.descriptionAr}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onNavigateToGpa}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
          >
            <span>Launch Live Interactive GPA Calculator</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* 2) Credit Hours System Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <Clock className="w-4 h-4" />
            <span>Section 2: Credit Hour System Structure</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Course Weights & Academic Level Breakdown
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            140 Total Credit Hours structured across 4 academic levels (8 semesters)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Level 1 (Freshman)
            </span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              36 Credit Hours
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Semester 1 (18 CH) + Semester 2 (18 CH). Foundational calculus, physics, programming, and university requirements.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Level 2 (Sophomore)
            </span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              36 Credit Hours
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Semester 3 (18 CH) + Semester 4 (18 CH). Data structures, algorithms, discrete math, logic design, databases, intro to AI.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Level 3 (Junior)
            </span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              36 Credit Hours
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Semester 5 (18 CH) + Semester 6 (18 CH). Core major specialization courses, operating systems, and advanced electives.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Level 4 (Senior)
            </span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              32 Credit Hours
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Semester 7 (17 CH) + Semester 8 (15 CH). Senior Graduation Project I & II (6 CH), specialized topics, and advanced electives.
            </p>
          </div>
        </div>

        {/* Standard Course Weight Norms */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Credit Hour Rule Definition:</span>
            <span className="text-slate-600 dark:text-slate-300 ml-2">
              Standard academic course = 3 credit hours (2 lecture hours + 2 lab/tutorial hours). Selected topics, English, and university electives = 2 credit hours.
            </span>
          </div>
          <span className="px-3 py-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
            1 Credit Hour = 50 min lecture/wk
          </span>
        </div>
      </section>

      {/* 3) Academic Warnings & Registration Limits (Decree No. 25) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Section 3: Academic Warnings & Registration Limits</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Decree No. 25 Registration Caps & Warning Bylaws
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-arabic">
            قرار رئيس الجامعة رقم (25) بتاريخ 31/8/2026 بشأن قواعد التسجيل للفصل الدراسي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Article 1 */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Article 1
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">12 - 18 CH (Standard)</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Baseline Minimum & Maximum Caps
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The baseline minimum registration is <strong>12 credit hours</strong> (except for graduating seniors). The maximum standard registration is <strong>18 credit hours</strong>.
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ★ Can increase up to <strong>23 credit hours</strong> for students with GPA ≥ 3.0 or in graduation semesters.
            </div>
          </div>

          {/* Article 2 */}
          <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                Article 2
              </span>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">GPA &lt; 2.0 (Warning)</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Academic Probation & Restrictions
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When a student cumulative GPA is below 2.0, registration is restricted to the <strong>minimum 12 credit hours</strong> to focus on raising the GPA.
            </p>
            <div className="pt-2 border-t border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-medium">
              May increase by 2 hours (up to 14 CH), or up to 15 CH in special cases with fee payment.
            </div>
          </div>

          {/* Article 3 & 4 */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Articles 3 & 4
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">2.0 ≤ GPA &lt; 3.0</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Standard Progression & Conflicts
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Students with GPA between 2.0 and 2.99 register standard credit hours up to 18 CH according to their major study plan.
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
              Strict condition: <strong>No timetable conflicts</strong> permitted in any registration scenario.
            </div>
          </div>

        </div>
      </section>

      {/* 4) Graduation Requirements Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Section 4: Graduation Requirements Checklist</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Mandatory Conditions for Awarding the Bachelor Degree
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Every candidate must satisfy all four conditions to graduate from the Faculty of Information Technology:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Complete All 140 Required Credit Hours
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Successful completion of all compulsory and elective courses across University (12 CH), Math & Science (24 CH), College Core (45 CH), Specialization (47 CH), Projects (6 CH), and Optional courses (6 CH) with a minimum Cumulative GPA of 2.0.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Pass Senior Graduation Project (I & II)
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Study and defend a two-semester capstone graduation project (6 CH total) taken in consecutive semesters. Prerequisite to enroll in Senior Project I is completing 98 credit hours.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Mandatory Summer Practical Training (90 Hours)
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Complete a 6-week summer industrial training (90 hours) in a recognized tech company or institutional laboratory. Accessible once a student achieves at least 63 credit hours. Non-credit mandatory graduation requirement.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 font-bold">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Military Education Course (التربية العسكرية)
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Egyptian male students must successfully pass the prescribed Military Education program as mandated by national higher education laws before degree conferral.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
