import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, addToCart } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch {
        setError("Failed to fetch product");
      }
      setLoading(false);
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    setError("");
    setSuccess("");

    if (!isAuthenticated) {
      setError("Please login to add to cart");
      return;
    }

    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    addToCart(product, quantity);
    setSuccess("Added to cart");
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{ width: "300px" }}
      />
      <p>Price: ${product.price}</p>
      <p>{product.description || "No description available."}</p>

      <label>
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ width: "60px", marginLeft: "10px" }}
        />
      </label>

      <br />
      <button onClick={handleAddToCart} style={{ marginTop: "10px" }}>
        Add to Cart
      </button>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProductDetails;
