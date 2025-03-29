
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import MixerDeck from '../components/MixerDeck';
import { Slider } from "@/components/ui/slider";
import TrackList from '../components/TrackList';
import { Button } from '@/components/ui/button';
import { Disc, Mic, CircleStop, Save } from 'lucide-react';
import { Track } from '../components/TrackList';

const MixerPage = () => {
  const [crossfade, setCrossfade] = useState(50);
  const [leftDeckTrack, setLeftDeckTrack] = useState<Track | null>(null);
  const [rightDeckTrack, setRightDeckTrack] = useState<Track | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleTrackSelect = (track: Track, deck: 'left' | 'right') => {
    if (deck === 'left') {
      setLeftDeckTrack(track);
    } else {
      setRightDeckTrack(track);
    }
  };

  return (
    <div className="min-h-screen bg-dj-background text-dj-text flex flex-col">
      <NavBar />
      
      <div className="pt-20 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">DJ Mixer</h1>
          
          {/* Mixer Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <MixerDeck 
              side="left"
              trackTitle={leftDeckTrack?.title || 'No track loaded'}
              trackArtist={leftDeckTrack?.artist || 'Select a track from your library'}
              coverUrl={leftDeckTrack?.coverUrl}
            />
            <MixerDeck 
              side="right"
              trackTitle={rightDeckTrack?.title || 'No track loaded'}
              trackArtist={rightDeckTrack?.artist || 'Select a track from your library'}
              coverUrl={rightDeckTrack?.coverUrl}
            />
          </div>
          
          {/* Crossfader */}
          <div className="bg-gray-900 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-full bg-dj-deck1 flex items-center justify-center">
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
              <div className="w-8 h-8 rounded-full bg-dj-deck2 flex items-center justify-center">
                <Disc className="h-5 w-5 text-black" />
              </div>
            </div>
          </div>
          
          {/* Recording Controls */}
          <div className="flex justify-center mb-8 gap-4">
            <Button
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-700"}
            >
              <CircleStop className={`mr-2 h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            <Button variant="outline" disabled={!isRecording}>
              <Save className="mr-2 h-4 w-4" />
              Save Mix
            </Button>
            <Button variant="outline">
              <Mic className="mr-2 h-4 w-4" />
              Add Microphone
            </Button>
          </div>
          
          {/* Track Browser */}
          <div className="bg-dj-dark rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Track Browser</h2>
            <TrackList onTrackSelect={handleTrackSelect} showDeckControls={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixerPage;
