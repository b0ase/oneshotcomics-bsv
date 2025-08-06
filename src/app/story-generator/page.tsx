'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Character {
  id: number;
  name: string;
  alias: string;
  description: string;
  powers: string[];
  series: string;
  alignment: 'Hero' | 'Anti-Hero' | 'Villain';
  avatar_image: string;
  is_new?: boolean;
  created_at: string;
}

interface Series {
  id: string;
  name: string;
  theme: string;
  cover: string;
}

export default function StoryGeneratorPage() {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [seriesCharacters, setSeriesCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [storyPrompt, setStoryPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load selected series from localStorage on component mount
  useEffect(() => {
    const loadSelectedSeries = () => {
      try {
        const savedSeries = localStorage.getItem('selectedSeries');
        console.log('Saved series from localStorage:', savedSeries);
        if (savedSeries) {
          const series = JSON.parse(savedSeries);
          console.log('Parsed series data:', series);
          setSelectedSeries(series);
          fetchSeriesCharacters(series.name);
        } else {
          console.log('No saved series found in localStorage');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading selected series:', error);
        setLoading(false);
      }
    };

    loadSelectedSeries();
  }, []);

  const fetchSeriesCharacters = async (seriesName: string) => {
    setLoading(true);
    try {
      // Import the actual character data from our data.ts
      const { getCharacters } = await import('@/lib/data');
      const allCharacters = await getCharacters();
      
      const filteredCharacters = allCharacters.filter(char => char.series === seriesName);
      setSeriesCharacters(filteredCharacters);
      
      // Auto-select the first character if available
      if (filteredCharacters.length > 0) {
        setSelectedCharacter(filteredCharacters[0]);
      }
    } catch (error) {
      console.error('Error fetching series characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateStory = async () => {
    if (!selectedCharacter || !storyPrompt.trim()) return;

    setIsGenerating(true);
    try {
      // This would integrate with your AI story generation service
      // For now, we'll simulate a story generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedText = `Based on ${selectedCharacter.name} (${selectedCharacter.alias}), a ${selectedCharacter.alignment.toLowerCase()} from the ${selectedCharacter.series} series, here's a story:

${selectedCharacter.name} stood in the heart of the city, their ${selectedCharacter.powers[0]?.toLowerCase() || 'powers'} pulsing with energy. The challenge ahead was unlike anything they had faced before.

"${storyPrompt}" echoed through their mind as they prepared for the battle that would define their legacy.

The story unfolds with ${selectedCharacter.name} using their unique abilities to overcome the obstacles and emerge victorious, proving that even the greatest challenges can be overcome with determination and the right allies.

This tale will be remembered as one of ${selectedCharacter.name}'s greatest adventures, showcasing their growth as a character and their commitment to their cause.`;

      setGeneratedStory(generatedText);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <h2 className="text-2xl font-semibold mb-4">Loading Character...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/series-selector" 
            className="inline-flex items-center mb-4 text-orange hover:text-orange/80 transition-colors font-system"
          >
            ← Back to Series Selector
          </Link>
          
          <h1 className="font-bangers text-4xl font-bold mb-4" style={{
            textShadow: '-2px 2px 0px var(--color-orange), -4px 4px 0px var(--color-navy)'
          }}>
            Story Generator
          </h1>
          
          <p className="text-gray-300 font-system">
            Create amazing stories featuring characters from the {selectedSeries?.name} series.
          </p>
        </div>

        {/* Series Info */}
        {(selectedSeries || true) && (
          <div className="card mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-32 h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedSeries?.cover || '/series-covers/quantum-paradox-2.jpg'}
                  alt={`${selectedSeries?.name || 'Quantum Paradox'} cover`}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('Series cover loaded successfully:', selectedSeries?.cover || '/series-covers/quantum-paradox-2.jpg')}
                  onError={(e) => {
                    console.error('Failed to load series cover:', selectedSeries?.cover || '/series-covers/quantum-paradox-2.jpg');
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('bg-black/40');
                    target.nextElementSibling?.classList.add('bg-gradient-to-br', 'from-purple-500', 'to-pink-600');
                  }}
                />
              </div>
              
              <div>
                <h2 className="font-bangers text-3xl font-bold mb-2" style={{
                  textShadow: '1px 1px 0 var(--color-navy)'
                }}>
                  {selectedSeries?.name || 'Quantum Paradox'} Series
                </h2>
                <p className="text-gray-300 font-system mb-2">
                  Theme: <span className="text-orange font-medium">{selectedSeries?.theme || 'sci-fi'}</span>
                </p>
                <p className="text-gray-300 font-system text-sm">
                  Select a character below to generate stories featuring them.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bangers text-xl font-bold mb-3" style={{
                textShadow: '1px 1px 0 var(--color-navy)'
              }}>
                Select a Character
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {seriesCharacters.map((char) => (
                  <div 
                    key={char.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCharacter?.id === char.id 
                        ? 'border-orange bg-orange/10' 
                        : 'border-purple-500/30 bg-black/20 hover:border-purple-400/50'
                    }`}
                    onClick={() => setSelectedCharacter(char)}
                  >
                    <div className="w-24 h-32 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden">
                      {char.avatar_image ? (
                        <img
                          src={char.avatar_image}
                          alt={char.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl font-bold">{char.name[0]}</span>
                        </div>
                      )}
                    </div>
                    
                    <h4 className="font-bangers text-base font-bold text-center mb-1" style={{
                      textShadow: '1px 1px 0 var(--color-navy)'
                    }}>
                      {char.name}
                    </h4>
                    <p className="text-orange text-sm text-center mb-2">{char.alias}</p>
                    <div className="flex justify-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        char.alignment === 'Hero' ? 'bg-green-600/20 text-green-300' :
                        char.alignment === 'Anti-Hero' ? 'bg-yellow-600/20 text-yellow-300' :
                        'bg-red-600/20 text-red-300'
                      }`}>
                        {char.alignment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Selected Character Details */}
            {selectedCharacter && (
              <div className="border-t border-purple-500/30 pt-6">
                <h3 className="font-bangers text-xl font-bold mb-3" style={{
                  textShadow: '1px 1px 0 var(--color-navy)'
                }}>
                  Selected Character
                </h3>
                
                <div className="flex items-center gap-6">
                  <div className="w-32 h-40 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden flex-shrink-0">
                    {selectedCharacter.avatar_image ? (
                      <img
                        src={selectedCharacter.avatar_image}
                        alt={selectedCharacter.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-bold">{selectedCharacter.name[0]}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bangers text-xl font-bold mb-1" style={{
                      textShadow: '1px 1px 0 var(--color-navy)'
                    }}>
                      {selectedCharacter.name}
                    </h4>
                    <p className="text-orange font-medium mb-2">{selectedCharacter.alias}</p>
                    <p className="text-gray-300 text-sm font-system line-clamp-2">
                      {selectedCharacter.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {selectedCharacter.powers.slice(0, 2).map((power, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-xs text-purple-300"
                        >
                          {power}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Story Generation Form */}
        <div className="card mb-8">
          <h2 className="font-bangers text-2xl font-bold mb-6" style={{
            textShadow: '1px 1px 0 var(--color-navy)'
          }}>
            Generate Your Story
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2 font-system">
                Story Prompt or Theme
              </label>
              <textarea
                value={storyPrompt}
                onChange={(e) => setStoryPrompt(e.target.value)}
                placeholder="Describe the story you want to generate... (e.g., 'A battle against a powerful villain', 'A journey of self-discovery', 'A team-up with other heroes')"
                className="w-full h-32 p-4 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange focus:outline-none font-system"
                disabled={!selectedCharacter}
              />
            </div>
            
            <button
              onClick={generateStory}
              disabled={!selectedCharacter || !storyPrompt.trim() || isGenerating}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin mr-2">🔄</span>
                  Generating Story...
                </>
              ) : (
                '🎭 Generate Story'
              )}
            </button>
          </div>
        </div>

        {/* Generated Story */}
        {generatedStory && (
          <div className="card">
            <h2 className="font-bangers text-2xl font-bold mb-6" style={{
              textShadow: '1px 1px 0 var(--color-navy)'
            }}>
              Your Generated Story
            </h2>
            
            <div className="bg-black/20 border border-purple-500/30 rounded-lg p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed font-system whitespace-pre-wrap">
                  {generatedStory}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button className="btn btn-secondary">
                📄 Save Story
              </button>
              <button className="btn btn-secondary">
                📤 Share Story
              </button>
              <button 
                onClick={() => setGeneratedStory('')}
                className="btn btn-secondary"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
        )}

        {/* No Series Selected */}
        {!selectedSeries && !loading && (
          <div className="card text-center">
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-2xl font-semibold mb-4">No Series Selected</h2>
            <p className="text-gray-300 mb-6 font-system">
              To generate a story, please select a series from the Series Selector.
            </p>
            <div className="mb-4 p-4 bg-black/20 rounded">
              <p className="text-sm text-gray-400">Debug Info:</p>
              <p className="text-xs text-gray-500">localStorage: {localStorage.getItem('selectedSeries') || 'empty'}</p>
            </div>
            <Link href="/series-selector" className="btn btn-primary">
              Select Series
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 