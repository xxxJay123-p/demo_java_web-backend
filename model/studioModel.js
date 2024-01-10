import mongoose from "mongoose";

const StudioSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 20,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "CoffeeCourse",
    },
  ],
});

export default Studio = mongoose.model("Studio", StudioSchema);
