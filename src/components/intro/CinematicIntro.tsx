"use client";

import React, { useEffect, useRef, useState } from "react";
import { playDeveloperTerminalBoot, playHackerKeystroke, playAccessGrantedSound, playCyberClick } from "@/lib/sound";
import { Terminal, ShieldAlert, Cpu, HardDrive, Network, CheckCircle2, FastForward, Activity, Lock, Unlock, Code2 } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
  lang?: "en" | "ar";
}

interface TerminalLine {
  id: number;
  prefix: string;
  command: string;
  output?: string;
  status?: "ok" | "warn" | "executing";
  tag?: string;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, lang = "en" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [activeCodeLine, setActiveCodeLine] = useState<number>(0);
  const [isAccessGranted, setIsAccessGranted] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [metrics, setMetrics] = useState({
    cpu: 24,
    ram: "18.2 MB",
    latency: "0.18ms",
    packets: "14,820/s",
  });

  const isRtl = lang === "ar";

  // Authentic Mr. Robot / Kali Linux Penetration-Testing Shell Operations
  const scriptLines: TerminalLine[] = [
    {
      id: 1,
      prefix: "root@kali:~#",
      command: "nmap -sS -Pn -T4 -p 22,80,443,8080,5432 target.infra.internal",
      output: "[+] 443/TLS-1.3 [ALPN: h2,http/1.1] | 8080/API Gateway [SERVICES DETECTED]",
      status: "ok",
      tag: "RECON",
    },
    {
      id: 2,
      prefix: "root@kali:~#",
      command: "python3 -m exploit.buffer_overflow --inject-shellcode --evade-edr",
      output: "[+] ROP Chain Deployed [0x7ffd5a20] -> ASLR/DEP Circumvented [SUCCESS]",
      status: "ok",
      tag: "EXPLOIT",
    },
    {
      id: 3,
      prefix: "root@kali:~#",
      command: "hashcat -m 1800 -a 0 shadow_hashes.txt /usr/share/wordlists/rockyou.txt",
      output: "[+] SHA-512 Key Cracked (148.2 MH/s) -> root_token_unlocked [OK]",
      status: "ok",
      tag: "CRYPTO",
    },
    {
      id: 4,
      prefix: "root@kali:~#",
      command: "sudo -S -u root /bin/sh -i && whoami && id",
      output: "[!] uid=0(root) gid=0(root) groups=0(root) context=system_u:system_r:init_t:s0",
      status: "ok",
      tag: "ROOT_PWN",
    },
    {
      id: 5,
      prefix: "root@kali:~#",
      command: "./deploy_workspace.elf --operator='Ahmed_Mohammed' --clearance=MAX",
      output: "[+] IDENTITY CONFIRMED: Ahmed Mohammed [Senior Full-Stack & CyberSec Architect]",
      status: "ok",
      tag: "UNLOCKED",
    },
  ];

  // Mr. Robot style memory inspection hex dump
  const hexDump = [
    { addr: "0x7fff00", hex: "41 68 6d 65 64 20 4d 6f", ascii: "Ahmed Mo" },
    { addr: "0x7fff08", hex: "68 61 6d 6d 65 64 20 53", ascii: "hammed S" },
    { addr: "0x7fff10", hex: "65 6e 69 6f 72 20 46 75", ascii: "enior Fu" },
    { addr: "0x7fff18", hex: "6c 6c 2d 53 74 61 63 6b", ascii: "ll-Stack" },
    { addr: "0x7fff20", hex: "20 26 20 43 79 62 65 72", ascii: " & Cyber" },
    { addr: "0x7fff28", hex: "53 65 63 75 72 69 74 79", ascii: "Security" },
    { addr: "0x7fff30", hex: "20 41 72 63 68 69 74 65", ascii: " Archite" },
    { addr: "0x7fff38", hex: "63 74 20 5b 36 30 46 50", ascii: "ct [60FP" },
    { addr: "0x7fff40", hex: "53 20 4c 4f 43 4b 45 44", ascii: "S LOCKED" },
    { addr: "0x7fff48", hex: "5d 0a 00 00 00 00 00 00", ascii: "]......." },
  ];

  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    playCyberClick(1200, 0.05);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // Keyboard shortcut: Escape or Enter to trigger unlock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFadingOut]);

