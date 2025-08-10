'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  InvestmentOffering, 
  createInvestmentOfferings, 
  getBSVPrice, 
  submitInvestmentToMarket,
  getMarketStats,
  BSVPriceData 
} from '@/lib/marketplace-api';

export default function InvestmentMarketPage() {
  const { walletAddress, isWalletConnected, connectWallet, availableWallets } = useWallet();
  const [offerings, setOfferings] = useState<InvestmentOffering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bsvPrice, setBsvPrice] = useState<BSVPriceData | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'BSV' | 'GBP'>('USD');
  const [purchasedSlots, setPurchasedSlots] = useState<Set<number>>(new Set());
  const [processingPurchase, setProcessingPurchase] = useState<number | null>(null);
  const [marketStats, setMarketStats] = useState<any>(null);

  // Load investment offerings and BSV price
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load tokenomics data
        const response = await fetch('/tokenomics.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        
        // Find the actual CSV data
        const csvStartIndex = lines.findIndex(line => line.startsWith('Investor (n),'));
        if (csvStartIndex === -1) {
          throw new Error('Could not find CSV header');
        }
        
        const csvLines = lines.slice(csvStartIndex + 1);
        const tokenomicsData = csvLines.map((line, index) => {
          const values = line.split(',');
          if (values.length < 8) return null;
          
          const data = {
            investor: parseInt(values[0]),
            investmentCost: parseFloat(values[1]),
            tokenReward: parseInt(values[2]),
            costPerToken: parseFloat(values[3]),
            individualEquity: parseFloat(values[4])
          };
          
          // Debug logging for first few items
          if (index < 5) {
            console.log(`Parsed data for investor ${data.investor}:`, {
              investor: data.investor,
              investmentCost: data.investmentCost,
              tokenReward: data.tokenReward,
              costPerToken: data.costPerToken,
              individualEquity: data.individualEquity
            });
          }
          
          return data;
        }).filter(item => item !== null);
        
        // Create investment offerings with live pricing
        const investmentOfferings = await createInvestmentOfferings(tokenomicsData);
        setOfferings(investmentOfferings);
        
        // Get BSV price
        const priceData = await getBSVPrice();
        setBsvPrice(priceData);
        
        // Get market stats
        const stats = await getMarketStats();
        setMarketStats(stats);
        
      } catch (error) {
        console.error('Error loading investment data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load investment data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh BSV price every 30 seconds
    const priceInterval = setInterval(async () => {
      try {
        const priceData = await getBSVPrice();
        setBsvPrice(priceData);
      } catch (error) {
        console.error('Error refreshing BSV price:', error);
      }
    }, 30000);

    return () => clearInterval(priceInterval);
  }, []);

  const handleBuyInvestment = async (offering: InvestmentOffering) => {
    if (!isWalletConnected || !walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    setProcessingPurchase(offering.investor);
    
    try {
      // Submit investment to 1Sat.Market
      const result = await submitInvestmentToMarket(offering, walletAddress, null);
      
      if (result.success) {
        setPurchasedSlots(prev => new Set([...prev, offering.investor]));
        alert(`Investment #${offering.investor} purchased successfully! Transaction: ${result.txid}`);
      } else {
        alert(`Purchase failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error purchasing investment:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setProcessingPurchase(null);
    }
  };

  const formatCurrency = (amount: number, currency: 'USD' | 'BSV' | 'GBP') => {
    // Debug logging for cost per token formatting
    if (amount < 0.01 && currency === 'USD') {
      console.log(`Formatting small USD amount: ${amount} -> $${amount.toFixed(8)}`);
    }
    
    switch (currency) {
      case 'USD':
        return `$${amount.toFixed(8)}`; // Changed from 2 to 8 decimal places for small amounts
      case 'BSV':
        return `${amount.toFixed(8)} BSV`;
      case 'GBP':
        return `£${amount.toFixed(8)}`; // Changed from 2 to 8 decimal places for small amounts
      default:
        return amount.toFixed(8); // Changed from 2 to 8 decimal places for small amounts
    }
  };

  const getInvestmentCost = (offering: InvestmentOffering) => {
    switch (selectedCurrency) {
      case 'USD':
        return offering.investmentCostUSD;
      case 'BSV':
        return offering.investmentCostBSV;
      case 'GBP':
        return offering.investmentCostGBP;
      default:
        return offering.investmentCostUSD;
    }
  };

  const getCostPerToken = (offering: InvestmentOffering) => {
    switch (selectedCurrency) {
      case 'USD':
        return offering.costPerTokenUSD;
      case 'BSV':
        return offering.costPerTokenBSV;
      case 'GBP':
        return offering.costPerTokenGBP;
      default:
        return offering.costPerTokenUSD;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading investment marketplace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="text-center">
          <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Live Price Feed Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <p className="text-sm text-gray-400 mb-6">
              The investment marketplace requires live BSV price data to function properly. 
              Please check your internet connection and try again.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bangers text-gold mb-4">$1SHOT Investment Marketplace</h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-4">
          Invest in One-Shot Comics and receive $1SHOT tokens plus rare NFT comics. 
          Live pricing with real-time BSV conversion.
        </p>
      </div>

      {/* BSV Price Display */}
      {bsvPrice && (
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-purple-300 mb-2">Live BSV Price</h2>
              <p className="text-sm text-gray-400">
                Last updated: {new Date(bsvPrice.last_updated).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-white">${bsvPrice.usd.toFixed(2)}</div>
                <div className="text-lg text-gray-300">£{bsvPrice.gbp.toFixed(2)} / €{bsvPrice.eur.toFixed(2)}</div>
              </div>
              <button 
                onClick={async () => {
                  try {
                    const priceData = await getBSVPrice();
                    setBsvPrice(priceData);
                  } catch (error) {
                    console.error('Error refreshing BSV price:', error);
                  }
                }}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm"
                title="Refresh BSV price"
              >
                🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Market Stats */}
      {marketStats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-white mb-2">{marketStats.totalInvestors}</div>
            <div className="text-purple-300">Total Investors</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-white mb-2">${marketStats.totalRaisedUSD.toFixed(2)}</div>
            <div className="text-purple-300">Total Raised (USD)</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-white mb-2">{marketStats.totalRaisedBSV.toFixed(8)}</div>
            <div className="text-purple-300">Total Raised (BSV)</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-white mb-2">${marketStats.averageInvestmentUSD.toFixed(2)}</div>
            <div className="text-purple-300">Avg Investment</div>
          </div>
        </div>
      )}

      {/* Currency Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 rounded-lg p-1">
          {(['USD', 'BSV', 'GBP'] as const).map((currency) => (
            <button
              key={currency}
              onClick={() => setSelectedCurrency(currency)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCurrency === currency
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Offerings Table */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-900/30">
              <tr>
                <th className="text-left p-4 text-purple-300">Investor</th>
                <th className="text-left p-4 text-purple-300">Investment Cost ({selectedCurrency})</th>
                <th className="text-left p-4 text-purple-300">Equity Tokens</th>
                                 <th className="text-left p-4 text-purple-300">Cost Per Token ({selectedCurrency})</th>
                 <th className="text-left p-4 text-purple-300">Sats per Token</th>
                 <th className="text-left p-4 text-purple-300">Individual Equity (%)</th>
                 <th className="text-center p-4 text-purple-300">NFT Comic</th>
                 <th className="text-center p-4 text-purple-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {offerings.slice(0, 20).map((offering) => (
                <tr 
                  key={offering.investor}
                  className={`border-b border-gray-700 hover:bg-gray-800/50 transition-colors ${
                    purchasedSlots.has(offering.investor) ? 'opacity-50' : ''
                  }`}
                >
                  <td className="p-4 font-bold text-gold">{offering.investor}</td>
                  <td className="p-4 text-white">
                    {formatCurrency(getInvestmentCost(offering), selectedCurrency)}
                  </td>
                  <td className="p-4 text-white">{offering.tokenReward.toLocaleString()}</td>
                                     <td className="p-4 text-white">
                     {formatCurrency(getCostPerToken(offering), selectedCurrency)}
                   </td>
                   <td className="p-4 text-white">
                     {(offering.costPerTokenBSV * 100000000).toFixed(0)} sats
                   </td>
                   <td className="p-4 text-white">{offering.individualEquity.toFixed(6)}%</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      offering.nftComic === 'Rare NFT' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {offering.nftComic}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {purchasedSlots.has(offering.investor) ? (
                      <span className="px-4 py-2 bg-gray-600 text-gray-300 rounded text-sm font-semibold">
                        SOLD
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBuyInvestment(offering)}
                        disabled={processingPurchase === offering.investor || !isWalletConnected}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105"
                      >
                        {processingPurchase === offering.investor ? 'Processing...' : 'Buy'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Wallet Connection Notice */}
      {!isWalletConnected && (
        <div className="mt-8 bg-orange-900/20 border border-orange-500/30 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-orange-300 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-4">
            Connect your Yours.org wallet to purchase investment slots and receive $1SHOT tokens.
          </p>
          <div className="space-y-2">
            {availableWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => connectWallet(wallet.name)}
                className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Connect {wallet.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 1Sat.Market Integration Notice */}
      <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-blue-300 mb-2">Powered by 1Sat.Market</h3>
        <p className="text-gray-300 mb-4">
          All transactions are processed through the 1Sat.Market platform on Bitcoin SV.
        </p>
        <a 
          href="https://1sat.market"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-300"
        >
          Visit 1Sat.Market
          <span className="ml-2">→</span>
        </a>
      </div>
    </div>
  );
}
