import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;
    const deliveryCharge = 10;         // You can fetch this from config or calculate dynamically
    const currency = 'inr';
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;
    const { origin } = req.headers;

    const deliveryCharge = 49;
    const currency = 'inr';

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userId = req.user.id; // From authUser middleware

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const allOrders = async (req, res) => {

  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) { // ✅ catch block properly takes error
    console.error("Error in allOrders:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }







}

const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ From token via middleware

    const orders = await orderModel.find({ userId }).populate('items.product');

    res.status(200).json({
      success: true,
      message: "User Orders",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error getting user orders",
      error,
    });
  }
};


const updateStatus = async (req, res) => {


  try {
    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status Updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }






}
export { verifyStripe, placeOrder, placeOrderStripe, allOrders, updateStatus, userOrders, } 