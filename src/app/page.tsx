"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Language } from "@/data/portfolioData";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/navigation/Footer";

// Lazy load 3D background with ssr: false for instant FCP performance
const CyberBackground = dynamic(
  () => import("@/components/canvas/CyberBackground").then((mod) => mod.CyberBackground),
  { ssr: false }
);

export default function Home() {
  // Initial load defaults strictly to English on any link and on local
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    // Force browser to land at top on refresh or initial load
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);

      // 1. Explicit query parameter check (?lang=ar or ?lang=en)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang") as Language | null;
      if (urlLang === "ar" || urlLang === "en") {
        setLang(urlLang);
        sessionStorage.setItem("tash_portfolio_session_lang", urlLang);
        return;
      }

      // 2. Tab session preference if toggled during this browsing session
      const sessionLang = sessionStorage.getItem("tash_portfolio_session_lang") as Language | null;
      if (sessionLang === "ar" || sessionLang === "en") {
        setLang(sessionLang);
      } else {
        // First visit / fresh link / localhost: Always start with English
        setLang("en");
      }
    }
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      if (typeof window !== "undefined") {
        sessionStorage.setItem("tash_portfolio_session_lang", next);
        localStorage.setItem("tash_portfolio_lang", next);
      }
      return next;
    });
  };

  const isRtl = lang === "ar";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative min-h-screen bg-[#050508] text-white overflow-hidden transition-all duration-300 ${
        isRtl ? "font-arabic" : "font-sans"
      }`}
    >
      {/* 3D WebGL Live Particle & Core Background */}
      <CyberBackground />

      {/* Subtle Matrix Ambient Noise / Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-radial-vignette z-0" />

      {/* Floating Glassmorphic Navbar */}
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-8 sm:space-y-16">
        <HeroSection lang={lang} />
        <ProjectsSection lang={lang} />
        <SkillsSection lang={lang} />
        <TerminalSection lang={lang} />
        <ExperienceSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      {/* Telemetry Footer */}
      <Footer lang={lang} />
    </div>
  );
}
