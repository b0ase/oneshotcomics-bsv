// Bitcoin SV Wallet Utilities
// This file provides utilities for working with Bitcoin SV wallets, including Yours.org wallet

export interface BSVWalletInfo {
  address: string;
  publicKey: string;
  balance?: string;
  network: 'mainnet' | 'testnet';
}

export interface BSVTransaction {
  txid: string;
  amount: string;
  fee?: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  inputs: BSVTransactionInput[];
  outputs: BSVTransactionOutput[];
}

export interface BSVTransactionInput {
  txid: string;
  vout: number;
  scriptSig: string;
  sequence: number;
}

export interface BSVTransactionOutput {
  value: string;
  scriptPubKey: string;
  address: string;
}

export interface BSVWalletProvider {
  isAvailable(): boolean;
  connect(): Promise<BSVWalletInfo>;
  disconnect(): Promise<void>;
  getBalance(): Promise<string>;
  signMessage(message: string): Promise<string>;
  signTransaction(transaction: any): Promise<string>;
  sendTransaction(transaction: any): Promise<string>;
  getAddress(): Promise<string>;
  getPublicKey(): Promise<string>;
  on(event: string, callback: (data: any) => void): void;
  off(event: string, callback: (data: any) => void): void;
}

// Yours.org Wallet Provider Implementation
export class YoursWalletProvider implements BSVWalletProvider {
  private wallet: any;

  constructor() {
    // Only access window on client side
    if (typeof window !== 'undefined') {
      this.wallet = (window as any).yours;
    }
  }

  isAvailable(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Re-check for wallet on each call (in case it loads after page load)
    const yoursWallet = (window as any).yours;
    
    // More robust detection - check for any of these properties
    const hasYoursWallet = !!(
      yoursWallet && (
        yoursWallet.isYours || 
        yoursWallet.connect || 
        yoursWallet.getPublicKey ||
        yoursWallet.signMessage ||
        yoursWallet.sendTransaction ||
        typeof yoursWallet === 'object'
      )
    );
    
    // Debug logging
    console.log('Yours.org wallet detection:', {
      yoursWallet: !!yoursWallet,
      yoursIsYours: !!(yoursWallet && yoursWallet.isYours),
      hasConnect: !!(yoursWallet && yoursWallet.connect),
      hasGetPublicKey: !!(yoursWallet && yoursWallet.getPublicKey),
      hasSignMessage: !!(yoursWallet && yoursWallet.signMessage),
      hasSendTransaction: !!(yoursWallet && yoursWallet.sendTransaction),
      windowYours: !!(window as any).yours,
      finalResult: hasYoursWallet
    });
    
    return hasYoursWallet;
  }

