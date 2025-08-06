# Environment Setup Guide

## Supabase Configuration

To connect your One-Shot Comics application to Supabase, you need to set up environment variables.

### 1. Create Environment File

Create a `.env.local` file in the root of your project:

```bash
# Create the environment file
touch .env.local
```

### 2. Add Supabase Configuration

Add the following variables to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://klaputzxeqgypphzdxpr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here

# API Configuration (optional)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to Settings → API
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Database Setup

If you haven't set up your database tables yet, you can use the provided schema:

```bash
# Run the database schema
psql -h your-supabase-host -U postgres -d postgres -f database-schema.sql
```

Or use the Supabase Dashboard:
1. Go to SQL Editor
2. Copy and paste the contents of `database-schema.sql`
3. Execute the SQL

### 5. Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## Current Status

### ✅ Working Features (with fallback data)
- Comics page displays fallback comic data
- All pages load without errors
- Application functions normally

### ⚠️ Limited Features (without Supabase)
- No real-time data persistence
- No user authentication
- No dynamic content updates
- No NFT minting functionality

### 🔧 To Enable Full Features
1. Set up Supabase environment variables
2. Create database tables
3. Restart the application

## Troubleshooting

### Error: "Error fetching comics: {}"
This error occurs when Supabase is not properly configured. The application will automatically use fallback data.

**Solution:**
1. Check that `.env.local` exists in the project root
2. Verify your Supabase URL and key are correct
3. Ensure the environment variables start with `NEXT_PUBLIC_`
4. Restart the development server

### Error: "Supabase not configured"
This is an informational message, not an error. The application is working correctly with fallback data.

### Environment Variables Not Loading
1. Make sure the file is named `.env.local` (not `.env`)
2. Verify the variables start with `NEXT_PUBLIC_`
3. Restart the development server
4. Check that the file is in the project root directory

## Development vs Production

### Development
- Use `.env.local` for local development
- Variables are loaded automatically by Next.js
- Changes require server restart

### Production
- Set environment variables in your hosting platform
- For Vercel: Add in Project Settings → Environment Variables
- For Netlify: Add in Site Settings → Environment Variables

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Only use the `anon` key for client-side code
- Keep your `service_role` key secure and server-side only

## Example .env.local

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Next Steps

Once Supabase is configured:
1. The application will connect to your database
2. Real-time data will be available
3. User authentication can be implemented
4. NFT minting functionality will work
5. Dynamic content updates will be enabled 