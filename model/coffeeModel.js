import mongoose from "mongoose";

const coffeeTypes = [
  "espresso",
  "latte",
  "cappuccino",
  "americano",
  "mocha",
  "other",
];
const coffeeSizes = ["tall", "grande", "venti"];
const coffeeTemperatures = ["hot", "iced"];

const CoffeeSchema = new mongoose.Schema({
  coffeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Map,
    of: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  coffeeType: {
    type: String,
    required: true,
    enum: coffeeTypes,
  },
  size: {
    type: String,
    required: true,
    enum: coffeeSizes,
  },
  temperature: {
    type: String,
    required: true,
    enum: coffeeTemperatures,
  },
});

export const Coffee = mongoose.model("Coffee", CoffeeSchema);
