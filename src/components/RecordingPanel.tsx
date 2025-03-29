
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Trash2, Share2, DownloadCloud, Clock, Music } from 'lucide-react';

const RecordingPanel = () => {
  // In a real app, this would be fetched from a database or storage
  const recordings = [
    { id: 1, title: 'Summer House Mix 2023', date: '2023-06-15', duration: '01:23:45', size: '127.4 MB' },
    { id: 2, title: 'Deep House Session #4', date: '2023-05-22', duration: '00:45:12', size: '54.8 MB' },
    { id: 3, title: 'EDM Club Mix', date: '2023-05-10', duration: '01:12:30', size: '86.3 MB' },
    { id: 4, title: 'Chill Lofi Beats', date: '2023-04-28', duration: '00:32:15', size: '38.9 MB' },
    { id: 5, title: 'Techno Underground', date: '2023-04-15', duration: '01:45:20', size: '126.7 MB' },
  ];

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-semibold">Your Recorded Mixes</h3>
        <Button variant="outline" size="sm">
          <DownloadCloud className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>
      
      <div className="divide-y divide-gray-800">
        {recordings.map(recording => (
          <div key={recording.id} className="p-4 hover:bg-gray-800/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow">
              <h4 className="font-medium">{recording.title}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{recording.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Music className="h-3.5 w-3.5" />
                  <span>{recording.size}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="default" className="bg-dj-primary hover:bg-dj-primary/80">
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
              <Button size="icon" variant="outline">
                <DownloadCloud className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {recordings.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-400">No recordings yet. Start mixing and hit record!</p>
        </div>
      )}
    </div>
  );
};

export default RecordingPanel;
