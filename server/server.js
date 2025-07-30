import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routers/productRoutes.js';
import categoryRoutes from './routers/categoryRoutes.js';        // ⬅️ thêm dòng này
import subcategoryRoutes from './routers/subcategoryRoutes.js';  // ⬅️ thêm dòng này
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);          // ⬅️ thêm dòng này
app.use('/api/subcategories', subcategoryRoutes);    // ⬅️ thêm dòng này

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
