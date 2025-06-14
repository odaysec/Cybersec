import React, { useState } from 'react';
import { Key, Copy, Check, RefreshCw } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (charset === '') {
      setPassword('Please select at least one character type');
      return;
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (!password || password.length < 8) return { strength: 'Weak', color: 'text-red-400' };
    if (password.length < 12) return { strength: 'Medium', color: 'text-yellow-400' };
    if (password.length < 16) return { strength: 'Strong', color: 'text-matrix-400' };
    return { strength: 'Very Strong', color: 'text-green-400' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Password Generator</h1>
        <p className="text-gray-400">Generate secure, random passwords with customizable options</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="100"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Character Types</h3>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-cyber-600 bg-gray-700 border-gray-600 rounded focus:ring-cyber-500"
              />
              <span className="text-gray-300">Uppercase Letters (A-Z)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-cyber-600 bg-gray-700 border-gray-600 rounded focus:ring-cyber-500"
              />
              <span className="text-gray-300">Lowercase Letters (a-z)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-cyber-600 bg-gray-700 border-gray-600 rounded focus:ring-cyber-500"
              />
              <span className="text-gray-300">Numbers (0-9)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-cyber-600 bg-gray-700 border-gray-600 rounded focus:ring-cyber-500"
              />
              <span className="text-gray-300">Symbols (!@#$%^&*)</span>
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Options</h3>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="w-4 h-4 text-cyber-600 bg-gray-700 border-gray-600 rounded focus:ring-cyber-500"
              />
              <span className="text-gray-300">Exclude Similar Characters (il1Lo0O)</span>
            </label>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full md:w-auto px-6 py-3 bg-cyber-600 hover:bg-cyber-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          Generate Password
        </button>
      </div>

      {password && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Generated Password</h3>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${strength.color}`}>
                {strength.strength}
              </span>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-matrix-600 hover:bg-matrix-700 text-white rounded text-sm transition-colors flex items-center gap-1"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700 rounded-lg border-2 border-gray-600">
            <div className="font-mono text-lg text-white break-all select-all">
              {password}
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Strong Password Guidelines:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Use at least 12 characters</li>
              <li>• Mix uppercase and lowercase letters</li>
              <li>• Include numbers and symbols</li>
              <li>• Avoid dictionary words</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Best Practices:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Use unique passwords for each account</li>
              <li>• Store passwords in a password manager</li>
              <li>• Enable two-factor authentication</li>
              <li>• Change passwords regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;