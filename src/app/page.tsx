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
import { CinematicIntro } from "@/components/intro/CinematicIntro";

import { ScrollRevealSection } from "@/components/ui/ScrollRevealSection";

// Lazy load 3D background with ssr: false for instant FCP performance
const CyberBackground = dynamic(
  () => import("@/components/canvas/CyberBackground").then((mod) => mod.CyberBackground),
  { ssr: false }
);

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
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
        setLang("en");
      }
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tash_intro_seen", "true");
    }
  };

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
      {/* Cinematic Hacker Terminal Intro - Zero-Flash Initial Mount */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} lang={lang} />
      )}

      {/* Main Portfolio Surface - Strictly masked while Intro runs to eliminate any flash */}
      <div
        className={`transition-opacity duration-700 ${
          showIntro
            ? "opacity-0 pointer-events-none invisible max-h-0 overflow-hidden"
            : "opacity-100 visible"
        }`}
      >
        {/* 3D WebGL Live Particle & Core Background */}
        <CyberBackground />

        {/* Subtle Matrix Ambient Noise / Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0" />
        <div className="fixed inset-0 pointer-events-none bg-radial-vignette z-0" />

        {/* Floating Glassmorphic Navbar */}
        <Navbar lang={lang} onToggleLang={handleToggleLang} />

        {/* Main Content Sections with Bidirectional Scroll-Triggered Reveal */}
        <main className="relative z-10 space-y-10 sm:space-y-20">
          <ScrollRevealSection initialVisible={true}>
            <HeroSection lang={lang} />
          </ScrollRevealSection>
          <ScrollRevealSection>
            <ProjectsSection lang={lang} />
          </ScrollRevealSection>
          <ScrollRevealSection>
            <SkillsSection lang={lang} />
          </ScrollRevealSection>
          <ScrollRevealSection>
            <TerminalSection lang={lang} />
          </ScrollRevealSection>
          <ScrollRevealSection>
            <ExperienceSection lang={lang} />
          </ScrollRevealSection>
          <ScrollRevealSection>
            <ContactSection lang={lang} />
          </ScrollRevealSection>
        </main>

        {/* Telemetry Footer with Scroll Reveal */}
        <ScrollRevealSection threshold={0.02} rootMargin="0px 0px 0px 0px">
          <Footer lang={lang} />
        </ScrollRevealSection>
      </div>
    </div>
  );
}

