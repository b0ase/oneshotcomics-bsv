// Bitcoin SV Wallet Providers
// This file contains implementations for different Bitcoin SV wallet providers

import { Address, PublicKey } from '@scrypt-inc/bsv';

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
    
    // Check for Yours.org wallet using multiple detection methods
    const yoursWallet = (window as any).yours;
    const pandaWallet = (window as any).panda;
    
    // Yours.org wallet detection - check for the wallet object
    const hasYoursWallet = !!(
      yoursWallet && (
        yoursWallet.isYours || 
        yoursWallet.connect || 
        yoursWallet.getPublicKey ||
        yoursWallet.signMessage ||
        yoursWallet.sendTransaction ||
        yoursWallet.request ||
        typeof yoursWallet === 'object'
      )
    );
    
    // Panda wallet detection (alternative name)
    const hasPandaWallet = !!(
      pandaWallet && (
        pandaWallet.isPanda ||
        pandaWallet.connect ||
        pandaWallet.getPublicKey ||
        pandaWallet.signMessage ||
        pandaWallet.sendTransaction ||
        pandaWallet.request ||
        typeof pandaWallet === 'object'
      )
    );
    
    // Debug logging
    console.log('Yours.org wallet detection:', {
      yoursWallet: !!yoursWallet,
      pandaWallet: !!pandaWallet,
      yoursIsYours: !!(yoursWallet && yoursWallet.isYours),
      pandaIsPanda: !!(pandaWallet && pandaWallet.isPanda),
      hasConnect: !!(yoursWallet && yoursWallet.connect) || !!(pandaWallet && pandaWallet.connect),
      hasGetPublicKey: !!(yoursWallet && yoursWallet.getPublicKey) || !!(pandaWallet && pandaWallet.getPublicKey),
      hasSignMessage: !!(yoursWallet && yoursWallet.signMessage) || !!(pandaWallet && pandaWallet.signMessage),
      hasSendTransaction: !!(yoursWallet && yoursWallet.sendTransaction) || !!(pandaWallet && pandaWallet.sendTransaction),
      hasRequest: !!(yoursWallet && yoursWallet.request) || !!(pandaWallet && pandaWallet.request),
      finalResult: hasYoursWallet || hasPandaWallet
    });
    
    return hasYoursWallet || hasPandaWallet;
  }

  async connect(): Promise<WalletInfo> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available. Please install the Yours.org wallet extension from https://yours.org/wallet');
    }

    try {
      // Get fresh reference to wallet objects
      const yoursWallet = (window as any).yours;
      const pandaWallet = (window as any).panda;
      
      // Try Yours.org wallet first
      if (yoursWallet) {
        console.log('Attempting to connect to Yours.org wallet...', yoursWallet);
        console.log('Available methods on Yours.org wallet:', Object.getOwnPropertyNames(yoursWallet));
        console.log('Yours.org wallet prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(yoursWallet) || {}));
        
        // Log all available methods to help debug
        const allMethods = Object.getOwnPropertyNames(yoursWallet);
        console.log('All available methods:', allMethods);
        
        // Look for methods that might contain 'address' in the name
        const addressMethods = allMethods.filter(method => 
          method.toLowerCase().includes('address') || 
          method.toLowerCase().includes('addr') ||
          method.toLowerCase().includes('receive')
        );
        console.log('Methods that might be related to addresses:', addressMethods);
        
        // Store the wallet reference for future operations
        this.wallet = yoursWallet;
        
        // Try connect method
        if (yoursWallet.connect) {
          console.log('Using yoursWallet.connect() method...');
          const response = await yoursWallet.connect();
          console.log('Yours.org wallet connection response:', response);
          console.log('Response type:', typeof response);
          console.log('Response keys:', response ? Object.keys(response) : 'null/undefined');
          console.log('Response.address:', response?.address);
          console.log('Response.publicKey:', response?.publicKey);
          
          // Try to get the actual receiving address from the wallet
          let actualAddress = response?.address;
          
          // Try multiple methods to get the real address
          const addressMethods = [
            { name: 'getAddresses', method: yoursWallet.getAddresses },
            { name: 'getAddress', method: yoursWallet.getAddress },
            { name: 'getCurrentAddress', method: yoursWallet.getCurrentAddress },
            { name: 'getReceivingAddress', method: yoursWallet.getReceivingAddress },
            { name: 'getDefaultAddress', method: yoursWallet.getDefaultAddress },
            { name: 'getNewAddress', method: yoursWallet.getNewAddress },
            { name: 'getLegacyAddress', method: yoursWallet.getLegacyAddress },
            { name: 'getP2PKHAddress', method: yoursWallet.getP2PKHAddress },
            { name: 'selectedAddress', property: yoursWallet.selectedAddress },
            { name: 'currentAddress', property: yoursWallet.currentAddress },
            { name: 'defaultAddress', property: yoursWallet.defaultAddress },
            { name: 'receivingAddress', property: yoursWallet.receivingAddress }
          ];
          
          for (const addressMethod of addressMethods) {
            if (!actualAddress) {
              try {
                if (addressMethod.method) {
                  console.log(`Trying ${addressMethod.name}() method...`);
                  
                  // Try calling the method with different parameters
                  let addressResponse;
                  try {
                    addressResponse = await addressMethod.method();
                  } catch (e) {
                    // If it fails, try with common parameters
                    try {
                      addressResponse = await addressMethod.method('receive');
                    } catch (e2) {
                      try {
                        addressResponse = await addressMethod.method('legacy');
                      } catch (e3) {
                        try {
                          addressResponse = await addressMethod.method('p2pkh');
                        } catch (e4) {
                          console.log(`${addressMethod.name}() failed with all parameter attempts`);
                          continue;
                        }
                      }
                    }
                  }
                  
                  console.log(`${addressMethod.name}() response:`, addressResponse);
                  
                  // Handle different response formats
                  if (typeof addressResponse === 'string' && 
                      addressResponse.length >= 26 && addressResponse.length <= 35 &&
                      (addressResponse.startsWith('1') || addressResponse.startsWith('3'))) {
                    actualAddress = addressResponse;
                    console.log(`Found address via ${addressMethod.name}():`, actualAddress);
                    break;
                  } else if (Array.isArray(addressResponse) && addressResponse.length > 0) {
                    // Handle array of addresses (like getAddresses might return)
                    console.log(`${addressMethod.name}() returned array:`, addressResponse);
                    for (const addr of addressResponse) {
                      if (typeof addr === 'string' && 
                          addr.length >= 26 && addr.length <= 35 &&
                          (addr.startsWith('1') || addr.startsWith('3'))) {
                        actualAddress = addr;
                        console.log(`Found address in array via ${addressMethod.name}():`, actualAddress);
                        break;
                      } else if (addr && typeof addr === 'object' && addr.address &&
                               addr.address.length >= 26 && addr.address.length <= 35 &&
                               (addr.address.startsWith('1') || addr.address.startsWith('3'))) {
                        actualAddress = addr.address;
                        console.log(`Found address object in array via ${addressMethod.name}():`, actualAddress);
                        break;
                      }
                    }
                    if (actualAddress) break;
                  } else if (addressResponse && typeof addressResponse === 'object' && !Array.isArray(addressResponse)) {
                    // Handle object with address properties (like getAddresses returns)
                    console.log(`${addressMethod.name}() returned object:`, addressResponse);
                    
                    // Check for common address property names - prioritize bsvAddress
                    const addressProps = ['bsvAddress', 'address', 'receivingAddress', 'defaultAddress', 'currentAddress', 'identityAddress'];
                    for (const prop of addressProps) {
                      console.log(`Checking property ${prop}:`, addressResponse[prop]);
                      if (addressResponse[prop] && typeof addressResponse[prop] === 'string' &&
                          addressResponse[prop].length >= 26 && addressResponse[prop].length <= 35 &&
                          (addressResponse[prop].startsWith('1') || addressResponse[prop].startsWith('3'))) {
                        actualAddress = addressResponse[prop];
                        console.log(`Found address via ${addressMethod.name}() property ${prop}:`, actualAddress);
                        break;
                      }
                    }
                    if (actualAddress) break;
                  } else if (addressResponse && addressResponse.address &&
                           addressResponse.address.length >= 26 && addressResponse.address.length <= 35 &&
                           (addressResponse.address.startsWith('1') || addressResponse.address.startsWith('3'))) {
                    actualAddress = addressResponse.address;
                    console.log(`Found address via ${addressMethod.name}():`, actualAddress);
                    break;
                  }
                } else if (addressMethod.property) {
                  console.log(`Checking ${addressMethod.name} property...`);
                  if (typeof addressMethod.property === 'string' && 
                      addressMethod.property.length >= 26 && addressMethod.property.length <= 35 &&
                      (addressMethod.property.startsWith('1') || addressMethod.property.startsWith('3'))) {
                    actualAddress = addressMethod.property;
                    console.log(`Found address via ${addressMethod.name} property:`, actualAddress);
                    break;
                  }
                }
              } catch (error) {
                console.log(`${addressMethod.name} failed:`, error);
              }
            }
          }
          
          // Try request-based methods if we still don't have an address
          if (!actualAddress && yoursWallet.request) {
            console.log('Trying request-based methods to get address...');
            const requestMethods = [
              'getAddresses',
              'getAddress',
              'getCurrentAddress', 
              'getReceivingAddress',
              'getDefaultAddress',
              'getNewAddress',
              'getLegacyAddress'
            ];
            
            for (const method of requestMethods) {
              if (!actualAddress) {
                try {
                  console.log(`Trying request method: ${method}`);
                  const requestResponse = await yoursWallet.request({ method });
                  console.log(`Request ${method} response:`, requestResponse);
                  
                  if (typeof requestResponse === 'string' && 
                      requestResponse.length >= 26 && requestResponse.length <= 35 &&
                      (requestResponse.startsWith('1') || requestResponse.startsWith('3'))) {
                    actualAddress = requestResponse;
                    console.log(`Found address via request ${method}:`, actualAddress);
                    break;
                  } else if (requestResponse && requestResponse.address &&
                           requestResponse.address.length >= 26 && requestResponse.address.length <= 35 &&
                           (requestResponse.address.startsWith('1') || requestResponse.address.startsWith('3'))) {
                    actualAddress = requestResponse.address;
                    console.log(`Found address via request ${method}:`, actualAddress);
                    break;
                  }
                } catch (error) {
                  console.log(`Request method ${method} failed:`, error);
                }
              }
            }
          }
          
          // Handle different response formats
          let address = actualAddress || response?.address;
          let publicKey = response?.publicKey;
          
          console.log('Final address determination:', {
            actualAddress,
            responseAddress: response?.address,
            finalAddress: address,
            publicKey
          });
          
          // If we found a real address from getAddresses(), use it and don't override
          if (actualAddress && actualAddress !== 'unknown') {
            console.log('Using real address from getAddresses():', actualAddress);
            address = actualAddress;
            // Keep the public key from the connect response for reference
            publicKey = response?.publicKey || response;
          } else {
            // Only fall back to derived logic if we didn't find a real address
            console.log('No real address found, falling back to derived logic');
            
            // If response is a string, it might be the address directly
            if (typeof response === 'string') {
              address = response;
              publicKey = response;
            }
            
            // If response is an array, first element might be the address
            if (Array.isArray(response) && response.length > 0) {
              address = response[0];
              publicKey = response[0];
            }
          }
          
          console.log('Final address:', address);
          console.log('Final publicKey:', publicKey);
          
          // If we got a public key, we need to derive the address
          if (publicKey && publicKey.length === 66 && (publicKey.startsWith('02') || publicKey.startsWith('03'))) {
            console.log('Detected public key, deriving address...');
            console.log('Public key format validation passed:', {
              length: publicKey.length,
              startsWith02: publicKey.startsWith('02'),
              startsWith03: publicKey.startsWith('03'),
              isValidHex: /^[0-9a-fA-F]+$/.test(publicKey)
            });
            
            // Check if we already have a real address from the wallet
            // A real BSV address should be 26-35 characters and start with '1' or '3'
            if (address && address !== 'unknown' && 
                address.length >= 26 && address.length <= 35 && 
                (address.startsWith('1') || address.startsWith('3'))) {
              console.log('Using real address from wallet:', address);
              return {
                address: address,
                publicKey: publicKey,
                network: 'mainnet'
              };
            }
            
            const derivedAddress = this.deriveAddressFromPublicKey(publicKey);
            console.log('Derived address from public key:', derivedAddress);
            console.log('WARNING: Using derived address - this may not match your wallet!');
            return {
              address: derivedAddress,
              publicKey: publicKey,
              network: 'mainnet'
            };
          }
          
          return {
            address: address || 'unknown',
            publicKey: publicKey || 'unknown',
            network: 'mainnet'
          };
        }
        
        // Try request method (web3 standard)
        if (yoursWallet.request) {
          console.log('Using yoursWallet.request() method...');
          try {
            const accounts = await yoursWallet.request({ method: 'eth_requestAccounts' });
            console.log('eth_requestAccounts response:', accounts);
            console.log('Accounts type:', typeof accounts);
            console.log('Accounts is array:', Array.isArray(accounts));
            
            const publicKey = await yoursWallet.request({ method: 'eth_getPublicKey' });
            console.log('eth_getPublicKey response:', publicKey);
            
            const address = Array.isArray(accounts) ? accounts[0] : accounts;
            console.log('Final address from request:', address);
            console.log('Final publicKey from request:', publicKey);
            
            return {
              address: address || 'unknown',
              publicKey: publicKey || 'unknown',
              network: 'mainnet'
            };
          } catch (error) {
            console.error('Request method failed:', error);
            throw error;
          }
        }
        
        // Fallback: try to get public key directly
        if (yoursWallet.getPublicKey) {
          console.log('Using yoursWallet.getPublicKey() method...');
          const response = await yoursWallet.getPublicKey();
          console.log('Yours.org wallet getPublicKey response:', response);
          console.log('Response type:', typeof response);
          console.log('Response keys:', response ? Object.keys(response) : 'null/undefined');
          
          let address = response?.address || response?.publicKey;
          let publicKey = response?.publicKey;
          
          // If response is a string, it might be the public key directly
          if (typeof response === 'string') {
            address = response;
            publicKey = response;
          }
          
          console.log('Final address from getPublicKey:', address);
          console.log('Final publicKey from getPublicKey:', publicKey);
          
          // If we got a public key, we need to derive the address
          if (publicKey && publicKey.length === 66 && (publicKey.startsWith('02') || publicKey.startsWith('03'))) {
            console.log('Detected public key from getPublicKey, deriving address...');
            console.log('Public key format validation passed:', {
              length: publicKey.length,
              startsWith02: publicKey.startsWith('02'),
              startsWith03: publicKey.startsWith('03'),
              isValidHex: /^[0-9a-fA-F]+$/.test(publicKey)
            });
            const derivedAddress = this.deriveAddressFromPublicKey(publicKey);
            console.log('Derived address from getPublicKey:', derivedAddress);
            return {
              address: derivedAddress,
              publicKey: publicKey,
              network: 'mainnet'
          };
          }
          
          return {
            address: address || 'unknown',
            publicKey: publicKey || 'unknown',
            network: 'mainnet'
          };
        }
      }
      
      // Try Panda wallet as fallback
      if (pandaWallet) {
        console.log('Attempting to connect to Panda wallet...', pandaWallet);
        
        // Store the wallet reference for future operations
        this.wallet = pandaWallet;
        
        if (pandaWallet.connect) {
          console.log('Using pandaWallet.connect() method...');
          const response = await pandaWallet.connect();
          console.log('Panda wallet connection response:', response);
          
          return {
            address: response.address,
            publicKey: response.publicKey,
            network: 'mainnet'
          };
        }
        
        if (pandaWallet.request) {
          console.log('Using pandaWallet.request() method...');
          const accounts = await pandaWallet.request({ method: 'eth_requestAccounts' });
          const publicKey = await pandaWallet.request({ method: 'eth_getPublicKey' });
          
          return {
            address: accounts[0],
            publicKey: publicKey,
            network: 'mainnet'
          };
        }
      }
      
      throw new Error('Yours.org/Panda wallet is not properly initialized - no connect, request, or getPublicKey method found');
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
      if (this.wallet && this.wallet.signMessage) {
        const response = await this.wallet.signMessage(message);
        return response.signature || response;
      }
      
      // Try request method for signing
      if (this.wallet && this.wallet.request) {
        try {
          const signature = await this.wallet.request({ 
            method: 'personal_sign', 
            params: [message, this.wallet.selectedAddress || ''] 
          });
          return signature;
        } catch (e) {
          console.log('personal_sign failed, trying alternative methods');
        }
      }
      
      throw new Error('signMessage method not available in Yours.org wallet');
    } catch (error) {
      console.error('Error signing message:', error);
      throw new Error(`Failed to sign message: ${error}`);
    }
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      if (this.wallet && this.wallet.sendTransaction) {
        const response = await this.wallet.sendTransaction(transaction);
        return response.txid || response;
      }
      
      // Try request method for sending transaction
      if (this.wallet && this.wallet.request) {
        try {
          const txParams = {
            to: transaction.to,
            value: transaction.amount,
            data: transaction.data || '0x'
          };
          
          const txid = await this.wallet.request({ 
            method: 'eth_sendTransaction', 
            params: [txParams] 
          });
          return txid;
        } catch (e) {
          console.log('eth_sendTransaction failed, trying alternative methods');
        }
      }
      
      throw new Error('sendTransaction method not available in Yours.org wallet');
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw new Error(`Failed to send transaction: ${error}`);
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
      
      // Try request method for balance
      if (this.wallet && this.wallet.request) {
        try {
          const balance = await this.wallet.request({ method: 'eth_getBalance' });
          // Convert from wei to BSV (assuming 8 decimal places like Bitcoin)
          const balanceInBSV = (parseInt(balance, 16) / 100000000).toFixed(8);
          return balanceInBSV;
        } catch (e) {
          console.log('eth_getBalance failed, trying alternative methods');
        }
      }
      
      // If no balance method available, return 0.00
      console.warn('No getBalance method available in wallet, returning 0.00');
      return "0.00";
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  async getAddress(): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Yours.org wallet is not available');
    }

    try {
      if (this.wallet && this.wallet.getAddress) {
        console.log('Calling wallet.getAddress()...');
        const response = await this.wallet.getAddress();
        console.log('getAddress() response:', response);
        console.log('getAddress() response type:', typeof response);
        console.log('getAddress() response keys:', response ? Object.keys(response) : 'null/undefined');
        
        // Check if response is a string (direct address)
        if (typeof response === 'string') {
          console.log('getAddress() returned string:', response);
          return response;
        }
        
        // Check if response has address property
        if (response && response.address) {
          console.log('getAddress() returned address property:', response.address);
          return response.address;
        }
        
        console.log('getAddress() response does not contain address:', response);
        throw new Error('getAddress() did not return a valid address');
      } else if (this.wallet && this.wallet.getPublicKey) {
        // Fallback to getPublicKey if getAddress is not available
        console.log('getAddress() not available, falling back to getPublicKey()...');
        const response = await this.wallet.getPublicKey();
        console.log('getPublicKey() fallback response:', response);
        
        // Don't return public key as address - this is wrong
        if (response && response.address) {
          return response.address;
        }
        
        throw new Error('getPublicKey() fallback did not return a valid address');
      }
      throw new Error('getAddress method not available in Yours.org wallet');
    } catch (error) {
      console.error('Error in getAddress():', error);
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

  // Derive BSV address from public key using proper BSV library
  private deriveAddressFromPublicKey(publicKeyHex: string): string {
    try {
      console.log('Deriving BSV address from public key:', publicKeyHex);
      
      // Create PublicKey object from hex string
      const publicKey = PublicKey.fromHex(publicKeyHex);
      console.log('Created PublicKey object:', publicKey);
      
      // Derive P2PKH address from public key
      const address = Address.fromPublicKey(publicKey);
      console.log('Derived BSV address:', address.toString());
      
      return address.toString();
    } catch (error) {
      console.error('Error deriving address from public key:', error);
      console.error('Public key that failed:', publicKeyHex);
      
             // Fallback: try to create address directly from hex
       try {
         console.log('Attempting fallback address creation...');
         const fallbackPublicKey = PublicKey.fromHex(publicKeyHex);
         const address = Address.fromPublicKey(fallbackPublicKey);
         console.log('Fallback address created:', address.toString());
         return address.toString();
       } catch (fallbackError) {
         console.error('Fallback address creation also failed:', fallbackError);
         return 'unknown';
       }
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