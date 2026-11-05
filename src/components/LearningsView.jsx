import React, { useState } from 'react';
import { 
  Atom, 
  ShieldCheck, 
  Flame, 
  Award, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Compass, 
  Globe2, 
  Share2, 
  Heart,
  ArrowLeft
} from 'lucide-react';
import { LEARNING_PILLARS, FINAL_MESSAGE } from '../data/learningsData';
import { spaceAudio } from '../utils/audio';

export default function LearningsView({
  unlockedBadges,
  totalMissions,
  onRestartJourney,
  onBackToDestinations,
  onSelectMission
}) {
  const [activePillar, setActivePillar] = useState('discoveries');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Rocket': return <Flame className="w-5 h-5 text-orange-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleCopyCitation = () => {
    spaceAudio.playClick();
    const citationText = `THE FORGOTTEN FRONTIER — Completed exploration of 6 historic Moon & Mars relics. Badges unlocked: ${unlockedBadges.length}/${totalMissions}.`;
    navigator.clipboard?.writeText(citationText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 animate-fade-in pointer-events-auto">
      {/* Chapter Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>FINAL CHAPTER • SYNTHESIS & REFLECTION</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-cinematic text-white tracking-tight mb-4">
          What Did We Learn?
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          The machines humanity left behind on the Moon and Mars were never forgotten scraps of metal. They fundamentally transformed our understanding of the Solar System, created new branches of science, and laid the foundations for our return.
        </p>
      </div>

      {/* Interactive Tabs for the 3 Learning Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        {LEARNING_PILLARS.map((pillar) => {
          const isActive = activePillar === pillar.id;

          return (
            <button
              key={pillar.id}
              onClick={() => {
                spaceAudio.playClick();
                setActivePillar(pillar.id);
              }}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                isActive
                  ? 'bg-slate-900/90 border-cyan-500 shadow-xl shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                {getPillarIcon(pillar.icon)}
              </div>
              <div>
                <h3 className={`text-base font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Detailed Breakdown */}
      {LEARNING_PILLARS.filter(p => p.id === activePillar).map((pillar) => (
        <div 
          key={pillar.id}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl mb-16 animate-fade-in"
        >
          <div className="flex items-center gap-3 pb-6 mb-8 border-b border-slate-800">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
              {getPillarIcon(pillar.icon)}
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
                DETAILED SCIENTIFIC ANALYSIS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinematic">
                {pillar.title}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillar.points.map((pt, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-cyan-400 font-bold">
                  <span>0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-white text-sm font-semibold">{pt.heading}</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Explorer Flight Debrief Certificate Card */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-800 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
              <Award className="w-4 h-4" />
              <span>OFFICIAL MISSION CONTROL ACCREDITATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-cinematic">
              Extraterrestrial Explorer Flight Log
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Badges Earned</span>
              <span className="text-lg font-bold font-mono text-cyan-400">
                {unlockedBadges.length} / {totalMissions}
              </span>
            </div>
            <button
              onClick={handleCopyCitation}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'Copied to Clipboard!' : 'Share Debrief'}</span>
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {[
            { id: 'apollo-11-descent-stage', title: 'Tranquility Base Historian', body: 'moon' },
            { id: 'apollo-15-rover', title: 'Lunar Rover Navigator', body: 'moon' },
            { id: 'lunar-retroreflector', title: 'Laser Ranging Physicist', body: 'moon' },
            { id: 'opportunity-rover', title: 'Meridiani Planum Geologist', body: 'mars' },
            { id: 'ingenuity-helicopter', title: 'Martian Aviator', body: 'mars' },
            { id: 'viking-1-lander', title: 'Viking Mission Archivist', body: 'mars' }
          ].map((b, idx) => {
            const isEarned = unlockedBadges.includes(b.title);

            return (
              <div 
                key={idx}
                onClick={() => {
                  if (!isEarned) {
                    onSelectMission(b.id);
                  }
                }}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isEarned
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700 cursor-pointer'
                }`}
              >
                <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-xs bg-slate-900 border border-slate-700">
                  {isEarned ? '✓' : idx + 1}
                </div>
                <span className="text-[11px] font-semibold block leading-tight">
                  {b.title}
                </span>
                <span className="text-[9px] font-mono text-slate-400 block mt-1">
                  {isEarned ? 'Mastered' : 'Click to Quiz'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Final Photograph & Moving Tribute */}
      <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black mb-16 relative">
        <div className="relative h-96 sm:h-[480px]">
          <img
            src="https://images-assets.nasa.gov/image/as08-14-2383/as08-14-2383~orig.jpg"
            alt="Earthrise from lunar orbit taken by Apollo 8"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Quote Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 text-center max-w-4xl mx-auto">
            <blockquote className="text-lg sm:text-2xl font-light text-slate-100 italic leading-relaxed mb-4">
              "{FINAL_MESSAGE.quote}"
            </blockquote>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-wider uppercase mb-6">
              — {FINAL_MESSAGE.author}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {FINAL_MESSAGE.closingThought}
            </p>
          </div>
        </div>
      </div>

      {/* Page Navigation & Restart Journey Call to Action */}
      <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <button
          onClick={() => {
            spaceAudio.playClick();
            if (onBackToDestinations) onBackToDestinations();
          }}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>← RETURN TO DESTINATIONS (MOON &amp; MARS)</span>
        </button>

        <span className="text-[11px] uppercase tracking-widest text-slate-500 font-mono hidden sm:block">
          PAGE 4 OF 5 • SCIENTIFIC LEGACY
        </span>

        <button
          onClick={() => {
            spaceAudio.playWarp();
            onRestartJourney();
          }}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold font-mono tracking-wider text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESTART EXPEDITION JOURNEY (PAGE 1)</span>
        </button>
      </div>
    </div>
  );
}
