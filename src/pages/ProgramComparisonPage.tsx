import React, { useState } from 'react';
import {
  GitCompare,
  Sparkles,
  Cpu,
  Binary,
  Database,
  Check,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { RadarChart } from '../components/RadarChart';
import { PROGRAMS } from '../data/academicData';

interface ProgramComparisonPageProps {
  onNavigateToProgram: (programId: 'ai' | 'cs' | 'is') => void;
  onStartAdvising: () => void;
}

export const ProgramComparisonPage: React.FC<ProgramComparisonPageProps> = ({
  onNavigateToProgram,
  onStartAdvising,
}) => {
  const [selectedRadarView, setSelectedRadarView] = useState<'ai' | 'cs' | 'is' | 'all'>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const comparisonCategories = [
    {
      id: 'programming',
      category: '1. Programming Rigor & Stack',
      categoryAr: 'مستوى البرمجة واللغات المستخدمة',
      ai: 'High (Python, PyTorch, C++, ROS, OpenCV, TensorFlow, Scikit-learn). Emphasis on matrix operations, tensor manipulation, and cognitive pipelines.',
      cs: 'Very High (C, C++, Rust, Java, Assembly, Linux Kernel, Python). Deep low-level memory allocation, pointer manipulation, and compiler construction.',
      is: 'Moderate to High (Enterprise SQL, Python, Java, JavaScript, Cloud Web APIs). Focus on database transaction ACID properties and enterprise business tools.',
    },
    {
      id: 'math',
      category: '2. Mathematics & Statistics Depth',
      categoryAr: 'مستوى الرياضيات والإحصاء',
      ai: 'Very High (Calculus I & II, Linear Algebra, Applied Probability & Statistics, Gradient Optimization, Neural Loss Modeling).',
      cs: 'High (Calculus I & II, Linear Algebra, Discrete Math, Graph Theory, Numerical Methods, Computational Complexity).',
      is: 'Moderate (Calculus, Linear Algebra, Applied Statistics, Operations Research, Linear Programming, Decision Analysis).',
    },
    {
      id: 'ai-content',
      category: '3. Artificial Intelligence Content',
      categoryAr: 'محتوى ومقررات الذكاء الاصطناعي',
      ai: 'Maximum (35 CH core: Machine Learning, Deep Learning, NLP, Robotics Kinematics, Computer Vision, Signal & Speech, Fuzzy Systems).',
      cs: 'Moderate (Introduces Intro to AI 201, Machine Learning AI 414, Neural Networks AI 343, Image Processing CS 383).',
      is: 'Applied (Intro to AI 201, Data Mining IS 322, Data Science AI 342, Business Intelligence & DSS IS 432).',
    },
    {
      id: 'business',
      category: '4. Business & Enterprise Content',
      categoryAr: 'المحتوى الإداري ونظم الأعمال',
      ai: 'Minimal (Human-Machine Interface, Selected Topics, Standard Humanities and Optional Courses).',
      cs: 'Minimal (Software Project Management CS 442, Standard Humanities). Core focus remains on technical infrastructure.',
      is: 'Extensive (E-Commerce IS 301, Systems Analysis & Design IS 311, Business Intelligence & DSS IS 432, Operations Research, Big Data).',
    },
    {
      id: 'data-science',
      category: '5. Data Science & Analytics',
      categoryAr: 'محتوى علم البيانات والتحليلات',
      ai: 'Advanced (Feature Engineering, Deep Neural Embeddings, Transformer Models, High-Dimensional Perceptual Datasets).',
      cs: 'Theoretical (Big-O space complexity, Parallel MapReduce algorithms, Distributed databases, Cache structures).',
      is: 'Comprehensive Enterprise (Data Mining, Big Data Analytics IS 421, Data Warehouses, ETL Pipelines, Power BI/Tableau).',
    },
    {
      id: 'careers',
      category: '6. Career Opportunities',
      categoryAr: 'مجالات العمل والوظائف المتاحة',
      ai: 'Machine Learning Engineer, Computer Vision Scientist, NLP Specialist, Robotics Software Engineer, Autonomous Systems Architect.',
      cs: 'Systems Software Engineer, Backend Infrastructure Architect, Cyber Security Specialist, Compiler/Kernel Engineer, Game Engine Programmer.',
      is: 'Enterprise Systems Analyst, Business Intelligence Consultant, Database Administrator (DBA), Big Data Architect, IT Project Manager.',
    },
    {
      id: 'research',
      category: '7. Research & Innovation Opportunities',
      categoryAr: 'فرص البحث العلمي والدراسات العليا',
      ai: 'Rapidly expanding international publications in Generative AI, Robotics, Computer Vision, and Medical Diagnostics.',
      cs: 'Foundational computer science research in Cryptography, High-Performance Computing (HPC), Compilers, and Quantum Computing.',
      is: 'Applied organizational research in Decision Modeling, Enterprise Blockchain, Geographic Information Systems (GIS), and Digital Strategy.',
    },
    {
      id: 'market-demand',
      category: '8. Market Demand & Industry Growth',
      categoryAr: 'الطلب في سوق العمل المحلي والدولي',
      ai: 'Explosive growth across tech multinationals, healthcare robotics, autonomous vehicles, and FinTech algorithmic trading.',
      cs: 'Consistently the most stable, foundational demand across all software companies, operating system vendors, and defense/aerospace.',
      is: 'Extremely high demand in commercial banks, consulting firms (Big 4), telecommunications, government digital transformation, and ERP.',
    },
  ];

  const filteredCategories =
    activeCategoryFilter === 'all'
      ? comparisonCategories
      : comparisonCategories.filter((c) => c.id === activeCategoryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 mb-3">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Curriculum & Career Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Comprehensive Program Comparison
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Evaluate Artificial Intelligence (AI), Computer Science (CS), and Information Systems (IS) across curriculum depth, mathematical requirements, and career opportunities.
        </p>
      </div>

      {/* Side-by-Side Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* AI Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/50 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                140 Credit Hours
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Artificial Intelligence (AI)
              </h3>
              <p className="text-xs font-arabic text-slate-500">
                برنامج الذكاء الاصطناعي
              </p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tailored for students who love probability, data patterns, and creating autonomous cognitive agents that perceive and act.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Math Rigor:</span>
                <span className="font-bold text-indigo-600">95% (Highest)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Depth:</span>
                <span className="font-bold text-indigo-600">98% (Core Major)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Top Role:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">ML / Vision Engineer</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigateToProgram('ai')}
              className="w-full py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore AI Degree Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CS Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                140 Credit Hours
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Computer Science (CS)
              </h3>
              <p className="text-xs font-arabic text-slate-500">
                برنامج علوم الحاسب
              </p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The foundational bedrock of computing: compilers, operating systems, parallel computing clusters, and computational complexity.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Coding Rigor:</span>
                <span className="font-bold text-blue-600">96% (Deep Systems)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Architecture:</span>
                <span className="font-bold text-blue-600">98% (Kernels/Compilers)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Top Role:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Systems / Security Architect</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigateToProgram('cs')}
              className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore CS Degree Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* IS Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                140 Credit Hours
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Information Systems (IS)
              </h3>
              <p className="text-xs font-arabic text-slate-500">
                برنامج نظم المعلومات
              </p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bridging advanced software architectures with business strategy, big data warehousing, decision support systems, and enterprise analytics.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Business Focus:</span>
                <span className="font-bold text-emerald-600">98% (Highest)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Big Data / BI:</span>
                <span className="font-bold text-emerald-600">88% (DSS & Analytics)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Top Role:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">BI Consultant / IT Manager</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigateToProgram('is')}
              className="w-full py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore IS Degree Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Radar Chart Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              8-Dimensional Comparative Radar Chart
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visualizing the relative intensity of each major across the 8 core evaluation categories.
            </p>
          </div>

          <button
            onClick={onStartAdvising}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find My Best Fit via Expert System</span>
          </button>
        </div>

        {/* Radar Component */}
        <div className="py-4">
          <RadarChart
            selectedProgram={selectedRadarView}
            onSelectProgram={(p) => setSelectedRadarView(p)}
          />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Curriculum & Practical Criteria Table
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Direct comparison derived from official faculty bylaws.
            </p>
          </div>

          {/* Filter pill tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs overflow-x-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All 8 Dimensions
            </button>
            <button
              onClick={() => setActiveCategoryFilter('programming')}
              className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'programming'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Programming
            </button>
            <button
              onClick={() => setActiveCategoryFilter('careers')}
              className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'careers'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Careers
            </button>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800 text-[11px] uppercase font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3 w-1/4">Evaluation Category</th>
                <th className="px-5 py-3 w-1/4 text-indigo-600 dark:text-indigo-400">
                  Artificial Intelligence (AI)
                </th>
                <th className="px-5 py-3 w-1/4 text-blue-600 dark:text-blue-400">
                  Computer Science (CS)
                </th>
                <th className="px-5 py-3 w-1/4 text-emerald-600 dark:text-emerald-400">
                  Information Systems (IS)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCategories.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900 dark:text-white align-top">
                    <div>{row.category}</div>
                    <div className="text-[11px] font-arabic font-normal text-slate-400 mt-0.5">
                      {row.categoryAr}
                    </div>
                  </td>

                  <td className="px-5 py-4 leading-relaxed align-top bg-indigo-50/20 dark:bg-indigo-950/10">
                    {row.ai}
                  </td>

                  <td className="px-5 py-4 leading-relaxed align-top bg-blue-50/20 dark:bg-blue-950/10">
                    {row.cs}
                  </td>

                  <td className="px-5 py-4 leading-relaxed align-top bg-emerald-50/20 dark:bg-emerald-950/10">
                    {row.is}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
