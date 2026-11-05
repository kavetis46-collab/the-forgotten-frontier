import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, ChevronRight, ChevronLeft, Eye } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

const ORBITAL_WAYPOINTS = [
  { label: 'Sun & Core', au: '0.0 AU', depth: 0.0, icon: '☀️' },
  { label: 'Earth & Moon', au: '1.0 AU', depth: 0.2, icon: '🌍' },
  { label: 'Mars Orbit', au: '1.5 AU', depth: 0.45, icon: '🔴' },
  { label: 'Asteroid Belt', au: '2.7 AU', depth: 0.65, icon: '☄️' },
  { label: 'Jupiter & Saturn', au: '9.5 AU', depth: 0.85, icon: '🪐' },
  { label: 'Full Galaxy View', au: '25,000 LY', depth: 1.0, icon: '🌌' }
];

export default function SolarSystemScrollHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDepth = (depth) => {
    spaceAudio.playClick();
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: depth * totalScroll,
      behavior: 'smooth'
    });
  };

  // Find nearest active celestial waypoint
  const currentWaypoint = ORBITAL_WAYPOINTS.reduce((prev, curr) => {
    return Math.abs(curr.depth - scrollProgress) < Math.abs(prev.depth - scrollProgress) ? curr : prev;
  });

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 select-none pointer-events-auto hidden md:block">
      <div className="relative flex items-center">
        
        {/* Toggle Collapse Pill */}
        <button
          onClick={() => {
            spaceAudio.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="absolute -left-7 top-1/2 -translate-y-1/2 p-1.5 rounded-l-lg bg-slate-950/80 border-y border-l border-cyan-500/30 text-cyan-400 hover:text-white backdrop-blur-md"
          title={isCollapsed ? 'Expand Solar System Radar' : 'Collapse HUD'}
        >
          {isCollapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {!isCollapsed && (
          <div className="glass-panel rounded-2xl p-3 border border-cyan-500/30 shadow-2xl backdrop-blur-xl w-44">
            
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold text-slate-200 uppercase">SOLAR RADAR</span>
              </div>
              <span className="text-cyan-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>

            {/* Current Active Waypoint Readout */}
            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-3 text-center">
              <span className="text-[9px] font-mono text-slate-400 block uppercase">
                Current Vantage
              </span>
              <span className="text-xs font-bold text-white flex items-center justify-center gap-1.5 mt-0.5 truncate">
                <span>{currentWaypoint.icon}</span>
                <span className="text-cyan-300">{currentWaypoint.label}</span>
              </span>
              <span className="text-[10px] font-mono text-amber-400">
                {currentWaypoint.au}
              </span>
            </div>

            {/* Vertical Orbital Track Line */}
            <div className="relative py-2 pl-3">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-800" />
              
              {/* Active Damped Track */}
              <div 
                className="absolute left-6 top-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400 transition-all duration-300"
                style={{ height: `${scrollProgress * 85}%` }}
              />

              {/* Waypoint Buttons */}
              <div className="space-y-3 relative z-10">
                {ORBITAL_WAYPOINTS.map((wp, idx) => {
                  const isActive = Math.abs(wp.depth - scrollProgress) < 0.12;

                  return (
                    <button
                      key={idx}
                      onClick={() => scrollToDepth(wp.depth)}
                      className="flex items-center gap-2.5 text-left w-full group focus:outline-none"
                    >
                      <div 
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-all ${
                          isActive 
                            ? 'scale-125 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/50 ring-2 ring-cyan-300' 
                            : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-cyan-400 group-hover:text-white'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-slate-950' : 'bg-slate-500'}`} />
                      </div>
                      
                      <div className="leading-tight">
                        <span className={`text-[10px] font-mono block truncate ${isActive ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                          {wp.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="mt-3 pt-2 border-t border-slate-800 text-center">
              <span className="text-[9px] font-mono text-slate-500 block leading-tight">
                Scroll down to zoom out to the Grand Galaxy view
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
