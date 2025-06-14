export type ToolType = 
  | 'subdomain-finder'
  | 'whois-lookup'
  | 'dns-lookup'
  | 'reverse-ip'
  | 'ip-geolocation'
  | 'port-scanner'
  | 'md5-tool'
  | 'base64-tool'
  | 'sha-tool'
  | 'url-tool'
  | 'hex-tool'
  | 'rot13-tool'
  | 'python-obfuscator'
  | 'php-obfuscator'
  | 'password-generator'
  | 'hash-cracker';

export interface ToolCategory {
  id: string;
  name: string;
  icon: string;
  tools: {
    id: ToolType;
    name: string;
    description: string;
  }[];
}

export interface SubdomainResult {
  subdomain: string;
  issuer: string;
  date: string;
}