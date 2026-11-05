import React from 'react';
import { Sparkles, ArrowRight, Compass, Shield, Globe } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function IntroView({ onStartJourney, onBackToOpening }) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 z-10 text-center select-none animate-fade-in pointer-events-auto">
      {/* Background Subtle Gradient Box */}
      <div className="max-w-4xl mx-auto glass-panel-glow rounded-3xl p-8 sm:p-14 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        {/* Decorative corner brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

        {/* Small Project Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '16s' }} />
          <span>PROLOGUE • THE SILENT ARCHAEOLOGY OF SPACE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinematic text-white tracking-tight leading-none mb-6">
          THE FORGOTTEN FRONTIER
        </h1>

        {/* Introduction Paragraphs */}
        <div className="space-y-4 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed mb-10">
          <p>
            Hundreds of thousands of kilometers from our warm blue Earth, silent monuments stand frozen in time. From the powdery grey dust of Tranquility Base to the wind-carved red sands of Meridiani Planum, humankind has planted the machinery of dreams.
          </p>
          <p className="text-slate-400 text-sm sm:text-base">
            They are not litter. They are not abandoned junk. They are our species’ first extraterrestrial trail markers—eternal witnesses to human courage, curiosity, and scientific triumph.
          </p>
        </div>

        {/* Four Key Pillars Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-cyan-400 font-mono text-xs block mb-1 font-bold">🌕 THE MOON</span>
            <span className="text-xs text-slate-300">3 Pristine Relics in Airless Vacuum</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-orange-400 font-mono text-xs block mb-1 font-bold">🔴 MARS</span>
            <span className="text-xs text-slate-300">3 Pioneers in the Dusty Winds</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-emerald-400 font-mono text-xs block mb-1 font-bold">🛰️ RECON MAPS</span>
            <span className="text-xs text-slate-300">Zoom into Real NASA Landing Sites</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-purple-400 font-mono text-xs block mb-1 font-bold">🎖️ FLIGHT LOG</span>
            <span className="text-xs text-slate-300">Quizzes, Badges & Discoveries</span>
          </div>
        </div>

        {/* BEGIN THE JOURNEY BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              spaceAudio.playWarp();
              onStartJourney();
            }}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black font-mono tracking-wider text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all group"
          >
            <span>BEGIN THE JOURNEY</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              spaceAudio.playClick();
              onBackToOpening();
            }}
            className="text-xs font-mono text-slate-400 hover:text-white px-4 py-2 transition-colors"
          >
            ← View Orbital Panorama
          </button>
        </div>
      </div>
    </div>
  );
}
