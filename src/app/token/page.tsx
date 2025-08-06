export default function TokenPage() {
  return (
    <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">$1SHOT Token</h1>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Trade $1SHOT Token - Moved to Top */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Trade $1SHOT Token</h2>
            <div className="text-center space-y-6">
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-300 mb-6">
                  $1SHOT tokens are now available for trading on 1sat.market, the premier Bitcoin SV token marketplace. 
                  Join the One-Shot Comics community and start trading today!
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">🚀 Live on 1sat.market</h3>
                  <p className="text-purple-100 mb-4">
                    Trade $1SHOT tokens with other Bitcoin SV enthusiasts
                  </p>
                  <a 
                    href="https://1sat.market/market/bsv21/23dd256ff07c30cd8fb3cd0c3f6891292044e6dc431e87c3f32208140b77da64_1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="mr-2">💰</span>
                    Trade $1SHOT on 1sat.market
                    <span className="ml-2">→</span>
                  </a>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-purple-300 font-semibold mb-1">Market</div>
                    <div className="text-white">1sat.market</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-purple-300 font-semibold mb-1">Token Standard</div>
                    <div className="text-white">BSV21</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-purple-300 font-semibold mb-1">Network</div>
                    <div className="text-white">Bitcoin SV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Overview */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Token Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$1SHOT</div>
                <div className="text-purple-300">Token Symbol</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1,000,000,000</div>
                <div className="text-purple-300">Total Supply</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">0 sats</div>
                <div className="text-purple-300">Current Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">0.00%</div>
                <div className="text-purple-300">Price Change</div>
              </div>
            </div>
            
            {/* Market Data */}
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-purple-300 font-semibold mb-1">Market Cap</div>
                <div className="text-white text-xl font-bold">0 BSV</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-purple-300 font-semibold mb-1">Holders</div>
                <div className="text-white text-xl font-bold">1</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-purple-300 font-semibold mb-1">Token Standard</div>
                <div className="text-white text-xl font-bold">BSV21</div>
              </div>
            </div>
          </div>

          {/* Token Utility */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Token Utility</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Governance</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                    <span>Vote on new comic series and storylines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                    <span>Participate in community decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                    <span>Propose new features and improvements</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Rewards</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                    <span>Earn tokens for reading and engaging with comics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                    <span>Stake tokens to earn additional rewards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                    <span>Access exclusive content and early releases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tokenomics */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Tokenomics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Community Rewards</span>
                    <span className="text-white font-semibold">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Team & Development</span>
                    <span className="text-white font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Liquidity Pool</span>
                    <span className="text-white font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Marketing</span>
                    <span className="text-white font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Reserve</span>
                    <span className="text-white font-semibold">15%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Vesting Schedule</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Team Tokens</span>
                    <span className="text-white font-semibold">2 year vesting</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Community Rewards</span>
                    <span className="text-white font-semibold">Released over 5 years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Marketing</span>
                    <span className="text-white font-semibold">6 month cliff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Get Tokens */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">How to Get $1SHOT Tokens</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Mint Comics</h3>
                <p className="text-gray-300">Earn tokens by minting new comic issues and participating in the ecosystem</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Trade on 1sat.market</h3>
                <p className="text-gray-300">Buy and sell tokens on 1sat.market, the premier Bitcoin SV token marketplace</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Earn Rewards</h3>
                <p className="text-gray-300">Participate in community activities and earn tokens as rewards</p>
              </div>
            </div>
          </div>



          {/* Contract Info */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Contract Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Contract Address:</span>
                <span className="text-white font-mono text-sm">23dd256ff07c30cd8fb3cd0c3f6891292044e6dc431e87c3f32208140b77da64_1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Deployment Inscription:</span>
                <span className="text-white font-mono text-sm">908812</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Network:</span>
                <span className="text-white">Bitcoin SV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Token Standard:</span>
                <span className="text-white">BSV21</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Marketplace:</span>
                <a 
                  href="https://1sat.market/market/bsv21/23dd256ff07c30cd8fb3cd0c3f6891292044e6dc431e87c3f32208140b77da64_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  1sat.market
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
} 