import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchOrders, createOrder } from "../api/api";
import "../css/orders.css";

const Orders = () => {
  const { token, cart, clearCart } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Fetch orders from backend
  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders(token);
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getOrders();
  }, [token]);

  // Place order from cart
  const handleCreateOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setCreating(true);

    try {
      // Send items in correct format expected by backend
      const items = cart.map((item) => ({
        productId: item._id, // ✅ must be productId
        quantity: item.quantity,
      }));

      const res = await createOrder(items, token);
      console.log("Order created:", res);

      alert("Order placed successfully!");

      clearCart();  // clear cart after ordering
      getOrders();  // refresh orders list immediately
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    } finally {
      setCreating(false);
    }
  };

  const totalCartAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>

      {/* Place order from cart */}
      {cart.length > 0 && (
        <div className="create-order">
          <p>Total in Cart: ${totalCartAmount.toFixed(2)}</p>
          <button onClick={handleCreateOrder} disabled={creating}>
            {creating ? "Placing Order..." : "Place Order from Cart"}
          </button>
        </div>
      )}

      {/* Orders list */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h4>Order ID: {order._id}</h4>
              <p>Total: {order.totalAmount}</p>
              <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product._id}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: "50px", marginRight: "8px" }}
                    />
                    {item.product.name} × {item.quantity} (
                    {item.product.price})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
