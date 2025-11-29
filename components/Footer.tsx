import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">TechFlow</h3>
            <p className="text-sm leading-relaxed">
              Your daily source for the latest in technology, development, and AI. Built with React & Gemini AI.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artificial Intelligence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cyber Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {/* Mock Social Icons */}
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">X</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">in</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">fb</div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} TechFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;