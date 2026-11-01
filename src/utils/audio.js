// Web Audio API Synthesizer for Space Ambient & UI Sound Effects
// 100% self-contained: no external files or network requests required!

class SpaceAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // start muted by default to comply with browser autoplay policies
    this.droneGain = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.filter = null;
    this.isPlayingDrone = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playBeep(880, 0.08, 'sine');
    } else {
      this.stopAmbientDrone();
    }

    return !this.isMuted;
  }

  startAmbientDrone() {
    if (this.isMuted || !this.ctx || this.isPlayingDrone) return;

    try {
      const now = this.ctx.currentTime;
      
      // Master drone gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.12, now + 3);

      // Low pass filter for warm deep space rumble
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(160, now);

      // Sub-bass oscillator (55Hz - A1)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(55, now);

      // Detuned harmonic 1 (110Hz - A2, slightly detuned)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'triangle';
      this.osc1.frequency.setValueAtTime(109.4, now);

      // Detuned harmonic 2 (164.8Hz - E3 fifth)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(165.2, now);

      // Slow LFO for subtle breathing movement
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1, now); // 10 second cycle
      lfoGain.gain.setValueAtTime(40, now);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);

      // Connect nodes
      this.subOsc.connect(this.filter);
      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.subOsc.start(now);
      this.osc1.start(now);
      this.osc2.start(now);
      lfo.start(now);

      this.isPlayingDrone = true;
    } catch (e) {
      console.warn('Space audio ambient drone init failed:', e);
    }
  }

  stopAmbientDrone() {
    if (!this.isPlayingDrone || !this.droneGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        try {
          if (this.subOsc) this.subOsc.stop();
          if (this.osc1) this.osc1.stop();
          if (this.osc2) this.osc2.stop();
        } catch (_) {}
        this.isPlayingDrone = false;
      }, 1300);
    } catch (e) {
      this.isPlayingDrone = false;
    }
  }

  // Crisp telemetry beep on button click or hover
  playClick() {
    if (this.isMuted) return;
    this.playBeep(1200, 0.04, 'sine', 0.06);
  }

  playNav() {
    if (this.isMuted) return;
    this.playBeep(720, 0.07, 'triangle', 0.08);
  }

  // Realistic Rocket Flyby Sound with Stereo Panning & Doppler Pitch Drop!
  playRocketFlyby() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const duration = 1.35;

      // Stereo Panner (Left -1 to Right +1)
      let pannerNode = null;
      if (this.ctx.createStereoPanner) {
        pannerNode = this.ctx.createStereoPanner();
        pannerNode.pan.setValueAtTime(-0.85, now);
        pannerNode.pan.linearRampToValueAtTime(0.85, now + duration);
      }

      // Master Flyby Gain
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.28, now + 0.55); // peak as rocket passes screen center
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Rocket Exhaust Rumble (Noise generator)
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brownian low-frequency smoothing
        data[i] = (lastOut + 0.04 * white) / 1.04;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for rocket roar
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.5);
      filter.frequency.exponentialRampToValueAtTime(180, now + duration);

      // Deep Sub-Bass Rocket Thruster Oscillator
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.linearRampToValueAtTime(110, now + 0.5);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + duration); // Doppler drop!

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.18, now);

      subOsc.connect(subGain);
      subGain.connect(filter);
      noise.connect(filter);

      if (pannerNode) {
        filter.connect(pannerNode);
        pannerNode.connect(masterGain);
      } else {
        filter.connect(masterGain);
      }

      masterGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
      subOsc.start(now);
      subOsc.stop(now + duration);
    } catch (e) {
      console.warn('Rocket sound failed:', e);
    }
  }

  // Warp speed / thruster whoosh during space transitions
  playWarp() {
    this.playRocketFlyby();
  }

  // Celebratory chord for quiz success
  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBeep(freq, 0.45, 'sine', 0.12);
      }, idx * 110);
    });
  }

  // Error chime for quiz wrong answer
  playWrong() {
    if (this.isMuted || !this.ctx) return;
    this.playBeep(260, 0.25, 'sawtooth', 0.08);
  }

  playBeep(frequency, duration, type = 'sine', volume = 0.1) {
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
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // ignore
    }
  }
}

export const spaceAudio = new SpaceAudioSystem();
