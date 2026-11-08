import React, { useState } from 'react';

interface RadarDataPoint {
  axis: string;
  axisAr: string;
  ai: number;
  cs: number;
  is: number;
}

interface RadarChartProps {
  selectedProgram?: 'ai' | 'cs' | 'is' | 'all';
  onSelectProgram?: (program: 'ai' | 'cs' | 'is') => void;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  selectedProgram = 'all',
  onSelectProgram,
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  const data: RadarDataPoint[] = [
    { axis: 'Programming Rigor', axisAr: 'البرمجة والخوارزميات', ai: 88, cs: 96, is: 80 },
    { axis: 'Mathematics & Stats', axisAr: 'الرياضيات والإحصاء', ai: 95, cs: 90, is: 75 },
    { axis: 'AI & Machine Learning', axisAr: 'الذكاء الاصطناعي', ai: 98, cs: 68, is: 60 },
    { axis: 'Business & Management', axisAr: 'إدارة الأعمال والمؤسسات', ai: 45, cs: 40, is: 98 },
    { axis: 'Data Science & Mining', axisAr: 'علم البيانات والتنقيب', ai: 92, cs: 75, is: 88 },
    { axis: 'Market Demand', axisAr: 'الطلب في سوق العمل', ai: 96, cs: 94, is: 92 },
    { axis: 'Research Opportunities', axisAr: 'البحث العلمي والابتكار', ai: 95, cs: 88, is: 74 },
    { axis: 'Systems & Architecture', axisAr: 'الأنظمة والمعمارية', ai: 82, cs: 98, is: 85 },
  ];

  const size = 420;
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = data.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Levels rings
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (value: number, index: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getPolygonPoints = (key: 'ai' | 'cs' | 'is') => {
    return data
      .map((d, i) => {
        const { x, y } = getCoordinates(d[key], i);
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible drop-shadow-xs"
        >
          {/* Circular / Polygonal background grid levels */}
          {levels.map((level, lvlIdx) => {
            const levelPoints = data
              .map((_, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const r = level * radius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ');

            return (
              <g key={`lvl-${lvlIdx}`}>
                <polygon
                  points={levelPoints}
                  className="fill-none stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="1"
                  strokeDasharray={lvlIdx === levels.length - 1 ? undefined : '2 2'}
                />
                <text
                  x={center + 6}
                  y={center - level * radius + 10}
                  className="text-[9px] fill-slate-400 font-mono select-none"
                >
                  {Math.round(level * 100)}%
                </text>
              </g>
            );
          })}

          {/* Radial axis lines */}
          {data.map((_, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={`axis-line-${i}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Polygons for Programs */}
          {/* CS Polygon */}
          {(selectedProgram === 'all' || selectedProgram === 'cs') && (
            <polygon
              points={getPolygonPoints('cs')}
              className="fill-blue-500/25 stroke-blue-500 transition-all duration-300 hover:fill-blue-500/40"
              strokeWidth="2.5"
            />
          )}

          {/* IS Polygon */}
          {(selectedProgram === 'all' || selectedProgram === 'is') && (
            <polygon
              points={getPolygonPoints('is')}
              className="fill-emerald-500/25 stroke-emerald-500 transition-all duration-300 hover:fill-emerald-500/40"
              strokeWidth="2.5"
            />
          )}

          {/* AI Polygon */}
          {(selectedProgram === 'all' || selectedProgram === 'ai') && (
            <polygon
              points={getPolygonPoints('ai')}
              className="fill-indigo-500/30 stroke-indigo-600 transition-all duration-300 hover:fill-indigo-500/45"
              strokeWidth="2.5"
            />
          )}

          {/* Axis Data Points & Labels */}
          {data.map((d, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const labelDistance = radius + 24;
            const lx = center + labelDistance * Math.cos(angle);
            const ly = center + labelDistance * Math.sin(angle);

            const isHovered = hoveredAxis === d.axis;

            return (
              <g
                key={`axis-label-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredAxis(d.axis)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                {/* Axis Anchor Circle */}
                <circle
                  cx={center + radius * Math.cos(angle)}
                  cy={center + radius * Math.sin(angle)}
                  r="3.5"
                  className={`transition-colors ${
                    isHovered
                      ? 'fill-indigo-600 dark:fill-indigo-400'
                      : 'fill-slate-400 dark:fill-slate-600'
                  }`}
                />

                {/* Text Label */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor={Math.abs(lx - center) < 10 ? 'middle' : lx > center ? 'start' : 'end'}
                  dominantBaseline="central"
                  className={`text-[11px] font-medium transition-colors select-none ${
                    isHovered
                      ? 'fill-indigo-600 dark:fill-indigo-400 font-bold'
                      : 'fill-slate-700 dark:fill-slate-300'
                  }`}
                >
                  {d.axis}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Program Selector Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <button
          onClick={() => onSelectProgram && onSelectProgram('ai')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            selectedProgram === 'ai' || selectedProgram === 'all'
              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-xs'
              : 'opacity-40 border-transparent hover:opacity-75'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" />
          <span>AI (Artificial Intelligence)</span>
        </button>

        <button
          onClick={() => onSelectProgram && onSelectProgram('cs')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            selectedProgram === 'cs' || selectedProgram === 'all'
              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-xs'
              : 'opacity-40 border-transparent hover:opacity-75'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
          <span>CS (Computer Science)</span>
        </button>

        <button
          onClick={() => onSelectProgram && onSelectProgram('is')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            selectedProgram === 'is' || selectedProgram === 'all'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-xs'
              : 'opacity-40 border-transparent hover:opacity-75'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
          <span>IS (Information Systems)</span>
        </button>
      </div>
    </div>
  );
};
