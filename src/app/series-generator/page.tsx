'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

export default function SeriesGeneratorPage() {
  const router = useRouter();
  const { walletAddress, isWalletConnected, isConnecting, availableWallets, selectedWallet, connectWallet, disconnectWallet } = useWallet();
  const [generatedSeries, setGeneratedSeries] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seriesForm, setSeriesForm] = useState({
    name: '',
    genre: 'action',
    theme: '',
    targetAudience: 'all-ages',
    artStyle: 'modern',
    setting: '',
    description: ''
  });
  const [seriesVariables, setSeriesVariables] = useState<any>({});
  const [seriesTemplates, setSeriesTemplates] = useState<any>({});

  const genres = [
    'action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 
    'mystery', 'romance', 'sci-fi', 'superhero', 'thriller', 'western'
  ];

  const artStyles = [
    'modern', 'classic', 'manga', 'cartoon', 'realistic', 'abstract', 
    'noir', 'pop-art', 'watercolor', 'digital', 'hand-drawn', '3d'
  ];

  const targetAudiences = [
    'all-ages', 'children', 'teen', 'young-adult', 'adult', 'mature'
  ];

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    try {
      // Load series variables from ideas page
      const savedVariables = localStorage.getItem('seriesVariables');
      if (savedVariables) {
        setSeriesVariables(JSON.parse(savedVariables));
      }

      // Load saved templates
      const savedTemplates = localStorage.getItem('seriesTemplates');
      if (savedTemplates) {
        setSeriesTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const processTemplateWithVariables = (template: string, variables: any) => {
    let processedTemplate = template;
    const variableRegex = /\{\{(\w+)\}\}/g;
    
    processedTemplate = processedTemplate.replace(variableRegex, (match, variableId) => {
      // Handle different variable types
      switch (variableId) {
        case 'series_name':
          return generateRandomName();
        case 'genre':
          return variables.genres?.[Math.floor(Math.random() * (variables.genres?.length || 1))] || 'action';
        case 'theme':
          return variables.themes?.[Math.floor(Math.random() * (variables.themes?.length || 1))] || 'adventure';
        case 'setting':
          return variables.settings?.[Math.floor(Math.random() * (variables.settings?.length || 1))] || 'modern city';
        case 'art_style':
          return variables.artStyles?.[Math.floor(Math.random() * (variables.artStyles?.length || 1))] || 'modern';
        case 'target_audience':
          return variables.targetAudiences?.[Math.floor(Math.random() * (variables.targetAudiences?.length || 1))] || 'all-ages';
        case 'character_archetype':
          return variables.characterArchetypes?.[Math.floor(Math.random() * (variables.characterArchetypes?.length || 1))] || 'hero';
        case 'plot_device':
          return variables.plotDevices?.[Math.floor(Math.random() * (variables.plotDevices?.length || 1))] || 'mysterious artifact';
        case 'conflict':
          return variables.conflicts?.[Math.floor(Math.random() * (variables.conflicts?.length || 1))] || 'man vs man';
        case 'series_concept':
          const concept = variables.seriesConcepts?.[Math.floor(Math.random() * (variables.seriesConcepts?.length || 1))];
          return concept?.name || 'Epic Adventure';
        default:
          return match;
      }
    });
    
    return processedTemplate;
  };

  const generateRandomName = () => {
    const prefixes = ['The', 'Dark', 'Light', 'Shadow', 'Star', 'Moon', 'Sun', 'Fire', 'Ice', 'Storm', 'Thunder', 'Silent', 'Hidden', 'Lost', 'Found', 'Ancient', 'Modern', 'Future', 'Past', 'Eternal'];
    const nouns = ['Legacy', 'Quest', 'Destiny', 'Fate', 'Journey', 'Adventure', 'Tale', 'Story', 'Saga', 'Chronicle', 'Legend', 'Myth', 'Dream', 'Nightmare', 'Reality', 'Fantasy', 'Truth', 'Lie', 'Secret', 'Mystery'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  };

  const generateRandomSeries = async () => {
    // Check wallet authentication first
    if (!isWalletConnected || !walletAddress) {
      alert('Please connect your wallet to generate series. Only authenticated users can create and own series.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate a random series without requiring templates
      const randomSeries = generateRandomSeriesData();
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'series',
          data: randomSeries,
          options: {
            walletAddress: walletAddress
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate series');
      }

      const result = await response.json();
      
      if (result.success) {
        const newSeries = {
          ...result.result,
          id: `series_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          owner: walletAddress,
          createdAt: new Date().toISOString(),
          characters: generateSampleCharacters(),
          storylines: generateSampleStorylines()
        };
        
        // Save the series to user's personal collection
        saveSeriesToUserCollection(newSeries);
        
        // Store the generated series for the character generator
        localStorage.setItem('selectedSeries', JSON.stringify(newSeries));
        
        // Redirect to character generator
        router.push('/character-generator');
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Error generating series:', error);
      alert('Failed to generate series. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRandomSeriesData = () => {
    const genres = ['action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'sci-fi', 'superhero', 'thriller', 'western', 'cypherpunk', 'steampunk', 'post-apocalyptic', 'urban fantasy', 'space opera', 'supernatural', 'martial arts', 'noir'];
    const themes = ['redemption', 'power', 'family', 'justice', 'love', 'betrayal', 'survival', 'freedom', 'destiny', 'revenge', 'sacrifice', 'hope', 'corruption', 'transformation', 'discovery', 'honor', 'loyalty', 'greed', 'fear', 'courage', 'wisdom', 'madness', 'peace', 'war'];
    const settings = ['modern city', 'futuristic city', 'space station', 'alien planet', 'medieval castle', 'magical forest', 'desert wasteland', 'underwater city', 'floating islands', 'underground bunker', 'time period', 'alternate dimension', 'virtual reality', 'post-apocalyptic ruins', 'steampunk city', 'cypherpunk slums', 'ancient temple', 'haunted mansion', 'pirate ship', 'military base'];
    const artStyles = ['modern', 'classic', 'manga', 'cartoon', 'realistic', 'abstract', 'noir', 'pop-art', 'watercolor', 'digital', 'hand-drawn', '3d', 'comic book', 'anime', 'pixel art', 'sketchy', 'clean', 'gritty', 'colorful', 'monochrome', 'high contrast', 'soft', 'bold'];
    const targetAudiences = ['all-ages', 'children', 'teen', 'young-adult', 'adult', 'mature'];
    
    const prefixes = ['The', 'Dark', 'Light', 'Shadow', 'Star', 'Moon', 'Sun', 'Fire', 'Ice', 'Storm', 'Thunder', 'Silent', 'Hidden', 'Lost', 'Found', 'Ancient', 'Modern', 'Future', 'Past', 'Eternal'];
    const nouns = ['Legacy', 'Quest', 'Destiny', 'Fate', 'Journey', 'Adventure', 'Tale', 'Story', 'Saga', 'Chronicle', 'Legend', 'Myth', 'Dream', 'Nightmare', 'Reality', 'Fantasy', 'Truth', 'Lie', 'Secret', 'Mystery'];
    
    const randomName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomSetting = settings[Math.floor(Math.random() * settings.length)];
    const randomArtStyle = artStyles[Math.floor(Math.random() * artStyles.length)];
    const randomTargetAudience = targetAudiences[Math.floor(Math.random() * targetAudiences.length)];
    
    return {
      name: randomName,
      genre: randomGenre,
      theme: randomTheme,
      setting: randomSetting,
      artStyle: randomArtStyle,
      targetAudience: randomTargetAudience,
      description: `A ${randomGenre} series set in ${randomSetting} exploring themes of ${randomTheme}. Features ${randomArtStyle} art style and targets ${randomTargetAudience} audiences.`
    };
  };

  const saveSeriesToUserCollection = (series: any) => {
    try {
      // Load existing user series
      const userSeriesKey = `userSeries_${walletAddress}`;
      const userSeries = JSON.parse(localStorage.getItem(userSeriesKey) || '[]') as any[];
      
      // Add new series to user's collection
      userSeries.push(series);
      
      // Save back to localStorage
      localStorage.setItem(userSeriesKey, JSON.stringify(userSeries));
      
      console.log(`Series "${series.name}" saved to user collection`);
    } catch (error) {
      console.error('Error saving series to user collection:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeriesForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSeries = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'series',
          data: seriesForm,
          options: {
            genre: seriesForm.genre,
            artStyle: seriesForm.artStyle
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate series');
      }

      const result = await response.json();
      
      if (result.success) {
        const newSeries = {
          ...result.result,
          characters: generateSampleCharacters(),
          storylines: generateSampleStorylines()
        };
        setGeneratedSeries(newSeries);
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Error generating series:', error);
      alert('Failed to generate series. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSampleCharacters = () => {
    const characterCount = Math.floor(Math.random() * 5) + 2;
    const characters = [];
    
    for (let i = 0; i < characterCount; i++) {
      characters.push({
        id: `char_${Date.now()}_${i}`,
        name: `Character ${i + 1}`,
        role: ['protagonist', 'antagonist', 'supporting', 'mentor'][Math.floor(Math.random() * 4)],
        description: `A compelling character with unique traits and motivations.`,
        powers: ['super strength', 'intelligence', 'magic', 'technology'][Math.floor(Math.random() * 4)],
        personality: ['brave', 'cunning', 'loyal', 'mysterious'][Math.floor(Math.random() * 4)]
      });
    }
    
    return characters;
  };

  const generateSampleStorylines = () => {
    const storylineCount = Math.floor(Math.random() * 3) + 1;
    const storylines = [];
    
    for (let i = 0; i < storylineCount; i++) {
      storylines.push({
        id: `storyline_${Date.now()}_${i}`,
        title: `Story Arc ${i + 1}`,
        description: `An engaging storyline that drives the narrative forward.`,
        issues: Math.floor(Math.random() * 6) + 1,
        status: 'planned'
      });
    }
    
    return storylines;
  };

  const saveSeries = () => {
    if (!generatedSeries) return;
    
    if (!isWalletConnected || !walletAddress) {
      alert('Please connect your wallet to save series');
      return;
    }
    
    try {
      // Save to user's personal collection
      const userSeriesKey = `userSeries_${walletAddress}`;
      const userSeries = JSON.parse(localStorage.getItem(userSeriesKey) || '[]') as any[];
      // @ts-ignore
      const userIndex = (userSeries as any[]).findIndex((s: any) => s.id === generatedSeries.id);
      
      if (userIndex >= 0) {
        userSeries[userIndex] = generatedSeries;
      } else {
        userSeries.unshift(generatedSeries);
      }
      
      localStorage.setItem(userSeriesKey, JSON.stringify(userSeries));
      
      // Also save to general savedSeries for backward compatibility
      const savedSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      // @ts-ignore
      const generalIndex = savedSeries.findIndex((s: any) => s.id === generatedSeries.id);
      
      if (generalIndex >= 0) {
        savedSeries[generalIndex] = generatedSeries;
      } else {
        savedSeries.unshift(generatedSeries);
      }
      
      localStorage.setItem('savedSeries', JSON.stringify(savedSeries));
      alert('Series saved to your personal collection!');
    } catch (error) {
      console.error('Error saving series:', error);
      alert('Failed to save series');
    }
  };

  const navigateToConfig = () => {
    if (generatedSeries) {
      router.push('/series/config');
    }
  };

  const renderForm = () => (
    <div className="series-form">
      <div className="form-section">
        <h3 className="text-xl font-bold mb-4 text-purple-300">📚 Basic Information</h3>
        
        {/* Basic Information Background Card */}
        <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Series Name</label>
              <input
                type="text"
                name="name"
                value={seriesForm.name}
                onChange={handleInputChange}
                placeholder="Enter series name..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Genre</label>
              <select 
                name="genre" 
                value={seriesForm.genre} 
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-purple-300 text-sm font-medium mb-2">Theme</label>
            <input
              type="text"
              name="theme"
              value={seriesForm.theme}
              onChange={handleInputChange}
              placeholder="e.g., Redemption, Power, Family, Justice..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-purple-300 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={seriesForm.description}
              onChange={handleInputChange}
              placeholder="Describe your series concept..."
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Basic Information Content Card */}
      <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Series Foundation</h3>
            <p className="text-gray-300 mb-4">
              Start with the core elements that define your comic series. These fundamental details will guide the AI in creating 
              a cohesive and engaging narrative universe with compelling characters and storylines.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Series Name:</strong> Choose a memorable, distinctive title</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Genre:</strong> Defines the story's tone and conventions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Theme:</strong> The central message or concept</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Description:</strong> Brief overview of your series concept</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-300">Be specific about unique elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-300">Include character dynamics and conflicts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details Content Card */}
      <div className="mb-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Visual & Technical Specifications</h3>
            <p className="text-gray-300 mb-4">
              Define the visual style and technical parameters that will shape your series' appearance and production approach. 
              These choices influence character design, world-building, and overall aesthetic consistency.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Art Style:</strong> Determines visual aesthetic and mood</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Target Audience:</strong> Influences content and complexity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Setting:</strong> Establishes the world and environment</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-300">Modern styles for contemporary appeal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-300">Classic styles for timeless storytelling</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-300">Manga/Anime for dynamic action sequences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="text-xl font-bold mb-4 text-purple-300">⚙️ Technical Details</h3>
        
        {/* Technical Details Background Card */}
        <div className="mb-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Art Style</label>
              <select 
                name="artStyle" 
                value={seriesForm.artStyle} 
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {artStyles.map(style => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Target Audience</label>
              <select 
                name="targetAudience" 
                value={seriesForm.targetAudience} 
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {targetAudiences.map(audience => (
                  <option key={audience} value={audience}>
                    {audience.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-purple-300 text-sm font-medium mb-2">Setting</label>
            <input
              type="text"
              name="setting"
              value={seriesForm.setting}
              onChange={handleInputChange}
              placeholder="e.g., Modern New York, Medieval Fantasy World, Space Colony..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Generation Action Content Card */}
      <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Ready to Generate Your Series</h3>
            <p className="text-gray-300 mb-4">
              With your series foundation and technical specifications defined, you're ready to create a complete comic series. 
              Our AI will generate characters, storylines, and detailed metadata based on your specifications.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Character Generation:</strong> AI creates diverse cast with unique roles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Storyline Creation:</strong> Multiple story arcs with issue planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>World Building:</strong> Detailed setting and background elements</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Series Statistics:</strong> Complexity, popularity, and page estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Save & Export:</strong> Store in library for further development</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  <span className="text-gray-300"><strong>Next Steps:</strong> Generate characters and stories for your series</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button 
          onClick={generateSeries} 
          disabled={isGenerating || !seriesForm.name}
          className="w-full px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Series...
            </>
          ) : (
            <>
              ✨ Generate Series
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderGeneratedSeries = () => (
    <div className="generated-series">
      <div className="series-header mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">{generatedSeries?.name}</h2>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-medium">{generatedSeries?.genre}</span>
          <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">{generatedSeries?.targetAudience}</span>
          <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">{generatedSeries?.artStyle}</span>
        </div>
      </div>

      <div className="series-content space-y-6">
        <div className="series-description">
          <h3 className="text-xl font-bold text-purple-300 mb-2">Description</h3>
          <p className="text-gray-300">{generatedSeries?.description}</p>
        </div>

        <div className="series-details space-y-6">
          <div className="detail-section">
            <h3 className="text-xl font-bold text-purple-300 mb-4">👥 Characters ({generatedSeries?.characters.length})</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {generatedSeries?.characters.map((char: any) => (
                <div key={char.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{char.name}</h4>
                    <span className="px-2 py-1 bg-purple-600 rounded text-xs font-medium">{char.role}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{char.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-purple-600/30 px-2 py-1 rounded">Power: {char.powers}</span>
                    <span className="text-xs bg-purple-600/30 px-2 py-1 rounded">Personality: {char.personality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3 className="text-xl font-bold text-purple-300 mb-4">📚 Storylines ({generatedSeries?.storylines.length})</h3>
            <div className="space-y-4">
              {generatedSeries?.storylines.map((storyline: any) => (
                <div key={storyline.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                  <h4 className="font-semibold text-white mb-2">{storyline.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">{storyline.description}</p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>Issues: {storyline.issues}</span>
                    <span>Status: {storyline.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3 className="text-xl font-bold text-purple-300 mb-4">📊 Series Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
                <div className="text-2xl font-bold text-white">{generatedSeries?.metadata.totalIssues}</div>
                <div className="text-sm text-gray-400">Total Issues</div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
                <div className="text-2xl font-bold text-white">{generatedSeries?.metadata.estimatedPages}</div>
                <div className="text-sm text-gray-400">Estimated Pages</div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
                <div className="text-2xl font-bold text-white">{generatedSeries?.metadata.complexity}/5</div>
                <div className="text-sm text-gray-400">Complexity</div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
                <div className="text-2xl font-bold text-white">{generatedSeries?.metadata.popularity}%</div>
                <div className="text-sm text-gray-400">Popularity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="series-actions mt-8 flex gap-4">
        <button onClick={saveSeries} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold">
          💾 Save Series
        </button>
        <button onClick={navigateToConfig} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold">
          ⚙️ Configure Series
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/series')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Series
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">Series Generator</h1>
        <p className="text-center text-gray-300">Create compelling comic series with AI-powered generation</p>
      </div>

      {/* Generate Series Button */}
      <div className="mb-8 flex justify-center">
        {!isWalletConnected ? (
          <div className="text-center">
            <div className="mb-4 p-6 bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-lg border border-orange-500/30">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-2xl">🔒</span>
                <h3 className="text-xl font-bold text-white">Yours.org Wallet Required</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Connect your Yours.org wallet to generate and own comic series. Only authenticated users can create series that will appear in their personal collection.
              </p>
              <button
                onClick={() => connectWallet('Demo')}
                disabled={isConnecting}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔗</span>
                    <span>Connect Yours.org Wallet</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg border border-green-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg">✅</span>
                <span className="text-sm text-green-300">Yours.org Wallet Connected</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </p>
              <button
                onClick={disconnectWallet}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
              >
                Disconnect
              </button>
            </div>
            <button
              onClick={generateRandomSeries}
              disabled={isGenerating}
              className="generate-series-button px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Generating Series...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <span>Generate Series</span>
                  <span className="text-2xl">✨</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Content Card */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Series Creation</h3>
              <p className="text-gray-300 mb-4">
                Transform your comic ideas into fully-realized series with our intelligent generation system. 
                Define your vision, and let AI create rich characters, compelling storylines, and detailed world-building.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">12+ genres: Action, Fantasy, Sci-Fi, Horror, and more</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">12 art styles: Modern, Manga, Classic, Digital, and more</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Auto-generated characters with unique roles and powers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Multiple storylines with issue counts and status tracking</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Series statistics: complexity, popularity, page estimates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Save to library for character generation workflow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Configure advanced settings and variables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Export for story and script generation</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-500/30">
                <p className="text-sm text-blue-300">
                  💡 <strong>Pro Tip:</strong> After generating your series, you can create characters specifically for it 
                  using the Character Generator, which will use your series context for more cohesive storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {!generatedSeries ? renderForm() : renderGeneratedSeries()}
      </div>
    </div>
  );
} 