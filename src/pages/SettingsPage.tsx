
import React from 'react';
import NavBar from '../components/NavBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Volume2 } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-dj-background text-dj-text flex flex-col">
      <NavBar />
      
      <div className="pt-20 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="bg-gray-900 mb-6">
              <TabsTrigger value="account" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-dj-primary/20 data-[state=active]:text-dj-primary">
                <Volume2 className="mr-2 h-4 w-4" />
                Audio
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="bg-dj-dark rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Username</p>
                  <p className="font-medium">djmaster123</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="font-medium">dj@example.com</p>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="mr-2">Edit Profile</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="bg-dj-dark rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              <p className="text-gray-400">Configure how and when you receive notifications.</p>
            </TabsContent>
            
            <TabsContent value="privacy" className="bg-dj-dark rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
              <p className="text-gray-400">Manage your privacy preferences and data sharing options.</p>
            </TabsContent>
            
            <TabsContent value="audio" className="bg-dj-dark rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Audio Settings</h2>
              <p className="text-gray-400">Configure your audio input/output devices and preferences.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
