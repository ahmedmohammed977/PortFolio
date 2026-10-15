"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const CyberBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const isMobile = window.innerWidth < 768;
    const isLowPower =
      isMobile ||
      (typeof navigator !== "undefined" &&
        (navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false));

    try {
      scene = new THREE.Scene();

      let width = window.innerWidth;
      let height = window.innerHeight;

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 80;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isLowPower, // Disable antialiasing on low-end devices for max fps
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      // Cap pixel ratio to 1.5 max on desktop, 1.0 on low-power to avoid GPU thermal throttling
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPower ? 1 : 1.5));
      containerRef.current.appendChild(renderer.domElement);

      // --- 1. Optimized Particles (Scale count down for low-power/mobile) ---
      const particleCount = isLowPower ? 180 : 650;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color("#00f0ff");
      const color2 = new THREE.Color("#7000ff");
      const color3 = new THREE.Color("#3b82f6");

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 160;

        const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Circular particle texture
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.4, "rgba(255,255,255,0.7)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      const particleMaterial = new THREE.PointsMaterial({
        size: isMobile ? 2.2 : 1.8,
        vertexColors: true,
        transparent: true,
        opacity: isMobile ? 0.6 : 0.75,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      // --- 2. Floating Cyber Geometric Core (Only add on desktop/tablets) ---
      let coreGroup: THREE.Group | null = null;
      let icosaGeo: THREE.IcosahedronGeometry | null = null;
      let wireframeMat: THREE.MeshBasicMaterial | null = null;
      let torusGeo: THREE.TorusGeometry | null = null;
      let torusMat: THREE.MeshBasicMaterial | null = null;
      let torusMesh: THREE.Mesh | null = null;

      if (!isMobile) {
        coreGroup = new THREE.Group();

        icosaGeo = new THREE.IcosahedronGeometry(18, 1);
        wireframeMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          wireframe: true,
          transparent: true,
          opacity: 0.18,
        });
        const wireframeMesh = new THREE.Mesh(icosaGeo, wireframeMat);
        coreGroup.add(wireframeMesh);

        torusGeo = new THREE.TorusGeometry(12, 0.4, 8, 48); // reduced segments from 100 to 48
        torusMat = new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        torusMesh = new THREE.Mesh(torusGeo, torusMat);
        torusMesh.rotation.x = Math.PI / 4;
        coreGroup.add(torusMesh);

        coreGroup.position.set(30, 5, -20);
        scene.add(coreGroup);
      }

      // Mouse tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height);
      };

      window.addEventListener("resize", handleResize, { passive: true });

      // Scroll throttling: pause or reduce WebGL work during high-speed finger scrolling on mobile
      let isScrolling = false;
      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 120);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Page visibility pause (don't burn GPU in background tab)
      let isDocumentHidden = false;
      const handleVisibilityChange = () => {
        isDocumentHidden = document.hidden;
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Animation Loop
      let clock = new THREE.Clock();
      let lastFrameTime = 0;
      const frameInterval = isMobile ? 1000 / 45 : 1000 / 60; // 45fps cap on mobile saves massive battery and avoids stutter

      const animate = (currentTime: number) => {
        animationFrameId = requestAnimationFrame(animate);

        if (isDocumentHidden) return;
        if (isMobile && isScrolling) return; // Skip paint during aggressive mobile flick scrolling

        const delta = currentTime - lastFrameTime;
        if (delta < frameInterval) return;
        lastFrameTime = currentTime - (delta % frameInterval);

        const elapsedTime = clock.getElapsedTime();

        if (!isMobile) {
          targetX += (mouseX - targetX) * 0.04;
          targetY += (mouseY - targetY) * 0.04;
        }

        particles.rotation.y = elapsedTime * 0.03 + targetX * 0.1;
        particles.rotation.x = targetY * 0.08;

        if (coreGroup && torusMesh) {
          coreGroup.rotation.x = elapsedTime * 0.15 + targetY * 0.2;
          coreGroup.rotation.y = elapsedTime * 0.2 + targetX * 0.3;
          torusMesh.rotation.z = elapsedTime * 0.25;
          coreGroup.position.y = 5 + Math.sin(elapsedTime * 0.8) * 3;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        if (!isMobile) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        clearTimeout(scrollTimeout);
        cancelAnimationFrame(animationFrameId);

        if (containerRef.current && renderer?.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer?.dispose();
        geometry.dispose();
        particleMaterial.dispose();
        particleTexture.dispose();
        icosaGeo?.dispose();
        wireframeMat?.dispose();
        torusGeo?.dispose();
        torusMat?.dispose();
      };
    } catch (e) {
      console.warn("WebGL initialization skipped:", e);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
