"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./PageLoader.module.css";

export default function PageLoader({ onDone }: { onDone: () => void }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const loaderRef  = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let prog = 0;
    let isFinishedLoading = false;

    // Check if document is already loaded
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        isFinishedLoading = true;
      } else {
        const handleLoad = () => {
          isFinishedLoading = true;
        };
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      // If window loaded, advance much faster
      const increment = isFinishedLoading 
        ? Math.random() * 25 + 15 
        : Math.random() * 12 + 4;

      prog += increment;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setProgress(100);

        // Small pause then animate out
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              onDone();
            }
          });
          // Bar fills, text fades
          tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" })
            // The whole loader slides up
            .to(wrapRef.current, {
              yPercent: -100,
              duration: 0.85,
              ease: "power4.inOut",
            }, "+=0.1")
            // Fade out completely
            .to(wrapRef.current, { opacity: 0, duration: 0.15 }, "-=0.1");
        }, 150);
      } else {
        setProgress(Math.min(prog, 99));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div ref={wrapRef} className={styles.loader}>
      <div ref={loaderRef} className={styles.inner}>
        {/* Name brand */}
        <div className={styles.brand}>
          <span className={styles.brandText}>Muhammad Ahmad Amir</span>
        </div>

        {/* Progress track */}
        <div className={styles.trackWrap}>
          <div className={styles.track}>
            <div
              ref={barRef}
              className={styles.bar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span ref={textRef} className={styles.counter}>
            {Math.floor(progress)}%
          </span>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>Full Stack Engineer &amp; AI Developer</p>
      </div>

      {/* Animated background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  );
}
