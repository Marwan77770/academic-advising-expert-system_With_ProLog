import { ExpertSystemQuestion, ExpertSystemRecommendation } from '../types/academic';

export const EXPERT_QUESTIONS: ExpertSystemQuestion[] = [
  {
    id: 'q1',
    category: 'interest',
    questionText: 'Which technological challenge excites you the most?',
    questionTextAr: 'ما هو التحدي التكنولوجي الأكثر إثارة لشغفك واهتمامك؟',
    options: [
      {
        id: 'q1-a',
        text: 'Teaching machines to see, comprehend language, and make autonomous decisions.',
        textAr: 'تعليم الآلات كيف ترى وتفهم اللغة وتتخذ قرارات ذكية ذاتية.',
        impact: { ai: 15, cs: 4, is: 2 },
        explanation: 'Strong orientation towards cognitive intelligence and perceptual models.',
      },
      {
        id: 'q1-b',
        text: 'Understanding how operating systems work, optimizing compilers, and writing high-speed code.',
        textAr: 'فهم أسرار عمل نظم التشغيل، بناء المترجمات، وبرمجة خوارزميات فائقة السرعة.',
        impact: { ai: 3, cs: 15, is: 2 },
        explanation: 'Strong affinity for core computational theory, system mechanics, and resource efficiency.',
      },
      {
        id: 'q1-c',
        text: 'Transforming enterprise data into strategic decisions and designing business workflows.',
        textAr: 'تحويل بيانات الشركات إلى قرارات استراتيجية وتصميم منصات التجارة وإدارة الأعمال.',
        impact: { ai: 4, cs: 3, is: 15 },
        explanation: 'Strong orientation towards enterprise architecture, business analytics, and decision systems.',
      },
    ],
  },
  {
    id: 'q2',
    category: 'skills',
    questionText: 'How do you prefer to apply mathematics and analytical thinking?',
    questionTextAr: 'كيف تفضل تطبيق الرياضيات والتفكير التحليلي في البرمجة؟',
    options: [
      {
        id: 'q2-a',
        text: 'Applied probability, linear algebra, vector spaces, and loss function gradients.',
        textAr: 'الاحتمالات التطبيقية، الجبر الخطي والمصفوفات، ودوال التدريب والتحسين الرياضي.',
        impact: { ai: 14, cs: 5, is: 3 },
        explanation: 'Matches the mathematical foundation of deep neural networks and pattern recognition.',
      },
      {
        id: 'q2-b',
        text: 'Discrete mathematics, boolean logic, graph theory, and algorithmic time complexity (Big-O).',
        textAr: 'الرياضيات المتقطعة، المنطق الثنائي، نظرية المخططات (Graphs)، وحساب تعقيد الخوارزميات.',
        impact: { ai: 5, cs: 14, is: 3 },
        explanation: 'Foundational for advanced algorithms, automata theory, and compiler design.',
      },
      {
        id: 'q2-c',
        text: 'Operations research, statistical data forecasting, and quantitative financial models.',
        textAr: 'بحوث العمليات، النمذجة الإحصائية لبيانات السوق، والتحليل الكمي للقرارات الإدارية.',
        impact: { ai: 4, cs: 2, is: 14 },
        explanation: 'Directly aligns with Decision Support Systems (DSS) and operations research.',
      },
    ],
  },
  {
    id: 'q3',
    category: 'career',
    questionText: 'What is your dream future professional job title?',
    questionTextAr: 'ما هو المسمى الوظيفي المستقبلي الذي تطمح للوصول إليه؟',
    options: [
      {
        id: 'q3-a',
        text: 'Machine Learning Engineer / Computer Vision Scientist / Robotics Programmer',
        textAr: 'مهندس تعلم آلة / باحث رؤية حاسوبية / مطور روبوتات ذكية',
        impact: { ai: 16, cs: 3, is: 2 },
        explanation: 'Aligns directly with Artificial Intelligence and autonomous systems roles.',
      },
      {
        id: 'q3-b',
        text: 'Systems Software Engineer / Cloud Infrastructure Architect / Cyber Security Specialist',
        textAr: 'مهندس نظم وبرمجيات / مهندس بنية تحتية سحابية / خبير أمن سيبراني',
        impact: { ai: 3, cs: 16, is: 2 },
        explanation: 'Matches core computer science careers in high-performance and distributed computing.',
      },
      {
        id: 'q3-c',
        text: 'Business Intelligence Consultant / ERP Solutions Architect / Big Data Strategist',
        textAr: 'استشاري ذكاء أعمال (BI) / مهندس نظم مؤسسية (ERP) / محلل بيانات ضخمة',
        impact: { ai: 3, cs: 2, is: 16 },
        explanation: 'Matches information systems consulting and digital transformation leadership.',
      },
    ],
  },
  {
    id: 'q4',
    category: 'courses',
    questionText: 'Which set of advanced elective courses excites you the most?',
    questionTextAr: 'أي مجموعة من المقررات التخصصية المتقدمة تشعر برغبة أكبر في دراستها؟',
    options: [
      {
        id: 'q4-a',
        text: 'Natural Language Processing, Deep Learning, Robotics Kinematics, Fuzzy Systems',
        textAr: 'معالجة اللغات الطبيعية، التعلم العميق، حركية الروبوتات، والنظم الضبابية',
        impact: { ai: 15, cs: 4, is: 1 },
        explanation: 'Specific AI concentration coursework.',
      },
      {
        id: 'q4-b',
        text: 'Compiler Design, Parallel Computing, Computer Graphics, Operating Systems Internals',
        textAr: 'تصميم المترجمات، الحوسبة المتوازية والموزعة، رسومات الحاسب، وتطوير نظم التشغيل',
        impact: { ai: 3, cs: 15, is: 1 },
        explanation: 'Specific CS systems engineering curriculum.',
      },
      {
        id: 'q4-c',
        text: 'Big Data Analytics, Business Intelligence & DSS, Electronic Commerce, Enterprise GIS',
        textAr: 'تحليلات البيانات الضخمة، ذكاء الأعمال ودعم القرار، التجارة الإلكترونية، ونظم المعلومات الجغرافية',
        impact: { ai: 3, cs: 2, is: 15 },
        explanation: 'Specific IS business-tech integration curriculum.',
      },
    ],
  },
  {
    id: 'q5',
    category: 'workstyle',
    questionText: 'What kind of graduation project would you be most proud to build?',
    questionTextAr: 'ما هو مشروع التخرج الذي تفتخر بإنجازه وعرضه أمام لجنة التحكيم؟',
    options: [
      {
        id: 'q5-a',
        text: 'An autonomous medical diagnostic model or robotic arm navigating physical obstacles.',
        textAr: 'نظام تشخيص طبي ذكي أو ذراع روبوتية ذاتية الحركة مزودة بكاميرات ورؤية حاسوبية.',
        impact: { ai: 15, cs: 4, is: 2 },
        explanation: 'Applied deep learning and autonomous robotics capstone.',
      },
      {
        id: 'q5-b',
        text: 'A custom high-performance distributed database engine, browser engine, or security suite.',
        textAr: 'محرك قاعدة بيانات موزع عالي الأداء، أو محرك ألعاب ثلاثي الأبعاد، أو منصة أمن سيبراني.',
        impact: { ai: 3, cs: 15, is: 2 },
        explanation: 'High-leverage systems software engineering capstone.',
      },
      {
        id: 'q5-c',
        text: 'An end-to-end intelligent supply chain forecasting platform with real-time analytics.',
        textAr: 'منصة إدارة سلاسل إمداد رقمية ذكية مع لوحات تحكم متقدمة للتنبؤ بسلوك العملاء والتجارة.',
        impact: { ai: 3, cs: 2, is: 15 },
        explanation: 'Comprehensive enterprise Information Systems solution.',
      },
    ],
  },
  {
    id: 'q6',
    category: 'skills',
    questionText: 'What programming stack or tools feel most natural or appealing to you?',
    questionTextAr: 'ما هي بيئات البرمجة والأدوات التي تجذبك وترغب في إتقانها؟',
    options: [
      {
        id: 'q6-a',
        text: 'Python, PyTorch, TensorFlow, OpenCV, Jupyter Notebooks, Hugging Face',
        textAr: 'بايثون، باي تورش، تنسرفلو، أوبن سي في، بيئات جوبيتر، ومكتبات الذكاء الاصطناعي',
        impact: { ai: 14, cs: 4, is: 3 },
        explanation: 'Standard toolset for AI, ML, and computer vision research.',
      },
      {
        id: 'q6-b',
        text: 'C, C++, Rust, Assembly, Linux shell scripting, GDB debugger, Valgrind',
        textAr: 'سي، سي++، ريست، لغة التجميع، موجه أوامر لينكس وأدوات فحص الذاكرة وتصحيح الأخطاء',
        impact: { ai: 3, cs: 14, is: 1 },
        explanation: 'Standard toolset for systems software, performance, and low-level development.',
      },
      {
        id: 'q6-c',
        text: 'Enterprise SQL, Power BI, Apache Spark, Cloud ERP (SAP/Odoo), Tableau, MongoDB',
        textAr: 'إس كيو إل المتقدمة، باور بي آي، أباتشي سبارك، نظم تخطيط موارد المؤسسات، وقواعد البيانات السحابية',
        impact: { ai: 3, cs: 2, is: 14 },
        explanation: 'Standard toolset for data warehousing, BI pipelines, and enterprise systems.',
      },
    ],
  },
  {
    id: 'q7',
    category: 'interest',
    questionText: 'When troubleshooting an application, where does your curiosity usually lead you?',
    questionTextAr: 'أثناء حل المشكلات البرمجية، ما الذي يثير فضولك للبحث عنه وفهمه بعمق؟',
    options: [
      {
        id: 'q7-a',
        text: 'Why the model misclassified an edge-case and how adjusting weights or embeddings can fix it.',
        textAr: 'لماذا أخطأ النموذج التنبؤي في تصنيف حالة نادرة، وكيف نطور معمارية الشبكة ودقة التدريب.',
        impact: { ai: 13, cs: 3, is: 2 },
        explanation: 'Curiosity focused on algorithmic cognition and feature representation.',
      },
      {
        id: 'q7-b',
        text: 'Memory leaks, race conditions, cache misses, and bottlenecked CPU assembly cycles.',
        textAr: 'تسريب الذاكرة، تزامن الخيوط المتعددة، بطء كاش المعالج، وتفريغ تعليمات الأجهزة.',
        impact: { ai: 2, cs: 14, is: 1 },
        explanation: 'Curiosity focused on architectural hardware/software symbiosis.',
      },
      {
        id: 'q7-c',
        text: 'Data flow integrity, user conversion friction, and whether the system satisfies business logic.',
        textAr: 'تدفق البيانات بين الإدارات، سهولة تجربة المستخدم، ومطابقة النظام لمتطلبات العمل المؤسسية.',
        impact: { ai: 2, cs: 2, is: 14 },
        explanation: 'Curiosity focused on business impact and enterprise workflow continuity.',
      },
    ],
  },
];

