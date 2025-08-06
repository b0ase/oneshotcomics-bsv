'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CharacterConfigPage() {
  const router = useRouter();
  const [characterVariables, setCharacterVariables] = useState<any>({});
  const [templates, setTemplates] = useState({
    hero: {
      name: 'Hero Template',
      description: 'Template for generating hero characters',
      prompt: 'Create a {{character_type}} hero named {{character_name}} with {{primary_power}} abilities. They have {{personality_traits}} personality, {{moral_alignment}} alignment, and are motivated by {{motivation}}. Appearance: {{eye_color}} {{eye_shape}} eyes, {{hair_color}} {{hair_style}} hair, {{skin_tone}} skin, {{body_type}} build, {{height}} height. They wear {{clothing_style}} with {{accessories}}. Their combat style is {{combat_style}} and they communicate in a {{communication_style}} manner. Background: {{origin_story}} origin, works as {{occupation}}, lives in {{home_location}}, trained through {{training_background}}. Family: {{family_background}}, education: {{education}}. Current emotional state: {{emotional_state}}.',
      imagePrompt: 'A {{art_style}} character portrait with {{eye_color}} {{eye_shape}} eyes, {{hair_color}} {{hair_style}} hair, {{skin_tone}} skin, {{body_type}} build, {{height}} height, {{pose_style}} pose, {{lighting_style}} lighting, {{color_palette}} color palette. The character wears {{clothing_style}} with {{accessories}} and has {{distinguishing_features}}. {{lighting_style}} lighting creates {{color_palette}} atmosphere.'
    },
    villain: {
      name: 'Villain Template',
      description: 'Template for generating villain characters',
      prompt: 'Create a {{character_type}} villain named {{character_name}} with {{primary_power}} abilities. They have {{personality_traits}} personality, {{moral_alignment}} alignment, and are motivated by {{motivation}}. Appearance: {{eye_color}} {{eye_shape}} eyes, {{hair_color}} {{hair_style}} hair, {{skin_tone}} skin, {{body_type}} build, {{height}} height, {{distinguishing_features}}. They wear {{clothing_style}} with {{accessories}}. Their combat style is {{combat_style}} and they communicate in a {{communication_style}} manner. Background: {{origin_story}} origin, works as {{occupation}}, lives in {{home_location}}, trained through {{training_background}}. Family: {{family_background}}, education: {{education}}. Fears/weaknesses: {{fears_weaknesses}}. Current emotional state: {{emotional_state}}.',
      imagePrompt: 'A {{art_style}} character portrait with {{eye_color}} {{eye_shape}} eyes, {{hair_color}} {{hair_style}} hair, {{skin_tone}} skin, {{body_type}} build, {{height}} height, {{pose_style}} pose, {{lighting_style}} lighting, {{color_palette}} color palette. The character wears {{clothing_style}} with {{accessories}} and has {{distinguishing_features}}. {{lighting_style}} lighting creates {{color_palette}} atmosphere.'
    },
    supporting: {
      name: 'Supporting Character Template',
      description: 'Template for generating supporting characters',
      prompt: 'Create a {{character_type}} supporting character named {{character_name}} with {{secondary_power}} abilities. They have {{personality_traits}} personality, {{moral_alignment}} alignment, and are motivated by {{motivation}}. Appearance: {{eye_color}} {{eye_shape}} eyes, {{hair_color}} {{hair_style}} hair, {{skin_tone}} skin, {{body_type}} build, {{height}} height. They wear {{clothing_style}} with {{accessories}}. They communicate in a {{communication_style}} manner. Background: {{origin_story}} origin, works as {{occupation}}, lives in {{home_location}}, trained through {{training_background}}. Family: {{family_background}}, education: {{education}}. Current emotional state: {{emotional_state}}.',
      imagePrompt: 'A {{art_style}} character portrait with {{eye_color}} {{eye_shape}} eyes, {{hair_color}} {{hair_style}} hair, {{skin_tone}} skin, {{body_type}} build, {{height}} height, {{pose_style}} pose, {{lighting_style}} lighting, {{color_palette}} color palette. The character wears {{clothing_style}} with {{accessories}}. {{lighting_style}} lighting creates {{color_palette}} atmosphere.'
    }
  });
  const [showVariableSelector, setShowVariableSelector] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('hero');
  const [activeField, setActiveField] = useState('prompt');

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    try {
      // Load variables from variables page
      const savedVariables = localStorage.getItem('characterVariables');
      if (savedVariables) {
        setCharacterVariables(JSON.parse(savedVariables));
      }

      // Load saved templates
      const savedTemplates = localStorage.getItem('characterTemplates');
      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveTemplates = () => {
    try {
      localStorage.setItem('characterTemplates', JSON.stringify(templates));
      alert('Character templates saved successfully!');
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

  const getVariableExamples = (variableId: string) => {
    for (const category in characterVariables) {
      const variable = characterVariables[category]?.find((v: any) => v.id === variableId);
      if (variable) {
        return variable.examples;
      }
    }
    return [];
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
            {Object.entries(characterVariables).map(([category, variables]: [string, any]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-purple-300 capitalize">{category}</h4>
                <div className="space-y-1">
                  {variables?.map((variable: any) => (
                    <button
                      key={variable.id}
                      onClick={() => insertVariable(variable.id, variable.name)}
                      className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex justify-between items-center"
                      title={`Examples: ${variable.examples.join(', ')}`}
                    >
                      <span className="text-gray-300">{variable.name}</span>
                      <span className="text-purple-400 text-xs">{`{{${variable.id}}}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-500/30">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> Click on any textarea below, then click a variable to insert it. 
              Variables will be replaced with actual values during character generation.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Character Generation Prompt</label>
          <textarea
            name="prompt"
            data-template-type={templateType}
            value={template.prompt}
            onChange={(e) => handleTemplateChange(templateType, 'prompt', e.target.value)}
            rows={8}
            placeholder="Create a {{character_type}} character with {{primary_power}} abilities..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
          />
          <div className="mt-2 text-xs text-gray-400">
            This prompt will be used to generate character descriptions and backstories.
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
            placeholder="A {{art_style}} character portrait with {{eye_color}} eyes..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
          />
          <div className="mt-2 text-xs text-gray-400">
            This prompt will be used to generate character images and artwork.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/characters')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Characters
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">Character Templates</h1>
        <p className="text-center text-gray-300">Create templates for character generation using variables</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Content Card - Template System */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Template-Based Character Generation</h3>
              <p className="text-gray-300 mb-4">
                Create character generation templates that use variables from the Variables page. These templates will be used 
                in the Character Generator to create unique characters with consistent structure but varied details.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Templates define character structure and format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Variables are replaced with random values during generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Each template type (hero, villain, supporting) has different focus</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Use the Variable Selector to insert variables into templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Variables are defined in the Variables page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Templates are saved and used in Character Generator</span>
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
                These variables are defined in the Variables page and can be used in your templates.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(characterVariables).slice(0, 6).map(([category, categoryVariables]: [string, any]) => (
                  <div key={category} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h4 className="font-semibold text-green-300 capitalize mb-3">{category}</h4>
                    <div className="space-y-2">
                      {Array.isArray(categoryVariables) && categoryVariables.slice(0, 3).map((variable: any) => (
                        <div key={variable.id} className="text-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300">{variable.name}:</span>
                            <span className="text-green-400 text-xs">{`{{${variable.id}}}`}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Examples: {variable.examples.slice(0, 2).join(', ')}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-green-900/20 rounded border border-green-500/30">
                <p className="text-sm text-green-300">
                  💡 <strong>Example:</strong> When generating a character, {'{{'}character_name{'}}'} might become "Neon Viper", 
                  {'{{'}eye_color{'}}'} might become "glowing green", and {'{{'}primary_power{'}}'} might become "cyber-enhanced combat".
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