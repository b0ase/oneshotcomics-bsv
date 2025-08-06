'use client';

import { BookOpen, Users, FileText, Image, Palette, ShoppingCart, Zap, ArrowRight, CheckCircle, Layers } from 'lucide-react';

export default function AboutPage() {
  const workflowSteps = [
    {
      icon: <Layers size={48} />,
      title: "1. CREATE A NEW SERIES",
      description: "AI creates your unique comic universe with random genre, theme, and setting",
      features: [
        "Random series generation",
        "AI-powered universe creation",
        "Dynamic genre themes",
        "Unique world-building"
      ]
    },
    {
      icon: <Users size={48} />,
      title: "2. CREATE Characters",
      description: "AI creates compelling heroes, villains, and supporting characters",
      features: [
        "Random character generation",
        "AI-powered backstories",
        "Dynamic personality traits",
        "Smart relationship mapping"
      ]
    },
    {
      icon: <FileText size={48} />,
      title: "3. GENERATE STORIES for your CHARACTERS",
      description: "AI crafts engaging storylines, dialogue, and plot",
      features: [
        "Random story generation",
        "AI-powered dialogue",
        "Dynamic plot development",
        "Smart story structure"
      ]
    },
    {
      icon: <Image size={48} />,
      title: "4. Generate Images for your comic",
      description: "AI transforms your story into stunning visual panels",
      features: [
        "Random panel generation",
        "AI-powered consistency",
        "Dynamic character continuity",
        "Smart background variety"
      ]
    },
    {
      icon: <ShoppingCart size={48} />,
      title: "5. MINT & TRADE your Comic",
      description: "Convert your comic to NFT and trade in the marketplace",
      features: [
        "One-click NFT minting",
        "Smart contract deployment",
        "Comic NFT trading",
        "$1SHOT token exchange"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="bg-black/80 border-2 border-orange-400 rounded-2xl p-8 md:p-12">
              <h1 className="font-bangers text-6xl md:text-7xl font-bold mb-6 text-red-500" style={{
                textShadow: '-2px 2px 0px #FCA311, -4px 4px 0px #1D3557, -6px 6px 0px #000',
                letterSpacing: '0.04em',
                lineHeight: '1'
              }}>
                Welcome to ONE-SHOT COMICS
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
                The revolutionary platform for creating, trading, and earning from AI-generated comics
              </p>
            </div>
          </div>

          {/* Content Card */}
          <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Comic Creation</h3>
                <p className="text-gray-300 mb-4">
                  Create complete comics in minutes using our advanced AI system. From series generation to final artwork, 
                  every step is powered by cutting-edge artificial intelligence that understands comic storytelling.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300">Random AI generation for unique content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300">Template-based series creation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300">Atomic variable system for consistency</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300">Instant NFT minting and marketplace listing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300">Automatic royalty distribution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300">$1SHOT token rewards system</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {/* Getting Started Section */}
            <div className="getting-started-section">
              <h2 className="font-bangers text-4xl md:text-5xl font-bold text-center mb-8 text-orange-400" style={{
                textShadow: '-2px 2px 0px #000'
              }}>
                Getting Started
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="start-step bg-black/80 border-2 border-orange-400 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-400/30">
                  <div className="step-number w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bangers text-2xl font-bold text-black mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-bangers text-xl font-bold text-orange-400 mb-3" style={{
                    textShadow: '-1px 1px 0px #000'
                  }}>
                    Connect Your Wallet
                  </h3>
                  <p className="text-white leading-relaxed">
                    Click "Connect Wallet" in the top right to link your cryptocurrency wallet
                  </p>
                </div>
                <div className="start-step bg-black/80 border-2 border-orange-400 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-400/30">
                  <div className="step-number w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bangers text-2xl font-bold text-black mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-bangers text-xl font-bold text-orange-400 mb-3" style={{
                    textShadow: '-1px 1px 0px #000'
                  }}>
                    Start Creating
                  </h3>
                  <p className="text-white leading-relaxed">
                    Begin with the Script Generator or Character Generator to create your first comic
                  </p>
                </div>
                <div className="start-step bg-black/80 border-2 border-orange-400 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-400/30">
                  <div className="step-number w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bangers text-2xl font-bold text-black mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-bangers text-xl font-bold text-orange-400 mb-3" style={{
                    textShadow: '-1px 1px 0px #000'
                  }}>
                    Generate & Assemble
                  </h3>
                  <p className="text-white leading-relaxed">
                    Use the Images and Frames sections to build your comic visually
                  </p>
                </div>
                <div className="start-step bg-black/80 border-2 border-orange-400 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-400/30">
                  <div className="step-number w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bangers text-2xl font-bold text-black mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-bangers text-xl font-bold text-orange-400 mb-3" style={{
                    textShadow: '-1px 1px 0px #000'
                  }}>
                    Publish & Earn
                  </h3>
                  <p className="text-white leading-relaxed">
                    List your completed comic in the Market and start earning $1SHOT tokens
                  </p>
                </div>
              </div>
            </div>



            {/* Workflow Section */}
            <div className="workflow-section">
              <div className="bg-black/80 border-2 border-orange-400 rounded-2xl p-8 md:p-12 text-center mb-12">
                <h2 className="font-bangers text-4xl md:text-5xl font-bold mb-4 text-orange-400" style={{
                  textShadow: '-2px 2px 0px #000'
                }}>
                  How It Works
                </h2>
                <p className="text-xl text-white max-w-3xl mx-auto">
                  Follow this simple 7-step process to create your own comic and start earning:
                </p>
              </div>
              
              <div className="space-y-6">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="workflow-step group">
                    <div className="flex items-center gap-6 bg-black/80 border-2 border-orange-400 rounded-2xl p-6 transition-all duration-300 hover:translate-x-2 hover:shadow-lg hover:shadow-orange-400/30">
                      <div className="step-icon text-orange-400 flex-shrink-0">
                        {step.icon}
                      </div>
                      <div className="step-content flex-1">
                        <h3 className="font-bangers text-2xl md:text-3xl font-bold text-orange-400 mb-3" style={{
                          textShadow: '-1px 1px 0px #000'
                        }}>
                          {step.title}
                        </h3>
                        <p className="text-white text-lg leading-relaxed mb-4">
                          {step.description}
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {step.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {index < workflowSteps.length - 1 && (
                        <div className="step-arrow text-orange-400 flex-shrink-0 animate-pulse">
                          <ArrowRight size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section bg-black/80 border-3 border-orange-400 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="font-bangers text-4xl md:text-5xl font-bold text-orange-400 mb-4" style={{
                textShadow: '-2px 2px 0px #000'
              }}>
                Ready to Create Your First Comic?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already earning from their AI-generated comics!
              </p>
              <div className="flex justify-center">
                <a href="/series-generator" className="cta-button-go group">
                  <Zap size={24} />
                  GO
                  <Zap size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-bangers {
          font-family: 'Bangers', cursive;
        }
        
        .cta-button-go {
          @apply px-12 py-6 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bangers text-3xl font-bold rounded-3xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:scale-105;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3);
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        .cta-button-go:hover {
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.4);
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3);
          }
          to {
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.4);
          }
        }
      `}</style>
    </div>
  );
} 