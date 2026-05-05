import React, { useEffect } from "react";
import Nav from '../component/Nav'
import home from '../assets/home.png'
import { SiViaplay } from "react-icons/si";
import AI from "../assets/AI.png"
import AI2 from "../assets/AI2.png"
import Logo from '../component/Logo';
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
import ReviewPage from "../component/ReviewPage";

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.3/inject.js";
    script1.async = true;

    script1.onload = () => {
      setTimeout(() => {
        const script2 = document.createElement("script");
        script2.src = "https://files.bpcontent.cloud/2025/11/08/16/20251108160329-MOFA6UJP.js";
        script2.defer = true;
        document.body.appendChild(script2);
      }, 500);
    };

    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script1);
    };
  }, []);

  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav/>
        <img src={home} className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' alt=""/>
        
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex item-center justify-center text-[#5A4BDA] font-bold text-[20px]'>
          Grow Your Skill to Advance
        </span>

        <span className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex item-center justify-center text-[#5A4BDA] font-bold'>
          Your Career Path
        </span>

        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex item-center justify-center gap-3 flex-wrap'>
          
          <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white bg-[#5A4BDA] text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate("/allcourses")}>
            View All Courses 
            <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' />
          </button>

          <button className='px-[20px] py-[10px] lg:bg-black bg-black lg:text-white text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center' onClick={()=>navigate("/search")}>
            Search With AI 
            <img src={AI} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt=""/>
            <img src={AI2} className='w-[35px] h-[35px] rounded-full lg:hidden' alt=""/>
          </button>

        </div>
      </div>

      <Logo/>
      <ExploreCourses/>
      <CardPage/>
      <About/>
      <ReviewPage/>
      <Footer/>
    </div>
  )
}

export default Home;