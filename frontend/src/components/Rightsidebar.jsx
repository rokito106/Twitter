import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Rightsidebar({ OtherUsers }) {
  return (
    <div className='w-[25%]'>

      <div className='flex items-center bg-gray-200 rounded-full p-2 '>
        <CiSearch size={"24px"} />
        <input className='outline-none pl-2 bg-transparent' type="text" placeholder='Search' />
      </div>

      <div className='p-4 bg-gray-100 rounded-2xl my-4'>

        <h1 className='font-bold text-lg'>Who to follow</h1>
        {
          OtherUsers?.map((user) => {
            return (

              <div key={user?._id} className='flex items-center justify-between my-3'>
                <div className='flex'>

                  <div>
                    <img src="https://raw.githubusercontent.com/tom555my/react-native-avataaars/HEAD/avataaars.png" alt="avatar" width={"40px"} />
                  </div>

                  <div className='ml-2 '>
                    <h1 className='font-bold'>{user?.name}</h1>
                    <p className='text-sm'>{`@${user?.username}`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
                  </Link>

                </div>
              </div>
            )
          })
        }


      </div>
    </div>
  )
}

export default Rightsidebar