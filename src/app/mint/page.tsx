'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MintPage() {
  const router = useRouter();
  const [assembledComics, setAssembledComics] = useState<any[]>([]);
  const [selectedComic, setSelectedComic] = useState<any>(null);
  const [mintForm, setMintForm] = useState({
    quantity: 1,
    price: '0.05',
    supply: 100,
    rarity: 'common'
  });
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    loadAssembledComics();
  }, []);

  const loadAssembledComics = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('assembledComics') || '[]');
      setAssembledComics(saved);
    } catch (error) {
      console.error('Error loading assembled comics:', error);
    }
  };

  // Generate dummy comics for demonstration
  const getDummyComics = () => [
    {
      id: 'dummy-1',
      title: 'Quantum Paradox #1',
      subtitle: 'The Time Traveler\'s Dilemma',
      series: 'Quantum Paradox',
      pages: 24,
      status: 'Ready to Mint',
      components: {
        characters: ['Nova', 'Phoenix', 'Storm'],
        locations: ['Quantum Lab', 'Time Vortex', 'Future City']
      },
      cover: '/series-covers/quantum-paradox-1.jpg',
      description: 'A mind-bending adventure through time and space as our heroes grapple with the consequences of temporal manipulation.'
    },
    {
      id: 'dummy-2',
      title: 'Cypherpunk Chronicles #1',
      subtitle: 'Digital Revolution',
      series: 'Cypherpunk Chronicles',
      pages: 22,
      status: 'Ready to Mint',
      components: {
        characters: ['Circuit', 'Cyber', 'Neon'],
        locations: ['Neo-Tokyo', 'Underground Network', 'Virtual Realm']
      },
      cover: '/series-covers/cypherpunk-chronicles-1.jpg',
      description: 'In a world where technology and humanity collide, hackers fight for digital freedom against corporate overlords.'
    },
    {
      id: 'dummy-3',
      title: 'Mystic Realms #1',
      subtitle: 'The Awakening',
      series: 'Mystic Realms',
      pages: 26,
      status: 'Ready to Mint',
      components: {
        characters: ['Aether', 'Chaos', 'Nexus'],
        locations: ['Ancient Temple', 'Mystical Forest', 'Crystal Caves']
      },
      cover: '/series-covers/mystic-realms-1.jpg',
      description: 'Magic returns to the world as ancient forces awaken and new heroes discover their mystical powers.'
    },
    {
      id: 'dummy-4',
      title: 'Ninja Punk Girls #1',
      subtitle: 'Shadow Warriors',
      series: 'Ninja Punk Girls',
      pages: 20,
      status: 'Ready to Mint',
      components: {
        characters: ['Kunoichi', 'Neon Fist', 'Shadow Blade'],
        locations: ['Hidden Village', 'Cyberpunk City', 'Training Dojo']
      },
      cover: '/series-covers/ninja-punk-girls-1.jpg',
      description: 'Three fierce ninja warriors combine ancient martial arts with cutting-edge technology to protect their city.'
    },
    {
      id: 'dummy-5',
      title: 'Street Justice #1',
      subtitle: 'Vigilante Nights',
      series: 'Street Justice',
      pages: 28,
      status: 'Ready to Mint',
      components: {
        characters: ['Mirage', 'Shadow', 'Void'],
        locations: ['Gritty Streets', 'Underground Hideout', 'Rooftop Chase']
      },
      cover: '/series-covers/street-justice-1.jpg',
      description: 'When the law fails, these street-level heroes take justice into their own hands in the darkest corners of the city.'
    }
  ];

  const mintComic = async () => {
    if (!selectedComic) {
      alert('Please select a comic to mint');
      return;
    }

    setIsMinting(true);
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mintedComic = {
        ...selectedComic,
        mintedAt: new Date().toISOString(),
        mintDetails: {
          quantity: mintForm.quantity,
          price: mintForm.price,
          supply: mintForm.supply,
          rarity: mintForm.rarity,
          tokenId: `token_${Date.now()}`,
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`
        },
        status: 'Minted'
      };

      // Save to minted comics
      const mintedComics = JSON.parse(localStorage.getItem('mintedComics') || '[]');
      mintedComics.unshift(mintedComic);
      localStorage.setItem('mintedComics', JSON.stringify(mintedComics));

      // Remove from assembled comics if it's a real comic
      if (!selectedComic.id.startsWith('dummy-')) {
        const updatedAssembled = assembledComics.filter(c => c.id !== selectedComic.id);
        setAssembledComics(updatedAssembled);
        localStorage.setItem('assembledComics', JSON.stringify(updatedAssembled));
      }

      setSelectedComic(null);
      alert('Comic minted successfully! Check your wallet for the NFT.');
    } catch (error) {
      console.error('Error minting comic:', error);
      alert('Failed to mint comic. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const selectComic = (comic: any) => {
    setSelectedComic(comic);
    setMintForm(prev => ({
      ...prev,
      price: (Math.random() * 0.1 + 0.02).toFixed(2)
    }));
  };

  // Always show dummy comics, plus any real comics
  const dummyComics = getDummyComics();
  const allComics = [...assembledComics, ...dummyComics];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-900/50 to-black/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Mint Your Comics</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Convert your assembled comics into NFT assets and list them on the marketplace
          </p>
          
          {/* Big Green MINT Button */}
          <div className="text-center mb-8">
            <div className="mint-button-container">
              <div className="mint-dome-2d" onClick={() => router.push('/one-shot-generator')}>
                <span className="mint-dome-text">MINT</span>
                <span className="dome-highlight"></span>
              </div>
            </div>
            
            {/* Wallet connection call */}
            <div className="wallet-connect-call mt-4 text-center">
              Connect your wallet to mint your comic!
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Comic Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Available Comics</h2>
                
                {assembledComics.length === 0 && (
                  <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      💡 <strong>Sample Comics:</strong> Try minting with these sample comics, or create your own!
                    </p>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {allComics.map((comic) => (
                    <div 
                      key={comic.id}
                      onClick={() => selectComic(comic)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedComic?.id === comic.id 
                          ? 'bg-purple-600/20 border-purple-400' 
                          : 'bg-gray-800/50 border-gray-600 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-20 w-16 flex-shrink-0">
                          {comic.cover ? (
                            <Image
                              src={comic.cover}
                              alt={comic.title}
                              fill
                              className="object-cover rounded"
                              sizes="64px"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">📖</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white truncate">{comic.title}</h3>
                            {comic.id.startsWith('dummy-') && (
                              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex-shrink-0">DEMO</span>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{comic.subtitle}</p>
                          <div className="flex gap-2 text-xs text-gray-400">
                            <span>{comic.series}</span>
                            <span>{comic.pages} pages</span>
                            <span>{comic.components?.characters?.length || 0} characters</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {assembledComics.length === 0 && (
                  <div className="mt-6 text-center">
                    <div className="space-y-3">
                      <button 
                        onClick={() => router.push('/comics')}
                        className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
                      >
                        View Comics
                      </button>
                      <button 
                        onClick={() => router.push('/one-shot-generator')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-colors font-semibold"
                      >
                        One-Shot Generate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Minting Form */}
            <div className="space-y-6">
              {selectedComic ? (
                <>
                  {/* Selected Comic Preview */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                    <h2 className="text-2xl font-bold mb-4 text-purple-300">Selected Comic</h2>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                      {selectedComic.cover && (
                        <div className="relative h-32 w-full mb-4">
                          <Image
                            src={selectedComic.cover}
                            alt={selectedComic.title}
                            fill
                            className="object-cover rounded"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{selectedComic.title}</h3>
                        {selectedComic.id.startsWith('dummy-') && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">DEMO</span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{selectedComic.subtitle}</p>
                      <p className="text-gray-400 text-sm mb-3">{selectedComic.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-purple-300">Series:</span>
                          <span className="text-white ml-2">{selectedComic.series}</span>
                        </div>
                        <div>
                          <span className="text-purple-300">Pages:</span>
                          <span className="text-white ml-2">{selectedComic.pages}</span>
                        </div>
                        <div>
                          <span className="text-purple-300">Characters:</span>
                          <span className="text-white ml-2">{selectedComic.components?.characters?.length || 0}</span>
                        </div>
                        <div>
                          <span className="text-purple-300">Status:</span>
                          <span className="text-white ml-2">{selectedComic.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Minting Form */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                    <h2 className="text-2xl font-bold mb-6 text-purple-300">Mint Settings</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-purple-300 text-sm font-medium mb-2">Quantity to Mint</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="10"
                          value={mintForm.quantity}
                          onChange={(e) => setMintForm(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-300 text-sm font-medium mb-2">Price per NFT (SOL)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          min="0.01"
                          value={mintForm.price}
                          onChange={(e) => setMintForm(prev => ({ ...prev, price: e.target.value }))}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-300 text-sm font-medium mb-2">Total Supply</label>
                        <select
                          value={mintForm.supply}
                          onChange={(e) => setMintForm(prev => ({ ...prev, supply: parseInt(e.target.value) }))}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value={100}>100</option>
                          <option value={500}>500</option>
                          <option value={1000}>1,000</option>
                          <option value={5000}>5,000</option>
                          <option value={10000}>10,000</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-purple-300 text-sm font-medium mb-2">Rarity</label>
                        <select
                          value={mintForm.rarity}
                          onChange={(e) => setMintForm(prev => ({ ...prev, rarity: e.target.value }))}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="common">Common</option>
                          <option value="rare">Rare</option>
                          <option value="epic">Epic</option>
                          <option value="legendary">Legendary</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                      <h3 className="text-purple-300 font-semibold mb-2">Minting Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Quantity:</span>
                          <span className="text-white">{mintForm.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Price per NFT:</span>
                          <span className="text-white">◎ {mintForm.price} SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Total Cost:</span>
                          <span className="text-white font-semibold">◎ {(parseFloat(mintForm.price) * mintForm.quantity).toFixed(2)} SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Gas Fee (estimated):</span>
                          <span className="text-white">◎ 0.001 SOL</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-purple-300 font-semibold">Total:</span>
                            <span className="text-white font-bold">◎ {(parseFloat(mintForm.price) * mintForm.quantity + 0.001).toFixed(3)} SOL</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={mintComic}
                      disabled={isMinting || !selectedComic}
                      className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      {isMinting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Minting NFT...
                        </>
                      ) : (
                        <>
                          🪙 Mint NFT
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
                  <div className="text-6xl mb-4">🪙</div>
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Ready to Mint</h3>
                  <p className="text-gray-300">Choose a comic from the left panel to start the minting process.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Minting Instructions */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Minting Instructions</h2>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <ol className="text-left space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <div>
                    <span className="font-semibold">Connect your wallet</span> using the wallet button in the navigation
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <div>
                    <span className="font-semibold">Select a comic</span> from your assembled comics or use the One-Shot Generator to create one instantly
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <div>
                    <span className="font-semibold">Configure minting settings</span> including quantity, price, supply, and rarity
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <div>
                    <span className="font-semibold">Click "Mint NFT"</span> and confirm the transaction in your wallet
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <div>
                    <span className="font-semibold">Wait for confirmation</span> and your NFT will be added to your wallet and listed on the marketplace
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}