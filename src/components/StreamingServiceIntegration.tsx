
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Headphones } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const StreamingServiceIntegration = () => {
  const [isConnectingService, setIsConnectingService] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);

  const connectService = (service: string) => {
    setIsConnectingService(true);
    setSelectedService(service);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnectingService(false);
      setConnectedServices(prev => [...prev, service]);
      toast({
        title: "Connection Successful",
        description: `Your ${service} account has been connected.`,
      });
    }, 1500);
  };

  const disconnectService = (service: string) => {
    setConnectedServices(prev => prev.filter(s => s !== service));
    toast({
      title: "Disconnected",
      description: `Your ${service} account has been disconnected.`,
    });
  };

  const isConnected = (service: string) => connectedServices.includes(service);

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
            <img 
              src="/lovable-uploads/a79dd8ce-7ca8-4c61-9a13-72c6a5eacd6f.png" 
              alt="Spotify Logo" 
              className="h-12 w-12 object-contain" 
            />
            <div className="flex-grow">
              <h4 className="font-medium">Spotify Integration</h4>
              <p className="text-sm text-gray-400">Access your Spotify playlists and tracks</p>
            </div>
            {isConnected('Spotify') ? (
              <Button 
                onClick={() => disconnectService('Spotify')}
                className="bg-red-600 hover:bg-red-700"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={() => connectService('Spotify')}
                disabled={isConnectingService && selectedService === 'Spotify'}
                className="bg-green-600 hover:bg-green-700"
              >
                {isConnectingService && selectedService === 'Spotify' ? 'Connecting...' : 'Connect'}
              </Button>
            )}
          </div>
          
          {isConnected('Spotify') && (
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-sm text-green-400">✓ Connected to Spotify</p>
              <p className="text-xs text-gray-400 mt-1">Your playlists and saved tracks are now available in the track browser</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="beatport" className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
            <Globe className="h-12 w-12 text-blue-500" />
            <div className="flex-grow">
              <h4 className="font-medium">Beatport Integration</h4>
              <p className="text-sm text-gray-400">Access your Beatport purchases and playlists</p>
            </div>
            {isConnected('Beatport') ? (
              <Button 
                onClick={() => disconnectService('Beatport')}
                className="bg-red-600 hover:bg-red-700"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={() => connectService('Beatport')}
                disabled={isConnectingService && selectedService === 'Beatport'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isConnectingService && selectedService === 'Beatport' ? 'Connecting...' : 'Connect'}
              </Button>
            )}
          </div>
          
          {isConnected('Beatport') && (
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-sm text-blue-400">✓ Connected to Beatport</p>
              <p className="text-xs text-gray-400 mt-1">Your purchases and playlists are now available in the track browser</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="applemusic" className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
            <Headphones className="h-12 w-12 text-red-500" />
            <div className="flex-grow">
              <h4 className="font-medium">Apple Music Integration</h4>
              <p className="text-sm text-gray-400">Access your Apple Music library and playlists</p>
            </div>
            {isConnected('Apple Music') ? (
              <Button 
                onClick={() => disconnectService('Apple Music')}
                className="bg-red-600 hover:bg-red-700"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={() => connectService('Apple Music')}
                disabled={isConnectingService && selectedService === 'Apple Music'}
                className="bg-red-600 hover:bg-red-700"
              >
                {isConnectingService && selectedService === 'Apple Music' ? 'Connecting...' : 'Connect'}
              </Button>
            )}
          </div>
          
          {isConnected('Apple Music') && (
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <p className="text-sm text-red-400">✓ Connected to Apple Music</p>
              <p className="text-xs text-gray-400 mt-1">Your library and playlists are now available in the track browser</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreamingServiceIntegration;
