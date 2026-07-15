"use client";

import styles from "./Skills.module.css";
import { resumeData } from "../utils/resumeData";
import ScrollReveal from "./ScrollReveal";

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="clip">
          <div className={styles.sectionHeader}>
            <span className={styles.headerLabel}>My Skills</span>
            <h2 className={styles.headerTitle}>Technical Skills</h2>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className={styles.grid}>
          {resumeData.skills.map((category, idx) => (
            <ScrollReveal 
              key={category.category} 
              direction="up" 
              delay={0.15 + idx * 0.08}
              style={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <div className={styles.card}>
                <div className={styles.cardGlow} />
                
                {/* Category Title */}
                <h3 className={styles.cardTitle}>
                  {category.category}
                </h3>
                
                {/* Skills Tags List */}
                <ul className={styles.skillsList}>
                  {category.items.map((skill) => (
                    <li key={skill} className={styles.skillTag}>
                      <span className={styles.skillTagDot} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
