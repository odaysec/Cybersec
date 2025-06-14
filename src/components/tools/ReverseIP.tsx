import React, { useState } from 'react';
import { RotateCcw, Search, AlertCircle, Loader, ExternalLink } from 'lucide-react';

const ReverseIP: React.FC = () => {
  const [ip, setIp] = useState('');
  const [domains, setDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupDomains = async () => {
    if (!ip.trim()) {
      setError('Please enter an IP address');
      return;
    }

    // Basic IP validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ip)) {
      setError('Please enter a valid IP address');
      return;
    }

    setLoading(true);
    setError('');
    setDomains([]);

    try {
      // Simulated reverse IP lookup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDomains = [
        'example.com',
        'test.example.com',
        'blog.example.com',
        'shop.example.com',
        'api.example.com',
        'cdn.example.com',
        'static.example.com',
        'images.example.com'
      ];

      setDomains(mockDomains);
    } catch (err) {
      setError('Failed to perform reverse IP lookup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reverse IP Lookup</h1>
        <p className="text-gray-400">Find all domains hosted on a specific IP address</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Enter IP address (e.g., 93.184.216.34)"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400"
              onKeyPress={(e) => e.key === 'Enter' && lookupDomains()}
            />
          </div>
          <button
            onClick={lookupDomains}
            disabled={loading}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? 'Searching...' : 'Lookup'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {domains.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="text-matrix-400" size={20} />
            <h2 className="text-xl font-semibold text-white">
              Found {domains.length} domains on {ip}
            </h2>
          </div>

          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span className="text-gray-200 font-mono text-sm">{domain}</span>
                <a
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-400 hover:text-cyber-300 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About Reverse IP Lookup</h3>
        <div className="space-y-2 text-gray-300">
          <p>• Reverse IP lookup finds all domains hosted on a specific IP address</p>
          <p>• Useful for discovering related websites and services</p>
          <p>• Helps identify shared hosting environments</p>
          <p>• Important for security research and competitor analysis</p>
          <p>• Results may vary depending on hosting configuration</p>
        </div>
      </div>
    </div>
  );
};

export default ReverseIP;