import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='flex-1 overflow-y-auto px-4 py-2'>
            <div className='flex flex-col space-y-4'>
                {messages?.map((message) => (
                    <Message key={message._id} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default Messages;
