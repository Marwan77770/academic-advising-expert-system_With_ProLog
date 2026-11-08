/*  facts.pl  -  GENERATED from src/utils/expertSystemEngine.ts
    (run: npx tsx prolog/tests/gen_facts.ts > prolog/facts.pl)  -  portable: SWI-Prolog + Tau Prolog (browser)

    question(QId, Category, TextEn, TextAr).
    option(QId, OptionId, TextEn, TextAr, Explanation).
    impact(OptionId, AI, CS, IS).          % points an option adds to each program
*/
:- set_prolog_flag(double_quotes, atom).

question(q1, interest, "Which technological challenge excites you the most?", "ما هو التحدي التكنولوجي الأكثر إثارة لشغفك واهتمامك؟").
question(q2, skills, "How do you prefer to apply mathematics and analytical thinking?", "كيف تفضل تطبيق الرياضيات والتفكير التحليلي في البرمجة؟").
question(q3, career, "What is your dream future professional job title?", "ما هو المسمى الوظيفي المستقبلي الذي تطمح للوصول إليه؟").
question(q4, courses, "Which set of advanced elective courses excites you the most?", "أي مجموعة من المقررات التخصصية المتقدمة تشعر برغبة أكبر في دراستها؟").
question(q5, workstyle, "What kind of graduation project would you be most proud to build?", "ما هو مشروع التخرج الذي تفتخر بإنجازه وعرضه أمام لجنة التحكيم؟").
question(q6, skills, "What programming stack or tools feel most natural or appealing to you?", "ما هي بيئات البرمجة والأدوات التي تجذبك وترغب في إتقانها؟").
question(q7, interest, "When troubleshooting an application, where does your curiosity usually lead you?", "أثناء حل المشكلات البرمجية، ما الذي يثير فضولك للبحث عنه وفهمه بعمق؟").

