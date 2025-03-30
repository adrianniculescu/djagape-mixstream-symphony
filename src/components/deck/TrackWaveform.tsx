
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
