
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface TrackWaveformProps {
  currentTime: number;
  totalTime: number;
  deckColor: string;
  isPlaying: boolean;
  onTimeChange: (value: number) => void;
}

const TrackWaveform: React.FC<TrackWaveformProps> = ({
  currentTime,
  totalTime,
  deckColor,
  isPlaying,
  onTimeChange
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
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
        onValueChange={(value) => onTimeChange(value[0])}
        className="h-1.5 mb-3"
      />
    </>
  );
};

export default TrackWaveform;
