'use client';
import { ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import { createStableKey, isClient } from '@/lib/utils';

interface SharedBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function SharedBackground({ 
  children, 
  className = '' 
}: SharedBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [repeatedCovers, setRepeatedCovers] = useState<string[]>([]);
  
  // Comic cover images array - memoized to prevent re-creation on every render
  const comicCovers = useMemo(() => [
    '/comic-covers/download-3.jpg',
    '/comic-covers/download-4.jpg',
    '/comic-covers/download-5.jpg',
    '/comic-covers/download-6.jpg',
    '/comic-covers/download-7.jpg',
    '/comic-covers/download-8.jpg',
    '/comic-covers/download-9.jpg',
    '/comic-covers/download-10.jpg',
    '/comic-covers/download-11.jpg',
    '/comic-covers/download-12.jpg',
    '/comic-covers/download-13.jpg',
    '/comic-covers/download-14.jpg',
    '/comic-covers/download-15.jpg',
    '/comic-covers/download-17.jpg',
    '/comic-covers/download-18.jpg',
    '/comic-covers/download-19.jpg',
    '/comic-covers/download-20.jpg',
    '/comic-covers/download-21.jpg',
    '/comic-covers/download-22.jpg',
    '/comic-covers/download-23.jpg',
    '/comic-covers/download-24.jpg',
    '/comic-covers/download-25.jpg',
    '/comic-covers/download-26.jpg',
    '/comic-covers/download-27.jpg',
    '/comic-covers/download-28.jpg',
    '/comic-covers/download-29.jpg',
    '/comic-covers/download-30.jpg',
    '/comic-covers/download-31.jpg',
    '/comic-covers/download-32.jpg',
    '/comic-covers/download-33.jpg',
    '/comic-covers/download-34.jpg',
    '/comic-covers/download-35.jpg',
    '/comic-covers/download-36.jpg',
    '/comic-covers/download-37.jpg',
    '/comic-covers/download-38.jpg',
    '/comic-covers/download-39.jpg',
    '/comic-covers/download40.jpg',
    '/comic-covers/download41.jpg',
    '/comic-covers/download50.jpg'
  ], []);

  // Function to shuffle array - memoized with useCallback
  const shuffleArray = useCallback((array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient()) return;
    
    setMounted(true);
    
    // Create randomized comic covers only on client side
    const randomizedCovers = shuffleArray(comicCovers);
    
    // Repeat the randomized comic covers multiple times to ensure full page coverage
    const repeated = [];
    for (let i = 0; i < 10; i++) { // Repeat 10 times for extensive coverage
      repeated.push(...randomizedCovers);
    }
    
    setRepeatedCovers(repeated);
  }, [comicCovers, shuffleArray]);

  // Show loading state or fallback during SSR
  if (!mounted) {
    return (
      <div className={`min-h-screen bg-black text-white relative overflow-hidden ${className}`}>
        {/* Dark Overlay */}
        <div className="fixed inset-0 bg-black/60 pointer-events-none z-5"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-hidden ${className}`}>
      
      {/* Background Grid of Comic Covers */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gridTemplateRows: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '8px',
          padding: '16px'
        }}
      >
        {repeatedCovers.map((cover, index) => (
          <div
            key={createStableKey(cover, index)}
            className="relative overflow-hidden rounded-lg"
            style={{
              aspectRatio: '2/3',
              width: '100%',
              height: 'auto'
            }}
          >
            <img
              src={cover}
              alt="Comic Cover"
              className="w-full h-full object-cover"
              loading="lazy"
              style={{
                animation: 'none',
                transition: 'none'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-5"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 