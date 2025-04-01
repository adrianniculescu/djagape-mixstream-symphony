
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Headphones, RefreshCw, Clock, Check, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const StreamingServiceIntegration = () => {
  const [isConnectingService, setIsConnectingService] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);
  const [syncEnabled, setSyncEnabled] = useState<Record<string, boolean>>({
    Spotify: false,
    Beatport: false,
    'Apple Music': false
  });
  const [syncProgress, setSyncProgress] = useState<Record<string, number>>({
    Spotify: 0,
    Beatport: 0,
    'Apple Music': 0
  });
  const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({
    Spotify: false,
    Beatport: false,
    'Apple Music': false
  });
  const [lastSynced, setLastSynced] = useState<Record<string, string>>({
    Spotify: 'Never',
    Beatport: 'Never',
    'Apple Music': 'Never'
  });
  const [trackCounts, setTrackCounts] = useState<Record<string, number>>({
    Spotify: 0,
    Beatport: 0,
    'Apple Music': 0
  });

  // Connect to music service
  const connectService = (service: string) => {
    setIsConnectingService(true);
    setSelectedService(service);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnectingService(false);
      if (!connectedServices.includes(service)) {
        setConnectedServices(prev => [...prev, service]);
        // Set some sample track counts for demonstration
        setTrackCounts(prev => ({
          ...prev,
          [service]: service === 'Spotify' ? 1240 : service === 'Beatport' ? 356 : 847
        }));
      }
      toast({
        title: "Connection Successful",
        description: `Your ${service} account has been connected.`,
      });
    }, 1500);
  };

  const disconnectService = (service: string) => {
    setConnectedServices(prev => prev.filter(s => s !== service));
    setSyncEnabled(prev => ({ ...prev, [service]: false }));
    setTrackCounts(prev => ({ ...prev, [service]: 0 }));
    toast({
      title: "Disconnected",
      description: `Your ${service} account has been disconnected.`,
    });
  };

  const isConnected = (service: string) => connectedServices.includes(service);

  // Toggle sync for a service
  const toggleSync = (service: string) => {
    setSyncEnabled(prev => {
      const newState = { ...prev, [service]: !prev[service] };
      
      if (newState[service]) {
        toast({
          title: "Sync Enabled",
          description: `Your ${service} library will now sync with the mixer.`,
        });
        // Start initial sync when enabled
        startSync(service);
      } else {
        toast({
          title: "Sync Disabled",
          description: `Your ${service} library will no longer sync with the mixer.`,
        });
      }
      
      return newState;
    });
  };

  // Start sync process for a service
  const startSync = (service: string) => {
    if (isSyncing[service]) return;
    
    setIsSyncing(prev => ({ ...prev, [service]: true }));
    setSyncProgress(prev => ({ ...prev, [service]: 0 }));
    
    toast({
      title: "Synchronization Started",
      description: `Syncing your ${service} library...`,
    });
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        const newProgress = Math.min(prev[service] + Math.random() * 15, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsSyncing(prev => ({ ...prev, [service]: false }));
          setLastSynced(prev => ({ ...prev, [service]: new Date().toLocaleTimeString() }));
          toast({
            title: "Sync Complete",
            description: `Your ${service} library is now synchronized.`,
          });
        }
        
        return { ...prev, [service]: newProgress };
      });
    }, 500);
  };

  // Effect to simulate periodic sync for enabled services
  useEffect(() => {
    const syncInterval = setInterval(() => {
      Object.entries(syncEnabled).forEach(([service, enabled]) => {
        if (enabled && !isSyncing[service] && Math.random() > 0.8) {
          startSync(service);
        }
      });
    }, 30000); // Check for sync every 30 seconds
    
    return () => clearInterval(syncInterval);
  }, [syncEnabled, isSyncing]);

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
            <div className="p-4 bg-gray-800/30 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-green-400 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Connected to Spotify
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {trackCounts['Spotify']} tracks available
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Sync</span>
                    <Switch 
                      checked={syncEnabled['Spotify']}
                      onCheckedChange={() => toggleSync('Spotify')}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => startSync('Spotify')}
                    disabled={isSyncing['Spotify'] || !syncEnabled['Spotify']}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Sync Now
                  </Button>
                </div>
              </div>
              
              {syncEnabled['Spotify'] && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Last synced: {lastSynced['Spotify']}</span>
                    {isSyncing['Spotify'] && <span>Syncing...</span>}
                  </div>
                  {isSyncing['Spotify'] && (
                    <Progress value={syncProgress['Spotify']} className="h-2" />
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">Auto BPM Detection</Badge>
                    <Badge variant="outline" className="text-xs">Smart Track Matching</Badge>
                    <Badge variant="outline" className="text-xs">Real-time Updates</Badge>
                  </div>
                </div>
              )}
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
            <div className="p-4 bg-gray-800/30 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-400 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Connected to Beatport
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {trackCounts['Beatport']} tracks available
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Sync</span>
                    <Switch 
                      checked={syncEnabled['Beatport']}
                      onCheckedChange={() => toggleSync('Beatport')}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => startSync('Beatport')}
                    disabled={isSyncing['Beatport'] || !syncEnabled['Beatport']}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Sync Now
                  </Button>
                </div>
              </div>
              
              {syncEnabled['Beatport'] && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Last synced: {lastSynced['Beatport']}</span>
                    {isSyncing['Beatport'] && <span>Syncing...</span>}
                  </div>
                  {isSyncing['Beatport'] && (
                    <Progress value={syncProgress['Beatport']} className="h-2" />
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">Purchase History</Badge>
                    <Badge variant="outline" className="text-xs">Track Metadata</Badge>
                    <Badge variant="outline" className="text-xs">DJ-ready Formats</Badge>
                  </div>
                </div>
              )}
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
            <div className="p-4 bg-gray-800/30 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-red-400 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Connected to Apple Music
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {trackCounts['Apple Music']} tracks available
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Sync</span>
                    <Switch 
                      checked={syncEnabled['Apple Music']}
                      onCheckedChange={() => toggleSync('Apple Music')}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => startSync('Apple Music')}
                    disabled={isSyncing['Apple Music'] || !syncEnabled['Apple Music']}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Sync Now
                  </Button>
                </div>
              </div>
              
              {syncEnabled['Apple Music'] && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Last synced: {lastSynced['Apple Music']}</span>
                    {isSyncing['Apple Music'] && <span>Syncing...</span>}
                  </div>
                  {isSyncing['Apple Music'] && (
                    <Progress value={syncProgress['Apple Music']} className="h-2" />
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">iCloud Sync</Badge>
                    <Badge variant="outline" className="text-xs">Playlist Management</Badge>
                    <Badge variant="outline" className="text-xs">High Quality Audio</Badge>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Sync Status Overview */}
      {connectedServices.length > 0 && (
        <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
          <h4 className="font-medium mb-3 text-sm flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Sync Status Overview
          </h4>
          <div className="space-y-3">
            {connectedServices.map(service => (
              <div key={service} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  isSyncing[service] ? 'bg-yellow-500' : 
                  syncEnabled[service] ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-sm">{service}</span>
                <div className="flex-grow"></div>
                <span className="text-xs text-gray-400">
                  {isSyncing[service] ? 'Syncing...' : 
                   syncEnabled[service] ? `Last sync: ${lastSynced[service]}` : 'Sync disabled'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                connectedServices.forEach(service => {
                  if (syncEnabled[service] && !isSyncing[service]) {
                    startSync(service);
                  }
                });
              }}
              disabled={connectedServices.every(service => !syncEnabled[service] || isSyncing[service])}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All Services
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingServiceIntegration;
