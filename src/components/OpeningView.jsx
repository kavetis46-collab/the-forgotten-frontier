import React from 'react';
import { Sparkles, ArrowRight, Radio, Volume2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function OpeningView({ onBegin, onEnableSound, isAudioMuted }) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 z-10 select-none animate-fade-in pointer-events-auto overflow-hidden">

      {/* ======== CINEMATIC PLANET HALO BACKDROPS ======== */}

      {/* Moon — large cool-white luminous halo, far left */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-12vw',
          top: '50%',
          transform: 'translateY(-55%)',
          width: 'clamp(320px, 52vw, 640px)',
          height: 'clamp(320px, 52vw, 640px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,232,255,0.07) 0%, rgba(160,196,240,0.055) 30%, rgba(56,100,160,0.03) 60%, transparent 78%)',
          filter: 'blur(2px)',
          zIndex: 1,
        }}
      />
      {/* Moon — subtle cool limb-light highlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-10vw',
          top: '50%',
          transform: 'translateY(-55%)',
          width: 'clamp(300px, 48vw, 600px)',
          height: 'clamp(300px, 48vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 68% 42%, rgba(180,210,255,0.055) 0%, transparent 55%)',
          zIndex: 1,
        }}
      />

      {/* Mars — large warm-amber halo, far right */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-10vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(260px, 44vw, 540px)',
          height: 'clamp(260px, 44vw, 540px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,110,50,0.08) 0%, rgba(200,70,20,0.055) 35%, rgba(140,40,8,0.025) 62%, transparent 80%)',
          filter: 'blur(1.5px)',
          zIndex: 1,
        }}
      />
      {/* Mars — volcanic-dust atmospheric scatter */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(240px, 40vw, 500px)',
          height: 'clamp(240px, 40vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 45%, rgba(255,130,40,0.045) 0%, transparent 55%)',
          zIndex: 1,
        }}
      />

      {/* Earth — tiny blue glow, dead centre, slightly above middle (distant) */}
      <div
        className="absolute left-1/2 pointer-events-none"
        style={{
          top: '28%',
          transform: 'translateX(-50%)',
          width: 'clamp(60px, 7vw, 110px)',
          height: 'clamp(60px, 7vw, 110px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(37,99,235,0.1) 45%, transparent 70%)',
          filter: 'blur(3px)',
          zIndex: 1,
        }}
      />

      {/* Volumetric deep-space fog — adds atmosphere to the lower frame */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 55% at 50% 65%, rgba(5,8,22,0.5) 0%, transparent 80%)',
          zIndex: 1,
        }}
      />

      {/* Fine cosmic dust / nebula wisps */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 30% at 18% 58%, rgba(90,50,150,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 25% at 82% 42%, rgba(170,65,15,0.065) 0%, transparent 65%),
            radial-gradient(ellipse 40% 20% at 50% 18%, rgba(15,70,150,0.055) 0%, transparent 65%)
          `,
          zIndex: 1,
        }}
      />

      {/* ======== UI CONTENT ======== */}

      {/* Cinematic Top Telemetry Bar */}
      <div className="relative flex items-center justify-between text-xs font-mono text-slate-400" style={{ zIndex: 10 }}>
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

      {/* Planet Identity Labels — anchored to the new left/right composition */}
      <div className="relative w-full max-w-6xl mx-auto my-auto pointer-events-none" style={{ zIndex: 10 }}>

        {/* Moon label — left edge */}
        <div className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-500/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-200 tracking-widest">THE MOON</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 pl-3 tracking-wider">3 HISTORIC RELICS • 384,400 KM</span>
          </div>
        </div>

        {/* Earth label — small, upper centre */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-28 hidden lg:block">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[9px] font-mono text-cyan-400 tracking-widest">EARTH • HOME WORLD • DISTANT</span>
          </div>
        </div>

        {/* Mars label — right edge */}
        <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-rose-500/40 backdrop-blur-md">
              <span className="text-[11px] font-mono text-rose-300 tracking-widest">MARS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <span className="text-[9px] font-mono text-slate-500 pr-3 tracking-wider">3 EXPLORATION SITES • 225M KM</span>
          </div>
        </div>

        {/* Orbital relay badge — lower left, subtle */}
        <div className="absolute bottom-16 left-1/4 hidden xl:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-amber-500/25 backdrop-blur-md">
            <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
            <span className="text-[9px] font-mono text-amber-400">ORBITAL RELAY • TELEMETRY ACTIVE</span>
          </div>
        </div>

        {/* ======== CENTRE TITLE CARD — nav/text/buttons untouched ======== */}
        <div className="text-center py-12 pointer-events-auto max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Extraterrestrial Museum</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-cinematic text-white tracking-tight leading-none drop-shadow-2xl mb-6">
            THE FORGOTTEN FRONTIER
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow">
            Across the silent seas of the Moon and the red plains of Mars, humanity has left behind its greatest monuments. Discover their stories, pinpoint their locations, and uncover what they taught our world.
          </p>

          {/* Action Buttons — unchanged */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                spaceAudio.playWarp();
                onBegin();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all group"
            >
              <span>ENTER THE COSMOS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {isAudioMuted && (
              <button
                onClick={() => {
                  onEnableSound();
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 backdrop-blur-md transition-all"
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Enable Atmospheric Space Audio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic Bottom HUD Status — unchanged */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 border-t border-slate-800/80 pt-4 gap-2" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-2">
          <span>COORDINATES: LUNAR REGOLITH &amp; MARTIAN CRATERS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>6 CURATED MISSIONS</span>
          <span>INTERACTIVE CARTOGRAPHY</span>
          <span>REAL NASA ARCHIVES</span>
        </div>
      </div>
    </div>
  );
}
