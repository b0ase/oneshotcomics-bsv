'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function WalletPage() {
  const { walletAddress, isWalletConnected, isConnecting, availableWallets, selectedWallet, connectWallet, disconnectWallet } = useWallet();
  const [walletData, setWalletData] = useState<any>(null);

  // Load wallet data when wallet is connected
  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      loadUserWalletData(walletAddress);
    }
  }, [isWalletConnected, walletAddress]);

  const loadUserWalletData = (address: string) => {
    try {
      // Load user's saved series and NFTs
      const userSeriesKey = `userSeries_${address}`;
      const userSeries = JSON.parse(localStorage.getItem(userSeriesKey) || '[]');
      
      // Load saved NFTs
      const savedNFTs = JSON.parse(localStorage.getItem('savedNFTs') || '[]');
      const userNFTs = savedNFTs.filter((nft: any) => nft.owner === address);
      
      // Load saved series
      const savedSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      const userSavedSeries = savedSeries.filter((series: any) => series.owner === address);
      
      setWalletData({
        address: address,
        balance: "0.00 BSV", // Would need real Bitcoin SV RPC call
        tokens: userNFTs.length > 0 ? userNFTs : generateMockNFTs(),
        $1SHOT: {
          balance: "0",
          value: "$0.00"
        },
        recentTransactions: generateMockTransactions(),
        userSeries: userSeries,
        savedSeries: userSavedSeries
      });
    } catch (error) {
      console.error('Error loading wallet data:', error);
      // Fallback to mock data
      setWalletData(generateMockWalletData(address));
    }
  };

  const generateMockWalletData = (address: string) => ({
    address: address,
    balance: "0.00 BSV",
    tokens: generateMockNFTs(),
    $1SHOT: {
      balance: "0",
      value: "$0.00"
    },
    recentTransactions: generateMockTransactions(),
    userSeries: [],
    savedSeries: []
  });

  const generateMockNFTs = () => [
    {
      id: 1,
      name: "Quantum Paradox #1",
      series: "Quantum Paradox",
      cover: "/series-covers/quantum-paradox-1.jpg",
      tokenId: "#001",
      rarity: "Common",
      value: "0.08 BSV",
      description: "The beginning of a time-bending adventure where reality itself is questioned."
    },
    {
      id: 2,
      name: "Street Justice #3",
      series: "Street Justice",
      cover: "/series-covers/street-justice-3.jpg",
      tokenId: "#156",
      rarity: "Rare",
      value: "0.06 BSV",
      description: "A gritty tale of vigilante justice in the neon-lit streets of Neo-Tokyo."
    },
    {
      id: 3,
      name: "Cypherpunk Chronicles #8",
      series: "Cypherpunk Chronicles",
      cover: "/series-covers/cypherpunk-chronicles-3.jpg",
      tokenId: "#042",
      rarity: "Epic",
      value: "0.12 BSV",
      description: "Digital warfare meets human spirit in this cyberpunk masterpiece."
    },
    {
      id: 4,
      name: "Mystic Realms #2",
      series: "Mystic Realms",
      cover: "/series-covers/Mystic-Realms-2.jpg",
      tokenId: "#089",
      rarity: "Legendary",
      value: "0.25 SOL",
      description: "Ancient magic awakens in a world where technology and mysticism collide."
    },
    {
      id: 5,
      name: "Ninja Punk Girls #1",
      series: "Ninja Punk Girls",
      cover: "/series-covers/ninja-punk-girls-1.jpg",
      tokenId: "#112",
      rarity: "Rare",
      value: "0.15 BSV",
      description: "Stealth meets style in this action-packed series of cyber-ninjas."
    },
    {
      id: 6,
      name: "Quantum Paradox #4",
      series: "Quantum Paradox",
      cover: "/series-covers/quantum-paradox-4.jpg",
      tokenId: "#203",
      rarity: "Epic",
      value: "0.18 SOL",
      description: "The quantum realm reveals its darkest secrets in this mind-bending issue."
    }
  ];

  const generateMockTransactions = () => [
    {
      id: 1,
      type: "Mint",
      description: "Minted Quantum Paradox #1",
      amount: "-0.05 BSV",
      date: "2024-02-01",
      status: "Completed",
      icon: "🎨"
    },
    {
      id: 2,
      type: "Purchase",
      description: "Bought Street Justice #3",
      amount: "-0.06 BSV",
      date: "2024-02-03",
      status: "Completed",
      icon: "💰"
    },
    {
      id: 3,
      type: "Reward",
      description: "Earned $1SHOT tokens",
      amount: "+50 $1SHOT",
      date: "2024-02-05",
      status: "Completed",
      icon: "🎁"
    },
    {
      id: 4,
      type: "Sale",
      description: "Sold Mystic Realms #1",
      amount: "+0.12 BSV",
      date: "2024-02-07",
      status: "Completed",
      icon: "📈"
    },
    {
      id: 5,
      type: "Mint",
      description: "Minted Ninja Punk Girls #1",
      amount: "-0.08 BSV",
      date: "2024-02-09",
      status: "Completed",
      icon: "🎨"
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

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'from-gray-500 to-gray-700';
      case 'Rare': return 'from-blue-500 to-blue-700';
      case 'Epic': return 'from-purple-500 to-purple-700';
      case 'Legendary': return 'from-yellow-500 to-orange-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  if (!isWalletConnected) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Wallet</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-lg p-8 border border-orange-500/30 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Yours.org Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your Yours.org wallet to view your NFTs, tokens, and transaction history. 
              Your wallet data will be securely stored locally.
            </p>
            <div className="space-y-4">
              {availableWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => connectWallet(wallet.name)}
                  disabled={isConnecting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{wallet.icon}</span>
                      <span>Connect {wallet.name}</span>
                    </div>
                  )}
                </button>
              ))}
              {availableWallets.length === 0 && (
                <div className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm">
                    No Bitcoin SV wallets detected. Please install Yours.org or HandCash wallet extension.
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 text-sm text-gray-400">
              <p>Don't have Yours.org? <a href="https://yours.org/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">Install it here</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Wallet</h1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Wallet</h1>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Wallet Overview */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Wallet Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{walletData.balance}</div>
                <div className="text-purple-300">BSV Balance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{walletData.$1SHOT.balance}</div>
                <div className="text-purple-300">$1SHOT Tokens</div>
                <div className="text-sm text-gray-400">({walletData.$1SHOT.value})</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{walletData.tokens.length}</div>
                <div className="text-purple-300">NFTs Owned</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-purple-300 mb-2">Wallet Address:</div>
              <div className="font-mono text-white break-all">{walletData.address}</div>
            </div>
          </div>

          {/* NFTs */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Your NFT Collection</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {walletData.tokens.map((token: any) => (
                <div key={token.id} className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 group">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <ImageWithFallback
                      src={token.cover}
                      alt={token.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="/generate-image-placeholder.svg"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityGradient(token.rarity)} text-white shadow-lg`}>
                      {token.rarity}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-white mb-1">{token.name}</h3>
                      <p className="text-purple-300 text-sm mb-2">{token.series}</p>
                      <p className="text-gray-400 text-xs line-clamp-2">{token.description}</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-purple-300 text-sm">Token ID:</span>
                      <span className="text-white font-mono text-sm">{token.tokenId}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-purple-300 text-sm">Estimated Value:</span>
                      <span className="text-white font-semibold">{token.value}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors font-medium">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors font-medium">
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Recent Transactions</h2>
            <div className="space-y-4">
              {walletData.recentTransactions.map((tx: any) => (
                <div key={tx.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      tx.type === 'Mint' ? 'bg-green-600' : 
                      tx.type === 'Purchase' ? 'bg-blue-600' : 
                      tx.type === 'Sale' ? 'bg-orange-600' : 'bg-purple-600'
                    }`}>
                      {tx.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{tx.description}</div>
                      <div className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.amount}
                    </div>
                    <div className="text-sm text-gray-400">{tx.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-6 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg transition-all duration-300 text-center transform hover:scale-105 shadow-lg">
                <div className="text-3xl mb-3">🎨</div>
                <div className="font-semibold text-white">Mint Comics</div>
                <div className="text-xs text-purple-200 mt-1">Create new NFTs</div>
              </button>
              <button className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg transition-all duration-300 text-center transform hover:scale-105 shadow-lg">
                <div className="text-3xl mb-3">💰</div>
                <div className="font-semibold text-white">Buy $1SHOT</div>
                <div className="text-xs text-blue-200 mt-1">Get platform tokens</div>
              </button>
              <button className="p-6 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-lg transition-all duration-300 text-center transform hover:scale-105 shadow-lg">
                <div className="text-3xl mb-3">📈</div>
                <div className="font-semibold text-white">Stake Tokens</div>
                <div className="text-xs text-green-200 mt-1">Earn rewards</div>
              </button>
              <button className="p-6 bg-gradient-to-br from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 rounded-lg transition-all duration-300 text-center transform hover:scale-105 shadow-lg">
                <div className="text-3xl mb-3">🏪</div>
                <div className="font-semibold text-white">Marketplace</div>
                <div className="text-xs text-orange-200 mt-1">Trade NFTs</div>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
} 