import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  if (typeof getCartAmount !== 'function') {
    return <p className="text-red-500">Error: Unable to calculate cart total.</p>;
  }

  const subtotal = getCartAmount();
  const shipping = subtotal > 0 ? delivery_fee : 0;
  const total = subtotal + shipping;

  return (
    <div className='w-full text-right'>
      <div className='text-2xl'>
        <Title text1='CART' text2='TOTAL' />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{shipping.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between font-bold'>
          <p>Total</p>
          <p>{currency}{total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
