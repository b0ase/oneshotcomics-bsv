# Database Setup for One-Shot Comics

## Overview
This project uses a shared database at `b0ase.com` rather than a dedicated Supabase project. All table names are namespaced with `oneshot_` prefix to avoid conflicts with other projects.

## Safe to Run
✅ **This SQL is safe to run in your shared database** - all tables use the `oneshot_` prefix to avoid conflicts.

## Quick Setup

1. **Copy the SQL** from `database-schema.sql`
2. **Paste it into your b0ase.com database** (via your preferred SQL interface)
3. **Run the SQL** - it will create all necessary tables with sample data

## Tables Created

| Table Name | Purpose | Sample Data |
|------------|---------|-------------|
| `oneshot_comics` | Comic books and issues | 3 sample comics |
| `oneshot_characters` | Character profiles | 4 characters (2 marked as new) |
| `oneshot_series` | Comic series | 3 series |
| `oneshot_stories` | Story content | Empty (ready for content) |
| `oneshot_scripts` | Script drafts | Empty (ready for content) |
| `oneshot_artwork` | Artwork and illustrations | Empty (ready for content) |
| `oneshot_nfts` | NFT tokens | Empty (ready for minting) |
| `oneshot_market_items` | Marketplace listings | Empty (ready for trading) |
| `oneshot_users` | User profiles | Empty (ready for auth) |
| `oneshot_user_collections` | User NFT collections | Empty (ready for collections) |

## Features Included

- **✅ Namespaced Tables** - All tables use `oneshot_` prefix
- **✅ Sample Data** - Comics, characters, and series with realistic content
- **✅ New Character Highlighting** - Characters marked with `is_new: true` will flash
- **✅ Proper Relationships** - Foreign keys between related tables
- **✅ Data Validation** - Check constraints for status fields
- **✅ Timestamps** - Created/updated timestamps on all tables

## After Setup

Once you run the SQL:
1. The application will connect to real data instead of fallback data
2. New characters will show the flashing effect
3. All API endpoints will work with the database
4. You can start adding real content through the application

## Troubleshooting

If you get errors:
- **Table already exists**: The `IF NOT EXISTS` clause will skip existing tables
- **Permission errors**: Make sure you have CREATE TABLE permissions
- **Connection issues**: Verify your Supabase environment variables are correct

## Sample Data

The setup includes:
- **3 Comics**: Quantum Paradox, Street Justice, Mystic Realms
- **4 Characters**: Nova, Shadow, Zara, Void (Nova & Shadow marked as new)
- **3 Series**: With descriptions and genres

All sample data uses your existing comic cover images from `/public/comic-covers/`. 