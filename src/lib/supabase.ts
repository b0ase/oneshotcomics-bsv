import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client with fallback for missing environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types
export interface Comic {
  id: number;
  title: string;
  subtitle: string;
  series: string;
  issue: number;
  price: string;
  author: string;
  artist: string;
  pages: number;
  status: 'Available' | 'Coming Soon' | 'Sold Out';
  cover_image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Series {
  id: number;
  title: string;
  description: string;
  issues: number;
  status: 'Ongoing' | 'Completed' | 'Limited';
  genre: string;
  cover_image: string;
  created_at: string;
}

export interface Character {
  id: number;
  name: string;
  alias: string;
  description: string;
  powers: string[];
  series: string;
  alignment: 'Hero' | 'Anti-Hero' | 'Villain';
  avatar_image: string;
  is_new?: boolean;
  created_at: string;
}

export interface Story {
  id: number;
  title: string;
  series: string;
  issue: string;
  author: string;
  artist: string;
  publish_date: string;
  read_time: string;
  cover_image: string;
  description: string;
  created_at: string;
}

export interface Script {
  id: number;
  title: string;
  series: string;
  issue: string;
  author: string;
  status: 'Final Draft' | 'In Review' | 'First Draft' | 'In Progress' | 'Outline';
  last_modified: string;
  pages: number;
  description: string;
  cover_image: string;
  created_at: string;
}

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  series: string;
  type: string;
  description: string;
  image_url: string;
  date: string;
  status: 'Final' | 'Concept' | 'Study' | 'Variations';
  created_at: string;
}

export interface NFT {
  id: string;
  comic_id: number;
  token_id: string;
  wallet_address: string;
  minted_at: string;
  transaction_hash: string;
  status: 'minted' | 'pending' | 'failed';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  created_at: string;
} 