import { supabase, Comic, Series, Character, Story, Script, Artwork, NFT } from './supabase';

// Fallback data for when Supabase is not available
const fallbackComics: Comic[] = [
  {
    id: 1,
    title: "Quantum Paradox #1",
    subtitle: "The Quantum Awakening",
    series: "Quantum Paradox",
    issue: 1,
    price: "0.05 ETH",
    author: "Alex Chen",
    artist: "Sarah Kim",
    pages: 24,
    status: "Available",
    cover_image: "/comic-covers/download-3.jpg",
    description: "Nova discovers her ability to manipulate time and must learn to control her powers before they consume her.",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    title: "Street Justice #3",
    subtitle: "Shadows of the City",
    series: "Street Justice",
    issue: 3,
    price: "0.04 ETH",
    author: "Marcus Rodriguez",
    artist: "David Park",
    pages: 22,
    status: "Available",
    cover_image: "/comic-covers/download-4.jpg",
    description: "Shadow faces his greatest challenge yet when a new crime syndicate threatens to take over the city.",
    created_at: "2024-01-02T00:00:00.000Z",
    updated_at: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    title: "Mystic Realms #5",
    subtitle: "The Mystic's Call",
    series: "Mystic Realms",
    issue: 5,
    price: "0.06 ETH",
    author: "Emma Thompson",
    artist: "Lisa Wang",
    pages: 26,
    status: "Coming Soon",
    cover_image: "/comic-covers/download-5.jpg",
    description: "Zara is summoned to protect the realm from an ancient evil that has awakened from its slumber.",
    created_at: "2024-01-03T00:00:00.000Z",
    updated_at: "2024-01-03T00:00:00.000Z"
  }
];

