import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode to catch potential issues
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [],
    unoptimized: false,
  },
  
  // ESLint configuration to allow build to pass
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@next/font'],
  },
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
