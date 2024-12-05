import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const corsOption = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://quickchat-ipik.onrender.com'
        : 'http://localhost:3000',
    credentials: true
};
const io = new Server(server, {
    cors: corsOption,
    methods: ['GET', 'POST'],
    credentials: true
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if(userId !== undefined) {
        userSocketMap[userId] = socket.id;
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }

    // Add this new event listener
    socket.on('sendMessage', (message) => {
        const receiverSocketId = userSocketMap[message.receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', message);
        }
    });

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export {app, io, server};