import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AuthContext);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price} × {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ))}
          </div>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
