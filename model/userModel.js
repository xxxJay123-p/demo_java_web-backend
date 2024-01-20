import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    default: () => uuidv4(),
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export const User = mongoose.model("User", UserSchema);
