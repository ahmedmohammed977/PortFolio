"use client";

import React, { useState } from "react";
import { Language, portfolioData } from "@/data/portfolioData";
import { playCyberClick, playCyberSuccess } from "@/lib/sound";
import { ArrowDown, Copy, Check, Terminal, Sparkles, FileDown, ShieldCheck, Cpu } from "lucide-react";
import confetti from "canvas-confetti";

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const { personal, stats } = portfolioData;

  const handleCopyEmail = () => {
    playCyberSuccess();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
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
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 text-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Live Status Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-neon-cyan/20 mb-6 animate-float">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold tracking-wide">{personal.badgeStatus[lang]}</span>
      </div>

      {/* 2. Main Title & Identity */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white">
          <span className="gradient-text-cyan-purple font-mono drop-shadow-[0_0_45px_rgba(0,240,255,0.45)]">
            {personal.fullName[lang]}
          </span>
        </h1>

        {/* Small Alias Moniker */}
        <div className="flex items-center justify-center">
          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-cyan-500/20 text-sm sm:text-base font-mono text-cyan-300 font-semibold tracking-wider">
            ({personal.alias[lang]})
          </span>
        </div>

        <p className="text-lg sm:text-2xl font-semibold text-zinc-200 max-w-2xl mx-auto flex items-center justify-center gap-2 pt-1">
          <Cpu className="w-5 h-5 text-cyan-400 inline shrink-0" />
          <span>{personal.title[lang]}</span>
        </p>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed pt-2">
          {personal.bio[lang]}
        </p>
      </div>

      {/* 3. Action CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 max-w-xl mx-auto">
        {/* Explore Projects */}
        <button
          onClick={() => scrollTo("projects")}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold text-sm tracking-wide shadow-neon-cyan hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === "ar" ? "استكشف المشاريع" : "Flagship Projects"}</span>
        </button>

        {/* Copy Email Button with feedback */}
        <button
          onClick={handleCopyEmail}
          className="px-5 py-3.5 rounded-xl glass-panel glass-panel-hover border border-white/10 text-white font-medium text-sm flex items-center gap-2 active:scale-95 transition-all"
          title={lang === "ar" ? "نسخ البريد الإلكتروني" : "Copy email address"}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
          <span className="font-mono text-xs sm:text-sm">
            {copied ? (lang === "ar" ? "تم نسخ الإيميل!" : "Copied!") : personal.email}
          </span>
        </button>

        {/* Open Terminal */}
        <button
          onClick={() => scrollTo("terminal")}
          className="px-4 py-3.5 rounded-xl glass-pill text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
        >
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>{lang === "ar" ? "تيرمينال تفاعلي" : "Live Terminal"}</span>
        </button>

        {/* Download CV */}
        <button
          onClick={handleDownloadCV}
          className="px-4 py-3.5 rounded-xl glass-pill text-zinc-300 hover:text-purple-300 hover:border-purple-500/40 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
        >
          <FileDown className="w-4 h-4 text-emerald-400" />
          <span>{lang === "ar" ? "تحميل CV" : "Download CV"}</span>
        </button>
      </div>

      {/* 4. Stats Grid Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-4xl w-full mx-auto px-2">
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

      {/* 5. Scroll Down Indicator */}
      <button
        onClick={() => scrollTo("projects")}
        aria-label="Scroll down to projects section"
        className="mt-12 text-zinc-500 hover:text-cyan-400 transition-colors animate-bounce p-2"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};
