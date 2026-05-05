import React from "react";
import logo from "../assets/logo.mp4";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShow(false);
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <nav className="w-full h-[60px] fixed top-0 bg-[#5A4BDA] shadow-lg z-50 flex items-center justify-between px-6">

      <div className="h-full flex items-center overflow-hidden -ml-12">
        <video
          src={logo}
          autoPlay
          loop
          muted
          playsInline
          className="h-[150px] object-cover scale-125 rounded-r-lg"
        />
      </div>

      {/* Desktop Nav */}
      <div className="lg:flex items-center gap-4 justify-center hidden relative">

        {userData?.role == "educator" && (
          <button className="px-4 py-1 border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200" onClick={()=>navigate("/dashboard")}>
            Dashboard
          </button>
        )}

        {/* Single avatar block */}
        {!userData ? (
          <IoPersonCircle
            className="w-[40px] h-[40px] text-white cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => setShow((prev) => !prev)}
          />
        ) : userData?.photoUrl ? (
          <img
            src={userData?.photoUrl}
            className="w-[40px] h-[40px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          <div
            className="w-[40px] h-[40px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {userData?.name.slice(0, 1).toUpperCase()}
          </div>
        )}

        {!userData ? (
          <button
            className="px-4 py-1 border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <span
            className="px-[10px] py-[5px] bg-white text-black rounded-[8px] shadow-sm shadow-black text-[18px] cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        )}

        {show && (
          <div className="absolute top-[60px] right-0 z-[999] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black shadow-lg">
            <span
              className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
             My Profile
            </span>
            <span
              className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 cursor-pointer"
              onClick={() => navigate("/mycourses")}
            >
             My Courses
            </span>
          </div>
        )}
      </div>

      {/* Hamburger Icon */}
      <RxHamburgerMenu
        className="w-[30px] h-[30px] lg:hidden text-white cursor-pointer"
        onClick={() => setShowHam((prev) => !prev)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden transform ${
          showHam
            ? "translate-x-0 transition duration-500"
            : "-translate-x-full transition duration-500"
        }`}
      >
        <RxCross2
          className="w-[30px] h-[30px] text-white cursor-pointer absolute top-5 right-5"
          onClick={() => setShowHam((prev) => !prev)}
        />

        {/* Mobile avatar */}
        {userData && (
          userData.photoUrl ? (
            <img
              src={userData.photoUrl}
              className="w-[40px] h-[40px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
              {userData.name.slice(0, 1).toUpperCase()}
            </div>
          )
        )}

        <button
          className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200"
          onClick={() => { navigate("/profile"); setShowHam(false); }}
        >
          My Profile
        </button>

        {userData?.role === "educator" && (
          <button className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200" onClick={()=>navigate("/dashboard")}>
            Dashboard
          </button>
        )}

        <button
          className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200"
          onClick={() => { navigate("/mycourses"); setShowHam(false); }}
        >
          My Courses
        </button>

        {!userData ? (
          <button
            className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200"
            onClick={() => { navigate("/login"); setShowHam(false); }}
          >
            Login
          </button>
        ) : (
          <span
            className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-[16px] font-light hover:bg-white hover:text-[#5A4BDA] transition duration-200 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        )}
      </div>
    </nav>
  );
}

export default Nav;