import { Product } from "../model/productModel.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      subCategory,
      size,
      roast,
      grind,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      subCategory,
      size,
      roast,
      grind,
    });

    const product = await newProduct.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products retrieved", products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product retrieved", product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    next(error);
  }
};
