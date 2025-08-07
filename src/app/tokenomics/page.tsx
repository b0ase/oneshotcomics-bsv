'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine } from 'recharts';

interface TokenomicsData {
  investor: number;
  investmentCost: number;
  investmentCostGBP: number;
  tokenReward: number;
  costPerToken: number;
  costPerTokenGBP: number;
  individualEquity: number;
  collectiveEquity: number;
  cumulativeRaised: number;
  cumulativeRaisedGBP: number;
  treasuryValue: number;
  treasuryValueGBP: number;
}

export default function TokenomicsPage() {
  const [data, setData] = useState<TokenomicsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvestor, setSelectedInvestor] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [purchasedSlots, setPurchasedSlots] = useState<Set<number>>(new Set());
  const [showGBP, setShowGBP] = useState(false);
  const itemsPerPage = 20;
  
  // Currency conversion rate (USD to GBP) - you can update this to current rate
  const USD_TO_GBP = 0.79; // Approximate current rate
  
  const convertUSDToGBP = (usdAmount: number): number => {
    return usdAmount * USD_TO_GBP;
  };

  const handleBuyClick = (investorNumber: number) => {
    setPurchasedSlots(prev => new Set([...prev, investorNumber]));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/tokenomics.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        
        // Find the actual CSV data (skip explanatory text)
        const csvStartIndex = lines.findIndex(line => line.startsWith('Investor (n),'));
        if (csvStartIndex === -1) {
          throw new Error('Could not find CSV header in the file');
        }
        
        // Skip header row and parse data
        const csvLines = lines.slice(csvStartIndex + 1);
        const parsedData = csvLines.map((line, index) => {
          const values = line.split(',');
          
          // Validate that we have enough values and they're numeric
          if (values.length < 8) {
            console.warn(`Skipping invalid line ${csvStartIndex + index + 2}: insufficient data`);
            return null;
          }
          
          const investor = parseInt(values[0]);
          const investmentCost = parseFloat(values[1]);
          const tokenReward = parseInt(values[2]);
          const costPerToken = parseFloat(values[3]);
          const individualEquity = parseFloat(values[4]);
          const collectiveEquity = parseFloat(values[5]);
          const cumulativeRaised = parseFloat(values[6]);
          const treasuryValue = parseFloat(values[7]);
          
          // Check if any values are NaN
          if (isNaN(investor) || isNaN(investmentCost) || isNaN(tokenReward) || 
              isNaN(costPerToken) || isNaN(individualEquity) || isNaN(collectiveEquity) || 
              isNaN(cumulativeRaised) || isNaN(treasuryValue)) {
            console.warn(`Skipping invalid line ${csvStartIndex + index + 2}: contains NaN values`);
            return null;
          }
          
          return {
            investor: investor,
            investmentCost: investmentCost,
            investmentCostGBP: convertUSDToGBP(investmentCost),
            tokenReward: tokenReward,
            costPerToken: costPerToken,
            costPerTokenGBP: convertUSDToGBP(costPerToken),
            individualEquity: individualEquity,
            collectiveEquity: collectiveEquity,
            cumulativeRaised: cumulativeRaised,
            cumulativeRaisedGBP: convertUSDToGBP(cumulativeRaised),
            treasuryValue: treasuryValue,
            treasuryValueGBP: convertUSDToGBP(treasuryValue)
          };
        }).filter(item => item !== null); // Remove null entries
        
        setData(parsedData);
      } catch (error) {
        console.error('Error loading tokenomics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate key metrics
  const totalInvestors = data.length;
  const totalRaised = data.length > 0 ? data[data.length - 1].cumulativeRaised : 0;
  const totalTreasuryValue = data.length > 0 ? data[data.length - 1].treasuryValue : 0;
  const totalTokensDistributed = data.reduce((sum, item) => sum + item.tokenReward, 0);
  const totalTokenSupply = 1000000000; // 1 billion tokens total supply
  const averageInvestment = totalRaised / totalInvestors;

  // Prepare chart data
  const chartData = data
    .filter(item => !isNaN(item.costPerToken) && !isNaN(item.investmentCost)) // Filter out NaN values
    .map(item => ({
      investor: item.investor,
      investmentCost: item.investmentCost,
      investmentCostGBP: item.investmentCostGBP,
      costPerToken: item.costPerToken,
      costPerTokenGBP: item.costPerTokenGBP,
      cumulativeRaised: item.cumulativeRaised,
      cumulativeRaisedGBP: item.cumulativeRaisedGBP,
      treasuryValue: item.treasuryValue,
      treasuryValueGBP: item.treasuryValueGBP,
      individualEquity: item.individualEquity
    }));

  // Prepare equity distribution data for pie chart
  const equityData = [
    { name: 'Company Treasury', value: 100 - data[0]?.individualEquity || 0, color: '#1D3557' },
    ...data.slice(0, 9).map(item => ({
      name: `Investor ${item.investor}`,
      value: item.individualEquity,
      color: `hsl(${item.investor * 36}, 70%, 50%)`
    }))
  ];

  const COLORS = ['#E63946', '#FCA311', '#1D3557', '#FFD700', '#22c55e', '#667eea', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <h2 className="text-2xl font-bangers text-gold">Loading Tokenomics Data...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bangers text-gold mb-4">$1SHOT Tokenomics</h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-4">
          Discover the innovative tokenomics model behind One-Shot Comics. Our dynamic pricing structure 
          ensures early supporters are rewarded while maintaining sustainable growth for the ecosystem.
        </p>
        <div className="bg-gray-800 rounded-lg p-3 inline-block mb-4">
          <p className="text-sm text-gray-300">
            💱 Exchange Rate: 1 USD = £{(USD_TO_GBP).toFixed(2)} GBP
          </p>
        </div>
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 max-w-4xl mx-auto">
          <p className="text-orange-300 font-semibold mb-2">📋 Rare NFT Comic Investment Plan</p>
          <p className="text-sm text-gray-300 mb-3">
            This shows our planned tokenomics structure for the first 233 investors. Each investor receives tokens PLUS a rare 1SHOT comic NFT. 
            Early investors get cheaper tokens and more valuable NFTs. After investor 233, NFT price drops to $1 and remains stable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-800/50 p-3 rounded">
            <p className="text-gold font-semibold mb-1">🎯 Target Valuation</p>
            <p className="text-gray-300">$815K final post-money valuation</p>
            <p className="text-gray-300 text-xs">Progressive valuation model with rising token prices</p>
          </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <p className="text-gold font-semibold mb-1">🎨 NFT Comics</p>
              <p className="text-gray-300">First 233 investors get rare, valuable 1SHOT comic NFTs</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <p className="text-gold font-semibold mb-1">💰 Double Reward</p>
              <p className="text-gray-300">Cheaper tokens + higher potential NFT resale value</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <p className="text-gold font-semibold mb-1">📈 Price Stability</p>
              <p className="text-gray-300">NFT price drops to $1 at investor 233 and remains stable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenomics Explanation */}
      <div className="card mb-8">
        <h3 className="text-2xl font-bangers text-gold mb-4">How Our Tokenomics Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-orange mb-2">NFT Comic Pricing Model</h4>
            <p className="text-gray-300 mb-4">
              Our innovative pricing structure ensures that early supporters receive rare, valuable NFT comics 
              at premium prices, while the comic price trends toward $1. When we hit our raise target, 
              the mint price of comics will be set at $1 - akin to the cover price of buying an AI comic 
              in the AI comic store.
            </p>
            <h4 className="text-lg font-bold text-green mb-2">Treasury Growth</h4>
            <p className="text-gray-300">
              As more investors join, the treasury value grows exponentially, providing funding for 
              platform development, creator rewards, and ecosystem expansion.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-purple mb-2">Equity Distribution</h4>
            <p className="text-gray-300 mb-4">
              Each investor receives a percentage of the total token supply based on their investment 
              timing and amount. This creates a balanced distribution that rewards early adopters 
              while maintaining long-term sustainability.
            </p>
            <h4 className="text-lg font-bold text-red mb-2">Sustainable Growth</h4>
            <p className="text-gray-300">
              The model ensures that the platform can continue to grow and provide value to all 
              participants, with the treasury acting as a foundation for future development and rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-red to-orange">
          <h3 className="text-lg font-bold mb-2">Rare NFT Slots</h3>
          <p className="text-3xl font-bangers text-gold">233</p>
          <p className="text-sm text-gray-300">First 233 get rare NFTs</p>
        </div>
        <div className="card bg-gradient-to-br from-navy to-purple">
          <h3 className="text-lg font-bold mb-2">Target Raise</h3>
          <p className="text-3xl font-bangers text-gold">$20,716.48</p>
          <p className="text-lg text-gray-300">£16,366.02</p>
        </div>
        <div className="card bg-gradient-to-br from-green to-gold">
          <h3 className="text-lg font-bold mb-2">Target Valuation</h3>
          <p className="text-3xl font-bangers text-gold">$815,402.52</p>
          <p className="text-lg text-gray-300">£644,168.00</p>
        </div>
        <div className="card bg-gradient-to-br from-purple to-red">
          <h3 className="text-lg font-bold mb-2">Initial Sale</h3>
          <p className="text-3xl font-bangers text-gold">105,481,721</p>
          <p className="text-sm text-gray-300">(10.55% - first 233 investors)</p>
        </div>
        <div className="card bg-gradient-to-br from-orange to-red">
          <h3 className="text-lg font-bold mb-2">Total Token Supply</h3>
          <p className="text-3xl font-bangers text-gold">1,000,000,000</p>
          <p className="text-sm text-gray-300">(100% available for sale)</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* NFT Comic Pricing Model */}
        <div className="card">
          <h3 className="text-xl font-bangers text-gold mb-4">NFT Comic Pricing Model</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="investor" 
                stroke="#fff" 
                label={{ value: 'Investor Number', position: 'bottom', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <YAxis 
                stroke="#fff" 
                label={{ value: 'NFT Comic Price ($)', angle: -90, position: 'left', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`$${value.toFixed(2)}`, 'NFT Comic Price']}
              />
              <Line 
                type="monotone" 
                dataKey="investmentCost" 
                stroke="#E63946" 
                strokeWidth={2}
                dot={false}
                name="NFT Comic Price"
              />
              <ReferenceLine y={1} stroke="#22c55e" strokeDasharray="3 3" label="Target $1 Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Per Token Trend */}
        <div className="card">
          <h3 className="text-xl font-bangers text-gold mb-4">Cost Per Token Trend ({showGBP ? '£' : '$'})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="investor" 
                stroke="#fff" 
                label={{ value: 'Investor Number', position: 'bottom', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <YAxis 
                stroke="#fff" 
                label={{ value: `Cost Per Token (${showGBP ? '£' : '$'})`, angle: -90, position: 'left', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${showGBP ? '£' : '$'}${value.toFixed(8)}`, 'Cost Per Token']}
              />
              <Line 
                type="monotone" 
                dataKey={showGBP ? "costPerTokenGBP" : "costPerToken"} 
                stroke="#FCA311" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Operating Capital Growth */}
        <div className="card">
          <h3 className="text-xl font-bangers text-gold mb-4">Operating Capital Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="investor" 
                stroke="#fff" 
                label={{ value: 'Investor Number', position: 'bottom', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <YAxis 
                stroke="#fff" 
                label={{ value: 'Operating Capital ($)', angle: -90, position: 'left', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Operating Capital']}
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeRaised" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
                name="Operating Capital"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Real money raised from investors for platform development
          </p>
        </div>

        {/* Company Valuation Growth */}
        <div className="card">
          <h3 className="text-xl font-bangers text-gold mb-4">Company Valuation Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="investor" 
                stroke="#fff" 
                label={{ value: 'Investor Number', position: 'bottom', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <YAxis 
                stroke="#fff" 
                label={{ value: 'Company Value ($)', angle: -90, position: 'left', offset: 10, style: { fill: '#fff', fontSize: '12px' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Company Value']}
              />
              <Line 
                type="monotone" 
                dataKey="treasuryValue" 
                stroke="#667eea" 
                strokeWidth={2}
                dot={false}
                name="Company Value"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Theoretical company value based on token market prices
          </p>
        </div>


      </div>





      {/* Interactive Data Table */}
      <div className="card mb-8">
        <h3 className="text-2xl font-bangers text-gold mb-6">Investment Tiers</h3>
        
        {/* Currency Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-300 font-semibold">Currency:</span>
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setShowGBP(false)}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                !showGBP 
                  ? 'bg-gold text-black' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setShowGBP(true)}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                showGBP 
                  ? 'bg-gold text-black' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              GBP
            </button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="number"
            placeholder="Search by investor number..."
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setSelectedInvestor(value || null);
              setCurrentPage(1);
            }}
          />
          <button
            onClick={() => setSelectedInvestor(null)}
            className="btn btn-secondary"
          >
            Clear Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-3 text-gold">Investor</th>
                <th className="text-left p-3 text-gold">Investment Cost ({showGBP ? '£' : '$'})</th>
                <th className="text-left p-3 text-gold">Equity Tokens</th>
                <th className="text-left p-3 text-gold">Cost Per Token ({showGBP ? '£' : '$'})</th>
                <th className="text-left p-3 text-gold">Sats per Token</th>
                <th className="text-left p-3 text-gold">Individual Equity (%)</th>
                <th className="text-center p-3 text-gold">NFT Comic</th>
                <th className="text-center p-3 text-gold">Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(item => !selectedInvestor || item.investor === selectedInvestor)
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item, index) => (
                  <tr 
                    key={item.investor} 
                    className={`border-b border-gray-700 transition-colors ${
                      purchasedSlots.has(item.investor) 
                        ? 'opacity-60 hover:bg-gray-600' 
                        : 'hover:bg-green-900/30'
                    }`}
                  >
                    <td className="p-3 font-bold text-gold">{item.investor}</td>
                    <td className="p-3">
                      {showGBP ? '£' : '$'}{showGBP ? item.investmentCostGBP.toFixed(2) : item.investmentCost.toFixed(2)}
                    </td>
                    <td className="p-3">{item.tokenReward.toLocaleString()}</td>
                    <td className="p-3">
                      {showGBP ? '£' : '$'}{showGBP ? item.costPerTokenGBP.toFixed(8) : item.costPerToken.toFixed(8)}
                    </td>
                    <td className="p-3">
                      {(item.costPerToken * 100000000).toFixed(0)} sats
                    </td>
                    <td className="p-3">{item.individualEquity.toFixed(6)}%</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.investor <= 233 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {item.investor <= 233 ? 'Rare NFT' : 'Standard'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {purchasedSlots.has(item.investor) ? (
                        <span className="px-3 py-1 bg-gray-600 text-gray-300 rounded text-sm font-semibold">
                          SOLD
                        </span>
                      ) : (
                        <button
                          onClick={() => handleBuyClick(item.investor)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105"
                        >
                          Buy
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn btn-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-800 rounded">
              Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(Math.ceil(data.length / itemsPerPage), currentPage + 1))}
              disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
              className="btn btn-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
