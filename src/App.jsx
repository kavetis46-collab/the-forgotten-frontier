import React, { useState, useEffect } from 'react';
import CosmicBackground from './components/CosmicBackground';
import Navbar from './components/Navbar';
import OpeningView from './components/OpeningView';
import IntroView from './components/IntroView';
import DestinationView from './components/DestinationView';
import MissionDetailView from './components/MissionDetailView';
import LearningsView from './components/LearningsView';
import FlightLogDrawer from './components/FlightLogDrawer';
import RocketFlybyTransition from './components/RocketFlybyTransition';
import SolarSystemScrollHUD from './components/SolarSystemScrollHUD';
import { MISSIONS } from './data/missionsData';
import { spaceAudio } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState('hero'); // 'hero' | 'intro' | 'destination' | 'mission' | 'learn'
  const [currentMissionId, setCurrentMissionId] = useState('apollo-11-descent-stage');
  const [isWarping, setIsWarping] = useState(false);
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [targetLabel, setTargetLabel] = useState('');
  const [pendingNav, setPendingNav] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [flightLogOpen, setFlightLogOpen] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('forgotten_frontier_badges');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  // Launch the realistic rocket on initial page entry (bottom-left to top-right ascending launch!)
  useEffect(() => {
    const entryTimer = setTimeout(() => {
      setTargetLabel('SYSTEM LAUNCH: ENTERING THE FORGOTTEN FRONTIER');
      setIsRocketLaunching(true);
      setTimeout(() => {
        setIsRocketLaunching(false);
      }, 1350);
    }, 450);

    return () => clearTimeout(entryTimer);
  }, []);

  // Track scroll percentage for the global top bar indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Current active mission object
  const activeMission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];
  const targetBody = currentView === 'mission' ? activeMission.body : (currentView === 'destination' ? 'both' : 'moon');

  // Handle Audio Mute/Unmute
  const handleToggleAudio = () => {
    const isUnmuted = spaceAudio.toggleMute();
    setIsAudioMuted(!isUnmuted);
  };

  // Universal Navigation Handler with Ascending Diagonal Rocket Launch
  const handleNavigate = (view, missionId = null, label = '') => {
    if (isRocketLaunching) return;

    let displayLabel = label;
    if (!displayLabel) {
      if (view === 'hero') displayLabel = 'TRAJECTORY: ORBITAL PANORAMA';
      else if (view === 'intro') displayLabel = 'TRAJECTORY: PROLOGUE ARCHIVE';
      else if (view === 'destination') displayLabel = 'TRAJECTORY: DESTINATION MATRIX';
      else if (view === 'mission') {
        const targetM = MISSIONS.find(m => m.id === missionId) || activeMission;
        displayLabel = `TRAJECTORY: ${targetM.artifact.toUpperCase()}`;
      } else if (view === 'learn') displayLabel = 'TRAJECTORY: SYNTHESIS & REFLECTION';
    }

    setTargetLabel(displayLabel);
    setPendingNav({ view, missionId });
    setIsRocketLaunching(true);
    setIsWarping(true);

    spaceAudio.playRocketFlyby();

    setTimeout(() => {
      setIsRocketLaunching(false);
      setIsWarping(false);
    }, 1350);
  };

  // Midpoint handoff at 550ms
  const handleTransitionMidpoint = () => {
    if (pendingNav) {
      if (pendingNav.missionId) {
        setCurrentMissionId(pendingNav.missionId);
      }
      setCurrentView(pendingNav.view);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPendingNav(null);
    }
  };

  const handleStartJourney = () => {
    handleNavigate('destination', null, 'ASCENT TRAJECTORY: LUNAR & MARTIAN DESTINATIONS');
  };

  const handleTriggerManualRocket = () => {
    if (isRocketLaunching) return;
    setTargetLabel('MANUAL TELEMETRY: ASCENDING RECONNAISSANCE FLYBY');
    setIsRocketLaunching(true);
    spaceAudio.playRocketFlyby();
    setTimeout(() => {
      setIsRocketLaunching(false);
    }, 1350);
  };

  const handleCompleteQuiz = (missionId, badgeName) => {
    if (!unlockedBadges.includes(badgeName)) {
      const updated = [...unlockedBadges, badgeName];
      setUnlockedBadges(updated);
      try {
        localStorage.setItem('forgotten_frontier_badges', JSON.stringify(updated));
      } catch (_) {}
    }
  };

  // ================= AUTOMATIC MISSION PROGRESSION LOGIC =================
  // Moon (3) -> Auto advances across Moon 1, 2, 3 -> Automatically launches to Mars!
  // Mars (3) -> Auto advances across Mars 1, 2, 3 -> Automatically launches to Moon!
  // When both topics (all 6) are complete, automatically launches to What Did We Learn?
  const handleAutoAdvance = (completedMissionId) => {
    const moonIds = ['apollo-11-descent-stage', 'apollo-15-rover', 'lunar-retroreflector'];
    const marsIds = ['opportunity-rover', 'ingenuity-helicopter', 'viking-1-lander'];

    if (completedMissionId === 'apollo-11-descent-stage') {
      handleNavigate('mission', 'apollo-15-rover', 'TRAJECTORY: APOLLO 15 LUNAR ROVER');
    } else if (completedMissionId === 'apollo-15-rover') {
      handleNavigate('mission', 'lunar-retroreflector', 'TRAJECTORY: LASER RETROREFLECTOR');
    } else if (completedMissionId === 'lunar-retroreflector') {
      // All 3 Moon missions complete! Check if any Mars missions remain uncompleted
      const remainingMars = marsIds.filter(id => {
        const m = MISSIONS.find(item => item.id === id);
        return !unlockedBadges.includes(m?.quiz.badgeName);
      });

      if (remainingMars.length > 0) {
        const nextMars = MISSIONS.find(item => item.id === remainingMars[0]);
        handleNavigate('mission', remainingMars[0], `🌕 3 MOON MISSIONS COMPLETE ➔ LAUNCHING TO MARS: ${nextMars?.artifact.toUpperCase()}`);
      } else {
        handleNavigate('learn', null, 'ALL 6 EXPEDITIONS COMPLETE ➔ PROCEEDING TO WHAT WE LEARNED');
      }
    } else if (completedMissionId === 'opportunity-rover') {
      handleNavigate('mission', 'ingenuity-helicopter', 'TRAJECTORY: INGENUITY HELICOPTER');
    } else if (completedMissionId === 'ingenuity-helicopter') {
      handleNavigate('mission', 'viking-1-lander', 'TRAJECTORY: VIKING 1 LANDER');
    } else if (completedMissionId === 'viking-1-lander') {
      // All 3 Mars missions complete! Check if any Moon missions remain uncompleted
      const remainingMoon = moonIds.filter(id => {
        const m = MISSIONS.find(item => item.id === id);
        return !unlockedBadges.includes(m?.quiz.badgeName);
      });

      if (remainingMoon.length > 0) {
        const nextMoon = MISSIONS.find(item => item.id === remainingMoon[0]);
        handleNavigate('mission', remainingMoon[0], `🔴 3 MARS MISSIONS COMPLETE ➔ LAUNCHING TO THE MOON: ${nextMoon?.artifact.toUpperCase()}`);
      } else {
        handleNavigate('learn', null, 'ALL 6 EXPEDITIONS COMPLETE ➔ PROCEEDING TO WHAT WE LEARNED');
      }
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#02040a] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans ${isRocketLaunching ? 'screen-rumble' : ''}`}>
      
      {/* Three.js Interactive 3D Cosmic Background (Real NASA Textures + Shining Twinkling Stars) */}
      <CosmicBackground 
        currentView={currentView}
        targetBody={targetBody}
        isWarping={isWarping}
      />

      {/* Atmospheric Galaxy Nebula Glow Overlay */}
      <div className="fixed inset-0 galaxy-nebula-glow pointer-events-none z-0" />

      {/* Top Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-950/80 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 transition-all duration-150 ease-out shadow-lg shadow-purple-500/50"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Photorealistic Orbital Aerospace Rocket Ascent Transition (Ascending 33° Graph Vector) */}
      <RocketFlybyTransition
        isActive={isRocketLaunching}
        onTransitionMidpoint={handleTransitionMidpoint}
        targetLabel={targetLabel}
      />

      {/* Interactive Solar System Scroll HUD Mini-Map Radar */}
      <SolarSystemScrollHUD onTriggerRocket={handleTriggerManualRocket} />

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        currentMissionId={currentMissionId}
        missions={MISSIONS}
        unlockedBadges={unlockedBadges}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onNavigate={handleNavigate}
        onOpenFlightLog={() => setFlightLogOpen(true)}
        onTriggerRocket={handleTriggerManualRocket}
      />

      {/* Main Dynamic View Controller */}
      <main className="relative z-10">
        {/* PAGE 1: A Beautiful Space Opening */}
        {currentView === 'hero' && (
          <OpeningView
            onBegin={() => handleNavigate('intro', null, 'ASCENT: ENTER THE COSMOS')}
            onEnableSound={handleToggleAudio}
            isAudioMuted={isAudioMuted}
          />
        )}

        {/* PAGE 2: The Forgotten Frontier Prologue */}
        {currentView === 'intro' && (
          <IntroView
            onStartJourney={handleStartJourney}
            onBackToOpening={() => handleNavigate('hero', null, 'ASCENT: ORBITAL PANORAMA')}
          />
        )}

        {/* PAGE 3: Choose Your Destination (The Moon & Mars) */}
        {currentView === 'destination' && (
          <DestinationView
            missions={MISSIONS}
            onSelectMission={(id) => {
              const m = MISSIONS.find(item => item.id === id);
              handleNavigate('mission', id, `ASCENT: ${m ? m.artifact.toUpperCase() : 'MISSION'}`);
            }}
            unlockedBadges={unlockedBadges}
            onGoToLearn={() => handleNavigate('learn', null, 'ASCENT: WHAT WE LEARNED')}
          />
        )}

        {/* PAGE 4 & 5: Individual Mission Pages (Story, Timeline, Interactive Map, Facts, Quiz with Auto-Advance) */}
        {currentView === 'mission' && (
          <MissionDetailView
            mission={activeMission}
            allMissions={MISSIONS}
            onBackToDestinations={() => handleNavigate('destination', null, 'ASCENT: CELESTIAL HUB')}
            onSelectMission={(id) => {
              if (id === 'learn') {
                handleNavigate('learn', null, 'ASCENT: WHAT WE LEARNED');
              } else {
                const m = MISSIONS.find(item => item.id === id);
                handleNavigate('mission', id, `ASCENT: ${m ? m.artifact.toUpperCase() : 'MISSION'}`);
              }
            }}
            onCompleteQuiz={handleCompleteQuiz}
            unlockedBadges={unlockedBadges}
            onAutoAdvance={handleAutoAdvance}
          />
        )}

        {/* PAGE 6: What Did We Learn? */}
        {currentView === 'learn' && (
          <LearningsView
            unlockedBadges={unlockedBadges}
            totalMissions={MISSIONS.length}
            onRestartJourney={() => handleNavigate('hero', null, 'ASCENT: RESTART JOURNEY')}
            onSelectMission={(id) => {
              const m = MISSIONS.find(item => item.id === id);
              handleNavigate('mission', id, `ASCENT: ${m ? m.artifact.toUpperCase() : 'MISSION'}`);
            }}
          />
        )}
      </main>

      {/* Slide-over Astronaut Flight Log Drawer */}
      <FlightLogDrawer
        isOpen={flightLogOpen}
        onClose={() => setFlightLogOpen(false)}
        missions={MISSIONS}
        unlockedBadges={unlockedBadges}
        onSelectMission={(id) => handleNavigate('mission', id)}
        onGoToLearn={() => handleNavigate('learn', null, 'ASCENT: WHAT WE LEARNED')}
      />

      {/* Global Cinematic Letterbox HUD Lines */}
      <div className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-50" />
      <div className="fixed bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none z-50" />
    </div>
  );
}
