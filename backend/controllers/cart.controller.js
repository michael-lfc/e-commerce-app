import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const user = req.user; // already attached
    await user.populate("cart.items.productId", "name price image");

    const formattedCart = user.cart.items.map(item => ({
      productId: {
        _id: item.productId?._id || null,
        name: item.productId?.name || "Removed product",
        price: item.productId ? `$${item.productId.price}` : "$0",
        image: item.productId?.image || ""
      },
      quantity: item.quantity
    }));

    res.status(200).json({ cart: formattedCart });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    // ✅ Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const itemIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      user.cart.items[itemIndex].quantity += quantity;
    } else {
      user.cart.items.push({ productId, quantity });
    }

    await user.save();
    await user.populate("cart.items.productId", "name price image");

    const formattedCart = user.cart.items.map(item => ({
      productId: {
        _id: item.productId?._id || null,
        name: item.productId?.name || "Removed product",
        price: item.productId ? `$${item.productId.price}` : "$0",
        image: item.productId?.image || ""
      },
      quantity: item.quantity
    }));

    res.status(200).json({ message: "Product added to cart", cart: formattedCart });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    user.cart.items = user.cart.items.filter(item => item.productId.toString() !== productId);
    await user.save();
    await user.populate("cart.items.productId", "name price image");

    const formattedCart = user.cart.items.map(item => ({
      productId: {
        _id: item.productId?._id || null,
        name: item.productId?.name || "Removed product",
        price: item.productId ? `$${item.productId.price}` : "$0",
        image: item.productId?.image || ""
      },
      quantity: item.quantity
    }));

    res.status(200).json({ message: "Product removed from cart", cart: formattedCart });
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
