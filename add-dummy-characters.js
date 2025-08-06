// Script to add dummy characters to localStorage for story generation
// Run this in the browser console on the characters/library page

const dummyCharacters = [
  {
    id: "char_001",
    name: "Phoenix",
    type: "hero",
    powers: "Flight, Fire Manipulation, Regeneration",
    description: "A powerful hero who can control fire and rise from ashes. Known for their determination and protective nature.",
    personality: "Brave, protective, determined, sometimes reckless",
    appearance: "Tall with fiery red hair, glowing orange eyes, wears a flame-patterned suit",
    backstory: "Born during a solar eclipse, Phoenix gained their powers from cosmic energy. They protect the city from fire-based threats.",
    series: "Quantum Paradox",
    createdAt: "2025-07-31T10:00:00.000Z"
  },
  {
    id: "char_002", 
    name: "Storm",
    type: "hero",
    powers: "Weather Control, Flight, Lightning Generation",
    description: "A weather-controlling hero who can summon storms and lightning. Calm and wise leader.",
    personality: "Wise, calm, strategic, protective of nature",
    appearance: "Medium height with silver hair, blue eyes, wears flowing blue and white costume",
    backstory: "Former meteorologist who gained weather powers during a freak storm. Now uses their abilities to protect the environment.",
    series: "Quantum Paradox",
    createdAt: "2025-07-31T11:00:00.000Z"
  },
  {
    id: "char_003",
    name: "Shadow",
    type: "hero", 
    powers: "Stealth, Shadow Manipulation, Enhanced Reflexes",
    description: "A mysterious vigilante who operates in the shadows. Master of stealth and information gathering.",
    personality: "Mysterious, observant, justice-driven, prefers to work alone",
    appearance: "Tall and lean, always in dark clothing, face partially hidden by shadows",
    backstory: "Former detective who turned to vigilantism after corruption in the police force. Now fights crime from the shadows.",
    series: "Street Justice",
    createdAt: "2025-07-30T09:00:00.000Z"
  },
  {
    id: "char_004",
    name: "Neon",
    type: "hero",
    powers: "Neural Interface, Digital Manipulation, Cyber Hacking",
    description: "A street hacker who can interface directly with any computer system through thought alone. Information broker and digital freedom fighter.",
    personality: "Rebellious, tech-savvy, freedom-loving, anti-establishment",
    appearance: "Young woman with neon-colored hair, cybernetic implants, wears street punk fashion with tech accessories",
    backstory: "Born in the digital age, Neon discovered her ability to hack any system without implants. Now fights corporate control of information.",
    series: "Cypherpunk Chronicles",
    createdAt: "2025-07-30T10:00:00.000Z"
  },
  {
    id: "char_005",
    name: "Circuit",
    type: "hero",
    powers: "Electronic Control, Device Manipulation, Energy Absorption",
    description: "A former corporate security officer who can control and manipulate electronic devices with his mind. Protector of digital freedom.",
    personality: "Analytical, determined, anti-establishment, protective of the innocent",
    appearance: "Partially robotic with glowing blue cybernetic parts, wears tactical gear with corporate insignia",
    backstory: "Former corporate security officer who was enhanced against their will. Now fights to free others from corporate control.",
    series: "Cypherpunk Chronicles",
    createdAt: "2025-07-30T11:00:00.000Z"
  },
  {
    id: "char_006",
    name: "Pulse",
    type: "hero",
    powers: "Electrical Manipulation, Bio-Electric Control, Healing",
    description: "A medical technician who can sense and manipulate electrical impulses in living beings. Healer and protector of life.",
    personality: "Compassionate, healing-focused, protective, sometimes conflicted about using powers for harm",
    appearance: "Medium height with electric blue hair, glowing green eyes, wears medical scrubs with tech enhancements",
    backstory: "Medical technician who discovered her ability to manipulate electrical impulses during an emergency. Now uses her powers to heal and protect.",
    series: "Cypherpunk Chronicles",
    createdAt: "2025-07-30T12:00:00.000Z"
  },
  {
    id: "char_007",
    name: "Void",
    type: "villain",
    powers: "Digital Corruption, Data Destruction, System Disruption",
    description: "A mysterious figure who can create digital 'black holes' that erase data and disrupt technology. Ultimate threat to the information economy.",
    personality: "Destructive, chaotic, anti-technology, seeks to destroy digital control",
    appearance: "Tall and imposing, surrounded by digital static, glowing red cybernetic eyes",
    backstory: "Once a brilliant programmer who was corrupted by corporate greed. Now seeks to destroy all digital control systems.",
    series: "Cypherpunk Chronicles",
    createdAt: "2025-07-30T13:00:00.000Z"
  },
  {
    id: "char_008",
    name: "Zara",
    type: "hero",
    powers: "Magic, Dimensional Travel, Elemental Control",
    description: "A powerful sorceress from another dimension. Protector of mystical realms.",
    personality: "Mystical, wise, compassionate, sometimes aloof",
    appearance: "Ethereal beauty with long flowing hair, glowing eyes, wears mystical robes",
    backstory: "Born in a realm of pure magic, Zara was chosen to protect the balance between dimensions.",
    series: "Mystic Realms",
    createdAt: "2025-07-30T14:00:00.000Z"
  },
  {
    id: "char_009",
    name: "Nova",
    type: "hero",
    powers: "Time Manipulation, Quantum Teleportation, Energy Projection",
    description: "A time-traveling hero with the ability to manipulate quantum particles. Guardian of the timeline.",
    personality: "Curious, adventurous, responsible, sometimes overwhelmed by possibilities",
    appearance: "Young with star-patterned skin, glowing eyes, wears a cosmic-themed suit",
    backstory: "Accidentally gained time powers during a quantum physics experiment. Now protects the timeline from temporal threats.",
    series: "Quantum Paradox",
    createdAt: "2025-07-30T15:00:00.000Z"
  },
  {
    id: "char_010",
    name: "Void",
    type: "villain",
    powers: "Dark Energy Manipulation, Teleportation, Fear Induction",
    description: "A mysterious villain who feeds on fear and darkness. Master of psychological warfare.",
    personality: "Manipulative, cruel, intelligent, enjoys causing fear",
    appearance: "Tall and imposing, surrounded by shadows, glowing red eyes",
    backstory: "Once a normal person who was corrupted by dark energy. Now seeks to spread fear and chaos.",
    series: "Street Justice",
    createdAt: "2025-07-30T16:00:00.000Z"
  },
  {
    id: "char_011",
    name: "Corruptor",
    type: "villain",
    powers: "Mind Control, Technology Manipulation, Corruption",
    description: "A corporate villain who can control minds and corrupt technology. Seeks total control.",
    personality: "Ambitious, ruthless, intelligent, obsessed with control",
    appearance: "Well-dressed businessman with glowing green eyes, always carrying advanced tech",
    backstory: "Former tech CEO who discovered mind-control technology. Now seeks to control the entire city.",
    series: "Cypherpunk Chronicles",
    createdAt: "2025-07-30T17:00:00.000Z"
  },
  {
    id: "char_012",
    name: "Nexus",
    type: "hero",
    powers: "Dimensional Portals, Energy Absorption, Reality Anchoring",
    description: "A hero who can create portals between dimensions and absorb energy. Protector of dimensional stability.",
    personality: "Stable, reliable, protective, sometimes distant due to dimensional awareness",
    appearance: "Tall with geometric patterns on skin, glowing portal-like eyes, wears dimensional armor",
    backstory: "Born at a dimensional nexus point, Nexus can sense and protect the stability of all dimensions.",
    series: "Mystic Realms",
    createdAt: "2025-07-30T18:00:00.000Z"
  },
  {
    id: "char_013",
    name: "Aether",
    type: "hero",
    powers: "Spirit Communication, Ethereal Manipulation, Soul Binding",
    description: "A mystic who can communicate with spirits and manipulate ethereal energy. Guardian of the spirit realm and protector of souls.",
    personality: "Mystical, wise, compassionate, sometimes haunted by spirit visions",
    appearance: "Medium height with ethereal white hair, glowing violet eyes, wears spirit-touched robes",
    backstory: "Born with the ability to see and communicate with spirits, Aether became the bridge between the living and the dead.",
    series: "Mystic Realms",
    createdAt: "2025-07-30T19:00:00.000Z"
  },
  {
    id: "char_014",
    name: "Chaos",
    type: "villain",
    powers: "Reality Distortion, Chaos Magic, Random Power Generation",
    description: "A chaotic villain who can distort reality and create random magical effects. Unpredictable and dangerous.",
    personality: "Unpredictable, chaotic, destructive, enjoys causing mayhem",
    appearance: "Constantly shifting appearance, colorful and chaotic, impossible to focus on",
    backstory: "Born from pure chaos energy, this villain exists to disrupt order and create chaos wherever they go.",
    series: "Mystic Realms",
    createdAt: "2025-07-30T20:00:00.000Z"
  },
  {
    id: "char_015",
    name: "Tempus",
    type: "villain",
    powers: "Time Manipulation, Age Control, Temporal Paradoxes",
    description: "A time-manipulating villain who can age people rapidly or reverse time. Seeks to control history.",
    personality: "Arrogant, power-hungry, manipulative, obsessed with time",
    appearance: "Aging rapidly and reversing, sometimes young, sometimes ancient, wears time-themed armor",
    backstory: "Former scientist who discovered time manipulation but was corrupted by the power. Now seeks to rewrite history.",
    series: "Quantum Paradox",
    createdAt: "2025-07-30T21:00:00.000Z"
  },
  {
    id: "char_016",
    name: "Mirage",
    type: "villain",
    powers: "Illusions, Shapeshifting, Mind Manipulation",
    description: "A master of deception who can create perfect illusions and manipulate minds. Expert at psychological warfare.",
    personality: "Deceptive, manipulative, intelligent, enjoys playing mind games",
    appearance: "Constantly changing appearance, impossible to pin down, always seems to be someone else",
    backstory: "Former stage magician who discovered real magical powers. Now uses them to deceive and manipulate.",
    series: "Street Justice",
    createdAt: "2025-07-30T22:00:00.000Z"
  },
  {
    id: "char_017",
    name: "Shadow",
    type: "hero",
    powers: "Stealth, Shadow Manipulation, Enhanced Reflexes",
    description: "A stealth warrior who combines traditional ninja techniques with punk rebellion. Master of stealth and information gathering.",
    personality: "Mysterious, observant, justice-driven, prefers to work alone",
    appearance: "Young woman with dark brown hair and neon blue highlights, wears ninja suit with punk accents",
    backstory: "Trained in traditional ninja arts but rebelled against the rigid hierarchy. Now fights for freedom and justice.",
    series: "Ninja Punk Girls",
    createdAt: "2025-07-30T23:00:00.000Z"
  },
  {
    id: "char_018",
    name: "Blade",
    type: "hero",
    powers: "Weapon Mastery, Combat Enhancement, Tactical Analysis",
    description: "A weapon master who combines traditional martial arts with modern combat techniques. Expert in all forms of weaponry.",
    personality: "Fierce, determined, strategic, protective of her team",
    appearance: "Young woman with black spiky hair and neon green highlights, wears combat suit with weapon patterns",
    backstory: "Mastered every weapon known to ninja culture and then some. Now uses her skills to fight for freedom.",
    series: "Ninja Punk Girls",
    createdAt: "2025-07-31T00:00:00.000Z"
  },
  {
    id: "char_019",
    name: "Echo",
    type: "hero",
    powers: "Sonic Manipulation, Sound Amplification, Rhythm Control",
    description: "A sonic warrior who can manipulate sound and create powerful sonic attacks. Uses music as both weapon and inspiration.",
    personality: "Energetic, creative, rebellious, inspires others through music",
    appearance: "Young woman with purple hair and neon pink highlights, wears sonic suit with sound wave patterns",
    backstory: "Discovered her sonic abilities through music and rebellion. Now uses sound to fight for freedom and inspire others.",
    series: "Ninja Punk Girls",
    createdAt: "2025-07-31T01:00:00.000Z"
  },
  {
    id: "char_020",
    name: "Void",
    type: "hero",
    powers: "Portal Creation, Dimensional Travel, Spatial Manipulation",
    description: "A portal master who can create gateways between locations and dimensions. Uses her abilities for strategic advantage.",
    personality: "Mysterious, calculated, independent, always thinking ahead",
    appearance: "Young woman with white hair and neon blue highlights, wears portal suit with dimensional patterns",
    backstory: "Born with the ability to create portals, she uses her powers to help the team move freely and escape danger.",
    series: "Ninja Punk Girls",
    createdAt: "2025-07-31T02:00:00.000Z"
  }
];

