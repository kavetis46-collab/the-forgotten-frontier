import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

const ORBITAL_WAYPOINTS = [
  { view: 'hero', label: 'Orbital Panorama', au: '0.0 AU', pct: '0%', icon: '☀️' },
  { view: 'intro', label: 'Prologue Archive', au: '1.0 AU', pct: '25%', icon: '🌍' },
  { view: 'destination', label: 'Destination Matrix', au: '1.5 AU', pct: '50%', icon: '🚀' },
  { view: 'mission', label: 'Planetary Recon', au: '2.7 AU', pct: '75%', icon: '🛰️' },
  { view: 'learn', label: 'Full Galaxy View', au: '25,000 LY', pct: '100%', icon: '🌌' }
];

export default function SolarSystemScrollHUD({ currentView, onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Do not show HUD on the initial Opening view
  if (currentView === 'hero') {
    return null;
  }

  const currentWaypoint = ORBITAL_WAYPOINTS.find(wp => wp.view === currentView) || ORBITAL_WAYPOINTS[2];

  const handleSelectWaypoint = (view) => {
    spaceAudio.playClick();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 select-none pointer-events-auto hidden md:block">
      <div className="relative flex items-center">
        
        {/* Toggle Collapse Pill */}
        <button
          onClick={() => {
            spaceAudio.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="absolute -left-7 top-1/2 -translate-y-1/2 p-1.5 rounded-l-lg bg-slate-950/80 border-y border-l border-cyan-500/30 text-cyan-400 hover:text-white backdrop-blur-md cursor-pointer"
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
              <span className="text-cyan-400 font-bold">{currentWaypoint.pct}</span>
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
              
              {/* Waypoint Buttons */}
              <div className="space-y-3 relative z-10">
                {ORBITAL_WAYPOINTS.map((wp, idx) => {
                  const isActive = wp.view === currentView;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectWaypoint(wp.view)}
                      className="flex items-center gap-2.5 text-left w-full group focus:outline-none cursor-pointer"
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

            {/* Hint */}
            <div className="mt-3 pt-2 border-t border-slate-800 text-center">
              <span className="text-[9px] font-mono text-slate-500 block leading-tight">
                Click any waypoint to jump to view
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
