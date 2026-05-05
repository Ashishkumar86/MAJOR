import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

function useGetCreatorCourse() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourse = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/creator", { withCredentials: true });
        console.log(result.data);
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.error(error);
      }
    };

    creatorCourse();
  }, [userData]);
}

export default useGetCreatorCourse;