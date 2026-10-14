"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Language } from "@/data/portfolioData";
import { playCyberClick, toggleSound, isSoundEnabled } from "@/lib/sound";
import { Volume2, VolumeX, Globe, Menu, X, Terminal, FolderGit2, Send } from "lucide-react";

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Instant-dismiss and fluid scroll continuation on mobile
  useEffect(() => {
    if (!mobileMenuOpen) return;

    let touchStartY = 0;
    let hasDismissed = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      hasDismissed = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (hasDismissed) return;
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;

      // As soon as user swipes > 6px, close menu AND scroll window immediately
      if (Math.abs(deltaY) > 6) {
        hasDismissed = true;
        setMobileMenuOpen(false);
        // Seamlessly continue the scroll gesture down/up so the page never hangs
        window.scrollBy({
          top: deltaY > 0 ? Math.max(deltaY * 2.5, 60) : Math.min(deltaY * 2.5, -60),
          behavior: "smooth",
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      setMobileMenuOpen(false);
      window.scrollBy({ top: e.deltaY, behavior: "auto" });
    };

    const handleWindowScroll = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    playCyberClick(1000, 0.04);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Exact clearance for fixed floating glass navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navLinks = [
    { id: "projects", label: { en: "Projects", ar: "المشاريع" }, icon: FolderGit2, num: "01" },
    { id: "skills", label: { en: "Tech Stack", ar: "المهارات التقنية" }, num: "02" },
    { id: "terminal", label: { en: "Interactive Terminal", ar: "التيرمينال التفاعلي" }, icon: Terminal, num: "03" },
    { id: "experience", label: { en: "Experience Pillars", ar: "الخبرات التخصصية" }, num: "04" },
    { id: "contact", label: { en: "Direct Contact", ar: "تواصل معي" }, num: "05" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
        <nav
          className={`w-full max-w-6xl rounded-2xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-3 ${
            scrolled
              ? "glass-panel bg-[#070814]/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <Logo lang={lang} />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5"
              >
                {item.icon && <item.icon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{item.label[lang]}</span>
              </button>
            ))}
          </div>

          {/* Action Controls: Sound + Language Switcher + Hire CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-xl glass-pill text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
              title={soundOn ? (lang === "ar" ? "كتم المؤثرات الصوتية" : "Mute SFX") : (lang === "ar" ? "تفعيل المؤثرات الصوتية" : "Enable SFX")}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </button>

            {/* Language Toggle (AR / EN) */}
            <button
              onClick={() => {
                playCyberClick(1100, 0.05);
                onToggleLang();
              }}
              className="px-2.5 py-1.5 rounded-xl glass-pill text-xs font-mono font-semibold text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-200 flex items-center gap-1.5"
              title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === "en" ? "عربي" : "EN"}</span>
            </button>

            {/* Quick Contact Button */}
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold text-xs tracking-wide shadow-neon-cyan hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "تواصل معي" : "Hire Me"}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                playCyberClick(700, 0.03);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl glass-pill text-zinc-300 hover:text-cyan-400 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Dedicated Full-Screen Mobile Navigation Page */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#060713]/98 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in fade-in zoom-in-95 duration-200 select-none overflow-y-hidden"
          style={{ touchAction: "pan-y" }}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar inside Mobile Navigation Page */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Logo lang={lang} />
            <button
              onClick={() => {
                playCyberClick(700, 0.03);
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 hover:text-cyan-400 active:scale-95 transition-all"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links list */}
          <div className="flex flex-col gap-3 my-auto py-6">
            <span className="text-[11px] font-mono tracking-widest text-cyan-400/80 uppercase">
              {lang === "ar" ? "// قائمة التنقل السريع" : "// SYSTEM NAVIGATION"}
            </span>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-start py-3.5 px-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-500/40 text-zinc-100 hover:text-cyan-300 font-medium text-lg transition-all flex items-center justify-between group active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-cyan-400">
                    {item.num}
                  </span>
                  <span>{item.label[lang]}</span>
                </div>
                {item.icon ? (
                  <item.icon className="w-5 h-5 text-cyan-400" />
                ) : (
                  <span className="text-zinc-600 group-hover:text-cyan-400">→</span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Actions & Scroll Dismiss Indicator */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-base text-center shadow-neon-cyan active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{lang === "ar" ? "ابدأ مشروعك مع أحمد" : "Hire Ahmed Now"}</span>
            </button>

            {/* Gesture Hint for Auto-Dismiss */}
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400/70 text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                {lang === "ar"
                  ? "اسحب أو مرر الشاشة للإغلاق الفوري"
                  : "Swipe or scroll anywhere to auto-dismiss"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
