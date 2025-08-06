const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please ensure you have:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up One-Shot Comics database...\n');

  try {
    // Create comics table
    console.log('📚 Creating comics table...');
    const { error: comicsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS comics (
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
      `
    });
    
    if (comicsError) {
      console.log('⚠️  Comics table already exists or error:', comicsError.message);
    } else {
      console.log('✅ Comics table created');
    }

    // Create characters table
    console.log('🦸‍♂️ Creating characters table...');
    const { error: charactersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS characters (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          alias VARCHAR(255),
          description TEXT,
          powers TEXT[],
          series VARCHAR(255) NOT NULL,
          alignment VARCHAR(50) CHECK (alignment IN ('Hero', 'Anti-Hero', 'Villain')),
          avatar_image TEXT,
          is_new BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (charactersError) {
      console.log('⚠️  Characters table already exists or error:', charactersError.message);
    } else {
      console.log('✅ Characters table created');
    }

    // Create series table
    console.log('📖 Creating series table...');
    const { error: seriesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS series (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          issues INTEGER DEFAULT 1,
          status VARCHAR(50) DEFAULT 'Ongoing' CHECK (status IN ('Ongoing', 'Completed', 'Limited')),
          genre VARCHAR(100),
          cover_image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (seriesError) {
      console.log('⚠️  Series table already exists or error:', seriesError.message);
    } else {
      console.log('✅ Series table created');
    }

    // Create stories table
    console.log('📝 Creating stories table...');
    const { error: storiesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS stories (
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
      `
    });
    
    if (storiesError) {
      console.log('⚠️  Stories table already exists or error:', storiesError.message);
    } else {
      console.log('✅ Stories table created');
    }

    // Create scripts table
    console.log('✍️ Creating scripts table...');
    const { error: scriptsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS scripts (
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
      `
    });
    
    if (scriptsError) {
      console.log('⚠️  Scripts table already exists or error:', scriptsError.message);
    } else {
      console.log('✅ Scripts table created');
    }

    // Create artwork table
    console.log('🎨 Creating artwork table...');
    const { error: artworkError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS artwork (
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
      `
    });
    
    if (artworkError) {
      console.log('⚠️  Artwork table already exists or error:', artworkError.message);
    } else {
      console.log('✅ Artwork table created');
    }

    // Create NFTs table
    console.log('🪙 Creating NFTs table...');
    const { error: nftsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS nfts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          comic_id INTEGER REFERENCES comics(id),
          token_id VARCHAR(255) UNIQUE NOT NULL,
          wallet_address VARCHAR(255) NOT NULL,
          minted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          transaction_hash VARCHAR(255),
          status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('minted', 'pending', 'failed')),
          rarity VARCHAR(50) DEFAULT 'Common' CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (nftsError) {
      console.log('⚠️  NFTs table already exists or error:', nftsError.message);
    } else {
      console.log('✅ NFTs table created');
    }

    // Create market_items table
    console.log('🛒 Creating market_items table...');
    const { error: marketError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS market_items (
          id SERIAL PRIMARY KEY,
          nft_id UUID REFERENCES nfts(id),
          seller_address VARCHAR(255) NOT NULL,
          price VARCHAR(50) NOT NULL,
          original_price VARCHAR(50),
          listed_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (marketError) {
      console.log('⚠️  Market items table already exists or error:', marketError.message);
    } else {
      console.log('✅ Market items table created');
    }

    console.log('\n🎉 Database setup completed!');
    console.log('You can now use the application with real data from Supabase.');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    console.log('\n💡 Alternative: You can manually run the SQL from database-schema.sql in your Supabase dashboard');
  }
}

setupDatabase(); 