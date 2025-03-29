
import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import MixerDeck from '../components/MixerDeck';
import { Slider } from "@/components/ui/slider";
import TrackList from '../components/TrackList';
import { Button } from '@/components/ui/button';
import { Disc, Mic, CircleStop, Save, BarChart2, Pause, Clock, List, DownloadCloud, Upload } from 'lucide-react';
import { Track } from '../components/TrackList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import MixerControls from '@/components/MixerControls';
import RecordingPanel from '@/components/RecordingPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const MixerPage = () => {
  const [crossfade, setCrossfade] = useState(50);
  const [leftDeckTrack, setLeftDeckTrack] = useState<Track | null>(null);
  const [rightDeckTrack, setRightDeckTrack] = useState<Track | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingFormat, setRecordingFormat] = useState("wav");
  const [mixerLayout, setMixerLayout] = useState<'2deck' | '4deck'>('2deck');
  
  const recordingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackSelect = (track: Track, deck: 'left' | 'right') => {
    if (deck === 'left') {
      setLeftDeckTrack(track);
      toast({
        title: "Track loaded",
        description: `${track.title} loaded to Deck A`,
      });
    } else {
      setRightDeckTrack(track);
      toast({
        title: "Track loaded",
        description: `${track.title} loaded to Deck B`,
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Your mix is now being recorded."
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Your recording has been saved."
      });
      setRecordingTime(0);
    }
  };

  const saveRecording = () => {
    if (isRecording) {
      toggleRecording();
    }
    toast({
      title: "Mix exported",
      description: `Your mix has been exported as ${recordingFormat.toUpperCase()}`
    });
  };

  return (
    <div className="min-h-screen bg-dj-background text-dj-text flex flex-col">
      <NavBar />
      
      <div className="pt-16 pb-8 flex-grow overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={75} className="px-4 overflow-auto">
            <div className="max-w-7xl mx-auto pt-4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">DJ Mixer Pro</h1>
                <div className="flex items-center gap-4">
                  <Select value={mixerLayout} onValueChange={(value: '2deck' | '4deck') => setMixerLayout(value)}>
                    <SelectTrigger className="w-[140px] bg-gray-800">
                      <SelectValue placeholder="Layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2deck">2 Deck Layout</SelectItem>
                      <SelectItem value="4deck">4 Deck Layout</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-md">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-mono">BPM: 128.0</span>
                  </div>
                </div>
              </div>
              
              {/* Mixer Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
              
              {/* Mixer Controls Section */}
              <MixerControls crossfade={crossfade} setCrossfade={setCrossfade} />
              
              {/* Recording Controls */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Recording Studio</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={toggleRecording}
                        className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-dj-primary hover:bg-dj-primary/80"}
                      >
                        {isRecording ? (
                          <>
                            <CircleStop className="mr-2 h-4 w-4 animate-pulse" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <CircleStop className="mr-2 h-4 w-4" />
                            Start Recording
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={saveRecording} disabled={!isRecording && recordingTime === 0}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Mix
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-black/60 p-2 rounded-md font-mono text-xl flex-grow text-center">
                      {formatTime(recordingTime)}
                    </div>
                    <Select value={recordingFormat} onValueChange={setRecordingFormat}>
                      <SelectTrigger className="w-[100px] bg-gray-800">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wav">WAV</SelectItem>
                        <SelectItem value="mp3">MP3</SelectItem>
                        <SelectItem value="flac">FLAC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="border-dj-accent text-dj-accent hover:bg-dj-accent/10">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Mix
                    </Button>
                    <Button variant="outline">
                      <DownloadCloud className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={25} className="overflow-hidden px-4">
            <Tabs defaultValue="browser" className="h-full">
              <div className="flex justify-between items-center py-2">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="browser">Track Browser</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                  <TabsTrigger value="recordings">Recordings</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4 mr-2" />
                  Playlists
                </Button>
              </div>
              
              <TabsContent value="browser" className="h-[calc(100%-48px)] overflow-auto">
                <TrackList onTrackSelect={handleTrackSelect} showDeckControls={true} />
              </TabsContent>
              
              <TabsContent value="effects" className="h-[calc(100%-48px)] p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {['Echo', 'Reverb', 'Flanger', 'Filter', 'BitCrusher', 'Delay', 'Phaser', 'Distortion'].map(effect => (
                    <div key={effect} className="bg-gray-800 p-3 rounded-lg flex flex-col">
                      <span className="font-medium mb-2">{effect}</span>
                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        className="h-1.5 mb-2"
                      />
                      <Button variant="outline" size="sm">Apply</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recordings" className="h-[calc(100%-48px)] overflow-auto">
                <RecordingPanel />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MixerPage;
