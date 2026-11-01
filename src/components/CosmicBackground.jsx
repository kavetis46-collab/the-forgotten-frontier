import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Create a realistic shining star sprite texture with soft luminous core and diffraction glow
function createRealisticStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const cx = 32;
  const cy = 32;

  // Soft luminous radial glow
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.12, 'rgba(235, 245, 255, 0.95)');
  grad.addColorStop(0.28, 'rgba(56, 189, 248, 0.5)');
  grad.addColorStop(0.55, 'rgba(168, 85, 247, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  // Subtle 4-point diffraction spike for realistic telescope shine
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 18, cy);
  ctx.lineTo(cx + 18, cy);
  ctx.moveTo(cx, cy - 18);
  ctx.lineTo(cx, cy + 18);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function CosmicBackground({ currentView, targetBody, isWarping }) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    cameraTarget: new THREE.Vector3(0, 0, 0),
    cameraPos: new THREE.Vector3(0, 2, 28),
    targetCameraPos: new THREE.Vector3(0, 2, 28),
    mouseNorm: { x: 0, y: 0 },
    scrollProgress: 0,
    smoothedScroll: 0
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.006);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2500
    );
    camera.position.set(0, 2, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Texture Loader for real NASA textures stored in public/textures/
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/textures/earth.jpg');
    const moonTexture = textureLoader.load('/textures/moon.jpg');
    const marsTexture = textureLoader.load('/textures/mars.jpg');
    const sunTexture = textureLoader.load('/textures/sun.jpg');
    const jupiterTexture = textureLoader.load('/textures/jupiter.jpg');
    const saturnTexture = textureLoader.load('/textures/saturn.jpg');

    // ================= LIGHTING =================
    // Sun position: radiant light source
    const sunPos = new THREE.Vector3(-38, 0, -22);
    const sunLight = new THREE.PointLight(0xfff5e6, 3.8, 350, 0.6);
    sunLight.position.copy(sunPos);
    scene.add(sunLight);

    // Deep space galaxy ambient light
    const galaxyAmbient = new THREE.AmbientLight(0x1e1538, 0.85);
    scene.add(galaxyAmbient);

    // Subtle celestial fill
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    fillLight.position.set(20, 15, 30);
    scene.add(fillLight);

    // ================= 1. REALISTIC SHINING STARS (NO DOTS!) =================
    const starTexture = createRealisticStarTexture();

    // A. Background Deep Starfield (Realistic shining stars with varied temperatures)
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const radius = 120 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = radius * Math.cos(phi);

      // Star temperature spectrum: blue-white (O/B), pure white (A), warm yellow (G), soft red (M)
      const temp = Math.random();
      if (temp > 0.75) {
        starColors[idx] = 0.75; starColors[idx + 1] = 0.88; starColors[idx + 2] = 1.0; // Blue-white
      } else if (temp > 0.4) {
        starColors[idx] = 0.98; starColors[idx + 1] = 0.98; starColors[idx + 2] = 1.0; // Crisp White
      } else if (temp > 0.15) {
        starColors[idx] = 1.0; starColors[idx + 1] = 0.92; starColors[idx + 2] = 0.72; // Warm Golden
      } else {
        starColors[idx] = 1.0; starColors[idx + 1] = 0.68; starColors[idx + 2] = 0.65; // Soft Amber
      }

      starSizes[i] = 1.8 + Math.random() * 3.2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      map: starTexture,
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // B. Bright Twinkling Foreground Stars
    const brightCount = 180;
    const brightGeo = new THREE.BufferGeometry();
    const brightPositions = new Float32Array(brightCount * 3);
    const brightColors = new Float32Array(brightCount * 3);

    for (let i = 0; i < brightCount; i++) {
      const idx = i * 3;
      const radius = 60 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      brightPositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      brightPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      brightPositions[idx + 2] = radius * Math.cos(phi);

      brightColors[idx] = 0.85 + Math.random() * 0.15;
      brightColors[idx + 1] = 0.90 + Math.random() * 0.10;
      brightColors[idx + 2] = 1.0;
    }

    brightGeo.setAttribute('position', new THREE.BufferAttribute(brightPositions, 3));
    brightGeo.setAttribute('color', new THREE.BufferAttribute(brightColors, 3));

    const brightMat = new THREE.PointsMaterial({
      map: starTexture,
      size: 7.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const brightStarField = new THREE.Points(brightGeo, brightMat);
    scene.add(brightStarField);

    // ================= 2. REAL NASA PLANETS =================
    const solarSystemGroup = new THREE.Group();
    scene.add(solarSystemGroup);

    // --- A. THE REAL SUN ---
    const sunGeo = new THREE.SphereGeometry(9.5, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.copy(sunPos);
    solarSystemGroup.add(sunMesh);

    // Solar Corona Atmosphere Glow
    const coronaGeo = new THREE.SphereGeometry(11.8, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.32,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    sunMesh.add(new THREE.Mesh(coronaGeo, coronaMat));

    // --- B. THE REAL EARTH (Blue Marble Texture + Atmosphere Layer) ---
    const earthGeo = new THREE.SphereGeometry(4.2, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.55,
      metalness: 0.12
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.position.set(-11, 2.5, -4);
    earthMesh.rotation.y = 0.6;
    solarSystemGroup.add(earthMesh);

    // Rayleigh Scattering Atmosphere Halo
    const earthAtmoGeo = new THREE.SphereGeometry(4.45, 48, 48);
    const earthAtmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    earthMesh.add(new THREE.Mesh(earthAtmoGeo, earthAtmoMat));

    // --- C. THE REAL MOON (NASA LRO Texture) ---
    const moonGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.88,
      metalness: 0.05
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(-2, 1.2, 4);
    solarSystemGroup.add(moonMesh);

    // --- D. THE REAL MARS (NASA Viking/MGS Texture) ---
    const marsGeo = new THREE.SphereGeometry(2.4, 64, 64);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTexture,
      roughness: 0.72,
      metalness: 0.1
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.position.set(11, -1.5, -2);
    solarSystemGroup.add(marsMesh);

    // Mars Atmosphere Haze
    const marsAtmoGeo = new THREE.SphereGeometry(2.55, 32, 32);
    const marsAtmoMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.24,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    marsMesh.add(new THREE.Mesh(marsAtmoGeo, marsAtmoMat));

    // --- E. THE REAL JUPITER (Cassini Texture) ---
    const jupiterGeo = new THREE.SphereGeometry(6.4, 64, 64);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTexture,
      roughness: 0.65
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.position.set(38, -3.5, -35);
    solarSystemGroup.add(jupiterMesh);

    // --- F. THE REAL SATURN WITH RINGS (Cassini Texture) ---
    const saturnGeo = new THREE.SphereGeometry(4.8, 64, 64);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: saturnTexture,
      roughness: 0.6
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnMesh.position.set(70, -6.0, -60);
    solarSystemGroup.add(saturnMesh);

    // Saturn Ring System
    const ringGeo = new THREE.RingGeometry(6.2, 12.5, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.82,
      roughness: 0.4
    });
    const saturnRings = new THREE.Mesh(ringGeo, ringMat);
    saturnRings.rotation.x = Math.PI / 2.3;
    saturnRings.rotation.y = 0.2;
    saturnMesh.add(saturnRings);

    // ================= 3. ELEGANT CELESTIAL ORBIT TRACKS =================
    const orbitRadii = [33, 49, 76, 110];
    orbitRadii.forEach((r, idx) => {
      const curve = new THREE.EllipseCurve(-38, -22, r, r * 0.92, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(90);
      const orbGeo = new THREE.BufferGeometry().setFromPoints(
        pts.map(p => new THREE.Vector3(p.x, -2, p.y))
      );
      const orbMat = new THREE.LineDashedMaterial({
        color: idx % 2 === 0 ? 0x38bdf8 : 0xa855f7,
        dashSize: 2.0,
        gapSize: 1.5,
        opacity: 0.18,
        transparent: true
      });
      const orbLine = new THREE.Line(orbGeo, orbMat);
      orbLine.computeLineDistances();
      solarSystemGroup.add(orbLine);
    });

    // ================= 4. FLOATING SATELLITE =================
    const satGroup = new THREE.Group();
    const satBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 })
    );
    satGroup.add(satBody);

    const foilBay = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.3 })
    );
    foilBay.rotation.x = Math.PI / 2;
    foilBay.position.z = 0.5;
    satGroup.add(foilBay);

    const panelGeo = new THREE.BoxGeometry(1.6, 0.04, 0.5);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.1 });
    const leftPanel = new THREE.Mesh(panelGeo, panelMat);
    leftPanel.position.set(-1.1, 0, 0);
    const rightPanel = new THREE.Mesh(panelGeo, panelMat);
    rightPanel.position.set(1.1, 0, 0);
    satGroup.add(leftPanel);
    satGroup.add(rightPanel);

    satGroup.position.set(1.5, 3.8, 12);
    satGroup.scale.set(0.65, 0.65, 0.65);
    scene.add(satGroup);

    // ================= 5. MOUSE PARALLAX & SMOOTH SCROLL =================
    const handleMouseMove = (e) => {
      stateRef.current.mouseNorm.x = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseNorm.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      stateRef.current.scrollProgress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ================= 6. ANIMATION & RENDER LOOP =================
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Fluid scroll damping / lerp
      const state = stateRef.current;
      state.smoothedScroll += (state.scrollProgress - state.smoothedScroll) * 0.065;
      const s = state.smoothedScroll;

      // Realistic slow axial planetary rotations
      sunMesh.rotation.y += 0.03 * delta;
      earthMesh.rotation.y += 0.07 * delta;
      moonMesh.rotation.y += 0.04 * delta;
      marsMesh.rotation.y += 0.06 * delta;
      jupiterMesh.rotation.y += 0.10 * delta;
      saturnMesh.rotation.y += 0.09 * delta;

      // Realistic shining star twinkle (subtle pulsing luminosity)
      const twinkle = 0.85 + Math.sin(elapsed * 2.2) * 0.12;
      brightMat.opacity = Math.min(Math.max(twinkle, 0.7), 1.0);
      starField.rotation.y = elapsed * 0.002;

      // Satellite gentle drift
      satGroup.position.y = 3.8 + Math.sin(elapsed * 0.8) * 0.25;
      satGroup.position.x = 1.5 + Math.cos(elapsed * 0.5) * 0.3;
      satGroup.rotation.y += 0.15 * delta;

      // Scroll-driven camera ascent: pulls back to reveal the ENTIRE Solar System!
      const basePos = state.targetCameraPos;
      const parallaxX = state.mouseNorm.x * (1.2 + s * 1.5);
      const parallaxY = state.mouseNorm.y * (0.8 + s * 1.0);

      const scrollCamX = THREE.MathUtils.lerp(basePos.x, 15, s);
      const scrollCamY = THREE.MathUtils.lerp(basePos.y, 48, s);
      const scrollCamZ = THREE.MathUtils.lerp(basePos.z, 88, s);

      state.cameraPos.x += (scrollCamX + parallaxX - state.cameraPos.x) * (delta * 3.0);
      state.cameraPos.y += (scrollCamY + parallaxY - state.cameraPos.y) * (delta * 3.0);
      state.cameraPos.z += (scrollCamZ - state.cameraPos.z) * (delta * 3.0);

      const targetLookX = THREE.MathUtils.lerp(state.cameraTarget.x, -5, s);
      const targetLookY = THREE.MathUtils.lerp(state.cameraTarget.y, -4, s);
      const targetLookZ = THREE.MathUtils.lerp(state.cameraTarget.z, -15, s);

      camera.position.copy(state.cameraPos);
      camera.lookAt(targetLookX, targetLookY, targetLookZ);

      if (isWarping) {
        starMat.size = 5.5;
        camera.fov = 72;
        camera.updateProjectionMatrix();
      } else {
        starMat.size = 3.2;
        if (camera.fov !== 45) {
          camera.fov = 45;
          camera.updateProjectionMatrix();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      brightGeo.dispose();
      brightMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      marsGeo.dispose();
      marsMat.dispose();
      jupiterGeo.dispose();
      jupiterMat.dispose();
      saturnGeo.dispose();
      saturnMat.dispose();
    };
  }, []);

  // Update base camera targets
  useEffect(() => {
    const state = stateRef.current;
    if (isWarping) {
      state.targetCameraPos.set(0, 0, 10);
      state.cameraTarget.set(0, 0, -50);
      return;
    }

    switch (currentView) {
      case 'hero': // Page 1: Space Opening
        state.targetCameraPos.set(0, 2, 27);
        state.cameraTarget.set(0, 0, 0);
        break;

      case 'intro': // Page 2: Prologue
        state.targetCameraPos.set(-2, 3, 22);
        state.cameraTarget.set(-2, 1, 0);
        break;

      case 'destination': // Page 3: Moon & Mars Hub
        state.targetCameraPos.set(0, 1.0, 19);
        state.cameraTarget.set(0, 0, 0);
        break;

      case 'mission': // Page 4 & 5: Detailed Mission
        if (targetBody === 'moon') {
          state.targetCameraPos.set(-1.2, 1.2, 10);
          state.cameraTarget.set(-2, 1.2, 4);
        } else {
          state.targetCameraPos.set(9.5, -1.0, 7.5);
          state.cameraTarget.set(11, -1.5, -2);
        }
        break;

      case 'learn': // Page 6: What Did We Learn?
        state.targetCameraPos.set(0, 8, 38);
        state.cameraTarget.set(0, 0, -10);
        break;

      default:
        state.targetCameraPos.set(0, 2, 26);
        state.cameraTarget.set(0, 0, 0);
    }
  }, [currentView, targetBody, isWarping]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
