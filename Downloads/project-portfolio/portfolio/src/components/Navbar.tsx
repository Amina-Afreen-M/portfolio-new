import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Case Studies', to: 'case-studies' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-sm py-2 sm:py-3 shadow-lg' : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <img src="/deltaVerse logo.jpg" alt="deltaVerse Logo" className="h-6 w-6 sm:h-8 sm:w-8 object-contain rounded-sm mr-2" />
          <span className="text-lg sm:text-xl font-heading font-bold text-white">
            delta<span className="glow-text-pink">V</span><span className="glow-text-green">erse</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="relative text-neutral-200 hover:text-neon-green cursor-pointer transition-colors duration-300 px-2 py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden bg-background-lighter overflow-hidden mobile-navbar-half`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-3">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
              className="text-xs sm:text-base text-neutral-200 hover:text-neon-green cursor-pointer transition-colors duration-300 px-2 py-1 sm:px-3 sm:py-1.5 border-b border-neon-green w-full text-center"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;