"use client";

import { cn } from '@/lib/utils';
import { PlayIcon } from 'lucide-react';
import { useState } from 'react';

interface ProjectVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  type?: 'youtube' | 'vimeo' | 'loom' | 'direct';
  autoplay?: boolean;
  showControls?: boolean;
}

export function ProjectVideo({ 
  src, 
  poster, 
  title, 
  className,
  type = 'direct',
  autoplay = true,
  showControls = false
}: ProjectVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(autoplay ? true : false); // Start as loaded for autoplay

  // Helper function to extract video ID from URLs
  const getVideoId = (url: string, platform: string): string => {
    switch (platform) {
      case 'youtube':
        const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return youtubeMatch ? youtubeMatch[1] : '';
      case 'vimeo':
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        return vimeoMatch ? vimeoMatch[1] : '';
      case 'loom':
        const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
        return loomMatch ? loomMatch[1] : '';
      default:
        return url;
    }
  };

  const getEmbedUrl = (url: string, platform: string): string => {
    const videoId = getVideoId(url, platform);
    switch (platform) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      case 'loom':
        return `https://www.loom.com/embed/${videoId}?autoplay=1`;
      default:
        return url;
    }
  };

  // For platform embeds, show iframe when playing
  if (type !== 'direct' && isPlaying) {
    return (
      <div className={cn("relative w-full h-40 bg-muted rounded-t-lg overflow-hidden", className)}>
        <iframe
          src={getEmbedUrl(src, type)}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    );
  }

  // For direct videos or initial state, show video/poster with play button
  return (
    <div className={cn("relative w-full h-40 bg-muted rounded-t-lg overflow-hidden group", autoplay ? "" : "cursor-pointer", className)}>
      {type === 'direct' ? (
        <>
          {/* Always show video for autoplay, otherwise show poster until clicked */}
          <video
            src={src}
            poster={!autoplay ? poster : undefined}
            autoPlay={autoplay}
            loop={autoplay} // Loop when autoplay is enabled
            muted
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            controls={showControls} // Only show controls if explicitly enabled
            preload="metadata"
            onLoadStart={() => setIsLoaded(false)}
            onCanPlay={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)} // Handle errors gracefully
          />
          
          {/* Loading spinner for local videos (only for non-autoplay) */}
          {!autoplay && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </>
      ) : (
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: poster ? `url(${poster})` : `url(https://img.youtube.com/vi/${getVideoId(src, type)}/maxresdefault.jpg)` 
          }}
        />
      )}
      
      {/* Play button overlay - only show for non-autoplay videos */}
      {!autoplay && !isPlaying && type !== 'direct' && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
          onClick={() => setIsPlaying(true)}
        >
          <div className="bg-white/90 hover:bg-white rounded-full p-3 transition-colors">
            <PlayIcon className="w-6 h-6 text-black ml-1" fill="currentColor" />
          </div>
        </div>
      )}
      
      {/* Platform badge */}
      {type !== 'direct' && (
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
          {type}
        </div>
      )}
    </div>
  );
}
