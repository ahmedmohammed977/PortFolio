"use client";

import React from "react";
import { Language, portfolioData } from "@/data/portfolioData";
import { Logo } from "@/components/brand/Logo";
import { playCyberClick } from "@/lib/sound";
import { ArrowUp, Activity, Terminal, ShieldCheck } from "lucide-react";

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    playCyberClick(1200, 0.05);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#040407] py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Identity */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
          <Logo lang={lang} />
          <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
          <p className="text-xs text-zinc-500 font-mono">
            {lang === "ar"
              ? "مهندس برمجيات متكامل • معمارية سحابية • أداء فائق"
              : "Full Stack Software Engineering • Cloud Architecture • Peak Performance"}
          </p>
        </div>

        {/* System Telemetry & Back to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Systems 100% OK</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">18ms</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glass-pill text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all active:scale-95"
            title={lang === "ar" ? "العودة للأعلى" : "Scroll to Top"}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start text-xs text-zinc-500 font-mono">
        <p>
          © {new Date().getFullYear()} {portfolioData.personal.fullName[lang]} ({portfolioData.personal.alias[lang]}). All rights reserved.
        </p>
        <p className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zero-Vulnerability Strict CSP & Schema.org Compliant</span>
        </p>
      </div>
    </footer>
  );
};
