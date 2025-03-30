
import React from 'react';
import { Button } from "@/components/ui/button";
import { Repeat, Shuffle, BarChart2 } from 'lucide-react';

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
  const getTextColorClass = () => {
    if (deckColor === 'blue-500') return 'text-blue-500';
    if (deckColor === 'red-500') return 'text-red-500';
    return 'text-gray-500';
  };

  const getBorderColorClass = (active: boolean) => {
    if (!active) return '';
    
    if (deckColor === 'blue-500') return 'border-blue-500 text-blue-500';
    if (deckColor === 'red-500') return 'border-red-500 text-red-500';
    return 'border-gray-500 text-gray-500';
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className={`text-lg font-bold ${getTextColorClass()}`}>Deck {deckLabel}</h3>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-7 w-7 ${getBorderColorClass(loopEnabled)}`}
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
          className={`h-7 w-7 ${getBorderColorClass(showEffects)}`}
          onClick={() => setShowEffects(!showEffects)}
        >
          <BarChart2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default DeckHeader;
