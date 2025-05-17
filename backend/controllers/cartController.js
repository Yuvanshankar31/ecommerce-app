import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
      const { itemId, size } = req.body;
      const userId = req.user.id;
  
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData;
  
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
  
      await userModel.findByIdAndUpdate(userId, { cartData });
  
      res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

const updateCart = async (req,res) => {

try {
    const { itemId, size, quantity } = req.body;
const userId = req.user.id;

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;

   cartData[itemId][size] = quantity


   await userModel.findByIdAndUpdate(userId, {cartData})
   res.json({ success: true, message: "Cart Updated " })


} catch (error) {

}














}

const getUserCart = async (req,res) => {

try {
    const userId = req.user.id;



    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;

    res.json({ success: true, cartData})
}

catch (error) {

    console.log(error)
    res.json({ success: false, message: error.message})



}



}
const removeFromCart = async (req, res) => {
    try {
      const { itemId, size } = req.body;
      const userId = req.user.id;
  
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData;
  
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
  
        // Remove product entirely if all sizes are gone
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
  
        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Item removed from cart" });
      }
  
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export { addToCart, updateCart, getUserCart,removeFromCart }