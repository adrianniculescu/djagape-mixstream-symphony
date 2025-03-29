
import React from 'react';
import { Button } from "@/components/ui/button";
import { Repeat, Shuffle, BarChart2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DeckHeaderProps {
  deckLabel: string;
  deckColor: string;
  loopEnabled: boolean;
  showEffects: boolean;
  setLoopEnabled: (enabled: boolean) => void;
  setShowEffects: (show: boolean) => void;
}

const DeckHeader: React.FC<DeckHeaderProps> = ({
  deckLabel,
  deckColor,
  loopEnabled,
  showEffects,
  setLoopEnabled,
  setShowEffects
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className={cn(`text-lg font-bold text-${deckColor}`)}>Deck {deckLabel}</h3>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(`h-7 w-7`, loopEnabled ? `border-${deckColor} text-${deckColor}` : '')}
          onClick={() => setLoopEnabled(!loopEnabled)}
        >
          <Repeat className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
        >
          <Shuffle className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(`h-7 w-7`, showEffects ? `border-${deckColor} text-${deckColor}` : '')}
          onClick={() => setShowEffects(!showEffects)}
        >
          <BarChart2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default DeckHeader;
