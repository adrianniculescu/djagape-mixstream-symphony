
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Folder, FolderOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const MusicUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Filter to only allow audio files
    const audioFiles = Array.from(files).filter(file => 
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|flac|aac|m4a)$/i)
    );
    
    if (audioFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload audio files only",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload process for each file
    audioFiles.forEach(file => {
      simulateUpload(file);
    });
  };

  const simulateUpload = (file: File) => {
    setUploadingFile(file.name);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            setUploadingFile(null);
            toast({
              title: "Upload complete",
              description: `${file.name} has been added to your library`,
            });
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="w-full p-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-dj-primary bg-dj-primary/10' : 'border-gray-700 hover:border-gray-600'
        } transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          {isDragging ? (
            <FolderOpen className="h-16 w-16 text-dj-primary animate-bounce" />
          ) : (
            <Folder className="h-16 w-16 text-gray-500" />
          )}
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Drag & drop audio files</h3>
            <p className="text-sm text-gray-400">
              Supports MP3, WAV, FLAC, AAC, OGG
            </p>
          </div>
          
          <label>
            <Button type="button" className="mt-2 bg-dj-primary hover:bg-dj-primary/80">
              <Upload className="mr-2 h-4 w-4" /> Browse Files
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                multiple
                onChange={handleFileInput}
              />
            </Button>
          </label>
        </div>
      </div>

      {uploadProgress !== null && uploadingFile && (
        <div className="mt-4 p-3 bg-gray-800 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-sm truncate max-w-[200px]">{uploadingFile}</span>
            <span className="text-sm">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default MusicUpload;
