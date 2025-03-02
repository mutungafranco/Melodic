import React, { useState, useRef, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Home, Search, Library, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Volume1, Volume, Shuffle, Repeat, Heart, ListMusic, Mic2,
  Mic, Sparkles
} from 'lucide-react';
import { playlists } from '../data/playlists';
import MediaPlayer from '../components/MediaPlayer';
import LyricsDisplay from '../components/LyricsDisplay';
import RecommendationPanel from '../components/RecommendationPanel';
import { PlayerContext } from '../contexts/PlayerContext';

function MainLayout() {
  const navigate = useNavigate();
  const { 
    currentTrack, 
    isPlaying, 
    setIsPlaying,
    togglePlay,
    setCurrentTrack 
  } = useContext(PlayerContext);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [crossfadeEnabled, setCrossfadeEnabled] = useState(true);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const crossfadeTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle volume bar click and drag
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newVolume = Math.round((x / rect.width) * 100);
    setVolume(newVolume);
  };

  // Handle volume bar mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingVolume && volumeBarRef.current) {
        const rect = volumeBarRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const newVolume = Math.round((x / rect.width) * 100);
        setVolume(newVolume);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingVolume(false);
    };

    if (isDraggingVolume) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingVolume]);

  const handleProgress = (time: number, totalDuration: number) => {
    if (!isDraggingProgress) {
      setCurrentTime(time);
      setDuration(totalDuration);
    }
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (x / width) * duration;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = playlists[0].tracks.findIndex(track => track.id === currentTrack?.id);
    const nextTrack = playlists[0].tracks[(currentIndex + 1) % playlists[0].tracks.length];
    setCurrentTrack(nextTrack);
  };

  const handlePreviousTrack = () => {
    const currentIndex = playlists[0].tracks.findIndex(track => track.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? playlists[0].tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(playlists[0].tracks[prevIndex]);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX />;
    if (volume < 33) return <Volume />;
    if (volume < 67) return <Volume1 />;
    return <Volume2 />;
  };

  if (!currentTrack) return null;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <MediaPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        onStateChange={setIsPlaying}
        onProgress={handleProgress}
        volume={volume}
        onEnded={handleNextTrack}
      />
      
      <LyricsDisplay
        isVisible={showLyrics}
        onClose={() => setShowLyrics(false)}
        currentTrack={currentTrack}
        currentTime={currentTime}
      />

      <RecommendationPanel
        isVisible={showRecommendations}
        onClose={() => setShowRecommendations(false)}
        currentTrack={currentTrack}
      />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-black p-6 flex flex-col gap-y-6">
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-x-4 text-gray-300 hover:text-white transition group w-full"
            >
              <div className="p-2 rounded-lg group-hover:bg-white/10 transition">
                <Home className="h-6 w-6" />
              </div>
              <span className="font-semibold">Home</span>
            </button>
            <button
              onClick={() => navigate('/search')}
              className="flex items-center gap-x-4 text-gray-300 hover:text-white transition group w-full"
            >
              <div className="p-2 rounded-lg group-hover:bg-white/10 transition">
                <Search className="h-6 w-6" />
              </div>
              <span className="font-semibold">Search</span>
            </button>
            <button
              onClick={() => navigate('/library')}
              className="flex items-center gap-x-4 text-gray-300 hover:text-white transition group w-full"
            >
              <div className="p-2 rounded-lg group-hover:bg-white/10 transition">
                <Library className="h-6 w-6" />
              </div>
              <span className="font-semibold">Your Library</span>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <button
              onClick={() => navigate('/liked-songs')}
              className="flex items-center gap-x-4 text-gray-300 hover:text-white transition group w-full"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-400 group-hover:from-indigo-600 group-hover:to-blue-500">
                <Heart className="h-6 w-6" fill="white" />
              </div>
              <span className="font-semibold">Liked Songs</span>
            </button>
            <button
              onClick={() => navigate('/top-songs')}
              className="flex items-center gap-x-4 text-gray-300 hover:text-white transition group w-full"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 group-hover:from-orange-600 group-hover:to-pink-600">
                <Mic2 className="h-6 w-6" />
              </div>
              <span className="font-semibold">Your Top Songs 2023</span>
            </button>
            <button
              onClick={() => navigate('/discover-weekly')}
              className="flex items-center gap-x-4 text-gray-300 hover:text-white transition group w-full"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 group-hover:from-green-600 group-hover:to-emerald-600">
                <ListMusic className="h-6 w-6" />
              </div>
              <span className="font-semibold">Discover Weekly</span>
            </button>
          </div>

          {/* Current Playlist */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4">Current Playlist</h3>
            <div className="space-y-3">
              {playlists[0].tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => setCurrentTrack(track)}
                  className={`flex items-center gap-x-3 p-2 rounded-lg cursor-pointer ${
                    currentTrack.id === track.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`truncate ${currentTrack.id === track.id ? 'text-green-500' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  </div>
                  {currentTrack.id === track.id && isPlaying && (
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gradient-to-b from-neutral-900 to-black p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Player Bar */}
      <div className="h-24 glass-effect border-t border-neutral-800 px-4 flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center gap-x-4">
          <div className="w-14 h-14 bg-neutral-800 rounded-md overflow-hidden">
            <img 
              src={currentTrack.cover}
              alt="Now playing"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium">{currentTrack.title}</h4>
            <p className="text-xs text-gray-400">{currentTrack.artist}</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="ml-4 text-gray-400 hover:text-white transition"
              onClick={() => setShowLyrics(true)}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button 
              className="text-gray-400 hover:text-white transition"
              onClick={() => setShowRecommendations(true)}
            >
              <Sparkles className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-y-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-x-6">
            <button className="text-gray-400 hover:text-white transition">
              <Shuffle className="h-5 w-5" />
            </button>
            <button 
              onClick={handlePreviousTrack}
              className="text-gray-400 hover:text-white transition"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-white rounded-full p-2 hover:scale-105 transition"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-black" fill="black" />
              ) : (
                <Play className="h-6 w-6 text-black" fill="black" />
              )}
            </button>
            <button 
              onClick={handleNextTrack}
              className="text-gray-400 hover:text-white transition"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <Repeat className="h-5 w-5" />
            </button>
          </div>
          <div className="w-full flex items-center gap-x-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <div 
              ref={progressBarRef}
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
              onClick={handleProgressChange}
              onMouseDown={() => setIsDraggingProgress(true)}
              onMouseUp={() => setIsDraggingProgress(false)}
              onMouseLeave={() => setIsDraggingProgress(false)}
            >
              <div 
                className="h-full bg-white group-hover:bg-green-500 rounded-full relative transition-colors"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-x-3">
          <button 
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/10"
          >
            <VolumeIcon />
          </button>
          <div 
            ref={volumeBarRef}
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer relative group"
            onClick={handleVolumeChange}
            onMouseDown={(e) => {
              setIsDraggingVolume(true);
              handleVolumeChange(e);
            }}
          >
            <div 
              className="h-full bg-white group-hover:bg-green-500 rounded-full relative transition-colors"
              style={{ width: `${volume}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"></div>
            </div>
            <div 
              className="absolute -top-8 transform -translate-x-1/2 bg-neutral-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${volume}%` }}
            >
              {Math.round(volume)}%
            </div>
          </div>
          <button
            onClick={() => setCrossfadeEnabled(!crossfadeEnabled)}
            className={`ml-2 px-3 py-1 rounded-full text-xs transition-colors ${
              crossfadeEnabled 
                ? 'bg-green-500 text-black' 
                : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
            }`}
          >
            Crossfade
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;