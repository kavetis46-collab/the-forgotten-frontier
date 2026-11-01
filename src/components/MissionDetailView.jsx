import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Scale, 
  Radio, 
  Sparkles, 
  BookOpen, 
  Clock, 
  MapPin, 
  Lightbulb, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Rocket
} from 'lucide-react';
import VisualTimeline from './VisualTimeline';
import InteractiveSurfaceMap from './InteractiveSurfaceMap';
import MissionQuiz from './MissionQuiz';
import PhotoLightbox from './PhotoLightbox';
import { spaceAudio } from '../utils/audio';

export default function MissionDetailView({
  mission,
  onBackToDestinations,
  onSelectMission,
  allMissions,
  onCompleteQuiz,
  unlockedBadges,
  onAutoAdvance
}) {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const isMoon = mission.body === 'moon';
  const moonMissions = allMissions.filter(m => m.body === 'moon');
  const marsMissions = allMissions.filter(m => m.body === 'mars');

  // Determine sequential next destination logic
  const currentIndex = allMissions.findIndex(m => m.id === mission.id);
  const prevMission = currentIndex > 0 ? allMissions[currentIndex - 1] : null;

  // Next target calculation:
  // If last Moon mission (idx 2) -> target is Mars Mission 1 (idx 3)
  // If last Mars mission (idx 5) -> target is Moon Mission 1 or Learnings!
  let nextTarget = null;
  let nextButtonLabel = '';

  if (isMoon) {
    const moonIdx = moonMissions.findIndex(m => m.id === mission.id);
    if (moonIdx < moonMissions.length - 1) {
      nextTarget = { type: 'mission', id: moonMissions[moonIdx + 1].id, name: moonMissions[moonIdx + 1].artifact };
      nextButtonLabel = `Next Moon Mission: ${moonMissions[moonIdx + 1].artifact}`;
    } else {
      // All 3 Moon missions completed! Next is Mars!
      nextTarget = { type: 'mission', id: marsMissions[0].id, name: `Mars: ${marsMissions[0].artifact}` };
      nextButtonLabel = `3 Moon Missions Explored ➔ Launch to Mars: ${marsMissions[0].artifact}`;
    }
  } else {
    // Mars missions
    const marsIdx = marsMissions.findIndex(m => m.id === mission.id);
    if (marsIdx < marsMissions.length - 1) {
      nextTarget = { type: 'mission', id: marsMissions[marsIdx + 1].id, name: marsMissions[marsIdx + 1].artifact };
      nextButtonLabel = `Next Mars Mission: ${marsMissions[marsIdx + 1].artifact}`;
    } else {
      // All 3 Mars missions completed! Check if Moon missions are completed
      const moonAllDone = moonMissions.every(m => unlockedBadges.includes(m.quiz.badgeName));
      if (!moonAllDone) {
        nextTarget = { type: 'mission', id: moonMissions[0].id, name: `The Moon: ${moonMissions[0].artifact}` };
        nextButtonLabel = `3 Mars Missions Explored ➔ Launch to Moon: ${moonMissions[0].artifact}`;
      } else {
        nextTarget = { type: 'learn', id: 'learn', name: 'What Did We Learn?' };
        nextButtonLabel = `All 6 Missions Explored ➔ Proceed to What Did We Learn?`;
      }
    }
  }

  const scrollToSection = (id) => {
    spaceAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 pb-28 pt-20 animate-fade-in">
      {/* Lightbox for zooming into any photo */}
      {lightboxPhoto && (
        <PhotoLightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      )}

      {/* Hero Header Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => {
              spaceAudio.playClick();
              onBackToDestinations();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-500 transition-all backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CELESTIAL HUB</span>
          </button>

          <div className="flex items-center gap-2">
            <span 
              className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${mission.accentColor}20`,
                color: mission.accentColor,
                border: `1px solid ${mission.accentColor}50`
              }}
            >
              {isMoon ? '🌕 The Moon' : '🔴 Mars'} • {mission.badge}
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono bg-slate-900/90 text-emerald-400 border border-emerald-500/30">
              {mission.status}
            </span>
          </div>
        </div>

        {/* Evocative Title & Artifact Subtitle */}
        <div className="mb-8">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-400 block mb-2">
            EXTRATERRESTRIAL ARTIFACT: {mission.artifact}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cinematic text-white tracking-tight leading-tight">
            {mission.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {mission.overview}
          </p>
        </div>

        {/* Telemetry Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-1">
              LANDING SITE
            </span>
            <span className="text-sm font-bold text-white block truncate">
              {mission.siteName.split('(')[0]}
            </span>
            <span className="text-xs font-mono text-cyan-400">
              {mission.coordinates.latFormatted}, {mission.coordinates.lngFormatted}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-1">
              TOUCHDOWN DATE
            </span>
            <span className="text-sm font-bold text-white block truncate">
              {mission.landingDate}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {mission.timeOnSurface}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-1">
              DISTANCE TO EARTH
            </span>
            <span className="text-sm font-bold text-white block truncate">
              {mission.distanceFromEarth}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Direct telemetry vector
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-1">
              MASS LEFT BEHIND
            </span>
            <span className="text-sm font-bold text-white block truncate">
              {mission.massLeftBehind}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Eternal regolith anchor
            </span>
          </div>
        </div>

        {/* Sticky Jump Navigation Bar */}
        <div className="sticky top-16 z-30 flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-slate-950/85 border border-slate-800 backdrop-blur-xl shadow-xl overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => scrollToSection('story')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>A. The Story</span>
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>B. Timeline</span>
            </button>
            <button
              onClick={() => scrollToSection('map')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>C. Interactive Map</span>
            </button>
            <button
              onClick={() => scrollToSection('facts')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap"
            >
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
              <span>D. Facts</span>
            </button>
            <button
              onClick={() => scrollToSection('quiz')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>E. Quiz</span>
            </button>
          </div>

          {unlockedBadges.includes(mission.quiz.badgeName) && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span>★ Badge Mastered</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ================= SECTION A: THE STORY ================= */}
        <section id="story" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
              A
            </span>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                CHAPTER I • NARRATIVE CHRONICLE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">The Story</h2>
            </div>
          </div>

          <div className="space-y-10">
            {mission.story.map((chapter, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className={`space-y-4 ${idx % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'}`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-cinematic leading-snug">
                    {chapter.heading}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {chapter.text}
                  </p>
                </div>

                <div className={`relative group ${idx % 2 === 0 ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1'}`}>
                  <div 
                    onClick={() => {
                      spaceAudio.playClick();
                      setLightboxPhoto(chapter);
                    }}
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-slate-700/80 shadow-2xl bg-black"
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.caption}
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-white backdrop-blur-xs">
                      <span>Click to Enlarge NASA Photo</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 italic px-1">
                    {chapter.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION B: MISSION TIMELINE ================= */}
        <section id="timeline" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-sm">
              B
            </span>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                CHAPTER II • INFOGRAPHIC TIMELINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Mission Timeline</h2>
            </div>
          </div>

          <VisualTimeline 
            timeline={mission.timeline} 
            accentColor={mission.accentColor} 
            body={mission.body} 
          />
        </section>

        {/* ================= SECTION C: WHERE IS IT NOW? (INTERACTIVE MAP) ================= */}
        <section id="map" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center font-mono font-bold text-rose-400 text-sm">
              C
            </span>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                CHAPTER III • NASA SURFACE ORBITAL CARTOGRAPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Where Is It Now? – Interactive Map</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-3xl leading-relaxed">
            Explore the exact landing coordinates of {mission.artifact} on the surface of {isMoon ? 'the Moon' : 'Mars'}. Zoom in to reveal high-resolution NASA orbital photographs, astronaut footpaths, craters, and nearby instruments, or switch to 3D Globe Orbit mode to spin the entire celestial body!
          </p>

          <InteractiveSurfaceMap mission={mission} />
        </section>

        {/* ================= SECTION D: INTERESTING FACTS ================= */}
        <section id="facts" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center font-mono font-bold text-yellow-400 text-sm">
              D
            </span>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                CHAPTER IV • CLASSIFIED ARCHIVES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Surprising Facts & Trivia</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mission.facts.map((fact, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{ backgroundColor: mission.accentColor }}
                />
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-cyan-400 border border-slate-700">
                    {fact.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {fact.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION E: MISSION QUIZ ================= */}
        <section id="quiz" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm">
              E
            </span>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                CHAPTER V • CREW EVALUATION & AUTO-PROGRESSION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Mission Debrief Challenge</h2>
            </div>
          </div>

          <MissionQuiz 
            mission={mission} 
            onCompleteQuiz={onCompleteQuiz}
            isUnlocked={unlockedBadges.includes(mission.quiz.badgeName)}
            onAutoAdvance={onAutoAdvance}
            nextTargetName={nextTarget?.name}
          />
        </section>

        {/* Dynamic Mission Switcher Bar with Clear Destination Transitions */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevMission ? (
            <button
              onClick={() => {
                onSelectMission(prevMission.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Previous Expedition</span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{prevMission.artifact}</span>
              </div>
            </button>
          ) : <div />}

          <button
            onClick={() => {
              spaceAudio.playClick();
              onBackToDestinations();
            }}
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            All Destinations
          </button>

          {/* Prominent Next Expedition / Planet Jump Button */}
          {nextTarget && (
            <button
              onClick={() => {
                if (nextTarget.type === 'learn') {
                  onSelectMission('learn');
                } else {
                  onSelectMission(nextTarget.id);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-end gap-3 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/50 hover:border-cyan-400 text-right transition-all group shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block uppercase">
                  {isMoon && currentIndex === 2 ? '🌕 Moon Completed ➔ Next Topic' : (currentIndex === 5 ? '🔴 Mars Completed' : 'Next Expedition')}
                </span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {nextButtonLabel}
                </span>
              </div>
              <Rocket className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
