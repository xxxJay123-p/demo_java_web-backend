import { Course } from "../model/course-model.js";

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ course });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ course });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const removeCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  getAllCourse,
  getOneCourseById,
  createCourse,
  updateCourse,
  removeCourse,
};
