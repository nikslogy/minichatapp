import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className='h-screen w-full p-0 md:p-4 overflow-hidden'>
      <div className='flex h-full md:h-[90vh] rounded-none md:rounded-lg overflow-hidden bg-white shadow-lg'>
        <div className='w-[280px] md:w-[320px] lg:w-[350px] border-r border-gray-200'>
          <Sidebar />
        </div>
        <div className='flex-1'>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage