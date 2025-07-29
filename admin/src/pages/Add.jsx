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
        headers: { token },
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
    <div className="admin-content">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
          Add New Product
        </h1>
        <p className="text-neutral-600">
          Create a new product listing for your store
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        {/* Upload Images */}
        <div className="form-group">
          <label className="form-label">Product Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[setImage1, setImage2, setImage3, setImage4].map((setImg, index) => {
              const image = [image1, image2, image3, image4][index];
              return (
                <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
                  <div className="aspect-square bg-neutral-100 rounded-lg border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors duration-200 flex items-center justify-center">
                    {image ? (
                      <img 
                        className="w-full h-full object-cover rounded-lg" 
                        src={URL.createObjectURL(image)} 
                        alt="Upload Preview" 
                      />
                    ) : (
                      <div className="text-center">
                        <img className="w-8 h-8 mx-auto mb-2 opacity-50" src={assets.upload_area} alt="Upload" />
                        <p className="text-xs text-neutral-500">Image {index + 1}</p>
                      </div>
                    )}
                  </div>
                  <input 
                    onChange={(e) => setImg(e.target.files[0])} 
                    type="file" 
                    id={`image${index + 1}`} 
                    className="hidden" 
                    accept="image/*"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input-field"
              type="text"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="input-field"
              type="number"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="textarea-field"
            rows="4"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category} 
              className="select-field"
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
              className="select-field"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Product Sizes */}
        <div className="form-group">
          <label className="form-label">Product Sizes</label>
          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => prev.includes(size) 
                  ? prev.filter(item => item !== size) 
                  : [...prev, size])}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                  sizes.includes(size) 
                    ? 'border-primary-600 bg-primary-50 text-primary-700' 
                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Toggle */}
        <div className="form-group">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 mr-3"
            />
            <span className="text-neutral-700">Mark as Bestseller</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
