import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      if (
        newMessage.senderId === selectedUser?._id || 
        newMessage.receiverId === selectedUser?._id
      ) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, dispatch, selectedUser]);

  const handleImageUpload = async (chatId, image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch(`/api/messages/send/${chatId}`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    handleImageUpload
  };
};

export default useGetRealTimeMessage;