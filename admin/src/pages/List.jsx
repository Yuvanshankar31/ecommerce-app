import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const fetchList = async () => {
    setLoading(true)
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) 
      {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.post(backendUrl + '/api/product/remove', {id} , {headers:{token}})
        if (response.data.success) {
          toast.success(response.data.message)
          await fetchList();
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  useEffect(()=> {
    fetchList()
  },[])

  // Filter products based on search and category
  const filteredProducts = list.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(list.map(item => item.category))]

  return (
    <div className="manage-products-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Manage Products</h1>
          <p className="page-subtitle">View and manage all your products</p>
        </div>
        <div className="header-actions">
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-number">{list.length}</span>
              <span className="stat-label">Total Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-filter">
          <div className="search-input-wrapper">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="category-filter">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="products-table">
            <div className="table-header">
              <div className="header-cell header-image">Image</div>
              <div className="header-cell header-name">Product Name</div>
              <div className="header-cell header-category">Category</div>
              <div className="header-cell header-price">Price</div>
              <div className="header-cell header-status">Status</div>
              <div className="header-cell header-actions">Actions</div>
            </div>
            
            <div className="table-body">
              {filteredProducts.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell cell-image">
                    <div className="product-image">
                      <img src={item.image[0]} alt={item.name} />
                    </div>
                  </div>
                  
                  <div className="table-cell cell-name">
                    <div className="product-info">
                      <h4 className="product-name">{item.name}</h4>
                      <p className="product-description">{item.description?.substring(0, 50)}...</p>
                    </div>
                  </div>
                  
                  <div className="table-cell cell-category">
                    <span className="category-badge">{item.category}</span>
                  </div>
                  
                  <div className="table-cell cell-price">
                    <span className="price-amount">{currency}{item.price}</span>
                  </div>
                  
                  <div className="table-cell cell-status">
                    <span className={`status-badge ${item.bestseller ? 'status-bestseller' : 'status-regular'}`}>
                      {item.bestseller ? 'Bestseller' : 'Regular'}
                    </span>
                  </div>
                  
                  <div className="table-cell cell-actions">
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn"
                        title="Edit Product"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => removeProduct(item._id)}
                        title="Delete Product"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
