import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

function CardPage(){
    const {courseData} = useSelector(state=>state.course)
    const [popularCourses, setPopularCourses] = useState([])

    useEffect(()=>{
        if(courseData) setPopularCourses(courseData?.slice(0,6));
    },[courseData])

    return(
        <div className="relative flex flex-col items-center w-full">
            <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">Our Popular Courses</h1>
            <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]">Explore Top-rated courses designed to boost your skills, enhance career and unlock opportunities in Tech, AI, Business and Beyond.</span>
            <div className="w-full flex items-start justify-center flex-wrap gap-6  lg:px-[50px] md:px-[30px] px-[10px] py-[20px] mb-[40px]">
                {popularCourses.length === 0 ? (
                    <p className="text-gray-500 text-center">No courses available yet.</p>
                ) : (
                    popularCourses?.map((course) => (
                        <Card
                            key={course._id}
                            thumbnail={course.thumbnail}
                            title={course.title}
                            category={course.category}
                            price={course.price}
                            id={course._id}
                            reviews={course.reviews}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default CardPage;