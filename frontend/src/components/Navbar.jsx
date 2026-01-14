// import { Link } from "react-router-dom";
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "../css/navbar.css";

// // const Navbar = () => {
// //   const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

// //   return (
// //     <nav className="navbar">
// //       <Link to="/">Shop</Link>
// //       {isAuthenticated && <Link to="/cart">Cart</Link>}
// //       {isAuthenticated && <Link to="/orders">Orders</Link>}
// //       {isAdmin && <Link to="/admin">Admin</Link>}
// //       {isAuthenticated ? (
// //         <button onClick={logout}>Logout</button>
// //       ) : (
// //         <Link to="/login">Login</Link>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;

// const Navbar = () => {
//   const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

//   return (
//     <nav className="navbar">
//       <Link to="/">Shop</Link>
//       {isAuthenticated && <Link to="/cart">Cart</Link>}
//       {isAuthenticated && <Link to="/orders">Orders</Link>}
//       {isAdmin && <Link to="/admin">Admin</Link>}

//       {isAuthenticated ? (
//         <button onClick={logout}>Logout</button>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link> {/* Add this line */}
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/navbar.css";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, cart } = useContext(AuthContext);

  console.log("Navbar - isAdmin:", isAdmin);

  // Calculate total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/">Shop</Link>

      {isAuthenticated && (
        <Link to="/cart" className="cart-link">
          Cart
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      )}

      {isAuthenticated && <Link to="/orders">Orders</Link>}
      {isAdmin && <Link to="/admin">Admin</Link>}

      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
