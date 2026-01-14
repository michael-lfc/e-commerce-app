import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller.js";
import  isAuth  from "../middleware/is-auth.js"; // middleware to protect routes

const router = express.Router();

// Get the current user's cart
router.get("/", isAuth, getCart);

// Add a product to the cart
router.post("/add", isAuth, addToCart);

// Remove a product from the cart
router.post("/remove", isAuth, removeFromCart);

export default router;
