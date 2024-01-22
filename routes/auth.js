import {
  login,
  register,
  getAllUsers,
  getUser,
} from "../controller/userController.js";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/users/all", getAllUsers);
authRoutes.get("/users/:id|username|email|phone", getUser);

export default authRoutes;
