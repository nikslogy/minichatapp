import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
// import { BASE_URL } from '..';
import Modal from 'react-modal';

// Set app element for accessibility
Modal.setAppElement('#root');

const Message = ({ message }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            position: 'relative',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            maxWidth: '90vw',
            maxHeight: '90vh'
        }
    };

    return (
        <>
            <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="user avatar" src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50 text-white">12:45</time>
                </div>
                <div className={`chat-bubble max-w-[75%] md:max-w-[60%] ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                    {message?.message && <p className="text-sm md:text-base">{message.message}</p>}
                    {message?.image && (
                        <>
                            <img 
                                src={message.image}  // Direct base64 string
                                alt="message attachment" 
                                className="w-16 h-16 md:w-20 md:h-20 rounded-lg mt-2 cursor-pointer object-cover"
                                onClick={openModal}
                            />
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Image Modal"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <img 
                                        src={message.image}  // Direct base64 string
                                        alt="message attachment" 
                                        className="max-w-full max-h-[70vh] object-contain"
                                    />
                                    <div className="flex gap-4">
                                        <a 
                                            href={message.image}
                                            download="image"
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Download
                                        </a>
                                        <button 
                                            onClick={closeModal}
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Message;