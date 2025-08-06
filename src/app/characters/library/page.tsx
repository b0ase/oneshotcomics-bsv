'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CharacterLibraryPage() {
  const router = useRouter();
  const [characterProfiles, setCharacterProfiles] = useState<any[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    type: '',
    series: '',
    search: ''
  });
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [savedSeries, setSavedSeries] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [characterProfiles, filters]);

  const loadData = () => {
    try {
      // Load character profiles
      const profiles = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
      setCharacterProfiles(profiles);

      // Load saved series
      const series = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      setSavedSeries(series);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...characterProfiles];

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(char => char.type === filters.type);
    }

    // Filter by series
    if (filters.series) {
      filtered = filtered.filter(char => char.series === filters.series);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(char => 
        char.name?.toLowerCase().includes(searchLower) ||
        char.powers?.toLowerCase().includes(searchLower) ||
        char.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredCharacters(filtered);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const deleteCharacter = (id: string) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      const updatedProfiles = characterProfiles.filter(c => c.id !== id);
      setCharacterProfiles(updatedProfiles);
      localStorage.setItem('characterProfiles', JSON.stringify(updatedProfiles));
    }
  };

  const exportCharacter = (character: any) => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.name}-character.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSeriesNames = () => {
    const seriesNames = [...new Set(characterProfiles.map(char => char.series).filter(Boolean))];
    return seriesNames;
  };

  const renderCharacterCard = (character: any) => (
    <div 
      key={character.id}
      className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all cursor-pointer"
      onClick={() => setSelectedCharacter(character)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{character.name}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            character.type === 'hero' ? 'bg-blue-600' : 'bg-red-600'
          }`}>
            {character.type}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              exportCharacter(character);
            }}
            className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
            title="Export"
          >
            📤
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteCharacter(character.id);
            }}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{character.powers}</p>
      {character.series && (
        <p className="text-purple-300 text-xs">Series: {character.series}</p>
      )}
      <p className="text-gray-400 text-xs mt-2">
        Created: {new Date(character.createdAt).toLocaleDateString()}
      </p>
    </div>
  );

  const renderCharacterDetail = (character: any) => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{character.name}</h2>
          <span className={`px-3 py-1 rounded text-sm font-medium ${
            character.type === 'hero' ? 'bg-blue-600' : 'bg-red-600'
          }`}>
            {character.type}
          </span>
        </div>
        <button
          onClick={() => setSelectedCharacter(null)}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">Powers</h3>
            <p className="text-gray-300">{character.powers}</p>
          </div>
          
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">Personality</h3>
            <p className="text-gray-300">{character.personality}</p>
          </div>
          
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">Description</h3>
            <p className="text-gray-300">{character.description}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">Appearance</h3>
            <p className="text-gray-300">{character.appearance}</p>
          </div>
          
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">Backstory</h3>
            <p className="text-gray-300">{character.backstory}</p>
          </div>
          
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">Series</h3>
            <p className="text-gray-300">{character.series || 'No series assigned'}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => exportCharacter(character)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
        >
          📤 Export Character
        </button>
        <button
          onClick={() => deleteCharacter(character.id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
        >
          🗑️ Delete Character
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/characters')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Characters
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">Character Library</h1>
        <p className="text-center text-gray-300">Browse and manage all your created characters</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">🔍 Filters</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search characters..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="hero">Hero</option>
                <option value="villain">Villain</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Series</label>
              <select
                value={filters.series}
                onChange={(e) => handleFilterChange('series', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">All Series</option>
                {getSeriesNames().map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-white">{characterProfiles.length}</div>
            <div className="text-sm text-gray-400">Total Characters</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {characterProfiles.filter(c => c.type === 'hero').length}
            </div>
            <div className="text-sm text-gray-400">Heroes</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-red-400">
              {characterProfiles.filter(c => c.type === 'villain').length}
            </div>
            <div className="text-sm text-gray-400">Villains</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {getSeriesNames().length}
            </div>
            <div className="text-sm text-gray-400">Series</div>
          </div>
        </div>

        {/* Character Grid or Detail View */}
        {selectedCharacter ? (
          <div className="mb-8">
            {renderCharacterDetail(selectedCharacter)}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-300">
                Characters ({filteredCharacters.length})
              </h2>
              <button
                onClick={() => router.push('/character-generator')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
              >
                ➕ Create New Character
              </button>
            </div>

            {filteredCharacters.length === 0 ? (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30 text-center">
                <p className="text-gray-400 mb-4">
                  {characterProfiles.length === 0 
                    ? "No characters found. Create your first character!" 
                    : "No characters match your filters."}
                </p>
                <button
                  onClick={() => router.push('/character-generator')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
                >
                  Create Character
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCharacters.map(renderCharacterCard)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 