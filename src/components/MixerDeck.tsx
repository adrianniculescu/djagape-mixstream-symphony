
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Disc, Repeat, BarChart2, Shuffle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const deckColor = side === 'left' ? 'dj-deck1' : 'dj-deck2';
  const deckLabel = side === 'left' ? 'A' : 'B';

  return (
    <div className={`bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border border-gray-800 p-4 flex flex-col`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-bold text-${deckColor}`}>Deck {deckLabel}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={`h-7 w-7 ${loopEnabled ? `border-${deckColor} text-${deckColor}` : ''}`}
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
          <Collapsible open={showEffects} onOpenChange={setShowEffects}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-7 w-7 ${showEffects ? `border-${deckColor} text-${deckColor}` : ''}`}
              >
                <BarChart2 className="h-3.5 w-3.5" />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-3">
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
          <div className="mb-3">
            <h4 className="font-semibold truncate">{trackTitle}</h4>
            <p className="text-sm text-gray-400">{trackArtist}</p>
          </div>

          <div className="waveform mb-3 relative">
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
            <div 
              className={`absolute top-0 bottom-0 left-0 bg-${deckColor}/20`} 
              style={{ width: `${(currentTime / totalTime) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(totalTime - currentTime)}</span>
          </div>

          <Slider
            value={[currentTime]}
            max={totalTime}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0])}
            className="h-1.5 mb-3"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400">BPM</label>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 text-gray-400 hover:text-white"
                    onClick={() => setKeylock(!keylock)}
                  >
                    <span className="text-[10px] font-bold">
                      {keylock ? 'KL' : 'KL'}
                    </span>
                  </Button>
                  <span className="font-mono text-sm">128.0</span>
                </div>
              </div>
              <Slider
                defaultValue={[128]}
                min={70}
                max={180}
                step={0.1}
                className="h-1.5"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400">KEY</label>
                <span className="font-mono text-sm">Cm</span>
              </div>
              <Slider
                defaultValue={[0]}
                min={-6}
                max={6}
                step={1}
                className="h-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      <Collapsible open={showEffects} onOpenChange={setShowEffects}>
        <CollapsibleContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-900 rounded-md mb-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">ECHO</label>
              <Slider defaultValue={[0]} max={100} step={1} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">REVERB</label>
              <Slider defaultValue={[0]} max={100} step={1} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">FILTER</label>
              <Slider defaultValue={[50]} max={100} step={1} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">FLANGER</label>
              <Slider defaultValue={[0]} max={100} step={1} className="h-1.5" />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs text-gray-400">PITCH</label>
            <span className="text-xs font-mono">{pitch > 0 ? `+${pitch}` : pitch}%</span>
          </div>
          <Slider
            value={[pitch]}
            min={-8}
            max={8}
            step={0.1}
            onValueChange={(value) => setPitch(parseFloat(value[0].toFixed(1)))}
            className="h-1.5"
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
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="h-1.5"
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
          className={`bg-${deckColor} hover:bg-${deckColor}/80 px-6`}
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
    </div>
  );
};

export default MixerDeck;

