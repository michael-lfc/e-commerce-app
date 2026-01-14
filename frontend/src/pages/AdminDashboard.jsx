import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";
import "../css/adminDashboard.css";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    editId: null, // null means creating, otherwise editing
  });

  // Fetch products
  const getProducts = async () => {
    setLoading(true);
    const data = await fetchAllProducts();
    if (data.products) setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, image, editId } = form;

    if (editId) {
      await updateProduct(editId, { name, price, description, image }, token);
    } else {
      await createProduct({ name, price, description, image }, token);
    }

    // Reset form after submission
    setForm({ name: "", price: "", description: "", image: "", editId: null });
    getProducts();
  };

  // Populate form for editing
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || "",
      image: product.image || "",
      editId: product._id,
    });
  };

  // Delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId, token);
      getProducts();
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* Product Form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{form.editId ? "Edit Product" : "Add Product"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">{form.editId ? "Update" : "Create"}</button>
        {form.editId && (
          <button
            type="button"
            onClick={() =>
              setForm({ name: "", price: "", description: "", image: "", editId: null })
            }
          >
            Cancel
          </button>
        )}
      </form>

      {/* Products Table */}
      <h3>Products List</h3>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description || "-"}</td>
                <td>
                  {product.image ? (
                    <img src={product.image} alt={product.name} width="50" />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
