import React from 'react'
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import toast from 'react-hot-toast';
import axios from 'axios';
import { timeSince, TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';

function Tweet({ tweet }) {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const likeordislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            // console.log(res)
            toast.success(res.data.message);
            dispatch(getRefresh());
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }
    }

    const deleteHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            console.log(res);
            toast.success(res.data.message);
            dispatch(getRefresh());
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div className='border-b border-gray-200'>
            <div className='flex p-4'>
                <div>
                    <img src="https://raw.githubusercontent.com/tom555my/react-native-avataaars/HEAD/avataaars.png" alt="avatar" width={"40px"} />
                </div>
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`} </p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>

                    <div className='flex items-center justify-between my-3'>

                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <FaRegComment size={"20px"} />
                            </div>
                            <p >0</p>
                        </div>


                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-red-200 rounded-full cursor-pointer'>
                                <CiHeart onClick={() => likeordislikeHandler(tweet?._id)} size={"24px"} />
                            </div>
                            <p>{tweet?.like?.length}</p>
                        </div>


                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
                                <CiBookmark size={"24px"} />
                            </div>
                            <p>0</p>
                        </div>

                        {
                            user?._id === tweet?.UserId && (<div className='flex items-center'>
                                <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                    <MdOutlineDeleteOutline onClick={() => deleteHandler(tweet?._id)} size={"24px"} />
                                </div>
                                <p>0</p>
                            </div>)
                        }



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet