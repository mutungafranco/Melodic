import React from 'react';
import { Clock, ListMusic } from 'lucide-react';

function Library() {
  const playlists = [
    { name: 'Liked Songs', songs: 123, lastPlayed: '2 hours ago' },
    { name: 'Your Top Songs 2023', songs: 100, lastPlayed: '3 days ago' },
    { name: 'Discover Weekly', songs: 30, lastPlayed: '1 week ago' },
    { name: 'Release Radar', songs: 30, lastPlayed: '2 weeks ago' },
    { name: 'Daily Mix 1', songs: 50, lastPlayed: '1 month ago' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Library</h1>
      
      <div className="bg-neutral-900 rounded-lg">
        <div className="grid grid-cols-[1fr,100px,200px] gap-4 px-6 py-4 text-gray-400 text-sm font-medium">
          <div>TITLE</div>
          <div className="text-right">SONGS</div>
          <div className="text-right">LAST PLAYED</div>
        </div>
        
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr,100px,200px] gap-4 px-6 py-4 hover:bg-white/5 transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className="w-12 h-12 bg-neutral-800 rounded flex items-center justify-center">
                <ListMusic className="h-6 w-6" />
              </div>
              <span className="font-medium text-white">{playlist.name}</span>
            </div>
            <div className="text-right text-gray-400 self-center">{playlist.songs}</div>
            <div className="text-right text-gray-400 self-center">{playlist.lastPlayed}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;