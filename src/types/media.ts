export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  type: 'audio' | 'youtube' | 'soundcloud';
  url: string;
  duration?: string;
}

export interface Playlist {
  title: string;
  tracks: Track[];
}