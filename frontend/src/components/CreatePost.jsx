import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast"
import { getIsActive, getRefresh } from '../redux/tweetSlice';
import axios from 'axios';
function CreatePost() {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user)
    const {isActive} = useSelector(store=>store.tweet);
    const dispatch=useDispatch();
    const submitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            dispatch(getRefresh())
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }
        setDescription("")
    }

    const forYouHandler = () => {
        dispatch(getIsActive(true));
   }
   const followingHandler = () => {
       
       dispatch(getIsActive(false));
   }

    return (
        <div className='w-[100%]'>
            <div>
            <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                    </div>
                    <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                    </div>
                </div>
                <div className=''>
                    <div className='flex items-center justify-center p-4'>
                        <div>
                            <img src="https://raw.githubusercontent.com/tom555my/react-native-avataaars/HEAD/avataaars.png" alt="avatar" width={"40px"} />
                        </div>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='w-full text-lg border-none outline-none ml-2' type='text' placeholder='What is happening?!' />
                    </div>
                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                        <div>
                            <CiImageOn size={"24px"} />
                        </div>
                        <button onClick={submitHandler} className='bg-[#1D98F0] rounded-full px-4 py-1 border-none text-white text-lg hover:bg-[#1D98E0]'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost