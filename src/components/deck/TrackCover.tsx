
import React from 'react';

interface TrackCoverProps {
  coverUrl: string;
  trackTitle: string;
  isPlaying: boolean;
  deckColor: string;
}

const TrackCover: React.FC<TrackCoverProps> = ({
  coverUrl,
  trackTitle,
  isPlaying,
  deckColor
}) => {
  // Map deck color strings to actual CSS classes
  const getColorClass = () => {
    if (deckColor === 'blue-500') return 'bg-blue-500';
    if (deckColor === 'red-500') return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <div className="relative w-full sm:w-1/3 aspect-square rounded-lg overflow-hidden bg-black flex-shrink-0">
      {coverUrl && (
        <img 
          src={coverUrl} 
          alt={trackTitle} 
          className="w-full h-full object-cover"
        />
      )}
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 rounded-full animate-spin flex items-center justify-center ${getColorClass()} bg-opacity-80`}>
            <div className="w-4 h-4 rounded-full bg-black"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackCover;