// Fallback characters with new character highlighting
const fallbackCharacters: Character[] = [
  // QUANTUM PARADOX SERIES
  {
    id: 1,
    name: "Nova",
    alias: "The Time Weaver",
    description: "A time-traveling hero with the ability to manipulate quantum particles. Guardian of the timeline.",
    powers: ["Time Manipulation", "Quantum Teleportation", "Energy Projection"],
    series: "Quantum Paradox",
    alignment: "Hero",
    avatar_image: "/character-images/quantum-paradox/nova/nova-main.jpg",
    is_new: true,
    created_at: "2024-01-15T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Phoenix",
    alias: "The Flame Guardian",
    description: "A powerful hero who can control fire and rise from ashes. Known for their determination and protective nature.",
    powers: ["Flight", "Fire Manipulation", "Regeneration"],
    series: "Quantum Paradox",
    alignment: "Hero",
    avatar_image: "/character-images/quantum-paradox/phoenix/phoenix-main.jpg",
    is_new: true,
    created_at: "2024-01-16T00:00:00.000Z"
  },
  {
    id: 3,
    name: "Storm",
    alias: "The Weather Master",
    description: "A weather-controlling hero who can summon storms and lightning. Calm and wise leader.",
    powers: ["Weather Control", "Flight", "Lightning Generation"],
    series: "Quantum Paradox",
    alignment: "Hero",
    avatar_image: "/character-images/quantum-paradox/storm/storm-main.jpg",
    is_new: false,
    created_at: "2024-01-10T00:00:00.000Z"
  },
  {
    id: 4,
    name: "Tempus",
    alias: "The Time Corruptor",
    description: "A time-manipulating villain who can age people rapidly or reverse time. Seeks to control history.",
    powers: ["Time Manipulation", "Age Control", "Temporal Paradoxes"],
    series: "Quantum Paradox",
    alignment: "Villain",
    avatar_image: "/character-images/quantum-paradox/tempus/tempus-main.jpg",
    is_new: false,
    created_at: "2024-01-11T00:00:00.000Z"
  },

  // CYPHERPUNK CHRONICLES SERIES
  {
    id: 8,
    name: "Neon",
    alias: "The Digital Rebel",
    description: "A street hacker who can interface directly with any computer system through thought alone. Information broker and digital freedom fighter.",
    powers: ["Neural Interface", "Digital Manipulation", "Cyber Hacking"],
    series: "Cypherpunk Chronicles",
    alignment: "Hero",
    avatar_image: "/character-images/cypherpunk-chronicles/neon/neon-main.jpg",
    is_new: true,
    created_at: "2024-01-17T00:00:00.000Z"
  },
  {
    id: 9,
    name: "Circuit",
    alias: "The Tech Controller",
    description: "A former corporate security officer who can control and manipulate electronic devices with his mind. Protector of digital freedom.",
    powers: ["Electronic Control", "Device Manipulation", "Energy Absorption"],
    series: "Cypherpunk Chronicles",
    alignment: "Hero",
    avatar_image: "/character-images/cypherpunk-chronicles/circuit/circuit-main.jpg",
    is_new: true,
    created_at: "2024-01-18T00:00:00.000Z"
  },
  {
    id: 10,
    name: "Pulse",
    alias: "The Bio-Electric Healer",
    description: "A medical technician who can sense and manipulate electrical impulses in living beings. Healer and protector of life.",
    powers: ["Electrical Manipulation", "Bio-Electric Control", "Healing"],
    series: "Cypherpunk Chronicles",
    alignment: "Hero",
    avatar_image: "/character-images/cypherpunk-chronicles/pulse/pulse-main.jpg",
    is_new: true,
    created_at: "2024-01-19T00:00:00.000Z"
  },
  {
    id: 11,
    name: "Void",
    alias: "The Digital Destroyer",
    description: "A mysterious figure who can create digital 'black holes' that erase data and disrupt technology. Ultimate threat to the information economy.",
    powers: ["Digital Corruption", "Data Destruction", "System Disruption"],
    series: "Cypherpunk Chronicles",
    alignment: "Villain",
    avatar_image: "/character-images/cypherpunk-chronicles/void/void-main.jpg",
    is_new: false,
    created_at: "2024-01-20T00:00:00.000Z"
  },
  {
    id: 12,
    name: "Corruptor",
    alias: "The Mind Controller",
    description: "A corporate villain who can control minds and corrupt technology. Seeks total control.",
    powers: ["Mind Control", "Technology Manipulation", "Corruption"],
    series: "Cypherpunk Chronicles",
    alignment: "Villain",
    avatar_image: "/character-images/cypherpunk-chronicles/corruptor/corruptor-main.jpg",
    is_new: false,
    created_at: "2024-01-21T00:00:00.000Z"
  },
  {
    id: 13,
    name: "Cyber",
    alias: "The Digital Warrior",
    description: "A cyborg warrior with advanced cybernetic enhancements. Protector of digital freedom and human rights.",
    powers: ["Cybernetic Enhancement", "Combat Systems", "Digital Interface"],
    series: "Cypherpunk Chronicles",
    alignment: "Hero",
    avatar_image: "/character-images/cypherpunk-chronicles/cyber/cyber-main.jpg",
    is_new: true,
    created_at: "2024-01-22T00:00:00.000Z"
  },

  // MYSTIC REALMS SERIES
  {
    id: 14,
    name: "Zara",
    alias: "The Dimensional Sorceress",
    description: "A powerful sorceress from another dimension. Protector of mystical realms.",
    powers: ["Magic", "Dimensional Travel", "Elemental Control"],
    series: "Mystic Realms",
    alignment: "Hero",
    avatar_image: "/character-images/mystic-realms/zara/zara-main.jpg",
    is_new: false,
    created_at: "2024-01-23T00:00:00.000Z"
  },
  {
    id: 15,
    name: "Nexus",
    alias: "The Dimensional Guardian",
    description: "A hero who can create portals between dimensions and absorb energy. Protector of dimensional stability.",
    powers: ["Dimensional Portals", "Energy Absorption", "Reality Anchoring"],
    series: "Mystic Realms",
    alignment: "Hero",
    avatar_image: "/character-images/mystic-realms/nexus/nexus-main.jpg",
    is_new: true,
    created_at: "2024-01-24T00:00:00.000Z"
  },
  {
    id: 16,
    name: "Aether",
    alias: "The Spirit Guardian",
    description: "A mystic who can communicate with spirits and manipulate ethereal energy. Guardian of the spirit realm and protector of souls.",
    powers: ["Spirit Communication", "Ethereal Manipulation", "Soul Binding"],
    series: "Mystic Realms",
    alignment: "Hero",
    avatar_image: "/character-images/mystic-realms/aether/aether-1.jpg",
    is_new: true,
    created_at: "2024-01-25T00:00:00.000Z"
  },
  {
    id: 17,
    name: "Chaos",
    alias: "The Reality Distorter",
    description: "A chaotic villain who can distort reality and create random magical effects. Unpredictable and dangerous.",
    powers: ["Reality Distortion", "Chaos Magic", "Random Power Generation"],
    series: "Mystic Realms",
    alignment: "Villain",
    avatar_image: "/character-images/mystic-realms/chaos/chaos-main.jpg",
    is_new: false,
    created_at: "2024-01-26T00:00:00.000Z"
  },

  // NINJA PUNK GIRLS SERIES
  {
    id: 18,
    name: "Kunoichi",
    alias: "The Stealth Warrior",
    description: "A stealth warrior who combines traditional ninja techniques with punk rebellion. Master of stealth and information gathering.",
    powers: ["Stealth", "Shadow Manipulation", "Enhanced Reflexes"],
    series: "Ninja Punk Girls",
    alignment: "Hero",
    avatar_image: "/character-images/ninja-punk-girls/kunoichi/kunoichi-main.jpg",
    is_new: true,
    created_at: "2024-01-27T00:00:00.000Z"
  },
  {
    id: 19,
    name: "Neon Fist",
    alias: "The Weapon Master",
    description: "A weapon master who combines traditional martial arts with modern combat techniques. Expert in all forms of weaponry.",
    powers: ["Weapon Mastery", "Combat Enhancement", "Tactical Analysis"],
    series: "Ninja Punk Girls",
    alignment: "Hero",
    avatar_image: "/character-images/ninja-punk-girls/neon-fist/neon-fist-main.jpg",
    is_new: true,
    created_at: "2024-01-28T00:00:00.000Z"
  },
  {
    id: 20,
    name: "Shadow Blade",
    alias: "The Sonic Warrior",
    description: "A sonic warrior who can manipulate sound and create powerful sonic attacks. Uses music as both weapon and inspiration.",
    powers: ["Sonic Manipulation", "Sound Amplification", "Rhythm Control"],
    series: "Ninja Punk Girls",
    alignment: "Hero",
    avatar_image: "/character-images/ninja-punk-girls/shadow-blade/shadow-blade-main.jpg",
    is_new: true,
    created_at: "2024-01-29T00:00:00.000Z"
  }
];

