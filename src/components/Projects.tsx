"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import { resumeData, Project } from "../utils/resumeData";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import { X, ArrowRight, Cpu, Calendar, CheckCircle } from "lucide-react";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extract all unique categories from projects data
  const categories = ["All", ...Array.from(new Set(resumeData.projects.map((p) => p.category)))];

  // Filter projects list
  const filteredProjects = activeFilter === "All"
    ? resumeData.projects
    : resumeData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="clip">
          <div className={styles.sectionHeader}>
            <span className={styles.headerLabel}>My Work</span>
            <h2 className={styles.headerTitle}>Featured Projects</h2>
          </div>
        </ScrollReveal>

        {/* Filter Navigation */}
        <ScrollReveal direction="up" delay={0.1}>
          <ul className={styles.filters}>
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`${styles.filterBtn} ${
                    activeFilter === category ? styles.filterBtnActive : ""
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, idx) => (
            <ScrollReveal 
              key={project.name} 
              direction="up" 
              delay={0.15 + (idx % 3) * 0.08}
              style={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <ProjectCard project={project} onViewDetails={() => setSelectedProject(project)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal Details Backdrop */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            
            <div className={styles.modalHeader}>
              <span className={styles.modalCategory}>{selectedProject.category}</span>
              <span className={styles.modalPeriod}>
                <Calendar size={14} style={{ marginRight: "4px" }} />
                {selectedProject.period}
              </span>
            </div>

            <h3 className={styles.modalTitle}>{selectedProject.name}</h3>
            <p className={styles.modalDesc}>{selectedProject.description}</p>
            
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className={styles.modalFeaturesSection}>
                <h4 className={styles.modalSectionTitle}>Key Features & Deliverables</h4>
                <ul className={styles.modalFeaturesList}>
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className={styles.modalFeatureItem}>
                      <CheckCircle size={16} className={styles.featureIcon} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.modalTechSection}>
              <h4 className={styles.modalSectionTitle}>
                <Cpu size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                Technologies Used
              </h4>
              <div className={styles.modalTechBadges}>
                {selectedProject.tech.split(",").map((t) => t.trim()).map((tech, idx) => (
                  <span key={idx} className={styles.modalTechBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                className="glow-btn"
                onClick={() => {
                  setSelectedProject(null);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Inquire About Project <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
