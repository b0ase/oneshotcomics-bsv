-- One-Shot Comics Database Schema
-- For shared database at b0ase.com - using namespaced table names

-- Comics table
CREATE TABLE IF NOT EXISTS oneshot_comics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    series VARCHAR(255) NOT NULL,
    issue INTEGER NOT NULL,
    price VARCHAR(50) NOT NULL,
    author VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    pages INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'Coming Soon' CHECK (status IN ('Available', 'Coming Soon', 'Sold Out')),
    cover_image TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Characters table
CREATE TABLE IF NOT EXISTS oneshot_characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    alias VARCHAR(255),
    description TEXT,
    powers TEXT[],
    series VARCHAR(255) NOT NULL,
    alignment VARCHAR(50) DEFAULT 'Hero' CHECK (alignment IN ('Hero', 'Anti-Hero', 'Villain')),
    avatar_image TEXT,
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Series table
CREATE TABLE IF NOT EXISTS oneshot_series (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issues INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'Ongoing' CHECK (status IN ('Ongoing', 'Completed', 'Limited')),
    genre VARCHAR(100),
    cover_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stories table
CREATE TABLE IF NOT EXISTS oneshot_stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    series VARCHAR(255) NOT NULL,
    issue VARCHAR(50),
    author VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    publish_date DATE,
    read_time VARCHAR(50),
    cover_image TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scripts table
CREATE TABLE IF NOT EXISTS oneshot_scripts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    series VARCHAR(255) NOT NULL,
    issue VARCHAR(50),
    author VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Outline' CHECK (status IN ('Final Draft', 'In Review', 'First Draft', 'In Progress', 'Outline')),
    last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    pages INTEGER DEFAULT 1,
    description TEXT,
    cover_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Artwork table
CREATE TABLE IF NOT EXISTS oneshot_artwork (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    series VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    description TEXT,
    image_url TEXT,
    date DATE,
    status VARCHAR(50) DEFAULT 'Concept' CHECK (status IN ('Final', 'Concept', 'Study', 'Variations')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFTs table
CREATE TABLE IF NOT EXISTS oneshot_nfts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    comic_id INTEGER REFERENCES oneshot_comics(id),
    token_id VARCHAR(255) UNIQUE NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    minted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    transaction_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('minted', 'pending', 'failed')),
    rarity VARCHAR(50) DEFAULT 'Common' CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market items table
CREATE TABLE IF NOT EXISTS oneshot_market_items (
    id SERIAL PRIMARY KEY,
    nft_id UUID REFERENCES oneshot_nfts(id),
    seller_address VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    original_price VARCHAR(50),
    listed_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (for future authentication)
CREATE TABLE IF NOT EXISTS oneshot_users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    email VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User collections table
CREATE TABLE IF NOT EXISTS oneshot_user_collections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES oneshot_users(id),
    nft_id UUID REFERENCES oneshot_nfts(id),
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, nft_id)
);

-- Sample data for testing
INSERT INTO oneshot_comics (title, subtitle, series, issue, price, author, artist, pages, status, cover_image, description) VALUES
('Quantum Paradox #1', 'The Quantum Awakening', 'Quantum Paradox', 1, '0.05 ETH', 'Alex Chen', 'Sarah Kim', 24, 'Available', '/comic-covers/download-3.jpg', 'Nova discovers her ability to manipulate time and must learn to control her powers before they consume her.'),
('Street Justice #3', 'Shadows of the City', 'Street Justice', 3, '0.04 ETH', 'Marcus Rodriguez', 'David Park', 22, 'Available', '/comic-covers/download-4.jpg', 'Shadow faces his greatest challenge yet when a new crime syndicate threatens to take over the city.'),
('Mystic Realms #5', 'The Mystic''s Call', 'Mystic Realms', 5, '0.06 ETH', 'Emma Thompson', 'Lisa Wang', 26, 'Coming Soon', '/comic-covers/download-5.jpg', 'Zara is summoned to protect the realm from an ancient evil that has awakened from its slumber.')
ON CONFLICT DO NOTHING;

INSERT INTO oneshot_characters (name, alias, description, powers, series, alignment, avatar_image, is_new, created_at) VALUES
('Nova', 'The Time Weaver', 'A young woman who discovered her ability to manipulate time after a mysterious accident. She struggles to control her powers while protecting those she loves.', ARRAY['Time Manipulation', 'Chronokinesis', 'Temporal Awareness'], 'Quantum Paradox', 'Hero', '/comic-covers/download-6.jpg', true, '2024-01-15T00:00:00.000Z'),
('Shadow', 'The Night Guardian', 'A former detective who became a vigilante after his family was killed by organized crime. He uses stealth and martial arts to fight corruption.', ARRAY['Stealth', 'Martial Arts', 'Detective Skills'], 'Street Justice', 'Anti-Hero', '/comic-covers/download-7.jpg', true, '2024-01-16T00:00:00.000Z'),
('Zara', 'The Mystic Guardian', 'A powerful sorceress chosen by ancient spirits to protect the mystical realm from dark forces that seek to destroy the balance of magic.', ARRAY['Elemental Magic', 'Spirit Communication', 'Protective Spells'], 'Mystic Realms', 'Hero', '/comic-covers/download-8.jpg', false, '2024-01-10T00:00:00.000Z'),
('Void', 'The Shadow Lord', 'A mysterious villain who can manipulate darkness and shadows. His true identity and motives remain unknown, but his power grows with each appearance.', ARRAY['Shadow Manipulation', 'Darkness Control', 'Fear Induction'], 'Quantum Paradox', 'Villain', '/comic-covers/download-9.jpg', false, '2024-01-05T00:00:00.000Z')
ON CONFLICT DO NOTHING;

INSERT INTO oneshot_series (title, description, issues, status, genre, cover_image) VALUES
('Quantum Paradox', 'A sci-fi series exploring time manipulation and quantum physics through the eyes of a young hero discovering her powers.', 3, 'Ongoing', 'Science Fiction', '/comic-covers/download-3.jpg'),
('Street Justice', 'A gritty urban vigilante story set in a corrupt city where one man fights for justice in the shadows.', 5, 'Ongoing', 'Crime', '/comic-covers/download-4.jpg'),
('Mystic Realms', 'A fantasy epic about magic, ancient spirits, and the battle between light and darkness in a mystical world.', 8, 'Ongoing', 'Fantasy', '/comic-covers/download-5.jpg')
ON CONFLICT DO NOTHING; 