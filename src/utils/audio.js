// Silent Audio System — audio completely disabled per user preference
// All calls are safe, non-blocking silent no-ops.

class SilentAudioSystem {
  constructor() {
    this.isMuted = true;
    this.ctx = null;
    this.isPlayingDrone = false;
  }

  init() {
    return null;
  }

  setupBusses() {}

  toggleMute() {
    return false;
  }

  unmute() {}

  startAmbientDrone() {}

  stopAmbientDrone() {}

  playWarp() {}

  playRocketFlyby() {}

  playClick() {}

  playNav() {}

  playSuccess() {}

  playWrong() {}

  playBeep() {}
}

export const spaceAudio = new SilentAudioSystem();
