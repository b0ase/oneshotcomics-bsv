# Wallet Migration: Phantom to Yours.org

This document outlines the migration from Phantom wallet (Solana) to Yours.org wallet (Bitcoin SV) in the One-Shot Comics project.

## Overview

The project has been migrated from using Phantom wallet (Solana blockchain) to Yours.org wallet (Bitcoin SV blockchain). This change aligns the project with Bitcoin SV, which is more suitable for the comic NFT marketplace.

## Changes Made

### 1. Wallet Context (`src/contexts/WalletContext.tsx`)

- **Replaced Phantom wallet types** with Bitcoin SV wallet types
- **Updated interface** to include `publicKey` and additional Bitcoin SV methods
- **Added new methods**:
  - `signMessage(message: string)`: Sign messages with the wallet
  - `sendTransaction(transaction: any)`: Send Bitcoin SV transactions
- **Updated connection logic** to use BSV wallet manager
- **Changed event handling** to use BSV wallet events

### 2. BSV Wallet Utilities (`src/lib/bsv-wallet.ts`)

- **Created comprehensive Bitcoin SV wallet utilities**
- **Implemented YoursWalletProvider** class for Yours.org wallet integration
- **Added BSVWalletManager** for managing wallet connections
- **Included utility functions** for Bitcoin SV operations:
  - `satoshisToBSV()`: Convert satoshis to BSV
  - `bsvToSatoshis()`: Convert BSV to satoshis
  - `isValidAddress()`: Validate Bitcoin SV addresses
  - `createTransaction()`: Create transaction objects

### 3. UI Updates

#### Navigation Component (`src/components/Navigation.tsx`)
- **Updated wallet connection button** to use `connectYoursWallet`
- **Changed wallet icon** from ghost (👻) to link (🔗)
- **Updated button styling** to use orange/red gradient instead of purple/blue

#### Wallet Page (`src/app/wallet/page.tsx`)
- **Updated connection UI** to reference Yours.org wallet
- **Changed balance display** from SOL to BSV
- **Updated mock data** to use BSV values
- **Changed wallet icon** and styling

#### Series Generator Page (`src/app/series-generator/page.tsx`)
- **Updated wallet requirement message** to reference Yours.org
- **Changed connection button** styling and text
- **Updated connected wallet status** display

### 4. Dependencies (`package.json`)

- **Added Bitcoin SV dependencies**:
  - `@bsv/sdk`: Bitcoin SV SDK
  - `@bsv/wallet-toolbox`: Bitcoin SV wallet tools

## Wallet Integration Details

### Yours.org Wallet Provider

The `YoursWalletProvider` class implements the `BSVWalletProvider` interface and provides:

- **Connection management**: Connect/disconnect to Yours.org wallet
- **Balance queries**: Get wallet balance
- **Message signing**: Sign messages for authentication
- **Transaction handling**: Send Bitcoin SV transactions
- **Event handling**: Listen for wallet events

### Wallet Manager

The `BSVWalletManager` class provides a high-level interface for:

- **Wallet lifecycle management**: Connect, disconnect, status checking
- **Transaction operations**: Sign and send transactions
- **Event management**: Handle wallet events
- **Error handling**: Comprehensive error management

## Usage

### Connecting to Wallet

```typescript
import { useWallet } from '@/contexts/WalletContext';

const { connectYoursWallet, isWalletConnected, walletAddress } = useWallet();

// Connect to Yours.org wallet
await connectYoursWallet();
```

### Signing Messages

```typescript
import { useWallet } from '@/contexts/WalletContext';

const { signMessage } = useWallet();

// Sign a message
const signature = await signMessage("Hello, Bitcoin SV!");
```

### Sending Transactions

```typescript
import { useWallet } from '@/contexts/WalletContext';
import { BSVUtils } from '@/lib/bsv-wallet';

const { sendTransaction } = useWallet();

// Create and send a transaction
const transaction = BSVUtils.createTransaction(
  "recipient_address",
  "0.001",
  "0.0001"
);
const txid = await sendTransaction(transaction);
```

## Configuration

### Environment Variables

The wallet integration can be configured through environment variables:

```env
# Bitcoin SV Network (mainnet/testnet)
BSV_NETWORK=mainnet

# Yours.org Wallet Configuration
YOURS_WALLET_ENABLED=true
```

### Network Configuration

The wallet defaults to mainnet but can be configured for testnet:

```typescript
import { bsvWalletManager } from '@/lib/bsv-wallet';

// Configure for testnet
bsvWalletManager.setNetwork('testnet');
```

## Testing

### Development Testing

1. **Install Yours.org wallet extension** in your browser
2. **Run the development server**: `npm run dev`
3. **Navigate to any page** with wallet connection
4. **Click "Connect Wallet"** to test the integration

### Mock Data

The wallet page includes mock data for testing:
- **Mock NFTs** with BSV values
- **Mock transactions** with BSV amounts
- **Mock wallet balance** in BSV

## Future Enhancements

### Planned Features

1. **Real balance integration**: Connect to Bitcoin SV nodes for real balance queries
2. **Transaction history**: Fetch real transaction history from blockchain
3. **NFT metadata**: Store NFT metadata on Bitcoin SV blockchain
4. **Multi-wallet support**: Support for additional Bitcoin SV wallets

### API Integration

1. **Bitcoin SV RPC**: Direct integration with Bitcoin SV nodes
2. **Transaction broadcasting**: Real-time transaction broadcasting
3. **Block confirmation**: Monitor transaction confirmations
4. **Fee estimation**: Dynamic fee calculation

## Troubleshooting

### Common Issues

1. **Wallet not detected**: Ensure Yours.org wallet extension is installed
2. **Connection failed**: Check if wallet is unlocked and accessible
3. **Transaction errors**: Verify sufficient balance and correct address format
4. **Network issues**: Ensure proper network configuration

### Debug Information

Enable debug logging by setting:

```typescript
localStorage.setItem('debug', 'bsv-wallet');
```

## Migration Notes

### Breaking Changes

- **Wallet connection method** changed from `connectPhantomWallet` to `connectYoursWallet`
- **Balance display** changed from SOL to BSV
- **Transaction values** updated to use BSV amounts
- **Network** changed from Solana to Bitcoin SV

### Backward Compatibility

- **Local storage keys** remain the same for wallet address
- **UI components** maintain similar structure
- **Error handling** follows similar patterns

## Support

For issues related to the wallet integration:

1. **Check the console** for error messages
2. **Verify wallet extension** is properly installed
3. **Test with mock data** to isolate issues
4. **Review network configuration** for testnet/mainnet settings 