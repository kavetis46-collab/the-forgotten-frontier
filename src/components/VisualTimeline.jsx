import React, { useState } from 'react';
import { Send, Target, Activity, Flag, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function VisualTimeline({ timeline, accentColor, body }) {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (index, total) => {
    if (index === 0) return <Send className="w-4 h-4" />;
    if (index === 1) return <Target className="w-4 h-4" />;
    if (index === 2) return <Activity className="w-4 h-4" />;
    if (index === total - 2) return <Flag className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="relative glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
      {/* Timeline Infographic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
            CHRONOLOGICAL EXPEDITION LOG
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">Mission Milestones & Abandonment Timeline</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>MILESTONE</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold">
            {activeStep + 1} / {timeline.length}
          </span>
        </div>
      </div>

      {/* Horizontal Step Navigation for Medium+ Screens */}
      <div className="hidden md:block relative mb-10">
        {/* Progress Track Line */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0" />
        <div 
          className="absolute top-5 left-6 h-0.5 transition-all duration-500 ease-out -z-0"
          style={{
            width: `${(activeStep / (timeline.length - 1)) * 90}%`,
            backgroundColor: accentColor
          }}
        />

        <div className="grid grid-cols-5 gap-2 relative z-10">
          {timeline.map((step, idx) => {
            const isActive = idx === activeStep;
            const isPassed = idx < activeStep;

            return (
              <button
                key={idx}
                onClick={() => {
                  spaceAudio.playClick();
                  setActiveStep(idx);
                }}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-white bg-slate-900 scale-110 shadow-lg' 
                      : isPassed
                      ? 'border-cyan-500 bg-slate-900 text-cyan-400'
                      : 'border-slate-700 bg-slate-950 text-slate-500 hover:border-slate-500'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 16px ${accentColor}` : 'none',
                    borderColor: isActive ? accentColor : undefined
                  }}
                >
                  {getStepIcon(idx, timeline.length)}
                </div>
                <span className="text-[10px] font-mono mt-2 text-slate-400 group-hover:text-slate-200 truncate w-full px-1">
                  {step.phase}
                </span>
                <span className="text-xs font-bold text-slate-300 truncate w-full px-1">
                  {step.date.split('(')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Milestone Detailed Showcase Card */}
      <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 relative overflow-hidden transition-all duration-300">
        <div 
          className="absolute top-0 left-0 w-1.5 h-full"
          style={{ backgroundColor: accentColor }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}40`
              }}
            >
              {timeline[activeStep].phase}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {timeline[activeStep].date}
            </span>
          </div>

          {/* Step switcher arrows */}
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              onClick={() => {
                spaceAudio.playClick();
                setActiveStep(prev => Math.max(prev - 1, 0));
              }}
              disabled={activeStep === 0}
              className="p-1 rounded bg-slate-900 border border-slate-800 disabled:opacity-30 hover:bg-slate-800 text-slate-300 text-xs px-2"
            >
              Previous
            </button>
            <button
              onClick={() => {
                spaceAudio.playClick();
                setActiveStep(prev => Math.min(prev + 1, timeline.length - 1));
              }}
              disabled={activeStep === timeline.length - 1}
              className="p-1 rounded bg-slate-900 border border-slate-800 disabled:opacity-30 hover:bg-slate-800 text-slate-300 text-xs px-2"
            >
              Next
            </button>
          </div>
        </div>

        <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
          {timeline[activeStep].title}
        </h4>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {timeline[activeStep].detail}
        </p>
      </div>

      {/* Mobile Vertical Stepper View */}
      <div className="md:hidden mt-6 space-y-3">
        {timeline.map((step, idx) => (
          <button
            key={idx}
            onClick={() => {
              spaceAudio.playClick();
              setActiveStep(idx);
            }}
            className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
              idx === activeStep 
                ? 'bg-slate-900 border-cyan-500 text-white' 
                : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
            }`}
          >
            <div>
              <span className="font-mono text-[10px] text-cyan-400 block">{step.phase} • {step.date}</span>
              <span className="font-semibold">{step.title}</span>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 text-slate-500" />
          </button>
        ))}
      </div>
    </div>
  );
}
