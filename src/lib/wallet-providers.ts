// Bitcoin SV Wallet Providers
// This file contains implementations for different Bitcoin SV wallet providers

export interface IWalletProvider {
  name: string;
  icon: string;
  description: string;
  isAvailable(): boolean;
  connect(): Promise<WalletInfo>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<string>;
  sendTransaction(transaction: Transaction): Promise<string>;
  getBalance(): Promise<string>;
  getAddress(): Promise<string>;
  getPublicKey(): Promise<string>;
}

export interface WalletInfo {
  address: string;
  publicKey: string;
  balance?: string;
  network: 'mainnet' | 'testnet';
}

export interface Transaction {
  to: string;
  amount: string;
  fee?: string;
  data?: string;
}

// Yours.org Wallet Provider
export class YoursWalletProvider implements IWalletProvider {
  name = 'Yours.org';
  icon = '🔗';
  description = 'Yours.org Bitcoin SV Wallet';

  private wallet: any;

  constructor() {
    if (typeof window !== 'undefined') {
      this.wallet = (window as any).yours;
    }
  }

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Re-check for wallet on each call (in case it loads after page load)
    const yoursWallet = (window as any).yours;
    
    // Check if Yours.org wallet is available - try multiple detection methods
    const hasYoursWallet = !!(
      yoursWallet && (
        yoursWallet.isYours || 
        yoursWallet.connect || 
        typeof yoursWallet === 'object'
      )
    );
    
    // Debug logging
    console.log('Yours.org wallet detection:', {
      yoursWallet: !!yoursWallet,
      yoursIsYours: !!(yoursWallet && yoursWallet.isYours),
      hasConnect: !!(yoursWallet && yoursWallet.connect),
      windowYours: !!(window as any).yours,
      finalResult: hasYoursWallet
    });
    
    return hasYoursWallet;
  }

  async connect(): Promise<WalletInfo> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available. Please install the Yours.org wallet extension from https://yours.org/wallet');
    }

    try {
      // Get fresh reference to Yours.org wallet
      const yoursWallet = (window as any).yours;
      
      if (yoursWallet && yoursWallet.isYours) {
        console.log('Attempting to connect to Yours.org wallet...');
        
        // Call the connect method on the Yours.org wallet
        const response = await yoursWallet.connect();
        console.log('Yours.org wallet connection response:', response);
        
        return {
          address: response.address,
          publicKey: response.publicKey,
          network: 'mainnet'
        };
      }
      
      throw new Error('Yours.org wallet is not properly initialized');
    } catch (error) {
      console.error('Yours.org wallet connection error:', error);
      throw new Error(`Failed to connect to Yours.org wallet: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.wallet && this.wallet.disconnect) {
      await this.wallet.disconnect();
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

  async sendTransaction(transaction: Transaction): Promise<string> {
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

  async getBalance(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      // This would need to be implemented based on Yours.org wallet API
      return "0.00";
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`);
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
}

// Wallet Manager
export class WalletManager {
  private provider: IWalletProvider | null = null;
  private connected = false;
  private walletInfo: WalletInfo | null = null;

  constructor(provider: IWalletProvider) {
    this.provider = provider;
  }

  async connect(): Promise<WalletInfo> {
    if (!this.provider) {
      throw new Error('No wallet provider set');
    }

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
    if (this.connected && this.provider) {
      await this.provider.disconnect();
      this.connected = false;
      this.walletInfo = null;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  getWalletInfo(): WalletInfo | null {
    return this.walletInfo;
  }

  async signMessage(message: string): Promise<string> {
    if (!this.connected || !this.provider) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.signMessage(message);
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    if (!this.connected || !this.provider) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.sendTransaction(transaction);
  }

  async getBalance(): Promise<string> {
    if (!this.connected || !this.provider) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.getBalance();
  }

  async getAddress(): Promise<string> {
    if (!this.connected || !this.provider) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.getAddress();
  }

  async getPublicKey(): Promise<string> {
    if (!this.connected || !this.provider) {
      throw new Error('Wallet is not connected');
    }
    return await this.provider.getPublicKey();
  }
}

// Utility functions
export const getAvailableWallets = (): IWalletProvider[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const providers: IWalletProvider[] = [
    new YoursWalletProvider(),
  ];

  const availableProviders = providers.filter(provider => provider.isAvailable());

  console.log('Yours.org branch - Available wallets:', availableProviders.map(p => p.name));
  console.log('Real wallets detected:', availableProviders.map(p => p.name));

  return availableProviders;
};

export const createWalletManager = (provider: IWalletProvider): WalletManager => {
  return new WalletManager(provider);
};

// BSV Utilities
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
  createTransaction(toAddress: string, amount: string, fee: string = "0.0001"): Transaction {
    return {
      to: toAddress,
      amount: amount,
      fee: fee
    };
  }
}; 