// Helper function to check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return !!(url && key && url !== 'your_supabase_url_here' && key !== 'your_anon_key_here');
}

// Comics
export async function getComics(): Promise<Comic[]> {
  try {
    // Check if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - using fallback data. To connect to Supabase, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
      return fallbackComics;
    }

    const { data, error } = await supabase
      .from('oneshot_comics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comics from Supabase:', error);
      console.info('Using fallback data due to Supabase error');
      return fallbackComics;
    }
    
    return data || fallbackComics;
  } catch (error) {
    console.error('Exception fetching comics:', error);
    console.info('Using fallback data due to exception');
    return fallbackComics;
  }
}

export async function getComicById(id: number): Promise<Comic | null> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - cannot fetch specific comic');
      return null;
    }

    const { data, error } = await supabase
      .from('oneshot_comics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching comic by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching comic by ID:', error);
    return null;
  }
}

export async function createComic(comic: Omit<Comic, 'id' | 'created_at' | 'updated_at'>): Promise<Comic | null> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - cannot create comic');
      return null;
    }

    const { data, error } = await supabase
      .from('oneshot_comics')
      .insert([comic])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating comic:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Exception creating comic:', error);
    return null;
  }
}

// Series
export async function getSeries(): Promise<Series[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning empty series array');
      return [];
    }

    const { data, error } = await supabase
      .from('oneshot_series')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching series:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching series:', error);
    return [];
  }
}