option(q1, 'q1-a', "Teaching machines to see, comprehend language, and make autonomous decisions.", "تعليم الآلات كيف ترى وتفهم اللغة وتتخذ قرارات ذكية ذاتية.", "Strong orientation towards cognitive intelligence and perceptual models.").
option(q1, 'q1-b', "Understanding how operating systems work, optimizing compilers, and writing high-speed code.", "فهم أسرار عمل نظم التشغيل، بناء المترجمات، وبرمجة خوارزميات فائقة السرعة.", "Strong affinity for core computational theory, system mechanics, and resource efficiency.").
option(q1, 'q1-c', "Transforming enterprise data into strategic decisions and designing business workflows.", "تحويل بيانات الشركات إلى قرارات استراتيجية وتصميم منصات التجارة وإدارة الأعمال.", "Strong orientation towards enterprise architecture, business analytics, and decision systems.").
option(q2, 'q2-a', "Applied probability, linear algebra, vector spaces, and loss function gradients.", "الاحتمالات التطبيقية، الجبر الخطي والمصفوفات، ودوال التدريب والتحسين الرياضي.", "Matches the mathematical foundation of deep neural networks and pattern recognition.").
option(q2, 'q2-b', "Discrete mathematics, boolean logic, graph theory, and algorithmic time complexity (Big-O).", "الرياضيات المتقطعة، المنطق الثنائي، نظرية المخططات (Graphs)، وحساب تعقيد الخوارزميات.", "Foundational for advanced algorithms, automata theory, and compiler design.").
option(q2, 'q2-c', "Operations research, statistical data forecasting, and quantitative financial models.", "بحوث العمليات، النمذجة الإحصائية لبيانات السوق، والتحليل الكمي للقرارات الإدارية.", "Directly aligns with Decision Support Systems (DSS) and operations research.").
option(q3, 'q3-a', "Machine Learning Engineer / Computer Vision Scientist / Robotics Programmer", "مهندس تعلم آلة / باحث رؤية حاسوبية / مطور روبوتات ذكية", "Aligns directly with Artificial Intelligence and autonomous systems roles.").
option(q3, 'q3-b', "Systems Software Engineer / Cloud Infrastructure Architect / Cyber Security Specialist", "مهندس نظم وبرمجيات / مهندس بنية تحتية سحابية / خبير أمن سيبراني", "Matches core computer science careers in high-performance and distributed computing.").
option(q3, 'q3-c', "Business Intelligence Consultant / ERP Solutions Architect / Big Data Strategist", "استشاري ذكاء أعمال (BI) / مهندس نظم مؤسسية (ERP) / محلل بيانات ضخمة", "Matches information systems consulting and digital transformation leadership.").
option(q4, 'q4-a', "Natural Language Processing, Deep Learning, Robotics Kinematics, Fuzzy Systems", "معالجة اللغات الطبيعية، التعلم العميق، حركية الروبوتات، والنظم الضبابية", "Specific AI concentration coursework.").
option(q4, 'q4-b', "Compiler Design, Parallel Computing, Computer Graphics, Operating Systems Internals", "تصميم المترجمات، الحوسبة المتوازية والموزعة، رسومات الحاسب، وتطوير نظم التشغيل", "Specific CS systems engineering curriculum.").
option(q4, 'q4-c', "Big Data Analytics, Business Intelligence & DSS, Electronic Commerce, Enterprise GIS", "تحليلات البيانات الضخمة، ذكاء الأعمال ودعم القرار، التجارة الإلكترونية، ونظم المعلومات الجغرافية", "Specific IS business-tech integration curriculum.").
option(q5, 'q5-a', "An autonomous medical diagnostic model or robotic arm navigating physical obstacles.", "نظام تشخيص طبي ذكي أو ذراع روبوتية ذاتية الحركة مزودة بكاميرات ورؤية حاسوبية.", "Applied deep learning and autonomous robotics capstone.").
option(q5, 'q5-b', "A custom high-performance distributed database engine, browser engine, or security suite.", "محرك قاعدة بيانات موزع عالي الأداء، أو محرك ألعاب ثلاثي الأبعاد، أو منصة أمن سيبراني.", "High-leverage systems software engineering capstone.").
option(q5, 'q5-c', "An end-to-end intelligent supply chain forecasting platform with real-time analytics.", "منصة إدارة سلاسل إمداد رقمية ذكية مع لوحات تحكم متقدمة للتنبؤ بسلوك العملاء والتجارة.", "Comprehensive enterprise Information Systems solution.").
option(q6, 'q6-a', "Python, PyTorch, TensorFlow, OpenCV, Jupyter Notebooks, Hugging Face", "بايثون، باي تورش، تنسرفلو، أوبن سي في، بيئات جوبيتر، ومكتبات الذكاء الاصطناعي", "Standard toolset for AI, ML, and computer vision research.").
option(q6, 'q6-b', "C, C++, Rust, Assembly, Linux shell scripting, GDB debugger, Valgrind", "سي، سي++، ريست، لغة التجميع، موجه أوامر لينكس وأدوات فحص الذاكرة وتصحيح الأخطاء", "Standard toolset for systems software, performance, and low-level development.").
option(q6, 'q6-c', "Enterprise SQL, Power BI, Apache Spark, Cloud ERP (SAP/Odoo), Tableau, MongoDB", "إس كيو إل المتقدمة، باور بي آي، أباتشي سبارك، نظم تخطيط موارد المؤسسات، وقواعد البيانات السحابية", "Standard toolset for data warehousing, BI pipelines, and enterprise systems.").
option(q7, 'q7-a', "Why the model misclassified an edge-case and how adjusting weights or embeddings can fix it.", "لماذا أخطأ النموذج التنبؤي في تصنيف حالة نادرة، وكيف نطور معمارية الشبكة ودقة التدريب.", "Curiosity focused on algorithmic cognition and feature representation.").
option(q7, 'q7-b', "Memory leaks, race conditions, cache misses, and bottlenecked CPU assembly cycles.", "تسريب الذاكرة، تزامن الخيوط المتعددة، بطء كاش المعالج، وتفريغ تعليمات الأجهزة.", "Curiosity focused on architectural hardware/software symbiosis.").
option(q7, 'q7-c', "Data flow integrity, user conversion friction, and whether the system satisfies business logic.", "تدفق البيانات بين الإدارات، سهولة تجربة المستخدم، ومطابقة النظام لمتطلبات العمل المؤسسية.", "Curiosity focused on business impact and enterprise workflow continuity.").

impact('q1-a', 15, 4, 2).
impact('q1-b', 3, 15, 2).
impact('q1-c', 4, 3, 15).
impact('q2-a', 14, 5, 3).
impact('q2-b', 5, 14, 3).
impact('q2-c', 4, 2, 14).
impact('q3-a', 16, 3, 2).
impact('q3-b', 3, 16, 2).
impact('q3-c', 3, 2, 16).
impact('q4-a', 15, 4, 1).
impact('q4-b', 3, 15, 1).
impact('q4-c', 3, 2, 15).
impact('q5-a', 15, 4, 2).
impact('q5-b', 3, 15, 2).
impact('q5-c', 3, 2, 15).
impact('q6-a', 14, 4, 3).
impact('q6-b', 3, 14, 1).
impact('q6-c', 3, 2, 14).
impact('q7-a', 13, 3, 2).
impact('q7-b', 2, 14, 1).
impact('q7-c', 2, 2, 14).
