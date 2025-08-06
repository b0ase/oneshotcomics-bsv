'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CharacterVariablesPage() {
  const router = useRouter();
  const [variables, setVariables] = useState({
    character: [
      { id: 'character_name', name: 'Character Name', examples: ['Neon Viper', 'Captain Comet', 'Shadow Master', 'Quantum Knight', 'Cyber Phoenix', 'Luna Stalker', 'Thunder Fist', 'Crystal Weaver'], category: 'character' },
      { id: 'character_type', name: 'Character Type', examples: ['hero', 'villain', 'anti-hero', 'supporting character', 'mentor', 'sidekick', 'rival', 'ally'], category: 'character' },
      { id: 'character_age', name: 'Character Age', examples: ['teenager', 'young adult', 'middle-aged', 'elderly', 'ageless', 'child', 'adolescent', 'senior'], category: 'character' },
      { id: 'character_gender', name: 'Character Gender', examples: ['male', 'female', 'non-binary', 'gender-fluid', 'unknown', 'androgyne', 'genderqueer', 'agender'], category: 'character' },
      { id: 'character_role', name: 'Character Role', examples: ['protagonist', 'antagonist', 'deuteragonist', 'tritagonist', 'mentor', 'foil', 'love interest', 'comic relief'], category: 'character' }
    ],
    appearance: [
      { id: 'face_shape', name: 'Face Shape', examples: ['oval', 'round', 'square', 'heart-shaped', 'diamond', 'triangular', 'angular', 'rectangular', 'pear-shaped', 'inverted triangle'], category: 'appearance' },
      { id: 'hair_color', name: 'Hair Color', examples: ['neon blue', 'fire red', 'silver white', 'jet black', 'rainbow', 'platinum blonde', 'deep purple', 'electric green', 'golden blonde', 'auburn', 'chestnut', 'strawberry blonde', 'ash brown', 'copper', 'silver gray'], category: 'appearance' },
      { id: 'hair_style', name: 'Hair Style', examples: ['short spiky', 'long flowing', 'mohawk', 'braided', 'messy', 'sleek', 'wild', 'styled', 'pixie cut', 'bob', 'pigtails', 'dreadlocks', 'curly', 'straight', 'wavy', 'undercut', 'fade', 'quiff'], category: 'appearance' },
      { id: 'eye_color', name: 'Eye Color', examples: ['glowing green', 'crystal blue', 'golden amber', 'void black', 'multicolored', 'electric blue', 'emerald green', 'violet', 'hazel', 'brown', 'gray', 'pink', 'yellow', 'orange', 'red', 'white'], category: 'appearance' },
      { id: 'eye_shape', name: 'Eye Shape', examples: ['almond', 'round', 'upturned', 'downturned', 'hooded', 'monolid', 'deep-set', 'wide-set', 'close-set', 'asymmetric'], category: 'appearance' },
      { id: 'skin_tone', name: 'Skin Tone', examples: ['pale', 'olive', 'dark', 'metallic', 'translucent', 'scaled', 'porcelain', 'bronze', 'golden', 'fair', 'medium', 'deep', 'ebony', 'caramel', 'ivory', 'tan', 'mahogany'], category: 'appearance' },
      { id: 'body_type', name: 'Body Type', examples: ['athletic', 'slender', 'muscular', 'robotic', 'ethereal', 'imposing', 'compact', 'tall', 'short', 'curvy', 'stocky', 'lean', 'broad', 'petite', 'plus-size', 'androgynous'], category: 'appearance' },
      { id: 'height', name: 'Height', examples: ['very short', 'short', 'average', 'tall', 'very tall', 'giant', 'diminutive', 'imposing'], category: 'appearance' },
      { id: 'build', name: 'Build', examples: ['slim', 'athletic', 'muscular', 'stocky', 'curvy', 'lean', 'broad', 'delicate', 'robust', 'willowy'], category: 'appearance' },
      { id: 'distinguishing_features', name: 'Distinguishing Features', examples: ['scar', 'tattoo', 'birthmark', 'piercing', 'prosthetic limb', 'cybernetic implant', 'glowing aura', 'wings', 'horns', 'tail', 'third eye', 'tentacles'], category: 'appearance' }
    ],
    powers: [
      { id: 'primary_power', name: 'Primary Power', examples: ['cyber-enhanced combat', 'quantum teleportation', 'neon energy manipulation', 'mind control', 'super strength', 'flight', 'elemental control', 'time manipulation', 'shape-shifting', 'invisibility', 'telekinesis', 'healing', 'energy projection', 'super speed', 'invulnerability', 'telepathy'], category: 'powers' },
      { id: 'secondary_power', name: 'Secondary Power', examples: ['enhanced reflexes', 'energy projection', 'stealth mastery', 'healing factor', 'enhanced senses', 'telekinesis', 'super agility', 'enhanced durability', 'weapon mastery', 'tactical genius', 'empathy', 'precognition', 'dimensional travel', 'matter manipulation', 'gravity control', 'illusion casting'], category: 'powers' },
      { id: 'power_source', name: 'Power Source', examples: ['cybernetic enhancements', 'genetic mutation', 'cosmic energy', 'magical artifact', 'alien technology', 'scientific accident', 'divine blessing', 'dimensional energy', 'psychic awakening', 'mystical training', 'technological augmentation', 'natural evolution', 'supernatural heritage', 'experimental serum', 'ancient ritual', 'cosmic radiation'], category: 'powers' },
      { id: 'power_level', name: 'Power Level', examples: ['street-level', 'city-level', 'cosmic', 'reality-bending', 'omnipotent', 'enhanced human', 'metahuman', 'superhuman', 'transcendent', 'god-tier', 'multiversal', 'planetary', 'galactic', 'universal', 'dimensional', 'conceptual'], category: 'powers' },
      { id: 'power_limitations', name: 'Power Limitations', examples: ['time limit', 'energy drain', 'emotional state', 'environmental factors', 'physical contact required', 'line of sight', 'cooldown period', 'mental focus', 'physical strain', 'moral restrictions', 'technological dependency', 'magical backlash', 'dimensional constraints', 'reality resistance', 'power interference'], category: 'powers' },
      { id: 'combat_style', name: 'Combat Style', examples: ['martial arts', 'weapon mastery', 'energy projection', 'stealth tactics', 'brute force', 'strategic planning', 'hit-and-run', 'defensive', 'aggressive', 'balanced', 'unpredictable', 'methodical', 'chaotic', 'precise', 'overwhelming force'], category: 'powers' }
    ],
    personality: [
      { id: 'personality_traits', name: 'Personality Traits', examples: ['rebellious', 'analytical', 'compassionate', 'ruthless', 'chaotic', 'methodical', 'impulsive', 'cautious', 'charismatic', 'introverted', 'extroverted', 'optimistic', 'pessimistic', 'confident', 'insecure', 'loyal', 'treacherous', 'honorable', 'deceitful', 'brave', 'cowardly', 'wise', 'naive', 'mature', 'immature'], category: 'personality' },
      { id: 'moral_alignment', name: 'Moral Alignment', examples: ['lawful good', 'chaotic evil', 'neutral', 'chaotic good', 'lawful evil', 'neutral good', 'neutral evil', 'lawful neutral', 'chaotic neutral', 'true neutral', 'rebellious good', 'noble evil', 'anti-hero', 'fallen hero', 'redeemed villain'], category: 'personality' },
      { id: 'motivation', name: 'Motivation', examples: ['justice', 'revenge', 'power', 'redemption', 'curiosity', 'survival', 'protection', 'knowledge', 'love', 'family', 'honor', 'wealth', 'fame', 'freedom', 'order', 'chaos', 'balance', 'destruction', 'creation', 'exploration', 'domination', 'peace', 'war', 'truth', 'secrets'], category: 'personality' },
      { id: 'fears_weaknesses', name: 'Fears and Weaknesses', examples: ['loss of control', 'betrayal', 'powerlessness', 'isolation', 'failure', 'past trauma', 'responsibility', 'heights', 'darkness', 'crowds', 'intimacy', 'change', 'commitment', 'rejection', 'abandonment', 'death', 'aging', 'weakness', 'vulnerability', 'emotional attachment', 'moral compromise'], category: 'personality' },
      { id: 'communication_style', name: 'Communication Style', examples: ['direct', 'subtle', 'eloquent', 'rough', 'formal', 'casual', 'mysterious', 'open', 'reserved', 'expressive', 'monotone', 'animated', 'whisper', 'loud', 'sarcastic', 'sincere', 'manipulative', 'honest'], category: 'personality' },
      { id: 'emotional_state', name: 'Emotional State', examples: ['calm', 'angry', 'sad', 'happy', 'anxious', 'confident', 'fearful', 'excited', 'depressed', 'manic', 'stoic', 'volatile', 'stable', 'unstable', 'content', 'restless', 'peaceful', 'aggressive'], category: 'personality' }
    ],
    background: [
      { id: 'origin_story', name: 'Origin Story', examples: ['lab accident', 'betrayal by corporation', 'cosmic event', 'genetic experiment', 'training', 'inheritance', 'alien abduction', 'mystical awakening', 'technological enhancement', 'survival of tragedy', 'prophecy fulfillment', 'scientific breakthrough', 'dimensional rift', 'time travel incident', 'supernatural encounter', 'artificial intelligence', 'genetic engineering', 'radiation exposure', 'magical ritual', 'divine intervention'], category: 'background' },
      { id: 'occupation', name: 'Occupation', examples: ['vigilante', 'scientist', 'mercenary', 'student', 'corporate executive', 'soldier', 'artist', 'criminal', 'detective', 'doctor', 'teacher', 'engineer', 'journalist', 'politician', 'police officer', 'firefighter', 'lawyer', 'chef', 'musician', 'athlete', 'spy', 'assassin', 'healer', 'wizard', 'knight', 'pirate', 'explorer'], category: 'background' },
      { id: 'home_location', name: 'Home Location', examples: ['city slums', 'high-tech base', 'secret lair', 'apartment', 'mansion', 'underground', 'space station', 'suburban home', 'rural farm', 'floating city', 'underwater base', 'mountain retreat', 'desert hideout', 'forest cabin', 'castle', 'temple', 'laboratory', 'hospital', 'school', 'prison', 'palace', 'ship', 'dimension', 'alternate reality'], category: 'background' },
      { id: 'training_background', name: 'Training Background', examples: ['military training', 'self-taught', 'mentor guidance', 'academic education', 'street experience', 'alien training', 'monastic discipline', 'assassin training', 'magical apprenticeship', 'scientific research', 'combat academy', 'survival training', 'espionage school', 'martial arts dojo', 'university education', 'apprenticeship', 'boot camp', 'special forces', 'ninja training', 'wizard school'], category: 'background' },
      { id: 'family_background', name: 'Family Background', examples: ['orphan', 'noble family', 'working class', 'wealthy family', 'adopted', 'single parent', 'large family', 'estranged', 'close-knit', 'dysfunctional', 'royal bloodline', 'criminal family', 'scientific family', 'military family', 'magical lineage', 'alien heritage', 'mixed heritage', 'unknown parentage'], category: 'background' },
      { id: 'education', name: 'Education', examples: ['self-educated', 'high school', 'college degree', 'graduate school', 'technical training', 'apprenticeship', 'military academy', 'magical school', 'alien education', 'street smarts', 'online courses', 'mentor training', 'experiential learning', 'formal education', 'informal education', 'specialized training'], category: 'background' }
    ],
    style: [
      { id: 'art_style', name: 'Art Style', examples: ['cypherpunk', 'classic superhero', 'gothic', 'futuristic', 'retro', 'modern', 'anime-inspired', 'realistic', 'cartoon', 'comic book', 'manga', 'noir', 'fantasy', 'sci-fi', 'horror', 'romance', 'action', 'drama', 'comedy', 'western', 'steampunk', 'post-apocalyptic', 'medieval', 'renaissance', 'art deco', 'minimalist', 'expressionist', 'impressionist'], category: 'style' },
      { id: 'color_palette', name: 'Color Palette', examples: ['neon blues and purples', 'red and black', 'gold and blue', 'green and silver', 'monochrome', 'rainbow', 'earth tones', 'pastels', 'vibrant colors', 'muted colors', 'warm colors', 'cool colors', 'complementary colors', 'analogous colors', 'triadic colors', 'split-complementary', 'grayscale', 'sepia', 'high contrast', 'low contrast'], category: 'style' },
      { id: 'lighting_style', name: 'Lighting Style', examples: ['dramatic shadows', 'bright heroic lighting', 'neon glow', 'moody atmosphere', 'high contrast', 'soft lighting', 'backlighting', 'side lighting', 'top lighting', 'bottom lighting', 'rim lighting', 'ambient lighting', 'spotlight', 'natural lighting', 'artificial lighting', 'colored lighting', 'firelight', 'moonlight', 'sunlight', 'starlight'], category: 'style' },
      { id: 'pose_style', name: 'Pose Style', examples: ['confident stance', 'stealth crouch', 'heroic pose', 'casual stance', 'combat ready', 'relaxed', 'action pose', 'dramatic pose', 'casual pose', 'formal pose', 'dynamic pose', 'static pose', 'flying pose', 'running pose', 'fighting pose', 'sitting pose', 'standing pose', 'kneeling pose', 'lying down', 'dancing pose'], category: 'style' },
      { id: 'clothing_style', name: 'Clothing Style', examples: ['superhero costume', 'casual wear', 'formal attire', 'military uniform', 'street clothes', 'fantasy armor', 'sci-fi suit', 'robes', 'leather jacket', 'business suit', 'athletic wear', 'gothic fashion', 'cypherpunk fashion', 'traditional clothing', 'modern fashion', 'vintage clothing', 'punk style', 'elegant dress', 'practical gear', 'ornate costume'], category: 'style' },
      { id: 'accessories', name: 'Accessories', examples: ['mask', 'cape', 'helmet', 'gloves', 'boots', 'belt', 'weapon', 'shield', 'jewelry', 'glasses', 'hat', 'scarf', 'backpack', 'pouch', 'holster', 'armor pieces', 'magical items', 'technological devices', 'symbols', 'badges', 'tattoos', 'piercings'], category: 'style' }
    ]
  });

  const [newVariable, setNewVariable] = useState({ category: '', name: '', examples: '' });
  const [editingVariable, setEditingVariable] = useState<any>(null);

  useEffect(() => {
    loadVariables();
  }, []);

  const loadVariables = () => {
    try {
      const savedVariables = localStorage.getItem('characterVariables');
      if (savedVariables) {
        setVariables(JSON.parse(savedVariables));
      }
    } catch (error) {
      console.error('Error loading variables:', error);
    }
  };

  const saveVariables = () => {
    try {
      localStorage.setItem('characterVariables', JSON.stringify(variables));
      alert('Character variables saved successfully!');
    } catch (error) {
      console.error('Error saving variables:', error);
      alert('Failed to save variables');
    }
  };

  const addVariable = () => {
    if (!newVariable.category || !newVariable.name || !newVariable.examples) {
      alert('Please fill in all fields');
      return;
    }

    const examples = newVariable.examples.split(',').map(ex => ex.trim()).filter(ex => ex);
    
    const newVar = {
      id: newVariable.name.toLowerCase().replace(/\s+/g, '_'),
      name: newVariable.name,
      examples: examples,
      category: newVariable.category
    };

    setVariables(prev => ({
      ...prev,
      [newVariable.category]: [...(prev[newVariable.category as keyof typeof prev] || []), newVar]
    }));

    setNewVariable({ category: '', name: '', examples: '' });
  };

  const updateVariable = (category: string, index: number, field: string, value: any) => {
    setVariables(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].map((var_: any, i: number) => 
        i === index ? { ...var_, [field]: value } : var_
      )
    }));
  };

  const deleteVariable = (category: string, index: number) => {
    setVariables(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const addExample = (category: string, index: number, example: string) => {
    if (!example.trim()) return;
    
    setVariables(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].map((var_: any, i: number) => 
        i === index ? { ...var_, examples: [...var_.examples, example.trim()] } : var_
      )
    }));
  };

  const removeExample = (category: string, varIndex: number, exampleIndex: number) => {
    setVariables(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].map((var_: any, i: number) => 
        i === varIndex ? { ...var_, examples: var_.examples.filter((_: any, j: number) => j !== exampleIndex) } : var_
      )
    }));
  };

  const renderVariableSection = (category: string, title: string, icon: string) => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h3 className="text-xl font-bold mb-4 text-purple-300">{icon} {title}</h3>
      <div className="space-y-4">
        {variables[category as keyof typeof variables]?.map((variable: any, index: number) => (
          <div key={variable.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">{variable.name}</h4>
                <div className="flex gap-2 flex-wrap">
                  {variable.examples.map((example: string, exampleIndex: number) => (
                    <span 
                      key={exampleIndex}
                      className="px-2 py-1 bg-purple-600/30 rounded text-xs text-purple-300"
                    >
                      {example}
                      <button
                        onClick={() => removeExample(category, index, exampleIndex)}
                        className="ml-1 text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingVariable({ category, index, variable })}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVariable(category, index)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            
            {/* Add new example */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new example..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addExample(category, index, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  addExample(category, index, input.value);
                  input.value = '';
                }}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <button onClick={() => router.push('/characters/config')} className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          ← Back to Character Config
        </button>
        <h1 className="text-4xl font-bold mb-4 text-center">Character Variables</h1>
        <p className="text-center text-gray-300">Define character traits, powers, and appearance options</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Add New Variable */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">➕ Add New Variable</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Category</label>
              <select 
                value={newVariable.category}
                onChange={(e) => setNewVariable(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="character">Character</option>
                <option value="appearance">Appearance</option>
                <option value="powers">Powers</option>
                <option value="personality">Personality</option>
                <option value="background">Background</option>
                <option value="style">Style</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Variable Name</label>
              <input
                type="text"
                value={newVariable.name}
                onChange={(e) => setNewVariable(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Hair Style, Power Level..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Examples (comma-separated)</label>
              <input
                type="text"
                value={newVariable.examples}
                onChange={(e) => setNewVariable(prev => ({ ...prev, examples: e.target.value }))}
                placeholder="e.g., short, long, spiky, curly..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={addVariable}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
          >
            Add Variable
          </button>
        </div>

        {/* Variable Categories */}
        <div className="space-y-8">
          {renderVariableSection('character', 'Character', '👤')}
          {renderVariableSection('appearance', 'Appearance', '🎨')}
          {renderVariableSection('powers', 'Powers', '⚡')}
          {renderVariableSection('personality', 'Personality', '🧠')}
          {renderVariableSection('background', 'Background', '📚')}
          {renderVariableSection('style', 'Style', '🎭')}
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={saveVariables}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold text-lg"
          >
            💾 Save Variables
          </button>
        </div>
      </div>

      {/* Edit Variable Modal */}
      {editingVariable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Edit Variable</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editingVariable.variable.name}
                  onChange={(e) => setEditingVariable((prev: any) => ({
                    ...prev,
                    variable: { ...prev.variable, name: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">Examples</label>
                <textarea
                  value={editingVariable.variable.examples.join(', ')}
                  onChange={(e) => setEditingVariable((prev: any) => ({
                    ...prev,
                    variable: { 
                      ...prev.variable, 
                      examples: e.target.value.split(',').map(ex => ex.trim()).filter(ex => ex)
                    }
                  }))}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => {
                  updateVariable(editingVariable.category, editingVariable.index, 'name', editingVariable.variable.name);
                  updateVariable(editingVariable.category, editingVariable.index, 'examples', editingVariable.variable.examples);
                  setEditingVariable(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setEditingVariable(null)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 