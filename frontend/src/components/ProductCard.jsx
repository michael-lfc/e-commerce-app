import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import "../css/productCard.css";

const ProductCard = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(AuthContext);

  const handleAddToCart = () => {
    addToCart(product); // defaults to quantity = 1
  };

  return (
    <div className={`product-card ${theme}`}>
      {/* Product image & info */}
      <Link to={`/product/${product._id}`} className="product-link">
        <img
          src={product.image || "https://via.placeholder.com/200"}
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>

      {/* Actions */}
      <div className="product-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <Link to={`/product/${product._id}`}>
          <button className="view-details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
