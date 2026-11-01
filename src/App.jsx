import React, { useState, useEffect, useRef } from 'react';
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

  const rocketTimerRef = useRef(null);

  // Trigger rocket launch on initial entrance (welcoming the user into space)
  useEffect(() => {
    const entryTimer = setTimeout(() => {
      triggerRocketAnimation('SYSTEM LAUNCH: ENTERING THE FORGOTTEN FRONTIER');
    }, 400);

    return () => clearTimeout(entryTimer);
  }, []);

  // Track scroll percentage for global progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Current active mission object (guaranteed up-to-date)
  const activeMission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];
  const targetBody = currentView === 'mission' ? activeMission.body : (currentView === 'destination' ? 'both' : 'moon');

  // Trigger realistic rocket launch animation helper
  const triggerRocketAnimation = (label = '') => {
    if (rocketTimerRef.current) {
      clearTimeout(rocketTimerRef.current);
    }

    setTargetLabel(label || 'ORBITAL TRAJECTORY INSERTION');
    setIsRocketLaunching(true);
    setIsWarping(true);

    spaceAudio.playRocketFlyby();

    rocketTimerRef.current = setTimeout(() => {
      setIsRocketLaunching(false);
      setIsWarping(false);
    }, 1350);
  };

  // Universal Navigation Handler (Guarantees instant mission ID update + Rocket launch for EVERY section!)
  const handleNavigate = (view, missionId = null, label = '') => {
    // 1. Immediately update mission ID if specified (prevents repeating the first mission!)
    if (missionId) {
      setCurrentMissionId(missionId);
    }

    // 2. Immediately update view & scroll to top
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 3. Determine descriptive telemetry label
    let displayLabel = label;
    if (!displayLabel) {
      if (view === 'hero') displayLabel = 'TRAJECTORY: ORBITAL PANORAMA';
      else if (view === 'intro') displayLabel = 'TRAJECTORY: PROLOGUE ARCHIVE';
      else if (view === 'destination') displayLabel = 'TRAJECTORY: DESTINATION MATRIX';
      else if (view === 'mission') {
        const targetM = MISSIONS.find(m => m.id === (missionId || currentMissionId));
        displayLabel = `TRAJECTORY: ${targetM ? targetM.artifact.toUpperCase() : 'MISSION'}`;
      } else if (view === 'learn') displayLabel = 'TRAJECTORY: SYNTHESIS & REFLECTION';
    }

    // 4. Fire the rocket launch transition on EVERY section change
    triggerRocketAnimation(displayLabel);
  };

  // Begin journey from Page 2
  const handleStartJourney = () => {
    handleNavigate('destination', null, 'ASCENT TRAJECTORY: LUNAR & MARTIAN DESTINATIONS');
  };

  // Audio Toggle
  const handleToggleAudio = () => {
    const isUnmuted = spaceAudio.toggleMute();
    setIsAudioMuted(!isUnmuted);
  };

  // Manual Rocket Button
  const handleTriggerManualRocket = () => {
    triggerRocketAnimation('MANUAL TELEMETRY: ASCENDING RECONNAISSANCE FLYBY');
  };

  // Handle Quiz completion badge persistence
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
  // Moon 1 (Apollo 11) -> Moon 2 (Apollo 15) -> Moon 3 (Laser Retroreflector) -> Mars 1 (Opportunity)
  // Mars 1 (Opportunity) -> Mars 2 (Ingenuity) -> Mars 3 (Viking 1) -> Moon 1 (Apollo 11)
  // When all 6 are completed -> launches to What Did We Learn?
  const handleAutoAdvance = (completedMissionId) => {
    const moonIds = ['apollo-11-descent-stage', 'apollo-15-rover', 'lunar-retroreflector'];
    const marsIds = ['opportunity-rover', 'ingenuity-helicopter', 'viking-1-lander'];

    if (completedMissionId === 'apollo-11-descent-stage') {
      // Advance to Moon Mission 2
      handleNavigate('mission', 'apollo-15-rover', 'TRAJECTORY: APOLLO 15 LUNAR ROVER');
    } else if (completedMissionId === 'apollo-15-rover') {
      // Advance to Moon Mission 3
      handleNavigate('mission', 'lunar-retroreflector', 'TRAJECTORY: LASER RETROREFLECTOR');
    } else if (completedMissionId === 'lunar-retroreflector') {
      // All 3 Moon missions finished! Auto-advance to Mars!
      const remainingMars = marsIds.filter(id => {
        const m = MISSIONS.find(item => item.id === id);
        return !unlockedBadges.includes(m?.quiz.badgeName);
      });

      if (remainingMars.length > 0) {
        const nextMarsId = remainingMars[0];
        const nextMars = MISSIONS.find(item => item.id === nextMarsId);
        handleNavigate('mission', nextMarsId, `🌕 3 MOON MISSIONS COMPLETE ➔ LAUNCHING TO MARS: ${nextMars?.artifact.toUpperCase()}`);
      } else {
        // Both Moon and Mars are done!
        handleNavigate('learn', null, 'ALL 6 EXPEDITIONS COMPLETE ➔ WHAT DID WE LEARN?');
      }
    } else if (completedMissionId === 'opportunity-rover') {
      // Advance to Mars Mission 2
      handleNavigate('mission', 'ingenuity-helicopter', 'TRAJECTORY: INGENUITY HELICOPTER');
    } else if (completedMissionId === 'ingenuity-helicopter') {
      // Advance to Mars Mission 3
      handleNavigate('mission', 'viking-1-lander', 'TRAJECTORY: VIKING 1 LANDER');
    } else if (completedMissionId === 'viking-1-lander') {
      // All 3 Mars missions finished! Auto-advance to Moon!
      const remainingMoon = moonIds.filter(id => {
        const m = MISSIONS.find(item => item.id === id);
        return !unlockedBadges.includes(m?.quiz.badgeName);
      });

      if (remainingMoon.length > 0) {
        const nextMoonId = remainingMoon[0];
        const nextMoon = MISSIONS.find(item => item.id === nextMoonId);
        handleNavigate('mission', nextMoonId, `🔴 3 MARS MISSIONS COMPLETE ➔ LAUNCHING TO THE MOON: ${nextMoon?.artifact.toUpperCase()}`);
      } else {
        // Both Moon and Mars are done!
        handleNavigate('learn', null, 'ALL 6 EXPEDITIONS COMPLETE ➔ WHAT DID WE LEARN?');
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
        targetLabel={targetLabel}
      />

      {/* Interactive Solar System Scroll HUD Mini-Map Radar (Desktop & Tablet) */}
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
            key={activeMission.id} // Re-mount key ensures clean state on every mission change!
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
