import React, { createContext, useState, useCallback } from 'react';
import { Track } from '../types/media';
import { playlists } from '../data/playlists';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  setCurrentTrack: () => {},
  togglePlay: () => {},
  setIsPlaying: () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(playlists[0].tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSetCurrentTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        setCurrentTrack: handleSetCurrentTrack,
        togglePlay,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};