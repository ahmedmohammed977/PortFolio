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

let introTrackInterval: number | null = null;
let introAmbientMasterGain: GainNode | null = null;
let isIntroTrackRunning = false;

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  const currentGain = introAmbientMasterGain;
  if (currentGain && audioCtx) {
    currentGain.gain.setTargetAtTime(
      soundEnabled ? 0.14 : 0,
      audioCtx.currentTime,
      0.05
    );
  }
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

export const playCinematicBoom = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Deep cinematic sub-bass impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.8);

    subGain.gain.setValueAtTime(0.28, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 2.1);

    // Mid cinematic rumble
    const midOsc = ctx.createOscillator();
    const midGain = ctx.createGain();
    midOsc.type = "triangle";
    midOsc.frequency.setValueAtTime(220, now);
    midOsc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

    midGain.gain.setValueAtTime(0.12, now);
    midGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

    midOsc.connect(midGain);
    midGain.connect(ctx.destination);
    midOsc.start(now);
    midOsc.stop(now + 1.35);
  } catch {
    // Ignore audio errors
  }
};

export const playHoloReveal = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Celestial crystal chord
    [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.045, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.15);
    });
  } catch {
    // Ignore audio errors
  }
};

export const playLaserBeamCharge = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Dual rising laser sweep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
    gain1.gain.setValueAtTime(0.01, now);
    gain1.gain.linearRampToValueAtTime(0.09, now + 1.1);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.3);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(320, now);
    osc2.frequency.exponentialRampToValueAtTime(980, now + 1.2);
    gain2.gain.setValueAtTime(0.01, now);
    gain2.gain.linearRampToValueAtTime(0.05, now + 1.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 1.3);
  } catch {
    // Ignore audio errors
  }
};

export const playLaserClashImpact = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Sub-bass shockwave
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(160, now);
    sub.frequency.exponentialRampToValueAtTime(26, now + 1.6);
    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    sub.connect(subGain);
    subGain.connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 1.9);

    // 2. High-energy burst
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    noise.type = "triangle";
    noise.frequency.setValueAtTime(880, now);
    noise.frequency.exponentialRampToValueAtTime(110, now + 0.5);
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.6);

    // 3. Shimmering Crystal Sparkles
    [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
      const spark = ctx.createOscillator();
      const sparkGain = ctx.createGain();
      spark.type = "sine";
      spark.frequency.setValueAtTime(freq, now + idx * 0.04);
      sparkGain.gain.setValueAtTime(0.06, now + idx * 0.04);
      sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.8);
      spark.connect(sparkGain);
      sparkGain.connect(ctx.destination);
      spark.start(now + idx * 0.04);
      spark.stop(now + idx * 0.04 + 0.85);
    });
  } catch {
    // Ignore audio errors
  }
};

export const playWarpZoom = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.6);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  } catch {
    // Ignore audio errors
  }
};

export const playIntroCinematicSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Massive Cinematic Sub-Bass Braam / Drone (Deep IMAX impact & rumble)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 1.8);
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.24, now + 0.12);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 2.5);

    // 2. Dual Stereo-Simulated Cyber Laser Energy Swells (Left & Right kinetic lines)
    // Line 1: Deep analog sawtooth with lowpass filter sweep
    const riserOsc1 = ctx.createOscillator();
    const riserFilter1 = ctx.createBiquadFilter();
    const riserGain1 = ctx.createGain();
    riserOsc1.type = "sawtooth";
    riserOsc1.frequency.setValueAtTime(110, now);
    riserOsc1.frequency.exponentialRampToValueAtTime(880, now + 1.3);
    riserFilter1.type = "lowpass";
    riserFilter1.frequency.setValueAtTime(250, now);
    riserFilter1.frequency.exponentialRampToValueAtTime(2800, now + 1.3);
    riserFilter1.Q.setValueAtTime(6, now);
    riserGain1.gain.setValueAtTime(0.01, now);
    riserGain1.gain.linearRampToValueAtTime(0.12, now + 1.15);
    riserGain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    riserOsc1.connect(riserFilter1);
    riserFilter1.connect(riserGain1);
    riserGain1.connect(ctx.destination);
    riserOsc1.start(now);
    riserOsc1.stop(now + 1.45);

    // Line 2: Shimmering triangle wave charging up
    const riserOsc2 = ctx.createOscillator();
    const riserGain2 = ctx.createGain();
    riserOsc2.type = "triangle";
    riserOsc2.frequency.setValueAtTime(220, now);
    riserOsc2.frequency.exponentialRampToValueAtTime(1480, now + 1.3);
    riserGain2.gain.setValueAtTime(0.01, now);
    riserGain2.gain.linearRampToValueAtTime(0.08, now + 1.15);
    riserGain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.38);
    riserOsc2.connect(riserGain2);
    riserGain2.connect(ctx.destination);
    riserOsc2.start(now);
    riserOsc2.stop(now + 1.42);

    // 3. Majestic Cyberpunk Harmonic Chord (D2 - A2 - D3 - F#3 - A3)
    const chordNotes = [73.42, 110.0, 146.83, 185.0, 220.0, 440.0];
    chordNotes.forEach((freq, idx) => {
      const padOsc = ctx.createOscillator();
      const padGain = ctx.createGain();
      padOsc.type = "sine";
      padOsc.frequency.setValueAtTime(freq, now + 0.1);
      padGain.gain.setValueAtTime(0.0001, now);
      padGain.gain.linearRampToValueAtTime(0.035, now + 0.4 + idx * 0.05);
      padGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      padOsc.connect(padGain);
      padGain.connect(ctx.destination);
      padOsc.start(now + 0.1);
      padOsc.stop(now + 2.9);
    });

    // 4. Futuristic Data Matrix Pulses
    [0.18, 0.35, 0.52, 0.74, 0.95, 1.15].forEach((delay) => {
      const tickOsc = ctx.createOscillator();
      const tickGain = ctx.createGain();
      tickOsc.type = "sine";
      tickOsc.frequency.setValueAtTime(1200 + Math.random() * 800, now + delay);
      tickGain.gain.setValueAtTime(0.02, now + delay);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.04);
      tickOsc.connect(tickGain);
      tickGain.connect(ctx.destination);
      tickOsc.start(now + delay);
      tickOsc.stop(now + delay + 0.05);
    });
  } catch {
    // Graceful fallback if audio is not supported or blocked
  }
};

