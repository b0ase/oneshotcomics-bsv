# One-Shot Comics - Supabase Setup

## 🚀 Quick Setup

### 1. Environment Variables
Create a `.env.local` file in your project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL to create all tables and sample data

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

## 📊 Database Schema

The application uses the following tables:

- **comics** - Comic book issues with metadata
- **series** - Comic series information
- **characters** - Character profiles and powers
- **stories** - Story summaries and details
- **scripts** - Script management and status
- **artwork** - Artwork gallery and metadata
- **nfts** - Minted NFT records
- **market_items** - Marketplace listings
- **users** - User profiles (for future auth)
- **user_collections** - User NFT collections

## 🔧 Features

### ✅ Implemented
- [x] Supabase integration
- [x] Comics listing with real data
- [x] API routes for comics and minting
- [x] Database schema with sample data
- [x] TypeScript types for all entities
- [x] Error handling and logging

### 🚧 Next Steps
- [ ] Update all pages to use real data
- [ ] Add authentication with Supabase Auth
- [ ] Implement file uploads for artwork
- [ ] Add real-time features
- [ ] Integrate blockchain for actual minting

## 🎯 API Endpoints

- `GET /api/comics` - Fetch all comics
- `POST /api/comics` - Create new comic
- `GET /api/mint` - Get minting statistics
- `POST /api/mint` - Mint new NFTs

## 🛠️ Development

### Adding New Data
1. Update the TypeScript interfaces in `src/lib/supabase.ts`
2. Add data functions in `src/lib/data.ts`
3. Create API routes in `src/app/api/`
4. Update pages to use real data

### Database Changes
1. Update `database-schema.sql`
2. Run the SQL in Supabase
3. Update TypeScript interfaces
4. Update data functions

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public read access for content
- Authenticated write access for user data
- Input validation on all API endpoints

## 📱 Features Overview

- **Single Server Architecture** - No separate backend needed
- **Real-time Database** - Supabase with PostgreSQL
- **Type Safety** - Full TypeScript integration
- **Modern UI** - Tailwind CSS with responsive design
- **API Routes** - Built-in Next.js API endpoints
- **File Storage** - Supabase Storage for images
- **Authentication** - Ready for Supabase Auth

## 🚀 Deployment

The application is ready to deploy on:
- Vercel (recommended)
- Netlify
- Any platform supporting Next.js

Just add your environment variables and deploy! 