import express from "express";
import {
  getApplicationsByCourse,
  getAllApplications,
  getApplicationsByUser,
  applyCourse,
} from "../controller/applyCourseController.js";

const applyRouter = express.Router();

applyRouter.get("/", getAllApplications);
applyRouter.get("/:userId", getApplicationsByUser);
applyRouter.get("/course/:courseId", getApplicationsByCourse);
applyRouter.post("/user/apply-course", applyCourse);

export default applyRouter;
