// // controllers/admin.controller.js
import Product from "../models/product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    const newProduct = await Product.create({ name, price, description, image });
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description, image } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    if (image) product.image = image;

    await product.save();
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
