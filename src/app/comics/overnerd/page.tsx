"use client";

import ReactFlipbook from '@/components/ReactFlipbook';

const overnerdPages: string[] = [
  '/overnerd/cover.jpg',
  '/overnerd/74.jpg',
  '/overnerd/75.jpg',
  '/overnerd/76.jpg',
  '/overnerd/77.jpg',
  '/overnerd/78.jpg',
  '/overnerd/79.jpg',
  '/overnerd/80.jpg',
  '/overnerd/81.jpg',
  '/overnerd/82.jpg',
  '/overnerd/83.jpg',
];

export default function OvernerdReaderPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] pt-4 md:pt-6">
        <ReactFlipbook pages={overnerdPages} />
      </div>
    </div>
  );
}

