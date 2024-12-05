import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const { selectedUser } = useSelector((store) => store.user);
    const { authUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            // Only add message via socket if it's from the other user
            if (
                newMessage.senderId !== authUser?._id && 
                (newMessage.senderId === selectedUser?._id || 
                newMessage.receiverId === selectedUser?._id)
            ) {
                dispatch(addMessage(newMessage));
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, selectedUser, authUser, dispatch]);
};

export default useGetRealTimeMessage;