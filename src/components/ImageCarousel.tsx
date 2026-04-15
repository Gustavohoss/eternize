
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CarouselStyle = 'default' | 'coverflow' | 'cube' | 'cards' | 'flip' | 'fade' | 'stack';

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  style?: CarouselStyle;
  showButtons?: boolean;
  showPagination?: boolean;
  aspectRatio?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = true,
  interval = 3000,
  className,
  style = 'default',
  showButtons = true,
  showPagination = true,
  aspectRatio = "1080/1259"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalImages = images.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoplay || images.length <= 1 || isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, images.length, interval, isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setIsTouching(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouching) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Prevent default to stop page scrolling when swiping the carousel
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouching) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    
    setIsTouching(false);
  };

  if (!images.length) {
    return (
      <div className={cn("relative overflow-hidden", 
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}>
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          Nenhuma imagem
        </div>
      </div>
    );
  }

  const getStyleClasses = (index: number) => {
    const isActive = index === currentIndex;
    const isPrev = index === (currentIndex - 1 + totalImages) % totalImages;
    const isNext = index === (currentIndex + 1) % totalImages;
    const baseClasses = "absolute inset-0 transition-all duration-700 w-full h-full";
    
    switch (style) {
      case 'coverflow':
        return cn(
          baseClasses,
          "transform-gpu transition-all duration-700",
          isActive ? "opacity-100 z-30 scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-0 translate-x-0" : "opacity-80",
          isPrev ? "translate-x-[-60%] z-20 rotate-[-15deg] scale-90 shadow-[0_15px_30px_rgba(0,0,0,0.3)]" : "",
          isNext ? "translate-x-[60%] z-20 rotate-[15deg] scale-90 shadow-[0_15px_30px_rgba(0,0,0,0.3)]" : "",
          !isActive && !isPrev && !isNext ? "opacity-0 scale-75" : ""
        );
      
      case 'cube':
        return cn(
          baseClasses,
          "transform-gpu transition-all duration-700 backface-visibility-hidden",
          isActive ? "opacity-100 z-20 rotate-y-0 shadow-[0_20px_70px_rgba(0,0,0,0.7)]" : "opacity-0",
          isPrev ? "rotate-y-[-90deg] z-10 origin-left" : "",
          isNext ? "rotate-y-[90deg] z-10 origin-right" : "",
          !isActive && !isPrev && !isNext ? "opacity-0" : ""
        );
      
      case 'cards':
        return cn(
          baseClasses,
          "transform-gpu transition-all duration-500 rounded-lg",
          isActive ? "opacity-100 z-30 translate-y-0 scale-100 shadow-[0_15px_35px_rgba(0,0,0,0.5)]" : "opacity-90 scale-[0.92] filter blur-[1px]",
          isPrev ? "translate-y-[-5%] translate-x-[-25%] z-20 rotate-[-7deg] shadow-[0_10px_25px_rgba(0,0,0,0.3)]" : "",
          isNext ? "translate-y-[5%] translate-x-[25%] z-10 rotate-[7deg] shadow-[0_10px_25px_rgba(0,0,0,0.3)]" : "",
          !isActive && !isPrev && !isNext ? "opacity-50 scale-[0.85] translate-y-[10%]" : ""
        );
      
      case 'flip':
        return cn(
          baseClasses,
          "transform-gpu backface-visibility-hidden transition-transform duration-700 perspective-1000 rounded-lg",
          isActive ? "opacity-100 z-20 rotate-y-0 shadow-[0_15px_35px_rgba(0,0,0,0.5)]" : "opacity-0",
          isPrev ? "rotate-y-[-180deg] z-10 scale-95" : "",
          isNext ? "rotate-y-[180deg] z-10 scale-95" : "",
          !isActive && !isPrev && !isNext ? "opacity-0 scale-90" : "",
          "after:absolute after:inset-0 after:rounded-lg after:shadow-inner after:z-10 after:pointer-events-none"
        );
      
      case 'fade':
        return cn(
          baseClasses,
          "transition-all duration-700 rounded-lg",
          isActive ? "opacity-100 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] scale-100" : "opacity-0 z-0 scale-[0.97]"
        );
      
      case 'stack':
        return cn(
          baseClasses,
          "transform-gpu transition-all duration-500 rounded-lg",
          isActive ? "opacity-100 z-30 translate-y-0 translate-x-0 scale-100 shadow-[0_15px_35px_rgba(0,0,0,0.5)]" : "opacity-70 scale-95",
          isPrev ? "translate-y-[-30%] translate-x-[5%] rotate-[-3deg] z-20 shadow-[0_10px_20px_rgba(0,0,0,0.3)]" : "",
          isNext ? "translate-y-[30%] translate-x-[-5%] rotate-[3deg] z-10 shadow-[0_10px_20px_rgba(0,0,0,0.3)]" : "",
          !isActive && !isPrev && !isNext ? "opacity-30 translate-y-[50%] scale-90" : ""
        );
        
      default: // 'default'
        return cn(
          baseClasses,
          "transition-all duration-500 rounded-lg",
          index === currentIndex ? "opacity-100 translate-x-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" : 
            index < currentIndex ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"
        );
    }
  };

  return (
    <div 
      ref={carouselRef}
      className={cn(
        "relative overflow-hidden",
        style === 'cube' || style === 'flip' ? "perspective-[1200px]" : "",
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-0">
        {/* Background reflection for visual enhancement */}
        {style === 'coverflow' && (
          <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-black/20 to-transparent rounded-b-lg"></div>
        )}
        
        {style === 'cube' && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20 rounded-lg"></div>
        )}
        
        {style === 'flip' && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black/10 rounded-lg"></div>
        )}
      </div>

      {images.map((image, index) => (
        <div
          key={index}
          className={getStyleClasses(index)}
        >
          <img
            src={image}
            alt={`Foto ${index + 1}`}
            className={cn(
              "w-full h-full object-cover",
              style === 'cards' || style === 'stack' || style === 'flip' ? "rounded-lg" : ""
            )}
          />
          
          {/* Add reflections and effects based on style */}
          {style === 'coverflow' && index === currentIndex && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 z-10"></div>
          )}
          
          {style === 'flip' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-30 rounded-lg pointer-events-none"></div>
          )}
        </div>
      ))}
      
      {showPagination && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] scale-110" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Ir para foto ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      {showButtons && images.length > 1 && (
        <>
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white z-30 backdrop-blur-sm hover:bg-black/60 transition-all shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white z-30 backdrop-blur-sm hover:bg-black/60 transition-all shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Próxima foto"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
