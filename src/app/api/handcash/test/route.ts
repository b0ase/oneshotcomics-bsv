import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('HandCash API test: Checking connectivity...');
    
    // Test basic connectivity to HandCash endpoints
    const endpoints = [
      'https://api.handcash.io/v2/profile',
      'https://api.handcash.io/profile',
      'https://handcash.io/api/v2/profile'
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        console.log(`HandCash API test: Testing ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'OneShotComics/1.0',
          },
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        results.push({
          endpoint,
          status: response.status,
          ok: response.ok,
          error: null
        });

        console.log(`HandCash API test: ${endpoint} - Status: ${response.status}`);
      } catch (error) {
        results.push({
          endpoint,
          status: null,
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        console.log(`HandCash API test: ${endpoint} - Error: ${error}`);
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      results,
      summary: {
        total: results.length,
        working: results.filter(r => r.ok).length,
        failed: results.filter(r => !r.ok).length
      }
    });

  } catch (error) {
    console.error('HandCash API test: Error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 