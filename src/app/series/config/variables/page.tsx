'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SeriesVariablesPage() {
  const router = useRouter();
  const [variables, setVariables] = useState({
    seriesConcepts: [
      { id: 'cypherpunk_rebellion', name: 'Cypherpunk Rebellion', genre: 'sci-fi', theme: 'rebellion', setting: 'futuristic city', description: 'A group of hackers fight against corporate control in a neon-lit dystopia' },
      { id: 'magical_academy', name: 'Magical Academy', genre: 'fantasy', theme: 'coming_of_age', setting: 'magical school', description: 'Young wizards discover their powers and face ancient threats' },
      { id: 'space_explorers', name: 'Space Explorers', genre: 'sci-fi', theme: 'exploration', setting: 'deep space', description: 'Interstellar explorers discover new worlds and alien civilizations' },
      { id: 'superhero_team', name: 'Superhero Team', genre: 'superhero', theme: 'justice', setting: 'modern city', description: 'A diverse team of heroes protects the city from supervillains' },
      { id: 'post_apocalyptic', name: 'Post-Apocalyptic Survival', genre: 'action', theme: 'survival', setting: 'wasteland', description: 'Survivors navigate a dangerous world after civilization collapsed' },
      { id: 'time_travelers', name: 'Time Travelers', genre: 'sci-fi', theme: 'destiny', setting: 'multiple timelines', description: 'Time travelers try to fix history while avoiding paradoxes' },
      { id: 'monster_hunters', name: 'Monster Hunters', genre: 'horror', theme: 'hunting', setting: 'dark world', description: 'Elite hunters track down supernatural creatures' },
      { id: 'steampunk_adventure', name: 'Steampunk Adventure', genre: 'adventure', theme: 'discovery', setting: 'victorian era', description: 'Inventors explore a world of steam-powered wonders' },
      { id: 'martial_arts_saga', name: 'Martial Arts Saga', genre: 'action', theme: 'honor', setting: 'ancient temples', description: 'Warriors compete in legendary martial arts tournaments' },
      { id: 'urban_fantasy', name: 'Urban Fantasy', genre: 'fantasy', theme: 'hidden_world', setting: 'modern city', description: 'Magic exists secretly in the modern world' },
      { id: 'space_war', name: 'Space War', genre: 'sci-fi', theme: 'war', setting: 'galaxy', description: 'Intergalactic conflict between powerful space empires' },
      { id: 'supernatural_detective', name: 'Supernatural Detective', genre: 'mystery', theme: 'investigation', setting: 'noir city', description: 'A detective solves crimes involving supernatural elements' },
      { id: 'robot_revolution', name: 'Robot Revolution', genre: 'sci-fi', theme: 'freedom', setting: 'robot society', description: 'Robots fight for their rights in a human-dominated world' },
      { id: 'mythological_quest', name: 'Mythological Quest', genre: 'fantasy', theme: 'quest', setting: 'mythical realm', description: 'Heroes embark on a quest through ancient mythology' },
      { id: 'zombie_outbreak', name: 'Zombie Outbreak', genre: 'horror', theme: 'survival', setting: 'infected world', description: 'Survivors fight to stay alive in a zombie apocalypse' },
      { id: 'superhero_origin', name: 'Superhero Origin', genre: 'superhero', theme: 'transformation', setting: 'origin story', description: 'Ordinary people discover extraordinary powers' },
      { id: 'fantasy_kingdom', name: 'Fantasy Kingdom', genre: 'fantasy', theme: 'power', setting: 'medieval realm', description: 'Political intrigue in a magical medieval kingdom' },
      { id: 'alien_invasion', name: 'Alien Invasion', genre: 'sci-fi', theme: 'resistance', setting: 'invaded earth', description: 'Humanity fights back against alien invaders' },
      { id: 'supernatural_romance', name: 'Supernatural Romance', genre: 'romance', theme: 'love', setting: 'supernatural world', description: 'Love story between humans and supernatural beings' },
      { id: 'cyber_thriller', name: 'Cyber Thriller', genre: 'thriller', theme: 'conspiracy', setting: 'digital world', description: 'Hackers uncover a massive digital conspiracy' }
    ],
    genres: [
      'action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 
      'mystery', 'romance', 'sci-fi', 'superhero', 'thriller', 'western',
      'cypherpunk', 'steampunk', 'post-apocalyptic', 'urban fantasy',
      'space opera', 'supernatural', 'martial arts', 'noir'
    ],
    themes: [
      'redemption', 'power', 'family', 'justice', 'love', 'betrayal',
      'survival', 'freedom', 'destiny', 'revenge', 'sacrifice', 'hope',
      'corruption', 'transformation', 'discovery', 'honor', 'loyalty',
      'greed', 'fear', 'courage', 'wisdom', 'madness', 'peace', 'war'
    ],
    settings: [
      'modern city', 'futuristic city', 'space station', 'alien planet',
      'medieval castle', 'magical forest', 'desert wasteland', 'underwater city',
      'floating islands', 'underground bunker', 'time period', 'alternate dimension',
      'virtual reality', 'post-apocalyptic ruins', 'steampunk city', 'cypherpunk slums',
      'ancient temple', 'haunted mansion', 'pirate ship', 'military base'
    ],
    artStyles: [
      'modern', 'classic', 'manga', 'cartoon', 'realistic', 'abstract',
      'noir', 'pop-art', 'watercolor', 'digital', 'hand-drawn', '3d',
      'comic book', 'anime', 'pixel art', 'sketchy', 'clean', 'gritty',
      'colorful', 'monochrome', 'high contrast', 'soft', 'bold'
    ],
    targetAudiences: [
      'all-ages', 'children', 'teen', 'young-adult', 'adult', 'mature'
    ],
    characterArchetypes: [
      'hero', 'villain', 'mentor', 'sidekick', 'love interest', 'anti-hero',
      'tragic hero', 'comic relief', 'wise elder', 'rebel', 'loyal friend',
      'traitor', 'mysterious stranger', 'chosen one', 'fallen hero', 'redeemed villain'
    ],
    plotDevices: [
      'mysterious artifact', 'prophecy', 'time travel', 'parallel universe',
      'amnesia', 'secret identity', 'hidden power', 'ancient curse',
      'technological breakthrough', 'magical awakening', 'alien contact',
      'government conspiracy', 'supernatural event', 'genetic mutation'
    ],
    conflicts: [
      'man vs man', 'man vs nature', 'man vs society', 'man vs self',
      'man vs technology', 'man vs supernatural', 'good vs evil',
      'order vs chaos', 'tradition vs progress', 'individual vs collective'
    ]
  });

  const [newConcept, setNewConcept] = useState({
    name: '',
    genre: '',
    theme: '',
    setting: '',
    description: ''
  });

  useEffect(() => {
    loadVariables();
  }, []);

  const loadVariables = () => {
    try {
      const savedVariables = localStorage.getItem('seriesVariables');
      if (savedVariables) {
        setVariables(JSON.parse(savedVariables));
      }
    } catch (error) {
      console.error('Error loading variables:', error);
    }
  };

  const saveVariables = () => {
    try {
      localStorage.setItem('seriesVariables', JSON.stringify(variables));
      alert('Series ideas saved successfully!');
    } catch (error) {
      console.error('Error saving variables:', error);
      alert('Failed to save variables');
    }
  };

  const addConcept = () => {
    if (!newConcept.name || !newConcept.genre || !newConcept.theme || !newConcept.setting || !newConcept.description) {
      alert('Please fill in all fields');
      return;
    }

    const concept = {
      id: newConcept.name.toLowerCase().replace(/\s+/g, '_'),
      name: newConcept.name,
      genre: newConcept.genre,
      theme: newConcept.theme,
      setting: newConcept.setting,
      description: newConcept.description
    };

    setVariables(prev => ({
      ...prev,
      seriesConcepts: [...prev.seriesConcepts, concept]
    }));

    setNewConcept({ name: '', genre: '', theme: '', setting: '', description: '' });
  };

  const removeConcept = (id: string) => {
    setVariables(prev => ({
      ...prev,
      seriesConcepts: prev.seriesConcepts.filter(concept => concept.id !== id)
    }));
  };

  const addToCategory = (category: string, value: string) => {
    if (!value.trim()) return;
    
    setVariables(prev => ({
      ...prev,
      [category]: [...(prev[category as keyof typeof prev] as any), value.trim()]
    }));
  };

  const removeFromCategory = (category: string, index: number) => {
    setVariables(prev => ({
      ...prev,
      [category]: (prev[category as keyof typeof prev] as any).filter((_: any, i: number) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/series/config')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Series Config
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">Series Ideas Library</h1>
        <p className="text-center text-gray-300">Your collection of comic series concepts and creative elements</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Content Card */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Comic Series Ideas Database</h3>
              <p className="text-gray-300 mb-4">
                Build your library of series concepts, genres, themes, and creative elements. These ideas will be used 
                by the Series Generator to create unique comic series automatically. Add your own concepts or use the 
                pre-populated ideas as starting points.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">20+ pre-built series concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Comprehensive genre and theme lists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Art styles and target audiences</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Character archetypes and plot devices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Add your own custom ideas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Used by AI for random series generation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Concept */}
        <div className="mb-8 bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">➕ Add New Series Concept</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Concept Name</label>
              <input
                type="text"
                value={newConcept.name}
                onChange={(e) => setNewConcept(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Space Pirates, Cyber Ninjas..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Genre</label>
              <select
                value={newConcept.genre}
                onChange={(e) => setNewConcept(prev => ({ ...prev, genre: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select Genre</option>
                {variables.genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Theme</label>
              <select
                value={newConcept.theme}
                onChange={(e) => setNewConcept(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select Theme</option>
                {variables.themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Setting</label>
              <select
                value={newConcept.setting}
                onChange={(e) => setNewConcept(prev => ({ ...prev, setting: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select Setting</option>
                {variables.settings.map(setting => (
                  <option key={setting} value={setting}>
                    {setting.charAt(0).toUpperCase() + setting.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-purple-300 text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={newConcept.description}
                onChange={(e) => setNewConcept(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the series concept..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addConcept}
                className="w-full px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
              >
                Add Concept
              </button>
            </div>
          </div>
        </div>

        {/* Series Concepts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">📚 Series Concepts ({variables.seriesConcepts.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {variables.seriesConcepts.map((concept) => (
              <div key={concept.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{concept.name}</h3>
                  <button
                    onClick={() => removeConcept(concept.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">{concept.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-purple-600 rounded text-xs">{concept.genre}</span>
                  <span className="px-2 py-1 bg-blue-600 rounded text-xs">{concept.theme}</span>
                  <span className="px-2 py-1 bg-green-600 rounded text-xs">{concept.setting}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Genres */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-300 mb-3">Genres</h3>
            <div className="space-y-2">
              {variables.genres.map((genre, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{genre}</span>
                  <button
                    onClick={() => removeFromCategory('genres', index)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Add genre..."
                className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addToCategory('genres', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>

          {/* Themes */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-300 mb-3">Themes</h3>
            <div className="space-y-2">
              {variables.themes.map((theme, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{theme}</span>
                  <button
                    onClick={() => removeFromCategory('themes', index)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Add theme..."
                className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addToCategory('themes', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-300 mb-3">Settings</h3>
            <div className="space-y-2">
              {variables.settings.map((setting, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{setting}</span>
                  <button
                    onClick={() => removeFromCategory('settings', index)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Add setting..."
                className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addToCategory('settings', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button 
            onClick={saveVariables}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold text-lg"
          >
            💾 Save Ideas Library
          </button>
        </div>
      </div>
    </div>
  );
} 