
import React, { useState } from 'react';
import { Play, Pause, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  duration: string;
  coverUrl: string;
  key: string;
}

// Mock track data
const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Syncopated Rhythm',
    artist: 'Night Sessions',
    bpm: 128,
    duration: '5:32',
    coverUrl: 'https://picsum.photos/seed/track1/300/300',
    key: 'Am'
  },
  {
    id: '2',
    title: 'Midnight Express',
    artist: 'DJ Harmony',
    bpm: 130,
    duration: '6:45',
    coverUrl: 'https://picsum.photos/seed/track2/300/300',
    key: 'Fm'
  },
  {
    id: '3',
    title: 'Euphoric State',
    artist: 'Beat Collective',
    bpm: 124,
    duration: '4:20',
    coverUrl: 'https://picsum.photos/seed/track3/300/300',
    key: 'Gm'
  },
  {
    id: '4',
    title: 'Deep Dive',
    artist: 'Analog Dreams',
    bpm: 122,
    duration: '7:12',
    coverUrl: 'https://picsum.photos/seed/track4/300/300',
    key: 'Cm'
  },
  {
    id: '5',
    title: 'Urban Echo',
    artist: 'Audio Architects',
    bpm: 126,
    duration: '5:55',
    coverUrl: 'https://picsum.photos/seed/track5/300/300',
    key: 'Dm'
  },
];

interface TrackListProps {
  onTrackSelect?: (track: Track, deck: 'left' | 'right') => void;
  showDeckControls?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ 
  onTrackSelect = () => {}, 
  showDeckControls = false
}) => {
  const [playing, setPlaying] = useState<string | null>(null);

  const togglePlay = (trackId: string) => {
    setPlaying(playing === trackId ? null : trackId);
  };

  return (
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
          {mockTracks.map((track, i) => (
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
                  </div>
                </div>
              </td>
              <td className="p-3 hidden md:table-cell text-gray-300">{track.artist}</td>
              <td className="p-3 hidden md:table-cell">
                <div className="flex items-center gap-1.5">
                  <div className={`
                    w-2 h-2 rounded-full 
                    ${i % 2 === 0 ? 'bg-blue-500' : 
                      i % 3 === 0 ? 'bg-red-500' : 
                      'bg-purple-500'}
                  `}></div>
                  <span className="text-gray-400">{i % 2 === 0 ? 'Local Library' : i % 3 === 0 ? 'Beatport' : 'Spotify'}</span>
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
  );
};

export default TrackList;
// Only export the interface once
