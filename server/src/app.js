import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routers/userRoutes.js";
import brandRoutes from "./routers/brandRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import productRoutes from "./routers/productRoutes.js";
import cartRoutes from "./routers/cartRoutes.js";
import orderRoutes from "./routers/orderRoutes.js";
import paymentRoutes from "./routers/paymentRoutes.js";

import notFound from "./middleware/notFound.js"
import errorHandler from "./middleware/errorHandler.middleware.js"
dotenv.config();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS.split(","),
    credentials: true,
  }),
);

// root test
app.get("/", (req, res) => {
  res.json({ service: "Computer accessories server", status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// global error handler
app.use(notFound);
app.use(errorHandler);

export default app;
