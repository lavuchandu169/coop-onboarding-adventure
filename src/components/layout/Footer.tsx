
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png" 
                alt="KFC Logo" 
                className="h-8 w-auto object-contain bg-white rounded p-1"
              />
              <span className="font-bold text-xl">KFC Onboarding</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Streamlining the employee onboarding experience with our comprehensive digital checklist platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/auth" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/comprehensive" className="hover:text-white transition-colors">Comprehensive Form</Link></li>
              <li><Link to="/onboarding" className="hover:text-white transition-colors">Welcome Form</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Contact Support</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Training Resources</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 KFC. All rights reserved. Finger Lickin' Good!</p>
        </div>
      </div>
    </footer>
  );
};
