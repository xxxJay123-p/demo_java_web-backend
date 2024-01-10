import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dontenv from "dotenv";

// Route
import authRoutes from "./routes/auth.js";

//Start App
const app = express();
dontenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Moongo BD connection
const mongoURL = process.env.MONGO_URL;
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("数据库连接成功"))
  .catch((err) => console.error("数据库连接失败", err));

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
