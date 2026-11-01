import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, HelpCircle, ArrowRight, Rocket } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function MissionQuiz({ 
  mission, 
  onCompleteQuiz, 
  isUnlocked, 
  onAutoAdvance,
  nextTargetName 
}) {
  const quiz = mission.quiz;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // Reset state when mission changes
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCountdown(null);
  }, [mission.id]);

  // Handle countdown timer when answered correctly
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      if (onAutoAdvance) {
        onAutoAdvance(mission.id);
      }
    }
  }, [countdown, mission.id, onAutoAdvance]);

  const handleSelectOption = (index) => {
    if (isAnswered && isCorrect) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === quiz.correctIndex) {
      setIsCorrect(true);
      spaceAudio.playSuccess();

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.75 },
          colors: mission.body === 'moon' ? ['#38bdf8', '#e2e8f0', '#fbbf24'] : ['#f97316', '#ef4444', '#fbbf24']
        });
      } catch (_) {}

      if (onCompleteQuiz) {
        onCompleteQuiz(mission.id, quiz.badgeName);
      }

      // Start 3-second auto-advance countdown to next mission/destination
      setCountdown(3);
    } else {
      setIsCorrect(false);
      spaceAudio.playWrong();
    }
  };

  const handleRetry = () => {
    spaceAudio.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCountdown(null);
  };

  const handleManualAdvance = () => {
    setCountdown(null);
    if (onAutoAdvance) {
      onAutoAdvance(mission.id);
    }
  };

  return (
    <div className="relative glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: mission.accentColor }}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
              MISSION DEBRIEF CHALLENGE
            </span>
            <h3 className="text-lg font-bold text-white">Knowledge Check</h3>
          </div>
        </div>

        {/* Badge Unlocked Pill */}
        {isUnlocked && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Award className="w-4 h-4" />
            <span>Badge Earned: {quiz.badgeName}</span>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
          {quiz.question}
        </p>
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {quiz.options.map((option, idx) => {
          let btnStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200';

          if (isAnswered) {
            if (idx === quiz.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500';
            } else if (idx === selectedOption) {
              btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500';
            } else {
              btnStyle = 'border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered && isCorrect}
              className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm sm:text-base font-medium transition-all ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-950/80 border border-slate-700 flex items-center justify-center font-mono text-xs text-slate-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isAnswered && idx === quiz.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              )}
              {isAnswered && idx === selectedOption && idx !== quiz.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Automatic Progression Banner */}
      {isAnswered && (
        <div 
          className={`p-5 rounded-xl border animate-fade-in ${
            isCorrect 
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-100 shadow-xl' 
              : 'bg-rose-950/40 border-rose-500/30 text-rose-100'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm text-emerald-300">
                      Correct! Mission Specialist Distinction Awarded
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-sm text-rose-300">
                      Telemetry Mismatch — Review the Archives
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {quiz.explanation}
              </p>

              {/* Automatic Progression Notification */}
              {isCorrect && countdown !== null && (
                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <Rocket className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>
                      Advancing to <strong className="text-white">{nextTargetName || 'Next Mission'}</strong> in <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-bold">{countdown}s</span>...
                    </span>
                  </div>

                  <button
                    onClick={handleManualAdvance}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-lg shadow-emerald-500/20 shrink-0"
                  >
                    <span>Launch Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {!isCorrect && (
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
