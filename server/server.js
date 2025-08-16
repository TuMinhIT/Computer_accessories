import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routers/productRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import brandRoutes from "./routers/brandRoutes.js";
import adminRoutes from "./routers/adminRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import { createDefaultAdmin } from "./controllers/AdminController.js";
import customerRouter from "./routers/customerRouter.js";
import cors from "cors";

dotenv.config();
const app = express();

connectDB().then(createDefaultAdmin);
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/brands", brandRoutes);

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
