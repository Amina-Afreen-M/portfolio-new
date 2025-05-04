import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-lighter py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="/deltaVerse logo.jpg" alt="deltaVerse Logo" className="h-8 w-8 object-contain rounded-sm mr-2" />
            <span className="text-xl font-heading font-bold text-white">
              delta<span className="glow-text-pink">V</span><span className="glow-text-green">erse</span>
            </span>
          </div>
          
          <div>
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="p-3 bg-background rounded-full text-white hover:text-neon-green transition-colors duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Design Delta Studio. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-sm text-neutral-400 hover:text-neon-green transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-neutral-400 hover:text-neon-green transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-neutral-400 hover:text-neon-green transition-colors duration-300">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;