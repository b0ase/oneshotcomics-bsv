'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAvailableWallets, 
  createWalletManager, 
  BSVUtils, 
  IWalletProvider, 
  WalletManager
} from '@/lib/wallet-providers';

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
  availableWallets: IWalletProvider[];
  selectedWallet: string | null;
  connectWallet: (walletName: string) => Promise<void>;
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
  const [availableWallets, setAvailableWallets] = useState<IWalletProvider[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletManager, setWalletManager] = useState<WalletManager | null>(null);

  // Check wallet connection and available wallets on component mount
  useEffect(() => {
    checkWalletConnection();
    checkAvailableWallets();
    
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
        // We'll handle wallet events through the context state instead
        console.log('Wallet context initialized');
        
        // Check for available wallets and existing connections on mount
        checkAvailableWallets();
        checkWalletConnection();
        
        // Re-check wallets after a short delay to catch wallets that load after page load
        setTimeout(() => {
          checkAvailableWallets();
        }, 1000);
      } catch (error) {
        console.log('Wallet context not available during SSR');
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
      if (typeof window !== 'undefined') {
        try {
          // Cleanup handled by context state
          console.log('Wallet context cleanup');
        } catch (error) {
          console.log('Wallet context not available during cleanup');
        }
      }
    };
  }, []);

  const checkAvailableWallets = () => {
    try {
      if (typeof window !== 'undefined') {
        const wallets = getAvailableWallets();
        setAvailableWallets(wallets);
        console.log('Available wallets:', wallets.map(w => w.name));
      }
    } catch (error) {
      console.error('Error checking available wallets:', error);
    }
  };

  const checkWalletConnection = () => {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const savedWallet = localStorage.getItem('walletAddress');
        const savedPublicKey = localStorage.getItem('walletPublicKey');
        const savedWalletType = localStorage.getItem('selectedWallet');
        if (savedWallet && savedPublicKey) {
          setWalletAddress(savedWallet);
          setPublicKey(savedPublicKey);
          setIsWalletConnected(true);
          setSelectedWallet(savedWalletType);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true);
    
    try {
      console.log(`=== CONNECTING TO ${walletName} WALLET ===`);
      console.log('Available wallets:', availableWallets.map(w => w.name));
      
      let walletManager: WalletManager;
      let walletInfo;
      
      // Find the selected wallet provider
      const selectedWallet = availableWallets.find(w => w.name === walletName);
      if (!selectedWallet) {
        console.error(`Wallet ${walletName} not found in:`, availableWallets);
        throw new Error(`Wallet ${walletName} not found`);
      }

      console.log('Selected wallet provider:', selectedWallet);
      console.log('Provider isAvailable:', selectedWallet.isAvailable());

      // Create wallet manager with the selected provider
      walletManager = createWalletManager(selectedWallet);
      console.log('Created wallet manager:', walletManager);
      
      console.log('Attempting wallet connection...');
      walletInfo = await walletManager.connect();
      console.log(`Connected to ${walletName} wallet:`, walletInfo);
      console.log('Wallet info details:', {
        address: walletInfo.address,
        publicKey: walletInfo.publicKey,
        network: walletInfo.network,
        balance: walletInfo.balance
      });
      
      // Validate wallet info
      if (!walletInfo.address) {
        console.error('Wallet connection returned undefined address!');
        throw new Error('Wallet connection failed: No address returned');
      }
      
      // Save wallet manager instance and wallet information
      setWalletManager(walletManager);
      setWalletAddress(walletInfo.address);
      setPublicKey(walletInfo.publicKey);
      setIsWalletConnected(true);
      setSelectedWallet(walletName);
      
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('walletAddress', walletInfo.address);
        localStorage.setItem('walletPublicKey', walletInfo.publicKey);
        localStorage.setItem('selectedWallet', walletName);
        console.log('Saved to localStorage:', {
          address: walletInfo.address,
          publicKey: walletInfo.publicKey,
          wallet: walletName
        });
      }
      
      console.log(`=== SUCCESSFULLY CONNECTED TO ${walletName} WALLET ===`);
    } catch (error) {
      console.error('=== WALLET CONNECTION ERROR ===', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        availableWallets: availableWallets.map(w => w.name)
      });
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      
      // Check if it's a wallet not available error
      if (errorMessage.includes('not available')) {
        alert(`🔗 Wallet Connection Required\n\n${errorMessage}\n\nPlease install a Bitcoin SV wallet extension and try again.`);
      } else {
        alert(`❌ Wallet Connection Failed\n\n${errorMessage}\n\nPlease try again or check if your wallet extension is properly installed.`);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Disconnect from wallet manager if available
      if (walletManager) {
        await walletManager.disconnect();
      }
      
      // Clear wallet state
      setWalletManager(null);
      setWalletAddress(null);
      setPublicKey(null);
      setIsWalletConnected(false);
      setSelectedWallet(null);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletPublicKey');
        localStorage.removeItem('selectedWallet');
      }
      
      console.log('Disconnected from wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      if (!isWalletConnected || !walletManager) {
        throw new Error('Wallet not connected');
      }

      const signature = await walletManager.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      return null;
    }
  };

  const sendTransaction = async (transaction: any): Promise<string | null> => {
    try {
      if (!isWalletConnected || !walletManager) {
        throw new Error('Wallet not connected');
      }

      const txid = await walletManager.sendTransaction(transaction);
      return txid;
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
    availableWallets,
    selectedWallet,
    connectWallet,
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