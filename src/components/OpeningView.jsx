import React from 'react';
import { ArrowRight } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

/* ============================================================
   HERO OPENING VIEW — Cinematic Extraterrestrial Experience
   - Real 3D Three.js cosmos in background (Moon left, Mars right, Earth distant)
   - Lunar surface peak along the bottom
   - Animated orbital ellipse flight path around title with orbiting spacecraft
   - Clean, powerful typography and poignant narrative quote
   - Direct entry into the cosmos upon clicking the CTA button
   ============================================================ */

export default function OpeningView({ onBegin }) {
  return (
    <div className="relative h-screen min-h-[620px] max-h-screen flex flex-col justify-between p-6 sm:p-12 select-none pointer-events-auto overflow-hidden">
      
      {/* ── CSS KEYFRAMES ────────────────────────────────────────── */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroTitleUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }
        @keyframes nodePulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes scrollBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-7px); }
          60% { transform: translateY(-3px); }
        }
      `}</style>

      {/* ── 1. ANIMATED ORBITAL FLIGHT RING AROUND THE TITLE ─────── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        <svg
          viewBox="0 0 1000 360"
          className="w-[92%] max-w-[920px] h-auto overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Soft cyan blur glow */}
            <filter id="heroRingGlow" x="-30%" y="-140%" width="160%" height="380%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Bright waypoint node glow */}
            <filter id="heroNodeGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear gradient fading ring towards the planetary edges */}
            <linearGradient id="heroRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.05)" />
              <stop offset="15%" stopColor="rgba(56,189,248,0.75)" />
              <stop offset="50%" stopColor="rgba(168,85,247,0.85)" />
              <stop offset="85%" stopColor="rgba(56,189,248,0.75)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.05)" />
            </linearGradient>
          </defs>

          {/* Far Side Orbit Arc (dimmer, goes behind title) */}
          <ellipse
            cx="500"
            cy="180"
            rx="450"
            ry="62"
            fill="none"
            stroke="url(#heroRingGrad)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
            opacity="0.45"
            filter="url(#heroRingGlow)"
            style={{ animation: 'heroFadeIn 1.5s ease-out 0.4s both, ringPulse 4s ease-in-out infinite' }}
          />

          {/* Near Side Orbit Arc (brighter foreground path) */}
          <ellipse
            cx="500"
            cy="180"
            rx="450"
            ry="62"
            fill="none"
            stroke="rgba(56,189,248,0.85)"
            strokeWidth="1.8"
            strokeDasharray="9 6"
            opacity="0.88"
            filter="url(#heroRingGlow)"
            style={{ animation: 'heroFadeIn 1.8s ease-out 0.6s both, ringPulse 4s ease-in-out infinite' }}
          />

          {/* Outer Soft Halo Glow */}
          <ellipse
            cx="500"
            cy="180"
            rx="450"
            ry="62"
            fill="none"
            stroke="rgba(56,189,248,0.18)"
            strokeWidth="14"
            filter="url(#heroRingGlow)"
          />

          {/* Celestial Waypoint Node (Right / Mars-side) */}
          <circle
            cx="948"
            cy="180"
            r="6.5"
            fill="#38bdf8"
            filter="url(#heroNodeGlow)"
            style={{ animation: 'nodePulse 3s ease-in-out infinite' }}
          />
          <circle cx="948" cy="180" r="16" fill="rgba(56,189,248,0.18)" />

          {/* Celestial Waypoint Node (Left / Moon-side) */}
          <circle
            cx="52"
            cy="180"
            r="5"
            fill="#38bdf8"
            filter="url(#heroNodeGlow)"
            style={{ animation: 'nodePulse 3.5s ease-in-out 0.5s infinite' }}
          />
          <circle cx="52" cy="180" r="13" fill="rgba(56,189,248,0.15)" />

          {/* Orbiting Spacecraft Reconnaissance Drone */}
          <circle r="3.5" fill="#ffffff" filter="url(#heroNodeGlow)">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              begin="0.5s"
              path="M 948,180 A 450,62 0 1,0 52,180 A 450,62 0 1,0 948,180"
            />
          </circle>

          {/* Spacecraft Ion Propulsion Trail */}
          <circle r="2" fill="rgba(56,189,248,0.85)" filter="url(#heroRingGlow)">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              begin="0.68s"
              path="M 948,180 A 450,62 0 1,0 52,180 A 450,62 0 1,0 948,180"
            />
          </circle>
        </svg>
      </div>

      {/* ── 2. THE LUNAR PEAK TERRAIN (ALONG THE BOTTOM) ─────────── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        {/* Rocky lunar surface terrain texture with crater ridge mask */}
        <div
          className="w-full h-[28vh] sm:h-[34vh]"
          style={{
            backgroundImage: "url('/textures/moon.jpg')",
            backgroundSize: '240% auto',
            backgroundPosition: 'center 64%',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, rgba(0,0,0,0.85) 48%, black 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, rgba(0,0,0,0.85) 48%, black 100%)',
            filter: 'brightness(0.62) contrast(1.35) saturate(0.65)',
          }}
        />

        {/* Lunar Horizon Shadow Vignette — seamlessly blends the surface into space */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(2,4,10,0.92) 0%, rgba(2,4,10,0.45) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* ── 3. TOP TELEMETRY STATUS BAR ─────────────────────────── */}
      <div
        className="relative flex items-center justify-between text-xs font-mono text-slate-400 z-30"
        style={{
          animation: 'heroFadeIn 0.9s ease-out 0.2s both'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-300 font-bold tracking-widest uppercase">
            SOLAR SYSTEM OBSERVATION FEED
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span>SECTOR: SOL-3 &amp; SOL-4</span>
          <span>ORBITAL VECTORS: ALIGNED</span>
          <span className="text-cyan-400">STATUS: RECON OPEN</span>
        </div>
      </div>

      {/* ── 4. CENTRE HERO TITLE & NARRATIVE CARD ─────────────────── */}
      <div className="relative w-full max-w-4xl mx-auto my-auto text-center py-6 sm:py-10 z-30 pointer-events-auto">
        {/* Main Title */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-cinematic text-white tracking-tight leading-none mb-6 sm:mb-8"
          style={{
            animation: 'heroTitleUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both',
            textShadow:
              '0 0 80px rgba(56,189,248,0.35), 0 0 160px rgba(56,189,248,0.15), 0 4px 24px rgba(0,0,0,0.95)'
          }}
        >
          THE FORGOTTEN FRONTIER
        </h1>

        {/* Narrative Quote */}
        <p
          className="text-base sm:text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 px-4"
          style={{
            animation: 'heroTitleUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both',
            textShadow: '0 2px 20px rgba(0,0,0,0.95)'
          }}
        >
          Not everything returns from space. Some machines remain on distant worlds long after their missions end. Silent, forgotten, yet filled with stories. It's time to uncover them.
        </p>

        {/* Primary CTA Action Button */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'heroTitleUp 1s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}
        >
          <button
            onClick={() => {
              spaceAudio.playWarp();
              onBegin();
            }}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/35 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          >
            <span>ENTER THE COSMOS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── 5. BOTTOM HUD BAR ────────────────────────────────────── */}
      <div
        className="relative flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 border-t border-slate-800/80 pt-4 gap-3 z-30"
        style={{
          animation: 'heroFadeIn 1s ease-out 1.1s both'
        }}
      >
        <div className="flex items-center gap-2">
          <span>COORDINATES: LUNAR REGOLITH &amp; MARTIAN CRATERS</span>
        </div>

        {/* Telemetric Instruction Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>CLICK "ENTER THE COSMOS" TO BEGIN</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <span>6 FEATURED ARTIFACTS</span>
          <span>NASA ARCHIVE PROJECT</span>
        </div>
      </div>
    </div>
  );
}
