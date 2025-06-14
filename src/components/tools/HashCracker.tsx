import React, { useState } from 'react';
import { Unlock, Search, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import CryptoJS from 'crypto-js';

const HashCracker: React.FC = () => {
  const [hash, setHash] = useState('');
  const [hashType, setHashType] = useState<'md5' | 'sha1' | 'sha256'>('md5');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [found, setFound] = useState(false);

  // Common passwords wordlist (for demonstration)
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'letmein', 'welcome',
    'monkey', '1234567890', 'qwerty', 'abc123', 'Password1', 'password1',
    'admin123', 'root', 'toor', 'pass', 'test', 'guest', 'user', 'login',
    'hello', 'world', 'secret', 'love', 'god', 'sex', 'money', 'life'
  ];

  const hashPassword = (password: string, type: string) => {
    switch (type) {
      case 'md5':
        return CryptoJS.MD5(password).toString();
      case 'sha1':
        return CryptoJS.SHA1(password).toString();
      case 'sha256':
        return CryptoJS.SHA256(password).toString();
      default:
        return '';
    }
  };

  const crackHash = async () => {
    if (!hash.trim()) {
      setError('Please enter a hash to crack');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setFound(false);

    try {
      const targetHash = hash.toLowerCase().trim();
      
      // Simulate cracking process
      for (let i = 0; i < commonPasswords.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing time
        
        const password = commonPasswords[i];
        const hashedPassword = hashPassword(password, hashType);
        
        if (hashedPassword === targetHash) {
          setResult(password);
          setFound(true);
          setLoading(false);
          return;
        }
      }
      
      // If not found in common passwords, try some variations
      const variations = [
        '123', '1234', '12345', '123456789', '000', '111', '222',
        'a', 'aa', 'aaa', 'test123', 'admin123', 'root123'
      ];
      
      for (let i = 0; i < variations.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const password = variations[i];
        const hashedPassword = hashPassword(password, hashType);
        
        if (hashedPassword === targetHash) {
          setResult(password);
          setFound(true);
          setLoading(false);
          return;
        }
      }
      
      setResult('Hash not found in wordlist');
      setFound(false);
    } catch (err) {
      setError('Failed to crack hash');
    } finally {
      setLoading(false);
    }
  };

  const generateSampleHash = () => {
    const samplePassword = 'password123';
    const sampleHash = hashPassword(samplePassword, hashType);
    setHash(sampleHash);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hash Cracker</h1>
        <p className="text-gray-400">Crack common hashes using dictionary attack</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hash Type
            </label>
            <select
              value={hashType}
              onChange={(e) => setHashType(e.target.value as 'md5' | 'sha1' | 'sha256')}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-400"
            >
              <option value="md5">MD5</option>
              <option value="sha1">SHA-1</option>
              <option value="sha256">SHA-256</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hash to Crack
            </label>
            <input
              type="text"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="Enter hash to crack..."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400 font-mono"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={crackHash}
            disabled={loading}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? 'Cracking...' : 'Crack Hash'}
          </button>
          <button
            onClick={generateSampleHash}
            className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Generate Sample
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
            {found ? (
              <CheckCircle className="text-matrix-400" size={20} />
            ) : (
              <AlertCircle className="text-yellow-400" size={20} />
            )}
            <h2 className="text-xl font-semibold text-white">
              {found ? 'Hash Cracked!' : 'Crack Result'}
            </h2>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Original Hash:</span>
                <div className="font-mono text-white text-sm break-all mt-1">
                  {hash}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">
                  {found ? 'Cracked Password:' : 'Result:'}
                </span>
                <div className={`font-mono text-sm mt-1 ${found ? 'text-matrix-400' : 'text-yellow-400'}`}>
                  {result}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Hash Cracking Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">How it Works:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Uses dictionary attack with common passwords</li>
              <li>• Hashes each password and compares with target</li>
              <li>• Limited to simple, common passwords</li>
              <li>• Educational demonstration only</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Security Notes:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Use strong, unique passwords</li>
              <li>• Avoid common dictionary words</li>
              <li>• Use password managers</li>
              <li>• Enable two-factor authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashCracker;