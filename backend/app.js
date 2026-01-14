import express from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./util/database.js";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Middleware
// app.use(cors({
//   origin: "http://localhost:5173", // allow your frontend
//   credentials: true // if you want cookies/auth headers
// }));

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true // if you want cookies/auth headers
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
