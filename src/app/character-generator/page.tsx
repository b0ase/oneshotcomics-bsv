'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CharacterGeneratorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [character, setCharacter] = useState<any>(null);
  const [characterProfiles, setCharacterProfiles] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSeries, setSavedSeries] = useState<any[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<any>(null);
  const [characterTemplates, setCharacterTemplates] = useState<any>({});
  const [characterVariables, setCharacterVariables] = useState<any>({});

  // Get series from URL params or localStorage
  const seriesId = searchParams.get('series') || localStorage.getItem('currentSeriesId');
  const seriesName = searchParams.get('seriesName') || localStorage.getItem('currentSeriesName');

  useEffect(() => {
    loadSavedData();
    // Check for selected series from series-selector page
    const selectedSeriesData = localStorage.getItem('selectedSeries');
    if (selectedSeriesData) {
      try {
        const series = JSON.parse(selectedSeriesData);
        setSelectedSeries(series);
        // Clear the selected series from localStorage after reading it
        localStorage.removeItem('selectedSeries');
      } catch (error) {
        console.error('Error parsing selected series:', error);
      }
    }
  }, []);

  const loadSavedData = () => {
    try {
      // Load character profiles
      const loadedProfiles = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
      setCharacterProfiles(loadedProfiles);

      // Load saved series
      const saved = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      setSavedSeries(saved);

      // Load character templates
      const savedTemplates = localStorage.getItem('characterTemplates');
      if (savedTemplates) {
        setCharacterTemplates(JSON.parse(savedTemplates));
      }

      // Load character variables
      const savedVariables = localStorage.getItem('characterVariables');
      if (savedVariables) {
        setCharacterVariables(JSON.parse(savedVariables));
      }

      // Set current series if available
      if (seriesId && seriesName) {
        const currentSeries = saved.find((s: any) => s.id === seriesId);
        if (currentSeries) {
          setSelectedSeries(currentSeries);
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const generateCharacter = async (type: 'hero' | 'villain' | 'supporting') => {
    if (!selectedSeries) {
      alert('Please select a series first by going to the Series page.');
      router.push('/series');
      return;
    }

    setIsGenerating(true);
    try {
      // Generate random character data without requiring templates
      const randomCharacter = generateRandomCharacterData(type);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'character',
          data: {
            ...randomCharacter,
            seriesId: selectedSeries.id,
            seriesName: selectedSeries.name
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate character');
      }

      const result = await response.json();
      
      if (result.success) {
        const newCharacter = {
          ...result.result,
          id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type,
          seriesId: selectedSeries.id,
          seriesName: selectedSeries.name,
          createdAt: new Date().toISOString()
        };
        
        setCharacter(newCharacter);
        
        // Save character to library
        saveCharacterToLibrary(newCharacter);
        
        // Store character for story generator
        localStorage.setItem('selectedCharacter', JSON.stringify(newCharacter));
        
        // Redirect to story generator
        router.push('/story-generator');
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Error generating character:', error);
      alert('Failed to generate character. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRandomCharacterData = (type: 'hero' | 'villain' | 'supporting') => {
    const firstNames = ['Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Quinn', 'Avery', 'Blake', 'Cameron', 'Drew', 'Emery', 'Finley', 'Gray', 'Harper', 'Indigo', 'Jules', 'Kai', 'Lane', 'Mickey', 'Nova', 'Ocean', 'Parker', 'Quincy', 'River', 'Sage', 'Taylor', 'Unity', 'Vale', 'Winter', 'Xander', 'Yuki', 'Zion'];
    const lastNames = ['Storm', 'Shadow', 'Light', 'Dark', 'Fire', 'Ice', 'Thunder', 'Wind', 'Earth', 'Water', 'Star', 'Moon', 'Sun', 'Dawn', 'Dusk', 'Night', 'Day', 'Sky', 'Cloud', 'Rain', 'Snow', 'Frost', 'Flame', 'Blaze', 'Frost', 'Storm', 'Thunder', 'Lightning', 'Echo', 'Silence', 'Voice', 'Song'];
    
    const powers = ['super strength', 'flight', 'invisibility', 'telepathy', 'teleportation', 'energy projection', 'healing', 'shapeshifting', 'time manipulation', 'mind control', 'elemental control', 'enhanced senses', 'regeneration', 'immortality', 'size manipulation', 'gravity control', 'reality warping', 'dimensional travel', 'memory manipulation', 'emotion control'];
    const personalities = ['brave', 'cunning', 'loyal', 'mysterious', 'charismatic', 'stoic', 'impulsive', 'calculating', 'compassionate', 'ruthless', 'honorable', 'deceitful', 'optimistic', 'pessimistic', 'determined', 'hesitant', 'confident', 'insecure', 'wise', 'naive', 'experienced', 'inexperienced', 'friendly', 'aloof', 'passionate', 'apathetic'];
    const backgrounds = ['orphan', 'noble', 'soldier', 'scientist', 'criminal', 'student', 'teacher', 'doctor', 'engineer', 'artist', 'musician', 'athlete', 'detective', 'spy', 'merchant', 'farmer', 'wizard', 'warrior', 'healer', 'assassin', 'guardian', 'explorer', 'inventor', 'leader', 'follower'];
    const motivations = ['justice', 'revenge', 'power', 'knowledge', 'love', 'freedom', 'order', 'chaos', 'wealth', 'fame', 'redemption', 'destruction', 'creation', 'protection', 'conquest', 'peace', 'war', 'balance', 'corruption', 'purity', 'truth', 'lies', 'hope', 'despair', 'faith', 'doubt'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const power = powers[Math.floor(Math.random() * powers.length)];
    const personality = personalities[Math.floor(Math.random() * personalities.length)];
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const motivation = motivations[Math.floor(Math.random() * motivations.length)];
    
    let roleDescription = '';
    switch (type) {
      case 'hero':
        roleDescription = 'A courageous hero who fights for justice and protects the innocent.';
        break;
      case 'villain':
        roleDescription = 'A formidable villain who seeks power and challenges the established order.';
        break;
      case 'supporting':
        roleDescription = 'A supporting character who aids the main protagonists in their journey.';
        break;
    }
    
    return {
      name: `${firstName} ${lastName}`,
      type,
      power,
      personality,
      background,
      motivation,
      description: `${roleDescription} ${firstName} is a ${personality} ${background} with the power of ${power}. They are driven by ${motivation} and will stop at nothing to achieve their goals.`,
      appearance: `${personality} looking ${background} with distinctive features that reflect their ${power} abilities.`,
      relationships: `Has complex relationships with other characters in the series, particularly influenced by their ${motivation}.`
    };
  };

  const processTemplateWithVariables = (template: string, variables: any) => {
    let processedTemplate = template;
    
    // Replace all variables in the template with random values
    const variableRegex = /\{\{(\w+)\}\}/g;
    processedTemplate = processedTemplate.replace(variableRegex, (match, variableId) => {
      // Find the variable in the variables object
      for (const category in variables) {
        const variable = variables[category]?.find((v: any) => v.id === variableId);
        if (variable && variable.examples && variable.examples.length > 0) {
          // Return a random example
          const randomIndex = Math.floor(Math.random() * variable.examples.length);
          return variable.examples[randomIndex];
        }
      }
      // If variable not found, return the original placeholder
      return match;
    });
    
    return processedTemplate;
  };

  const saveCharacter = () => {
    if (!character) return;
    
    try {
      const savedProfiles = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
      savedProfiles.push(character);
      localStorage.setItem('characterProfiles', JSON.stringify(savedProfiles));
      
      setCharacterProfiles([...savedProfiles]);
      setCharacter(null);
      alert('Character saved successfully!');
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Error saving character.');
    }
  };

  const saveCharacterToLibrary = (character: any) => {
    try {
      const savedProfiles = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
      savedProfiles.unshift(character);
      localStorage.setItem('characterProfiles', JSON.stringify(savedProfiles));
      setCharacterProfiles(savedProfiles);
      console.log(`Character "${character.name}" saved to library`);
    } catch (error) {
      console.error('Error saving character to library:', error);
    }
  };

  const deleteCharacter = (id: string) => {
    const updatedProfiles = characterProfiles.filter(c => c.id !== id);
    setCharacterProfiles(updatedProfiles);
    localStorage.setItem('characterProfiles', JSON.stringify(updatedProfiles));
  };

  const selectSeries = (series: any) => {
    setSelectedSeries(series);
    localStorage.setItem('currentSeriesId', series.id);
    localStorage.setItem('currentSeriesName', series.name);
  };

  // If no series is selected, show series selection
  if (!selectedSeries) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Select a Series First</h1>
            <p className="text-gray-300 mb-6">You need to choose a series before generating characters.</p>
          </div>

          {savedSeries.length === 0 ? (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
              <p className="text-gray-300 mb-4">No series found. Create a series first.</p>
              <button 
                onClick={() => router.push('/series-generator')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
              >
                Create Series
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSeries.map((series) => (
                <div 
                  key={series.id}
                  onClick={() => selectSeries(series)}
                  className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 cursor-pointer hover:border-purple-400/50 transition-all"
                >
                  <h3 className="font-semibold text-white mb-2">{series.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{series.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-purple-600 rounded text-xs">{series.genre}</span>
                    <span className="px-2 py-1 bg-blue-600 rounded text-xs">{series.artStyle}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="page-header mb-8">
          <button onClick={() => router.push('/series')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            ← Choose Different Series
          </button>
          <h1 className="text-4xl font-bold mb-4 text-center">Character Generator</h1>
          <p className="text-center text-gray-300 mb-4">Create unique heroes and villains for your stories.</p>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-lg px-4 py-2">
              <span className="text-purple-300">📚 Series:</span>
              <span className="text-white font-semibold">{selectedSeries.name}</span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Character Generation</h3>
              <p className="text-gray-300 mb-4">
                Generate unique characters for your series instantly! Each character will be automatically saved to your library and you'll be forwarded to create a story about them.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Random names, powers, and personalities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Automatic character library storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Seamless story generation workflow</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Hero, villain, and supporting characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Rich backgrounds and motivations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Series-specific character integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Panel */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Generate Characters</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => generateCharacter('hero')} 
                disabled={isGenerating}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Hero...
                  </>
                ) : (
                  <>
                    ✨ Generate Hero
                  </>
                )}
              </button>
              
              <button 
                onClick={() => generateCharacter('villain')} 
                disabled={isGenerating}
                className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Villain...
                  </>
                ) : (
                  <>
                    💀 Generate Villain
                  </>
                )}
              </button>

              <button 
                onClick={() => generateCharacter('supporting')} 
                disabled={isGenerating}
                className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Supporting Character...
                  </>
                ) : (
                  <>
                    🎭 Generate Supporting Character
                  </>
                )}
              </button>
            </div>

            {isGenerating && (
              <div className="text-center p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
                <p className="text-purple-300 font-semibold">Generating character for {selectedSeries.name}...</p>
                <p className="text-gray-400 text-sm">This may take a few moments...</p>
              </div>
            )}

            {character && (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4 text-white">
                  {character.name} 
                  <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                    character.type === 'hero' ? 'bg-blue-600' : 'bg-red-600'
                  }`}>
                    {character.type}
                  </span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-purple-300 font-medium">Powers:</span>
                    <span className="text-white ml-2">{character.powers}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Personality:</span>
                    <span className="text-white ml-2">{character.personality}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Description:</span>
                    <p className="text-gray-300 mt-1">{character.description}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Appearance:</span>
                    <p className="text-gray-300 mt-1">{character.appearance}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Backstory:</span>
                    <p className="text-gray-300 mt-1">{character.backstory}</p>
                  </div>
                </div>
                
                <button 
                  onClick={saveCharacter} 
                  className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
                >
                  💾 Save to Library
                </button>
              </div>
            )}
          </div>

          {/* Character Library */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Character Library</h2>
            
            {characterProfiles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Your saved characters will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {characterProfiles.map((profile) => (
                  <div 
                    key={profile.id} 
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-purple-400/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">
                        {profile.name}
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          profile.type === 'hero' ? 'bg-blue-600' : 'bg-red-600'
                        }`}>
                          {profile.type}
                        </span>
                      </h4>
                      <button 
                        onClick={() => deleteCharacter(profile.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{profile.powers}</p>
                    {profile.series && (
                      <p className="text-purple-300 text-xs">Series: {profile.series}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CharacterGeneratorPageWithSuspense() {
  return (
    <Suspense>
      <CharacterGeneratorPage />
    </Suspense>
  );
} 