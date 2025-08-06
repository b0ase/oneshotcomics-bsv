'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { walletAddress, isWalletConnected, isConnecting, connectYoursWallet, disconnectWallet } = useWallet();

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null); // Close dropdowns when mobile menu toggles
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleGoButtonClick = () => {
    window.location.href = '/series-selector';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          {/* Small Go Button */}
          <button 
            onClick={handleGoButtonClick}
            className="nav-go-button"
            title="Go to Series"
          >
            GO
          </button>

          <Link href="/" className="navbar-brand">
            ONE-SHOT COMICS <span className="bsv-indicator">BSV</span>
          </Link>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link href="/about" className="nav-link" onClick={closeMobileMenu}>
              About
            </Link>

            {/* Series Dropdown */}
            <div className={`dropdown ${activeDropdown === 'series' ? 'active' : ''}`}>
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown('series');
                }}
              >
                Series ▼
              </button>
              {activeDropdown === 'series' && (
                <div className="dropdown-menu">
                  <Link href="/series-selector" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Series Selector
                  </Link>
                  <Link href="/series-generator" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Series Generator
                  </Link>
                  <Link href="/series/config" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Series Config
                  </Link>
                  <Link href="/series/config/variables" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Series Variables
                  </Link>
                </div>
              )}
            </div>

            {/* Characters Dropdown */}
            <div className={`dropdown ${activeDropdown === 'characters' ? 'active' : ''}`}>
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown('characters');
                }}
              >
                Characters ▼
              </button>
              {activeDropdown === 'characters' && (
                <div className="dropdown-menu">
                  <Link href="/characters" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Character Library
                  </Link>
                  <Link href="/character-generator" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Character Generator
                  </Link>
                  <Link href="/characters/config" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Character Config
                  </Link>
                  <Link href="/characters/config/variables" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Character Variables
                  </Link>
                </div>
              )}
            </div>

            {/* Stories Dropdown */}
            <div className={`dropdown ${activeDropdown === 'stories' ? 'active' : ''}`}>
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown('stories');
                }}
              >
                Stories ▼
              </button>
              {activeDropdown === 'stories' && (
                <div className="dropdown-menu">
                  <Link href="/story-generator" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Story Generator
                  </Link>
                  <Link href="/stories/config" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Story Config
                  </Link>
                  <Link href="/stories/config/variables" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Story Variables
                  </Link>
                </div>
              )}
            </div>

            {/* Scripts Dropdown */}
            <div className={`dropdown ${activeDropdown === 'scripts' ? 'active' : ''}`}>
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown('scripts');
                }}
              >
                Scripts ▼
              </button>
              {activeDropdown === 'scripts' && (
                <div className="dropdown-menu">
                  <Link href="/script-generator" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Script Generator
                  </Link>
                  <Link href="/storyboard" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Storyboard
                  </Link>
                </div>
              )}
            </div>

            {/* Artwork Dropdown */}
            <div className={`dropdown ${activeDropdown === 'artwork' ? 'active' : ''}`}>
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown('artwork');
                }}
              >
                Artwork ▼
              </button>
              {activeDropdown === 'artwork' && (
                <div className="dropdown-menu">
                  <Link href="/images" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Images
                  </Link>
                  <Link href="/frame-generator" className="dropdown-item" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                    Frames
                  </Link>
                </div>
              )}
            </div>

            <Link href="/comics" className="nav-link" onClick={closeMobileMenu}>
              Comics
            </Link>
            <Link href="/mint" className="nav-link" onClick={closeMobileMenu}>
              Mint
            </Link>
            <Link href="/market" className="nav-link" onClick={closeMobileMenu}>
              Market
            </Link>
            <Link href="/token" className="nav-link" onClick={closeMobileMenu}>
              $1SHOT Token
            </Link>
            <Link href="/wallet" className="nav-link" onClick={closeMobileMenu}>
              Wallet
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <div className="menu-icon" onClick={toggleMobileMenu}>
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>

          {/* Wallet Section */}
          <div className="wallet-section">
            {!isWalletConnected ? (
              <button 
                className="connect-wallet-nav-btn"
                onClick={connectYoursWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔗</span>
                    <span>Connect Yours</span>
                  </div>
                )}
              </button>
            ) : (
              <div className="wallet-connected">
                <div className="wallet-info">
                  <span className="text-sm text-green-300">Connected</span>
                  <span className="text-xs text-gray-400">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Mobile Wallet Section */}
          <div className="mobile-wallet-section">
            {!isWalletConnected ? (
              <button 
                className="connect-wallet-nav-btn mobile"
                onClick={connectYoursWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔗</span>
                    <span>Connect Yours</span>
                  </div>
                )}
              </button>
            ) : (
              <div className="wallet-connected mobile">
                <div className="wallet-info">
                  <span className="text-sm text-green-300">Connected</span>
                  <span className="text-xs text-gray-400">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 