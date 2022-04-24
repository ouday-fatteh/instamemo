import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    creatorImage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const postSchema = mongoose.Schema({
    title : String,
    message : String , 
    creator : String,
    creatorId : String,
    creatorIsVerified : {type:Boolean, default: false},
    creatorImage : String,
    tags : [String],
    selectedFile : String,
    likes : {
        type : [String],
        default : []
    },
    comments: [commentsSchema],
    shareCount: {
        type: Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const PostMessage = mongoose.model('postMessage',postSchema);
export default PostMessage;