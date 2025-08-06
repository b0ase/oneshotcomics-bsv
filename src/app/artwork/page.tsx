'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtworkPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedScripts, setSavedScripts] = useState<any[]>([]);
  const [selectedScript, setSelectedScript] = useState<any>(null);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const [savedArtwork, setSavedArtwork] = useState<any[]>([]);
  const [artworkForm, setArtworkForm] = useState({
    style: 'modern',
    mood: 'dramatic',
    colorPalette: 'vibrant',
    resolution: 'high'
  });

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    try {
      // Load saved scripts
      const scripts = JSON.parse(localStorage.getItem('savedScripts') || '[]');
      setSavedScripts(scripts);

      // Load saved artwork
      const artwork = JSON.parse(localStorage.getItem('savedArtwork') || '[]');
      setSavedArtwork(artwork);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const generateImages = async () => {
    if (!selectedScript) {
      alert('Please select a script first');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate API call for image generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newImages = [];
      const panels = selectedScript.panels || [];
      
      // Generate images for each panel
      for (let i = 0; i < Math.min(panels.length, 6); i++) {
        const panel = panels[i];
        const imageId = `img_${Date.now()}_${i}`;
        
        newImages.push({
          id: imageId,
          panelId: panel.id,
          page: panel.page,
          panel: panel.panel,
          description: panel.description,
          prompt: `Comic panel: ${panel.description}, style: ${artworkForm.style}, mood: ${artworkForm.mood}, colors: ${artworkForm.colorPalette}`,
          imageUrl: `bg-gradient-to-br from-${getRandomGradient()}`,
          status: 'generated',
          createdAt: new Date().toISOString(),
          scriptId: selectedScript.id,
          scriptTitle: selectedScript.title
        });
      }
      
      setGeneratedImages(newImages);
    } catch (error) {
      console.error('Error generating images:', error);
      alert('Failed to generate images. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      'cyan-400 to-blue-600',
      'purple-400 to-pink-600',
      'green-400 to-teal-600',
      'yellow-400 to-orange-600',
      'red-400 to-pink-600',
      'indigo-400 to-purple-600',
      'emerald-400 to-green-600',
      'rose-400 to-red-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const saveArtwork = () => {
    if (generatedImages.length === 0) return;
    
    try {
      const saved = JSON.parse(localStorage.getItem('savedArtwork') || '[]');
      const newArtwork = [...saved, ...generatedImages];
      localStorage.setItem('savedArtwork', JSON.stringify(newArtwork));
      setSavedArtwork(newArtwork);
      setGeneratedImages([]);
      alert('Artwork saved successfully!');
    } catch (error) {
      console.error('Error saving artwork:', error);
      alert('Failed to save artwork');
    }
  };

  const deleteArtwork = (id: string) => {
    const updatedArtwork = savedArtwork.filter(a => a.id !== id);
    setSavedArtwork(updatedArtwork);
    localStorage.setItem('savedArtwork', JSON.stringify(updatedArtwork));
  };

  const selectScript = (script: any) => {
    setSelectedScript(script);
  };

  const renderArtworkForm = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-6 text-purple-300">Artwork Generation</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Art Style</label>
          <select
            value={artworkForm.style}
            onChange={(e) => setArtworkForm(prev => ({ ...prev, style: e.target.value }))}
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
          <label className="block text-purple-300 text-sm font-medium mb-2">Mood</label>
          <select
            value={artworkForm.mood}
            onChange={(e) => setArtworkForm(prev => ({ ...prev, mood: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="dramatic">Dramatic</option>
            <option value="action">Action</option>
            <option value="mysterious">Mysterious</option>
            <option value="peaceful">Peaceful</option>
            <option value="dark">Dark</option>
            <option value="bright">Bright</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Color Palette</label>
          <select
            value={artworkForm.colorPalette}
            onChange={(e) => setArtworkForm(prev => ({ ...prev, colorPalette: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="vibrant">Vibrant</option>
            <option value="muted">Muted</option>
            <option value="monochrome">Monochrome</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
            <option value="neon">Neon</option>
          </select>
        </div>
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Resolution</label>
          <select
            value={artworkForm.resolution}
            onChange={(e) => setArtworkForm(prev => ({ ...prev, resolution: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="standard">Standard</option>
            <option value="high">High</option>
            <option value="ultra">Ultra HD</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateImages}
        disabled={isGenerating || !selectedScript}
        className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating Artwork...
          </>
        ) : (
          <>
            🎨 Generate Artwork
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Artwork</h1>
        <p className="text-center text-gray-300">Generate visual assets for your comics using AI</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Script Selection and Generation */}
          <div className="space-y-6">
            {/* Script Selection */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Select Script</h2>
              
              {savedScripts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400 mb-4">No scripts found. Create a script first.</p>
                  <button 
                    onClick={() => router.push('/script-generator')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
                  >
                    Create Script
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedScripts.map((script) => (
                    <div 
                      key={script.id}
                      onClick={() => selectScript(script)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedScript?.id === script.id 
                          ? 'bg-purple-600/20 border-purple-400' 
                          : 'bg-gray-800/50 border-gray-600 hover:border-purple-400/50'
                      }`}
                    >
                      <h3 className="font-semibold text-white mb-1">{script.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{script.storyTitle}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">
                          {script.pages} pages
                        </span>
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">
                          {script.panels?.length || 0} panels
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Artwork Generation Form */}
            {selectedScript && renderArtworkForm()}
          </div>

          {/* Right Column - Generated Images and Saved Artwork */}
          <div className="space-y-6">
            {/* Generated Images */}
            {generatedImages.length > 0 && (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-purple-300">Generated Images</h2>
                  <button
                    onClick={saveArtwork}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
                  >
                    💾 Save All
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {generatedImages.map((image) => (
                    <div key={image.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                      <div className={`h-32 ${image.imageUrl} rounded mb-2 flex items-center justify-center`}>
                        <div className="text-center text-white text-xs px-2">
                          <div className="font-bold">Page {image.page}</div>
                          <div>Panel {image.panel}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs line-clamp-2">{image.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Artwork */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Saved Artwork</h2>
              
              {savedArtwork.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400">Your saved artwork will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {savedArtwork.map((artwork) => (
                    <div key={artwork.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs text-purple-300">
                          P{artwork.page}-{artwork.panel}
                        </div>
                        <button 
                          onClick={() => deleteArtwork(artwork.id)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                      <div className={`h-24 ${artwork.imageUrl} rounded mb-2`}></div>
                      <p className="text-gray-300 text-xs line-clamp-2">{artwork.description}</p>
                      <p className="text-gray-400 text-xs mt-1">{artwork.scriptTitle}</p>
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