'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OneShotGeneratorPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComic, setGeneratedComic] = useState<any>(null);
  const [oneShotForm, setOneShotForm] = useState({
    genre: 'action',
    theme: 'heroic',
    length: 'short',
    style: 'modern',
    complexity: 'medium'
  });

  const generateOneShotComic = async () => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual API call to PANELFORGE-style system
      console.log('Generating complete one-shot comic with PANELFORGE-style system...');
      
      // Simulate the complete one-shot generation process
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Generate all components in one go
      const series = generateSeries();
      const characters = generateCharacters(series);
      const story = generateStory(series, characters);
      const script = generateScript(story);
      const artwork = generateArtwork(script);
      
      const completeComic = {
        id: `oneshot_${Date.now()}`,
        title: `${series.name} - One Shot`,
        subtitle: story.title,
        series: series.name,
        issue: 'One Shot',
        price: `${(Math.random() * 0.1 + 0.02).toFixed(2)} ETH`,
        author: 'AI Generated',
        artist: 'AI Generated',
        pages: script.pages,
        status: 'Generated',
        cover_image: `/comic-covers/download-${Math.floor(Math.random() * 50) + 1}.jpg`,
        description: story.content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        components: {
          series,
          characters,
          story,
          script,
          artwork
        },
        metadata: {
          generationTime: '5 seconds',
          quality: 'High',
          uniqueness: Math.floor(Math.random() * 100) + 1,
          complexity: oneShotForm.complexity
        }
      };

      setGeneratedComic(completeComic);
    } catch (error) {
      console.error('Error generating one-shot comic:', error);
      alert('Failed to generate comic. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSeries = () => {
    const genres = ['action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'sci-fi', 'superhero', 'thriller', 'western'];
    const names = ['Quantum Paradox', 'Street Justice', 'Mystic Realms', 'Cypherpunk Chronicles', 'Neon Dreams', 'Shadow Hunters', 'Cosmic Warriors', 'Urban Legends'];
    
    return {
      id: `series_${Date.now()}`,
      name: names[Math.floor(Math.random() * names.length)],
      genre: oneShotForm.genre,
      theme: oneShotForm.theme,
      description: `A ${oneShotForm.genre} series with ${oneShotForm.theme} themes.`,
      artStyle: oneShotForm.style,
      targetAudience: 'all-ages',
      setting: 'Modern Day',
      createdAt: new Date().toISOString()
    };
  };

  const generateCharacters = (series: any) => {
    const heroNames = ['Nova', 'Shadow', 'Echo', 'Cyber', 'Zara', 'Phoenix', 'Blade', 'Storm'];
    const villainNames = ['Void', 'Chaos', 'Venom', 'Shadow Lord', 'Dark One', 'Corruptor', 'Destroyer', 'Nightmare'];
    const powers = ['Super Strength', 'Energy Projection', 'Teleportation', 'Mind Control', 'Healing', 'Flight', 'Invisibility', 'Time Manipulation'];
    
    return [
      {
        id: `char_${Date.now()}_hero`,
        name: heroNames[Math.floor(Math.random() * heroNames.length)],
        type: 'hero',
        powers: powers[Math.floor(Math.random() * powers.length)],
        personality: 'Brave',
        description: `A heroic character with ${powers[Math.floor(Math.random() * powers.length)].toLowerCase()} abilities.`,
        series: series.name
      },
      {
        id: `char_${Date.now()}_villain`,
        name: villainNames[Math.floor(Math.random() * villainNames.length)],
        type: 'villain',
        powers: powers[Math.floor(Math.random() * powers.length)],
        personality: 'Ruthless',
        description: `A villainous character with ${powers[Math.floor(Math.random() * powers.length)].toLowerCase()} abilities.`,
        series: series.name
      }
    ];
  };

  const generateStory = (series: any, characters: any[]) => {
    const hero = characters.find(c => c.type === 'hero');
    const villain = characters.find(c => c.type === 'villain');
    
    const storyTemplates = [
      `In a world where ${hero?.name} possesses ${hero?.powers}, they must face their greatest challenge yet when ${villain?.name} threatens to destroy everything they hold dear.`,
      `When ${villain?.name} unleashes chaos upon the world, ${hero?.name} must overcome their limitations to save the day.`,
      `The peaceful world is shattered when ${villain?.name} reveals their true power, forcing ${hero?.name} to make the ultimate sacrifice.`
    ];
    
    return {
      id: `story_${Date.now()}`,
      title: `The ${oneShotForm.theme} Awakening`,
      content: storyTemplates[Math.floor(Math.random() * storyTemplates.length)],
      series: series.name,
      characters,
      genre: series.genre,
      theme: series.theme,
      createdAt: new Date().toISOString()
    };
  };

  const generateScript = (story: any) => {
    const pages = oneShotForm.length === 'short' ? 12 : oneShotForm.length === 'medium' ? 24 : 32;
    const panelsPerPage = 6;
    const totalPanels = pages * panelsPerPage;
    
    const panels = [];
    for (let i = 0; i < totalPanels; i++) {
      panels.push({
        id: i + 1,
        page: Math.floor(i / panelsPerPage) + 1,
        panel: (i % panelsPerPage) + 1,
        description: `Panel ${i + 1}: ${story.content.substring(0, 50)}...`,
        dialogue: '',
        action: '',
        effects: ''
      });
    }
    
    return {
      id: `script_${Date.now()}`,
      title: `${story.title} - Script`,
      pages,
      panelsPerPage,
      panels,
      storyId: story.id,
      style: oneShotForm.style,
      createdAt: new Date().toISOString()
    };
  };

  const generateArtwork = (script: any) => {
    const artwork = [];
    const gradients = [
      'cyan-400 to-blue-600',
      'purple-400 to-pink-600',
      'green-400 to-teal-600',
      'yellow-400 to-orange-600',
      'red-400 to-pink-600',
      'indigo-400 to-purple-600'
    ];
    
    for (let i = 0; i < Math.min(script.panels.length, 12); i++) {
      const panel = script.panels[i];
      artwork.push({
        id: `artwork_${Date.now()}_${i}`,
        panelId: panel.id,
        page: panel.page,
        panel: panel.panel,
        description: panel.description,
        imageUrl: `bg-gradient-to-br from-${gradients[Math.floor(Math.random() * gradients.length)]}`,
        status: 'generated',
        createdAt: new Date().toISOString()
      });
    }
    
    return artwork;
  };

  const saveOneShotComic = () => {
    if (!generatedComic) return;
    
    try {
      // Save to assembled comics
      const assembledComics = JSON.parse(localStorage.getItem('assembledComics') || '[]');
      assembledComics.unshift(generatedComic);
      localStorage.setItem('assembledComics', JSON.stringify(assembledComics));
      
      // Save individual components
      const savedSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      savedSeries.unshift(generatedComic.components.series);
      localStorage.setItem('savedSeries', JSON.stringify(savedSeries));
      
      const savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
      savedStories.unshift(generatedComic.components.story);
      localStorage.setItem('savedStories', JSON.stringify(savedStories));
      
      const savedScripts = JSON.parse(localStorage.getItem('savedScripts') || '[]');
      savedScripts.unshift(generatedComic.components.script);
      localStorage.setItem('savedScripts', JSON.stringify(savedScripts));
      
      const savedArtwork = JSON.parse(localStorage.getItem('savedArtwork') || '[]');
      savedArtwork.push(...generatedComic.components.artwork);
      localStorage.setItem('savedArtwork', JSON.stringify(savedArtwork));
      
      alert('One-Shot Comic saved successfully!');
      setGeneratedComic(null);
    } catch (error) {
      console.error('Error saving one-shot comic:', error);
      alert('Failed to save comic');
    }
  };

  const renderGenerationForm = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-6 text-purple-300">One-Shot Generation Settings</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Genre</label>
          <select
            value={oneShotForm.genre}
            onChange={(e) => setOneShotForm(prev => ({ ...prev, genre: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="superhero">Superhero</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Theme</label>
          <select
            value={oneShotForm.theme}
            onChange={(e) => setOneShotForm(prev => ({ ...prev, theme: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="heroic">Heroic</option>
            <option value="dark">Dark</option>
            <option value="romantic">Romantic</option>
            <option value="mysterious">Mysterious</option>
            <option value="epic">Epic</option>
            <option value="intimate">Intimate</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Length</label>
          <select
            value={oneShotForm.length}
            onChange={(e) => setOneShotForm(prev => ({ ...prev, length: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="short">Short (12 pages)</option>
            <option value="medium">Medium (24 pages)</option>
            <option value="long">Long (32 pages)</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Style</label>
          <select
            value={oneShotForm.style}
            onChange={(e) => setOneShotForm(prev => ({ ...prev, style: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="manga">Manga</option>
            <option value="cartoon">Cartoon</option>
            <option value="realistic">Realistic</option>
            <option value="abstract">Abstract</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Complexity</label>
          <select
            value={oneShotForm.complexity}
            onChange={(e) => setOneShotForm(prev => ({ ...prev, complexity: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
            <option value="complex">Complex</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateOneShotComic}
        disabled={isGenerating}
        className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 rounded-lg transition-all font-bold text-lg flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            Generating Complete Comic...
          </>
        ) : (
          <>
            ⚡ ONE-SHOT GENERATE
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/comics')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Comics
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">One-Shot Generator</h1>
        <p className="text-center text-gray-300">Generate a complete comic with one button press - the ultimate AI-powered creation tool</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Generation Form */}
          <div className="space-y-6">
            {renderGenerationForm()}
            
            {/* Info Panel */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 text-purple-300">How It Works</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                  <span>AI generates a complete series concept with characters and world-building</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                  <span>Creates compelling storylines and character arcs automatically</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                  <span>Converts story into detailed comic script with panel descriptions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</span>
                  <span>Generates artwork for each panel in your chosen style</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">5</span>
                  <span>Assembles everything into a complete, ready-to-mint comic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Generated Comic */}
          <div className="space-y-6">
            {generatedComic ? (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-purple-300">Generated Comic</h2>
                  <button
                    onClick={saveOneShotComic}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
                  >
                    💾 Save Comic
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h3 className="font-semibold text-white mb-2">{generatedComic.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{generatedComic.subtitle}</p>
                    <div className="flex gap-2 text-xs text-gray-400">
                      <span>{generatedComic.series}</span>
                      <span>{generatedComic.pages} pages</span>
                      <span>{generatedComic.components.characters.length} characters</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h4 className="text-purple-300 font-semibold mb-2">Story Preview</h4>
                    <p className="text-gray-300 text-sm">{generatedComic.description}</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h4 className="text-purple-300 font-semibold mb-2">Characters</h4>
                    <div className="flex gap-2 flex-wrap">
                      {generatedComic.components.characters.map((char: any) => (
                        <span 
                          key={char.id}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            char.type === 'hero' ? 'bg-blue-600' : 'bg-red-600'
                          }`}
                        >
                          {char.name} ({char.type})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h4 className="text-purple-300 font-semibold mb-2">Artwork Preview</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {generatedComic.components.artwork.slice(0, 6).map((art: any) => (
                        <div key={art.id} className={`h-16 ${art.imageUrl} rounded border border-gray-600`}></div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h4 className="text-purple-300 font-semibold mb-2">Generation Stats</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white ml-2">{generatedComic.metadata.generationTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Quality:</span>
                        <span className="text-white ml-2">{generatedComic.metadata.quality}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Uniqueness:</span>
                        <span className="text-white ml-2">{generatedComic.metadata.uniqueness}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Complexity:</span>
                        <span className="text-white ml-2">{generatedComic.metadata.complexity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2 text-purple-300">Ready to Generate</h3>
                <p className="text-gray-300">Configure your settings and click the One-Shot Generate button to create a complete comic instantly!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 