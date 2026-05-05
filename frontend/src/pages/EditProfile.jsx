import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl || "");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("photoUrl", photoUrl);

  const handleEditProfile = async (e) => {
    setLoading(true);
    try {
      const result = await axios.put(serverUrl + "/api/user/profile", formData, { withCredentials: true });
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/profile");
      toast.success("Profile Updated");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to update profile");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
       <FaArrowLeft className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer" onClick={() => navigate("/profile")}/>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit Profile</h2>
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault()}}>
          <div className="flex flex-col items-center text-center">
             {userData?.photoUrl ? <img src={userData.photoUrl}alt="Profile" className="w-24 h-24 rounded-full object-cover border-black border-4"/> : 
            <div className="w-24 h-24 rounded-full border-white border-2 flex items-center justify-center text-[30px] bg-black text-white">
              {userData?.name?.slice(0,1).toUpperCase()}
            </div>}
          </div>

          <div >
            <label htmlFor="image" className="text-sm font-medium text-gray-700">Select Avatar</label>
            <input id="image" type="file" name="photoUrl" placeholder="PhotoUrl" accept="image/*" className="w-full px-4 py-2 border rounded-md text-sm" onChange={(e)=>setPhotoUrl(e.target.files[0])}/>
          </div>
          <div >
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input id="name" type="text" name="name" placeholder={userData.name} className="w-full px-4 py-2 border rounded-md text-sm" onChange={(e)=>setName(e.target.value)} value={name}/>
          </div>
          <div >
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input id="email"readOnly type="email" name="email" placeholder={userData.email} className="w-full px-4 py-2 border rounded-md text-sm"/>
          </div>
          <div >
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea type="text" name="description" placeholder="Tell us about yourself..." className="w-full px-4 py-2 border rounded-md mt-1 resize-none focus-ring-2 focus:ring-[black] " onChange={(e)=>setDescription(e.target.value)} value={description}/>
          </div>
            <button className="w-full bg-[#5A4BDA] active:bg-[#3a2bca] text-white py-2 rounded-md font-medium transition cursor-pointer" disabled={loading} onClick={handleEditProfile}>{loading? <ClipLoader size={20} color={"white"}/> : "Save Changes"}</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile; 