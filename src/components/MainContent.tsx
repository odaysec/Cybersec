import React from 'react';
import { ToolType } from '../types';
import SubdomainFinder from './tools/SubdomainFinder';
import WhoisLookup from './tools/WhoisLookup';
import DnsLookup from './tools/DnsLookup';
import ReverseIP from './tools/ReverseIP';
import IPGeolocation from './tools/IPGeolocation';
import PortScanner from './tools/PortScanner';
import MD5Tool from './tools/MD5Tool';
import Base64Tool from './tools/Base64Tool';
import SHATool from './tools/SHATool';
import URLTool from './tools/URLTool';
import HexTool from './tools/HexTool';
import ROT13Tool from './tools/ROT13Tool';
import PythonObfuscator from './tools/PythonObfuscator';
import PHPObfuscator from './tools/PHPObfuscator';
import PasswordGenerator from './tools/PasswordGenerator';
import HashCracker from './tools/HashCracker';

interface MainContentProps {
  activeTool: ToolType;
  sidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ activeTool, sidebarOpen }) => {
  const renderTool = () => {
    switch (activeTool) {
      case 'subdomain-finder':
        return <SubdomainFinder />;
      case 'whois-lookup':
        return <WhoisLookup />;
      case 'dns-lookup':
        return <DnsLookup />;
      case 'reverse-ip':
        return <ReverseIP />;
      case 'ip-geolocation':
        return <IPGeolocation />;
      case 'port-scanner':
        return <PortScanner />;
      case 'md5-tool':
        return <MD5Tool />;
      case 'base64-tool':
        return <Base64Tool />;
      case 'sha-tool':
        return <SHATool />;
      case 'url-tool':
        return <URLTool />;
      case 'hex-tool':
        return <HexTool />;
      case 'rot13-tool':
        return <ROT13Tool />;
      case 'python-obfuscator':
        return <PythonObfuscator />;
      case 'php-obfuscator':
        return <PHPObfuscator />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'hash-cracker':
        return <HashCracker />;
      default:
        return <SubdomainFinder />;
    }
  };

  return (
    <main className={`
      flex-1 transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
    `}>
      <div className="p-6">
        <div className="animate-fade-in">
          {renderTool()}
        </div>
      </div>
    </main>
  );
};

export default MainContent;