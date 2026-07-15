"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "clip";
  delay?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.4,
  distance = 20,
  style,
  className,
}: ScrollRevealProps) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let fromVars: gsap.TweenVars  = {};
    let toVars: gsap.TweenVars    = { opacity: 1, x: 0, y: 0, duration, delay, ease: "power3.out", overwrite: "auto" };

    if (direction === "clip") {
      // Clip-path reveal — text slides up inside a hidden container (like reference site)
      gsap.set(outer, { overflow: "hidden" });
      gsap.set(inner, { y: "105%", opacity: 1 });
      const trigger = ScrollTrigger.create({
        trigger: outer,
        start: "top 90%",
        onEnter: () => {
          gsap.to(inner, {
            y: "0%",
            duration: duration,
            delay,
            ease: "power4.out",
            overwrite: "auto",
          });
        },
      });
      return () => trigger.kill();
    }

    switch (direction) {
      case "up":    fromVars = { opacity: 0, y: distance };   break;
      case "down":  fromVars = { opacity: 0, y: -distance };  break;
      case "left":  fromVars = { opacity: 0, x: distance };   break;
      case "right": fromVars = { opacity: 0, x: -distance };  break;
      case "fade":
      default:      fromVars = { opacity: 0 };                break;
    }

    gsap.set(inner, fromVars);

    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: "top 88%",
      onEnter: () => {
        gsap.to(inner, toVars);
      },
    });

    return () => trigger.kill();
  }, [direction, delay, duration, distance]);

  return (
    <div ref={outerRef} className={className} style={{ width: "100%", ...style }}>
      <div ref={innerRef} style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
