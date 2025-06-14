import React from 'react';
import { Heart, Code, Shield, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-cyber-400" />
            <span className="text-gray-300">
              Made with <Heart className="h-4 w-4 text-red-500 inline mx-1" /> by 
              <a 
                href="https://github.com/odaysec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyber-400 font-semibold ml-1 hover:text-cyber-300 transition-colors"
              >
                OdaySec
              </a>
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Github className="h-4 w-4" />
              <a 
                href="https://github.com/odaysec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Open Source
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span>Educational Purpose Only</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>© 2024 CyberSec Platform by OdaySec. All rights reserved. Use responsibly and ethically.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;