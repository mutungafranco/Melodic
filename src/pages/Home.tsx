import React, { useContext } from 'react';
import { Play, Heart } from 'lucide-react';
import { playlists } from '../data/playlists';
import { PlayerContext } from '../contexts/PlayerContext';

function Home() {
  const { setCurrentTrack, currentTrack, isPlaying, togglePlay } = useContext(PlayerContext);
  
  const featuredPlaylists = [
    {
      title: "Today's Top Hits",
      description: "Jung Kook is on top of the Hottest 50!",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "RapCaviar",
      description: "New music from Drake, Travis Scott and more",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Mood Booster",
      description: "Get happy with today's dose of feel-good songs!",
      image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800&auto=format&fit=crop&q=60"
    }
  ];

  // Get the first 6 songs from the playlist for Recently Played
  const recentlyPlayed = playlists[0].tracks.slice(0, 6);

  return (
    <div className="pb-20 home-gradient min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-96 mb-8 rounded-xl overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&auto=format&fit=crop&q=60')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <p className="text-sm font-semibold text-green-400 mb-2">Featured Playlist</p>
          <h1 className="text-6xl font-bold mb-4">Your 2024 Wrapped</h1>
          <p className="text-xl mb-6">Relive your top songs and discover your listening trends</p>
          <div className="flex gap-4">
            <button className="gradient-animate px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              Play Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full font-semibold transition-colors backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Featured Playlists */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-3 gap-6">
          {featuredPlaylists.slice(0, 6).map((playlist, index) => (
            <div 
              key={index}
              className="music-card bg-neutral-800/30 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
                <img 
                  src={playlist.image} 
                  alt={playlist.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute bottom-4 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105 hover:bg-green-400">
                  <Play className="h-6 w-6 text-black" fill="black" />
                </button>
              </div>
              <h3 className="font-semibold mb-1">{playlist.title}</h3>
              <p className="text-sm text-gray-400">{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
        <div className="grid grid-cols-6 gap-4">
          {recentlyPlayed.map((track) => (
            <div
              key={track.id}
              onClick={() => {
                if (currentTrack?.id === track.id) {
                  togglePlay();
                } else {
                  setCurrentTrack(track);
                }
              }}
              className="music-card bg-neutral-800/30 p-4 rounded-lg backdrop-blur-sm cursor-pointer group"
            >
              <div className="relative aspect-square bg-neutral-900 mb-4 rounded-md overflow-hidden">
                <img 
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Play className="h-6 w-6 text-black" fill="black" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Play className="h-6 w-6 text-black" fill="black" />
                    </div>
                  )}
                </div>
              </div>
              <h3 className={`font-medium text-sm truncate ${currentTrack?.id === track.id ? 'text-green-500' : ''}`}>
                {track.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {track.artist}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;