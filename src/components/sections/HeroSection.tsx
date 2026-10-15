"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Language, portfolioData } from "@/data/portfolioData";
import { playCyberClick, playCyberSuccess } from "@/lib/sound";
import { ArrowDown, Copy, Check, Terminal, FolderGit2, FileDown, Cpu, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { CyberCore3D } from "@/components/ui/CyberCore3D";

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const { personal, stats } = portfolioData;

  // Phrases to cycle through the typewriter (Strictly English in EN, Strictly Arabic in AR)
  const phrases = useMemo(() => {
    if (lang === "ar") {
      return [
        personal.fullName.ar, // أحمد محمد
      ];
    }
    return [
      personal.fullName.en, // Ahmed Mohammed
      personal.fullName.en.toUpperCase(), // AHMED MOHAMMED
    ];
  }, [lang, personal]);

  // Typewriter Engine (Type -> Pause -> Delete letter by letter -> Pause -> Next Word)
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Instantly reset typewriter when language changes so it starts typing in the new language with zero delay
  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setPhraseIndex(0);
  }, [lang]);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 90);
      } else {
        // Finished typing full phrase, hold for a while
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 45);
      } else {
        // Finished deleting, switch to next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  const handleCopyEmail = () => {
    playCyberSuccess();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);

    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#00f0ff", "#a855f7", "#ec4899"],
      });
    } catch {
      // Ignore confetti errors if blocked
    }

    setTimeout(() => setCopied(false), 2500);
  };

  const scrollTo = (id: string) => {
    playCyberClick(900, 0.04);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    playCyberSuccess();
    window.open("/Ahmed_Mohammed_Ahmed_Resume.html", "_blank");
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center pt-24 pb-16 px-2 sm:px-4 text-center overflow-hidden w-full">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* 3D Interactive Cyber Core */}
      <CyberCore3D />

      {/* 1. Live Status Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-neon-cyan/20 mb-4 sm:mb-6 animate-float z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold tracking-wide">{personal.badgeStatus[lang]}</span>
      </div>

      {/* 2. Balanced Horizontal Statement Name with Continuous Typewriter & Delete Animation */}
      <div className="w-full max-w-5xl relative flex flex-col items-center justify-center my-2 sm:my-3 z-10 overflow-hidden">

        {/* The Animated Horizontal Name Container - Perfectly Balanced Proportions */}
        <div className="w-full px-2 sm:px-4 flex items-center justify-center min-h-[1.4em]">
          <h1 className={`w-full text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight select-none whitespace-nowrap flex items-center justify-center ${
            lang === "ar" ? "font-arabic" : "font-mono"
          }`}>
            <span className="hero-typewriter-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              {displayText || "\u00A0"}
            </span>
            <span
              className="inline-block w-1.5 sm:w-2 md:w-2.5 h-[0.8em] bg-cyan-400 ml-1.5 mr-1.5 rounded-sm animate-pulse shadow-[0_0_12px_#00f0ff] align-middle shrink-0"
              aria-hidden="true"
            />
          </h1>
        </div>

        {/* Professional Credential Pill (Replacing Alias) */}
        <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs sm:text-sm font-mono text-cyan-300 font-semibold tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === "ar" ? "مهندس برمجيات • علوم حاسب" : "Software Engineer • Computer Science"}</span>
          </span>
        </div>
      </div>

      {/* 3. Role & Bio */}
      <div className="max-w-3xl mx-auto space-y-3 px-4 z-10 mt-1">
        <p className="text-sm sm:text-xl md:text-2xl font-semibold text-zinc-200 max-w-2xl mx-auto flex items-center justify-center gap-2 pt-1 flex-wrap">
          <Cpu className="w-5 h-5 text-cyan-400 inline shrink-0" />
          <span>{personal.title[lang]}</span>
        </p>

        <p className="text-xs sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {personal.bio[lang]}
        </p>
      </div>

      {/* 4. Action CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-8 max-w-2xl mx-auto px-2 z-10">
        {/* Explore Projects */}
        <button
          onClick={() => scrollTo("projects")}
          className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          <FolderGit2 className="w-4 h-4 shrink-0 text-black" />
          <span>{lang === "ar" ? "استكشف المشاريع" : "Flagship Projects"}</span>
        </button>

        {/* Copy Email Button with confetti feedback */}
        <button
          onClick={handleCopyEmail}
          className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl glass-panel glass-panel-hover border border-white/10 text-white font-medium text-xs sm:text-sm flex items-center gap-2 active:scale-95 transition-all max-w-full cursor-pointer"
          title={lang === "ar" ? "نسخ البريد الإلكتروني" : "Copy email address"}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 text-cyan-400 shrink-0" />}
          <span className="font-mono text-xs sm:text-sm truncate max-w-[190px] xs:max-w-none">
            {copied ? (lang === "ar" ? "تم نسخ الإيميل!" : "Copied!") : personal.email}
          </span>
        </button>

        {/* Open Terminal */}
        <button
          onClick={() => scrollTo("terminal")}
          className="px-4 py-3.5 rounded-xl glass-pill text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>{lang === "ar" ? "تيرمينال تفاعلي" : "Live Terminal"}</span>
        </button>

        {/* Download CV */}
        <button
          onClick={handleDownloadCV}
          className="px-4 py-3.5 rounded-xl glass-pill text-zinc-300 hover:text-emerald-300 hover:border-emerald-500/40 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-emerald-400" />
          <span>{lang === "ar" ? "تحميل السيرة الذاتية" : "Download CV"}</span>
        </button>
      </div>

      {/* 5. Stats Grid Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-4xl w-full mx-auto px-2 z-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group"
          >
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              {stat.value}
            </span>
            <span className="text-xs text-zinc-400 mt-1 font-medium">
              {stat.label[lang]}
            </span>
          </div>
        ))}
      </div>

      {/* 6. Scroll Down Indicator */}
      <button
        onClick={() => scrollTo("projects")}
        aria-label="Scroll down to projects section"
        className="mt-12 text-zinc-500 hover:text-cyan-400 transition-colors animate-bounce p-2 z-10 cursor-pointer"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};
