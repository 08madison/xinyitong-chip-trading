import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    handlePlay();
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    handlePause();
  };

  if (!src) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">暂无视频</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      />

      {/* Play/Pause Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
          isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="w-12 h-12 rounded-full bg-blue-500/80 flex items-center justify-center hover:bg-blue-500 transition-colors"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </button>
        )}
      </div>

      {/* Controls */}
      <div
        className={`absolute bottom-2 right-2 flex gap-2 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white ml-0.5" />
          )}
        </button>
        <button
          onClick={handleToggleMute}
          className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
