import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByType,
  getProductById,
} from "../controller/productController.js";

const productsRouter = express.Router();

// Create a new product
productsRouter.post("/", createProduct);

// Update a product by ID
productsRouter.put("/updateproducts/:id", updateProduct);

// Delete a product by ID
productsRouter.delete("/deleteproducts/:id", deleteProduct);

//GET PRODUCTS BY TYPE
productsRouter.get("/:type", getProductsByType);

export default productsRouter;
