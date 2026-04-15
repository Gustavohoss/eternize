import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

interface MusicPlayerProps {
  spotifyLink: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ spotifyLink }) => {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLIFrameElement>(null);

  // Extract the Spotify track ID from the link
  const getTrackId = () => {
    try {
      const url = new URL(spotifyLink);
      const path = url.pathname;
      // Handle /track/id pattern
      if (path.includes("/track/")) {
        return path.split("/track/")[1].split("?")[0];
      }
      return "";
    } catch (error) {
      console.error("Invalid Spotify URL", error);
      return "";
    }
  };

  const trackId = getTrackId();

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!trackId) {
    return (
      <Card className="p-4 glass-card flex items-center justify-center">
        <div className="text-white/60 flex items-center gap-2">
          <Music size={20} />
          <span>Link do Spotify inválido</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden border border-white/20 shadow-lg">
      {isLoading && (
        <div className="flex items-center justify-center h-20 bg-black/20">
          <div className="flex items-center gap-2 text-white/70">
            <Music size={20} className="animate-pulse" />
            <span>Carregando música...</span>
          </div>
        </div>
      )}
      <iframe
        ref={audioRef}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="bg-transparent"
        onLoad={handleLoad}
      ></iframe>
    </Card>
  );
};

export default MusicPlayer;
