import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <div className='h-full flex flex-col'>
            {selectedUser ? (
                <>
                    <div className='flex items-center bg-white border-b border-gray-300 px-4 py-3'>
                        <div className={`avatar ${isOnline ? 'online' : ''}`}>
                            <div className='w-10 md:w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt="user-profile" />
                            </div>
                        </div>
                        <div className='ml-3'>
                            <p className='font-semibold'>{selectedUser?.fullName}</p>
                            <p className='text-xs text-gray-500'>{isOnline ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col h-[calc(100vh-180px)] md:h-[calc(90vh-140px)]'>
                        <Messages />
                        <SendInput />
                    </div>
                </>
            ) : (
                <div className='h-full flex flex-col items-center justify-center p-4'>
                    <h1 className='text-2xl md:text-3xl text-gray-800 font-bold text-center'>Welcome, {authUser?.fullName}</h1>
                    <p className='text-gray-600 mt-2'>Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
}

export default MessageContainer;