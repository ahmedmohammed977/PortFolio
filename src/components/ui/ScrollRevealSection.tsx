"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  initialVisible?: boolean;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = "",
  initialVisible = false,
  threshold = 0.05,
  rootMargin = "0px 0px -60px 0px",
  id,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // While in viewport: visible. When scrolled away: hides smoothly.
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity,filter] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto"
          : "opacity-0 translate-y-12 scale-[0.98] blur-[2px] pointer-events-none"
      } ${className}`}
    >
      {children}
    </div>
  );
};
