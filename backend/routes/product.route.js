import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

// Get all products
router.get("/allproducts", getAllProducts);


// Get a product by its productId
router.get("/:id", getProductById);

// Create a new product (productId should be passed in body)
router.post("/create", upload.single("image"), createProduct);

// Update a product by its productId
router.put("/:id", updateProduct);

// Delete a product by its productId
router.delete("/:id", deleteProduct);

export default router;
