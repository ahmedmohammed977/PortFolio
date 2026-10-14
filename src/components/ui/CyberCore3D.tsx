"use client";

import React, { useRef, useState, useEffect } from "react";

export const CyberCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 18, y: 35 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animId: number;
    let baseAngle = 0;

    const autoSpin = () => {
      if (!isHovered) {
        baseAngle += 0.8;
        setRotate({
          x: Math.sin((baseAngle * Math.PI) / 180) * 15 + 15,
          y: (baseAngle % 360),
        });
      }
      animId = requestAnimationFrame(autoSpin);
    };

    animId = requestAnimationFrame(autoSpin);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y * 0.45,
      y: x * 0.45,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto my-2 flex items-center justify-center cursor-pointer select-none perspective-[800px] group"
      title="Interactive 3D Hardware-Accelerated Cyber Core"
    >
      {/* Outer Holographic Orbital Ring */}
      <div
        className="absolute inset-0 rounded-full border border-cyan-500/25 animate-spin [animation-duration:14s] pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* Counter-rotating Orbital Ring */}
      <div
        className="absolute inset-2 sm:inset-3 rounded-full border border-purple-500/25 animate-spin [animation-duration:9s] [animation-direction:reverse] pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
      </div>

      {/* 3D Wireframe Cyber Cube (Hardware-Accelerated CSS 3D) */}
      <div
        className="relative w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-75 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          willChange: "transform",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 border border-cyan-400/60 bg-cyan-500/10 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-center text-[10px] font-mono text-cyan-300 font-bold"
          style={{ transform: "translateZ(30px)" }}
        >
          <span>&lt;/&gt;</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 border border-purple-500/60 bg-purple-500/10 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(168,85,247,0.2)] flex items-center justify-center text-[10px] font-mono text-purple-300 font-bold"
          style={{ transform: "rotateY(180deg) translateZ(30px)" }}
        >
          <span>0x1</span>
        </div>

        {/* Right */}
        <div
          className="absolute inset-0 border border-emerald-400/60 bg-emerald-500/10 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(16,185,129,0.2)] flex items-center justify-center text-[10px] font-mono text-emerald-300 font-bold"
          style={{ transform: "rotateY(90deg) translateZ(30px)" }}
        >
          <span>SEC</span>
        </div>

        {/* Left */}
        <div
          className="absolute inset-0 border border-cyan-400/60 bg-cyan-500/10 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-center text-[10px] font-mono text-cyan-300 font-bold"
          style={{ transform: "rotateY(-90deg) translateZ(30px)" }}
        >
          <span>ROOT</span>
        </div>

        {/* Top */}
        <div
          className="absolute inset-0 border border-purple-400/60 bg-purple-500/10 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(192,132,252,0.2)] flex items-center justify-center text-[10px] font-mono text-purple-300 font-bold"
          style={{ transform: "rotateX(90deg) translateZ(30px)" }}
        >
          <span>API</span>
        </div>

        {/* Bottom */}
        <div
          className="absolute inset-0 border border-emerald-400/60 bg-emerald-500/10 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(16,185,129,0.2)] flex items-center justify-center text-[10px] font-mono text-emerald-300 font-bold"
          style={{ transform: "rotateX(-90deg) translateZ(30px)" }}
        >
          <span>60FPS</span>
        </div>

        {/* Glowing Central Quantum Node */}
        <div
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 blur-[2px] animate-pulse"
          style={{ transform: "translateZ(0px)" }}
        />
      </div>

      {/* Floating Under-Glow Reflection */}
      <div className="absolute -bottom-2 w-16 h-2 rounded-full bg-cyan-400/30 blur-md pointer-events-none" />
    </div>
  );
};
