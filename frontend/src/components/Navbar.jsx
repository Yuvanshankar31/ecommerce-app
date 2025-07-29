import React, { useState, useContext } from "react"; 
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation();
  
  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-soft w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to='/' className="flex items-center h-full py-2">
            <img 
              src={logo} 
              className="h-14 sm:h-16 md:h-20 w-auto object-contain" 
              alt="Logo" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to='/' 
              className={`relative font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-primary-600' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              HOME
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </NavLink>
            <NavLink 
              to='/collection' 
              className={`relative font-medium transition-colors duration-200 ${
                isActive('/collection') 
                  ? 'text-primary-600' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              COLLECTION
              {isActive('/collection') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </NavLink>
            <NavLink 
              to='/about' 
              className={`relative font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-primary-600' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              ABOUT
              {isActive('/about') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </NavLink>
            <NavLink 
              to='/contact' 
              className={`relative font-medium transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'text-primary-600' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              CONTACT
              {isActive('/contact') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </NavLink>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search */}
            <button 
              onClick={() => setShowSearch(true)} 
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              <img src={assets.search_icon} className="w-5 h-5" alt="Search" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => token ? null : navigate('/login')}
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
              >
                <img className="w-5 h-5" src={assets.profile_icon} alt="Profile" />
              </button>
              
              {token && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200">
                      My Profile
                    </button>
                    <button 
                      onClick={() => navigate('/orders')}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                    >
                      Orders
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to='/cart' className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200">
              <img src={assets.cart_icon} className="w-5 h-5" alt="Cart" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setVisible(!visible)}
              className="md:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              <img src={assets.menu_icon} className="w-5 h-5" alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-0 left-0 h-full w-80 bg-white shadow-large transform transition-transform duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
              <button 
                onClick={() => setVisible(false)}
                className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6">
              <div className="space-y-1">
                <NavLink 
                  to='/' 
                  onClick={() => setVisible(false)}
                  className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/') 
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600' 
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  HOME
                </NavLink>
                <NavLink 
                  to='/collection' 
                  onClick={() => setVisible(false)}
                  className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/collection') 
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600' 
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  COLLECTION
                </NavLink>
                <NavLink 
                  to='/about' 
                  onClick={() => setVisible(false)}
                  className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/about') 
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600' 
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  ABOUT
                </NavLink>
                <NavLink 
                  to='/contact' 
                  onClick={() => setVisible(false)}
                  className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/contact') 
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600' 
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  CONTACT
                </NavLink>
              </div>
            </div>

            {/* User Actions for Mobile */}
            <div className="p-6 border-t border-neutral-200">
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setVisible(false);
                    setShowSearch(true);
                  }}
                  className="w-full flex items-center px-4 py-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                >
                  <img src={assets.search_icon} className="w-5 h-5 mr-3" alt="Search" />
                  Search
                </button>
                {token ? (
                  <>
                    <button 
                      onClick={() => {
                        setVisible(false);
                        navigate('/orders');
                      }}
                      className="w-full flex items-center px-4 py-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Orders
                    </button>
                    <button 
                      onClick={() => {
                        setVisible(false);
                        logout();
                      }}
                      className="w-full flex items-center px-4 py-3 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setVisible(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center px-4 py-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Sign In
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-200">
              <div className="text-sm text-neutral-500">
                © 2024 Your Store. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
