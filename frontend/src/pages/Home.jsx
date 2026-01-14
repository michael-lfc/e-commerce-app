import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import "../css/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts();
      if (data.products) setProducts(data.products);
      setLoading(false);
    };
    getProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="home-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
