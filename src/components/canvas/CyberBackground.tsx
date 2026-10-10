"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const CyberBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 80;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      // --- 1. Starfield / Neural Particles ---
      const particleCount = 1200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color("#00f0ff"); // Cyber Cyan
      const color2 = new THREE.Color("#7000ff"); // Electric Purple
      const color3 = new THREE.Color("#3b82f6"); // Neon Blue

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

      // Circular particle texture creation
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.3, "rgba(255,255,255,0.7)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      const particleMaterial = new THREE.PointsMaterial({
        size: 1.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      // --- 2. Floating Cyber Geometric Core (Icosahedron + Wireframe) ---
      const coreGroup = new THREE.Group();

      const icosaGeo = new THREE.IcosahedronGeometry(18, 1);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const wireframeMesh = new THREE.Mesh(icosaGeo, wireframeMat);
      coreGroup.add(wireframeMesh);

      // Inner Torus Ring
      const torusGeo = new THREE.TorusGeometry(12, 0.4, 16, 100);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      torusMesh.rotation.x = Math.PI / 4;
      coreGroup.add(torusMesh);

      // Second inclined ring
      const torusGeo2 = new THREE.TorusGeometry(15, 0.3, 16, 100);
      const torusMat2 = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
      torusMesh2.rotation.y = Math.PI / 3;
      coreGroup.add(torusMesh2);

      coreGroup.position.set(30, 5, -20);
      scene.add(coreGroup);

      // Mouse tracking with smooth lerp
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse lerp
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        // Rotate particles gently
        particles.rotation.y = elapsedTime * 0.04 + targetX * 0.15;
        particles.rotation.x = targetY * 0.1;

        // Animate floating core
        coreGroup.rotation.x = elapsedTime * 0.15 + targetY * 0.3;
        coreGroup.rotation.y = elapsedTime * 0.2 + targetX * 0.4;
        coreGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.2;

        torusMesh.rotation.z = elapsedTime * 0.3;
        torusMesh2.rotation.x = -elapsedTime * 0.25;

        // Subtle floating movement
        coreGroup.position.y = 5 + Math.sin(elapsedTime * 0.8) * 3;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);

        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        particleMaterial.dispose();
        particleTexture.dispose();
        icosaGeo.dispose();
        wireframeMat.dispose();
        torusGeo.dispose();
        torusMat.dispose();
        torusGeo2.dispose();
        torusMat2.dispose();
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
