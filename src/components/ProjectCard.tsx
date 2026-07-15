import { ArrowUpRight } from "lucide-react";
import styles from "./ProjectCard.module.css";
import { Project } from "../utils/resumeData";

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  // Split technology strings (e.g. "Kotlin, Android SDK") into individual badges
  const techBadges = project.tech.split(",").map((t) => t.trim());

  return (
    <div className={styles.card} onClick={onViewDetails} style={{ cursor: "none" }}>
      <div className={styles.cardGlow} />
      
      <div className={styles.cardContent}>
        {/* Header containing category & period */}
        <div className={styles.cardHeader}>
          <span className={styles.cardCategory}>{project.category}</span>
          <span className={styles.cardPeriod}>{project.period}</span>
        </div>

        {/* Project Title */}
        <h3 className={styles.cardTitle}>{project.name}</h3>

        {/* Project Description */}
        <p className={styles.cardDesc}>{project.description}</p>
        
        {/* Technologies List */}
        <ul className={styles.cardTechList}>
          {techBadges.map((tech, idx) => (
            <li key={idx} className={styles.cardTechBadge}>
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Card Action Links */}
      <div className={styles.cardLinks}>
        <button 
          className={styles.cardLink}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          style={{ background: "none", border: "none", outline: "none", padding: 0, font: "inherit", cursor: "none" }}
        >
          View Details <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}
