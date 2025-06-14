import React, { useState } from 'react';
import { Dna as Dns, Search, AlertCircle, Loader } from 'lucide-react';

const DnsLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupDns = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Simulated DNS lookup results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = {
        A: ['93.184.216.34', '93.184.216.35'],
        AAAA: ['2606:2800:220:1:248:1893:25c8:1946'],
        MX: ['10 mail.example.com', '20 mail2.example.com'],
        NS: ['ns1.example.com', 'ns2.example.com'],
        TXT: ['v=spf1 include:_spf.example.com ~all', 'google-site-verification=abc123'],
        CNAME: domain.startsWith('www.') ? [domain.substring(4)] : null
      };

      setResults(mockResults);
    } catch (err) {
      setError('Failed to perform DNS lookup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">DNS Lookup</h1>
        <p className="text-gray-400">Query DNS records for any domain</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400"
              onKeyPress={(e) => e.key === 'Enter' && lookupDns()}
            />
          </div>
          <button
            onClick={lookupDns}
            disabled={loading}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? 'Looking up...' : 'Lookup'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {results && (
        <div className="space-y-4">
          {Object.entries(results).map(([recordType, records]) => {
            if (!records || (Array.isArray(records) && records.length === 0)) return null;
            
            return (
              <div key={recordType} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Dns className="text-cyber-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">
                    {recordType} Records
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {(Array.isArray(records) ? records : [records]).map((record, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3">
                      <code className="text-gray-200 font-mono text-sm">
                        {record}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">DNS Record Types</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Common Records:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>A</strong> - IPv4 address</li>
              <li>• <strong>AAAA</strong> - IPv6 address</li>
              <li>• <strong>CNAME</strong> - Canonical name</li>
              <li>• <strong>MX</strong> - Mail exchange</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Other Records:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>NS</strong> - Name server</li>
              <li>• <strong>TXT</strong> - Text records</li>
              <li>• <strong>SOA</strong> - Start of authority</li>
              <li>• <strong>PTR</strong> - Pointer record</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnsLookup;