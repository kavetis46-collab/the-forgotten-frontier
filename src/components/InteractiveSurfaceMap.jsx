import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Layers, 
  Compass, 
  Crosshair, 
  Radio, 
  Maximize2, 
  Minimize2, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function InteractiveSurfaceMap({ mission }) {
  const [viewMode, setViewMode] = useState('satellite'); // 'satellite' | 'globe3d'
  const [zoomLevel, setZoomLevel] = useState(1.4);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showTerrainFilter, setShowTerrainFilter] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [targetLocked, setTargetLocked] = useState(true);

  const containerRef = useRef(null);
  const globeContainerRef = useRef(null);

  const isMoon = mission.body === 'moon';
  const themeColor = isMoon ? '#38bdf8' : '#f97316';

  // Handle Zoom
  const handleZoomIn = () => {
    spaceAudio.playClick();
    setZoomLevel(prev => Math.min(prev + 0.5, 4.5));
  };

  const handleZoomOut = () => {
    spaceAudio.playClick();
    setZoomLevel(prev => Math.max(prev - 0.5, 1.0));
  };

  const handleReset = () => {
    spaceAudio.playClick();
    setZoomLevel(1.4);
    setPanOffset({ x: 0, y: 0 });
    setSelectedFeature(null);
    setTargetLocked(true);
  };

  // Mouse drag-to-pan handlers
  const handleMouseDown = (e) => {
    if (viewMode !== 'satellite') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || viewMode !== 'satellite') return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
    setTargetLocked(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile phones & tablets
  const handleTouchStart = (e) => {
    if (viewMode !== 'satellite' || !e.touches[0]) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX - panOffset.x, y: e.touches[0].clientY - panOffset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || viewMode !== 'satellite' || !e.touches[0]) return;
    setPanOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
    setTargetLocked(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 3D Mini-Globe setup when viewMode is 'globe3d'
  useEffect(() => {
    if (viewMode !== 'globe3d' || !globeContainerRef.current) return;

    const el = globeContainerRef.current;
    const width = el.clientWidth;
    const height = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    el.innerHTML = '';
    el.appendChild(renderer.domElement);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x334155, 0.8));

    // Load actual texture for globe
    const texPath = isMoon ? '/textures/moon.jpg' : '/textures/mars.jpg';
    const texture = new THREE.TextureLoader().load(texPath);

    const sphereGeo = new THREE.SphereGeometry(1.4, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globe);

    // Marker Beacon at Coordinates
    const markerGroup = new THREE.Group();
    const latRad = (mission.coordinates.lat * Math.PI) / 180;
    const lngRad = (mission.coordinates.lng * Math.PI) / 180;
    const radius = 1.42;

    const mx = radius * Math.cos(latRad) * Math.sin(lngRad);
    const my = radius * Math.sin(latRad);
    const mz = radius * Math.cos(latRad) * Math.cos(lngRad);

    const pinMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({ color: isMoon ? 0x38bdf8 : 0xef4444 })
    );
    pinMesh.position.set(mx, my, mz);
    markerGroup.add(pinMesh);

    const ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.06, 0.09, 32),
      new THREE.MeshBasicMaterial({ 
        color: isMoon ? 0x38bdf8 : 0xef4444, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.75 
      })
    );
    ringMesh.position.set(mx, my, mz);
    ringMesh.lookAt(mx * 2, my * 2, mz * 2);
    markerGroup.add(ringMesh);
    globe.add(markerGroup);

    let isUserInteracting = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotationY = -lngRad + Math.PI / 2;
    let targetRotationX = latRad;

    globe.rotation.y = targetRotationY;
    globe.rotation.x = targetRotationX;

    const handlePointerDown = (e) => {
      isUserInteracting = true;
      prevPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const handlePointerMove = (e) => {
      if (!isUserInteracting) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;
      globe.rotation.y += deltaX * 0.008;
      globe.rotation.x += deltaY * 0.008;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const handlePointerUp = () => {
      isUserInteracting = false;
    };

    el.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    let frameId;
    const render = () => {
      frameId = requestAnimationFrame(render);
      if (!isUserInteracting) {
        globe.rotation.y += 0.002;
      }
      const scale = 1 + Math.sin(Date.now() * 0.006) * 0.25;
      ringMesh.scale.set(scale, scale, 1);
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
    };
  }, [viewMode, isMoon, mission]);

  return (
    <div 
      className={`relative w-full rounded-2xl overflow-hidden border transition-all duration-300 ${
        isFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-[#070b14]' : 'bg-[#090d16] border-slate-800 shadow-2xl'
      }`}
      style={{ minHeight: isFullscreen ? 'auto' : '440px' }}
    >
      {/* HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Radio className={`w-3.5 h-3.5 animate-pulse ${isMoon ? 'text-cyan-400' : 'text-orange-500'}`} />
            <span className="font-telemetry text-[11px] sm:text-xs tracking-wider uppercase text-slate-300">
              NASA RECON TELEMETRY
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
            <Compass className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-cyan-400">{mission.coordinates.latFormatted}</span>,
            <span className="text-cyan-400">{mission.coordinates.lngFormatted}</span>
          </div>
        </div>

        {/* View Mode & Control Toggles */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="flex bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-[11px] sm:text-xs">
            <button
              onClick={() => { spaceAudio.playClick(); setViewMode('satellite'); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'satellite' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite Map
            </button>
            <button
              onClick={() => { spaceAudio.playClick(); setViewMode('globe3d'); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'globe3d' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Globe
            </button>
          </div>

          <button
            onClick={() => { spaceAudio.playClick(); setIsFullscreen(!isFullscreen); }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area (Touch-friendly & Responsive) */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-[380px] sm:h-[480px] md:h-[520px] overflow-hidden select-none touch-none ${
          viewMode === 'satellite' ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        {viewMode === 'satellite' ? (
          <>
            {/* Satellite Background Layer with Pan & Zoom */}
            <div
              className="absolute inset-0 transition-transform duration-75 ease-out origin-center flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
              }}
            >
              {/* NASA High-Res Surface Recon Image */}
              <img
                src={mission.mapData.orbitalImageryUrl}
                alt={mission.mapData.orbitalCaption}
                className="w-[800px] h-[600px] object-cover max-w-none rounded-lg shadow-2xl pointer-events-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              {/* Procedural Backup Surface */}
              <div 
                className="w-[800px] h-[600px] absolute inset-0 -z-10 rounded-lg"
                style={{
                  background: isMoon 
                    ? 'radial-gradient(circle at 45% 45%, #475569 0%, #334155 45%, #1e293b 85%)'
                    : 'radial-gradient(circle at 45% 45%, #9a3412 0%, #7c2d12 45%, #431407 85%)'
                }}
              />

              {/* Topographic Grid Overlay */}
              {showGrid && (
                <div 
                  className="absolute inset-0 w-[800px] h-[600px] pointer-events-none opacity-30"
                  style={{
                    backgroundImage: `linear-gradient(${themeColor} 1px, transparent 1px), linear-gradient(90deg, ${themeColor} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
              )}

              {/* Center Target Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                <div className="w-14 h-14 rounded-full border border-dashed border-cyan-400/60 animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crosshair className="w-5 h-5 text-cyan-400 drop-shadow" />
                </div>
              </div>

              {/* Interactive NASA Hotspots */}
              {mission.mapData.features.map((feat, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    spaceAudio.playClick();
                    setSelectedFeature(feat);
                  }}
                  className="absolute z-20 cursor-pointer pointer-events-auto group p-2"
                  style={{
                    left: `${feat.offset.x}%`,
                    top: `${feat.offset.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <span 
                      className="absolute w-7 h-7 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: themeColor }}
                    />
                    <div 
                      className="relative p-1.5 rounded-full shadow-lg border border-white/50 text-slate-950 font-bold transition-transform group-hover:scale-125"
                      style={{ backgroundColor: themeColor }}
                    >
                      <MapPin className="w-3 h-3 text-slate-950" />
                    </div>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block whitespace-nowrap z-30">
                    <div className="bg-slate-950/90 text-white text-[11px] px-2 py-0.5 rounded border border-slate-700 shadow-xl backdrop-blur-md">
                      <p className="font-semibold text-cyan-400">{feat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* In-Map Floating Zoom Controls */}
            <div className="absolute right-3 bottom-3 flex flex-col gap-2 z-20">
              <div className="flex flex-col bg-slate-900/90 border border-slate-700 rounded-lg p-1 backdrop-blur-md shadow-xl">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 sm:p-2 hover:bg-slate-800 text-slate-200 rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-center font-mono py-0.5 text-slate-400 border-y border-slate-800">
                  {zoomLevel.toFixed(1)}x
                </div>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 sm:p-2 hover:bg-slate-800 text-slate-200 rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col bg-slate-900/90 border border-slate-700 rounded-lg p-1 backdrop-blur-md shadow-xl">
                <button
                  onClick={handleReset}
                  className="p-1.5 sm:p-2 hover:bg-slate-800 text-slate-200 rounded transition-colors"
                  title="Recenter Map"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { spaceAudio.playClick(); setShowGrid(!showGrid); }}
                  className={`p-1.5 sm:p-2 rounded transition-colors ${showGrid ? 'text-cyan-400 bg-slate-800' : 'text-slate-400 hover:bg-slate-800'}`}
                  title="Toggle Grid"
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Touch Drag Hint */}
            <div className="absolute bottom-3 left-3 pointer-events-none sm:hidden">
              <span className="px-2 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400 backdrop-blur-xs">
                Drag to pan • Pinch / tap buttons to zoom
              </span>
            </div>
          </>
        ) : (
          /* 3D Rotatable Globe Mode */
          <div className="relative w-full h-full flex items-center justify-center">
            <div ref={globeContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none" />
            <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 bg-slate-900/80 border border-slate-700 rounded-full text-xs text-slate-300 font-mono backdrop-blur-sm">
                Drag to spin the {isMoon ? 'Moon' : 'Mars'} • Glowing beacon marks {mission.siteName}
              </span>
            </div>
          </div>
        )}

        {/* Selected Feature Info Modal Card */}
        {selectedFeature && (
          <div className="absolute left-3 bottom-3 max-w-[280px] sm:max-w-sm bg-slate-950/95 border border-cyan-500/40 rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl z-30 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase">
                  LANDMARK IDENTIFIER
                </span>
                <h4 className="font-bold text-white text-xs sm:text-sm">{selectedFeature.label}</h4>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800 ml-2"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-2 leading-relaxed">
              {selectedFeature.note}
            </p>
          </div>
        )}
      </div>

      {/* Map Footer Telemetry Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-950/90 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px]">
            ELEV
          </div>
          <div className="truncate">
            <p className="text-slate-400 text-[10px]">Site Elevation</p>
            <p className="font-semibold text-slate-200 text-xs truncate">{mission.mapData.elevation}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px]">
            PROX
          </div>
          <div className="truncate">
            <p className="text-slate-400 text-[10px]">Surrounding Geography</p>
            <p className="font-semibold text-slate-200 text-xs truncate">{mission.mapData.craterProximity}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px]">
            DIST
          </div>
          <div className="truncate">
            <p className="text-slate-400 text-[10px]">Range to Earth Home</p>
            <p className="font-semibold text-slate-200 text-xs truncate">{mission.distanceFromEarth}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
