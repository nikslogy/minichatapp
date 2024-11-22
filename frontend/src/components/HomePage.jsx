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
        <div className='w-full h-screen p-0 md:p-4'>
            <div className='flex h-full md:h-[550px] rounded-none md:rounded-lg overflow-hidden bg-white shadow-lg'>
                <div className='hidden md:block w-[300px] lg:w-[350px]'>
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