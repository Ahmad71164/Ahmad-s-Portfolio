"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy client components to avoid SSR issues
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const FilmGrain    = dynamic(() => import("./FilmGrain"),    { ssr: false });
const PageLoader   = dynamic(() => import("./PageLoader"),   { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Cinematic page loader — slides away on complete */}
      {!loaded && <PageLoader onDone={handleLoaderDone} />}

      {/* Global overlays */}
      <CustomCursor />
      <FilmGrain />

      {/* Page content fades in after loader */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
