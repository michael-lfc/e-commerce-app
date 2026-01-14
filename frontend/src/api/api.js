// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API URL:", BASE_URL);

// ======= AUTH =======
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    // Standardize response for frontend
    return { success: res.ok, ...data };
  } catch (err) {
    console.error("registerUser error:", err);
    return { success: false, message: "Network error" };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return { success: res.ok, ...data };
  } catch (err) {
    console.error("loginUser error:", err);
    return { success: false, message: "Network error" };
  }
};

// ======= PRODUCTS =======
export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    return await res.json();
  } catch (err) {
    console.error("fetchAllProducts error:", err);
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return await res.json();
  } catch (err) {
    console.error("fetchProductById error:", err);
  }
};


export const fetchCart = async (token) => {
  if (!token) return { cart: [] };

  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("fetchCart error:", err);
  }
};

export const addToCart = async (productId, quantity, token) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId, quantity }),
    });
    return await res.json();
  } catch (err) {
    console.error("addToCart error:", err);
  }
};

export const removeFromCart = async (productId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId }),
    });
    return await res.json();
  } catch (err) {
    console.error("removeFromCart error:", err);
  }
};


export const fetchOrders = async (token) => {
  if (!token) return { orders: [] };

  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("fetchOrders error:", err);
  }
};


export const createOrder = async (items, token) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items }),
    });
    return await res.json();
  } catch (err) {
    console.error("createOrder error:", err);
  }
};

// ======= ADMIN =======
export const createProduct = async (product, token) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(product),
    });
    return await res.json();
  } catch (err) {
    console.error("createProduct error:", err);
  }
};

export const updateProduct = async (id, product, token) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(product),
    });
    return await res.json();
  } catch (err) {
    console.error("updateProduct error:", err);
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    console.error("deleteProduct error:", err);
  }
};
