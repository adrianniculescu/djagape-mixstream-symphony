
import React, { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import DeckHeader from './deck/DeckHeader';
import TrackCover from './deck/TrackCover';
import TrackWaveform from './deck/TrackWaveform';
import TempoControls from './deck/TempoControls';
import DeckEffects from './deck/DeckEffects';
import DeckControls from './deck/DeckControls';
import TransportControls from './deck/TransportControls';
import { useToast } from "@/hooks/use-toast";

interface MixerDeckProps {
  side: 'left' | 'right';
  trackTitle?: string;
  trackArtist?: string;
  coverUrl?: string;
}

const MixerDeck: React.FC<MixerDeckProps> = ({ 
  side, 
  trackTitle = 'No track loaded', 
  trackArtist = 'Select a track from your library',
  coverUrl = 'https://picsum.photos/seed/empty/300/300'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [pitch, setPitch] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(180); // 3 minutes in seconds (example)
  const [showEffects, setShowEffects] = useState(false);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [keylock, setKeylock] = useState(true);
  const { toast } = useToast();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Playback Paused" : "Playback Started",
      description: `${trackTitle} - ${trackArtist}`
    });
  };

  const deckColor = side === 'left' ? 'blue-500' : 'red-500';
  const deckLabel = side === 'left' ? 'A' : 'B';
  const textColor = side === 'left' ? 'text-blue-400' : 'text-red-400';
  const bgColor = side === 'left' ? 'bg-blue-500' : 'bg-red-500';
  const borderColor = side === 'left' ? 'border-blue-500' : 'border-red-500';

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border border-gray-800 p-4 flex flex-col shadow-lg">
      <div className={`${textColor} font-bold text-lg mb-2`}>Deck {deckLabel}</div>
      
      <DeckHeader 
        deckLabel={deckLabel} 
        deckColor={deckColor}
        loopEnabled={loopEnabled}
        showEffects={showEffects}
        setLoopEnabled={setLoopEnabled}
        setShowEffects={setShowEffects}
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-3">
        <TrackCover 
          coverUrl={coverUrl}
          trackTitle={trackTitle}
          isPlaying={isPlaying}
          deckColor={deckColor}
        />
        
        <div className="flex-grow">
          <div className="mb-3">
            <h4 className="font-semibold truncate">{trackTitle}</h4>
            <p className="text-sm text-gray-400">{trackArtist}</p>
          </div>

          <div className="waveform mb-3 relative h-16 bg-gray-800 rounded">
            <div className="absolute inset-0 flex items-end justify-around px-1">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 ${bgColor} rounded-t`}
                  style={{ 
                    height: `${Math.random() * 70 + 10}%`,
                    opacity: isPlaying ? 1 : 0.5
                  }}
                ></div>
              ))}
            </div>
            <div 
              className={`absolute top-0 bottom-0 left-0 ${side === 'left' ? 'bg-blue-500/20' : 'bg-red-500/20'}`} 
              style={{ width: `${(currentTime / totalTime) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>-{Math.floor((totalTime - currentTime) / 60)}:{((totalTime - currentTime) % 60).toString().padStart(2, '0')}</span>
          </div>

          <TempoControls 
            keylock={keylock}
            setKeylock={setKeylock}
          />
        </div>
      </div>

      <Collapsible open={showEffects} onOpenChange={setShowEffects}>
        <DeckEffects showEffects={showEffects} />
      </Collapsible>

      <DeckControls 
        pitch={pitch}
        volume={volume}
        setPitch={setPitch}
        setVolume={setVolume}
      />

      <TransportControls 
        isPlaying={isPlaying}
        deckColor={deckColor}
        togglePlay={togglePlay}
      />
    </div>
  );
};

export default MixerDeck;
