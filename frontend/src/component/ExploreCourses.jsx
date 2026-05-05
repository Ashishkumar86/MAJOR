import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { DiUikit } from "react-icons/di";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaRedhat } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { TbDeviceAnalytics } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";
import { LuBrainCircuit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function ExploreCourses() {
  const navigate = useNavigate()
  return (
    <div className="w-[100%] min-h-[50vh] flex flex-col lg:flex-row gap-4 px-[30px] items-center justify-center">
      {/* left div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[30px] font-semibold">Explore</span>
        <span className="text-[30px] font-semibold">Our Courses</span>
        <div>
          <p className="text-[17px]">
           Our mission at Edu Academy is to make education accessible, engaging, and meaningful. We believe every student has the potential to succeed, and we are here to guide them with the right tools, resources, and mentorship.
          </p>
          <button className="px-[20px] py-[10px] bg-[#5A4BDA] cursor-pointer border-2 flex gap-1.5 text-white rounded-[10px] text-[18px] font-light mt-[30px]" onClick={()=>navigate("/allcourses")}>
            Explore courses
            <SiViaplay className="w-[20px] h-[20px] fill-white" />
          </button>
        </div>
      </div>

      {/* right div */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <TbDeviceDesktopCode className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Web Dev
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <DiUikit  className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          UI/UX Designing
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#d5e8a0] rounded-lg flex items-center justify-center">
            <TbDeviceMobileCode className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          App Dev
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#f4a3a4] rounded-lg flex items-center justify-center">
            <FaRedhat className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Ethical Hacking
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#8ed983] rounded-lg flex items-center justify-center">
            <SiOpenai className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          AI/ML
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#f69cf6] rounded-lg flex items-center justify-center">
            <TbDeviceAnalytics className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Data Science
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#e2f3a6] rounded-lg flex items-center justify-center">
            <BsClipboardData className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Data Analytics
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[100px] bg-[#baaaea] rounded-lg flex items-center justify-center">
            <LuBrainCircuit className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          AI Tools
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;