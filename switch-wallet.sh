#!/bin/bash

# Wallet Branch Switcher Script
# Usage: ./switch-wallet.sh [yours|handcash|main]

echo "🔄 Wallet Branch Switcher"
echo "=========================="

case $1 in
  "yours"|"yours-wallet")
    echo "Switching to Yours.org wallet branch..."
    git checkout yours-wallet
    echo "✅ Switched to yours-wallet branch"
    echo "🔗 This branch focuses on Yours.org browser extension integration"
    echo "🎭 Demo wallet is also available for testing"
    ;;
  "handcash"|"handcash-wallet")
    echo "Switching to HandCash wallet branch..."
    git checkout handcash-wallet
    echo "✅ Switched to handcash-wallet branch"
    echo "👋 This branch focuses on HandCash OAuth integration"
    echo "🎭 Demo wallet is also available for testing"
    ;;
  "main")
    echo "Switching to main branch..."
    git checkout main
    echo "✅ Switched to main branch"
    echo "🔧 This branch has all wallet implementations"
    ;;
  *)
    echo "❌ Invalid option. Usage:"
    echo "   ./switch-wallet.sh yours     - Switch to Yours.org branch"
    echo "   ./switch-wallet.sh handcash  - Switch to HandCash branch"
    echo "   ./switch-wallet.sh main      - Switch to main branch"
    echo ""
    echo "Current branch: $(git branch --show-current)"
    echo "Available branches:"
    git branch --list
    ;;
esac

echo ""
echo "🚀 To start development server: npm run dev"
echo "🔍 To check current branch: git branch --show-current" 