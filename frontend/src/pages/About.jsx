import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'; 

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laboriosam accusantium perspiciatis quae? Sequi nemo praesentium quod sapiente aspernatur, consequatur voluptate deserunt eaque rerum maxime beatae alias quidem dolorum doloribus dolorem.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas repudiandae reprehenderit suscipit, mollitia doloribus commodi quia voluptatum officia dolorum, porro quasi voluptate omnis? Voluptate atque itaque voluptatibus, nisi delectus architecto beatae dolor quaerat corrupti recusandae omnis vero quisquam possimus aspernatur.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis sequi voluptatibus laudantium dolores doloremque, incidunt, facere ducimus rem est dolor pariatur tempore alias magnam itaque reprehenderit, reiciendis earum. Quasi natus animi porro</p>
        </div>
      </div>
      <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'} />
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Quality Assurance:</b>
      <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
    </div>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Convenience:</b>
      <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
    </div>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Exceptional Customer Service:</b>
      <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way,ensuring your satisfaction is our top priority.</p>
    </div>
    </div>



<NewsletterBox/>



    </div>
  )
}

export default About
