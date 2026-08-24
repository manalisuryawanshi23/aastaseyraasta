import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sliders, Music, Sparkles, X, Play, Pause, Disc } from 'lucide-react';

interface SoundPreset {
  id: string;
  name: string;
  hindiName: string;
  desc: string;
  icon: string;
}

const PRESETS: SoundPreset[] = [
  {
    id: 'om_meditation',
    name: 'Sacred 432Hz Cosmic Om',
    hindiName: 'दिव्य ॐ नाद ध्यान',
    desc: 'Deep 136.1Hz Earth frequency with soothing 432Hz harmonics',
    icon: '🕉️',
  },
  {
    id: 'temple_bells',
    name: 'Mahakal Temple Bells & Chimes',
    hindiName: 'महाकाल आरती घंटियाँ',
    desc: 'Pure brass bell acoustic resonances and singing bowl tones',
    icon: '🔔',
  },
  {
    id: 'vedic_tanpura',
    name: 'Vedic Tanpura Sanctuary',
    hindiName: 'वैदिक तानपुरा ध्वनि',
    desc: 'Calming Pa-Sa acoustic strings for peaceful spiritual focus',
    icon: '🪕',
  },
];

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('aastha_ambient_vol');
    return saved ? parseFloat(saved) : 0.35;
  });
  const [currentPreset, setCurrentPreset] = useState<string>('om_meditation');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gains: GainNode[];
    intervals: any[];
  }>({
    oscillators: [],
    gains: [],
    intervals: [],
  });

  // Initialize Audio Context on user interaction
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
      const gain = audioCtxRef.current.createGain();
      gain.gain.value = volume;
      gain.connect(audioCtxRef.current.destination);
      masterGainRef.current = gain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Stop all active sound nodes cleanly
  const stopCurrentSounds = () => {
    activeNodesRef.current.intervals.forEach((timer) => clearInterval(timer));
    activeNodesRef.current.intervals = [];

    activeNodesRef.current.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore already stopped
      }
    });
    activeNodesRef.current.oscillators = [];

    activeNodesRef.current.gains.forEach((g) => {
      try {
        g.disconnect();
      } catch (e) {
        // ignore
      }
    });
    activeNodesRef.current.gains = [];
  };

  // 1. Synthesize Sacred 432Hz Om Resonance (136.1Hz Cosmic frequency with warm temple chorus)
  const playOmResonance = (ctx: AudioContext, masterGain: GainNode) => {
    // Om Fundamental = 136.10 Hz (Earth Year C# note)
    const baseFreq = 136.1;
    const harmonicRatios = [1.0, 2.0, 3.0, 4.0, 0.5];
    const harmonicGains = [0.45, 0.25, 0.12, 0.08, 0.3];

    // Filter to give warm acoustic temple atmosphere
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 650;
    filter.Q.value = 2.5;
    filter.connect(masterGain);

    // LFO for slow breathing wave effect (0.12 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.12;
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain);
    lfo.start();
    activeNodesRef.current.oscillators.push(lfo);

    harmonicRatios.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 || i === 4 ? 'sine' : 'triangle';
      // Slight detune for rich choral warmth
      const detuneCents = (i - 2) * 3.5;
      osc.frequency.value = baseFreq * ratio;
      osc.detune.value = detuneCents;

      gain.gain.value = harmonicGains[i];
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();

      activeNodesRef.current.oscillators.push(osc);
      activeNodesRef.current.gains.push(gain);
    });

    // Also trigger a gentle warm bell shimmer every 14 seconds
    const chimeTimer = setInterval(() => {
      if (ctx.state === 'running') {
        ringTempleBell(ctx, masterGain, 544.4, 0.2, 7.0);
      }
    }, 14000);
    activeNodesRef.current.intervals.push(chimeTimer);
  };

  // 2. Synthesize Temple Bell / Tibetan Bowl Chime
  const ringTempleBell = (
    ctx: AudioContext,
    destination: AudioNode,
    pitch = 528,
    bellVol = 0.35,
    decaySec = 5.0
  ) => {
    const now = ctx.currentTime;
    // Bell harmonic modes
    const harmonics = [1.0, 2.76, 5.4, 8.9];
    const modeAmps = [1.0, 0.45, 0.2, 0.08];

    harmonics.forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch * ratio, now);

      gain.gain.setValueAtTime(bellVol * modeAmps[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decaySec / (idx + 1));

      osc.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(now + decaySec + 0.5);
    });
  };

  // 3. Play Temple Bells & Singing Bowl Preset
  const playTempleBellsPreset = (ctx: AudioContext, masterGain: GainNode) => {
    // Background soft drone
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.value = 108.0; // Sacred 108 Hz
    droneGain.gain.value = 0.25;
    droneOsc.connect(droneGain);
    droneGain.connect(masterGain);
    droneOsc.start();
    activeNodesRef.current.oscillators.push(droneOsc);
    activeNodesRef.current.gains.push(droneGain);

    // Strike initial chime
    ringTempleBell(ctx, masterGain, 528, 0.4, 6.0);

    const pitches = [528, 639, 432, 741, 396];
    let step = 0;

    const bellLoop = setInterval(() => {
      if (ctx.state === 'running') {
        const nextPitch = pitches[step % pitches.length];
        step++;
        ringTempleBell(ctx, masterGain, nextPitch, 0.35, 6.5);
      }
    }, 4500);

    activeNodesRef.current.intervals.push(bellLoop);
  };

  // 4. Play Vedic Tanpura Sanctuary Preset
  const playVedicTanpura = (ctx: AudioContext, masterGain: GainNode) => {
    // Tanpura Strings: Pa (G#3 ~ 207.65Hz), Sa (C#3 ~ 138.59Hz), Sa, Sa_low (C#2 ~ 69.3Hz)
    const strings = [207.65, 138.59, 138.59, 69.3];
    let stringIdx = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    filter.connect(masterGain);

    const pluckString = () => {
      const now = ctx.currentTime;
      const freq = strings[stringIdx % strings.length];
      stringIdx++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(now);
      osc.stop(now + 4.0);
    };

    pluckString();
    const pluckTimer = setInterval(() => {
      if (ctx.state === 'running') {
        pluckString();
      }
    }, 1100);

    activeNodesRef.current.intervals.push(pluckTimer);
  };

  // Start Sound for Current Preset
  const startSound = (presetId: string) => {
    stopCurrentSounds();
    const ctx = getAudioContext();
    const masterGain = masterGainRef.current;
    if (!masterGain) return;

    if (presetId === 'om_meditation') {
      playOmResonance(ctx, masterGain);
    } else if (presetId === 'temple_bells') {
      playTempleBellsPreset(ctx, masterGain);
    } else if (presetId === 'vedic_tanpura') {
      playVedicTanpura(ctx, masterGain);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopCurrentSounds();
      setIsPlaying(false);
    } else {
      startSound(currentPreset);
      setIsPlaying(true);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    setCurrentPreset(presetId);
    if (isPlaying) {
      startSound(presetId);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    localStorage.setItem('aastha_ambient_vol', String(newVol));
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCurrentSounds();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const activePresetInfo = PRESETS.find((p) => p.id === currentPreset) || PRESETS[0];

  return (
    <>
      {/* Floating Sacred Sound Capsule (Visible on all devices) */}
      <div className="fixed bottom-20 right-3.5 sm:right-6 z-40 flex flex-col items-end">
        
        {/* Sound Control Modal Panel */}
        {isPanelOpen && (
          <div className="mb-3 w-80 sm:w-88 bg-stone-950/95 text-stone-100 border border-amber-500/40 backdrop-blur-xl p-4 rounded-3xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🕉️</span>
                <div>
                  <h4 className="text-xs font-serif font-bold text-amber-200">
                    Spiritual Om & Temple Chimes
                  </h4>
                  <p className="text-[10px] text-amber-400/80 font-serif">
                    दिव्य वातावरण एवं पवित्र ॐ ध्यान
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Presets List */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Select Sacred Sound Atmosphere
              </div>

              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`w-full p-2.5 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                    currentPreset === preset.id
                      ? 'bg-amber-950/70 border-amber-500 text-white shadow-inner'
                      : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-base shrink-0">
                    {preset.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold truncate text-amber-100">
                        {preset.name}
                      </span>
                      {currentPreset === preset.id && isPlaying && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-amber-300/70 font-serif">
                      {preset.hindiName}
                    </div>
                    <div className="text-[9px] text-stone-400 truncate mt-0.5">
                      {preset.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Volume Control */}
            <div className="space-y-1.5 pt-1 border-t border-stone-800">
              <div className="flex items-center justify-between text-[11px] text-stone-300">
                <span className="flex items-center gap-1 text-stone-400">
                  <Sliders className="w-3 h-3 text-amber-400" />
                  <span>Atmosphere Volume</span>
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Main Toggle Button inside Panel */}
            <button
              onClick={handleTogglePlay}
              className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold'
                  : 'bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/40'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Devotional Sound</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Start Devotional Experience</span>
                </>
              )}
            </button>

          </div>
        )}

        {/* Floating Pill Capsule Trigger */}
        <div className="flex items-center gap-1.5 bg-stone-950/95 text-amber-200 border border-amber-500/40 backdrop-blur-md p-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-2xl hover:border-amber-400 transition-all cursor-pointer group">
          
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-2 pr-1.5 focus:outline-none"
            title={isPlaying ? 'Pause Ambient Om' : 'Play Sacred 432Hz Om Chime'}
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/50 animate-pulse'
                  : 'bg-stone-900 text-stone-400 group-hover:text-amber-300 border border-stone-800'
              }`}
            >
              {isPlaying ? (
                <span className="text-sm font-serif font-bold animate-spin" style={{ animationDuration: '6s' }}>
                  ॐ
                </span>
              ) : (
                <span className="text-xs font-serif">ॐ</span>
              )}
            </div>

            <div className="hidden sm:block text-left pr-1">
              <div className="flex items-center gap-1 text-[11px] font-bold font-serif leading-tight text-amber-100">
                <span>{isPlaying ? activePresetInfo.name : 'Spiritual Om Chime'}</span>
                {isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                )}
              </div>
              <div className="text-[9px] text-amber-400/80 font-serif leading-none mt-0.5">
                {isPlaying ? '432Hz Sacred Ambient Active' : 'Click to Play Ambient Sound'}
              </div>
            </div>
          </button>

          {/* Settings / Track Picker Toggle Icon */}
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`p-1.5 rounded-full transition-colors ${
              isPanelOpen
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Choose Sacred Sound & Adjust Volume"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </>
  );
};
