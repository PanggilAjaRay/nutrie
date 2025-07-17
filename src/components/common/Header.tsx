import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-500">Nutrié</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-500 transition-colors">
              Home
            </Link>
            <Link to="/foods" className="text-gray-700 hover:text-green-500 transition-colors">
              Foods
            </Link>
            <Link to="/beverages" className="text-gray-700 hover:text-green-500 transition-colors">
              Beverages
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-500 transition-colors">
              About
            </Link>
            
            
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-green-500 transition-colors py-2">
              Home
            </Link>
            <Link to="/foods" className="text-gray-700 hover:text-green-500 transition-colors py-2">
              Foods
            </Link>
            <Link to="/beverages" className="text-gray-700 hover:text-green-500 transition-colors py-2">
              Beverages
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-500 transition-colors py-2">
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;