import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: function() {
            return !this.image; // Message is required only if there's no image
        }
    },
    image: {
        type: String, // Will store base64 string
        required: function() {
            return !this.message; // Image is required only if there's no message
        }
    }
}, { timestamps: true });

export const Message = mongoose.model("Message", messageModel);