import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Character ID to URL mapping for redirects
const characterRedirects: { [key: string]: string } = {
  '1': '/characters/quantum-paradox/nova',
  '2': '/characters/quantum-paradox/phoenix',
  '3': '/characters/quantum-paradox/storm',
  '4': '/characters/quantum-paradox/tempus',
  '5': '/characters/street-justice/shadow',
  '6': '/characters/street-justice/void',
  '7': '/characters/street-justice/mirage',
  '8': '/characters/cypherpunk-chronicles/neon',
  '9': '/characters/cypherpunk-chronicles/circuit',
  '10': '/characters/cypherpunk-chronicles/pulse',
  '11': '/characters/cypherpunk-chronicles/void',
  '12': '/characters/cypherpunk-chronicles/corruptor',
  '13': '/characters/mystic-realms/zara',
  '14': '/characters/mystic-realms/nexus',
  '15': '/characters/mystic-realms/aether',
  '16': '/characters/mystic-realms/chaos',
  '17': '/characters/ninja-punk-girls/shadow',
  '18': '/characters/ninja-punk-girls/blade',
  '19': '/characters/ninja-punk-girls/echo',
  '20': '/characters/ninja-punk-girls/void',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an old character URL (e.g., /characters/4)
  const characterMatch = pathname.match(/^\/characters\/(\d+)$/);
  if (characterMatch) {
    const characterId = characterMatch[1];
    const redirectUrl = characterRedirects[characterId];
    
    if (redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/characters/:id*',
}; 