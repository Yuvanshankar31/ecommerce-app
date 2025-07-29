import React from 'react'
import heroImg from '../assets/hero_img.png';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[600px] py-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                NEW ARRIVALS
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
                Discover Your
                <span className="text-gradient-primary block">Perfect Style</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Explore our latest collection of premium fashion items. From casual wear to elegant pieces, 
                find your unique style with our curated selection.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="btn-primary">
                  Shop Now
                </button>
                <button className="btn-outline">
                  View Collection
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">500+</div>
                  <div className="text-sm text-neutral-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">50K+</div>
                  <div className="text-sm text-neutral-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">24/7</div>
                  <div className="text-sm text-neutral-600">Support</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1 relative">
            <div className="relative z-10 animate-slide-up">
              <img 
                src={heroImg} 
                alt="Fashion Collection" 
                className="w-full h-auto rounded-2xl shadow-large"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full opacity-20 animate-bounce-gentle"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-accent rounded-full opacity-20 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-secondary opacity-5 rounded-full translate-y-32 -translate-x-32"></div>
    </section>
  )
}

export default Hero
