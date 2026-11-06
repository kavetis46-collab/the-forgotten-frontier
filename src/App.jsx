import React, { useState, useEffect } from 'react';
import CosmicBackground from './components/CosmicBackground';
import Navbar from './components/Navbar';
import OpeningView from './components/OpeningView';
import IntroView from './components/IntroView';
import DestinationView from './components/DestinationView';
import MissionDetailView from './components/MissionDetailView';
import LearningsView from './components/LearningsView';
import FlightLogDrawer from './components/FlightLogDrawer';
import SolarSystemScrollHUD from './components/SolarSystemScrollHUD';
import { MISSIONS } from './data/missionsData';
import { spaceAudio } from './utils/audio';

export default function App() {
  // Discrete Page Views: 'hero' (Page 1) | 'intro' (Page 2) | 'destination' (Page 3) | 'learn' (Page 4) | 'mission' (Page 5)
  const [currentView, setCurrentView] = useState('hero');
  const [currentMissionId, setCurrentMissionId] = useState('apollo-11-descent-stage');
  const [isWarping, setIsWarping] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [flightLogOpen, setFlightLogOpen] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('forgotten_frontier_badges');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  // Track scroll percentage within the active page for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Current active mission object (guaranteed up-to-date)
  const activeMission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];
  const targetBody = currentView === 'mission'
    ? activeMission.body
    : (currentView === 'destination' ? 'both' : (currentView === 'intro' ? 'moon' : 'hero'));

  // Universal Navigation Handler: Discrete page switching with instant scroll-to-top
  const handleNavigate = (view, missionId = null) => {
    if (missionId) {
      setCurrentMissionId(missionId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
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
  const handleAutoAdvance = (completedMissionId) => {
    const moonIds = ['apollo-11-descent-stage', 'apollo-15-rover', 'lunar-retroreflector'];
    const marsIds = ['opportunity-rover', 'ingenuity-helicopter', 'viking-1-lander'];

    if (completedMissionId === 'apollo-11-descent-stage') {
      handleNavigate('mission', 'apollo-15-rover');
    } else if (completedMissionId === 'apollo-15-rover') {
      handleNavigate('mission', 'lunar-retroreflector');
    } else if (completedMissionId === 'lunar-retroreflector') {
      const remainingMars = marsIds.filter(id => {
        const m = MISSIONS.find(item => item.id === id);
        return !unlockedBadges.includes(m?.quiz.badgeName);
      });

      if (remainingMars.length > 0) {
        handleNavigate('mission', remainingMars[0]);
      } else {
        handleNavigate('learn');
      }
    } else if (completedMissionId === 'opportunity-rover') {
      handleNavigate('mission', 'ingenuity-helicopter');
    } else if (completedMissionId === 'ingenuity-helicopter') {
      handleNavigate('mission', 'viking-1-lander');
    } else if (completedMissionId === 'viking-1-lander') {
      const remainingMoon = moonIds.filter(id => {
        const m = MISSIONS.find(item => item.id === id);
        return !unlockedBadges.includes(m?.quiz.badgeName);
      });

      if (remainingMoon.length > 0) {
        handleNavigate('mission', remainingMoon[0]);
      } else {
        handleNavigate('learn');
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Three.js Interactive 3D Cosmic Background */}
      <CosmicBackground 
        currentView={currentView}
        targetBody={targetBody}
        isWarping={isWarping}
      />

      {/* Atmospheric Galaxy Nebula Glow Overlay */}
      <div className="fixed inset-0 galaxy-nebula-glow pointer-events-none z-0" />

      {/* Top Global Scroll Progress Bar (active on scrollable views) */}
      {currentView !== 'hero' && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-950/80 pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 transition-all duration-150 ease-out shadow-lg shadow-purple-500/50"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}

      {/* Interactive Solar System Mini-Map Radar (Desktop & Tablet) */}
      <SolarSystemScrollHUD currentView={currentView} onNavigate={handleNavigate} />

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        currentMissionId={currentMissionId}
        missions={MISSIONS}
        unlockedBadges={unlockedBadges}
        onNavigate={handleNavigate}
        onOpenFlightLog={() => setFlightLogOpen(true)}
      />

      {/* Main Dynamic View Controller */}
      <main className="relative z-10">
        {/* PAGE 1: The Opening Hero — No scrolling down allowed; entry strictly via "Enter the Cosmos" */}
        {currentView === 'hero' && (
          <OpeningView
            onBegin={() => {
              handleNavigate('intro');
            }}
          />
        )}

        {/* PAGE 2: The Forgotten Frontier Prologue */}
        {currentView === 'intro' && (
          <div className="min-h-screen py-16 flex flex-col justify-center">
            <IntroView
              onStartJourney={() => {
                handleNavigate('destination');
              }}
              onBackToOpening={() => {
                handleNavigate('hero');
              }}
            />
          </div>
        )}

        {/* PAGE 3: Choose Your Destination (The Moon & Mars) */}
        {currentView === 'destination' && (
          <div className="min-h-screen py-16">
            <DestinationView
              missions={MISSIONS}
              onSelectMission={(id) => {
                handleNavigate('mission', id);
              }}
              unlockedBadges={unlockedBadges}
              onGoToLearn={() => {
                handleNavigate('learn');
              }}
              onBackToIntro={() => {
                handleNavigate('intro');
              }}
            />
          </div>
        )}

        {/* PAGE 4: What Did We Learn? */}
        {currentView === 'learn' && (
          <div className="min-h-screen py-16">
            <LearningsView
              unlockedBadges={unlockedBadges}
              totalMissions={MISSIONS.length}
              onRestartJourney={() => {
                handleNavigate('hero');
              }}
              onBackToDestinations={() => {
                handleNavigate('destination');
              }}
              onSelectMission={(id) => {
                handleNavigate('mission', id);
              }}
            />
          </div>
        )}

        {/* PAGE 5: Individual Mission Pages */}
        {currentView === 'mission' && (
          <MissionDetailView
            key={activeMission.id}
            mission={activeMission}
            allMissions={MISSIONS}
            onBackToDestinations={() => {
              handleNavigate('destination');
            }}
            onSelectMission={(id) => {
              if (id === 'learn') {
                handleNavigate('learn');
              } else {
                handleNavigate('mission', id);
              }
            }}
            onCompleteQuiz={handleCompleteQuiz}
            unlockedBadges={unlockedBadges}
            onAutoAdvance={handleAutoAdvance}
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
        onGoToLearn={() => handleNavigate('learn')}
      />

      {/* Global Cinematic Letterbox HUD Lines */}
      <div className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-50" />
      <div className="fixed bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none z-50" />
    </div>
  );
}
