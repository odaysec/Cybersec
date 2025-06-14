import React, { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';
import CryptoJS from 'crypto-js';

const SHATool: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState({
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copied, setCopied] = useState('');

  const processText = () => {
    if (!input.trim()) return;

    const sha1 = CryptoJS.SHA1(input).toString();
    const sha256 = CryptoJS.SHA256(input).toString();
    const sha512 = CryptoJS.SHA512(input).toString();

    setResults({ sha1, sha256, sha512 });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const clearAll = () => {
    setInput('');
    setResults({ sha1: '', sha256: '', sha512: '' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">SHA Hash Tool</h1>
        <p className="text-gray-400">Generate SHA-1, SHA-256, and SHA-512 hashes</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400 resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={processText}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Hash size={20} />
            Generate Hashes
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {(results.sha1 || results.sha256 || results.sha512) && (
        <div className="space-y-4 mb-6">
          {/* SHA-1 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">SHA-1</h3>
              <button
                onClick={() => copyToClipboard(results.sha1, 'sha1')}
                className="px-3 py-1 bg-matrix-600 hover:bg-matrix-700 text-white rounded text-sm transition-colors flex items-center gap-1"
              >
                {copied === 'sha1' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'sha1' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <code className="text-gray-200 font-mono text-sm break-all">
                {results.sha1}
              </code>
            </div>
          </div>

          {/* SHA-256 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">SHA-256</h3>
              <button
                onClick={() => copyToClipboard(results.sha256, 'sha256')}
                className="px-3 py-1 bg-matrix-600 hover:bg-matrix-700 text-white rounded text-sm transition-colors flex items-center gap-1"
              >
                {copied === 'sha256' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'sha256' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <code className="text-gray-200 font-mono text-sm break-all">
                {results.sha256}
              </code>
            </div>
          </div>

          {/* SHA-512 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">SHA-512</h3>
              <button
                onClick={() => copyToClipboard(results.sha512, 'sha512')}
                className="px-3 py-1 bg-matrix-600 hover:bg-matrix-700 text-white rounded text-sm transition-colors flex items-center gap-1"
              >
                {copied === 'sha512' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'sha512' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <code className="text-gray-200 font-mono text-sm break-all">
                {results.sha512}
              </code>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About SHA Algorithms</h3>
        <div className="grid md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">SHA-1</h4>
            <ul className="space-y-1 text-sm">
              <li>• 160-bit hash value</li>
              <li>• Deprecated for security</li>
              <li>• Still used in some systems</li>
              <li>• Not recommended for new applications</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">SHA-256</h4>
            <ul className="space-y-1 text-sm">
              <li>• 256-bit hash value</li>
              <li>• Part of SHA-2 family</li>
              <li>• Widely used and secure</li>
              <li>• Used in Bitcoin and SSL</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">SHA-512</h4>
            <ul className="space-y-1 text-sm">
              <li>• 512-bit hash value</li>
              <li>• Strongest SHA-2 variant</li>
              <li>• Best for high security needs</li>
              <li>• Slower but more secure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SHATool;