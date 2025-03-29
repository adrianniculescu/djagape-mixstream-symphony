
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { CollapsibleContent } from "@/components/ui/collapsible";

interface DeckEffectsProps {
  showEffects: boolean;
}

const DeckEffects: React.FC<DeckEffectsProps> = ({ showEffects }) => {
  return (
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
  );
};

export default DeckEffects;
