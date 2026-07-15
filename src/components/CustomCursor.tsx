"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Ring lags behind via lerp in rAF loop — NO gsap
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot is instant — just a CSS transform string
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const tick = () => {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hover expand/contract
    const onEnter = () => {
      ring.style.transition = "width 0.2s, height 0.2s, opacity 0.2s, border-color 0.2s";
      ring.style.width  = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.55";
      ring.style.borderColor = "var(--accent-purple)";
      dot.style.opacity = "0";
    };
    const onLeave = () => {
      ring.style.width  = "34px";
      ring.style.height = "34px";
      ring.style.opacity = "1";
      ring.style.borderColor = "rgba(139,92,246,0.7)";
      dot.style.opacity = "1";
    };
    const onDown = () => { ring.style.transform += " scale(0.85)"; };
    const onUp   = () => { /* reset handled by next tick */ };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    const bindHoverables = () => {
      document.querySelectorAll<Element>("a, button, [data-cursor]").forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bindHoverables();

    const observer = new MutationObserver(bindHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
