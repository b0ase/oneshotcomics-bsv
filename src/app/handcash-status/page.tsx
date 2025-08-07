'use client';

import { useState, useEffect } from 'react';

interface HandCashStatus {
  timestamp: string;
  results: Array<{
    endpoint: string;
    status: number | null;
    ok: boolean;
    error: string | null;
  }>;
  summary: {
    total: number;
    working: number;
    failed: number;
  };
}

export default function HandCashStatusPage() {
  const [status, setStatus] = useState<HandCashStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/handcash/test');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const getStatusColor = (ok: boolean) => {
    return ok ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (ok: boolean) => {
    return ok ? '✅' : '❌';
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">HandCash API Status</h1>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-300">Current Status</h2>
            <button
              onClick={checkStatus}
              disabled={loading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Checking HandCash API status...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-300">Error: {error}</p>
            </div>
          )}

          {status && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{status.summary.total}</div>
                  <div className="text-gray-300">Total Endpoints</div>
                </div>
                <div className="text-center p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{status.summary.working}</div>
                  <div className="text-gray-300">Working</div>
                </div>
                <div className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{status.summary.failed}</div>
                  <div className="text-gray-300">Failed</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Endpoint Details</h3>
                {status.results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getStatusIcon(result.ok)}</span>
                      <div>
                        <div className="font-mono text-sm text-gray-300">{result.endpoint}</div>
                        <div className={`text-sm ${getStatusColor(result.ok)}`}>
                          {result.ok ? 'Working' : `Error: ${result.status || result.error}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">What This Means</h3>
                <div className="text-gray-300 space-y-2">
                  {status.summary.working > 0 ? (
                    <p>✅ HandCash API is available and working. You should be able to connect your wallet.</p>
                  ) : (
                    <>
                      <p>❌ HandCash API is currently unavailable. This is a temporary issue with HandCash's servers.</p>
                      <p>• You may not be able to connect your HandCash wallet right now</p>
                      <p>• Please try again later</p>
                      <p>• This is not an issue with our application</p>
                    </>
                  )}
                </div>
              </div>

              {status.timestamp && (
                <div className="text-center text-gray-400 text-sm">
                  Last checked: {new Date(status.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
          <h2 className="text-2xl font-semibold text-orange-300 mb-4">Troubleshooting</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-orange-400">•</span>
              <div>
                <strong>If HandCash API is down:</strong> This is a temporary issue with HandCash's servers. Please wait and try again later.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-400">•</span>
              <div>
                <strong>If you can't connect your wallet:</strong> Make sure you have the HandCash app installed and are logged in.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-400">•</span>
              <div>
                <strong>For more help:</strong> Visit <a href="https://handcash.io" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">HandCash.io</a> for support.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 