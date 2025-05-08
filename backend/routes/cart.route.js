import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controller/cart.controller.js";
import { protectUser } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/add", protectUser, addToCart);
router.get("/", protectUser, getUserCart);
router.put("/update", protectUser, updateCartItem);
router.delete("/remove", protectUser, removeFromCart);
router.delete("/clear", protectUser, clearCart);

export default router;
