import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Chatbot from "../components/Chatbot";
import { Github, Linkedin, Mail, Instagram, MessageCircle } from "lucide-react";
import styles from "./page.module.css";
import { resumeData } from "../utils/resumeData";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className={styles.main}>
      {/* Dynamic sticky header */}
      <Navbar />

      {/* Main content sections */}
      <Hero />
      <About />
      <Projects />
      <Services />
      <Skills />
      <Contact />

      {/* Footer bar */}
      <footer className={styles.footer}>
        <div className={`${styles.footerContainer} container`}>
          <div className={styles.footerLogo}>
            <span className={styles.footerName}>Muhammad Ahmad Amir</span>
            <span className={styles.footerLogoDot} />
          </div>

          <ul className={styles.footerNav}>
            <li><a href="#hero" className={styles.footerNavLink}>Home</a></li>
            <li><a href="#about" className={styles.footerNavLink}>About</a></li>
            <li><a href="#projects" className={styles.footerNavLink}>Projects</a></li>
            <li><a href="#services" className={styles.footerNavLink}>Services</a></li>
            <li><a href="#skills" className={styles.footerNavLink}>Skills</a></li>
            <li><a href="#contact" className={styles.footerNavLink}>Contact</a></li>
          </ul>

          <div className={styles.footerSocials}>
            <a
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialIcon}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={resumeData.personalInfo.githubPersonal}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialIcon}
              aria-label="GitHub Personal"
              title="GitHub (Personal)"
            >
              <Github size={18} />
            </a>
            <a
              href={resumeData.personalInfo.githubUni}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialIcon}
              aria-label="GitHub University"
              title="GitHub (Uni)"
            >
              <Github size={18} />
            </a>
            <a
              href={resumeData.personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialIcon}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={resumeData.personalInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialIcon}
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className={styles.footerSocialIcon}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className={styles.copyright}>
            <p>&copy; {currentYear} Muhammad Ahmad Amir. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating chatbot assistant */}
      <Chatbot />
    </main>
  );
}
