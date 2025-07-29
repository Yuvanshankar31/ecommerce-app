import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <aside className="admin-sidebar w-64 min-h-screen">
      <div className="p-6">
        <div className="space-y-2">
          <NavLink 
            to="/add"
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <img className="w-5 h-5 mr-3" src={assets.add_icon} alt="Add" />
            <span className="font-medium">Add Items</span>
          </NavLink>
          
          <NavLink 
            to="/list"
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <img className="w-5 h-5 mr-3" src={assets.order_icon} alt="List" />
            <span className="font-medium">List Items</span>
          </NavLink>

          <NavLink 
            to="/orders"
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <img className="w-5 h-5 mr-3" src={assets.order_icon} alt="Orders" />
            <span className="font-medium">Orders</span>
          </NavLink>
        </div>
        
        {/* Admin Stats */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
          <h3 className="text-sm font-semibold text-neutral-700 mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Total Products</span>
              <span className="font-medium text-neutral-900">150</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Pending Orders</span>
              <span className="font-medium text-primary-600">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Revenue</span>
              <span className="font-medium text-success-600">₹45,230</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
