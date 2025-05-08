import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../lib/cloudinary.js";
// CREATE a new product
export const createProduct = async (req, res) => {
  try {
    const { productId, name, description, price } = req.body;
    console.log("its here")
    const imagePath = req.file.path;
    console.log("nextstep")
    const imageUrl = await uploadOnCloudinary(imagePath);
    console.log(imageUrl)
    if (!imageUrl) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary." });
    }
    const existing = await Product.findOne({ productId });
    if (existing) {
      return res.status(400).json({ message: "Product ID already exists" });
    }

    const newProduct = await Product.create({
      productId,
      name,
      description,
      price,
      image: imageUrl.url,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating product", error: error.message });
  }
};

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// GET product by productId (from URL)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product ID", error: error.message });
  }
};

// UPDATE product by productId
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { productId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating product", error: error.message });
  }
};

// DELETE product by productId
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      productId: req.params.id,
    });
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting product", error: error.message });
  }
};
