import { Application } from "../model/application-model.js";
import { Course } from "../model/course-model.js";
import { User } from "../model/models.js";

const applyCourse = async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: "User or Course not found" });
    }

    const application = new Application({
      user: userId,
      course: courseId,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({});
    res.json({ applications });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getApplicationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const applications = await Application.find({ user: userId });
    res.json({ applications });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getApplicationsByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const applications = await Application.find({ course: courseId });
    res.json({ applications });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  getApplicationsByCourse,
  getAllApplications,
  getApplicationsByUser,
  applyCourse,
};
