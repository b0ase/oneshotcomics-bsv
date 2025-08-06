'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SeriesConfigPage() {
  const router = useRouter();
  const [seriesVariables, setSeriesVariables] = useState<any>({});
  const [templates, setTemplates] = useState({
    random: {
      name: 'Random Series Template',
      description: 'Template for generating completely random series',
      prompt: 'Create a {{genre}} comic series called "{{series_name}}" with a {{theme}} theme, set in {{setting}}. The series should have {{art_style}} art style and target {{target_audience}} audience. Include {{character_archetype}} characters and {{plot_device}} as a central element. The main conflict should be {{conflict}}.',
      imagePrompt: 'A {{art_style}} comic cover featuring {{character_archetype}} characters in {{setting}} with {{theme}} atmosphere, {{art_style}} art style, dramatic composition.'
    },
    conceptBased: {
      name: 'Concept-Based Template',
      description: 'Template for generating series based on specific concepts',
      prompt: 'Create a comic series based on the concept: "{{series_concept}}". This should be a {{genre}} series with {{theme}} themes, set in {{setting}}. The art style should be {{art_style}} and target {{target_audience}}. The story should involve {{character_archetype}} characters dealing with {{conflict}} and {{plot_device}}.',
      imagePrompt: 'A {{art_style}} comic cover for "{{series_concept}}" showing {{character_archetype}} characters in {{setting}} with {{theme}} mood and {{art_style}} visual style.'
    },
    genreSpecific: {
      name: 'Genre-Specific Template',
      description: 'Template for generating series within specific genres',
      prompt: 'Create a {{genre}} comic series with the following specifications: Theme: {{theme}}, Setting: {{setting}}, Art Style: {{art_style}}, Target Audience: {{target_audience}}. The series should feature {{character_archetype}} characters and include {{plot_device}} as a key element. The central conflict should be {{conflict}}.',
      imagePrompt: 'A {{art_style}} {{genre}} comic cover with {{character_archetype}} characters in {{setting}}, featuring {{theme}} atmosphere and {{art_style}} artistic style.'
    }
  });
  const [showVariableSelector, setShowVariableSelector] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('random');

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
        setTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveTemplates = () => {
    try {
      localStorage.setItem('seriesTemplates', JSON.stringify(templates));
      alert('Series templates saved successfully!');
    } catch (error) {
      console.error('Error saving templates:', error);
      alert('Failed to save templates');
    }
  };

  const handleTemplateChange = (templateType: string, field: string, value: string) => {
    setTemplates(prev => ({
      ...prev,
      [templateType]: {
        ...prev[templateType as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const insertVariable = (variableId: string, variableName: string) => {
    const variablePlaceholder = `{{${variableId}}}`;
    const activeElement = document.activeElement as HTMLTextAreaElement;
    
    if (activeElement && activeElement.tagName === 'TEXTAREA') {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const text = activeElement.value;
      
      const newText = text.substring(0, start) + variablePlaceholder + text.substring(end);
      activeElement.value = newText;
      
      // Update the template state
      const fieldName = activeElement.name;
      const templateType = activeElement.dataset.templateType;
      if (templateType) {
        handleTemplateChange(templateType, fieldName, newText);
      }
      
      // Set cursor position after the inserted variable
      activeElement.selectionStart = activeElement.selectionEnd = start + variablePlaceholder.length;
      activeElement.focus();
    }
    
    setShowVariableSelector(false);
  };

  const renderTemplateEditor = (templateType: string, template: any) => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-300">{template.name}</h2>
        <button
          onClick={() => setShowVariableSelector(!showVariableSelector)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-medium"
        >
          {showVariableSelector ? 'Hide' : 'Show'} Variable Selector
        </button>
      </div>
      
      <p className="text-gray-300 mb-6">{template.description}</p>

      {/* Variable Selector */}
      {showVariableSelector && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-3">Insert Variables</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Series Concepts */}
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Series Concepts</h4>
              <div className="space-y-1">
                {seriesVariables.seriesConcepts?.slice(0, 5).map((concept: any) => (
                  <button
                    key={concept.id}
                    onClick={() => insertVariable('series_concept', concept.name)}
                    className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                    title={concept.description}
                  >
                    <span className="text-gray-300">{concept.name}</span>
                    <span className="text-purple-400 text-xs">{`{{series_concept}}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Genres</h4>
              <div className="space-y-1">
                {seriesVariables.genres?.slice(0, 8).map((genre: string) => (
                  <button
                    key={genre}
                    onClick={() => insertVariable('genre', genre)}
                    className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="text-gray-300">{genre}</span>
                    <span className="text-purple-400 text-xs">{`{{genre}}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Themes</h4>
              <div className="space-y-1">
                {seriesVariables.themes?.slice(0, 8).map((theme: string) => (
                  <button
                    key={theme}
                    onClick={() => insertVariable('theme', theme)}
                    className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="text-gray-300">{theme}</span>
                    <span className="text-purple-400 text-xs">{`{{theme}}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Settings</h4>
              <div className="space-y-1">
                {seriesVariables.settings?.slice(0, 8).map((setting: string) => (
                  <button
                    key={setting}
                    onClick={() => insertVariable('setting', setting)}
                    className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="text-gray-300">{setting}</span>
                    <span className="text-purple-400 text-xs">{`{{setting}}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Art Styles */}
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Art Styles</h4>
              <div className="space-y-1">
                {seriesVariables.artStyles?.slice(0, 8).map((style: string) => (
                  <button
                    key={style}
                    onClick={() => insertVariable('art_style', style)}
                    className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="text-gray-300">{style}</span>
                    <span className="text-purple-400 text-xs">{`{{art_style}}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Character Archetypes */}
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Character Archetypes</h4>
              <div className="space-y-1">
                {seriesVariables.characterArchetypes?.slice(0, 8).map((archetype: string) => (
                  <button
                    key={archetype}
                    onClick={() => insertVariable('character_archetype', archetype)}
                    className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                  >
                    <span className="text-gray-300">{archetype}</span>
                    <span className="text-purple-400 text-xs">{`{{character_archetype}}`}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-500/30">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> Click on any textarea below, then click a variable to insert it. 
              Variables will be replaced with random values during series generation.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Series Generation Prompt</label>
          <textarea
            name="prompt"
            data-template-type={templateType}
            value={template.prompt}
            onChange={(e) => handleTemplateChange(templateType, 'prompt', e.target.value)}
            rows={8}
            placeholder="Create a {{genre}} comic series with {{theme}} themes..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
          />
          <div className="mt-2 text-xs text-gray-400">
            This prompt will be used to generate series descriptions and details.
          </div>
        </div>
        
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Image Generation Prompt</label>
          <textarea
            name="imagePrompt"
            data-template-type={templateType}
            value={template.imagePrompt}
            onChange={(e) => handleTemplateChange(templateType, 'imagePrompt', e.target.value)}
            rows={6}
            placeholder="A {{art_style}} comic cover with {{character_archetype}} characters..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
          />
          <div className="mt-2 text-xs text-gray-400">
            This prompt will be used to generate series cover art and images.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/series')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Series
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">Series Generation Templates</h1>
        <p className="text-center text-gray-300">Create templates for AI-powered series generation using your ideas library</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Content Card */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">AI Series Generation Templates</h3>
              <p className="text-gray-300 mb-4">
                Create templates that use variables from your Series Ideas Library to generate unique comic series. 
                These templates will be used by the Series Generator to create random series automatically.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Templates define series generation structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Variables are replaced with random values</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Different templates for different generation styles</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Use the Variable Selector to insert variables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Variables come from your Ideas Library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Templates are used by the Series Generator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Template Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(templates).map(([type, template]) => (
              <button
                key={type}
                onClick={() => setActiveTemplate(type)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  activeTemplate === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Template Editor */}
        {renderTemplateEditor(activeTemplate, templates[activeTemplate as keyof typeof templates])}

        {/* Variable Preview */}
        <div className="mb-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Available Variables</h3>
              <p className="text-gray-300 mb-4">
                These variables are defined in your Series Ideas Library and can be used in your templates.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="font-semibold text-green-300 mb-3">Series Concepts</h4>
                  <div className="text-sm text-gray-300">
                    {seriesVariables.seriesConcepts?.length || 0} concepts available
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="font-semibold text-green-300 mb-3">Genres</h4>
                  <div className="text-sm text-gray-300">
                    {seriesVariables.genres?.length || 0} genres available
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="font-semibold text-green-300 mb-3">Themes</h4>
                  <div className="text-sm text-gray-300">
                    {seriesVariables.themes?.length || 0} themes available
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-900/20 rounded border border-green-500/30">
                <p className="text-sm text-green-300">
                  💡 <strong>Example:</strong> When generating a series, {'{{'}genre{'}}'} might become "sci-fi", 
                  {'{{'}theme{'}}'} might become "redemption", and {'{{'}setting{'}}'} might become "futuristic city".
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button 
            onClick={saveTemplates}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold text-lg"
          >
            💾 Save Templates
          </button>
        </div>
      </div>
    </div>
  );
} 