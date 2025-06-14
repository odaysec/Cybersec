import React, { useState } from 'react';
import { Wifi, Search, AlertCircle, Loader, CheckCircle, XCircle } from 'lucide-react';

interface PortResult {
  port: number;
  service: string;
  status: 'open' | 'closed' | 'filtered';
}

const PortScanner: React.FC = () => {
  const [target, setTarget] = useState('');
  const [ports, setPorts] = useState('80,443,22,21,25,53,110,143,993,995');
  const [results, setResults] = useState<PortResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);

  const commonPorts = {
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    80: 'HTTP',
    110: 'POP3',
    143: 'IMAP',
    443: 'HTTPS',
    993: 'IMAPS',
    995: 'POP3S',
    3389: 'RDP',
    5432: 'PostgreSQL',
    3306: 'MySQL'
  };

  const scanPorts = async () => {
    if (!target.trim()) {
      setError('Please enter a target host');
      return;
    }

    if (!ports.trim()) {
      setError('Please enter ports to scan');
      return;
    }

    setLoading(true);
    setScanning(true);
    setError('');
    setResults([]);

    try {
      const portList = ports.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p) && p > 0 && p <= 65535);
      
      if (portList.length === 0) {
        setError('Please enter valid port numbers');
        return;
      }

      const scanResults: PortResult[] = [];
      
      for (const port of portList) {
        // Simulate port scanning with random results
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const isOpen = Math.random() > 0.7; // 30% chance of being open
        const status: 'open' | 'closed' | 'filtered' = isOpen ? 'open' : (Math.random() > 0.5 ? 'closed' : 'filtered');
        
        scanResults.push({
          port,
          service: commonPorts[port as keyof typeof commonPorts] || 'Unknown',
          status
        });
        
        setResults([...scanResults]);
      }
    } catch (err) {
      setError('Failed to scan ports');
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  const loadCommonPorts = () => {
    setPorts('21,22,23,25,53,80,110,143,443,993,995,3389,5432,3306');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <CheckCircle className="text-matrix-400" size={16} />;
      case 'closed':
        return <XCircle className="text-red-400" size={16} />;
      case 'filtered':
        return <AlertCircle className="text-yellow-400" size={16} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-matrix-400';
      case 'closed':
        return 'text-red-400';
      case 'filtered':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Port Scanner</h1>
        <p className="text-gray-400">Scan for open ports on any target host</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Host
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter hostname or IP address"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ports (comma-separated)
            </label>
            <input
              type="text"
              value={ports}
              onChange={(e) => setPorts(e.target.value)}
              placeholder="80,443,22,21,25"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={scanPorts}
            disabled={loading}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? 'Scanning...' :   'Start Scan'}
          </button>
          <button
            onClick={loadCommonPorts}
            className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Load Common Ports
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
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="text-cyber-400" size={20} />
            <h2 className="text-xl font-semibold text-white">
              Scan Results for {target}
            </h2>
            {scanning && (
              <div className="ml-auto flex items-center gap-2 text-yellow-400">
                <Loader className="animate-spin" size={16} />
                <span className="text-sm">Scanning...</span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-4 text-gray-300">Port</th>
                  <th className="text-left py-2 px-4 text-gray-300">Service</th>
                  <th className="text-left py-2 px-4 text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-2 px-4 text-white font-mono">{result.port}</td>
                    <td className="py-2 px-4 text-gray-300">{result.service}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className={`capitalize ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Port Scanning Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Port States:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-matrix-400" size={14} />
                <strong>Open:</strong> Port is accepting connections
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="text-red-400" size={14} />
                <strong>Closed:</strong> Port is not accepting connections
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="text-yellow-400" size={14} />
                <strong>Filtered:</strong> Port is blocked by firewall
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Important Notes:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Only scan systems you own or have permission to test</li>
              <li>• Port scanning may be detected by security systems</li>
              <li>• Results are simulated for demonstration purposes</li>
              <li>• Use responsibly and ethically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortScanner;