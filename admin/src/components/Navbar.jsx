import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <nav className="admin-header">
      <div className="header-container">
        <div className="header-content">
          <div className="brand-section">
            <div className="logo-container">
              <img 
                className="admin-logo" 
                src={assets.logo} 
                alt="Admin Logo" 
              />
            </div>
            <div className="brand-info">
              <h1 className="brand-title">
                Admin Dashboard
              </h1>
              <p className="brand-subtitle">
                Manage your ecommerce store
              </p>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="user-info">
              <div className="user-avatar">
                <svg className="avatar-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="user-details">
                <span className="user-name">Welcome, Admin</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
            <button 
              onClick={() => setToken('')}
              className="logout-btn"
            >
              <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
