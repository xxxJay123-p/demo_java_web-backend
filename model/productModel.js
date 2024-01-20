import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["coffee beans", "coffee equipment", "coffee accessories"],
  },
  subCategory: {
    type: String,
    required: true,
    enum: {
      values: [
        "arabica",
        "robusta",
        "espresso machine",
        "drip coffee maker",
        "french press",
        "coffee grinder",
        "coffee mug",
        "coffee filter",
      ],
      message: "{VALUE} is not a valid sub category",
    },
  },
  size: {
    type: String,
    enum: ["12 oz", "1 lb", "2 lb", "5 lb"],
  },
  roast: {
    type: String,
    enum: ["light", "medium", "dark"],
  },
  grind: {
    type: String,
    enum: ["whole bean", "coarse", "medium", "fine"],
  },
});

export const Product = mongoose.model("Product", ProductSchema);
