"use client";

import React from "react";
import { playCyberClick } from "@/lib/sound";

interface LogoProps {
  lang?: "en" | "ar";
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ lang = "en", onClick, className = "" }) => {
  const handleClick = () => {
    playCyberClick(1200, 0.05);
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-2 sm:gap-3 cursor-pointer select-none ${className}`}
      title="Ahmed Tash Tash - Full Stack Architect"
    >
      {/* 3D Holographic Crest */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
        {/* Outer Pulsing Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/25 via-emerald-500/20 to-teal-400/25 blur-md group-hover:blur-lg transition-all duration-300 opacity-60 group-hover:opacity-100" />

        {/* Faceted Shield Body */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#070b12] border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 overflow-hidden">
          {/* Subtle animated scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-out" />

          {/* SVG Monogram: A & Double T [A // TT] */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-7 sm:h-7 transform group-hover:rotate-6 transition-transform duration-300"
          >
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* The A Apex */}
            <path
              d="M18 4L6 28H11L14 21H22L25 28H30L18 4ZM15.5 17L18 10.5L20.5 17H15.5Z"
              fill="url(#logoGrad)"
              fillOpacity="0.95"
            />
            {/* The TT Slash Energy Core */}
            <path
              d="M13 14H23M18 14V26"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_#00f0ff]"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
          <span className="text-xs sm:text-base tracking-wide font-extrabold font-mono text-white truncate">
            {lang === "ar" ? "أحمد محمد" : "Ahmed Mohammed"}
          </span>
          <span className="text-[10px] sm:text-[11px] px-1 sm:px-1.5 py-0.5 rounded-md bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono font-medium shrink-0">
            {lang === "ar" ? "طشطش" : "TashTash"}
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-zinc-400 uppercase font-mono hidden xs:block truncate">
          {lang === "ar" ? "مهندس برمجيات • علوم حاسب" : "Software Engineer • CS"}
        </span>
      </div>
    </div>
  );
};
