export default function TokenPage() {
  return (
    <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">$1SHOT Token</h1>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Token Overview */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Token Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$1SHOT</div>
                <div className="text-purple-300">Token Symbol</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1,000,000</div>
                <div className="text-purple-300">Total Supply</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$0.25</div>
                <div className="text-purple-300">Current Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$250,000</div>
                <div className="text-purple-300">Market Cap</div>
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
                <h3 className="text-xl font-semibold mb-3 text-white">Trade on DEX</h3>
                <p className="text-gray-300">Buy and sell tokens on decentralized exchanges like Uniswap</p>
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
                <span className="text-white font-mono text-sm">0x1234567890abcdef1234567890abcdef12345678</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Network:</span>
                <span className="text-white">Ethereum Mainnet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Decimals:</span>
                <span className="text-white">18</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
} 