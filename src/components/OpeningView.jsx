import React from 'react';
import { Compass, Sparkles, ArrowRight, Eye, Radio, Volume2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function OpeningView({ onBegin, onEnableSound, isAudioMuted }) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 z-10 select-none animate-fade-in pointer-events-auto">
      {/* Cinematic Top Telemetry Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-300 font-bold tracking-widest uppercase">
            SOLAR SYSTEM OBSERVATION FEED
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span>SECTOR: SOL-3 & SOL-4</span>
          <span>ORBITAL VECTORS: ALIGNED</span>
          <span className="text-cyan-400">STATUS: RECON OPEN</span>
        </div>
      </div>

      {/* Floating Interactive Labels for the 3D Planets in the Scene */}
      <div className="relative w-full max-w-6xl mx-auto my-auto pointer-events-none">
        {/* Earth Marker Hint */}
        <div className="absolute -top-32 left-4 sm:left-12 hidden md:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono text-cyan-300">EARTH • HOME WORLD</span>
          </div>
        </div>

        {/* Moon Marker Hint */}
        <div className="absolute top-10 left-1/3 hidden lg:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-slate-700/80 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-[11px] font-mono text-slate-300">THE MOON • 384,400 KM • 3 HISTORIC RELICS</span>
          </div>
        </div>

        {/* Mars Marker Hint */}
        <div className="absolute -top-24 right-4 sm:right-16 hidden md:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-rose-500/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] font-mono text-rose-300">MARS • 225,000,000 KM • 3 EXPLORATION SITES</span>
          </div>
        </div>

        {/* Satellite Hint */}
        <div className="absolute bottom-28 left-1/4 hidden xl:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-amber-500/30 backdrop-blur-md">
            <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono text-amber-300">ORBITAL RELAY • TELEMETRY ACTIVE</span>
          </div>
        </div>

        {/* Center Title Card */}
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

          {/* Action Buttons */}
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

      {/* Cinematic Bottom HUD Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 border-t border-slate-800/80 pt-4 gap-2">
        <div className="flex items-center gap-2">
          <span>COORDINATES: LUNAR REGOLITH & MARTIAN CRATERS</span>
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
