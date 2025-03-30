
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, Music, Disc, ChevronsLeft, ChevronsRight, Music2, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MixerControlsProps {
  crossfade: number;
  setCrossfade: (value: number) => void;
}

const MixerControls: React.FC<MixerControlsProps> = ({ crossfade, setCrossfade }) => {
  const { toast } = useToast();
  
  const syncDecks = () => {
    // In a real app, this would sync BPM between decks
    toast({
      title: "Decks Synced",
      description: "BPM matched between decks"
    });
  };

  const updateEQ = (type: string, value: number, deck: string) => {
    toast({
      title: `${deck} ${type} EQ Updated`,
      description: `Set to ${value}%`
    });
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* EQ Section - Deck A */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-blue-400">DECK A - EQ</h3>
          <div className="grid grid-cols-3 gap-3">
            <EQControl label="HIGH" defaultValue={75} onChange={(v) => updateEQ('HIGH', v, 'Deck A')} color="blue" />
            <EQControl label="MID" defaultValue={75} onChange={(v) => updateEQ('MID', v, 'Deck A')} color="blue" />
            <EQControl label="LOW" defaultValue={75} onChange={(v) => updateEQ('LOW', v, 'Deck A')} color="blue" />
          </div>
        </div>
        
        {/* Crossfader */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-center">CROSSFADER</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Disc className="h-5 w-5 text-black" />
            </div>
            <div className="flex-grow mx-4">
              <Slider
                value={[crossfade]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setCrossfade(value[0])}
                className="h-2"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <Disc className="h-5 w-5 text-black" />
            </div>
          </div>
          <div className="flex justify-between px-2 mt-2">
            <span className="text-xs">Deck A</span>
            <span className="text-xs">{crossfade}%</span>
            <span className="text-xs">Deck B</span>
          </div>
          
          {/* Sync Button */}
          <div className="flex justify-center mt-2">
            <Button 
              onClick={syncDecks}
              className="bg-gradient-to-r from-blue-500 to-red-500 hover:opacity-90 shadow-md"
            >
              <ChevronsLeft className="h-4 w-4" />
              SYNC DECKS
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* EQ Section - Deck B */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-red-400">DECK B - EQ</h3>
          <div className="grid grid-cols-3 gap-3">
            <EQControl label="HIGH" defaultValue={75} onChange={(v) => updateEQ('HIGH', v, 'Deck B')} color="red" />
            <EQControl label="MID" defaultValue={75} onChange={(v) => updateEQ('MID', v, 'Deck B')} color="red" />
            <EQControl label="LOW" defaultValue={75} onChange={(v) => updateEQ('LOW', v, 'Deck B')} color="red" />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">MASTER VOLUME</span>
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider 
              defaultValue={[80]} 
              max={100} 
              step={1} 
              className="h-1.5"
              onValueChange={(val) => {
                toast({
                  title: "Master Volume Changed",
                  description: `Volume set to ${val[0]}%`
                });
              }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">MASTER TEMPO</span>
            <Music className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-1 flex-grow">
              <Slider 
                defaultValue={[128]} 
                min={60} 
                max={200} 
                step={0.1} 
                className="h-1.5"
                onValueChange={(val) => {
                  toast({
                    title: "Master Tempo Changed",
                    description: `BPM set to ${val[0].toFixed(1)}`
                  });
                }}
              />
              <div className="flex flex-col">
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">HEADPHONE MIX</span>
            <div className="flex-grow">
              <Slider defaultValue={[50]} max={100} step={1} className="h-1.5" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">HEADPHONE VOL</span>
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider defaultValue={[70]} max={100} step={1} className="h-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface EQControlProps {
  label: string;
  defaultValue: number;
  onChange: (value: number) => void;
  color: string;
}

const EQControl: React.FC<EQControlProps> = ({ label, defaultValue, onChange, color }) => {
  const getBackgroundColor = () => {
    if (color === "blue") return "bg-blue-500/30";
    if (color === "red") return "bg-red-500/30";
    return "bg-gray-500/30";
  };
  
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="h-24 w-full flex justify-center my-1">
        <Slider
          defaultValue={[defaultValue]}
          max={100}
          step={1}
          orientation="vertical"
          className={`h-full w-1.5 ${getBackgroundColor()}`}
          onValueChange={(val) => onChange(val[0])}
        />
      </div>
      <span className="text-xs font-mono">0 dB</span>
    </div>
  );
};

export default MixerControls;
