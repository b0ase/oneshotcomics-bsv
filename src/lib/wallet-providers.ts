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
      const response = await this.wallet.getPublicKey();
      return response.address || "address_placeholder";
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

// HandCash Wallet Provider
export class HandCashWalletProvider implements IWalletProvider {
  name = 'HandCash';
  icon = '👋';
  description = 'HandCash Bitcoin SV Wallet';

  private appId: string;
  private appSecret: string;

  constructor() {
    // Get HandCash credentials from environment variables
    this.appId = process.env.NEXT_PUBLIC_HANDCASH_APP_ID || '6893a4cb4f9725a1eb486c45';
    this.appSecret = process.env.NEXT_PUBLIC_HANDCASH_APP_SECRET || '6893a4cb4f9725a1eb486c45%';
  }

  isAvailable(): boolean {
    // HandCash Connect is always available via API
    return true;
  }

  async connect(): Promise<WalletInfo> {
    try {
      console.log('Attempting to connect to HandCash wallet via OAuth...');
      
      // HandCash Connect OAuth flow
      const authUrl = `https://connect.handcash.io/oauth/authorize?client_id=${this.appId}&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=payment&response_type=code`;
      
      // Open HandCash Connect popup
      const popup = window.open(authUrl, 'handcash-connect', 'width=500,height=600,scrollbars=yes,resizable=yes');
      
      if (!popup) {
        throw new Error('Failed to open HandCash Connect popup. Please allow popups for this site.');
      }

      // Wait for the authorization code
      const authCode = await new Promise<string>((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            reject(new Error('HandCash Connect was closed without authorization'));
          }
        }, 1000);

        const messageHandler = (event: MessageEvent) => {
          if (event.origin !== 'https://connect.handcash.io') return;
          
          if (event.data.type === 'handcash-auth-success') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            popup.close();
            resolve(event.data.code);
          } else if (event.data.type === 'handcash-auth-error') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            popup.close();
            reject(new Error(event.data.error || 'HandCash authorization failed'));
          }
        };

        window.addEventListener('message', messageHandler);
      });

      // Exchange auth code for access token
      const tokenResponse = await fetch('https://connect.handcash.io/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.appId,
          client_secret: this.appSecret,
          code: authCode,
          redirect_uri: window.location.origin,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get HandCash access token');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Get user profile and wallet info
      const profileResponse = await fetch('https://connect.handcash.io/api/v1/profile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to get HandCash profile');
      }

      const profile = await profileResponse.json();

      return {
        address: profile.paymail || profile.cashtag,
        publicKey: profile.publicKey || 'handcash_public_key',
        network: 'mainnet'
      };
    } catch (error) {
      console.error('HandCash connection error:', error);
      throw new Error(`Failed to connect to HandCash wallet: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    // Clear any stored tokens/session
    if (typeof window !== 'undefined') {
      localStorage.removeItem('handcash_access_token');
      localStorage.removeItem('handcash_profile');
    }
  }

  async signMessage(message: string): Promise<string> {
    // For now, return a placeholder signature
    // In a real implementation, you would use the HandCash API to sign messages
    return `handcash_signature_${Date.now()}_${message}`;
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    // For now, return a placeholder transaction ID
    // In a real implementation, you would use the HandCash API to send transactions
    return `handcash_txid_${Date.now()}_${transaction.to}`;
  }

  async getBalance(): Promise<string> {
    // For now, return a placeholder balance
    // In a real implementation, you would use the HandCash API to get balance
    return "0.00";
  }

  async getAddress(): Promise<string> {
    // For now, return a placeholder address
    // In a real implementation, you would use the stored profile or API call
    return "handcash_address_placeholder";
  }

  async getPublicKey(): Promise<string> {
    // For now, return a placeholder public key
    // In a real implementation, you would use the stored profile or API call
    return "handcash_public_key_placeholder";
  }
}

// Demo Wallet Provider for testing
export class DemoWalletProvider implements IWalletProvider {
  name = 'Demo';
  icon = '🎭';
  description = 'Demo Wallet for Testing';

  private connected = false;
  private demoAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
  private demoPublicKey = "demo_public_key_for_testing_purposes_only";

  isAvailable(): boolean {
    return true; // Always available for demo purposes
  }

  async connect(): Promise<WalletInfo> {
    this.connected = true;
    return {
      address: this.demoAddress,
      publicKey: this.demoPublicKey,
      balance: "0.001",
      network: 'testnet'
    };
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  async signMessage(message: string): Promise<string> {
    return `demo_signature_${Date.now()}_${message}`;
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    return `demo_txid_${Date.now()}_${transaction.to}`;
  }

  async getBalance(): Promise<string> {
    return "0.001";
  }

  async getAddress(): Promise<string> {
    return this.demoAddress;
  }

  async getPublicKey(): Promise<string> {
    return this.demoPublicKey;
  }
}

// MoneyButton Wallet Provider
export class MoneyButtonWalletProvider implements IWalletProvider {
  name = 'MoneyButton';
  icon = '💰';
  description = 'MoneyButton Bitcoin SV Wallet';

  private wallet: any;

  constructor() {
    if (typeof window !== 'undefined') {
      this.wallet = (window as any).moneyButton;
    }
  }

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    
    const moneyButtonWallet = (window as any).moneyButton;
    return !!moneyButtonWallet;
  }

  async connect(): Promise<WalletInfo> {
    if (!this.isAvailable()) {
      throw new Error('MoneyButton wallet is not available. Please install the MoneyButton wallet extension.');
    }

    try {
      const response = await this.wallet.connect();
      return {
        address: response.address,
        publicKey: response.publicKey,
        network: 'mainnet'
      };
    } catch (error) {
      throw new Error(`Failed to connect to MoneyButton wallet: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.wallet && this.wallet.disconnect) {
      await this.wallet.disconnect();
    }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('MoneyButton wallet is not available');
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
      throw new Error('MoneyButton wallet is not available');
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
      throw new Error('MoneyButton wallet is not available');
    }

    try {
      // This would need to be implemented based on MoneyButton wallet API
      return "0.00";
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  async getAddress(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('MoneyButton wallet is not available');
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
      throw new Error('MoneyButton wallet is not available');
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

  // Always include demo wallet as a fallback option
  availableProviders.push(new DemoWalletProvider());

  console.log('Yours.org branch - Available wallets:', availableProviders.map(p => p.name));
  console.log('Real wallets detected:', availableProviders.filter(p => p.name !== 'Demo').map(p => p.name));

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