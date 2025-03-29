
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface TempoControlsProps {
  keylock: boolean;
  setKeylock: (locked: boolean) => void;
}

const TempoControls: React.FC<TempoControlsProps> = ({
  keylock,
  setKeylock
}) => {
  return (
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
  );
};

export default TempoControls;
