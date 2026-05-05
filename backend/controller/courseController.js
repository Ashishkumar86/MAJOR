import Course from '../model/courseModel.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import Lecture from '../model/lectureModel.js';
import User from '../model/userModel.js';

export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" });
        }
        const course = await Course.create({ title, category, creator: req.userId });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: `Create Course error ${error}` });
    }
};

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate("lectures")
        .populate("reviews");
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No published courses found" });
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: `Failed to find published courses ${error}` });
    }
};

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId;
        const courses = await Course.find({ creator: userId });
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No courses found for this creator" });
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: `Failed to find creator courses ${error}` });
    }
};

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, subTitle, description, category, level, isPublished, price } = req.body;
        let thumbnail;
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path);
        }
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const updatedData = { 
            title, 
            subTitle, 
            description, 
            category, 
            level, 
            isPublished: isPublished === "true",  // ✅ string to boolean
            price: price ? parseFloat(parseFloat(price).toFixed(2)) : 0, 
            thumbnail 
        };
        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });
        return res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: `Failed to edit course ${error}` });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: `Failed to find course by id ${error}` });
    }
};

export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: `Failed to delete course ${error}` });
    }
};

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;
        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "lectureTitle is required" });
        }
        const lecture = await Lecture.create({ lectureTitle });
        await Course.findByIdAndUpdate(
            courseId,
            { $push: { lectures: lecture._id } },
            { runValidators: false }
        );
        return res.status(201).json({ message: "Lecture created", lecture });
    } catch (error) {
        return res.status(500).json({ message: `Failed to create Lecture ${error}` });
    }
};

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(404).json({ message: "Course is not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: `Failed to get course Lecture ${error}` });
    }
};

export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { isPreviewFree, lectureTitle } = req.body;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture is not found" });
        }
        if (req.file) {
            const videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = videoUrl;
        }
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle;
        }
        lecture.isPreviewFree = isPreviewFree;
        await lecture.save();
        return res.status(200).json(lecture);
    } catch (error) {
        return res.status(500).json({ message: `Failed to edit Lecture ${error}` });
    }
};

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture is not found" });
        }
        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        );
        return res.status(200).json({ message: "Lecture Removed" });
    } catch (error) {
        return res.status(500).json({ message: `Failed to remove Lecture ${error}` });
    }
};

export const getCreatorById = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Failed to get Creator ${error}` });
    }
};