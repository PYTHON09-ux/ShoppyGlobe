import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Home, Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">ShoppyGlobe</span>
            <span className="text-3xl">🌎</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-indigo-600 text-white placeholder-indigo-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-white w-64"
              />
              <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
            </div>
          </nav>
          
          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-indigo-200 transition-colors">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <Link 
              to="/" 
              className="block py-2 hover:bg-indigo-600 rounded px-3 flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <div className="relative mt-3">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-indigo-600 text-white placeholder-indigo-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-white w-full"
              />
              <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;