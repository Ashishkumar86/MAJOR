import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/img.webp";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { useEffect } from "react";
import { setCreatorCourseData } from "../../redux/courseSlice";


function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.user)
  const {creatorcourseData} = useSelector(state=>state.course)
  const courseState = useSelector(state => state.course);
console.log("Full course state:", courseState);

 useEffect(() => {
    const creatorCourse = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/Creator", { withCredentials: true });
        console.log(result.data);
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.error(error);
      }
    };

    creatorCourse();
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center justify-center gap-3">
          <FaArrowLeft className="w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/dashboard")}/>
          <h1 className="text-2xl font-semibold">All Created Courses</h1>
        </div>

        <button
          className="bg-[#5A4BDA] text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => navigate("/createcourse")}>
          Create Course
        </button>
      </div>

      {/* for large screen table */}
      <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Course Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>

              {creatorcourseData?.map((course, index)=>(

              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 flex items-center gap-4">
                   {course?.thumbnail ?<img src={course?.thumbnail} className="w-25 h-14 oject cover rounded-md" alt=""/>: <img src={img} alt="Course Image" className="w-35 h-14 object-cover rounded-md" />}<span>{course?.title}</span>
                </td>
                {course?.price ? <td className="px-4 py-3">Rs{Math.round(course?.price)}</td>:<td className="px-4 py-3">Rs NA</td>}
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                    <FaRegEdit className="text-gray-600 hover:text-blue-600 cursor-pointer" onClick={()=>navigate(`/editcourse/${course?._id}`)}/>
                </td>
              </tr>
              ))}
            </tbody>
        </table>

        <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
        </p>
      </div>

      {/* for small screen table */}
      <div className="md:hidden space-y-4">
        { creatorcourseData?.map((course, index)=>(
        <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"> 
              <div className="flex gap-4 items-center">
               {course?.thumbnail? <img src={course?.thumbnail} alt="" className="w-16 h-16 rounded-md object-cover"/> : <img src={img} alt="Course Image" className="w-16 h-16 object-cover rounded-md" />}
                <div className="flex-1 ">
                    <h2 className="font-medium text-sm">
                        {course?.title}
                    </h2>
                   {course?.price ? <p className="text-gray-600 text-xs mt-1">Rs{Math.round(course?.price)}</p>:<p className="text-gray-600 text-xs mt-1">
                       Rs NA
                    </p>}
                </div>
                <FaRegEdit className="text-gray-600 hover:text-blue-600 cursor-pointer"  onClick={()=>navigate(`/editcourse/${course?._id}`)}/>
            </div>
            <span className={`w-fit px-3 py-1 text-xs rounded-full ${course?.isPublished ? "bg-green-100 text-green-600" : " bg-red-100 text-red-600 "}`}>{course?.isPublished ? "Published" : "Draft"}</span>
        </div>))}
        <p className="text-center text-sm text-gray-400 mt-4">A list of your recent courses.</p>
      </div>

    </div>
  );
}

export default Courses;