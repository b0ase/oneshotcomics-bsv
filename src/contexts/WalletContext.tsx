'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getBsvWalletManager, BSVUtils } from '@/lib/bsv-wallet';

// Bitcoin SV wallet types
declare global {
  interface Window {
    yours?: {
      isYours?: boolean;
      connect: () => Promise<{ publicKey: string; address: string }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: () => void) => void;
      removeListener: (event: string, callback: () => void) => void;
      getPublicKey: () => Promise<{ publicKey: string }>;
      signMessage: (message: string) => Promise<{ signature: string }>;
      sendTransaction: (transaction: any) => Promise<{ txid: string }>;
    };
  }
}

interface WalletContextType {
  walletAddress: string | null;
  publicKey: string | null;
  isWalletConnected: boolean;
  isConnecting: boolean;
  connectYoursWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkWalletConnection: () => void;
  signMessage: (message: string) => Promise<string | null>;
  sendTransaction: (transaction: any) => Promise<string | null>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check wallet connection on component mount
  useEffect(() => {
    checkWalletConnection();
    
    // Listen for wallet connection changes
    const handleStorageChange = (e: StorageEvent) => {
      if (typeof window !== 'undefined' && (e.key === 'walletAddress' || e.key === 'walletPublicKey')) {
        checkWalletConnection();
      }
    };

    // Listen for wallet events
    const handleWalletConnection = () => {
      checkWalletConnection();
    };

    const handleWalletDisconnection = () => {
      setWalletAddress(null);
      setPublicKey(null);
      setIsWalletConnected(false);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }
    
    // Add wallet event listeners (only on client side)
    if (typeof window !== 'undefined') {
      try {
        const walletManager = getBsvWalletManager();
        walletManager.on('connect', handleWalletConnection);
        walletManager.on('disconnect', handleWalletDisconnection);
      } catch (error) {
        console.log('Wallet manager not available during SSR');
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
      if (typeof window !== 'undefined') {
        try {
          const walletManager = getBsvWalletManager();
          walletManager.off('connect', handleWalletConnection);
          walletManager.off('disconnect', handleWalletDisconnection);
        } catch (error) {
          console.log('Wallet manager not available during cleanup');
        }
      }
    };
  }, []);

  const checkWalletConnection = () => {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const savedWallet = localStorage.getItem('walletAddress');
        const savedPublicKey = localStorage.getItem('walletPublicKey');
        if (savedWallet && savedPublicKey) {
          setWalletAddress(savedWallet);
          setPublicKey(savedPublicKey);
          setIsWalletConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectYoursWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Use the BSV wallet manager to connect
      const walletManager = getBsvWalletManager();
      const walletInfo = await walletManager.connect();
      
      // Save wallet information
      setWalletAddress(walletInfo.address);
      setPublicKey(walletInfo.publicKey);
      setIsWalletConnected(true);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('walletAddress', walletInfo.address);
        localStorage.setItem('walletPublicKey', walletInfo.publicKey);
      }
      
      console.log('Connected to Yours.org wallet:', walletInfo);
    } catch (error) {
      console.error('Error connecting to Yours.org wallet:', error);
      alert('Failed to connect to Yours.org wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      const walletManager = getBsvWalletManager();
      await walletManager.disconnect();
      
      setWalletAddress(null);
      setPublicKey(null);
      setIsWalletConnected(false);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletPublicKey');
      }
      
      console.log('Disconnected from Yours.org wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      if (!isWalletConnected) {
        throw new Error('Wallet not connected');
      }

      const walletManager = getBsvWalletManager();
      return await walletManager.signMessage(message);
    } catch (error) {
      console.error('Error signing message:', error);
      return null;
    }
  };

  const sendTransaction = async (transaction: any): Promise<string | null> => {
    try {
      if (!isWalletConnected) {
        throw new Error('Wallet not connected');
      }

      const walletManager = getBsvWalletManager();
      return await walletManager.sendTransaction(transaction);
    } catch (error) {
      console.error('Error sending transaction:', error);
      return null;
    }
  };

  const value: WalletContextType = {
    walletAddress,
    publicKey,
    isWalletConnected,
    isConnecting,
    connectYoursWallet,
    disconnectWallet,
    checkWalletConnection,
    signMessage,
    sendTransaction,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 