// Characters
export async function getCharacters(): Promise<Character[]> {
  try {
    // Force use of fallback characters for now
    console.info('Using fallback characters - database integration pending');
    return fallbackCharacters;
    
    // Original code commented out for now
    /*
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - using fallback characters');
      return fallbackCharacters;
    }

    const { data, error } = await supabase
      .from('oneshot_characters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching characters:', error);
      console.info('Using fallback characters due to Supabase error');
      return fallbackCharacters;
    }
    return data || fallbackCharacters;
    */
  } catch (error) {
    console.error('Exception fetching characters:', error);
    console.info('Using fallback characters due to exception');
    return fallbackCharacters;
  }
}

export async function createCharacter(character: Omit<Character, 'id' | 'created_at'>): Promise<Character | null> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - cannot create character');
      return null;
    }

    const { data, error } = await supabase
      .from('oneshot_characters')
      .insert([{ ...character, is_new: true }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating character:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Exception creating character:', error);
    return null;
  }
}

// Stories
export async function getStories(): Promise<Story[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning empty stories array');
      return [];
    }

    const { data, error } = await supabase
      .from('oneshot_stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching stories:', error);
    return [];
  }
}

// Scripts
export async function getScripts(): Promise<Script[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning empty scripts array');
      return [];
    }

    const { data, error } = await supabase
      .from('oneshot_scripts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching scripts:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching scripts:', error);
    return [];
  }
}

// Artwork
export async function getArtwork(): Promise<Artwork[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning empty artwork array');
      return [];
    }

    const { data, error } = await supabase
      .from('oneshot_artwork')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artwork:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching artwork:', error);
    return [];
  }
}

// NFTs
export async function getNFTs(): Promise<NFT[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning empty NFTs array');
      return [];
    }

    const { data, error } = await supabase
      .from('oneshot_nfts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching NFTs:', error);
    return [];
  }
}

export async function createNFT(nft: Omit<NFT, 'id' | 'created_at'>): Promise<NFT | null> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - cannot create NFT');
      return null;
    }

    const { data, error } = await supabase
      .from('oneshot_nfts')
      .insert([nft])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating NFT:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Exception creating NFT:', error);
    return null;
  }
}

// Market Items
export async function getMarketItems(): Promise<Array<{
  id: number;
  nft_id: string;
  seller_address: string;
  price: string;
  original_price?: string;
  listed_date: string;
  status: string;
  created_at: string;
  nfts?: {
    id: string;
    token_id: string;
    rarity: string;
    wallet_address: string;
  };
}>> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning empty market items array');
      return [];
    }

    const { data, error } = await supabase
      .from('oneshot_market_items')
      .select(`
        *,
        nfts (
          id,
          token_id,
          rarity,
          wallet_address
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching market items:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching market items:', error);
    return [];
  }
}

// Minting Stats
export async function getMintingStats(): Promise<{
  totalMinted: number;
  recentMints: Array<{
    minted_at: string;
    status: string;
  }>;
  mintingStats: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}> {
  try {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured - returning default minting stats');
      return {
        totalMinted: 0,
        recentMints: [],
        mintingStats: {
          today: 0,
          thisWeek: 0,
          thisMonth: 0
        }
      };
    }

    const { data, error } = await supabase
      .from('oneshot_nfts')
      .select('minted_at, status')
      .eq('status', 'minted');

    if (error) {
      console.error('Error fetching minting stats:', error);
      return {
        totalMinted: 0,
        recentMints: [],
        mintingStats: {
          today: 0,
          thisWeek: 0,
          thisMonth: 0
        }
      };
    }

    const totalMinted = data?.length || 0;
    const recentMints = data?.slice(0, 10) || [];

    return {
      totalMinted,
      recentMints,
      mintingStats: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0
      }
    };
  } catch (error) {
    console.error('Exception fetching minting stats:', error);
    return {
      totalMinted: 0,
      recentMints: [],
      mintingStats: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0
      }
    };
  }
} 