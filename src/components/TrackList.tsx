
import React, { useState } from 'react';
import { Play, Pause, Clock, ExternalLink, Music, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  duration: string;
  coverUrl: string;
  key: string;
  source?: 'local' | 'spotify' | 'beatport' | 'applemusic';
}

// Mock track data
const defaultTracks: Track[] = [
  {
    id: '1',
    title: 'Syncopated Rhythm',
    artist: 'Night Sessions',
    bpm: 128,
    duration: '5:32',
    coverUrl: 'https://picsum.photos/seed/track1/300/300',
    key: 'Am',
    source: 'local'
  },
  {
    id: '2',
    title: 'Midnight Express',
    artist: 'DJ Harmony',
    bpm: 130,
    duration: '6:45',
    coverUrl: 'https://picsum.photos/seed/track2/300/300',
    key: 'Fm',
    source: 'spotify'
  },
  {
    id: '3',
    title: 'Euphoric State',
    artist: 'Beat Collective',
    bpm: 124,
    duration: '4:20',
    coverUrl: 'https://picsum.photos/seed/track3/300/300',
    key: 'Gm',
    source: 'beatport'
  },
  {
    id: '4',
    title: 'Deep Dive',
    artist: 'Analog Dreams',
    bpm: 122,
    duration: '7:12',
    coverUrl: 'https://picsum.photos/seed/track4/300/300',
    key: 'Cm',
    source: 'applemusic'
  },
  {
    id: '5',
    title: 'Urban Echo',
    artist: 'Audio Architects',
    bpm: 126,
    duration: '5:55',
    coverUrl: 'https://picsum.photos/seed/track5/300/300',
    key: 'Dm',
    source: 'local'
  },
  {
    id: '6',
    title: 'Cyber Dreams',
    artist: 'Electronic Wave',
    bpm: 135,
    duration: '4:46',
    coverUrl: 'https://picsum.photos/seed/track6/300/300',
    key: 'Em',
    source: 'spotify'
  },
  {
    id: '7',
    title: 'Sunset Boulevard',
    artist: 'Chill Masters',
    bpm: 118,
    duration: '6:22',
    coverUrl: 'https://picsum.photos/seed/track7/300/300',
    key: 'Am',
    source: 'beatport'
  },
  {
    id: '8',
    title: 'Night Vision',
    artist: 'Future Sounds',
    bpm: 130,
    duration: '5:17',
    coverUrl: 'https://picsum.photos/seed/track8/300/300',
    key: 'Fm',
    source: 'applemusic'
  },
];

interface TrackListProps {
  onTrackSelect?: (track: Track, deck: 'left' | 'right') => void;
  showDeckControls?: boolean;
  customTracks?: Track[];
  onAddTrack?: (track: Track) => void;
}

const TrackList: React.FC<TrackListProps> = ({ 
  onTrackSelect = () => {}, 
  showDeckControls = false,
  customTracks,
  onAddTrack
}) => {
  const [playing, setPlaying] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [tracks, setTracks] = useState<Track[]>(customTracks || defaultTracks);

  // If tracks are provided via props, update the state
  React.useEffect(() => {
    if (customTracks) {
      setTracks(customTracks);
    }
  }, [customTracks]);

  // Add new track to the list
  React.useEffect(() => {
    if (onAddTrack) {
      onAddTrack = (newTrack: Track) => {
        setTracks(prev => [newTrack, ...prev]);
      };
    }
  }, []);

  const togglePlay = (trackId: string) => {
    setPlaying(playing === trackId ? null : trackId);
  };

  const getSourceColor = (source: string | undefined) => {
    switch (source) {
      case 'spotify':
        return 'bg-green-500';
      case 'beatport':
        return 'bg-blue-500';
      case 'applemusic':
        return 'bg-red-500';
      default:
        return 'bg-purple-500';
    }
  };

  const getSourceName = (source: string | undefined) => {
    switch (source) {
      case 'spotify':
        return 'Spotify';
      case 'beatport':
        return 'Beatport';
      case 'applemusic':
        return 'Apple Music';
      default:
        return 'Local Library';
    }
  };

  const filteredTracks = sourceFilter === "all" 
    ? tracks 
    : tracks.filter(track => track.source === sourceFilter);

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">
            {filteredTracks.length} tracks
            {sourceFilter !== "all" && ` from ${getSourceName(sourceFilter)}`}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select 
            defaultValue="all"
            value={sourceFilter}
            onValueChange={setSourceFilter}
          >
            <SelectTrigger className="w-[180px] bg-gray-800 h-8 text-sm">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="local">Local Library</SelectItem>
              <SelectItem value="spotify">Spotify</SelectItem>
              <SelectItem value="beatport">Beatport</SelectItem>
              <SelectItem value="applemusic">Apple Music</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-400">
              <th className="p-3 w-12">#</th>
              <th className="p-3">Title</th>
              <th className="p-3 hidden md:table-cell">Artist</th>
              <th className="p-3 hidden md:table-cell">Source</th>
              <th className="p-3 hidden sm:table-cell">
                <Clock className="h-4 w-4" />
              </th>
              {showDeckControls && (
                <th className="p-3">Deck</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTracks.map((track, i) => (
              <tr 
                key={track.id} 
                className="track-container border-b border-gray-800/50 hover:bg-gray-800/50"
              >
                <td className="p-3 text-gray-400">
                  <div className="relative group">
                    <span className="group-hover:hidden">{i + 1}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hidden group-hover:flex absolute -left-2 -top-2"
                      onClick={() => togglePlay(track.id)}
                    >
                      {playing === track.id ? 
                        <Pause className="h-4 w-4" /> : 
                        <Play className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <img src={track.coverUrl} alt={track.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="truncate">
                      <div className="font-medium truncate max-w-[200px]">{track.title}</div>
                      <div className="text-xs text-gray-400 md:hidden truncate">{track.artist}</div>
                      <div className="flex gap-1 items-center mt-1">
                        <Badge 
                          variant="outline" 
                          className="text-[10px] py-0 h-4 px-1 border-gray-700"
                        >
                          {track.bpm} BPM
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="text-[10px] py-0 h-4 px-1 border-gray-700"
                        >
                          {track.key}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell text-gray-300">{track.artist}</td>
                <td className="p-3 hidden md:table-cell">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${getSourceColor(track.source)}`}></div>
                    <span className="text-gray-400">{getSourceName(track.source)}</span>
                  </div>
                </td>
                <td className="p-3 text-gray-400 hidden sm:table-cell">{track.duration}</td>
                {showDeckControls && (
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs border-blue-500 text-blue-500 hover:bg-blue-500/10"
                        onClick={() => onTrackSelect(track, 'left')}
                      >
                        Deck A
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs border-red-500 text-red-500 hover:bg-red-500/10"
                        onClick={() => onTrackSelect(track, 'right')}
                      >
                        Deck B
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackList;
