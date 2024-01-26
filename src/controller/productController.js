import { Product } from "../model/models.js";

// Create a new product
async function createProduct(req, res) {
  const Product = new Product(req.body);
  try {
    const newProduct = await Product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a product by ID
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a product by ID
async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//GET PRODUCTS BY TYPE
async function getProductsByType(req, res) {
  const requestedType = req.params.type;
  try {
    const itemsFound = await Product.find({ type: requestedType });
    if (itemsFound.length > 0) res.json(itemsFound);
    else res.json({ msg: "Type not found" });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
}

//GET PRODUCTS BY id
async function getProductById(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id).populate("diets");
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByType,
  getProductById,
};
