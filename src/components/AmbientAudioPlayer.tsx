import React, { useState } from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-20 right-4 z-30 hidden sm:flex items-center gap-2 bg-stone-900/90 text-amber-200 border border-amber-500/30 backdrop-blur-md px-3 py-2 rounded-full shadow-lg text-xs">
      <button
        onClick={toggleSound}
        className="flex items-center gap-2 hover:text-white transition-colors"
        title="Toggle Ambient Om Atmosphere"
      >
        <div className={`p-1.5 rounded-full ${isPlaying ? 'bg-amber-700 text-white animate-pulse' : 'bg-stone-800 text-stone-400'}`}>
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </div>
        <span className="font-medium text-[11px] font-serif">
          {isPlaying ? 'Devotional Atmosphere Active' : 'Spiritual Chime'}
        </span>
      </button>

      {isPlaying && (
        <audio
          autoPlay
          loop
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=om-chant-112347.mp3"
        />
      )}
    </div>
  );
};
