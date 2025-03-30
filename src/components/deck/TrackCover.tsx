
import React from 'react';
import { cn } from "@/lib/utils";

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
  // Map deck color strings to actual Tailwind classes
  const getColorClass = (color: string) => {
    switch (color) {
      case 'dj-deck1': return 'bg-dj-deck1/80';
      case 'dj-deck2': return 'bg-dj-deck2/80';
      default: return 'bg-gray-500/80';
    }
  };

  return (
    <div className="relative w-full sm:w-1/3 aspect-square rounded-lg overflow-hidden bg-black flex-shrink-0">
      <img 
        src={coverUrl} 
        alt={trackTitle} 
        className="w-full h-full object-cover"
      />
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("w-16 h-16 rounded-full animate-spin-slow flex items-center justify-center", getColorClass(deckColor))}>
            <div className="w-4 h-4 rounded-full bg-black"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackCover;
