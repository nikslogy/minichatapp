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

    socket.on("receiveMessage", (newMessage) => {
      if (
        (newMessage.senderId === selectedUser?._id || 
         newMessage.receiverId === selectedUser?._id) &&
        (newMessage.senderId === authUser?._id || 
         newMessage.receiverId === authUser?._id)
      ) {
        dispatch(addMessage(newMessage));
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, dispatch, selectedUser, authUser]);
};

export default useGetRealTimeMessage;