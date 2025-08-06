'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SharedBackground from '@/components/SharedBackground';

export default function SeriesSelector() {
  const router = useRouter();
  const [comicCovers, setComicCovers] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      // This is a bit of a hack for Vite/CRA. We know the files are in public/comic-covers.
      const coverFiles = [
        'download-10.jpg', 'download-11.jpg', 'download-12.jpg', 'download-13.jpg', 
        'download-14.jpg', 'download-15.jpg', 'download-17.jpg', 'download-18.jpg', 
        'download-19.jpg', 'download-20.jpg', 'download-21.jpg', 'download-22.jpg', 
        'download-23.jpg', 'download-24.jpg', 'download-25.jpg', 'download-26.jpg', 
        'download-27.jpg', 'download-28.jpg', 'download-29.jpg', 'download-3.jpg', 
        'download-30.jpg', 'download-31.jpg', 'download-32.jpg', 'download-33.jpg', 
        'download-34.jpg', 'download-35.jpg', 'download-36.jpg', 'download-37.jpg', 
        'download-38.jpg', 'download-39.jpg', 'download-4.jpg', 'download-5.jpg', 
        'download-6.jpg', 'download-7.jpg', 'download-8.jpg', 'download-9.jpg', 
        'download40.jpg', 'download41.jpg', 'download50.jpg'
      ];
      setComicCovers(coverFiles.map(file => `/comic-covers/${file}`));
    };

    fetchImages();
  }, []);

  const seriesData = [
    {
      id: 'cypherpunk-chronicles',
      name: 'Cypherpunk Chronicles',
      description: 'A dystopian future where technology and humanity collide',
      theme: 'cypherpunk',
      cover: '/series-covers/cypherpunk-chronicles-1.jpg',
      genre: 'Sci-Fi',
      status: 'Ongoing',
      issues: 12
    },
    {
      id: 'mystic-realms',
      name: 'Mystic Realms',
      description: 'Fantasy adventure in a world of magic and monsters',
      theme: 'fantasy',
      cover: '/series-covers/Mystic-Realms-1.jpg',
      genre: 'Fantasy',
      status: 'Completed',
      issues: 8
    },
    {
      id: 'quantum-paradox',
      name: 'Quantum Paradox',
      description: 'Time travel and parallel dimensions collide',
      theme: 'sci-fi',
      cover: '/series-covers/quantum-paradox-2.jpg',
      genre: 'Sci-Fi',
      status: 'Limited',
      issues: 6
    },
    {
      id: 'street-justice',
      name: 'Street Justice',
      description: 'Vigilante heroes fighting crime in the urban jungle',
      theme: 'action',
      cover: '/series-covers/street-justice-5.jpg',
      genre: 'Action',
      status: 'Ongoing',
      issues: 15
    },
    {
      id: 'ninja-punk-girls',
      name: 'Ninja Punk Girls',
      description: 'Fierce female ninjas in a cyberpunk world',
      theme: 'cypherpunk',
      cover: '/series-covers/ninja-punk-girls-3.jpg',
      genre: 'Action',
      status: 'Ongoing',
      issues: 9
    }
  ];

  const handleSeriesClick = (series: any) => {
    // Store the selected series in localStorage for the story generator
    const seriesData = {
      id: series.id,
      name: series.name,
      theme: series.theme,
      cover: series.cover,
    };
    localStorage.setItem('selectedSeries', JSON.stringify(seriesData));
    router.push('/story-generator');
  };

  return (
    <SharedBackground>
      <div className="series-container">
        <div className="series-content">
          <div className="page-header">
            <h1 className="page-title">Select a Series</h1>
            <p className="page-subtitle">Choose one of the comic book series below to generate stories for.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {seriesData.map(series => (
              <div 
                key={series.id} 
                className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleSeriesClick(series)}
              >
                <div className="h-80 w-48 mx-auto relative overflow-hidden">
                  <img 
                    src={series.cover} 
                    alt={`${series.name} cover`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('bg-black/40');
                      target.nextElementSibling?.classList.add('bg-gradient-to-br', 'from-purple-500', 'to-pink-600');
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-3">{series.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-medium">
                      {series.genre}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      series.status === 'Ongoing' ? 'bg-green-600' : 
                      series.status === 'Completed' ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}>
                      {series.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">{series.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300 font-medium text-sm">{series.issues} Issues</span>
                    <span className="text-purple-300 font-medium text-sm">Generate Story</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SharedBackground>
  );
} 