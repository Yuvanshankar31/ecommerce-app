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
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' 
                       src={productData?.image?.[0] || 'https://via.placeholder.com/150'} 
                       alt={productData?.name || 'Product'} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData?.name || 'Unknown Product'}</p> 
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData?.price || '0.00'}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                  type="number" 
                  min={1} 
                  value={quantities[item._id]?.[item.size] || item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, item.size, Number(e.target.value))}
                />
                <img 
                  className='w-4 mr-4 sm:w-5 cursor-pointer' 
                  src={binIcon} 
                  alt="Delete Item"
                  onClick={() => handleRemoveItem(item._id, item.size)}
                />
              </div>
            );
          })
        ) : (
          <p className='text-gray-500 text-center'>Your cart is empty.</p>
        )}
      </div>

      {/* Right Side Cart Total Section */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px] flex flex-col items-end text-right'>
          <CartTotal />
          <button 
            onClick={() => navigate('/place-order')} 
            className='bg-black text-white text-sm my-8 px-8 py-3'>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
