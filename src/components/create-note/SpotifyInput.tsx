
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface SpotifyInputProps {
  spotifyLink: string;
  setSpotifyLink: (link: string) => void;
}

const SpotifyInput: React.FC<SpotifyInputProps> = ({ spotifyLink, setSpotifyLink }) => {
  const handleSpotifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpotifyLink(e.target.value);
  };
  
  const openSpotify = () => {
    window.open('https://open.spotify.com', '_blank');
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="spotify" className="text-white mb-2 block">
        Link da música no Spotify
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="spotify"
          placeholder="https://open.spotify.com/track/..."
          value={spotifyLink}
          onChange={handleSpotifyChange}
          className="bg-white/5 border-white/10 text-white"
        />
        <Button 
          type="button" 
          variant="outline"
          onClick={openSpotify}
          className="bg-black/30 border-white/10 text-white hover:bg-white/10 whitespace-nowrap"
        >
          <ExternalLink size={16} className="mr-2" />
          Abrir Spotify
        </Button>
      </div>
      <p className="text-white/60 text-xs">
        Cole aqui o link de uma música do Spotify. A música tocará quando a pessoa abrir sua mensagem.
      </p>
      {spotifyLink && (
        <div className="mt-4">
          <Label className="text-white mb-2 block">Prévia:</Label>
          <div className="aspect-[3/1] max-h-24 overflow-hidden rounded-md">
            <iframe 
              src={`https://open.spotify.com/embed/track/${getTrackId(spotifyLink)}?utm_source=generator`}
              width="100%" 
              height="80" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to extract track ID
const getTrackId = (spotifyLink: string): string => {
  try {
    const url = new URL(spotifyLink);
    const path = url.pathname;
    
    if (path.includes('/track/')) {
      return path.split('/track/')[1].split('?')[0];
    }
    return '';
  } catch (error) {
    return '';
  }
};

export default SpotifyInput;
