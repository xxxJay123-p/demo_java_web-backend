import express from "express";
import { getAll, getOneById } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAll);
userRouter.get("/:id", getOneById);

export default userRouter;
