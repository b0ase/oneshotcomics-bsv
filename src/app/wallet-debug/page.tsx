'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '../../contexts/WalletContext';

export default function WalletDebugPage() {
  const { availableWallets, connectWallet, isConnecting } = useWallet();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Check for wallet objects in window
    const checkWallets = () => {
      const info: any = {
        window: typeof window !== 'undefined',
        yours: {
          exists: !!(window as any).yours,
          object: (window as any).yours,
          properties: []
        },
        panda: {
          exists: !!(window as any).panda,
          object: (window as any).panda,
          properties: []
        },
        handcash: {
          exists: !!(window as any).handcash,
          object: (window as any).handcash,
          properties: []
        }
      };

      // Check Yours.org wallet properties
      if ((window as any).yours) {
        const yours = (window as any).yours;
        info.yours.properties = Object.getOwnPropertyNames(yours);
        info.yours.methods = {
          isYours: !!yours.isYours,
          connect: typeof yours.connect,
          request: typeof yours.request,
          getPublicKey: typeof yours.getPublicKey,
          signMessage: typeof yours.signMessage,
          sendTransaction: typeof yours.sendTransaction
        };
      }

      // Check Panda wallet properties
      if ((window as any).panda) {
        const panda = (window as any).panda;
        info.panda.properties = Object.getOwnPropertyNames(panda);
        info.panda.methods = {
          isPanda: !!panda.isPanda,
          connect: typeof panda.connect,
          request: typeof panda.request,
          getPublicKey: typeof panda.getPublicKey,
          signMessage: typeof panda.signMessage,
          sendTransaction: typeof panda.sendTransaction
        };
      }

      // Check HandCash wallet properties
      if ((window as any).handcash) {
        const handcash = (window as any).handcash;
        info.handcash.properties = Object.getOwnPropertyNames(handcash);
        info.handcash.methods = {
          connect: typeof handcash.connect,
          getPublicKey: typeof handcash.getPublicKey,
          signMessage: typeof handcash.signMessage,
          sendTransaction: typeof handcash.sendTransaction
        };
      }

      setDebugInfo(info);
    };

    checkWallets();
    
    // Check again after a delay
    const timer = setTimeout(checkWallets, 2000);
    return () => clearTimeout(timer);
  }, []);

  const testOurWalletProvider = async () => {
    try {
      console.log('=== TESTING OUR WALLET PROVIDER ===');
      
      // Import and test our wallet provider directly
      const { YoursWalletProvider } = await import('../../lib/wallet-providers');
      const provider = new YoursWalletProvider();
      
      console.log('Provider created:', provider);
      console.log('Provider available:', provider.isAvailable());
      
      if (provider.isAvailable()) {
        console.log('Attempting to connect...');
        const result = await provider.connect();
        console.log('Provider connect result:', result);
        alert(`Provider connection successful! Address: ${result.address}, PublicKey: ${result.publicKey}`);
      } else {
        alert('Provider reports wallet not available');
      }
    } catch (error) {
      console.error('Provider test error:', error);
      alert(`Provider test failed: ${error}`);
    }
  };

  const testYoursConnection = async () => {
    try {
      console.log('=== STARTING COMPREHENSIVE WALLET TEST ===');
      
      const yours = (window as any).yours;
      const panda = (window as any).panda;
      
      console.log('Available wallet objects:', { yours: !!yours, panda: !!panda });
      
      if (yours) {
        console.log('Yours wallet object:', yours);
        console.log('Yours wallet properties:', Object.getOwnPropertyNames(yours));
        
        // Test different connection methods
        if (yours.connect) {
          console.log('Testing yours.connect()...');
          try {
            const result = await yours.connect();
            console.log('yours.connect() result:', result);
            alert(`Yours.connect() successful! Address: ${result.address}, PublicKey: ${result.publicKey}`);
            return;
          } catch (e) {
            console.error('yours.connect() failed:', e);
          }
        }
        
        if (yours.request) {
          console.log('Testing yours.request()...');
          try {
            const accounts = await yours.request({ method: 'eth_requestAccounts' });
            console.log('yours.request(eth_requestAccounts) result:', accounts);
            alert(`Yours.request() successful! Accounts: ${JSON.stringify(accounts)}`);
            return;
          } catch (e) {
            console.error('yours.request() failed:', e);
          }
        }
        
        if (yours.getPublicKey) {
          console.log('Testing yours.getPublicKey()...');
          try {
            const result = await yours.getPublicKey();
            console.log('yours.getPublicKey() result:', result);
            alert(`Yours.getPublicKey() successful! Result: ${JSON.stringify(result)}`);
            return;
          } catch (e) {
            console.error('yours.getPublicKey() failed:', e);
          }
        }
      }
      
      if (panda) {
        console.log('Panda wallet object:', panda);
        console.log('Panda wallet properties:', Object.getOwnPropertyNames(panda));
        
        if (panda.connect) {
          console.log('Testing panda.connect()...');
          try {
            const result = await panda.connect();
            console.log('panda.connect() result:', result);
            alert(`Panda.connect() successful! Address: ${result.address}, PublicKey: ${result.publicKey}`);
            return;
          } catch (e) {
            console.error('panda.connect() failed:', e);
          }
        }
      }
      
      console.log('=== NO WORKING CONNECTION METHOD FOUND ===');
      alert('No working wallet connection method found. Check console for details.');
      
    } catch (error) {
      console.error('Comprehensive test error:', error);
      alert(`Test failed: ${error}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Wallet Debug Page</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Installation Instructions */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Installation Instructions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Yours.org Wallet</h3>
              <p className="text-gray-300 mb-2">Install the Yours.org wallet extension:</p>
              <a 
                href="https://yours.org/wallet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 underline"
              >
                https://yours.org/wallet
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">HandCash Wallet</h3>
              <p className="text-gray-300 mb-2">Install the HandCash wallet extension:</p>
              <a 
                href="https://handcash.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 underline"
              >
                https://handcash.io/
              </a>
            </div>
          </div>
        </div>

        {/* Available Wallets */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Available Wallets</h2>
          <div className="space-y-4">
            {availableWallets.length > 0 ? (
              availableWallets.map((wallet) => (
                <div key={wallet.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-lg mr-2">{wallet.icon}</span>
                    <span className="text-white font-semibold">{wallet.name}</span>
                    <p className="text-gray-400 text-sm">{wallet.description}</p>
                  </div>
                  <button
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300">No wallets detected. Please install a wallet extension and refresh the page.</p>
              </div>
            )}
          </div>
        </div>

        {/* Debug Information */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Debug Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Window Object</h3>
              <p className="text-gray-300">Available: {debugInfo.window ? 'Yes' : 'No'}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Yours.org Wallet</h3>
              <p className="text-gray-300">Exists: {debugInfo.yours?.exists ? 'Yes' : 'No'}</p>
              {debugInfo.yours?.exists && (
                <div className="mt-2">
                  <p className="text-gray-300 text-sm">Properties: {debugInfo.yours.properties?.join(', ')}</p>
                  <p className="text-gray-300 text-sm">Methods:</p>
                  <ul className="text-gray-400 text-sm ml-4">
                    {Object.entries(debugInfo.yours.methods || {}).map(([key, value]) => (
                      <li key={key}>{key}: {String(value)}</li>
                    ))}
                  </ul>
                  <button
                    onClick={testYoursConnection}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mr-2"
                  >
                    Test Direct Connection
                  </button>
                  <button
                    onClick={testOurWalletProvider}
                    className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Test Our Provider
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Panda Wallet</h3>
              <p className="text-gray-300">Exists: {debugInfo.panda?.exists ? 'Yes' : 'No'}</p>
              {debugInfo.panda?.exists && (
                <div className="mt-2">
                  <p className="text-gray-300 text-sm">Properties: {debugInfo.panda.properties?.join(', ')}</p>
                  <p className="text-gray-300 text-sm">Methods:</p>
                  <ul className="text-gray-400 text-sm ml-4">
                    {Object.entries(debugInfo.panda.methods || {}).map(([key, value]) => (
                      <li key={key}>{key}: {String(value)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">HandCash Wallet</h3>
              <p className="text-gray-300">Exists: {debugInfo.handcash?.exists ? 'Yes' : 'No'}</p>
              {debugInfo.handcash?.exists && (
                <div className="mt-2">
                  <p className="text-gray-300 text-sm">Properties: {debugInfo.handcash.properties?.join(', ')}</p>
                  <p className="text-gray-300 text-sm">Methods:</p>
                  <ul className="text-gray-400 text-sm ml-4">
                    {Object.entries(debugInfo.handcash.methods || {}).map(([key, value]) => (
                      <li key={key}>{key}: {String(value)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Console Instructions */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Console Debugging</h2>
          <p className="text-gray-300 mb-4">
            Open your browser's developer console (F12) to see detailed wallet detection logs.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-green-400 font-mono text-sm">
              // Check for Yours.org wallet<br/>
              console.log('Yours wallet:', window.yours);<br/>
              <br/>
              // Check for HandCash wallet<br/>
              console.log('HandCash wallet:', window.handcash);
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
