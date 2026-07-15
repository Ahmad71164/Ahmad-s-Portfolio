"use client";

import { useState } from "react";
import styles from "./Services.module.css";
import ScrollReveal from "./ScrollReveal";
import {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Database,
  Terminal,
  Check,
  ArrowRight,
  Zap,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  badge?: string;
}

const services: Service[] = [
  {
    id: "web",
    icon: <Globe size={28} />,
    title: "Full Stack Web Development",
    tagline: "End-to-end web solutions",
    description:
      "From concept to deployment — I build fast, scalable, and beautifully designed web applications using modern frameworks like Next.js, React, and Node.js.",
    features: [
      "Responsive UI with modern design systems",
      "RESTful & GraphQL API development",
      "Authentication, payments & integrations",
      "CI/CD pipelines & cloud deployment",
    ],
    badge: "Most Popular",
  },
  {
    id: "mobile",
    icon: <Smartphone size={28} />,
    title: "Mobile App Development",
    tagline: "Native Android applications",
    description:
      "High-performance Android apps built with Kotlin and modern Android SDK. Clean architecture, smooth UX, and reliable local data management.",
    features: [
      "Kotlin-first Android development",
      "Custom UI with ConstraintLayout & Jetpack",
      "Firebase / local database integration",
      "Play Store deployment ready",
    ],
  },
  {
    id: "ai",
    icon: <Brain size={28} />,
    title: "AI & Automation Solutions",
    tagline: "Intelligent systems that work for you",
    description:
      "Leverage the power of AI APIs and automation scripts to streamline your business workflows, extract insights from data, and build smart features.",
    features: [
      "OpenAI / Gemini API integrations",
      "Custom chatbots & AI assistants",
      "Data extraction & summarization",
      "Python automation scripts",
    ],
    badge: "Trending",
  },
  {
    id: "design",
    icon: <Palette size={28} />,
    title: "UI/UX Design",
    tagline: "Design that delights and converts",
    description:
      "User-centric design with stunning aesthetics. I create Figma prototypes, wireframes, and complete design systems that bring your product vision to life.",
    features: [
      "Figma prototyping & wireframing",
      "Mobile-first responsive design",
      "Brand identity & color systems",
      "Interactive component libraries",
    ],
  },
  {
    id: "database",
    icon: <Database size={28} />,
    title: "Database Design & Optimization",
    tagline: "Robust data architecture",
    description:
      "Efficient schema design, query optimization, and database management across MySQL, PostgreSQL, and PL/SQL. Your data, structured for performance.",
    features: [
      "Relational schema design",
      "Query performance tuning",
      "Data migration & integration",
      "PL/SQL stored procedures",
    ],
  },
  {
    id: "consulting",
    icon: <Terminal size={28} />,
    title: "Tech Consulting",
    tagline: "Expert guidance, real results",
    description:
      "Code reviews, architecture planning, and technical mentoring. Get expert advice on choosing the right tech stack or solving complex software problems.",
    features: [
      "Architecture & tech stack planning",
      "Code reviews & refactoring",
      "1-on-1 mentoring sessions",
      "Project feasibility analysis",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleBook = (serviceTitle: string) => {
    const phoneNumber = "923146071164";
    const text = `Hello Ahmad, I would like to book your "${serviceTitle}" service.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="clip">
          <div className={styles.sectionHeader}>
            <span className={styles.headerLabel}>What I Offer</span>
            <h2 className={styles.headerTitle}>
              My <span className="text-gradient">Services</span>
            </h2>
            <p className={styles.headerSubtitle}>
              Professional solutions tailored to your needs. From design to
              deployment — I deliver quality that speaks for itself.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className={styles.grid}>
          {services.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              direction="up"
              delay={0.06 * idx}
              style={{ height: "100%" }}
            >
              <div
                className={`${styles.card} ${
                  activeService === service.id ? styles.cardActive : ""
                } ${hoveredCard === service.id ? styles.cardHovered : ""}`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() =>
                  setActiveService(
                    activeService === service.id ? null : service.id
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    setActiveService(
                      activeService === service.id ? null : service.id
                    );
                }}
              >
                {/* Badge */}
                {service.badge && (
                  <span className={styles.badge}>
                    <Zap size={11} />
                    {service.badge}
                  </span>
                )}

                {/* Glow blob */}
                <div className={styles.cardGlow} />

                {/* Icon */}
                <div className={styles.iconWrap}>{service.icon}</div>

                {/* Content */}
                <div className={styles.cardBody}>
                  <span className={styles.tagline}>{service.tagline}</span>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>

                  {/* Features List */}
                  <ul className={styles.featureList}>
                    {service.features.map((feat, i) => (
                      <li key={i} className={styles.featureItem}>
                        <Check size={14} className={styles.checkIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className={styles.cardFooter}>
                  <button
                    className={styles.bookBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBook(service.title);
                    }}
                    aria-label={`Book ${service.title}`}
                  >
                    Book Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Banner */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeft}>
              <h3 className={styles.ctaTitle}>Ready to build something great?</h3>
              <p className={styles.ctaDesc}>
                Let's discuss your project and craft the perfect solution together.
              </p>
            </div>
            <button
              className={styles.ctaBtn}
              onClick={() => handleBook("General Inquiry")}
            >
              <Zap size={16} />
              Book a Service
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
