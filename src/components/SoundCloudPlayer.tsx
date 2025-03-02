import React, { useEffect, useRef } from 'react';

interface SoundCloudPlayerProps {
  track: {
    type: 'soundcloud';
    url: string;
  };
  isPlaying: boolean;
  onStateChange: (playing: boolean) => void;
  onProgress: (currentTime: number, duration: number) => void;
  volume: number;
  onEnded: () => void;
}

declare global {
  interface Window {
    SC: {
      Widget: any;
    }
  }
}

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({
  track,
  isPlaying,
  onStateChange,
  onProgress,
  volume,
  onEnded,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Load the SoundCloud Widget API
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (iframeRef.current) {
        widgetRef.current = window.SC.Widget(iframeRef.current);
        
        widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
          widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => onStateChange(true));
          widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => onStateChange(false));
          widgetRef.current.bind(window.SC.Widget.Events.FINISH, onEnded);
          widgetRef.current.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data: any) => {
            onProgress(data.currentPosition / 1000, data.loadedProgress * 100);
          });
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onStateChange, onEnded, onProgress]);

  useEffect(() => {
    if (widgetRef.current) {
      if (isPlaying) {
        widgetRef.current.play();
      } else {
        widgetRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.setVolume(volume / 100);
    }
  }, [volume]);

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height="166"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=${track.url}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
      style={{ display: 'none' }}
    />
  );
};

export default SoundCloudPlayer;