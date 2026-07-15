"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import styles from "./About.module.css";
import { resumeData } from "../utils/resumeData";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="clip">
          <div className={styles.sectionHeader}>
            <span className={styles.headerLabel}>Who I Am</span>
            <h2 className={styles.headerTitle}>About Me</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {/* Left Column: Narrative Biography */}
          <div className={styles.narrative}>
            <ScrollReveal direction="right" delay={0.1}>
              <p className={styles.introText}>
                Building digital solutions at the intersection of full-stack engineering, database architecture, and artificial intelligence.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.2}>
              <p className={styles.description}>
                I am a Software Engineering student at FAST National University of Computer and Emerging Sciences. I have a passion for crafting clean, performant code that solves real-world challenges. From building mobile apps to automating restaurant workflows and writing intelligent text parsing systems, I thrive on exploring new technologies and platforms.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <div className={styles.highlightCard}>
                <span className={styles.highlightTitle}>My Core Objective</span>
                <p className={styles.highlightText}>
                  {resumeData.personalInfo.bio}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Educational & Work Timelines */}
          <div className={styles.timelines}>
            {/* Experience Timeline */}
            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <h3 className={styles.columnTitle}>
                  <Briefcase size={20} /> Work Experience
                </h3>
                <div className={styles.timeline}>
                  {resumeData.experience.map((item, idx) => (
                    <div key={idx} className={styles.timelineItem}>
                      <span className={styles.timelineDot} />
                      <div className={styles.itemHeader}>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        <div className={styles.itemMeta}>
                          <span className={styles.institution}>{item.institution}</span>
                          <span className={styles.period}>{item.period}</span>
                        </div>
                      </div>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Education Timeline */}
            <ScrollReveal direction="left" delay={0.3}>
              <div>
                <h3 className={styles.columnTitle} style={{ marginTop: "1rem" }}>
                  <GraduationCap size={20} /> Education
                </h3>
                <div className={styles.timeline}>
                  {resumeData.education.map((item, idx) => (
                    <div key={idx} className={styles.timelineItem}>
                      <span className={styles.timelineDot} />
                      <div className={styles.itemHeader}>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        <div className={styles.itemMeta}>
                          <span className={styles.institution}>{item.institution}</span>
                          <span className={styles.period}>{item.period}</span>
                        </div>
                      </div>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
