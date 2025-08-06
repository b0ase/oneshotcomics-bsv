# Wallet Implementation Branches

This project now has separate branches for testing different wallet implementations independently.

## 🌿 Branch Structure

### `main` Branch
- **Purpose**: Contains all wallet implementations
- **Wallets**: Yours.org, HandCash, MoneyButton, Demo
- **Use Case**: Production deployment with all options

### `yours-wallet` Branch
- **Purpose**: Focus on Yours.org browser extension integration
- **Wallets**: Yours.org, Demo
- **Use Case**: Test and develop Yours.org wallet functionality
- **Features**: Browser extension detection, direct connection

### `handcash-wallet` Branch
- **Purpose**: Focus on HandCash OAuth integration
- **Wallets**: HandCash, Demo
- **Use Case**: Test and develop HandCash OAuth flow
- **Features**: OAuth popup, token exchange, profile fetching

## 🚀 Quick Start

### Using the Switch Script
```bash
# Switch to Yours.org branch
./switch-wallet.sh yours

# Switch to HandCash branch
./switch-wallet.sh handcash

# Switch to main branch
./switch-wallet.sh main
```

### Manual Git Commands
```bash
# Switch to Yours.org branch
git checkout yours-wallet

# Switch to HandCash branch
git checkout handcash-wallet

# Switch to main branch
git checkout main
```

## 🧪 Testing Each Implementation

### Yours.org Branch Testing
1. Switch to branch: `./switch-wallet.sh yours`
2. Install Yours.org wallet extension
3. Start dev server: `npm run dev`
4. Check console for detection logs
5. Test wallet connection in dropdown

### HandCash Branch Testing
1. Switch to branch: `./switch-wallet.sh handcash`
2. Start dev server: `npm run dev`
3. Test OAuth flow in dropdown
4. Check popup authorization
5. Verify token exchange

### Main Branch Testing
1. Switch to branch: `./switch-wallet.sh main`
2. Start dev server: `npm run dev`
3. Test all wallet options
4. Compare functionality between implementations

## 🔧 Development Workflow

### For Yours.org Development
```bash
git checkout yours-wallet
# Make changes to Yours.org implementation
git add .
git commit -m "Improve Yours.org wallet detection"
# Test changes
npm run dev
```

### For HandCash Development
```bash
git checkout handcash-wallet
# Make changes to HandCash implementation
git add .
git commit -m "Fix HandCash OAuth flow"
# Test changes
npm run dev
```

### Merging Changes
```bash
# After testing on specific branch, merge to main
git checkout main
git merge yours-wallet
git merge handcash-wallet
```

## 📝 Console Logs

Each branch has specific console logging:

### Yours.org Branch
```
Yours.org branch - Available wallets: ["Yours.org", "Demo"]
Real wallets detected: ["Yours.org"]
Yours.org wallet detection: { yoursWallet: true, yoursIsYours: true, hasConnect: true, finalResult: true }
```

### HandCash Branch
```
HandCash branch - Available wallets: ["HandCash", "Demo"]
Real wallets detected: ["HandCash"]
Attempting to connect to HandCash wallet via OAuth...
```

## 🎯 Benefits

1. **Isolated Testing**: Test each wallet implementation independently
2. **Focused Development**: Work on one wallet at a time
3. **Clean Commits**: Separate commit history for each implementation
4. **Easy Comparison**: Compare functionality between branches
5. **Safe Merging**: Merge tested implementations back to main

## 🔄 Branch Management

### Creating New Branches
```bash
# From main branch
git checkout main
git checkout -b new-wallet-branch
```

### Updating Branches
```bash
# Update main with latest changes
git checkout main
git pull origin main

# Update feature branches
git checkout yours-wallet
git rebase main

git checkout handcash-wallet
git rebase main
```

### Cleanup
```bash
# Delete local branches (after merging)
git branch -d yours-wallet
git branch -d handcash-wallet
``` 