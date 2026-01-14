// // routes/admin.routes.// routes/admin.routes.js
import express from "express";
import  isAuth  from "../middleware/is-auth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from "../controllers/admin.controller.js";

const router = express.Router();

// Admin-only product routes
router.post("/products", isAuth, isAdmin, createProduct);
router.put("/products/:productId", isAuth, isAdmin, updateProduct);
router.delete("/products/:productId", isAuth, isAdmin, deleteProduct);

// Get all products (admin & frontend can use this)
router.get("/products", isAuth, isAdmin, getAllProducts);

export default router;
