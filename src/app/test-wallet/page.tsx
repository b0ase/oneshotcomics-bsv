'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { BSVUtils } from '@/lib/wallet-providers';

export default function TestWalletPage() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { 
    walletAddress, 
    publicKey, 
    isWalletConnected, 
    isConnecting, 
    availableWallets,
    selectedWallet,
    connectWallet, 
    disconnectWallet,
    signMessage,
    sendTransaction
  } = useWallet();

  const [message, setMessage] = useState('Hello, Bitcoin SV!');
  const [signature, setSignature] = useState<string | null>(null);
  const [txid, setTxid] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('0.001');

  const handleSignMessage = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const sig = await signMessage(message);
      setSignature(sig);
    } catch (error) {
      console.error('Error signing message:', error);
      alert('Failed to sign message');
    }
  };

  const handleSendTransaction = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!recipientAddress) {
      alert('Please enter a recipient address');
      return;
    }

    if (!BSVUtils.isValidAddress(recipientAddress)) {
      alert('Please enter a valid Bitcoin SV address');
      return;
    }

    try {
      const transaction = BSVUtils.createTransaction(recipientAddress, amount);
      const transactionId = await sendTransaction(transaction);
      setTxid(transactionId);
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('Failed to send transaction');
    }
  };

  if (!isClient) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Wallet Test Page</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Wallet Connection Status */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Wallet Status</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 mb-2">Connection Status:</p>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                isWalletConnected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {isWalletConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            <div>
              <p className="text-gray-300 mb-2">Loading:</p>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                isConnecting ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'
              }`}>
                {isConnecting ? 'Connecting...' : 'Idle'}
              </span>
            </div>
          </div>

          {isWalletConnected && (
            <div className="mt-4 space-y-2">
              <div>
                <p className="text-gray-300 text-sm">Wallet Address:</p>
                <p className="font-mono text-white break-all">{walletAddress}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Public Key:</p>
                <p className="font-mono text-white break-all">{publicKey}</p>
              </div>
            </div>
          )}

          <div className="mt-6">
            {!isWalletConnected ? (
              <div className="space-y-2">
                {availableWallets.length > 0 ? (
                  availableWallets.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => connectWallet(wallet.name)}
                      disabled={isConnecting}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isConnecting ? 'Connecting...' : `Connect ${wallet.name}`}
                    </button>
                  ))
                ) : (
                  <div className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-300 text-sm">
                      No Bitcoin SV wallets detected. Please install Yours.org or HandCash wallet extension.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={disconnectWallet}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
              >
                Disconnect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Message Signing Test */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Message Signing Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Message to Sign:</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter message to sign"
              />
            </div>
            
            <button
              onClick={handleSignMessage}
              disabled={!isWalletConnected}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Message
            </button>

            {signature && (
              <div>
                <p className="text-gray-300 text-sm mb-2">Signature:</p>
                <p className="font-mono text-white break-all bg-gray-800 p-3 rounded-lg">{signature}</p>
              </div>
            )}
          </div>
        </div>

        {/* Transaction Test */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Transaction Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Recipient Address:</label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter Bitcoin SV address"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Amount (BSV):</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder="0.001"
              />
            </div>
            
            <button
              onClick={handleSendTransaction}
              disabled={!isWalletConnected || !recipientAddress}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Transaction
            </button>

            {txid && (
              <div>
                <p className="text-gray-300 text-sm mb-2">Transaction ID:</p>
                <p className="font-mono text-white break-all bg-gray-800 p-3 rounded-lg">{txid}</p>
              </div>
            )}
          </div>
        </div>

        {/* BSV Utilities Test */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">BSV Utilities Test</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 mb-2">Satoshis to BSV:</p>
              <p className="font-mono text-white">100000000 satoshis = {BSVUtils.satoshisToBSV(100000000)} BSV</p>
            </div>
            
            <div>
              <p className="text-gray-300 mb-2">BSV to Satoshis:</p>
              <p className="font-mono text-white">1 BSV = {BSVUtils.bsvToSatoshis(1)} satoshis</p>
            </div>
            
            <div>
              <p className="text-gray-300 mb-2">Address Validation:</p>
              <p className="font-mono text-white">
                "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" = {BSVUtils.isValidAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa") ? 'Valid' : 'Invalid'}
              </p>
            </div>
            
            <div>
              <p className="text-gray-300 mb-2">Invalid Address:</p>
              <p className="font-mono text-white">
                "invalid-address" = {BSVUtils.isValidAddress("invalid-address") ? 'Valid' : 'Invalid'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 