// Continuous Motivating Electronic Intro Ambient Track (Synth Arp + Driving Sub Pulse)
export const startIntroAmbientTrack = () => {
  if (typeof window === "undefined" || isIntroTrackRunning) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    isIntroTrackRunning = true;

    // Create dedicated sub-master gain for intro ambient track
    if (!introAmbientMasterGain) {
      introAmbientMasterGain = ctx.createGain();
      introAmbientMasterGain.connect(ctx.destination);
    }

    const now = ctx.currentTime;
    introAmbientMasterGain.gain.cancelScheduledValues(now);
    introAmbientMasterGain.gain.setValueAtTime(0.0001, now);
    introAmbientMasterGain.gain.linearRampToValueAtTime(soundEnabled ? 0.12 : 0, now + 1.2);

    // Filter node for smooth cyberpunk tone
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.connect(introAmbientMasterGain);

    // Arpeggio notes in D-minor / Cyberpunk scale: D3, F3, A3, C4, D4, C4, A3, F3
    const arpNotes = [146.83, 174.61, 220.0, 261.63, 293.66, 261.63, 220.0, 174.61];
    let noteIdx = 0;
    let stepCount = 0;

    const playStep = () => {
      const targetMaster = introAmbientMasterGain;
      if (!isIntroTrackRunning || !targetMaster) return;
      try {
        const stepTime = ctx.currentTime;
        const freq = arpNotes[noteIdx % arpNotes.length];
        noteIdx++;
        stepCount++;

        // 1. Synth Arp Tone
        const arpOsc = ctx.createOscillator();
        const arpGain = ctx.createGain();
        arpOsc.type = "triangle";
        arpOsc.frequency.setValueAtTime(freq, stepTime);

        arpGain.gain.setValueAtTime(0.045, stepTime);
        arpGain.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.16);

        arpOsc.connect(arpGain);
        arpGain.connect(filter);
        arpOsc.start(stepTime);
        arpOsc.stop(stepTime + 0.18);

        // 2. Punchy Driving Sub-Bass on every 4th step (Kick/Sub groove)
        if (stepCount % 4 === 1) {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.type = "sine";
          subOsc.frequency.setValueAtTime(73.42, stepTime); // D2
          subOsc.frequency.exponentialRampToValueAtTime(36.71, stepTime + 0.28); // D1

          subGain.gain.setValueAtTime(0.14, stepTime);
          subGain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.32);

          subOsc.connect(subGain);
          subGain.connect(targetMaster);
          subOsc.start(stepTime);
          subOsc.stop(stepTime + 0.35);
        }

        // 3. Shimmer chord pulse every 16 steps
        if (stepCount % 16 === 1) {
          [440.0, 587.33, 698.46, 880.0].forEach((chordFreq, idx) => {
            const chordOsc = ctx.createOscillator();
            const chordGain = ctx.createGain();
            chordOsc.type = "sine";
            chordOsc.frequency.setValueAtTime(chordFreq, stepTime);

            chordGain.gain.setValueAtTime(0.001, stepTime);
            chordGain.gain.linearRampToValueAtTime(0.02, stepTime + 0.15 + idx * 0.03);
            chordGain.gain.exponentialRampToValueAtTime(0.0001, stepTime + 1.8);

            chordOsc.connect(chordGain);
            chordGain.connect(targetMaster);
            chordOsc.start(stepTime);
            chordOsc.stop(stepTime + 1.9);
          });
        }
      } catch {
        // Safe catch for audio scheduling
      }
    };

    // Step every 140ms (~107 BPM 16th notes / uplifting driving tempo)
    introTrackInterval = window.setInterval(playStep, 140);
    playStep();
  } catch {
    // AudioContext permission handling
  }
};

export const stopIntroAmbientTrack = (fadeSeconds = 0.8) => {
  isIntroTrackRunning = false;
  if (introTrackInterval !== null) {
    clearInterval(introTrackInterval);
    introTrackInterval = null;
  }
  if (introAmbientMasterGain && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      introAmbientMasterGain.gain.cancelScheduledValues(now);
      introAmbientMasterGain.gain.setValueAtTime(introAmbientMasterGain.gain.value, now);
      introAmbientMasterGain.gain.linearRampToValueAtTime(0.0001, now + fadeSeconds);
      setTimeout(() => {
        if (introAmbientMasterGain && !isIntroTrackRunning) {
          try {
            introAmbientMasterGain.disconnect();
          } catch {
            // ignore
          }
          introAmbientMasterGain = null;
        }
      }, (fadeSeconds + 0.1) * 1000);
    } catch {
      introAmbientMasterGain = null;
    }
  }
};






