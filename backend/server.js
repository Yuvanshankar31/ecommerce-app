import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;


connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
// Root route
app.get('/', (req, res) => {
  res.send("🟢 API Working");
});

// Catch-all route (optional)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`);
});
