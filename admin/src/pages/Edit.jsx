import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    sizes: ['S', 'M', 'L', 'XL'],
    bestseller: false
  });

  // Image state
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const [existingImages, setExistingImages] = useState([]);

  // Categories for dropdown
  const categories = [
    'Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Bags', 'Jewelry'
  ];

  const subcategories = {
    'Men': ['Shirts', 'Pants', 'Jackets', 'T-Shirts', 'Formal Wear'],
    'Women': ['Dresses', 'Tops', 'Skirts', 'Jeans', 'Outerwear'],
    'Kids': ['Boys', 'Girls', 'Infants', 'School Wear'],
    'Accessories': ['Hats', 'Belts', 'Scarves', 'Sunglasses'],
    'Footwear': ['Sneakers', 'Formal Shoes', 'Boots', 'Sandals'],
    'Bags': ['Handbags', 'Backpacks', 'Wallets', 'Luggage'],
    'Jewelry': ['Necklaces', 'Earrings', 'Rings', 'Bracelets']
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId: id });
      if (response.data.success) {
        const productData = response.data.product;
        setProduct(productData);
        setFormData({
          name: productData.name || '',
          description: productData.description || '',
          price: productData.price || '',
          category: productData.category || '',
          subcategory: productData.subcategory || '',
          sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
          bestseller: productData.bestseller || false
        });
        setExistingImages(productData.image || []);
      } else {
        toast.error(response.data.message);
        navigate('/admin/list');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch product');
      navigate('/admin/list');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      setImages(prev => ({
        ...prev,
        [imageKey]: file
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key === 'sizes') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add product ID
      formDataToSend.append('id', id);

      // Add images if selected
      Object.keys(images).forEach(key => {
        if (images[key]) {
          formDataToSend.append(key, images[key]);
        }
      });

      console.log('Submitting form data:', {
        id,
        formData,
        images: Object.keys(images).filter(key => images[key])
      });

      const response = await axios.post(backendUrl + '/api/product/update', formDataToSend, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Update response:', response.data);

      if (response.data.success) {
        toast.success('Product updated successfully!');
        navigate('/admin/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Update error:', error);
      toast.error('Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-product-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-product-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Edit Product</h1>
          <p className="page-subtitle">Update product information and images</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Basic Information */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Basic Information</h2>
            <p className="section-description">Update the basic details of your product</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Product Name</span>
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Price</span>
                <span className="required-mark">*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">{currency}</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input price-input"
                  required
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Category</span>
                <span className="required-mark">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Subcategory</span>
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Subcategory</option>
                {formData.category && subcategories[formData.category]?.map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">Description</span>
              <span className="required-mark">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              required
              placeholder="Enter product description"
              rows="4"
            />
          </div>
        </div>

        {/* Product Options */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Product Options</h2>
            <p className="section-description">Configure product settings and availability</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Available Sizes</span>
              </label>
              <div className="size-selector">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`size-button ${formData.sizes.includes(size) ? 'selected' : ''}`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={formData.bestseller}
                  onChange={handleInputChange}
                  className="toggle-input"
                />
                <span className="toggle-slider"></span>
                <span className="toggle-text">Mark as Bestseller</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Product Images</h2>
            <p className="section-description">Update product images (leave empty to keep existing images)</p>
          </div>

          <div className="image-upload-grid">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="image-upload-item">
                <input
                  type="file"
                  id={`image${num}`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, `image${num}`)}
                  className="hidden-input"
                />
                <label htmlFor={`image${num}`} className="upload-area">
                  {images[`image${num}`] ? (
                    <div className="image-preview">
                      <img
                        src={URL.createObjectURL(images[`image${num}`])}
                        alt={`Preview ${num}`}
                        className="preview-image"
                      />
                      <div className="image-overlay">
                        <svg className="overlay-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  ) : existingImages[num - 1] ? (
                    <div className="image-preview">
                      <img
                        src={existingImages[num - 1]}
                        alt={`Existing ${num}`}
                        className="preview-image"
                      />
                      <div className="image-overlay">
                        <svg className="overlay-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="upload-text">Upload Image {num}</div>
                      <div className="upload-hint">Click to select</div>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/list')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;