import React, { useState } from 'react';
import { Search, Download, AlertCircle, CheckCircle, Loader, ExternalLink } from 'lucide-react';

interface SubdomainResult {
  name_value: string;
  issuer_name: string;
  not_before: string;
  not_after: string;
}

const SubdomainFinder: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchSubdomains = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from crt.sh');
      }

      const data: SubdomainResult[] = await response.json();
      
      const uniqueSubdomains = Array.from(new Set(
        data.flatMap(cert => 
          cert.name_value.split('\n').map(name => name.trim().toLowerCase())
        )
      )).filter(subdomain => 
        subdomain.includes(domain.toLowerCase()) && 
        !subdomain.startsWith('*.')
      ).sort();

      setResults(uniqueSubdomains);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    const content = results.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${domain}_subdomains.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Subdomain Finder</h1>
        <p className="text-gray-400">Discover subdomains using certificate transparency logs</p>
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
              onKeyPress={(e) => e.key === 'Enter' && searchSubdomains()}
            />
          </div>
          <button
            onClick={searchSubdomains}
            disabled={loading}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? 'Scanning...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-matrix-400" size={20} />
              <h2 className="text-xl font-semibold text-white">
                Found {results.length} subdomains for {domain}
              </h2>
            </div>
            <button
              onClick={exportResults}
              className="px-4 py-2 bg-matrix-600 hover:bg-matrix-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Export
            </button>
          </div>

          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {results.map((subdomain, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span className="text-gray-200 font-mono text-sm">{subdomain}</span>
                <a
                  href={`https://${subdomain}`}
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
    </div>
  );
};

export default SubdomainFinder;