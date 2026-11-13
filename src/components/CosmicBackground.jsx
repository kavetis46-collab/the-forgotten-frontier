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
    const baseUrl = import.meta.env.BASE_URL;
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(`${baseUrl}textures/earth.jpg`);
    const moonTexture = textureLoader.load(`${baseUrl}textures/moon.jpg`);
    const marsTexture = textureLoader.load(`${baseUrl}textures/mars.jpg`);
    const sunTexture = textureLoader.load(`${baseUrl}textures/sun.jpg`);
    const jupiterTexture = textureLoader.load(`${baseUrl}textures/jupiter.jpg`);
    const saturnTexture = textureLoader.load(`${baseUrl}textures/saturn.jpg`);

    // ================= LIGHTING =================
    // Sun position: cinematic key light from upper-right — illuminates Moon & Mars dramatically
    const sunPos = new THREE.Vector3(55, 30, 40);
    const sunLight = new THREE.PointLight(0xfff5d8, 5.5, 650, 0.45);
    sunLight.position.copy(sunPos);
    scene.add(sunLight);

    // Deep space galaxy ambient — very dark navy so terminator shadows are strong
    const galaxyAmbient = new THREE.AmbientLight(0x0d1020, 0.55);
    scene.add(galaxyAmbient);

    // Subtle cool-blue rim fill from opposite side (adds scientific depth)
    const fillLight = new THREE.DirectionalLight(0x1e40af, 0.45);
    fillLight.position.set(-30, 5, 20);
    scene.add(fillLight);

    // Faint purple nebula scatter to add mystery
    const nebulaLight = new THREE.PointLight(0x7c3aed, 0.6, 200);
    nebulaLight.position.set(0, 20, -30);
    scene.add(nebulaLight);

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

    // --- A. THE REAL SUN (positioned far off-camera as pure light source for hero) ---
    const sunGeo = new THREE.SphereGeometry(9.5, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.copy(sunPos);
    solarSystemGroup.add(sunMesh);

    // Solar Corona Atmosphere Glow
    const coronaGeo = new THREE.SphereGeometry(11.8, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, transparent: true, opacity: 0.32,
      side: THREE.BackSide, blending: THREE.AdditiveBlending
    });
    sunMesh.add(new THREE.Mesh(coronaGeo, coronaMat));

    // =========================================================
    // HERO COMPOSITION: Moon LEFT (large) · Earth CENTRE-BACK
    // (tiny/distant) · Mars RIGHT (large) — cinematic tableau
    // =========================================================

    // --- B. EARTH — tiny, distant, centred in the deep background ---
    const earthGeo = new THREE.SphereGeometry(1.1, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture, roughness: 0.5, metalness: 0.14
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    // Dead centre of frame, pushed very far back so it reads as "distant"
    earthMesh.position.set(0.4, 0.5, -18);
    earthMesh.rotation.y = -0.4;
    solarSystemGroup.add(earthMesh);

    // Thin blue Rayleigh atmosphere glow around distant Earth
    const earthAtmoGeo = new THREE.SphereGeometry(1.22, 48, 48);
    const earthAtmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.28,
      side: THREE.BackSide, blending: THREE.AdditiveBlending
    });
    earthMesh.add(new THREE.Mesh(earthAtmoGeo, earthAtmoMat));

    // --- C. MOON — large, left side of frame, partially off-screen for drama ---
    const moonGeo = new THREE.SphereGeometry(7.8, 128, 128);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture, roughness: 0.92, metalness: 0.03
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    // Left side — large. x=-14 pushes it left, z=2 brings it close so it feels massive
    moonMesh.position.set(-14, -2.5, 2);
    moonMesh.rotation.y = 0.35;
    solarSystemGroup.add(moonMesh);

    // Subtle limb-lighting rim glow (backlit edge from the right to suggest sun)
    const moonRimGeo = new THREE.SphereGeometry(8.1, 64, 64);
    const moonRimMat = new THREE.MeshBasicMaterial({
      color: 0xc0d8f0, transparent: true, opacity: 0.09,
      side: THREE.BackSide, blending: THREE.AdditiveBlending
    });
    moonMesh.add(new THREE.Mesh(moonRimGeo, moonRimMat));

    // --- D. MARS — large, right side, slightly smaller than Moon for depth ---
    const marsGeo = new THREE.SphereGeometry(5.6, 128, 128);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTexture, roughness: 0.76, metalness: 0.08
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    // Right side — large. z=-2 pushes it slightly further back than Moon
    marsMesh.position.set(14, -1.5, -2);
    marsMesh.rotation.y = -0.5;
    solarSystemGroup.add(marsMesh);

    // Warm orange-red atmospheric haze
    const marsAtmoGeo = new THREE.SphereGeometry(5.9, 64, 64);
    const marsAtmoMat = new THREE.MeshBasicMaterial({
      color: 0xf97316, transparent: true, opacity: 0.18,
      side: THREE.BackSide, blending: THREE.AdditiveBlending
    });
    marsMesh.add(new THREE.Mesh(marsAtmoGeo, marsAtmoMat));

    // --- E. JUPITER — far background, barely visible, adds depth ---
    const jupiterGeo = new THREE.SphereGeometry(6.4, 64, 64);
    const jupiterMat = new THREE.MeshStandardMaterial({ map: jupiterTexture, roughness: 0.65 });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.position.set(38, -3.5, -65);
    solarSystemGroup.add(jupiterMesh);

    // --- F. SATURN (rings) — very distant, adds solar-system context ---
    const saturnGeo = new THREE.SphereGeometry(4.8, 64, 64);
    const saturnMat = new THREE.MeshStandardMaterial({ map: saturnTexture, roughness: 0.6 });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnMesh.position.set(70, -6.0, -100);
    solarSystemGroup.add(saturnMesh);

    const ringGeo = new THREE.RingGeometry(6.2, 12.5, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a, side: THREE.DoubleSide,
      transparent: true, opacity: 0.72, roughness: 0.4
    });
    const saturnRings = new THREE.Mesh(ringGeo, ringMat);
    saturnRings.rotation.x = Math.PI / 2.3;
    saturnRings.rotation.y = 0.2;
    saturnMesh.add(saturnRings);

    // ================= 3. SUBTLE ORBITAL DEPTH LINES (very faint) =================
    // Only two rings, very low opacity — not distracting in hero view
    const orbitRadii = [22, 38];
    orbitRadii.forEach((r, idx) => {
      const curve = new THREE.EllipseCurve(-38, -22, r, r * 0.92, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(90);
      const orbGeo = new THREE.BufferGeometry().setFromPoints(
        pts.map(p => new THREE.Vector3(p.x, -2, p.y))
      );
      const orbMat = new THREE.LineDashedMaterial({
        color: idx % 2 === 0 ? 0x38bdf8 : 0xa855f7,
        dashSize: 2.0, gapSize: 2.5, opacity: 0.09, transparent: true
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

    satGroup.position.set(-3.5, 2.8, 8);
    satGroup.scale.set(0.55, 0.55, 0.55);
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
      moonMesh.rotation.y += 0.018 * delta;  // Moon rotates very slowly (tidally locked)
      marsMesh.rotation.y += 0.022 * delta;  // Mars day ~24.6h
      jupiterMesh.rotation.y += 0.10 * delta;
      saturnMesh.rotation.y += 0.09 * delta;

      // Gentle cinematic breathing — Moon and Mars float very slowly in space
      moonMesh.position.y = -2.5 + Math.sin(elapsed * 0.18) * 0.22;
      marsMesh.position.y = -1.5 + Math.sin(elapsed * 0.14 + 1.2) * 0.18;

      // Realistic shining star twinkle (subtle pulsing luminosity)
      const twinkle = 0.85 + Math.sin(elapsed * 2.2) * 0.12;
      brightMat.opacity = Math.min(Math.max(twinkle, 0.7), 1.0);
      starField.rotation.y = elapsed * 0.002;

      // Satellite gentle drift
      satGroup.position.y = 3.8 + Math.sin(elapsed * 0.8) * 0.25;
      satGroup.position.x = 1.5 + Math.cos(elapsed * 0.5) * 0.3;
      satGroup.rotation.y += 0.15 * delta;

      // Scroll-driven camera ascent: pulls back to reveal the ENTIRE Solar System on main view
      const isMissionView = currentView === 'mission';
      const effectiveS = isMissionView ? 0 : s;
      const basePos = state.targetCameraPos;
      const parallaxX = state.mouseNorm.x * (1.2 + effectiveS * 1.5);
      const parallaxY = state.mouseNorm.y * (0.8 + effectiveS * 1.0);

      const scrollCamX = THREE.MathUtils.lerp(basePos.x, 15, effectiveS);
      const scrollCamY = THREE.MathUtils.lerp(basePos.y, 48, effectiveS);
      const scrollCamZ = THREE.MathUtils.lerp(basePos.z, 88, effectiveS);

      const lerpFactor = Math.min(delta * 4.0, 0.2);
      state.cameraPos.x += (scrollCamX + parallaxX - state.cameraPos.x) * lerpFactor;
      state.cameraPos.y += (scrollCamY + parallaxY - state.cameraPos.y) * lerpFactor;
      state.cameraPos.z += (scrollCamZ - state.cameraPos.z) * lerpFactor;

      const targetLookX = THREE.MathUtils.lerp(state.cameraTarget.x, -5, effectiveS);
      const targetLookY = THREE.MathUtils.lerp(state.cameraTarget.y, -4, effectiveS);
      const targetLookZ = THREE.MathUtils.lerp(state.cameraTarget.z, -15, effectiveS);

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
      case 'hero': // Page 1 — cinematic tableau: Moon LEFT, Earth CENTRE-BACK, Mars RIGHT
        // Pull back enough to show both flanking planets; slight downward angle for grandeur
        state.targetCameraPos.set(0, 1.5, 24);
        state.cameraTarget.set(0, -0.5, 0);
        break;

      case 'intro': // Page 2: Prologue — slight pull-back revealing both worlds
        state.targetCameraPos.set(-1, 2, 20);
        state.cameraTarget.set(0, -0.5, 0);
        break;

      case 'destination': // Page 3: Moon & Mars Hub — centred between both
        state.targetCameraPos.set(0, 0.5, 18);
        state.cameraTarget.set(0, -0.5, 0);
        break;

      case 'mission': // Page 4 & 5: Detailed Mission — zoom towards the specific body
        if (targetBody === 'moon') {
          state.targetCameraPos.set(-10, 0.5, 14);
          state.cameraTarget.set(-14, -2.5, 2);
        } else {
          state.targetCameraPos.set(10, 0.5, 8);
          state.cameraTarget.set(14, -1.5, -2);
        }
        break;

      case 'learn': // Page 6: What Did We Learn? — wide cosmic pull-back
        state.targetCameraPos.set(0, 8, 38);
        state.cameraTarget.set(0, -2, -10);
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
