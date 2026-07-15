import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import ClientProviders from "../components/ClientProviders";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ahmad Amir | Full Stack Software Engineer & AI Developer",
  description: "Portfolio website of Muhammad Ahmad Amir, a Software Engineering student at FAST-NUCES and Full-Stack Developer. Specialized in web development, databases, mobile apps (Kotlin), and AI/automation integrations.",
  keywords: [
    "Muhammad Ahmad Amir",
    "Ahmad Amir",
    "Software Engineer",
    "Full Stack Developer",
    "AI Developer",
    "FAST University",
    "FAST NUCES",
    "Faisalabad",
    "Pakistan",
    "Kotlin Developer",
    "React",
    "Next.js",
    "Three.js Portfolio"
  ],
  authors: [{ name: "Muhammad Ahmad Amir" }],
  creator: "Muhammad Ahmad Amir",
  manifest: "/manifest.json",
  openGraph: {
    title: "Muhammad Ahmad Amir | Full Stack Software Engineer & AI Developer",
    description: "Explore the projects, technical skills, and experience of Muhammad Ahmad Amir, a full-stack engineer and AI automation developer.",
    url: "https://muhammadahmadamir.dev",
    siteName: "Muhammad Ahmad Amir Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ahmad Amir | Full Stack Software Engineer & AI Developer",
    description: "Explore the projects, technical skills, and experience of Muhammad Ahmad Amir, a full-stack engineer and AI automation developer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        {/* Static background ambient layers — rendered server-side */}
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
        <div className="grid-overlay"   />

        {/* Client-side overlays + page content */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
