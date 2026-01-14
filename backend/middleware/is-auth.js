// // import jwt from "jsonwebtoken";
// // import User from "../models/user.model.js";

// // const JWT_SECRET = process.env.JWT_SECRET;

// // export const isAuth = async (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization;
// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //       return res.status(401).json({ message: "Not authenticated" });
// //     }

// //     const token = authHeader.split(" ")[1];
// //     const decoded = jwt.verify(token, JWT_SECRET);

// //     // Attach full user
// //     const user = await User.findById(decoded.userId);
// //     if (!user) return res.status(401).json({ message: "User not found" });

// //     req.user = user; // ✅ full user
// //     next();
// //   } catch (err) {
// //     console.error("Auth Error:", err);
// //     res.status(401).json({ message: "Invalid or expired token" });
// //   }
// // };

// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // 1️⃣ No header at all
//     if (!authHeader) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // 2️⃣ Wrong format
//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Invalid token format" });
//     }

//     const token = authHeader.split(" ")[1];

//     // 3️⃣ Token missing after Bearer
//     if (!token) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.userId);
//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth Error:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const isAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("Auth Error:", err.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export default isAuth;

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
