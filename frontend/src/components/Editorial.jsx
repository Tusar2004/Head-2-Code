import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX, Maximize2, Settings, SkipBack, SkipForward } from 'lucide-react';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [buffered, setBuffered] = useState(0);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Update current time during playback
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };

    const handleProgress = () => {
      if (video && video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedAmount = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedAmount);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('progress', handleProgress);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  // Update volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      setIsMuted(volume === 0);
    }
  }, [volume]);

  // Inline styles for animations
  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: '64rem',
      margin: '0 auto',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      backgroundColor: '#000',
      transition: 'all 0.3s ease',
    },
    video: {
      width: '100%',
      aspectRatio: '16/9',
      backgroundColor: '#000',
      cursor: 'pointer',
      objectFit: 'cover',
      transition: 'transform 0.5s ease, filter 0.3s ease',
    },
    topGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '8rem',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
      transition: 'all 0.3s ease',
    },
    bottomGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
    },
    playButtonGlow: {
      animation: 'pulse 2s infinite',
    },
    speedMenu: {
      animation: 'fadeIn 0.2s ease-out',
    },
    hoverOverlay: {
      animation: 'fadeIn 0.3s ease-out',
    },
    progressThumb: {
      WebkitAppearance: 'none',
      appearance: 'none',
      height: '16px',
      width: '16px',
      borderRadius: '50%',
      background: '#ffffff',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      transition: 'transform 0.2s',
    },
  };

  // Dynamic styles
  const getVideoStyle = () => ({
    ...styles.video,
    transform: isHovering ? 'scale(1.01)' : 'scale(1)',
    filter: isHovering ? 'brightness(1.05)' : 'brightness(1)',
  });

  const getTopGradientStyle = () => ({
    ...styles.topGradient,
    opacity: isHovering ? 1 : 0,
  });

  const getBottomGradientStyle = () => ({
    ...styles.bottomGradient,
    opacity: isHovering || !isPlaying ? 1 : 0,
    transform: isHovering || !isPlaying ? 'translateY(0)' : 'translateY(40px)',
  });

  return (
    <div 
      ref={containerRef}
      style={styles.container}
      className="group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        style={getVideoStyle()}
      />

      {/* Loading Spinner */}
      {!isPlaying && !isHovering && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
          }} />
          <div style={{
            position: 'relative',
            width: '4rem',
            height: '4rem',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '4px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '50%',
              animation: 'ping 2s infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: '8px',
              border: '4px solid transparent',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        </div>
      )}

      {/* Top Gradient Overlay */}
      <div style={getTopGradientStyle()} />

      {/* Bottom Controls Overlay */}
      <div style={getBottomGradientStyle()}>
        {/* Progress Bar Container */}
        <div style={{
          position: 'relative',
          marginBottom: '1.5rem',
        }}>
          {/* Buffered Progress */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '4px',
              backgroundColor: '#4b5563',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              width: `${buffered}%`,
            }}
          />
          
          {/* Current Progress */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (videoRef.current) {
                videoRef.current.currentTime = value;
                setCurrentTime(value);
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              appearance: 'none',
              background: 'transparent',
              cursor: 'pointer',
              zIndex: 10,
            }}
          />
          
          {/* Progress Bar Track */}
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#1f2937',
            borderRadius: '9999px',
            opacity: 0.5,
          }} />
        </div>

        {/* Controls Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            {/* Play/Pause Button with Glow Effect */}
            <button
              onClick={togglePlayPause}
              style={{
                position: 'relative',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                color: 'white',
                width: '3.5rem',
                height: '3.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(59, 130, 246, 0.3)';
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '50%',
                animation: 'ping 2s infinite',
              }} />
              {isPlaying ? (
                <Pause style={{ width: '1.5rem', height: '1.5rem', position: 'relative', zIndex: 10 }} />
              ) : (
                <Play style={{ width: '1.5rem', height: '1.5rem', marginLeft: '2px', position: 'relative', zIndex: 10 }} />
              )}
            </button>

            {/* Skip Buttons */}
            <button
              onClick={() => skip(-10)}
              style={{
                position: 'relative',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Skip back 10 seconds"
            >
              <SkipBack style={{ width: '1.25rem', height: '1.25rem' }} />
              <span style={{
                position: 'absolute',
                bottom: '-1.5rem',
                fontSize: '0.75rem',
                color: '#9ca3af',
              }}>10s</span>
            </button>
            
            <button
              onClick={() => skip(10)}
              style={{
                position: 'relative',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward style={{ width: '1.25rem', height: '1.25rem' }} />
              <span style={{
                position: 'absolute',
                bottom: '-1.5rem',
                fontSize: '0.75rem',
                color: '#9ca3af',
              }}>10s</span>
            </button>

            {/* Volume Control */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <button
                onClick={toggleMute}
                style={{
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  color: 'white',
                  width: '2.5rem',
                  height: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX style={{ width: '1.25rem', height: '1.25rem' }} />
                ) : (
                  <Volume2 style={{ width: '1.25rem', height: '1.25rem' }} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  width: '5rem',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />
            </div>

            {/* Time Display */}
            <div style={{
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '1.125rem',
              fontWeight: 600,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.5rem',
              backdropFilter: 'blur(8px)',
            }}>
              <span>{formatTime(currentTime)}</span>
              <span style={{ color: '#9ca3af' }}> / {formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            {/* Playback Speed Menu */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Playback speed"
              >
                <span>{playbackRate}x</span>
              </button>
              
              {showSpeedMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  right: 0,
                  marginBottom: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  animation: 'fadeIn 0.2s ease-out',
                }}>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      style={{
                          display: 'block',
                           width: '100%',
                           padding: '0.5rem 1rem',
                           textAlign: 'left',
                           borderRadius: '0.25rem',
                           border: 'none',
                           cursor: 'pointer',
                           transition: 'all 0.2s ease',
                           backgroundColor: playbackRate === rate ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                           color: playbackRate === rate ? '#3b82f6' : 'white'
                          }}
                          
                      onMouseEnter={(e) => {
                        if (playbackRate !== rate) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (playbackRate !== rate) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Button */}
            <button
              style={{
                borderRadius: '50%',
                backgroundColor: 'transparent',
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Settings"
            >
              <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              style={{
                borderRadius: '50%',
                backgroundColor: 'transparent',
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Fullscreen"
            >
              <Maximize2 style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Play Indicator */}
      {!isPlaying && isHovering && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(1px)',
          }} />
          <div style={{
            position: 'relative',
            width: '6rem',
            height: '6rem',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '50%',
              animation: 'ping 2s infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: '1rem',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: '2rem',
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Play style={{ width: '2rem', height: '2rem', color: 'white', marginLeft: '2px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Inline style tag for animations */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        
        input[type="range"]::-webkit-slider-track {
          background: transparent;
          height: 4px;
        }
        
        .group:hover video {
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
};

export default Editorial;