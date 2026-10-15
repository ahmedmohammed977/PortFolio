"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  playLaserBeamCharge,
  playLaserClashImpact,
  playWarpZoom,
  playCyberClick,
  playIntroCinematicSound,
  startIntroAmbientTrack,
  stopIntroAmbientTrack,
  toggleSound,
  isSoundEnabled,
} from "@/lib/sound";
import { FastForward, Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
  lang?: "en" | "ar";
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, lang = "en" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro Stages:
  // 1: Beams Rushing (Left & Right lines converging)
  // 2: Clash / Explosion & Shockwave
  // 3: 3D Logo (Above) & "Tash Tash" (Below) Revealed
  // 4: Stable interactive state ready for exploration
  const [phase, setPhase] = useState<number>(1);
  const [beamProgress, setBeamProgress] = useState<number>(0); // 0 to 1
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const isRtl = lang === "ar";
  const clashTriggeredRef = useRef<boolean>(false);

  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    stopIntroAmbientTrack(0.6);
    playWarpZoom();
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const state = toggleSound();
    setSoundOn(state);
  };

  // Keyboard navigation: Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFadingOut]);

  // Track mouse for 3D interactive parallax with 60fps GPU-accelerated direct transforms
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    mousePosRef.current = { x, y };

    if (logoRef.current) {
      logoRef.current.style.transform = `rotateX(${-y * 14}deg) rotateY(${x * 16}deg)`;
    }
    if (titleRef.current) {
      titleRef.current.style.transform = `perspective(600px) rotateX(${y * 5}deg) rotateY(${x * 7}deg)`;
    }
  };

  // Master Timeline Orchestration
  useEffect(() => {
    setSoundOn(isSoundEnabled());

    // Play captivating cinematic soundscape & continuous motivating ambient synth track
    playIntroCinematicSound();
    playLaserBeamCharge();
    startIntroAmbientTrack();

    // Fallback: in case browser autoplay policy holds audio until first gesture
    const unlockAudio = () => {
      playIntroCinematicSound();
      startIntroAmbientTrack();
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    const startTime = performance.now();
    const beamDuration = 1300; // 1.3s for lines to meet in center
    const totalDuration = 3800; // 3.8s total sequence

    let animId: number;

    const updateTimeline = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // 1. Calculate Beam Convergence Progress (0 to 1 with smooth acceleration)
      const rawBeam = Math.min(elapsed / beamDuration, 1);
      // Ease-in-out quintic for dramatic acceleration into collision
      const easedBeam =
        rawBeam < 0.5
          ? 16 * Math.pow(rawBeam, 5)
          : 1 - Math.pow(-2 * rawBeam + 2, 5) / 2;

      setBeamProgress(easedBeam);

      // Overall Progress Percentage
      const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      // 2. Moment of Collision
      if (rawBeam >= 1 && !clashTriggeredRef.current) {
        clashTriggeredRef.current = true;
        setPhase(2);
        playLaserClashImpact();

        // Reveal the forged Brand (Logo + Tash Tash) right after collision flash
        setTimeout(() => {
          setPhase(3);
        }, 250);
      }

      if (pct >= 85 && phase < 4) {
        setPhase(4);
      }

      if (pct < 100) {
        animId = requestAnimationFrame(updateTimeline);
      }
      // Note: NO autoExit - intro stays open until user clicks "ENTER EXPERIENCE" or presses Enter
    };

    animId = requestAnimationFrame(updateTimeline);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // Three.js 3D Cinematic Hyperspace, Energy Rings, and Collision Sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let animId: number;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
      camera.position.z = 90;

      const isLowPower =
        (typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 4) <= 4) ||
        width < 768;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isLowPower,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPower ? 1 : 1.5));

      // 1. Hyperspace Warp Stars (Scales dynamically for low-end / high-end hardware)
      const starCount = isLowPower ? 350 : 700;
      const starGeo = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starVelocities = new Float32Array(starCount);
      const starColors = new Float32Array(starCount * 3);

      const colorCyan = new THREE.Color("#00f0ff");
      const colorEmerald = new THREE.Color("#10b981");
      const colorTeal = new THREE.Color("#14b8a6");
      const colorWhite = new THREE.Color("#ffffff");

      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 360;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 360;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 420;
        starVelocities[i] = 0.9 + Math.random() * 2.5;

        const col =
          i % 4 === 0
            ? colorCyan
            : i % 4 === 1
            ? colorEmerald
            : i % 4 === 2
            ? colorTeal
            : colorWhite;
        starColors[i * 3] = col.r;
        starColors[i * 3 + 1] = col.g;
        starColors[i * 3 + 2] = col.b;
      }

      starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

      // Glow Point Texture
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 16;
      pCanvas.height = 16;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.35, "rgba(0,240,255,0.85)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 16, 16);
      }
      const pTex = new THREE.CanvasTexture(pCanvas);

      const starMat = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        map: pTex,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // 2. 3D Orbital Rings (Emerge after collision to frame Logo & Tash Tash)
      const ringGroup = new THREE.Group();

      const ring1Geo = new THREE.TorusGeometry(30, 0.3, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: "#00f0ff",
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ringGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(36, 0.35, 16, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: "#ec4899",
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 3;
      ringGroup.add(ring2);

      const ring3Geo = new THREE.TorusGeometry(24, 0.25, 16, 100);
      const ring3Mat = new THREE.MeshBasicMaterial({
        color: "#a855f7",
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
      ring3.rotation.y = Math.PI / 3;
      ringGroup.add(ring3);

      scene.add(ringGroup);

      // 3. Central 3D Holographic Diamond Core
      const coreGeo = new THREE.OctahedronGeometry(13, 0);
      const coreMat = new THREE.MeshBasicMaterial({
        color: "#00f0ff",
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      scene.add(coreMesh);

      // Animation Loop
      const clock = new THREE.Clock();

      const render = () => {
        const time = clock.getElapsedTime();

        // Warp speed stars forward
        const pos = starGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < starCount; i++) {
          pos[i * 3 + 2] += starVelocities[i] * 1.6;
          if (pos[i * 3 + 2] > 90) {
            pos[i * 3 + 2] = -320;
            pos[i * 3] = (Math.random() - 0.5) * 360;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 360;
          }
        }
        starGeo.attributes.position.needsUpdate = true;

        // Animate Rings
        ring1.rotation.z += 0.01;
        ring1.rotation.x += 0.005;
        ring2.rotation.y -= 0.012;
        ring2.rotation.z += 0.007;
        ring3.rotation.x -= 0.008;
        ring3.rotation.z -= 0.01;

        // Animate Core
        coreMesh.rotation.x = time * 0.4;
        coreMesh.rotation.y = time * 0.5;

        // Interactive camera tilt responding smoothly to mouse position
        camera.position.x += (mousePosRef.current.x * 10 - camera.position.x) * 0.05;
        camera.position.y += (-mousePosRef.current.y * 10 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer?.render(scene, camera);
        animId = requestAnimationFrame(render);
      };

      render();

      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        renderer?.dispose();
        starGeo.dispose();
        starMat.dispose();
        ring1Geo.dispose();
        ring1Mat.dispose();
        ring2Geo.dispose();
        ring2Mat.dispose();
        ring3Geo.dispose();
        ring3Mat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
      };
    } catch {
      // Fallback gracefully if WebGL is unsupported
    }
  }, []);

  // Calculate coordinates for the two converging kinetic lines
  // Left beam originates from -20% screen width to 50% (center)
  const leftBeamX = beamProgress * 50; // 0% to 50%
  // Right beam originates from 120% screen width to 50% (center)
  const rightBeamX = 100 - beamProgress * 50; // 100% down to 50%

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03040a] text-white overflow-hidden select-none transition-all duration-700 ${
        isFadingOut ? "opacity-0 scale-110 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* 3D WebGL Hyperspace & Orbit Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Cyber Grid & Atmospheric Neon Fog Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12)_0%,rgba(168,85,247,0.08)_45%,rgba(3,4,10,0.94)_85%)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-10" />

      {/* Ambient Horizon Beam & Central Glow */}
      <div className="absolute top-1/2 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-10 blur-[1px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full bg-cyan-500/15 blur-[130px] pointer-events-none z-10 animate-pulse" />

      {/* ========================================================================= */}
      {/* KINETIC DUAL LASER LINES: Left & Right Rushing into Center */}
      {/* ========================================================================= */}
      {beamProgress < 1 && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* 1. LEFT LASER LINE (Neon Cyan Core + High-Speed Trail) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[3px] sm:h-[4px] bg-cyan-300 rounded-full shadow-[0_0_20px_#00f0ff,0_0_45px_#00f0ff,0_0_90px_rgba(0,240,255,0.8)] transition-none"
            style={{
              left: 0,
              width: `${Math.max(leftBeamX, 0)}%`,
            }}
          >
            {/* The Leading Laser Head Point */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white shadow-[0_0_25px_#ffffff,0_0_50px_#00f0ff] animate-pulse" />
            {/* Trailing Energy Flare */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-cyan-200" />
          </div>

          {/* 2. RIGHT LASER LINE (Neon Emerald Core + High-Speed Trail) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[3px] sm:h-[4px] bg-emerald-400 rounded-full shadow-[0_0_20px_#10b981,0_0_45px_#00f0ff,0_0_90px_rgba(16,185,129,0.8)] transition-none"
            style={{
              right: 0,
              width: `${Math.max(100 - rightBeamX, 0)}%`,
            }}
          >
            {/* The Leading Laser Head Point */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white shadow-[0_0_25px_#ffffff,0_0_50px_#10b981] animate-pulse" />
            {/* Trailing Energy Flare */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-500/40 to-teal-300" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* COLLISION SHOCKWAVE & FLASH BURST: Triggered dead at center (x: 50%, y: 50%) */}
      {/* ========================================================================= */}
      {phase >= 2 && phase < 4 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
          {/* Intense Flash Core */}
          <div className="w-16 h-16 rounded-full bg-white blur-md animate-ping opacity-75" />
          {/* Expanding Shockwave Ring 1 (Cyan) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-cyan-400 shadow-[0_0_40px_#00f0ff] animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_forwards] opacity-80" />
          {/* Expanding Shockwave Ring 2 (Emerald) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-emerald-400 shadow-[0_0_50px_#10b981] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_forwards] opacity-60" />
          {/* Diagonal Laser Cross-Flares */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45 blur-[0.5px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-45 blur-[0.5px] animate-pulse" />
        </div>
      )}

      {/* Top Bar: Controls */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between text-xs font-mono z-30">
        {/* Moniker Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold tracking-widest text-[11px] sm:text-xs uppercase">
            TASH TASH // 3D KINETIC
          </span>
        </div>

        {/* Audio Toggle & Skip Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSoundToggle}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/20 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
            title={soundOn ? "Mute Audio" : "Unmute Audio"}
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            )}
            <span className="hidden sm:inline text-[11px] font-mono">
              {soundOn ? "SFX ON" : "MUTED"}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 hover:text-white transition-all text-[11px] sm:text-xs font-bold cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)] group backdrop-blur-md active:scale-95"
            title="Skip Intro [Space / Esc]"
          >
            <span>{isRtl ? "تخطي [Space]" : "Skip [Space]"}</span>
            <FastForward className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE FORGED CENTERPIECE: Logo Directly ABOVE, "Tash Tash" Directly BELOW   */}
      {/* With Balanced, Harmonious Proportions (Not Oversized)                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-2xl px-4 mx-auto space-y-4 sm:space-y-6">
        {/* 1. 3D HOLOGRAPHIC LOGO CREST (DIRECTLY ABOVE) */}
        <div
          className={`relative transition-all duration-700 ease-out transform ${
            phase >= 3
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-6 pointer-events-none"
          }`}
          style={{ perspective: "1000px" }}
        >
          {/* Subtle Outer Neon Aura - Senior Electric Tech */}
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-cyan-500/35 via-emerald-500/25 to-teal-500/20 blur-xl opacity-75 animate-pulse" />

          {/* Harmonious 3D Shield Enclosure: w-20 h-20 sm:w-24 sm:h-24 */}
          <div
            ref={logoRef}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#070916]/90 border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(0,240,255,0.55)] backdrop-blur-xl flex items-center justify-center p-2.5 overflow-hidden group hover:scale-105 transition-transform"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Animated Laser Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent -translate-y-full animate-[scan_2.2s_ease-in-out_infinite]" />

            {/* Glowing Corner Accents */}
            <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
            <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
            <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
            <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

            {/* High-Tech Monogram: Apex "A" with double T slash energy core */}
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_0_18px_rgba(0,240,255,0.9)]"
            >
              <defs>
                <linearGradient id="introCrestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <filter id="introGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* The "A" Apex */}
              <path
                d="M18 4L6 28H11L14 21H22L25 28H30L18 4ZM15.5 17L18 10.5L20.5 17H15.5Z"
                fill="url(#introCrestGrad)"
                filter="url(#introGlow)"
              />

              {/* Double "TT" Laser Core */}
              <path
                d="M13 14H23M18 14V26"
                stroke="#00f0ff"
                strokeWidth="2.6"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_#00f0ff]"
              />
            </svg>
          </div>
        </div>

        {/* 2. THE CONVERGED BRAND NAME: "Tash Tash" ONLY (DIRECTLY BELOW LOGO) */}
        <div
          className={`space-y-2 transition-all duration-700 delay-100 transform ${
            phase >= 3
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-6 pointer-events-none"
          }`}
        >
          {/* Harmonious 3D Typography: text-3xl sm:text-5xl md:text-6xl */}
          <h1
            ref={titleRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight sm:tracking-wider uppercase select-none whitespace-nowrap"
            style={{
              textShadow:
                "0 0 25px rgba(0,240,255,0.7), 0 0 50px rgba(16,185,129,0.4), 0 5px 25px rgba(0,0,0,0.9)",
            }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.75)]">
              TASH
            </span>
            <span className="inline-block w-3 sm:w-5" />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.75)]">
              TASH
            </span>
          </h1>

          {/* Elegant Micro-Accent Divider Line */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
          </div>
        </div>

        {/* 3. Progress Energy Indicator & Enter CTA Button */}
        <div className="pt-2 sm:pt-4 w-full max-w-xs mx-auto space-y-3">
          {/* Sleek Cyber Progress Bar */}
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(0,240,255,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Interactive "ENTER EXPERIENCE" Button */}
          <button
            onClick={handleFinish}
            className={`w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 active:scale-95 text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,240,255,0.6)] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 group animate-pulse ${
              phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            }`}
          >
            <span className="font-extrabold text-black tracking-widest">
              {isRtl ? "دخول التجربة" : "ENTER EXPERIENCE"}
            </span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
          </button>

          <p className="text-[10px] font-mono text-zinc-400 text-center tracking-wider">
            {isRtl
              ? "اضغط على [دخول التجربة] أو زر [Enter]"
              : "CLICK [ENTER EXPERIENCE] OR PRESS [ENTER]"}
          </p>
        </div>
      </div>

      {/* Atmospheric Footer Info */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 pointer-events-none z-20">
        <span className="text-cyan-400/70">TASH TASH KINETIC INTRO</span>
        <span className="text-zinc-600 hidden sm:inline">60 FPS // HARDWARE ACCELERATED</span>
        <span className="text-emerald-400/70">EST. 2024</span>
      </div>
    </div>
  );
};
