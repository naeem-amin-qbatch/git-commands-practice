import dotenv from 'dotenv'
import express, { json, urlencoded } from "express";
import connectDB from './config/databaseConnection.js';
import productRoute from './routes/product.js';
import userRoute from './routes/user.js';
import cartRoute from './routes/cart.js';
import cors from 'cors';
dotenv.config()
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
const { PORT } = process.env;

///////////// ROUTES  /////////////
app.use('/products',productRoute)
app.use('/users',userRoute)
app.use('/cart',cartRoute)
app.listen(PORT, async () => {
    await connectDB();
    console.log('Server running on port 3000');
  })