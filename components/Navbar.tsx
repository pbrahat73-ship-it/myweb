import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">TechFlow</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              to="/admin" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;