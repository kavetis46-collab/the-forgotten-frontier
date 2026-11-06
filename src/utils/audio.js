// Web Audio API Synthesizer for Mysterious Space Ambience & Cinematic Sound Effects
// 100% self-contained: no external audio files required, instant loading & zero lag.

class SpaceAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // default muted to respect browser autoplay policies
    this.masterGain = null;
    this.droneGain = null;
    this.isPlayingDrone = false;

    // Active ambient audio nodes
    this.ambientNodes = [];
    this.shimmerInterval = null;

    // Cosmic Reverb / Echo Send
    this.reverbSend = null;
  }

  // Initialize or resume AudioContext safely upon user interaction
  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Ensure master bus and spatial reverb network exist
  setupBusses() {
    if (!this.ctx) return;
    if (this.masterGain) return;

    // Master Output Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Cosmic Echo & Spatial Diffusion Network
    try {
      const delay1 = this.ctx.createDelay();
      const delay2 = this.ctx.createDelay();
      const feedback1 = this.ctx.createGain();
      const feedback2 = this.ctx.createGain();
      const damping = this.ctx.createBiquadFilter();

      delay1.delayTime.setValueAtTime(0.24, this.ctx.currentTime);
      delay2.delayTime.setValueAtTime(0.48, this.ctx.currentTime);

      feedback1.gain.setValueAtTime(0.38, this.ctx.currentTime);
      feedback2.gain.setValueAtTime(0.32, this.ctx.currentTime);

      damping.type = 'lowpass';
      damping.frequency.setValueAtTime(1800, this.ctx.currentTime); // Soft cosmic dust absorption

      this.reverbSend = this.ctx.createGain();
      this.reverbSend.gain.setValueAtTime(0.35, this.ctx.currentTime);

      // Routing
      this.reverbSend.connect(delay1);
      delay1.connect(feedback1);
      feedback1.connect(damping);
      damping.connect(delay2);
      delay2.connect(feedback2);
      feedback2.connect(delay1);

      damping.connect(this.masterGain);
      delay2.connect(this.masterGain);
    } catch (_) {
      // Graceful fallback if delay creation fails
      this.reverbSend = this.masterGain;
    }
  }

  // Toggle Mute / Unmute
  toggleMute() {
    this.init();
    this.setupBusses();

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playNav(); // Gentle auditory confirmation
    } else {
      this.stopAmbientDrone();
    }

    return !this.isMuted;
  }

  unmute() {
    if (this.isMuted) {
      this.toggleMute();
    }
  }

  /* ============================================================
     1. MYSTERIOUS COSMIC AMBIENT SOUNDSCAPE ("THE DEEP VOID")
     - Deep interstellar sub-bass (36.7Hz & 55Hz)
     - Ethereal suspended cosmic chord (D - A - E - F#)
     - Twin ultra-slow LFO breathing filters (15s & 22s cycles)
     - Gentle stochastic starlight shimmer bells floating in space
     ============================================================ */
  startAmbientDrone() {
    if (this.isMuted) return;
    this.init();
    this.setupBusses();
    if (!this.ctx || this.isPlayingDrone) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientNodes = [];

      // Master drone gain with slow, luxurious fade-in (4.5s)
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.22, now + 4.5);
      this.droneGain.connect(this.masterGain);

      // Deep Space Filter (Velvety warmth with subtle resonance)
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.setValueAtTime(320, now);
      masterFilter.Q.setValueAtTime(2.2, now); // Gentle cosmic peak
      masterFilter.connect(this.droneGain);

      // 1. Deep Sub-Bass Gravity Well (D1: 36.7Hz pure sine)
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(36.71, now);
      subGain.gain.setValueAtTime(0.24, now);
      sub.connect(subGain);
      subGain.connect(masterFilter);
      sub.start(now);
      this.ambientNodes.push(sub);

      // 2. Cosmic Void Foundation (A1: 55Hz detuned pair for lush thickness)
      const base1 = this.ctx.createOscillator();
      const base2 = this.ctx.createOscillator();
      const baseGain = this.ctx.createGain();
      base1.type = 'triangle';
      base1.frequency.setValueAtTime(54.8, now);
      base2.type = 'sine';
      base2.frequency.setValueAtTime(55.25, now);
      baseGain.gain.setValueAtTime(0.18, now);
      base1.connect(baseGain);
      base2.connect(baseGain);
      baseGain.connect(masterFilter);
      base1.start(now);
      base2.start(now);
      this.ambientNodes.push(base1, base2);

      // 3. Ethereal Suspended Pad (D2: 73.4Hz, E2: 82.4Hz, A2: 110Hz, D3: 146.8Hz)
      // Creates that mysterious, haunting, contemplative Interstellar atmosphere
      const padFreqs = [73.42, 82.41, 110.0, 146.83, 220.0];
      padFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), now);

        // Subtle individual volume
        pGain.gain.setValueAtTime(0.08 / (idx + 1), now);
        osc.connect(pGain);
        pGain.connect(masterFilter);
        osc.start(now);
        this.ambientNodes.push(osc);
      });

      // 4. Dual Slow LFOs (Breathing Cosmic Winds)
      // Modulates filter frequency smoothly between 220Hz and 580Hz over 18 seconds
      const lfo1 = this.ctx.createOscillator();
      const lfo1Gain = this.ctx.createGain();
      lfo1.type = 'sine';
      lfo1.frequency.setValueAtTime(0.055, now); // 18s cycle
      lfo1Gain.gain.setValueAtTime(160, now);
      lfo1.connect(lfo1Gain);
      lfo1Gain.connect(masterFilter.frequency);
      lfo1.start(now);
      this.ambientNodes.push(lfo1);

      // Secondary LFO for gentle harmonic swell
      const lfo2 = this.ctx.createOscillator();
      const lfo2Gain = this.ctx.createGain();
      lfo2.type = 'sine';
      lfo2.frequency.setValueAtTime(0.038, now); // 26s cycle
      lfo2Gain.gain.setValueAtTime(0.04, now);
      lfo2.connect(lfo2Gain);
      lfo2Gain.connect(this.droneGain.gain);
      lfo2.start(now);
      this.ambientNodes.push(lfo2);

      // 5. Stochastic Starlight Shimmer Generator
      // Periodically blooms faint, crystalline glass harmonics like deep-space signals
      this.scheduleStarlightShimmer();

      this.isPlayingDrone = true;
    } catch (e) {
      console.warn('Ambient drone start error:', e);
    }
  }

  // Periodic starlight glass bell shimmer (mysterious, subtle, celestial)
  scheduleStarlightShimmer() {
    if (this.shimmerInterval) clearInterval(this.shimmerInterval);

    this.shimmerInterval = setInterval(() => {
      if (!this.isPlayingDrone || this.isMuted || !this.ctx) return;
      this.playStarlightChime();
    }, 7500 + Math.random() * 4000); // Trigger every 7.5 to 11.5 seconds
  }

  playStarlightChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Celestial harmonic frequencies (D-major pentatonic overtones)
      const celestialPitches = [587.33, 739.99, 880.0, 1174.66, 1479.98, 1760.0];
      const freq = celestialPitches[Math.floor(Math.random() * celestialPitches.length)];

      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      const chimeFilter = this.ctx.createBiquadFilter();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now);

      chimeFilter.type = 'bandpass';
      chimeFilter.frequency.setValueAtTime(freq, now);
      chimeFilter.Q.setValueAtTime(4.0, now);

      // Ultra-soft, gentle starlight bell envelope
      chimeGain.gain.setValueAtTime(0.0001, now);
      chimeGain.gain.linearRampToValueAtTime(0.032, now + 0.6); // Soft bloom
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8); // Long silky tail

      chimeOsc.connect(chimeFilter);
      chimeFilter.connect(chimeGain);
      chimeGain.connect(this.reverbSend || this.masterGain);

      chimeOsc.start(now);
      chimeOsc.stop(now + 4.0);
    } catch (_) {}
  }

  // Stop ambient drone smoothly with elegant fade-out
  stopAmbientDrone() {
    if (this.shimmerInterval) {
      clearInterval(this.shimmerInterval);
      this.shimmerInterval = null;
    }

    if (!this.isPlayingDrone || !this.droneGain || !this.ctx) {
      this.isPlayingDrone = false;
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      setTimeout(() => {
        this.ambientNodes.forEach(node => {
          try {
            node.stop();
            node.disconnect();
          } catch (_) {}
        });
        this.ambientNodes = [];
        this.isPlayingDrone = false;
      }, 1900);
    } catch (_) {
      this.isPlayingDrone = false;
    }
  }

  /* ============================================================
     2. MYSTERIOUS WARP / DIMENSIONAL PORTAL SOUND
     Replaces harsh rocket noise with a cinematic, awe-inspiring
     wormhole transit: sub-bass gravity swell + crystalline shimmer sweep
     ============================================================ */
  playWarp() {
    if (this.isMuted) return;
    this.init();
    this.setupBusses();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 2.2;

      // 1. Deep Dimensional Sub-Bass Surge (Braam)
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(40, now);
      sub.frequency.exponentialRampToValueAtTime(82, now + 0.45);
      sub.frequency.exponentialRampToValueAtTime(28, now + duration);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.26, now + 0.4);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      sub.connect(subGain);
      subGain.connect(this.masterGain);
      sub.start(now);
      sub.stop(now + duration);

      // 2. Crystalline Stargate Sweep (Resonant celestial harmonic rise)
      const sweep = this.ctx.createOscillator();
      const sweepFilter = this.ctx.createBiquadFilter();
      const sweepGain = this.ctx.createGain();

      sweep.type = 'triangle';
      sweep.frequency.setValueAtTime(146.83, now); // D3
      sweep.frequency.exponentialRampToValueAtTime(880.0, now + 0.85); // Up to A5
      sweep.frequency.exponentialRampToValueAtTime(293.66, now + duration);

      sweepFilter.type = 'bandpass';
      sweepFilter.frequency.setValueAtTime(300, now);
      sweepFilter.frequency.exponentialRampToValueAtTime(2200, now + 0.8);
      sweepFilter.frequency.exponentialRampToValueAtTime(400, now + duration);
      sweepFilter.Q.setValueAtTime(3.5, now);

      sweepGain.gain.setValueAtTime(0.001, now);
      sweepGain.gain.linearRampToValueAtTime(0.18, now + 0.5);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Stereo Panning Effect across the headphones/speakers
      let panner = null;
      if (this.ctx.createStereoPanner) {
        panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(-0.7, now);
        panner.pan.linearRampToValueAtTime(0.7, now + duration);
      }

      sweep.connect(sweepFilter);
      sweepFilter.connect(sweepGain);

      if (panner) {
        sweepGain.connect(panner);
        panner.connect(this.reverbSend || this.masterGain);
      } else {
        sweepGain.connect(this.reverbSend || this.masterGain);
      }

      sweep.start(now);
      sweep.stop(now + duration);

      // 3. Delicate Star-Chime Cluster at Peak of Transition
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const chimeNow = this.ctx.currentTime;
        const notes = [587.33, 880.0, 1174.66, 1760.0];
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, chimeNow + i * 0.06);

          g.gain.setValueAtTime(0.045, chimeNow + i * 0.06);
          g.gain.exponentialRampToValueAtTime(0.0001, chimeNow + i * 0.06 + 1.2);

          osc.connect(g);
          g.connect(this.reverbSend || this.masterGain);
          osc.start(chimeNow + i * 0.06);
          osc.stop(chimeNow + i * 0.06 + 1.3);
        });
      }, 350);

    } catch (e) {
      console.warn('Warp sound error:', e);
    }
  }

  // Alias for backward compatibility
  playRocketFlyby() {
    this.playWarp();
  }

  /* ============================================================
     3. HIGH-TECH TACTILE UI SOUNDS (GLASS / TELEMETRY PINGS)
     Soft, non-fatiguing, futuristic crystal pings
     ============================================================ */
  playClick() {
    if (this.isMuted) return;
    this.init();
    this.setupBusses();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Soft dual-frequency crystal tap (880Hz + 1320Hz)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.exponentialRampToValueAtTime(587, now + 0.04);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.05);
      osc2.stop(now + 0.05);
    } catch (_) {}
  }

  playNav() {
    if (this.isMuted) return;
    this.init();
    this.setupBusses();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.07); // Up to A5

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.reverbSend || this.masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (_) {}
  }

  /* ============================================================
     4. QUIZ SUCCESS & RETRY CHIMES (MYSTERIOUS CELEBRATION)
     Ascending celestial chords that resonate into the cosmos
     ============================================================ */
  playSuccess() {
    if (this.isMuted) return;
    this.init();
    this.setupBusses();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic Ethereal Chord: D4 -> A4 -> D5 -> F#5 -> A5
      const notes = [293.66, 440.0, 587.33, 739.99, 880.0];

      notes.forEach((freq, idx) => {
        const time = now + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.07, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

        osc.connect(gain);
        gain.connect(this.reverbSend || this.masterGain);

        osc.start(time);
        osc.stop(time + 1.7);
      });
    } catch (_) {}
  }

  playWrong() {
    if (this.isMuted) return;
    this.init();
    this.setupBusses();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Gentle deep muffled chime (non-jarring)
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(146.8, now);
      osc.frequency.exponentialRampToValueAtTime(98.0, now + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(340, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch (_) {}
  }

  playBeep(frequency, duration, type = 'sine', volume = 0.05) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (_) {}
  }
}

export const spaceAudio = new SpaceAudioSystem();
