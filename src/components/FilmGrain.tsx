"use client";

import { useEffect, useRef } from "react";
import styles from "./FilmGrain.module.css";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawGrain = (time: number) => {
      // Only redraw ~24 fps for performance
      if (time - lastTime < 42) {
        animId = requestAnimationFrame(drawGrain);
        return;
      }
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i]     = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18; // very subtle opacity
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };

    animId = requestAnimationFrame(drawGrain);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.grain} aria-hidden="true" />;
}
