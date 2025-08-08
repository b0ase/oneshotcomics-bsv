'use client';

import HTMLFlipBook from 'react-pageflip';
import type { ComponentType } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

const BASE_TOTAL_WIDTH = 922; // desktop book (two pages)
const BASE_HEIGHT = 600;
const BASE_PAGE_WIDTH = BASE_TOTAL_WIDTH / 2;
const MOBILE_PADDING = 48; // px

export default function ReactFlipbook({ pages }: { pages: string[] }) {
  const FlipBook = (HTMLFlipBook as unknown) as ComponentType<any>;
  const bookRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileDims, setMobileDims] = useState<{ w: number; h: number }>({ w: BASE_PAGE_WIDTH, h: BASE_HEIGHT });

  useEffect(() => {
    const resize = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const vw = wrapper.clientWidth;
      const vh = wrapper.clientHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);

      if (mobile) {
        const availableW = Math.max(240, vw - MOBILE_PADDING);
        const ratio = BASE_HEIGHT / BASE_PAGE_WIDTH;
        const computedH = Math.min(vh - MOBILE_PADDING, Math.floor(availableW * ratio));
        const computedW = Math.min(availableW, Math.floor((vh - MOBILE_PADDING) / ratio));
        setMobileDims({ w: computedW, h: computedH });
        setScale(1);
      } else {
        const padding = 48;
        const availableWidth = Math.max(0, vw - padding);
        const availableHeight = Math.max(0, vh - padding);
        const s = Math.min(availableWidth / BASE_TOTAL_WIDTH, availableHeight / BASE_HEIGHT);
        const safety = 0.94;
        setScale(Math.max(0.2, Math.min(s * safety, 3)));
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!bookRef.current) return;
      if (e.key === 'ArrowRight' || e.key === ' ') bookRef.current.pageFlip().flipNext();
      if (e.key === 'ArrowLeft') bookRef.current.pageFlip().flipPrev();
      if (e.key === 'Home') bookRef.current.pageFlip().flip(0);
      if (e.key === 'End') bookRef.current.pageFlip().flip(pages.length - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pages.length]);

  const desktopOffsetX = useMemo(() => {
    if (isMobile) return 0;
    if (page === 0) return -((BASE_PAGE_WIDTH / 2) * scale);
    if (page === pages.length - 1) return (BASE_PAGE_WIDTH / 2) * scale;
    return 0;
  }, [isMobile, page, scale, pages.length]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative">
      <div ref={wrapperRef} className="w-full h-full flex items-center justify-center overflow-hidden">
        {!isMobile && (
          <div style={{ transform: `translateX(${desktopOffsetX}px)`, transition: 'transform 300ms ease' }}>
            <div
              style={{
                width: BASE_TOTAL_WIDTH,
                height: BASE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
              }}
            >
              <FlipBook
                width={BASE_PAGE_WIDTH}
                height={BASE_HEIGHT}
                size="fixed"
                maxShadowOpacity={0.5}
                showCover
                mobileScrollSupport
                usePortrait={false}
                onFlip={(e: any) => setPage(e.data)}
                ref={bookRef}
                className="shadow-2xl"
              >
                {pages.map((src, idx) => (
                  <div key={idx} className="w-full h-full bg-white flex items-center justify-center">
                    <img src={src} alt={`Page ${idx + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </FlipBook>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ width: mobileDims.w, height: mobileDims.h }}>
            <FlipBook
              width={mobileDims.w}
              height={mobileDims.h}
              size="fixed"
              maxShadowOpacity={0.3}
              showCover
              mobileScrollSupport
              usePortrait
              onFlip={(e: any) => setPage(e.data)}
              ref={bookRef}
              className="shadow-xl"
            >
              {pages.map((src, idx) => (
                <div key={idx} className="w-full h-full bg-white flex items-center justify-center">
                  <img src={src} alt={`Page ${idx + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </FlipBook>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1 rounded">
        {page + 1} / {pages.length}
      </div>
    </div>
  );
}


