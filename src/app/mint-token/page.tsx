'use client';

import React from 'react';
import Link from 'next/link';

export default function MintTokenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Logo Section */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
            textShadow: '-4px 4px 0px #FFD700, -8px 8px 0px #1D3557, -12px 12px 0px #000',
            letterSpacing: '0.04em',
            lineHeight: '1'
          }}>
            ONE-SHOT COMICS
          </h1>
          <div className="text-2xl md:text-3xl text-yellow-400 font-bold" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
            textShadow: '2px 2px 0 #22C55E, 4px 4px 0 #1D3557'
          }}>
            Bitcoin SV Edition
          </div>
        </div>

        {/* Mint Button Section */}
        <div className="mb-12">
          <button 
            className="go-button"
            onClick={() => alert('Mint functionality coming soon!')}
          >
            <div className="go-text">$1SHOT</div>
          </button>
        </div>

        {/* Description */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xl text-gray-300 mb-4" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
            textShadow: '1px 1px 0 #1D3557'
          }}>
            Mint your exclusive One-Shot Comics NFT
          </p>
          <p className="text-lg text-gray-400" style={{
            fontFamily: 'Bangers, Impact, Arial Black, sans-serif'
          }}>
            Powered by Bitcoin SV blockchain
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
            style={{
              fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
              textShadow: '1px 1px 0 #1D3557'
            }}
          >
            Home
          </Link>
          <Link 
            href="/series"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
            style={{
              fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
              textShadow: '1px 1px 0 #1D3557'
            }}
          >
            Browse Series
          </Link>
          <Link 
            href="/wallet"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
            style={{
              fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
              textShadow: '1px 1px 0 #1D3557'
            }}
          >
            Connect Wallet
          </Link>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 