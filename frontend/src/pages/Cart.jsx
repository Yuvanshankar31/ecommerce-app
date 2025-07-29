import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'; 
import binIcon from '../assets/bin_icon.png'; 
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    const newQuantities = {};

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size]
          });

          if (!newQuantities[productId]) newQuantities[productId] = {};
          newQuantities[productId][size] = cartItems[productId][size];
        }
      }
    }

    setCartData(tempData);
    setQuantities(newQuantities);
  }, [cartItems]);

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantities((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [size]: newQuantity }
    }));

    updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = (productId, size) => {
    removeFromCart(productId, size);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900">Shopping Cart ({cartData.length} items)</h2>
              </div>
              
              <div className="divide-y divide-neutral-200">
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  return (
                    <div key={index} className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img 
                            className="w-20 h-20 object-cover rounded-lg" 
                            src={productData?.image?.[0] || 'https://via.placeholder.com/150'} 
                            alt={productData?.name || 'Product'} 
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-neutral-900 truncate">
                            {productData?.name || 'Unknown Product'}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-lg font-bold text-primary-600">
                              {currency}{productData?.price || '0.00'}
                            </span>
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                              Size: {item.size}
                            </span>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.size, (quantities[item._id]?.[item.size] || item.quantity) - 1)}
                            className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <input 
                            className="w-16 text-center border border-neutral-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                            type="number" 
                            min={1} 
                            value={quantities[item._id]?.[item.size] || item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, item.size, Number(e.target.value))}
                          />
                          
                          <button
                            onClick={() => handleQuantityChange(item._id, item.size, (quantities[item._id]?.[item.size] || item.quantity) + 1)}
                            className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item._id, item.size)}
                          className="p-2 text-neutral-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5.07 7H5a2 2 0 01-2-2V5a2 2 0 012-2h4a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Order Summary</h3>
                <CartTotal />
                <button 
                  onClick={() => navigate('/place-order')} 
                  className="w-full btn-primary mt-6"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">Your cart is empty</h3>
          <p className="text-neutral-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <button 
            onClick={() => navigate('/collection')}
            className="btn-primary"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
