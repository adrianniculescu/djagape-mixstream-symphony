
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
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Get the proper color class based on the deck color
  const getSliderClass = () => {
    if (deckColor === 'blue-500') return 'bg-blue-500';
    if (deckColor === 'red-500') return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <>
      <Slider
        value={[currentTime]}
        max={totalTime || 100}
        step={1}
        onValueChange={(value) => onTimeChange(value[0])}
        className="h-1.5 mb-3"
      />
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{formatTime(currentTime)}</span>
        <span>-{formatTime(totalTime - currentTime)}</span>
      </div>
    </>
  );
};

export default TrackWaveform;
