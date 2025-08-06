'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Panel {
  id: string;
  page: number;
  panel: number;
  description: string;
  dialogue: string;
  action: string;
  effects: string;
  thumbnail?: string;
  position: { x: number; y: number };
}

interface Storyboard {
  id: string;
  title: string;
  scriptId?: string;
  pages: number;
  panelsPerPage: number;
  panels: Panel[];
  createdAt: string;
  updatedAt: string;
}

export default function StoryboardPage() {
  const router = useRouter();
  const [storyboards, setStoryboards] = useState<Storyboard[]>([]);
  const [currentStoryboard, setCurrentStoryboard] = useState<Storyboard | null>(null);
  const [savedScripts, setSavedScripts] = useState<any[]>([]);
  const [selectedScript, setSelectedScript] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draggedPanel, setDraggedPanel] = useState<Panel | null>(null);
  const [showPanelEditor, setShowPanelEditor] = useState(false);
  const [editingPanel, setEditingPanel] = useState<Panel | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    try {
      const savedStoryboards = JSON.parse(localStorage.getItem('savedStoryboards') || '[]');
      setStoryboards(savedStoryboards);

      const scripts = JSON.parse(localStorage.getItem('savedScripts') || '[]');
      setSavedScripts(scripts);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const createStoryboard = async () => {
    if (!selectedScript) {
      alert('Please select a script first');
      return;
    }

    setIsCreating(true);
    try {
      // Create panels from script
      const panels: Panel[] = [];
      const totalPanels = selectedScript.pages * selectedScript.panelsPerPage;
      
      for (let i = 0; i < totalPanels; i++) {
        const scriptPanel = selectedScript.panels[i];
        const page = Math.floor(i / selectedScript.panelsPerPage) + 1;
        const panel = (i % selectedScript.panelsPerPage) + 1;
        
        panels.push({
          id: `panel_${Date.now()}_${i}`,
          page,
          panel,
          description: scriptPanel?.description || 'Panel description',
          dialogue: scriptPanel?.dialogue || '',
          action: scriptPanel?.action || '',
          effects: scriptPanel?.effects || '',
          position: { x: 0, y: 0 }
        });
      }

      const newStoryboard: Storyboard = {
        id: `storyboard_${Date.now()}`,
        title: `${selectedScript.title} - Storyboard`,
        scriptId: selectedScript.id,
        pages: selectedScript.pages,
        panelsPerPage: selectedScript.panelsPerPage,
        panels,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setCurrentStoryboard(newStoryboard);
      setStoryboards(prev => [newStoryboard, ...prev]);
      localStorage.setItem('savedStoryboards', JSON.stringify([newStoryboard, ...storyboards]));
    } catch (error) {
      console.error('Error creating storyboard:', error);
      alert('Failed to create storyboard. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const saveStoryboard = () => {
    if (!currentStoryboard) return;
    
    try {
      const updatedStoryboard = {
        ...currentStoryboard,
        updatedAt: new Date().toISOString()
      };
      
      const updatedStoryboards = storyboards.map(sb => 
        sb.id === currentStoryboard.id ? updatedStoryboard : sb
      );
      
      setStoryboards(updatedStoryboards);
      setCurrentStoryboard(updatedStoryboard);
      localStorage.setItem('savedStoryboards', JSON.stringify(updatedStoryboards));
      alert('Storyboard saved successfully!');
    } catch (error) {
      console.error('Error saving storyboard:', error);
      alert('Failed to save storyboard');
    }
  };

  const deleteStoryboard = (id: string) => {
    const updatedStoryboards = storyboards.filter(sb => sb.id !== id);
    setStoryboards(updatedStoryboards);
    localStorage.setItem('savedStoryboards', JSON.stringify(updatedStoryboards));
    
    if (currentStoryboard?.id === id) {
      setCurrentStoryboard(null);
    }
  };

  const handlePanelDragStart = (e: React.DragEvent, panel: Panel) => {
    setDraggedPanel(panel);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handlePanelDrop = (e: React.DragEvent, targetPanel: Panel) => {
    e.preventDefault();
    if (!draggedPanel || !currentStoryboard) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedPanels = currentStoryboard.panels.map(p => {
      if (p.id === draggedPanel.id) {
        return { ...p, position: { x, y } };
      }
      return p;
    });

    setCurrentStoryboard({
      ...currentStoryboard,
      panels: updatedPanels
    });

    setDraggedPanel(null);
  };

  const handlePanelDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const editPanel = (panel: Panel) => {
    setEditingPanel(panel);
    setShowPanelEditor(true);
  };

  const updatePanel = (panelId: string, field: string, value: string) => {
    if (!currentStoryboard) return;
    
    const updatedPanels = currentStoryboard.panels.map(p => 
      p.id === panelId ? { ...p, [field]: value } : p
    );
    
    setCurrentStoryboard({
      ...currentStoryboard,
      panels: updatedPanels
    });
  };

  const savePanelEdit = () => {
    if (!editingPanel || !currentStoryboard) return;
    
    const updatedPanels = currentStoryboard.panels.map(p => 
      p.id === editingPanel.id ? editingPanel : p
    );
    
    setCurrentStoryboard({
      ...currentStoryboard,
      panels: updatedPanels
    });
    
    setShowPanelEditor(false);
    setEditingPanel(null);
  };

  const renderPanelEditor = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Edit Panel {editingPanel?.page}.{editingPanel?.panel}</h3>
          <button
            onClick={() => setShowPanelEditor(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Description</label>
            <textarea
              value={editingPanel?.description || ''}
              onChange={(e) => setEditingPanel(prev => prev ? { ...prev, description: e.target.value } : null)}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Dialogue</label>
            <textarea
              value={editingPanel?.dialogue || ''}
              onChange={(e) => setEditingPanel(prev => prev ? { ...prev, dialogue: e.target.value } : null)}
              rows={2}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Action</label>
            <textarea
              value={editingPanel?.action || ''}
              onChange={(e) => setEditingPanel(prev => prev ? { ...prev, action: e.target.value } : null)}
              rows={2}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Effects</label>
            <textarea
              value={editingPanel?.effects || ''}
              onChange={(e) => setEditingPanel(prev => prev ? { ...prev, effects: e.target.value } : null)}
              rows={2}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={savePanelEdit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
          >
            Save Changes
          </button>
          <button
            onClick={() => setShowPanelEditor(false)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderStoryboardCanvas = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-300">{currentStoryboard?.title}</h2>
        <button
          onClick={saveStoryboard}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
        >
          💾 Save Storyboard
        </button>
      </div>

      <div className="mb-4">
        <div className="flex gap-4 text-sm text-gray-400">
          <span>Pages: {currentStoryboard?.pages}</span>
          <span>Panels per Page: {currentStoryboard?.panelsPerPage}</span>
          <span>Total Panels: {currentStoryboard?.panels.length}</span>
        </div>
      </div>

      <div 
        ref={canvasRef}
        className="relative bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 min-h-[600px] p-4"
        onDrop={(e) => handlePanelDrop(e, {} as Panel)}
        onDragOver={handlePanelDragOver}
      >
        {currentStoryboard?.panels.map((panel) => (
          <div
            key={panel.id}
            draggable
            onDragStart={(e) => handlePanelDragStart(e, panel)}
            onClick={() => editPanel(panel)}
            className="absolute bg-gray-800 border border-purple-500 rounded-lg p-3 cursor-move hover:border-purple-400 transition-colors"
            style={{
              left: panel.position.x,
              top: panel.position.y,
              width: '200px',
              minHeight: '150px'
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-purple-300">
                P{panel.page}.{panel.panel}
              </span>
              <span className="text-xs text-gray-400">#{panel.id.split('_')[2]}</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs">
                <div className="text-gray-400 font-medium">Description:</div>
                <div className="text-white truncate">{panel.description}</div>
              </div>
              
              {panel.dialogue && (
                <div className="text-xs">
                  <div className="text-gray-400 font-medium">Dialogue:</div>
                  <div className="text-white truncate">{panel.dialogue}</div>
                </div>
              )}
              
              {panel.action && (
                <div className="text-xs">
                  <div className="text-gray-400 font-medium">Action:</div>
                  <div className="text-white truncate">{panel.action}</div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {currentStoryboard?.panels.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <p>Drag panels here to organize your storyboard</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Storyboard</h1>
        <p className="text-center text-gray-300">Visualize and organize your comic panels</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Script Selection and Creation */}
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
                      onClick={() => setSelectedScript(script)}
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
                          {script.panelsPerPage} panels/page
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Create Storyboard */}
            {selectedScript && (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Create Storyboard</h2>
                <button
                  onClick={createStoryboard}
                  disabled={isCreating}
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Storyboard...
                    </>
                  ) : (
                    <>
                      🎬 Create Storyboard
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Saved Storyboards */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Saved Storyboards</h2>
              
              {storyboards.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400">Your saved storyboards will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {storyboards.map((storyboard) => (
                    <div 
                      key={storyboard.id}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{storyboard.title}</h3>
                        <button 
                          onClick={() => deleteStoryboard(storyboard.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex gap-2 text-xs text-gray-400 mb-2">
                        <span>{storyboard.pages} pages</span>
                        <span>{storyboard.panelsPerPage} panels/page</span>
                        <span>{storyboard.panels.length} total panels</span>
                      </div>
                      <button
                        onClick={() => setCurrentStoryboard(storyboard)}
                        className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                      >
                        Open Storyboard
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Storyboard Canvas */}
          <div className="lg:col-span-2">
            {currentStoryboard ? (
              renderStoryboardCanvas()
            ) : (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎬</div>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">No Storyboard Selected</h2>
                  <p className="text-gray-400 mb-6">
                    Select a script and create a storyboard to get started
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>• Choose a script from the left panel</p>
                    <p>• Click "Create Storyboard" to generate panels</p>
                    <p>• Drag and drop panels to organize your layout</p>
                    <p>• Click on panels to edit their content</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel Editor Modal */}
      {showPanelEditor && renderPanelEditor()}
    </div>
  );
} 