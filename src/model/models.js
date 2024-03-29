import mongoose from "mongoose";

const Role = ["guest", "user", "admin", "instructor"];
const Type = ["coffee", "drink", "frostino", "food", "snack", "pastries"];
const Milk = ["cow", "oat", "almond", "coconut", "soy"];
const Syrup = ["cinnamon", "maple", "vanilla", "chai"];

const DietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Type,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  syrup: Syrup,
  milk: {
    type: Milk,
    default: "cow",
  },
  diets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diet",
    },
  ],
});

const OrderSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  road: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
  },
  role: {
    type: Role,
    default: "user",
  },
});

const InstructorSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
});

export const Diet = mongoose.model("Diet", DietSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Order = mongoose.model("Order", OrderSchema);
export const User = mongoose.model("User", UserSchema);
export const Instructor = User.discriminator("Instructor", InstructorSchema);
