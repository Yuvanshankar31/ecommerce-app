import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    console.log('Toggling subCategory:', value);
    setSubCategory((prev) => {
      const newValue = prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
      console.log('New subCategory state:', newValue);
      return newValue;
    });
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        // Handle both subCategory and subcategory field names
        const itemSubCategory = item.subCategory || item.subcategory;
        console.log('Filtering:', { 
          itemSubCategory, 
          subCategory, 
          matches: subCategory.includes(itemSubCategory) 
        });
        return subCategory.includes(itemSubCategory);
      });
    }

    setFilterProducts(productsCopy);
  };

  // Sorting function
  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    setFilterProducts(products);
    // Debug: Log first few products to see their structure
    if (products.length > 0) {
      console.log('Sample products:', products.slice(0, 3).map(p => ({
        name: p.name,
        category: p.category,
        subCategory: p.subCategory,
        subcategory: p.subcategory
      })));
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="lg:w-80">
          {/* Filter Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Filters</h2>
            <button 
              onClick={() => setShowFilter(!showFilter)} 
              className="lg:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>

          {/* Filter Content */}
          <div className={`lg:block ${showFilter ? 'block' : 'hidden'}`}>
            {/* Categories Filter */}
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {['Men', 'Women', 'Kids'].map((item) => (
                  <label key={item} className="flex items-center cursor-pointer group">
                    <input 
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2" 
                      type="checkbox" 
                      value={item} 
                      onChange={toggleCategory} 
                    />
                    <span className="ml-3 text-neutral-700 group-hover:text-primary-600 transition-colors duration-200">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Type</h3>
              <div className="space-y-3">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                  <label key={item} className="flex items-center cursor-pointer group">
                    <input 
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2" 
                      type="checkbox" 
                      value={item} 
                      onChange={toggleSubCategory} 
                    />
                    <span className="ml-3 text-neutral-700 group-hover:text-primary-600 transition-colors duration-200">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <Title text1="ALL" text2="COLLECTIONS" />
            <div className="mt-4 sm:mt-0">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="input-field w-full sm:w-auto"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-neutral-600">
              Showing {filterProducts.length} of {products.length} products
            </p>
          </div>

          {/* Products Grid */}
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No products found</h3>
              <p className="text-neutral-600 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => {
                  setCategory([]);
                  setSubCategory([]);
                  setSortType('relevant');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
