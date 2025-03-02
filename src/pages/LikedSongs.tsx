import React from 'react';
import { Heart, Clock } from 'lucide-react';

function LikedSongs() {
  const likedSongs = [
    { title: 'Song 1', artist: 'Artist 1', album: 'Album 1', duration: '3:30' },
    { title: 'Song 2', artist: 'Artist 2', album: 'Album 2', duration: '4:15' },
    { title: 'Song 3', artist: 'Artist 3', album: 'Album 3', duration: '2:45' },
    { title: 'Song 4', artist: 'Artist 4', album: 'Album 4', duration: '3:50' },
    { title: 'Song 5', artist: 'Artist 5', album: 'Album 5', duration: '3:20' },
  ];

  return (
    <div>
      <div className="flex items-center gap-x-6 mb-8">
        <div className="w-52 h-52 bg-gradient-to-br from-purple-700 to-blue-500 rounded-lg flex items-center justify-center">
          <Heart className="h-24 w-24 text-white" fill="white" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Playlist</h4>
          <h1 className="text-7xl font-bold mt-2 mb-6">Liked Songs</h1>
          <p className="text-gray-400">123 songs</p>
        </div>
      </div>

      <div className="bg-neutral-900/60 rounded-lg">
        <div className="grid grid-cols-[16px,1fr,1fr,1fr,100px] gap-4 px-6 py-4 text-gray-400 text-sm font-medium">
          <div>#</div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <div>ARTIST</div>
          <div className="flex justify-end">
            <Clock className="h-5 w-5" />
          </div>
        </div>
        
        {likedSongs.map((song, index) => (
          <div
            key={index}
            className="grid grid-cols-[16px,1fr,1fr,1fr,100px] gap-4 px-6 py-4 hover:bg-white/5 transition cursor-pointer"
          >
            <div className="text-gray-400">{index + 1}</div>
            <div className="font-medium text-white">{song.title}</div>
            <div className="text-gray-400">{song.album}</div>
            <div className="text-gray-400">{song.artist}</div>
            <div className="text-gray-400 text-right">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedSongs;