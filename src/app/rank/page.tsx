'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Comic {
  id: string;
  title: string;
  series: string;
  edition: string;
  coverImage: string;
  rating: number;
  votes: number;
  totalTrades: number;
  lastPrice: string;
  askingPrice: string;
}

export default function RankPage() {
  const [comics, setComics] = useState<Comic[]>([
    {
      id: '1',
      title: 'Digital Awakening',
      series: 'Cypherpunk Chronicles',
      edition: '1st Edition',
      coverImage: '/series-covers/cypherpunk-chronicles-1.jpg',
      rating: 4.7,
      votes: 156,
      totalTrades: 23,
      lastPrice: '0.025 BSV',
      askingPrice: '0.035 BSV'
    },
    {
      id: '2',
      title: 'Tradition Rebellion',
      series: 'Ninja Punk Girls',
      edition: 'Limited Edition',
      coverImage: '/series-covers/ninja-punk-girls-1.jpg',
      rating: 4.6,
      votes: 134,
      totalTrades: 18,
      lastPrice: '0.022 BSV',
      askingPrice: '0.032 BSV'
    },
    {
      id: '3',
      title: 'Consciousness Evolution',
      series: 'Cypherpunk Chronicles',
      edition: 'Collector Edition',
      coverImage: '/series-covers/cypherpunk-chronicles-3.jpg',
      rating: 4.5,
      votes: 127,
      totalTrades: 15,
      lastPrice: '0.020 BSV',
      askingPrice: '0.030 BSV'
    },
    {
      id: '4',
      title: 'Magical Awakening',
      series: 'Mystic Realms',
      edition: '1st Edition',
      coverImage: '/series-covers/Mystic-Realms-1.jpg',
      rating: 4.3,
      votes: 98,
      totalTrades: 12,
      lastPrice: '0.018 BSV',
      askingPrice: '0.028 BSV'
    },
    {
      id: '5',
      title: 'Neural Uprising',
      series: 'Cypherpunk Chronicles',
      edition: 'Standard Edition',
      coverImage: '/series-covers/cypherpunk-chronicles-2.jpg',
      rating: 4.2,
      votes: 89,
      totalTrades: 9,
      lastPrice: '0.015 BSV',
      askingPrice: '0.025 BSV'
    },
    {
      id: '6',
      title: 'Ancient Confrontation',
      series: 'Mystic Realms',
      edition: 'Limited Edition',
      coverImage: '/series-covers/Mystic-Realms-2.jpg',
      rating: 4.1,
      votes: 73,
      totalTrades: 7,
      lastPrice: '0.012 BSV',
      askingPrice: '0.022 BSV'
    }
  ]);

  const [userRatings, setUserRatings] = useState<Record<string, number>>({});

  const handleRating = (comicId: string, rating: number) => {
    setUserRatings(prev => ({
      ...prev,
      [comicId]: rating
    }));
  };

  const sortedComics = [...comics].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
            textShadow: '-4px 4px 0px #FFD700, -8px 8px 0px #1D3557, -12px 12px 0px #000',
            letterSpacing: '0.04em',
            lineHeight: '1'
          }}>
            COMIC RANKINGS
          </h1>
          <p className="text-xl text-gray-300" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
            textShadow: '1px 1px 0 #1D3557'
          }}>
            Rate and rank your favorite One-Shot Comics
          </p>
        </div>

        {/* Rankings Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-900/80">
                <tr>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Thumbnail
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Series
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Edition
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Trades
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Last Price
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Asking Price
                  </th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-bold" style={{
                    fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {sortedComics.map((comic, index) => (
                  <tr key={comic.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    {/* Rank Number */}
                    <td className="px-4 py-3">
                      <div className="text-2xl font-bold text-yellow-400" style={{
                        fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                      }}>
                        #{index + 1}
                      </div>
                    </td>
                    
                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="relative w-16 h-20">
                        <img 
                          src={comic.coverImage} 
                          alt={comic.title}
                          className="w-full h-full object-cover rounded shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/generate-image-placeholder.svg';
                          }}
                        />
                      </div>
                    </td>
                    
                    {/* Title */}
                    <td className="px-4 py-3">
                      <div className="text-white font-bold" style={{
                        fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                      }}>
                        {comic.title}
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(comic.rating) ? '★' : i < comic.rating ? '☆' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="ml-2 text-gray-400 text-sm">
                          {comic.rating.toFixed(1)} ({comic.votes})
                        </span>
                      </div>
                    </td>
                    
                    {/* Series */}
                    <td className="px-4 py-3">
                      <div className="text-gray-300">
                        {comic.series}
                      </div>
                    </td>
                    
                    {/* Edition */}
                    <td className="px-4 py-3">
                      <div className="text-gray-300">
                        {comic.edition}
                      </div>
                    </td>
                    
                    {/* Total Trades */}
                    <td className="px-4 py-3">
                      <div className="text-green-400 font-bold">
                        {comic.totalTrades}
                      </div>
                    </td>
                    
                    {/* Last Price */}
                    <td className="px-4 py-3">
                      <div className="text-blue-400 font-bold">
                        {comic.lastPrice}
                      </div>
                    </td>
                    
                    {/* Asking Price */}
                    <td className="px-4 py-3">
                      <div className="text-purple-400 font-bold">
                        {comic.askingPrice}
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link 
                          href={`/comics/${comic.id}`}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded text-xs font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                          style={{
                            fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                          }}
                        >
                          Preview
                        </Link>
                        <button 
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded text-xs font-bold hover:from-green-700 hover:to-green-800 transition-all duration-200"
                          style={{
                            fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
                          }}
                          onClick={() => alert('Mint functionality coming soon!')}
                        >
                          Mint
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4 text-center" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
            textShadow: '1px 1px 0 #1D3557'
          }}>
            Trading Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400" style={{
                fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
              }}>
                {comics.length}
              </div>
              <div className="text-gray-400">Total Comics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400" style={{
                fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
              }}>
                {comics.reduce((sum, comic) => sum + comic.totalTrades, 0)}
              </div>
              <div className="text-gray-400">Total Trades</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400" style={{
                fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
              }}>
                {(comics.reduce((sum, comic) => sum + comic.rating, 0) / comics.length).toFixed(1)}
              </div>
              <div className="text-gray-400">Avg Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400" style={{
                fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
              }}>
                {comics.reduce((sum, comic) => sum + comic.votes, 0)}
              </div>
              <div className="text-gray-400">Total Votes</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link 
            href="/series"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold px-8 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
            style={{
              fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
              textShadow: '1px 1px 0 #1D3557'
            }}
          >
            Browse All Series
          </Link>
        </div>
      </div>
    </div>
  );
} 