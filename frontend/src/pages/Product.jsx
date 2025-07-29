import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={image} 
              alt={productData.name} 
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-4 overflow-x-auto">
            {productData.image.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  item === image ? 'border-primary-600' : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <img 
                  src={item} 
                  className="w-full h-full object-cover" 
                  alt={`Product image ${index + 1}`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Title */}
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
              {productData.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(4)].map((_, index) => (
                  <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-neutral-600">(122 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary-600">
            {currency}{productData.price}
          </div>

          {/* Description */}
          <p className="text-neutral-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)} 
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                    item === size 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
              size 
                ? 'btn-primary' 
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            {size ? 'Add to Cart' : 'Select a Size'}
          </button>

          {/* Product Features */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% Original product</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cash on delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Easy return and exchange within 7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-neutral-200">
          <div className="flex">
            <button className="px-6 py-4 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
              Description
            </button>
            <button className="px-6 py-4 text-sm font-medium text-neutral-600 hover:text-neutral-900">
              Reviews (122)
            </button>
          </div>
        </div>
        
        <div className="py-8">
          <div className="prose max-w-none text-neutral-600 space-y-4">
            <p>
              An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. 
              It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, 
              and conduct transactions without the need for a physical presence.
            </p>
            <p>
              E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available 
              variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {productData.category && productData.subCategory && (
        <div className="mt-16">
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
      )}
    </div>
  ) : (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">Product not found</h3>
        <p className="text-neutral-600">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    </div>
  );
};

export default Product;