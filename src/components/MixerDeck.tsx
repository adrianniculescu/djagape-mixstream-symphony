
import React, { useState, useEffect } from 'react';
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
  const [totalTime, setTotalTime] = useState(180); // 3 minutes in seconds
  const [showEffects, setShowEffects] = useState(false);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [keylock, setKeylock] = useState(true);
  const { toast } = useToast();

  // Timer effect to simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            if (loopEnabled) {
              return 0;
            } else {
              setIsPlaying(false);
              return prev;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalTime, loopEnabled]);

  // Reset timer when track changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [trackTitle]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Playback Paused" : "Playback Started",
      description: `${trackTitle} - ${trackArtist}`
    });
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  const deckColor = side === 'left' ? 'blue-500' : 'red-500';
  const deckLabel = side === 'left' ? 'A' : 'B';
  const textColor = side === 'left' ? 'text-blue-500' : 'text-red-500';
  
  // Console log to debug rendering
  console.log(`Rendering MixerDeck ${deckLabel} with color ${deckColor}`);
  
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col shadow-lg">
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
            <h4 className="font-semibold truncate text-white">{trackTitle}</h4>
            <p className="text-sm text-gray-400">{trackArtist}</p>
          </div>

          <div className="mb-3 relative h-16 bg-gray-800 rounded overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-around px-1">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 ${side === 'left' ? 'bg-blue-500' : 'bg-red-500'} rounded-t`}
                  style={{ 
                    height: `${Math.random() * 70 + 10}%`,
                    opacity: isPlaying ? 1 : 0.5
                  }}
                ></div>
              ))}
            </div>
            <div 
              className={`absolute top-0 bottom-0 left-0 ${side === 'left' ? 'bg-blue-500' : 'bg-red-500'} bg-opacity-20`} 
              style={{ width: `${(currentTime / totalTime) * 100}%` }}
            ></div>
          </div>

          <TrackWaveform
            currentTime={currentTime}
            totalTime={totalTime}
            deckColor={deckColor}
            isPlaying={isPlaying}
            onTimeChange={handleTimeChange}
          />

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
