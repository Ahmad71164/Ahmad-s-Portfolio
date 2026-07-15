export interface Project {
  name: string;
  tech: string;
  period: string;
  description: string;
  category: string;
  features?: string[];
}

export interface TimelineItem {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    githubPersonal: string;
    githubUni: string;
    whatsapp: string;
    instagram: string;
    bio: string;
  };
  education: TimelineItem[];
  experience: TimelineItem[];
  projects: Project[];
  skills: SkillCategory[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Muhammad Ahmad Amir",
    title: "Full Stack Engineer & AI Developer",
    location: "Faisalabad, Pakistan",
    email: "muhammadahmadamir7@gmail.com",
    phone: "+92 314 6071164",
    linkedin: "https://www.linkedin.com/in/muhammad-ahmad-amir-9b9556422/",
    githubPersonal: "https://github.com/mahmadamir7",
    githubUni: "https://github.com/Ahmad71164",
    whatsapp: "https://wa.me/923146071164",
    instagram: "https://instagram.com/name_isahmad_official",
    bio: "Software Engineering student with hands-on experience across full-stack development, databases, and UI/UX design, seeking an opportunity to build efficient, user-friendly software solutions."
  },
  education: [
    {
      title: "B.S. in Software Engineering",
      institution: "FAST National University of Computer and Emerging Sciences (NUCES)",
      period: "2023 – 2027",
      description: "Focusing on core software engineering principles, algorithms, database systems, object-oriented design, web development, and artificial intelligence integration."
    },
    {
      title: "Intermediate in Computer Science (ICS)",
      institution: "KIPS College",
      period: "2021 – 2023",
      description: "Studied fundamental programming concepts, mathematics, and logic structures."
    }
  ],
  experience: [
    {
      title: "Graphic Designer",
      institution: "Freelancer.com",
      period: "2024 – 2025",
      description: "Designed professional flyers and marketing graphics for international clients using Canva and AI-assisted design tools, refining aesthetic design principles."
    }
  ],
  projects: [
    {
      name: "SatyFinder",
      tech: "Kotlin, Android SDK",
      period: "May 2026",
      description: "Built an Airbnb-style property booking application entirely in Kotlin for Android devices. Implemented property listings, search filters, and an interactive booking flow.",
      category: "Mobile App",
      features: [
        "Built with clean architecture patterns in Kotlin for modern Android development",
        "Integrated dynamic property feed with custom location, price range, and rating filters",
        "Implemented secure local mock transactions and interactive booking state management",
        "Optimized layout hierarchy using ConstraintLayout and modern RecyclerView list binding"
      ]
    },
    {
      name: "Text Extraction System",
      tech: "Python, Flask, OpenAI API, JS",
      period: "Nov 2025",
      description: "Developed an AI-powered text extraction system. Features a Flask backend, a dynamic JavaScript frontend, OpenAI API for text summarization, and a database layer for history management.",
      category: "AI & Full Stack",
      features: [
        "Constructed python-based Flask API endpoints for text processing and generation",
        "Integrated OpenAI's GPT-4o API for intelligent text summarizing and key-point extraction",
        "Designed responsive JavaScript frontend for real-time loading status and Markdown output",
        "Configured a history management layer backed by a localized storage system"
      ]
    },
    {
      name: "Restaurant Ordering Bot",
      tech: "Python, Automation",
      period: "Nov 2025",
      description: "Created a command-line and automated ordering bot in Python to streamline restaurant order processing, optimizing workflows and reducing manual intervention.",
      category: "Automation",
      features: [
        "Developed modular automated scripts in Python utilizing HTTP sessions and cookies",
        "Features automated cart compilation, total verification, and error-prone field auto-fills",
        "Configured robust error retry handlers for network drops and item unavailability",
        "Reduced manual administrative overhead by automated pipeline integration"
      ]
    },
    {
      name: "Arabic-Urdu Dictionary",
      tech: "Java, Object-Oriented Design",
      period: "Nov 2025",
      description: "Developed a functional Arabic-to-Urdu offline dictionary application in Java utilizing structured OOP patterns, complete with a JUnit suite for automated test verification.",
      category: "Software Tool",
      features: [
        "Designed strict object-oriented architecture in Java separating logic and state layers",
        "Implemented high-performance search queries leveraging localized binary index lookups",
        "Constructed extensive test coverage with JUnit 5 verifying edge cases in word mappings",
        "Optimized for offline execution requiring zero remote API network connections"
      ]
    },
    {
      name: "Apple Website Clone",
      tech: "HTML, CSS, JavaScript",
      period: "Nov 2025",
      description: "Created a pixel-perfect, responsive replica of the Apple website homepage, highlighting advanced layout techniques, clean CSS styles, and smooth hover animations.",
      category: "Frontend",
      features: [
        "Developed custom HTML5 boilerplate mirroring the Apple.com grid grid layouts",
        "Coded fluid animations matching the signature Apple hardware fade-in-out effects",
        "Optimized responsive break points ensuring flawless presentation on all mobile sizes",
        "Maintained high speed with lightweight vanilla code, no bulky external dependencies"
      ]
    },
    {
      name: "Online Store",
      tech: "Web-based E-commerce",
      period: "May 2025",
      description: "Built a fully-featured e-commerce platform enabling user registrations, login, product browsing, dynamic cart updates, and mock checkouts.",
      category: "AI & Full Stack",
      features: [
        "Engineered secure account signup and auth middleware with password hash validation",
        "Built reactive shopping cart storage in client-side state for persistent sessions",
        "Connected structured database tables enabling product listings and orders recording",
        "Designed admin control panels to insert, update, or remove online items easily"
      ]
    },
    {
      name: "UI Design — Lost & Found System",
      tech: "Figma, UI/UX Design",
      period: "Apr 2024",
      description: "Designed a comprehensive UI/UX mockup in Figma, including custom screens for user login, item reporting, listing feeds, and permission-based contact dialogs.",
      category: "Design",
      features: [
        "Constructed full dynamic prototypes inside Figma with wireframes and interactive flows",
        "Designed structured dark-themed user interface following Material Design 3 guidelines",
        "Created custom dashboard wireframes for user uploads, catalog filters, and profiles",
        "Validated and refined visual hierarchy for high-contrast visibility on mobile screens"
      ]
    }
  ],
  skills: [
    {
      category: "Languages & Frameworks",
      items: ["C++", "C", "Python", "Java", "Kotlin", "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"]
    },
    {
      category: "Databases",
      items: ["MySQL", "PL/SQL", "PostgreSQL"]
    },
    {
      category: "Design & Platforms",
      items: ["Figma", "Canva", "Shopify", "WordPress"]
    },
    {
      category: "AI & Automation",
      items: ["OpenAI API Integration", "AI Automation", "Prompt Engineering"]
    },
    {
      category: "Spoken Languages",
      items: ["English (Proficient)", "Urdu (Native)"]
    }
  ]
};
