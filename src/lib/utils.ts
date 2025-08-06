// Utility functions to prevent hydration mismatches

/**
 * Generates a stable hash from a string
 * This ensures consistent keys across server and client
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Creates a stable key for array items
 * Uses the item content and index to generate a consistent key
 */
export function createStableKey(item: string | number, index: number): string {
  const itemStr = String(item);
  const hash = hashString(itemStr);
  return `${hash}-${index}`;
}

/**
 * Checks if the code is running on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Checks if the code is running on the server side
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Safely access window object only on client side
 */
export function getWindow(): Window | undefined {
  if (isClient()) {
    return window;
  }
  return undefined;
}

/**
 * Safely access document object only on client side
 */
export function getDocument(): Document | undefined {
  if (isClient()) {
    return document;
  }
  return undefined;
} 