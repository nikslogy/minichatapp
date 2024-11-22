// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({});

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://quickchat-ipik.onrender.com'
        : 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOption)); 

// API routes - these need to come BEFORE the static files
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Static files and catch-all route - these come AFTER the API routes
if (process.env.NODE_ENV === 'production') {
    // Serve static files
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    
    // Catch-all route - this should be LAST
    app.get('*', (req, res) => {
        // Don't serve index.html for API routes
        if (req.url.startsWith('/api/')) {
            return res.status(404).json({ message: 'API endpoint not found' });
        }
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening on port ${PORT}`);
});
