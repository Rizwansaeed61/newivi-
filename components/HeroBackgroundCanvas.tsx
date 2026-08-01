/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface HeroBgConfig {
  type: string;
  speed: number;
  density: number;
  color: string;
  particleSize: number;
  interactive: boolean;
  imageUrl?: string;
  videoUrl?: string;
  opacity?: number;
}

export const DEFAULT_HERO_BG_CONFIG: HeroBgConfig = {
  type: 'cyber-grid',
  speed: 1,
  density: 40,
  color: '#E59500',
  particleSize: 2,
  interactive: true,
  imageUrl: '',
  videoUrl: '',
  opacity: 40,
};

export function HeroBackgroundCanvas({ config }: { config?: HeroBgConfig }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const isMedia = (config?.type === 'image' && !!config.imageUrl) || (config?.type === 'video' && !!config.videoUrl);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMedia) {
      timeoutId = setTimeout(() => {
        setShowSpinner(true);
      }, 1000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMedia, config?.imageUrl, config?.videoUrl]);

  const handleMediaLoad = () => {
    setMediaLoaded(true);
    setShowSpinner(false);
  };

  useEffect(() => {
    if (config?.type === 'image' || config?.type === 'video') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle & Nebula data
    const isNebulaMode = config?.type === 'nebula' || config?.type === 'nebula-ai';
    const count = config?.density || (isNebulaMode ? 70 : 40);
    const speedMult = config?.speed || 1;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedMult * (isNebulaMode ? 0.4 : 1),
        vy: (Math.random() - 0.5) * speedMult * (isNebulaMode ? 0.4 : 1),
        size: Math.random() * (config?.particleSize || 2) + (isNebulaMode ? 0.8 : 1),
        alpha: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008 * speedMult;
      ctx.clearRect(0, 0, width, height);

      if (isNebulaMode) {
        // Deep cosmic space background gradient
        const bgGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          10,
          width * 0.5,
          height * 0.5,
          Math.max(width, height)
        );
        bgGrad.addColorStop(0, '#1C1309');
        bgGrad.addColorStop(0.5, '#120D1A');
        bgGrad.addColorStop(1, '#09070B');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Render multi-layered glowing nebula clouds
        const nebulae = [
          { cx: width * (0.35 + Math.sin(time * 0.5) * 0.08), cy: height * (0.4 + Math.cos(time * 0.3) * 0.08), r: Math.min(width, height) * 0.45, colorStart: 'rgba(229, 149, 0, 0.28)', colorEnd: 'rgba(229, 149, 0, 0)' },
          { cx: width * (0.68 + Math.cos(time * 0.4) * 0.08), cy: height * (0.55 + Math.sin(time * 0.6) * 0.08), r: Math.min(width, height) * 0.5, colorStart: 'rgba(139, 92, 246, 0.22)', colorEnd: 'rgba(139, 92, 246, 0)' },
          { cx: width * (0.5 + Math.sin(time * 0.3) * 0.1), cy: height * (0.25 + Math.cos(time * 0.5) * 0.06), r: Math.min(width, height) * 0.38, colorStart: 'rgba(245, 158, 11, 0.2)', colorEnd: 'rgba(245, 158, 11, 0)' },
          { cx: width * (0.2 + Math.cos(time * 0.6) * 0.05), cy: height * (0.75 + Math.sin(time * 0.4) * 0.07), r: Math.min(width, height) * 0.4, colorStart: 'rgba(159, 18, 57, 0.18)', colorEnd: 'rgba(159, 18, 57, 0)' },
        ];

        nebulae.forEach(n => {
          const grad = ctx.createRadialGradient(n.cx, n.cy, 0, n.cx, n.cy, n.r);
          grad.addColorStop(0, n.colorStart);
          grad.addColorStop(1, n.colorEnd);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(n.cx, n.cy, n.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Cosmic dust & twinkling star particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.02;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const currentAlpha = Math.max(0.1, Math.min(1, Math.sin(p.pulse) * 0.4 + p.alpha));
          ctx.fillStyle = `rgba(254, 243, 199, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

      } else {
        // Standard Cyber Grid Particles
        ctx.fillStyle = config?.color || '#E59500';

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  const mediaOpacity = (config?.opacity !== undefined ? config.opacity : 40) / 100;

  return (
    <>
      {!mediaLoaded && showSpinner && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#15120E]">
          <div className="w-8 h-8 border-2 border-[#E59500] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {config?.type === 'video' && config.videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleMediaLoad}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${!mediaLoaded ? 'opacity-0' : ''}`}
          style={{ opacity: !mediaLoaded ? 0 : mediaOpacity }}
          src={config.videoUrl}
        />
      )}
      {config?.type === 'image' && config.imageUrl && (
        <img
          src={config.imageUrl}
          alt="Hero Background"
          onLoad={handleMediaLoad}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${!mediaLoaded ? 'opacity-0' : ''}`}
          style={{ opacity: !mediaLoaded ? 0 : mediaOpacity }}
        />
      )}
      {config?.type !== 'image' && config?.type !== 'video' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: mediaOpacity }}
        />
      )}
    </>
  );
}

