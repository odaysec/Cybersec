import React from 'react';
import { Search, Globe, Dna as Dns, RotateCcw, MapPin, Wifi, Hash, FileText, Shuffle, Link, Hexagon, RotateCw, Code, Key, Unlock } from 'lucide-react';
import { ToolType, ToolCategory } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories: ToolCategory[] = [
  {
    id: 'reconnaissance',
    name: 'Reconnaissance',
    icon: 'Search',
    tools: [
      { id: 'subdomain-finder', name: 'Subdomain Finder', description: 'Discover subdomains' },
      { id: 'whois-lookup', name: 'Whois Lookup', description: 'Domain information' },
      { id: 'dns-lookup', name: 'DNS Lookup', description: 'DNS records' },
      { id: 'reverse-ip', name: 'Reverse IP', description: 'Find domains on IP' },
      { id: 'ip-geolocation', name: 'IP Geolocation', description: 'Locate IP address' },
      { id: 'port-scanner', name: 'Port Scanner', description: 'Scan open ports' },
    ]
  },
  {
    id: 'encoding',
    name: 'Encoding/Decoding',
    icon: 'FileText',
    tools: [
      { id: 'md5-tool', name: 'MD5 Tool', description: 'MD5 hash operations' },
      { id: 'base64-tool', name: 'Base64 Tool', description: 'Base64 encode/decode' },
      { id: 'sha-tool', name: 'SHA Tool', description: 'SHA hash operations' },
      { id: 'url-tool', name: 'URL Tool', description: 'URL encode/decode' },
      { id: 'hex-tool', name: 'HEX Tool', description: 'Hexadecimal operations' },
      { id: 'rot13-tool', name: 'ROT13 Tool', description: 'ROT13 cipher' },
    ]
  },
  {
    id: 'obfuscation',
    name: 'Code Obfuscation',
    icon: 'Code',
    tools: [
      { id: 'python-obfuscator', name: 'Python Obfuscator', description: 'Obfuscate Python code' },
      { id: 'php-obfuscator', name: 'PHP Obfuscator', description: 'Obfuscate PHP code' },
    ]
  },
  {
    id: 'security',
    name: 'Security Tools',
    icon: 'Key',
    tools: [
      { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords' },
      { id: 'hash-cracker', name: 'Hash Cracker', description: 'Crack common hashes' },
    ]
  }
];

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  Search, Globe, Dns, RotateCcw, MapPin, Wifi, Hash, FileText, Shuffle, Link, Hexagon, RotateCw, Code, Key, Unlock
};

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolSelect, isOpen, onClose }) => {
  const getIcon = (toolId: ToolType) => {
    const iconName = {
      'subdomain-finder': 'Search',
      'whois-lookup': 'Globe',
      'dns-lookup': 'Dns',
      'reverse-ip': 'RotateCcw',
      'ip-geolocation': 'MapPin',
      'port-scanner': 'Wifi',
      'md5-tool': 'Hash',
      'base64-tool': 'FileText',
      'sha-tool': 'Hash',
      'url-tool': 'Link',
      'hex-tool': 'Hexagon',
      'rot13-tool': 'RotateCw',
      'python-obfuscator': 'Code',
      'php-obfuscator': 'Code',
      'password-generator': 'Key',
      'hash-cracker': 'Unlock',
    }[toolId];
    
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={18} /> : <Hash size={18} />;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-200">Security Tools</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            {categories.map((category) => (
              <div key={category.id} className="mb-6">
                <h3 className="px-4 mb-2 text-sm font-medium text-gray-400 uppercase tracking-wide">
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        onToolSelect(tool.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors
                        ${activeTool === tool.id 
                          ? 'bg-cyber-600 text-white border-r-2 border-cyber-400' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      <span className={activeTool === tool.id ? 'text-cyber-200' : 'text-gray-400'}>
                        {getIcon(tool.id)}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;