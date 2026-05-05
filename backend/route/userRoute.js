import express from "express";
import isAuth from "../middleware/isAuth.js";
import { useGetCurrentUser } from "../controller/userController.js";
import { updateProfile } from "../controller/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuth,useGetCurrentUser)
userRouter.put("/profile",isAuth,upload.single("photoUrl"),updateProfile)

export default userRouter