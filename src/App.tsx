
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";

// Since MixerPage and LibraryPage might not exist yet, 
// let's create placeholder components for them
const MixerPage = () => (
  <div className="min-h-screen bg-dj-background text-dj-text pt-20 px-4">
    <h1 className="text-3xl font-bold mb-6">DJ Mixer</h1>
    <p>Mixer page content will be displayed here.</p>
  </div>
);

const LibraryPage = () => (
  <div className="min-h-screen bg-dj-background text-dj-text pt-20 px-4">
    <h1 className="text-3xl font-bold mb-6">Music Library</h1>
    <p>Library content will be displayed here.</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mixer" element={<MixerPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
