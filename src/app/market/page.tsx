'use client';

import { useState } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';

interface MarketItem {
  id: number;
  title: string;
  subtitle: string;
  seller: string;
  price: string;
  currency: 'SOL' | 'BSV';
  originalPrice: string;
  originalCurrency: 'SOL' | 'BSV';
  cover: string;
  rarity: string;
  listedDate: string;
  series: string;
  issue: number;
  description: string;
}

export default function MarketPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<'SOL' | 'BSV' | 'all'>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const marketItems: MarketItem[] = [
    {
      id: 1,
      title: "Quantum Paradox #1",
      subtitle: "The Quantum Awakening",
      seller: "0x1234...5678",
      price: "0.15",
      currency: "SOL",
      originalPrice: "0.12",
      originalCurrency: "SOL",
      cover: "/series-covers/quantum-paradox-1.jpg",
      rarity: "Epic",
      listedDate: "2024-02-01",
      series: "Quantum Paradox",
      issue: 1,
      description: "Nova discovers her true power in a world of quantum uncertainty"
    },
    {
      id: 2,
      title: "Street Justice #3",
      subtitle: "Shadows of the City",
      seller: "0xabcd...efgh",
      price: "0.08",
      currency: "BSV",
      originalPrice: "0.06",
      originalCurrency: "BSV",
      cover: "/series-covers/street-justice-3.jpg",
      rarity: "Rare",
      listedDate: "2024-02-03",
      series: "Street Justice",
      issue: 3,
      description: "Mirage fights for justice in the city's shadows"
    },
    {
      id: 3,
      title: "Cypherpunk Chronicles #2",
      subtitle: "Digital Revolution",
      seller: "0x9876...5432",
      price: "0.25",
      currency: "SOL",
      originalPrice: "0.18",
      originalCurrency: "SOL",
      cover: "/series-covers/cypherpunk-chronicles-2.jpg",
      rarity: "Legendary",
      listedDate: "2024-02-05",
      series: "Cypherpunk Chronicles",
      issue: 2,
      description: "Circuit leads the resistance against corporate control"
    },
    {
      id: 4,
      title: "Mystic Realms #1",
      subtitle: "The Ancient Awakening",
      seller: "0x5678...1234",
      price: "0.05",
      currency: "BSV",
      originalPrice: "0.04",
      originalCurrency: "BSV",
      cover: "/series-covers/Mystic-Realms-1.jpg",
      rarity: "Common",
      listedDate: "2024-02-07",
      series: "Mystic Realms",
      issue: 1,
      description: "Aether discovers the hidden magic within"
    },
    {
      id: 5,
      title: "Ninja Punk Girls #2",
      subtitle: "Shadow Training",
      seller: "0xefgh...abcd",
      price: "0.12",
      currency: "SOL",
      originalPrice: "0.10",
      originalCurrency: "SOL",
      cover: "/series-covers/ninja-punk-girls-2.jpg",
      rarity: "Rare",
      listedDate: "2024-02-08",
      series: "Ninja Punk Girls",
      issue: 2,
      description: "Kunoichi begins her journey to become a legendary warrior"
    },
    {
      id: 6,
      title: "Quantum Paradox #3",
      subtitle: "Reality Shift",
      seller: "0x5432...9876",
      price: "0.35",
      currency: "SOL",
      originalPrice: "0.25",
      originalCurrency: "SOL",
      cover: "/series-covers/quantum-paradox-3.jpg",
      rarity: "Legendary",
      listedDate: "2024-02-10",
      series: "Quantum Paradox",
      issue: 3,
      description: "Nova faces the consequences of her quantum abilities"
    },
    {
      id: 7,
      title: "Street Justice #4",
      subtitle: "Urban Legends",
      seller: "0x1111...2222",
      price: "0.06",
      currency: "BSV",
      originalPrice: "0.05",
      originalCurrency: "BSV",
      cover: "/series-covers/street-justice-4.jpg",
      rarity: "Common",
      listedDate: "2024-02-12",
      series: "Street Justice",
      issue: 4,
      description: "Void operates as a vigilante in the crime-ridden streets"
    },
    {
      id: 8,
      title: "Cypherpunk Chronicles #4",
      subtitle: "Neural Networks",
      seller: "0x3333...4444",
      price: "0.18",
      currency: "SOL",
      originalPrice: "0.15",
      originalCurrency: "SOL",
      cover: "/series-covers/cypherpunk-chronicles-4.jpg",
      rarity: "Epic",
      listedDate: "2024-02-14",
      series: "Cypherpunk Chronicles",
      issue: 4,
      description: "Cyber battles against the oppressive corporate regime"
    },
    {
      id: 9,
      title: "Mystic Realms #3",
      subtitle: "Chaos Unleashed",
      seller: "0x5555...6666",
      price: "0.09",
      currency: "BSV",
      originalPrice: "0.07",
      originalCurrency: "BSV",
      cover: "/series-covers/Mystic-Realms-3.jpg",
      rarity: "Rare",
      listedDate: "2024-02-16",
      series: "Mystic Realms",
      issue: 3,
      description: "Chaos discovers ancient magical powers"
    },
    {
      id: 10,
      title: "Ninja Punk Girls #3",
      subtitle: "Final Training",
      seller: "0x7777...8888",
      price: "0.22",
      currency: "SOL",
      originalPrice: "0.18",
      originalCurrency: "SOL",
      cover: "/series-covers/ninja-punk-girls-3.jpg",
      rarity: "Epic",
      listedDate: "2024-02-18",
      series: "Ninja Punk Girls",
      issue: 3,
      description: "Shadow Blade completes her ninja training"
    },
    {
      id: 11,
      title: "Street Justice #5",
      subtitle: "Justice Served",
      seller: "0x9999...aaaa",
      price: "0.07",
      currency: "BSV",
      originalPrice: "0.06",
      originalCurrency: "BSV",
      cover: "/series-covers/street-justice-5.jpg",
      rarity: "Common",
      listedDate: "2024-02-20",
      series: "Street Justice",
      issue: 5,
      description: "The final battle for street justice begins"
    },
    {
      id: 12,
      title: "Quantum Paradox #4",
      subtitle: "Time Paradox",
      seller: "0xbbbb...cccc",
      price: "0.45",
      currency: "SOL",
      originalPrice: "0.30",
      originalCurrency: "SOL",
      cover: "/series-covers/quantum-paradox-4.jpg",
      rarity: "Legendary",
      listedDate: "2024-02-22",
      series: "Quantum Paradox",
      issue: 4,
      description: "Tempus manipulates time itself"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-600';
      case 'Rare': return 'bg-blue-600';
      case 'Epic': return 'bg-purple-600';
      case 'Legendary': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'SOL': return '◎';
      case 'BSV': return '₿';
      default: return '◎';
    }
  };

  const filteredItems = marketItems.filter(item => {
    const matchesSeries = selectedSeries === 'all' || item.series === selectedSeries;
    const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
    const matchesCurrency = selectedCurrency === 'all' || item.currency === selectedCurrency;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = parseFloat(item.price);
      switch (priceRange) {
        case 'low':
          matchesPrice = price <= 1.0;
          break;
        case 'medium':
          matchesPrice = price > 1.0 && price <= 3.0;
          break;
        case 'high':
          matchesPrice = price > 3.0;
          break;
      }
    }
    
    return matchesSeries && matchesRarity && matchesCurrency && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'rarity':
        const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
        return rarityOrder[b.rarity as keyof typeof rarityOrder] - rarityOrder[a.rarity as keyof typeof rarityOrder];
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Marketplace</h1>
        <p className="text-center text-gray-300">Buy and sell comic NFTs with low gas fees</p>
      </div>
      
      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Currency</label>
              <select 
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(e.target.value as 'SOL' | 'BSV' | 'all')}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Currencies</option>
                <option value="SOL">SOL</option>
                <option value="BSV">BSV</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Series</label>
              <select 
                value={selectedSeries} 
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Series</option>
                <option value="Quantum Paradox">Quantum Paradox</option>
                <option value="Street Justice">Street Justice</option>
                <option value="Cypherpunk Chronicles">Cypherpunk Chronicles</option>
                <option value="Mystic Realms">Mystic Realms</option>
                <option value="Ninja Punk Girls">Ninja Punk Girls</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Rarity</label>
              <select 
                value={selectedRarity} 
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Rarities</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Price Range</label>
              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="low">Under 1.0</option>
                <option value="medium">1.0 - 3.0</option>
                <option value="high">Over 3.0</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="recent">Recently Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Rarity</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Market Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {sortedItems.map((item) => (
          <div key={item.id} className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
            {/* Full cover image - no cropping */}
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={item.cover}
                alt={item.title}
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(item.rarity)}`}>
                {item.rarity}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs text-white">
                {item.series} #{item.issue}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-gray-300 text-xs mb-2 line-clamp-1">{item.subtitle}</p>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-purple-300 text-xs">Seller:</span>
                  <span className="text-white text-xs font-mono">{item.seller}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 text-xs">Listed:</span>
                  <span className="text-white text-xs">{new Date(item.listedDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-purple-300 text-xs">Current Price:</span>
                    <div className="text-lg font-bold text-white flex items-center gap-1">
                      <span>{getCurrencyIcon(item.currency)}</span>
                      {item.price} {item.currency}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-purple-300 text-xs">Original:</span>
                    <div className="text-xs text-gray-400 line-through flex items-center gap-1">
                      <span>{getCurrencyIcon(item.originalCurrency)}</span>
                      {item.originalPrice} {item.originalCurrency}
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold text-sm">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-purple-300 mb-4">No Items Found</h2>
          <p className="text-gray-400">Try adjusting your filters to find more comics.</p>
        </div>
      )}
    </div>
  );
} 