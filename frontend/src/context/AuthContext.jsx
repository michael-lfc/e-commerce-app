import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedToken) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAdmin(storedIsAdmin === "true");
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    if (data.success) {
      setToken(data.token);
      setUserId(data.userId);
      setIsAdmin(data.isAdmin === true);
      setIsAuthenticated(true);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("isAdmin", data.isAdmin === true ? "true" : "false");
    }
    return data;
  };

  const register = async (name, email, password) =>
    registerUser({ name, email, password });

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    setCart([]);
    localStorage.clear();
  };

  // ✅ FIXED Cart functions (supports quantity)
  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i._id === item._id);

      if (existing) {
        return prevCart.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prevCart) => prevCart.filter((i) => i._id !== id));

  const clearCart = () => setCart([]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAdmin,
        isAuthenticated,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
