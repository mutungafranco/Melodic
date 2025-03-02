import React, { useState, useContext } from 'react';
import { Search as SearchIcon, Play, Pause } from 'lucide-react';
import { playlists } from '../data/playlists';
import { PlayerContext } from '../contexts/PlayerContext';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    setCurrentTrack, 
    isPlaying, 
    currentTrack, 
    togglePlay 
  } = useContext(PlayerContext);

  // Get all tracks from all playlists
  const allTracks = playlists.flatMap(playlist => playlist.tracks);

  // Filter tracks based on search query
  const filteredTracks = allTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="sticky top-0 bg-gradient-to-b from-neutral-900 to-neutral-900/0 pb-6 z-10">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full pl-12 pr-4 py-3 bg-white/10 hover:bg-white/20 focus:bg-white/20 rounded-full text-white placeholder-gray-400 outline-none transition-colors"
          />
        </div>
      </div>

      {searchQuery ? (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid gap-4">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                onClick={() => {
                  if (currentTrack?.id === track.id) {
                    togglePlay();
                  } else {
                    setCurrentTrack(track);
                  }
                }}
              >
                <div className="relative">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <button className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded ${
                    currentTrack?.id === track.id && isPlaying ? 'opacity-100' : ''
                  }`}>
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>
                <div>
                  <h3 className={`font-medium ${
                    currentTrack?.id === track.id ? 'text-green-500' : 'text-white'
                  }`}>{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-5 gap-6">
            {['Pop', 'Hip-Hop', 'Rock', 'Latin', 'Dance', 'Electronic', 'R&B', 'Indie', 'Classical', 'Jazz'].map((category) => (
              <div
                key={category}
                className="aspect-square relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-700 to-blue-500 p-4 cursor-pointer hover:scale-105 transition group"
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold relative z-10">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;