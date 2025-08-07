import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !subCategory) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setSizes([])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <div className="add-product-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="header-text">
            <h1 className="page-title">Add New Product</h1>
            <p className="page-subtitle">Create a new product listing for your store</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="form-progress">
            <div className="progress-step active">
              <span className="step-number">1</span>
              <span className="step-label">Basic Info</span>
            </div>
            <div className="progress-step">
              <span className="step-number">2</span>
              <span className="step-label">Images</span>
            </div>
            <div className="progress-step">
              <span className="step-number">3</span>
              <span className="step-label">Details</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className="product-form">
        {/* Upload Images Section */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Product Images</h2>
            <p className="section-description">Upload up to 4 high-quality images of your product</p>
          </div>
          
          <div className="image-upload-grid">
            {[setImage1, setImage2, setImage3, setImage4].map((setImg, index) => {
              const image = [image1, image2, image3, image4][index];
              return (
                <label key={index} htmlFor={`image${index + 1}`} className="image-upload-item">
                  <div className="upload-area">
                    {image ? (
                      <div className="image-preview">
                        <img 
                          className="preview-image" 
                          src={URL.createObjectURL(image)} 
                          alt="Upload Preview" 
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="upload-text">Upload Image {index + 1}</span>
                        <span className="upload-hint">Click to browse</span>
                      </div>
                    )}
                  </div>
                  <input 
                    onChange={(e) => setImg(e.target.files[0])} 
                    type="file" 
                    id={`image${index + 1}`} 
                    className="hidden-input" 
                    accept="image/*"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Product Details</h2>
            <p className="section-description">Enter the basic information about your product</p>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Product Name</span>
                <span className="required-mark">*</span>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-input"
                type="text"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Price</span>
                <span className="required-mark">*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">₹</span>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="form-input price-input"
                  type="number"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">Description</span>
              <span className="required-mark">*</span>
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-textarea"
              rows="4"
              placeholder="Enter detailed product description..."
              required
            />
          </div>
        </div>

        {/* Category & Settings Section */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Category & Settings</h2>
            <p className="section-description">Organize your product and set preferences</p>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                onChange={(e) => setCategory(e.target.value)} 
                value={category} 
                className="form-select"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sub Category</label>
              <select 
                onChange={(e) => setSubCategory(e.target.value)} 
                value={subCategory} 
                className="form-select"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          </div>

          {/* Product Sizes */}
          <div className="form-group">
            <label className="form-label">Available Sizes</label>
            <div className="size-selector">
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSizes(prev => prev.includes(size) 
                    ? prev.filter(item => item !== size) 
                    : [...prev, size])}
                  className={`size-button ${sizes.includes(size) ? 'selected' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller Toggle */}
          <div className="form-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Mark as Bestseller</span>
            </label>
          </div>
        </div>

        {/* Submit Section */}
        <div className="form-actions">
          <button type="button" className="btn-secondary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
