import React, { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';
import CryptoJS from 'crypto-js';

const MD5Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const processText = () => {
    if (!input.trim()) return;

    if (mode === 'encode') {
      const hash = CryptoJS.MD5(input).toString();
      setOutput(hash);
    } else {
      setOutput('MD5 hashes cannot be decoded directly. Try the Hash Cracker tool instead.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">MD5 Hash Tool</h1>
        <p className="text-gray-400">Generate MD5 hashes from text input</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'encode' 
                ? 'bg-cyber-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'decode' 
                ? 'bg-cyber-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to hash...' : 'Enter MD5 hash...'}
              className="w-full h-40 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-40 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
              />
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                >
                  {copied ? <Check size={16} className="text-matrix-400" /> : <Copy size={16} />}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={processText}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Hash size={20} />
            {mode === 'encode' ? 'Generate Hash' : 'Decode Hash'}
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About MD5</h3>
        <div className="space-y-2 text-gray-300">
          <p>• MD5 is a widely used cryptographic hash function producing a 128-bit hash value</p>
          <p>• Commonly used for data integrity verification</p>
          <p>• Note: MD5 is not cryptographically secure for password hashing</p>
          <p>• MD5 hashes are one-way and cannot be directly decoded</p>
        </div>
      </div>
    </div>
  );
};

export default MD5Tool;