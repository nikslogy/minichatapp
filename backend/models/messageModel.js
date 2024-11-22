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
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Ensure at least one of message or image is provided
messageModel.pre('save', function(next) {
    if (!this.message && !this.image) {
        next(new Error('Message or image is required'));
    }
    next();
});

export const Message = mongoose.model("Message", messageModel);