  // Terminal & Exploit Execution Timeline
  useEffect(() => {
    playDeveloperTerminalBoot();

    const startTime = performance.now();
    const duration = 2400; // 2.4s terminal execution

    let animationFrameId: number;
    let step = 0;

    const updateTimeline = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      // Keystroke sound and progressive script revelation
      if (pct >= 18 && step === 0) {
        setVisibleLines([scriptLines[0]]);
        setActiveCodeLine(2);
        playHackerKeystroke();
        setMetrics((m) => ({ ...m, cpu: 54, packets: "28,450/s" }));
        step = 1;
      } else if (pct >= 38 && step === 1) {
        setVisibleLines([scriptLines[0], scriptLines[1]]);
        setActiveCodeLine(4);
        playHackerKeystroke();
        setMetrics((m) => ({ ...m, cpu: 82, ram: "22.4 MB" }));
        step = 2;
      } else if (pct >= 58 && step === 2) {
        setVisibleLines([scriptLines[0], scriptLines[1], scriptLines[2]]);
        setActiveCodeLine(6);
        playHackerKeystroke();
        setMetrics((m) => ({ ...m, cpu: 96, packets: "52,900/s" }));
        step = 3;
      } else if (pct >= 78 && step === 3) {
        setVisibleLines([scriptLines[0], scriptLines[1], scriptLines[2], scriptLines[3]]);
        setActiveCodeLine(8);
        playHackerKeystroke();
        setMetrics((m) => ({ ...m, cpu: 88, latency: "0.14ms" }));
        step = 4;
      } else if (pct >= 94 && step === 4) {
        setVisibleLines(scriptLines);
        setActiveCodeLine(hexDump.length);
        setIsAccessGranted(true);
        playAccessGrantedSound();
        setMetrics((m) => ({ ...m, cpu: 14, latency: "0.12ms" }));
        step = 5;
      }

      if (pct < 100) {
        animationFrameId = requestAnimationFrame(updateTimeline);
      } else {
        // Do NOT automatically transition!
        // We halt and wait for the user to click the UNLOCK button explicitly.
        setIsAccessGranted(true);
      }
    };

    animationFrameId = requestAnimationFrame(updateTimeline);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Matrix Rain & Cyber Glitch Canvas (Canvas 2D - Hardware Accelerated, 0kb assets, locked 60fps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Characters: Katakana, Binary, Hex, and Programming Operators
    const chars = "01ABCDEF0123456789X#_/*{}:;<>[]~=!+".split("");
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    // Initialize drop positions across columns (stride by 2 on mobile to save GPU)
    const stride = width < 768 ? 2 : 1;
    for (let i = 0; i < columns; i += stride) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    let animId: number;

    const render = () => {
      // Semi-transparent fade for classic phosphorescent phosphor decay
      ctx.fillStyle = "rgba(3, 4, 10, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < columns; i += stride) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Front character is glowing white/cyan, tail is electric green/cyan
        if (Math.random() > 0.88) {
          ctx.fillStyle = "#ffffff";
        } else if (Math.random() > 0.5) {
          ctx.fillStyle = "#00f0ff";
        } else {
          ctx.fillStyle = "#10b981";
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#020308] text-zinc-100 overflow-hidden select-none transition-all duration-500 ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 1. Matrix Code Rain Canvas (Hardware Accelerated Canvas 2D) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />

      {/* Cyber Grid & CRT Scanlines Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.09)_0%,rgba(2,3,8,0.96)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_3px] pointer-events-none z-10 opacity-75" />

      {/* 2. Top Cyber Bar: Root Shell Status & Instant Skip Button */}
      <div className="absolute top-2.5 sm:top-5 inset-x-3 sm:inset-x-8 flex items-center justify-between text-xs font-mono z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/80 border border-emerald-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold tracking-wider text-[11px] sm:text-xs">KALI_ROOT // SEC-0</span>
            <span className="text-zinc-500 hidden sm:inline">| POSIX x86_64</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-[11px] text-cyan-300 font-semibold">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>EXPLOIT_PAYLOAD // RUNNING</span>
          </div>
        </div>

        {/* Instant Skip Button */}
        <button
          onClick={handleFinish}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-black/80 hover:bg-emerald-950/60 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white transition-all text-[11px] sm:text-xs font-bold cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          title="Skip to Portfolio (Space / Esc)"
        >
          <span>{lang === "ar" ? "تخطي للرئيسية [Space]" : "Skip to Root [Space]"}</span>
          <FastForward className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* 3. Main Hacker Command Center Console */}
      <div className="relative z-20 w-full max-w-5xl px-2.5 sm:px-6 mx-auto flex flex-col items-center justify-center my-auto">
        {/* Main Double-Pane Cyber Terminal Window */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#030611]/95 border border-emerald-500/40 shadow-[0_0_70px_rgba(16,185,129,0.25)] backdrop-blur-2xl overflow-hidden transition-all duration-300">
          {/* Terminal Window Title Bar */}
          <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-emerald-500/20 bg-emerald-950/30">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90 inline-block shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/90 inline-block shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90 inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              <span className="ml-1 sm:ml-2 font-mono text-[11px] sm:text-xs text-zinc-300 flex items-center gap-1.5 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline text-zinc-400">kali-terminal:</span>
                <span className="text-emerald-400 font-bold">root@tashtash:~#</span>
              </span>
            </div>

            {/* Live Telemetry Pills */}
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-zinc-400">
              <span className="hidden sm:flex items-center gap-1 text-emerald-400 font-semibold">
                <Activity className="w-3 h-3" />
                <span>{metrics.latency}</span>
              </span>
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <Cpu className="w-3 h-3" />
                <span>CPU: {metrics.cpu}%</span>
              </span>
            </div>
          </div>

          {/* Dual-Pane Grid: Left = Hacker Shell, Right = Live Code Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px] sm:min-h-[260px] divide-y lg:divide-y-0 lg:divide-x divide-emerald-500/20">
            {/* Left Pane: Interactive Hacker Shell (7 cols on desktop) */}
            <div className="lg:col-span-7 p-3 sm:p-5 font-mono text-[11px] sm:text-[13px] space-y-2.5 sm:space-y-3 flex flex-col justify-end bg-black/50">
              {/* Mini Hacker ASCII Banner */}
              <div className="text-[10px] sm:text-[11px] leading-tight text-emerald-400/80 pb-1 font-mono border-b border-emerald-500/20">
                <p className="text-emerald-300 font-bold flex items-center gap-1.5">
                  <span className="text-cyan-400">[*]</span> KALI-LINUX SEC-NODE // AHMED MOHAMMED
                </p>
                <p className="text-zinc-500 text-[10px]">TARGET: PORTFOLIO_CORE // CLEARANCE: LEVEL_0</p>
              </div>

              {visibleLines.map((line) => (
                <div
                  key={line.id}
                  className="space-y-0.5 sm:space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 text-cyan-300">
                    <span className="text-emerald-400 font-bold shrink-0">{line.prefix}</span>
                    <span className="text-zinc-100 font-medium break-all">{line.command}</span>
                  </div>
                  {line.output && (
                    <div className="pl-3 sm:pl-4 text-[10px] sm:text-xs text-emerald-300/90 font-mono flex items-center gap-1.5 sm:gap-2">
                      <span className="text-cyan-300 text-[9px] sm:text-[10px] bg-cyan-950/80 px-1 py-0.5 rounded border border-cyan-500/40 shrink-0 font-bold">
                        {line.tag}
                      </span>
                      <span className="truncate">{line.output}</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Active Terminal Input Prompt */}
              <div className="flex items-center gap-1.5 sm:gap-2 pt-1 text-xs sm:text-sm">
                <span className="text-emerald-400 font-bold shrink-0">root@tashtash:~#</span>
                <span className="text-cyan-300 font-medium truncate">
                  {progress < 100 ? "injecting zero-trust bypass payload..." : "./access_granted --launch"}
                </span>
                <span className="w-2 h-3.5 sm:h-4 bg-emerald-400 animate-pulse inline-block shadow-[0_0_8px_#10b981]" />
              </div>
            </div>

            {/* Right Pane: Mr. Robot Live Memory Dump & Register Inspector */}
            <div className="lg:col-span-5 p-3 sm:p-4 bg-[#02050e] font-mono text-[10px] sm:text-xs text-zinc-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-emerald-500/20 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>mem_dump.raw [x86_64]</span>
                  </div>
                  <span className="text-emerald-400 font-bold">GDB // ASLR_BYPASS</span>
                </div>
                <div className="space-y-1 overflow-hidden leading-relaxed font-mono">
                  <div className="text-[9px] text-zinc-500 pb-0.5 border-b border-white/5 flex justify-between select-none">
                    <span>OFFSET</span>
                    <span>HEX VALUES</span>
                    <span>ASCII</span>
                  </div>
                  {hexDump.slice(0, Math.max(activeCodeLine, 4)).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[9px] sm:text-[10px] py-0.5 animate-in fade-in duration-150"
                    >
                      <span className="text-zinc-500 select-none">{item.addr}</span>
                      <span className="text-cyan-300 font-mono tracking-wider">{item.hex}</span>
                      <span className="text-emerald-300 font-bold bg-emerald-950/40 px-1 rounded border border-emerald-500/20">
                        {item.ascii}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Ticker & Register Flags */}
              <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[9px] sm:text-[10px] text-zinc-400 font-mono">
                <span className="text-zinc-500">RIP: 0x7ffd5a20 | EFLAGS: [CF PF IF]</span>
                <span className="text-emerald-400 font-bold">CLEARANCE: 100%</span>
              </div>
            </div>
          </div>

          {/* Compilation Progress Bar & Telemetry Specs */}
          <div className="p-3 sm:p-4 border-t border-emerald-500/20 bg-black/70 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
              <span className="text-zinc-200 font-bold flex items-center gap-1.5 sm:gap-2">
                <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />
                <span className="truncate">
                  {progress < 100
                    ? "Executing Cyber Penetration & Root Elevation..."
                    : "Zero-Day Exploitation Complete. Root Privileges Unlocked."}
                </span>
              </span>
              <span className="text-emerald-300 font-black text-xs sm:text-sm tracking-widest">{progress}%</span>
            </div>

            {/* Glowing Neon Cyber Progress Bar */}
            <div className="w-full h-2 sm:h-2.5 rounded-full bg-white/10 overflow-hidden relative p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 rounded-full transition-all duration-100 shadow-[0_0_16px_rgba(16,185,129,0.9)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Hardware & Security Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-0.5 text-[10px] sm:text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 truncate">
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                <span>Threads: 16 Core</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <HardDrive className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                <span>Memory: {metrics.ram}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Network className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                <span>Rate: {metrics.packets}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 truncate font-bold">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>PenTest: 0 Vuln</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Bottom Keyboard Guidance */}
        <p className="mt-3 text-[10px] sm:text-[11px] font-mono text-zinc-500 text-center flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>Press [Space] or [Enter] at any time to unlock</span>
        </p>
      </div>

      {/* 4. EPIC UNLOCK MODAL: 100% English, Perfectly Centered & Responsive, Awaiting Explicit Unlock */}
      {isAccessGranted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 overflow-y-auto">
          <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#030612]/95 border-2 border-emerald-400 shadow-[0_0_80px_rgba(16,185,129,0.85)] text-center space-y-4 sm:space-y-5 overflow-hidden my-auto">
            {/* Ambient Cyber Aura Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Unlocked Padlock Icon */}
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-950/80 border border-emerald-400/80 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.7)] animate-bounce">
              <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>

            {/* Main Title Banner - 100% English */}
            <div className="space-y-1.5">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                [ ACCESS GRANTED // ZERO-TRUST CLEARANCE: ROOT_0 ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
                SYSTEM UNLOCKED
              </h2>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-mono text-emerald-300 font-bold tracking-wide">
                  OPERATOR VERIFIED: AHMED MOHAMMED
                </p>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">
                  SENIOR FULL-STACK & CYBERSECURITY ARCHITECT
                </p>
              </div>
            </div>

            {/* Security Audit Verification Matrix */}
            <div className="grid grid-cols-2 gap-2 text-left sm:text-center text-[10px] sm:text-xs font-mono py-2.5 px-3.5 rounded-xl bg-black/60 border border-emerald-500/30 text-zinc-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Zero-Trust: OK</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>ASLR/DEP: Enforced</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>FPS: Locked 60</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>UID=0 Clearance</span>
              </div>
            </div>

            {/* Explicit UNLOCK Button - User clicks to transition */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleFinish}
                className="w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:brightness-110 active:scale-[0.98] text-black font-mono font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_40px_rgba(16,185,129,0.85)] cursor-pointer transition-all flex items-center justify-center gap-2.5 group"
              >
                <Unlock className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:scale-110 transition-transform" />
                <span>[ UNLOCK & ENTER WORKSPACE ]</span>
                <FastForward className="w-4 h-4 fill-black" />
              </button>
              <p className="text-[10px] font-mono text-zinc-500">
                CLICK UNLOCK OR PRESS [ENTER] TO ACCESS PORTFOLIO
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
