import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle, 
  Compass, 
  Sparkles, 
  Globe2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function DestinationView({
  missions,
  onSelectMission,
  unlockedBadges,
  onGoToLearn,
  onBackToIntro
}) {
  const [activeDestination, setActiveDestination] = useState('moon'); // 'moon' | 'mars' | 'both'

  const moonMissions = missions.filter(m => m.body === 'moon');
  const marsMissions = missions.filter(m => m.body === 'mars');

  return (
    <div className="relative min-h-screen text-slate-100 pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 animate-fade-in pointer-events-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>DESTINATION SELECTION MATRIX</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-cinematic text-white tracking-tight mb-4">
          Choose Your Destination
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Select a celestial body to reveal three historic missions. Discover the miraculous machines left behind in the silent vacuum of the Moon and the blowing red dust of Mars.
        </p>

        {/* Destination Switcher Pills */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md mt-6">
          <button
            onClick={() => {
              spaceAudio.playNav();
              setActiveDestination('moon');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              activeDestination === 'moon'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌕 THE MOON</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-black/20 rounded">
              3 Missions
            </span>
          </button>

          <button
            onClick={() => {
              spaceAudio.playNav();
              setActiveDestination('mars');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              activeDestination === 'mars'
                ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔴 MARS</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-black/20 rounded">
              3 Missions
            </span>
          </button>
        </div>
      </div>

      {/* ================= SECTION: THE MOON ================= */}
      {activeDestination === 'moon' && (
        <div className="space-y-8 animate-fade-in">
          {/* Destination Showcase Hero Banner */}
          <div className="relative rounded-3xl p-6 sm:p-10 border border-cyan-500/30 overflow-hidden shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#081220]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌕</span>
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
                  EARTH’S SILENT COMPANION • 384,400 KM AWAY
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-cinematic text-white mb-3">
                The Moon: Monuments in the Vacuum
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                With no wind, no rain, and no atmospheric weathering, human footprints and abandoned machines remain untouched for millions of years. Explore the three legendary relics standing in the lunar regolith.
              </p>
            </div>
          </div>

          {/* 3 Moon Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moonMissions.map((m, idx) => {
              const isPassed = unlockedBadges.includes(m.quiz.badgeName);

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    spaceAudio.playWarp();
                    onSelectMission(m.id);
                  }}
                  className="glass-panel hover:glass-panel-glow rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img
                      src={m.heroImage}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    {/* Badge status pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                        {m.badge}
                      </span>
                    </div>

                    {isPassed && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/90 text-slate-950 shadow">
                        <CheckCircle className="w-3 h-3" />
                        <span>Explored</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-1">
                        ARTIFACT: {m.artifact}
                      </span>
                      <h3 className="text-lg font-bold text-white font-cinematic group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {m.overview}
                      </p>
                    </div>

                    <div>
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{m.siteName.split('(')[0]}</span>
                        </div>
                        <span className="text-cyan-400 shrink-0">{m.coordinates.latFormatted}</span>
                      </div>

                      <div className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all">
                        <span>EXPLORE EXPEDITION</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SECTION: MARS ================= */}
      {activeDestination === 'mars' && (
        <div className="space-y-8 animate-fade-in">
          {/* Destination Showcase Hero Banner */}
          <div className="relative rounded-3xl p-6 sm:p-10 border border-rose-500/30 overflow-hidden shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#1f0d0d]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔴</span>
                <span className="text-xs font-mono tracking-widest text-orange-400 uppercase font-bold">
                  THE RED PLANET • 225,000,000 KM AWAY
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-cinematic text-white mb-3">
                Mars: Pioneers in the Red Dust
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Across howling dust storms, frozen carbon dioxide caps, and ancient dried riverbeds, robotic trailblazers proved that liquid water once flowed on Mars. Explore the three legendary emissaries resting in the Martian sand.
              </p>
            </div>
          </div>

          {/* 3 Mars Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marsMissions.map((m, idx) => {
              const isPassed = unlockedBadges.includes(m.quiz.badgeName);

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    spaceAudio.playWarp();
                    onSelectMission(m.id);
                  }}
                  className="glass-panel hover:glass-panel-mars rounded-2xl overflow-hidden border border-slate-800 hover:border-rose-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img
                      src={m.heroImage}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    {/* Badge status pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 border border-orange-500/40 text-orange-300 backdrop-blur-md">
                        {m.badge}
                      </span>
                    </div>

                    {isPassed && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/90 text-slate-950 shadow">
                        <CheckCircle className="w-3 h-3" />
                        <span>Explored</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase mb-1">
                        ARTIFACT: {m.artifact}
                      </span>
                      <h3 className="text-lg font-bold text-white font-cinematic group-hover:text-orange-300 transition-colors leading-snug mb-3">
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {m.overview}
                      </p>
                    </div>

                    <div>
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                          <span className="truncate">{m.siteName.split('(')[0]}</span>
                        </div>
                        <span className="text-orange-400 shrink-0">{m.coordinates.latFormatted}</span>
                      </div>

                      <div className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-orange-500 group-hover:text-slate-950 text-orange-400 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all">
                        <span>EXPLORE EXPEDITION</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Call to Action: Proceed to What Did We Learn? */}
      <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
        <button
          onClick={() => {
            spaceAudio.playClick();
            if (onBackToIntro) onBackToIntro();
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>← PREVIOUS: PROLOGUE</span>
        </button>

        <div className="text-center">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
            COMPREHENSIVE EXPLORATION COMPLETE?
          </p>
          <span className="text-[11px] text-slate-500 font-mono">
            PAGE 3 OF 5 • CELESTIAL DESTINATION MATRIX
          </span>
        </div>

        <button
          onClick={() => {
            spaceAudio.playWarp();
            onGoToLearn();
          }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>PROCEED TO FINAL CHAPTER: WHAT DID WE LEARN?</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
