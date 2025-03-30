
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Spotify, Music, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const StreamingServiceIntegration = () => {
  const [isConnectingService, setIsConnectingService] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const connectService = (service: string) => {
    setIsConnectingService(true);
    setSelectedService(service);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnectingService(false);
      toast({
        title: "Connection Successful",
        description: `Your ${service} account has been connected.`,
      });
    }, 1500);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <h3 className="font-semibold mb-4">Connect Music Services</h3>
      
      <Tabs defaultValue="spotify" className="w-full">
        <TabsList className="w-full bg-gray-800 mb-4">
          <TabsTrigger value="spotify" className="flex-1">Spotify</TabsTrigger>
          <TabsTrigger value="beatport" className="flex-1">Beatport</TabsTrigger>
          <TabsTrigger value="applemusic" className="flex-1">Apple Music</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spotify" className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
            <Spotify className="h-12 w-12 text-green-500" />
            <div className="flex-grow">
              <h4 className="font-medium">Spotify Integration</h4>
              <p className="text-sm text-gray-400">Access your Spotify playlists and tracks</p>
            </div>
            <Button 
              onClick={() => connectService('Spotify')}
              disabled={isConnectingService && selectedService === 'Spotify'}
              className="bg-green-600 hover:bg-green-700"
            >
              {isConnectingService && selectedService === 'Spotify' ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="beatport" className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
            <Globe className="h-12 w-12 text-blue-500" />
            <div className="flex-grow">
              <h4 className="font-medium">Beatport Integration</h4>
              <p className="text-sm text-gray-400">Access your Beatport purchases and playlists</p>
            </div>
            <Button 
              onClick={() => connectService('Beatport')}
              disabled={isConnectingService && selectedService === 'Beatport'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isConnectingService && selectedService === 'Beatport' ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="applemusic" className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
            <Music className="h-12 w-12 text-red-500" />
            <div className="flex-grow">
              <h4 className="font-medium">Apple Music Integration</h4>
              <p className="text-sm text-gray-400">Access your Apple Music library and playlists</p>
            </div>
            <Button 
              onClick={() => connectService('Apple Music')}
              disabled={isConnectingService && selectedService === 'Apple Music'}
              className="bg-red-600 hover:bg-red-700"
            >
              {isConnectingService && selectedService === 'Apple Music' ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreamingServiceIntegration;
