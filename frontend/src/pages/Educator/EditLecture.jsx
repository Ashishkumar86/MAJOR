import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditLecture(){
    const {courseId, lectureId} = useParams()
    const {lectureData} = useSelector(state=>state.lecture)
    const navigate = useNavigate()
    const [lectureTitle, setLectureTitle] = useState("") 
    const [videoUrl, setVideoUrl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        const getLecture = async () =>{
            try {
                const result = await axios.get(serverUrl + `/api/course/courselecture/${courseId}`, {withCredentials:true})
                dispatch(setLectureData(result.data.lectures))
            } catch (error) {
                console.log(error)
            }
        }
        getLecture()
    },[])

    useEffect(()=>{
        const selected = lectureData?.find(lecture => lecture._id === lectureId)
        if(selected){
            setLectureTitle(selected.lectureTitle || "")
            setIsPreviewFree(selected.isPreviewFree || false)
        }
    },[lectureData])

    const handleEditLecture = async () =>{
        setLoading(true)
        const formdata = new FormData() 
        formdata.append("lectureTitle", lectureTitle)
        formdata.append("video", videoUrl)
        formdata.append("isPreviewFree", isPreviewFree)
        try {
            const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formdata, {withCredentials:true})
            console.log(result.data)
            dispatch(setLectureData(lectureData.map(l => l._id === lectureId ? result.data : l))) 
            toast.success("Lecture Updated")
            navigate(`/createlecture/${courseId}`) 
            setLoading(false)
        } catch (error) {
            console.log(error?.response?.data?.message || "Something went wrong")
            toast.error(error?.response?.data?.message || "Something went wrong")
            setLoading(false)
        }
    }

    if(!lectureData || lectureData.length === 0) return ( 
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <ClipLoader size={40} color="black"/>
        </div>
    )

    const removeLecture = async () => {
        setLoading1(true)
        try {
            const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, {withCredentials:true})
            console.log(result.data)
            navigate(`/createLecture/${courseId}`)
            toast.success("Lecture Removed")
            setLoading1(false)
        } catch (error) {
            setLoading1(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2 ">
                    <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={()=>navigate(`/createlecture/${courseId}`)}/>
                    <h2 className="text-xl font-semibold text-gray-800">Update Course Lecture</h2>
                </div>
                <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm" disabled = {loading1} onClick={removeLecture}>{loading1 ? <ClipLoader size={30} color="white"/> : "Remove Lecture"}</button>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Title *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none" required onChange={(e)=>setLectureTitle(e.target.value)} value={lectureTitle}/>  {/* fixed value */}
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">video *</label>
                    <input type="file" className="w-full p-1 file:mr-4 border border-gray-300 file:rounded-md file:border-0 file:py-1 file:px-3 file:bg-gray-700 file:text-white hover:file:bg-gray-500" accept="video/*" onChange={(e)=>setVideoUrl(e.target.files[0])}/>
                    <div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="accent-black h-4 w-4" id="isFree" checked={isPreviewFree} onChange={()=>setIsPreviewFree(prev=>!prev)}/>
                            <label htmlFor="isFree" className="text-sm text-gray-700">Is this Video Free</label>
                        </div>
                        {loading ? <p className="text-sm text-gray-500 mt-2">Uploading video... Please wait</p> : ""}
                    </div>
                    <div className="pt-4">
                        <button className="w-full bg-[#5A4BDA] text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition" disabled={loading} onClick={handleEditLecture}>
                            {loading ? <ClipLoader size={30} color="white"/> : "Update Lecture"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLecture