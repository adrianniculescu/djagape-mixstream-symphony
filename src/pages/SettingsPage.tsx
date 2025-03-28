
import React from 'react';
import NavBar from '../components/NavBar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Sliders, 
  Headphones, 
  HardDrive, 
  Music2, 
  Link, 
  Save,
  Volume2 
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-dj-background text-dj-text flex flex-col">
      <NavBar />
      
      <div className="pt-20 px-4 md:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-gray-900 grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="profile" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Headphones className="mr-2 h-4 w-4" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="storage" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <HardDrive className="mr-2 h-4 w-4" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Link className="mr-2 h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6 bg-dj-dark rounded-lg p-6">
              <TabsContent value="profile">
                <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Name</label>
                    <Input defaultValue="DJ User" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input defaultValue="user@example.com" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <Input defaultValue="Professional DJ mixing electronic music" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="pt-4">
                    <Button className="bg-dj-primary hover:bg-dj-primary/80">
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="audio">
                <h2 className="text-2xl font-semibold mb-4">Audio Settings</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Master Volume</label>
                      <span className="text-sm text-gray-400">85%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-gray-400" />
                      <Slider defaultValue={[85]} max={100} step={1} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Audio Device</h3>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="device1" checked />
                      <label htmlFor="device1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Default System Audio
                      </label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="device2" />
                      <label htmlFor="device2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        External Audio Interface
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Latency Settings</h3>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Buffer Size</label>
                      <span className="text-sm text-gray-400">512 samples</span>
                    </div>
                    <Slider defaultValue={[512]} min={128} max={1024} step={128} className="h-1.5" />
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-dj-primary hover:bg-dj-primary/80">
                      <Save className="mr-2 h-4 w-4" />
                      Save Audio Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="storage">
                <h2 className="text-2xl font-semibold mb-4">Storage Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Local Storage</h3>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between mb-1">
                        <span>Used Space</span>
                        <span>1.2 GB / 5 GB</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-dj-primary h-full rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Storage Options</h3>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="storage1" checked />
                      <label htmlFor="storage1" className="text-sm font-medium leading-none">
                        Cache audio files locally for offline access
                      </label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="storage2" checked />
                      <label htmlFor="storage2" className="text-sm font-medium leading-none">
                        Automatically clean cache older than 30 days
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-dj-primary hover:bg-dj-primary/80 mr-3">
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                      Clear All Cache
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="integrations">
                <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                          <Music2 className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h4 className="font-medium">Spotify</h4>
                          <p className="text-sm text-gray-400">Connect to your Spotify library</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-green-500 text-green-500 hover:bg-green-500/10">
                        Connect
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                          <Music2 className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h4 className="font-medium">Beatport</h4>
                          <p className="text-sm text-gray-400">Access your Beatport purchases</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                        Connect
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                          <Music2 className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h4 className="font-medium">Apple Music</h4>
                          <p className="text-sm text-gray-400">Sync with your Apple Music library</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
                        Connect
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                          <HardDrive className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h4 className="font-medium">Dropbox</h4>
                          <p className="text-sm text-gray-400">Access music from your Dropbox</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
