'use client';

import ReactFlipbook from '@/components/ReactFlipbook';

const npgPages: string[] = [
  '/images/cover-episode-1.jpg',
  '/images/page-01-1.jpg',
  '/images/page-02-1.jpg',
  '/images/page-03-1.jpg',
  '/images/page-04-1.jpg',
  '/images/page-05-1.jpg',
  '/images/page-06-1.jpg',
  '/images/page-07-1.jpg',
  '/images/page-08-1.jpg',
  '/images/page-09-1.jpg',
  '/images/page-10-1.jpg',
];

export default function NpgRedReaderPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] pt-4 md:pt-6">
        <ReactFlipbook pages={npgPages} />
      </div>
    </div>
  );
}


