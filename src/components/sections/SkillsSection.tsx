"use client";

import React, { useState } from "react";
import { Language, portfolioData } from "@/data/portfolioData";
import { playCyberClick } from "@/lib/sound";
import { Layout, Server, Database, Shield, Zap, Palette, Wrench, Code } from "lucide-react";

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const { skillCategories } = portfolioData;
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="w-5 h-5 text-cyan-400" />;
      case "layout":
        return <Layout className="w-5 h-5 text-blue-400" />;
      case "server":
        return <Server className="w-5 h-5 text-purple-400" />;
      case "database":
        return <Database className="w-5 h-5 text-amber-400" />;
      case "tools":
      case "palette":
        return <Palette className="w-5 h-5 text-pink-400" />;
      case "shield":
        return <Shield className="w-5 h-5 text-emerald-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleTabChange = (idx: number) => {
    playCyberClick(900 + idx * 80, 0.03);
    setActiveTab(idx);
  };

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-purple-500/20 text-xs font-mono text-purple-400">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>{lang === "ar" ? "الترسانة التقنية الشاملة" : "Technical Arsenal"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          <span className="gradient-text-cyan-purple font-mono">
            {lang === "ar" ? "المهارات والتقنيات البرمجية" : "Tech Stack & Engineering Skills"}
          </span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          {lang === "ar"
            ? "تقنيات وأدوات مجربة في بيئات الإنتاج الفعلية لبناء منتجات عالية الأداء وخالية من الثغرات."
            : "Production-grade mastery across modern frontend frameworks, distributed backends, resilient databases, and cloud security."}
        </p>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {skillCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 text-start ${activeTab === idx
                ? "glass-panel bg-cyan-950/20 border-cyan-400/50 shadow-neon-cyan/30 text-white"
                : "glass-panel border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
          >
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
              {getIcon(cat.icon)}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold">{cat.title[lang]}</h3>
              <span className="text-[10px] font-mono text-zinc-500">
                {cat.skills.length} {lang === "ar" ? "مهارات" : "technologies"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Active Skills Panel */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories[activeTab].skills.map((skill, idx) => (
            <div
              key={idx}
              className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-200 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-semibold">
                      Core
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-cyan-400 transition-colors">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
