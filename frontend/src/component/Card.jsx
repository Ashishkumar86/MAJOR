import React from "react";
import { MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Card({ thumbnail, title, category, price, id, reviews }) {
    const navigate = useNavigate();

     const calculateAvgReview = (reviews) => {
        if(!reviews || reviews.length === 0){
            return 0
        }
        const total = reviews.reduce((sum, review)=> sum + review.rating, 0)
        return(total / reviews.length).toFixed(1)
    }

    const avgRating = calculateAvgReview(reviews)



    return (
        <div
            onClick={() => navigate(`/viewcourse/${id}`)}
            className="w-[360px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300 cursor-pointer"
        >
            <img
                src={thumbnail}
                alt={title}
                className="w-full h-36 object-fill"
                onError={(e) => e.target.src = "/fallback-thumbnail.png"}
            />

            <div className="p-5 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h2>

                <span className="w-fit px-2 py-0.5 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                    {category}
                </span>

                <div className="flex justify-between items-center text-sm text-gray-600 mt-2 px-1">
                    <span className="font-semibold text-gray-800">
                        {price ? `Rs${price}` : "Free"}
                    </span>
                    <span className="flex items-center gap-1">
                        <MdStar className="text-yellow-500" />
                        {avgRating}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;