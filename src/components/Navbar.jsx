import React, { useState } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Award, 
  Maximize, 
  Minimize, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Radio,
  Rocket
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function Navbar({
  currentView,
  currentMissionId,
  missions,
  unlockedBadges,
  isAudioMuted,
  onToggleAudio,
  onNavigate,
  onOpenFlightLog,
  onTriggerRocket
}) {
  const [missionDropdownOpen, setMissionDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    spaceAudio.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const currentMission = missions.find(m => m.id === currentMissionId);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800/80 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            onNavigate('hero', null, 'TRAJECTORY: ORBITAL PANORAMA');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-md shadow-cyan-500/10">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-cinematic font-black tracking-wider text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors block leading-tight">
              THE FORGOTTEN FRONTIER
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase hidden sm:block">
              EXTRATERRESTRIAL ARTIFACT ARCHIVE
            </span>
          </div>
        </div>

        {/* Desktop View Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => {
              onNavigate('hero', null, 'TRAJECTORY: ORBITAL PANORAMA');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentView === 'hero' ? 'text-cyan-400 bg-slate-900 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            1. Opening
          </button>

          <button
            onClick={() => {
              onNavigate('intro', null, 'TRAJECTORY: PROLOGUE ARCHIVE');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentView === 'intro' ? 'text-cyan-400 bg-slate-900 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            2. Prologue
          </button>

          <button
            onClick={() => {
              onNavigate('destination', null, 'TRAJECTORY: DESTINATION MATRIX');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentView === 'destination' ? 'text-cyan-400 bg-slate-900 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            3. Destinations (Moon & Mars)
          </button>

          {/* Quick Mission Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                spaceAudio.playClick();
                setMissionDropdownOpen(!missionDropdownOpen);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                currentView === 'mission' ? 'text-cyan-400 bg-slate-900 font-bold border border-cyan-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <span>4. Missions (1–6)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {missionDropdownOpen && (
              <div 
                className="absolute top-full mt-2 w-72 bg-slate-950 border border-slate-800 rounded-xl p-2 shadow-2xl backdrop-blur-xl z-50 animate-fade-in"
                onMouseLeave={() => setMissionDropdownOpen(false)}
              >
                <div className="px-2 py-1 text-[10px] font-mono text-slate-500 uppercase">
                  🌕 THE MOON
                </div>
                {missions.filter(m => m.body === 'moon').map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onNavigate('mission', m.id, `TRAJECTORY: ${m.artifact.toUpperCase()}`);
                      setMissionDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-900 text-slate-300 hover:text-white truncate block"
                  >
                    {m.artifact}
                  </button>
                ))}

                <div className="px-2 py-1 text-[10px] font-mono text-slate-500 uppercase mt-2 pt-2 border-t border-slate-900">
                  🔴 MARS
                </div>
                {missions.filter(m => m.body === 'mars').map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onNavigate('mission', m.id, `TRAJECTORY: ${m.artifact.toUpperCase()}`);
                      setMissionDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-900 text-slate-300 hover:text-white truncate block"
                  >
                    {m.artifact}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onNavigate('learn', null, 'TRAJECTORY: WHAT WE LEARNED');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentView === 'learn' ? 'text-cyan-400 bg-slate-900 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            5. What We Learned
          </button>
        </div>

        {/* Action Tool Buttons (Rocket Launcher, Audio, Flight Log, Fullscreen) */}
        <div className="flex items-center gap-2">
          
          {/* Quick Manual Rocket Flyby Button */}
          {onTriggerRocket && (
            <button
              onClick={onTriggerRocket}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 text-orange-300 hover:text-orange-200 hover:border-orange-400 text-xs font-mono transition-all group"
              title="Trigger Cinematic Rocket Flyby"
            >
              <Rocket className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span>Launch Rocket</span>
            </button>
          )}

          {/* Space Audio Synthesizer Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              !isAudioMuted 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title={!isAudioMuted ? 'Mute Space Sound' : 'Play Space Ambience'}
          >
            {!isAudioMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline">Audio On</span>
                {/* Waveform indicator */}
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 bg-cyan-400 h-2 animate-bounce" />
                  <div className="w-0.5 bg-cyan-400 h-3 animate-pulse" />
                  <div className="w-0.5 bg-cyan-400 h-1.5 animate-bounce" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sound Off</span>
              </>
            )}
          </button>

          {/* Flight Log Drawer Trigger */}
          <button
            onClick={() => {
              spaceAudio.playClick();
              onOpenFlightLog();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-200 transition-colors"
            title="Open Astronaut Flight Log"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Flight Log</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">
              {unlockedBadges.length}/{missions.length}
            </span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hidden sm:block transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 p-4 space-y-2 backdrop-blur-xl">
          <button
            onClick={() => {
              onNavigate('hero', null, 'TRAJECTORY: ORBITAL PANORAMA');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2 rounded text-xs font-mono text-slate-300 hover:bg-slate-900"
          >
            1. Space Opening
          </button>
          <button
            onClick={() => {
              onNavigate('intro', null, 'TRAJECTORY: PROLOGUE ARCHIVE');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2 rounded text-xs font-mono text-slate-300 hover:bg-slate-900"
          >
            2. The Forgotten Frontier (Prologue)
          </button>
          <button
            onClick={() => {
              onNavigate('destination', null, 'TRAJECTORY: DESTINATION MATRIX');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2 rounded text-xs font-mono text-slate-300 hover:bg-slate-900"
          >
            3. Choose Destination (Moon & Mars)
          </button>
          <div className="pl-4 py-1 text-[11px] font-mono text-cyan-400">
            Missions:
          </div>
          {missions.map(m => (
            <button
              key={m.id}
              onClick={() => {
                onNavigate('mission', m.id, `TRAJECTORY: ${m.artifact.toUpperCase()}`);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left pl-6 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              • {m.artifact}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('learn', null, 'TRAJECTORY: WHAT WE LEARNED');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2 rounded text-xs font-mono text-slate-300 hover:bg-slate-900"
          >
            5. What Did We Learn?
          </button>
        </div>
      )}
    </nav>
  );
}
