import React from 'react'
import { MdHome } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getUser, otherUsers } from '../redux/userSlice';


function Leftsidebar() {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useGetProfile(user?._id);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            navigate('/login');
            toast.success(res.data.message);
            dispatch(getUser(null));
            dispatch(otherUsers(null));
            dispatch(getMyProfile(null));
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }
    }

    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <img className='ml-5' width={"55px"} src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0-1-852x479.jpg" alt="twitter-logo" />
                </div>

                <div className='my-4'>

                    <Link to={"/"} className='flex items-center px-2 my-2 py-2 hover:bg-gray-400 hover:cursor-pointer rounded-full'>
                        <div>
                            <MdHome size={"24px"} />
                        </div>
                        <h1 className='font-bold ml-3 text-lg'>Home</h1>
                    </Link>

                    <div className='flex items-center px-2 my-2 py-2 hover:bg-gray-400 hover:cursor-pointer rounded-full'>
                        <div>
                            <CiHashtag size={"24px"} />
                        </div>
                        <h1 className='font-bold ml-3 text-lg'>Explore</h1>
                    </div>

                    <div className='flex items-center px-2 my-2 py-2 hover:bg-gray-400 hover:cursor-pointer rounded-full'>
                        <div>
                            <IoMdNotificationsOutline size={"24px"} />
                        </div>
                        <h1 className='font-bold ml-3 text-lg'>Notifications</h1>
                    </div>

                    <Link to={`/profile/${user?._id}`} className='flex items-center px-2 my-2 py-2 hover:bg-gray-400 hover:cursor-pointer rounded-full'>
                        <div>
                            <FaRegUser size={"24px"} />
                        </div>
                        <h1 className='font-bold ml-3 text-lg'>Profile</h1>
                    </Link>

                    <div className='flex items-center px-2 my-2 py-2 hover:bg-gray-400 hover:cursor-pointer rounded-full'>
                        <div>
                            <CiBookmark size={"24px"} />
                        </div>
                        <h1 className='font-bold ml-3 text-lg'>Bookmarks</h1>
                    </div>

                    <div onClick={logoutHandler} className='flex items-center px-2 my-2 py-2 hover:bg-gray-400 hover:cursor-pointer rounded-full'>
                        <div>
                            <AiOutlineLogout size={"24px"} />
                        </div>
                        <h1 className='font-bold ml-3 text-lg'>Logout</h1>
                    </div>

                    <button className='px-4 py-2 border-none text-md bg-[#1D98F0] w-full rounded-full text-white font-bold'>Post</button>

                </div>
            </div>
        </div>
    )
}

export default Leftsidebar