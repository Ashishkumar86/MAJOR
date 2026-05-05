import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createCourse, getPublishedCourses, getCreatorCourses, removeCourse, editCourse, getCourseById, createLecture, getCourseLecture, editLecture, removeLecture, getCreatorById } from "../controller/courseController.js";
import upload from "../middleware/multer.js";
import { searchWithAi } from "../controller/searchController.js";

const courseRouter = express.Router();
// for courses

courseRouter.post("/create", isAuth, createCourse);
courseRouter.get("/published", getPublishedCourses);
courseRouter.get("/creator", isAuth, getCreatorCourses);
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.delete("/remove/:courseId", isAuth, removeCourse);

// fro lectures

courseRouter.post("/createlecture/:courseId", isAuth, createLecture)
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("video"),editLecture)
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)
courseRouter.post("/getcreator", isAuth, getCreatorById)


// for search

courseRouter.post("/search",searchWithAi)

export default courseRouter;