'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StoriesConfigVariablesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('templates');
  const [savedSeries, setSavedSeries] = useState<any[]>([]);
  const [characterProfiles, setCharacterProfiles] = useState<any[]>([]);

  useEffect(() => {
    loadData();
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

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Story Templates</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Hero's Journey</h4>
            <p className="text-sm text-gray-400">Classic hero journey with call to adventure, trials, and return</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Three-Act Structure</h4>
            <p className="text-sm text-gray-400">Setup, confrontation, and resolution structure</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Mystery/Detective</h4>
            <p className="text-sm text-gray-400">Whodunit mystery with clues and revelation</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Romance Arc</h4>
            <p className="text-sm text-gray-400">Love story with emotional development</p>
          </div>
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Character Arcs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Redemption Arc</h4>
            <p className="text-sm text-gray-400">Character goes from villain to hero</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Fall from Grace</h4>
            <p className="text-sm text-gray-400">Character goes from hero to villain</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Personal Growth</h4>
            <p className="text-sm text-gray-400">Character overcomes internal flaws</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Locations</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {['Urban cityscape', 'Rural countryside', 'Futuristic metropolis', 'Medieval castle', 'Space station', 'Underwater city'].map((location, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
              <span className="text-white text-sm">{location}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Time Periods</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {['Prehistoric times', 'Ancient civilizations', 'Medieval period', 'Present day', 'Near future', 'Far future'].map((period, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
              <span className="text-white text-sm">{period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThemesTab = () => (
    <div className="space-y-6">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Primary Themes</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {['Good vs Evil', 'Love and Loss', 'Power and Corruption', 'Identity and Self-Discovery', 'Justice and Revenge', 'Freedom and Oppression'].map((theme, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
              <span className="text-white text-sm">{theme}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Secondary Themes</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {['Coming of Age', 'Environmentalism', 'Social Justice', 'War and Peace', 'Science and Ethics', 'Tradition vs Progress'].map((theme, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
              <span className="text-white text-sm">{theme}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreviewTab = () => (
    <div className="space-y-6">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Variable Summary</h3>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-white">10</div>
            <div className="text-sm text-gray-400">Templates</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-blue-400">60</div>
            <div className="text-sm text-gray-400">Settings</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-green-400">40</div>
            <div className="text-sm text-gray-400">Themes</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-purple-400">{savedSeries.length}</div>
            <div className="text-sm text-gray-400">Series</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-purple-300 mb-3">Available Series</h4>
            <div className="space-y-2">
              {savedSeries.map(series => (
                <div key={series.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                  <div className="font-medium text-white">{series.name}</div>
                  <div className="text-sm text-gray-400">{series.genre}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-purple-300 mb-3">Character Types</h4>
            <div className="space-y-2">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                <div className="font-medium text-white">Heroes</div>
                <div className="text-sm text-gray-400">
                  {characterProfiles.filter(c => c.type === 'hero').length} characters
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                <div className="font-medium text-white">Villains</div>
                <div className="text-sm text-gray-400">
                  {characterProfiles.filter(c => c.type === 'villain').length} characters
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'templates', label: 'Story Templates', icon: '📝' },
    { id: 'settings', label: 'Settings & Locations', icon: '🌍' },
    { id: 'themes', label: 'Themes', icon: '🎭' },
    { id: 'preview', label: 'Preview', icon: '👁️' }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="page-header mb-8">
          <button onClick={() => router.push('/stories/config')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            ← Back to Config
          </button>
          <h1 className="text-4xl font-bold mb-4 text-center">Story Variables</h1>
          <p className="text-center text-gray-300">Manage story generation templates, settings, and themes</p>
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
            {activeTab === 'templates' && renderTemplatesTab()}
            {activeTab === 'settings' && renderSettingsTab()}
            {activeTab === 'themes' && renderThemesTab()}
            {activeTab === 'preview' && renderPreviewTab()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/story-generator')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
            >
              Test Story Generator
            </button>
            <button
              onClick={() => router.push('/stories/config')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-semibold"
            >
              Back to Config
            </button>
          </div>
          
          <button
            onClick={() => alert('Variables saved!')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
          >
            Save Variables
          </button>
        </div>
      </div>
    </div>
  );
} 