// Function to add characters to localStorage
function addDummyCharacters() {
  try {
    // Get existing characters
    const existingCharacters = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
    
    // Add new characters (avoiding duplicates by ID)
    const existingIds = existingCharacters.map(char => char.id);
    const newCharacters = dummyCharacters.filter(char => !existingIds.includes(char.id));
    
    // Combine existing and new characters
    const allCharacters = [...existingCharacters, ...newCharacters];
    
    // Save to localStorage
    localStorage.setItem('characterProfiles', JSON.stringify(allCharacters));
    
    console.log(`✅ Added ${newCharacters.length} new characters to library`);
    console.log('📚 Total characters in library:', allCharacters.length);
    
    // Show summary
    const heroes = allCharacters.filter(char => char.type === 'hero').length;
    const villains = allCharacters.filter(char => char.type === 'villain').length;
    console.log(`👥 Heroes: ${heroes} | 👿 Villains: ${villains}`);
    
    return allCharacters;
  } catch (error) {
    console.error('❌ Error adding dummy characters:', error);
    return null;
  }
}

// Function to clear all characters (for testing)
function clearAllCharacters() {
  if (confirm('Are you sure you want to clear all characters?')) {
    localStorage.removeItem('characterProfiles');
    console.log('🗑️ All characters cleared from library');
  }
}

// Function to show current characters
function showCurrentCharacters() {
  const characters = JSON.parse(localStorage.getItem('characterProfiles') || '[]');
  console.log('📚 Current characters in library:', characters.length);
  characters.forEach(char => {
    console.log(`- ${char.name} (${char.type}) - ${char.series}`);
  });
}

// Export functions to global scope
window.addDummyCharacters = addDummyCharacters;
window.clearAllCharacters = clearAllCharacters;
window.showCurrentCharacters = showCurrentCharacters;

console.log('🎭 Dummy character script loaded!');
console.log('Available functions:');
console.log('- addDummyCharacters() - Add dummy characters to library');
console.log('- clearAllCharacters() - Clear all characters');
console.log('- showCurrentCharacters() - Show current characters');

// Auto-run if you want
// addDummyCharacters(); 