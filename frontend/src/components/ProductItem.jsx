import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="card overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-neutral-100">
          <img 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
            src={image?.[0]} 
            alt={name} 
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          
          {/* Quick view button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium shadow-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </button>
          </div>
          
          {/* Badge for new items */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-neutral-900">
              {currency}{price}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
