import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"



const addProduct = async (req,res) =>{
  try {
    const {  name, description, price, category, subcategory, sizes, bestseller } = req.body
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

  let imagesUrl = await Promise.all(
     images.map(async (item)=> {
      let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
      return result.secure_url
     })

  )
     const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: new Date()
     }
     console.log(productData);
const product = new productModel(productData);
await product.save()



    res.json({success:true,message: "Product Added"})
  }
  catch (error) {
    console.log(error)
   res.json({succes:false,message:error.message})
  }
}


const listProducts = async (req,res) => {

try {

  const products = await productModel.find({})
  res.json({ success: true,products })
} catch (error) 
{
  console.log(error)
  res.json({ succes: false, message: error.message })

  }

}


const removeProduct = async (req,res) =>
{
 try{
     await productModel.findByIdAndDelete(req.body.id)
     res.json({success:true,message:"Product Removed"})
 } catch (error)
 {
    console.log(error)
    res.json({ success: false, message: error.message })
 }
}
const singleProduct = async (req,res) =>
    {
    
    try 
    {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({success:true,product})

    } catch (error) {

      console.log(error)
      res.json({ success: false, message: error.message })


    }


    }

const updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, category, subcategory, sizes, bestseller } = req.body
    
    console.log('Update request body:', req.body); // Debug log
    
    // Handle image uploads if new images are provided
    let imagesUrl = []
    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files.image1[0]
      const image2 = req.files.image2 && req.files.image2[0]
      const image3 = req.files.image3 && req.files.image3[0]
      const image4 = req.files.image4 && req.files.image4[0]

      const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
          return result.secure_url
        })
      )
    }

    // Parse sizes properly - handle both string and array
    let parsedSizes = ['S', 'M', 'L', 'XL']; // Default sizes
    if (sizes) {
      try {
        parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
      } catch (error) {
        console.log('Error parsing sizes:', error);
        // Keep default sizes if parsing fails
      }
    }

    const updateData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: parsedSizes,
      date: new Date()
    }

    // Only update images if new ones were uploaded
    if (imagesUrl.length > 0) {
      updateData.image = imagesUrl
    }

    console.log('Updating product with ID:', id);
    console.log('Update data:', updateData);

    const product = await productModel.findByIdAndUpdate(id, updateData, { new: true })
    
    if (!product) {
      return res.json({ success: false, message: "Product not found" })
    }

    res.json({ success: true, message: "Product Updated Successfully", product })
  } catch (error) {
    console.log('Update product error:', error)
    res.json({ success: false, message: error.message })
  }
}
    
export {listProducts,addProduct,removeProduct,singleProduct,updateProduct}
