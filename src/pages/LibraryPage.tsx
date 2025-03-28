
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import TrackList from '../components/TrackList';
import MusicUpload from '../components/MusicUpload';
import { Button } from '@/components/ui/button';
import { Library, Upload, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-dj-background text-dj-text flex flex-col">
      <NavBar />
      
      <div className="pt-20 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Music Library</h1>
            <Button className="bg-dj-primary hover:bg-dj-primary/80">
              <Settings className="mr-2 h-4 w-4" />
              Library Settings
            </Button>
          </div>
          
          <Tabs defaultValue="tracks">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="tracks" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Library className="mr-2 h-4 w-4" />
                My Tracks
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Upload className="mr-2 h-4 w-4" />
                Upload Music
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="mt-4">
              <div className="bg-dj-dark rounded-lg p-4">
                <TrackList showDeckControls={false} />
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="mt-4">
              <div className="bg-dj-dark rounded-lg">
                <MusicUpload />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
