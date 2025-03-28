
import React, { useState } from 'react';
import { Play, Pause, SkipBack, Volume2, Disc, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const deckColor = side === 'left' ? 'dj-deck1' : 'dj-deck2';
  const deckLabel = side === 'left' ? 'A' : 'B';

  return (
    <div className={`bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold text-${deckColor}`}>Deck {deckLabel}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative w-full sm:w-1/3 aspect-square rounded-lg overflow-hidden bg-black flex-shrink-0">
          <img 
            src={coverUrl} 
            alt={trackTitle} 
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-16 h-16 rounded-full bg-${deckColor}/80 animate-spin-slow flex items-center justify-center`}>
                <div className="w-4 h-4 rounded-full bg-black"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="mb-4">
            <h4 className="font-semibold truncate">{trackTitle}</h4>
            <p className="text-sm text-gray-400">{trackArtist}</p>
          </div>

          <div className="waveform mb-4">
            <div className="absolute inset-0 flex items-end justify-around px-1">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 bg-${deckColor}/70 rounded-t`}
                  style={{ 
                    height: `${Math.random() * 70 + 10}%`,
                    opacity: isPlaying ? 1 : 0.5
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">BPM</label>
              <div className="font-mono text-lg">128.0</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">KEY</label>
              <div className="font-mono text-lg">Cm</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs text-gray-400">PITCH</label>
            <span className="text-xs font-mono">{pitch > 0 ? `+${pitch}` : pitch}%</span>
          </div>
          <Slider
            defaultValue={[0]}
            min={-8}
            max={8}
            step={0.1}
            onValueChange={(value) => setPitch(parseFloat(value[0].toFixed(1)))}
            className={`h-1.5`}
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs text-gray-400">VOLUME</label>
            <span className="text-xs font-mono">{volume}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className={`h-1.5`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button size="icon" variant="outline">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button 
          onClick={togglePlay}
          className={`bg-${deckColor} hover:bg-${deckColor}/80`}
        >
          {isPlaying ? (
            <Pause className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
    </div>
  );
};

export default MixerDeck;
