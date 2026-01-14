import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import isAuth from "../middleware/is-auth.js"; // ✅ import middleware
const router = express.Router();

router.post("/", isAuth, createOrder);
router.get("/", isAuth, getOrders);

export default router;
