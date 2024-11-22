import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setSelectedImage(base64);
                setPreviewUrl(URL.createObjectURL(file));
            } catch (error) {
                console.error("Error converting image:", error);
            }
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message && !selectedImage) return;

        try {
            const payload = {
                message: message || '',
                image: selectedImage || ''
            };

            const res = await axios.post(
                `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, 
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            if (res.data?.newMessage) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setMessage("");
                removeImage();
            }
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    return (
        <div className="px-4 my-3">
            {previewUrl && (
                <div className="image-preview mb-2">
                    <div className="relative">
                        <img src={previewUrl} alt="Preview" className="max-h-32 rounded-lg" />
                        <button 
                            onClick={removeImage}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-sm"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={onSubmitHandler} className="flex items-center gap-2">
                <div className="relative flex-1">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Send a message..."
                        className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white pr-24"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <label className="cursor-pointer text-white hover:text-gray-300">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <IoMdImages size={24} />
                        </label>
                        <button type="submit" className="text-white hover:text-gray-300">
                            <IoSend size={24} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SendInput;