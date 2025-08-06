'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ScriptGeneratorPage() {
  const router = useRouter();
  const [script, setScript] = useState<any>(null);
  const [savedScripts, setSavedScripts] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedStories, setSavedStories] = useState<any[]>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [scriptForm, setScriptForm] = useState({
    title: '',
    storyId: '',
    pages: 24,
    panelsPerPage: 6,
    style: 'modern',
    tone: 'dramatic'
  });

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    try {
      // Load saved scripts
      const scripts = JSON.parse(localStorage.getItem('savedScripts') || '[]');
      setSavedScripts(scripts);

      // Load saved stories
      const stories = JSON.parse(localStorage.getItem('savedStories') || '[]');
      setSavedStories(stories);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const generateScript = async () => {
    if (!selectedStory) {
      alert('Please select a story first');
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Replace with actual API call to PANELFORGE-style system
      console.log('Generating script with PANELFORGE-style system...');
      
      // Simulate API call for script generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const panels = [];
      const totalPanels = scriptForm.pages * scriptForm.panelsPerPage;
      
      // Generate panel descriptions based on the story
      const storyWords = selectedStory.content.split(' ');
      const wordsPerPanel = Math.ceil(storyWords.length / totalPanels);
      
      for (let i = 0; i < totalPanels; i++) {
        const startIndex = i * wordsPerPanel;
        const endIndex = Math.min(startIndex + wordsPerPanel, storyWords.length);
        const panelText = storyWords.slice(startIndex, endIndex).join(' ');
        
        panels.push({
          id: i + 1,
          page: Math.floor(i / scriptForm.panelsPerPage) + 1,
          panel: (i % scriptForm.panelsPerPage) + 1,
          description: panelText || 'Panel description',
          dialogue: '',
          narration: '',
          action: '',
          effects: ''
        });
      }

      const newScript = {
        id: `script_${Date.now()}`,
        title: scriptForm.title || `${selectedStory.title} - Script`,
        storyId: selectedStory.id,
        storyTitle: selectedStory.title,
        pages: scriptForm.pages,
        panelsPerPage: scriptForm.panelsPerPage,
        style: scriptForm.style,
        tone: scriptForm.tone,
        panels: panels,
        createdAt: new Date().toISOString(),
        status: 'draft'
      };

      setScript(newScript);
    } catch (error) {
      console.error('Error generating script:', error);
      alert('Failed to generate script. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveScript = () => {
    if (!script) return;
    
    try {
      const saved = JSON.parse(localStorage.getItem('savedScripts') || '[]');
      const existingIndex = saved.findIndex((s: any) => s.id === script.id);
      
      if (existingIndex >= 0) {
        saved[existingIndex] = script;
      } else {
        saved.unshift(script);
      }
      
      localStorage.setItem('savedScripts', JSON.stringify(saved));
      setSavedScripts(saved);
      alert('Script saved successfully!');
    } catch (error) {
      console.error('Error saving script:', error);
      alert('Failed to save script');
    }
  };

  const deleteScript = (id: string) => {
    const updatedScripts = savedScripts.filter(s => s.id !== id);
    setSavedScripts(updatedScripts);
    localStorage.setItem('savedScripts', JSON.stringify(updatedScripts));
  };

  const updatePanel = (panelId: number, field: string, value: string) => {
    if (!script) return;
    
    setScript((prev: any) => ({
      ...prev,
      panels: prev.panels.map((panel: any) => 
        panel.id === panelId ? { ...panel, [field]: value } : panel
      )
    }));
  };

  const renderScriptForm = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-6 text-purple-300">Script Generation</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Script Title</label>
          <input
            type="text"
            value={scriptForm.title}
            onChange={(e) => setScriptForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter script title..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Number of Pages</label>
          <select
            value={scriptForm.pages}
            onChange={(e) => setScriptForm(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value={12}>12 pages</option>
            <option value={16}>16 pages</option>
            <option value={20}>20 pages</option>
            <option value={24}>24 pages</option>
            <option value={32}>32 pages</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Panels per Page</label>
          <select
            value={scriptForm.panelsPerPage}
            onChange={(e) => setScriptForm(prev => ({ ...prev, panelsPerPage: parseInt(e.target.value) }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value={4}>4 panels</option>
            <option value={6}>6 panels</option>
            <option value={8}>8 panels</option>
            <option value={9}>9 panels</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Style</label>
          <select
            value={scriptForm.style}
            onChange={(e) => setScriptForm(prev => ({ ...prev, style: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="cinematic">Cinematic</option>
            <option value="experimental">Experimental</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateScript}
        disabled={isGenerating || !selectedStory}
        className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating Script...
          </>
        ) : (
          <>
            ✨ Generate Script
          </>
        )}
      </button>
    </div>
  );

  const renderScriptEditor = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-300">{script.title}</h2>
        <button
          onClick={saveScript}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
        >
          💾 Save Script
        </button>
      </div>

      <div className="mb-4">
        <div className="flex gap-4 text-sm text-gray-400">
          <span>Pages: {script.pages}</span>
          <span>Panels per Page: {script.panelsPerPage}</span>
          <span>Style: {script.style}</span>
          <span>Total Panels: {script.panels.length}</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {script.panels.map((panel: any) => (
          <div key={panel.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-white">
                Page {panel.page}, Panel {panel.panel}
              </h4>
              <span className="text-gray-400 text-sm">#{panel.id}</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-purple-300 text-xs font-medium mb-1">Description</label>
                <textarea
                  value={panel.description}
                  onChange={(e) => updatePanel(panel.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-purple-300 text-xs font-medium mb-1">Dialogue</label>
                <textarea
                  value={panel.dialogue}
                  onChange={(e) => updatePanel(panel.id, 'dialogue', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-purple-300 text-xs font-medium mb-1">Action</label>
                <textarea
                  value={panel.action}
                  onChange={(e) => updatePanel(panel.id, 'action', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-purple-300 text-xs font-medium mb-1">Effects</label>
                <textarea
                  value={panel.effects}
                  onChange={(e) => updatePanel(panel.id, 'effects', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Script Generator</h1>
        <p className="text-center text-gray-300">Convert your stories into detailed comic scripts</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Story Selection and Generation */}
          <div className="space-y-6">
            {/* Story Selection */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Select Story</h2>
              
              {savedStories.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400 mb-4">No stories found. Create a story first.</p>
                  <button 
                    onClick={() => router.push('/stories')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
                  >
                    Create Story
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedStories.map((story) => (
                    <div 
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedStory?.id === story.id 
                          ? 'bg-purple-600/20 border-purple-400' 
                          : 'bg-gray-800/50 border-gray-600 hover:border-purple-400/50'
                      }`}
                    >
                      <h3 className="font-semibold text-white mb-1">{story.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        {story.content.substring(0, 100)}...
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">
                          {story.variables?.genre || 'Unknown'}
                        </span>
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">
                          {story.content.split(' ').length} words
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Script Generation Form */}
            {selectedStory && renderScriptForm()}
          </div>

          {/* Right Column - Script Editor and Library */}
          <div className="space-y-6">
            {/* Script Editor */}
            {script && renderScriptEditor()}

            {/* Saved Scripts */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Saved Scripts</h2>
              
              {savedScripts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400">Your saved scripts will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedScripts.map((savedScript) => (
                    <div 
                      key={savedScript.id}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{savedScript.title}</h3>
                        <button 
                          onClick={() => deleteScript(savedScript.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{savedScript.storyTitle}</p>
                      <div className="flex gap-2 text-xs text-gray-400">
                        <span>{savedScript.pages} pages</span>
                        <span>{savedScript.panelsPerPage} panels/page</span>
                        <span>{savedScript.style} style</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 