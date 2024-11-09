import React, { useState } from 'react'
import axios from "axios"
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { getUser } from '../redux/userSlice';

const Login = () => {
    const [isLogin, setisLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLogin) {
            // Login
            try {
                const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                dispatch(getUser(res?.data?.user))//user has come from backend
                if (res.data.success) {
                    navigate("/");
                    toast.success(res.data.message);
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            // Sign up
            try {
                const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    setisLogin(true);
                    toast.success(res.data.message);
                }
            }
            catch (error) {
                console.error('Signup error:', error.response ? error.response.data : error.message);
            }
        }
    }
    const signuploginHandler = () => {
        setisLogin(!isLogin)
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[80%] flex items-center justify-around'>
                <div>
                    <img className='ml-5' width={"300px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-t39_XEag9DvX0LaoksfHutS7GHs078AMiA&s" alt="twitter-logo" />
                </div>

                <div>
                    <div className='my-5'>
                        <h1 className='font-bold text-6xl'>Happening Now</h1>
                    </div>
                    <h1 className='font-semibold text-3xl mt-4 mb-2'>{isLogin ? "Login" : "Signup"}</h1>
                    <form onSubmit={submitHandler} className='flex flex-col'>{
                        !isLogin && (<>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className=' border border-gray-500 my-2 px-3 py-1 rounded-xl w-[70%] font-semibold outline-gray-600' />

                            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder='Username' className=' border border-gray-500 my-2 px-3 py-1 rounded-xl w-[70%] font-semibold outline-gray-600' />
                        </>)
                    }
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className=' border border-gray-500 my-2 px-3 py-1 rounded-xl w-[70%] font-semibold outline-gray-600' />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className=' border border-gray-500 my-2 px-3 py-1 rounded-xl w-[70%] font-semibold outline-gray-600' />
                        <button className='bg-[#1D98F0] rounded-xl px-4 py-1 border-none text-white text-lg hover:bg-[#336776] w-[70%] my-2'>{isLogin ? "Login" : "Signup"}</button>
                        <h1 className='mt-2 ml-12'>{isLogin ? "Do not have an account?" : "Already have an account?"}<span onClick={signuploginHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Sign up" : "Login"}</span></h1>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login