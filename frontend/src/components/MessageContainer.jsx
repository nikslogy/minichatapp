import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {selectedUser !== null ? (
                <div className='w-full md:min-w-[350px] lg:min-w-[550px] flex flex-col h-[100vh] md:h-auto'>
                    <div className='flex gap-2 items-center bg-white border-b border-gray-300 px-2 md:px-4 py-2 mb-2'>
                        <div className={`avatar ${isOnline ? 'online' : ''}`}>
                            <div className='w-8 md:w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt="user-profile" />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between gap-2'>
                                <p className='font-semibold text-sm md:text-base'>{selectedUser?.fullName}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 overflow-hidden flex flex-col'>
                        <Messages />
                        <SendInput />
                    </div>
                </div>
            ) : (
                <div className='w-full md:min-w-[550px] flex flex-col justify-center items-center bg-white p-4'>
                    <h1 className='text-2xl md:text-4xl text-gray-800 font-bold text-center'>Hi, {authUser?.fullName}</h1>
                    <h2 className='text-xl md:text-2xl text-gray-600'>Let's start a conversation</h2>
                </div>
            )}
        </>
    );
}

export default MessageContainer;