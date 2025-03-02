import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

interface LyricsDisplayProps {
  isVisible: boolean;
  onClose: () => void;
  currentTrack: {
    title: string;
    artist: string;
  };
  currentTime: number;
}

// Sample lyrics data (in production, this would come from an API)
const sampleLyrics = [
  { time: 0, text: "I've been trying to call" },
  { time: 4, text: "I've been on my own for long enough" },
  { time: 8, text: "Maybe you can show me how to love, maybe" },
  { time: 12, text: "I'm going through withdrawals" },
  { time: 16, text: "You don't even have to do too much" },
  { time: 20, text: "You can turn me on with just a touch, baby" },
];

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  isVisible,
  onClose,
  currentTrack,
  currentTime
}) => {
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);

  useEffect(() => {
    const currentIndex = sampleLyrics.findIndex(
      (lyric, index) => 
        currentTime >= lyric.time && 
        (index === sampleLyrics.length - 1 || currentTime < sampleLyrics[index + 1].time)
    );
    if (currentIndex !== -1) {
      setActiveLyricIndex(currentIndex);
    }
  }, [currentTime]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
            <p className="text-gray-400">{currentTrack.artist}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <Mic className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          {sampleLyrics.map((lyric, index) => (
            <div
              key={index}
              className={`transition-all duration-300 transform ${
                index === activeLyricIndex
                  ? 'text-2xl font-bold text-white scale-105'
                  : 'text-xl text-gray-400'
              }`}
            >
              {lyric.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsDisplay;