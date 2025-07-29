import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img className="sidebar-logo-img" src={assets.logo} alt="Logo" />
          </div>
          <h2 className="sidebar-title">Admin Panel</h2>
        </div>
        
        <nav className="sidebar-navigation">
          <div className="nav-section">
            <h3 className="nav-section-title">Management</h3>
            <div className="nav-links">
              <NavLink 
                to="/add"
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <div className="nav-icon">
                  <img className="icon-img" src={assets.add_icon} alt="Add" />
                </div>
                <span className="nav-text">Add Products</span>
                <div className="nav-indicator"></div>
              </NavLink>
              
              <NavLink 
                to="/list"
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <div className="nav-icon">
                  <img className="icon-img" src={assets.order_icon} alt="List" />
                </div>
                <span className="nav-text">Manage Products</span>
                <div className="nav-indicator"></div>
              </NavLink>

              <NavLink 
                to="/orders"
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <div className="nav-icon">
                  <img className="icon-img" src={assets.order_icon} alt="Orders" />
                </div>
                <span className="nav-text">Order Management</span>
                <div className="nav-indicator"></div>
              </NavLink>
            </div>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className="stats-card">
            <h3 className="stats-title">Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon stat-icon-products">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">150</span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon stat-icon-orders">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon stat-icon-revenue">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">₹45K</span>
                  <span className="stat-label">Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
