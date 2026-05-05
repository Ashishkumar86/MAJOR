import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import axios from "axios";
import { useEffect } from "react";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/user/getcurrentuser",
          { withCredentials: true }  
        );
        dispatch(setUserData(result.data)); 
      } catch (error) {
        console.log("useGetCurrentUser error", error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;