/**
 * Knowledge Base Production Rules:
 * Encodes heuristics of university academic advisors.
 */
interface Rule {
  id: string;
  name: string;
  condition: (scores: { ai: number; cs: number; is: number }) => boolean;
  fire: (scores: { ai: number; cs: number; is: number }) => {
    title: string;
    rationale: string;
    contributionTo: 'AI' | 'CS' | 'IS';
  };
}

export const ADVISING_RULES: Rule[] = [
  {
    id: 'RULE_AI_01',
    name: 'Cognitive & Perceptual Affinity',
    condition: (s) => s.ai > s.cs && s.ai > s.is,
    fire: () => ({
      title: 'Rule R-101: High Affinity for Perception & Machine Learning',
      rationale:
        'The student strongly prioritized probabilistic learning, computer vision, and neural network modeling over procedural systems.',
      contributionTo: 'AI',
    }),
  },
  {
    id: 'RULE_CS_01',
    name: 'Core Systems & Algorithmic Rigor',
    condition: (s) => s.cs > s.ai && s.cs > s.is,
    fire: () => ({
      title: 'Rule R-201: Strong Alignment with Systems Engineering & Compilers',
      rationale:
        'The student demonstrated a decisive preference for low-level system mechanics, memory efficiency, and computational theory.',
      contributionTo: 'CS',
    }),
  },
  {
    id: 'RULE_IS_01',
    name: 'Enterprise Architecture & Business Tech',
    condition: (s) => s.is > s.ai && s.is > s.cs,
    fire: () => ({
      title: 'Rule R-301: Distinct Orientation Towards Enterprise Information Systems',
      rationale:
        'The student indicated strong passion for data-driven strategic planning, business intelligence, decision support, and corporate IT governance.',
      contributionTo: 'IS',
    }),
  },
  {
    id: 'RULE_AI_CS_COMPLEXITY',
    name: 'High Math & Algorithmic Synergy',
    condition: (s) => s.ai >= 40 && s.cs >= 40,
    fire: (s) => ({
      title: 'Rule R-405: Advanced Computational & Mathematical Synergy',
      rationale:
        'Both AI and CS scoring thresholds are elevated. The student is capable of rigorous algorithmic and deep mathematical reasoning.',
      contributionTo: s.ai >= s.cs ? 'AI' : 'CS',
    }),
  },
  {
    id: 'RULE_IS_DATA_MINING',
    name: 'Data Science & Business Analytics Cross-Path',
    condition: (s) => s.is >= 40 && s.ai >= 35,
    fire: () => ({
      title: 'Rule R-508: Applied Data Analytics & Business Intelligence Bridge',
      rationale:
        'The answers reveal a high interest in extracting actionable intelligence from massive enterprise databases.',
      contributionTo: 'IS',
    }),
  },
];

/**
 * Runs the Expert System inference engine forward-chaining over student responses.
 */
export function runExpertSystemInference(
  answers: Record<string, string>
): ExpertSystemRecommendation {
  let aiScore = 0;
  let csScore = 0;
  let isScore = 0;

  EXPERT_QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        aiScore += option.impact.ai;
        csScore += option.impact.cs;
        isScore += option.impact.is;
      }
    }
  });

  const rawSum = aiScore + csScore + isScore;
  const isInitial = rawSum === 0;
  const totalScore = isInitial ? 100 : rawSum;
  const aiPercentage = isInitial ? 33 : Math.round((aiScore / totalScore) * 100);
  const csPercentage = isInitial ? 33 : Math.round((csScore / totalScore) * 100);
  const isPercentage = 100 - aiPercentage - csPercentage;

  let primaryProgram: 'AI' | 'CS' | 'IS' = 'AI';
  if (!isInitial) {
    if (csScore > aiScore && csScore >= isScore) {
      primaryProgram = 'CS';
    } else if (isScore > aiScore && isScore > csScore) {
      primaryProgram = 'IS';
    } else {
      primaryProgram = 'AI';
    }
  }

  // Determine confidence score (scaled margin between highest and second highest)
  const scoresArray = [aiScore, csScore, isScore].sort((a, b) => b - a);
  const delta = scoresArray[0] - scoresArray[1];
  const confidenceScore = Math.min(99, Math.max(72, Math.round(75 + (delta / 40) * 23)));

  // Evaluate firing rules
  const scores = { ai: aiScore, cs: csScore, is: isScore };
  const firedRules = ADVISING_RULES.filter((rule) => rule.condition(scores)).map((rule) => {
    const fired = rule.fire(scores);
    return {
      id: rule.id,
      title: fired.title,
      rationale: fired.rationale,
      contributionTo: fired.contributionTo,
    };
  });

  // Strengths summary & career guidance
  let strengthsSummary: string[] = [];
  let careerRoadmap: string[] = [];
  let recommendedElectives: string[] = [];

  if (primaryProgram === 'AI') {
    strengthsSummary = [
      'High affinity for probabilistic mathematics, linear algebra, and data patterns.',
      'Enthusiasm for autonomous perception, neural network engineering, and robotics.',
      'Strong fit for research-oriented algorithm development and high-impact AI modeling.',
    ];
    careerRoadmap = [
      'Year 1-2: Master Python, Object-Oriented Programming, Calculus, and Linear Algebra.',
      'Year 3: Deep dive into Neural Networks (AI 343), Robotics (AI 331), and Data Science (AI 342).',
      'Year 4: Build advanced Capstone in Machine Learning (AI 414), Computer Vision (AI 483), or NLP (AI 462).',
    ];
    recommendedElectives = [
      'AI 412: Expert Systems (3 CH)',
      'AI 464: Deep Learning (3 CH)',
      'AI 352: Internet of Things (IoT) (3 CH)',
      'AI 483: Computer Vision (3 CH)',
    ];
  } else if (primaryProgram === 'CS') {
    strengthsSummary = [
      'Superior aptitude for core computational logic, memory architecture, and performance.',
      'Strong drive to understand low-level runtime systems, operating systems, and compilers.',
      'High adaptability across distributed infrastructure, cybersecurity, and game engines.',
    ];
    careerRoadmap = [
      'Year 1-2: Excel in Data Structures (CS 212), Logic Design (ECE 202), and Discrete Math (MATH 251).',
      'Year 3: Master Operating Systems (CS 351), Computer Graphics (CS 302), and Networks (CS 381).',
      'Year 4: Specialize in Compiler Design (CS 411), Parallel Computing (CS 484), and Cyber Security (CS 452).',
    ];
    recommendedElectives = [
      'CS 311: Systems Programming & Assembly (3 CH)',
      'CS 451: Advanced Operating Systems (3 CH)',
      'CS 484: Parallel & Distributed Computing (3 CH)',
      'CS 441: Advanced Software Engineering (3 CH)',
    ];
  } else {
    strengthsSummary = [
      'Strategic vision bridging technical systems with organizational value and decision-making.',
      'Strong skills in relational/NoSQL database management, business intelligence, and workflows.',
      'High market demand across multinational enterprise transformations and data consulting.',
    ];
    careerRoadmap = [
      'Year 1-2: Build strong foundations in Databases (IS 220), Programming, and Statistics.',
      'Year 3: Specialize in Electronic Commerce (IS 301), Operations Research (IS 321), and Data Mining (IS 322).',
      'Year 4: Lead enterprise projects in Big Data Analytics (IS 421) and Business Intelligence & DSS (IS 432).',
    ];
    recommendedElectives = [
      'IS 432: Business Intelligence and Decision Support Systems (3 CH)',
      'IS 421: Big Data Analytics (3 CH)',
      'IS 471: Blockchain & Digital Currency (3 CH)',
      'IS 413: Advanced Database Management Systems (3 CH)',
    ];
  }

  return {
    primaryProgram,
    scores,
    percentages: {
      ai: aiPercentage,
      cs: csPercentage,
      is: isPercentage,
    },
    confidenceScore,
    firedRules,
    strengthsSummary,
    careerRoadmap,
    recommendedElectives,
  };
}
