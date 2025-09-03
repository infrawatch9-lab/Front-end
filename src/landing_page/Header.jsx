import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Moon,
  BarChart3,
} from 'lucide-react';

// Header Component
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">InfraWatch</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
          <a href="#services" className="text-slate-300 hover:text-white transition-colors">Services</a>
          <a href="#integrations" className="text-slate-300 hover:text-white transition-colors">Integrations</a>
          <a href="#api" className="text-slate-300 hover:text-white transition-colors">API</a>
          <a href="#team" className="text-slate-300 hover:text-white transition-colors">Team</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-300 hover:text-white transition-colors"
          >
            <Moon className="w-5 h-5" />
          </button>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
