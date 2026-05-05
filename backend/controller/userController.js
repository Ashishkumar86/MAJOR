import User from "../model/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const useGetCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `useGetCurrentUser error ${error}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;

    let updateData = { name, description };

    // ✅ only update photo if file exists
    if (req.file) {
      const photoUrl = await uploadOnCloudinary(req.file.path);
      if (photoUrl) {
        updateData.photoUrl = photoUrl;
      }
    }

    // ✅ return updated user
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `updateProfile error ${error}`,
    });
  }
};