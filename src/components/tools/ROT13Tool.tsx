import React, { useState } from 'react';
import { RotateCw, Copy, Check } from 'lucide-react';

const ROT13Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const rot13Transform = (text: string) => {
    return text.replace(/[A-Za-z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const processText = () => {
    if (!input.trim()) return;
    const transformed = rot13Transform(input);
    setOutput(transformed);
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
        <h1 className="text-3xl font-bold text-white mb-2">ROT13 Cipher</h1>
        <p className="text-gray-400">Simple letter substitution cipher with 13-character rotation</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to transform with ROT13..."
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
                placeholder="ROT13 result will appear here..."
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
            <RotateCw size={20} />
            Transform
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">ROT13 Reference</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white mb-2">Alphabet Mapping:</h4>
            <div className="bg-gray-700 rounded-lg p-4 font-mono text-sm">
              <div className="text-cyber-400 mb-2">Original: A B C D E F G H I J K L M</div>
              <div className="text-matrix-400">ROT13:    N O P Q R S T U V W X Y Z</div>
              <div className="text-cyber-400 mt-4 mb-2">Original: N O P Q R S T U V W X Y Z</div>
              <div className="text-matrix-400">ROT13:    A B C D E F G H I J K L M</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Example:</h4>
            <div className="bg-gray-700 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300 mb-2">Input: "Hello World"</div>
              <div className="text-matrix-400">Output: "Uryyb Jbeyq"</div>
              <div className="text-gray-300 mt-4 mb-2">Input: "Uryyb Jbeyq"</div>
              <div className="text-cyber-400">Output: "Hello World"</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About ROT13</h3>
        <div className="space-y-2 text-gray-300">
          <p>• ROT13 is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet</p>
          <p>• It's a special case of the Caesar cipher with a shift of 13</p>
          <p>• ROT13 is its own inverse - applying ROT13 twice returns the original text</p>
          <p>• Commonly used in online forums to hide spoilers or offensive content</p>
          <p>• Not secure for actual encryption - purely for obfuscation</p>
        </div>
      </div>
    </div>
  );
};

export default ROT13Tool;