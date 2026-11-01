import React, { useEffect, useState, useRef } from 'react';

/**
 * Hyper-Realistic Aerospace Rocket Ascent Transition
 * 
 * Modeled after orbital launch vehicles (Starship / Falcon Heavy / NASA SLS):
 * - Elongated, slender aerospace aspect ratio (not chunky or toy-like)
 * - Photorealistic thermal protection carbon hexagonal tiles & brushed stainless steel
 * - Chiseled titanium hypersonic body flaps & grid fins
 * - Multi-engine cluster (Raptor/RS-25) with glowing internal engine throats
 * - Supersonic underexpanded plasma plume with 5 precision Mach diamonds
 * - Ascending launch vector: Bottom-Left to Top-Right (33° inclination like an orbital graph)
 * - Trailing incandescent ember sparks & cryogenic venting vapor
 * - Fully responsive: scales smoothly for both mobile and desktop screens!
 */
export default function RocketFlybyTransition({ isActive, targetLabel }) {
  const [animating, setAnimating] = useState(false);
  const [stage, setStage] = useState('idle');
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setAnimating(false);
      setStage('idle');
      return;
    }

    setAnimating(true);
    setStage('flying');

    const midpointTimer = setTimeout(() => {
      setStage('midpoint');
    }, 550);

    const completeTimer = setTimeout(() => {
      setAnimating(false);
      setStage('idle');
    }, 1350);

    return () => {
      clearTimeout(midpointTimer);
      clearTimeout(completeTimer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive]);

  // Particle physics for incandescent sparks & exhaust wake
  useEffect(() => {
    if (!animating || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const startTime = performance.now();
    const duration = 1250;

    const render = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1.0);

      const easeProgress = Math.pow(progress, 1.18);
      const startX = -240;
      const endX = canvas.width + 300;
      const startY = canvas.height + 140;
      const endY = -180;

      const rocketX = startX + easeProgress * (endX - startX);
      const rocketY = startY + easeProgress * (endY - startY);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trajectory angle: ~33 degrees up
      const exhaustAngle = Math.PI + Math.atan2(endY - startY, endX - startX);

      // Spawn high-velocity incandescent metal sparks
      if (progress < 0.95 && Math.random() < 0.92) {
        for (let i = 0; i < 5; i++) {
          const spread = (Math.random() - 0.5) * 0.35;
          const speed = 6 + Math.random() * 12;
          particles.push({
            x: rocketX + Math.cos(exhaustAngle) * 90 + (Math.random() - 0.5) * 16,
            y: rocketY + Math.sin(exhaustAngle) * 90 + (Math.random() - 0.5) * 16,
            vx: Math.cos(exhaustAngle + spread) * speed,
            vy: Math.sin(exhaustAngle + spread) * speed,
            size: 1.5 + Math.random() * 3.5,
            alpha: 1.0,
            color: Math.random() > 0.3 ? '#f59e0b' : '#38bdf8'
          });
        }
      }

      // Render sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.026;
        p.size *= 0.97;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animating]);

  if (!animating) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      
      {/* Background cinematic vignette during transit */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${stage === 'midpoint' ? 'opacity-35 bg-purple-950/25' : 'opacity-0'}`} />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Anamorphic Lens Flare Streak */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-1.5 pointer-events-none opacity-0 animate-diagonal-lens-flare"
        style={{
          transform: 'translate(-50%, -50%) rotate(-33deg)',
          background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.2) 20%, rgba(56,189,248,0.9) 50%, rgba(255,255,255,1) 52%, rgba(56,189,248,0.9) 54%, rgba(56,189,248,0.2) 80%, transparent 100%)',
          boxShadow: '0 0 45px rgba(56, 189, 248, 0.9), 0 0 90px rgba(168, 85, 247, 0.5)'
        }}
      />

      {/* Main Aerospace Vehicle Assembly (Bottom-Left to Top-Right ascending launch) */}
      <div className="absolute inset-0 flex items-center justify-center animate-rocket-diagonal-launch">
        
        <div className="relative inline-flex items-center -rotate-[33deg]">
          
          {/* ================= 1. SUPERSONIC EXHAUST PLUME WITH MACH DIAMONDS ================= */}
          <div className="relative flex items-center mr-[-4px]">
            {/* Diffuse outer vacuum expansion plume */}
            <div 
              className="w-[260px] sm:w-[420px] h-10 sm:h-14 -mr-8 sm:-mr-12 rounded-l-full opacity-85 blur-xs"
              style={{
                background: 'linear-gradient(270deg, rgba(56, 189, 248, 0.95) 0%, rgba(99, 102, 241, 0.8) 35%, rgba(249, 115, 22, 0.65) 65%, transparent 100%)',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.85), 0 0 100px rgba(99, 102, 241, 0.5)'
              }}
            />

            {/* Hyper-dense white-cyan supersonic core plume */}
            <div 
              className="w-32 sm:w-48 h-6 sm:h-8 -mr-4 sm:-mr-6 rounded-l-full bg-white relative z-10"
              style={{
                boxShadow: '0 0 25px #ffffff, 0 0 45px #38bdf8'
              }}
            >
              {/* 5 Precision Mach Shock Diamonds */}
              <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-4 sm:h-5 border-y-2 border-r-2 border-cyan-200 rotate-45 blur-xs animate-ping" />
              <div className="absolute left-10 sm:left-16 top-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-3.5 sm:h-4 border-y-2 border-r-2 border-cyan-200 rotate-45 blur-xs" />
              <div className="absolute left-18 sm:left-26 top-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-3 sm:h-3.5 border-y-2 border-r-2 border-cyan-300 rotate-45" />
              <div className="absolute left-24 sm:left-34 top-1/2 -translate-y-1/2 w-2 sm:w-2.5 h-2.5 sm:h-3 border-y-2 border-r-2 border-cyan-400 rotate-45" />
              <div className="absolute left-28 sm:left-40 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-2 sm:h-2.5 border-y-2 border-r-2 border-cyan-400 rotate-45" />
            </div>

            {/* Cryogenic fuel overflow venting flames */}
            <div className="absolute -top-3.5 right-6 w-14 sm:w-20 h-1 sm:h-1.5 rounded-l-full bg-amber-400 blur-xs -rotate-8" />
            <div className="absolute -bottom-3.5 right-6 w-14 sm:w-20 h-1 sm:h-1.5 rounded-l-full bg-amber-400 blur-xs rotate-8" />
          </div>

          {/* ================= 2. PHOTOREALISTIC ORBITAL ROCKET ================= */}
          <div className="relative z-20 flex items-center">
            
            {/* Transonic Mach Shockwave Condensation Cone */}
            <div 
              className="absolute -inset-x-8 sm:-inset-x-12 -inset-y-10 sm:-inset-y-14 rounded-full pointer-events-none opacity-40 animate-pulse border border-cyan-300/60"
              style={{
                background: 'radial-gradient(ellipse at 75% 50%, rgba(56, 189, 248, 0.25) 0%, transparent 68%)',
                transform: 'skewX(-28deg)'
              }}
            />

            {/* Photorealistic Aerospace Orbital Rocket SVG */}
            <svg 
              className="w-[310px] sm:w-[460px] h-[70px] sm:h-[100px] drop-shadow-2xl" 
              viewBox="0 0 520 110" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 0 25px rgba(56, 189, 248, 0.65))' }}
            >
              <defs>
                <linearGradient id="brushedSteel" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="25%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="75%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                <linearGradient id="tpsCarbon" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="30%" stopColor="#1e293b" />
                  <stop offset="70%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                <linearGradient id="nozzleMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="15%" stopColor="#f97316" />
                  <stop offset="45%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="interstageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Engine Cluster Nozzles */}
              <path d="M12 40 L38 46 L38 64 L12 70 Z" fill="url(#nozzleMetal)" stroke="#64748b" strokeWidth="1.2" />
              <path d="M16 28 L38 38 L38 48 L16 38 Z" fill="url(#nozzleMetal)" opacity="0.9" />
              <path d="M16 82 L38 72 L38 62 L16 72 Z" fill="url(#nozzleMetal)" opacity="0.9" />
              <circle cx="15" cy="55" r="5" fill="#ffffff" filter="drop-shadow(0 0 8px #f97316)" />

              {/* Hypersonic Titanium Body Flaps */}
              <path d="M42 45 L95 12 L145 12 L120 45 Z" fill="url(#tpsCarbon)" stroke="#38bdf8" strokeWidth="1" />
              <line x1="95" y1="18" x2="140" y2="18" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
              
              <path d="M42 65 L95 98 L145 98 L120 65 Z" fill="url(#tpsCarbon)" stroke="#38bdf8" strokeWidth="1" />
              <line x1="95" y1="92" x2="140" y2="92" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />

              {/* Main Elongated Fuselage */}
              <path 
                d="M38 43 L360 43 Q410 45 470 55 Q410 65 360 67 L38 67 Z" 
                fill="url(#brushedSteel)" 
                stroke="#0f172a" 
                strokeWidth="1.2"
              />

              {/* Windward Lower Half: Carbon TPS Thermal Heat Shield */}
              <path 
                d="M38 55 L360 55 Q410 57 470 55 Q410 65 360 67 L38 67 Z" 
                fill="url(#tpsCarbon)" 
                opacity="0.95"
              />

              {/* Interstage Rings */}
              <rect x="140" y="43" width="12" height="24" fill="url(#interstageGrad)" />
              <rect x="250" y="43" width="10" height="24" fill="url(#interstageGrad)" />
              <line x1="140" y1="43" x2="140" y2="67" stroke="#38bdf8" strokeWidth="1" />
              <line x1="250" y1="43" x2="250" y2="67" stroke="#38bdf8" strokeWidth="1" />

              {/* Forward Hypersonic Canards */}
              <path d="M360 43 L385 22 L410 22 L395 43 Z" fill="url(#tpsCarbon)" stroke="#38bdf8" strokeWidth="1" />
              <path d="M360 67 L385 88 L410 88 L395 67 Z" fill="url(#tpsCarbon)" stroke="#38bdf8" strokeWidth="1" />

              {/* Aerodynamic Nosecone */}
              <path 
                d="M360 43 Q420 46 480 55 Q420 64 360 67 Z" 
                fill="url(#tpsCarbon)" 
                stroke="#334155" 
                strokeWidth="1"
              />

              {/* Cockpit Strip */}
              <path 
                d="M375 51 Q392 52 405 55 Q392 58 375 59 Z" 
                fill="#38bdf8" 
                opacity="0.9"
                style={{ filter: 'drop-shadow(0 0 6px #38bdf8)' }}
              />

              {/* Meatball Stripe */}
              <path d="M190 44 L204 44 L204 66 L190 66 Z" fill="#ef4444" opacity="0.85" />
              <line x1="185" y1="55" x2="340" y2="55" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="6 3" />

              {/* Technical Stenciling */}
              <text x="212" y="52" fill="#0f172a" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                UNITED STATES • FORGOTTEN FRONTIER
              </text>
              <text x="212" y="63" fill="#64748b" fontSize="5.5" fontFamily="monospace">
                ORBITAL ASCENT STAGE • SERIAL: AGY-2026
              </text>

              {/* RCS Jets */}
              <circle cx="340" cy="41" r="2" fill="#f59e0b" />
              <circle cx="340" cy="69" r="2" fill="#f59e0b" />
            </svg>

            {/* Glowing Nosecone Leading Plasma Flare */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-cyan-300/60 blur-md pointer-events-none" />
          </div>

          {/* ================= 3. FLOATING HUD TELEMETRY ================= */}
          <div className="ml-3 sm:ml-4 hidden sm:flex flex-col">
            <div className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/80 backdrop-blur-md shadow-2xl flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[9px] sm:text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                {targetLabel || 'POWERED ASCENT: 33° INCLINATION'}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-amber-300 mt-1 pl-2 font-semibold">
              VELOCITY: 7.8 KM/S • ORBITAL INSERTION VECTOR
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
