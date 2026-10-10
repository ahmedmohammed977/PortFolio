"use client";

import React, { useState } from "react";
import { Language, portfolioData, Project } from "@/data/portfolioData";
import { playCyberClick } from "@/lib/sound";
import { ExternalLink, Github, Sparkles, TrendingUp, Layers, Eye, X, Globe, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const { projects } = portfolioData;

  const categories = ["All", "Full Stack", "FinTech", "Cloud & Systems", "System Architecture"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleFilterClick = (cat: string) => {
    playCyberClick(850, 0.03);
    setSelectedCategory(cat);
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === "ar" ? "أعمال معتمدة واستثنائية" : "Engineered for Scale"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          <span className="gradient-text-cyan-purple font-mono">
            {lang === "ar" ? "مشاريع برمجية رائدة" : "Flagship Projects"}
          </span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          {lang === "ar"
            ? "نظم برمجية حية مبنية بأعلى معايير الأداء والأمان وتحمل ملايين الزيارات والعمليات المالية."
            : "Production-tested architectures engineered for extreme throughput, zero downtime, and bank-grade security."}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterClick(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium font-mono transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold shadow-neon-cyan/50"
                : "glass-pill text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            {/* Image Preview Container */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-950">
              <Image
                src={project.image}
                alt={project.title[lang]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />

              {/* Category Pill Over Image */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>{project.category}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-cyan-400/90 font-mono">
                  {project.tagline[lang]}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                  {project.description[lang]}
                </p>
              </div>

              {/* Business Impact / Metrics Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-300 text-xs font-mono">
                <TrendingUp className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-semibold">{project.metrics[lang]}</span>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links & Actions */}
              <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
                {project.liveUrl ? (
                  <>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playCyberClick(1100, 0.04)}
                      className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm hover:shadow-neon-cyan/20"
                      title={project.liveUrl}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{lang === "ar" ? "فتح المشروع لايف" : "Launch Live Demo"}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        playCyberClick(800, 0.03);
                        setPreviewProject(project);
                      }}
                      className="py-2.5 px-3 rounded-xl glass-pill text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400/60 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                      title={lang === "ar" ? "معاينة سريعة داخل الصفحة" : "In-page live preview"}
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>{lang === "ar" ? "معاينة سريعة" : "Preview"}</span>
                    </button>
                  </>
                ) : (
                  <div className="flex-1 min-w-[140px] py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono flex items-center justify-center gap-1.5">
                    <span>
                      {project.technologies.some((t) => t.toLowerCase().includes("python"))
                        ? (lang === "ar" ? "🖥️ تطبيق بايثون لسطح المكتب" : "🖥️ Python Desktop Suite")
                        : (lang === "ar" ? "📦 الكود المصدري على GitHub" : "📦 Source Code on GitHub")}
                    </span>
                  </div>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playCyberClick(900, 0.04)}
                    className="py-2.5 px-3 rounded-xl glass-pill text-zinc-300 hover:text-white border border-white/10 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                    title={lang === "ar" ? "الكود المصدري على GitHub" : "Source Code on GitHub"}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cyber In-Portfolio Live Demo Viewer Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl bg-[#090b16] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden">
            {/* Modal Browser Header */}
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0c0f1f] border-b border-white/10 flex items-center justify-between gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 shrink-0" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 shrink-0" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 shrink-0" />
                <span className="text-xs font-mono font-bold text-white ml-1.5 sm:ml-2 truncate max-w-[120px] sm:max-w-xs">
                  {previewProject.title[lang]}
                </span>
              </div>

              {/* URL Address Pill */}
              <div className="hidden xs:flex flex-1 max-w-md mx-1 sm:mx-2 px-2.5 sm:px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-zinc-400 text-xs font-mono items-center justify-between min-w-0">
                <span className="truncate text-cyan-300 text-[11px] sm:text-xs">{previewProject.liveUrl}</span>
                <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0 ml-1" />
              </div>

              <div className="flex items-center gap-2">
                {previewProject.liveUrl && (
                  <a
                    href={previewProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs flex items-center gap-1 transition-colors"
                    title={lang === "ar" ? "فتح في نافذة كاملة" : "Open in new window"}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline font-mono">{lang === "ar" ? "نافذة كاملة" : "Full"}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    playCyberClick(700, 0.03);
                    setPreviewProject(null);
                  }}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Live Frame */}
            <div className="flex-1 relative w-full h-full bg-[#05060d]">
              {previewProject.liveUrl ? (
                <iframe
                  src={previewProject.liveUrl}
                  title={previewProject.title[lang]}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-400 text-sm font-mono">
                  No preview available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
