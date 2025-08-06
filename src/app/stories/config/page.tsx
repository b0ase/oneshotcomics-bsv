'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StoriesConfigPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [savedSeries, setSavedSeries] = useState<any[]>([]);
  const [characterProfiles, setCharacterProfiles] = useState<any[]>([]);
  const [config, setConfig] = useState({
    general: {
      defaultStoryLength: 'medium',
      defaultGenre: 'action',
      defaultTone: 'dramatic',
      autoSave: true,
      enableCollaboration: false
    },
    generation: {
      aiModel: 'gpt-4',
      creativityLevel: 0.7,
      maxRetries: 3,
      temperature: 0.8,
      maxTokens: 2000
    },
    templates: {
      storyStructure: 'three-act',
      characterArcs: true,
      dialogueStyle: 'natural',
      descriptionLevel: 'detailed'
    },
    publishing: {
      defaultStatus: 'draft',
      requireApproval: false,
      autoPublish: false,
      enableComments: true
    }
  });

  useEffect(() => {
    loadData();
    loadConfig();
  }, []);

  const loadData = () => {
    try {
      const series = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      const characters = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
      setSavedSeries(series);
      setCharacterProfiles(characters);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadConfig = () => {
    try {
      const savedConfig = localStorage.getItem('storiesConfig');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  const saveConfig = () => {
    try {
      localStorage.setItem('storiesConfig', JSON.stringify(config));
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Error saving configuration.');
    }
  };

  const updateConfig = (section: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const resetConfig = () => {
    if (confirm('Are you sure you want to reset all configuration to defaults?')) {
      setConfig({
        general: {
          defaultStoryLength: 'medium',
          defaultGenre: 'action',
          defaultTone: 'dramatic',
          autoSave: true,
          enableCollaboration: false
        },
        generation: {
          aiModel: 'gpt-4',
          creativityLevel: 0.7,
          maxRetries: 3,
          temperature: 0.8,
          maxTokens: 2000
        },
        templates: {
          storyStructure: 'three-act',
          characterArcs: true,
          dialogueStyle: 'natural',
          descriptionLevel: 'detailed'
        },
        publishing: {
          defaultStatus: 'draft',
          requireApproval: false,
          autoPublish: false,
          enableComments: true
        }
      });
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Default Story Length
          </label>
          <select
            value={config.general.defaultStoryLength}
            onChange={(e) => updateConfig('general', 'defaultStoryLength', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="short">Short (5-10 pages)</option>
            <option value="medium">Medium (15-25 pages)</option>
            <option value="long">Long (30-50 pages)</option>
            <option value="epic">Epic (50+ pages)</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Default Genre
          </label>
          <select
            value={config.general.defaultGenre}
            onChange={(e) => updateConfig('general', 'defaultGenre', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Default Tone
          </label>
          <select
            value={config.general.defaultTone}
            onChange={(e) => updateConfig('general', 'defaultTone', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="dramatic">Dramatic</option>
            <option value="lighthearted">Lighthearted</option>
            <option value="dark">Dark</option>
            <option value="epic">Epic</option>
            <option value="intimate">Intimate</option>
            <option value="humorous">Humorous</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.general.autoSave}
              onChange={(e) => updateConfig('general', 'autoSave', e.target.checked)}
              className="mr-2"
            />
            <span className="text-purple-300 text-sm font-medium">Auto-save drafts</span>
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.general.enableCollaboration}
            onChange={(e) => updateConfig('general', 'enableCollaboration', e.target.checked)}
            className="mr-2"
          />
          <span className="text-purple-300 text-sm font-medium">Enable collaboration features</span>
        </label>
      </div>
    </div>
  );

  const renderGenerationSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            AI Model
          </label>
          <select
            value={config.generation.aiModel}
            onChange={(e) => updateConfig('generation', 'aiModel', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="gpt-4">GPT-4 (Recommended)</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3">Claude-3</option>
            <option value="gemini-pro">Gemini Pro</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Creativity Level: {config.generation.creativityLevel}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.generation.creativityLevel}
            onChange={(e) => updateConfig('generation', 'creativityLevel', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Temperature: {config.generation.temperature}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.generation.temperature}
            onChange={(e) => updateConfig('generation', 'temperature', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Focused</span>
            <span>Balanced</span>
            <span>Random</span>
          </div>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Max Tokens
          </label>
          <input
            type="number"
            value={config.generation.maxTokens}
            onChange={(e) => updateConfig('generation', 'maxTokens', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            min="500"
            max="4000"
            step="100"
          />
        </div>
      </div>

      <div>
        <label className="block text-purple-300 text-sm font-medium mb-2">
          Max Retries
        </label>
        <input
          type="number"
          value={config.generation.maxRetries}
          onChange={(e) => updateConfig('generation', 'maxRetries', parseInt(e.target.value))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          min="1"
          max="10"
        />
      </div>
    </div>
  );

  const renderTemplateSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Story Structure
          </label>
          <select
            value={config.templates.storyStructure}
            onChange={(e) => updateConfig('templates', 'storyStructure', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="three-act">Three-Act Structure</option>
            <option value="hero-journey">Hero's Journey</option>
            <option value="five-act">Five-Act Structure</option>
            <option value="freytag">Freytag's Pyramid</option>
            <option value="save-cat">Save the Cat</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Dialogue Style
          </label>
          <select
            value={config.templates.dialogueStyle}
            onChange={(e) => updateConfig('templates', 'dialogueStyle', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="natural">Natural</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="poetic">Poetic</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Description Level
          </label>
          <select
            value={config.templates.descriptionLevel}
            onChange={(e) => updateConfig('templates', 'descriptionLevel', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="minimal">Minimal</option>
            <option value="moderate">Moderate</option>
            <option value="detailed">Detailed</option>
            <option value="extensive">Extensive</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.templates.characterArcs}
            onChange={(e) => updateConfig('templates', 'characterArcs', e.target.checked)}
            className="mr-2"
          />
          <span className="text-purple-300 text-sm font-medium">Include character arcs</span>
        </label>
      </div>
    </div>
  );

  const renderPublishingSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Default Status
          </label>
          <select
            value={config.publishing.defaultStatus}
            onChange={(e) => updateConfig('publishing', 'defaultStatus', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.publishing.requireApproval}
              onChange={(e) => updateConfig('publishing', 'requireApproval', e.target.checked)}
              className="mr-2"
            />
            <span className="text-purple-300 text-sm font-medium">Require approval before publishing</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.publishing.autoPublish}
              onChange={(e) => updateConfig('publishing', 'autoPublish', e.target.checked)}
              className="mr-2"
            />
            <span className="text-purple-300 text-sm font-medium">Auto-publish completed stories</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.publishing.enableComments}
              onChange={(e) => updateConfig('publishing', 'enableComments', e.target.checked)}
              className="mr-2"
            />
            <span className="text-purple-300 text-sm font-medium">Enable reader comments</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDataOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
          <div className="text-2xl font-bold text-white">{savedSeries.length}</div>
          <div className="text-sm text-gray-400">Series Available</div>
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
          <div className="text-2xl font-bold text-purple-400">{characterProfiles.length}</div>
          <div className="text-sm text-gray-400">Total Characters</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Available Series</h3>
          <div className="space-y-2">
            {savedSeries.map(series => (
              <div key={series.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                <div className="font-medium text-white">{series.name}</div>
                <div className="text-sm text-gray-400">{series.genre} • {series.description.substring(0, 50)}...</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Character Distribution</h3>
          <div className="space-y-2">
            {Array.from(new Set(characterProfiles.map(c => c.series))).map((series, index) => {
              const seriesChars = characterProfiles.filter(c => c.series === series);
              const heroes = seriesChars.filter(c => c.type === 'hero').length;
              const villains = seriesChars.filter(c => c.type === 'villain').length;
              return (
                <div key={`series-${series}-${index}`} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                  <div className="font-medium text-white">{series}</div>
                  <div className="text-sm text-gray-400">
                    {heroes} heroes, {villains} villains
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'general', label: 'General Settings', icon: '⚙️' },
    { id: 'generation', label: 'AI Generation', icon: '🤖' },
    { id: 'templates', label: 'Story Templates', icon: '📝' },
    { id: 'publishing', label: 'Publishing', icon: '📤' },
    { id: 'overview', label: 'Data Overview', icon: '📊' }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="page-header mb-8">
          <button onClick={() => router.push('/stories')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            ← Back to Stories
          </button>
          <h1 className="text-4xl font-bold mb-4 text-center">Story Configuration</h1>
          <p className="text-center text-gray-300">Configure story generation settings and templates</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/30 mb-8">
          <div className="flex flex-wrap border-b border-purple-500/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-300 border-b-2 border-purple-500 bg-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-black/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'generation' && renderGenerationSettings()}
            {activeTab === 'templates' && renderTemplateSettings()}
            {activeTab === 'publishing' && renderPublishingSettings()}
            {activeTab === 'overview' && renderDataOverview()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={resetConfig}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-semibold"
            >
              Reset to Defaults
            </button>
            <button
              onClick={() => router.push('/story-generator')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
            >
              Test Story Generator
            </button>
          </div>
          
          <button
            onClick={saveConfig}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
} 