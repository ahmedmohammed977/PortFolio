"use client";

import React, { useState, useRef, useEffect } from "react";
import { Language, portfolioData } from "@/data/portfolioData";
import { playCyberClick, playCyberSuccess } from "@/lib/sound";
import { Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from "lucide-react";
import confetti from "canvas-confetti";

interface TerminalSectionProps {
  lang: Language;
}

interface CommandLog {
  cmd: string;
  response: string | React.ReactNode;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ lang }) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      cmd: "welcome",
      response: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-cyan-400 font-bold">
            🚀 Ahmed Tash Tash Cybernet Kernel v2.5.0-production (x86_64-linux)
          </p>
          <p className="text-zinc-400 text-xs">
            {lang === "ar"
              ? "مرحباً بك في وحدة التحكم التفاعلية. اكتب 'help' لعرض الأوامر أو اضغط على الأزرار السريعة."
              : "Type 'help' for available diagnostic commands, or tap the quick execution pills below."}
          </p>
        </div>
      ),
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only scroll the terminal container internally without moving the browser window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playCyberClick(1200, 0.04);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setLogs([]);
      setInputVal("");
      return;
    }

    let res: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        res = (
          <div className="space-y-1.5 py-1">
            <p className="text-purple-400 font-bold">
              {lang === "ar" ? "الأوامر المتاحة:" : "Available System Commands:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div>
                <span className="text-cyan-400 font-mono font-bold">help</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "عرض الأوامر" : "List commands"}</span>
              </div>
              <div>
                <span className="text-cyan-400 font-mono font-bold">whoami</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "الهوية والملخص" : "Engineer identity"}</span>
              </div>
              <div>
                <span className="text-cyan-400 font-mono font-bold">skills</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "المهارات الشاملة" : "Full stack competencies"}</span>
              </div>
              <div>
                <span className="text-cyan-400 font-mono font-bold">projects</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "المشاريع الكبرى" : "Flagship portfolio"}</span>
              </div>
              <div>
                <span className="text-cyan-400 font-mono font-bold">contact</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "قنوات التواصل" : "Direct reach channels"}</span>
              </div>
              <div>
                <span className="text-emerald-400 font-mono font-bold">sudo hire ahmed</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "التعاقد الفوري" : "Fast-track hire"}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono font-bold">clear</span> -{" "}
                <span className="text-zinc-400">{lang === "ar" ? "مسح الشاشة" : "Wipe terminal"}</span>
              </div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "bio":
        res = (
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1 text-xs">
            <p className="text-white font-bold">{portfolioData.personal.fullName[lang]}</p>
            <p className="text-cyan-400 font-mono">AKA: {portfolioData.personal.alias[lang]}</p>
            <p className="text-zinc-300">{portfolioData.personal.title[lang]}</p>
            <p className="text-zinc-400">{portfolioData.personal.bio[lang]}</p>
            <p className="text-emerald-400">Status: {portfolioData.personal.badgeStatus[lang]}</p>
          </div>
        );
        break;

      case "skills":
        res = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-purple-400 font-bold">
              {lang === "ar" ? "⚡ الكفاءات والخبرات البرمجية المعتمدة:" : "⚡ Verified Technical Mastery & Proficiency:"}
            </p>
            <p>• <span className="text-emerald-400 font-bold">Python: 100%</span> | <span className="text-emerald-400 font-bold">MySQL Database: 100%</span></p>
            <p>• <span className="text-cyan-400 font-bold">JavaScript: 95%</span> | <span className="text-cyan-400 font-bold">TypeScript: 95%</span></p>
            <p>• <span className="text-amber-400 font-bold">{lang === "ar" ? "الهندسة الأساسية: 90%" : "Core Engineering: 90%"}</span> (Java, C++, C#, Angular, Django, REST APIs, OOP, DSA, Git & GitHub)</p>
            <p>• <span className="text-pink-400 font-bold">{lang === "ar" ? "الأدوات المتخصصة:" : "Specialized Tools:"}</span> VS Code (95%), Kali Linux (90%), Canva (95%), PowerPoint (95%), Word (95%), Excel (95%)</p>
            <p>• <span className="text-indigo-400 font-bold">{lang === "ar" ? "مجال التصميم:" : "Design Domain:"}</span> {lang === "ar" ? "مصمم جرافيك محترف (UI/UX، الهوية البصرية، الموشن ميديا)" : "Professional Graphic Designer (UI/UX, Visual Branding, Motion & Social Identity)"}</p>
          </div>
        );
        break;

      case "projects":
        res = (
          <div className="space-y-2 text-xs">
            {portfolioData.projects.map((p, idx) => (
              <div key={idx} className="p-2 rounded bg-white/5 border border-white/5">
                <span className="text-cyan-400 font-bold font-mono">[{p.category}]</span>{" "}
                <span className="text-white font-semibold">{p.title[lang]}</span>
                <p className="text-zinc-400 text-[11px]">{p.tagline[lang]}</p>
                <p className="text-emerald-400 text-[11px]">{p.metrics[lang]}</p>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-[10px] underline block mt-1"
                  >
                    🚀 Live Demo: {p.liveUrl}
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        res = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-bold">📬 Direct Channels:</p>
            <p>Email: <a href={`mailto:${portfolioData.personal.email}`} className="text-cyan-400 underline">{portfolioData.personal.email}</a></p>
            <p>Phone / WhatsApp: <a href={`https://wa.me/201121742874`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">01121742874</a></p>
            <p>Location: {portfolioData.personal.location[lang]}</p>
          </div>
        );
        break;

      case "sudo hire ahmed":
      case "hire":
        playCyberSuccess();
        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#00f0ff", "#a855f7", "#ec4899", "#10b981"],
          });
        } catch {
          // ignore
        }
        res = (
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-400/40 text-emerald-300 space-y-2">
            <p className="font-bold text-sm">🎉 ACCESS GRANTED: Priority Client Route Unlocked!</p>
            <p className="text-xs text-zinc-300">
              {lang === "ar"
                ? "تم فتح قناة التواصل المباشرة الفورية مع أحمد طشطش. اضغط على الزر أدناه لإرسال استفسارك فوراً."
                : "You just initiated high-priority booking with Ahmed TashTash. Click below to jump directly to the contact form."}
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="px-4 py-2 rounded-lg bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 transition-all"
            >
              {lang === "ar" ? "الانتقال لقسم التواصل الآن" : "Jump to Contact Form"}
            </button>
          </div>
        );
        break;

      default:
        res = (
          <p className="text-rose-400 text-xs">
            Command not recognized: <span className="font-mono underline">{rawCmd}</span>. Type{" "}
            <span className="text-cyan-400 font-mono font-bold">help</span> to view available system commands.
          </p>
        );
    }

    setLogs((prev) => [...prev, { cmd: rawCmd, response: res }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(history[history.length - 1 - nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[history.length - 1 - nextIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const quickCommands = ["help", "whoami", "skills", "projects", "sudo hire ahmed", "clear"];

  return (
    <section id="terminal" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === "ar" ? "وحدة تحكم تفاعلية للمطورين" : "Interactive Developer Console"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          <span className="gradient-text-cyan-purple font-mono">
            {lang === "ar" ? "تيرمينال المهندس الحي" : "Live Cyber Terminal"}
          </span>
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm">
          {lang === "ar"
            ? "اختبر مهارات أحمد مباشرة من خلال موجه الأوامر، أو استخدم الأزرار السريعة لتشغيل الأوامر بضغطة زر."
            : "Query my tech stack and experience in real-time through an interactive Unix-style shell."}
        </p>
      </div>

      {/* Terminal Container */}
      <div
        className={`glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden font-mono transition-all duration-300 ${
          isExpanded ? "fixed inset-4 sm:inset-12 z-50 flex flex-col bg-[#05060d]/95" : ""
        }`}
      >
        {/* Window Chrome Header */}
        <div className="px-4 py-3 bg-[#0a0c16]/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-zinc-400 ml-2 font-mono flex items-center gap-1.5">
              <span>tash@server:~</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                zsh
              </span>
            </span>
          </div>

          <button
            onClick={() => {
              playCyberClick(800, 0.03);
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
            title={isExpanded ? "Collapse" : "Maximize"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className={`p-4 sm:p-6 overflow-y-auto space-y-3 cursor-text ${
            isExpanded ? "flex-1" : "min-h-[300px] max-h-[440px]"
          }`}
        >
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400">
                <span className="text-purple-400">❯</span>
                <span className="text-zinc-500">tash$</span>
                <span className="text-white font-bold">{log.cmd}</span>
              </div>
              <div className="text-xs sm:text-sm">{log.response}</div>
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400 pt-1 min-w-0">
            <span className="text-purple-400 animate-pulse shrink-0">❯</span>
            <span className="text-zinc-500 shrink-0">tash$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === "ar" ? "اكتب أمراً هنا... (جرب: help)" : "Type a command... (try: help)"}
              className="flex-1 min-w-0 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm caret-cyan-400"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-1 text-zinc-500 hover:text-cyan-400 transition-colors shrink-0"
              aria-label="Execute command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Pills for mobile & convenience */}
        <div className="p-3 bg-[#080914] border-t border-white/5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-zinc-500 font-mono">
            {lang === "ar" ? "أوامر سريعة:" : "Quick Run:"}
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-[11px] font-mono text-zinc-300 hover:text-cyan-300 transition-all active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
