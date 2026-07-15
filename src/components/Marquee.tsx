"use client";

import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: string[];
  speed?: number; /* seconds for one full cycle */
  direction?: "left" | "right";
}

export default function Marquee({ items, speed = 28, direction = "left" }: MarqueeProps) {
  // Duplicate items so the loop looks seamless
  const doubled = [...items, ...items];

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div
        className={styles.track}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
