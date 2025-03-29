
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2 } from 'lucide-react';

interface DeckControlsProps {
  pitch: number;
  volume: number;
  setPitch: (value: number) => void;
  setVolume: (value: number) => void;
}

const DeckControls: React.FC<DeckControlsProps> = ({
  pitch,
  volume,
  setPitch,
  setVolume
}) => {
  return (
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
  );
};

export default DeckControls;
