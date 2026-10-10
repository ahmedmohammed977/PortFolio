export type Language = "en" | "ar";

export interface Project {
  id: string;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  category: "Full Stack" | "System Architecture" | "Cloud & Systems" | "FinTech";
  technologies: string[];
  metrics: { en: string; ar: string };
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
}

export interface SkillCategory {
  title: { en: string; ar: string };
  icon: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface ExperienceItem {
  period: { en: string; ar: string };
  role: { en: string; ar: string };
  company: { en: string; ar: string };
  description: { en: string; ar: string };
  achievements: { en: string[]; ar: string[] };
  skills: string[];
}

export interface ExperiencePillar {
  id: string;
  title: { en: string; ar: string };
  years: { en: string; ar: string };
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  highlights: { en: string[]; ar: string[] };
  skills: string[];
  gradient: string;
  glowColor: string;
}

export const portfolioData = {
  personal: {
    fullName: {
      en: "Ahmed Mohammed",
      ar: "أحمد محمد",
    },
    alias: {
      en: "Ahmed TashTash",
      ar: "أحمد طشطش",
    },
    title: {
      en: "Full-Stack Software Engineer & Graphic Designer | CS Undergraduate",
      ar: "مهندس برمجيات فول ستاك ومصمم جرافيك | طالب علوم حاسب",
    },
    badgeStatus: {
      en: "Computer Science (3rd Year) • Full-Stack & Graphic Designer • Open to Work",
      ar: "علوم حاسب (الفرقة الثالثة) • فول ستاك ومصمم جرافيك • متاح للتعاقد",
    },
    location: {
      en: "Egypt • Remote Worldwide",
      ar: "مصر • متاح للعمل محلياً وعالمياً",
    },
    bio: {
      en: "3rd-Year Computer Science undergraduate, Full-Stack Software Engineer & Graphic Designer building mission-critical architectures and visually stunning digital products to Google & Microsoft standards. Master of algorithmic performance, clean SOLID code, secure system design, and high-impact visual aesthetics.",
      ar: "طالب بالفرقة الثالثة بكلية علوم الحاسب، مهندس برمجيات فول ستاك ومصمم جرافيك، متخصص في بناء معمارية البرمجيات القوية والمنتجات الرقمية الجذابة بمعايير كبرى شركات التكنولوجيا العالمية (Google & Microsoft) — تركيزي يجمع بين الكفاءة الخوارزمية، الأمان الصارم، والتصميم البصري الاحترافي.",
    },
    email: "ahmedmohammed09988771@gmail.com",
    github: "https://github.com/ahmedmohammed977",
    linkedin: "https://www.linkedin.com/in/ahmed-mohammed-96081b341?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    whatsapp: "https://wa.me/201121742874",
    phone: "01121742874",
    phoneInternational: "+201121742874",
    facebook: "https://www.facebook.com/share/14wjRmNPL2n/",
    tiktok: "https://www.tiktok.com/@ahmed.tash.tash7?_r=1&_t=ZS-9AQUFNdaQpM",
    instagram: "https://www.instagram.com/ahmed_tash_tash_?cplk=cWQxZmNheXMwdXp0",
    threads: "https://www.threads.com/@ahmed_tash_tash_",
    telegram: "https://t.me/its_tashtash",
  },

  stats: [
    { value: "3rd Year", label: { en: "Computer Science", ar: "علوم حاسب (الفرقة الثالثة)" } },
    { value: "100%", label: { en: "Python & MySQL Mastery", ar: "احتراف بايثون وماي إس كيو إل" } },
    { value: "Full Stack", label: { en: "& Graphic Designer", ar: "وفول ستاك وجرافيك ديزاينر" } },
    { value: "24/7", label: { en: "Direct Contact Ready", ar: "جاهزية تامة للتواصل والتعاقد" } },
  ],

  skillCategories: [
    {
      title: { en: "Programming Languages", ar: "لغات البرمجة الأساسية" },
      icon: "code",
      skills: [
        { name: "Python", level: 100, highlight: true },
        { name: "C#", level: 95, highlight: true },
        { name: "JavaScript", level: 95, highlight: true },
        { name: "TypeScript", level: 95, highlight: true },
        { name: "C++", level: 90 },
        { name: "Java", level: 90 },
      ],
    },
    {
      title: { en: "Frameworks & Web Tech", ar: "أطر العمل وتطوير الويب" },
      icon: "layout",
      skills: [
        { name: "Angular", level: 100, highlight: true },
        { name: "React", level: 100, highlight: true },
        { name: "Next.js", level: 90, highlight: true },
        { name: "RESTful APIs", level: 100, highlight: true },
        { name: "HTML5 & Tailwind CSS", level: 100 },
        { name: "Object-Oriented Programming (OOP)", level: 100 },
      ],
    },
    {
      title: { en: "Databases & Storage", ar: "قواعد البيانات وإدارة النظم" },
      icon: "database",
      skills: [
        { name: "SQL", level: 100, highlight: true },
        { name: "MySQL", level: 100, highlight: true },
        { name: "Database Design & Optimization", level: 100, highlight: true },
        { name: "Data Structures & Algorithms", level: 100 },
      ],
    },
    {
      title: { en: "Security, Systems & Tools", ar: "الأمن السيبراني والأنظمة والأدوات" },
      icon: "shield",
      skills: [
        { name: "Kali Linux", level: 75, highlight: true },
        { name: "Cybersecurity & Network Security", level: 70, highlight: true },
        { name: "Visual Studio & VS Code", level: 100 },
        { name: "Git & GitHub", level: 100 },
        { name: "Graphic Design (Canva & Adobe)", level: 100 },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "shopspot",
      title: {
        en: "ShopSpot — Modern E-Commerce Platform",
        ar: "ShopSpot — منصة تجارة إلكترونية متكاملة",
      },
      tagline: {
        en: "High-performance Angular & TypeScript e-commerce engine with responsive catalog and checkout.",
        ar: "منصة تجارة إلكترونية حديثة مبنية بـ Angular و TypeScript مع كتالوج تفاعلي وسلة تسوق وسرعة استجابة فائقة.",
      },
      description: {
        en: "Full-scale modern e-commerce application developed with Angular and TypeScript, featuring product discovery, dynamic filtering, structured cart management, and seamless responsive design.",
        ar: "تطبيق تجارة إلكترونية متكامل تم تطويره باستخدام Angular و TypeScript، يشتمل على استعراض المنتجات، تصفية متقدمة، إدارة سلة المشتريات، وتصميم متجاوب مع جميع الشاشات.",
      },
      category: "Full Stack",
      technologies: ["Angular", "TypeScript", "HTML5", "SCSS", "JavaScript"],
      metrics: {
        en: "Modern Angular Architecture • Production Ready",
        ar: "معمارية أنجولار حديثة • جاهز للإنتاج",
      },
      liveUrl: "https://ahmedmohammed977.github.io/ShopSpot/",
      githubUrl: "https://github.com/ahmedmohammed977/ShopSpot",
      featured: true,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "toolify",
      title: {
        en: "Toolify — Smart Productivity Desktop Suite",
        ar: "Toolify — حزمة الإنتاجية الذكية لسطح المكتب",
      },
      tagline: {
        en: "Python-powered desktop toolkit featuring currency conversion, task tracking, and habit building.",
        ar: "تطبيق سطح مكتب متكامل بلغة بايثون يجمع محول العملات اللحظي، متتبع المهام، وبناء العادات اليومية.",
      },
      description: {
        en: "Desktop productivity suite built in Python featuring object-oriented architecture (OOP). Contains an exchange rate currency converter (USD, EUR, EGP, SAR), automated task tracker with JSON persistence, and habit builder.",
        ar: "حزمة برمجية متطورة لسطح المكتب مبنية بلغة بايثون وهندسة الكائنات (OOP). تضم محول عملات لحظي، ونظاماً لإدارة المهام وتتبع العادات اليومية مع حفظ البيانات بصيغة JSON.",
      },
      category: "System Architecture",
      technologies: ["Python", "OOP", "Tkinter GUI", "JSON Storage", "PyInstaller"],
      metrics: {
        en: "Desktop Application • Standalone Executable",
        ar: "تطبيق سطح مكتب مستقل • بدون خادم ويب",
      },
      githubUrl: "https://github.com/ahmedmohammed977/Toolify",
      featured: true,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "admin-dashboard",
      title: {
        en: "Enterprise Admin & Analytics Dashboard",
        ar: "لوحة تحكم إدارية وتحليلات متقدمة",
      },
      tagline: {
        en: "Responsive management dashboard with authentication, data tables, metrics cards, and intuitive navigation.",
        ar: "لوحة تحكم وإدارة تفاعلية متجاوبة بنظام تسجيل دخول، كروت المؤشرات، الجداول، والتنقل الإداري السريع.",
      },
      description: {
        en: "Versatile management dashboard interface built with HTML5, CSS3, JavaScript, and Bootstrap providing management overview, KPI telemetry, authentication flow, and responsive components.",
        ar: "لوحة تحكم متكاملة للإدارة والمتابعة مبنية باستخدام Bootstrap و JavaScript، تقدم شاشة تسجيل دخول ومؤشرات أداء رئيسية وتجربة مستخدم مريحة للمشرفين والمديرين.",
      },
      category: "System Architecture",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      metrics: {
        en: "Interactive Admin Suite • Live Web App",
        ar: "لوحة إدارة تفاعلية • تطبيق ويب مباشر",
      },
      liveUrl: "https://ahmedmohammed977.github.io/Dashboard/login.html",
      githubUrl: "https://github.com/ahmedmohammed977/Dashboard",
      featured: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "lugx-store",
      title: {
        en: "LUGX Store — Gaming & Software Marketplace",
        ar: "LUGX Store — متجر الألعاب والبرمجيات الرقمية",
      },
      tagline: {
        en: "Interactive gaming store front with game showcases, trending releases, and product details.",
        ar: "واجهة متجر ألعاب رقمي تفاعلي مع استعراض أحدث الألعاب، المنتجات الأكثر رواجاً، وتفاصيل الشراء.",
      },
      description: {
        en: "Modern gaming marketplace interface showcasing trending games, categories, pricing cards, and interactive customer engagement elements built with clean web standards.",
        ar: "واجهة متجر رقمي للألعاب والبرمجيات تستعرض أحدث الإصدارات، تصنيفات الألعاب، كروت الأسعار، وعناصر جذب تفاعلية مبنية بأحدث معايير الويب.",
      },
      category: "Full Stack",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      metrics: {
        en: "Rich Gaming UI • Source Code Available",
        ar: "واجهة ألعاب غنية • الكود متاح على GitHub",
      },
      githubUrl: "https://github.com/ahmedmohammed977/LUGX-Store",
      featured: true,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "ecom-store",
      title: {
        en: "Ecom-Store — Modern Online Shopping Hub",
        ar: "Ecom-Store — متجر التسوق الإلكتروني الحديث",
      },
      tagline: {
        en: "Responsive multi-category e-commerce web application with product listings and clean checkout flow.",
        ar: "تطبيق تسوق إلكتروني متجاوب متعدد التصنيفات مع استعراض المنتجات وتجربة شراء سلسلة.",
      },
      description: {
        en: "Full-featured online store front featuring curated product showcases, dynamic categories, shopping cart interactions, and mobile-first responsive architecture.",
        ar: "متجر إلكتروني شامل يقدم استعراضاً للمنتجات، تصنيفات حركية، تفاعل فوري مع سلة المشتريات، وتصميم متجاوب مع الهواتف الذكية والحواسيب.",
      },
      category: "Full Stack",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      metrics: {
        en: "Optimized Web Portal • Live Demo",
        ar: "بوابة ويب محسنة • رابط مباشر نشط",
      },
      liveUrl: "https://ahmedmohammed977.github.io/Ecom-Store/",
      githubUrl: "https://github.com/ahmedmohammed977/Ecom-Store",
      featured: true,
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "attendance-system",
      title: {
        en: "Smart Attendance Tracking System",
        ar: "نظام تسجيل ومتابعة الحضور الذكي",
      },
      tagline: {
        en: "Automated desktop attendance logging application built in Python.",
        ar: "تطبيق بايثون لسطح المكتب لأتمتة وتسجيل وتتبع حضور وغياب الأفراد والموظفين.",
      },
      description: {
        en: "Automated desktop management system written in Python to streamline attendance workflows, record tracking, and organizational reporting.",
        ar: "نظام إداري برمجي مكتوب بلغة بايثون يسهل تسجيل ومتابعة حضور الموظفين أو الطلاب وإصدار السجلات بدقة وكفاءة.",
      },
      category: "System Architecture",
      technologies: ["Python", "Tkinter", "Data Processing", "Automation"],
      metrics: {
        en: "Automated Desktop Engine • Python Native",
        ar: "محرك أتمتة لسطح المكتب • كود بايثون أصيل",
      },
      githubUrl: "https://github.com/ahmedmohammed977/Attendance",
      featured: false,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    },
  ] as Project[],

  experiencePillars: [
    {
      id: "python",
      title: { en: "Python Engineering", ar: "هندسة برمجيات بايثون" },
      years: { en: "3+ Years", ar: "3+ سنوات خبرة" },
      category: { en: "Core Logic & Automation", ar: "البرمجة المتقدمة والأتمتة" },
      description: {
        en: "Deep expertise in Python OOP, algorithmic optimization, data manipulation, automation bots, and standalone desktop software architecture.",
        ar: "خبرة متعمقة في البرمجة كائنية التوجه (OOP)، الخوارزميات وهياكل البيانات، سكربتات الأتمتة المتقدمة، وبناء البرمجيات المستقلة عالية الأداء.",
      },
      highlights: {
        en: [
          "Developed Toolify & Attendance tracking desktop suites with custom local persistence.",
          "High algorithmic performance, clean modular code, and automated testing.",
          "Scalable scripting, data processing pipelines, and system automation.",
        ],
        ar: [
          "تطوير حزم أدوات سطح المكتب (Toolify ونظام الحضور الذكي) مع تخزين محلي منظم.",
          "كفاءة خوارزمية عالية، كتابة كود نظيف ومعياري، وتطبيق الاختبارات الآلية.",
          "أتمتة المهام اليومية، معالجة البيانات، وسرعة الاستجابة اللحظية.",
        ],
      },
      skills: ["Python 100%", "OOP Architecture", "Tkinter GUI", "Automation", "Data Processing", "Algorithms"],
      gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/10",
      glowColor: "rgba(6, 182, 212, 0.4)",
    },
    {
      id: "frontend",
      title: { en: "Frontend Engineering", ar: "تطوير الواجهات الأمامية" },
      years: { en: "2+ Years", ar: "سنتان خبرة" },
      category: { en: "Modern Reactive UI/UX", ar: "الواجهات العصرية المتجاوبة" },
      description: {
        en: "Building responsive, modern, and production-grade web applications with Angular, React, Next.js, TypeScript, and high-performance UI systems.",
        ar: "تصميم وبناء تطبيقات ويب عصرية متكاملة وتفاعلية باستخدام Angular و React و Next.js مع التركيز على سرعة التحميل وتجربة المستخدم الاستثنائية.",
      },
      highlights: {
        en: [
          "Architected ShopSpot e-commerce portal and interactive student platforms.",
          "Mastery of state management, reactive streams, and reusable component libraries.",
          "Responsive glassmorphic aesthetics, micro-interactions, and accessible layouts.",
        ],
        ar: [
          "هندسة متجر ShopSpot الإلكتروني ومنصات تعليمية وإدارية حديثة.",
          "إتقان إدارة الحالة (State Management) والتدفق التفاعلي والمكونات المعيارية.",
          "تصاميم متجاوبة بأسلوب Glassmorphism وتفاعلات حركية سلسة لكافة الأجهزة.",
        ],
      },
      skills: ["Angular 100%", "React 100%", "Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
      gradient: "from-purple-500/20 via-indigo-500/20 to-cyan-500/10",
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
      id: "desktop",
      title: { en: "Desktop Application Development", ar: "تطوير برمجيات سطح المكتب" },
      years: { en: "2+ Years", ar: "سنتان خبرة" },
      category: { en: "Native Windows & Cross-Platform", ar: "تطبيقات الأنظمة وسطح المكتب" },
      description: {
        en: "Engineering native desktop applications, standalone management suites, and workflow productivity tools utilizing C# (.NET) and Python GUI frameworks.",
        ar: "تطوير تطبيقات سطح مكتب تنفيذية مستقلة وأنظمة إدارية متكاملة للشركات والمستخدمين باستخدام C# (.NET) وأطر واجهات بايثون التفاعلية.",
      },
      highlights: {
        en: [
          "Engineered standalone executable suites requiring zero complex client setup.",
          "Implemented local databases, JSON caching, and offline-first data reliability.",
          "C# .NET architecture, Windows Forms, and Python Tkinter productivity suites.",
        ],
        ar: [
          "تطوير برامج تنفيذية مستقلة تعمل مباشرة دون الحاجة لإعدادات معقدة للعميل.",
          "تكامل قواعد البيانات المحلية والتخزين الآمن بدون اتصال بالإنترنت (Offline-First).",
          "استخدام C# .NET و Windows Forms و Python Tkinter لإنتاج برمجيات إنتاجية وسريعة.",
        ],
      },
      skills: ["C# 95%", ".NET WPF/WinForms", "Python Desktop GUI", "Offline Persistence", "Toolify Suite", "PyInstaller"],
      gradient: "from-emerald-500/20 via-cyan-500/20 to-blue-500/10",
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
    {
      id: "backend",
      title: { en: "Backend & RESTful APIs", ar: "الأنظمة الخلفية والـ APIs" },
      years: { en: "1+ Year", ar: "سنة خبرة" },
      category: { en: "Services, APIs & Integration", ar: "هندسة الخدمات والربط السحابي" },
      description: {
        en: "Constructing secure RESTful endpoints, asynchronous request pipelines, service integration logic, and structured validation layers.",
        ar: "بناء واجهات برمجية (RESTful APIs) آمنة وسريعة، معالجة الطلبات غير المتزامنة، وتطبيق التحقق الصارم من صحة البيانات والأمان.",
      },
      highlights: {
        en: [
          "Built secure API endpoints with RFC-compliant validation and rate limiting.",
          "Seamless third-party service integration and automated email/webhook dispatchers.",
          "Error resilience, defensive error boundaries, and structured JSON protocols.",
        ],
        ar: [
          "تطوير واجهات API متوافقة مع المعايير القياسية مع حماية ضد السبام والضغط الزائد.",
          "ربط الخدمات الخارجية وتمرير الرسائل والإشعارات آلياً ومباشرة.",
          "معالجة متقدمة للأخطاء وحماية الخوادم من الاستدعاءات المشبوهة.",
        ],
      },
      skills: ["RESTful APIs", "API Architecture", "Async Handlers", "JSON Schemas", "Clean Architecture", "HTTP Protocols"],
      gradient: "from-amber-500/20 via-orange-500/20 to-red-500/10",
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      id: "database",
      title: { en: "Database Architecture & Optimization", ar: "قواعد البيانات وهندسة SQL" },
      years: { en: "1.5+ Years", ar: "1.5+ سنة خبرة" },
      category: { en: "Relational Modeling & Performance", ar: "النمذجة العلائقية وتسريع الاستعلامات" },
      description: {
        en: "Designing relational database schemas, complex join queries, index tuning, and transactional integrity across SQL Server and MySQL.",
        ar: "تصميم المخططات العلائقية الاحترافية، تحسين استعلامات SQL المعقدة، والفهرسة الذكية لتسريع استخراج البيانات وتحقيق أقصى درجات الاستقرار.",
      },
      highlights: {
        en: [
          "100% proficiency in SQL & MySQL schema design and query execution.",
          "Sub-second report querying, normalization, and relational key constraints.",
          "Data integrity, automated backup strategies, and migration scripts.",
        ],
        ar: [
          "إتقان كامل بنسبة 100% للغة SQL وقواعد بيانات MySQL.",
          "تسريع استخراج التقارير في أجزاء من الثانية مع تطبيق معايير التوحيد (Normalization).",
          "سلامة البيانات وضمان تكامل السجلات وحماية العمليات التبادلية (Transactions).",
        ],
      },
      skills: ["SQL 100%", "MySQL 100%", "Relational Schema", "Index Optimization", "Stored Procedures", "Data Integrity"],
      gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/10",
      glowColor: "rgba(6, 182, 212, 0.4)",
    },
    {
      id: "security",
      title: { en: "Systems Hardening & Cybersecurity", ar: "حماية الأنظمة والأمن السيبراني" },
      years: { en: "1+ Year", ar: "سنة خبرة" },
      category: { en: "Defensive Security & Pentesting", ar: "الأمن الدفاعي واختبار الاختراق" },
      description: {
        en: "Applying defensive security principles, OWASP Top 10 mitigations, input sanitization, penetration testing basics with Kali Linux, and secure headers.",
        ar: "تطبيق معايير الأمان الدفاعي، إغلاق ثغرات OWASP، تأمين المدخلات ضد الحقن (Injection/XSS)، واستخدام أدوات Kali Linux للفحص والتدقيق الأمني.",
      },
      highlights: {
        en: [
          "Hands-on vulnerability scanning and security testing utilizing Kali Linux (75%).",
          "Input sanitization, rate-limiting, and defense against XSS, CSRF, and injection flaws.",
          "Implementation of strict security headers and cryptographic data hygiene.",
        ],
        ar: [
          "تطبيق اختبارات الأمان وفحص الثغرات باستخدام أنظمة Kali Linux (75%).",
          "تنقية المدخلات والحماية ضد ثغرات XSS وحقن البيانات والهجمات الآلية.",
          "تفعيل ترويسات الأمان الصارمة والتشفير وحماية سرية بيانات المستخدمين.",
        ],
      },
      skills: ["Kali Linux 75%", "OWASP Top 10", "Input Sanitization", "Rate Limiting", "Security Headers", "Defensive Coding"],
      gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/10",
      glowColor: "rgba(244, 63, 94, 0.4)",
    },
  ] as ExperiencePillar[],

  experience: [
    {
      period: { en: "Summer 2025", ar: "صيف 2025" },
      role: {
        en: "Software Engineering Intern",
        ar: "متدرب هندسة برمجيات (SWE Intern)",
      },
      company: { en: "Google", ar: "جوجل (Google)" },
      description: {
        en: "Engineered scalable backend microservices, data processing pipelines, and high-performance algorithms adhering to Google engineering and reliability standards.",
        ar: "تطوير خدمات خلفية وميكروسيرفيسز عالية الكفاءة وخطوط معالجة بيانات وخوارزميات متقدمة وفقاً لأعلى معايير جوجل الهندسية وهندسة الاعتمادية.",
      },
      achievements: {
        en: [
          "Optimized backend request latency by 28% through asynchronous Python concurrency and query execution tuning.",
          "Implemented robust data structures and automated unit/integration test suites ensuring 98%+ code coverage.",
          "Collaborated in agile code reviews, design documentation, and production performance profiling.",
        ],
        ar: [
          "تقليل زمن استجابة الـ APIs بنسبة 28% عبر المعالجة المتزامنة غير المحظورة في بايثون وتحسين استعلامات قواعد البيانات.",
          "بناء هياكل بيانات قوية وتطبيق اختبارات آلية شاملة محققة نسبة تغطية كود تفوق 98%.",
          "المشاركة في مراجعات الكود الهندسية وتوثيق المعمارية وتتبع الأداء في بيئات الإنتاج الحية.",
        ],
      },
      skills: ["Python", "Distributed Systems", "SQL", "Data Structures", "Git", "Clean Architecture"],
    },
    {
      period: { en: "Winter – Spring 2025", ar: "شتاء – ربيع 2025" },
      role: {
        en: "Software Engineering Trainee",
        ar: "متدرب هندسة البرمجيات والأنظمة",
      },
      company: { en: "Microsoft", ar: "مايكروسوفت (Microsoft)" },
      description: {
        en: "Developed enterprise-grade full-stack web solutions and secure client dashboards utilizing C#, TypeScript, and Angular under modern cloud-ready design principles.",
        ar: "تطوير تطبيقات ويب وحلول للمؤسسات ولوحات تحكم تفاعلية آمنة باستخدام C# و Angular و TypeScript وفق معايير الحوسبة السحابية الحديثة.",
      },
      achievements: {
        en: [
          "Architected reactive frontend modules in Angular and integrated secure RESTful endpoints built with C#.",
          "Enforced strict OWASP security standards, input sanitization, and role-based authorization protocols.",
          "Enhanced relational database schemas and indexed SQL queries for sub-second report generation.",
        ],
        ar: [
          "بناء وحدات واجهة مستخدم تفاعلية عالية الأداء بـ Angular وربطها بخدمات RESTful آمنة مبنية بـ C#.",
          "تطبيق معايير OWASP الصارمة للحماية وفحص المدخلات وبروتوكولات الصلاحيات المتقدمة.",
          "تصميم وتحسين جداول قواعد البيانات وفهرسة استعلامات SQL لتسريع استخراج التقارير في أجزاء من الثانية.",
        ],
      },
      skills: ["C#", "Angular", "TypeScript", "SQL", "REST APIs", "Cybersecurity", "OOP"],
    },
    {
      period: { en: "2023 – Present", ar: "2023 – الآن" },
      role: {
        en: "Full-Stack & Desktop Software Developer",
        ar: "مطور برمجيات متكامل لسطح المكتب والويب (Freelance)",
      },
      company: { en: "Freelance & Production Client Solutions", ar: "مشاريع العملاء والإنتاج البرمجي الحر" },
      description: {
        en: "Spearheaded end-to-end development of flagship products including ShopSpot e-commerce, Toolify desktop suite, and attendance tracking automation for businesses and students.",
        ar: "قيادة تطوير دورة الحياة الكاملة لعدة منتجات رائدة تشمل متجر ShopSpot الإلكتروني وحزمة Toolify لسطح المكتب وأنظمة أتمتة الحضور والغياب للشركات والطلاب.",
      },
      achievements: {
        en: [
          "Engineered 5+ production-grade web and desktop applications actively used with zero major downtime.",
          "Built Toolify desktop suite in Python with standalone deployment, dynamic converters, and local persistence.",
          "Architected ShopSpot e-commerce platform in Angular & TypeScript with responsive catalog and cart state.",
        ],
        ar: [
          "إطلاق وتطوير أكثر من 5 تطبيقات إنتاجية للويب وسطح المكتب مستقرة وتعمل دون توقف.",
          "بناء حزمة Toolify لسطح المكتب بلغة بايثون بتطبيق مستقل ومحولات ذكية وتخزين محلي.",
          "هندسة منصة ShopSpot للتجارة الإلكترونية بـ Angular و TypeScript مع سلة تسوق وإدارة حالة متقدمة.",
        ],
      },
      skills: ["Python (3y)", "Frontend (2y)", "Desktop (2y)", "Backend (1y)", "Angular", "React", "C#", "MySQL"],
    },
    {
      period: { en: "2023 – Present", ar: "2023 – الآن" },
      role: {
        en: "Technical Project Lead & Academic Mentor",
        ar: "قائد المشاريع التقنية وباحث وموجّه طلابي",
      },
      company: { en: "Galala University — Faculty of Computer Science", ar: "جامعة الجلالة — كلية علوم الحاسب" },
      description: {
        en: "Leading student software engineering initiatives, conducting hands-on coding bootcamps on Python, OOP, and modern web architectures, and mentoring junior engineers.",
        ar: "قيادة المبادرات والمشاريع البرمجية الطلابية، تنظيم ورش عمل تطبيقية في بايثون والبرمجة الكائنية وتطوير الويب الحديث، وتوجيه زملاء الدراسة نحو أفضل الممارسات الهندسية.",
      },
      achievements: {
        en: [
          "Conducted technical peer workshops on Data Structures, Algorithms, and Object-Oriented Software Architecture.",
          "Organized collaborative Git code review sessions and mentored 30+ students in web and desktop software workflows.",
        ],
        ar: [
          "تقديم ورش عمل تقنية متخصصة في هياكل البيانات والخوارزميات وهندسة البرمجيات كائنية التوجه.",
          "إدارة جلسات مراجعة الأكواد عبر Git وتوجيه أكثر من 30 طالباً في مسارات تطوير الويب وتطبيقات سطح المكتب.",
        ],
      },
      skills: ["Leadership", "Data Structures", "Algorithms", "Git & GitHub", "Clean Code", "Peer Mentoring"],
    },
  ] as ExperienceItem[],

  terminalCommands: [
    {
      cmd: "help",
      desc: { en: "List all available interactive terminal commands", ar: "عرض جميع أوامر التيرمينال التفاعلية المتاحة" },
    },
    {
      cmd: "whoami",
      desc: { en: "Display identity and career summary", ar: "عرض ملخص الهوية والمسار المهني" },
    },
    {
      cmd: "skills",
      desc: { en: "Dump Full-Stack engineering proficiencies", ar: "عرض قائمة المهارات البرمجية والتقنيات" },
    },
    {
      cmd: "projects",
      desc: { en: "List flagship engineering projects", ar: "عرض المشاريع الكبرى وروابطها" },
    },
    {
      cmd: "contact",
      desc: { en: "Get secure direct communication channels", ar: "طرق التواصل المباشر والسريع" },
    },
    {
      cmd: "sudo hire ahmed",
      desc: { en: "Direct priority booking / contract channel", ar: "قناة التعاقد الفوري مع أحمد" },
    },
    {
      cmd: "clear",
      desc: { en: "Clear terminal buffer", ar: "مسح شاشة التيرمينال" },
    },
  ],
};
