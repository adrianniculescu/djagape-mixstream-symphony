
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  // Map deck color strings to actual Tailwind classes for the button
  const getButtonClass = (color: string) => {
    switch (color) {
      case 'dj-deck1': return 'bg-dj-deck1 hover:bg-dj-deck1/80';
      case 'dj-deck2': return 'bg-dj-deck2 hover:bg-dj-deck2/80';
      default: return 'bg-dj-primary hover:bg-dj-primary/80';
    }
  };

  return (
    <div className="flex justify-center gap-3">
      <Button size="icon" variant="outline">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button 
        onClick={togglePlay}
        className={cn(getButtonClass(deckColor), "px-6")}
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
      <Button size="icon" variant="outline">
        <SkipForward className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TransportControls;
