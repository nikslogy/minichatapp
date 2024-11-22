import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message, image } = req.body;

        // Validate inputs
        if (!message && !image) {
            return res.status(400).json({ 
                error: "Message or image is required",
                received: { message, image: !!image }
            });
        }

        if (!receiverId) {
            return res.status(400).json({ error: "Receiver ID is required" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            ...(message && { message }),
            ...(image && { image })
        });

        await conversation.messages.push(newMessage._id);
        await conversation.save();

        // Populate the message before sending
        const populatedMessage = await Message.findById(newMessage._id);

        // Socket.IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", populatedMessage);
        }

        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", populatedMessage);
        }

        return res.status(201).json({
            newMessage: populatedMessage
        });
    } catch (error) {
        console.error("Send message error:", error);
        return res.status(500).json({ 
            error: "Failed to send message",
            details: error.message 
        });
    }
};

export const getMessage = async (req,res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}