  async connect(): Promise<BSVWalletInfo> {
    if (!this.isAvailable()) {
      const errorMessage = `
        No Bitcoin SV wallet detected! 
        
        Please install one of the following wallet extensions:
        • Yours.org Wallet: https://yours.org/wallet
        • HandCash: https://handcash.io/
        • MoneyButton: https://www.moneybutton.com/
        
        After installation, refresh the page and try again.
      `.trim();
      
      throw new Error(errorMessage);
    }

    try {
      // Try Yours.org wallet first - get fresh reference
      const yoursWallet = (window as any).yours;
      console.log('Attempting to connect to Yours.org wallet...', yoursWallet);
      
      if (yoursWallet && yoursWallet.connect) {
        console.log('Using yoursWallet.connect() method...');
        const response = await yoursWallet.connect();
        console.log('Yours.org wallet connection response:', response);
        return {
          address: response.address,
          publicKey: response.publicKey,
          network: 'mainnet'
        };
      }
      
      // Fallback: try to get public key directly
      if (yoursWallet && yoursWallet.getPublicKey) {
        console.log('Using yoursWallet.getPublicKey() method...');
        const response = await yoursWallet.getPublicKey();
        console.log('Yours.org wallet getPublicKey response:', response);
        return {
          address: response.address || response.publicKey,
          publicKey: response.publicKey,
          network: 'mainnet'
        };
      }
      
      // Try HandCash if available
      if ((window as any).handcash) {
        const handcash = (window as any).handcash;
        const response = await handcash.connect();
        return {
          address: response.address,
          publicKey: response.publicKey,
          network: 'mainnet'
        };
      }
      
      // Try MoneyButton if available
      if ((window as any).moneyButton) {
        const moneyButton = (window as any).moneyButton;
        const response = await moneyButton.connect();
        return {
          address: response.address,
          publicKey: response.publicKey,
          network: 'mainnet'
        };
      }
      
      throw new Error('No compatible wallet provider found');
    } catch (error) {
      throw new Error(`Failed to connect to wallet: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.wallet && this.wallet.disconnect) {
      await this.wallet.disconnect();
    }
  }

  async getBalance(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      // Get balance from Yours.org wallet API
      if (this.wallet && this.wallet.getBalance) {
        const response = await this.wallet.getBalance();
        return response.balance || "0.00";
      }
      throw new Error('getBalance method not available in Yours.org wallet');
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      const response = await this.wallet.signMessage(message);
      return response.signature;
    } catch (error) {
      throw new Error(`Failed to sign message: ${error}`);
    }
  }

  async signTransaction(transaction: any): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      if (this.wallet && this.wallet.signTransaction) {
        const response = await this.wallet.signTransaction(transaction);
        return response.signedTransaction;
      }
      throw new Error('signTransaction method not available in Yours.org wallet');
    } catch (error) {
      throw new Error(`Failed to sign transaction: ${error}`);
    }
  }

  async sendTransaction(transaction: any): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      const response = await this.wallet.sendTransaction(transaction);
      return response.txid;
    } catch (error) {
      throw new Error(`Failed to send transaction: ${error}`);
    }
  }

  async getAddress(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      if (this.wallet && this.wallet.getAddress) {
        const response = await this.wallet.getAddress();
        return response.address;
      } else if (this.wallet && this.wallet.getPublicKey) {
        // Fallback to getPublicKey if getAddress is not available
        const response = await this.wallet.getPublicKey();
        return response.address || response.publicKey;
      }
      throw new Error('getAddress method not available in Yours.org wallet');
    } catch (error) {
      throw new Error(`Failed to get address: ${error}`);
    }
  }

  async getPublicKey(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      const response = await this.wallet.getPublicKey();
      return response.publicKey;
    } catch (error) {
      throw new Error(`Failed to get public key: ${error}`);
    }
  }

  on(event: string, callback: (data: any) => void): void {
    if (this.wallet && this.wallet.on) {
      this.wallet.on(event, callback);
    }
  }

  off(event: string, callback: (data: any) => void): void {
    if (this.wallet && this.wallet.removeListener) {
      this.wallet.removeListener(event, callback);
    }
  }
}

// Generic Bitcoin SV Wallet Manager
export class BSVWalletManager {
  private provider: BSVWalletProvider;
  private connected: boolean = false;
  private walletInfo: BSVWalletInfo | null = null;

  constructor(provider: BSVWalletProvider) {
    this.provider = provider;
  }

  async connect(): Promise<BSVWalletInfo> {
    if (!this.provider.isAvailable()) {
      throw new Error('Wallet provider is not available');
    }

    try {
      this.walletInfo = await this.provider.connect();
      this.connected = true;
      return this.walletInfo;
    } catch (error) {
      throw new Error(`Failed to connect wallet: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.provider.disconnect();
      this.connected = false;
      this.walletInfo = null;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  getWalletInfo(): BSVWalletInfo | null {
    return this.walletInfo;
  }

  async getBalance(): Promise<string> {
    if (!this.connected) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.getBalance();
  }

  async signMessage(message: string): Promise<string> {
    if (!this.connected) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.signMessage(message);
  }

  async sendTransaction(transaction: any): Promise<string> {
    if (!this.connected) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.sendTransaction(transaction);
  }

  on(event: string, callback: (data: any) => void): void {
    this.provider.on(event, callback);
  }

  off(event: string, callback: (data: any) => void): void {
    this.provider.off(event, callback);
  }
}



// HandCash Wallet Provider
export class HandCashWalletProvider implements BSVWalletProvider {
  private wallet: any;

  constructor() {
    // Only access window on client side
    if (typeof window !== 'undefined') {
      this.wallet = (window as any).handcash;
    }
  }

  isAvailable(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Re-check for wallet on each call (in case it loads after page load)
    const handcashWallet = (window as any).handcash;
    
    // Check if HandCash wallet is available
    const hasHandCash = !!handcashWallet;
    
    // Debug logging
    console.log('HandCash wallet detection:', {
      handcashWallet: !!handcashWallet,
      windowHandCash: !!(window as any).handcash
    });
    
    return hasHandCash;
  }

  async connect(): Promise<BSVWalletInfo> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      console.log('Attempting to connect to HandCash wallet...');
      const response = await this.wallet.connect();
      console.log('HandCash wallet connection response:', response);
      return {
        address: response.address,
        publicKey: response.publicKey,
        network: 'mainnet'
      };
    } catch (error) {
      throw new Error(`Failed to connect to HandCash wallet: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.wallet && this.wallet.disconnect) {
      await this.wallet.disconnect();
    }
  }

  async getBalance(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      if (this.wallet && this.wallet.getBalance) {
        const response = await this.wallet.getBalance();
        return response.balance || "0.00";
      }
      throw new Error('getBalance method not available in HandCash wallet');
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      const response = await this.wallet.signMessage(message);
      return response.signature;
    } catch (error) {
      throw new Error(`Failed to sign message: ${error}`);
    }
  }

  async signTransaction(transaction: any): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      if (this.wallet && this.wallet.signTransaction) {
        const response = await this.wallet.signTransaction(transaction);
        return response.signedTransaction;
      }
      throw new Error('signTransaction method not available in HandCash wallet');
    } catch (error) {
      throw new Error(`Failed to sign transaction: ${error}`);
    }
  }

  async sendTransaction(transaction: any): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      const response = await this.wallet.sendTransaction(transaction);
      return response.txid;
    } catch (error) {
      throw new Error(`Failed to send transaction: ${error}`);
    }
  }

  async getAddress(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      const response = await this.wallet.getAddress();
      return response.address;
    } catch (error) {
      throw new Error(`Failed to get address: ${error}`);
    }
  }

  async getPublicKey(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('HandCash wallet is not available');
    }

    try {
      const response = await this.wallet.getPublicKey();
      return response.publicKey;
    } catch (error) {
      throw new Error(`Failed to get public key: ${error}`);
    }
  }

  on(event: string, callback: (data: any) => void): void {
    if (this.wallet && this.wallet.on) {
      this.wallet.on(event, callback);
    }
  }

  off(event: string, callback: (data: any) => void): void {
    if (this.wallet && this.wallet.off) {
      this.wallet.off(event, callback);
    }
  }
}

// Wallet manager factory function
export const getBsvWalletManager = (): BSVWalletManager => {
  if (typeof window === 'undefined') {
    throw new Error('Wallet manager can only be used on the client side');
  }
  
  // Check for available wallets
  const yoursProvider = new YoursWalletProvider();
  const handcashProvider = new HandCashWalletProvider();
  
  // Prefer Yours.org if available, then HandCash
  if (yoursProvider.isAvailable()) {
    console.log('Yours.org wallet detected, using YoursWalletProvider');
    return new BSVWalletManager(yoursProvider);
  } else if (handcashProvider.isAvailable()) {
    console.log('HandCash wallet detected, using HandCashWalletProvider');
    return new BSVWalletManager(handcashProvider);
  } else {
    throw new Error('No Bitcoin SV wallet detected. Please install Yours.org or HandCash wallet extension.');
  }
};

// Get available wallet providers
export const getAvailableWallets = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const availableWallets = [];
  
  const yoursProvider = new YoursWalletProvider();
  if (yoursProvider.isAvailable()) {
    availableWallets.push({
      name: 'Yours.org',
      provider: yoursProvider,
      icon: '🔗',
      description: 'Yours.org Bitcoin SV Wallet'
    });
  }
  
  const handcashProvider = new HandCashWalletProvider();
  if (handcashProvider.isAvailable()) {
    availableWallets.push({
      name: 'HandCash',
      provider: handcashProvider,
      icon: '👋',
      description: 'HandCash Bitcoin SV Wallet'
    });
  }
  

  
  return availableWallets;
};

// Create wallet manager with specific provider
export const createWalletManager = (provider: BSVWalletProvider): BSVWalletManager => {
  return new BSVWalletManager(provider);
};

// For backward compatibility - only create on client side
export const bsvWalletManager = typeof window !== 'undefined' ? getBsvWalletManager() : null;

// Utility functions for Bitcoin SV operations
export const BSVUtils = {
  // Convert satoshis to BSV
  satoshisToBSV(satoshis: number): string {
    return (satoshis / 100000000).toFixed(8);
  },

  // Convert BSV to satoshis
  bsvToSatoshis(bsv: number): number {
    return Math.round(bsv * 100000000);
  },

  // Validate Bitcoin SV address format
  isValidAddress(address: string): boolean {
    // Basic validation - would need more comprehensive validation
    return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address);
  },

  // Generate a simple transaction object
  createTransaction(toAddress: string, amount: string, fee: string = "0.0001"): any {
    return {
      to: toAddress,
      amount: amount,
      fee: fee,
      timestamp: Date.now()
    };
  }
}; 