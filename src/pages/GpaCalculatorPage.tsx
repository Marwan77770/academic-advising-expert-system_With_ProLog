import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  calculateTermGpa,
  calculateCumulativeGpa,
  OFFICIAL_GRADE_SCALE,
  getRegistrationLimits,
} from '../utils/academicRules';
import { CourseGradeInput, GradeKey } from '../types/academic';
import { GpaGaugeMeter } from '../components/GpaGaugeMeter';
import { COURSES_CATALOG } from '../data/academicData';

interface GpaCalculatorPageProps {
  onNavigateToRegulations: () => void;
  onOpenPdf: () => void;
}

export const GpaCalculatorPage: React.FC<GpaCalculatorPageProps> = ({
  onNavigateToRegulations,
  onOpenPdf,
}) => {
  // Preset default courses (e.g. Semester 1 curriculum)
  const [courses, setCourses] = useState<CourseGradeInput[]>([
    { id: '1', courseCode: 'CS 101', courseName: 'Introduction to Computer Science', creditHours: 3, grade: 'A' },
    { id: '2', courseCode: 'CS 102', courseName: 'Introduction to Computer Programming', creditHours: 3, grade: 'A-' },
    { id: '3', courseCode: 'Math 101', courseName: 'Calculus I', creditHours: 3, grade: 'B+' },
    { id: '4', courseCode: 'Phy 101', courseName: 'Physics I', creditHours: 3, grade: 'B' },
    { id: '5', courseCode: 'UCOMP 101', courseName: 'Computer Skills', creditHours: 2, grade: 'A+' },
    { id: '6', courseCode: 'UENGL 101', courseName: 'English Language Skills', creditHours: 2, grade: 'B+' },
  ]);

  // Cumulative simulator state
  const [hasPreviousRecord, setHasPreviousRecord] = useState(false);
  const [previousGpa, setPreviousGpa] = useState<number>(3.15);
  const [previousCreditHours, setPreviousCreditHours] = useState<number>(36);
  const [isGraduating, setIsGraduating] = useState(false);

  const gradeOptions: GradeKey[] = [
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

  // Calculation results
  const termResult = calculateTermGpa(courses, isGraduating);
  const cumResult = hasPreviousRecord
    ? calculateCumulativeGpa(previousGpa, previousCreditHours, courses, isGraduating)
    : null;

  // Add empty course row
  const handleAddCourse = () => {
    const newId = String(Date.now());
    setCourses((prev) => [
      ...prev,
      {
        id: newId,
        courseCode: `ELEC ${prev.length + 1}`,
        courseName: 'Elective Course',
        creditHours: 3,
        grade: 'B',
      },
    ]);
  };

  // Remove course row
  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Update specific course row
  const handleUpdateCourse = (
    id: string,
    field: keyof CourseGradeInput,
    value: string | number
  ) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Preset loaders from actual curriculum
  const loadPresetSemester = (semesterNumber: number) => {
    const semCourses = COURSES_CATALOG.filter((c) => c.semester === semesterNumber);
    if (semCourses.length > 0) {
      setCourses(
        semCourses.map((c, i) => ({
          id: `sem-${semesterNumber}-${i}`,
          courseCode: c.code,
          courseName: c.name,
          creditHours: c.creditHours,
          grade: 'B+',
        }))
      );
    }
  };

  const handleReset = () => {
    setCourses([
      { id: '1', courseCode: 'CS 101', courseName: 'Introduction to Computer Science', creditHours: 3, grade: 'B' },
      { id: '2', courseCode: 'CS 102', courseName: 'Introduction to Computer Programming', creditHours: 3, grade: 'B' },
      { id: '3', courseCode: 'Math 101', courseName: 'Calculus I', creditHours: 3, grade: 'B' },
    ]);
  };

  const activeGpa = cumResult ? cumResult.cumulativeGpa : termResult.termGpa;
  const activeStanding = cumResult ? cumResult.academicStanding : termResult.academicStanding;
  const activeStandingAr = cumResult ? cumResult.academicStandingAr : termResult.academicStandingAr;
  const activeLimits = getRegistrationLimits(activeGpa, isGraduating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Decree No. 25 & gpa_rules.json Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Official GPA & Quality Points Calculator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Calculates your semester and cumulative GPA using university grade points and computes your next-semester allowed credit hours under MUST regulations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToRegulations}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>View GPA Rules</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Loaders */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Quick Pre-fill Semester Courses:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[1, 2, 3, 4].map((sem) => (
            <button
              key={sem}
              onClick={() => loadPresetSemester(sem)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Semester {sem} Preset
            </button>
          ))}
          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calculator Table + Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Course Rows Form (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Course Grade Entries ({courses.length} Courses)
            </h2>
            <button
              onClick={handleAddCourse}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[620px] text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-[11px] uppercase font-semibold text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-2.5 rounded-l-lg">Course Code</th>
                  <th className="px-3 py-2.5">Course Name</th>
                  <th className="px-3 py-2.5 w-24">Credit Hours</th>
                  <th className="px-3 py-2.5 w-28">Grade</th>
                  <th className="px-3 py-2.5 w-24 text-right">Points</th>
                  <th className="px-2 py-2.5 w-10 text-center rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {courses.map((c) => {
                  const entry = OFFICIAL_GRADE_SCALE[c.grade] || OFFICIAL_GRADE_SCALE['F'];
                  const qp = (entry.qualityPointsPerCredit * c.creditHours).toFixed(1);

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={c.courseCode}
                          onChange={(e) => handleUpdateCourse(c.id, 'courseCode', e.target.value)}
                          className="w-full px-2 py-1 text-xs font-mono font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white"
                          placeholder="Code"
                        />
                      </td>

                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={c.courseName}
                          onChange={(e) => handleUpdateCourse(c.id, 'courseName', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white"
                          placeholder="Course Name"
                        />
                      </td>

                      <td className="px-3 py-2">
                        <select
                          value={c.creditHours}
                          onChange={(e) => handleUpdateCourse(c.id, 'creditHours', Number(e.target.value))}
                          className="w-full px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white font-mono"
                        >
                          <option value={1}>1 CH</option>
                          <option value={2}>2 CH</option>
                          <option value={3}>3 CH</option>
                          <option value={4}>4 CH</option>
                        </select>
                      </td>

                      <td className="px-3 py-2">
                        <select
                          value={c.grade}
                          onChange={(e) => handleUpdateCourse(c.id, 'grade', e.target.value as GradeKey)}
                          className="w-full px-2 py-1 text-xs font-bold font-mono bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded text-indigo-700 dark:text-indigo-300"
                        >
                          {gradeOptions.map((g) => (
                            <option key={g} value={g}>
                              {g} ({OFFICIAL_GRADE_SCALE[g].qualityPointsPerCredit.toFixed(1)} pts)
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-3 py-2 text-right font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        {qp} pts
                      </td>

                      <td className="px-2 py-2 text-center">
                        <button
                          onClick={() => handleRemoveCourse(c.id)}
                          disabled={courses.length <= 1}
                          className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
                          title="Delete Course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cumulative Simulator Accordion */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-900 dark:text-white">
                <input
                  type="checkbox"
                  checked={hasPreviousRecord}
                  onChange={(e) => setHasPreviousRecord(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Include Previous Cumulative GPA Record</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={isGraduating}
                  onChange={(e) => setIsGraduating(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Graduating Senior (Final Semester)</span>
              </label>
            </div>

            {hasPreviousRecord && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Previous Cumulative GPA:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={previousGpa}
                    onChange={(e) => setPreviousGpa(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Previous Completed Credit Hours:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="140"
                    value={previousCreditHours}
                    onChange={(e) => setPreviousCreditHours(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Results Deck & Gauge (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Animated Gauge Meter */}
          <GpaGaugeMeter
            gpa={activeGpa}
            standing={activeStanding}
            standingAr={activeStandingAr}
          />

          {/* Result Breakdown Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Calculation Summary</span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                Decree No. 25
              </span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-500">Term Registered Hours:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {termResult.totalCreditHours} CH
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-500">Term Quality Points:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                  {termResult.totalQualityPoints.toFixed(2)} pts
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-500">Term GPA:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums text-sm">
                  {termResult.termGpa.toFixed(2)}
                </span>
              </div>

              {cumResult && (
                <>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40">
                    <span className="text-indigo-900 dark:text-indigo-300 font-semibold">Total Cumulative CH:</span>
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 font-mono tabular-nums">
                      {cumResult.combinedTotalCreditHours} CH
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40">
                    <span className="text-indigo-900 dark:text-indigo-300 font-semibold">Cumulative GPA:</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300 font-mono tabular-nums text-sm">
                      {cumResult.cumulativeGpa.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Registration Cap Warning / Allowance */}
            <div
              className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
                activeLimits.isProbation
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200'
                  : activeLimits.canIncreaseTo23
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                  : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                {activeLimits.isProbation ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )}
                <span>Next Semester Registration Cap:</span>
              </div>
              <div className="text-base font-extrabold font-mono tabular-nums">
                {activeLimits.minCH} to {activeLimits.maxCH} Credit Hours
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {activeLimits.notes[0]}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
