"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowRight, Instagram, MessageCircle, Download } from "lucide-react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { resumeData } from "../utils/resumeData";
import Marquee from "./Marquee";

const MARQUEE_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js",
  "Python", "AI & ML", "Kotlin", "PostgreSQL",
  "MongoDB", "Three.js", "GSAP", "REST APIs",
  "UI/UX Design", "Docker", "Git",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Full Stack\nDeveloper",
    "Software\nEngineer",
    "AI Systems\nBuilder",
    "UI/UX\nDesigner"
  ];

  // Typing Effect for Rotating Roles
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setRoleText(fullText.substring(0, roleText.length + 1));
        setTypingSpeed(80);

        if (roleText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before starting delete
          return;
        }
      } else {
        setRoleText(fullText.substring(0, roleText.length - 1));
        setTypingSpeed(40);

        if (roleText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, currentRoleIndex, typingSpeed]);

  // GSAP entrance animations on mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.15 }
    )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.25"
      )
      .fromTo(
        ctasRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.2"
      )
      .fromTo(
        rightColRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.45 },
        "-=0.3"
      );

    // Simple staggered social icons entrance (no magnetic per-mousemove)
    if (socialRef.current) {
      const icons = socialRef.current.querySelectorAll("a");
      gsap.fromTo(
        icons,
        { opacity: 0, y: 14, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: "back.out(1.5)",
          delay: 0.7,
        }
      );
    }

    return () => { tl.kill(); };
  }, []);

  const handleChatTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    const chatBtn = document.getElementById("chat-trigger-btn");
    if (chatBtn) {
      chatBtn.click();
    }
  };

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={`${styles.grid} container`}>
        {/* Left Column - Info & Bios */}
        <div className={styles.leftCol}>
          <div className={styles.greeting}>
            <span>$ whoami</span>
            <span className="terminal-cursor" style={{ margin: 0, width: "6px", height: "14px" }} />
          </div>
          
          <h1 className={styles.name} ref={nameRef}>
            Hello, I'm{" "}
            <span className="text-gradient">
              {resumeData.personalInfo.name}
            </span>
          </h1>
          
          <p className={styles.bio} ref={bioRef}>
            {resumeData.personalInfo.bio}
          </p>

          <div className={styles.ctas} ref={ctasRef}>
            <a href="#contact" className="glow-btn" onClick={handleChatTrigger}>
              Chat with AI <ArrowRight size={16} />
            </a>
            
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className={styles.resumeBtn}
            >
              Email Me <Mail size={16} />
            </a>

            <a
              href="/resume.pdf"
              download="Muhammad_Ahmad_Amir_Resume.pdf"
              className={`${styles.resumeBtn} ${styles.cvBtnFull}`}
            >
              Download CV <Download size={16} />
            </a>
          </div>
        </div>

        {/* Center Column - Avatar Photo */}
        <div className={styles.centerCol}>
          <div className={styles.avatarWrap}>
            {/* Pulsing halo rings */}
            <div className={styles.haloRing1} />
            <div className={styles.haloRing2} />
            <div className={styles.haloRing3} />
            {/* Avatar image */}
            <div className={styles.avatarImageWrap}>
              <Image
                src="/profile.jpg"
                alt="Muhammad Ahmad Amir - Full Stack Developer"
                width={380}
                height={380}
                priority
                className={styles.avatarImage}
              />
            </div>
            {/* Floating status badge */}
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              Available for work
            </div>
          </div>
        </div>

        {/* Right Column - Upper role titles */}
        <div className={styles.rightCol} ref={rightColRef}>
          <span className={styles.roleLabel}>Focus Area</span>
          <h2 className={`${styles.roleTitle} text-gradient`}>
            {roleText.split("\n").map((line, idx) => (
              <span key={idx} style={{ display: "block" }}>
                {line}
                {idx === roleText.split("\n").length - 1 && <span className="terminal-cursor" />}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Marquee skills strip — pinned below the 3-col grid */}
      <div className={styles.marqueeStrip}>
        <Marquee items={MARQUEE_ITEMS} speed={30} direction="left" />
      </div>

      {/* Social Rail (Desktop bottom-left) */}
      <div className={styles.socialRail} ref={socialRef}>
        <div className={styles.socialLine} />
        <a
          href={resumeData.personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <Linkedin size={18} />
          <span className={styles.socialTooltip}>LinkedIn</span>
        </a>
        <a
          href={resumeData.personalInfo.githubPersonal}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
          aria-label="GitHub Personal"
          title="GitHub (Personal)"
        >
          <Github size={18} />
          <span className={styles.socialTooltip}>GitHub (Personal)</span>
        </a>
        <a
          href={resumeData.personalInfo.githubUni}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
          aria-label="GitHub University"
          title="GitHub (Uni)"
        >
          <Github size={18} />
          <span className={styles.socialTooltip}>GitHub (Uni)</span>
        </a>
        <a
          href={resumeData.personalInfo.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
          aria-label="Instagram"
          title="Instagram"
        >
          <Instagram size={18} />
          <span className={styles.socialTooltip}>Instagram</span>
        </a>
        <a
          href={resumeData.personalInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <MessageCircle size={18} />
          <span className={styles.socialTooltip}>WhatsApp</span>
        </a>
        <a
          href={`mailto:${resumeData.personalInfo.email}`}
          className={styles.socialIcon}
          aria-label="Email"
          title="Email"
        >
          <Mail size={18} />
          <span className={styles.socialTooltip}>Email</span>
        </a>
      </div>

      {/* Scroll indicator — bouncing dot */}
      <div className={styles.scrollDown}>
        <div className={styles.scrollDot} />
        <span>scroll</span>
      </div>
    </section>
  );
}
