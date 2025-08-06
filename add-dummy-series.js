// Script to add dummy series to localStorage for story generation
// Run this in the browser console on the series page

const dummySeries = [
  {
    id: "series_001",
    name: "Quantum Paradox",
    description: "A time-traveling hero series with quantum physics themes. Features heroes who can manipulate time and space.",
    genre: "Sci-Fi",
    artStyle: "Modern Comic",
    tone: "Epic",
    setting: "Modern day with time travel elements",
    targetAudience: "Teen to Adult",
    themes: ["Time travel", "Quantum physics", "Destiny vs free will", "Scientific discovery"],
    mainCharacters: ["Nova", "Phoenix", "Storm", "Tempus"],
    createdAt: "2025-07-30T08:00:00.000Z"
  },
  {
    id: "series_002",
    name: "Street Justice",
    description: "A gritty urban vigilante series set in a corrupt city. Features heroes fighting crime from the shadows.",
    genre: "Action",
    artStyle: "Dark Realistic",
    tone: "Gritty",
    setting: "Modern urban city",
    targetAudience: "Adult",
    themes: ["Justice", "Corruption", "Vigilantism", "Urban crime"],
    mainCharacters: ["Shadow", "Void", "Mirage"],
    createdAt: "2025-07-30T09:00:00.000Z"
  },
  {
    id: "series_003",
    name: "Cypherpunk Chronicles",
    description: "A dystopian future series where technology and humanity collide. Features cyborgs and corporate warfare.",
    genre: "Cypherpunk",
    artStyle: "Futuristic",
    tone: "Dark",
    setting: "Future dystopian city",
    targetAudience: "Adult",
    themes: ["Technology", "Corporate control", "Human enhancement", "Resistance"],
    mainCharacters: ["Cyber", "Corruptor"],
    createdAt: "2025-07-30T10:00:00.000Z"
  },
  {
    id: "series_004",
    name: "Mystic Realms",
    description: "A fantasy series with magic and dimensional travel. Features sorcerers and mystical creatures.",
    genre: "Fantasy",
    artStyle: "Fantasy Art",
    tone: "Epic",
    setting: "Multiple mystical dimensions",
    targetAudience: "All Ages",
    themes: ["Magic", "Dimensional travel", "Good vs evil", "Mystical balance"],
    mainCharacters: ["Zara", "Nexus", "Chaos"],
    createdAt: "2025-07-30T11:00:00.000Z"
  },
  {
    id: "series_005",
    name: "Ninja Punk Girls",
    description: "A modern martial arts series featuring female ninjas in a punk aesthetic. Combines traditional ninja skills with modern style.",
    genre: "Martial Arts",
    artStyle: "Anime-Inspired",
    tone: "Action-Packed",
    setting: "Modern city with hidden ninja clans",
    targetAudience: "Teen to Adult",
    themes: ["Female empowerment", "Martial arts", "Tradition vs modernity", "Sisterhood"],
    mainCharacters: ["Kunoichi", "Shadow Blade", "Neon Fist"],
    createdAt: "2025-07-30T12:00:00.000Z"
  }
];

// Function to add series to localStorage
function addDummySeries() {
  try {
    // Get existing series
    const existingSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');
    
    // Add new series (avoiding duplicates by ID)
    const existingIds = existingSeries.map(series => series.id);
    const newSeries = dummySeries.filter(series => !existingIds.includes(series.id));
    
    // Combine existing and new series
    const allSeries = [...existingSeries, ...newSeries];
    
    // Save to localStorage
    localStorage.setItem('savedSeries', JSON.stringify(allSeries));
    
    console.log(`✅ Added ${newSeries.length} new series to library`);
    console.log('📚 Total series in library:', allSeries.length);
    
    // Show summary
    allSeries.forEach(series => {
      console.log(`- ${series.name} (${series.genre})`);
    });
    
    return allSeries;
  } catch (error) {
    console.error('❌ Error adding dummy series:', error);
    return null;
  }
}

// Function to clear all series (for testing)
function clearAllSeries() {
  if (confirm('Are you sure you want to clear all series?')) {
    localStorage.removeItem('savedSeries');
    console.log('🗑️ All series cleared from library');
  }
}

// Function to show current series
function showCurrentSeries() {
  const series = JSON.parse(localStorage.getItem('savedSeries') || '[]');
  console.log('📚 Current series in library:', series.length);
  series.forEach(s => {
    console.log(`- ${s.name} (${s.genre}) - ${s.description.substring(0, 50)}...`);
  });
}

// Export functions to global scope
window.addDummySeries = addDummySeries;
window.clearAllSeries = clearAllSeries;
window.showCurrentSeries = showCurrentSeries;

console.log('📖 Dummy series script loaded!');
console.log('Available functions:');
console.log('- addDummySeries() - Add dummy series to library');
console.log('- clearAllSeries() - Clear all series');
console.log('- showCurrentSeries() - Show current series');

// Auto-run if you want
// addDummySeries(); 