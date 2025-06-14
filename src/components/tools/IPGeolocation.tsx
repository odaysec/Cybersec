import React, { useState } from 'react';
import { MapPin, Search, AlertCircle, Loader, Globe } from 'lucide-react';

const IPGeolocation: React.FC = () => {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupLocation = async () => {
    if (!ip.trim()) {
      setError('Please enter an IP address');
      return;
    }

    setLoading(true);
    setError('');
    setLocation(null);

    try {
      // Simulated geolocation lookup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockLocation = {
        ip: ip,
        country: 'United States',
        countryCode: 'US',
        region: 'California',
        regionName: 'CA',
        city: 'San Francisco',
        zip: '94107',
        lat: 37.7749,
        lon: -122.4194,
        timezone: 'America/Los_Angeles',
        isp: 'Example ISP',
        org: 'Example Organization',
        as: 'AS12345 Example ASN'
      };

      setLocation(mockLocation);
    } catch (err) {
      setError('Failed to perform IP geolocation lookup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">IP Geolocation</h1>
        <p className="text-gray-400">Find the geographic location of any IP address</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Enter IP address (e.g., 8.8.8.8)"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-400"
              onKeyPress={(e) => e.key === 'Enter' && lookupLocation()}
            />
          </div>
          <button
            onClick={lookupLocation}
            disabled={loading}
            className="px-6 py-3 bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? 'Locating...' : 'Locate'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {location && (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-matrix-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Location Information</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">IP Address:</span>
                <span className="text-white font-mono">{location.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Country:</span>
                <span className="text-white">{location.country} ({location.countryCode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Region:</span>
                <span className="text-white">{location.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">City:</span>
                <span className="text-white">{location.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ZIP Code:</span>
                <span className="text-white">{location.zip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timezone:</span>
                <span className="text-white">{location.timezone}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="text-cyber-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Network Information</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Latitude:</span>
                <span className="text-white font-mono">{location.lat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Longitude:</span>
                <span className="text-white font-mono">{location.lon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ISP:</span>
                <span className="text-white">{location.isp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Organization:</span>
                <span className="text-white">{location.org}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">AS Number:</span>
                <span className="text-white font-mono">{location.as}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About IP Geolocation</h3>
        <div className="space-y-2 text-gray-300">
          <p>• IP geolocation determines the approximate geographic location of an IP address</p>
          <p>• Accuracy varies - typically more accurate for ISP locations than individual users</p>
          <p>• Useful for content localization, fraud detection, and analytics</p>
          <p>• VPNs and proxies can mask the true location</p>
          <p>• Location data is based on databases maintained by various providers</p>
        </div>
      </div>
    </div>
  );
};

export default IPGeolocation;