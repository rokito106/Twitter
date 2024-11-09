import React, { useEffect } from 'react'
import Leftsidebar from './Leftsidebar'
import Feed from './Feed'
import Rightsidebar from './Rightsidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetOtherusers from '../hooks/useGetOtherusers'
import useGetMyTweets from '../hooks/useGetMyTweets'
function Home() {
  const { user,otherusers } = useSelector(store => store.user);
  const navigate=useNavigate();
  useEffect(()=>{
      if(!user){
        navigate('/login');
      }   
  },[])
  useGetOtherusers(user?._id);
  useGetMyTweets(user?._id);
  return (
    <div className='flex justify-between w-[80%] mx-auto '>
      <Leftsidebar />
      <Outlet />
      <Rightsidebar OtherUsers={otherusers} />
    </div>
  )
}

export default Home