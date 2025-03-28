
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Disc, ListMusic, Headphones, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const NavBar = () => {
  return (
    <nav className="bg-dj-dark border-b border-gray-800 py-3 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <Disc className="h-6 w-6 text-dj-primary" />
          <span className="text-xl font-bold">MixStream Symphony</span>
        </Link>
      </div>
      
      <div className="hidden md:flex relative max-w-md w-full mx-4">
        <Input 
          type="text" 
          placeholder="Search tracks, artists, albums..." 
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Link to="/library">
            <ListMusic className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Link to="/mixer">
            <Headphones className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Link to="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
