import React from 'react';
import { Trophy, Clock } from 'lucide-react';

function TopSongs() {
  const topSongs = [
    { title: 'Your #1 Song', artist: 'Top Artist 1', album: 'Album 1', plays: '245 plays', duration: '3:30' },
    { title: 'Your #2 Song', artist: 'Top Artist 2', album: 'Album 2', plays: '198 plays', duration: '4:15' },
    { title: 'Your #3 Song', artist: 'Top Artist 3', album: 'Album 3', plays: '156 plays', duration: '2:45' },
    { title: 'Your #4 Song', artist: 'Top Artist 4', album: 'Album 4', plays: '134 plays', duration: '3:50' },
    { title: 'Your #5 Song', artist: 'Top Artist 5', album: 'Album 5', plays: '112 plays', duration: '3:20' },
  ];

  return (
    <div>
      <div className="flex items-center gap-x-6 mb-8">
        <div className="w-52 h-52 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Trophy className="h-24 w-24 text-white" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Playlist</h4>
          <h1 className="text-7xl font-bold mt-2 mb-6">Your Top Songs 2023</h1>
          <p className="text-gray-400">The music that defined your year</p>
        </div>
      </div>

      <div className="bg-neutral-900/60 rounded-lg">
        <div className="grid grid-cols-[16px,1fr,1fr,1fr,120px,100px] gap-4 px-6 py-4 text-gray-400 text-sm font-medium">
          <div>#</div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <div>ARTIST</div>
          <div>PLAYS</div>
          <div className="flex justify-end">
            <Clock className="h-5 w-5" />
          </div>
        </div>
        
        {topSongs.map((song, index) => (
          <div
            key={index}
            className="grid grid-cols-[16px,1fr,1fr,1fr,120px,100px] gap-4 px-6 py-4 hover:bg-white/5 transition cursor-pointer"
          >
            <div className="text-gray-400">{index + 1}</div>
            <div className="font-medium text-white">{song.title}</div>
            <div className="text-gray-400">{song.album}</div>
            <div className="text-gray-400">{song.artist}</div>
            <div className="text-gray-400">{song.plays}</div>
            <div className="text-gray-400 text-right">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSongs;