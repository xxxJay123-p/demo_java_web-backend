import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const productRouters = express.Router();

// Create a new product
productRouters.post("/", createProduct);

// Get all products
productRouters.get("/", getProducts);

// Get a product by ID
productRouters.get("/:id", getProductById);

// Update a product by ID
productRouters.put("/:id", updateProduct);

// Delete a product by ID
productRouters.delete("/:id", deleteProduct);

export default productRouters;
