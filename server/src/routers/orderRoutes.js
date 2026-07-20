import express from "express";
import {
  createOrder,
  getOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user", getUserOrders);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrder);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
