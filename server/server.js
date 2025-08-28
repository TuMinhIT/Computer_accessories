import http from "http";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routers/productRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import brandRoutes from "./routers/brandRoutes.js";
import adminRoutes from "./routers/adminRoutes.js";
import chatRoutes from "./routers/chatRoutes.js";
import { initChatSocket } from "./sockets/chatSocket.js";
import connectCloudinary from "./config/cloudinary.js";
import AdminController from "./controllers/AdminController.js";
import userRoutes from "./routers/userRoutes.js";
import customerRouter from "./routers/customerRouter.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
connectDB().then(AdminController.createDefaultAdmin);
connectCloudinary();

app.use(express.json());

app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes); 

const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);

initChatSocket(httpServer, {
  origin: "http://localhost:5173",
  credentials: true,
});


httpServer.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
