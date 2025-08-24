import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routers/productRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import brandRoutes from "./routers/brandRoutes.js";
import adminRoutes from "./routers/adminRoutes.js";

import connectCloudinary from "./config/cloudinary.js";
import AdminController from "./controllers/AdminController.js";
import userRoutes from "./routers/userRoutes.js";
import customerRouter from "./routers/customerRouter.js";
import cors from "cors";

dotenv.config();
const app = express();

connectDB().then(AdminController.createDefaultAdmin);
connectCloudinary();

app.use(express.json());
app.use(cors({ origin: "*" })); 

app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
