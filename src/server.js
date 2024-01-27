import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dontenv from "dotenv";
import morgan from "morgan";

// Route
import userRouter from "./routes/userRouter.js";
import productsRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";
import courseRoute from "./routes/courseRoutes.js";
import applyRouter from "./routes/applyRouter.js";

//auth controller
import { protect, adminRoute } from "./controller/authController.js";

// Test seed data
import { seed } from "../database/data.js";

//Start App
const app = express();

//env setting
dontenv.config();

app.disable("x-powered-by");

// Middleware
// cors
app.use(cors({ origin: "http://localhost:5000", credentials: true })); // Enables the OPTIONS request check in our API
// app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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
app.use("/products", productsRouter);
// This is NOT under login protection
app.use("/", authRouter);
/* For regular users only */
app.use("/users", protect, userRouter);
app.use("/coruse", courseRoute);
app.use("/applications", applyRouter);

//* error api */
app.get("*", (req, res) => {
  res.status(404).json({ msg: "No route is matching your request.." });
});

// test seed data
seed()
  .then(() => {
    console.log("Database seeded successfully");
  })
  .catch((err) => {
    console.error("Error seeding database:", err);
  });

// //CONNECT THE SERVER
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server is connected @ http://localhost:${port} ☕`);
});
