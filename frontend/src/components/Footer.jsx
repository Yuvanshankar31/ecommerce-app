import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

<div>
    <img src={assets.logo} className='mb-5 w-32 alt="'/>
    <p className='w-fu'>
Lorem Ipsum is Simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500, when an unknown printer took a galley of type and scrambled it to make type specimen book.
    </p>
</div>

<div>
    <p className='text-xl font-medium mb-5'>COMPANY</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
    <li>Home</li>
    <li>About</li>
    <li>Delivery</li>
    <li>Privacy policy</li>
    </ul>
</div>


<div>
<p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
<ul className='flex flex-col gap-1 text-gray-600'>
<li>+918610526897</li>
<li>sksyuvanshankar@gmail.com</li>


</ul>
</div>
    </div>


<div>
    <hr />
    <p className='py-5 text-sm text-center'>Copyright 2025@ outlook.com -All Rigth Reserved</p>
</div>


    </div>
  )
}

export default Footer
