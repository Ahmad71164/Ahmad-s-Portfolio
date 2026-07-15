"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Home",     href: "#hero"     },
    { label: "About",    href: "#about"    },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Skills",   href: "#skills"   },
    { label: "Contact",  href: "#contact"  }
  ];

  // Handle header background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const sections = ["hero", "about", "projects", "services", "skills", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is around the top half of the screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.navContainer} container`}>
        {/* Monogram Logo */}
        <a href="#hero" className={styles.logo}>
          M.Ahmad
          <span className={styles.logoDot} />
        </a>

        {/* Desktop Navigation */}
        <ul className={styles.navMenu}>
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${styles.navLink} ${
                    activeSection === sectionId ? styles.navLinkActive : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className={styles.navBtn}>
          <a href="#contact" className="glow-btn">
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={`${styles.mobileOverlay} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <ul className={styles.mobileNavMenu}>
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleMobileLinkClick(item.href)}
                    className={`${styles.mobileNavLink} ${
                      activeSection === sectionId ? styles.mobileNavLinkActive : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => handleMobileLinkClick("#contact")}
                className="glow-btn"
                style={{ marginTop: "1rem" }}
              >
                Let's Talk
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
