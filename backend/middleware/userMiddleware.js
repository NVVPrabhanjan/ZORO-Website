import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "final", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = user.id;
    next();
  });
};