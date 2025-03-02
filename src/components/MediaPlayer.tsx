import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { Track } from '../types/media';

interface MediaPlayerProps {
  track: Track;
  isPlaying: boolean;
  onStateChange: (playing: boolean) => void;
  onProgress: (currentTime: number, duration: number) => void;
  volume: number;
  onEnded: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  track,
  isPlaying,
  onStateChange,
  onProgress,
  volume,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubeRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear interval on unmount
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (track.type === 'audio' && audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    if (track.type === 'youtube' && youtubeRef.current?.internalPlayer) {
      youtubeRef.current.internalPlayer.setVolume(volume);
    }
  }, [volume, track.type]);

  useEffect(() => {
    if (track.type === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    if (track.type === 'youtube' && youtubeRef.current?.internalPlayer) {
      if (isPlaying) {
        youtubeRef.current.internalPlayer.playVideo();
      } else {
        youtubeRef.current.internalPlayer.pauseVideo();
      }
    }
  }, [isPlaying, track.type]);

  const handleYouTubeStateChange = (event: any) => {
    // YouTube player states
    const states = {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5,
    };

    switch (event.data) {
      case states.PLAYING:
        onStateChange(true);
        // Start progress tracking
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        progressInterval.current = setInterval(async () => {
          if (youtubeRef.current?.internalPlayer) {
            const currentTime = await youtubeRef.current.internalPlayer.getCurrentTime();
            const duration = await youtubeRef.current.internalPlayer.getDuration();
            onProgress(currentTime, duration);
          }
        }, 1000);
        break;
      case states.PAUSED:
        onStateChange(false);
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        break;
      case states.ENDED:
        onEnded();
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        break;
    }
  };

  const handleYouTubeReady = (event: any) => {
    event.target.setVolume(volume);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  if (track.type === 'youtube') {
    return (
      <div className="hidden">
        <YouTube
          videoId={track.url}
          ref={youtubeRef}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: isPlaying ? 1 : 0,
              controls: 0,
              disablekb: 1,
              enablejsapi: 1,
              modestbranding: 1,
              origin: window.location.origin,
            },
          }}
          onStateChange={handleYouTubeStateChange}
          onReady={handleYouTubeReady}
        />
      </div>
    );
  }

  return (
    <audio
      ref={audioRef}
      src={track.url}
      onTimeUpdate={() => {
        if (audioRef.current) {
          onProgress(audioRef.current.currentTime, audioRef.current.duration);
        }
      }}
      onEnded={onEnded}
      onPlay={() => onStateChange(true)}
      onPause={() => onStateChange(false)}
    />
  );
};

export default MediaPlayer;