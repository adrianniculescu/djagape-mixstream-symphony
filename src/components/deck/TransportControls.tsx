
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TransportControlsProps {
  isPlaying: boolean;
  deckColor: string;
  togglePlay: () => void;
}

const TransportControls: React.FC<TransportControlsProps> = ({
  isPlaying,
  deckColor,
  togglePlay
}) => {
  // Get the appropriate button class based on the deck color
  const getButtonClass = () => {
    if (deckColor === 'blue-500') return 'bg-blue-500 hover:bg-blue-600';
    if (deckColor === 'red-500') return 'bg-red-500 hover:bg-red-600';
    return 'bg-gray-500 hover:bg-gray-600';
  };

  return (
    <div className="flex justify-center gap-3 mt-4">
      <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button 
        onClick={togglePlay}
        className={`${getButtonClass()} px-6 text-white`}
      >
        {isPlaying ? (
          <>
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Play
          </>
        )}
      </Button>
      <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700">
        <SkipForward className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TransportControls;
