'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SeriesPage() {
  const router = useRouter();

  const sampleSeries = [
    {
      id: 'series_cypherpunk_chronicles',
      name: "Cypherpunk Chronicles",
      description: "A dystopian future where technology and humanity collide",
      issues: 12,
      status: "Ongoing",
      cover: "/series-covers/cypherpunk-chronicles-1.jpg",
      genre: "Sci-Fi",
      theme: "Technology vs Humanity",
      setting: "Neo-Tokyo 2087",
      artStyle: "Cypherpunk",
      targetAudience: "Young Adult",
      characters: [],
      storylines: []
    },
    {
      id: 'series_mystic_realms',
      name: "Mystic Realms",
      description: "Fantasy adventure in a world of magic and monsters",
      issues: 8,
      status: "Completed",
      cover: "/series-covers/Mystic-Realms-1.jpg",
      genre: "Fantasy",
      theme: "Good vs Evil",
      setting: "Medieval Fantasy World",
      artStyle: "Fantasy",
      targetAudience: "All Ages",
      characters: [],
      storylines: []
    },
    {
      id: 'series_street_justice',
      name: "Street Justice",
      description: "Vigilante heroes fighting crime in the urban jungle",
      issues: 15,
      status: "Ongoing",
      cover: "/series-covers/street-justice-5.jpg",
      genre: "Action",
      theme: "Justice",
      setting: "Modern New York",
      artStyle: "Modern",
      targetAudience: "Teen",
      characters: [],
      storylines: []
    },
    {
      id: 'series_quantum_paradox',
      name: "Quantum Paradox",
      description: "Time travel and parallel dimensions collide",
      issues: 6,
      status: "Limited",
      cover: "/series-covers/quantum-paradox-2.jpg",
      genre: "Sci-Fi",
      theme: "Fate vs Free Will",
      setting: "Multiple Timelines",
      artStyle: "Sci-Fi",
      targetAudience: "Young Adult",
      characters: [],
      storylines: []
    },
    {
      id: 'series_ninja_punk_girls',
      name: "Ninja Punk Girls",
      description: "Fierce female ninjas in a cyberpunk world",
      issues: 9,
      status: "Ongoing",
      cover: "/series-covers/ninja-punk-girls-3.jpg",
      genre: "Action",
      theme: "Empowerment",
      setting: "Cyberpunk Japan",
      artStyle: "Anime",
      targetAudience: "Teen",
      characters: [],
      storylines: []
    },

  ];

  useEffect(() => {
    // Save sample series to localStorage if they don't exist
    const existingSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');
    if (existingSeries.length === 0) {
      localStorage.setItem('savedSeries', JSON.stringify(sampleSeries));
    }
  }, []);



  return (
    <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">Series</h1>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-8xl mx-auto">
          {sampleSeries.map((item) => (
            <div key={item.id} className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 pt-4">
              <div className={`h-80 w-48 mx-auto relative overflow-hidden ${item.cover.startsWith('/') ? '' : item.cover}`}>
                {item.cover.startsWith('/') ? (
                  <img 
                    src={item.cover} 
                    alt={`${item.name} cover`}
                                          className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('bg-black/40');
                      target.nextElementSibling?.classList.add('bg-gradient-to-br', 'from-purple-500', 'to-pink-600');
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center px-4">{item.name}</h3>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-medium">
                    {item.genre}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'Ongoing' ? 'bg-green-600' : 
                    item.status === 'Completed' ? 'bg-blue-600' : 'bg-yellow-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-medium text-sm">{item.issues} Issues</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
} 