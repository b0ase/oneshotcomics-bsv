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
    return !!(typeof window !== 'undefined' && this.wallet && this.wallet.isYours);
  }

  async connect(): Promise<BSVWalletInfo> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      const response = await this.wallet.connect();
      return {
        address: response.address,
        publicKey: response.publicKey,
        network: 'mainnet' // Default to mainnet, could be configurable
      };
    } catch (error) {
      throw new Error(`Failed to connect to Yours.org wallet: ${error}`);
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
      // This would need to be implemented based on Yours.org wallet API
      // For now, return a placeholder
      return "0.00";
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
      // This would need to be implemented based on Yours.org wallet API
      // For now, return a placeholder
      return "signed_transaction_placeholder";
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
      const response = await this.wallet.getPublicKey();
      // This would need to be implemented based on Yours.org wallet API
      // For now, return a placeholder
      return "address_placeholder";
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

// Create a lazy-loaded wallet manager instance
let _bsvWalletManager: BSVWalletManager | null = null;

export const getBsvWalletManager = (): BSVWalletManager => {
  if (typeof window === 'undefined') {
    throw new Error('Wallet manager can only be used on the client side');
  }
  
  if (!_bsvWalletManager) {
    _bsvWalletManager = new BSVWalletManager(new YoursWalletProvider());
  }
  return _bsvWalletManager;
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