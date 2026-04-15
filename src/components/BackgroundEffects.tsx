import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, Sparkles, CloudSun, Cloud, Droplets, SunMoon, Sun } from 'lucide-react';

interface BackgroundEffectsProps {
  effect: 'hearts' | 'confetti' | 'stars' | 'sunset' | 'rain' | 'forest' | 'none' | 'aurora' | 'vortex' | 'starsAndComets';
  emoji?: string;
  backgroundColor?: string;
  isPreview?: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ effect, emoji, backgroundColor, isPreview = false }) => {
  const [elements, setElements] = useState<React.ReactNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastCreationTime = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationActiveRef = useRef<boolean>(true);

  // Function to create a new falling element (emoji or heart)
  const createNewFallingElement = (timestamp: number) => {
    // Only create new elements every 200ms to avoid overloading
    if (timestamp - lastCreationTime.current < 200) {
      animationFrameRef.current = requestAnimationFrame(createNewFallingElement);
      return;
    }
    
    lastCreationTime.current = timestamp;
    
    // Create only if the effect is emoji or hearts (works with background color too)
    if ((emoji || effect === 'hearts') && containerRef.current && animationActiveRef.current) {
      setElements(prevElements => {
        // Limit the maximum number of elements for performance
        const maxElements = 100;
        let newElements = [...prevElements];
        
        if (newElements.length >= maxElements) {
          // Remove the 5 oldest elements
          newElements = newElements.slice(5);
        }
        
        if (emoji) {
          const emojiArray = Array.from(emoji);
          const size = Math.random() * 24 + 20;
          const startPositionX = Math.random() * 100;
          const duration = Math.random() * 6 + 10;
          const rotation = Math.random() * 360;
          const emojiToShow = emojiArray[Math.floor(Math.random() * emojiArray.length)];
          
          // Create unique key for each emoji element
          const uniqueKey = `emoji-${Date.now()}-${Math.random()}`;
          
          newElements.push(
            <div
              key={uniqueKey}
              className="absolute pointer-events-none animate-fall"
              style={{ 
                left: `${startPositionX}%`,
                top: '-5%',
                fontSize: `${size}px`,
                animationDuration: `${duration}s`,
                transform: `rotate(${rotation}deg)`,
                zIndex: '10'
              }}
            >
              {emojiToShow}
            </div>
          );
        } else if (effect === 'hearts') {
          const size = Math.random() * 20 + 15;
          const startPositionX = Math.random() * 100;
          const startPositionY = Math.random() * 30;
          const duration = Math.random() * 6 + 8;
          
          const uniqueKey = `heart-${Date.now()}-${Math.random()}`;
          
          newElements.push(
            <div
              key={uniqueKey}
              className="absolute pointer-events-none animate-fall"
              style={{ 
                left: `${startPositionX}%`,
                top: `${startPositionY - 20}%`,
                animationDuration: `${duration}s`,
                zIndex: '10'
              }}
            >
              <Heart 
                className="text-love-red fill-love-red/80" 
                size={size} 
                style={{ filter: 'drop-shadow(0 0 5px rgba(255,105,135,0.3))' }} 
              />
            </div>
          );
        }
        
        return newElements;
      });
    }
    
    // Continue the animation loop
    animationFrameRef.current = requestAnimationFrame(createNewFallingElement);
  };

  // Clean up elements that have completed their animations
  const cleanupCompletedAnimations = () => {
    const now = Date.now();
    setElements(prevElements => {
      // Keep only elements less than 15 seconds old
      return prevElements.filter(element => {
        const keyStr = (element as React.ReactElement).key as string;
        if (!keyStr) return true;
        
        const timestamp = parseInt(keyStr.split('-')[1]);
        return !timestamp || now - timestamp < 15000; // 15 seconds
      });
    });
  };

  // Initialize the animation loop for hearts and emoji
  useEffect(() => {
    if (effect === 'hearts' || emoji) {
      // Clear elements from previous effect
      setElements([]);
      animationActiveRef.current = true;
      
      // Start the animation loop
      animationFrameRef.current = requestAnimationFrame(createNewFallingElement);
      
      // Set up periodic cleanup of completed animations
      const cleanupInterval = setInterval(cleanupCompletedAnimations, 5000);
      
      // Clean up the animation loop when unmounting
      return () => {
        animationActiveRef.current = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        clearInterval(cleanupInterval);
      };
    }
  }, [effect, emoji]);

  // Effect for other types of animations (non-continuous)
  useEffect(() => {
    if (effect === 'none' && !emoji && !backgroundColor) {
      setElements([]);
      return;
    }
    
    // If the effect is not hearts or emoji (already handled above), create static elements
    if (effect !== 'hearts' && !emoji && effect !== 'sunset') {
      let newElements: React.ReactNode[] = [];
      
      // Generate elements for other effects (confetti, stars, etc.)
      if (effect === 'confetti') {
        const colors = ['#ea384c', '#FFDEE2', '#FDE1D3', '#E5DEFF', '#ffffff', '#FEF7CD', '#D3E4FD'];
        for (let i = 0; i < 60; i++) {
          const size = Math.random() * 10 + 5;
          const startPositionX = Math.random() * 100;
          const duration = Math.random() * 4 + 5;
          const delay = Math.random() * 5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const rotate = Math.random() * 360;
          
          newElements.push(
            <div
              key={`confetti-${i}`}
              className="absolute pointer-events-none animate-confetti"
              style={{ 
                left: `${startPositionX}%`,
                top: '-5%',
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                transform: `rotate(${rotate}deg)`,
                color: color,
                zIndex: '1'
              }}
            >
              <Sparkles size={size} style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }} />
            </div>
          );
        }
      } else if (effect === 'stars' || effect === 'starsAndComets') {
        // Stars background
        newElements.push(
          <div key="stars-bg" className="absolute inset-0 bg-[#050314] opacity-70 z-[-2]"></div>
        );
        
        // Regular stars
        for (let i = 0; i < 100; i++) {
          const size = Math.random() * 2 + 1;
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          const duration = Math.random() * 3 + 2;
          const delay = Math.random() * 3;
          const opacity = Math.random() * 0.5 + 0.3;
          
          newElements.push(
            <div
              key={`star-${i}`}
              className="absolute pointer-events-none animate-twinkle"
              style={{ 
                left: `${posX}%`,
                top: `${posY}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity: opacity,
                zIndex: '1'
              }}
            >
              <Stars 
                className="text-white" 
                size={size} 
                style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))' }} 
              />
            </div>
          );
        }
        
        // Add comets for starsAndComets effect
        if (effect === 'starsAndComets') {
          for (let i = 0; i < 5; i++) {
            const size = Math.random() * 20 + 10;
            const startPositionY = Math.random() * 50;
            const duration = Math.random() * 6 + 10;
            const delay = Math.random() * 15;
            
            newElements.push(
              <div
                key={`comet-${i}`}
                className="absolute pointer-events-none animate-comet"
                style={{ 
                  top: `${startPositionY}%`,
                  right: '-5%',
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  zIndex: '1'
                }}
              >
                <div className="flex">
                  <Sparkles className="text-white" size={size} />
                  <div className="h-1 w-32 bg-gradient-to-l from-white/80 to-transparent rounded-full"></div>
                </div>
              </div>
            );
          }
        }
      } else if (effect === 'rain') {
        // Add a light blue overlay for rain effect
        newElements.push(
          <div key="rain-bg" className="absolute inset-0 bg-[#0a101f] opacity-50 z-[-2]"></div>
        );
        
        for (let i = 0; i < 60; i++) {
          const size = Math.random() * 15 + 10;
          const startPositionX = Math.random() * 100;
          const duration = Math.random() * 2 + 2;
          const delay = Math.random() * 5;
          
          newElements.push(
            <div
              key={`rain-${i}`}
              className="absolute pointer-events-none animate-fall"
              style={{ 
                left: `${startPositionX}%`,
                top: '-10%',
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                zIndex: '1'
              }}
            >
              <Droplets 
                className="text-blue-300/80" 
                size={size} 
                style={{ filter: 'drop-shadow(0 0 2px rgba(147,197,253,0.3))' }}
              />
            </div>
          );
        }
        
        // Add some clouds
        for (let i = 0; i < 5; i++) {
          const size = Math.random() * 40 + 30;
          const posX = Math.random() * 100;
          const posY = Math.random() * 30;
          
          newElements.push(
            <div
              key={`cloud-${i}`}
              className="absolute pointer-events-none animate-float-slow"
              style={{ 
                left: `${posX}%`,
                top: `${posY}%`,
                animationDuration: `${(Math.random() * 10 + 20)}s`,
                opacity: 0.2,
                zIndex: '1'
              }}
            >
              <Cloud className="text-gray-200" size={size} />
            </div>
          );
        }
      } else if (effect === 'aurora') {
        // Dark background for aurora
        newElements.push(
          <div key="aurora-bg" className="absolute inset-0 bg-[#050b14] opacity-80 z-[-2]"></div>
        );
        
        // Aurora borealis effect with CSS
        for (let i = 0; i < 3; i++) {
          const height = Math.random() * 30 + 30;
          const width = Math.random() * 60 + 40;
          const posX = Math.random() * 60 + 20;
          const duration = Math.random() * 10 + 20;
          const delay = Math.random() * 5;
          const hue = Math.random() * 60 + 120; // Green to blue hues
        
          newElements.push(
            <div
              key={`aurora-${i}`}
              className="absolute pointer-events-none animate-aurora bottom-0 rounded-full blur-3xl"
              style={{ 
                left: `${posX}%`,
                height: `${height}%`,
                width: `${width}%`,
                background: `linear-gradient(to top, hsla(${hue}, 80%, 50%, 0.4), transparent)`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                zIndex: '1'
              }}
            />
          );
        }
        
        // Add some stars
        for (let i = 0; i < 50; i++) {
          const size = Math.random() * 2 + 1;
          const posX = Math.random() * 100;
          const posY = Math.random() * 60;
          const opacity = Math.random() * 0.6 + 0.2;
          
          newElements.push(
            <div
              key={`aurora-star-${i}`}
              className="absolute pointer-events-none animate-twinkle"
              style={{ 
                left: `${posX}%`,
                top: `${posY}%`,
                opacity: opacity,
                zIndex: '1'
              }}
            >
              <Stars className="text-white" size={size} />
            </div>
          );
        }
      } else if (effect === 'vortex') {
        // Dark background for vortex
        newElements.push(
          <div key="vortex-bg" className="absolute inset-0 bg-[#0a0a18] opacity-80 z-[-2]"></div>
        );
        
        // Create swirling vortex effect
        for (let i = 0; i < 5; i++) {
          const scale = 1 - (i * 0.1);
          const duration = 20 + (i * 5);
          const delay = i * 2;
          const opacity = 0.7 - (i * 0.1);
          const hue1 = (i * 50) % 360;
          const hue2 = (i * 50 + 120) % 360;
          
          newElements.push(
            <div
              key={`vortex-ring-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin rounded-full border-8 border-transparent"
              style={{ 
                width: '80vw',
                height: '80vw',
                maxWidth: '600px',
                maxHeight: '600px',
                borderImage: `linear-gradient(to right, hsla(${hue1}, 80%, 60%, ${opacity}), hsla(${hue2}, 80%, 60%, ${opacity})) 1`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                filter: 'blur(3px)',
                zIndex: '1'
              }}
            />
          );
        }
        
        // Add particle effects
        for (let i = 0; i < 30; i++) {
          const size = Math.random() * 4 + 2;
          const angle = Math.random() * 360;
          const distance = Math.random() * 40 + 10;
          const duration = Math.random() * 8 + 10;
          const hue = Math.random() * 360;
          
          newElements.push(
            <div
              key={`vortex-particle-${i}`}
              className="absolute top-1/2 left-1/2 pointer-events-none rounded-full animate-ping"
              style={{ 
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `hsla(${hue}, 80%, 60%, 0.6)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}vw)`,
                animationDuration: `${duration}s`,
                filter: 'blur(1px)',
                zIndex: '1'
              }}
            />
          );
        }
      } else if (effect === 'forest') {
        // Forest effect with particles
        newElements.push(
          <div key="forest-bg" className="absolute inset-0 bg-[#0a1f0a] opacity-80 z-[-2]"></div>
        );
        
        // Add some light rays
        for (let i = 0; i < 8; i++) {
          const angle = (i * 45) % 360;
          const width = Math.random() * 30 + 20;
          
          newElements.push(
            <div
              key={`forest-ray-${i}`}
              className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none animate-pulse"
              style={{ 
                width: `${width}vw`,
                height: '100vh',
                background: 'linear-gradient(to bottom, rgba(255,255,200,0.2), transparent 70%)',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: 'top',
                animationDuration: '10s',
                zIndex: '1'
              }}
            />
          );
        }
        
        // Fireflies
        for (let i = 0; i < 30; i++) {
          const size = Math.random() * 4 + 2;
          const posX = Math.random() * 100;
          const posY = Math.random() * 30 + 60; // Position in lower part of screen
          const duration = Math.random() * 10 + 15;
          const delay = Math.random() * 5;
          
          newElements.push(
            <div
              key={`forest-particle-${i}`}
              className="absolute pointer-events-none animate-float"
              style={{ 
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: 'rgba(255, 255, 150, 0.7)',
                borderRadius: '50%',
                boxShadow: '0 0 10px 2px rgba(255, 255, 150, 0.5)',
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                zIndex: '1'
              }}
            />
          );
        }
      }
      
      setElements(newElements);
    }
  }, [effect, emoji, backgroundColor]);

  // Special rendering for sunset effect
  if (effect === 'sunset') {
    const containerClass = isPreview ? "absolute inset-0 overflow-hidden pointer-events-none z-0" : "fixed inset-0 -z-10 overflow-hidden pointer-events-none";
    
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/60 via-amber-800/40 to-purple-900/90" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-5 right-5 text-amber-500">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-pulse blur-xl" style={{animationDuration: '3s'}}></div>
            <Sun className="relative animate-float" size={60} style={{animationDuration: '8s'}} />
          </div>
        </div>
        <div className="absolute bottom-20 left-10 text-white/20">
          <CloudSun className="animate-float-slow" size={40} style={{animationDuration: '15s'}} />
        </div>
        <div className="absolute top-20 right-10 text-white/10">
          <Cloud className="animate-float-slow" size={50} style={{animationDuration: '20s'}} />
        </div>
      </div>
    );
  }

  // Renderização prioritária de cor de fundo, com emojis por cima se necessário
  if (backgroundColor && backgroundColor !== '') {
    const containerClass = isPreview ? "absolute inset-0 pointer-events-none z-0" : "fixed inset-0 -z-10 pointer-events-none";
    const emojiContainerClass = isPreview ? "absolute inset-0 pointer-events-none overflow-hidden z-10" : "fixed inset-0 pointer-events-none overflow-hidden z-10";
    
    return (
      <div className={containerClass} style={{ backgroundColor }}>
        {/* Sempre renderiza o container de emoji quando emojis forem selecionados */}
        {emoji && (
          <div ref={containerRef} className={emojiContainerClass}>
            {elements}
          </div>
        )}
      </div>
    );
  }

  // Default rendering for other effects
  const containerClass = isPreview ? "absolute inset-0 pointer-events-none overflow-hidden z-0" : "fixed inset-0 pointer-events-none -z-10 overflow-hidden";
  
  return (
    <div ref={containerRef} className={containerClass}>
      {elements}
    </div>
  );
};

export default BackgroundEffects;
