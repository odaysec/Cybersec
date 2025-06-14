import React, { useState } from 'react';
import { Link, Copy, Check } from 'lucide-react';

const URLTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const processText = () => {
    if (!input.trim()) return;

    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(input);
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(input);
        setOutput(decoded);
      }
    } catch (error) {
      setOutput('Error: Invalid input for URL decoding');
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
        <h1 className="text-3xl font-bold text-white mb-2">URL Encoder/Decoder</h1>
        <p className="text-gray-400">Encode and decode URLs for safe transmission</p>
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
              placeholder={
                mode === 'encode' 
                  ? 'Enter text or URL to encode...' 
                  : 'Enter URL-encoded string to decode...'
              }
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
            <Link size={20} />
            {mode === 'encode' ? 'Encode' : 'Decode'}
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
        <h3 className="text-lg font-semibold text-white mb-4">About URL Encoding</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Common Encodings:</h4>
            <ul className="space-y-1 text-sm font-mono">
              <li>• Space → %20</li>
              <li>• ! → %21</li>
              <li>• " → %22</li>
              <li>• # → %23</li>
              <li>• $ → %24</li>
              <li>• % → %25</li>
              <li>• & → %26</li>
              <li>• ' → %27</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Use Cases:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Passing data in URLs</li>
              <li>• Form data submission</li>
              <li>• API parameter encoding</li>
              <li>• Safe character transmission</li>
              <li>• Query string construction</li>
              <li>• Web scraping</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLTool;