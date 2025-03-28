
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, Headphones, Upload, Library, Disc, Waveform } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '../components/NavBar';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-dj-background text-dj-text flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-12 lg:px-24 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-dj-primary via-dj-secondary to-dj-accent bg-clip-text text-transparent">
            MixStream Symphony
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            The ultimate platform for DJs to discover, mix, and share music
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-dj-primary hover:bg-dj-primary/80">
              <Headphones className="mr-2 h-5 w-5" />
              Try the Mixer
            </Button>
            <Button size="lg" variant="outline" className="border-dj-accent text-dj-accent hover:bg-dj-accent/10">
              <Library className="mr-2 h-5 w-5" />
              Browse Library
            </Button>
          </div>
        </div>
      </section>

      {/* Visualizer */}
      <div className="w-full h-24 flex items-end justify-center px-4 mb-12">
        <div className="flex items-end justify-between w-full max-w-4xl h-full">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`w-2 md:w-3 mx-0.5 rounded-t ${
                i % 3 === 0 ? 'bg-dj-primary' : i % 3 === 1 ? 'bg-dj-secondary' : 'bg-dj-accent'
              }`}
              style={{
                height: `${Math.random() * 80 + 20}%`,
                animation: `equalizer-${i % 3 + 1} ${1 + Math.random() * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.05}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-12 lg:px-24 bg-dj-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Mix Like Never Before</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Disc className="h-8 w-8 text-dj-primary" />}
              title="Professional Mixing Tools"
              description="Access professional DJ tools with waveform visualization, BPM detection, and key matching."
            />
            
            <FeatureCard 
              icon={<Upload className="h-8 w-8 text-dj-secondary" />}
              title="Upload & Integrate"
              description="Upload your tracks or integrate with Spotify, Beatport, and Apple Music."
            />
            
            <FeatureCard 
              icon={<Music className="h-8 w-8 text-dj-accent" />}
              title="Rich Music Library"
              description="Discover and access millions of tracks, organized by genre, mood, and energy."
            />
            
            <FeatureCard 
              icon={<Play className="h-8 w-8 text-dj-primary" />}
              title="Record & Share Mixes"
              description="Record your mixes and share them with your audience on social platforms."
            />
            
            <FeatureCard 
              icon={<Headphones className="h-8 w-8 text-dj-secondary" />}
              title="Real-time Audio Effects"
              description="Apply professional effects including EQ, filters, and reverb to your mixes."
            />
            
            <FeatureCard 
              icon={<Waveform className="h-8 w-8 text-dj-accent" />}
              title="Audio Analysis"
              description="Automatic track analysis for perfect beatmatching and harmonic mixing."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 text-center bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your DJ Experience?</h2>
          <p className="text-lg mb-8 text-gray-300">Join thousands of DJs who are already using MixStream Symphony to create unforgettable mixes.</p>
          <Button size="lg" className="bg-dj-primary hover:bg-dj-primary/80">
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Disc className="h-6 w-6 text-dj-primary mr-2" />
            <span className="font-bold text-lg">MixStream Symphony</span>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} MixStream Symphony. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardContent className="pt-6">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
