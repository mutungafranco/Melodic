import React from 'react';
import { Sparkles, Play } from 'lucide-react';

interface RecommendationPanelProps {
  isVisible: boolean;
  onClose: () => void;
  currentTrack: {
    title: string;
    artist: string;
  };
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  isVisible,
  onClose,
  currentTrack
}) => {
  const recommendations = [
    {
      title: "In the Night",
      artist: "The Weeknd",
      confidence: 98,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200"
    },
    {
      title: "Starboy",
      artist: "The Weeknd",
      confidence: 95,
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200"
    },
    {
      title: "Save Your Tears",
      artist: "The Weeknd",
      confidence: 92,
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-neutral-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-x-2">
            <Sparkles className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-bold">For You</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400">Because you listened to</p>
          <p className="font-medium">{currentTrack.title} by {currentTrack.artist}</p>
        </div>

        <div className="space-y-4">
          {recommendations.map((track, index) => (
            <div 
              key={index}
              className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-white/5 transition cursor-pointer group"
            >
              <div className="relative w-12 h-12">
                <img 
                  src={track.cover} 
                  alt={track.title}
                  className="w-full h-full object-cover rounded"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                  <Play className="h-6 w-6" fill="white" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{track.title}</h3>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
              <div className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-sm">
                {track.confidence}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-medium mb-2">Why these recommendations?</h3>
            <p className="text-sm text-gray-400">
              Our AI analyzes your listening history, favorite genres, and music features like tempo, energy, and mood to suggest songs you might love.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;