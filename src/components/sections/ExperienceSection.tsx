"use client";

import React, { useState } from "react";
import { Language, portfolioData, ExperiencePillar } from "@/data/portfolioData";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Terminal,
  Code2,
  Monitor,
  Server,
  Database,
  ShieldCheck,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface ExperienceSectionProps {
  lang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ lang }) => {
  const { experience, experiencePillars } = portfolioData;
  const [activePillar, setActivePillar] = useState<string>("python");

  const getPillarIcon = (id: string) => {
    switch (id) {
      case "python":
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case "frontend":
        return <Code2 className="w-5 h-5 text-purple-400" />;
      case "desktop":
        return <Monitor className="w-5 h-5 text-emerald-400" />;
      case "backend":
        return <Server className="w-5 h-5 text-amber-400" />;
      case "database":
        return <Database className="w-5 h-5 text-blue-400" />;
      case "security":
        return <ShieldCheck className="w-5 h-5 text-rose-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 px-4 max-w-6xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>{lang === "ar" ? "سجل الخبرة الهندسية وسنوات الإنجاز" : "Verified Engineering Record"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          <span className="gradient-text-cyan-purple font-mono">
            {lang === "ar" ? "سنوات الخبرة والمحطات العملية" : "Core Experience & Track Record"}
          </span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {lang === "ar"
            ? "خلاصة سنوات من التطوير البرمجي المركز في بايثون وتطبيقات سطح المكتب والواجهات العصرية والأنظمة الخلفية، مع مسار عملي وتدريبي معتمد."
            : "Demonstrated track record spanning Python engineering, desktop software suites, modern frontend platforms, and secure backend systems."}
        </p>
      </div>

      {/* 1. Core Competency & Experience Pillars Grid */}
      <div className="mb-20">
        <div className="flex items-center justify-between gap-3 mb-6 px-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
              {lang === "ar" ? "ركائز الخبرة التخصصية" : "Specialized Experience Pillars"}
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            {lang === "ar" ? "توزيع سنوات الخبرة العملية" : "Hands-on Years Breakdown"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiencePillars.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? "bg-[#0b0e22]/90 border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.2)] scale-[1.01]"
                    : "glass-panel bg-[#070914]/60 border-white/10 hover:border-cyan-500/30 hover:bg-[#090c1e]/70"
                }`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20 bg-gradient-to-br ${pillar.gradient}`}
                />

                <div className="relative space-y-4">
                  {/* Top Bar: Icon + Years Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      {getPillarIcon(pillar.id)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      {pillar.years[lang]}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title[lang]}
                    </h4>
                    <span className="text-xs font-mono text-purple-400">
                      {pillar.category[lang]}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed min-h-[48px]">
                    {pillar.description[lang]}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {pillar.highlights[lang].slice(0, 2).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pillar.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10.5px] font-mono text-zinc-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Chronological Milestones Timeline Header */}
      <div className="flex items-center gap-2 mb-8 px-1">
        <Briefcase className="w-4 h-4 text-purple-400" />
        <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
          {lang === "ar" ? "المسار الوظيفي والمحطات التطبيقية" : "Career Timeline & Industry Roles"}
        </h3>
      </div>

      {/* Timeline List */}
      <div className="relative border-s border-cyan-500/25 ms-4 sm:ms-8 space-y-10">
        {experience.map((item, idx) => (
          <div key={idx} className="relative ps-6 sm:ps-10 group">
            {/* Glowing Timeline Marker */}
            <span className="absolute -start-[17px] top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#070914] border-2 border-cyan-400 group-hover:border-cyan-300 shadow-[0_0_18px_rgba(0,240,255,0.45)] transition-all">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 group-hover:bg-cyan-200" />
            </span>

            {/* Timeline Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-4 bg-[#070914]/80">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.role[lang]}
                  </h4>
                  <p className="text-sm font-semibold text-purple-400 font-mono mt-0.5">
                    {item.company[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.period[lang]}</span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {item.description[lang]}
              </p>

              {/* Achievements */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {lang === "ar" ? "أبرز الإنجازات والنتائج المحققة:" : "Key Impacts & Deliverables:"}
                </span>
                <ul className="space-y-2">
                  {item.achievements[lang].map((ach, achIdx) => (
                    <li key={achIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-zinc-400 border border-white/5 hover:border-cyan-500/20 hover:text-cyan-300 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
