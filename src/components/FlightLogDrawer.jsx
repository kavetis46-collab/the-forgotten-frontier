import React from 'react';
import { X, Award, CheckCircle, ArrowRight, Compass, Rocket, Shield } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function FlightLogDrawer({
  isOpen,
  onClose,
  missions,
  unlockedBadges,
  onSelectMission,
  onGoToLearn
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#070b14] border-l border-slate-800 h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold font-cinematic text-lg text-white">
                Astronaut Flight Log
              </h3>
            </div>
            <button
              onClick={() => {
                spaceAudio.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Overall Expedition Status Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>EXPLORATION STATUS</span>
              <span className="text-cyan-400 font-bold">
                {Math.round((unlockedBadges.length / missions.length) * 100)}% COMPLETE
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{
                  width: `${(unlockedBadges.length / missions.length) * 100}%`
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-2">
              <span>{unlockedBadges.length} of {missions.length} Badges Mastered</span>
              <span>Class 1 Field Specialist</span>
            </div>
          </div>

          {/* Missions Quick Navigation List */}
          <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
            MISSION EXPEDITIONS
          </h4>
          <div className="space-y-2.5">
            {missions.map((m, idx) => {
              const isEarned = unlockedBadges.includes(m.quiz.badgeName);

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    spaceAudio.playWarp();
                    onSelectMission(m.id);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{m.body === 'moon' ? '🌕' : '🔴'}</span>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {m.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {m.artifact}
                      </p>
                    </div>
                  </div>

                  {isEarned ? (
                    <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <button
            onClick={() => {
              spaceAudio.playWarp();
              onGoToLearn();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow"
          >
            <span>VIEW WHAT WE LEARNED</span>
            <Rocket className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
