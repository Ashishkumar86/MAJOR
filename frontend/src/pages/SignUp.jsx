import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png"
import logo1 from "../assets/logo1.mp4"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios'
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import {ClipLoader} from "react-spinners"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import {auth, provider} from "../../utils/firebase.js"
import { signInWithPopup } from "firebase/auth";

function SignUp(){
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSignup = async () => {
        setLoading(true);
        try{
            const result = await axios.post(serverUrl + "/api/auth/signup", {name, email, password, role}, {withCredentials:true});
            dispatch(setUserData(result.data))
            setLoading(false);
            navigate("/");
            toast.success("Signup successful");
        } catch (error){
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
            
        }
    }

    const googleSignup = async () => {
        try{
            const response = await signInWithPopup(auth, provider);
            let user = response.user;
            let name = user.displayName;
            let email = user.email;

            const result = await axios.post(serverUrl + "/api/auth/googleauth", {name, email, role}, {withCredentials:true});
             dispatch(setUserData(result.data))
            navigate("/home");
            toast.success("Signup successful");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return(
        <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
            <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex' onSubmit={(e)=>e.preventDefault()}>

                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                    <div>
                        <h1 className='font-semibold text-[black] text-2xl'>Let's Get Started</h1>
                        <h2 className='text-[#999797] text-[18px]'>Create Your Account</h2>
                    </div>

                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="name" className='font-semibold'>Name:</label>
                        <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>

                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="email" className='font-semibold'>Email:</label>
                        <input id='email' type="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>

                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                        <label htmlFor="password" className='font-semibold'>password:</label>
                        <input id='password' type={show ? "text" : "password"} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder="Enter Your Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

                        {!show ? (
                          <FaRegEyeSlash
                            className='absolute w-[20px] cursor-pointer right-[5%] bottom-[10%]'
                            onClick={()=>setShow(prev=>!prev)}
                          />
                        ) : (
                          <FaRegEye
                            className='absolute w-[20px] cursor-pointer right-[5%] bottom-[10%]'
                            onClick={()=>setShow(prev=>!prev)}
                          />
                        )}
                    </div>

                    <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                        <span className={`px-[10px] py-[5px] border-[2px]  rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-[#5A4BDA]" : "border-[#646464]"}`} onClick={()=>setRole("student")}>Student</span>
                        <span className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-[#5A4BDA]" : "border-[#646464]"}`} onClick={()=>setRole("educator")}>Educator</span>
                    </div>

                    <button className='w-[80%] h-[40px] bg-[#5A4BDA] text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignup} disabled={loading}>{loading ? <ClipLoader size={30} color="white"/>:"SignUp"}</button>

                    <div className='w-[80%] flex items-center gap-2'>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                        <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    </div>

                    <button
                        type = "button"
                    className='w-[80%] h-[40px] border-2 border-[#5A4BDA] rounded-[5px] flex items-center justify-center' onClick={googleSignup}>
                        <img src={google} className='w-[25px]' alt='google logo'/>
                        <span className='text-[18px] text-gray-500'>Continue with Google</span>
                    </button>

                    <div className="text-[#6f6f6f]">
                        Already have an account?{" "}
                        <span
                          className="underline underline-offset-1 text-[black] cursor-pointer"
                          onClick={()=>navigate("/login")}
                        >
                          Login
                        </span>
                    </div>
                </div>

                <div className='w-[50%] h-[100%] rounded-r-2xl bg-[#5A4BDA] md:flex items-center justify-center flex-col hidden'>
                    <video src={logo1} autoPlay loop muted className="w-150"/>
                </div>

            </form>
        </div>
    )
}

export default SignUp;