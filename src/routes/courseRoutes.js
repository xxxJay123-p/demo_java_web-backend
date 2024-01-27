import express from "express";
import {
  getAllCourse,
  getOneCourseById,
  createCourse,
  updateCourse,
  removeCourse,
} from "../controller/courseController.js";

const courseRoute = express.Router();

// GET all courses
courseRoute.get("/", getAllCourse);

// GET a single course by id
courseRoute.get("/:id", getOneCourseById);

// POST a new course
courseRoute.post("/", createCourse);

// PUT (update) a course by id
courseRoute.put("/:id", updateCourse);

// DELETE a course by id
courseRoute.delete("/:id", removeCourse);

export default courseRoute;
