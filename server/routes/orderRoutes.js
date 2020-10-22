import express from "express";
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, isAdmin, updateOrderToDelivered);

export default router;
