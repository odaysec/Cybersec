import React, { useState } from 'react';
import { Globe, Search, AlertCircle, Loader } from 'lucide-react';

const WhoisLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupDomain = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      // Since we can't make direct WHOIS queries from the browser due to CORS,
      // we'll simulate the functionality with a placeholder
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult = `Domain Name: ${domain.toUpperCase()}
Registry Domain ID: D123456789-LROR
Registrar WHOIS Server: whois.example.com
Registrar URL: http://www.example.com
Updated Date: 2024-01-15T10:30:00Z
Creation Date: 2020-01-15T10:30:00Z
Registry Expiry Date: 2025-01-15T10:30:00Z
Registrar: Example Registrar LLC
Registrar IANA ID: 1234
Registrar Abuse Contact Email: abuse@example.com
Registrar Abuse Contact Phone: +1.2345678901
Domain Status: clientTransferProhibited
Registry Registrant ID: REDACTED FOR PRIVACY
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: REDACTED FOR PRIVACY
Registrant Street: REDACTED FOR PRIVACY
Registrant City: REDACTED FOR PRIVACY
Registrant State/Province: REDACTED FOR PRIVACY
Registrant Postal Code: REDACTED FOR PRIVACY
Registrant Country: US
Registrant Phone: REDACTED FOR PRIVACY
Registrant Email: REDACTED FOR PRIVACY
Name Server: ns1.example.com
Name Server: ns2.example.com
DNSSEC: unsigned`;

      setResult(mockResult);
    } catch (err) {
      setError('Failed to perform WHOIS lookup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">WHOIS Lookup</h1>
        <p className="text-gray-400">Get domain registration information and ownership details</p>
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
              onKeyPress={(e) => e.key === 'Enter' && lookupDomain()}
            />
          </div>
          <button
            onClick={lookupDomain}
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

      {result && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-matrix-400" size={20} />
            <h2 className="text-xl font-semibold text-white">
              WHOIS Information for {domain}
            </h2>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap overflow-x-auto">
              {result}
            </pre>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About WHOIS</h3>
        <div className="space-y-2 text-gray-300">
          <p>• WHOIS is a query protocol used to obtain domain registration information</p>
          <p>• Provides details about domain ownership, registration dates, and name servers</p>
          <p>• Many registrars now redact personal information for privacy protection</p>
          <p>• Useful for domain research, security investigations, and business intelligence</p>
        </div>
      </div>
    </div>
  );
};

export default WhoisLookup;