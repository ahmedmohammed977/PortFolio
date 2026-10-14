// Web Audio API Synthesizer - Ultra lightweight, 0kb assets, zero latency

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playCyberClick(800, 0.05);
  }
  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;

export const playCyberClick = (freq = 900, duration = 0.04) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors on unsupported browsers
  }
};

export const playCyberSuccess = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.06, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  } catch {
    // Ignore audio errors
  }
};

export const playIntroWhoosh = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass hit
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 1.2);
    subGain.gain.setValueAtTime(0.12, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.25);

    // High shimmer sweep
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmerOsc.type = "triangle";
    shimmerOsc.frequency.setValueAtTime(400, now);
    shimmerOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
    shimmerGain.gain.setValueAtTime(0.04, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmerOsc.start(now);
    shimmerOsc.stop(now + 0.95);
  } catch {
    // Ignore audio errors
  }
};

export const playDeveloperTerminalBoot = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Server Power-On Sub-Bass Hum
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(60, now);
    subOsc.frequency.exponentialRampToValueAtTime(110, now + 0.8);
    subGain.gain.setValueAtTime(0.12, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.7);

    // 2. High-speed Compiler Keystroke Ticks
    [0.1, 0.25, 0.42, 0.6, 0.85, 1.1].forEach((delay) => {
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "square";
      clickOsc.frequency.setValueAtTime(1400 + Math.random() * 400, now + delay);
      clickGain.gain.setValueAtTime(0.025, now + delay);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.03);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now + delay);
      clickOsc.stop(now + delay + 0.035);
    });

    // 3. System Ready High-Tech Chime
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = "sine";
    chimeOsc.frequency.setValueAtTime(880, now + 1.2); // A5 note
    chimeOsc.frequency.setValueAtTime(1318.51, now + 1.35); // E6 note
    chimeGain.gain.setValueAtTime(0.05, now + 1.2);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chimeOsc.start(now + 1.2);
    chimeOsc.stop(now + 1.95);
  } catch {
    // Ignore audio errors
  }
};

export const playHackerKeystroke = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    // Subtle mechanical keyboard switch clack
    const baseFreq = 800 + Math.random() * 600;
    osc.type = Math.random() > 0.5 ? "triangle" : "square";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, now + 0.025);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    // Ignore audio errors
  }
};

export const playAccessGrantedSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass hit
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
    subGain.gain.setValueAtTime(0.15, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.7);

    // Dual electronic access grant chord (F#5 -> C#6)
    [739.99, 1108.73, 1479.98].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.08, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.45);
    });
  } catch {
    // Ignore audio errors
  }
};


