"use client";

import React, { useEffect, useRef } from "react";

/**
 * CustomCursor
 * Displays Ahmed's iconic Logo crest as the mouse cursor inside the page.
 * Uses direct DOM manipulation & RAF lerp for silky-smooth 120fps rendering with 0 React re-renders.
 * When the mouse exits the browser window/document, native cursor is restored.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const isVisibleRef = useRef(false);
  const isPointerRef = useRef(false);
  const isClickedRef = useRef(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (typeof window === "undefined") return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursorEl.style.opacity = "1";
        document.documentElement.classList.add("custom-cursor-active");
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, select, textarea, [role='button'], .cursor-pointer"
        );
        const shouldBePointer = !!interactive;
        if (shouldBePointer !== isPointerRef.current) {
          isPointerRef.current = shouldBePointer;
          if (shouldBePointer) {
            cursorEl.classList.add("cursor-hover-interactive");
          } else {
            cursorEl.classList.remove("cursor-hover-interactive");
          }
        }
      }
    };

    const onMouseDown = () => {
      isClickedRef.current = true;
      cursorEl.classList.add("cursor-clicked");
    };

    const onMouseUp = () => {
      isClickedRef.current = false;
      cursorEl.classList.remove("cursor-clicked");
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      cursorEl.style.opacity = "1";
      document.documentElement.classList.add("custom-cursor-active");
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      cursorEl.style.opacity = "0";
      document.documentElement.classList.remove("custom-cursor-active");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // Smooth lerp RAF loop with zero React state overhead
    const animate = () => {
      const ease = 0.32;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      cursorEl.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[999999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-150 will-change-transform"
      style={{
        transform: "translate3d(-200px, -200px, 0)",
      }}
    >
      {/* Outer Monogram Emblem & Glow */}
      <div className="relative flex items-center justify-center transition-transform duration-200 cursor-inner-container">
        {/* Glow */}
        <div className="absolute inset-0 -m-1.5 rounded-full bg-cyan-400/30 blur-md animate-pulse" />

        {/* Ahmed's Signature Shield Monogram (Matching Logo.tsx) */}
        <div className="relative w-7 h-7 rounded-lg bg-[#070b12]/95 border border-cyan-400/90 shadow-[0_0_15px_rgba(0,240,255,0.7)] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
            <defs>
              <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* The A Apex */}
            <path
              d="M18 4L6 28H11L14 21H22L25 28H30L18 4ZM15.5 17L18 10.5L20.5 17H15.5Z"
              fill="url(#cursorGrad)"
            />
            {/* The TT Slash Energy Core */}
            <path
              d="M13 14H23M18 14V26"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Precision Targeting Crosshair Dot */}
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-black bg-cyan-400 shadow-[0_0_8px_#10b981] cursor-dot transition-colors" />
      </div>
    </div>
  );
};
