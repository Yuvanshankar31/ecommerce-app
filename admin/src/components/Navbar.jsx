import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <nav className="admin-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              className="h-10 w-auto" 
              src={assets.logo} 
              alt="Admin Logo" 
            />
            <div className="ml-4">
              <h1 className="text-xl font-display font-bold text-neutral-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-neutral-600">
                Manage your ecommerce store
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-neutral-600">
              Welcome, Admin
            </div>
            <button 
              onClick={() => setToken('')}
              className="btn-danger text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
