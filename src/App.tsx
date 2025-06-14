import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { ToolType } from './types';

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('subdomain-finder');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeTool={activeTool}
          onToolSelect={setActiveTool}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <MainContent 
          activeTool={activeTool}
          sidebarOpen={sidebarOpen}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;