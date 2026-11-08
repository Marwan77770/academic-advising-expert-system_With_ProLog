import React from 'react';

interface GpaGaugeMeterProps {
  gpa: number;
  standing: string;
  standingAr?: string;
  maxGpa?: number;
}

export const GpaGaugeMeter: React.FC<GpaGaugeMeterProps> = ({
  gpa,
  standing,
  standingAr,
  maxGpa = 4.0,
}) => {
  const percentage = Math.min(100, Math.max(0, (gpa / maxGpa) * 100));

  // Determine color based on GPA range
  let strokeColor = '#6366f1'; // indigo
  let statusBadgeColor = 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60';

  if (gpa >= 3.6) {
    strokeColor = '#10b981'; // emerald
    statusBadgeColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300';
  } else if (gpa >= 3.0) {
    strokeColor = '#3b82f6'; // blue
    statusBadgeColor = 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300';
  } else if (gpa >= 2.0) {
    strokeColor = '#f59e0b'; // amber
    statusBadgeColor = 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300';
  } else {
    strokeColor = '#ef4444'; // red (probation)
    statusBadgeColor = 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300';
  }

  // Semi-circle gauge math
  const radius = 80;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
      <div className="relative w-52 h-32 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 115" className="w-full h-full">
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Active Colored Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={strokeColor}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />

          {/* Min & Max Labels */}
          <text x="20" y="112" className="text-[10px] fill-slate-400 font-mono font-medium">
            0.00
          </text>
          <text x="180" y="112" textAnchor="end" className="text-[10px] fill-slate-400 font-mono font-medium">
            4.00
          </text>
        </svg>

        {/* Center GPA Text */}
        <div className="absolute bottom-2 flex flex-col items-center">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {gpa.toFixed(2)}
          </span>
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Current GPA
          </span>
        </div>
      </div>

      {/* Standing Badge */}
      <div className="mt-3">
        <div className={`inline-flex flex-col items-center px-3 py-1 rounded-lg text-xs font-semibold ${statusBadgeColor}`}>
          <span>{standing}</span>
          {standingAr && (
            <span dir="rtl" className="text-[11px] font-medium opacity-90 mt-0.5">
              {standingAr}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
