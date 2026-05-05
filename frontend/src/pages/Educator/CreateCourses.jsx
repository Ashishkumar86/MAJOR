import React,{useState} from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import ClipLoader from "react-spinners/ClipLoader";

function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    setLoading(true)
    try {
        const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true });
        console.log(result.data);
        setLoading(false)
        navigate("/courses");
        toast.success("Course Created Successfully")
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Failed to create course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="max-w-xl w-[600px] mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 relative">
        
        <FaArrowLeft 
          className="absolute top-6 left-6 w-[20px] h-[20px] text-gray-600 hover:text-black cursor-pointer" 
          onClick={() => navigate("/courses")} 
        />

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create Course
        </h2>

        <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
          
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-1 text-sm font-medium">
              Course Title
            </label>
            <input type="text" id="title" placeholder="Enter Course Title" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5A4BDA]" value={title} onChange={(e) => setTitle(e.target.value)}/></div>
            <div>
            <label htmlFor="category" className="block text-gray-700 mb-1 text-sm font-medium">
              Course Category
            </label>
            <select id="category" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5A4BDA]" onChange={(e) => setCategory(e.target.value)}> 
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI/ML">AI/ML</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="button" className={`w-full py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5A4BDA] hover:bg-[#4e3fc1]"} transition-colors`} onClick={handleCreateCourse} disabled={loading}>
            {loading ? <ClipLoader size={30} color="white"/> : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses;