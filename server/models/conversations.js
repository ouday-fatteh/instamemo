import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: {
        type: Array,
        required: true
    },
    messages: [{
        sender: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
}}],
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

    const Conversation = mongoose.model('Conversation', conversationSchema);
    export default Conversation;

