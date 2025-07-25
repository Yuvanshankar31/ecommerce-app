import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const backendUrl = 'https://ecommerce-backend-hjqt.onrender.com';



  const loadOrderData = async () => {
    try {
      if (!token) {
        console.error("User token not available.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {}, // No body needed anymore
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token is sent securely
          },
        }
      );
      console.log(token);
      

      console.log('Order API response:', response.data);

      if (response.data.success && response.data.orders) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date || 'Unknown';
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className='text-gray-500 text-center mt-10'>No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 sm:w-20 object-cover'
                  src={item.image && item.image.length > 0 ? item.image[0] : '/no-image.png'}
                  alt={item.name || 'Product'}
                />
                <div>
                  <p className='sm:text-base font-medium'>{item.name || 'Unnamed product'}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>Price: {currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2'>
                    Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className='mt-2'>
                    Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status || 'Pending'}</p>
                </div>
                <button 
  onClick={() => handleTrackOrder(item)} 
  className='border px-4 py-2 text-sm font-medium rounded-sm'
>
  Track Order
</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
