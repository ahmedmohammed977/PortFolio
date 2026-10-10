"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Language } from "@/data/portfolioData";
import { playCyberClick, toggleSound, isSoundEnabled } from "@/lib/sound";
import { Volume2, VolumeX, Globe, Menu, X, Terminal, Sparkles, Send } from "lucide-react";

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
    { id: "projects", label: { en: "Projects", ar: "المشاريع" }, icon: Sparkles },
    { id: "skills", label: { en: "Tech Stack", ar: "المهارات" } },
    { id: "terminal", label: { en: "Terminal", ar: "التيرمينال" }, icon: Terminal },
    { id: "experience", label: { en: "Experience", ar: "الخبرات" } },
    { id: "contact", label: { en: "Contact", ar: "تواصل" } },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl rounded-2xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-3 ${
          scrolled
            ? "glass-panel bg-[#070814]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10"
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
            title={soundOn ? (lang === "ar" ? "كتم الصوت" : "Mute SFX") : (lang === "ar" ? "تفعيل الصوت" : "Enable SFX")}
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
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 glass-panel bg-[#090a18]/95 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-start py-2.5 px-4 rounded-xl text-zinc-200 hover:text-cyan-300 hover:bg-white/5 font-medium text-base transition-colors flex items-center justify-between"
              >
                <span>{item.label[lang]}</span>
                {item.icon && <item.icon className="w-4 h-4 text-cyan-400" />}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-sm text-center shadow-lg active:scale-95 transition-all"
            >
              {lang === "ar" ? "تواصل فوري مع أحمد" : "Direct Hire Channel"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
