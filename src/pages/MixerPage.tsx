
import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import MixerDeck from '../components/MixerDeck';
import { Slider } from "@/components/ui/slider";
import TrackList from '../components/TrackList';
import { Button } from '@/components/ui/button';
import { Disc, Mic, CircleStop, Save, BarChart2, Pause, Clock, List, DownloadCloud, Upload, Keyboard, HelpCircle, Settings } from 'lucide-react';
import { Track } from '../components/TrackList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import MixerControls from '@/components/MixerControls';
import RecordingPanel from '@/components/RecordingPanel';
import MusicUpload from '@/components/MusicUpload';
import StreamingServiceIntegration from '@/components/StreamingServiceIntegration';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const MixerPage = () => {
  const [crossfade, setCrossfade] = useState(50);
  const [leftDeckTrack, setLeftDeckTrack] = useState<Track | null>(null);
  const [rightDeckTrack, setRightDeckTrack] = useState<Track | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingFormat, setRecordingFormat] = useState("mp3");
  const [recordingQuality, setRecordingQuality] = useState("320");
  const [mixerLayout, setMixerLayout] = useState<'2deck' | '4deck'>('2deck');
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const recordingTimerRef = useRef<number | null>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    console.log("MixerPage mounted");
  }, []);

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
        description: `Recording in ${recordingFormat.toUpperCase()} format at ${recordingQuality}kbps.`
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
      description: `Your mix has been exported as ${recordingFormat.toUpperCase()} (${recordingQuality}kbps)`
    });
  };

  const toggleKeyboardShortcuts = () => {
    setShowShortcuts(!showShortcuts);
  };

  // Basic tracks for demo purposes
  const dummyLeftTrack: Track = {
    id: '1',
    title: 'Summer Vibes',
    artist: 'DJ Sunshine',
    bpm: 128,
    duration: 240,
    coverUrl: 'https://picsum.photos/seed/track1/300/300',
    key: 'Cm'
  };
  
  const dummyRightTrack: Track = {
    id: '2',
    title: 'Night Bass',
    artist: 'MC Groove',
    bpm: 130,
    duration: 215,
    coverUrl: 'https://picsum.photos/seed/track2/300/300',
    key: 'Gm'
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />
      
      <div className="flex-grow pt-16 pb-8 px-4">
        <div className="mx-auto max-w-7xl">
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
              
              <Button variant="outline" size="icon" onClick={toggleKeyboardShortcuts}>
                <Keyboard className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Keyboard shortcuts panel */}
          {showShortcuts && (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Keyboard Shortcuts</h3>
                <Button variant="ghost" size="sm" onClick={toggleKeyboardShortcuts}>Close</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">Space</kbd>
                  <span className="text-sm text-gray-300">Play/Pause Active Deck</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">1/2</kbd>
                  <span className="text-sm text-gray-300">Switch Active Deck</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">S</kbd>
                  <span className="text-sm text-gray-300">Sync Decks</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">L</kbd>
                  <span className="text-sm text-gray-300">Toggle Loop</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">R</kbd>
                  <span className="text-sm text-gray-300">Start/Stop Recording</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">←/→</kbd>
                  <span className="text-sm text-gray-300">Move Crossfader</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">Q/W/E</kbd>
                  <span className="text-sm text-gray-300">EQ Controls (Low/Mid/High)</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-900 rounded text-xs">F</kbd>
                  <span className="text-sm text-gray-300">Toggle Fullscreen</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Mixer Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <MixerDeck 
              side="left"
              trackTitle={leftDeckTrack?.title || dummyLeftTrack.title}
              trackArtist={leftDeckTrack?.artist || dummyLeftTrack.artist}
              coverUrl={leftDeckTrack?.coverUrl || dummyLeftTrack.coverUrl}
            />
            <MixerDeck 
              side="right"
              trackTitle={rightDeckTrack?.title || dummyRightTrack.title}
              trackArtist={rightDeckTrack?.artist || dummyRightTrack.artist}
              coverUrl={rightDeckTrack?.coverUrl || dummyRightTrack.coverUrl}
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
                    className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"}
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
                <div className="flex flex-col gap-2">
                  <Select value={recordingFormat} onValueChange={setRecordingFormat}>
                    <SelectTrigger className="w-[100px] bg-gray-800">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="wav">WAV</SelectItem>
                      <SelectItem value="flac">FLAC</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={recordingQuality} onValueChange={setRecordingQuality}>
                    <SelectTrigger className="w-[100px] bg-gray-800">
                      <SelectValue placeholder="Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128 kbps</SelectItem>
                      <SelectItem value="256">256 kbps</SelectItem>
                      <SelectItem value="320">320 kbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
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
          
          {/* Track Browser */}
          <div className="bg-gray-900 rounded-lg p-4">
            <Tabs defaultValue="browser" className="h-full">
              <div className="flex justify-between items-center pb-4">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="browser">Track Browser</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="streaming">Streaming</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                  <TabsTrigger value="recordings">Recordings</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4 mr-2" />
                  Playlists
                </Button>
              </div>
              
              <TabsContent value="browser" className="h-[calc(100%-48px)]">
                <TrackList onTrackSelect={handleTrackSelect} showDeckControls={true} />
              </TabsContent>
              
              <TabsContent value="upload">
                <MusicUpload />
              </TabsContent>
              
              <TabsContent value="streaming">
                <StreamingServiceIntegration />
              </TabsContent>
              
              <TabsContent value="effects">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Effect Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="sm" variant="secondary">Time-Based</Button>
                    <Button size="sm" variant="outline">Modulation</Button>
                    <Button size="sm" variant="outline">Filters</Button>
                    <Button size="sm" variant="outline">Dynamics</Button>
                  </div>
                </div>
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
              
              <TabsContent value="recordings">
                <RecordingPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixerPage;
