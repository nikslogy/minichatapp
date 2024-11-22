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

    const safeMessages = Array.isArray(messages) ? messages : [];

    return (
        <div className='px-2 md:px-4 flex-1 overflow-y-auto'>
            <div className='space-y-2'>
                {safeMessages.map((message) => (
                    <Message key={message._id} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default Messages;
