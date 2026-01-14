import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user._id;

    if (!items || !items.length) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      items,
      totalAmount
    });

    res.status(201).json({
      message: "Order created successfully",
      order: {
        _id: order._id,
        items: order.items,
        totalAmount: `$${order.totalAmount}`,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders for logged-in user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      items: order.items
        .filter(item => item.productId)
        .map(item => ({
          product: {
            _id: item.productId._id,
            name: item.productId.name,
            price: `$${item.productId.price}`,
            image: item.productId.image
          },
          quantity: item.quantity
        })),
      totalAmount: `$${order.totalAmount}`,
      createdAt: order.createdAt
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
