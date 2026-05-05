import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import CreateCourses from "./pages/Educator/CreateCourses";
import { useNavigate } from "react-router-dom";
import useGetCreatorCourse from "./customHooks/getCreatorCourse";
import EditCourse from "./pages/Educator/EditCourse";
import useGetPublishedCourse from "./customHooks/getPublishedCourse";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Educator/CreateLecture";
import EditLecture from "./pages/Educator/EditLecture";
import ViewCourse from "./pages/ViewCourse";
import ScrollToTop from "./component/ScrollToTop";
import ViewLectures from "./pages/ViewLectures";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import useGetAllReviews from "./customHooks/getAllReviews";
import SearchWithAi from "./pages/SearchWithAi";

export const serverUrl = "https://major-ijxr.onrender.com";

function App() {
  useGetPublishedCourse();
  useGetCurrentUser();
  useGetCreatorCourse();
  useGetAllReviews();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  return (
    <>
    <ScrollToTop/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/signUp" element={userData ? <Navigate to="/" /> : <SignUp />}/>

        <Route
          path="/login" element={userData ? <Navigate to="/" /> : <Login />}/>

        <Route
          path="/profile" element={userData ? <Profile /> : <Navigate to="/signUp" />}/>

          <Route
          path="/forget" element={<ForgetPassword />}/>

        <Route
          path="/editprofile" element={userData ? <EditProfile /> : <Navigate to="/signUp" />}/>

        <Route
          path="/allcourses" element={userData ? <AllCourses /> : <Navigate to="/signUp" />}/>

        <Route
          path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to="/signUp" />}/>  

        <Route
          path="/courses" element={userData?.role === "educator" ? <Courses /> : <Navigate to="/signUp" />}/> 

        <Route
          path="/createcourse" element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/signUp" />}/> 

        <Route
          path="/editcourse/:courseId" element={userData?.role === "educator" ? <EditCourse /> : <Navigate to="/signUp" />}/>

        <Route
          path="/createlecture/:courseId" element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to="/signUp" />}/>

       <Route
          path="/editlecture/:courseId/:lectureId" element={userData?.role === "educator" ? <EditLecture /> : <Navigate to="/signUp" />}/>      

        <Route
          path="/viewcourse/:courseId" element={userData? <ViewCourse /> : <Navigate to="/signUp" />}/> 

        <Route
          path="/viewlecture/:courseId" element={userData? <ViewLectures/> : <Navigate to="/signUp" />}/> 

        <Route
          path="/mycourses" element={userData? <MyEnrolledCourses/> : <Navigate to="/signUp" />}/>
          
        <Route
          path="/search" element={userData? <SearchWithAi/> : <Navigate to="/signUp" />}/>     

      </Routes>
    </>
  );
}

export default App;
