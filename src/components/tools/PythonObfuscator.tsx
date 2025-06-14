import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Play } from 'lucide-react';

const PythonObfuscator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Simple Python obfuscation function
  const obfuscateCode = (code: string) => {
    // Basic obfuscation techniques
    let obfuscated = code;
    
    // Replace variable names with random strings
    const variables = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
    const uniqueVars = [...new Set(variables)].filter(v => 
      !['print', 'input', 'if', 'else', 'elif', 'for', 'while', 'def', 'class', 'import', 'from', 'return', 'break', 'continue', 'pass', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'yield', 'global', 'nonlocal', 'assert', 'del', 'raise', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None'].includes(v)
    );
    
    const varMap: { [key: string]: string } = {};
    uniqueVars.forEach((v, i) => {
      varMap[v] = `_${Math.random().toString(36).substr(2, 8)}`;
    });
    
    // Replace variables
    Object.entries(varMap).forEach(([original, obfuscated]) => {
      const regex = new RegExp(`\\b${original}\\b`, 'g');
      obfuscated = obfuscated.replace(regex, obfuscated);
    });
    
    // Add some random comments and spacing
    const lines = obfuscated.split('\n');
    const obfuscatedLines = lines.map(line => {
      if (line.trim() && Math.random() > 0.7) {
        return line + ` # ${Math.random().toString(36).substr(2, 5)}`;
      }
      return line;
    });
    
    return obfuscatedLines.join('\n');
  };

  const processCode = () => {
    if (!input.trim()) return;
    
    try {
      const obfuscated = obfuscateCode(input);
      setOutput(obfuscated);
    } catch (error) {
      setOutput('Error: Unable to obfuscate code');
    }
  };

  // Auto-obfuscate when input changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        processCode();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const sampleCode = `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`;

  const loadSample = () => {
    setInput(sampleCode);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Python Code Obfuscator</h1>
        <p className="text-gray-400">Obfuscate Python code with real-time preview</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Original Code</h3>
            <button
              onClick={loadSample}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Python code to obfuscate..."
            className="w-full h-96 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400 resize-none font-mono text-sm"
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={processCode}
              className="px-4 py-2 bg-cyber-600 hover:bg-cyber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Code size={18} />
              Obfuscate
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Obfuscated Code</h3>
            {output && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-matrix-600 hover:bg-matrix-700 text-white rounded text-sm transition-colors flex items-center gap-1"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Obfuscated code will appear here..."
            className="w-full h-96 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none font-mono text-sm"
          />
          <div className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <Play size={16} />
              <span className="font-medium">Live Preview</span>
            </div>
            <p className="text-yellow-300 text-sm mt-1">
              Code is automatically obfuscated as you type!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Obfuscation Features</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Applied Techniques:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Variable name randomization</li>
              <li>• Random comment injection</li>
              <li>• Identifier obfuscation</li>
              <li>• Structure preservation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Notes:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Functionality remains intact</li>
              <li>• Basic obfuscation for demonstration</li>
              <li>• Educational purposes only</li>
              <li>• Real-time processing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonObfuscator;